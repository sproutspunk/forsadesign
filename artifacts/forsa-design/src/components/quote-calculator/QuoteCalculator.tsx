import { useState, useCallback, useMemo, useContext, createContext } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { packagePresets, addOns, maintenanceOptions, VAT_RATE } from "@/data/quoteConfig";
import { QuoteSummary } from "./QuoteSummary";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Wrench as WrenchIcon,
  Tag,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  Boxes,
} from "lucide-react";

interface QuoteState {
  packageId: string;
  selectedAddOns: string[];
  extraLanguageCount: number;
  maintenance: string;
  discountPercent: number;
}

const initialState: QuoteState = {
  packageId: "business",
  selectedAddOns: [],
  extraLanguageCount: 1,
  maintenance: "none",
  discountPercent: 0,
};

const sectionIcons: Record<string, React.ReactNode> = {
  addons: <Boxes className="w-5 h-5" />,
  maintenance: <WrenchIcon className="w-5 h-5" />,
  discount: <Tag className="w-5 h-5" />,
  roi: <TrendingUp className="w-5 h-5" />,
};

// ─── Module-level context so Section/OptionCard are stable component types ────
interface CalcCtxValue {
  openSections: Set<string>;
  toggleSection: (id: string) => void;
  isEn: boolean;
  formatPrice: (n: number) => string;
}
const CalcCtx = createContext<CalcCtxValue>({} as CalcCtxValue);

