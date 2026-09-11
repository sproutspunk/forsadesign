interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: {
    prefix?: string;
    cursor?: string;
  }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}

interface Env {
  RESEND_API_KEY?: string;
  LEADS?: KVNamespace;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface LeadRecord {
  email: string;
  company: string;
  language: "en" | "pl";
  signupAt: number;
  stepsSent: number[];
}

interface ContactRecord {
  name: string;
  email: string;
  message: string;
  language: "en" | "pl";
  submittedAt: number;
}

const OWNER_EMAIL = "hello@forsadesign.co.uk";
const FROM = "Forsa Design <hello@forsadesign.co.uk>";
const ALLOWED_ORIGINS = [
  "https://forsadesign.co.uk",
  "https://www.forsadesign.co.uk",
  "http://localhost:3000",
];
const CONTACT_MAX_BODY_BYTES = 12_000;
const QUOTE_MAX_BODY_BYTES = 17 * 1024 * 1024;
const LEAD_MAGNET_MAX_BODY_BYTES = 4_000;
const MAX_PDF_BYTES = 8 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimits = new Map<string, RateLimitEntry>();
const DAY_MS = 24 * 60 * 60 * 1000;

const SITE_ORIGIN = "https://forsadesign.co.uk";
const STRIPE_API = "https://api.stripe.com/v1";
const CHECKOUT_MAX_BODY_BYTES = 4_000;
const STRIPE_WEBHOOK_MAX_BODY_BYTES = 256 * 1024;
const CUSTOM_MIN_GBP = 1;
const CUSTOM_MAX_GBP = 50_000;
const HSTS = "max-age=63072000; includeSubDomains; preload";

// step -> minimum days since signup before it is due
const FOLLOW_UP_SCHEDULE: Record<number, number> = { 2: 3, 3: 7, 4: 14 };

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
  };
}

function json(data: unknown, status = 200, origin: string | null = null): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "strict-transport-security": HSTS,
      ...corsHeaders(origin),
    },
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
    const bodyText = await response.text().catch(() => "unknown");
    console.error(
      JSON.stringify({
        event: "resend_request_failed",
        status: response.status,
        body: bodyText.slice(0, 500),
        to: payload.to,
        subject: payload.subject,
      }),
    );
  }
  return response.ok;
}

// Encodes nested objects/arrays using Stripe's bracket notation for its form-encoded API.
function toStripeForm(params: Record<string, unknown>, prefix = ""): [string, string][] {
  const entries: [string, string][] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const paramKey = prefix ? `${prefix}[${key}]` : key;
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const arrayKey = `${paramKey}[${index}]`;
        if (item && typeof item === "object") {
          entries.push(...toStripeForm(item as Record<string, unknown>, arrayKey));
        } else {
          entries.push([arrayKey, String(item)]);
        }
      });
    } else if (typeof value === "object") {
      entries.push(...toStripeForm(value as Record<string, unknown>, paramKey));
    } else {
      entries.push([paramKey, String(value)]);
    }
  }
  return entries;
}

async function stripeRequest(
  apiKey: string,
  path: string,
  params: Record<string, unknown>,
): Promise<{ ok: boolean; data: Record<string, unknown>; error?: string }> {
  const response = await fetch(`${STRIPE_API}/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${apiKey}`,
    },
    body: new URLSearchParams(toStripeForm(params)),
  });
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    const stripeError = data.error as
      | { message?: string; code?: string; type?: string }
      | undefined;
    console.error(
      JSON.stringify({
        event: "stripe_request_failed",
        path,
        status: response.status,
        stripeError,
      }),
    );
    return {
      ok: false,
      data,
      error: stripeError?.message ?? `Stripe request failed (${response.status}).`,
    };
  }
  return { ok: response.ok, data };
}

// Verifies the Stripe-Signature header per Stripe's webhook signing scheme (HMAC-SHA256
// over "timestamp.payload"), without depending on the Stripe SDK's Node-only crypto.
async function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=") as [string, string]),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  );
  const expected = [...new Uint8Array(signed)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++)
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return mismatch === 0;
}

