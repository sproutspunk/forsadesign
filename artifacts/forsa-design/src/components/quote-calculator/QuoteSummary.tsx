import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Printer,
  Mail,
  Save,
  RotateCcw,
  CheckCircle2,
  PoundSterling,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
} from "lucide-react";
import { trackEvent } from "@/lib/consentManager";
import Turnstile from "@/components/Turnstile";

const SITE_KEY = import.meta.env.TURNSTILE_SITE_KEY as string | undefined;

interface Breakdown {
  packagePrice: number;
  addOnsPrice: number;
  discountAmount: number;
  subtotal: number;
  vat: number;
  total: number;
  maintenanceMonthly: number;
  estimatedWeeks: string;
  estimatedWeeksPl: string;
}

interface QuoteSummaryProps {
  breakdown: Breakdown;
  isEn: boolean;
  formatPrice: (n: number) => string;
  showSuccess: boolean;
  setShowSuccess: (v: boolean) => void;
  state: unknown;
  onReset: () => void;
  projectLabel: string;
}

const INCLUDED_EN = [
  "Responsive Design",
  "SEO Foundation",
  "Security Configuration",
  "Performance Optimisation",
  "Mobile Optimised",
  "Cross-Browser Testing",
];

const INCLUDED_PL = [
  "Responsywny design",
  "Podstawy SEO",
  "Konfiguracja bezpieczeństwa",
  "Optymalizacja wydajności",
  "Optymalizacja mobilna",
  "Testy kompatybilności między przeglądarkami",
];

