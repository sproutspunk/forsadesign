---
name: eslint-plugin-react-hooks v7 flat config
description: How to wire the stricter react-hooks recommended rules in ESLint flat config, and how to fix the violations they surface.
---

# eslint-plugin-react-hooks v7 in ESLint flat config

The full recommended rule set (set-state-in-effect, purity, immutability, refs, set-state-in-render, etc.) is gated behind a flat-config-shaped export.

- DO: `{ files: [...react artifacts], ...reactHooks.configs.flat.recommended }`.
- DO NOT use `reactHooks.configs.recommended` or `...['recommended-latest']`. In v7 those are the **legacy eslintrc** variants with `plugins: ["react-hooks"]` (string array); ESLint flat config crashes with: "A config object has a 'plugins' key defined as an array of strings."

**Why:** v7 ships both legacy and flat variants under `configs`. Only the ones nested under `configs.flat.*` use the flat-config plugin-object shape.

**How to apply:** scope it to the React artifacts only (forsa-design, mockup-sandbox); the Express api-server must not get React-hooks rules.

## Fixing the two violation shapes the recommended set surfaces (set-state-in-effect = error)
- A `matchMedia` "use-mobile" hook that calls setState inside an effect → rewrite with `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`; keeps the same boolean public API and removes the synchronous setState.
- An effect that resets state synchronously when a prop changes (e.g. clearing a loaded component when the path changes) → drop the reset and remount the child with `key={changingProp}` instead (idiomatic "reset state on prop change").
