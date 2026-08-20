import { useEffect } from "react";
import Scene3D from "@/components/Scene3D";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AboutPageProps {
  lang: "en" | "pl";
}
type Pair = [string, string];
type AboutContent = {
  seoTitle: string;
  seoDesc: string;
  heading: string;
  intro: string[];
  backgroundHeading: string;
  background: Pair[];
  processHeading: string;
  process: Pair[];
  differentHeading: string;
  different: Pair[];
  comparison: string[][];
  comparisonHref: string;
  comparisonCta: string;
  contactCta: string;
};

const shared = {
  background: {
    en: [
      [
        "Real business perspective",
        "Having run a company for more than 20 years, negotiated international contracts across three continents and managed teams in multiple countries, I understand what a website needs to do for your bottom line. Every design decision is filtered through a business lens, not just an aesthetic one.",
      ],
      [
        "Communication at every level",
        "I have worked with clients and stakeholders from all walks of life. That translates into websites that speak clearly to your audience, whether they are local customers or international partners.",
      ],
      [
        "Results-focused delivery",
        "My career has been built on closing deals, managing projects end to end and delivering measurable outcomes. I bring that same discipline to web development: clear timelines, transparent communication and a focus on what actually moves the needle for your business.",
      ],
    ],
    pl: [
      [
        "Prawdziwa perspektywa biznesowa",
        "Prowadząc firmę przez ponad 20 lat, negocjując międzynarodowe kontrakty na trzech kontynentach i zarządzając zespołami w wielu krajach, rozumiem, co strona internetowa musi robić dla Twojego zysku. Każda decyzja projektowa jest filtrowana przez pryzmat biznesowy, nie tylko estetyczny.",
      ],
      [
        "Komunikacja na każdym poziomie",
        "Pracowałem z klientami i interesariuszami z każdej dziedziny życia. To przekłada się na strony, które jasno komunikują się z odbiorcami, czy to lokalnymi klientami, czy międzynarodowymi partnerami.",
      ],
      [
        "Dostarczanie wyników",
        "Cała moja kariera opierała się na zawieraniu umów, zarządzaniu projektami od A do Z i dostarczaniu mierzalnych rezultatów. Tę samą dyscyplinę przenoszę do web developmentu: jasne terminy, transparentna komunikacja i skupienie na tym, co naprawdę przynosi korzyść Twojej firmie.",
      ],
    ],
  },
  process: {
    en: [
      [
        "1. Discovery and strategy (weeks 1-2)",
        "We conduct interviews, analyse your industry, competition and users, and define business goals.",
      ],
      [
        "2. Design (weeks 3-4)",
        "We create wireframes, mockups and a visual strategy. Everything is approved by you before we write a line of code.",
      ],
      [
        "3. Development (weeks 5-8)",
        "We build the site with a focus on performance, security, SEO and conversion.",
      ],
      [
        "4. Testing and optimisation (week 9)",
        "Tests across all devices and browsers. Performance analysis, security and SEO.",
      ],
      [
        "5. Launch and support (ongoing)",
        "We deploy the site live. The first few weeks we are in close contact, then we transition to ongoing support.",
      ],
    ],
    pl: [
      [
        "1. Analiza i strategia (tygodnie 1-2)",
        "Przeprowadzamy wywiady, analizujemy Twoją branżę, konkurencję, użytkowników, definiujemy cele biznesowe.",
      ],
      [
        "2. Projektowanie (tygodnie 3-4)",
        "Tworzymy wireframe'y, mockupy i strategię wizualną. Wszystko zatwierdzone przez Ciebie, zanim zaczniemy kodować.",
      ],
      [
        "3. Rozwój (tygodnie 5-8)",
        "Budujemy stronę z naciskiem na wydajność, bezpieczeństwo, SEO i konwersję.",
      ],
      [
        "4. Testowanie i optymalizacja (tydzień 9)",
        "Testy na wszystkich urządzeniach i przeglądarkach, analiza wydajności, bezpieczeństwa, SEO.",
      ],
      [
        "5. Uruchomienie i wsparcie (na bieżąco)",
        "Wdrażamy stronę live. Pierwszych kilka tygodni mamy ścisły kontakt, potem przystępujemy do wsparcia.",
      ],
    ],
  },
  different: {
    en: [
      ["No templates", "Every project starts from scratch, tailored to your industry and goals."],
      [
        "Focus on business results",
        "We measure everything. Does the site attract users, convert and support sales?",
      ],
      [
        "You own everything",
        "Your domain, hosting and content are always under your control. No lock-in, no dependency on a single provider.",
      ],
      [
        "Long-term partnership",
        "We support you months and years after launch. This is not a project, it is a collaboration.",
      ],
      [
        "Transparent communication",
        "You know what is being done, why and when it will be ready. No hidden fees, no bureaucratic tricks.",
      ],
    ],
    pl: [
      ["Bez szablonów", "Każdy projekt zaczynamy od zera, dostosowany do Twojej branży i celów."],
      [
        "Fokus na wyniki biznesowe",
        "Mierzymy wszystko. Czy strona przyciąga użytkowników, konwertuje, wspiera sprzedaż?",
      ],
      [
        "Wszystko należy do Ciebie",
        "Domena, hosting i treść zawsze są pod Twoją kontrolą. Bez uzależnienia od dostawcy.",
      ],
      [
        "Długoterminowe partnerstwo",
        "Wspieramy Cię miesiące i lata po uruchomieniu. To nie projekt, to współpraca.",
      ],
      [
        "Transparentna komunikacja",
        "Wiesz, co się robi, dlaczego i kiedy będzie gotowe. Brak ukrytych opłat, brak biurokratycznych sztuczek.",
      ],
    ],
  },
};

