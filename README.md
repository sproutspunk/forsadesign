# Forsa Design

Forsa Design is the production website and quote workflow for an industrial web-design studio. It is maintained as a pnpm monorepo with a React/Vite frontend and a Cloudflare Workers API.

The public site is hosted on Cloudflare Pages. Contact enquiries and quote-email delivery are handled by the `forsa-api` Worker and delivered through Resend. The contact form is protected by a honeypot field and per-IP rate limiting instead of a captcha.

## Architecture

```text
Browser
  |
  v
Cloudflare Pages (React/Vite site, advanced-mode Worker)
  |
  | /api/*
  v
forsa-api Cloudflare Worker
  |
  v
Resend
```

## Repository Layout

| Path                         | Purpose                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `artifacts/forsa-design`     | Public React/Vite marketing website                     |
| `artifacts/forsa-api-worker` | Cloudflare Worker for contact and quote-email endpoints |
| `artifacts/api-server`       | Legacy Express API implementation (kept for reference)  |
| `artifacts/mockup-sandbox`   | Internal component-preview environment                  |
| `lib/api-spec`               | OpenAPI contract                                        |
| `lib/api-zod`                | Generated Zod schemas                                   |
| `lib/api-client-react`       | Generated React API client                              |
| `lib/db`                     | Drizzle database layer                                  |
| `scripts`                    | Workspace maintenance scripts                           |

## Requirements

- Node.js 24+
- pnpm 10.26.1+
- Cloudflare account with Pages and Workers
- Resend account with a verified sender domain

## Installation

```bash
pnpm install
```

This repository is pnpm-only. The installation script rejects npm and Yarn.

## Local Development

Start the API Worker:

```bash
pnpm --filter @workspace/forsa-api-worker run dev
```

Start the public website in a separate terminal:

```bash
pnpm --filter @workspace/forsa-design run dev
```

For local Worker secrets, use Wrangler-supported local environment files. Do not commit them.

## Quality Checks

```bash
pnpm run lint
pnpm run typecheck
pnpm run format:check
pnpm run check
pnpm run build
```

`pnpm run check` runs linting, type checking, and formatting validation.

## Typography

The frontend uses a custom fluid typography scale defined in `artifacts/forsa-design/src/index.css`:

| Element | Scale                                    | Line-height | Notes                                            |
| ------- | ---------------------------------------- | ----------- | ------------------------------------------------ |
| Body    | `clamp(1rem, 0.5vw + 0.875rem, 1.25rem)` | 1.6         | Inter sans                                       |
| H1      | `clamp(2.5rem, 5vw + 1rem, 5rem)`        | 1.1         | Playfair Display serif, `-0.02em` letter-spacing |
| H2      | `clamp(1.75rem, 3vw + 0.5rem, 3rem)`     | 1.2         | Playfair Display serif, `-0.01em` letter-spacing |
| H3      | `clamp(1.25rem, 2vw + 0.5rem, 1.75rem)`  | 1.3         | Playfair Display serif                           |

All headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`. Fonts are self-hosted as variable WOFF2 files for Latin and Latin-Extended subsets (`public/fonts/`).

## API Endpoints

| Method | Endpoint            | Purpose                              |
| ------ | ------------------- | ------------------------------------ |
| `GET`  | `/api/healthz`      | Worker health check                  |
| `POST` | `/api/contact`      | Contact form submission              |
| `POST` | `/api/quotes/email` | Sends a generated quote PDF by email |

Public write endpoints validate incoming data and are rate-limited (5 requests per 15 minutes per IP). The contact form uses an invisible honeypot field (`_gotcha`) to filter naive bots.

## Cloudflare Configuration

### `forsa-api` Worker

Required Worker secrets:

| Secret                 | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `RESEND_API_KEY`       | Sends contact and quote emails through Resend             |
| `TURNSTILE_SECRET_KEY` | Verifies Cloudflare Turnstile tokens from public forms    |

Set a secret from the Windows clipboard:

```powershell
Get-Clipboard | pnpm --filter @workspace/forsa-api-worker exec wrangler versions secret put RESEND_API_KEY --name=forsa-api
Get-Clipboard | pnpm --filter @workspace/forsa-api-worker exec wrangler versions secret put TURNSTILE_SECRET_KEY --name=forsa-api
```

Validate the real keys before deploying:

```bash
cd artifacts/forsa-api-worker
TURNSTILE_SECRET_KEY=xxx RESEND_API_KEY=xxx pnpm run test:secrets
```

Deploy the Worker:

```bash
pnpm --filter @workspace/forsa-api-worker run deploy
```

Verify it:

```bash
curl https://forsa-api.sproutspunk.workers.dev/api/healthz
```

### Cloudflare Pages

The `forsadesign` Pages project serves the frontend. Its advanced-mode Worker proxies `/api/*` to the API Worker and injects the real visitor IP via `x-real-client-ip`.

Required Pages secret:

| Secret       | Value                                       |
| ------------ | ------------------------------------------- |
| `API_ORIGIN` | `https://forsa-api.sproutspunk.workers.dev` |

Required build environment variable (must be available when `vite build` runs):

| Variable             | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public). Inlined by Vite; widget won't render without it. |

Build and deploy the frontend:

```bash
TURNSTILE_SITE_KEY=0x4AAAAAAEm_toGJr8CEp9xl pnpm --filter @workspace/forsa-design run build
pnpm exec wrangler pages deploy artifacts/forsa-design/dist/public --project-name=forsadesign
```

Verify the production API route:

```bash
curl https://forsadesign.co.uk/api/healthz
```

Expected response:

```json
{ "status": "ok" }
```

## Resend

Resend must have a verified sender for:

```text
Forsa Design <hello@forsadesign.co.uk>
```

Never store API keys, Cloudflare tokens, or database URLs in source files, Git history, or client-side variables.

## Deployment Order

1. Deploy `forsa-api`.
2. Configure or confirm the `RESEND_API_KEY` Worker secret.
3. Configure or confirm the `TURNSTILE_SECRET_KEY` Worker secret.
4. Confirm `API_ORIGIN` in Cloudflare Pages.
5. Build `forsa-design` with `TURNSTILE_SITE_KEY` exported.
6. Deploy `forsa-design`.
7. Verify `/api/healthz`.
8. Submit a real contact-form test and confirm delivery.

## Troubleshooting

### "Security check failed." on form submit

The Worker's `TURNSTILE_SECRET_KEY` is invalid or does not match the frontend `TURNSTILE_SITE_KEY`.

1. Get the correct secret key from the Cloudflare Turnstile dashboard (not the site key).
2. Re-set the Worker secret:
   ```bash
   cd artifacts/forsa-api-worker
   echo -n "YOUR_TURNSTILE_SECRET_KEY" | pnpm exec wrangler secret put TURNSTILE_SECRET_KEY
   ```
3. Stream logs and reproduce the failure to confirm the error code:
   ```bash
   pnpm exec wrangler tail
   ```
   Look for `event: turnstile_verify_failed` and the `errorCodes` array:
   - `invalid-input-secret` — wrong secret key on the Worker.
   - `400020` / `hostname-mismatch` — the site key's domain allowlist does not include the production domain.
   - `invalid-input-response` — token is malformed or expired; usually a frontend/widget issue.

## License

MIT
