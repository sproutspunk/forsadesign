---
name: Industrial marketing routes
description: Marketing pages must stay aligned across React routing, prerender output, and sitemap generation.
---

When adding or changing a public marketing route, update the React route, its language alternates and metadata, the static prerender route/body, and the generated sitemap together.

**Why:** Search and AI crawlers receive the prerendered HTML, while users receive the interactive React page; updating only one layer creates stale or inconsistent public content.

**How to apply:** Treat `App.tsx`, `prerender.mjs`, page SEO/schema, and `sitemap.xml` generation as one change set, then run build/prerender and inspect the generated route files.