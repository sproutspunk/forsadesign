import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";

const router: IRouter = Router();
const OWNER_EMAIL = "hello@forsadesign.co.uk";
const CONTACT_MAX_BODY_BYTES = 12_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact requests. Please try again later." },
});

const escapeHtml = (value: string) =>
  value.replace(
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

router.post("/contact", contactLimiter, async (req, res) => {
  const bodySize = Number(req.headers["content-length"] ?? 0);
  if (bodySize > CONTACT_MAX_BODY_BYTES) {
    res.status(413).json({ error: "Request too large." });
    return;
  }

  const { name, email, message, token, language } = {
    name: typeof req.body?.name === "string" ? req.body.name.trim() : "",
    email: typeof req.body?.email === "string" ? req.body.email.trim() : "",
    message: typeof req.body?.message === "string" ? req.body.message.trim() : "",
    token:
      typeof req.body?.["cf-turnstile-response"] === "string"
        ? req.body["cf-turnstile-response"].trim()
        : "",
    language: req.body?.language === "pl" ? "pl" : "en",
  };

  if (req.body?._gotcha) {
    res.json({ ok: true });
    return;
  }
  if (!name || !email || !message || !token) {
    res.status(400).json({ error: "Please complete all fields." });
    return;
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    res.status(400).json({ error: "Submitted data is too long." });
    return;
  }
  if (!emailPattern.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  const turnstileSecret = process.env["TURNSTILE_SECRET_KEY"];
  const resendApiKey = process.env["RESEND_API_KEY"];
  if (!turnstileSecret || !resendApiKey) {
    res.status(503).json({ error: "Contact service is not configured." });
    return;
  }

  try {
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: token,
          remoteip: req.ip,
        }),
      },
    );
    const turnstile = (await turnstileResponse.json()) as { success?: boolean };
    if (!turnstile.success) {
      res.status(400).json({ error: "Security verification failed." });
      return;
    }

    const subject = language === "pl" ? `Nowa wiadomość od ${name}` : `New enquiry from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Forsa Design <hello@forsadesign.co.uk>",
        to: [OWNER_EMAIL],
        reply_to: email,
        subject,
        text,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>`,
      }),
    });
    if (!resendResponse.ok) {
      res.status(502).json({ error: "Message delivery failed." });
      return;
    }

    res.json({ ok: true });
  } catch (error) {
    req.log?.error({ err: error }, "Contact message delivery failed");
    res.status(500).json({ error: "Unable to process the request." });
  }
});

export default router;
