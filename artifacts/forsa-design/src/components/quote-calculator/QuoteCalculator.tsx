import { useState, useCallback, useMemo } from "react";
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
};

export default function QuoteCalculator() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = useCallback((en: string, pl: string) => (isEn ? en : pl), [isEn]);

  const [state, setState] = useState<QuoteState>(initialState);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["project"]));
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const update = useCallback(<K extends keyof QuoteState>(key: K, value: QuoteState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
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

  const Section = ({
    id,
    titleEn,
    titlePl,
    children,
  }: {
    id: string;
    titleEn: string;
    titlePl: string;
    children: React.ReactNode;
  }) => {
    const open = openSections.has(id);
    return (
      <div className="border border-border/30 rounded-xl overflow-hidden bg-card/50">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-primary">{sectionIcons[id]}</span>
            <span className="font-semibold text-sm md:text-base">{t(titleEn, titlePl)}</span>
          </div>
          {open ? (
            <ChevronUp className="w-5 h-5 text-foreground/50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground/50" />
          )}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-4 md:p-5 pt-0 border-t border-border/20">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const OptionCard = ({
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
  }) => (
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
          {price === 0 ? t("Included", "W cenie") : `+${formatPrice(price)}`}
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            {t("Website Quote Calculator", "Kalkulator wyceny strony")}
          </h1>
          <p className="text-foreground/60 max-w-2xl text-sm md:text-base">
            {t(
              "Select the options that match your project requirements. The estimate updates instantly.",
              "Wybierz opcje odpowiadaj\u0105ce Twoim wymaganiom. Wycena aktualizuje si\u0119 na bie\u017c\u0105co.",
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 mb-2">
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
                    `${ADDITIONAL_PAGE_PRICE} per additional page`,
                    `${ADDITIONAL_PAGE_PRICE} za dodatkow\u0105 stron\u0119`,
                  )}
                </p>
              </div>
            </Section>

            <Section id="design" titleEn="Design Quality" titlePl="Jako\u015b\u0107 designu">
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

            <Section id="content" titleEn="Content Writing" titlePl="Pisanie tre\u015bci">
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
                            {t("Languages", "J\u0119zyki")}:
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

            <Section id="performance" titleEn="Performance" titlePl="Wydajno\u015b\u0107">
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
                {t("Prices shown are monthly", "Ceny s\u0105 miesi\u0119czne")}
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
                    price={Math.round((breakdown.subtotal - breakdown.deliveryFee) * d.multiplier)}
                  />
                ))}
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
                    {t("You save", "Oszcz\u0119dzasz")}: {formatPrice(breakdown.discountAmount)}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
