// Cloudflare Pages advanced-mode worker.
// API requests are proxied to the Replit autoscale backend.
// Static assets and SPA fallback are handled via env.ASSETS.

import { connect } from "cloudflare:sockets";

const API_ORIGIN = "https://attached-assets-1-sproutspunk.replit.app";
const CONTACT_MAX_BODY_BYTES = 12_000;
const CONTACT_RECIPIENT = "hello@forsadesign.co.uk";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

async function sendViaProton(env, mail) {
  const host = (env.PROTON_SMTP_HOST || "smtp.protonmail.ch").trim();
  const port = parseInt((env.PROTON_SMTP_PORT || "465").trim(), 10) || 465;
  const user = env.PROTON_SMTP_USER;
  const pass = env.PROTON_SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP service is not configured");
  }

  const socket = connect({ hostname: host, port }, { secureTransport: "on", allowHalfOpen: false });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  async function readMore() {
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("SMTP connection timed out")), 20000);
    });
    try {
      const result = await Promise.race([reader.read(), timeout]);
      if (result.done) throw new Error("SMTP connection closed unexpectedly");
      buffer += decoder.decode(result.value, { stream: true });
    } finally {
      clearTimeout(timer);
    }
  }

  async function expect(code) {
    for (;;) {
      if (buffer.endsWith("\r\n")) {
        const lines = buffer.split("\r\n").filter(Boolean);
        const last = lines[lines.length - 1];
        if (last && /^\d{3}/.test(last) && last.charAt(3) !== "-") {
          if (last.startsWith(code)) return;
          throw new Error(`SMTP rejected request: ${last.slice(0, 120)}`);
        }
      }
      await readMore();
    }
  }

  async function send(line) {
    buffer = "";
    await writer.write(encoder.encode(`${line}\r\n`));
  }

  try {
    await expect("220");
    await send(`EHLO ${host}`);
    await expect("250");
    await send("AUTH LOGIN");
    await expect("334");
    await send(btoa(user));
    await expect("334");
    await send(btoa(pass));
    await expect("235");
    await send(`MAIL FROM:<${mail.from}>`);
    await expect("250");
    await send(`RCPT TO:<${mail.to}>`);
    await expect("250");
    await send("DATA");
    await expect("354");

    const escapedBody = mail.text
      .split("\n")
      .map((line) => (line.startsWith(".") ? `.${line}` : line))
      .join("\r\n");
    const headers = [
      `From: ${mail.from}`,
      `To: ${mail.to}`,
      `Reply-To: ${mail.replyTo}`,
      `Subject: ${mail.subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
    ];
    await send([...headers, "", escapedBody, "."].join("\r\n"));
    await expect("250");
    await send("QUIT");
  } finally {
    try {
      socket.close();
    } catch {
      // The socket may already be closed by the SMTP server.
    }
  }
}

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > CONTACT_MAX_BODY_BYTES) return json({ error: "Request too large" }, 413);

  const form = await request.formData();
  if (form.get("_gotcha")) return json({ ok: true });
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const token = String(form.get("cf-turnstile-response") || "").trim();
  const language = form.get("language") === "pl" ? "pl" : "en";

  if (!name || !email || !message || !token)
    return json({ error: "Please complete all fields." }, 400);
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return json({ error: "Submitted data is too long." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "Invalid email address." }, 400);
  if (!env.TURNSTILE_SECRET_KEY || !env.PROTON_SMTP_USER || !env.PROTON_SMTP_PASS) {
    return json({ error: "Contact service is not configured." }, 503);
  }

  const turnstileResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get("CF-Connecting-IP"),
    }),
  });
  const turnstile = await turnstileResponse.json();
  if (!turnstile.success) return json({ error: "Security verification failed." }, 400);

  const safeName = name.replace(/[\r\n]/g, " ");
  const subject =
    language === "pl" ? `Nowa wiadomość od ${safeName}` : `New enquiry from ${safeName}`;
  await sendViaProton(env, {
    from: CONTACT_RECIPIENT,
    to: CONTACT_RECIPIENT,
    replyTo: email,
    subject,
    text: `Name: ${escapeHtml(name)}\nEmail: ${email}\n\n${escapeHtml(message)}`,
  });
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      try {
        return await handleContact(request, env);
      } catch (error) {
        console.error(
          "Contact delivery failed:",
          error instanceof Error ? error.message : String(error),
        );
        return json({ error: "Message delivery failed." }, 500);
      }
    }

    // Proxy ALL /api/** requests to the Replit backend.
    // fetch(request) on the same origin loops back through this worker (error 1019),
    // so we rewrite the URL to the stable Replit deployment URL.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const targetUrl = new URL(url.pathname + url.search, API_ORIGIN);
      const proxied = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "follow",
      });
      return fetch(proxied);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (
      assetResponse.status === 404 &&
      request.method === "GET" &&
      !url.pathname.includes(".") &&
      (request.headers.get("Accept") || "").includes("text/html")
    ) {
      const routeIndex = new URL(`${url.pathname.replace(/\/$/, "")}/index.html`, url.origin);
      const prerenderedResponse = await env.ASSETS.fetch(new Request(routeIndex, request));
      if (prerenderedResponse.status !== 404) {
        return prerenderedResponse;
      }
      return env.ASSETS.fetch(new Request(new URL("/", url.origin), request));
    }
    return assetResponse;
  },
};
