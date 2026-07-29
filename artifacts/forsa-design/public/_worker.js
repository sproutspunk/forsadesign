// Cloudflare Pages advanced-mode worker.
// API requests are proxied to the Replit autoscale backend.
// Static assets and SPA fallback are handled via env.ASSETS.

const API_ORIGIN = "https://attached-assets-1-sproutspunk.replit.app";
const CONTACT_MAX_BODY_BYTES = 12_000;

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
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) {
    return json({ error: "Contact service is not configured." }, 503);
  }

  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP"),
      }),
    },
  );
  const turnstile = await turnstileResponse.json();
  if (!turnstile.success) return json({ error: "Security verification failed." }, 400);

  const subject = language === "pl" ? `Nowa wiadomość od ${name}` : `New enquiry from ${name}`;
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>`;
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Forsa Design <hello@forsadesign.co.uk>",
      to: ["hello@forsadesign.co.uk"],
      reply_to: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    }),
  });
  if (!resendResponse.ok) return json({ error: "Message delivery failed." }, 502);
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      try {
        return await handleContact(request, env);
      } catch {
        return json({ error: "Unable to process the request." }, 500);
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
