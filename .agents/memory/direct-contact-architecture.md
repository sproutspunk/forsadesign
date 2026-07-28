---
name: Direct-contact architecture
description: The Forsa Design website uses direct email and phone contact instead of an online submission form.
---

The contact experience is intentionally informational: visitors use the published email address, phone number, or LinkedIn link. There is no browser form, submission API, SMTP delivery, CAPTCHA, honeypot, or rate limiter.

**Why:** The business requested removal of all form submission handling and prefers direct contact.

**How to apply:** Keep `/en/contact` and `/pl/contact` as static contact-information pages. If changing contact CTAs, link to those pages or use direct `mailto:`/telephone links; do not reintroduce a POST contact route or form-specific API types.