async function handleContact(request: Request, env: Env, origin: string | null): Promise<Response> {
  if (isRateLimited(request, "contact")) {
    console.log(JSON.stringify({ event: "contact_rate_limited", ip: clientIp(request) }));
    return json({ error: "Too many contact requests. Please try again later." }, 429, origin);
  }

  const text = await readBody(request, CONTACT_MAX_BODY_BYTES);
  if (text === null) return json({ error: "Request too large." }, 413, origin);

  const body = new URLSearchParams(text);
  if (body.get("_gotcha")) {
    console.log(JSON.stringify({ event: "contact_honeypot", ip: clientIp(request) }));
    return json({ ok: true }, 200, origin);
  }

  const name = body.get("name")?.trim() ?? "";
  const email = body.get("email")?.trim() ?? "";
  const message = body.get("message")?.trim() ?? "";
  const language = body.get("language") === "pl" ? "pl" : "en";
  if (!name || !email || !message) {
    return json({ error: "Please complete all fields." }, 400, origin);
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return json({ error: "Submitted data is too long." }, 400, origin);
  }
  if (!emailPattern.test(email)) return json({ error: "Invalid email address." }, 400, origin);

  if (env.LEADS) {
    const record: ContactRecord = {
      name,
      email,
      message,
      language,
      submittedAt: Date.now(),
    };
    await env.LEADS.put(
      `contact:${record.submittedAt}:${crypto.randomUUID()}`,
      JSON.stringify(record),
    );
  }

  if (!env.RESEND_API_KEY) {
    console.error(JSON.stringify({ event: "contact_email_not_configured", email }));
    return json({ ok: true }, 200, origin);
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
  if (!delivered) return json({ ok: true }, 200, origin);

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
  return json({ ok: true }, 200, origin);
}

function isQuotePayload(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function handleLeadMagnet(
  request: Request,
  env: Env,
  origin: string | null,
): Promise<Response> {
  if (isRateLimited(request, "lead-magnet")) {
    return json({ error: "Too many requests. Please try again later." }, 429, origin);
  }

  const text = await readBody(request, LEAD_MAGNET_MAX_BODY_BYTES);
  if (text === null) return json({ error: "Request too large." }, 413, origin);
  const payload = await Promise.resolve()
    .then(() => JSON.parse(text))
    .catch(() => null);
  if (!isQuotePayload(payload)) return json({ error: "A valid email is required." }, 400, origin);

  if (typeof payload._gotcha === "string" && payload._gotcha.trim() !== "") {
    console.log(JSON.stringify({ event: "lead_magnet_honeypot", ip: clientIp(request) }));
    return json({ ok: true }, 200, origin);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim().slice(0, 200) : "";
  const language = payload.language === "pl" ? "pl" : "en";
  if (!email || !emailPattern.test(email) || email.length > 320) {
    return json({ error: "A valid email address is required." }, 400, origin);
  }
  if (!env.RESEND_API_KEY) return json({ error: "Email service is not configured." }, 503, origin);

  const checklistUrl = "https://forsadesign.co.uk/audit-checklist.pdf";
  const content =
    language === "pl"
      ? {
          subject: "Twoja checklista audytu strony - Forsa Design",
          text: `Czesc,\n\nDzieki za pobranie checklisty. Oto Twoj PDF:\n${checklistUrl}\n\nJesli Twoja strona zdobyla ponizej 7 punktow, odpowiedz na tego maila - nagram 2-minutowy audyt wideo Twojej obecnej strony, bez oplat.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`,
        }
      : {
          subject: "Your Procurement Website Audit Checklist - Forsa Design",
          text: `Hi,\n\nThanks for downloading the checklist. Here's your PDF:\n${checklistUrl}\n\nIf your site scores below 7, reply to this email - I'll send a 2-minute video audit of your current site, no charge.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`,
        };

  const delivered = await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [email],
    reply_to: OWNER_EMAIL,
    subject: content.subject,
    text: content.text,
  });
  if (!delivered)
    return json({ error: "We could not send the checklist. Please try again." }, 502, origin);

  await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [OWNER_EMAIL],
    reply_to: email,
    subject: `New lead magnet download: ${email}`,
    text: `Email: ${email}\nCompany: ${company || "N/A"}\nLanguage: ${language}\nTime: ${new Date().toISOString()}`,
  });

  if (env.LEADS) {
    const record: LeadRecord = {
      email,
      company,
      language,
      signupAt: Date.now(),
      stepsSent: [1],
    };
    await env.LEADS.put(`lead:${email}`, JSON.stringify(record));
  }

  return json({ ok: true }, 200, origin);
}

const WAITLIST_MAX_BODY_BYTES = 2_000;