function Section({
  id,
  titleEn,
  titlePl,
  children,
}: {
  id: string;
  titleEn: string;
  titlePl: string;
  children: React.ReactNode;
}) {
  const { openSections, toggleSection, isEn } = useContext(CalcCtx);
  const open = openSections.has(id);
  return (
    <div className="border border-border/30 rounded-xl overflow-hidden bg-card/50">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary">{sectionIcons[id]}</span>
          <span className="font-serif font-bold text-white text-base md:text-lg">
            {isEn ? titleEn : titlePl}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-foreground/50" />
        ) : (
          <ChevronDown className="w-5 h-5 text-foreground/50" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-5 pt-0 border-t border-border/20">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function QuoteCalculator() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = useCallback((en: string, pl: string) => (isEn ? en : pl), [isEn]);

  const [state, setState] = useState<QuoteState>(initialState);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["addons"]));
  const [showSuccess, setShowSuccess] = useState(false);

  const [roiVisitors, setRoiVisitors] = useState(5000);
  const [roiConversion, setRoiConversion] = useState(2);
  const [roiAvgValue, setRoiAvgValue] = useState(2000);

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const update = useCallback(<K extends keyof QuoteState>(key: K, value: QuoteState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectPackage = useCallback((packageId: string) => {
    setState((prev) => ({ ...prev, packageId }));
    setOpenSections(new Set(["addons", "maintenance"]));
  }, []);

  const toggleAddOn = useCallback((value: string) => {
    setState((prev) => {
      const has = prev.selectedAddOns.includes(value);
      const addon = addOns.find((a) => a.value === value);
      let next = has
        ? prev.selectedAddOns.filter((f) => f !== value)
        : [...prev.selectedAddOns, value];
      // delivery add-ons are mutually exclusive: only one speed tier at a time
      if (!has && addon?.group === "delivery") {
        next = next.filter(
          (v) => v === value || addOns.find((a) => a.value === v)?.group !== "delivery",
        );
      }
      return { ...prev, selectedAddOns: next };
    });
  }, []);

  const breakdown = useMemo(() => {
    const pkg = packagePresets.find((p) => p.id === state.packageId) ?? packagePresets[1];
    const packagePrice = pkg.price;

    let addOnsPrice = 0;
    for (const value of state.selectedAddOns) {
      const addon = addOns.find((a) => a.value === value);
      if (!addon) continue;
      let price = addon.price;
      if (value === "extra-language") price *= state.extraLanguageCount;
      addOnsPrice += price;
    }

    const subtotal = packagePrice + addOnsPrice;
    const discountAmount = Math.round(subtotal * (state.discountPercent / 100));
    const discounted = subtotal - discountAmount;
    const vat = Math.round(discounted * VAT_RATE);
    const total = discounted + vat;

    const maintenanceMonthly =
      maintenanceOptions.find((m) => m.value === state.maintenance)?.monthlyPrice ?? 0;

    let estimatedWeeks = pkg.weeksEn;
    let estimatedWeeksPl = pkg.weeksPl;
    if (state.selectedAddOns.includes("express-fasttrack")) {
      estimatedWeeks = "2-3 weeks (Express Fast Track)";
      estimatedWeeksPl = "2-3 tygodnie (Express Fast Track)";
    } else if (state.selectedAddOns.includes("express-priority")) {
      estimatedWeeks = "4-6 weeks (Express Priority)";
      estimatedWeeksPl = "4-6 tygodni (Express Priority)";
    }

    return {
      packagePrice,
      addOnsPrice,
      discountAmount,
      subtotal,
      vat,
      total,
      maintenanceMonthly,
      estimatedWeeks,
      estimatedWeeksPl,
    };
  }, [state]);

  const formatPrice = (n: number) =>
    n.toLocaleString(isEn ? "en-GB" : "pl-PL", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const selectedPackage = useMemo(
    () => packagePresets.find((p) => p.id === state.packageId) ?? packagePresets[1],
    [state.packageId],
  );

  const projectLabel = useMemo(
    () => t(selectedPackage.labelEn, selectedPackage.labelPl),
    [selectedPackage, t],
  );

  const roiEnquiries = Math.round(roiVisitors * (roiConversion / 100));
  const roiRevLow = roiEnquiries * roiAvgValue * 0.2;
  const roiRevHigh = roiEnquiries * roiAvgValue * 0.5;

  const trustItems = isEn
    ? ["Transparent pricing", "No hidden costs", "UK based service", "Fixed project quote"]
    : [
        "Przejrzyste ceny",
        "Brak ukrytych kosztów",
        "Usługa z Wielkiej Brytanii",
        "Stała wycena projektu",
      ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-24 md:pb-12">
        <div className="mb-8 md:mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-3">
            {t("B2B Industrial Project Estimator", "Estymator Projektów B2B dla Przemysłu")}
          </h1>
          <p className="text-foreground/60 max-w-2xl text-sm md:text-base">
            {t(
              "Choose a package designed for engineering and manufacturing firms. The estimate updates instantly.",
              "Wybierz pakiet zaprojektowany dla firm inżynieryjnych i produkcyjnych. Wycena aktualizuje się na bieżąco.",
            )}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
            {t("Step 1: Choose your package", "Krok 1: Wybierz pakiet")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {packagePresets.map((preset, i) => (
              <button
                key={preset.id}
                onClick={() => selectPackage(preset.id)}
                className={`relative text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 group ${
                  state.packageId === preset.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border/40 hover:border-primary/50 bg-card/50 hover:bg-primary/5"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground whitespace-nowrap">
                    {t("Most Popular", "Najpopularniejszy")}
                  </span>
                )}
                <div className="flex items-start justify-between gap-1 mb-1">
                  <span className="font-bold text-sm md:text-base">
                    {t(preset.labelEn, preset.labelPl)}
                  </span>
                  {state.packageId === preset.id && (
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
                <div className="text-lg md:text-xl font-bold text-primary">
                  {preset.isFromPrice ? `${t("From", "Od")} ` : ""}
                  {formatPrice(preset.price)}
                </div>
                <div className="text-xs text-foreground/50 mt-0.5 mb-3">
                  {t(preset.taglineEn, preset.taglinePl)}
                </div>
                <ul className="space-y-1.5">
                  {(isEn ? preset.featuresEn : preset.featuresPl).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-1.5 text-xs text-foreground/70"
                    >
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-border/20 text-xs text-foreground/50">
                  {t(preset.weeksEn, preset.weeksPl)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <CalcCtx.Provider value={{ openSections, toggleSection, isEn, formatPrice }}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 space-y-4">
              <div className="space-y-3 mb-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {trustItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-foreground/60"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Section
                id="addons"
                titleEn="Step 2: Additional Options"
                titlePl="Krok 2: Opcje dodatkowe"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const selected = state.selectedAddOns.includes(addon.value);
                    const isLanguage = addon.value === "extra-language" && selected;
                    return (
                      <button
                        key={addon.value}
                        onClick={() => toggleAddOn(addon.value)}
                        className={`relative text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/40 hover:border-border/80 bg-card/30 hover:bg-card/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-sm ${selected ? "font-semibold" : "font-medium"}`}>
                            {t(addon.labelEn, addon.labelPl)}
                          </span>
                          <span
                            className={`text-sm font-semibold whitespace-nowrap ${selected ? "text-primary" : "text-foreground/60"}`}
                          >
                            +{formatPrice(addon.price)}
                            {addon.perUnit ? t(" / language", " / język") : ""}
                          </span>
                        </div>
                        {isLanguage && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-foreground/50">
                              {t("Languages", "Języki")}:
                            </span>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={state.extraLanguageCount}
                              onChange={(e) =>
                                update(
                                  "extraLanguageCount",
                                  Math.max(1, parseInt(e.target.value) || 1),
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-16 px-2 py-1 text-xs rounded border border-border bg-background text-center"
                            />
                          </div>
                        )}
                        {selected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section id="maintenance" titleEn="Step 3: Maintenance" titlePl="Krok 3: Konserwacja">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {maintenanceOptions.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => update("maintenance", m.value)}
                      className={`relative text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ${
                        state.maintenance === m.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/40 hover:border-border/80 bg-card/30 hover:bg-card/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-sm ${state.maintenance === m.value ? "font-semibold" : "font-medium"}`}
                        >
                          {t(m.labelEn, m.labelPl)}
                        </span>
                        <span
                          className={`text-sm font-semibold whitespace-nowrap ${state.maintenance === m.value ? "text-primary" : "text-foreground/60"}`}
                        >
                          {m.monthlyPrice === 0
                            ? t("Included", "W cenie")
                            : `${formatPrice(m.monthlyPrice)}/${t("mo", "mies.")}`}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/50">
                        {t(m.descriptionEn, m.descriptionPl)}
                      </p>
                      {state.maintenance === m.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <Check className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </Section>

              <Section id="roi" titleEn="ROI Calculator" titlePl="Kalkulator ROI">
                <div className="space-y-5">
                  <p className="text-sm text-foreground/60">
                    {t(
                      "Estimate the revenue impact your new website could generate.",
                      "Oszacuj wpływ nowej strony na Twoje przychody.",
                    )}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-sm font-medium">
                          {t("Monthly Visitors", "Odwiedziny miesięcznie")}
                        </label>
                        <span className="text-sm font-semibold text-primary">
                          {roiVisitors.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={50000}
                        step={500}
                        value={roiVisitors}
                        onChange={(e) => setRoiVisitors(parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-foreground/40 mt-1">
                        <span>500</span>
                        <span>50,000</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-sm font-medium">
                          {t("Conversion Rate", "Współczynnik konwersji")}
                        </label>
                        <span className="text-sm font-semibold text-primary">{roiConversion}%</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.5}
                        value={roiConversion}
                        onChange={(e) => setRoiConversion(parseFloat(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-foreground/40 mt-1">
                        <span>0.5%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-sm font-medium">
                          {t("Avg. Project / Order Value", "Średnia wartość projektu / zamówienia")}
                        </label>
                        <span className="text-sm font-semibold text-primary">
                          {formatPrice(roiAvgValue)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={20000}
                        step={100}
                        value={roiAvgValue}
                        onChange={(e) => setRoiAvgValue(parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-foreground/40 mt-1">
                        <span>£100</span>
                        <span>£20,000</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    key={`${roiVisitors}-${roiConversion}-${roiAvgValue}`}
                    initial={{ opacity: 0.6, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    <div className="bg-muted/40 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-foreground">
                        {roiEnquiries.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50 mt-1">
                        {t("Enquiries / mo", "Zapytań / mies.")}
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center sm:col-span-2">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(roiRevLow)} - {formatPrice(roiRevHigh)}
                      </div>
                      <div className="text-xs text-foreground/50 mt-1">
                        {t("Potential revenue / month", "Potencjalny przychód / mies.")}
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/60">
                      {t(
                        "ROI estimates are indicative. Based on industry average conversion rates for professional websites. Actual results will vary.",
                        "Szacunki ROI mają charakter orientacyjny. Oparte na średnich branżowych wskaźnikach konwersji. Rzeczywiste wyniki mogą się różnić.",
                      )}
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="discount" titleEn="Discount" titlePl="Rabat">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground/60">{t("Discount", "Rabat")}:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={state.discountPercent}
                      onChange={(e) =>
                        update(
                          "discountPercent",
                          Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                        )
                      }
                      className="w-20 px-3 py-2 text-sm rounded-lg border border-border bg-background text-center"
                    />
                    <span className="text-sm text-foreground/60">%</span>
                  </div>
                  {state.discountPercent > 0 && (
                    <p className="text-sm text-primary font-medium">
                      {t("You save", "Oszczędzasz")}: {formatPrice(breakdown.discountAmount)}
                    </p>
                  )}
                </div>
              </Section>
            </div>

            <div className="lg:w-80 xl:w-96">
              <QuoteSummary
                breakdown={breakdown}
                isEn={isEn}
                formatPrice={formatPrice}
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                state={state}
                onReset={() => setState(initialState)}
                projectLabel={projectLabel}
              />
            </div>
          </div>
        </CalcCtx.Provider>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border/40 px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="text-xs text-foreground/50">
            {t("Estimated Investment", "Szacowana Inwestycja")}
          </div>
          <motion.div
            key={breakdown.total}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-primary"
          >
            {formatPrice(breakdown.total)}
          </motion.div>
        </div>
        <button
          onClick={() => {
            const el = document.querySelector(".lg\\:sticky");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          {t("View Estimate", "Zobacz wycenę")}
        </button>
      </div>
    </div>
  );
}
