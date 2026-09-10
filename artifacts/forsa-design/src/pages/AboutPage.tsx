import { useEffect } from "react";
import Scene3D from "@/components/Scene3D";
import PlasmaBlob from "@/components/PlasmaBlob";
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
  contactCta: string;
};

const shared = {
  background: {
    en: [
      [
        "Industrial B2B experience",
        "More than 20 years in international B2B sales means I approach a website as a commercial tool, not only as a visual project. I understand industrial products, technical sales, international trade and procurement.",
      ],
      [
        "Understanding the buying process",
        "I understand the questions buyers ask, the information they look for and the credibility signals that matter when a supplier is being evaluated.",
      ],
      [
        "Direct responsibility",
        "Forsa Design is a one-person business. There is no account-management layer between you and the person doing the work. I handle the project directly from specification through launch.",
      ],
    ],
    pl: [
      [
        "Doświadczenie w przemysłowym B2B",
        "Ponad 20 lat w międzynarodowej sprzedaży B2B sprawia, że traktuję stronę jako narzędzie biznesowe, a nie wyłącznie projekt wizualny. Rozumiem produkty przemysłowe, sprzedaż techniczną, handel międzynarodowy i procesy zakupowe.",
      ],
      [
        "Znajomość procesu zakupowego",
        "Rozumiem pytania zadawane przez kupujących, informacje, których szukają, oraz elementy budujące wiarygodność podczas oceny potencjalnego dostawcy.",
      ],
      [
        "Bezpośrednia odpowiedzialność",
        "Forsa Design jest jednoosobową firmą. Nie ma pośrednika pomiędzy Tobą a osobą wykonującą pracę. Prowadzę projekt bezpośrednio od specyfikacji do uruchomienia.",
      ],
    ],
  },
  process: {
    en: [
      [
        "Discovery and strategy — weeks 1–2",
        "I review your business, customers, competitors, existing website and project requirements and define the objectives and structure.",
      ],
      [
        "Design — weeks 3–4",
        "I develop the page structure, visual direction and user experience before moving into the main development stage.",
      ],
      [
        "Development — weeks 5–8",
        "I build and configure the website, content structure and required functionality, with attention to performance, security, accessibility and SEO.",
      ],
      [
        "Testing and optimisation — week 9",
        "I test the website across relevant devices and browsers and review performance, accessibility, security configuration and SEO fundamentals.",
      ],
      [
        "Launch and optional support",
        "I deploy the completed website. Ongoing maintenance and support are available separately if required.",
      ],
    ],
    pl: [
      [
        "Analiza i strategia — tygodnie 1–2",
        "Analizuję firmę, klientów, konkurencję, obecną stronę oraz wymagania projektu i określam jego cele oraz strukturę.",
      ],
      [
        "Projekt — tygodnie 3–4",
        "Opracowuję strukturę stron, kierunek wizualny i sposób korzystania z witryny przed rozpoczęciem głównego etapu developmentu.",
      ],
      [
        "Development — tygodnie 5–8",
        "Buduję i konfiguruję stronę, strukturę treści oraz wymagane funkcje, zwracając uwagę na wydajność, bezpieczeństwo, dostępność i SEO.",
      ],
      [
        "Testy i optymalizacja — tydzień 9",
        "Testuję stronę na odpowiednich urządzeniach i przeglądarkach oraz sprawdzam wydajność, dostępność, konfigurację bezpieczeństwa i podstawy SEO.",
      ],
      [
        "Uruchomienie i opcjonalne wsparcie",
        "Uruchamiam gotową stronę. Dalsze utrzymanie i wsparcie są dostępne oddzielnie, jeśli są potrzebne.",
      ],
    ],
  },
  different: {
    en: [
      [
        "No off-the-shelf templates",
        "I build custom implementations without WordPress, Elementor-style page builders or ready-made website templates.",
      ],
      [
        "Business before decoration",
        "The structure and content should help visitors understand what your company does, what it can deliver and how to take the next step.",
      ],
      [
        "No deliberate vendor lock-in",
        "I do not deliberately build systems that make a client dependent on me. The technical setup and access arrangements are agreed for each project.",
      ],
      [
        "Optional ongoing support",
        "Support after launch is available as a separate paid service. You are not required to purchase an ongoing maintenance contract.",
      ],
      [
        "Direct communication",
        "You communicate directly with the person designing and building the project. Scope, costs and responsibilities are agreed before the work begins.",
      ],
    ],
    pl: [
      [
        "Bez gotowych szablonów",
        "Buduję dedykowane rozwiązania bez WordPressa, kreatorów typu Elementor i gotowych szablonów stron.",
      ],
      [
        "Biznes przed dekoracją",
        "Struktura i treść strony powinny pomagać odbiorcy zrozumieć, czym zajmuje się firma, co potrafi dostarczyć i jaki powinien być kolejny krok.",
      ],
      [
        "Bez celowego vendor lock-in",
        "Nie buduję celowo rozwiązań uzależniających klienta ode mnie. Sposób konfiguracji technicznej i zasady dostępu ustalam indywidualnie dla każdego projektu.",
      ],
      [
        "Opcjonalne wsparcie",
        "Wsparcie po uruchomieniu jest dostępne jako oddzielna płatna usługa. Nie wymagam podpisania stałej umowy serwisowej.",
      ],
      [
        "Bezpośrednia komunikacja",
        "Rozmawiasz bezpośrednio z osobą projektującą i budującą rozwiązanie. Zakres, koszty i odpowiedzialność ustalam przed rozpoczęciem prac.",
      ],
    ],
  },
};

