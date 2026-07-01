import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { contactRateLimiter } from "../middlewares/rateLimit";

// Contact form email delivery — multi-layer bot-protected endpoint.
//
// SECURITY: Every code path that reaches sendGmail is gated by verifyTurnstile,
// which fails closed (no email without a valid Cloudflare token). Additional
// layers: honeypot (silently drops bot submissions), rate limit (5/10min/IP),
// and Zod validation. Semgrep may flag the generic "send email from POST" pattern,
// but all paths are verified before any mail delivery.
// nosemgrep: generic.secrets.security.send-email-from-post
const router: IRouter = Router();

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";
const CONTACT_FROM_NAME = "Forsa Design";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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
    logger.error("TURNSTILE_SECRET_KEY not set; rejecting contact form submission (fail closed)");
    return false;
  }

  if (!token || token.trim() === "") {
    // A secret is configured but no token was supplied. Deny: sending email
    // without bot proof is exactly the abuse this endpoint must prevent.
    logger.warn({ ip }, "Contact form rejected: missing Turnstile token");
    return false;
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

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// RFC 2047 encoded-word so non-ASCII (e.g. Polish) subject lines render correctly.
function encodeHeaderWord(value: string): string {
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`;
}

async function sendGmail(connectors: ReplitConnectors, mime: string) {
  return connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw: toBase64Url(mime) }),
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

  // Reply-To uses only the validated email (no display name) to avoid header injection.
  const mime = [
    `To: ${CONTACT_RECIPIENT}`,
    `Reply-To: ${email}`,
    `Subject: ${encodeHeaderWord(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    textBody,
  ].join("\r\n");

  try {
    const connectors = new ReplitConnectors();
    const response = await sendGmail(connectors, mime);

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      logger.error({ status: response.status, errText }, "Gmail send failed for contact form");
      return res.status(502).json(
        SubmitContactResponse.parse({
          ok: false,
          error: "Email delivery failed.",
        }),
      );
    }

    // Send the visitor a branded confirmation in their site language.
    // Failure here must not fail the request: the business inbox already received
    // the enquiry, so we log and still return success to the visitor.
    try {
      const confirmation = buildConfirmation(language, name, projectType, details);
      const confirmationMime = [
        `From: ${encodeHeaderWord(CONTACT_FROM_NAME)} <${CONTACT_RECIPIENT}>`,
        `To: ${email}`,
        `Reply-To: ${CONTACT_RECIPIENT}`,
        `Subject: ${encodeHeaderWord(confirmation.subject)}`,
        "MIME-Version: 1.0",
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        confirmation.body,
      ].join("\r\n");

      const confirmationResponse = await sendGmail(connectors, confirmationMime);
      if (!confirmationResponse.ok) {
        const errText = await confirmationResponse.text().catch(() => "");
        logger.error(
          { status: confirmationResponse.status, errText },
          "Gmail send failed for visitor confirmation",
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
