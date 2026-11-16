# LinkLang case study: implementation evidence

Reviewed on 16 November 2026. Source repository: `sproutspunk/linklang`, main commit `a4d07edcf7ea68e752afb4f180a28efd7d5df96a`. Public site: <https://www.linklang.co.uk/>.

The user requested a case study or portfolio entry on Forsa Design. The implementation uses a dedicated bilingual case study and a homepage portfolio card.

| Published point                                     | Evidence reviewed                                                                                           |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Five service types and conditional order fields     | `frontend/src/pages/NewOrder.tsx`                                                                           |
| PL/EN website and account views                     | `Home.tsx`, `NewOrder.tsx`, `Portal.tsx`, `OrderDetail.tsx`, live public language switch                    |
| Client account, active orders and history           | `frontend/src/pages/Portal.tsx`, account API routes                                                         |
| Administrator-created quotations, client acceptance | `POST /api/quotes` uses admin middleware; `POST /api/quotes/:id/accept` checks order ownership              |
| Stripe Checkout integration                         | Accepted quotation lookup and amount calculation in checkout endpoint; signed webhook checks payment status |
| Order-scoped documents and messaging                | Authenticated document/message endpoints; download checks owner/admin and document/order relationship       |
| Status history                                      | Status update route and statusLogs schema                                                                   |
| Health-consent grant/withdrawal records             | Consent routes and healthConsentEvents schema; not a legal compliance certification                         |
| React, TypeScript, Hono, D1, R2, Stripe, Resend     | Source imports, API implementation and Cloudflare configuration                                             |

Only public website fragments are shown in the screenshots. No private client records, test accounts or payment transactions were created or accessed. Images were captured directly in the browser, with a crop above the public site's audit/carbon badges; those unverified metrics are not presented as project results.

The copy describes implemented scope and workflow. It does not claim measured conversion gains, time savings, automated quotation generation, instant replies, independently verified security or legal compliance. Payment integration is supported by source inspection, not a live transaction test.

Public routes:

- `/pl/case-studies/linklang/`
- `/en/case-studies/linklang/`
- Homepage discovery: `/pl/#portfolio` and `/en/#portfolio`

The same content data supplies React and prerendered pages. Both routes include canonical URLs, reciprocal language alternates, CreativeWork structured data and sitemap entries.

## Illustration status

The workflow illustration remains, with a caption clarifying that the order workspace is available before payment. On the user's instruction, the architecture graphic was removed from the case study. Architecture is described in text based on the source, rather than by a diagram with ambiguous arrow directions. Generated architecture drafts are not part of the published case study.

## Release validation

Production build/prerender, frontend and Worker type checks, lint and formatting passed. Tests passed: 33 frontend, 32 Worker and 5 static Pages tests. Desktop and mobile Chromium checks covered PL/EN case routes, all images, language switching, homepage-card navigation and newsletter submission on the blog plus existing/new articles. Static checks covered 14 weekly editorial dates, true publication metadata, all 48 article newsletter forms, case schemas and sitemap entries. Email-provider requests were mocked; no real payment or test mailing was performed.
