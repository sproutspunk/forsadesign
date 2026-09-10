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
          a: "No. I build custom websites and web systems without WordPress, Elementor-style page builders or off-the-shelf templates. I use AI-assisted development tools where they make the work faster, then review, configure and optimise the implementation myself.",
        },
        {
          q: "How long does a project take?",
          a: "A typical business website takes around nine weeks. More complex web systems, catalogues and API integrations usually take longer and are estimated individually once the scope is defined.",
        },
        {
          q: "What if I do not have professional photos?",
          a: "I work with the material you have and identify what is genuinely missing. For an industrial business, authentic photographs of your facilities, equipment and work are often more useful than generic stock photography.",
        },
        {
          q: "Do you offer ongoing support?",
          a: "Yes. Ongoing support is optional and paid separately. It can include hosting, backups, security maintenance, updates and agreed changes to the website. The price depends on the site and the level of support required.",
        },
        {
          q: "Can you integrate with our existing systems?",
          a: "API integrations are one of the main ways I connect websites and web systems with external services. Feasibility depends on the API, documentation, permissions and requirements of the system being connected.",
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
        "I use AI-assisted development tools to accelerate appropriate parts of the build, then review, configure and optimise the implementation myself. Performance, accessibility, security and SEO are tested as part of the development process.",
    },
    hero: {
      tagline: "Websites and Web Systems for Industry",
      subheader:
        "No templates. No page builders. Custom websites and web systems built for technical B2B companies.",
      body: "You know your industry. I understand how industrial buyers evaluate suppliers. I have more than 20 years of experience in international B2B sales, including metalworking machinery, industrial equipment and engineering solutions across Europe and Asia.\n\nForsa Design combines that commercial experience with modern web development to build websites and web systems for industrial, engineering and technical businesses.\n\nBased in Banff, Aberdeenshire. Available to work with clients in the UK and internationally.",
      cta: "Request a Quote",
    },
    services: {
      heading: "What I Build",
      card1: {
        title: "Industrial and Engineering Websites",
        desc: "Custom websites for industrial, engineering and manufacturing businesses. I focus on clear technical communication, performance, mobile usability, SEO, accessibility and security.\n\nI use AI-assisted development tools where they improve efficiency, then review and refine the structure, implementation, content logic, SEO and performance myself. There are no off-the-shelf templates or page builders.",
      },
      card2: {
        title: "B2B Catalogues and Ordering Systems",
        desc: "Custom product catalogues, enquiry systems, quote workflows and B2B ordering interfaces. Depending on the project, these can include customer accounts, account-specific information, bulk enquiries and API integrations with external services.\n\nA typical custom B2B catalogue or ordering system can take approximately 6–10 weeks once the specification, content and required integration access are available. More complex systems are estimated individually.",
      },
      card3: {
        title: "Custom Web Tools and API Integrations",
        desc: "Dealer portals, specification tools, multilingual quote systems, custom forms and workflow integrations built around the way your business operates.\n\nI use AI-assisted tools to accelerate appropriate parts of development while retaining direct control over architecture, configuration, testing, security and the final implementation. API integrations are assessed individually according to the external system and its documentation.",
      },
    },
    process: {
      heading: "How I Work",
      steps: [
        {
          title: "Discovery and Audit",
          desc: "I review your current website, business requirements, competitors, target customers and the information buyers need in order to evaluate your company.",
        },
        {
          title: "Specification and Design",
          desc: "I define the structure, functionality and technical requirements before development begins. The design is built around clear communication, usability and the commercial purpose of the website.",
        },
        {
          title: "Development",
          desc: "I build the website or web system using a modern development workflow, including AI-assisted tools where appropriate. I review and refine the implementation myself, with attention to performance, security, SEO and accessibility.",
        },
        {
          title: "Testing and Launch",
          desc: "Before launch, I test the implementation across relevant devices and browsers and check performance, accessibility, SSL, security configuration, SEO fundamentals and GDPR-related requirements.",
        },
        {
          title: "Optional Ongoing Support",
          desc: "After launch, ongoing support is available as a separate paid service. Depending on your requirements, it can include hosting, backups, security maintenance, updates and agreed website changes.",
        },
      ],
    },
    about: {
      heading: "Who’s Behind Forsa Design?",
      body: "I’m Miro. I founded Forsa Design after more than 20 years in international B2B sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I ran businesses in two countries, negotiated international contracts across three continents and managed teams in different countries.",
      body2:
        "That experience gave me a practical understanding of industrial sales and procurement. I know the process from initial contact and technical discussions through negotiation to the signed contract. I understand what buyers, engineers and decision-makers look for when they assess a potential supplier.",
      body3:
        "Forsa Design is a one-person business. You deal directly with me from the first conversation through development and launch. I use modern development tools including VS Code, GitHub, Cloudflare and AI-assisted development tools, but I remain responsible for the architecture, configuration, testing and final result.",
      body4:
        "I am based in Banff, Aberdeenshire. I am fluent in English and Polish and have some knowledge of Russian and Ukrainian. I can work with clients in the UK and internationally.",
      highlightsTitle: "Why My Background Matters",
      paragraphs: [
        "Industrial B2B experience",
        "More than 20 years in international B2B sales means I approach a website as a commercial tool, not only as a visual project. I understand industrial products, technical sales, international trade and procurement.",
        "Understanding the buying process",
        "I understand the questions buyers ask, the information they look for and the credibility signals that matter when a supplier is being evaluated.",
        "Direct responsibility",
        "Forsa Design is a one-person business. There is no account-management layer between you and the person doing the work. I handle the project directly from specification through launch.",
      ],
      processTitle: "Typical Website Project",
      processList: [
        "Discovery and strategy — weeks 1–2",
        "I review your business, customers, competitors, existing website and project requirements and define the objectives and structure.",
        "Design — weeks 3–4",
        "I develop the page structure, visual direction and user experience before moving into the main development stage.",
        "Development — weeks 5–8",
        "I build and configure the website, content structure and required functionality, with attention to performance, security, accessibility and SEO.",
        "Testing and optimisation — week 9",
        "I test the website across relevant devices and browsers and review performance, accessibility, security configuration and SEO fundamentals.",
        "Launch and optional support",
        "I deploy the completed website. Ongoing maintenance and support are available separately if required.",
      ],
      valuesTitle: "How I Work",
      values: [
        "No off-the-shelf templates",
        "I build custom implementations without WordPress, Elementor-style page builders or ready-made website templates.",
        "Business before decoration",
        "The structure and content should help visitors understand what your company does, what it can deliver and how to take the next step.",
        "No deliberate vendor lock-in",
        "I do not deliberately build systems that make a client dependent on me. The technical setup and access arrangements are agreed for each project.",
        "Optional ongoing support",
        "Support after launch is available as a separate paid service. You are not required to purchase an ongoing maintenance contract.",
        "Direct communication",
        "You communicate directly with the person designing and building the project. Scope, costs and responsibilities are agreed before the work begins.",
      ],
    },
    pricing: {
      heading: "What Does It Cost?",
      subheading:
        "Every project is scoped individually according to its functionality, content and integration requirements.",
    },
    cta: {
      heading: "Need a Better Website or Web System?",
      body: "Tell me what your business needs. I’ll assess the scope and propose a practical technical approach.",
      button: "Let's Talk",
      contactHref: "/en/contact",
    },
    footer: {
      tagline: "Custom web development for technical B2B.",
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
      about: "O mnie",
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
      items: [
        {
          q: "Czy używasz WordPressa lub szablonów?",
          a: "Nie. Buduję dedykowane strony i systemy webowe bez WordPressa, kreatorów typu Elementor i gotowych szablonów. Korzystam z narzędzi wspomaganych przez AI tam, gdzie przyspieszają pracę, a następnie sam sprawdzam, konfiguruję i optymalizuję wdrożenie.",
        },
        {
          q: "Ile trwa projekt?",
          a: "Typowy projekt strony firmowej zajmuje około dziewięciu tygodni. Bardziej rozbudowane systemy webowe, katalogi i integracje API zwykle wymagają więcej czasu. Termin ustalam indywidualnie po określeniu zakresu.",
        },
        {
          q: "Co jeśli nie mam profesjonalnych zdjęć?",
          a: "Pracuję z materiałami, które masz, i określam, czego rzeczywiście brakuje. W przypadku firmy przemysłowej autentyczne zdjęcia zakładu, urządzeń i realizacji są często bardziej wartościowe niż ogólne zdjęcia stockowe.",
        },
        {
          q: "Czy oferujesz wsparcie po wdrożeniu?",
          a: "Tak. Stałe wsparcie jest opcjonalną, dodatkowo płatną usługą. Może obejmować hosting, kopie zapasowe, utrzymanie bezpieczeństwa, aktualizacje i uzgodnione zmiany na stronie. Cena zależy od projektu i wymaganego zakresu obsługi.",
        },
        {
          q: "Czy możesz zintegrować stronę z naszymi systemami?",
          a: "Integracje API są jednym z głównych sposobów łączenia stron i systemów webowych z usługami zewnętrznymi. Możliwość integracji zależy od dostępnego API, dokumentacji, uprawnień i wymagań danego systemu.",
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
      lowEmission: "Niska emisja",
      explainer:
        "Korzystam z narzędzi wspomaganych przez AI, aby przyspieszyć odpowiednie etapy tworzenia strony, a następnie sam sprawdzam, konfiguruję i optymalizuję wdrożenie. Wydajność, dostępność, bezpieczeństwo i SEO są testowane w ramach procesu tworzenia strony.",
    },
    hero: {
      tagline: "Strony i systemy webowe dla przemysłu",
      subheader:
        "Bez szablonów. Bez kreatorów stron. Dedykowane strony i systemy webowe dla technicznych firm B2B.",
      body: "Ty znasz swoją branżę. Ja rozumiem, jak przemysłowi klienci oceniają dostawców. Mam ponad 20 lat doświadczenia w międzynarodowej sprzedaży B2B, obejmującej maszyny do obróbki metalu, wyposażenie przemysłowe i rozwiązania inżynieryjne w Europie i Azji.\n\nForsa Design łączy to doświadczenie handlowe z nowoczesnym web developmentem, tworząc strony i systemy webowe dla firm przemysłowych, inżynieryjnych i technicznych.\n\nDziałam z Banff w Aberdeenshire i mogę współpracować z klientami z Wielkiej Brytanii oraz z zagranicy.",
      cta: "Poproś o wycenę",
    },
    services: {
      heading: "Co buduję",
      card1: {
        title: "Strony dla przemysłu i firm inżynieryjnych",
        desc: "Dedykowane strony internetowe dla firm przemysłowych, inżynieryjnych i produkcyjnych. Koncentruję się na czytelnej komunikacji technicznej, wydajności, obsłudze urządzeń mobilnych, SEO, dostępności i bezpieczeństwie.\n\nKorzystam z narzędzi wspomaganych przez AI tam, gdzie zwiększają efektywność pracy, a następnie sam sprawdzam i dopracowuję strukturę, implementację, logikę treści, SEO i wydajność. Nie używam gotowych szablonów ani kreatorów stron.",
      },
      card2: {
        title: "Katalogi B2B i systemy zamówień",
        desc: "Dedykowane katalogi produktów, systemy zapytań, procesy wycenowe i interfejsy zamówień B2B. W zależności od projektu mogą obejmować konta klientów, informacje przypisane do kont, zapytania zbiorcze oraz integracje API z usługami zewnętrznymi.\n\nTypowy dedykowany katalog lub system zamówień B2B może wymagać około 6–10 tygodni od momentu uzgodnienia specyfikacji i dostarczenia treści oraz dostępu potrzebnego do integracji. Bardziej złożone systemy planuję i wyceniam indywidualnie.",
      },
      card3: {
        title: "Dedykowane narzędzia webowe i integracje API",
        desc: "Portale dealerskie, narzędzia do tworzenia specyfikacji, wielojęzyczne systemy wycen, dedykowane formularze i integracje procesów dopasowane do sposobu działania firmy.\n\nKorzystam z narzędzi wspomaganych przez AI, aby przyspieszyć odpowiednie etapy developmentu, zachowując bezpośrednią kontrolę nad architekturą, konfiguracją, testami, bezpieczeństwem i końcowym wdrożeniem. Każdą integrację API oceniam indywidualnie na podstawie systemu zewnętrznego i jego dokumentacji.",
      },
    },
    process: {
      heading: "Jak pracuję",
      steps: [
        {
          title: "Analiza i audyt",
          desc: "Analizuję obecną stronę, wymagania biznesowe, konkurencję, grupę docelową oraz informacje potrzebne klientom do oceny Twojej firmy.",
        },
        {
          title: "Specyfikacja i projekt",
          desc: "Przed rozpoczęciem developmentu określam strukturę, funkcjonalność i wymagania techniczne. Projekt powstaje z myślą o czytelnej komunikacji, użyteczności i biznesowym celu strony.",
        },
        {
          title: "Development",
          desc: "Buduję stronę lub system webowy przy użyciu nowoczesnego procesu developmentu, w tym narzędzi wspomaganych przez AI tam, gdzie ma to sens. Sam sprawdzam i dopracowuję wdrożenie, zwracając uwagę na wydajność, bezpieczeństwo, SEO i dostępność.",
        },
        {
          title: "Testy i uruchomienie",
          desc: "Przed uruchomieniem testuję wdrożenie na odpowiednich urządzeniach i przeglądarkach oraz sprawdzam wydajność, dostępność, SSL, konfigurację bezpieczeństwa, podstawy SEO i wymagania związane z GDPR.",
        },
        {
          title: "Opcjonalne wsparcie",
          desc: "Po uruchomieniu mogę zapewnić dalsze wsparcie jako oddzielną płatną usługę. W zależności od potrzeb może ono obejmować hosting, kopie zapasowe, utrzymanie bezpieczeństwa, aktualizacje i uzgodnione zmiany na stronie.",
        },
      ],
    },
    about: {
      heading: "Kto stoi za Forsa Design?",
      body: "Nazywam si\u0119 Miro. Za\u0142o\u017cy\u0142em Forsa Design po ponad 20 latach pracy w mi\u0119dzynarodowej sprzeda\u017cy B2B. Handlowa\u0142em maszynami do obr\u00f3bki metalu, wyposa\u017ceniem przemys\u0142owym i rozwi\u0105zaniami in\u017cynieryjnymi w Europie i Azji. Prowadzi\u0142em firmy w dw\u00f3ch krajach, negocjowa\u0142em mi\u0119dzynarodowe kontrakty na trzech kontynentach i zarz\u0105dza\u0142em zespo\u0142ami w r\u00f3\u017cnych krajach.",
      body2:
        "To do\u015bwiadczenie da\u0142o mi praktyczn\u0105 znajomo\u015b\u0107 sprzeda\u017cy przemys\u0142owej i proces\u00f3w zakupowych. Znam ten proces od pierwszego kontaktu i rozm\u00f3w technicznych, przez negocjacje, a\u017c po podpisanie kontraktu. Rozumiem, na co zwracaj\u0105 uwag\u0119 kupcy, in\u017cynierowie i osoby podejmuj\u0105ce decyzje przy ocenie potencjalnego dostawcy.",
      body3:
        "Forsa Design jest jednoosobow\u0105 firm\u0105. Od pierwszej rozmowy, przez development, a\u017c po uruchomienie projektu wsp\u00f3\u0142pracujesz bezpo\u015brednio ze mn\u0105. Korzystam z nowoczesnych narz\u0119dzi, takich jak VS Code, GitHub, Cloudflare oraz narz\u0119dzia wspomagane przez AI, ale to ja odpowiadam za architektur\u0119, konfiguracj\u0119, testy i ko\u0144cowy rezultat.",
      body4:
        "Dzia\u0142am z Banff w Aberdeenshire. Biegle m\u00f3wi\u0119 po polsku i angielsku, a tak\u017ce w pewnym stopniu pos\u0142uguj\u0119 si\u0119 rosyjskim i ukrai\u0144skim. Mog\u0119 wsp\u00f3\u0142pracowa\u0107 z klientami z Wielkiej Brytanii oraz z zagranicy.",
      highlightsTitle: "Dlaczego moje do\u015bwiadczenie ma znaczenie",
      paragraphs: [
        "Do\u015bwiadczenie w przemys\u0142owym B2B",
        "Ponad 20 lat w mi\u0119dzynarodowej sprzeda\u017cy B2B sprawia, \u017ce traktuj\u0119 stron\u0119 jako narz\u0119dzie biznesowe, a nie wy\u0142\u0105cznie projekt wizualny. Rozumiem produkty przemys\u0142owe, sprzeda\u017c techniczn\u0105, handel mi\u0119dzynarodowy i procesy zakupowe.",
        "Znajomo\u015b\u0107 procesu zakupowego",
        "Rozumiem pytania zadawane przez kupuj\u0105cych, informacje, kt\u00f3rych szukaj\u0105, oraz elementy buduj\u0105ce wiarygodno\u015b\u0107 podczas oceny potencjalnego dostawcy.",
        "Bezpo\u015brednia odpowiedzialno\u015b\u0107",
        "Forsa Design jest jednoosobow\u0105 firm\u0105. Nie ma po\u015brednika pomi\u0119dzy Tob\u0105 a osob\u0105 wykonuj\u0105c\u0105 prac\u0119. Prowadz\u0119 projekt bezpo\u015brednio od specyfikacji do uruchomienia.",
      ],
      processTitle: "Typowy projekt strony internetowej",
      processList: [
        "Analiza i strategia \u2014 tygodnie 1\u20132",
        "Analizuj\u0119 firm\u0119, klient\u00f3w, konkurencj\u0119, obecn\u0105 stron\u0119 oraz wymagania projektu i okre\u015blam jego cele oraz struktur\u0119.",
        "Projekt \u2014 tygodnie 3\u20134",
        "Opracowuj\u0119 struktur\u0119 stron, kierunek wizualny i spos\u00f3b korzystania z witryny przed rozpocz\u0119ciem g\u0142\u00f3wnego etapu developmentu.",
        "Development \u2014 tygodnie 5\u20138",
        "Buduj\u0119 i konfiguruj\u0119 stron\u0119, struktur\u0119 tre\u015bci oraz wymagane funkcje, zwracaj\u0105c uwag\u0119 na wydajno\u015b\u0107, bezpiecze\u0144stwo, dost\u0119pno\u015b\u0107 i SEO.",
        "Testy i optymalizacja \u2014 tydzie\u0144 9",
        "Testuj\u0119 stron\u0119 na odpowiednich urz\u0105dzeniach i przegl\u0105darkach oraz sprawdzam wydajno\u015b\u0107, dost\u0119pno\u015b\u0107, konfiguracj\u0119 bezpiecze\u0144stwa i podstawy SEO.",
        "Uruchomienie i opcjonalne wsparcie",
        "Uruchamiam gotow\u0105 stron\u0119. Dalsze utrzymanie i wsparcie s\u0105 dost\u0119pne oddzielnie, je\u015bli s\u0105 potrzebne.",
      ],
      valuesTitle: "Jak pracuj\u0119",
      values: [
        "Bez gotowych szablon\u00f3w",
        "Buduj\u0119 dedykowane rozwi\u0105zania bez WordPressa, kreator\u00f3w typu Elementor i gotowych szablon\u00f3w stron.",
        "Biznes przed dekoracj\u0105",
        "Struktura i tre\u015b\u0107 strony powinny pomaga\u0107 odbiorcy zrozumie\u0107, czym zajmuje si\u0119 firma, co potrafi dostarczy\u0107 i jaki powinien by\u0107 kolejny krok.",
        "Bez celowego vendor lock-in",
        "Nie buduj\u0119 celowo rozwi\u0105za\u0144 uzale\u017cniaj\u0105cych klienta ode mnie. Spos\u00f3b konfiguracji technicznej i zasady dost\u0119pu ustalam indywidualnie dla ka\u017cdego projektu.",
        "Opcjonalne wsparcie",
        "Wsparcie po uruchomieniu jest dost\u0119pne jako oddzielna p\u0142atna us\u0142uga. Nie wymagam podpisania sta\u0142ej umowy serwisowej.",
        "Bezpo\u015brednia komunikacja",
        "Rozmawiasz bezpo\u015brednio z osob\u0105 projektuj\u0105c\u0105 i buduj\u0105c\u0105 rozwi\u0105zanie. Zakres, koszty i odpowiedzialno\u015b\u0107 ustalam przed rozpocz\u0119ciem prac.",
      ],
    },
    pricing: {
      heading: "Ile to kosztuje?",
      subheading:
        "Każdy projekt wyceniam indywidualnie na podstawie wymaganych funkcji, treści i integracji.",
    },
    cta: {
      heading: "Potrzebujesz lepszej strony lub systemu webowego?",
      body: "Powiedz mi, czego potrzebuje Twoja firma. Oceni\u0119 zakres i zaproponuj\u0119 praktyczne rozwi\u0105zanie techniczne.",
      button: "Porozmawiajmy",
      contactHref: "/pl/contact",
    },
    footer: {
      tagline: "Dedykowany web development dla technicznego B2B.",
      location: "Banff, Aberdeenshire, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      emailLabel: "Email",
      phoneLabel: "Telefon",
      linkedinLabel: "LinkedIn",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2026 Forsa Design. Wszystkie prawa zastrze\u017cone.",
      terms: "Regulamin",
      privacy: "Polityka prywatno\u015bci",
      sitemap: "Mapa strony",
      cookiePreferences: "Ustawienia cookies",
    },
    cookies: {
      bannerTitle: "U\u017cywamy plik\u00f3w cookie",
      bannerDesc:
        "U\u017cywamy niezb\u0119dnych plik\u00f3w cookie do prawid\u0142owego dzia\u0142ania strony oraz opcjonalnych plik\u00f3w cookie do analizy sposobu korzystania z witryny. Mo\u017cesz zaakceptowa\u0107 wszystkie, odrzuci\u0107 opcjonalne lub dostosowa\u0107 ustawienia.",
      acceptAll: "Akceptuj wszystkie",
      rejectNonEssential: "Odrzu\u0107 opcjonalne",
      customise: "Dostosuj",
      savePreferences: "Zapisz ustawienia",
      essential: "Niezb\u0119dne",
      essentialDesc:
        "Wymagane do prawid\u0142owego dzia\u0142ania strony, w tym obs\u0142ugi preferencji j\u0119zykowych i bezpiecze\u0144stwa. Nie mo\u017cna ich wy\u0142\u0105czy\u0107.",
      analytics: "Analityczne",
      analyticsDesc:
        "S\u0142u\u017c\u0105 do analizy sposobu korzystania ze strony, je\u015bli analityka jest w\u0142\u0105czona.",
      marketing: "Marketingowe",
      marketingDesc:
        "S\u0142u\u017c\u0105 do cel\u00f3w reklamowych, je\u015bli marketingowe pliki cookie s\u0105 w\u0142\u0105czone.",
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
