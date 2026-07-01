---
name: Deployment builds from connected GitHub, not the workspace
description: Why a Replit deployment can keep shipping an identical stale bundle even after the workspace source is fixed.
---

When a Replit deployment is connected to a GitHub repo, the deploy build pulls
from **GitHub**, not the local Replit workspace. If `git push` from the workspace
fails (e.g. diverged history, force-with-lease rejected as "stale info"), the fix
lives only in the workspace and never reaches GitHub — so every deploy/rebuild
reproduces the **identical old bundle hash** from the stale GitHub tree.

**Symptom that pinpoints this:** the local production build output differs from
what production serves (different asset hash / different inlined values), even
though the workspace source, env vars, and local build are all verifiably correct.
Repeated "force new build" commits change nothing because they never land on the
remote the deployment reads from.

**Why:** deployment source ≠ working directory when GitHub is connected. Identical
output across rebuilds is the tell — a real rebuild of changed source cannot
produce a byte-identical content-hashed bundle.

**How to apply:** when production won't update despite a correct workspace fix,
check whether the deploy is GitHub-connected and whether pushes are actually
succeeding. Disconnect GitHub (or fix the push) so the deploy builds from the
workspace, then re-publish. Confirm by fetching the live bundle and grepping for
the expected value (`new=1 old=0`).

Also relevant for Vite frontends: `import.meta.env.VITE_*` is resolved at **build
time**, so the value baked into the bundle depends on the build environment's env
vars, not runtime. For public config (like a Turnstile *site* key) prefer a
hardcoded literal to make the bundle deterministic across build environments.
