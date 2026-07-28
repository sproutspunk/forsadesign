// Cloudflare Pages advanced-mode worker.
// API requests are forwarded to the origin server (Replit API service).
// Static assets and SPA fallback are handled via env.ASSETS.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Forward ALL /api/** requests to the origin server unchanged.
    // Using fetch() instead of env.ASSETS bypasses the edge cache and
    // reaches the Replit API artifact at its registered /api path.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return fetch(request);
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
