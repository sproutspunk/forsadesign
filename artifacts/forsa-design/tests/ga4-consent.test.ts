import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  STORAGE_KEY,
  CONSENT_VERSION,
  hasAnalyticsConsent,
  loadAnalytics,
  removeAnalytics,
  applyAnalyticsConsent,
  trackEvent,
} from "../src/lib/consentManager";

const GA_SCRIPT_ID = "forsa-ga-script";
const GA_INLINE_ID = "forsa-ga-init";
const MEASUREMENT_ID = "G-TEST123456";

type GaWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const gaWindow = window as GaWindow;

function setConsent(analytics: boolean, marketing = false) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: CONSENT_VERSION,
      savedAt: Date.now(),
      decided: true,
      essential: true,
      analytics,
      marketing,
    }),
  );
}

function gaScript() {
  return document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;
}

function gaInline() {
  return document.getElementById(GA_INLINE_ID) as HTMLScriptElement | null;
}

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", MEASUREMENT_ID);
});

afterEach(() => {
  document.getElementById(GA_SCRIPT_ID)?.remove();
  document.getElementById(GA_INLINE_ID)?.remove();
  gaWindow.dataLayer = undefined;
  gaWindow.gtag = undefined;
  vi.unstubAllEnvs();
  vi.runAllTimers();
  vi.useRealTimers();
});

/** Runs loadAnalytics and flushes the deferred (idle/timeout) injection. */
function loadAnalyticsAndFlush() {
  loadAnalytics();
  vi.runAllTimers();
}

describe("GA4 consent gating", () => {
  it("hasAnalyticsConsent is true only after explicit analytics consent", () => {
    expect(hasAnalyticsConsent()).toBe(false);
    setConsent(false);
    expect(hasAnalyticsConsent()).toBe(false);
    setConsent(true);
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it("hasAnalyticsConsent ignores stale consent versions", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_VERSION - 1,
        savedAt: Date.now(),
        decided: true,
        essential: true,
        analytics: true,
        marketing: true,
      }),
    );
    expect(hasAnalyticsConsent()).toBe(false);
  });
});

describe("GA4 script injection (loadAnalytics)", () => {
  it("injects the gtag.js loader and inline init script when analytics consent is given", () => {
    setConsent(true);
    loadAnalyticsAndFlush();

    const script = gaScript();
    expect(script).not.toBeNull();
    expect(script?.src).toBe(`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`);
    expect(script?.async).toBe(true);

    const inline = gaInline();
    expect(inline).not.toBeNull();
    expect(inline?.textContent).toContain(`gtag('config', '${MEASUREMENT_ID}'`);
    expect(inline?.textContent).toContain("anonymize_ip: true");
  });

  it("does NOT inject GA when the user has not consented to analytics", () => {
    setConsent(false);
    loadAnalyticsAndFlush();
    expect(gaScript()).toBeNull();
    expect(gaInline()).toBeNull();
  });

  it("does NOT inject GA when no consent record exists at all", () => {
    loadAnalyticsAndFlush();
    expect(gaScript()).toBeNull();
    expect(gaInline()).toBeNull();
  });

  it("does NOT inject GA when VITE_GA_MEASUREMENT_ID is not configured", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    setConsent(true);
    loadAnalyticsAndFlush();
    expect(gaScript()).toBeNull();
    expect(gaInline()).toBeNull();
  });

  it("is idempotent - calling loadAnalytics twice injects the scripts only once", () => {
    setConsent(true);
    loadAnalyticsAndFlush();
    loadAnalyticsAndFlush();
    expect(document.querySelectorAll(`#${GA_SCRIPT_ID}`)).toHaveLength(1);
    expect(document.querySelectorAll(`#${GA_INLINE_ID}`)).toHaveLength(1);
  });
});

describe("GA4 removal (removeAnalytics)", () => {
  it("removes the GA script tags and clears dataLayer/gtag globals", () => {
    setConsent(true);
    loadAnalyticsAndFlush();
    gaWindow.dataLayer = [];
    gaWindow.gtag = () => {};

    removeAnalytics();

    expect(gaScript()).toBeNull();
    expect(gaInline()).toBeNull();
    expect(gaWindow.dataLayer).toBeUndefined();
    expect(gaWindow.gtag).toBeUndefined();
  });

  it("is safe to call when analytics was never loaded", () => {
    expect(() => removeAnalytics()).not.toThrow();
  });
});

describe("applyAnalyticsConsent", () => {
  it("loads GA when analytics consent is granted", () => {
    setConsent(true);
    applyAnalyticsConsent();
    vi.runAllTimers();
    expect(gaScript()).not.toBeNull();
  });

  it("removes GA when analytics consent is withdrawn", () => {
    setConsent(true);
    applyAnalyticsConsent();
    vi.runAllTimers();
    expect(gaScript()).not.toBeNull();

    setConsent(false);
    applyAnalyticsConsent();
    expect(gaScript()).toBeNull();
    expect(gaInline()).toBeNull();
  });
});

describe("trackEvent", () => {
  it("forwards events to gtag when consent is given and gtag exists", () => {
    setConsent(true);
    const gtag = vi.fn();
    gaWindow.gtag = gtag;

    trackEvent("quote_submitted", { plan: "premium", value: 100 });

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "quote_submitted", {
      plan: "premium",
      value: 100,
    });
  });

  it("does NOT fire when analytics consent is missing", () => {
    setConsent(false);
    const gtag = vi.fn();
    gaWindow.gtag = gtag;

    trackEvent("quote_submitted");

    expect(gtag).not.toHaveBeenCalled();
  });

  it("is a no-op when gtag is not available (analytics not loaded yet)", () => {
    setConsent(true);
    expect(() => trackEvent("quote_submitted")).not.toThrow();
  });
});
