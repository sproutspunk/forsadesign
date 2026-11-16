# Forsa Design newsletter signup

Newsletter capture is separate from the editor waitlist and audit-checklist lead flow. No existing contacts are imported or subscribed.

## Signup and consent

The blog index and all article pages provide a Polish/English signup button. It opens a labelled email input and a separate, initially unchecked consent checkbox. The API accepts JSON and native HTML form submissions, validates email and consent, applies the existing IP-based rate limiter, limits request size and ignores the honeypot.

Pending subscriptions use the existing LEADS KV binding under `newsletter:subscriber:<SHA-256 of normalised email>`, with a 24-hour expiry. A Resend confirmation email contains an opaque random token valid for 24 hours. Token records also expire in KV. Repeat requests within one hour do not send another confirmation. A failed email API response does not display success and rolls back the pending write.

Opening the confirmation URL displays a page. A separate POST confirms consent, preventing a mail-link scanner GET from activating a subscriber. The active record contains language, source, consent version, request time, confirmation time and an unsubscribe token. Confirmation-token replay cannot reactivate an unsubscribed record.

## Unsubscribe and future sends

The confirmation result exposes an unsubscribe link. GET displays a confirmation form; POST changes the subscriber status to `unsubscribed`. Removing the email API key does not prevent unsubscribe. Contact `hello@forsadesign.co.uk` remains an additional route.

A future newsletter sender must select only records with `status: active` and `confirmedAt`, check suppression/bounce/complaint status, and include this URL for every recipient:

`https://forsa-api.sproutspunk.workers.dev/api/newsletter/unsubscribe?token=<unsubscribeToken>&language=<language>`

No newsletter campaigns are sent by this change. The existing weekly blog-draft automation remains separate and requires editorial approval. This change implements working capture and consent management, not automatic broadcasts. Subscriber addresses and tokens must not be committed or logged.

## Validation

Backend tests cover missing consent/configuration, email API failure, confirmation GET versus POST, unsubscribe, confirmation replay, expired links, repeated requests and foreign origins. Frontend tests cover unchecked required consent, pending-confirmation success and backend failure. Provider calls are mocked in tests; no third-party recipient is sent a test email.
