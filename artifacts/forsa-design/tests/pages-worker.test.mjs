import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import worker from "../public/_worker.js";

async function serve(path, contentType, status = 200) {
  return worker.fetch(new Request(`https://forsadesign.co.uk${path}`), {
    ASSETS: {
      fetch: async () =>
        new Response("asset", {
          status,
          headers: { "content-type": contentType, "cache-control": "public, max-age=7200" },
        }),
    },
  });
}

test("fingerprinted bundles retain a year-long immutable cache", async () => {
  for (const path of ["/assets/index-CQGW7aXe.js", "/assets/index-CbLDTDI7.css"]) {
    const response = await serve(path, "application/octet-stream");
    assert.equal(response.headers.get("cache-control"), "public, max-age=31536000, immutable");
  }
});

test("HTML stays fresh on root and both language routes", async () => {
  for (const path of ["/", "/en/", "/pl/", "/assets/missing-12345678.js"]) {
    const response = await serve(path, "text/html");
    assert.equal(response.headers.get("cache-control"), "public, max-age=0, must-revalidate");
  }
});

test("unversioned fonts remain revalidatable", async () => {
  const response = await serve("/fonts/inter-latin.woff2", "font/woff2");
  assert.equal(response.headers.get("cache-control"), "public, max-age=604800, must-revalidate");
});

test("errors and unversioned scripts never receive immutable caching", async () => {
  for (const [path, status] of [
    ["/assets/missing-12345678.js", 404],
    ["/metrics/", 200],
  ]) {
    const response = await serve(path, "application/javascript", status);
    assert.equal(response.status, status);
    assert.equal(response.headers.get("cache-control"), "public, max-age=7200");
  }
});

test("ARD is a real JSON asset and is linked from the HTML template", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../public/.well-known/ard.json", import.meta.url), "utf8"),
  );
  assert.ok(manifest.entries.length > 0);
  assert.equal(manifest.entries[0].data.url, "https://forsadesign.co.uk/");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /rel="ard" href="\/\.well-known\/ard.json"/);
});
