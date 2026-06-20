# Forsa Design

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run check` — lint + typecheck + format check (the full quality gate)
- `pnpm run format` — auto-fix formatting with Prettier
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Quality gate (automated)

`pnpm run check` (lint → typecheck → format check) runs automatically so broken or
unformatted code is caught before it lands. It is wired into two gates:

- **Pre-commit hook** (husky): `.husky/pre-commit` runs `pnpm run check` on every
  `git commit`. A failing check aborts the commit with a clear message. The hook is
  installed automatically by the `prepare` script on `pnpm install`. To bypass in an
  emergency, use `git commit --no-verify`. If formatting is the only failure, run
  `pnpm run format` to auto-fix, then re-commit.
- **CI** (GitHub Actions): `.github/workflows/check.yml` runs `pnpm run check` on
  every push and pull request. A failing check fails the CI run.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
