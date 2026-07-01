---
name: Duplicate secret shadowing in Replit Secrets
description: When a Replit Secret "never updates" despite many saves, suspect duplicate entries with the same key name shadowing each other.
---

# Duplicate secret entries shadow each other

If a Replit **Secret** appears to never take the new value no matter how many
times it is saved, the cause may be **multiple entries with the same key name**
in the Secrets pane (e.g. six `TURNSTILE_SECRET_KEY` rows). An old duplicate can
win and shadow the newer correct ones, so every "add" just piles another
duplicate underneath instead of overwriting.

**Why:** Adding a secret can create a new row rather than overwrite an existing
one, so the effective value stays pinned to the first/old entry. Observed after a
user re-saved a key ~7 times; the store kept returning the stale value.

**How to apply / diagnose:**
- `viewEnvVars` **dedupes by name** — it only reports `{KEY: true}` and will NOT
  reveal duplicates. Ask the user for a screenshot of the Secrets pane to count
  rows, or otherwise confirm from the UI.
- `deleteEnvVars` only targets **environment-scoped variables**, NOT global
  secrets. It returns a success-shaped result but leaves the secret present. The
  agent cannot delete secret duplicates programmatically — the user must delete
  every duplicate row in the Secrets UI, then add exactly one.
- To tell "wrong value pasted" from "correct value truncated", compare the stored
  value byte-for-byte against the candidates and check both length and a
  distinguishing character index (do this in bash; never print the secret).
- The Replit agent's `bash` env reads the **current** effective secret (it is not
  pinned to session start) — verified when a corrected secret immediately showed
  the new length. Use `curl` siteverify to confirm validity:
  `invalid-input-response` = valid secret (dummy token rejected);
  `invalid-input-secret` = wrong secret.
