interface Env {
  RESEND_API_KEY?: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const OWNER_EMAIL = "hello@forsadesign.co.uk";
const FROM = "Forsa Design <hello@forsadesign.co.uk>";
const CONTACT_MAX_BODY_BYTES = 12_000;
const QUOTE_MAX_BODY_BYTES = 17 * 1024 * 1024;
const MAX_PDF_BYTES = 8 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimits = new Map<string, RateLimitEntry>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders },
  });
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP")?.trim() ||
    request.headers.get("x-real-client-ip")?.trim() ||
    "unknown"
  );
}

function isRateLimited(request: Request, route: string): boolean {
  const key = `${route}:${clientIp(request)}`;
  const now = Date.now();
  const entry = rateLimits.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

async function readBody(request: Request, maxBytes: number): Promise<string | null> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxBytes) return null;

  const text = await request.text();
  return new TextEncoder().encode(text).byteLength <= maxBytes ? text : null;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

async function sendViaResend(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Resend email request failed", { status: response.status });
  }
  return response.ok;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (isRateLimited(request, "contact")) {
    return json({ error: "Too many contact requests. Please try again later." }, 429);
  }

  const text = await readBody(request, CONTACT_MAX_BODY_BYTES);
  if (text === null) return json({ error: "Request too large." }, 413);

  const body = new URLSearchParams(text);
  if (body.get("_gotcha")) return json({ ok: true });

  const name = body.get("name")?.trim() ?? "";
  const email = body.get("email")?.trim() ?? "";
  const message = body.get("message")?.trim() ?? "";
  const language = body.get("language") === "pl" ? "pl" : "en";
  if (!name || !email || !message) {
    return json({ error: "Please complete all fields." }, 400);
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return json({ error: "Submitted data is too long." }, 400);
  }
  if (!emailPattern.test(email)) return json({ error: "Invalid email address." }, 400);
  if (!env.RESEND_API_KEY) {
    return json({ error: "Contact service is not configured." }, 503);
  }

  const subject = language === "pl" ? `Nowa wiadomość od ${name}` : `New enquiry from ${name}`;
  const textBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const delivered = await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [OWNER_EMAIL],
    reply_to: email,
    subject,
    text: textBody,
    html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>`,
  });
  if (!delivered) return json({ error: "Message delivery failed." }, 502);

  const confirmation =
    language === "pl"
      ? {
          subject: "Dziękuję za wiadomość - Forsa Design",
          text: `Cześć ${name},\n\nDziękuję za kontakt. Otrzymałem Twoją wiadomość i odpowiem zazwyczaj w ciągu 24 godzin.\n\nTwoja wiadomość:\n${message}\n\nMiro\nForsa Design\nhello@forsadesign.co.uk\n07770 110 735`,
        }
      : {
          subject: "Thank you for your message - Forsa Design",
          text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will reply within 24 hours.\n\nYour message:\n${message}\n\nMiro\nForsa Design\nhello@forsadesign.co.uk\n07770 110 735`,
        };
  await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [email],
    reply_to: OWNER_EMAIL,
    subject: confirmation.subject,
    text: confirmation.text,
  });
  return json({ ok: true });
}

function isQuotePayload(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function decodedBase64Length(value: string): number | null {
  try {
    return atob(value).length;
  } catch {
    return null;
  }
}

async function handleQuote(request: Request, env: Env): Promise<Response> {
  if (isRateLimited(request, "quote")) {
    return json({ error: "Too many quote email requests. Please try again later." }, 429);
  }

  const text = await readBody(request, QUOTE_MAX_BODY_BYTES);
  if (text === null) return json({ error: "The quote PDF is invalid or too large." }, 400);
  const payload = await Promise.resolve()
    .then(() => JSON.parse(text))
    .catch(() => null);
  if (!isQuotePayload(payload))
    return json({ error: "A valid email and quote data are required." }, 400);

  const { email, name, phone, pdfBase64, quoteId, projectLabel, total, estimatedWeeks, isEn } =
    payload;
  if (
    typeof email !== "string" ||
    !emailPattern.test(email) ||
    (name !== undefined && (typeof name !== "string" || name.length > 100)) ||
    (phone !== undefined && (typeof phone !== "string" || phone.length > 40)) ||
    typeof pdfBase64 !== "string" ||
    typeof quoteId !== "string" ||
    typeof projectLabel !== "string" ||
    typeof total !== "string" ||
    typeof estimatedWeeks !== "string" ||
    typeof isEn !== "boolean"
  ) {
    return json({ error: "A valid email and quote data are required." }, 400);
  }

  const pdfLength = decodedBase64Length(pdfBase64);
  if (pdfLength === null || pdfLength === 0 || pdfLength > MAX_PDF_BYTES) {
    return json({ error: "The quote PDF is invalid or too large." }, 400);
  }
  if (!env.RESEND_API_KEY) return json({ error: "Email service is not configured." }, 503);

  const subject = isEn ? `Forsa Design quote ${quoteId}` : `Wycena Forsa Design ${quoteId}`;
  const body = [
    isEn ? "Thank you for your enquiry." : "Dziekujemy za zapytanie.",
    "",
    ...(typeof name === "string" ? [`${isEn ? "Name" : "Imie"}: ${name}`] : []),
    ...(typeof phone === "string" ? [`${isEn ? "Phone" : "Telefon"}: ${phone}`] : []),
    ...(name || phone ? [""] : []),
    `${isEn ? "Project" : "Projekt"}: ${projectLabel}`,
    `${isEn ? "Total" : "Razem"}: ${total}`,
    `${isEn ? "Estimated time" : "Szacowany czas"}: ${estimatedWeeks}`,
    "",
    isEn
      ? "Please find your quote attached. We will be in touch shortly."
      : "W zalaczniku znajdziesz wycene. Wkrotce skontaktujemy sie z Toba.",
  ].join("\n");
  const attachment = { filename: `forsa-quote-${quoteId}.pdf`, content: pdfBase64 };
  const clientSent = await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [email],
    subject,
    text: body,
    attachments: [attachment],
  });
  const ownerSent = clientSent
    ? await sendViaResend(env.RESEND_API_KEY, {
        from: FROM,
        to: [OWNER_EMAIL],
        reply_to: email,
        subject: `${subject} - copy`,
        text: `${body}\n\nClient email: ${email}`,
        attachments: [attachment],
      })
    : false;
  return clientSent && ownerSent
    ? json({ ok: true })
    : json({ error: "We could not send the quote email. Please try again." }, 502);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const path = new URL(request.url).pathname;
    if (request.method === "GET" && path === "/api/healthz") return json({ status: "ok" });

    try {
      if (request.method === "POST" && path === "/api/contact") return handleContact(request, env);
      if (request.method === "POST" && path === "/api/quotes/email")
        return handleQuote(request, env);
      return json({ error: "Not found." }, 404);
    } catch {
      return json({ error: "Unable to process the request." }, 500);
    }
  },
};
