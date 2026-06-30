import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

type Language = "en" | "pl";

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      process: "Process",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      blog: "Blog",
      comparison: "Compare",
      quote: "Quote",
      aboutPage: "About Us",
    },
    faq: {
      heading: "FAQ",
      subheading: "Answers to the most common questions about working with us.",
      searchPlaceholder: "Search questions…",
      noResults: "No questions match your search.",
      comparisonCta: "See full comparison",
      comparisonHref: "/en/comparison",
      items: [
        {
          q: "Do you have experience in my industry?",
          a: "An agency that works with every type of business may not always have deep experience in a specific area. Ask what projects they have completed in your industry and what results they achieved. Look at more than just design. Consider performance, usability, conversions, and business impact.",
        },
        {
          q: "What is your discovery process?",
          a: "A professional agency should not start building after a short conversation. The first stage should include understanding your goals, customers, competitors, and current challenges. If the process starts with choosing a template, important details may be missed.",
        },
        {
          q: "Do you focus on SEO and performance?",
          a: "A website needs to do more than look good. It should load quickly, work well across devices, and help customers find your business. Ask how they approach technical SEO, speed, and measuring results.",
        },
        {
          q: "Who will manage my project?",
          a: "Clear communication matters. You should know who is responsible for your project and who understands your business goals. A dedicated contact person keeps the process organised.",
        },
        {
          q: "What happens after launch?",
          a: "A website needs ongoing care. Ask about updates, security, backups, technical support, and future improvements. A launch should be the beginning, not the end.",
        },
        {
          q: "Can I move my website if my needs change?",
          a: "Your website should belong to you. A good agency builds with flexibility in mind, allowing you to change providers without losing control of your data or domain.",
        },
        {
          q: "How is pricing structured?",
          a: "Pricing should be clear from the beginning. You should understand what is included, what happens if the project changes, and what future costs may appear.",
        },
      ],
    },
    hero: {
      tagline: "Web Design Agency in Aberdeenshire, Scotland",
      subheader:
        "Custom-built websites for businesses in Banff, Aberdeenshire and across Scotland.",
      body: "We create fast, reliable websites with clean development, strong performance, and a focus on user experience. No unnecessary complexity. No generic solutions. Just well-built websites that help your business look professional, perform better, and support growth.",
      cta: "Request a Quote",
    },
    services: {
      heading: "Our Services",
      card1: {
        title: "Web Design & Development",
        desc: "No heavy templates. No unnecessary page builders. We build clean, modern websites focused on performance, security, and a smooth user experience. Every project is designed around your business goals, not a generic layout.",
      },
      card2: {
        title: "E-commerce & Conversion Optimisation",
        desc: "Online shops built to make buying easier. From improving existing stores to creating tailored e-commerce experiences, we focus on speed, usability, and removing barriers that stop customers from completing purchases. Better performance. Better customer journeys. Better results.",
      },
      card3: {
        title: "Custom Website Solutions",
        desc: "For businesses that need more than a standard website. We create tailored solutions such as custom features, integrations, and improvements that help your website work better as your business grows. Practical development focused on reliability, flexibility, and long-term use.",
      },
    },
    portfolio: {
      heading: "Our Work",
      subheading: "Custom-built websites focused on performance, usability, and business growth.",
      case1: {
        title: "Love Sprouts\nE-commerce Redesign",
        desc: "A modern online shopping experience focused on clean design, faster performance, and a smoother customer journey.",
        tag: "[ CASE STUDY LIVE ]",
      },
      case2: {
        title: "Forsa Design\nWebsite Development",
        desc: "A custom website built to showcase services clearly, improve user experience, and create a stronger digital presence.",
        tag: "[ CASE STUDY ]",
      },
      case3: {
        title: "Future Projects",
        desc: "New case studies are currently being developed, covering custom websites, optimisation, and business-focused digital solutions.",
        tag: "[ PIPELINE ]",
      },
    },
    process: {
      heading: "How We Work",
      steps: [
        {
          title: "Discovery & Planning",
          desc: "We start by understanding your business, customers, and goals. This helps us plan a website structure that supports your users and your objectives from the beginning.",
        },
        {
          title: "Design & Development",
          desc: "We create a clean, custom-built website focused on performance, usability, and a strong user experience. No unnecessary templates. No features that add complexity without value.",
        },
        {
          title: "Testing & Optimisation",
          desc: "Before launch, we check performance, mobile experience, navigation, and technical quality. Every detail is reviewed to make sure the website works properly across devices.",
        },
        {
          title: "Support & Improvements",
          desc: "After launch, we can help maintain, update, and improve your website as your business develops. The goal is a website that stays reliable and effective over time.",
        },
      ],
    },
    about: {
      heading: "About Forsa Design",
      body: "We create custom websites built around your business goals. Every project starts with understanding your customers, your services, and what your website needs to achieve. We focus on clean development, strong performance, usability, and a structure that supports SEO.",
      body2:
        "Clear collaboration is at the centre of how we work. You know what is happening, why decisions are made, and what comes next. The goal is a website that helps your business look professional, perform better, and support long-term growth.",
    },
    cta: {
      heading: "Built for performance. Designed for growth.",
      body: "Clean code. Clear strategy. Better digital experiences.",
      button: "Request a Quote",
    },
    contact: {
      heading: "Get In Touch",
      subheading: "Ready to start your next project? Let's talk.",
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      projectType: { label: "Project Type" },
      details: { label: "Project Details", placeholder: "Tell us about your project..." },
      submit: "Send Message",
      sending: "Sending...",
      success: "Thank you! We'll get back to you soon.",
      error: "Something went wrong. Please try again, or email us directly.",
      alternative: "Or reach out directly:",
      contactPersonLabel: "Contact person",
      contactPerson: "Miro",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: ["Website", "E-commerce Shop", "Forum / Community", "Complex System", "Other"],
      selectPlaceholder: "Select a project type...",
      errors: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
        selectRequired: "Please select a project type",
        captcha: "Please complete the verification",
      },
    },
    footer: {
      tagline: "Built for scale. Hardcoded for speed.",
      location: "Banff, Aberdeenshire, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Miro",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2024 Forsa Design. All rights reserved.",
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
      portfolio: "Portfolio",
      process: "Proces",
      about: "O Nas",
      contact: "Kontakt",
      faq: "FAQ",
      blog: "Blog",
      comparison: "Porównanie",
      quote: "Wycena",
      aboutPage: "O Nas",
    },
    faq: {
      heading: "FAQ",
      subheading: "Odpowiedzi na najczęstsze pytania dotyczące współpracy z nami.",
      searchPlaceholder: "Szukaj pytań…",
      noResults: "Brak pytań pasujących do wyszukiwania.",
      comparisonCta: "Zobacz pełne porównanie",
      comparisonHref: "/pl/comparison",
      items: [
        {
          q: "Czy macie do\u015bwiadczenie w mojej bran\u017cy?",
          a: "Agencja pracuj\u0105ca z ka\u017cdym typem biznesu nie zawsze ma g\u0142\u0119bokie do\u015bwiadczenie w konkretnej dziedzinie. Zapytaj, jakie projekty zrealizowali w Twojej bran\u017cy i jakie wyniki osi\u0105gn\u0119li. Patrz szerzej ni\u017c tylko na design \u2014 we\u017a pod uwag\u0119 wydajno\u015b\u0107, u\u017cyteczno\u015b\u0107, konwersje i wp\u0142yw na biznes.",
        },
        {
          q: "Jaki jest Wasz proces odkrywania projektu?",
          a: "Profesjonalna agencja nie powinna zaczyna\u0107 budowania po kr\u00f3tkim spotkaniu. Pierwszy etap powinien obejmowa\u0107 zrozumienie Twoich cel\u00f3w, klient\u00f3w, konkurencji i aktualnych wyzwa\u0144. Je\u015bli proces zaczyna si\u0119 od wyboru szablonu, wa\u017cne szczeg\u00f3\u0142y mog\u0105 zosta\u0107 pomini\u0119te.",
        },
        {
          q: "Czy skupiacie si\u0119 na SEO i wydajno\u015bci?",
          a: "Strona internetowa musi robi\u0107 wi\u0119cej ni\u017c tylko dobrze wygl\u0105da\u0107. Powinna \u0142adowa\u0107 si\u0119 szybko, dzia\u0142a\u0107 dobrze na wszystkich urz\u0105dzeniach i pomaga\u0107 klientom znale\u017a\u0107 Tw\u00f3j biznes. Zapytaj, jak podchodz\u0105 do technicznego SEO, szybko\u015bci i mierzenia wynik\u00f3w.",
        },
        {
          q: "Kto b\u0119dzie zarz\u0105dza\u0142 moim projektem?",
          a: "Jasna komunikacja ma znaczenie. Powiniene\u015b wiedzie\u0107, kto jest odpowiedzialny za Tw\u00f3j projekt i kto rozumie Twoje cele biznesowe. Dedykowana osoba kontaktowa utrzymuje proces w porz\u0105dku.",
        },
        {
          q: "Co si\u0119 dzieje po uruchomieniu?",
          a: "Strona internetowa wymaga sta\u0142ej opieki. Zapytaj o aktualizacje, bezpiecze\u0144stwo, kopie zapasowe, wsparcie techniczne i przysz\u0142e ulepszenia. Uruchomienie powinno by\u0107 pocz\u0105tkiem, nie ko\u0144cem.",
        },
        {
          q: "Czy mog\u0119 przenie\u015b\u0107 stron\u0119, je\u015bli moje potrzeby si\u0119 zmieni\u0105?",
          a: "Twoja strona powinna nale\u017ce\u0107 do Ciebie. Dobra agencja buduje z my\u015bl\u0105 o elastyczno\u015bci, pozwalaj\u0105c Ci zmieni\u0107 dostawc\u0119 bez utraty kontroli nad danymi lub domen\u0105.",
        },
        {
          q: "Jak wygl\u0105da wycena projektu?",
          a: "Ceny powinny by\u0107 jasne od samego pocz\u0105tku. Powiniene\u015b rozumie\u0107, co jest zawarte, co si\u0119 stanie, je\u015bli projekt si\u0119 zmieni, i jakie przysz\u0142e koszty mog\u0105 si\u0119 pojawi\u0107.",
        },
      ],
    },
    hero: {
      tagline: "Agencja Web Design w Aberdeenshire, Szkocja",
      subheader:
        "Autorskie strony internetowe dla firm z Banff, Aberdeenshire i ca\u0142ej Szkocji.",
      body: "Tworzymy szybkie, niezawodne strony z czystym kodem, wysok\u0105 wydajno\u015bci\u0105 i skupieniem na do\u015bwiadczeniu u\u017cytkownika. Bez zb\u0119dnej z\u0142o\u017cono\u015bci. Bez og\u00f3lnych rozwi\u0105za\u0144. Tylko dobrze zbudowane strony, kt\u00f3re pomagaj\u0105 Twojemu biznesowi wygl\u0105da\u0107 profesjonalnie, dzia\u0142a\u0107 sprawniej i wspiera\u0107 wzrost.",
      cta: "Popro\u015b o wycen\u0119",
    },
    services: {
      heading: "Nasze Us\u0142ugi",
      card1: {
        title: "Projektowanie i Tworzenie Stron",
        desc: "Bez ci\u0119\u017ckich szablon\u00f3w. Bez zb\u0119dnych kreator\u00f3w stron. Tworzymy czyste, nowoczesne strony skupione na wydajno\u015bci, bezpiecze\u0144stwie i p\u0142ynnym do\u015bwiadczeniu u\u017cytkownika. Ka\u017cdy projekt jest tworzony wok\u00f3\u0142 Twoich cel\u00f3w biznesowych, a nie og\u00f3lnego szablonu.",
      },
      card2: {
        title: "Sklepy Internetowe i Optymalizacja Konwersji",
        desc: "Sklepy online tworzone, by u\u0142atwia\u0107 zakupy. Od ulepszania istniej\u0105cych sklep\u00f3w po tworzenie dedykowanych rozwi\u0105za\u0144 e-commerce \u2014 skupiamy si\u0119 na szybko\u015bci, u\u017cyteczno\u015bci i eliminowaniu barier powstrzymuj\u0105cych klient\u00f3w od finalizowania zakup\u00f3w. Lepsza wydajno\u015b\u0107. Lepsze \u015bcie\u017cki klient\u00f3w. Lepsze wyniki.",
      },
      card3: {
        title: "Dedykowane Rozwi\u0105zania Webowe",
        desc: "Dla firm, kt\u00f3re potrzebuj\u0105 czego\u015b wi\u0119cej ni\u017c standardowej strony. Tworzymy dedykowane rozwi\u0105zania: niestandardowe funkcje, integracje i ulepszenia, kt\u00f3re pomagaj\u0105 Twojej stronie dzia\u0142a\u0107 lepiej wraz z rozwojem firmy. Praktyczny development skupiony na niezawodno\u015bci, elastyczno\u015bci i d\u0142ugoterminowym u\u017cytkowaniu.",
      },
    },
    portfolio: {
      heading: "Nasze Prace",
      subheading:
        "Dedykowane strony internetowe skupione na wydajno\u015bci, u\u017cyteczno\u015bci i wzro\u015bcie biznesu.",
      case1: {
        title: "Love Sprouts\nPrzebudowa E-commerce",
        desc: "Nowoczesne do\u015bwiadczenie zakup\u00f3w online skupione na czystym designie, szybszej wydajno\u015bci i p\u0142ynniejszej \u015bcie\u017cce klienta.",
        tag: "[ CASE STUDY LIVE ]",
      },
      case2: {
        title: "Forsa Design\nTworzenie Strony",
        desc: "Dedykowana strona zbudowana, by wyra\u017anie prezentowa\u0107 us\u0142ugi, poprawi\u0107 do\u015bwiadczenie u\u017cytkownika i stworzy\u0107 mocniejsz\u0105 obecno\u015b\u0107 cyfrow\u0105.",
        tag: "[ CASE STUDY ]",
      },
      case3: {
        title: "Przysz\u0142e Projekty",
        desc: "Nowe case studies s\u0105 aktualnie tworzone \u2014 obejmuj\u0105 dedykowane strony, optymalizacj\u0119 i biznesowe rozwi\u0105zania cyfrowe.",
        tag: "[ W PLANACH ]",
      },
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        {
          title: "Odkrycie i Planowanie",
          desc: "Zaczynamy od zrozumienia Twojego biznesu, klient\u00f3w i cel\u00f3w. To pomaga nam zaplanowa\u0107 struktur\u0119 strony wspieraj\u0105c\u0105 u\u017cytkownik\u00f3w i Twoje cele od samego pocz\u0105tku.",
        },
        {
          title: "Projektowanie i Tworzenie",
          desc: "Tworzymy czyst\u0105, dedykowan\u0105 stron\u0119 skupion\u0105 na wydajno\u015bci, u\u017cyteczno\u015bci i silnym do\u015bwiadczeniu u\u017cytkownika. Bez zb\u0119dnych szablon\u00f3w. Bez funkcji, kt\u00f3re dodaj\u0105 z\u0142o\u017cono\u015b\u0107 bez warto\u015bci.",
        },
        {
          title: "Testowanie i Optymalizacja",
          desc: "Przed uruchomieniem sprawdzamy wydajno\u015b\u0107, mobilne do\u015bwiadczenie, nawigacj\u0119 i jako\u015b\u0107 techniczn\u0105. Ka\u017cdy szczeg\u00f3\u0142 jest przegl\u0105dany, by upewni\u0107 si\u0119, \u017ce strona dzia\u0142a prawid\u0142owo na wszystkich urz\u0105dzeniach.",
        },
        {
          title: "Wsparcie i Ulepszenia",
          desc: "Po uruchomieniu mo\u017cemy pomaga\u0107 utrzymywa\u0107, aktualizowa\u0107 i ulepsza\u0107 Twoj\u0105 stron\u0119 wraz z rozwojem biznesu. Celem jest strona, kt\u00f3ra pozostaje niezawodna i skuteczna przez d\u0142ugi czas.",
        },
      ],
    },
    about: {
      heading: "O Forsa Design",
      body: "Tworzymy dedykowane strony internetowe zaprojektowane wok\u00f3\u0142 Twoich cel\u00f3w biznesowych. Ka\u017cdy projekt zaczyna si\u0119 od zrozumienia Twoich klient\u00f3w, us\u0142ug i tego, co Twoja strona musi osi\u0105gn\u0105\u0107. Skupiamy si\u0119 na czystym kodzie, wysokiej wydajno\u015bci, u\u017cyteczno\u015bci i strukturze wspieraj\u0105cej SEO.",
      body2:
        "Jasna wsp\u00f3\u0142praca jest centrum naszego sposobu pracy. Wiesz, co si\u0119 dzieje, dlaczego podejmowane s\u0105 decyzje i co b\u0119dzie nast\u0119pnie. Celem jest strona, kt\u00f3ra pomaga Twojemu biznesowi wygl\u0105da\u0107 profesjonalnie, dzia\u0142a\u0107 sprawniej i wspiera\u0107 d\u0142ugoterminowy wzrost.",
    },
    cta: {
      heading: "Stworzone z my\u015bl\u0105 o wydajno\u015bci. Zaprojektowane dla rozwoju.",
      body: "Czysty kod. Jasna strategia. Lepsze do\u015bwiadczenia cyfrowe.",
      button: "Popro\u015b o wycen\u0119",
    },
    contact: {
      heading: "Skontaktuj Si\u0119 Z Nami",
      subheading: "Got\u00f3w na nowy projekt? Porozmawiajmy.",
      name: { label: "Imi\u0119 i Nazwisko", placeholder: "Twoje imi\u0119 i nazwisko" },
      email: { label: "Adres Email", placeholder: "tw\u00f3j@email.com" },
      projectType: { label: "Typ Projektu" },
      details: {
        label: "Szczeg\u00f3\u0142y Projektu",
        placeholder: "Opowiedz nam o swoim projekcie...",
      },
      submit: "Wy\u015blij Wiadomo\u015b\u0107",
      sending: "Wysy\u0142anie...",
      success: "Dzi\u0119kuj\u0119! Wkr\u00f3tce do Ciebie wr\u00f3cimy.",
      error:
        "Co\u015b posz\u0142o nie tak. Spr\u00f3buj ponownie lub napisz do nas bezpo\u015brednio.",
      alternative: "Lub skontaktuj si\u0119 bezpo\u015brednio:",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: [
        "Strona Internetowa",
        "Sklep Online",
        "Forum / Spo\u0142eczno\u015b\u0107",
        "System Z\u0142o\u017cony",
        "Inne",
      ],
      selectPlaceholder: "Wybierz typ projektu...",
      errors: {
        required: "To pole jest wymagane",
        invalidEmail: "Prosz\u0119 poda\u0107 prawid\u0142owy adres email",
        selectRequired: "Prosz\u0119 wybra\u0107 typ projektu",
        captcha: "Prosz\u0119 uko\u0144czy\u0107 weryfikacj\u0119",
      },
    },
    footer: {
      tagline: "Stworzone by dzia\u0142a\u0107. Napisane by zarabia\u0107.",
      location: "Banff, Aberdeenshire, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2024 Forsa Design. Wszystkie prawa zastrze\u017cone.",
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
