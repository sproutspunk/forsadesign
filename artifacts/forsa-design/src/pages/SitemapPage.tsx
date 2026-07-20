import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

interface SitemapPageProps {
  lang: "en" | "pl";
}

const content = {
  en: {
    seoTitle: "Site Map | Forsa Design",
    seoDesc: "A full overview of all pages and sections on the Forsa Design website.",
    heading: "Site Map",
    intro: "A complete overview of everything on this website.",
    sections: [
      {
        heading: "Main Page",
        links: [
          { label: "Home", href: "/en/" },
          { label: "Services", href: "/en/#services" },
          { label: "Portfolio", href: "/en/#portfolio" },
          { label: "Process", href: "/en/#process" },
          { label: "About", href: "/en/#about" },
          { label: "Contact", href: "/en/#contact" },
        ],
      },
      {
        heading: "Pages",
        links: [
          { label: "About Us", href: "/en/about" },
          { label: "Agency Comparison", href: "/en/comparison" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Terms & Conditions", href: "/en/terms" },
          { label: "Privacy Policy", href: "/en/privacy" },
        ],
      },
    ],
  },
  pl: {
    seoTitle: "Mapa Strony | Forsa Design",
    seoDesc: "Pe\u0142ny przegl\u0105d wszystkich podstron i sekcji witryny Forsa Design.",
    heading: "Mapa Strony",
    intro: "Kompletny przegl\u0105d wszystkiego, co znajduje si\u0119 na tej stronie.",
    sections: [
      {
        heading: "Strona G\u0142\u00f3wna",
        links: [
          { label: "Start", href: "/pl/" },
          { label: "Us\u0142ugi", href: "/pl/#services" },
          { label: "Portfolio", href: "/pl/#portfolio" },
          { label: "Jak Pracujemy", href: "/pl/#process" },
          { label: "O Nas", href: "/pl/#about" },
          { label: "Kontakt", href: "/pl/#contact" },
        ],
      },
      {
        heading: "Podstrony",
        links: [
          { label: "O Forsa Design", href: "/pl/about" },
          { label: "Por\u00f3wnanie Agencji", href: "/pl/comparison" },
        ],
      },
      {
        heading: "Dokumenty Prawne",
        links: [
          { label: "Regulamin i Warunki", href: "/pl/terms" },
          { label: "Polityka Prywatno\u015bci", href: "/pl/privacy" },
        ],
      },
    ],
  },
};

export default function SitemapPage({ lang }: SitemapPageProps) {
  const { syncLanguage } = useLanguage();
  const c = content[lang];

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
    canonical: `https://forsadesign.co.uk/${lang}/sitemap`,
    alternates: [
      { lang: "en", href: "https://forsadesign.co.uk/en/sitemap" },
      { lang: "pl", href: "https://forsadesign.co.uk/pl/sitemap" },
      { lang: "x-default", href: "https://forsadesign.co.uk/en/sitemap" },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4">
              {c.heading}
            </h1>
            <p className="text-foreground/60 mb-8 md:mb-16 text-lg">{c.intro}</p>

            <div className="space-y-8 md:space-y-12">
              {c.sections.map((section, si) => (
                <motion.div
                  key={si}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: si * 0.08 }}
                >
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                    {section.heading}
                  </h2>
                  <ul className="border-t border-border/20">
                    {section.links.map((link, li) => (
                      <li key={li} className="border-b border-border/10">
                        <a
                          href={link.href}
                          className="flex items-center justify-between py-3 px-1 text-foreground/70 hover:text-primary transition-colors group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                          <span className="text-foreground/30 group-hover:text-primary transition-colors text-sm">
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
