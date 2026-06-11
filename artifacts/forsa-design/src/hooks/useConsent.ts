import { useState, useEffect } from "react";
import { getConsent, CONSENT_UPDATED_EVENT, type ConsentState } from "@/lib/consentManager";

/**
 * Returns the current consent state and re-renders whenever the user updates
 * their preferences (i.e. whenever "forsa:consent-updated" is dispatched).
 */
export function useConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(() => getConsent());

  useEffect(() => {
    function handleUpdate(e: Event) {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsent(detail ?? getConsent());
    }

    window.addEventListener(CONSENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleUpdate);
  }, []);

  return consent;
}
