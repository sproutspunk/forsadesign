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
    ? "Industrial Web Development UK | Manufacturing, Engineering & B2B Systems"
    : "Strony i systemy webowe dla przemysłu | Forsa Design";
  const description = en
    ? "Custom websites, B2B catalogues and web tools for industrial, engineering and technical businesses. No WordPress, no page builders and no off-the-shelf templates."
    : "Dedykowane strony, katalogi B2B i narzędzia webowe dla firm przemysłowych, inżynieryjnych i technicznych. Bez WordPressa, bez kreatorów stron i bez gotowych szablonów.";

  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
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

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      url: buildHref(`/${lang}/services`),
      about: [
        "Industrial and engineering websites",
        "B2B catalogues and ordering systems",
        "Custom web tools and API integrations",
      ],
      provider: { "@type": "Organization", name: "Forsa Design", url: buildHref("/") },
    },
    "services-page-schema",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en
        ? "Industrial and Engineering Websites"
        : "Strony dla przemysłu i firm inżynieryjnych",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Custom websites for industrial, engineering and manufacturing businesses. I focus on clear technical communication, performance, mobile usability, SEO, accessibility and security. I use AI-assisted development tools where they improve efficiency, then review and refine the structure, implementation, content logic, SEO and performance myself. There are no off-the-shelf templates or page builders."
        : "Dedykowane strony internetowe dla firm przemysłowych, inżynieryjnych i produkcyjnych. Koncentruję się na czytelnej komunikacji technicznej, wydajności, obsłudze urządzeń mobilnych, SEO, dostępności i bezpieczeństwie. Korzystam z narzędzi wspomaganych przez AI tam, gdzie zwiększają efektywność pracy, a następnie sam sprawdzam i dopracowuję strukturę, implementację, logikę treści, SEO i wydajność. Nie używam gotowych szablonów ani kreatorów stron.",
    },
    "services-schema-web",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en ? "B2B Catalogues and Ordering Systems" : "Katalogi B2B i systemy zamówień",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Custom product catalogues, enquiry systems, quote workflows and B2B ordering interfaces. Depending on the project, these can include customer accounts, account-specific information, bulk enquiries and API integrations with external services. A typical custom B2B catalogue or ordering system can take approximately 6-10 weeks once the specification, content and required integration access are available. More complex systems are estimated individually."
        : "Dedykowane katalogi produktów, systemy zapytań, procesy wycenowe i interfejsy zamówień B2B. W zależności od projektu mogą obejmować konta klientów, informacje przypisane do kont, zapytania zbiorcze oraz integracje API z usługami zewnętrznymi. Typowy dedykowany katalog lub system zamówień B2B może wymagać około 6-10 tygodni od momentu uzgodnienia specyfikacji i dostarczenia treści oraz dostępu potrzebnego do integracji. Bardziej złożone systemy planuję i wyceniam indywidualnie.",
    },
    "services-schema-ecommerce",
  );
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: en
        ? "Custom Web Tools and API Integrations"
        : "Dedykowane narzędzia webowe i integracje API",
      provider: serviceProvider,
      areaServed,
      description: en
        ? "Dealer portals, specification tools, multilingual quote systems, custom forms and workflow integrations built around the way the business operates. I use AI-assisted tools to accelerate appropriate parts of development while retaining direct control over architecture, configuration, testing, security and the final implementation. API integrations are assessed individually according to the external system and its documentation."
        : "Portale dealerskie, narzędzia do tworzenia specyfikacji, wielojęzyczne systemy wycen, dedykowane formularze i integracje procesów dopasowane do sposobu działania firmy. Korzystam z narzędzi wspomaganych przez AI, aby przyspieszyć odpowiednie etapy developmentu, zachowując bezpośrednią kontrolę nad architekturą, konfiguracją, testami, bezpieczeństwem i końcowym wdrożeniem. Każdą integrację API oceniam indywidualnie na podstawie systemu zewnętrznego i jego dokumentacji.",
    },
    "services-schema-bespoke",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content">
        <section className="pt-36 pb-20 bg-card border-b border-border/10">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {en
                ? "Websites and Web Systems for Industrial and Engineering Businesses"
                : "Strony i systemy webowe dla firm przemysłowych i inżynieryjnych"}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-3xl">
              {en
                ? "I build custom websites, B2B catalogues and web tools for industrial, engineering and technical businesses. No WordPress, no page builders and no off-the-shelf templates. Where appropriate, I use AI-assisted development tools and then review, configure, test and optimise the implementation myself."
                : "Buduję dedykowane strony, katalogi B2B i narzędzia webowe dla firm przemysłowych, inżynieryjnych i technicznych. Bez WordPressa, bez kreatorów stron i bez gotowych szablonów. Tam, gdzie ma to sens, korzystam z narzędzi wspomaganych przez AI, a następnie sam sprawdzam, konfiguruję, testuję i optymalizuję wdrożenie."}
            </p>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-3xl mt-4">
              {en
                ? "My approach combines modern web development with more than 20 years of experience in international industrial B2B sales."
                : "Łączę nowoczesny web development z ponad 20-letnim doświadczeniem w międzynarodowej sprzedaży przemysłowej B2B."}
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
