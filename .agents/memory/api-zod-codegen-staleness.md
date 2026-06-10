---
name: api-zod generated declarations can go stale
description: Why downstream typecheck breaks after editing the api-zod schema, and how to fix it
---

# api-zod (@workspace/api-zod) generated declarations staleness

`lib/api-zod` ships TS source via `exports."."` → `./src/index.ts`, but it is a
`composite` project that emits `dist/*.d.ts` (`emitDeclarationOnly`). Downstream
packages (e.g. `artifacts/api-server`) consume it through a **project reference**,
so TypeScript reads the built `dist` declarations, not `src`.

**Lesson:** after the OpenAPI/zod schema source changes (new fields like
`website`, `captchaToken`, `language`), the `dist/*.d.ts` can lag behind `src`.
Downstream typecheck then fails with "Property X does not exist" even though the
source schema clearly has the field.

**Why:** the generated `dist` declarations were not rebuilt in lockstep with the
generated `src`. The reference resolves to the stale `.d.ts`.

**How to apply:** if a consumer of `@workspace/api-zod` fails typecheck on a field
that exists in `lib/api-zod/src/generated/`, run `pnpm run typecheck:libs`
(`tsc --build`) at the repo root to regenerate the declarations before chasing it
as a consumer bug.
