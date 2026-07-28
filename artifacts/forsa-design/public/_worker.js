// Cloudflare Pages advanced-mode worker.
// The site has no server-side submission endpoints; all routes are static assets.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api") {
      return new Response(JSON.stringify({ status: "ok", service: "forsa-design-api", endpoints: [] }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    if (url.pathname === "/api/healthz") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
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