function createQuoteId() {
  return `FD-${crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
}

export function QuoteSummary({
  breakdown,
  isEn,
  formatPrice,
  showSuccess,
  setShowSuccess,
  state,
  onReset,
  projectLabel,
}: QuoteSummaryProps) {
  const t = (en: string, pl: string) => (isEn ? en : pl);
  const [saved, setSaved] = useState(false);
  const [showLineItems, setShowLineItems] = useState(false);
  const [emailStep, setEmailStep] = useState<"idle" | "capturing" | "done">("idle");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSave = () => {
    const quotes = JSON.parse(localStorage.getItem("forsa-quotes") || "[]");
    const quote = {
      id: `FD-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      state,
      breakdown,
    };
    quotes.unshift(quote);
    localStorage.setItem("forsa-quotes", JSON.stringify(quotes.slice(0, 50)));
    trackEvent("quote_saved", { language: isEn ? "en" : "pl", total: breakdown.total });
    setSaved(true);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSaved(false);
    }, 3000);
  };

  const handlePrint = () => window.print();

  const handleEmail = () => {
    trackEvent("quote_email_client_open", { language: isEn ? "en" : "pl", total: breakdown.total });
    const subject = encodeURIComponent(
      t("Website Quote Request", "Zapytanie o wycen\u0119 strony"),
    );
    const body = encodeURIComponent(
      `${t("Project total", "Ca\u0142kowita wycena")}: ${formatPrice(breakdown.total)}\n${t("Estimated time", "Szacowany czas")}: ${isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}`,
    );
    window.location.href = `mailto:hello@forsadesign.co.uk?subject=${subject}&body=${body}`;
  };

  const lineItems = [
    { label: t("Package", "Pakiet"), value: breakdown.packagePrice },
    { label: t("Additional Options", "Opcje dodatkowe"), value: breakdown.addOnsPrice },
  ].filter((item) => item.value > 0);

  const createPdf = async (quoteId: string) => {
    const { generateQuotePdfBytes } = await import("@/utils/generateQuotePdf");
    return generateQuotePdfBytes({
      quoteId,
      dateStr: new Date().toLocaleDateString(isEn ? "en-GB" : "pl-PL"),
      projectLabel,
      subtotal: breakdown.subtotal - breakdown.discountAmount,
      total: breakdown.total,
      discountAmount: breakdown.discountAmount,
      maintenanceMonthly: breakdown.maintenanceMonthly,
      estimatedWeeks: isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl,
      lineItems,
      includedItems: isEn ? INCLUDED_EN : INCLUDED_PL,
      formatPrice,
      isEn,
    });
  };

  const downloadPdfBytes = (pdfBytes: Uint8Array, quoteId: string) => {
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `forsa-quote-${quoteId}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const triggerPdf = async () => {
    setIsGenerating(true);
    try {
      const quoteId = createQuoteId();
      const pdfBytes = await createPdf(quoteId);
      trackEvent("quote_downloaded", { language: isEn ? "en" : "pl", total: breakdown.total });
      downloadPdfBytes(pdfBytes, quoteId);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadClick = () => {
    if (emailStep === "done") {
      void triggerPdf();
    } else {
      setEmailStep("capturing");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gotcha.trim() !== "") {
      trackEvent("quote_email_bot_honeypot", { language: isEn ? "en" : "pl", project: projectLabel });
      setEmailError(t("Could not send the quote.", "Nie udalo sie wyslac wyceny."));
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError(t("Enter a valid email address.", "Podaj poprawny adres email."));
      return;
    }
    if (SITE_KEY && !turnstileToken) {
      setEmailError(t("Please complete the security check.", "Uzupełnij weryfikację bezpieczeństwa."));
      return;
    }
    setEmailError("");
    setIsGenerating(true);
    const quotes = JSON.parse(localStorage.getItem("forsa-quotes") || "[]");
    const existing = quotes[0];
    if (existing) {
      existing.email = email;
      localStorage.setItem("forsa-quotes", JSON.stringify(quotes));
    }
    try {
      const quoteId = createQuoteId();
      const pdfBytes = await createPdf(quoteId);
      let binary = "";
      for (const byte of pdfBytes) binary += String.fromCharCode(byte);
      const response = await fetch("/api/quotes/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          phone: phone.trim(),
          pdfBase64: btoa(binary),
          quoteId,
          projectLabel,
          total: formatPrice(breakdown.total),
          estimatedWeeks: isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl,
          isEn,
          turnstileToken,
          _gotcha: gotcha,
        }),
      });
      const responseText = await response.text();
      let result: { ok?: boolean; error?: string } = {};
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText) as { ok?: boolean; error?: string };
        } catch {
          throw new Error(
            t(
              `The quote service returned an invalid response (${response.status}). Please try again.`,
              `Serwis wycen zwrócił nieprawidłową odpowiedź (${response.status}). Spróbuj ponownie.`,
            ),
          );
        }
      }
      if (!response.ok || !result.ok) {
        const statusCode = response.status.toString();
        trackEvent("quote_email_error", { status: statusCode, language: isEn ? "en" : "pl" });
        throw new Error(
          result.error || t("Could not send the quote.", "Nie udalo sie wyslac wyceny."),
        );
      }
      trackEvent("quote_email_sent", {
        language: isEn ? "en" : "pl",
        total: breakdown.total,
        project: projectLabel,
      });
      setEmailStep("done");
      setTurnstileToken("");
      downloadPdfBytes(pdfBytes, quoteId);
    } catch (error) {
      setEmailError(
        error instanceof Error
          ? error.message
          : t("Could not send the quote.", "Nie udalo sie wyslac wyceny."),
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-6">
      <div className="bg-card border border-border/30 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 md:p-6 border-b border-border/20">
          <div className="flex items-center gap-2 mb-1">
            <PoundSterling className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t("Estimated Investment", "Szacowana Inwestycja")}
            </span>
          </div>

          <motion.div
            key={breakdown.total}
            initial={{ scale: 0.97, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {formatPrice(breakdown.total)}
            </div>
          </motion.div>

          <div className="mt-3 pt-3 border-t border-border/20 space-y-1 text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>{t("Project value", "Warto\u015b\u0107 projektu")}</span>
              <span className="font-medium text-foreground">{projectLabel}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>{t("Delivery", "Realizacja")}</span>
              <span className="font-medium text-foreground">
                {isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}
              </span>
            </div>
            {breakdown.maintenanceMonthly > 0 && (
              <div className="flex justify-between text-foreground/70">
                <span>{t("Monthly", "Miesi\u0119czna")}</span>
                <span className="font-medium text-foreground">
                  {formatPrice(breakdown.maintenanceMonthly)}/{t("mo", "mies.")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
              {t("Included in every project", "W ka\u017cdym projekcie")}
            </p>
            <div className="grid grid-cols-1 gap-1">
              {(isEn ? INCLUDED_EN : INCLUDED_PL).map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/20 pt-4">
            <button
              onClick={() => {
                setShowLineItems((v) => {
                  const next = !v;
                  if (next) {
                    trackEvent("quote_breakdown_expanded", {
                      language: isEn ? "en" : "pl",
                      total: breakdown.total,
                    });
                  }
                  return next;
                });
              }}
              className="w-full flex items-center justify-between text-xs text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <span>{t("View cost breakdown", "Zestawienie koszt\u00f3w")}</span>
              {showLineItems ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
            <AnimatePresence>
              {showLineItems && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-1.5">
                    {lineItems.map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-foreground/60">{item.label}</span>
                        <span className="font-medium">+{formatPrice(item.value)}</span>
                      </div>
                    ))}
                    {breakdown.discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-emerald-500">
                        <span>{t("Discount", "Rabat")}</span>
                        <span>-{formatPrice(breakdown.discountAmount)}</span>
                      </div>
                    )}
                    <div className="border-t border-border/20 pt-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60 font-semibold">
                          {t("Total", "Razem")}
                        </span>
                        <span className="font-semibold">{formatPrice(breakdown.total)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {emailStep === "capturing" ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                onSubmit={handleEmailSubmit}
                className="space-y-2"
              >
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="quote-email-company">Company</label>
                  <input
                    id="quote-email-company"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={gotcha}
                    onChange={(e) => setGotcha(e.target.value)}
                  />
                </div>
                <p className="text-sm font-medium">
                  {t("Your quote is ready.", "Twoja wycena jest gotowa.")}
                </p>
                <p className="text-xs text-foreground/60">
                  {t(
                    "Enter your email to receive the PDF quote:",
                    "Podaj email, aby otrzymac wycene:",
                  )}
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Name (optional)", "Imię (opcjonalnie)")}
                    maxLength={100}
                    autoComplete="name"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("Phone (optional)", "Telefon (opcjonalnie)")}
                    maxLength={40}
                    autoComplete="tel"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                {SITE_KEY && <Turnstile siteKey={SITE_KEY} onVerify={setTurnstileToken} />}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  {isGenerating
                    ? t("Sending quote...", "Wysylanie wyceny...")
                    : t("Send my quote", "Wyslij wycene")}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="action-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <a
                  href={t("/en/contact", "/pl/contact")}
                  onClick={() =>
                    trackEvent("quote_discovery_call_click", {
                      language: isEn ? "en" : "pl",
                      total: breakdown.total,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t("Request a Discovery Call", "Um\u00f3w rozmow\u0119 wst\u0119pn\u0105")}
                </a>
                <button
                  onClick={handleDownloadClick}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border-2 border-border/60 text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("Generating PDF...", "Generowanie PDF...")}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      {t("Download PDF Estimate", "Pobierz wycen\u0119 PDF")}
                    </>
                  )}
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleEmail}
                    className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {t("Email", "Email")}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {t("Print", "Drukuj")}
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-1 px-2 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {saved ? t("Saved", "Zapisano") : t("Save", "Zapisz")}
                  </button>
                </div>
                <button
                  onClick={() => {
                    trackEvent("quote_reset", { language: isEn ? "en" : "pl" });
                    onReset();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg border-2 border-red-400/60 text-red-300 bg-red-400/5 hover:border-red-400 hover:text-red-200 hover:bg-red-400/15 active:scale-[0.98] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("Reset Calculator", "Resetuj kalkulator")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("Quote saved successfully", "Wycena zapisana pomy\u015blnie")}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            {t(
              "Indicative estimate. Final price confirmed after discovery call.",
              "Wst\u0119pna wycena. Ostateczna cena po rozmowie wst\u0119pnej.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
