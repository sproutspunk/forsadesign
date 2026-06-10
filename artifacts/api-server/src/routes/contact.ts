import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { logger } from "../lib/logger";

// Contact form email delivery.
// Sends submissions from the Forsa Design website to the business inbox using
// the Replit Gmail connector (google-mail) via the @replit/connectors-sdk proxy.
const router: IRouter = Router();

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";

const isNonEmpty = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

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

router.post("/contact", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType =
    typeof body.projectType === "string" ? body.projectType.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  if (
    !isNonEmpty(name) ||
    !isNonEmpty(email) ||
    !isValidEmail(email) ||
    !isNonEmpty(projectType) ||
    !isNonEmpty(details)
  ) {
    return res
      .status(400)
      .json({ ok: false, error: "Invalid form submission." });
  }

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
    const response = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: toBase64Url(mime) }),
      },
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      logger.error(
        { status: response.status, errText },
        "Gmail send failed for contact form",
      );
      return res
        .status(502)
        .json({ ok: false, error: "Email delivery failed." });
    }

    return res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact form submission failed");
    return res.status(500).json({ ok: false, error: "Email delivery failed." });
  }
});

export default router;
