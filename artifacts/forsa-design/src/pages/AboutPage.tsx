import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface AboutPageProps {
  lang: "en" | "pl";
}

const content = {
  en: {
    seoTitle: "About Us | Forsa Design, Web Agency in Banff, Aberdeenshire",
    seoDesc:
      "Learn about Forsa Design, a web agency based in Banff, Aberdeenshire, Scotland, building custom websites for businesses across Aberdeenshire and Scotland.",
    heading: "Meet the Founder of Forsa Design",
    intro:
      "My name is Miro. I started Forsa Design after more than 20 years in international B2B sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I sat on both sides of the procurement table. I know what the process looks like from the first email to the signed contract. That experience taught me one thing: most industrial firms do excellent work, but their websites do not keep up. And it costs contracts. I now build websites that speak your customers' language. No templates. No jargon. Just clean code and a clear message.",
    whatWeDoHeading: "Why This Background Matters",
    services: [
      {
        title: "Real Business Perspective",
        desc: "Having run a company for 17 years, negotiated international contracts across three continents, and managed teams in multiple countries, I understand what a website needs to do for your bottom line. Every design decision is filtered through a business lens, not just an aesthetic one.",
      },
      {
        title: "Communication at Every Level",
        desc: "From driving VIP delegations through Kraków to inspecting roads for Aberdeenshire Council, I've worked with clients and stakeholders from all walks of life. This translates into websites that speak clearly to your audience, whether they are local customers or international partners.",
      },
      {
        title: "Results-Focused Delivery",
        desc: "My career has been built on closing deals, managing projects end-to-end, and delivering measurable outcomes. I bring the same discipline to web development: clear timelines, transparent communication, and a focus on what actually moves the needle for your business.",
      },
    ],
    processHeading: "Our Process",
    steps: [
      {
        num: "01",
        title: "Discovery & Strategy",
        period: "Weeks 1-2",
        desc: "We conduct interviews, analyse your industry, competition, users, and define business goals.",
      },
      {
        num: "02",
        title: "Design",
        period: "Weeks 3-4",
        desc: "We create wireframes, mockups, and a visual strategy. Everything approved by you before we write a line of code.",
      },
      {
        num: "03",
        title: "Development",
        period: "Weeks 5-8",
        desc: "We build the site with a focus on performance, security, SEO, and conversion.",
      },
      {
        num: "04",
        title: "Testing & Optimisation",
        period: "Week 9",
        desc: "Tests across all devices and browsers, performance analysis, security, SEO.",
      },
      {
        num: "05",
        title: "Launch & Support",
        period: "Ongoing",
        desc: "We deploy the site live. The first few weeks we're in close contact, then we transition to ongoing support.",
      },
    ],
    differentiatorHeading: "What Sets Us Apart",
    differentiators: [
      {
        title: "No templates.",
        desc: "Every project starts from scratch, tailored to your industry and goals.",
      },
      {
        title: "Focus on business results.",
        desc: "We measure everything. Whether the site attracts users, converts, and supports sales.",
      },
      {
        title: "You own everything.",
        desc: "Your domain, hosting and content are always in your control. No lock-in, no dependency on a single provider.",
      },
      {
        title: "Long-term partnership.",
        desc: "We support you months and years after launch. This isn't a project, it's a collaboration.",
      },
      {
        title: "Transparent communication.",
        desc: "You know what's being done, why, and when it will be ready. No hidden fees, no bureaucratic tricks.",
      },
    ],
    comparisonHeading: "How We Compare",
    comparisonSub:
      "An honest look at the options available to you, so you can make the right decision for your business.",
    tableHeaders: ["Aspect", "CMS Template", "Non-specialist Agency", "Freelancer", "Forsa Design"],
    tableRows: [
      ["Price", "£800-2,000", "£3,000-8,000", "£1,500-4,000", "£1,200-12,000+"],
      ["Turnaround", "2-4 weeks", "6-12 weeks", "4-8 weeks", "8-12 weeks"],
      [
        "Design uniqueness",
        "Looks like competition",
        "Sometimes template-based",
        "Varies",
        "Unique, tailored",
      ],
      [
        "Site speed",
        "Average (plugin-heavy)",
        "Good (if clean code)",
        "Varies",
        "High (optimised)",
      ],
      ["SEO + Optimisation", "Basic", "Average", "Varies", "Advanced (Schema, E-E-A-T)"],
      ["Technical support", "Plugins required", "Optional (extra cost)", "Limited", "Included"],
      [
        "Security (SSL, GDPR, PCI)",
        "Depends on plugins",
        "Generally yes",
        "Varies",
        "Yes, full documentation",
      ],
      [
        "Integrations (CRM, ERP)",
        "Plugin ecosystem",
        "Can be done",
        "Varies",
        "Yes, custom development",
      ],
      ["Scalability", "Difficult (template lock-in)", "Possible", "Possible", "Easy (custom code)"],
      ["Portability", "Medium", "High", "High", "High (full control)"],
      ["Brand consistency", "Low", "Medium", "Varies", "High (guidelines integrated)"],
    ],
    forsa: "Forsa Design",
    comparisonCta: "See full comparison",
    comparisonHref: "/en/comparison",
    contactCta: "Start a Project",
    contactHref: "#contact",
  },
  pl: {
    seoTitle: "O Nas | Forsa Design, Agencja Web Design w Banff, Aberdeenshire",
    seoDesc:
      "Poznaj Forsa Design, agencję web design z Banff w Aberdeenshire w Szkocji, specjalizującą się w autorskich stronach internetowych dla firm z Aberdeenshire i całej Szkocji.",
    heading: "Poznaj Założyciela Forsa Design",
    intro:
      "Nazywam się Miro. Forsa Design założyłem po ponad 20 latach w międzynarodowej sprzedaży B2B. Handlowałem maszynami do obróbki metalu, wyposażeniem przemysłowym i rozwiązaniami inżynieryjnymi w Europie i Azji. Siedziałem po obu stronach stołu zakupowego. Wiem jak wygląda proces od pierwszego maila po podpisany kontrakt. To doświadczenie nauczyło mnie jednej rzeczy: większość firm przemysłowych wykonuje świetną robotę, ale ich strony nie nadążają za poziomem usług. I to kosztuje kontrakty. Teraz buduję strony, które komunikują się językiem Twoich klientów. Bez szablonów. Bez żargonu. Tylko czysty kod i jasny przekaz.",
    whatWeDoHeading: "Dlaczego To Doświadczenie Ma Znaczenie",
    services: [
      {
        title: "Perspektywa Prawdziwego Biznesu",
        desc: "Prowadząc firmę przez 17 lat, negocjując międzynarodowe kontrakty na trzech kontynentach i zarządzając zespołami w wielu krajach, rozumiem, co strona internetowa musi robić dla Twojego zysku. Każda decyzja projektowa jest filtrowana przez pryzmat biznesowy, nie tylko estetyczny.",
      },
      {
        title: "Komunikacja na Każdym Poziomie",
        desc: "Od transportu VIP przez Kraków po inspekcje dróg dla Aberdeenshire Council, pracowałem z klientami i interesariuszami z każdej dziedziny życia. To przekłada się na strony, które jasno komunikują się z Twoją publicznością - czy to lokalni klienci, czy międzynarodowi partnerzy.",
      },
      {
        title: "Dostarczanie Wyników",
        desc: "Cała moja kariera opierała się na zawieraniu umów, zarządzaniu projektami od A do Z i dostarczaniu mierzalnych rezultatów. Tę samą dyscyplinę przenoszę do web developmentu: jasne terminy, transparentna komunikacja i skupienie na tym, co naprawdę przynosi korzyść Twojej firmie.",
      },
    ],
    processHeading: "Nasz Proces",
    steps: [
      {
        num: "01",
        title: "Odkrywanie i Strategia",
        period: "Tygodnie 1-2",
        desc: "Przeprowadzamy wywiady, analizujemy Twoją branżę, konkurencję, użytkowników, definiujemy cele biznesowe.",
      },
      {
        num: "02",
        title: "Projektowanie",
        period: "Tygodnie 3-4",
        desc: "Tworzymy wireframe'y, mockupy i strategię wizualną. Wszystko zatwierdzone przez Ciebie zanim zaczynamy kod.",
      },
      {
        num: "03",
        title: "Rozwój",
        period: "Tygodnie 5-8",
        desc: "Budujemy stronę z fokusem na wydajność, bezpieczeństwo, SEO i konwersję.",
      },
      {
        num: "04",
        title: "Testowanie i Optymalizacja",
        period: "Tydzień 9",
        desc: "Testy na wszystkich urządzeniach, przeglądarkach, analiza wydajności, bezpieczeństwa, SEO.",
      },
      {
        num: "05",
        title: "Uruchomienie i Wsparcie",
        period: "Na bieżąco",
        desc: "Wdrażamy stronę live. Pierwszych kilka tygodni mamy ścisły kontakt, potem przystępujemy do wsparcia.",
      },
    ],
    differentiatorHeading: "Co Nas Wyróżnia",
    differentiators: [
      {
        title: "Nie szablony.",
        desc: "Każdy projekt zaczynamy od zera, dostosowany do Twojej branży i celów.",
      },
      {
        title: "Fokus na wyniki biznesowe.",
        desc: "Mierzy się wszystko. Czy strona przyciąga użytkowników, konwertuje, wspiera sprzedaż.",
      },
      {
        title: "Wszystko należy do Ciebie.",
        desc: "Domena, hosting i treść zawsze są pod Twoją kontrolą. Bez uzależnienia od dostawcy.",
      },
      {
        title: "Długoterminowe partnerstwo.",
        desc: "Wspieramy Cię miesiące i lata po uruchomieniu. To nie projekt, to współpraca.",
      },
      {
        title: "Transparentna komunikacja.",
        desc: "Wiesz, co się robi, dlaczego i kiedy będzie gotowe. Brak ukrytych opłat, brak biurokratycznych sztuczek.",
      },
    ],
    comparisonHeading: "Jak Wypadamy na Tle Rynku",
    comparisonSub:
      "Uczciwe zestawienie dostępnych opcji, żebyś mógł podjąć właściwą decyzję dla swojego biznesu.",
    tableHeaders: [
      "Aspekt",
      "Szablon CMS",
      "Agencja bez specjalizacji",
      "Freelancer",
      "Forsa Design",
    ],
    tableRows: [
      ["Cena", "800-2 000 £", "3 000-8 000 £", "1 500-4 000 £", "1 200-12 000 £+"],
      ["Czas realizacji", "2-4 tygodnie", "6-12 tygodni", "4-8 tygodni", "8-12 tygodni"],
      [
        "Unikalność designu",
        "Szablonowy (jak konkurencja)",
        "Czasem template-based",
        "Zależy",
        "Unikalny, dostosowany",
      ],
      [
        "Szybkość strony",
        "Średnia (plugin-heavy)",
        "Dobra (jeśli czysty kod)",
        "Zależy",
        "Wysoka (optymalizacja w cenie)",
      ],
      ["SEO + Optymalizacja", "Podstawowa", "Średnia", "Zależy", "Zaawansowana (Schema, E-E-A-T)"],
      [
        "Wsparcie techniczne",
        "Wymaga wtyczek",
        "Opcjonalnie (extra opłata)",
        "Ograniczone",
        "Zawarte w pakiecie",
      ],
      [
        "Bezpieczeństwo (SSL, RODO, PCI)",
        "Zależy od pluginów",
        "Generalnie tak",
        "Zależy",
        "Tak, pełna dokumentacja",
      ],
      [
        "Integracje (CRM, ERP)",
        "Ekosystem pluginów",
        "Mogą zrobić",
        "Zależy",
        "Tak, custom development",
      ],
      ["Skalowanie", "Trudne (template lock-in)", "Możliwe", "Możliwe", "Proste (custom code)"],
      ["Przenośność", "Średnia", "Wysoka", "Wysoka", "Wysoka (pełna kontrola)"],
      ["Spójność marki", "Mała", "Średnia", "Zależy", "Wysoka (brand guidelines integrated)"],
    ],
    forsa: "Forsa Design",
    comparisonCta: "Zobacz pełne porównanie",
    comparisonHref: "/pl/comparison",
    contactCta: "Rozpocznij Projekt",
    contactHref: "#contact",
  },
};

