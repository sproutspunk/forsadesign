import { useState, useCallback, useMemo, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  projectTypes,
  designOptions,
  contentOptions,
  logoOptions,
  photographyOptions,
  features,
  seoOptions,
  performanceOptions,
  hostingOptions,
  maintenanceOptions,
  deliveryOptions,
  packagePresets,
  VAT_RATE,
  ADDITIONAL_PAGE_PRICE,
  MAX_ADDITIONAL_PAGES,
} from "@/data/quoteConfig";
import { QuoteSummary } from "./QuoteSummary";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Layers,
  Palette,
  FileText as _FileText,
  Image,
  Camera,
  Wrench,
  Search,
  Gauge,
  Server,
  Wrench as WrenchIcon,
  Clock,
  Tag,
  Calculator as CalcIcon,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

interface QuoteState {
  projectType: string;
  additionalPages: number;
  design: string;
  content: string;
  logo: string;
  photography: string;
  selectedFeatures: string[];
  seo: string;
  performance: string;
  hosting: string;
  maintenance: string;
  delivery: string;
  multilangCount: number;
  apiCount: number;
  discountPercent: number;
}

const initialState: QuoteState = {
  projectType: "landing",
  additionalPages: 0,
  design: "template",
  content: "client",
  logo: "existing",
  photography: "client",
  selectedFeatures: [],
  seo: "none",
  performance: "standard",
  hosting: "client",
  maintenance: "none",
  delivery: "standard",
  multilangCount: 1,
  apiCount: 1,
  discountPercent: 0,
};

