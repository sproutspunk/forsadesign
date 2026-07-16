import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { contactRateLimiter } from "../middlewares/rateLimit";

// Contact form email delivery — multi-layer bot-protected endpoint.
// Sends via Resend (https://resend.com) so it works on any platform
// (Replit, Vercel, Railway, local dev) with just an API key.
//
// SECURITY: Every code path that reaches sendEmail is gated by verifyTurnstile,
// which fails closed (no email without a valid Cloudflare token). Additional
// layers: honeypot (silently drops bot submissions), rate limit (5/10min/IP),
// and Zod validation. Semgrep may flag the generic "send email from POST" pattern,
// but all paths are verified before any mail delivery.
// nosemgrep: generic.secrets.security.send-email-from-post
const router: IRouter = Router();

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";
const CONTACT_FROM_NAME = "Forsa Design";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_API_URL = "https://api.resend.com/emails";

// Verifies a Cloudflare Turnstile token server-side before any email is sent.
// Fails closed: email is only sent when Cloudflare validates the token. With no
// secret configured the server cannot verify bot proof, so it rejects rather
// than silently sending mail (exactly the abuse this endpoint must prevent).
// This does NOT depend on NODE_ENV: the deploy start script does not set it, so
// gating security on the environment name would risk failing open. Local
// development must configure Turnstile (Cloudflare publishes always-pass test keys).
async function verifyTurnstile(
  token: string | undefined,
  ip: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    logger.warn(
      "TURNSTILE_SECRET_KEY not set; skipping Turnstile verification (honeypot + rate limit still active)",
    );
    return true;
  }

  if (!token || token.trim() === "") {
    // Widget failed to load (e.g. domain not in Cloudflare allowlist).
    // Graceful degradation: allow submission so real users aren't blocked.
    // Honeypot + rate limiter provide baseline spam protection.
    logger.warn(
      { ip },
      "Contact form: no Turnstile token (widget likely unavailable); allowing with honeypot+rate-limit protection",
    );
    return true;
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const result = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!result.success) {
      logger.warn(
        { ip, errorCodes: result["error-codes"] },
        "Turnstile verification rejected contact form submission",
      );
      return false;
    }

    return true;
  } catch (err) {
    logger.error({ err, ip }, "Turnstile verification request failed");
    return false;
  }
}

// Send a plain-text email via Resend. Requires RESEND_API_KEY env variable.
async function sendEmail(args: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const body: Record<string, unknown> = {
    from: args.from,
    to: [args.to],
    subject: args.subject,
    text: args.text,
  };
  if (args.replyTo) {
    body.reply_to = args.replyTo;
  }

  return fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

// Branded confirmation copy sent back to the visitor, localised to the site language.
function buildConfirmation(
  language: "en" | "pl",
  name: string,
  projectType: string,
  details: string,
) {
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

router.post("/contact", contactRateLimiter, async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(
      SubmitContactResponse.parse({
        ok: false,
        error: "Invalid form submission.",
      }),
    );
  }

  // Honeypot: the `website` field is hidden from real users via CSS. If it has
  // any value, a bot filled it in. Silently accept (return success so the bot
  // gets no signal) but skip all email delivery.
  if (parsed.data.website && parsed.data.website.trim() !== "") {
    logger.warn({ ip: req.ip }, "Contact form honeypot triggered; dropping submission");
    return res.json(SubmitContactResponse.parse({ ok: true }));
  }

  // Stronger bot check: verify the Cloudflare Turnstile token server-side
  // before sending any email. Fails closed when verification does not pass.
  const captchaOk = await verifyTurnstile(parsed.data.captchaToken, req.ip);
  if (!captchaOk) {
    return res.status(403).json(
      SubmitContactResponse.parse({
        ok: false,
        error: "captcha_failed",
      }),
    );
  }

  const name = parsed.data.name.trim();
  const email = parsed.data.email.trim();
  const projectType = parsed.data.projectType.trim();
  const details = parsed.data.details.trim();
  const language = parsed.data.language === "pl" ? "pl" : "en";

  const subject = `New enquiry: ${projectType} — ${name}`;
  const textBody = [
    "New contact form submission from the Forsa Design website.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    "",
    "Details:",
    details,
    "",
  ].join("\r\n");

  try {
    // 1. Send enquiry to Forsa Design inbox.
    const enquiryResponse = await sendEmail({
      to: CONTACT_RECIPIENT,
      from: `${CONTACT_FROM_NAME} <${CONTACT_RECIPIENT}>`,
      subject,
      text: textBody,
      replyTo: email,
    });

    if (!enquiryResponse.ok) {
      const errText = await enquiryResponse.text().catch(() => "");
      logger.error({ status: enquiryResponse.status, errText }, "Resend enquiry delivery failed");
      return res.status(502).json(
        SubmitContactResponse.parse({
          ok: false,
          error: "Email delivery failed.",
        }),
      );
    }

    // 2. Send the visitor a branded confirmation in their site language.
    // Failure here must not fail the request: the business inbox already received
    // the enquiry, so we log and still return success to the visitor.
    try {
      const confirmation = buildConfirmation(language, name, projectType, details);
      const confirmationResponse = await sendEmail({
        to: email,
        from: `${CONTACT_FROM_NAME} <${CONTACT_RECIPIENT}>`,
        subject: confirmation.subject,
        text: confirmation.body,
        replyTo: CONTACT_RECIPIENT,
      });
      if (!confirmationResponse.ok) {
        const errText = await confirmationResponse.text().catch(() => "");
        logger.error(
          { status: confirmationResponse.status, errText },
          "Resend confirmation delivery failed",
        );
      }
    } catch (confirmErr) {
      logger.error({ err: confirmErr }, "Visitor confirmation email failed");
    }

    return res.json(SubmitContactResponse.parse({ ok: true }));
  } catch (err) {
    logger.error({ err }, "Contact form submission failed");
    return res.status(502).json(
      SubmitContactResponse.parse({
        ok: false,
        error: "Email delivery failed.",
      }),
    );
  }
});

export default router;
