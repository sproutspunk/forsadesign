import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AuditBanner from "@/components/AuditBanner";

const HomeSections = lazy(() => import("@/components/HomeSections"));

interface HomePageProps {
  lang: "en" | "pl";
}

function DeferredHomeSections() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const loadSections = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      setShouldLoad(true);
      window.removeEventListener("scroll", loadSections);
      window.removeEventListener("touchstart", loadSections);
      window.removeEventListener("wheel", loadSections);
      window.removeEventListener("hashchange", loadSections);
    };

    // Load below-the-fold sections on mount. The code remains lazy-chunked so
    // the initial paint is not blocked, but #contact / #about anchors and CTAs
    // must resolve immediately after the page becomes interactive.
    const timer = window.setTimeout(loadSections, 0);

    // Hash navigation must work without waiting for the timeout.
    if (window.location.hash) {
      window.clearTimeout(timer);
      loadSections();
    }

    // Keep gesture listeners as a safety net for interactions before the chunk
    // finishes loading.
    window.addEventListener("scroll", loadSections, { passive: true });
    window.addEventListener("touchstart", loadSections, { passive: true });
    window.addEventListener("wheel", loadSections, { passive: true });
    window.addEventListener("hashchange", loadSections);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", loadSections);
      window.removeEventListener("touchstart", loadSections);
      window.removeEventListener("wheel", loadSections);
      window.removeEventListener("hashchange", loadSections);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || !window.location.hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [shouldLoad]);

  if (!shouldLoad) {
    return <div className="min-h-[5600px]" aria-hidden="true" />;
  }

  return (
    <Suspense fallback={<div className="min-h-[5600px]" aria-hidden="true" />}>
      <HomeSections />
    </Suspense>
  );
}

