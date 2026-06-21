import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

interface ComparisonPageProps {
  lang: "en" | "pl";
}

const content = {
  en: {
    seoTitle: "Forsa Design vs. Templates, Agencies & Freelancers | Honest Comparison",
    seoDesc:
      "An honest side-by-side comparison of Forsa Design against CMS templates, non-specialist agencies, and freelancers. Make the right decision for your business.",
    heading: "Which Option Is Right for You?",
    intro:
      "Not every project needs a bespoke agency. Below is an honest, no-spin breakdown of the four most common web options — so you can make an informed decision, whatever that decision turns out to be.",
    optionCards: [
      {
        name: "CMS Template",
        tagline: "Fast & cheap",
        pros: ["Low upfront cost", "Quick to launch", "Self-editable"],
        cons: ["Looks like the competition", "Plugin bloat & slow", "Poor SEO ceiling"],
        highlight: false,
      },
      {
        name: "Non-specialist Agency",
        tagline: "Broad but generic",
        pros: ["Established team", "Project management", "Portfolio to review"],
        cons: ["Often template-based", "Expensive account management", "Not sector-specific"],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Flexible & personal",
        pros: ["Direct communication", "Flexible pricing", "Wide skill range"],
        cons: ["Single point of failure", "Inconsistent quality", "Limited capacity"],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "Built for results",
        pros: ["Custom code, no templates", "Healthcare & B2B specialists", "Ongoing partnership"],
        cons: ["Higher upfront investment", "Longer build timeline"],
        highlight: true,
      },
    ],
    tableHeading: "Full Comparison",
    tableSub: "Every row below is based on real-world project data, not marketing copy.",
    tableHeaders: [
      "Criterion",
      "CMS Template",
      "Non-specialist Agency",
      "Freelancer",
      "Forsa Design",
    ],
    tableRows: [
      ["Price", "£800–2,000", "£3,000–8,000", "£1,500–4,000", "£4,500–12,000+"],
      ["Turnaround", "2–4 weeks", "6–12 weeks", "4–8 weeks", "8–12 weeks"],
      [
        "Design uniqueness",
        "Looks like competition",
        "Sometimes template-based",
        "Varies",
        "Unique, tailored",
      ],
      [
        "Site speed",
        "Average (plugin-heavy)",
        "Good (if clean code)",
        "Varies",
        "High (optimised)",
      ],
      ["SEO + Optimisation", "Basic", "Average", "Varies", "Advanced (Schema, E-E-A-T)"],
      ["Technical support", "Plugins required", "Optional (extra cost)", "Limited", "Included"],
      [
        "Security (SSL, GDPR, PCI)",
        "Depends on plugins",
        "Generally yes",
        "Varies",
        "Yes, full documentation",
      ],
      [
        "Integrations (CRM, ERP)",
        "Plugin ecosystem",
        "Can be done",
        "Varies",
        "Yes, custom development",
      ],
      ["Scalability", "Difficult (template lock-in)", "Possible", "Possible", "Easy (custom code)"],
      ["Portability", "Medium", "High", "High", "High (full control)"],
      ["Brand consistency", "Low", "Medium", "Varies", "High (guidelines integrated)"],
      ["Sector specialisation", "None", "None", "Varies", "Healthcare & B2B"],
    ],
    ctaHeading: "Ready to talk?",
    ctaSub: "If bespoke, fast, and sector-focused is what you need — let's start a conversation.",
    ctaButton: "Request a Quote",
    pros: "Pros",
    cons: "Cons",
    highlighted: "Recommended",
  },
  pl: {
    seoTitle: "Forsa Design vs. Szablony, Agencje i Freelancerzy | Uczciwe Porównanie",
    seoDesc:
      "Uczciwe zestawienie Forsa Design z szablonami CMS, agencjami bez specjalizacji i freelancerami. Podejmij właściwą decyzję dla swojego biznesu.",
    heading: "Która Opcja Jest Dla Ciebie?",
    intro:
      "Nie każdy projekt wymaga dedykowanej agencji. Poniżej znajdziesz uczciwe, bezstronne porównanie czterech najpopularniejszych opcji webowych — żebyś mógł podjąć świadomą decyzję, cokolwiek nią będzie.",
    optionCards: [
      {
        name: "Szablon CMS",
        tagline: "Szybko i tanio",
        pros: ["Niski koszt wejścia", "Szybkie uruchomienie", "Możliwość samodzielnej edycji"],
        cons: ["Wygląda jak konkurencja", "Wolne przez wtyczki", "Niski sufit SEO"],
        highlight: false,
      },
      {
        name: "Agencja bez specjalizacji",
        tagline: "Szeroka oferta, ale generyczna",
        pros: ["Ugruntowany zespół", "Zarządzanie projektem", "Portfolio do sprawdzenia"],
        cons: ["Często szablonowe", "Drogie zarządzanie kontem", "Brak specjalizacji branżowej"],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Elastyczny i osobisty",
        pros: ["Bezpośrednia komunikacja", "Elastyczne ceny", "Szeroki zakres umiejętności"],
        cons: ["Jeden punkt awarii", "Nierówna jakość", "Ograniczone możliwości"],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "Budowane pod wyniki",
        pros: [
          "Czysty kod, zero szablonów",
          "Specjalizacja: healthcare i B2B",
          "Długoterminowe partnerstwo",
        ],
        cons: ["Wyższa inwestycja wstępna", "Dłuższy czas realizacji"],
        highlight: true,
      },
    ],
    tableHeading: "Pełne Porównanie",
    tableSub:
      "Każdy wiersz poniżej oparty jest na realnych danych z projektów, a nie materiałach marketingowych.",
    tableHeaders: [
      "Kryterium",
      "Szablon CMS",
      "Agencja bez specjalizacji",
      "Freelancer",
      "Forsa Design",
    ],
    tableRows: [
      ["Cena", "800–2 000 £", "3 000–8 000 £", "1 500–4 000 £", "4 500–12 000 £+"],
      ["Czas realizacji", "2–4 tygodnie", "6–12 tygodni", "4–8 tygodni", "8–12 tygodni"],
      [
        "Unikalność designu",
        "Szablonowy (jak konkurencja)",
        "Czasem template-based",
        "Zależy",
        "Unikalny, dostosowany",
      ],
      [
        "Szybkość strony",
        "Średnia (plugin-heavy)",
        "Dobra (jeśli czysty kod)",
        "Zależy",
        "Wysoka (optymalizacja w cenie)",
      ],
      ["SEO + Optymalizacja", "Podstawowa", "Średnia", "Zależy", "Zaawansowana (Schema, E-E-A-T)"],
      [
        "Wsparcie techniczne",
        "Wymaga wtyczek",
        "Opcjonalnie (extra opłata)",
        "Ograniczone",
        "Zawarte w pakiecie",
      ],
      [
        "Bezpieczeństwo (SSL, RODO, PCI)",
        "Zależy od pluginów",
        "Generalnie tak",
        "Zależy",
        "Tak, pełna dokumentacja",
      ],
      [
        "Integracje (CRM, ERP)",
        "Ekosystem pluginów",
        "Mogą zrobić",
        "Zależy",
        "Tak, custom development",
      ],
      ["Skalowanie", "Trudne (template lock-in)", "Możliwe", "Możliwe", "Proste (custom code)"],
      ["Przenośność", "Średnia", "Wysoka", "Wysoka", "Wysoka (pełna kontrola)"],
      ["Spójność marki", "Mała", "Średnia", "Zależy", "Wysoka (brand guidelines integrated)"],
      ["Specjalizacja branżowa", "Brak", "Brak", "Zależy", "Healthcare i B2B"],
    ],
    ctaHeading: "Gotowy porozmawiać?",
    ctaSub:
      "Jeśli potrzebujesz strony pisanej od zera, szybkiej i skupionej na Twojej branży — zacznijmy rozmowę.",
    ctaButton: "Poproś o wycenę",
    pros: "Zalety",
    cons: "Wady",
    highlighted: "Polecamy",
  },
};

