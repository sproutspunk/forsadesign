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
