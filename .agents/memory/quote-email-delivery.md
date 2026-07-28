---
name: Quote email delivery
description: The quote calculator sends a generated PDF through the API before allowing the local download.
---

The quote flow must keep PDF download behind a successful server response. The API sends the same PDF attachment to the client and a copy to `hello@forsadesign.co.uk`, with SMTP credentials supplied through environment configuration and secrets.

**Why:** The former flow only stored the email in localStorage and generated a PDF locally, so no email could ever be delivered.

**How to apply:** Any future quote-flow change must preserve email validation, server delivery confirmation, rate limiting, and the no-download-on-send-failure behavior.