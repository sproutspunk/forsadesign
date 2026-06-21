---
name: Wouter v3 routing pitfalls
description: Two critical bugs found in wouter v3 Switch routing and LanguageContext navigation
---

## Rule 1: Route order matters in wouter v3 Switch — specific before generic

In wouter v3, `<Switch>` uses partial matching. A route like `/en/` will match `/en/blog` if it comes first in the Switch. Always declare the most specific routes before catch-all or parent routes.

**Why:** wouter v3 path matching does not guarantee exact matching in Switch — the first route whose pattern matches wins, including partial prefix matches.

**How to apply:** Put `/en/about`, `/en/blog/:slug`, `/en/blog` etc. BEFORE `/en/` in the Switch. The generic `/en/` route goes last among same-lang routes.

## Rule 2: Never call setLocation inside LanguageContext.setLanguage for sub-pages

The `setLanguage` function in LanguageContext navigates to `/${lang}/` (homepage). If sub-pages (About, Blog, Article) call `setLanguage(lang)` to sync the language context, they get immediately redirected to the homepage.

**Why:** `setLanguage` is designed for the Header language switcher (EN↔PL toggle), which intentionally navigates to the homepage in the new language.

**Fix used:** Added `syncLanguage(lang)` to LanguageContext that updates state+localStorage WITHOUT navigating. Sub-pages call `syncLanguage`, the Header language switcher calls `setLanguage`.

## Rule 3: Polish curly quotes break JS string literals

Polish typographic quotes: `„` (U+201E opening) and `"` (U+201D closing) placed inside double-quoted JS/TS strings cause esbuild/Babel parse errors if the file was saved with standard ASCII `"` (U+0022) as the closing quote. Use Python (not sed) to replace: `content.replace('\u201d', "'").replace('\u201e', "'")` — sed `\x` escapes don't reliably match multi-byte UTF-8.
