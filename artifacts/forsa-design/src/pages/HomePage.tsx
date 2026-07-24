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
import Footer from "@/components/Footer";

interface HomePageProps {
  lang: "en" | "pl";
}

export default function HomePage({ lang }: HomePageProps) {
  const { language, setLanguage } = useLanguage();

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
    ogLocale: isEn ? "en_US" : "pl_PL",
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
          "@type": "Service",
          "@id": "https://forsadesign.co.uk/#services",
          name: isEn
            ? "Custom Web Design for Industrial & B2B Businesses"
            : "Dedykowany Web Design dla Firm Przemysłowych i B2B",
          provider: { "@id": "https://forsadesign.co.uk/#organization" },
          areaServed: "GB",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: isEn ? "Web Services" : "Usługi Webowe",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Landing Page",
                  description: isEn
                    ? "Single-page site focused on one goal: generate leads or validate an idea."
                    : "Jednopodstronicowa witryna skoncentrowana na jednym celu: generowaniu leadów lub walidacji pomysłu.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "Business Website" : "Strona Firmowa",
                  description: isEn
                    ? "Multi-page site presenting your company, services and credentials."
                    : "Wielostronicowa witryna prezentująca firmę, usługi i referencje.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "E-commerce Store" : "Sklep Internetowy",
                  description: isEn
                    ? "Online store with product catalogue, basket and checkout."
                    : "Sklep internetowy z katalogiem produktów, koszykiem i płatnościami.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: isEn ? "Web Application" : "Aplikacja Webowa",
                  description: isEn
                    ? "Custom tool or platform built around your business logic."
                    : "Dedykowane narzędzie lub platforma zbudowana wokół Twojej logiki biznesowej.",
                },
              },
            ],
          },
        },
      ],
    },
    "home-schema",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <PricingSection />
        <Portfolio />
        <Process />
        <About />
        <CTA />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}
