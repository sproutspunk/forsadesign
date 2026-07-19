/**
 * consentManager.ts
 *
 * Reads and interprets the user's cookie-consent choice stored in localStorage.
 *
 * ── localStorage key ────────────────────────────────────────────────────────
 * Key   : "forsa-cookie-consent"
 * Shape : ConsentState (JSON)
 *
 *   {
 *     version  : number   // schema version; bump CONSENT_VERSION on breaking changes
 *     savedAt  : number   // Unix ms timestamp; consent expires after CONSENT_MAX_AGE_MS
 *     decided  : boolean  // true once the user has made an explicit choice
 *     essential: true     // always true - cannot be turned off
 *     analytics: boolean  // performance / analytics cookies (e.g. GA4)
 *     marketing: boolean  // marketing / targeting cookies
 *   }
 *
 * ── Event ────────────────────────────────────────────────────────────────────
 * Whenever consent is saved the CookieConsent component fires:
 *   window.dispatchEvent(new CustomEvent("forsa:consent-updated", { detail: ConsentState }))
 *
 * Subscribe to this event to react to preference changes without polling.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const STORAGE_KEY = "forsa-cookie-consent";
export const CONSENT_UPDATED_EVENT = "forsa:consent-updated";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export interface ConsentState {
  version: number;
  savedAt: number;
  decided: boolean;
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

/** Returns the stored consent object, or null if undecided / expired / stale version. */
export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (Date.now() - parsed.savedAt > CONSENT_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** True only when the user has explicitly accepted analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true;
}

/** True only when the user has explicitly accepted marketing cookies. */
export function hasMarketingConsent(): boolean {
  return getConsent()?.marketing === true;
}

// ── Google Analytics (GA4) ───────────────────────────────────────────────────
// Set VITE_GA_MEASUREMENT_ID in your environment to enable GA.
// The script is only injected when the user has given analytics consent.

const GA_SCRIPT_ID = "forsa-ga-script";
const GA_INLINE_ID = "forsa-ga-init";

/**
 * Injects the GA4 script tags into <head> if:
 *   1. VITE_GA_MEASUREMENT_ID is defined
 *   2. The user has given analytics consent
 *
 * Safe to call multiple times - skipped if already loaded.
 */
export function loadAnalytics(): void {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!measurementId) return;
  if (!hasAnalyticsConsent()) return;
  if (document.getElementById(GA_SCRIPT_ID)) return; // already loaded

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  const init = document.createElement("script");
  init.id = GA_INLINE_ID;
  init.textContent = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js', new Date());",
    `gtag('config', '${measurementId}', { anonymize_ip: true });`,
  ].join("\n");
  document.head.appendChild(init);
}

/**
 * Removes the GA4 script tags and clears the dataLayer / gtag globals
 * so analytics stops firing after the user withdraws consent.
 */
export function removeAnalytics(): void {
  document.getElementById(GA_SCRIPT_ID)?.remove();
  document.getElementById(GA_INLINE_ID)?.remove();

  // Clear runtime globals so any remaining gtag() calls are no-ops
  if (typeof window !== "undefined") {
    const win = window as unknown as { dataLayer?: unknown; gtag?: unknown };
    win.dataLayer = undefined;
    win.gtag = undefined;
  }
}

/**
 * Convenience: call on mount and on every "forsa:consent-updated" event.
 * Loads or removes analytics based on the current consent state.
 */
export function applyAnalyticsConsent(): void {
  if (hasAnalyticsConsent()) {
    loadAnalytics();
  } else {
    removeAnalytics();
  }
}
