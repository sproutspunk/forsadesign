import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";

// Contact form email delivery.
// Sends submissions from the Forsa Design website to the business inbox using
// the Replit Gmail connector (google-mail) via the @replit/connectors-sdk proxy.
// Request/response shapes are validated against the generated OpenAPI zod schemas.
const router: IRouter = Router();

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";

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
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json(
        SubmitContactResponse.parse({
          ok: false,
          error: "Invalid form submission.",
        }),
      );
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
        .json(
          SubmitContactResponse.parse({
            ok: false,
            error: "Email delivery failed.",
          }),
        );
    }

    return res.json(SubmitContactResponse.parse({ ok: true }));
  } catch (err) {
    logger.error({ err }, "Contact form submission failed");
    return res
      .status(502)
      .json(
        SubmitContactResponse.parse({
          ok: false,
          error: "Email delivery failed.",
        }),
      );
  }
});

export default router;
