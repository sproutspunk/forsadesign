import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function ContactPage({ lang }: { lang: "en" | "pl" }) {
  const { syncLanguage } = useLanguage();
  const en = lang === "en";
  const title = en
    ? "Contact Forsa Design | Industrial Web Projects"
    : "Kontakt z Forsa Design | Projekty Web dla Przemysłu";
  const description = en
    ? "Discuss an industrial website, B2B catalogue, e-commerce project or bespoke web system with Forsa Design in Banff, Aberdeenshire."
    : "Porozmawiaj o stronie przemysłowej, katalogu B2B, e-commerce lub dedykowanym systemie webowym z Forsa Design w Banff, Aberdeenshire.";
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: en ? "en_US" : "pl_PL",
    canonical: buildHref(`/${lang}/contact`),
    alternates: [
      { lang: "en", href: buildHref("/en/contact") },
      { lang: "pl", href: buildHref("/pl/contact") },
    ],
  });
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: title,
      url: buildHref(`/${lang}/contact`),
      mainEntity: {
        "@type": "Organization",
        name: "Forsa Design",
        email: "hello@forsadesign.co.uk",
        telephone: "+44 7770 110735",
      },
    },
    "contact-page-schema",
  );
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main>
        <section className="pt-36 pb-12 bg-card">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {en ? "Start with the technical brief" : "Zacznijmy od briefu technicznego"}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              {en
                ? "Tell us what you build, who buys it and where your current website falls short."
                : "Opowiedz, co budujesz, kto to kupuje i gdzie obecna strona nie spełnia swojej roli."}
            </p>
          </div>
        </section>
        <Contact />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}