const comparison = [
  ["Aspect", "CMS template", "Non-specialist agency", "Freelancer", "Forsa Design"],
  ["Price", "£800-2,000", "£3,000-8,000", "£1,500-4,000", "£1,200-12,000+"],
  ["Turnaround", "2-4 weeks", "6-12 weeks", "4-8 weeks", "8-12 weeks"],
  [
    "Design uniqueness",
    "Looks like competition",
    "Sometimes template-based",
    "Varies",
    "Unique, tailored",
  ],
  ["Site speed", "Average (plugin-heavy)", "Good (if clean code)", "Varies", "High (optimised)"],
  ["SEO and optimisation", "Basic", "Average", "Varies", "Advanced (Schema, E-E-A-T)"],
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
];

const content: Record<"en" | "pl", AboutContent> = {
  en: {
    seoTitle: "About Miro: Industrial Web Developer | Forsa Design",
    seoDesc:
      "Miro, founder of Forsa Design. 20+ years in B2B industrial sales, now building procurement-ready websites for industrial firms in Scotland.",
    heading: "Who's Behind This",
    intro: [
      "My name is Miro. I founded Forsa Design after more than 20 years in international B2B sales. I traded in metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I sat on both sides of the procurement table. I know what the process looks like from the first email to the signed contract.",
      "That experience taught me one thing: most industrial firms do excellent work, but their websites do not keep up with the quality of their service. And that costs contracts. Not because the work is poor \u2014 in today's B2B, the website is the first stage of verification.",
      "I am not a London agency with fifteen people on the team and a coffee machine in the office. I am someone who understands industry, logistics and international trade. I now build websites that speak your customers' language. No templates. No unnecessary jargon. Just clean code and a clear message.",
      "Based in Banff, Aberdeenshire. Fluent in English and Polish. Serving clients in Scotland, across the UK and in selected EU export markets.",
    ],
    backgroundHeading: "Why this background matters",
    background: shared.background.en as Pair[],
    processHeading: "How we work",
    process: shared.process.en as Pair[],
    differentHeading: "What sets us apart",
    different: shared.different.en as Pair[],
    comparison,
    comparisonHref: "/en/comparison/",
    comparisonCta: "See full comparison",
    contactCta: "Start a Project",
  },
  pl: {
    seoTitle: "O Forsa Design | Web dla Przemysłu",
    seoDesc:
      "Poznaj założyciela Forsa Design z 20-letnim doświadczeniem w sprzedaży B2B i tworzeniu stron dla przemysłu.",
    heading: "Kto za tym stoi",
    intro: [
      "Nazywam się Miro. Forsa Design założyłem po ponad 20 latach w międzynarodowej sprzedaży B2B. Handlowałem maszynami do obróbki metalu, wyposażeniem przemysłowym i rozwiązaniami inżynieryjnymi w Europie i Azji. Siedziałem po obu stronach stołu zakupowego. Wiem, jak wygląda proces od pierwszego maila po podpisany kontrakt.",
      "To doświadczenie nauczyło mnie jednej rzeczy. Większość firm przemysłowych wykonuje świetną robotę, ale ich strony internetowe nie nadążają za poziomem ich usług. I to kosztuje kontrakty. Nie dlatego, że praca jest słaba. W dzisiejszym B2B strona to pierwszy etap weryfikacji.",
      "Nie jestem agencją z Londynu z piętnastoma osobami w zespole i kawiarnią w biurze. Jestem człowiekiem, który rozumie przemysł, logistykę i handel międzynarodowy. Teraz buduję strony, które komunikują się językiem Twoich klientów. Bez szablonów. Bez zbędnego żargonu. Tylko czysty kod i jasny przekaz.",
      "Siedziba w Banff, Aberdeenshire. Pracuję po angielsku i polsku. Obsługuję klientów w Szkocji, w całej Wielkiej Brytanii oraz na wybranych rynkach eksportowych UE.",
    ],
    backgroundHeading: "Dlaczego to doświadczenie ma znaczenie",
    background: shared.background.pl as Pair[],
    processHeading: "Jak pracujemy",
    process: shared.process.pl as Pair[],
    differentHeading: "Co nas wyróżnia",
    different: shared.different.pl as Pair[],
    comparison: [],
    comparisonHref: "",
    comparisonCta: "",
    contactCta: "Rozpocznij projekt",
  },
};

