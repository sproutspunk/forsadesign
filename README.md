# Forsa Design

Forsa Design is a pnpm monorepo containing the public Vite/React site and its Cloudflare Worker API.

## Requirements

- Node.js 24
- pnpm 10
- PostgreSQL when database features are enabled

## Development

- `pnpm install` installs all workspace dependencies.
- `pnpm --filter @workspace/forsa-api-worker run dev` starts the API Worker.
- `pnpm --filter @workspace/forsa-design run dev` starts the website.
- `pnpm run check` runs linting, type checking, and formatting checks.
- `pnpm run build` type checks and builds all packages.

## Configuration

Set these environment variables for the API contact service:

- `DATABASE_URL` - PostgreSQL connection string when the database is used.
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key.
- `RESEND_API_KEY` - Resend API key for contact messages.

The frontend reads `VITE_TURNSTILE_SITE_KEY` when Turnstile is enabled. Deploy the API with `pnpm --filter @workspace/forsa-api-worker run deploy`, then configure the Cloudflare Pages Worker binding `API_ORIGIN` with the deployed Worker's public HTTPS URL.
