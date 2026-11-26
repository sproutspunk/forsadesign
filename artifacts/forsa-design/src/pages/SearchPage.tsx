import { siteCopy } from "@/data/siteCopy";
import { historyCopy, historyMilestones, historyPath } from "@/data/history";
import { dachCase, dachPath } from "@/data/dachCaseStudy";
import { linklangCaseStudy, linklangCasePath } from "@/data/linklangCaseStudy";
import { positioningSeo } from "@/data/positioningSeo";
import { useMemo, useState } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { articles } from "@/data/articlesData";
import { dueDiligence, dueDiligencePath } from "@/data/dueDiligence";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Language = "en" | "pl";

type SearchEntry = {
  title: string;
  excerpt: string;
  searchText?: string;
  href: string;
  category: string;
};

const pageEntries: Record<Language, SearchEntry[]> = {
  en: [
    {
      title: dueDiligence.en.title,
      excerpt: dueDiligence.en.opening[1],
      href: dueDiligencePath("en"),
      category: "Services",
    },
    {
      title: siteCopy.en.hero.tagline,
      excerpt: siteCopy.en.hero.subheader,
      href: "/en/",
      category: "Home",
    },
    {
      title: positioningSeo("en", "services").title,
      excerpt: positioningSeo("en", "services").description,
      searchText: [
        ...siteCopy.en.services.digital.items,
        ...siteCopy.en.services.engineering.items,
      ].join(" "),
      href: "/en/services",
      category: "Services",
    },
    {
      title: "About Forsa Design",
      excerpt:
        "Meet the founder with more than 20 years of international B2B industrial sales experience.",
      href: "/en/about",
      category: "About",
    },
    {
      title: "Compare Web Design Options",
      excerpt: "Compare custom builds, CMS templates, agencies and freelancers.",
      href: "/en/comparison",
      category: "Guide",
    },
    {
      title: "Request a Quote",
      excerpt: "Describe your project so we can review the requirements and prepare the next step.",
      href: "/en/quote",
      category: "Contact",
    },
    {
      title: "Contact Forsa Design",
      excerpt: "Discuss an industrial digital system, technical catalogue or 3D project.",
      href: "/en/contact",
      category: "Contact",
    },
    {
      title: "Terms and Conditions",
      excerpt: "Terms and conditions for Forsa Design web design and development services.",
      href: "/en/terms",
      category: "Legal",
    },
    {
      title: "Privacy Policy",
      excerpt: "How Forsa Design collects, uses and protects personal data.",
      href: "/en/privacy",
      category: "Legal",
    },
  ],
  pl: [
    {
      title: dueDiligence.pl.title,
      excerpt: dueDiligence.pl.opening[1],
      href: dueDiligencePath("pl"),
      category: "Usługi",
    },
    {
      title: siteCopy.pl.hero.tagline,
      excerpt: siteCopy.pl.hero.subheader,
      href: "/pl/",
      category: "Strona główna",
    },
    {
      title: positioningSeo("pl", "services").title,
      excerpt: positioningSeo("pl", "services").description,
      searchText: [
        ...siteCopy.pl.services.digital.items,
        ...siteCopy.pl.services.engineering.items,
      ].join(" "),
      href: "/pl/services",
      category: "Usługi",
    },
    {
      title: "O Forsa Design",
      excerpt:
        "Poznaj założyciela z ponad 20-letnim doświadczeniem w międzynarodowej sprzedaży B2B.",
      href: "/pl/o-nas/",
      category: "O nas",
    },
    {
      title: "Porównaj opcje web design",
      excerpt: "Porównaj dedykowane strony, szablony CMS, agencje i freelancerów.",
      href: "/pl/comparison",
      category: "Poradnik",
    },
    {
      title: "Poproś o wycenę",
      excerpt:
        "Opisz projekt. Przeanalizujemy wymagania i wskażemy informacje potrzebne do przygotowania oferty.",
      href: "/pl/quote",
      category: "Kontakt",
    },
    {
      title: "Kontakt z Forsa Design",
      excerpt:
        "Porozmawiaj o systemie cyfrowym dla przemysłu, katalogu technicznym lub projekcie 3D.",
      href: "/pl/contact",
      category: "Kontakt",
    },
    {
      title: "Regulamin i Warunki",
      excerpt: "Regulamin i warunki świadczenia usług web design i developmentu Forsa Design.",
      href: "/pl/terms",
      category: "Prawo",
    },
    {
      title: "Polityka Prywatności",
      excerpt: "Informacje o tym, jak Forsa Design zbiera, wykorzystuje i chroni dane osobowe.",
      href: "/pl/privacy",
      category: "Prawo",
    },
  ],
};

