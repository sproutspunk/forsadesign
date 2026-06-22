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
        tagline: "Custom-built around your business",
        pros: [
          "Custom-built websites without relying on templates",
          "Experience across healthcare and B2B projects",
          "Long-term support and partnership",
        ],
        cons: ["Higher initial investment", "Longer development process"],
        highlight: true,
      },
    ],
    tableHeading: "Full Comparison",
    tableSub: "This comparison focuses on practical differences between each approach.",
    tableHeaders: [
      "Criterion",
      "CMS Template",
      "Non-specialist Agency",
      "Freelancer",
      "Forsa Design",
    ],
    tableRows: [
      ["Typical project ranges", "£800–2,000", "£3,000–8,000", "£1,500–4,000", "£4,500–12,000+"],
      ["Turnaround", "2–4 weeks", "6–12 weeks", "4–8 weeks", "8–12 weeks"],
      [
        "Design uniqueness",
        "Usually based on existing themes",
        "Sometimes customised",
        "Depends on the developer",
        "Fully tailored",
      ],
      [
        "Site speed",
        "Can be limited by plugins",
        "Good with clean development",
        "Depends on implementation",
        "Optimised performance",
      ],
      [
        "SEO and optimisation",
        "Basic setup",
        "Average",
        "Depends on experience",
        "Structured SEO and performance optimisation",
      ],
      [
        "Technical support",
        "Usually requires plugins or external support",
        "Available as an extra service",
        "Limited capacity",
        "Ongoing support options",
      ],
      [
        "Security",
        "Depends on setup",
        "Usually included",
        "Depends on implementation",
        "Security setup with documentation",
      ],
      [
        "Integrations",
        "Limited by available tools",
        "Possible with development",
        "Possible depending on skills",
        "Custom integrations available",
      ],
      ["Scalability", "Can become restrictive", "Possible", "Possible", "Built for future growth"],
      ["Portability", "Medium", "High", "High", "Full ownership and control"],
    ],
    ctaHeading: "Ready to talk?",
    ctaSub: "The right approach starts with understanding your business.",
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
      "Nie ka\u017cdy biznes potrzebuje dedykowanej strony. Wyb\u00f3r zale\u017cy od Twoich cel\u00f3w, bud\u017cetu, harmonogramu i tego, jak wa\u017cne s\u0105 elastyczno\u015b\u0107, wydajno\u015b\u0107 i przysz\u0142y wzrost. Poni\u017cej znajdziesz praktyczne por\u00f3wnanie najpopularniejszych rozwi\u0105za\u0144 webowych.",
    optionCards: [
      {
        name: "Szablon CMS",
        tagline: "Szybko i przyst\u0119pnie",
        pros: ["Ni\u017cszy koszt wej\u015bcia", "Szybkie uruchomienie", "\u0141atwa aktualizacja tre\u015bci"],
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
        pros: ["Do\u015bwiadczone zespo\u0142y", "Zarz\u0105dzanie projektem", "Istniej\u0105ce portfolio"],
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
        tagline: "Tworzone na miar\u0119 Twojego biznesu",
        pros: [
          "Dedykowane strony bez szablon\u00f3w",
          "Do\u015bwiadczenie w projektach healthcare i B2B",
          "D\u0142ugoterminowe wsparcie i partnerstwo",
        ],
        cons: ["Wy\u017csza inwestycja wst\u0119pna", "D\u0142u\u017cszy proces realizacji"],
        highlight: true,
      },
    ],
    tableHeading: "Pe\u0142ne Por\u00f3wnanie",
    tableSub: "Por\u00f3wnanie skupia si\u0119 na praktycznych r\u00f3\u017cnicach mi\u0119dzy ka\u017cdym podej\u015bciem.",
    tableHeaders: [
      "Kryterium",
      "Szablon CMS",
      "Agencja bez specjalizacji",
      "Freelancer",
      "Forsa Design",
    ],
    tableRows: [
      ["Typowy zakres cenowy", "800\u20132\u00a0000\u00a0\u00a3", "3\u00a0000\u20138\u00a0000\u00a0\u00a3", "1\u00a0500\u20134\u00a0000\u00a0\u00a3", "4\u00a0500\u201312\u00a0000\u00a0\u00a3+"],
      ["Czas realizacji", "2\u20134 tygodnie", "6\u201312 tygodni", "4\u20138 tygodni", "8\u201312 tygodni"],
      [
        "Unikalno\u015b\u0107 designu",
        "Zwykle oparte na gotowych szablonach",
        "Czasem dostosowane",
        "Zale\u017cy od dewelopera",
        "W pe\u0142ni dostosowane",
      ],
      [
        "Szybko\u015b\u0107 strony",
        "Mo\u017ce by\u0107 ograniczona przez wtyczki",
        "Dobra przy czystym kodzie",
        "Zale\u017cy od implementacji",
        "Zoptymalizowana wydajno\u015b\u0107",
      ],
      [
        "SEO i optymalizacja",
        "Podstawowa konfiguracja",
        "\u015arednio",
        "Zale\u017cy od do\u015bwiadczenia",
        "Ustrukturyzowane SEO i optymalizacja wydajno\u015bci",
      ],
      [
        "Wsparcie techniczne",
        "Zwykle wymaga wtyczek lub zewn\u0119trznego wsparcia",
        "Dost\u0119pne jako us\u0142uga dodatkowa",
        "Ograniczone mo\u017cliwo\u015bci",
        "Opcje bie\u017c\u0105cego wsparcia",
      ],
      [
        "Bezpiecze\u0144stwo",
        "Zale\u017cy od konfiguracji",
        "Zwykle zawarte",
        "Zale\u017cy od implementacji",
        "Konfiguracja bezpiecze\u0144stwa z dokumentacj\u0105",
      ],
      [
        "Integracje",
        "Ograniczone dost\u0119pnymi narz\u0119dziami",
        "Mo\u017cliwe z dodatkowym rozwojem",
        "Mo\u017cliwe w zale\u017cno\u015bci od umiej\u0119tno\u015bci",
        "Niestandardowe integracje dost\u0119pne",
      ],
      [
        "Skalowalno\u015b\u0107",
        "Mo\u017ce by\u0107 ograniczaj\u0105ca",
        "Mo\u017cliwa",
        "Mo\u017cliwa",
        "Budowana z my\u015bl\u0105 o przysz\u0142ym wzro\u015bcie",
      ],
      ["Przeno\u015bno\u015b\u0107", "\u015arednio", "Wysoka", "Wysoka", "Pe\u0142na w\u0142asno\u015b\u0107 i kontrola"],
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
