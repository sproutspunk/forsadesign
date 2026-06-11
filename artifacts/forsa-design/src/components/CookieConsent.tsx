import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "forsa-cookie-consent";
const REOPEN_EVENT = "forsa:open-cookie-preferences";
export const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export interface ConsentState {
  version: number;
  savedAt: number;
  decided: boolean;
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

export function loadConsent(): ConsentState | null {
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

function saveConsent(state: Omit<ConsentState, "version" | "savedAt">) {
  const full: ConsentState = { ...state, version: CONSENT_VERSION, savedAt: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent(REOPEN_EVENT));
}

export default function CookieConsent() {
  const { t } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = loadConsent();
    if (saved?.decided) return;
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleReopen = useCallback(() => {
    const saved = loadConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    }
    setExpanded(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener(REOPEN_EVENT, handleReopen);
    return () => window.removeEventListener(REOPEN_EVENT, handleReopen);
  }, [handleReopen]);

  function accept() {
    saveConsent({ decided: true, essential: true, analytics: true, marketing: true });
    setVisible(false);
  }

  function reject() {
    saveConsent({ decided: true, essential: true, analytics: false, marketing: false });
    setVisible(false);
  }

  function saveCustom() {
    saveConsent({ decided: true, essential: true, analytics, marketing });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-6 md:pb-6"
        role="dialog"
        aria-label={t("cookies.bannerTitle")}
        aria-modal="false"
      >
        <div className="mx-auto max-w-3xl bg-card border border-border/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-serif text-xl font-bold text-white leading-snug">
                {t("cookies.bannerTitle")}
              </h2>
              <button
                onClick={reject}
                aria-label="Close"
                className="text-foreground/40 hover:text-foreground/70 transition-colors shrink-0 mt-0.5"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-foreground/60 font-light leading-relaxed mb-5">
              {t("cookies.bannerDesc")}
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 mb-5">
                    <CategoryRow
                      label={t("cookies.essential")}
                      description={t("cookies.essentialDesc")}
                      checked={true}
                      disabled={true}
                      alwaysOnLabel={t("cookies.alwaysOn")}
                    />
                    <CategoryRow
                      label={t("cookies.analytics")}
                      description={t("cookies.analyticsDesc")}
                      checked={analytics}
                      onChange={setAnalytics}
                    />
                    <CategoryRow
                      label={t("cookies.marketing")}
                      description={t("cookies.marketingDesc")}
                      checked={marketing}
                      onChange={setMarketing}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-2">
              {expanded ? (
                <>
                  <button
                    onClick={saveCustom}
                    className="flex-1 min-w-[140px] bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t("cookies.savePreferences")}
                  </button>
                  <button
                    onClick={accept}
                    className="flex-1 min-w-[120px] bg-card border border-border/40 text-foreground/80 text-sm font-medium px-4 py-2.5 rounded-lg hover:border-primary/50 hover:text-white transition-colors"
                  >
                    {t("cookies.acceptAll")}
                  </button>
                  <button
                    onClick={() => setExpanded(false)}
                    className="flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground/80 transition-colors px-2 py-2.5"
                    aria-label="Collapse"
                  >
                    <ChevronDown size={15} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={accept}
                    className="flex-1 min-w-[120px] bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t("cookies.acceptAll")}
                  </button>
                  <button
                    onClick={reject}
                    className="flex-1 min-w-[140px] bg-card border border-border/40 text-foreground/80 text-sm font-medium px-4 py-2.5 rounded-lg hover:border-primary/50 hover:text-white transition-colors"
                  >
                    {t("cookies.rejectNonEssential")}
                  </button>
                  <button
                    onClick={() => setExpanded(true)}
                    className="flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground/80 transition-colors px-2 py-2.5"
                  >
                    {t("cookies.customise")}
                    <ChevronUp size={15} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface CategoryRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  alwaysOnLabel?: string;
  onChange?: (v: boolean) => void;
}

function CategoryRow({
  label,
  description,
  checked,
  disabled,
  alwaysOnLabel,
  onChange,
}: CategoryRowProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-border/20">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white mb-0.5">{label}</p>
        <p className="text-xs text-foreground/50 font-light leading-relaxed">{description}</p>
      </div>
      {disabled ? (
        <span className="text-xs text-primary/70 font-medium shrink-0 mt-0.5 whitespace-nowrap">
          {alwaysOnLabel}
        </span>
      ) : (
        <button
          role="switch"
          aria-checked={checked}
          onClick={() => onChange?.(!checked)}
          className={`relative shrink-0 mt-0.5 w-10 h-5.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            checked ? "bg-primary" : "bg-border/40"
          }`}
          style={{ minWidth: "2.5rem", height: "1.375rem" }}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              checked ? "translate-x-[1.125rem]" : "translate-x-0"
            }`}
          />
        </button>
      )}
    </div>
  );
}