function ProsConsIcon({ type }: { type: "pro" | "con" }) {
  if (type === "pro") return <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />;
  return <XCircle size={15} className="text-foreground/30 shrink-0 mt-0.5" />;
}

function NeutralIcon() {
  return <MinusCircle size={14} className="text-foreground/30 inline-block mr-1" />;
}

function cellClass(ci: number, total: number, value: string) {
  if (ci === 0) return "px-4 py-3 font-medium text-foreground/80 whitespace-nowrap";
  if (ci === total - 1) return "px-4 py-3 text-primary font-semibold";
  const lower = value.toLowerCase();
  if (lower === "varies" || lower === "zależy" || lower === "medium" || lower === "średnia")
    return "px-4 py-3 text-foreground/40";
  return "px-4 py-3 text-foreground/55";
}

export default function ComparisonPage({ lang }: ComparisonPageProps) {
  const { syncLanguage } = useLanguage();
  const c = content[lang];
  const homeHref = lang === "en" ? "/en/" : "/pl/";

  useEffect(() => {
    syncLanguage(lang);
  }, [lang, syncLanguage]);

  useSeoMeta({
    title: c.seoTitle,
    description: c.seoDesc,
    ogTitle: c.seoTitle,
    ogDescription: c.seoDesc,
    twitterTitle: c.seoTitle,
    twitterDescription: c.seoDesc,
    ogLocale: lang === "en" ? "en_US" : "pl_PL",
    canonical: buildHref(`/${lang}/comparison`),
    alternates: [
      { lang: "en", href: buildHref("/en/comparison") },
      { lang: "pl", href: buildHref("/pl/comparison") },
    ],
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-card border-b border-border/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {c.heading}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-2xl">
              {c.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Option Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.optionCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-md border p-7 flex flex-col gap-5 ${
                  card.highlight
                    ? "bg-card border-primary/40 shadow-[0_0_40px_-8px_rgba(var(--primary),0.15)]"
                    : "bg-card border-border/20"
                }`}
              >
                {card.highlight && (
                  <span className="absolute -top-3 left-6 bg-primary text-background text-xs font-bold px-3 py-1 rounded-sm tracking-wide">
                    {c.highlighted}
                  </span>
                )}
                <div>
                  <div className="w-6 h-0.5 bg-primary mb-4" />
                  <h2
                    className={`font-serif text-xl font-bold mb-1 ${card.highlight ? "text-white" : "text-white"}`}
                  >
                    {card.name}
                  </h2>
                  <p className="text-xs text-foreground/50 font-medium tracking-wide uppercase">
                    {card.tagline}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                    {c.pros}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {card.pros.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm text-foreground/75">
                        <ProsConsIcon type="pro" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                    {c.cons}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {card.cons.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm text-foreground/50">
                        <ProsConsIcon type="con" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
              {c.tableHeading}
            </h2>
            <p className="text-foreground/50 font-light mb-12 max-w-2xl">{c.tableSub}</p>
          </motion.div>

          <div className="overflow-x-auto rounded-md border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20 bg-background/40">
                  {c.tableHeaders.map((h, i) => (
                    <th
                      key={i}
                      className={`px-4 py-4 text-left font-semibold ${
                        i === c.tableHeaders.length - 1
                          ? "text-primary"
                          : i === 0
                            ? "text-foreground/80 w-44"
                            : "text-foreground/40 font-medium"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.tableRows.map((row, ri) => (
                  <motion.tr
                    key={ri}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: ri * 0.04 }}
                    className="border-b border-border/10 last:border-0 hover:bg-background/20 transition-colors"
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} className={cellClass(ci, row.length, cell)}>
                        {ci > 0 &&
                        ci < row.length - 1 &&
                        (cell.toLowerCase() === "varies" || cell.toLowerCase() === "zależy") ? (
                          <span className="flex items-center gap-1">
                            <NeutralIcon />
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background border-t border-border/10">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-0.5 bg-primary mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              {c.ctaHeading}
            </h2>
            <p className="text-foreground/60 font-light mb-10 leading-relaxed">{c.ctaSub}</p>
            <a
              href={homeHref + "?scroll=contact"}
              className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-4 rounded-sm hover:bg-primary/90 transition-colors"
            >
              {c.ctaButton}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
