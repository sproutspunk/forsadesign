---
name: Forsa Design production hosting
description: Where forsadesign.co.uk actually runs and how the contact API deploys — Cloudflare Pages, not Replit.
---

Production `forsadesign.co.uk` is hosted on **Cloudflare Pages** (project name `forsadesign`), NOT Replit. The user explicitly refuses paid Replit hosting.

**How deploys work:** GitHub Actions (`.github/workflows/deploy.yml`) builds the frontend and direct-uploads `artifacts/forsa-design/dist/public` to Pages via wrangler on every push to `main` of `github.com/sproutspunk/forsadesign`. Pushing to GitHub = deploying to production.

**Contact form API in production:** lives in `artifacts/forsa-design/public/_worker.js` — a Pages advanced-mode worker (Vite copies `public/` to the build output root, which activates it). It sends email via Proton SMTP (port 465) over `cloudflare:sockets` and mirrors the Express route used in dev. The Express api-server is dev-only.

**Why:** Replit deploys were rejected by the user (cost); the site was already on Cloudflare Pages free tier, so the API moved into the same deployment.

**How to apply:**
- Runtime env vars (`PROTON_SMTP_USER`, `PROTON_SMTP_PASS`, `TURNSTILE_SECRET_KEY`) must be set in the Cloudflare Pages project settings by the user; they apply only to deployments created after being set.
- Local E2E testing of the worker: `npx wrangler@4 pages dev dist/public --binding KEY="$VAL"` — wrangler@3's workerd fails TLS trust in this sandbox; v4 works. Never `pkill -f wrangler` in the same command that mentions "wrangler" elsewhere (self-match kills the shell).
- Keep the worker's contact logic in sync with `artifacts/api-server/src/routes/contact.ts` when either changes.
- No rate limiting in the worker (Workers isolates have no shared memory); recommend a Cloudflare WAF rate-limiting rule on `POST /api/contact`.
