---
name: Turnstile CAPTCHA on contact form
description: How Cloudflare Turnstile is wired into the Forsa Design contact form and the domain-allowlist gotcha
---

# Turnstile on the contact form

The contact form uses Cloudflare Turnstile (managed mode) as a bot check, layered on top of the existing per-IP rate limit and honeypot.

- Frontend reads `VITE_TURNSTILE_SITE_KEY`; backend reads `TURNSTILE_SECRET_KEY`. Both are set in process env (not visible in Replit secrets UI — they come from a different source).
- **The backend now FAILS CLOSED (security hardening).** The old end-to-end graceful degradation was found to be exploitable: anyone could POST `/api/contact` with no token and trigger branded emails. The server-side rule below was reversed. No graceful no-secret path remains: with no secret configured the server rejects in all environments.

## Domain-allowlist gotcha
**Turnstile error `400020` on the widget means "domain not in the site key's allowed hostnames", not a code bug.**

The Replit dev preview domain is not registered in the Cloudflare dashboard for this site key, so the widget fires `onError` there and no token is ever generated.

## Backend: fail closed (current, security-hardened behavior)
`contact.ts` `verifyTurnstile()` policy:
- Secret set + missing/empty/invalid token -> **reject** (the abuse fix).
- No secret configured -> **reject in ALL environments**. The server cannot verify bot proof without a secret, so it must not send mail. Local dev must configure Turnstile (Cloudflare publishes always-pass test keys).
- **Do NOT gate this on `NODE_ENV`.** The deploy `start` script (`node ... ./dist/index.mjs`) does not set `NODE_ENV=production`, so an env-name check would fail open on a real deployment with the secret missing. Key security on the presence of the secret, never on the environment name.
- `captchaToken` is also **required** in `openapi.yaml` (`ContactRequest.required`), so a body with the field absent is a 400 before the handler even runs. Regenerate with `pnpm --filter @workspace/api-spec run codegen` after spec edits.

**Why:** the old "missing token = pass through" graceful degradation let anyone trigger branded emails (inbox spam + attacker-controlled confirmation mails) with a tokenless POST. Availability of the form was traded for closing that abuse.

**How to apply:** keep the endpoint fail-closed. Do NOT re-add a "missing token still sends email" path. The correct fix for a domain where the widget can't load is to add that domain to the site key's allowlist in the Cloudflare dashboard, NOT to weaken the server.

## Operational requirement (important)
Because the backend is fail-closed, **the production domain `forsadesign.co.uk` MUST be in the Turnstile site key's allowed hostnames**, or real users get a token-less reject (widget errors -> empty token -> 400). The frontend `captchaWidgetFailed` path in `Contact.tsx` still submits an empty token on widget error, but the backend now rejects it, so that path only yields a user-facing error — it is no longer a bypass.

## Test keys for server-side verification testing
- Always-pass: site key `1x...AA`, secret `1x0...AA`
- Always-fail: site key `2x...AB`, secret `2x0...AA`