export default function SearchPage({ lang }: { lang: Language }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const isEn = lang === "en";
  const faqItems = t("faq.items") as unknown as { id: string; q: string; a: string }[];

  const { title, description } = positioningSeo(lang, "search");
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: isEn ? "en_GB" : "pl_PL",
    canonical: buildHref(`/${lang}/search`),
    alternates: [
      { lang: "en", href: buildHref("/en/search") },
      { lang: "pl", href: buildHref("/pl/search") },
    ],
  });

  const entries = useMemo(() => {
    const articleEntries: SearchEntry[] = articles.map((article) => {
      const content = article[lang];
      return {
        title: content.title,
        excerpt: content.excerpt,
        searchText: content.sections
          .map((section) => `${section.heading ?? ""} ${section.body}`)
          .join(" "),
        href: `/${lang}/blog/${lang === "en" ? article.slugEn : article.slugPl}`,
        category: isEn ? "Articles" : "Artykuły",
      };
    });
    const faqEntries: SearchEntry[] = faqItems.map((item) => ({
      title: item.q,
      excerpt: item.a,
      href: `/${lang}/#${item.id}`,
      category: "FAQ",
    }));
    const developmentEntries: SearchEntry[] = [
      {
        title: historyCopy[lang].title,
        excerpt: historyCopy[lang].description,
        searchText: historyMilestones.map((milestone) => milestone[lang]).join(" "),
        href: historyPath(lang),
        category: siteCopy[lang].nav.about,
      },
      {
        title: dachCase[lang].title,
        excerpt: dachCase[lang].intro,
        searchText: dachCase[lang].status,
        href: dachPath(lang),
        category: "Portfolio",
      },
      {
        title: linklangCaseStudy[lang].title,
        excerpt: linklangCaseStudy[lang].description,
        href: linklangCasePath(lang),
        category: "Portfolio",
      },
    ];
    return [...pageEntries[lang], ...developmentEntries, ...faqEntries, ...articleEntries];
  }, [faqItems, isEn, lang]);

  const normalizedQuery = query.trim().toLocaleLowerCase(lang === "pl" ? "pl-PL" : "en-GB");
  const results = entries.filter((entry) => {
    if (!normalizedQuery) return true;
    return `${entry.title} ${entry.excerpt} ${entry.searchText ?? ""} ${entry.category}`
      .toLocaleLowerCase(lang === "pl" ? "pl-PL" : "en-GB")
      .includes(normalizedQuery);
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content" className="pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-3xl mb-14">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {isEn ? "Search Forsa Design" : "Szukaj w Forsa Design"}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              {isEn
                ? "Search our services, development milestones, case studies, frequently asked questions and articles."
                : "Przeszukaj nasze usługi, etapy rozwoju, opisy projektów, najczęstsze pytania i artykuły."}
            </p>
          </div>

          <div className="relative max-w-3xl mb-10">
            <label htmlFor="site-search" className="sr-only">
              {isEn ? "Search the site" : "Szukaj na stronie"}
            </label>
            <SearchIcon
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none"
            />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                isEn ? "Search services, FAQ and articles..." : "Szukaj usług, FAQ i artykułów..."
              }
              autoFocus
              className="w-full bg-card border border-border/30 rounded-md pl-12 pr-4 py-4 text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary/60"
            />
          </div>

          <p className="text-sm text-foreground/50 mb-5">
            {isEn
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : `${results.length} ${results.length === 1 ? "wynik" : "wyników"}`}
          </p>

          {results.length > 0 ? (
            <div className="grid gap-4 max-w-4xl">
              {results.map((entry) => (
                <a
                  key={`${entry.category}-${entry.href}-${entry.title}`}
                  href={entry.href}
                  className="group bg-card border border-border/20 rounded-md p-6 hover:border-primary/50 transition-colors"
                >
                  <span className="text-xs uppercase tracking-widest text-primary">
                    {entry.category}
                  </span>
                  <h2 className="font-serif text-2xl text-white mt-2 mb-2">{entry.title}</h2>
                  <p className="text-foreground/65 leading-relaxed">{entry.excerpt}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm text-primary">
                    {isEn ? "Read more" : "Czytaj więcej"}
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-foreground/60 py-10">
              {isEn
                ? "No results found. Try another search."
                : "Nie znaleziono wyników. Spróbuj innego hasła."}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
