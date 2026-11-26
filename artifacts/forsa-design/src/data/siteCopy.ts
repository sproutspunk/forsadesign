import { aboutContent } from "./about";
import { processCopy } from "./process";
import { getFaqItems } from "./faq";
export const siteCopy = {
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
      items: getFaqItems("en"),
    },
    trustBar: {
      desktop: "PageSpeed desktop",
      mobile: "PageSpeed mobile",
      ssl: "SSL Labs",
      observatory: "Mozilla Observatory",
      co2: "CO₂ per visit",
      a11y: "Accessibility",
      lowEmission: "Low emission",
      explainer:
        "We use AI-assisted development tools to accelerate appropriate parts of the build, then review, configure and optimise the implementation ourselves. Performance, accessibility, security and SEO are tested as part of the development process.",
    },
    hero: {
      tagline: "Industrial Digital Solutions & 3D Engineering",
      subheader:
        "Bespoke digital systems, technical product catalogues and interactive 3D solutions for industrial and engineering businesses.",
      body: [
        "Forsa Design combines practical experience in industrial machinery, technical sales and international commerce with web development and CAD-based visualisation.",
        "We develop digital tools that connect technical product information with commercial processes, including product selection, configuration, enquiries and quotations.",
        "Based in Banff, Scotland.",
      ],
      cta: "Request a Quote",
    },
    services: {
      heading: "Services",
      digital: {
        title: "Industrial Digital Solutions",
        items: [
          "Industrial websites and bespoke web systems.",
          "Technical product catalogues.",
          "B2B and customer portals.",
          "Enquiry, quotation and ordering systems.",
          "API integrations and business process automation.",
        ],
      },
      engineering: {
        title: "3D Engineering",
        items: [
          "CAD-based visualisation.",
          "Interactive technical product models.",
          "Industrial component visualisation.",
          "Parametric 3D configurators.",
          "Technical product configuration tools.",
        ],
      },
    },
    process: processCopy["en"],
    about: {
      heading: aboutContent.en.heading,
      highlightsTitle: aboutContent.en.backgroundHeading,
    },
    pricing: {
      heading: "What Does It Cost?",
      subheading:
        "Every project is scoped individually according to its functionality, content and integration requirements.",
    },
    cta: {
      heading: "Discuss Your Project",
      body: "Tell us about your product range, customer workflow or 3D requirements. We’ll review the scope with you.",
      button: "Let's Talk",
      contactHref: "/en/contact",
    },
    footer: {
      location: "Banff, Aberdeenshire, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Miro",
      emailLabel: "Email",
      phoneLabel: "Phone",
      linkedinLabel: "LinkedIn",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "© 2026 Forsa Design. All rights reserved.",
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
        "Required for the site to function, including language preferences and security. These cannot be disabled.",
      analytics: "Analytics",
      analyticsDesc:
        "Used to understand how visitors interact with the website when analytics are enabled.",
      marketing: "Marketing",
      marketingDesc: "Used for advertising purposes when marketing cookies are enabled.",
      alwaysOn: "Always on",
      managePreferences: "Manage your cookie preferences",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      process: "Proces",
      about: "O nas",
      contact: "Kontakt",
      comparison: "Porównanie",
      quote: "Wycena",
      pay: "Zapłać fakturę",
      pricing: "Ceny",
      blog: "Blog",
      faq: "FAQ",
    },
    faq: {
      heading: "Najczęstsze pytania",
      subheading:
        "Konkretne odpowiedzi dla firm przemysłowych, inżynieryjnych i zespołów zakupowych.",
      searchPlaceholder: "Szukaj pytań...",
      noResults: "Brak pytań pasujących do wyszukiwania.",
      comparisonCta: "Zobacz pełne porównanie",
      comparisonHref: "/pl/comparison",
      items: getFaqItems("pl"),
    },
    trustBar: {
      desktop: "PageSpeed desktop",
      mobile: "PageSpeed mobile",
      ssl: "SSL Labs",
      observatory: "Mozilla Observatory",
      co2: "CO₂ na wizytę",
      a11y: "Dostępność",
      lowEmission: "Niska emisja",
      explainer:
        "Korzystamy z narzędzi wspomaganych przez AI, aby przyspieszyć odpowiednie etapy tworzenia strony, a następnie sprawdzamy, konfigurujemy i optymalizujemy wdrożenie. Wydajność, dostępność, bezpieczeństwo i SEO są testowane w ramach procesu tworzenia strony.",
    },
    hero: {
      tagline: "Przemysłowe rozwiązania cyfrowe i inżynieria 3D",
      subheader:
        "Dedykowane systemy cyfrowe, katalogi techniczne oraz interaktywne rozwiązania 3D dla przedsiębiorstw przemysłowych i inżynieryjnych.",
      body: [
        "Forsa Design łączy praktyczne doświadczenie w branży maszyn przemysłowych, sprzedaży technicznej i handlu międzynarodowym z tworzeniem systemów webowych oraz wizualizacją opartą na modelach CAD.",
        "Tworzymy narzędzia cyfrowe łączące informacje techniczne o produktach z procesami handlowymi, w tym doborem produktów, konfiguracją, zapytaniami i wycenami.",
        "Siedziba w Banff, w Szkocji.",
      ],
      cta: "Poproś o wycenę",
    },
    services: {
      heading: "Usługi",
      digital: {
        title: "Przemysłowe rozwiązania cyfrowe",
        items: [
          "Strony dla przemysłu i dedykowane systemy webowe.",
          "Katalogi techniczne produktów.",
          "Portale B2B i portale klientów.",
          "Systemy obsługi zapytań, wycen i zamówień.",
          "Integracje API i automatyzacja procesów biznesowych.",
        ],
      },
      engineering: {
        title: "Inżynieria 3D",
        items: [
          "Wizualizacja na podstawie modeli CAD.",
          "Interaktywne modele techniczne produktów.",
          "Wizualizacja komponentów przemysłowych.",
          "Parametryczne konfiguratory 3D.",
          "Narzędzia do konfiguracji produktów technicznych.",
        ],
      },
    },
    process: processCopy["pl"],
    about: {
      heading: aboutContent.pl.heading,
      highlightsTitle: aboutContent.pl.backgroundHeading,
    },
    pricing: {
      heading: "Ile to kosztuje?",
      subheading:
        "Każdy projekt wyceniamy indywidualnie na podstawie wymaganych funkcji, treści i integracji.",
    },
    cta: {
      heading: "Porozmawiajmy o Twoim projekcie",
      body: "Opowiedz nam o swoich produktach, procesie obsługi klientów lub potrzebach związanych z 3D. Wspólnie omówimy zakres projektu.",
      button: "Porozmawiajmy",
      contactHref: "/pl/contact",
    },
    footer: {
      location: "Banff, Aberdeenshire, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      emailLabel: "Email",
      phoneLabel: "Telefon",
      linkedinLabel: "LinkedIn",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "© 2026 Forsa Design. Wszystkie prawa zastrzeżone.",
      terms: "Regulamin",
      privacy: "Polityka prywatności",
      sitemap: "Mapa strony",
      cookiePreferences: "Ustawienia cookies",
    },
    cookies: {
      bannerTitle: "Używamy plików cookie",
      bannerDesc:
        "Używamy niezbędnych plików cookie do prawidłowego działania strony oraz opcjonalnych plików cookie do analizy sposobu korzystania z witryny. Możesz zaakceptować wszystkie, odrzucić opcjonalne lub dostosować ustawienia.",
      acceptAll: "Akceptuj wszystkie",
      rejectNonEssential: "Odrzuć opcjonalne",
      customise: "Dostosuj",
      savePreferences: "Zapisz ustawienia",
      essential: "Niezbędne",
      essentialDesc:
        "Wymagane do prawidłowego działania strony, w tym obsługi preferencji językowych i bezpieczeństwa. Nie można ich wyłączyć.",
      analytics: "Analityczne",
      analyticsDesc:
        "Służą do analizy sposobu korzystania ze strony, jeśli analityka jest włączona.",
      marketing: "Marketingowe",
      marketingDesc: "Służą do celów reklamowych, jeśli marketingowe pliki cookie są włączone.",
      alwaysOn: "Zawsze włączone",
      managePreferences: "Zarządzaj preferencjami cookie",
    },
  },
};
