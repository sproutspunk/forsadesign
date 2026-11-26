import { siteCopy } from "@/data/siteCopy";
import { positioningSeo, serviceSchema } from "@/data/positioningSeo";
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
  const { title, description } = positioningSeo(lang, "home");
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: isEn ? "en_GB" : "pl_PL",
    canonical: buildHref(isEn ? "/en/" : "/pl/"),
    alternates: [
      { lang: "en", href: buildHref("/en/") },
      { lang: "pl", href: buildHref("/pl/") },
      { lang: "x-default", href: buildHref("/en/") },
    ],
  });

  useJsonLd(serviceSchema(lang), "offer-catalog");

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
          description,
          founder: { "@id": "https://forsadesign.co.uk/#miro-potaczek" },
          areaServed: ["United Kingdom", "European Union"],
          knowsAbout: isEn
            ? [
                "Industrial web development",
                "Technical product catalogues",
                "B2B procurement",
                "CAD-based visualisation",
                "Parametric 3D configurators",
              ]
            : [
                "Systemy webowe dla przemysłu",
                "Katalogi techniczne produktów",
                "Zakupy B2B",
                "Wizualizacja CAD",
                "Parametryczne konfiguratory 3D",
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
          name: siteCopy[lang].hero.tagline,
          provider: { "@id": "https://forsadesign.co.uk/#organization" },
          areaServed: ["GB", "EU"],
          hasOfferCatalog: { "@id": `https://forsadesign.co.uk/${lang}/#offer-catalog` },
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
