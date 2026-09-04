---
name: Turnstile CAPTCHA on contact form
description: How Cloudflare Turnstile is wired into the Forsa Design contact form and the domain-allowlist gotcha
---

# Turnstile on the contact form

The contact form uses Cloudflare Turnstile (managed mode) as a bot check, layered on top of the existing per-IP rate limit and honeypot.

- Frontend reads `TURNSTILE_SITE_KEY`; backend reads `TURNSTILE_SECRET_KEY`. Both are configured as deployment environment variables.
- **Graceful degradation is intentional and implemented end-to-end:** if `TURNSTILE_SECRET_KEY` is unset the server skips verification; if `TURNSTILE_SITE_KEY` is unset the widget is not rendered and no token is required.

## Domain-allowlist gotcha
**Turnstile error `400020` on the widget means "domain not in the site key's allowed hostnames", not a code bug.**

An unregistered development preview domain causes the widget to fire `onError` and prevents token generation.

## Frontend graceful degradation (captchaWidgetFailed state)
`Contact.tsx` tracks a `captchaWidgetFailed` boolean state:
- Set to `true` in the Turnstile `onError` callback (fires on 400020 and other widget errors).
- When `true`, validation skips the captcha requirement even if a site key is configured.
- Reset to `false` when `onVerify` fires successfully.

## Backend verification behaviour
`src/index.ts` verifies the Turnstile token when `TURNSTILE_SECRET_KEY` is configured:

- If `TURNSTILE_SECRET_KEY` is unset, verification is skipped entirely.
- If it is set, the token must be present and valid. An empty, missing, or invalid token results in `{"error":"Security check failed."}` with HTTP 403.

This matches the frontend graceful-degradation path: the widget is only rendered when `TURNSTILE_SITE_KEY` is available, so a missing token on a production deployment with a configured secret indicates a widget or client-side problem.

**Why:** blocking the form on a missing token protects the contact form from abuse when a secret is configured, while still allowing development/staging builds to work when the secret is absent.

**How to apply:** keep the current behaviour. To test form flows on a domain that is not in the Turnstile allowlist, unset `TURNSTILE_SECRET_KEY` locally or use the test keys below.

## Test keys for server-side verification testing
- Always-pass: site key `1x...AA`, secret `1x0...AA`
- Always-fail: site key `2x...AB`, secret `2x0...AA`
