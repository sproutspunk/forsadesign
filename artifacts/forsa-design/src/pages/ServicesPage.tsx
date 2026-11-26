import { siteCopy } from "@/data/siteCopy";
import { positioningSeo, serviceSchema } from "@/data/positioningSeo";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import { brandingCopy } from "@/components/BrandingOffer";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function ServicesPage({ lang }: { lang: "en" | "pl" }) {
  const { syncLanguage } = useLanguage();
  const en = lang === "en";
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (sectionId) document.getElementById(sectionId)?.scrollIntoView();
  }, [lang]);
  const { title, description } = positioningSeo(lang, "services");
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: en ? "en_GB" : "pl_PL",
    canonical: buildHref(`/${lang}/services`),
    alternates: [
      { lang: "en", href: buildHref("/en/services") },
      { lang: "pl", href: buildHref("/pl/services") },
    ],
  });
  const serviceProvider = {
    "@type": "LocalBusiness",
    name: "Forsa Design",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Banff",
      addressRegion: "Aberdeenshire",
      postalCode: "AB45",
      addressCountry: "GB",
    },
  };
  const areaServed = { "@type": "AdministrativeArea", name: "Scotland" };

  useJsonLd(serviceSchema(lang), "services-schema");

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: brandingCopy[lang].title,
      description: brandingCopy[lang].intro,
      serviceType: "Branding and visual identity",
      url: buildHref(`/${lang}/services/#branding`),
      provider: serviceProvider,
      areaServed,
    },
    "services-schema-branding",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content">
        <section className="pt-36 pb-20 bg-card border-b border-border/10">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {siteCopy[lang].hero.tagline}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-3xl">
              {siteCopy[lang].hero.subheader}
            </p>
          </div>
        </section>
        <Services />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