async function handleWaitlist(
  request: Request,
  env: Env,
  origin: string | null,
): Promise<Response> {
  if (isRateLimited(request, "waitlist")) {
    return json({ error: "Too many requests. Please try again later." }, 429, origin);
  }

  const text = await readBody(request, WAITLIST_MAX_BODY_BYTES);
  if (text === null) return json({ error: "Request too large." }, 413, origin);
  const payload = await Promise.resolve()
    .then(() => JSON.parse(text))
    .catch(() => null);
  if (!isQuotePayload(payload)) return json({ error: "A valid email is required." }, 400, origin);

  if (typeof payload._gotcha === "string" && payload._gotcha.trim() !== "") {
    console.log(JSON.stringify({ event: "waitlist_honeypot", ip: clientIp(request) }));
    return json({ ok: true }, 200, origin);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const language = payload.language === "pl" ? "pl" : "en";
  if (!email || !emailPattern.test(email) || email.length > 320) {
    return json({ error: "A valid email address is required." }, 400, origin);
  }
  if (env.LEADS) {
    await env.LEADS.put(
      `waitlist:${email}`,
      JSON.stringify({ email, language, signupAt: Date.now() }),
    );
  }

  if (!env.RESEND_API_KEY) {
    console.error(JSON.stringify({ event: "waitlist_email_not_configured", email }));
    return json({ ok: true }, 200, origin);
  }

  const content =
    language === "pl"
      ? {
          subject: "Jestes na liscie - Forsa Design",
          text: "Czesc,\n\nDzieki za zapis. Odezwiemy sie do Ciebie jako pierwszego, gdy tylko uruchomimy demo samoobslugowego edytora strony.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk",
        }
      : {
          subject: "You're on the list - Forsa Design",
          text: "Hi,\n\nThanks for signing up. We'll let you know first as soon as the self-service website editor demo goes live.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk",
        };

  await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [email],
    reply_to: OWNER_EMAIL,
    subject: content.subject,
    text: content.text,
  });

  await sendViaResend(env.RESEND_API_KEY, {
    from: FROM,
    to: [OWNER_EMAIL],
    reply_to: email,
    subject: `New editor demo waitlist signup: ${email}`,
    text: `Email: ${email}\nLanguage: ${language}\nTime: ${new Date().toISOString()}`,
  });

  return json({ ok: true }, 200, origin);
}

function decodedBase64Length(value: string): number | null {
  try {
    return atob(value).length;
  } catch {
    return null;
  }
}

interface FollowUpContent {
  subject: string;
  text: string;
}

function followUpContent(step: number, language: "en" | "pl"): FollowUpContent {
  const checklistUrl = "https://forsadesign.co.uk/audit-checklist.pdf";
  const en: Record<number, FollowUpContent> = {
    2: {
      subject: "Did you run the audit?",
      text:
        "Did you run the audit? Here's what most Aberdeen engineering firms fail on: mobile speed and SSL grade. Both take under 10 minutes to check.\n\nChecklist: " +
        checklistUrl +
        "\n\nMiro\nForsa Design",
    },
    3: {
      subject: "A free 2-minute video audit, no pitch",
      text: "If your site scored below 7, I record a free 2-minute video audit - no call needed, no pitch. Just reply with your URL.\n\nMiro\nForsa Design",
    },
    4: {
      subject: "4.2s to 0.8s: a recent rebuild",
      text: "Last month we rebuilt a site for a local contractor. Load time: 4.2s -> 0.8s. Here's what we changed: https://forsadesign.co.uk/en/blog\n\nMiro\nForsa Design",
    },
  };
  const pl: Record<number, FollowUpContent> = {
    2: {
      subject: "Sprawdziles juz checkliste?",
      text:
        "Sprawdziles juz checkliste? Oto na czym najczesciej wypadaja firmy inzynieryjne: szybkosc na mobile i ocena SSL. Obie rzeczy sprawdzisz w mniej niz 10 minut.\n\nChecklista: " +
        checklistUrl +
        "\n\nMiro\nForsa Design",
    },
    3: {
      subject: "Darmowy 2-minutowy audyt wideo, bez sprzedazy",
      text: "Jesli Twoja strona zdobyla ponizej 7 punktow, nagram darmowy 2-minutowy audyt wideo - bez rozmowy, bez sprzedazy. Wystarczy, ze odpiszesz z adresem URL.\n\nMiro\nForsa Design",
    },
    4: {
      subject: "4.2s do 0.8s: niedawna przebudowa strony",
      text: "W zeszlym miesiacu przebudowalismy strone dla lokalnego kontrahenta. Czas ladowania: 4.2s -> 0.8s. Zobacz co zmienilismy: https://forsadesign.co.uk/pl/blog\n\nMiro\nForsa Design",
    },
  };
  return (language === "pl" ? pl : en)[step];
}

