# Forsa Design

Forsa Design is a pnpm monorepo containing the public Vite/React site and its Express API.

## Requirements

- Node.js 24
- pnpm 10
- PostgreSQL when database features are enabled

## Development

- `pnpm install` installs all workspace dependencies.
- `pnpm --filter @workspace/api-server run dev` starts the API server.
- `pnpm --filter @workspace/forsa-design run dev` starts the website.
- `pnpm run check` runs linting, type checking, and formatting checks.
- `pnpm run build` type checks and builds all packages.

## Configuration

Set these environment variables for the API contact service:

- `DATABASE_URL` - PostgreSQL connection string when the database is used.
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key.
- `RESEND_API_KEY` - Resend API key for contact messages.

The frontend reads `VITE_TURNSTILE_SITE_KEY` when Turnstile is enabled. For a Cloudflare Pages deployment, configure the Worker binding `API_ORIGIN` with the public HTTPS URL of the API server.
