---
name: Turnstile CAPTCHA on contact form
description: How Cloudflare Turnstile is wired into the Forsa Design contact form and the domain-allowlist gotcha
---

# Turnstile on the contact form

The contact form uses Cloudflare Turnstile (managed mode) as a bot check, layered on top of the existing per-IP rate limit and honeypot.

- Frontend reads `VITE_TURNSTILE_SITE_KEY`; backend reads `TURNSTILE_SECRET_KEY`. Both are user-provided.
- **Graceful degradation is intentional:** if `TURNSTILE_SECRET_KEY` is unset the server skips verification and the form still works; if `VITE_TURNSTILE_SITE_KEY` is unset the widget is not rendered and no token is required. Keep this behaviour so the form never hard-breaks when keys are absent.

## Domain-allowlist gotcha
**Turnstile error `400020` on the widget means "domain not in the site key's allowed hostnames", not a code bug.**

**Why:** a Turnstile site key is bound to the domains entered when the widget was created in the Cloudflare dashboard. The Replit dev preview domain (`*.spock.replit.dev`) is not on that list, so the widget errors there even though the wiring is correct. It works on the registered production domain.

**How to apply:** when verifying Turnstile on the Replit preview, expect `400020` unless the preview/deploy domain is added to the widget's allowed hostnames in Cloudflare. Don't chase it as a frontend bug — test server-side verification with curl + Cloudflare's documented test keys instead (`1x...AA` site / `1x0...AA` secret always pass; `2x...AB` site / `2x0...AA` secret always fail).