export default function HomePage({ lang }: HomePageProps) {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (language !== lang) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (++attempts < 10) setTimeout(tryScroll, 80);
    };
    const t = setTimeout(tryScroll, 80);
    return () => clearTimeout(t);
  }, []);

  const isEn = lang === "en";
  useSeoMeta({
    title: isEn
      ? "Industrial Web Design UK | Web Design for Manufacturing & Engineering"
      : "Web Design dla Przemysłu UK | Strony dla Produkcji i Inżynierii",
    description: isEn
      ? "Industrial web design for manufacturing, engineering and offshore businesses across the UK. Custom websites, B2B e-commerce and bespoke web systems from Banff, Aberdeenshire."
      : "Projektowanie stron dla przemysłu, produkcji i inżynierii w UK. Dedykowane strony, e-commerce B2B i systemy webowe. Siedziba w Banff, Aberdeenshire.",
    ogTitle: isEn
      ? "Forsa Design | Industrial Web Design for Manufacturing & Engineering"
      : "Forsa Design | Web Design dla Przemysłu i Produkcji",
    ogDescription: isEn
      ? "Industrial web design for manufacturing, engineering and offshore businesses across the UK. Custom websites, B2B e-commerce and bespoke web systems."
      : "Projektowanie stron dla przemysłu, produkcji i inżynierii w UK. Dedykowane strony, e-commerce B2B i systemy webowe.",
    twitterTitle: isEn
      ? "Forsa Design | Industrial Web Design for Manufacturing & Engineering"
      : "Forsa Design | Web Design dla Przemysłu i Produkcji",
    twitterDescription: isEn
      ? "Industrial web design for manufacturing, engineering and offshore businesses across the UK. Custom websites, B2B e-commerce and bespoke web systems."
      : "Projektowanie stron dla przemysłu, produkcji i inżynierii w UK. Dedykowane strony, e-commerce B2B i systemy webowe.",
    ogLocale: isEn ? "en_GB" : "pl_PL",
    canonical: buildHref(isEn ? "/en/" : "/pl/"),
    alternates: [
      { lang: "en", href: buildHref("/en/") },
      { lang: "pl", href: buildHref("/pl/") },
      { lang: "x-default", href: buildHref("/en/") },
    ],
  });

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://forsadesign.co.uk/#website",
          url: "https://forsadesign.co.uk/",
          name: "Forsa Design",
          inLanguage: isEn ? "en-GB" : "pl-PL",
          publisher: { "@id": "https://forsadesign.co.uk/#organization" },
        },
        {
          "@type": "Organization",
          "@id": "https://forsadesign.co.uk/#organization",
          name: "Forsa Design",
          url: "https://forsadesign.co.uk",
          email: "hello@forsadesign.co.uk",
          description: isEn
            ? "Industrial web design and bespoke web systems for offshore, energy, engineering, equipment, logistics and manufacturing businesses."
            : "Projektowanie stron i dedykowane systemy webowe dla firm offshore, energetycznych, inżynieryjnych, produkcyjnych i logistycznych.",
          founder: { "@id": "https://forsadesign.co.uk/#miro-potaczek" },
          areaServed: ["United Kingdom", "European Union"],
          knowsAbout: [
            "Industrial web design",
            "B2B procurement",
            "Offshore energy",
            "Engineering",
            "Industrial equipment",
            "Manufacturing",
            "Technical SEO",
            "E-commerce integrations",
          ],
        },
        {
          "@type": "Person",
          "@id": "https://forsadesign.co.uk/#miro-potaczek",
          name: "Miro Potaczek",
          jobTitle: "Founder and Developer",
          worksFor: { "@id": "https://forsadesign.co.uk/#organization" },
          knowsAbout: [
            "International B2B sales",
            "Industrial equipment",
            "Engineering procurement",
            "Web development",
          ],
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://forsadesign.co.uk/#localbusiness",
          name: "Forsa Design",
          url: "https://forsadesign.co.uk",
          email: "hello@forsadesign.co.uk",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Banff",
            addressRegion: "Scotland",
            addressCountry: "GB",
          },
          areaServed: ["Scotland", "United Kingdom", "European Union"],
          parentOrganization: { "@id": "https://forsadesign.co.uk/#organization" },
        },
        {
          "@type": "Service",
          "@id": "https://forsadesign.co.uk/#services",
          name: isEn
            ? "Custom Web Design for Industrial & B2B Businesses"
            : "Dedykowany Web Design dla Firm Przemysłowych i B2B",
          provider: { "@id": "https://forsadesign.co.uk/#organization" },
          areaServed: ["GB", "EU"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: isEn ? "Web Services" : "Usługi Webowe",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "Industrial Web Presence" : "Strona dla przemysłu",
                  description: isEn
                    ? "Single-page site focused on one goal: generate leads or validate an idea."
                    : "Jednopodstronicowa witryna skoncentrowana na jednym celu: generowaniu leadów lub walidacji pomysłu.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "Bespoke Web Systems" : "Dedykowane systemy webowe",
                  description: isEn
                    ? "Multi-page site presenting your company, services and credentials."
                    : "Wielostronicowa witryna prezentująca firmę, usługi i referencje.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn
                    ? "E-commerce for Parts and Equipment"
                    : "E-commerce dla części i urządzeń",
                  description: isEn
                    ? "Online store with product catalogue, basket and checkout."
                    : "Sklep internetowy z katalogiem produktów, koszykiem i płatnościami.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "Procurement-ready Web Application" : "Aplikacja webowa dla zakupów",
                  description: isEn
                    ? "Custom tool or platform built around your business logic."
                    : "Dedykowane narzędzie lub platforma zbudowana wokół Twojej logiki biznesowej.",
                },
              },
            ],
          },
        },
        {
          "@type": "FAQPage",
          "@id": `https://forsadesign.co.uk/${lang}/#faq`,
          mainEntity: (t("faq.items") as unknown as { q: string; a: string }[]).map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    },
    "home-schema",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main id="main-content">
        <Hero />
        <AuditBanner source="homepage-hero" />
        <Services />
        <DeferredHomeSections />
      </main>
    </div>
  );
}
