# Threat Model

## Project Overview

This project is a pnpm monorepo for Forsa Design, a brochure-style marketing site with a small Express API. The production app is split between a static React/Vite frontend in `artifacts/forsa-design` and an Express server in `artifacts/api-server`. Shared packages provide the OpenAPI contract, generated Zod schemas, a generated API client, and a scaffolded PostgreSQL/Drizzle layer.

Production assumptions for future scans:

- Replit provides TLS for deployed traffic.
- `NODE_ENV` is `production` in deployed builds.
- `artifacts/mockup-sandbox` is development-only and out of scope unless production routing starts exposing it.
- The deployment is public on Replit autoscale.
- Live deployment behavior matters for prioritization: on 2026-06-10 the public deployment served `GET /api/healthz` but returned `404` for `POST /api/contact`, even though the current source tree and artifact config define a contact endpoint.

## Assets

- **Frontend integrity** — the public site must not be modified by untrusted input in a way that causes script execution, phishing, or deceptive navigation.
- **Outbound email reputation and contact workflow integrity** — if the contact route is deployed, the business inbox, confirmation emails, and related connector usage become abuse-sensitive assets because they can affect reputation and enable spam or phishing from a trusted brand.
- **API availability and integrity** — the Express service must only expose intended routes and must not grow unsafe middleware or unauthenticated sensitive operations.
- **Secrets and integration credentials** — `TURNSTILE_SECRET_KEY`, any Gmail connector credentials handled via Replit, `DATABASE_URL`, and future auth/session material must not leak through code, logs, or client bundles.
- **Future customer/contact data** — submitted names, email addresses, project details, and any future stored records would be sensitive business and personal data.

## Trust Boundaries

- **Browser to frontend assets** — users receive static content from `artifacts/forsa-design/dist/public`; all browser-controlled state such as `localStorage`, URL paths, and DOM events is untrusted.
- **Browser to API** — requests to `/api/*` cross into server-controlled code in `artifacts/api-server/src`; every future non-public route must enforce authn/authz server-side, and public write routes must account for abuse from arbitrary internet clients.
- **API to external services** — the contact flow posts to Cloudflare Turnstile and the Replit Gmail connector. Failures, spoofing, or abuse at this boundary can affect email delivery and trust in the brand.
- **API to database** — `lib/db/src/index.ts` creates a privileged PostgreSQL connection from `DATABASE_URL`; any future raw query construction here would directly affect confidentiality and integrity.
- **Build-time/generated-code boundary** — `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react` are trusted build artifacts and should not be treated as direct user-input channels, but production consumers of the generated client can still create security issues if they configure token forwarding or cross-origin fetches unsafely.
- **Production vs development tooling** — `artifacts/mockup-sandbox` and related preview code are dev-only and should remain excluded from production routing and deployment.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/forsa-design/src/main.tsx`, `artifacts/forsa-design/src/App.tsx`
- **Highest-risk code areas:** `artifacts/api-server/src/routes/contact.ts`, `artifacts/api-server/src/middlewares/rateLimit.ts`, `artifacts/forsa-design/src/components/Contact.tsx`, `artifacts/forsa-design/src/components/Turnstile.tsx`, `lib/api-client-react/src/custom-fetch.ts`
- **Current live public surface observed:** frontend SPA routes and `GET /api/healthz`
- **Code-defined public write surface to re-check on future deploys:** `POST /api/contact`
- **Authenticated/admin surface:** none implemented yet
- **Usually dev-only:** `artifacts/mockup-sandbox/**`, `scripts/**`, attached design assets

## Threat Categories

### Spoofing

There is no user authentication yet, but external service trust still matters. If the contact route is deployed, the server must only accept valid Cloudflare Turnstile proofs when that protection is configured, and any future webhook- or token-based integrations must validate origin and authenticity server-side rather than trusting client claims.

### Tampering

The main tampering risk is future expansion of the API without strong validation and server-side enforcement. All request bodies, query parameters, headers, and path segments that reach `artifacts/api-server` or `lib/db` must be validated, and all database access must continue to use safe parameterized/query-builder patterns. Frontend DOM writes must remain driven by trusted constants or strictly validated values.

### Information Disclosure

The project currently stores little application data, but future risk centers on leaking secrets, contact submissions, connector error details, bearer tokens, or database contents through logs, client bundles, or overbroad API responses. Secrets must remain server-side only, sensitive headers must stay redacted in logs, and future APIs must return only the fields needed by the caller.

### Denial of Service

The current live API surface is small, but any deployed public write endpoint such as `/api/contact` is an internet-facing abuse target. Public write routes must define request size limits, rate limiting, and reasonable timeouts for external calls so attackers cannot use them to tie up worker capacity or flood downstream integrations.

### Elevation of Privilege

There is no role model or authenticated surface yet, but privilege boundaries will matter as soon as user-facing features or stored data are added. All future protected endpoints must enforce authentication and authorization on the server, and no client-only route or UI restriction should be treated as a security control.
