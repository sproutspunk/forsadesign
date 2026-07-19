// Cloudflare Pages advanced-mode worker (_worker.js).
// Serves the static site and proxies POST /api/contact + GET /api/healthz to
// the Replit-hosted API server, which sends email via Proton Mail SMTP.
//
// Why proxy instead of talking to Proton directly from here: Proton Mail
// blocks Cloudflare's TCP egress ranges at the network level, so a Cloudflare
// Worker can never complete an SMTP handshake with smtp.protonmail.ch,
// regardless of how the socket code is written. Replit's egress IPs are not
// blocked, so the Replit-hosted @workspace/api-server (artifacts/api-server)
// keeps doing the actual SMTP send via artifacts/api-server/src/lib/smtp.ts.
// This worker's job is now just: forward the contact form POST to Replit,
// and relay its JSON response back to the browser.
//
// Required environment variable (Cloudflare Pages -> Settings -> Environment
// variables):
//   REPLIT_API_URL   Base URL of the deployed api-server, e.g.
//                     https://api-server.<your-repl-slug>.replit.app
//                     (no trailing slash; must have "Always On" / a Reserved
//                     VM deployment enabled on Replit so it can accept
//                     webhooks at any time, not just while the dev preview is
//                     open).

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// Forwards a request to the Replit API server and relays its JSON response
// back verbatim (status code included), so validation/rate-limiting/error
// messages produced by the backend reach the browser unchanged.
async function proxyToReplit(env, path, init) {
  const base = (env.REPLIT_API_URL || "").trim().replace(/\/+$/, "");
  if (!base) {
    return json(
      { ok: false, error: "REPLIT_API_URL is not configured on this deployment." },
      500,
    );
  }

  let upstream;
  try {
    upstream = await fetch(`${base}${path}`, {
      ...init,
      // Replit's "Always On"/Reserved VM deployments are always awake, but if
      // it's ever asleep or unreachable we should fail fast rather than hang
      // the visitor's browser tab.
      signal: AbortSignal.timeout(20000),
    });
  } catch (err) {
    const detail = err && err.message ? err.message : String(err);
    console.error("Failed to reach Replit API server:", detail);
    return json({ ok: false, error: "Email delivery service unavailable.", detail }, 502);
  }

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json; charset=utf-8" },
  });
}

async function handleContact(request, env) {
  const ip = request.headers.get("CF-Connecting-IP");
  const headers = { "Content-Type": "application/json; charset=utf-8" };
  if (ip) headers["X-Forwarded-For"] = ip;

  return proxyToReplit(env, "/api/contact", {
    method: "POST",
    headers,
    body: await request.text(),
  });
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
      return json({
        status: "ok",
        service: "forsa-design-api",
        endpoints: ["/api/contact", "/api/healthz"],
      });
    }

    if (path === "/api/healthz") {
      return proxyToReplit(env, "/api/healthz", { method: "GET" });
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
