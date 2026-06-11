import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import CookieConsent, {
  openCookiePreferences,
  CONSENT_VERSION,
} from "../src/components/CookieConsent";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);
  const motion = {
    div: React.forwardRef(
      (
        {
          children,
          initial: _i,
          animate: _a,
          exit: _e,
          transition: _t,
          ...props
        }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>,
        ref: React.Ref<HTMLDivElement>,
      ) => React.createElement("div", { ...props, ref }, children),
    ),
  };
  return { AnimatePresence, motion };
});

vi.mock("../src/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: "en",
  }),
}));

const STORAGE_KEY = "forsa-cookie-consent";

function clearConsent() {
  localStorage.removeItem(STORAGE_KEY);
}

function getConsent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setConsent(value: object) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

describe("CookieConsent", () => {
  beforeEach(() => {
    clearConsent();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it("does not render immediately on mount (waits 600ms)", () => {
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("appears after 600ms when no consent is stored", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cookies\.acceptAll/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cookies\.rejectNonEssential/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cookies\.customise/i })).toBeInTheDocument();
  });

  it("does NOT appear when a decided consent record exists in localStorage", () => {
    setConsent({
      version: CONSENT_VERSION,
      savedAt: Date.now(),
      decided: true,
      essential: true,
      analytics: false,
      marketing: false,
    });
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Accept All dismisses the banner and saves correct consent", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    fireEvent.click(screen.getByRole("button", { name: /cookies\.acceptAll/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const consent = getConsent();
    expect(consent).not.toBeNull();
    expect(consent.decided).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.marketing).toBe(true);
    expect(consent.essential).toBe(true);
  });

  it("Reject Non-Essential dismisses the banner and saves correct consent", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    fireEvent.click(screen.getByRole("button", { name: /cookies\.rejectNonEssential/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const consent = getConsent();
    expect(consent).not.toBeNull();
    expect(consent.decided).toBe(true);
    expect(consent.analytics).toBe(false);
    expect(consent.marketing).toBe(false);
    expect(consent.essential).toBe(true);
  });

  it("Customise button expands the panel with category toggles", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(screen.queryByRole("switch")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cookies\.customise/i }));

    const switches = screen.getAllByRole("switch");
    expect(switches).toHaveLength(2);
    expect(screen.getByRole("button", { name: /cookies\.savePreferences/i })).toBeInTheDocument();
  });

  it("Collapse button hides the Customise panel again", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    fireEvent.click(screen.getByRole("button", { name: /cookies\.customise/i }));
    expect(screen.getAllByRole("switch")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: /Collapse/i }));

    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cookies\.acceptAll/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cookies\.rejectNonEssential/i }),
    ).toBeInTheDocument();
  });

  it("Save Preferences persists custom toggle values and dismisses the banner", async () => {
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    fireEvent.click(screen.getByRole("button", { name: /cookies\.customise/i }));

    const [analyticsSwitch, marketingSwitch] = screen.getAllByRole("switch");

    if (analyticsSwitch.getAttribute("aria-checked") !== "true") {
      fireEvent.click(analyticsSwitch);
    }
    if (marketingSwitch.getAttribute("aria-checked") === "true") {
      fireEvent.click(marketingSwitch);
    }

    fireEvent.click(screen.getByRole("button", { name: /cookies\.savePreferences/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const consent = getConsent();
    expect(consent).not.toBeNull();
    expect(consent.decided).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.marketing).toBe(false);
  });

  it("reopens the banner via the forsa:open-cookie-preferences custom event (footer button)", async () => {
    setConsent({
      version: CONSENT_VERSION,
      savedAt: Date.now(),
      decided: true,
      essential: true,
      analytics: true,
      marketing: false,
    });
    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => {
      openCookiePreferences();
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getAllByRole("switch")).toHaveLength(2);

    const [analyticsSwitch, marketingSwitch] = screen.getAllByRole("switch");
    expect(analyticsSwitch.getAttribute("aria-checked")).toBe("true");
    expect(marketingSwitch.getAttribute("aria-checked")).toBe("false");
  });
});
