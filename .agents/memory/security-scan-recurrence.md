---
name: Security scan task recurrence
description: Why scanner-filed vuln tasks keep reappearing — the scanner checks the LIVE deployment, not source
---

# Recurring security-scan tasks (live deployment, not source)

The automated security scanner evaluates the LIVE deployment, not the source tree. A vulnerability fix merged into code does NOT clear the finding until the app is re-published and the new build is actually serving. Until then the scanner keeps re-filing the SAME finding, which to the user looks like "accepting/merging the task does nothing."

**Why:** Forsa Design's contact-endpoint hardening was merged, but the autoscale deployment only updates on re-publish. The scan that filed the duplicate "Contact Endpoint Abuse" tasks was taken while production still served the pre-fix build, so the finding recurred across several identical tasks. Once production caught up to the fixed build, a tokenless POST to the live endpoint began returning 400 (no email), i.e. the live site was no longer abusable.

**How to apply:** Before re-editing already-fixed code for a recurring scanner finding, verify the LIVE deployment's current behavior with a SAFE probe — one that cannot cause harmful side effects. For the contact endpoint, a tokenless POST addressed only to the business's own inbox returns 400 with no email when the fixed code is live. If production already behaves correctly, the recurring task is a stale scan that clears once a fresh scan runs; do not keep re-editing the code. If production is still vulnerable, the fix is to re-publish (and confirm prod config), not to change code again.

**Secrets note:** `TURNSTILE_SECRET_KEY` and `VITE_TURNSTILE_SITE_KEY` are global Replit secrets, so they ARE available in production. Re-publishing the fail-closed code therefore does not break the form for real visitors — provided the production domain is in the Turnstile site-key allowlist (Cloudflare).
