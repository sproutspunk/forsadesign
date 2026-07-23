// Cloudflare Pages advanced-mode worker (_worker.js).
// Handles POST /api/contact directly on Cloudflare (free tier) and serves all
// other requests as static assets. This removes the need for any separate
// backend hosting: the contact form emails go out via Proton Mail SMTP using
// Cloudflare's TCP sockets API.
//
// Required environment variables (Cloudflare Pages -> Settings -> Environment variables):
//   PROTON_SMTP_USER     hello@forsadesign.co.uk
//   PROTON_SMTP_PASS     SMTP token from Proton Mail settings
// Optional:
//   PROTON_SMTP_HOST     defaults to smtp.protonmail.ch
//   PROTON_SMTP_PORT     defaults to 465

import { connect } from "cloudflare:sockets";

const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";
// Captcha removed — form protected by honeypot only.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// RFC 2047 encoded-word for non-ASCII header values (e.g. Polish subjects).
function encodeHeaderWord(value) {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  const bytes = new TextEncoder().encode(value);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return `=?UTF-8?B?${btoa(bin)}?=`;
}

// Minimal SMTP client over Cloudflare TCP sockets using STARTTLS on port 587.
// Plain TCP first, upgrades to TLS after server confirms readiness.
// Implicit TLS (port 465) causes "connection closed before 220" on CF Workers.
async function sendViaProton(env, mail) {
  const host = (env.PROTON_SMTP_HOST || "smtp.protonmail.ch").trim();
  const port = parseInt((env.PROTON_SMTP_PORT || "587").trim(), 10) || 587;
  const user = (env.PROTON_SMTP_USER || "").trim();
  const pass = (env.PROTON_SMTP_PASS || "").trim();

  if (!user || !pass) {
    throw new Error("PROTON_SMTP_USER and PROTON_SMTP_PASS must be set");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // STARTTLS: start plain, upgrade after server confirms readiness.
  const socket = connect(
    { hostname: host, port },
    { secureTransport: "starttls", allowHalfOpen: true },
  );

  let incoming = "";
  let readerDone = false;
  let activeWriter = socket.writable.getWriter();

  // Drain a readable stream into `incoming` until it ends.
  function startReadLoop(readable) {
    return (async () => {
      readerDone = false;
      const reader = readable.getReader();
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) {
            readerDone = true;
            break;
          }
          incoming += decoder.decode(value, { stream: true });
        }
      } catch {
        readerDone = true;
      }
    })();
  }

  let readLoop = startReadLoop(socket.readable);

  async function waitFor(code, timeoutMs = 20000) {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const lines = incoming.split("\r\n");
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        if (!line) continue;
        if (/^\d{3}[- ]/.test(line) && line.charAt(3) === " ") {
          if (line.startsWith(code)) return;
          throw new Error(`SMTP unexpected response: ${line.slice(0, 120)}`);
        }
        break;
      }
      if (readerDone) throw new Error("SMTP connection closed before receiving " + code);
      if (Date.now() > deadline) throw new Error("SMTP timeout waiting for " + code);
      await new Promise((r) => setTimeout(r, 25));
    }
  }

  async function send(line) {
    incoming = "";
    await activeWriter.write(encoder.encode(line + "\r\n"));
  }

  try {
    // Plain-text greeting before TLS upgrade.
    await waitFor("220");
    await send("EHLO forsadesign.co.uk");
    await waitFor("250");

    // Request TLS upgrade.
    await send("STARTTLS");
    await waitFor("220");

    // Release the plain-text writer, then upgrade the socket to TLS.
    activeWriter.releaseLock();
    const secureSocket = socket.startTls();

    // Switch the read loop to the now-encrypted stream.
    incoming = "";
    readLoop = startReadLoop(secureSocket.readable);
    activeWriter = secureSocket.writable.getWriter();

    // Re-greet over TLS (required by RFC 3207).
    await send("EHLO forsadesign.co.uk");
    await waitFor("250");

    // Authenticate.
    await send("AUTH LOGIN");
    await waitFor("334");
    await send(btoa(user));
    await waitFor("334");
    await send(btoa(pass));
    await waitFor("235");

    // Envelope.
    await send(`MAIL FROM:<${mail.from}>`);
    await waitFor("250");
    await send(`RCPT TO:<${mail.to}>`);
    await waitFor("250");
    await send("DATA");
    await waitFor("354");

    // Headers + body.
    const headers = [
      `From: Forsa Design <${mail.from}>`,
      `To: ${mail.to}`,
      `Subject: ${encodeHeaderWord(mail.subject)}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
    ];
    if (mail.replyTo) headers.push(`Reply-To: ${mail.replyTo}`);

    // SMTP dot-stuffing: escape lines starting with ".".
    const escapedBody = mail.text
      .split("\n")
      .map((l) => (l.startsWith(".") ? "." + l : l))
      .join("\r\n");

    await send([...headers, "", escapedBody, "."].join("\r\n"));
    await waitFor("250");

    // Graceful close.
    incoming = "";
    await activeWriter.write(encoder.encode("QUIT\r\n"));
    await activeWriter.close().catch(() => {});
    await waitFor("221", 5000).catch(() => {});
  } finally {
    await readLoop.catch(() => {});
    try {
      socket.close();
    } catch {
      /* already closed */
    }
  }
}

// Branded confirmation copy sent back to the visitor, localised to the site language.
function buildConfirmation(language, name, projectType, details) {
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
      ].join("\n"),
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
    ].join("\n"),
  };
}

async function handleContact(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid form submission." }, 400);
  }

  const str = (v) => (typeof v === "string" ? v : "");
  const name = str(data.name).trim();
  const email = str(data.email).trim();
  const projectType = str(data.projectType).trim();
  const details = str(data.details).trim();
  const website = str(data.website).trim();
  const language = data.language === "pl" ? "pl" : "en";

  // Mirrors the SubmitContactBody zod schema used by the dev API server.
  if (
    !name ||
    name.length > 200 ||
    !email ||
    email.length > 320 ||
    !EMAIL_REGEX.test(email) ||
    !projectType ||
    projectType.length > 200 ||
    !details ||
    details.length > 10000
  ) {
    return json({ ok: false, error: "Invalid form submission." }, 400);
  }

  // Honeypot: hidden field only bots fill in. Silently accept, send nothing.
  if (website !== "") {
    return json({ ok: true });
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
  ].join("\n");

  try {
    // 1. Send the enquiry to the Forsa Design inbox via Proton Mail.
    await sendViaProton(env, {
      from: CONTACT_RECIPIENT,
      to: CONTACT_RECIPIENT,
      subject,
      text: textBody,
      replyTo: email,
    });
  } catch (err) {
    const detail = err && err.message ? err.message : String(err);
    console.error("Contact form email failed:", detail);
    // 500 (not 502): Cloudflare masks 502/504 from the origin with its own
    // error page on proxied custom domains, hiding this JSON body.
    return json({ ok: false, error: "Email delivery failed.", detail }, 500);
  }

  // 2. Visitor confirmation. Failure here must not fail the request: the
  // business inbox already received the enquiry.
  try {
    const confirmation = buildConfirmation(language, name, projectType, details);
    await sendViaProton(env, {
      from: CONTACT_RECIPIENT,
      to: email,
      subject: confirmation.subject,
      text: confirmation.body,
      replyTo: CONTACT_RECIPIENT,
    });
  } catch (err) {
    console.error("Visitor confirmation email failed:", err && err.message ? err.message : err);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/api/contact") {
      if (request.method === "POST") {
        try {
          return await handleContact(request, env);
        } catch (err) {
          const detail = err && err.message ? err.message : String(err);
          console.error("Contact handler crashed:", detail);
          return json({ ok: false, error: "Email delivery failed.", detail }, 500);
        }
      }
      return json({ ok: false, error: "Method not allowed." }, 405);
    }

    if (path === "/api") {
      return json({ status: "ok", service: "forsa-design-api", endpoints: ["/api/contact"] });
    }

    if (path === "/api/healthz") {
      // Config presence flags (booleans only, never values) to diagnose
      // production issues without dashboard access.
      return json({
        status: "ok",
        smtpUser: Boolean(env.PROTON_SMTP_USER),
        smtpPass: Boolean(env.PROTON_SMTP_PASS),
        socketsAvailable: typeof connect === "function",
      });
    }

    // Legacy duplicate paths — 301 permanent redirects to canonical localised URLs.
    if (path === "/terms") {
      return Response.redirect(new URL("/en/terms", url.origin), 301);
    }
    if (path === "/privacy") {
      return Response.redirect(new URL("/en/privacy", url.origin), 301);
    }

    // Everything else: serve the static site. SPA fallback for client-side
    // routes (no file extension) when the asset is missing.
    const assetResponse = await env.ASSETS.fetch(request);
    if (
      assetResponse.status === 404 &&
      request.method === "GET" &&
      !url.pathname.includes(".") &&
      (request.headers.get("Accept") || "").includes("text/html")
    ) {
      return env.ASSETS.fetch(new Request(new URL("/", url.origin), request));
    }
    return assetResponse;
  },
};