const content: Record<"en" | "pl", AboutContent> = {
  en: {
    seoTitle: "About Forsa Design | Industrial Web Development in Aberdeenshire",
    seoDesc:
      "Forsa Design builds custom websites and web systems for industrial, engineering and technical B2B companies. One-person business based in Banff, Aberdeenshire.",
    heading: "Who’s Behind Forsa Design?",
    intro: [
      "I’m Miro. I founded Forsa Design after more than 20 years in international B2B sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I ran businesses in two countries, negotiated international contracts across three continents and managed teams in different countries.",
      "That experience gave me a practical understanding of industrial sales and procurement. I know the process from initial contact and technical discussions through negotiation to the signed contract. I understand what buyers, engineers and decision-makers look for when they assess a potential supplier.",
      "Forsa Design is a one-person business. You deal directly with me from the first conversation through development and launch. I use modern development tools including VS Code, GitHub, Cloudflare and AI-assisted development tools, but I remain responsible for the architecture, configuration, testing and final result.",
      "I am based in Banff, Aberdeenshire. I am fluent in English and Polish and have some knowledge of Russian and Ukrainian. I can work with clients in the UK and internationally.",
    ],
    backgroundHeading: "Why My Background Matters",
    background: shared.background.en as Pair[],
    processHeading: "Typical Website Project",
    process: shared.process.en as Pair[],
    differentHeading: "How I Work",
    different: shared.different.en as Pair[],
    contactCta: "Request a Quote",
  },
  pl: {
    seoTitle: "O Forsa Design | Strony i systemy webowe dla przemysłu",
    seoDesc:
      "Forsa Design buduje dedykowane strony i systemy webowe dla firm przemysłowych, inżynieryjnych i technicznych. Jednoosobowa firma z siedzibą w Banff, Aberdeenshire.",
    heading: "Kto stoi za Forsa Design?",
    intro: [
      "Nazywam się Miro. Założyłem Forsa Design po ponad 20 latach pracy w międzynarodowej sprzedaży B2B. Handlowałem maszynami do obróbki metalu, wyposażeniem przemysłowym i rozwiązaniami inżynieryjnymi w Europie i Azji. Prowadziłem firmy w dwóch krajach, negocjowałem międzynarodowe kontrakty na trzech kontynentach i zarządzałem zespołami w różnych krajach.",
      "To doświadczenie dało mi praktyczną znajomość sprzedaży przemysłowej i procesów zakupowych. Znam ten proces od pierwszego kontaktu i rozmów technicznych, przez negocjacje, aż po podpisanie kontraktu. Rozumiem, na co zwracają uwagę kupcy, inżynierowie i osoby podejmujące decyzje, oceniając potencjalnego dostawcę.",
      "Forsa Design jest jednoosobową firmą. Od pierwszej rozmowy, przez development, aż po uruchomienie projektu współpracujesz bezpośrednio ze mną. Korzystam z nowoczesnych narzędzi, takich jak VS Code, GitHub, Cloudflare, oraz narzędzi wspomaganych przez AI, ale to ja odpowiadam za architekturę, konfigurację, testy i końcowy rezultat.",
      "Działam z Banff w Aberdeenshire. Biegle mówię po polsku i angielsku, a także w pewnym stopniu posługuję się rosyjskim i ukraińskim. Mogę współpracować z klientami z Wielkiej Brytanii oraz z zagranicy.",
    ],
    backgroundHeading: "Dlaczego moje doświadczenie ma znaczenie",
    background: shared.background.pl as Pair[],
    processHeading: "Typowy projekt strony internetowej",
    process: shared.process.pl as Pair[],
    differentHeading: "Jak pracuję",
    different: shared.different.pl as Pair[],
    contactCta: "Poproś o wycenę",
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
          <PlasmaBlob className="about-image relative h-[260px] overflow-hidden md:h-[560px]">
            <Scene3D />
          </PlasmaBlob>
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