// Daily lead-magnet follow-up cron.
async function runLeadFollowUps(env: Env): Promise<void> {
  if (!env.LEADS || !env.RESEND_API_KEY) return;
  const apiKey = env.RESEND_API_KEY;
  let cursor: string | undefined;
  do {
    const page = await env.LEADS.list({ prefix: "lead:", cursor });
    for (const key of page.keys) {
      const raw = await env.LEADS.get(key.name);
      if (!raw) continue;
      const record = JSON.parse(raw) as LeadRecord;
      const daysSince = (Date.now() - record.signupAt) / DAY_MS;
      let changed = false;
      for (const [stepStr, minDays] of Object.entries(FOLLOW_UP_SCHEDULE)) {
        const step = Number(stepStr);
        if (record.stepsSent.includes(step) || daysSince < minDays) continue;
        const content = followUpContent(step, record.language);
        const sent = await sendViaResend(apiKey, {
          from: FROM,
          to: [record.email],
          reply_to: OWNER_EMAIL,
          subject: content.subject,
          text: content.text,
        });
        if (sent) {
          record.stepsSent.push(step);
          changed = true;
        }
      }
      if (changed) await env.LEADS.put(key.name, JSON.stringify(record));
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
}

async function handleQuote(request: Request, env: Env, origin: string | null): Promise<Response> {
  if (isRateLimited(request, "quote")) {
    return json({ error: "Too many quote email requests. Please try again later." }, 429, origin);
  }

  const text = await readBody(request, QUOTE_MAX_BODY_BYTES);
  if (text === null) return json({ error: "The quote PDF is invalid or too large." }, 400, origin);
  const payload = await Promise.resolve()
    .then(() => JSON.parse(text))
    .catch(() => null);
  if (!isQuotePayload(payload))
    return json({ error: "A valid email and quote data are required." }, 400, origin);

  if (typeof payload._gotcha === "string" && payload._gotcha.trim() !== "") {
    console.log(JSON.stringify({ event: "quote_email_honeypot", ip: clientIp(request) }));
    return json({ ok: true }, 200, origin);
  }

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
    return json({ error: "A valid email and quote data are required." }, 400, origin);
  }

  const pdfLength = decodedBase64Length(pdfBase64);
  if (pdfLength === null || pdfLength === 0 || pdfLength > MAX_PDF_BYTES) {
    console.log(
      JSON.stringify({
        event: "quote_pdf_invalid",
        pdfLength,
        maxBytes: MAX_PDF_BYTES,
        email,
      }),
    );
    return json({ error: "The quote PDF is invalid or too large." }, 400, origin);
  }
  if (!env.RESEND_API_KEY) return json({ error: "Email service is not configured." }, 503, origin);

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
    ? json({ ok: true }, 200, origin)
    : json({ error: "We could not send the quote email. Please try again." }, 502, origin);
}

async function handleCheckoutCustom(
  request: Request,
  env: Env,
  origin: string | null,
): Promise<Response> {
  if (isRateLimited(request, "checkout")) {
    return json({ error: "Too many checkout requests. Please try again later." }, 429, origin);
  }
  if (!env.STRIPE_SECRET_KEY) return json({ error: "Payments are not configured." }, 503, origin);

  const text = await readBody(request, CHECKOUT_MAX_BODY_BYTES);
  if (text === null) return json({ error: "Request too large." }, 413, origin);
  const payload = await Promise.resolve()
    .then(() => JSON.parse(text))
    .catch(() => null);
  if (!isQuotePayload(payload)) return json({ error: "Invalid request." }, 400, origin);
  if (typeof payload._gotcha === "string" && payload._gotcha.trim() !== "") {
    return json({ ok: true }, 200, origin);
  }

  const amountGBP = typeof payload.amountGBP === "number" ? payload.amountGBP : NaN;
  if (!Number.isFinite(amountGBP) || amountGBP < CUSTOM_MIN_GBP || amountGBP > CUSTOM_MAX_GBP) {
    return json(
      { error: `Enter an amount between \u00a3${CUSTOM_MIN_GBP} and \u00a3${CUSTOM_MAX_GBP}.` },
      400,
      origin,
    );
  }
  const description =
    typeof payload.description === "string" ? payload.description.trim().slice(0, 200) : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (email && (!emailPattern.test(email) || email.length > 320)) {
    return json({ error: "Invalid email address." }, 400, origin);
  }
  const language = payload.language === "pl" ? "pl" : "en";

  const result = await stripeRequest(env.STRIPE_SECRET_KEY, "checkout/sessions", {
    mode: "payment",
    managed_payments: { enabled: false },
    ...(email ? { customer_email: email } : {}),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(amountGBP * 100),
          product_data: { name: description || "Forsa Design \u2013 Invoice payment" },
        },
      },
    ],
    success_url: `${SITE_ORIGIN}/${language}/pay?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_ORIGIN}/${language}/pay?payment=cancelled`,
    metadata: { kind: "custom", language },
  });
  if (!result.ok || typeof result.data.url !== "string" || typeof result.data.id !== "string") {
    return json(
      { error: result.error ?? "We could not start the checkout. Please try again." },
      502,
      origin,
    );
  }

  if (env.LEADS) {
    await env.LEADS.put(
      `order:${result.data.id}`,
      JSON.stringify({
        kind: "custom",
        status: "pending",
        amount: amountGBP,
        description,
        email,
        language,
        createdAt: Date.now(),
      }),
    );
  }

  return json({ url: result.data.url }, 200, origin);
}