export default function AboutPage({ lang }: AboutPageProps) {
  const { syncLanguage } = useLanguage();
  const c = content[lang];
  const homeHref = lang === "en" ? "/en/" : "/pl/";
  const aboutPath = lang === "en" ? "/en/about" : "/pl/o-nas";
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: c.seoTitle,
    description: c.seoDesc,
    ogTitle: c.seoTitle,
    ogDescription: c.seoDesc,
    twitterTitle: c.seoTitle,
    twitterDescription: c.seoDesc,
    ogLocale: lang === "en" ? "en_GB" : "pl_PL",
    canonical: buildHref(aboutPath),
    alternates: [
      { lang: "en", href: buildHref("/en/about") },
      { lang: "pl", href: buildHref("/pl/o-nas") },
    ],
  });
  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: c.heading,
      url: `https://forsadesign.co.uk${aboutPath}`,
      inLanguage: lang === "en" ? "en-GB" : "pl-PL",
      about: { "@type": "Organization", name: "Forsa Design" },
    },
    "about-page",
  );
  const sectionClass = "py-20 md:py-24 bg-background";
  const headingClass = "font-serif text-3xl md:text-4xl font-bold text-white mb-10";
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content" className="pt-28">
        <section className="about-hero container mx-auto max-w-6xl px-6 py-12 md:py-20">
          <div
            className="about-image relative h-[440px] overflow-hidden rounded-md border border-border/20 md:h-[560px]"
            style={{
              maskImage: "radial-gradient(ellipse 70% 75% at 50% 50%, black 50%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 75% at 50% 50%, black 50%, transparent 100%)",
            }}
          >
            <Scene3D />
          </div>
          <div className="about-intro">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {c.heading}
            </h1>
            {c.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className={`${sectionClass} about-background`}>
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className={headingClass}>{c.backgroundHeading}</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {c.background.map(([title, description]) => (
                <article key={title}>
                  <h3 className="font-serif text-xl font-bold text-white mb-4">{title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${sectionClass} about-process bg-card`}>
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className={headingClass}>{c.processHeading}</h2>
            <div className="space-y-6">
              {c.process.map(([title, description]) => (
                <article key={title} className="border-b border-border/10 pb-6 last:border-0">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${sectionClass} about-different`}>
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className={headingClass}>{c.differentHeading}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {c.different.map(([title, description]) => (
                <article key={title}>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        {lang === "en" && (
          <section className={`${sectionClass} about-comparison bg-card`}>
            <div className="container mx-auto max-w-6xl px-6">
              <h2 className={headingClass}>How we compare</h2>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {c.comparison[0].map((cell) => (
                        <th key={cell}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.comparison.slice(1).map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-right">
                <a className="text-primary font-medium hover:underline" href={c.comparisonHref}>
                  {c.comparisonCta} →
                </a>
              </p>
            </div>
          </section>
        )}
        <section className="py-20 bg-background border-t border-border/10 text-center">
          <a
            href={`${homeHref}#contact`}
            className="inline-flex bg-primary text-background font-semibold px-8 py-4 rounded-sm hover:bg-primary/90 transition-colors"
          >
            {c.contactCta}
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
