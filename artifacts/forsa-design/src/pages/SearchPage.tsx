import { useMemo, useState } from "react";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { articles } from "@/data/articlesData";
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
      title: "Forsa Design",
      excerpt:
        "Web systems for heavy industry, including industrial web design, B2B e-commerce and bespoke web applications.",
      href: "/en/",
      category: "Home",
    },
    {
      title: "Industrial Web Design & Bespoke Web Systems",
      excerpt:
        "Procurement-ready websites, e-commerce and bespoke web systems for industrial, engineering, energy and logistics businesses.",
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
      title: "Website Quote Calculator",
      excerpt: "Get an instant estimate for a custom website, e-commerce store or web application.",
      href: "/en/quote",
      category: "Tools",
    },
    {
      title: "Contact Forsa Design",
      excerpt:
        "Discuss an industrial website, B2B catalogue, e-commerce project or bespoke web system.",
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
      title: "Forsa Design",
      excerpt:
        "Systemy webowe dla przemysłu ciężkiego, w tym web design, e-commerce B2B i dedykowane aplikacje webowe.",
      href: "/pl/",
      category: "Strona główna",
    },
    {
      title: "Web Design dla Przemysłu i Dedykowane Systemy",
      excerpt:
        "Strony gotowe na audyt zakupowy, e-commerce i dedykowane systemy dla firm przemysłowych, inżynieryjnych, energetycznych i logistycznych.",
      href: "/pl/services",
      category: "Usługi",
    },
    {
      title: "O Forsa Design",
      excerpt:
        "Poznaj założyciela z ponad 20-letnim doświadczeniem w międzynarodowej sprzedaży B2B.",
      href: "/pl/about",
      category: "O nas",
    },
    {
      title: "Porównaj opcje web design",
      excerpt: "Porównaj dedykowane strony, szablony CMS, agencje i freelancerów.",
      href: "/pl/comparison",
      category: "Poradnik",
    },
    {
      title: "Kalkulator wyceny strony",
      excerpt: "Uzyskaj natychmiastową wycenę strony, sklepu internetowego lub aplikacji webowej.",
      href: "/pl/quote",
      category: "Narzędzia",
    },
    {
      title: "Kontakt z Forsa Design",
      excerpt:
        "Porozmawiaj o stronie przemysłowej, katalogu B2B, e-commerce lub dedykowanym systemie webowym.",
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
  const faqItems = t("faq.items") as unknown as { q: string; a: string }[];

  useSeoMeta({
    title: isEn ? "Search | Forsa Design" : "Szukaj | Forsa Design",
    description: isEn
      ? "Search Forsa Design services, industrial web design guidance, frequently asked questions and articles."
      : "Przeszukaj usługi Forsa Design, poradniki web design dla przemysłu, FAQ i artykuły.",
    ogTitle: isEn ? "Search Forsa Design" : "Szukaj w Forsa Design",
    ogDescription: isEn
      ? "Find information about industrial web design, bespoke web systems, FAQ and articles."
      : "Znajdź informacje o web design dla przemysłu, dedykowanych systemach, FAQ i artykułach.",
    twitterTitle: isEn ? "Search Forsa Design" : "Szukaj w Forsa Design",
    twitterDescription: isEn
      ? "Find information about industrial web design, bespoke web systems, FAQ and articles."
      : "Znajdź informacje o web design dla przemysłu, dedykowanych systemach, FAQ i artykułach.",
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
    const faqEntries: SearchEntry[] = faqItems.map((item, index) => ({
      title: item.q,
      excerpt: item.a,
      href: `/${lang}/#faq-${index + 1}`,
      category: "FAQ",
    }));
    return [...pageEntries[lang], ...faqEntries, ...articleEntries];
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
                ? "Search our services, frequently asked questions, guides and articles."
                : "Przeszukaj nasze usługi, najczęstsze pytania, poradniki i artykuły."}
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
