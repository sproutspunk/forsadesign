import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function ServicesPage({ lang }: { lang: "en" | "pl" }) {
  const { syncLanguage } = useLanguage();
  const en = lang === "en";
  const title = en
    ? "Services — Custom Web Systems for Heavy Industry | Forsa Design"
    : "Usługi — Dedykowane Systemy Web dla Przemysłu Ciężkiego | Forsa Design";
  const description = en
    ? "Hand-coded websites, B2B e-commerce for parts, and bespoke web systems for offshore, energy, and engineering firms. Based in Scotland."
    : "Strony kodowane od podstaw, e-commerce B2B na części i dedykowane systemy webowe dla firm offshore, energetycznych i inżynieryjnych. Bazujemy w Szkocji.";

  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: en ? "en_US" : "pl_PL",
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

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      url: buildHref(`/${lang}/services`),
      about: ["Industrial web design", "B2B e-commerce", "Bespoke web systems"],
      provider: { "@type": "Organization", name: "Forsa Design", url: buildHref("/") },
    },
    "services-page-schema",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en ? "Industrial Web Presence" : "Strona dla Przemysłu",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Dedicated websites built from scratch for engineering and manufacturing firms. Fast load times, mobile-optimised for site offices, clear technical messaging."
        : "Dedykowane strony budowane od podstaw dla firm inżynieryjnych i produkcyjnych. Szybkie ładowanie, zoptymalizowane mobilnie, przejrzysty przekaz techniczny.",
    },
    "services-schema-web",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en ? "E-commerce for Parts & Equipment" : "E-commerce dla Części i Urządzeń",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Online catalogues and B2B e-commerce stores for industrial parts, equipment and consumables. Integrates with existing inventory where the API allows."
        : "Katalogi online i sklepy B2B dla części przemysłowych, urządzeń i materiałów eksploatacyjnych. Integracja z istniejącymi systemami magazynowymi.",
    },
    "services-schema-ecommerce",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en ? "Bespoke Web Systems" : "Dedykowane Systemy Webowe",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Custom web applications and portals built around your business logic — quotation tools, ERP bridges, client portals, and procurement dashboards."
        : "Dedykowane aplikacje webowe i portale dopasowane do logiki Twojej firmy — narzędzia wycenowe, mosty ERP, portale klienta, dashboardy zakupowe.",
    },
    "services-schema-bespoke",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main>
        <section className="pt-36 pb-20 bg-card border-b border-border/10">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {en ? "Web systems for heavy industry" : "Systemy webowe dla przemysłu ciężkiego"}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-3xl">
              {en
                ? "Your website is part of the procurement process. We build the technical proof, clarity and speed that serious buyers expect."
                : "Twoja strona jest częścią procesu zakupowego. Budujemy techniczne dowody, jasność przekazu i szybkość, których oczekują poważni kupujący."}
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
