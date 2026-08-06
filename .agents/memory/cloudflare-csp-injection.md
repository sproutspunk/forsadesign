---
name: Cloudflare CSP injection
description: Cloudflare Pages adds runtime scripts and telemetry endpoints outside the source HTML.
---

Cloudflare Pages can append Pages Analytics and challenge-platform scripts after the site HTML is generated. A strict CSP must therefore allow the same-origin `/cdn-cgi/**` endpoints and the Cloudflare RUM host; if GA4 is enabled after consent, allow its regional collection hosts too.

**Why:** The source HTML and local preview do not contain all runtime resources that appear on the published custom domain, so production-only CSP console warnings can otherwise be misdiagnosed.

**How to apply:** When adjusting CSP for a Cloudflare Pages artifact, inspect live response headers and injected HTML, keep `script-src-attr 'none'`, and add only the exact external hosts required by the enabled telemetry and security services.