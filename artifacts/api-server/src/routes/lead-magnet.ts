import { Router, type IRouter } from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { realClientIp } from "./contact";

const router: IRouter = Router();
const OWNER_EMAIL = "hello@forsadesign.co.uk";
const FROM = "Forsa Design <hello@forsadesign.co.uk>";
const CHECKLIST_URL = "https://forsadesign.co.uk/audit-checklist.pdf";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const leadMagnetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(realClientIp(req)),
  message: { error: "Too many requests. Please try again later." },
});

async function sendViaResend(apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  return response.ok;
}

router.post("/lead-magnet", leadMagnetLimiter, async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const company =
    typeof req.body?.company === "string" ? req.body.company.trim().slice(0, 200) : "";
  const language = req.body?.language === "pl" ? "pl" : "en";

  if (!email || !emailPattern.test(email) || email.length > 320) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }

  const resendApiKey = process.env["RESEND_API_KEY"];
  if (!resendApiKey) {
    res.status(503).json({ error: "Email service is not configured." });
    return;
  }

  const content =
    language === "pl"
      ? {
          subject: "Twoja checklista audytu strony - Forsa Design",
          text: `Czesc,\n\nDzieki za pobranie checklisty. Oto Twoj PDF:\n${CHECKLIST_URL}\n\nJesli Twoja strona zdobyla ponizej 7 punktow, odpowiedz na tego maila - nagram 2-minutowy audyt wideo Twojej obecnej strony, bez oplat.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`,
        }
      : {
          subject: "Your Procurement Website Audit Checklist - Forsa Design",
          text: `Hi,\n\nThanks for downloading the checklist. Here's your PDF:\n${CHECKLIST_URL}\n\nIf your site scores below 7, reply to this email - I'll send a 2-minute video audit of your current site, no charge.\n\nMiro\nForsa Design\nhello@forsadesign.co.uk`,
        };

  try {
    const delivered = await sendViaResend(resendApiKey, {
      from: FROM,
      to: [email],
      reply_to: OWNER_EMAIL,
      subject: content.subject,
      text: content.text,
    });
    if (!delivered) {
      res.status(502).json({ error: "We could not send the checklist. Please try again." });
      return;
    }

    await sendViaResend(resendApiKey, {
      from: FROM,
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: `New lead magnet download: ${email}`,
      text: `Email: ${email}\nCompany: ${company || "N/A"}\nLanguage: ${language}\nTime: ${new Date().toISOString()}`,
    });

    res.json({ ok: true });
  } catch (error) {
    req.log?.error({ err: error }, "Lead magnet delivery failed");
    res.status(500).json({ error: "Unable to process the request." });
  }
});

export default router;