export default function AboutPage({ lang }: AboutPageProps) {
  const { syncLanguage } = useLanguage();
  const c = content[lang];
  const homeHref = lang === "en" ? "/en/" : "/pl/";

  useEffect(() => {
    syncLanguage(lang);
  }, [lang, syncLanguage]);

  useSeoMeta({
    title: c.seoTitle,
    description: c.seoDesc,
    ogTitle: c.seoTitle,
    ogDescription: c.seoDesc,
    twitterTitle: c.seoTitle,
    twitterDescription: c.seoDesc,
    ogLocale: lang === "en" ? "en_US" : "pl_PL",
    canonical: buildHref(`/${lang}/about`),
    alternates: [
      { lang: "en", href: buildHref("/en/about") },
      { lang: "pl", href: buildHref("/pl/about") },
    ],
  });

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://forsadesign.co.uk/#organization",
          name: "Forsa Design",
          url: "https://forsadesign.co.uk",
          logo: {
            "@type": "ImageObject",
            url: "https://forsadesign.co.uk/logo-new.png?v=2",
          },
          email: "hello@forsadesign.co.uk",
          description:
            "Boutique web agency based in Banff, Scotland, specialising in private healthcare and B2B websites.",
          areaServed: "GB",
          knowsAbout: [
            "Web Design",
            "Web Development",
            "SEO",
            "Brand Strategy",
            "E-commerce",
            "Private Healthcare Websites",
            "B2B Websites",
          ],
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://forsadesign.co.uk/#localbusiness",
          name: "Forsa Design",
          url: "https://forsadesign.co.uk",
          email: "hello@forsadesign.co.uk",
          description:
            "Boutique web agency based in Banff, Scotland, specialising in private healthcare and B2B websites.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Banff",
            addressRegion: "Scotland",
            addressCountry: "GB",
          },
          areaServed: {
            "@type": "Country",
            name: "United Kingdom",
          },
          priceRange: "££",
          knowsAbout: [
            "Web Design",
            "Web Development",
            "SEO",
            "Brand Strategy",
            "E-commerce",
            "Private Healthcare Websites",
            "B2B Websites",
          ],
        },
      ],
    },
    "about-page",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      {/* Hero */}
      <section className="pt-36 pb-20 bg-card border-b border-border/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {c.heading}
            </h1>
            <p className="text-xl text-foreground/70 font-light leading-relaxed max-w-2xl text-justify">
              {c.intro}
            </p>
          </motion.div>
        </div>
      </section>
      {/* What We Do */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12">
            {c.whatWeDoHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border/20 rounded-md p-8"
              >
                <div className="w-8 h-1 bg-primary mb-6" />
                <h3 className="font-serif text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-foreground/70 font-light leading-relaxed text-justify">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Process */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12">
            {c.processHeading}
          </h2>
          <div className="space-y-6">
            {c.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-8 items-start border-b border-border/10 pb-6 last:border-0 last:pb-0"
              >
                <span className="font-serif text-4xl font-bold text-primary/30 leading-none shrink-0 w-14">
                  {step.num}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-lg font-bold text-white">{step.title}</h3>
                    <span className="text-xs text-primary/70 font-medium border border-primary/20 rounded px-2 py-0.5">
                      {step.period}
                    </span>
                  </div>
                  <p className="text-foreground/70 font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Differentiators */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-12">
            {c.differentiatorHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={20} />
                <div>
                  <span className="font-medium text-white">{d.title}</span>{" "}
                  <span className="text-foreground/70 font-light">{d.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Comparison Table */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            {c.comparisonHeading}
          </h2>
          <p className="text-foreground/60 font-light mb-12 max-w-2xl">{c.comparisonSub}</p>
          <div className="overflow-x-auto rounded-md border border-border/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/20">
                  {c.tableHeaders.map((h, i) => (
                    <th
                      key={i}
                      className={`px-4 py-4 text-left font-medium ${
                        i === c.tableHeaders.length - 1
                          ? "text-primary"
                          : i === 0
                            ? "text-foreground/80 w-40"
                            : "text-foreground/50"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.tableRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-border/10 last:border-0 hover:bg-background/30 transition-colors"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 ${
                          ci === 0
                            ? "font-medium text-foreground/80"
                            : ci === row.length - 1
                              ? "text-primary font-medium"
                              : "text-foreground/50"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-right">
            <a
              href={c.comparisonHref}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              {c.comparisonCta} →
            </a>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-background border-t border-border/10">
        <div className="container mx-auto px-6 text-center">
          <a
            href={homeHref + "#contact"}
            className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-4 rounded-sm hover:bg-primary/90 transition-colors"
          >
            {c.contactCta}
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