const sectionIcons: Record<string, React.ReactNode> = {
  project: <CalcIcon className="w-5 h-5" />,
  pages: <Layers className="w-5 h-5" />,
  design: <Palette className="w-5 h-5" />,
  content: <_FileText className="w-5 h-5" />,
  logo: <Image className="w-5 h-5" />,
  photos: <Camera className="w-5 h-5" />,
  features: <Wrench className="w-5 h-5" />,
  seo: <Search className="w-5 h-5" />,
  performance: <Gauge className="w-5 h-5" />,
  hosting: <Server className="w-5 h-5" />,
  maintenance: <WrenchIcon className="w-5 h-5" />,
  delivery: <Clock className="w-5 h-5" />,
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
          <span className="font-semibold text-sm md:text-base">{isEn ? titleEn : titlePl}</span>
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

function OptionCard({
  selected,
  onClick,
  label,
  price,
  highlight = false,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  price: number;
  highlight?: boolean;
}) {
  const { isEn, formatPrice } = useContext(CalcCtx);
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border/40 hover:border-border/80 bg-card/30"
      } ${highlight && selected ? "ring-1 ring-primary/30" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm md:text-base font-medium">{label}</span>
        <span className="text-sm font-semibold text-primary whitespace-nowrap">
          {price === 0 ? (isEn ? "Included" : "W cenie") : `+${formatPrice(price)}`}
        </span>
      </div>
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
}

// ─────────────────────────────────────────────────────────────────────────────
export default function QuoteCalculator() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = useCallback((en: string, pl: string) => (isEn ? en : pl), [isEn]);

  const [state, setState] = useState<QuoteState>(initialState);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["project"]));
  const [showSuccess, setShowSuccess] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

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
    setActivePreset(null);
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = packagePresets.find((p) => p.id === presetId);
    if (!preset) return;
    setState(preset.state);
    setActivePreset(presetId);
    setOpenSections(new Set(["project"]));
  }, []);

  const toggleFeature = useCallback((value: string) => {
    setState((prev) => {
      const has = prev.selectedFeatures.includes(value);
      return {
        ...prev,
        selectedFeatures: has
          ? prev.selectedFeatures.filter((f) => f !== value)
          : [...prev.selectedFeatures, value],
      };
    });
    setActivePreset(null);
  }, []);

  const breakdown = useMemo(() => {
    const projectPrice = projectTypes.find((p) => p.value === state.projectType)?.price ?? 0;
    const pagesPrice = state.additionalPages * ADDITIONAL_PAGE_PRICE;
    const designPrice = designOptions.find((d) => d.value === state.design)?.price ?? 0;
    const contentPrice = contentOptions.find((c) => c.value === state.content)?.price ?? 0;
    const logoPrice = logoOptions.find((l) => l.value === state.logo)?.price ?? 0;
    const photoPrice = photographyOptions.find((p) => p.value === state.photography)?.price ?? 0;

    let featuresPrice = 0;
    for (const f of state.selectedFeatures) {
      const feat = features.find((x) => x.value === f);
      if (!feat) continue;
      let price = feat.price;
      if (f === "multilang") price *= state.multilangCount;
      if (f === "api") price *= state.apiCount;
      featuresPrice += price;
    }

    const seoPrice = seoOptions.find((s) => s.value === state.seo)?.price ?? 0;
    const perfPrice = performanceOptions.find((p) => p.value === state.performance)?.price ?? 0;
    const hostingPrice = hostingOptions.find((h) => h.value === state.hosting)?.price ?? 0;

    const deliveryMult = deliveryOptions.find((d) => d.value === state.delivery)?.multiplier ?? 0;

    const subtotal =
      projectPrice +
      pagesPrice +
      designPrice +
      contentPrice +
      logoPrice +
      photoPrice +
      featuresPrice +
      seoPrice +
      perfPrice +
      hostingPrice;

    const deliveryFee = Math.round(subtotal * deliveryMult);
    const beforeDiscount = subtotal + deliveryFee;
    const discountAmount = Math.round(beforeDiscount * (state.discountPercent / 100));
    const discounted = beforeDiscount - discountAmount;
    const vat = Math.round(discounted * VAT_RATE);
    const total = discounted + vat;

    const maintenanceMonthly =
      maintenanceOptions.find((m) => m.value === state.maintenance)?.monthlyPrice ?? 0;

    const deliveryLabel =
      deliveryOptions.find((d) => d.value === state.delivery) || deliveryOptions[0];

    return {
      projectPrice,
      pagesPrice,
      designPrice,
      contentPrice,
      logoPrice,
      photoPrice,
      featuresPrice,
      seoPrice,
      perfPrice,
      hostingPrice,
      deliveryFee,
      discountAmount,
      subtotal: beforeDiscount,
      vat,
      total,
      maintenanceMonthly,
      estimatedWeeks: deliveryLabel.labelEn,
      estimatedWeeksPl: deliveryLabel.labelPl,
    };
  }, [state]);

  const progress = useMemo(() => {
    const sections = [
      state.projectType,
      state.design,
      state.content,
      state.logo,
      state.photography,
      state.seo,
      state.performance,
      state.hosting,
      state.maintenance,
      state.delivery,
    ];
    const filled = sections.filter(Boolean).length;
    return Math.round((filled / sections.length) * 100);
  }, [state]);

  const formatPrice = (n: number) =>
    n.toLocaleString(isEn ? "en-GB" : "pl-PL", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const projectLabel = useMemo(() => {
    const pt = projectTypes.find((p) => p.value === state.projectType);
    return pt ? t(pt.labelEn, pt.labelPl) : "";
  }, [state.projectType, t]);

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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            {t("Website Quote Calculator", "Kalkulator wyceny strony")}
          </h1>
          <p className="text-foreground/60 max-w-2xl text-sm md:text-base">
            {t(
              "Select the options that match your project requirements. The estimate updates instantly.",
              "Wybierz opcje odpowiadające Twoim wymaganiom. Wycena aktualizuje się na bieżąco.",
            )}
          </p>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-3">
            {t("Quick start: choose your level", "Szybki start: wybierz poziom")}
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {packagePresets.map((preset, i) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`relative text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 group ${
                  activePreset === preset.id
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
                  {activePreset === preset.id && (
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </div>
                <div className="text-lg md:text-xl font-bold text-primary">
                  {formatPrice(preset.fromPrice)}+
                </div>
                <div className="text-xs text-foreground/50 mt-0.5 hidden md:block">
                  {t(preset.taglineEn, preset.taglinePl)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <CalcCtx.Provider value={{ openSections, toggleSection, isEn, formatPrice }}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="flex-1 space-y-4">
              <div className="space-y-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground/50 whitespace-nowrap">
                    {progress}%
                  </span>
                </div>

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

              <Section id="project" titleEn="Project Type" titlePl="Typ projektu">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((p) => (
                    <OptionCard
                      key={p.value}
                      selected={state.projectType === p.value}
                      onClick={() => update("projectType", p.value)}
                      label={t(p.labelEn, p.labelPl)}
                      price={p.price}
                      highlight={p.value === "custom-app"}
                    />
                  ))}
                </div>
              </Section>

              <Section id="pages" titleEn="Additional Pages" titlePl="Dodatkowe strony">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">
                      {t("Pages", "Strony")}: {state.additionalPages}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {state.additionalPages > 0
                        ? `+${formatPrice(state.additionalPages * ADDITIONAL_PAGE_PRICE)}`
                        : t("Included", "W cenie")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={MAX_ADDITIONAL_PAGES}
                    step={1}
                    value={state.additionalPages}
                    onChange={(e) => update("additionalPages", parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-foreground/40">
                    <span>0</span>
                    <span>{MAX_ADDITIONAL_PAGES}</span>
                  </div>
                  <p className="text-xs text-foreground/50">
                    {t(
                      `£${ADDITIONAL_PAGE_PRICE} per additional page`,
                      `£${ADDITIONAL_PAGE_PRICE} za dodatkową stronę`,
                    )}
                  </p>
                </div>
              </Section>

              <Section id="design" titleEn="Design Quality" titlePl="Jakość designu">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {designOptions.map((d) => (
                    <OptionCard
                      key={d.value}
                      selected={state.design === d.value}
                      onClick={() => update("design", d.value)}
                      label={t(d.labelEn, d.labelPl)}
                      price={d.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="content" titleEn="Content Writing" titlePl="Pisanie treści">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {contentOptions.map((c) => (
                    <OptionCard
                      key={c.value}
                      selected={state.content === c.value}
                      onClick={() => update("content", c.value)}
                      label={t(c.labelEn, c.labelPl)}
                      price={c.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="logo" titleEn="Logo" titlePl="Logo">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {logoOptions.map((l) => (
                    <OptionCard
                      key={l.value}
                      selected={state.logo === l.value}
                      onClick={() => update("logo", l.value)}
                      label={t(l.labelEn, l.labelPl)}
                      price={l.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="photos" titleEn="Photography" titlePl="Fotografia">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {photographyOptions.map((p) => (
                    <OptionCard
                      key={p.value}
                      selected={state.photography === p.value}
                      onClick={() => update("photography", p.value)}
                      label={t(p.labelEn, p.labelPl)}
                      price={p.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="features" titleEn="Features" titlePl="Funkcje">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((f) => {
                    const selected = state.selectedFeatures.includes(f.value);
                    const isMultilang = f.value === "multilang" && selected;
                    const isApi = f.value === "api" && selected;
                    return (
                      <button
                        key={f.value}
                        onClick={() => toggleFeature(f.value)}
                        className={`relative text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/5"
                            : "border-border/40 hover:border-border/80 bg-card/30"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium">{t(f.labelEn, f.labelPl)}</span>
                          <span className="text-sm font-semibold text-primary whitespace-nowrap">
                            {f.price === 0 ? t("Included", "W cenie") : `+${formatPrice(f.price)}`}
                          </span>
                        </div>
                        {isMultilang && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-foreground/50">
                              {t("Languages", "Języki")}:
                            </span>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={state.multilangCount}
                              onChange={(e) =>
                                update("multilangCount", Math.max(1, parseInt(e.target.value) || 1))
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-16 px-2 py-1 text-xs rounded border border-border bg-background text-center"
                            />
                          </div>
                        )}
                        {isApi && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-foreground/50">{t("APIs", "API")}:</span>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={state.apiCount}
                              onChange={(e) =>
                                update("apiCount", Math.max(1, parseInt(e.target.value) || 1))
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="w-16 px-2 py-1 text-xs rounded border border-border bg-background text-center"
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section id="seo" titleEn="SEO" titlePl="SEO">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {seoOptions.map((s) => (
                    <OptionCard
                      key={s.value}
                      selected={state.seo === s.value}
                      onClick={() => update("seo", s.value)}
                      label={t(s.labelEn, s.labelPl)}
                      price={s.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="performance" titleEn="Performance" titlePl="Wydajność">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {performanceOptions.map((p) => (
                    <OptionCard
                      key={p.value}
                      selected={state.performance === p.value}
                      onClick={() => update("performance", p.value)}
                      label={t(p.labelEn, p.labelPl)}
                      price={p.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="hosting" titleEn="Hosting" titlePl="Hosting">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {hostingOptions.map((h) => (
                    <OptionCard
                      key={h.value}
                      selected={state.hosting === h.value}
                      onClick={() => update("hosting", h.value)}
                      label={t(h.labelEn, h.labelPl)}
                      price={h.price}
                    />
                  ))}
                </div>
              </Section>

              <Section id="maintenance" titleEn="Maintenance" titlePl="Konserwacja">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {maintenanceOptions.map((m) => (
                    <OptionCard
                      key={m.value}
                      selected={state.maintenance === m.value}
                      onClick={() => update("maintenance", m.value)}
                      label={t(m.labelEn, m.labelPl)}
                      price={m.monthlyPrice}
                    />
                  ))}
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  {t("Prices shown are monthly", "Ceny są miesięczne")}
                </p>
              </Section>

              <Section id="delivery" titleEn="Delivery Time" titlePl="Czas realizacji">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {deliveryOptions.map((d) => (
                    <OptionCard
                      key={d.value}
                      selected={state.delivery === d.value}
                      onClick={() => update("delivery", d.value)}
                      label={t(d.labelEn, d.labelPl)}
                      price={Math.round(
                        (breakdown.subtotal - breakdown.deliveryFee) * d.multiplier,
                      )}
                    />
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
                    className="grid grid-cols-3 gap-3"
                  >
                    <div className="bg-muted/40 rounded-xl p-4 text-center">
                      <div className="text-xl font-bold text-foreground">
                        {roiEnquiries.toLocaleString()}
                      </div>
                      <div className="text-xs text-foreground/50 mt-1">
                        {t("Enquiries / mo", "Zapytań / mies.")}
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center col-span-2">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(roiRevLow)} – {formatPrice(roiRevHigh)}
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
                onReset={() => {
                  setState(initialState);
                  setActivePreset(null);
                }}
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
          {t("Get Quote", "Pobierz wycenę")}
        </button>
      </div>
    </div>
  );
}
