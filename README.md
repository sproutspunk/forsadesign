# Forsa Design

Forsa Design is the production website and quote workflow for an industrial web-design studio. It is maintained as a pnpm monorepo with a React/Vite frontend and a Cloudflare Workers API.

The public site is hosted on Cloudflare Pages. Contact enquiries and quote-email delivery are handled by the `forsa-api` Worker, protected by Cloudflare Turnstile and delivered through Resend.

## Architecture

```text
Browser
  |
  v
Cloudflare Pages (React/Vite site)
  |
  | /api/*
  v
forsa-api Cloudflare Worker
  |                  |
  v                  v
Cloudflare Turnstile Resend
```

## Repository Layout

| Path                         | Purpose                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `artifacts/forsa-design`     | Public React/Vite marketing website                     |
| `artifacts/forsa-api-worker` | Cloudflare Worker for contact and quote-email endpoints |
| `artifacts/api-server`       | Legacy Express API implementation                       |
| `artifacts/mockup-sandbox`   | Internal component-preview environment                  |
| `lib/api-spec`               | OpenAPI contract                                        |
| `lib/api-zod`                | Generated Zod schemas                                   |
| `lib/api-client-react`       | Generated React API client                              |
| `lib/db`                     | Drizzle database layer                                  |
| `scripts`                    | Workspace maintenance scripts                           |

## Requirements

- Node.js 24+
- pnpm 10+
- Cloudflare account with Pages, Workers, and Turnstile access
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

## API Endpoints

| Method | Endpoint            | Purpose                              |
| ------ | ------------------- | ------------------------------------ |
| `GET`  | `/api/healthz`      | Worker health check                  |
| `POST` | `/api/contact`      | Contact form submission              |
| `POST` | `/api/quotes/email` | Sends a generated quote PDF by email |

Public write endpoints validate incoming data and are rate-limited. Contact submissions require a valid Cloudflare Turnstile token.

## Cloudflare Configuration

### `forsa-api` Worker

Required Worker secrets:

| Secret                 | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `TURNSTILE_SECRET_KEY` | Verifies contact-form Turnstile tokens        |
| `RESEND_API_KEY`       | Sends contact and quote emails through Resend |

Set a secret from the Windows clipboard:

```powershell
Get-Clipboard | pnpm --filter @workspace/forsa-api-worker exec wrangler versions secret put TURNSTILE_SECRET_KEY --name=forsa-api
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

The `forsadesign` Pages project serves the frontend. Its advanced-mode Worker proxies `/api/*` to the API Worker.

Required Pages secret:

| Secret       | Value                                       |
| ------------ | ------------------------------------------- |
| `API_ORIGIN` | `https://forsa-api.sproutspunk.workers.dev` |

Build and deploy the frontend:

```bash
pnpm --filter @workspace/forsa-design run build
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

## Turnstile and Resend

The public Turnstile site key is used by the browser widget. The matching Turnstile secret key must be stored only in the `forsa-api` Worker. A mismatched secret causes Turnstile verification to fail with `invalid-input-secret`.

Resend must have a verified sender for:

```text
Forsa Design <hello@forsadesign.co.uk>
```

Never store API keys, Turnstile secrets, Cloudflare tokens, or database URLs in source files, Git history, or client-side variables.

## Deployment Order

1. Deploy `forsa-api`.
2. Configure or confirm Worker secrets.
3. Confirm `API_ORIGIN` in Cloudflare Pages.
4. Build and deploy `forsa-design`.
5. Verify `/api/healthz`.
6. Submit a real contact-form test and confirm delivery.

## License

MIT
