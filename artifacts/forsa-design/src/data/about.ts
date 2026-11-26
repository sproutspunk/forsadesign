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
        "Our founder’s more than 20 years in international B2B sales inform how we connect technical product information with sales and procurement. We understand industrial products, technical sales, international trade and procurement.",
      ],
      [
        "Understanding the buying process",
        "We understand the questions buyers ask, the information they look for and the credibility signals that matter when a supplier is being evaluated.",
      ],
      [
        "Direct responsibility",
        "We work directly with you from specification through launch. Scope, costs and responsibilities are agreed before work begins.",
      ],
    ],
    pl: [
      [
        "Doświadczenie w przemysłowym B2B",
        "Ponad 20-letnie doświadczenie założyciela w międzynarodowej sprzedaży B2B pomaga nam łączyć informacje techniczne o produktach z procesami sprzedaży i zakupów. Rozumiemy produkty przemysłowe, sprzedaż techniczną, handel międzynarodowy i procesy zakupowe.",
      ],
      [
        "Znajomość procesu zakupowego",
        "Rozumiemy pytania zadawane przez kupujących, informacje, których szukają, oraz elementy budujące wiarygodność podczas oceny potencjalnego dostawcy.",
      ],
      [
        "Bezpośrednia odpowiedzialność",
        "Współpracujemy z Tobą bezpośrednio od specyfikacji do uruchomienia. Zakres, koszty i odpowiedzialność ustalamy przed rozpoczęciem prac.",
      ],
    ],
  },
  process: {
    en: [
      [
        "Discovery and strategy - weeks 1-2",
        "We review your business, customers, competitors, existing website and project requirements and define the objectives and structure.",
      ],
      [
        "Design - weeks 3-4",
        "We develop the page structure, visual direction and user experience before moving into the main development stage.",
      ],
      [
        "Development - weeks 5-8",
        "We build and configure the website, content structure and required functionality, with attention to performance, security, accessibility and SEO.",
      ],
      [
        "Testing and optimisation - week 9",
        "We test the website across relevant devices and browsers and review performance, accessibility, security configuration and SEO fundamentals.",
      ],
      [
        "Launch and optional support",
        "We deploy the completed website. Ongoing maintenance and support are available separately if required.",
      ],
    ],
    pl: [
      [
        "Analiza i strategia - tygodnie 1-2",
        "Analizujemy firmę, klientów, konkurencję, obecną stronę oraz wymagania projektu i określamy jego cele oraz strukturę.",
      ],
      [
        "Projekt - tygodnie 3-4",
        "Opracowujemy strukturę stron, kierunek wizualny i sposób korzystania z witryny przed rozpoczęciem głównego etapu developmentu.",
      ],
      [
        "Development - tygodnie 5-8",
        "Budujemy i konfigurujemy stronę, strukturę treści oraz wymagane funkcje, zwracając uwagę na wydajność, bezpieczeństwo, dostępność i SEO.",
      ],
      [
        "Testy i optymalizacja - tydzień 9",
        "Testujemy stronę na odpowiednich urządzeniach i przeglądarkach oraz sprawdzamy wydajność, dostępność, konfigurację bezpieczeństwa i podstawy SEO.",
      ],
      [
        "Uruchomienie i opcjonalne wsparcie",
        "Uruchamiamy gotową stronę. Dalsze utrzymanie i wsparcie są dostępne oddzielnie, jeśli są potrzebne.",
      ],
    ],
  },
  different: {
    en: [
      [
        "No off-the-shelf templates",
        "We build custom implementations without WordPress, Elementor-style page builders or ready-made website templates.",
      ],
      [
        "Business before decoration",
        "The structure and content should help visitors understand what your company does, what it can deliver and how to take the next step.",
      ],
      [
        "No deliberate vendor lock-in",
        "We do not deliberately build systems that make a client dependent on us. The technical setup and access arrangements are agreed for each project.",
      ],
      [
        "Optional ongoing support",
        "Support after launch is available as a separate paid service. You are not required to purchase an ongoing maintenance contract.",
      ],
      [
        "Direct communication",
        "You communicate directly with the team delivering the project. Scope, costs and responsibilities are agreed before the work begins.",
      ],
    ],
    pl: [
      [
        "Bez gotowych szablonów",
        "Budujemy dedykowane rozwiązania bez WordPressa, kreatorów typu Elementor i gotowych szablonów stron.",
      ],
      [
        "Biznes przed dekoracją",
        "Struktura i treść strony powinny pomagać odbiorcy zrozumieć, czym zajmuje się firma, co potrafi dostarczyć i jaki powinien być kolejny krok.",
      ],
      [
        "Bez celowego vendor lock-in",
        "Nie budujemy celowo rozwiązań uzależniających klienta od nas. Sposób konfiguracji technicznej i zasady dostępu ustalamy indywidualnie dla każdego projektu.",
      ],
      [
        "Opcjonalne wsparcie",
        "Wsparcie po uruchomieniu jest dostępne jako oddzielna płatna usługa. Nie wymagamy podpisania stałej umowy serwisowej.",
      ],
      [
        "Bezpośrednia komunikacja",
        "Rozmawiasz bezpośrednio z zespołem realizującym projekt. Zakres, koszty i odpowiedzialność ustalamy przed rozpoczęciem prac.",
      ],
    ],
  },
};

