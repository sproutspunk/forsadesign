---
name: Blog metadata parity
description: Keeps article cards, SEO metadata, and prerendered article pages aligned.
---

`articlesData` is the source of truth for article titles and excerpts. `articlesMeta` must mirror those fields exactly for every language and slug.

**Why:** Separate editorial copies drifted, causing blog cards and SEO metadata to show different titles and summaries from the rendered article pages.

**How to apply:** After changing an article title or excerpt, run a comparison between `articlesData` and `articlesMeta` before building or prerendering.