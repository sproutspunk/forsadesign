---
name: Hero logo on dark background
description: How to display a white-background logo on a dark navy site so all elements (including dark tagline text) remain visible.
---

## Rule
Use CSS `mask-image` with a radial gradient to fade the white edges of the logo into the dark background. Do NOT remove the background — that makes dark-coloured tagline text invisible against the dark site background.

## Working CSS
```css
maskImage: "radial-gradient(ellipse 86% 62% at 50% 47%, black 45%, rgba(0,0,0,0.85) 60%, transparent 86%)"
WebkitMaskImage: "radial-gradient(ellipse 86% 62% at 50% 47%, black 45%, rgba(0,0,0,0.85) 60%, transparent 86%)"
```

The ellipse center `50% 47%` matches where the logo content is positioned inside the 2048×2048 canvas (content bbox: 1744×1230 starting at x=153, y=345).

**Why:** The new Forsa Design logo PNG is 2048×2048 with white background. The tagline text ("Websites for Industrial & Trade Businesses") is brownish-gold — visible on white but invisible on dark navy. `mix-blend-mode: multiply` makes white transparent but also kills the dark tagline. Background removal via the tool similarly loses the dark text. The mask approach preserves every element while blending the white edges.

**How to apply:** Logo file lives at `public/logo-hero.png`. Reference as `/logo-hero.png?v=N`. Bump `v=N` on each logo replacement to bust cache.
