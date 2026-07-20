- [Turnstile CAPTCHA on contact form](turnstile-contact-form.md) — managed-mode bot check; graceful degradation by design; error 400020 = domain not in site-key allowlist, not a code bug.
- [react-hooks v7 flat config](react-hooks-flat-config.md) — use `reactHooks.configs.flat.recommended` (not `.recommended`, which is legacy eslintrc & crashes flat config); fix set-state-in-effect via useSyncExternalStore / `key` remount.
<<<<<<< HEAD
- [Security scan task recurrence](security-scan-recurrence.md) — scanner checks the LIVE deployment, not source; a merged fix only clears the finding after re-publish; probe prod safely before re-fixing.
- [Wouter v3 routing pitfalls](wouter-v3-routing.md) — Switch partial-match (specific routes before /en/), setLanguage redirects to homepage (use syncLanguage in sub-pages), Polish curly quotes break esbuild (use Python to fix).
- [Bilingual pricing helpers](bilingual-pricing.md) — PricingSection uses dual-argument `bi(en, pl)` instead of single `t(key)` because prices/presets are static arrays without translation keys.
- [VAT disabled in quotes](vat-disabled.md) — `VAT_RATE=0` in quoteConfig.ts; all prices shown as final gross; PdfData uses `subtotal` (not subtotalExVat/vat); keep interface synced with caller.
- [deploymentTarget static vs autoscale](deployment-target-static-pitfall.md) — `deploymentTarget = "static"` in `.replit` breaks multi-artifact setups; never change it without verifying artifact topology.
- [Stale prerendered files on Cloudflare Pages](stale-prerender-files.md) — Cloudflare Pages preserves stale `index.html` files across deploys; if a route stops being prerendered, the old static file persists and overrides SPA fallback. Always prerender all routes, or use wrangler to purge.
- [Node 24 strip-types for .ts imports](node-24-strip-types.md) — Node 24 natively supports `import('./file.ts')` without flag in ESM modules; `node --experimental-strip-types` works in CI for running `.mjs` scripts that import `.ts` data files.
- [LCP optimisation for hero logo](hero-logo-lcp.md) — Add `<link rel="preload" as="image">` for hero logo in index.html + `fetchPriority="high" loading="eager" decoding="async"` on `<img>`. Cloudflare Pages doesn't auto-optimise images — preload + eager loading cuts LCP significantly on mobile.
=======
>>>>>>> b11df8d139426c679ab7b62858c601e522085395
