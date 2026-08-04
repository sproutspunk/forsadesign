import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PricingSection from "@/components/PricingSection";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import CTA from "@/components/CTA";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

interface HomePageProps {
  lang: "en" | "pl";
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
      ? "Websites for Industrial and Trade Businesses | Forsa Design, Aberdeenshire"
      : "Strony dla Firm Przemysłowych i Handlowych | Forsa Design, Aberdeenshire",
    description: isEn
      ? "Web design for industrial and trade businesses across Scotland. Custom websites, e-commerce stores and bespoke web solutions. Based in Banff, Aberdeenshire."
      : "Web design dla firm przemysłowych i handlowych w Szkocji. Dedykowane strony internetowe, sklepy i rozwiązania webowe. Siedziba w Banff, Aberdeenshire.",
    ogTitle: isEn
      ? "Forsa Design | Web Design for Industrial and Trade Businesses"
      : "Forsa Design | Web Design dla Firm Przemysłowych i Handlowych",
    ogDescription: isEn
      ? "Web design for industrial and trade businesses across Scotland. Custom websites, e-commerce stores and bespoke web solutions. Based in Banff, Aberdeenshire."
      : "Web design dla firm przemysłowych i handlowych w Szkocji. Dedykowane strony internetowe, sklepy i rozwiązania webowe. Siedziba w Banff, Aberdeenshire.",
    twitterTitle: isEn
      ? "Forsa Design | Web Design for Industrial and Trade Businesses"
      : "Forsa Design | Web Design dla Firm Przemysłowych i Handlowych",
    twitterDescription: isEn
      ? "Web design for industrial and trade businesses across Scotland. Custom websites, e-commerce stores and bespoke web solutions. Based in Banff, Aberdeenshire."
      : "Web design dla firm przemysłowych i handlowych w Szkocji. Dedykowane strony internetowe, sklepy i rozwiązania webowe. Siedziba w Banff, Aberdeenshire.",
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
        <Services />
        <PricingSection />
        <Portfolio />
        <Process />
        <About />
        <FAQ />
        <CTA />
        <ContactInfo />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
