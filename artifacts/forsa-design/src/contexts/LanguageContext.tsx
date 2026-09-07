import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

type Language = "en" | "pl";

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      process: "Process",
      about: "About",
      contact: "Contact",
      comparison: "Compare",
      quote: "Quote",
      pay: "Pay Invoice",
      pricing: "Pricing",
      aboutPage: "About Us",
      blog: "Blog",
      faq: "FAQ",
    },
    faq: {
      heading: "Common Questions",
      subheading: "Straight answers for industrial, engineering and procurement teams.",
      searchPlaceholder: "Search questions...",
      noResults: "No questions match your search.",
      comparisonCta: "See full comparison",
      comparisonHref: "/en/comparison",
      items: [
        {
          q: "Do you use WordPress or templates?",
          a: "No. Every site is hand-coded. WordPress is fine for blogs. It is not fine for a firm that wants to pass a procurement audit without explaining why their site needs seventeen plug-ins and a security patch every Tuesday.",
        },
        {
          q: "How long does a project take?",
          a: "Between four and eight weeks, depending on scope. Not because I work slowly. Because I do not start coding until I understand what your buyers need to see. That conversation takes time. The coding is the easy part.",
        },
        {
          q: "What if I do not have any photos?",
          a: "We work with what you have. A decent photo of your workshop taken on a phone is better than a stock image of a smiling engineer in a hard hat that you bought from a random website.",
        },
        {
          q: "Do you offer ongoing support?",
          a: "Yes. Monthly care plans start at £150. That includes hosting, security updates, backups and the occasional panic email at 10 pm because you need a phone number changed before a tender deadline.",
        },
        {
          q: "Can you integrate with our existing systems?",
          a: "If it has an API, probably yes. If it runs on a spreadsheet from 2003 and a prayer, we will figure something out. I have seen worse.",
        },
      ],
    },
    trustBar: {
      desktop: "PageSpeed desktop",
      mobile: "PageSpeed mobile",
      ssl: "SSL Labs",
      observatory: "Mozilla Observatory",
      co2: "CO\u2082 per visit",
      a11y: "Accessibility",
      lowEmission: "Low emission",
      explainer:
        "These results did not come from a template. AI generates the code, and I optimise it by hand for Core Web Vitals and accessibility. The outcome is the same as code written from scratch. The difference is time: the site is ready in weeks, not months.",
    },
    hero: {
      tagline: "Websites and Web Systems for Heavy Industry",
      subheader:
        "No templates. No Elementor-style page builders. Fast, secure websites that pass the purchasing review.",
      body: "You build infrastructure. I build the digital layer that proves you can deliver it. I have more than twenty years in international B2B industrial sales: machinery, engineering, energy, procurement. I know what happens when a buyer narrows the supplier list to three firms and checks their websites. Forsa Design builds dedicated websites and web systems for offshore operators, energy contractors, engineering firms, industrial equipment suppliers and heavy logistics operators. Based in Banff, Aberdeenshire. Serving Scotland, the UK and selected EU export markets.",
      cta: "Request a Technical Quote",
    },
    services: {
      heading: "What We Build",
      card1: {
        title: "Does your website speak to the specifier, or the designer?",
        desc: "Dedicated websites for engineering and manufacturing firms. Fast load times, mobile performance for site offices, and technical messaging aimed at the people who write specifications.\n\nI do not write code from scratch. I use AI to generate the structure and front end, then refine the logic, SEO and performance by hand. You pay for the result, not for hours spent typing. The site is ready sooner, while the visual and technical quality stays at the same level.",
      },
      card2: {
        title: "Does your B2B catalogue work like a tool, or like a brochure?",
        desc: "Catalogue and ordering systems for industrial components. Account pricing, bulk quotes, and integrations with ERP or stock systems. Built for procurement specialists, not casual visitors.\n\nAI helps me build the store framework and form logic in a fraction of the time. I configure the integrations, B2B account permissions and quote flow by hand. The result: delivery in 3-4 weeks instead of 3 months.",
      },
      card3: {
        title: "Does your dealer portal or spec generator need its own IT team?",
        desc: "Dealer portals, technical specification generators, multilingual quote engines and workflow integrations for export markets. Practical tools that fit your operation instead of forcing it into a new rhythm.\n\nAI speeds up building prototypes and backend logic. I refine the architecture, security and procurement compliance myself. As a result, prototype costs drop by 40-50%, and you get a system that works, not a promise on paper.",
      },
    },
    process: {
      heading: "How We Work",
      steps: [
        {
          title: "Discovery and Audit",
          desc: "We analyse your current site, competitors and where you lose credibility during the buyer's vetting process. We map decision-makers and the evidence they need to see.",
        },
        {
          title: "Technical Spec and Design",
          desc: "Clean architecture, hand-written code and no unnecessary plugins. Every page is built around a procurement checkpoint, with real proof of your facility, capabilities and work.",
        },
        {
          title: "Compliance, Testing and Launch",
          desc: "GDPR, accessibility, SSL and performance benchmarks. Tested on the devices your clients actually use, from phones offshore to older PCs in site cabins.",
        },
        {
          title: "Support and Evolution",
          desc: "Monthly care plans keep your site secure, up to date, and aligned with your contract pipeline. As your capabilities grow, your site grows with them.",
        },
      ],
    },
    about: {
      heading: "Who’s behind this",
      body: "I’m Miro. I founded Forsa Design after more than 20 years in international B2B sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I’ve sat on both sides of the procurement table. I know what the process looks like from the first email to the signed contract.",
      body2:
        "That experience taught me one thing. Most industrial companies do excellent work, but their websites do not keep up with the level of their services. And it costs them contracts. Not because the work is poor. In today’s B2B, your website is the first stage of verification.",
      body3:
        "I’m not a London agency with fifteen people on the team and a coffee bar in the office. I’m someone who understands industry, logistics and international trade. Now I build websites that speak your clients’ language. No templates. No unnecessary jargon. Just clean code and a clear message.",
      body4:
        "Based in Banff, Aberdeenshire. Fluent in English and Polish. Serving clients in Scotland, across the UK and in selected EU export markets.",
      highlightsTitle: "Why this experience matters",
      paragraphs: [
        "Real business perspective",
        "Having run a business for over 20 years, negotiated international contracts across three continents and managed teams in multiple countries, I understand what a website needs to do for your bottom line. Every design decision is filtered through a business lens, not just an aesthetic one.",
        "Communication at every level",
        "I’ve worked with clients and stakeholders from every walk of life. That translates into websites that communicate clearly with audiences, whether local clients or international partners.",
        "Delivering results",
        "My whole career has been built on closing deals, managing projects from A to Z and delivering measurable results. I bring that same discipline to web development: clear deadlines, transparent communication and a focus on what actually benefits your business.",
      ],
      processTitle: "How we work",
      processList: [
        "Discovery and strategy (weeks 1-2)",
        "We conduct interviews, analyse your industry, competition and users, and define business goals.",
        "Design (weeks 3-4)",
        "We create wireframes, mockups and a visual strategy. Everything is approved by you before we start coding.",
        "Development (weeks 5-8)",
        "We build the site with a focus on performance, security, SEO and conversion.",
        "Testing and optimisation (week 9)",
        "Testing across all devices and browsers. Performance, security and SEO analysis.",
        "Launch and support (ongoing)",
        "We deploy the site live. The first few weeks we keep in close contact, then move into ongoing support.",
      ],
      valuesTitle: "What sets us apart",
      values: [
        "No templates",
        "Every project starts from scratch, tailored to your industry and goals.",
        "Focus on business results",
        "We measure everything. Does the site attract users, convert, support sales?",
        "You own everything",
        "Domain, hosting and content are always under your control. No vendor lock-in.",
        "Long-term partnership",
        "We support you months and years after launch. This isn’t a project, it’s a partnership.",
        "Transparent communication",
        "You know what’s being done, why and when it will be ready. No hidden fees, no bureaucratic tricks.",
      ],
    },
    pricing: {
      heading: "What does it cost?",
      subheading: "Three starting points. Every project is tailored to your needs.",
    },
    cta: {
      heading: "Ready to stop apologising for your website?",
      body: "Clean code. Clear strategy. Websites that work as hard as you do on site.",
      button: "Let's Talk",
      contactHref: "/en/contact",
    },
    footer: {
      tagline: "Built for scale. Hardcoded for speed.",
      location: "Banff, Aberdeenshire, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Miro",
      emailLabel: "Email",
      phoneLabel: "Phone",
      linkedinLabel: "LinkedIn",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2026 Forsa Design. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      sitemap: "Site Map",
      cookiePreferences: "Cookie Preferences",
    },
    cookies: {
      bannerTitle: "We use cookies",
      bannerDesc:
        "We use essential cookies to keep the site running and optional cookies to understand how you use it. You can accept all, reject non-essential cookies, or customise your preferences.",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject Non-Essential",
      customise: "Customise",
      savePreferences: "Save Preferences",
      essential: "Essential",
      essentialDesc:
        "Required for the site to function (language preference, security). Cannot be disabled.",
      analytics: "Analytics",
      analyticsDesc:
        "Help us understand how visitors interact with the site (e.g. Google Analytics). No personally identifiable data is collected.",
      marketing: "Marketing",
      marketingDesc:
        "Used to show you relevant advertising on other platforms. Currently no marketing cookies are active.",
      alwaysOn: "Always on",
      managePreferences: "Manage your cookie preferences",
    },
  },
  pl: {
    nav: {
      home: "Strona Główna",
      services: "Usługi",
      process: "Proces",
      about: "O Nas",
      contact: "Kontakt",
      comparison: "Porównanie",
      quote: "Wycena",
      pay: "Zapłać fakturę",
      pricing: "Ceny",
      aboutPage: "O Nas",
      blog: "Blog",
      faq: "FAQ",
    },
    faq: {
      heading: "Najczęstsze pytania",
      subheading: "Proste odpowiedzi dla firm przemysłowych, inżynieryjnych i zespołów zakupowych.",
      searchPlaceholder: "Szukaj pytań...",
      noResults: "Brak pytań pasujących do wyszukiwania.",
      comparisonCta: "Zobacz pełne porównanie",
      comparisonHref: "/pl/comparison",
      items: [
        {
          q: "Czy używacie WordPressa lub szablonów?",
          a: "Nie. Każda strona pisana jest ręcznie. WordPress sprawdza się przy blogach. Nie sprawdza się przy firmie, która chce przejść audyt zakupowy bez tłumaczenia, dlaczego jej strona potrzebuje siedemnastu wtyczek i łatki bezpieczeństwa w każdy wtorek.",
        },
        {
          q: "Ile trwa projekt?",
          a: "Od czterech do ośmiu tygodni, w zależności od zakresu. Nie dlatego, że pracuję wolno. Dlatego że nie zaczynam kodować, dopóki nie zrozumiem, co Twoi kupcy muszą zobaczyć. Ta rozmowa zajmuje czas. Kodowanie to najłatwiejsza część.",
        },
        {
          q: "A jeśli nie mam żadnych zdjęć?",
          a: "Pracujemy z tym, co masz. Przeciętne zdjęcie Twojego warsztatu zrobione telefonem jest lepsze niż stockowe zdjęcie uśmiechniętego inżyniera w kasku, które kupiłeś na randomowej stronie.",
        },
        {
          q: "Czy oferujecie wsparcie po wdrożeniu?",
          a: "Tak. Opieka miesięczna zaczyna się od 150 funtów. Obejmuje hosting, aktualizacje bezpieczeństwa, kopie zapasowe i ten sporadyczny mail o dziesiątej wieczorem, bo musisz zmienić numer telefonu przed terminem składania ofert.",
        },
        {
          q: "Czy możecie zintegrować stronę z naszymi istniejącymi systemami?",
          a: "Jeśli ma API, prawdopodobnie tak. Jeśli działa na arkuszu kalkulacyjnym z 2003 roku i modlitwie, coś wymyślimy. Widziałem gorsze rzeczy.",
        },
      ],
    },
    trustBar: {
      desktop: "PageSpeed desktop",
      mobile: "PageSpeed mobile",
      ssl: "SSL Labs",
      observatory: "Mozilla Observatory",
      co2: "CO\u2082 na wizyt\u0119",
      a11y: "Dost\u0119pno\u015b\u0107",
      lowEmission: "Niskie emisje",
      explainer:
        "Te wyniki nie wzięły się z szablonu. AI generuje kod, ja go optymalizuję ręcznie pod Core Web Vitals i dostępność. Efekt jest taki sam jak przy kodzie pisanym od zera. Różnica jest w czasie: strona gotowa w tygodnie, a nie w miesiące.",
    },
    hero: {
      tagline: "Strony i systemy webowe dla przemysłu ciężkiego",
      subheader:
        "Bez szablonów. Bez kreatorów typu Elementor. Szybkie, bezpieczne witryny, które przechodzą kontrolę zakupową.",
      body: "Budujesz infrastrukturę. Ja buduję warstwę cyfrową, która pokazuje, że potrafisz to dostarczyć. Mam ponad dwadzieścia lat w międzynarodowym B2B sprzedaży przemysłowej: maszyny, inżynieria, energetyka, procurement. Wiem, co się dzieje, gdy kupujący skraca listę dostawców do trzech firm i wchodzi na ich strony. Forsa Design buduje dedykowane witryny i systemy webowe dla offshore, kontrahentów energetycznych, firm inżynierskich, dostawców sprzętu przemysłowego i operatorów logistyki ciężkiej. Siedziba w Banff, Aberdeenshire. Obsługuję Szkocję, Wielką Brytanię i wybrane rynki eksportowe UE.",
      cta: "Popro\u015b o wycen\u0119 techniczn\u0105",
    },
    services: {
      heading: "Co budujemy",
      card1: {
        title: "Czy twoja strona mówi do specyfikanta, czy do grafika?",
        desc: "Dedykowane witryny dla firm inżynierskich i produkcyjnych. Szybkie ładowanie, wydajność mobilna dla biur terenowych, przekaz techniczny skierowany do osób piszących specyfikacje.\n\nNie piszę kodu od zera. Używam AI do generowania struktury i frontendu, a potem ręcznie poprawiam logikę, SEO i wydajność. Płacisz za efekt, nie za godziny spędzone nad klawiaturą. Strona jest gotowa szybciej, a jakość wizualna i techniczna pozostaje na tym samym poziomie.",
      },
      card2: {
        title: "Czy twój katalog B2B działa jak narzędzie, czy jak broszura?",
        desc: "Systemy katalogowe i zamówieniowe dla komponentów przemysłowych. Ceny kontaktowe, wyceny hurtowe, integracje z ERP lub systemami magazynowymi. Zbudowane dla specjalistów od zakupów, nie dla przypadkowych odwiedzających.\n\nAI pomaga mi zbudować szkielet sklepu i logikę formularzy w ułamku czasu. Ręcznie konfiguruję integracje, uprawnienia kont B2B i przepływ wycen. Rezultat: wdrożenie w 3-4 tygodnie zamiast 3 miesięcy.",
      },
      card3: {
        title: "Czy twój portal dealerów lub generator specyfikacji wymaga zespołu IT?",
        desc: "Portale dealerskie, generatory specyfikacji technicznej, wielojęzyczne silniki wycenowe i integracje workflow dla rynków eksportowych. Praktyczne narzędzia dopasowane do twojej operacji, a nie narzucające jej nowy rytm.\n\nAI przyspiesza budowę prototypów i logiki backendu. Sam dopracowuję architekturę, bezpieczeństwo i zgodność z wymaganiami procurementu. Dzięki temu koszt prototypu spada o 40-50%, a ty dostajesz system, który działa, a nie obietnicę na papierze.",
      },
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        {
          title: "Analiza i audyt",
          desc: "Analizujemy Twoją obecną stronę, konkurencję i momenty, w których tracisz wiarygodność podczas weryfikacji przez kupującego. Mapujemy decydentów i dowody, które muszą zobaczyć.",
        },
        {
          title: "Specyfikacja techniczna i projekt",
          desc: "Czysta architektura, kod pisany ręcznie, bez zbędnych wtyczek. Każda strona budowana jest wokół punktu kontrolnego zakupowego z realnymi dowodami na Twoje zaplecze, możliwości i prace.",
        },
        {
          title: "Zgodność, testy i uruchomienie",
          desc: "GDPR, dostępność, SSL i benchmarki wydajności. Testowane na urządzeniach, których faktycznie używają Twoi klienci, od telefonów na offshore po starsze komputery w kontenerach biurowych.",
        },
        {
          title: "Wsparcie i rozw\u00f3j",
          desc: "Miesięczne plany opieki utrzymują stronę bezpieczną, zaktualizowaną i dopasowaną do Twojego pipeline'u kontraktowego. Wraz z rozwojem Twoich możliwości strona rozwija się razem z nimi.",
        },
      ],
    },
    about: {
      heading: "Zbudowane przez kogo\u015b, kto rozumia\u0142 brief",
      body: "Nazywam si\u0119 Miro. Forsa Design za\u0142o\u017cy\u0142em po ponad 20 latach w mi\u0119dzynarodowej sprzeda\u017cy B2B. Handlowa\u0142em maszynami do obr\u00f3bki metalu, wyposa\u017ceniem przemys\u0142owym i rozwi\u0105zaniami in\u017cynieryjnymi w Europie i Azji. Siedzia\u0142em po obu stronach sto\u0142u zakupowego. Wiem, jak wygl\u0105da proces od pierwszego maila po podpisany kontrakt.",
      body2:
        "To do\u015bwiadczenie nauczy\u0142o mnie jednej rzeczy. Wi\u0119kszo\u015b\u0107 firm przemys\u0142owych wykonuje \u015bwietn\u0105 robot\u0119, ale ich strony internetowe nie nad\u0105\u017caj\u0105 za poziomem ich us\u0142ug. I to kosztuje kontrakty. Nie dlatego, \u017ce praca jest s\u0142aba, tylko dlatego, \u017ce w dzisiejszym B2B strona to pierwszy etap weryfikacji. Nie jestem agencj\u0105 z Londynu z pi\u0119tnastoma osobami w zespole i kawiarni\u0105 w biurze. Jestem cz\u0142owiekiem, kt\u00f3ry rozumie przemys\u0142, logistyk\u0119 i handel mi\u0119dzynarodowy. Teraz buduj\u0119 strony, kt\u00f3re komunikuj\u0105 si\u0119 j\u0119zykiem Twoich klient\u00f3w. Bez szablon\u00f3w. Bez zb\u0119dnego \u017cargonu. Tylko czysty kod i jasny przekaz.",
      body3:
        "Siedziba w Banff, Aberdeenshire. Biegły w językach angielskim i polskim. Obsługujemy klientów w Szkocji, w całej Wielkiej Brytanii oraz na wybranych rynkach eksportowych UE.",
    },
    pricing: {
      heading: "Ile to kosztuje?",
      subheading: "Trzy punkty startowe. Ka\u017cdy projekt jest dopasowany do twoich potrzeb.",
    },
    cta: {
      heading: "Gotowy przesta\u0107 si\u0119 wstydzi\u0107 swojej strony?",
      body: "Czysty kod. Jasna strategia. Witryny, kt\u00f3re pracuj\u0105 tak ci\u0119\u017cko jak ty na budowie.",
      button: "Porozmawiajmy",
      contactHref: "/pl/contact",
    },
    footer: {
      tagline: "Stworzone z my\u015bl\u0105 o skali. Napisane dla szybko\u015bci.",
      location: "Banff, Aberdeenshire, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      emailLabel: "Email",
      phoneLabel: "Telefon",
      linkedinLabel: "LinkedIn",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2026 Forsa Design. Wszystkie prawa zastrze\u017cone.",
      terms: "Regulamin i Warunki",
      privacy: "Polityka Prywatno\u015bci",
      sitemap: "Mapa Strony",
      cookiePreferences: "Ustawienia Cookies",
    },
    cookies: {
      bannerTitle: "U\u017cywamy plik\u00f3w cookie",
      bannerDesc:
        "U\u017cywamy niezb\u0119dnych plik\u00f3w cookie, aby strona dzia\u0142a\u0142a prawid\u0142owo, oraz opcjonalnych, aby lepiej rozumie\u0107 spos\u00f3b korzystania z witryny. Mo\u017cesz zaakceptowa\u0107 wszystkie, odrzuci\u0107 niezb\u0119dne lub dostosowa\u0107 swoje preferencje.",
      acceptAll: "Akceptuj Wszystkie",
      rejectNonEssential: "Odrzu\u0107 Niezb\u0119dne",
      customise: "Dostosuj",
      savePreferences: "Zapisz Preferencje",
      essential: "Niezb\u0119dne",
      essentialDesc:
        "Wymagane do prawid\u0142owego dzia\u0142ania strony (preferencje j\u0119zykowe, bezpiecze\u0144stwo). Nie mo\u017cna wy\u0142\u0105czy\u0107.",
      analytics: "Analityczne",
      analyticsDesc:
        "Pomagaj\u0105 nam zrozumie\u0107, jak odwiedzaj\u0105cy korzystaj\u0105 ze strony (np. Google Analytics). \u017badne dane osobowe nie s\u0105 zbierane.",
      marketing: "Marketingowe",
      marketingDesc:
        "U\u017cywane do wy\u015bwietlania reklam na innych platformach. Aktualnie \u017cadne pliki cookie marketingowe nie s\u0105 aktywne.",
      alwaysOn: "Zawsze w\u0142\u0105czone",
      managePreferences: "Zarz\u0105dzaj preferencjami cookie",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  syncLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [_, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("forsa-lang");
    return saved === "en" || saved === "pl" ? saved : "en";
  });

  const syncLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("forsa-lang", lang);
  };

  const setLanguage = (lang: Language) => {
    syncLanguage(lang);
    setLocation(`/${lang}/`);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: unknown = translations[language];
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return result as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, syncLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
