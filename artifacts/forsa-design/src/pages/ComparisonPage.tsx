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
    seoTitle: "Web Design Options in Aberdeenshire | Forsa Design vs. Templates & Agencies",
    seoDesc:
      "Comparing web design options in Aberdeenshire and Scotland: custom agency vs. CMS templates, generalist agencies, and freelancers. Find the right fit for your business.",
    heading: "Which Option Is Right for You?",
    intro:
      "Not every business needs a custom website. The right choice depends on your goals, budget, timeline, and how important flexibility, performance, and future growth are. Below is a practical comparison of the most common web solutions.",
    optionCards: [
      {
        name: "CMS Template",
        tagline: "Fast and affordable",
        pros: ["Lower initial cost", "Quick to launch", "Easy content updates"],
        cons: [
          "Often based on existing themes",
          "Can become slower with too many plugins",
          "Limited control over SEO and performance",
        ],
        highlight: false,
      },
      {
        name: "Non-specialist Agency",
        tagline: "General solution provider",
        pros: ["Experienced teams", "Project management", "Existing portfolio"],
        cons: [
          "Often template-based",
          "Higher costs due to larger structures",
          "May lack industry-specific experience",
        ],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Flexible and personal",
        pros: ["Direct communication", "Flexible pricing", "Wide range of skills"],
        cons: [
          "One person responsible for the whole project",
          "Availability can become a challenge",
          "Quality varies between providers",
        ],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "A website that works for your business, not the other way around",
        pros: [
          "Built around your customers and business goals",
          "Fast experiences that respect your customers' time",
          "Built to be found and trusted online",
          "Processes simplified through smart automation",
          "A long-term partner when your business evolves",
          "Ready to support the next stage of your growth",
          "No lock-ins. No dependence on a single provider.",
        ],
        cons: [],
        highlight: true,
      },
    ],
    tableHeading: "Full Comparison",
    tableSub: "This comparison focuses on practical differences between each approach.",
    tableHeaders: ["Criterion", "DIY Builder", "Freelancer", "Agency", "Forsa Design"],
    tableRows: [
      [
        "Time",
        "Self-service",
        "Independent developer",
        "Team-based delivery",
        "More time to focus on running your business",
      ],
      [
        "Communication",
        "Support tickets",
        "Direct",
        "Account manager",
        "Direct access to the person building your solution",
      ],
      [
        "Growth",
        "Template-based",
        "Varies",
        "Custom",
        "Built around business goals, not templates",
      ],
      [
        "Customer Experience",
        "Depends on platform",
        "Varies",
        "Usually optimised",
        "Fast, clear and professional user journeys",
      ],
      [
        "Visibility",
        "Basic",
        "Varies",
        "Included",
        "Designed to help customers find and trust you",
      ],
      [
        "Efficiency",
        "Limited",
        "Depends on skills",
        "Available",
        "Manual tasks reduced through smart systems",
      ],
      ["Reliability", "Self-managed", "Limited", "Ongoing", "Ongoing support when you need it"],
      [
        "Scalability",
        "Platform dependent",
        "Usually full",
        "Usually full",
        "Ready for the next stage of your growth",
      ],
      ["Ownership", "Limited", "Varies", "Good", "Full control over your digital assets"],
    ],
    ctaHeading: "Ready to talk?",
    ctaSub: "The right approach starts with understanding your business.",
    ctaButton: "Request a Quote",
    pros: "Pros",
    cons: "Cons",
    highlighted: "Recommended",
  },
  pl: {
    seoTitle: "Opcje Web Design w Aberdeenshire | Forsa Design vs. Szablony i Agencje",
    seoDesc:
      "Porównanie opcji web design w Aberdeenshire i Szkocji: autorska agencja vs. szablony CMS, agencje bez specjalizacji i freelancerzy. Znajdź najlepsze rozwiązanie dla swojego biznesu.",
    heading: "Która Opcja Jest Dla Ciebie?",
    intro:
      "Nie ka\u017cdy biznes potrzebuje dedykowanej strony. Wyb\u00f3r zale\u017cy od Twoich cel\u00f3w, bud\u017cetu, harmonogramu i tego, jak wa\u017cne s\u0105 elastyczno\u015b\u0107, wydajno\u015b\u0107 i przysz\u0142y wzrost. Poni\u017cej znajdziesz praktyczne por\u00f3wnanie najpopularniejszych rozwi\u0105za\u0144 webowych.",
    optionCards: [
      {
        name: "Szablon CMS",
        tagline: "Szybko i przyst\u0119pnie",
        pros: [
          "Ni\u017cszy koszt wej\u015bcia",
          "Szybkie uruchomienie",
          "\u0141atwa aktualizacja tre\u015bci",
        ],
        cons: [
          "Cz\u0119sto oparte na gotowych szablonach",
          "Mo\u017ce spowalnia\u0107 przy zbyt wielu wtyczkach",
          "Ograniczona kontrola nad SEO i wydajno\u015bci\u0105",
        ],
        highlight: false,
      },
      {
        name: "Agencja bez specjalizacji",
        tagline: "Og\u00f3lny dostawca rozwi\u0105za\u0144",
        pros: [
          "Do\u015bwiadczone zespo\u0142y",
          "Zarz\u0105dzanie projektem",
          "Istniej\u0105ce portfolio",
        ],
        cons: [
          "Cz\u0119sto szablonowe podej\u015bcie",
          "Wy\u017csze koszty wynikaj\u0105ce z rozbudowanych struktur",
          "Mo\u017ce brakowa\u0107 do\u015bwiadczenia bran\u017cowego",
        ],
        highlight: false,
      },
      {
        name: "Freelancer",
        tagline: "Elastyczny i osobisty",
        pros: [
          "Bezpo\u015brednia komunikacja",
          "Elastyczne ceny",
          "Szeroki zakres umiej\u0119tno\u015bci",
        ],
        cons: [
          "Jedna osoba odpowiedzialna za ca\u0142y projekt",
          "Dost\u0119pno\u015b\u0107 mo\u017ce by\u0107 wyzwaniem",
          "Jako\u015b\u0107 r\u00f3\u017cni si\u0119 mi\u0119dzy dostawcami",
        ],
        highlight: false,
      },
      {
        name: "Forsa Design",
        tagline: "Strona, kt\u00f3ra pracuje dla Twojego biznesu \u2014 nie na odwr\u00f3t",
        pros: [
          "Dostosowana do cel\u00f3w i klient\u00f3w, nie do szablon\u00f3w",
          "Szybkie do\u015bwiadczenia, kt\u00f3re szanuj\u0105 czas u\u017cytkownik\u00f3w",
          "Zbudowana, by klienci znale\u017ali Ci\u0119 i zaufali",
          "Procesy uproszczone przez inteligentne systemy",
          "Wsparcie, gdy Tw\u00f3j biznes si\u0119 zmienia",
          "Gotowa na kolejny etap rozwoju",
          "Brak lock-in. Brak zale\u017cno\u015bci od jednego dostawcy.",
        ],
        cons: [],
        highlight: true,
      },
    ],
    tableHeading: "Pe\u0142ne Por\u00f3wnanie",
    tableSub:
      "Por\u00f3wnanie skupia si\u0119 na praktycznych r\u00f3\u017cnicach mi\u0119dzy ka\u017cdym podej\u015bciem.",
    tableHeaders: ["Kryterium", "DIY Builder", "Freelancer", "Agencja", "Forsa Design"],
    tableRows: [
      [
        "Czas",
        "Samodzielna konfiguracja",
        "Samodzielny deweloper",
        "Dostawa zespo\u0142owa",
        "Wi\u0119cej czasu na prowadzenie biznesu",
      ],
      [
        "Komunikacja",
        "Zg\u0142oszenia do supportu",
        "Bezpo\u015brednia",
        "Account manager",
        "Bezpo\u015bredni kontakt z osob\u0105 buduj\u0105c\u0105 rozwi\u0105zanie",
      ],
      [
        "Rozw\u00f3j",
        "Szablonowy",
        "Zale\u017cy",
        "Dostosowany",
        "Dostosowany do cel\u00f3w biznesowych, nie szablon\u00f3w",
      ],
      [
        "Do\u015bwiadczenie klienta",
        "Zale\u017cy od platformy",
        "Zale\u017cy",
        "Zazwyczaj zoptymalizowana",
        "Szybkie, przejrzyste i profesjonalne \u015bcie\u017cki u\u017cytkownika",
      ],
      [
        "Widoczno\u015b\u0107",
        "Podstawowy",
        "Zale\u017cy",
        "W\u0142\u0105czony",
        "Zaprojektowane, by klienci znale\u017ali Ci\u0119 i zaufali",
      ],
      [
        "Efektywno\u015b\u0107",
        "Ograniczone",
        "Zale\u017cy od umiej\u0119tno\u015bci",
        "Dost\u0119pne",
        "R\u0119czne zadania ograniczone przez inteligentne systemy",
      ],
      [
        "Niezawodno\u015b\u0107",
        "Samodzielne",
        "Ograniczone",
        "Bie\u017c\u0105ce",
        "Wsparcie, gdy go potrzebujesz",
      ],
      [
        "Skalowalno\u015b\u0107",
        "Zale\u017cna od platformy",
        "Zazwyczaj pe\u0142na",
        "Zazwyczaj pe\u0142na",
        "Gotowe na kolejny etap rozwoju",
      ],
      [
        "W\u0142asno\u015b\u0107",
        "Ograniczona",
        "Zale\u017cy",
        "Dobra",
        "Pe\u0142na kontrola nad zasobami cyfrowymi",
      ],
    ],
    ctaHeading: "Gotowy porozmawia\u0107?",
    ctaSub: "W\u0142a\u015bciwe podej\u015bcie zaczyna si\u0119 od zrozumienia Twojego biznesu.",
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
