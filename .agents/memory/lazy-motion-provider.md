---
name: LazyMotion provider required for m components
description: framer-motion m.* components render null without a LazyMotion provider — produces a silent blank page with no console errors or ErrorBoundary trigger.
---

# LazyMotion provider required

## The rule
`App.tsx` must wrap the entire app in `<LazyMotion features={domAnimation} strict>`. Without this, every component that uses `{ m as motion }` from framer-motion renders **nothing** silently.

**Why:** `m` is framer-motion's tree-shakeable lazy variant. It requires a `LazyMotion` context with the feature set (e.g. `domAnimation`) to function. Without the provider it returns null for every `m.div`, `m.section` etc. — the page shows only components that use the full `motion` import or plain HTML.

**How to apply:** When adding any new page that uses `{ m as motion }` from framer-motion, confirm `LazyMotion` is present in `App.tsx`. If the blog or other pages go blank with no JS errors, check for the LazyMotion provider first. The symptom is distinctive: header renders (uses plain HTML/CSS), cookie banner renders (uses plain HTML), but all animated content areas are empty.

## Affected pages (as of 2026-08-07)
- `BlogPage.tsx` — uses `m as motion`
- `ArticlePage.tsx` — uses `m as motion`
- `AboutPage.tsx` — uses `m as motion`
- `ComparisonPage.tsx` — uses `m as motion`
- `QuoteSummary.tsx`, `QuoteCalculator.tsx` — uses `m as motion`, `AnimatePresence`
- `HomeSections.tsx` — uses `MotionConfig` (works without LazyMotion but benefits from it)

## Current fix location
`artifacts/forsa-design/src/App.tsx` — `LazyMotion` wraps the entire `WouterRouter` tree.
