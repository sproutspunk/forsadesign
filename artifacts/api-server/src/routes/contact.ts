import { Router, type IRouter } from "express";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { contactRateLimiter } from "../middlewares/rateLimit";
import { sendViaProton } from "../lib/smtp";

// Contact form email delivery — bot-protected endpoint.
// Sends via Proton Mail SMTP so you keep full control of your email.
//
// Bot protection layers: honeypot (silently drops bot submissions),
// rate limit (5/10min/IP), and Zod validation.
// nosemgrep: generic.secrets.security.send-email-from-post
const router: IRouter = Router();

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";

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
    // 1. Send enquiry to Forsa Design inbox via Proton Mail.
    await sendViaProton({
      from: CONTACT_RECIPIENT,
      to: CONTACT_RECIPIENT,
      subject,
      text: textBody,
      replyTo: email,
    });

    // 2. Send the visitor a branded confirmation in their site language.
    // Failure here must not fail the request: the business inbox already received
    // the enquiry, so we log and still return success to the visitor.
    try {
      const confirmation = buildConfirmation(language, name, projectType, details);
      await sendViaProton({
        from: CONTACT_RECIPIENT,
        to: email,
        subject: confirmation.subject,
        text: confirmation.body,
        replyTo: CONTACT_RECIPIENT,
      });
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
