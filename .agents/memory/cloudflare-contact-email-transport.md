---
name: Cloudflare contact email transport
description: Production contact form email delivery requirements for the Cloudflare Pages Worker
---

The production contact Worker must use the Proton SMTP credentials that the deployment workflow synchronizes to Cloudflare Pages. A provider API key available only in the Replit environment is not automatically available inside the Cloudflare Worker.

**Why:** The public form can pass client-side validation and CAPTCHA but still fail at delivery when the Worker expects a secret that was never provisioned in Cloudflare.

**How to apply:** Keep the Worker’s transport aligned with the secrets explicitly synced by `.github/workflows/deploy.yml`; after any transport change, verify the deployed endpoint rather than relying only on local tests.