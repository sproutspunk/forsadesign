import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage({ lang }: { lang: "en" | "pl" }) {
  const { syncLanguage } = useLanguage();
  const en = lang === "en";
  const title = en
    ? "Contact Industrial Web Design UK | Forsa Design, Aberdeenshire"
    : "Kontakt Web Design dla Przemysłu UK | Forsa Design, Aberdeenshire";
  const description = en
    ? "Contact Forsa Design for industrial web design, manufacturing websites and B2B web systems in Scotland and across the UK. Based in Banff, Aberdeenshire."
    : "Skontaktuj się z Forsa Design w sprawie projektowania stron dla przemysłu, produkcji i systemów B2B w Szkocji i UK. Siedziba w Banff, Aberdeenshire.";
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: en ? "en_GB" : "pl_PL",
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
      <main id="main-content">
        <section className="pt-36 pb-12 bg-card">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
              {en ? "Contact Forsa Design directly" : "Skontaktuj się bezpośrednio z Forsa Design"}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed">
              {en
                ? "Email, call or send a message to discuss your industrial website, B2B catalogue or bespoke web system."
                : "Napisz, zadzwoń lub wyślij wiadomość, aby omówić stronę przemysłową, katalog B2B lub dedykowany system webowy."}
            </p>
          </div>
        </section>
        <ContactInfo />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
