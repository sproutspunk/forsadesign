---
name: About page content sources
description: The homepage About component and the dedicated About route have separate translation/content sources.
---

The homepage and dedicated About route do not share the same copy source. The homepage uses `About.tsx` with `LanguageContext` translations, while the `/en/about` and `/pl/about` routes use their own `AboutPage.tsx` content object.

**Why:** Editing only one source can make a copy change appear successful in one location while the other page remains unchanged.

**How to apply:** When changing About copy, identify the requested route/component first and update every user-visible variant that is explicitly in scope.