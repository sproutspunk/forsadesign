# Forsa Design

Production website and web workflows for Forsa Design: <https://forsadesign.co.uk/>. This pnpm monorepo contains the React/Vite frontend and the Cloudflare Worker API deployed by GitHub Actions.

Documentation reviewed against the repository on 16 November 2026.

## Production components

- `artifacts/forsa-design`: bilingual PL/EN website, services, quotation tools, blog, invoice-payment interface and LinkLang case study. Vite builds the application; `prerender.mjs` generates route-specific HTML, metadata and sitemap entries.
- `artifacts/forsa-api-worker`: contact and quote-email delivery, audit-checklist capture, editor waitlist, newsletter consent management, Stripe Checkout and Stripe webhook handling.
- Cloudflare Pages hosts the frontend. Its advanced-mode Worker can proxy `/api/*` to the API Worker using the `API_ORIGIN` binding.
- The frontend currently calls `https://forsa-api.sproutspunk.workers.dev` directly through the constant in `src/lib/api.ts`. The Pages proxy is an additional route, not the only browser/API path.
- Resend sends email. The existing `LEADS` KV binding stores lead, waitlist, newsletter and payment-related records used by the Worker.

The production API does not use the Express server or Drizzle database packages elsewhere in this workspace. LinkLang's D1/R2 architecture belongs to that separate project, not to this website's API.

## Repository layout

| Path                                                  | Purpose                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------ |
| `artifacts/forsa-design`                              | Public React/Vite website and prerendering                               |
| `artifacts/forsa-api-worker`                          | Production Cloudflare Worker API                                         |
| `artifacts/api-server`                                | Separate Express implementation; not deployed by the production workflow |
| `artifacts/mockup-sandbox`                            | Component-preview environment                                            |
| `lib/api-spec`, `lib/api-zod`, `lib/api-client-react` | API contract and generated client/schema packages                        |
| `lib/db`                                              | Drizzle package; not used by the production Worker                       |
| `content/`                                            | Editorial source material, case-study evidence and newsletter operations |
| `.github/workflows/`                                  | Repository checks and deployment                                         |
| `scripts/`                                            | Workspace scripts                                                        |

## Requirements and installation

Use Node.js 24 for local development to match the check workflow, and pnpm 10.26.1 as declared by `packageManager`. The deployment workflow currently builds with Node.js 22. Installation is pnpm-only.

```bash
pnpm install
```

Cloudflare credentials are needed for deployment. Resend and Stripe credentials are needed only for their corresponding live API features.

## Local development

Run these in separate terminals:

```bash
pnpm --filter @workspace/forsa-api-worker run dev
```

```bash
pnpm --filter @workspace/forsa-design run dev
```

The website defaults to port 3000; Wrangler normally uses port 8787. Starting a local Worker does **not** redirect the frontend's hardcoded production API URL. To test against the local Worker, temporarily change `artifacts/forsa-design/src/lib/api.ts` to `http://localhost:8787` and use `http://localhost:3000` for the site. Restore the intended production URL before deployment.

Vite also defines a `/api` proxy targeting port 8080, but the current frontend API constant does not use that proxy. Do not assume these are the same development path.

Keep local Worker credentials in an ignored Wrangler local environment file. Do not commit real credentials or use production recipients for automated tests.

## Checks, tests and build

```bash
pnpm run check
pnpm --filter @workspace/forsa-design run test
pnpm --filter @workspace/forsa-api-worker run test
pnpm --filter @workspace/forsa-design run build
```

`check` runs lint, workspace type checks and formatting. Tests are separate commands; the current GitHub Check workflow does not run them automatically. The frontend test command also runs the static Pages Worker tests.

The frontend build writes to **`dist/public` at the repository root**, then prerenders public routes and creates `sitemap.xml`. It does not write to `artifacts/forsa-design/dist/public`.

## Public content and branding

The site uses a gold bird mark, navy/gold styling, self-hosted Inter and Playfair Display fonts, and a full-page Blueprint background with motion controls. Branding assets are in `artifacts/forsa-design/public/brand/`.

Blog content is in `src/data/articlesData.ts`; listing/search metadata is in `src/data/articlesMeta.ts`. Keep the two synchronised. The backlog articles have weekly editorial dates in `dateIso`, visibly labelled as such; `publishedDateIso` retains the actual publication date for structured data. These are distinct dates.

The LinkLang case study is available at `/pl/case-studies/linklang/` and `/en/case-studies/linklang/`, with a homepage portfolio card. Content is shared between React and prerendering through `src/data/linklangCaseStudy.ts`. See [implementation evidence](content/case-studies/linklang-evidence.md).

