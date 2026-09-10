import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { m as motion } from "framer-motion";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

interface ComparisonPageProps {
  lang: "en" | "pl";
}

const content = {
  en: {
    seoTitle: "CMS Template vs Agency vs Freelancer vs Forsa Design | Comparison",
    seoDesc:
      "A practical comparison of CMS templates, general agencies, freelancers and Forsa Design. Development model, contact, team size, templates, AI-assisted development, industrial B2B experience, API integrations, support, lock-in and project time.",
    heading: "Which option is right for you?",
    intro:
      "Not every business needs a custom website. Here is how the most common options compare on the points that matter in practice.",
    optionCards: [
      {
        name: "CMS Template",
        tagline: "Platform/theme-based",
        pros: [
          "Quick to launch in simple cases",
          "Familiar editing interface in many setups",
          "Large plugin and theme ecosystem",
        ],
        cons: [
          "Often based on existing themes",
          "Can become slower with too many plug-ins",
          "Limited control over performance and structure",
        ],
        highlight: false,
      },
      {
        name: "General Agency",
        tagline: "Depends on the agency",
        pros: ["Team capacity", "Established processes", "Wider service range"],
        cons: [
          "Often higher costs due to larger structures",
          "Contact often through an account/project manager",
          "Industrial experience depends on the team",
        ],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Depends on the person",
        pros: ["Direct communication", "Flexible pricing", "Wide range of skills"],
        cons: [
          "Availability and continuity depend on one person",
          "Quality and process vary between providers",
          "Industry experience depends on the individual",
        ],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "Custom development",
        pros: [
          "Built around the commercial purpose and scope of the project",
          "No off-the-shelf templates or page builders",
          "AI-assisted development where it makes sense, with personal responsibility for architecture, configuration, testing and the final result",
          "Proven 20+ years of industrial B2B experience",
          "API integrations available, assessed individually",
          "An optional paid support service",
          "I do not deliberately introduce vendor lock-in",
        ],
        cons: [],
        highlight: true,
      },
    ],
    cardNoteHeading: "Important notes",
    cardNotes: [
      "This comparison describes typical patterns, not every provider. There are good and weak examples of each option.",
      "A CMS template is not automatically bad and custom development is not automatically necessary. The right choice depends on scope, budget, timeline and requirements.",
      "For an industrial business, the deciding factors are usually credibility with buyers, clarity of technical information, performance, security, SEO fundamentals and the ability to maintain and develop the site.",
    ],
    tableHeading: "Full comparison",
    tableSub: "Each project is different, but these points usually decide which option fits.",
    tableHeaders: ["Aspect", "CMS Template", "General Agency", "Freelancer", "Forsa Design"],
    tableRows: [
      [
        "Development model",
        "Platform/theme-based",
        "Depends on the agency",
        "Depends on the person",
        "Custom development",
      ],
      [
        "Main contact",
        "Depends on the provider",
        "Often an account/project manager",
        "Usually the freelancer directly",
        "Directly with Miro",
      ],
      [
        "Team size",
        "Depends on the provider",
        "Usually several people",
        "Usually one person",
        "One person",
      ],
      [
        "Templates/page builders",
        "Often used, but not always",
        "Depends on the agency",
        "Depends on the freelancer",
        "I do not use them",
      ],
      [
        "AI-assisted development",
        "Depends on the provider",
        "Depends on the agency",
        "Depends on the freelancer",
        "Used where it makes sense",
      ],
      [
        "Industrial B2B experience",
        "Depends on the provider",
        "Depends on the agency and the team",
        "Depends on the person",
        "More than 20 years",
      ],
      [
        "API integrations",
        "Depend on the platform and provider",
        "Depend on scope",
        "Depend on skills",
        "Available and assessed individually",
      ],
      [
        "Post-launch support",
        "Depends on the provider and package",
        "Depends on the agency and contract",
        "Depends on the freelancer",
        "An optional paid service",
      ],
      [
        "Vendor lock-in",
        "Depends on the platform and setup",
        "Depends on the contract and setup",
        "Depends on the setup",
        "I do not introduce it deliberately",
      ],
      [
        "Project time",
        "Depends on scope",
        "Depends on scope",
        "Depends on scope",
        "A typical company website around nine weeks",
      ],
    ],
    ctaHeading: "Ready to Discuss Your Project?",
    ctaSub:
      "If you are not sure which approach fits your requirements, tell me what you need. I will assess the scope and explain what I can build and what the project would involve.",
    ctaButton: "Request a Quote",
    pros: "Strengths",
    cons: "Limitations",
    highlighted: "Forsa Design",
  },
  pl: {
    seoTitle: "Szablon CMS vs agencja vs freelancer vs Forsa Design | Porównanie",
    seoDesc:
      "Praktyczne porównanie: szablony CMS, agencje ogólne, freelancerzy i Forsa Design. Model developmentu, kontakt, wielkość zespołu, szablony, development wspomagany AI, doświadczenie w przemysłowym B2B, integracje API, wsparcie, lock-in i czas projektu.",
    heading: "Która opcja jest dla Ciebie?",
    intro:
      "Nie każdy biznes potrzebuje dedykowanej strony. Oto jak najpopularniejsze opcje wypadają w punktach, które mają znaczenie w praktyce.",
    optionCards: [
      {
        name: "Szablon CMS",
        tagline: "Oparty na platformie/motywie",
        pros: [
          "Szybkie uruchomienie w prostych przypadkach",
          "Znany interfejs edycji w wielu konfiguracjach",
          "Duży ekosystem wtyczek i motywów",
        ],
        cons: [
          "Często oparte na gotowych szablonach",
          "Może spowalniać przy zbyt wielu wtyczkach",
          "Ograniczona kontrola nad wydajnością i strukturą",
        ],
        highlight: false,
      },
      {
        name: "Agencja ogólna",
        tagline: "Zależy od agencji",
        pros: ["Zasoby zespołu", "Ugruntowane procesy", "Szerszy zakres usług"],
        cons: [
          "Często wyższe koszty wynikające z większych struktur",
          "Kontakt często przez account/project managera",
          "Doświadczenie przemysłowe zależy od zespołu",
        ],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Zależy od osoby",
        pros: ["Bezpośrednia komunikacja", "Elastyczne ceny", "Szeroki zakres umiejętności"],
        cons: [
          "Dostępność i ciągłość zależą od jednej osoby",
          "Jakość i proces różnią się między dostawcami",
          "Doświadczenie branżowe zależy od osoby",
        ],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "Dedykowany development",
        pros: [
          "Dostosowana do celu biznesowego i zakresu projektu",
          "Bez gotowych szablonów i kreatorów stron",
          "Development wspomagany AI tam, gdzie ma sens, z osobistą odpowiedzialnością za architekturę, konfigurację, testy i efekt końcowy",
          "Potwierdzone 20+ lat doświadczenia w przemysłowym B2B",
          "Integracje API dostępne, oceniane indywidualnie",
          "Opcjonalna płatna usługa wsparcia",
          "Nie wprowadzam celowo vendor lock-in",
        ],
        cons: [],
        highlight: true,
      },
    ],
    cardNoteHeading: "Ważne uwagi",
    cardNotes: [
      "To porównanie opisuje typowe wzorce, a nie każdego dostawcę. W każdej z tych opcji są dobre i słabe przykłady.",
      "Szablon CMS nie jest automatycznie zły, a dedykowany development nie zawsze jest konieczny. Właściwy wybór zależy od zakresu, budżetu, harmonogramu i wymagań.",
      "Dla firmy przemysłowej decydujące są zwykle wiarygodność w oczach kupujących, jasność informacji technicznych, wydajność, bezpieczeństwo, podstawy SEO oraz możliwość utrzymania i rozwoju strony.",
    ],
    tableHeading: "Pełne porównanie",
    tableSub: "Każdy projekt jest inny, ale te punkty zwykle decydują o dopasowaniu opcji.",
    tableHeaders: ["Aspekt", "Szablon CMS", "Agencja ogólna", "Freelancer", "Forsa Design"],
    tableRows: [
      [
        "Model developmentu",
        "Oparty na platformie/motywie",
        "Zależy od agencji",
        "Zależy od osoby",
        "Dedykowany development",
      ],
      [
        "Główny kontakt",
        "Zależy od dostawcy",
        "Często account/project manager",
        "Zwykle bezpośrednio freelancer",
        "Bezpośrednio Miro",
      ],
      [
        "Wielkość zespołu",
        "Zależy od dostawcy",
        "Zwykle kilka osób",
        "Zwykle jedna osoba",
        "Jedna osoba",
      ],
      [
        "Szablony/kreatory",
        "Często używane, ale nie zawsze",
        "Zależy od agencji",
        "Zależy od freelancera",
        "Nie używam",
      ],
      [
        "Development wspomagany AI",
        "Zależy od dostawcy",
        "Zależy od agencji",
        "Zależy od freelancera",
        "Używany tam, gdzie ma sens",
      ],
      [
        "Doświadczenie w przemysłowym B2B",
        "Zależy od dostawcy",
        "Zależy od zespołu",
        "Zależy od osoby",
        "Potwierdzone 20+ lat",
      ],
      [
        "Integracje API",
        "Zależą od platformy i dostawcy",
        "Zależą od zakresu",
        "Zależą od kompetencji",
        "Dostępne, oceniane indywidualnie",
      ],
      [
        "Wsparcie po wdrożeniu",
        "Zależy od dostawcy/pakietu",
        "Zwykle dostępne",
        "Zależy od freelancera",
        "Opcjonalna płatna usługa",
      ],
      [
        "Vendor lock-in",
        "Zależy od platformy i konfiguracji",
        "Zależy od umowy i konfiguracji",
        "Zależy od konfiguracji",
        "Nie wprowadzam go celowo",
      ],
      [
        "Czas projektu",
        "Zależy od zakresu",
        "Zależy od zakresu",
        "Zależy od zakresu",
        "Typowa strona około 9 tygodni",
      ],
    ],
    ctaHeading: "Chcesz omówić swój projekt?",
    ctaSub: "",
    ctaButton: "Poproś o wycenę",
    pros: "Mocne strony",
    cons: "Ograniczenia",
    highlighted: "Forsa Design",
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
  if (
    lower.startsWith("depends") ||
    lower.startsWith("zale") ||
    lower === "varies" ||
    lower === "medium"
  )
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
    ogLocale: lang === "en" ? "en_GB" : "pl_PL",
    canonical: buildHref(`/${lang}/comparison`),
    alternates: [
      { lang: "en", href: buildHref("/en/comparison") },
      { lang: "pl", href: buildHref("/pl/comparison") },
    ],
  });

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "en" ? "Home" : "Strona Główna",
          item: `https://forsadesign.co.uk/${lang}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: lang === "en" ? "Compare Options" : "Porównanie",
          item: `https://forsadesign.co.uk/${lang}/comparison`,
        },
      ],
    },
    "comparison-breadcrumb",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      {/* Hero */}
      <section id="main-content" className="pt-36 pb-20 bg-card border-b border-border/10">
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
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-2xl text-justify">
              {c.intro}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Option Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.optionCards.map((card, i) => {
              const cardContent = (
                <>
                  {card.highlight && (
                    <span className="absolute -top-3 left-6 bg-primary text-background text-xs font-bold px-3 py-1 rounded-sm tracking-wide">
                      {c.highlighted}
                    </span>
                  )}
                  <div>
                    <div className="w-6 h-0.5 bg-primary mb-4" />
                    <h2 className="font-serif text-xl font-bold mb-1 text-white">{card.name}</h2>
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
                </>
              );

              const baseClass = `relative rounded-md border p-7 flex flex-col gap-5 transition-all duration-300 cursor-pointer`;
              const defaultClass = `${baseClass} bg-card border-border/20 hover:border-primary/50 hover:shadow-[0_0_28px_-6px_rgba(201,168,76,0.25)]`;
              const highlightClass = `${baseClass} bg-card border-primary/70 shadow-[0_0_60px_-4px_rgba(201,168,76,0.45),0_0_120px_-20px_rgba(201,168,76,0.25)] hover:border-primary hover:shadow-[0_0_80px_0px_rgba(201,168,76,0.6),0_0_160px_-20px_rgba(201,168,76,0.35)]`;

              return card.highlight ? (
                <motion.a
                  key={i}
                  href={homeHref + "#contact"}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={highlightClass}
                >
                  {cardContent}
                </motion.a>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={defaultClass}
                >
                  {cardContent}
                </motion.div>
              );
            })}
          </div>
          {(c as { cardNotes?: string[]; cardNoteHeading?: string }).cardNotes &&
            ((c as { cardNotes?: string[]; cardNoteHeading?: string }).cardNotes?.length ?? 0) >
              0 && (
              <div className="mt-10 rounded-md border border-border/20 bg-card p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold text-white mb-4">
                  {(c as { cardNoteHeading?: string }).cardNoteHeading}
                </h2>
                <ul className="space-y-3">
                  {((c as { cardNotes?: string[] }).cardNotes ?? []).map((note, ni) => (
                    <li key={ni} className="text-sm text-foreground/70 leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </section>
      {/* Full Comparison Table */}
      {(c.tableRows?.length ?? 0) > 0 && (
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
                      {row.map((cell, ci) => {
                        const lower = cell.toLowerCase();
                        const isNeutral =
                          ci > 0 &&
                          ci < row.length - 1 &&
                          (lower.startsWith("depends") ||
                            lower.startsWith("zale") ||
                            lower === "varies");
                        return (
                          <td key={ci} className={cellClass(ci, row.length, cell)}>
                            {isNeutral ? (
                              <span className="flex items-center gap-1">
                                <NeutralIcon />
                                {cell}
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
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
            {c.ctaSub && (
              <p className="text-foreground/60 font-light mb-10 leading-relaxed">{c.ctaSub}</p>
            )}
            <a
              href={homeHref + "#contact"}
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
