import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const router: IRouter = Router();
const OWNER_EMAIL = "hello@forsadesign.co.uk";
const MAX_PDF_BYTES = 8 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const quoteEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many quote email requests. Please try again later." },
});

function getTransporter() {
  const host = process.env["PROTON_SMTP_HOST"];
  const port = Number(process.env["PROTON_SMTP_PORT"]);
  const user = process.env["PROTON_SMTP_USER"];
  const pass = process.env["PROTON_SMTP_PASS"];

  if (!host || !Number.isInteger(port) || !user || !pass) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

router.post("/quotes/email", quoteEmailLimiter, async (req, res) => {
  const { email, name, phone, pdfBase64, quoteId, projectLabel, total, estimatedWeeks, isEn } =
    req.body ?? {};

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
    res.status(400).json({ error: "A valid email and quote data are required." });
    return;
  }

  const pdf = Buffer.from(pdfBase64, "base64");
  if (pdf.length === 0 || pdf.length > MAX_PDF_BYTES || pdfBase64.length > MAX_PDF_BYTES * 2) {
    res.status(400).json({ error: "The quote PDF is invalid or too large." });
    return;
  }

  try {
    const transporter = getTransporter();
    const subject = isEn ? `Forsa Design quote ${quoteId}` : `Wycena Forsa Design ${quoteId}`;
    const greeting = isEn ? "Thank you for your enquiry." : "Dziekujemy za zapytanie.";
    const body = [
      greeting,
      "",
      ...(name ? [`${isEn ? "Name" : "Imie"}: ${name}`] : []),
      ...(phone ? [`${isEn ? "Phone" : "Telefon"}: ${phone}`] : []),
      ...(name || phone ? [""] : []),
      `${isEn ? "Project" : "Projekt"}: ${projectLabel}`,
      `${isEn ? "Total" : "Razem"}: ${total}`,
      `${isEn ? "Estimated time" : "Szacowany czas"}: ${estimatedWeeks}`,
      "",
      isEn
        ? "Please find your quote attached. We will be in touch shortly."
        : "W zalaczniku znajdziesz wycene. Wkrotce skontaktujemy sie z Toba.",
    ].join("\n");

    const attachment = {
      filename: `forsa-quote-${quoteId}.pdf`,
      content: pdf,
      contentType: "application/pdf",
    };

    await transporter.sendMail({
      from: process.env["PROTON_SMTP_USER"],
      to: email,
      subject,
      text: body,
      attachments: [attachment],
    });

    await transporter.sendMail({
      from: process.env["PROTON_SMTP_USER"],
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `${subject} - copy`,
      text: `${body}\n\nClient email: ${email}`,
      attachments: [attachment],
    });

    res.json({ ok: true });
  } catch (error) {
    req.log?.error({ err: error }, "Quote email delivery failed");
    res.status(502).json({ error: "We could not send the quote email. Please try again." });
  }
});

export default router;
