---
name: Prerendered homepage parity
description: How to keep the no-JavaScript homepage representation aligned with the hydrated React page.
---

The homepage has two content representations: hydrated React translations and static `prerender.mjs` body HTML. Any public homepage copy change must update both, including both language variants.

**Why:** Crawlers and users without JavaScript see the prerendered HTML, while normal users see React after hydration. Updating only one representation creates language or SEO inconsistencies. Translation keys that return arrays also need a matching component shape in both languages.

**How to apply:** After homepage copy edits, build/prerender, grep both `dist/public/en/index.html` and `dist/public/pl/index.html` for new and removed text, then render both language routes after a clean workflow restart.