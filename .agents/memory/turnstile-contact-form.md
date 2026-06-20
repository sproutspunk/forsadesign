---
name: Turnstile CAPTCHA on contact form
description: How Cloudflare Turnstile is wired into the Forsa Design contact form and the domain-allowlist gotcha
---

# Turnstile on the contact form

The contact form uses Cloudflare Turnstile (managed mode) as a bot check, layered on top of the existing per-IP rate limit and honeypot.

- Frontend reads `VITE_TURNSTILE_SITE_KEY`; backend reads `TURNSTILE_SECRET_KEY`. Both are set in process env (not visible in Replit secrets UI — they come from a different source).
- **Graceful degradation is intentional and implemented end-to-end:** if `TURNSTILE_SECRET_KEY` is unset the server skips verification; if `VITE_TURNSTILE_SITE_KEY` is unset the widget is not rendered and no token is required.

## Domain-allowlist gotcha
**Turnstile error `400020` on the widget means "domain not in the site key's allowed hostnames", not a code bug.**

The Replit dev preview domain is not registered in the Cloudflare dashboard for this site key, so the widget fires `onError` there and no token is ever generated.

## Frontend graceful degradation (captchaWidgetFailed state)
`Contact.tsx` tracks a `captchaWidgetFailed` boolean state:
- Set to `true` in the Turnstile `onError` callback (fires on 400020 and other widget errors).
- When `true`, validation skips the captcha requirement even if a site key is configured.
- Reset to `false` when `onVerify` fires successfully.

## Backend graceful degradation (missing token = pass through)
`contact.ts` `verifyTurnstile()`: if the token is missing/empty AND the secret IS set, log a warning and return `true` (allow through). This matches the "no secret configured" path and prevents blocking users when the widget can't load.

**Why:** blocking the form on a missing token would hard-break the contact form on any domain not in the Turnstile allowlist (dev, staging, etc.).

**How to apply:** do NOT restore "reject on missing token" logic. To enforce CAPTCHA strictly on all domains, add the target domain to the site key's allowlist in Cloudflare dashboard instead.

## Test keys for server-side verification testing
- Always-pass: site key `1x...AA`, secret `1x0...AA`
- Always-fail: site key `2x...AB`, secret `2x0...AA`
