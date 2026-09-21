// Cloudflare Pages advanced-mode worker.
// All /api/** requests (including the contact form) are proxied to the API
// Worker configured by the API_ORIGIN Worker binding.
// Static assets and SPA fallback are handled via env.ASSETS.

const ALLOWED_ORIGINS = new Set([
  "https://forsadesign.co.uk",
  "https://www.forsadesign.co.uk",
  "http://localhost:3000",
]);

function originIsAllowed(origin) {
  return !origin || ALLOWED_ORIGINS.has(origin);
}

function forbiddenOrigin() {
  return new Response(JSON.stringify({ error: "Origin is not allowed." }), {
    status: 403,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function withFreshHtmlHeaders(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("text/html")) return response;

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy API requests to the configured Worker.
    // fetch(request) on the same origin loops back through this worker (error 1019),
    // so we rewrite the URL to the configured external Worker URL.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const origin = request.headers.get("Origin");
      if (!originIsAllowed(origin)) return forbiddenOrigin();
      if (request.method === "OPTIONS") {
        if (!origin) return new Response("Origin is required for preflight.", { status: 403 });
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "content-type",
            Vary: "Origin",
          },
        });
      }
      if (!env.API_ORIGIN) {
        return new Response("API service is not configured.", { status: 503 });
      }
      const targetUrl = new URL(url.pathname + url.search, env.API_ORIGIN);
      // Forward the real visitor IP under a dedicated header so the backend
      // can key rate limits and Turnstile on it. Overwrite (never trust) any
      // client-supplied value.
      const headers = new Headers(request.headers);
      headers.delete("x-real-client-ip");
      const clientIp = request.headers.get("CF-Connecting-IP");
      if (clientIp) headers.set("x-real-client-ip", clientIp);
      const proxied = new Request(targetUrl, {
        method: request.method,
        headers,
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
        return withFreshHtmlHeaders(prerenderedResponse);
      }
      return withFreshHtmlHeaders(
        await env.ASSETS.fetch(new Request(new URL("/", url.origin), request)),
      );
    }
    return withFreshHtmlHeaders(assetResponse);
  },
};
