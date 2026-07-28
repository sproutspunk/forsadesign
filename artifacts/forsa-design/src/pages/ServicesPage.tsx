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
    ? "Industrial Web Design & Bespoke Web Systems | Forsa Design"
    : "Web Design dla Przemysłu i Dedykowane Systemy | Forsa Design";
  const description = en
    ? "Procurement-ready websites, B2B e-commerce and bespoke web systems for offshore, energy, engineering, equipment, logistics and manufacturing businesses."
    : "Strony gotowe na audyt zakupowy, e-commerce B2B i dedykowane systemy webowe dla firm offshore, energetycznych, inżynieryjnych, logistycznych i produkcyjnych.";

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
