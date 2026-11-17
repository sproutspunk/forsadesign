type DueDiligenceCopy = {
  title: string;
  subtitle: string;
  intro: string;
  opening: string[];
  scopeTitle: string;
  scope: [string, string[]][];
  processTitle: string;
  steps: [string, string][];
  reportTitle: string;
  reportIntro: string;
  report: string[];
  reportNote: string;
  audienceTitle: string;
  audience: string[];
  whyTitle: string;
  why: string[];
  ctaTitle: string;
  closing: string[];
  cta: string;
  disclaimer: string;
};
export const dueDiligence: Record<"pl" | "en", DueDiligenceCopy> = {
  pl: {
    title: "Analiza Wiarygodności Kontrahentów i Ryzyka Biznesowego",
    subtitle: "Commercial Due Diligence & Counterparty Risk Assessment",
    intro: "Sprawdź, z kim zamierzasz prowadzić interesy, zanim podejmiesz zobowiązania.",
    opening: [
      "Nawiązanie współpracy handlowej, wybór dostawcy czy wejście na nowy rynek wymaga czegoś więcej niż atrakcyjnej oferty. Kluczowe jest ustalenie, czy potencjalny partner rzeczywiście dysponuje deklarowanymi zasobami, posiada odpowiednie zaplecze finansowe i operacyjne oraz czy jego zapewnienia znajdują potwierdzenie w faktach.",
      "Forsa Design oferuje niezależną analizę wiarygodności przedsiębiorstw i ocenę ryzyka handlowego, wspierając firmy w podejmowaniu świadomych decyzji biznesowych.",
    ],
    scopeTitle: "Zakres usług",
    scope: [
      [
        "Weryfikacja przedsiębiorstwa i struktury właścicielskiej",
        [
          "Sprawdzenie rejestracji, statusu prawnego i historii działalności.",
          "Identyfikacja członków zarządu, udziałowców i beneficjentów rzeczywistych.",
          "Analiza powiązań kapitałowych i osobowych z innymi przedsiębiorstwami.",
          "Weryfikacja dostępnych sprawozdań i dokumentów rejestrowych.",
          "Identyfikacja niezgodności i potencjalnych sygnałów ostrzegawczych.",
        ],
      ],
      [
        "Analiza wiarygodności handlowej",
        [
          "Weryfikacja deklarowanej pozycji rynkowej przedsiębiorstwa.",
          "Porównanie z rzeczywistymi konkurentami.",
          "Ocena skali działalności na podstawie dostępnych informacji.",
          "Weryfikacja deklaracji dotyczących klientów, partnerów i sieci dystrybucyjnej.",
          "Identyfikacja rozbieżności między przekazem marketingowym a możliwymi do potwierdzenia faktami.",
        ],
      ],
      [
        "Ocena kondycji finansowej i ryzyka kontrahenta",
        [
          "Analiza publicznie dostępnych sprawozdań finansowych.",
          "Ocena podstawowych wskaźników stabilności finansowej.",
          "Sprawdzenie dostępnych informacji o postępowaniach upadłościowych i likwidacyjnych.",
          "Identyfikacja potencjalnych zagrożeń związanych z płatnościami i zobowiązaniami.",
          "Ocena ryzyka handlowego wynikającego z kondycji finansowej kontrahenta.",
        ],
      ],
      [
        "Audyt obecności cyfrowej i zaplecza technologicznego",
        [
          "Analiza funkcjonalności i wydajności strony internetowej.",
          "Ocena działania serwisu na komputerach i urządzeniach mobilnych.",
          "Weryfikacja publicznie dostępnych informacji o infrastrukturze technologicznej.",
          "Ocena jakości platform sprzedażowych i marketplace.",
          "Porównanie deklarowanych możliwości technologicznych z rzeczywistym działaniem serwisu.",
          "Identyfikacja problemów mogących wpływać na sprzedaż, wiarygodność i obsługę klientów.",
        ],
      ],
      [
        "Weryfikacja dostawców i partnerów międzynarodowych",
        [
          "Sprawdzanie zagranicznych producentów, dostawców i dystrybutorów.",
          "Analiza wiarygodności pośredników handlowych.",
          "Weryfikacja obecności przedsiębiorstwa na deklarowanych rynkach.",
          "Kontrola dostępnych list sankcyjnych i ograniczeń handlowych.",
          "Identyfikacja ryzyk związanych z międzynarodowymi łańcuchami dostaw.",
          "Ocena potencjalnych zagrożeń przed rozpoczęciem negocjacji lub podpisaniem umowy.",
        ],
      ],
    ],
    processTitle: "Jak przebiega analiza?",
    steps: [
      [
        "Określenie celu",
        "Ustalamy, jakie przedsiębiorstwo lub przedsięwzięcie ma zostać zweryfikowane, jaki charakter ma planowana współpraca i które obszary wymagają szczególnej uwagi.",
      ],
      [
        "Gromadzenie i weryfikacja informacji",
        "Analizujemy dostępne rejestry przedsiębiorstw, dokumenty finansowe, informacje rynkowe, powiązania biznesowe oraz działalność cyfrową.",
      ],
      [
        "Identyfikacja ryzyka",
        "Porównujemy deklaracje kontrahenta z ustalonymi faktami. Wskazujemy niezgodności, potencjalne zagrożenia oraz informacje wymagające dodatkowego potwierdzenia.",
      ],
      [
        "Raport i rekomendacje",
        "Przygotowujemy uporządkowany raport zawierający wyniki analizy, ocenę zidentyfikowanych ryzyk i zalecenia dotyczące dalszej weryfikacji.",
      ],
    ],
    reportTitle: "Co otrzymuje klient?",
    reportIntro: "Poufny raport Commercial Due Diligence, obejmujący:",
    report: [
      "Podsumowanie najważniejszych ustaleń.",
      "Informacje o przedsiębiorstwie i jego strukturze właścicielskiej.",
      "Analizę wiarygodności deklaracji handlowych.",
      "Ocenę dostępnych danych finansowych.",
      "Wyniki analizy działalności internetowej, jeżeli objęto ją zakresem zlecenia.",
      "Wykaz zidentyfikowanych zagrożeń i niezgodności.",
      "Klasyfikację ryzyka wraz z uzasadnieniem.",
      "Źródła wykorzystanych informacji.",
      "Rekomendowane działania przed zawarciem umowy.",
    ],
    reportNote:
      "W raporcie wyraźnie rozróżniamy fakty potwierdzone, deklaracje niezweryfikowane i wnioski analityczne.",
    audienceTitle: "Dla kogo przeznaczona jest usługa?",
    audience: [
      "Przedsiębiorstwa handlujące maszynami i urządzeniami przemysłowymi.",
      "Importerzy i eksporterzy.",
      "Firmy poszukujące zagranicznych producentów i dostawców.",
      "Działy zakupów i zaopatrzenia.",
      "Dystrybutorzy i pośrednicy handlowi.",
      "Operatorzy platform e-commerce i marketplace.",
      "Przedsiębiorcy planujący współpracę z nowym kontrahentem.",
      "Firmy rozważające inwestycje lub ekspansję na zagraniczne rynki.",
    ],
    whyTitle: "Dlaczego Forsa Design?",
    why: [
      "Forsa Design łączy praktyczne doświadczenie w międzynarodowym handlu maszynami przemysłowymi, pozyskiwaniu dostawców i negocjacjach handlowych z wiedzą dotyczącą technologii internetowych, platform sprzedażowych i systemów biznesowych.",
      "Takie połączenie pozwala analizować przedsiębiorstwa nie tylko przez pryzmat dokumentów rejestrowych i finansowych, ale również ich rzeczywistej obecności rynkowej, sposobu prowadzenia działalności oraz funkcjonowania infrastruktury cyfrowej.",
      "Nie ograniczamy się do sprawdzenia, czy firma istnieje. Analizujemy również, czy jej deklaracje biznesowe znajdują potwierdzenie w dostępnych dowodach.",
      "Naszym celem jest dostarczenie klientowi informacji, które pomagają ograniczyć ryzyko finansowe, operacyjne i reputacyjne.",
    ],
    ctaTitle: "Sprawdź kontrahenta przed podjęciem decyzji",
    closing: [
      "Nie każda atrakcyjna propozycja handlowa oznacza rzeczywistą okazję biznesową. Weryfikacja potencjalnego partnera może ujawnić okoliczności, które nie są widoczne w materiałach marketingowych, ofertach ani podczas wstępnych negocjacji.",
      "Zanim powierzysz kontrahentowi pieniądze, kontakty handlowe, technologię lub reputację swojej firmy, poznaj fakty.",
      "Skontaktuj się z Forsa Design, aby omówić zakres indywidualnej analizy.",
    ],
    cta: "Omów zakres analizy",
    disclaimer:
      "Analizy przygotowywane są na podstawie legalnie dostępnych informacji i źródeł objętych uzgodnionym zakresem zlecenia. Usługa nie stanowi audytu ustawowego, opinii prawnej ani regulowanego doradztwa finansowego. Wyniki analizy nie gwarantują przyszłej wypłacalności ani rzetelności kontrahenta.",
  },
  en: {
    title: "Commercial Due Diligence & Counterparty Risk Assessment",
    subtitle: "Business credibility and commercial risk analysis",
    intro: "Check who you are doing business with before making a commitment.",
    opening: [
      "Choosing a supplier, establishing a commercial relationship or entering a new market requires more than an attractive offer. You need to establish whether a prospective partner has the resources, financial strength and operational capacity it claims, and whether its assurances are supported by facts.",
      "Forsa Design provides independent business credibility analysis and commercial risk assessment to support informed business decisions.",
    ],
    scopeTitle: "Scope of services",
    scope: [
      [
        "Company and ownership verification",
        [
          "Check registration, legal status and trading history.",
          "Identify directors, shareholders and ultimate beneficial owners.",
          "Analyse ownership and personal links with other businesses.",
          "Review available reports and registration documents.",
          "Identify inconsistencies and potential warning signs.",
        ],
      ],
      [
        "Commercial credibility analysis",
        [
          "Verify the company’s claimed market position.",
          "Compare it with actual competitors.",
          "Assess the scale of operations using available information.",
          "Verify claims about customers, partners and distribution networks.",
          "Identify gaps between marketing claims and verifiable facts.",
        ],
      ],
      [
        "Financial condition and counterparty risk",
        [
          "Analyse publicly available financial statements.",
          "Assess basic indicators of financial stability.",
          "Check available information about insolvency and liquidation proceedings.",
          "Identify potential payment and liability risks.",
          "Assess commercial risk arising from the counterparty’s financial condition.",
        ],
      ],
      [
        "Digital presence and technology review",
        [
          "Analyse website functionality and performance.",
          "Assess desktop and mobile usability.",
          "Verify publicly available information about technology infrastructure.",
          "Assess the quality of sales platforms and marketplaces.",
          "Compare claimed technical capabilities with actual website behaviour.",
          "Identify issues that may affect sales, credibility and customer service.",
        ],
      ],
      [
        "International supplier and partner verification",
        [
          "Check overseas manufacturers, suppliers and distributors.",
          "Analyse the credibility of trade intermediaries.",
          "Verify presence in claimed markets.",
          "Check available sanctions lists and trade restrictions.",
          "Identify international supply chain risks.",
          "Assess potential risks before negotiations or contract signing.",
        ],
      ],
    ],
    processTitle: "How does the analysis work?",
    steps: [
      [
        "Define the objective",
        "We establish which company or venture needs to be verified, the nature of the planned relationship and the areas requiring particular attention.",
      ],
      [
        "Gather and verify information",
        "We analyse available company registers, financial documents, market information, business connections and digital operations.",
      ],
      [
        "Identify risks",
        "We compare the counterparty’s claims with established facts, highlighting inconsistencies, potential risks and information requiring further confirmation.",
      ],
      [
        "Report and recommendations",
        "We prepare a structured report with findings, an assessment of identified risks and recommendations for further verification.",
      ],
    ],
    reportTitle: "What do you receive?",
    reportIntro: "A confidential Commercial Due Diligence report covering:",
    report: [
      "An executive summary of key findings.",
      "Company and ownership information.",
      "An assessment of commercial claims.",
      "A review of available financial data.",
      "Digital operations findings, where included in the agreed scope.",
      "Identified risks and inconsistencies.",
      "Risk classification with supporting reasons.",
      "Sources used in the analysis.",
      "Recommended actions before entering a contract.",
    ],
    reportNote:
      "The report clearly distinguishes confirmed facts, unverified claims and analytical conclusions.",
    audienceTitle: "Who is this service for?",
    audience: [
      "Industrial machinery and equipment businesses.",
      "Importers and exporters.",
      "Companies seeking overseas manufacturers and suppliers.",
      "Purchasing and procurement teams.",
      "Distributors and trade intermediaries.",
      "E-commerce and marketplace operators.",
      "Businesses considering a new counterparty.",
      "Companies considering investment or expansion into overseas markets.",
    ],
    whyTitle: "Why Forsa Design?",
    why: [
      "Forsa Design combines practical experience in international industrial machinery trading, supplier sourcing and commercial negotiations with knowledge of web technology, sales platforms and business systems.",
      "This enables us to assess companies through registration and financial documents, their actual market presence, their operating practices and the functioning of their digital infrastructure.",
      "We check whether a company exists and whether its business claims are supported by available evidence.",
      "Our aim is to provide information that helps clients reduce financial, operational and reputational risk.",
    ],
    ctaTitle: "Check your counterparty before deciding",
    closing: [
      "An attractive commercial proposal does not always represent a sound business opportunity. Verifying a potential partner can reveal circumstances that are not visible in marketing materials, offers or initial negotiations.",
      "Before entrusting a counterparty with money, business contacts, technology or your company’s reputation, establish the facts.",
      "Contact Forsa Design to discuss the scope of an individual assessment.",
    ],
    cta: "Discuss your assessment",
    disclaimer:
      "Analyses are based on legally available information and sources within the agreed scope of the engagement. This service is not a statutory audit, legal opinion or regulated financial advice. Findings do not guarantee a counterparty’s future solvency or integrity.",
  },
};
export const dueDiligencePath = (lang: "pl" | "en") =>
  `/${lang}/services/commercial-due-diligence/`;
export function dueDiligenceSchema(lang: "pl" | "en") {
  const c = dueDiligence[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    serviceType: "Commercial Due Diligence & Counterparty Risk Assessment",
    description: c.intro,
    url: "https://forsadesign.co.uk" + dueDiligencePath(lang),
    provider: { "@type": "Organization", name: "Forsa Design", url: "https://forsadesign.co.uk/" },
  };
}
