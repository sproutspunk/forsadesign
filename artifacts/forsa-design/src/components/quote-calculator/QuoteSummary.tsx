import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

interface Breakdown {
  projectPrice: number;
  pagesPrice: number;
  designPrice: number;
  contentPrice: number;
  logoPrice: number;
  photoPrice: number;
  featuresPrice: number;
  seoPrice: number;
  perfPrice: number;
  hostingPrice: number;
  deliveryFee: number;
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
  "Security Setup",
  "Performance Optimisation",
  "Mobile Optimised",
  "Cross-browser Testing",
];

const INCLUDED_PL = [
  "Responsywny design",
  "Podstawy SEO",
  "Konfiguracja bezpieczeństwa",
  "Optymalizacja wydajności",
  "Optymalizacja mobilna",
  "Testy cross-browser",
];

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
  const summaryRef = useRef<HTMLDivElement>(null);

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
    setSaved(true);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSaved(false);
    }, 3000);
  };

  const handlePrint = () => window.print();

  const handleEmail = () => {
    const subject = encodeURIComponent(t("Website Quote Request", "Zapytanie o wycenę strony"));
    const body = encodeURIComponent(
      `${t("Project total", "Całkowita wycena")}: ${formatPrice(breakdown.total)}\n${t("Estimated time", "Szacowany czas")}: ${isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}`,
    );
    window.location.href = `mailto:hello@forsadesign.co.uk?subject=${subject}&body=${body}`;
  };

  const triggerDownload = () => {
    const lines = [
      "FORSA DESIGN",
      "forsadesign.co.uk | hello@forsadesign.co.uk",
      "=".repeat(40),
      "",
      t("WEBSITE QUOTE", "WYCENA STRONY"),
      `${t("Date", "Data")}: ${new Date().toLocaleDateString(isEn ? "en-GB" : "pl-PL")}`,
      "",
      `${t("Project", "Projekt")}: ${projectLabel}`,
      "",
      "-".repeat(40),
      t("COST BREAKDOWN", "ZESTAWIENIE KOSZTÓW"),
      "-".repeat(40),
    ];
    if (breakdown.projectPrice > 0)
      lines.push(`${t("Project Type", "Typ projektu")}: ${formatPrice(breakdown.projectPrice)}`);
    if (breakdown.pagesPrice > 0)
      lines.push(
        `${t("Additional Pages", "Dodatkowe strony")}: ${formatPrice(breakdown.pagesPrice)}`,
      );
    if (breakdown.designPrice > 0)
      lines.push(`${t("Design", "Design")}: ${formatPrice(breakdown.designPrice)}`);
    if (breakdown.contentPrice > 0)
      lines.push(`${t("Content", "Treść")}: ${formatPrice(breakdown.contentPrice)}`);
    if (breakdown.logoPrice > 0)
      lines.push(`${t("Logo", "Logo")}: ${formatPrice(breakdown.logoPrice)}`);
    if (breakdown.photoPrice > 0)
      lines.push(`${t("Photography", "Fotografia")}: ${formatPrice(breakdown.photoPrice)}`);
    if (breakdown.featuresPrice > 0)
      lines.push(`${t("Features", "Funkcje")}: ${formatPrice(breakdown.featuresPrice)}`);
    if (breakdown.seoPrice > 0)
      lines.push(`${t("SEO", "SEO")}: ${formatPrice(breakdown.seoPrice)}`);
    if (breakdown.perfPrice > 0)
      lines.push(`${t("Performance", "Wydajność")}: ${formatPrice(breakdown.perfPrice)}`);
    if (breakdown.hostingPrice > 0)
      lines.push(`${t("Hosting", "Hosting")}: ${formatPrice(breakdown.hostingPrice)}`);
    if (breakdown.deliveryFee > 0)
      lines.push(`${t("Delivery Fee", "Opłata za czas")}: ${formatPrice(breakdown.deliveryFee)}`);
    if (breakdown.discountAmount > 0)
      lines.push(`${t("Discount", "Rabat")}: -${formatPrice(breakdown.discountAmount)}`);
    lines.push(
      "",
      "-".repeat(40),
      `${t("Subtotal (ex VAT)", "Suma netto")}: ${formatPrice(breakdown.subtotal - breakdown.discountAmount)}`,
      `${t("VAT (20%)", "VAT (20%)")}: ${formatPrice(breakdown.vat)}`,
      `${t("TOTAL", "ŁĄCZNIE")}: ${formatPrice(breakdown.total)}`,
      "",
    );
    if (breakdown.maintenanceMonthly > 0) {
      lines.push(
        `${t("Monthly Maintenance", "Miesięczna konserwacja")}: ${formatPrice(breakdown.maintenanceMonthly)}/${t("month", "mies.")}`,
        "",
      );
    }
    lines.push(
      "-".repeat(40),
      t("INCLUDED IN EVERY PROJECT", "W KAŻDYM PROJEKCIE"),
      "-".repeat(40),
    );
    (isEn ? INCLUDED_EN : INCLUDED_PL).forEach((item) => lines.push(`✓ ${item}`));
    lines.push(
      "",
      `${t("Estimated Delivery", "Szacowany czas realizacji")}: ${isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}`,
      "",
      t(
        "This is an indicative estimate. Final pricing confirmed after discovery call.",
        "To jest wstępna wycena. Ostateczna cena potwierdzona po rozmowie wstępnej.",
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forsa-quote-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = () => {
    if (emailStep === "done") {
      triggerDownload();
    } else {
      setEmailStep("capturing");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const quotes = JSON.parse(localStorage.getItem("forsa-quotes") || "[]");
    const existing = quotes[0];
    if (existing) {
      existing.email = email;
      localStorage.setItem("forsa-quotes", JSON.stringify(quotes));
    }
    setEmailStep("done");
    triggerDownload();
  };

  const lineItems = [
    { label: t("Project", "Projekt"), value: breakdown.projectPrice },
    { label: t("Additional Pages", "Dodatkowe strony"), value: breakdown.pagesPrice },
    { label: t("Design", "Design"), value: breakdown.designPrice },
    { label: t("Content", "Treść"), value: breakdown.contentPrice },
    { label: t("Logo", "Logo"), value: breakdown.logoPrice },
    { label: t("Photography", "Fotografia"), value: breakdown.photoPrice },
    { label: t("Features", "Funkcje"), value: breakdown.featuresPrice },
    { label: t("SEO", "SEO"), value: breakdown.seoPrice },
    { label: t("Performance", "Wydajność"), value: breakdown.perfPrice },
    { label: t("Hosting", "Hosting"), value: breakdown.hostingPrice },
    { label: t("Delivery Fee", "Opłata za czas"), value: breakdown.deliveryFee },
  ].filter((item) => item.value > 0);

  return (
    <div className="lg:sticky lg:top-6">
      <div
        ref={summaryRef}
        className="bg-card border border-border/30 rounded-xl shadow-lg overflow-hidden"
      >
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
            <div className="text-xs text-foreground/50 mt-1">
              {t("inc. VAT (20%)", "z VAT (20%)")}
            </div>
          </motion.div>

          <div className="mt-3 pt-3 border-t border-border/20 space-y-1 text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>{t("Project value", "Wartość projektu")}</span>
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
                <span>{t("Monthly", "Miesięcznie")}</span>
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
              {t("Included in every project", "W każdym projekcie")}
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
              onClick={() => setShowLineItems((v) => !v)}
              className="w-full flex items-center justify-between text-xs text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <span>{t("View cost breakdown", "Zestawienie kosztów")}</span>
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
                    <div className="border-t border-border/20 pt-2 mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">
                          {t("Subtotal", "Suma częściowa")}
                        </span>
                        <span className="font-semibold">
                          {formatPrice(breakdown.subtotal - breakdown.discountAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">{t("VAT (20%)", "VAT (20%)")}</span>
                        <span className="font-semibold">{formatPrice(breakdown.vat)}</span>
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
                <p className="text-sm font-medium">
                  {t("Your quote is ready.", "Twoja wycena jest gotowa.")}
                </p>
                <p className="text-xs text-foreground/60">
                  {t(
                    "Enter your email to receive the PDF quote:",
                    "Podaj email, aby otrzymać wycenę:",
                  )}
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("your@email.com", "twój@email.com")}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEmailStep("idle")}
                    className="px-3 py-2 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-colors text-foreground/60"
                  >
                    {t("Skip", "Pomiń")}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    {t("Send my quote", "Wyślij wycenę")}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="action-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <button
                  onClick={handleDownloadClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t("Download Quote", "Pobierz wycenę")}
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
                  onClick={onReset}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border/30 hover:bg-muted/50 transition-colors text-foreground/50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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
                {t("Quote saved successfully", "Wycena zapisana pomyślnie")}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            {t(
              "Indicative estimate. Final price confirmed after discovery call.",
              "Wstępna wycena. Ostateczna cena po rozmowie wstępnej.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
