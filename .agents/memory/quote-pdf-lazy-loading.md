---
name: Quote PDF lazy loading
description: Performance boundary for the quote calculator's PDF export.
---

The quote PDF generator must remain a dynamically imported, interaction-only module. The public landing page does not need PDF generation during its initial load.

**Why:** `pdf-lib` and the generator add several hundred kilobytes to the JavaScript bundle, while PDF export is a rare, explicit action. Keeping it in a separate chunk materially improves first-load performance.

**How to apply:** Preserve the dynamic import at the download handler boundary. Do not move the PDF utility back to a top-level import in the quote summary or another eagerly loaded component.