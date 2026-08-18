---
name: Cloudflare contact email transport
description: Why the contact form must NOT send SMTP from the Cloudflare Worker
---

Rule: the production contact form is proxied by `_worker.js` to the configured
API backend, which verifies Turnstile and delivers mail via the Resend
HTTP API. Never reintroduce direct SMTP from the Cloudflare Worker.

**Why:** Proton drops TCP connections from Cloudflare Workers egress IPs on
both 587 (STARTTLS: "connection closed before 220") and 465 (implicit TLS:
timeout). Verified with an in-worker probe endpoint (since removed). Quote
emails can use SMTP only from an external API backend where it is supported.

**How to apply:** any change to contact delivery goes into the api-server
contact route (Resend); the Worker only proxies `/api/**` to the API origin.
