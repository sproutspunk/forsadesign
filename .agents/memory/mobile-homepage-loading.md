---
name: Mobile homepage loading
description: Performance boundary for the Forsa Design landing page on constrained mobile audits.
---

The homepage keeps Header, Hero and Services in the initial render. Pricing, portfolio, process, About, FAQ, CTA, contact and footer are grouped in a lazy `HomeSections` chunk and load on scroll, touch, wheel, or hash navigation.

**Why:** Mobile PageSpeed measured FCP/LCP delays and unused JavaScript even though desktop was already strong. The landing page does not need below-the-fold interaction code to paint the first screen.

**How to apply:** Do not import below-fold homepage sections into `HomePage.tsx` directly. Preserve hash-triggered loading so header/footer-style anchor navigation still reaches the intended section, and keep the static prerender complete for SEO and no-JavaScript users.