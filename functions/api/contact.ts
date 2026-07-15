interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  /** Verified sender address in Resend — must match your domain. Defaults to hello@forsadesign.co.uk */
  RESEND_FROM_EMAIL?: string;
}

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";
const CONTACT_FROM_NAME = "Forsa Design";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_SEND_URL = "https://api.resend.com/emails";

// ---------------------------------------------------------------------------
// Validation (mirrors @workspace/api-zod SubmitContactBody without zod)
// ---------------------------------------------------------------------------

interface ContactBody {
  name: string;
  email: string;
  projectType: string;
  details: string;
  language?: "en" | "pl";
  /** Honeypot — hidden field; submissions with a value are silently dropped. */
  website?: string;
  /** Cloudflare Turnstile token — required and verified server-side. */
  captchaToken: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseBody(raw: unknown): ContactBody | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;

  const name = typeof b["name"] === "string" ? b["name"].trim() : "";
  const email = typeof b["email"] === "string" ? b["email"].trim() : "";
  const projectType = typeof b["projectType"] === "string" ? b["projectType"].trim() : "";
  const details = typeof b["details"] === "string" ? b["details"].trim() : "";
  const captchaToken = typeof b["captchaToken"] === "string" ? b["captchaToken"] : "";
  const website = typeof b["website"] === "string" ? b["website"] : undefined;
  const rawLang = b["language"];
  const language: "en" | "pl" | undefined =
    rawLang === "en" || rawLang === "pl" ? rawLang : undefined;

  if (!name || !email || !projectType || !details || !captchaToken) return null;
  if (!isValidEmail(email)) return null;

  return { name, email, projectType, details, captchaToken, website, language };
}

// ---------------------------------------------------------------------------
// Turnstile verification
// ---------------------------------------------------------------------------

async function verifyTurnstile(
  secret: string,
  token: string,
  ip: string | null,
): Promise<boolean> {
  if (!token.trim()) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const result = (await response.json()) as { success: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Email delivery via Resend
// ---------------------------------------------------------------------------

async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  replyTo: string | undefined,
  subject: string,
  text: string,
): Promise<boolean> {
  const payload: Record<string, unknown> = { from, to: [to], subject, text };
  if (replyTo) payload["reply_to"] = replyTo;

  try {
    const response = await fetch(RESEND_SEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch {
    return false;
  }
}

function buildConfirmation(
  language: "en" | "pl",
  name: string,
  projectType: string,
  details: string,
): { subject: string; body: string } {
  if (language === "pl") {
    return {
      subject: "Dziękujemy za kontakt — Forsa Design",
      body: [
        `Cześć ${name},`,
        "",
        "Dziękujemy za wiadomość do Forsa Design. Otrzymaliśmy Twoje zgłoszenie i wkrótce się odezwiemy.",
        "",
        "Oto kopia tego, co przesłałeś/aś:",
        `Typ projektu: ${projectType}`,
        "Szczegóły:",
        details,
        "",
        "Pozdrawiamy,",
        "Zespół Forsa Design",
        "hello@forsadesign.co.uk",
      ].join("\r\n"),
    };
  }

  return {
    subject: "Thanks for getting in touch — Forsa Design",
    body: [
      `Hi ${name},`,
      "",
      "Thanks for reaching out to Forsa Design. We've received your message and will get back to you soon.",
      "",
      "Here's a copy of what you sent:",
      `Project type: ${projectType}`,
      "Details:",
      details,
      "",
      "Best regards,",
      "The Forsa Design Team",
      "hello@forsadesign.co.uk",
    ].join("\r\n"),
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  const body = parseBody(rawBody);
  if (!body) {
    return Response.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Honeypot: hidden field filled only by bots — silently accept without sending mail.
  if (body.website && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  // Turnstile verification — fails closed when secret is missing.
  if (!env.TURNSTILE_SECRET_KEY) {
    return Response.json({ ok: false, error: "captcha_failed" }, { status: 403 });
  }

  const ip = request.headers.get("CF-Connecting-IP");
  const captchaOk = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, body.captchaToken, ip);
  if (!captchaOk) {
    return Response.json({ ok: false, error: "captcha_failed" }, { status: 403 });
  }

  if (!env.RESEND_API_KEY) {
    return Response.json({ ok: false, error: "Email delivery failed." }, { status: 502 });
  }

  const fromEmail = env.RESEND_FROM_EMAIL ?? CONTACT_RECIPIENT;
  const from = `${CONTACT_FROM_NAME} <${fromEmail}>`;

  const subject = `New enquiry: ${body.projectType} — ${body.name}`;
  const textBody = [
    "New contact form submission from the Forsa Design website.",
    "",
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Project type: ${body.projectType}`,
    "",
    "Details:",
    body.details,
    "",
  ].join("\r\n");

  const sent = await sendEmail(
    env.RESEND_API_KEY,
    from,
    CONTACT_RECIPIENT,
    body.email,
    subject,
    textBody,
  );

  if (!sent) {
    return Response.json({ ok: false, error: "Email delivery failed." }, { status: 502 });
  }

  // Send visitor confirmation — failure must not fail the request.
  const lang = body.language ?? "en";
  const confirmation = buildConfirmation(lang, body.name, body.projectType, body.details);
  await sendEmail(
    env.RESEND_API_KEY,
    from,
    body.email,
    CONTACT_RECIPIENT,
    confirmation.subject,
    confirmation.body,
  ).catch(() => {});

  return Response.json({ ok: true });
};
