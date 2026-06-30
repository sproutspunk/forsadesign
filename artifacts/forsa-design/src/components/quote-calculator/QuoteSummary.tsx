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
}

export function QuoteSummary({
  breakdown,
  isEn,
  formatPrice,
  showSuccess,
  setShowSuccess,
  state,
  onReset,
}: QuoteSummaryProps) {
  const t = (en: string, pl: string) => (isEn ? en : pl);
  const [saved, setSaved] = useState(false);
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
    const subject = encodeURIComponent(
      t("Website Quote Request", "Zapytanie o wycen\u0119 strony"),
    );
    const body = encodeURIComponent(
      `${t("Project total", "Ca\u0142kowita wycena")}: ${formatPrice(breakdown.total)}\n${t("Estimated time", "Szacowany czas")}: ${isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}`,
    );
    window.location.href = `mailto:hello@forsadesign.co.uk?subject=${subject}&body=${body}`;
  };

  const handleDownload = () => {
    const lines = [
      t("WEBSITE QUOTE", "WYCENA STRONY"),
      "================================",
      ``,
      `${t("Project Cost", "Koszt projektu")}: ${formatPrice(breakdown.subtotal)}`,
      `${t("VAT (20%)", "VAT (20%)")}: ${formatPrice(breakdown.vat)}`,
      `${t("Grand Total", "\u0141\u0105cznie")}: ${formatPrice(breakdown.total)}`,
      ``,
      `${t("Estimated Development Time", "Szacowany czas realizacji")}: ${isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}`,
    ];
    if (breakdown.maintenanceMonthly > 0) {
      lines.push(
        ``,
        `${t("Estimated Monthly Cost", "Szacowany koszt miesi\u0119czny")}: ${formatPrice(breakdown.maintenanceMonthly)}/${t("month", "mies.")}`,
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forsa-quote-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineItems = [
    { label: t("Project", "Projekt"), value: breakdown.projectPrice },
    { label: t("Additional Pages", "Dodatkowe strony"), value: breakdown.pagesPrice },
    { label: t("Design", "Design"), value: breakdown.designPrice },
    { label: t("Content", "Tre\u015b\u0107"), value: breakdown.contentPrice },
    { label: t("Logo", "Logo"), value: breakdown.logoPrice },
    { label: t("Photography", "Fotografia"), value: breakdown.photoPrice },
    { label: t("Features", "Funkcje"), value: breakdown.featuresPrice },
    { label: t("SEO", "SEO"), value: breakdown.seoPrice },
    { label: t("Performance", "Wydajno\u015b\u0107"), value: breakdown.perfPrice },
    { label: t("Hosting", "Hosting"), value: breakdown.hostingPrice },
    { label: t("Delivery Fee", "Op\u0142ata za czas"), value: breakdown.deliveryFee },
  ].filter((item) => item.value > 0);

  return (
    <div className="lg:sticky lg:top-6">
      <div
        ref={summaryRef}
        className="bg-card border border-border/30 rounded-xl p-5 md:p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PoundSterling className="w-5 h-5 text-primary" />
          {t("Quote Summary", "Podsumowanie wyceny")}
        </h3>

        <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-1">
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
        </div>

        <div className="border-t border-border/30 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">{t("Subtotal", "Suma cz\u0119\u015bciowa")}</span>
            <span className="font-semibold">
              {formatPrice(breakdown.subtotal - breakdown.discountAmount)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">{t("VAT (20%)", "VAT (20%)")}</span>
            <span className="font-semibold">{formatPrice(breakdown.vat)}</span>
          </div>
          <motion.div
            className="flex justify-between items-center pt-2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            key={breakdown.total}
          >
            <span className="text-base font-bold">{t("Total", "\u0141\u0105cznie")}</span>
            <span className="text-xl md:text-2xl font-bold text-primary">
              {formatPrice(breakdown.total)}
            </span>
          </motion.div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/30 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground/60">{t("Estimated Time", "Szacowany czas")}</span>
            <span className="font-medium">
              {isEn ? breakdown.estimatedWeeks : breakdown.estimatedWeeksPl}
            </span>
          </div>
          {breakdown.maintenanceMonthly > 0 && (
            <div className="flex justify-between">
              <span className="text-foreground/60">
                {t("Monthly Cost", "Koszt miesi\u0119czny")}
              </span>
              <span className="font-medium">
                {formatPrice(breakdown.maintenanceMonthly)}/{t("month", "mies.")}
              </span>
            </div>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {t("Download", "Pobierz")}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            {t("Print", "Drukuj")}
          </button>
          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            {t("Email", "Email")}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? t("Saved", "Zapisano") : t("Save", "Zapisz")}
          </button>
        </div>

        <button
          onClick={onReset}
          className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-border/40 hover:bg-muted/50 transition-colors text-foreground/60"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t("Reset Calculator", "Resetuj kalkulator")}
        </button>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t("Quote saved successfully", "Wycena zapisana pomy\u015blnie")}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
