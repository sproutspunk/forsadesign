// Cloudflare Pages advanced-mode worker.
// API requests are proxied to the Replit autoscale backend.
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
