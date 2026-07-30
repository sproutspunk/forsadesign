// Cloudflare Pages advanced-mode worker.
// All /api/** requests (including the contact form) are proxied to the Replit
// autoscale backend, which verifies Turnstile and delivers mail via Resend.
// Direct SMTP from Cloudflare Workers is not possible: Proton drops
// connections from Cloudflare egress IPs on both 587 (STARTTLS) and 465.
// Static assets and SPA fallback are handled via env.ASSETS.

const API_ORIGIN = "https://attached-assets-1-sproutspunk.replit.app";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy ALL /api/** requests to the Replit backend.
    // fetch(request) on the same origin loops back through this worker (error 1019),
    // so we rewrite the URL to the stable Replit deployment URL.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      const targetUrl = new URL(url.pathname + url.search, API_ORIGIN);
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
        return prerenderedResponse;
      }
      return env.ASSETS.fetch(new Request(new URL("/", url.origin), request));
    }
    return assetResponse;
  },
};