export const aboutContent: Record<"en" | "pl", AboutContent> = {
  en: {
    seoTitle: "About Forsa Design | Industrial Digital Solutions & 3D Engineering",
    seoDesc:
      "Meet Forsa Design in Banff, Scotland. Our experience spans industrial machinery, technical sales, web development and CAD-based visualisation.",
    heading: "Who’s Behind Forsa Design?",
    intro: [
      "Forsa Design combines practical experience in industrial machinery, technical sales and international commerce with web development and CAD-based visualisation. Our founder, Miro, has worked in international B2B sales of metalworking machinery and industrial equipment.",
      "Our founder’s experience gives us a practical understanding of industrial sales and procurement. We know the process from initial contact and technical discussions through negotiation to the signed contract. We understand what buyers, engineers and decision-makers look for when they assess a potential supplier.",
      "We work directly with you from the first conversation through development and launch. We develop digital tools that connect technical product information with commercial processes, including product selection, configuration, enquiries and quotations.",
      "We are based in Banff, Aberdeenshire. We work in English and Polish with clients in the UK and internationally.",
    ],
    backgroundHeading: "Why Our Experience Matters",
    background: shared.background.en as Pair[],
    processHeading: "Typical Website Project",
    process: shared.process.en as Pair[],
    differentHeading: "How We Work",
    different: shared.different.en as Pair[],
    contactCta: "Request a Quote",
  },
  pl: {
    seoTitle: "O Forsa Design | Rozwiązania cyfrowe dla przemysłu i inżynieria 3D",
    seoDesc:
      "Poznaj Forsa Design z Banff w Szkocji. Łączymy doświadczenie w branży maszyn przemysłowych i sprzedaży technicznej z tworzeniem systemów webowych i wizualizacją CAD.",
    heading: "Kto stoi za Forsa Design?",
    intro: [
      "Forsa Design łączy praktyczne doświadczenie w branży maszyn przemysłowych, sprzedaży technicznej i handlu międzynarodowym z tworzeniem systemów webowych oraz wizualizacją opartą na modelach CAD. Nasz założyciel, Miro, zajmował się międzynarodową sprzedażą B2B maszyn do obróbki metalu i wyposażenia przemysłowego.",
      "To doświadczenie dało nam praktyczną znajomość sprzedaży przemysłowej i procesów zakupowych. Znamy ten proces od pierwszego kontaktu i rozmów technicznych, przez negocjacje, aż po podpisanie kontraktu. Rozumiemy, na co zwracają uwagę kupcy, inżynierowie i osoby podejmujące decyzje, oceniając potencjalnego dostawcę.",
      "Współpracujemy z Tobą bezpośrednio od pierwszej rozmowy, przez development, aż po uruchomienie projektu. Tworzymy narzędzia cyfrowe łączące informacje techniczne o produktach z procesami handlowymi, w tym doborem produktów, konfiguracją, zapytaniami i wycenami.",
      "Działamy z Banff w Aberdeenshire. Współpracujemy po polsku i angielsku z klientami z Wielkiej Brytanii oraz z zagranicy.",
    ],
    backgroundHeading: "Dlaczego nasze doświadczenie ma znaczenie",
    background: shared.background.pl as Pair[],
    processHeading: "Typowy projekt strony internetowej",
    process: shared.process.pl as Pair[],
    differentHeading: "Jak pracujemy",
    different: shared.different.pl as Pair[],
    contactCta: "Poproś o wycenę",
  },
};
