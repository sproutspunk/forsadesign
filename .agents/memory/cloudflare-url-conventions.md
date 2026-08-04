---
name: Production URL conventions on Cloudflare Pages
description: Trailing-slash canonical convention for forsadesign.co.uk, robots.txt edge-cache propagation delay, and Cloudflare-managed robots.txt injection.
---

## Trailing slash is the canonical URL form

Cloudflare Pages serves `/en/blog` as a 308 redirect to `/en/blog/`, so all canonicals, hreflang alternates, sitemap entries and static internal links use the trailing-slash form. `useSeoMeta.buildHref()` and a normalization pass in `prerender.mjs` append the slash automatically — do not hand-write non-slash URLs in new routes or metadata.

**Why:** Mixed slash/no-slash signals caused canonicals and sitemap to point at redirect sources, wasting crawl budget and weakening canonicalization.

**How to apply:** When adding routes, define paths without a trailing slash and let the central normalization handle it; never bypass buildHref or the prerender route list.

## robots.txt changes take up to ~1h to appear in production

`public/_headers` gives `/*` a `Cache-Control: public, max-age=3600`, so the edge keeps serving the old robots.txt after deploy even when HTML (max-age=0) is already fresh.

**Why:** A deploy can look "not applied" for robots.txt while everything else is live.

**How to apply:** Verify with a cache-buster (`curl "https://forsadesign.co.uk/robots.txt?nocache=<ts>"`) before concluding a deploy failed.

## Cloudflare injects managed content signals into robots.txt

Production robots.txt is prefixed with a "Cloudflare Managed Content" block (Content-Signal directives, AI-bot Disallows) that comes from a Cloudflare account-level setting, not from the repo file. The repo's `public/robots.txt` content is appended after it.

**Why:** The served file will never byte-match the repo file; diffing them directly is misleading.

**How to apply:** Compare only the section after `# END Cloudflare Managed Content` when verifying robots.txt changes.