Blog drafting automation is managed outside this repository. There is no repository job that independently approves or publishes weekly articles.

## API routes

| Method     | Route                         | Purpose                                               |
| ---------- | ----------------------------- | ----------------------------------------------------- |
| GET        | `/api/healthz`                | Worker health check                                   |
| POST       | `/api/contact`                | Contact enquiry                                       |
| POST       | `/api/quotes/email`           | Email a generated quotation PDF                       |
| POST       | `/api/lead-magnet`            | Audit-checklist request                               |
| POST       | `/api/waitlist`               | Editor-demo waitlist signup                           |
| POST       | `/api/newsletter`             | Request newsletter confirmation with explicit consent |
| GET / POST | `/api/newsletter/confirm`     | Display confirmation page / activate subscription     |
| GET / POST | `/api/newsletter/unsubscribe` | Display confirmation page / unsubscribe               |
| POST       | `/api/checkout/custom`        | Create a custom GBP payment session                   |
| POST       | `/api/stripe/webhook`         | Verify Stripe events and process paid sessions        |

Form and checkout handlers validate input and apply honeypot or size checks as implemented per route. Their IP rate limiter uses an in-memory map, normally five requests per route in 15 minutes. It is not a globally coordinated rate limiter. Stripe webhooks use signature verification instead of the form limiter.

Turnstile is **not currently verified by the production API**. The legacy `test:secrets` script still contains Turnstile diagnostics and is not evidence that Turnstile protects current forms.

## Newsletter and other email flows

Newsletter capture is separate from the editor waitlist and audit-checklist leads. It requires an unchecked consent checkbox followed by email confirmation. Pending records and confirmation tokens expire after 24 hours. GET displays the confirmation page; POST activates the subscription. Unsubscribe follows the same explicit-action pattern.

This implements capture and consent management, **not automatic newsletter broadcasts**. Future sends must select confirmed active subscribers, respect suppression/unsubscribe status and include each subscriber's unsubscribe link. See [newsletter operations](content/newsletter-operations.md).

The Worker's existing daily cron runs at 08:00 UTC and processes audit-checklist lead follow-ups. It does not send the blog newsletter.

## Cloudflare configuration

Worker configuration: `artifacts/forsa-api-worker/wrangler.toml`.

| Binding or secret       | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `LEADS` KV binding      | Persistence used by lead, waitlist, newsletter and payment flows |
| `RESEND_API_KEY`        | Email delivery from `Forsa Design <hello@forsadesign.co.uk>`     |
| `STRIPE_SECRET_KEY`     | Stripe Checkout requests                                         |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature verification                            |

Configure `API_ORIGIN` as `https://forsa-api.sproutspunk.workers.dev` in Pages if using its `/api/*` proxy. Do not expose API secrets through frontend build variables.

`VITE_GA_MEASUREMENT_ID` is a public build-time value. The deployment workflow supplies it. Current production deployment does not require a Turnstile site-key build variable.

## Stripe payment scope

`/api/checkout/custom` accepts an amount supplied by the client, validates that it is finite and between GBP 1 and GBP 50,000, and converts it to minor units for Stripe. It does **not** look up a fixed server-side invoice balance or catalogue price. The README must not describe this as an immutable invoice-pricing system.

The webhook checks the Stripe signature. Configure it for `checkout.session.completed` at the Worker webhook URL. No real payment is needed for routine unit tests.

## Deployment

The normal route is `.github/workflows/deploy.yml`:

1. Push/merge to `main` triggers production deployment.
2. The workflow deploys `forsa-api`.
3. It builds the frontend with the public GA measurement ID.
4. It deploys root `dist/public` to the `forsadesign` Pages project.

Pull requests build and deploy a Pages preview; the API Worker deployment step is skipped for PR events. The workflow uses GitHub secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Equivalent manual commands from the repository root, after configuring credentials and bindings:

```bash
pnpm --filter @workspace/forsa-api-worker run deploy
pnpm --filter @workspace/forsa-design run build
pnpm exec wrangler pages deploy dist/public --project-name=forsadesign
```

Supply the intended `VITE_GA_MEASUREMENT_ID` before the manual build if analytics is required. The older `scripts/deploy-local.sh` still names the wrong nested output path; use the root path above rather than treating that script as a verified deployment route.

Read-only checks:

```bash
curl https://forsa-api.sproutspunk.workers.dev/api/healthz
curl https://forsadesign.co.uk/api/healthz
```

The second check also depends on the Pages `API_ORIGIN` binding. A successful health response confirms routing, not email delivery, payment processing or every application's dependency.

## License

MIT. See [LICENSE](LICENSE).