async function handleStripeWebhook(request: Request, env: Env): Promise<Response> {
  if (!env.STRIPE_WEBHOOK_SECRET)
    return new Response("Webhook not configured.", {
      status: 503,
      headers: { "strict-transport-security": HSTS },
    });

  const rawBody = await readBody(request, STRIPE_WEBHOOK_MAX_BODY_BYTES);
  if (rawBody === null)
    return new Response("Payload too large.", {
      status: 413,
      headers: { "strict-transport-security": HSTS },
    });

  const valid = await verifyStripeSignature(
    rawBody,
    request.headers.get("stripe-signature"),
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!valid)
    return new Response("Invalid signature.", {
      status: 400,
      headers: { "strict-transport-security": HSTS },
    });

  const event = await Promise.resolve()
    .then(() => JSON.parse(rawBody))
    .catch(() => null);
  if (!event || typeof event !== "object")
    return new Response("Invalid payload.", {
      status: 400,
      headers: { "strict-transport-security": HSTS },
    });

  if (event.type === "checkout.session.completed" && env.LEADS) {
    const session = (event as { data?: { object?: Record<string, unknown> } }).data?.object;
    const sessionId = typeof session?.id === "string" ? session.id : null;
    if (sessionId) {
      const raw = await env.LEADS.get(`order:${sessionId}`);
      if (raw) {
        const order = JSON.parse(raw) as Record<string, unknown> & {
          email?: string;
          language?: string;
          kind?: string;
          amount?: number;
        };
        order.status = "paid";
        await env.LEADS.put(`order:${sessionId}`, JSON.stringify(order));

        if (env.RESEND_API_KEY && order.email) {
          const isEn = order.language !== "pl";
          const subject = isEn
            ? "Payment received - Forsa Design"
            : "Platnosc otrzymana - Forsa Design";
          const text = isEn
            ? `Thank you - we've received your payment of GBP ${order.amount}. We'll be in touch shortly.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`
            : `Dziekujemy - otrzymalismy Twoja platnosc w wysokosci GBP ${order.amount}. Wkrotce sie odezwiemy.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`;
          await sendViaResend(env.RESEND_API_KEY, {
            from: FROM,
            to: [order.email],
            reply_to: OWNER_EMAIL,
            subject,
            text,
          });
          await sendViaResend(env.RESEND_API_KEY, {
            from: FROM,
            to: [OWNER_EMAIL],
            reply_to: order.email,
            subject: `New Stripe payment: ${order.kind} (GBP ${order.amount})`,
            text: `Session: ${sessionId}\nKind: ${order.kind}\nAmount: GBP ${order.amount}\nEmail: ${order.email}`,
          });
        }
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "content-type": "application/json", "strict-transport-security": HSTS },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    if (request.method === "OPTIONS")
      return new Response(null, {
        headers: { ...corsHeaders(origin), "strict-transport-security": HSTS },
      });
    const path = new URL(request.url).pathname;
    if (request.method === "GET" && path === "/api/healthz")
      return json({ status: "ok" }, 200, origin);
    if (request.method === "POST" && path === "/api/stripe/webhook")
      return await handleStripeWebhook(request, env);

    try {
      if (request.method === "POST" && path === "/api/contact")
        return await handleContact(request, env, origin);
      if (request.method === "POST" && path === "/api/quotes/email")
        return await handleQuote(request, env, origin);
      if (request.method === "POST" && path === "/api/lead-magnet")
        return await handleLeadMagnet(request, env, origin);
      if (request.method === "POST" && path === "/api/waitlist")
        return await handleWaitlist(request, env, origin);
      if (request.method === "POST" && path === "/api/checkout/custom")
        return await handleCheckoutCustom(request, env, origin);
      return json({ error: "Not found." }, 404, origin);
    } catch {
      return json({ error: "Unable to process the request." }, 500, origin);
    }
  },

  async scheduled(_event: unknown, env: Env): Promise<void> {
    await runLeadFollowUps(env);
  },
};
