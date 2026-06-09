# Threat Model

## Project Overview

This project is a pnpm monorepo for a small brochure-style web presence named Forsa Design. The production application consists of a static React/Vite frontend in `artifacts/forsa-design` and a minimal Express API in `artifacts/api-server` backed by PostgreSQL wiring in `lib/db`, although no production data models or data-handling routes are implemented yet.

Production assumptions for future scans:
- Replit provides TLS for deployed traffic.
- `NODE_ENV` is `production` in deployed builds.
- `artifacts/mockup-sandbox` is a development-only design surface and is out of scope unless production routing or build configuration starts exposing it.
- The current repl is not deployed, so production exposure is inferred from artifact configuration rather than a live internet-facing deployment.

## Assets

- **Frontend integrity** — the static site content, client-side routing, and localized content must not be modified by untrusted input in a way that causes script execution or phishing.
- **API availability and integrity** — the Express service must only expose intended routes and must not grow unsafe middleware or unauthenticated sensitive endpoints as features are added.
- **Database credentials and future application data** — `DATABASE_URL` and any future stored customer/contact data would be sensitive if the currently stubbed database layer begins to be used.
- **Session or API credentials in future clients** — `lib/api-client-react` already contains support for bearer-token attachment, so future consumers must avoid exposing tokens to unintended runtimes or logs.

## Trust Boundaries

- **Browser to frontend assets** — users receive static content from `artifacts/forsa-design/dist/public`; all browser state such as `localStorage` and URL paths is untrusted.
- **Browser to API** — requests to `/api/*` cross into server-controlled code in `artifacts/api-server/src`; every future non-public route must enforce authentication and authorization server-side.
- **API to database** — `lib/db/src/index.ts` creates a privileged PostgreSQL connection from `DATABASE_URL`; any future raw query construction here would directly affect confidentiality and integrity.
- **Build-time/generated-code boundary** — OpenAPI and generated clients/Zod schemas in `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react` are trusted build artifacts and should not be treated as direct user-input channels.
- **Production vs development tooling** — `artifacts/mockup-sandbox` and helper scripts are development-only and should remain excluded from production routing and deployment.

## Scan Anchors

- **Production entry points:** `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/forsa-design/src/main.tsx`, `artifacts/forsa-design/src/App.tsx`
- **Highest-risk future growth areas:** `artifacts/api-server/src/routes/**`, `artifacts/api-server/src/middlewares/**`, `lib/db/src/**`, `lib/api-client-react/src/custom-fetch.ts`
- **Current public surface:** static frontend routes under `/`, API route `/api/healthz`
- **Authenticated/admin surface:** none implemented yet
- **Usually dev-only:** `artifacts/mockup-sandbox/**`, `scripts/**`, attached design assets

## Threat Categories

### Tampering

The main tampering risk in this project is future expansion of the Express API or database layer without strong validation and server-side enforcement. All future request bodies, query parameters, headers, and path segments that reach `artifacts/api-server` or `lib/db` must be validated, and all database access must continue to use safe parameterized/query-builder patterns.

### Information Disclosure

The project currently exposes little sensitive data, but future risk centers on leaking secrets, contact submissions, bearer tokens, or database contents through logs, client bundles, or overbroad API responses. Secrets must stay in environment variables only, sensitive headers must remain redacted in logs, and future APIs must return only fields needed by the caller.

### Denial of Service

The current public API is only a lightweight health check, but any future contact, search, auth, or upload endpoints could become abuse targets. New public endpoints must define request size limits, reasonable timeouts, and rate-limiting expectations when they begin handling nontrivial work or writes.

### Elevation of Privilege

There is no role model or authenticated surface yet, but the database connection and API scaffold mean privilege boundaries will matter as soon as user-facing features are added. All future protected endpoints must enforce authentication and authorization on the server, and no client-only route or UI restriction should be treated as a security control.
