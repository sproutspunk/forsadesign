export const faqCategories = [
  { id: "scope", pl: "Oferta i technologia", en: "Services and technology" },
  { id: "budget", pl: "Wycena i płatności", en: "Pricing and payments" },
  { id: "process", pl: "Przebieg projektu", en: "Project delivery" },
  { id: "content", pl: "Treści i migracja", en: "Content and migration" },
  { id: "quality", pl: "SEO i dostępność", en: "SEO and accessibility" },
  { id: "support", pl: "Bezpieczeństwo i utrzymanie", en: "Security and support" },
  { id: "branding", pl: "Branding i konfiguratory 3D", en: "Branding and 3D configurators" },
  { id: "verification", pl: "Weryfikacja kontrahentów", en: "Counterparty checks" },
] as const;
export type FaqCategory = (typeof faqCategories)[number]["id"];
export type FaqItem = { id: string; category: FaqCategory; q: string; a: string };
type BilingualItem = {
  id: string;
  category: FaqCategory;
  pl: [string, string];
  en: [string, string];
};

// Keep the first five IDs compatible with existing shared FAQ links.
const questions: BilingualItem[] = [
  {
    id: "faq-1",
    category: "scope",
    pl: [
      "Czy używacie WordPressa lub gotowych szablonów?",
      "Nie. Budujemy dedykowane strony i systemy webowe bez WordPressa, kreatorów typu Elementor i gotowych szablonów stron. Dobieramy technologię do funkcji, wydajności i dalszego utrzymania projektu.",
    ],
    en: [
      "Do you use WordPress or ready-made templates?",
      "No. We build custom websites and web systems without WordPress, Elementor-style page builders or ready-made website templates. We select technology around the required functionality, performance and ongoing maintenance.",
    ],
  },
  {
    id: "faq-2",
    category: "process",
    pl: [
      "Ile trwa realizacja projektu?",
      "Typowa strona firmowa może zająć około dziewięciu tygodni, a dedykowany katalog lub system zamówień B2B zwykle wymaga więcej czasu. Harmonogram ustalamy po uzgodnieniu specyfikacji i otrzymaniu materiałów oraz dostępów. Bardziej złożone projekty wyceniamy i planujemy indywidualnie. Termin wiążący wymaga pisemnego uzgodnienia.",
    ],
    en: [
      "How long does a project take?",
      "A typical business website may take around nine weeks; a custom B2B catalogue or ordering system usually takes longer. We agree the schedule once the specification, content and required access are available. More complex projects are scoped individually. A binding deadline must be agreed in writing.",
    ],
  },
  {
    id: "faq-3",
    category: "content",
    pl: [
      "Co jeśli nie mamy profesjonalnych zdjęć?",
      "Sprawdzimy materiały, które już macie, i wskażemy, czego brakuje. W przemysłowym B2B autentyczne zdjęcia zakładu, maszyn i realizacji często lepiej pokazują możliwości firmy niż ogólne zdjęcia stockowe. Zakup zdjęć lub sesję trzeba uzgodnić osobno.",
    ],
    en: [
      "What if we do not have professional photographs?",
      "We review your existing material and identify what is missing. In industrial B2B, authentic photographs of facilities, equipment and completed work often communicate capabilities better than generic stock imagery. Photography or image licensing needs to be agreed separately.",
    ],
  },
  {
    id: "faq-4",
    category: "support",
    pl: [
      "Czy oferujecie wsparcie po wdrożeniu?",
      "Tak. Dalsze wsparcie jest opcjonalną, oddzielnie wycenianą usługą. Może obejmować utrzymanie techniczne, hosting, aktualizacje, kopie zapasowe i uzgodnione zmiany. Zakres, czas reakcji i odpowiedzialność określamy w ustaleniach dotyczących obsługi.",
    ],
    en: [
      "Do you offer support after launch?",
      "Yes. Ongoing support is optional and quoted separately. It can cover technical maintenance, hosting, updates, backups and agreed changes. Scope, response arrangements and responsibilities are defined in the support agreement.",
    ],
  },
  {
    id: "faq-5",
    category: "scope",
    pl: [
      "Czy możecie zintegrować stronę z naszymi systemami?",
      "Tak, jeśli system zewnętrzny udostępnia odpowiednie API lub inny uzgodniony sposób wymiany danych. Najpierw sprawdzamy dokumentację, dostęp, uprawnienia, limity i koszty dostawcy. Samo istnienie systemu nie oznacza, że każda integracja będzie możliwa.",
    ],
    en: [
      "Can you integrate the website with our existing systems?",
      "Yes, where the external system provides a suitable API or another agreed data exchange method. We first assess documentation, access, permissions, usage limits and provider costs. Not every integration is feasible simply because a system exists.",
    ],
  },
  {
    id: "faq-services",
    category: "scope",
    pl: [
      "Jakie projekty realizuje Forsa Design?",
      "Tworzymy strony dla firm przemysłowych i technicznych, katalogi i systemy zamówień B2B, portale klientów, narzędzia webowe i integracje API. Oferujemy też logo i identyfikację wizualną, konfiguratory 3D oraz analizę wiarygodności kontrahentów. Konkretne elementy zamówienia określa oferta.",
    ],
    en: [
      "What projects does Forsa Design deliver?",
      "We build industrial and technical business websites, B2B catalogues and ordering systems, client portals, web tools and API integrations. Our services also include logos and visual identity, 3D configurators and counterparty assessments. The quotation defines the deliverables included in each engagement.",
    ],
  },
  {
    id: "faq-location",
    category: "scope",
    pl: [
      "Czy pracujecie tylko z firmami ze Szkocji?",
      "Działamy z Banff w Aberdeenshire i współpracujemy z klientami z Wielkiej Brytanii oraz z zagranicy. Projekt można prowadzić zdalnie po polsku lub angielsku. Sposób komunikacji i ewentualne spotkania ustalamy na początku.",
    ],
    en: [
      "Do you work only with businesses in Scotland?",
      "We are based in Banff, Aberdeenshire, and work with clients in the UK and internationally. Projects can be managed remotely in English or Polish. Communication arrangements and any meetings are agreed at the start.",
    ],
  },
  {
    id: "faq-ai",
    category: "scope",
    pl: [
      "Czy korzystacie z AI podczas tworzenia strony?",
      "Tak. Narzędzia wspomagane przez AI pomagają w odpowiednich częściach developmentu. Za architekturę, konfigurację, przegląd kodu, testy i końcowe wdrożenie odpowiadamy my. Użycie AI nie zastępuje sprawdzenia działania projektu.",
    ],
    en: [
      "Do you use AI when building a website?",
      "Yes. AI-assisted tools support appropriate parts of development. We remain responsible for architecture, configuration, code review, testing and the final implementation. AI use does not replace checking how the project actually works.",
    ],
  },
  {
    id: "faq-price",
    category: "budget",
    pl: [
      "Ile kosztuje strona lub system webowy?",
      "Każdy projekt wyceniamy na podstawie zakresu: struktury, funkcji, treści, liczby języków i integracji. Wycena powinna wskazywać, co obejmuje cena i jakie koszty są oddzielne. Formularz wyceny pomaga zebrać wymagania, ale nie zastępuje zaakceptowanej oferty.",
    ],
    en: [
      "How much does a website or web system cost?",
      "Every project is quoted around its structure, functionality, content, languages and integrations. The quotation should identify what the price includes and which costs are separate. Our quote form helps gather requirements but does not replace an accepted quotation.",
    ],
  },
  {
    id: "faq-quote-brief",
    category: "budget",
    pl: [
      "Co przygotować do wyceny?",
      "Opiszcie firmę, odbiorców i cel projektu. Przydadzą się adres obecnej strony, lista wymaganych funkcji i języków, przykłady realizacji, oczekiwany termin oraz orientacyjny budżet. Przy integracjach potrzebna będzie dokumentacja systemów. Nie musicie mieć gotowej specyfikacji technicznej.",
    ],
    en: [
      "What should we prepare for a quotation?",
      "Describe your business, audience and project goals. Useful information includes the current website, required features and languages, reference projects, target timing and an indicative budget. Integrations require system documentation. A finished technical specification is not necessary to start the conversation.",
    ],
  },
  {
    id: "faq-deposit",
    category: "budget",
    pl: [
      "Jak wygląda zaliczka i harmonogram płatności?",
      "Zaliczkę i kolejne płatności określamy w ofercie lub umowie. Jeśli uzgodniono zaliczkę 25%, rozpoczęcie prac zwykle wymaga jej otrzymania oraz materiałów i dostępów potrzebnych do startu. Nie zakładamy jednego harmonogramu dla wszystkich projektów.",
    ],
    en: [
      "How do deposits and payment schedules work?",
      "The quotation or project agreement sets the deposit and subsequent payments. Where a 25% deposit is agreed, work normally starts after payment and receipt of the content and access needed to begin. One payment schedule does not apply automatically to every project.",
    ],
  },
  {
    id: "faq-extra-costs",
    category: "budget",
    pl: [
      "Jakie koszty mogą wystąpić poza ceną projektu?",
      "Mogą to być domena, hosting, poczta, płatne fonty i zdjęcia, opłaty operatora płatności, usługi API i dalsze utrzymanie. Wskazujemy je w zakresie projektu, gdy są znane. Cenniki i limity usług zewnętrznych zależą od ich dostawców.",
    ],
    en: [
      "Which costs may be separate from the project price?",
      "These may include a domain, hosting, email, licensed fonts or images, payment processing, APIs and ongoing maintenance. We identify them in the project scope when known. Third-party prices and usage limits depend on the providers.",
    ],
  },
  {
    id: "faq-start",
    category: "process",
    pl: [
      "Jak zaczynamy współpracę?",
      "Najpierw omawiamy cel, odbiorców i wymagania. Następnie uzgadniamy zakres, wycenę, odpowiedzialność za materiały i harmonogram. Prace rozpoczynają się po akceptacji ustaleń i spełnieniu uzgodnionych warunków startu.",
    ],
    en: [
      "How do we start working together?",
      "We first discuss goals, audience and requirements. We then agree scope, pricing, content responsibilities and a schedule. Work begins once the agreement is accepted and the agreed starting conditions have been met.",
    ],
  },
  {
    id: "faq-revisions",
    category: "process",
    pl: [
      "Ile poprawek obejmuje projekt?",
      "Liczbę etapów akceptacji i zakres poprawek ustalamy w ofercie. Poprawka w ramach uzgodnionej funkcji to co innego niż nowa funkcja lub zmiana założeń. Dodatkowe prace omawiamy i wyceniamy przed ich wykonaniem.",
    ],
    en: [
      "How many revisions are included?",
      "The quotation defines review stages and the revision allowance. Refining an agreed feature is different from adding a feature or changing the brief. Additional work is discussed and priced before it is carried out.",
    ],
  },
  {
    id: "faq-delays",
    category: "process",
    pl: [
      "Co może przesunąć termin realizacji?",
      "Najczęściej brak materiałów, opóźnione akceptacje, niedostępne dostępy do integracji lub zmiana zakresu. Gdy pojawia się przeszkoda, ustalamy jej wpływ na plan. Przyspieszonego terminu nie obiecujemy bez sprawdzenia wymagań i dostępności.",
    ],
    en: [
      "What can affect the delivery date?",
      "Missing content, delayed approvals, unavailable integration access and scope changes can affect delivery. When a dependency changes, we assess its effect on the schedule. We do not promise an accelerated deadline without reviewing requirements and availability.",
    ],
  },
  {
    id: "faq-launch",
    category: "process",
    pl: [
      "Jak wygląda testowanie i uruchomienie strony?",
      "Sprawdzamy funkcje objęte zakresem, formularze, działanie na odpowiednich urządzeniach i przeglądarkach, dostępność, wydajność i podstawy SEO. Przy migracji ustalamy przekierowania i sposób przełączenia. Testy ograniczają ryzyko, ale nie są gwarancją braku przyszłych awarii.",
    ],
    en: [
      "How do testing and launch work?",
      "We check agreed features, forms, relevant devices and browsers, accessibility, performance and SEO fundamentals. For a migration, redirects and the switchover are planned. Testing reduces risk but does not guarantee that future faults or outages cannot occur.",
    ],
  },
  {
    id: "faq-content",
    category: "content",
    pl: [
      "Kto przygotowuje teksty i materiały?",
      "Uzgadniamy to przed rozpoczęciem prac. Klient dostarcza lub zatwierdza informacje o firmie, produktach, usługach i uprawnienia do materiałów. Przygotowanie lub redakcja treści wymaga wskazania w zakresie. Parametrów technicznych i certyfikatów nie uzupełniamy na podstawie domysłów.",
    ],
    en: [
      "Who provides the copy and project materials?",
      "Responsibilities are agreed before work begins. The client supplies or approves business, product and service information and the rights to use materials. Copywriting or editing must be included in the scope. We do not invent technical specifications or certifications.",
    ],
  },
  {
    id: "faq-multilingual",
    category: "content",
    pl: [
      "Czy tworzycie strony wielojęzyczne?",
      "Tak. Ustalamy języki, strukturę adresów, przełączanie wersji i sposób aktualizacji treści. Tłumaczenia branżowe powinny zostać sprawdzone przez osobę znającą terminologię. Koszt kolejnych wersji językowych i utrzymania ich zgodności określa oferta.",
    ],
    en: [
      "Do you build multilingual websites?",
      "Yes. We agree languages, URL structure, language switching and how translations will be updated. Specialist translations should be checked by someone familiar with the terminology. Additional language versions and their ongoing consistency are scoped in the quotation.",
    ],
  },
  {
    id: "faq-migration",
    category: "content",
    pl: [
      "Czy możecie zastąpić naszą obecną stronę?",
      "Tak, po przeglądzie treści, adresów URL, funkcji i dostępów. Ustalamy, co przenosimy, co przebudowujemy i jakie przekierowania są potrzebne. Celem jest uporządkowana migracja; zachowania wszystkich pozycji w wyszukiwarce nie można zagwarantować.",
    ],
    en: [
      "Can you replace our existing website?",
      "Yes, after reviewing content, URLs, functionality and available access. We agree what to migrate, what to rebuild and which redirects are needed. The aim is an orderly migration; retaining every search ranking cannot be guaranteed.",
    ],
  },
  {
    id: "faq-editing",
    category: "content",
    pl: [
      "Czy po wdrożeniu będziemy mogli sami zmieniać treści?",
      "Jeśli potrzebujecie samodzielnej edycji, uwzględniamy ją w specyfikacji. Może to być dedykowany panel dla wskazanych treści. Strona bez WordPressa nie oznacza automatycznie ani braku panelu, ani panelu do dowolnej zmiany całego systemu.",
    ],
    en: [
      "Can we edit the content ourselves after launch?",
      "If self-service editing is needed, it is included in the specification. This may mean a dedicated panel for selected content. Building without WordPress does not automatically mean there is no editor, or that every part of the system can be changed through one.",
    ],
  },
  {
    id: "faq-seo",
    category: "quality",
    pl: [
      "Czy SEO jest częścią projektu?",
      "Zakres technicznego SEO ustalamy w ofercie. Może obejmować strukturę strony, metadane, indeksowanie, mapę witryny, dane strukturalne i przekierowania. Stała strategia treści, pozyskiwanie linków i kampanie wymagają osobnego zakresu. Nie gwarantujemy pierwszego miejsca w Google.",
    ],
    en: [
      "Is SEO included in the project?",
      "The quotation defines technical SEO work. It can cover structure, metadata, indexing, sitemaps, structured data and redirects. Ongoing content strategy, link acquisition and campaigns require a separate scope. We do not guarantee first place in Google.",
    ],
  },
  {
    id: "faq-ai-search",
    category: "quality",
    pl: [
      "Czy strona może pojawiać się w odpowiedziach wyszukiwarek AI?",
      "Czytelna treść, poprawna struktura, dostępność dla robotów i spójne informacje pomagają systemom zrozumieć stronę. Nie gwarantują cytowania ani widoczności w odpowiedziach AI. Sam plik llms.txt lub dane FAQ nie zapewniają takiego efektu; Google nie wyświetla już rozszerzonych wyników FAQ.",
    ],
    en: [
      "Can the website appear in AI search answers?",
      "Clear content, sound structure, crawlability and consistent information help systems understand a website. They do not guarantee citations or visibility in AI answers. An llms.txt file or FAQ markup alone does not secure that outcome; Google no longer displays FAQ rich results.",
    ],
  },
  {
    id: "faq-accessibility",
    category: "quality",
    pl: [
      "Jak podchodzicie do dostępności?",
      "Uwzględniamy semantyczny HTML, klawiaturę, fokus, etykiety formularzy, kontrast i zachowanie na różnych ekranach. Docelowy poziom WCAG i zakres testów uzgadniamy dla projektu. Wynik automatycznego skanera nie zastępuje testów ręcznych ani nie stanowi certyfikatu zgodności prawnej.",
    ],
    en: [
      "How do you approach accessibility?",
      "We consider semantic HTML, keyboard use, focus, form labels, contrast and responsive behaviour. The target WCAG level and testing scope are agreed for each project. An automated score does not replace manual testing or certify legal compliance.",
    ],
  },
  {
    id: "faq-performance",
    category: "quality",
    pl: [
      "Czy gwarantujecie wynik 100 w PageSpeed?",
      "Nie. Optymalizujemy wydajność i sprawdzamy projekt w uzgodnionych warunkach, ale wynik zależy też od urządzenia, sieci, treści i usług zewnętrznych. Wynik laboratoryjny nie jest tym samym co rzeczywiste dane użytkowników ani stała gwarancja szybkości.",
    ],
    en: [
      "Do you guarantee a PageSpeed score of 100?",
      "No. We optimise performance and test under agreed conditions, but scores also depend on devices, networks, content and external services. A laboratory score is different from real-user data and is not a permanent speed guarantee.",
    ],
  },
  {
    id: "faq-mobile",
    category: "quality",
    pl: [
      "Czy strona będzie działać na telefonach?",
      "Tak, projektujemy responsywnie i sprawdzamy kluczowe ścieżki na odpowiednich szerokościach ekranu. Przy rozbudowanych narzędziach ustalamy wspierane przeglądarki i ograniczenia urządzeń. Interfejs mobilny powinien umożliwiać wykonanie zadania, a nie tylko pomniejszać wersję komputerową.",
    ],
    en: [
      "Will the website work on mobile?",
      "Yes. We design responsively and test key journeys at relevant screen sizes. Complex tools need agreed browser support and device limitations. The mobile interface should let people complete their task rather than merely shrink the desktop layout.",
    ],
  },
  {
    id: "faq-ownership",
    category: "support",
    pl: [
      "Do kogo należą kod, domena i projekt?",
      "Prawa i zasady przekazania określa umowa. Co do zasady prawa do dedykowanych prac przechodzą po pełnej zapłacie, z uwzględnieniem licencji bibliotek, fontów i innych materiałów zewnętrznych. Własność domeny, kont i dostępów ustalamy jawnie; nie wprowadzamy celowego uzależnienia od wykonawcy.",
    ],
    en: [
      "Who owns the code, domain and project?",
      "The agreement defines rights and handover arrangements. Rights in custom work generally transfer after full payment, subject to library, font and other third-party licences. Domain ownership, accounts and access are agreed explicitly; we do not deliberately introduce vendor lock-in.",
    ],
  },
  {
    id: "faq-hosting",
    category: "support",
    pl: [
      "Czy musimy kupić hosting i utrzymanie u Was?",
      "Nie wymagamy stałej obsługi, jeśli nie została uzgodniona jako część projektu. Hosting i odpowiedzialność za wdrożenie zależą od technologii i ustaleń. Przy innym dostawcy trzeba sprawdzić zgodność środowiska, koszty i sposób przejęcia obsługi.",
    ],
    en: [
      "Must we buy hosting and maintenance from you?",
      "Ongoing support is not required unless specifically agreed as part of the project. Hosting and deployment responsibilities depend on the technology and agreement. Another provider’s environment, costs and handover arrangements need to be checked for compatibility.",
    ],
  },
  {
    id: "faq-security",
    category: "support",
    pl: [
      "Jak zabezpieczacie strony i dane klientów?",
      "Dobieramy zabezpieczenia do projektu: połączenia HTTPS, kontrolę dostępu, walidację danych i konfigurację usług. Systemy z kontami, dokumentami i płatnościami wymagają osobnego określenia uprawnień i zasad przechowywania danych. Żadnej strony nie można zagwarantować jako całkowicie odpornej na ataki.",
    ],
    en: [
      "How do you protect websites and customer data?",
      "Controls are selected for the project, including HTTPS, access control, input validation and service configuration. Accounts, documents and payments require defined permissions and data retention arrangements. No website can be guaranteed completely immune to attacks.",
    ],
  },
  {
    id: "faq-privacy",
    category: "support",
    pl: [
      "Czy pomagacie z cookies, analityką i prywatnością?",
      "Możemy wdrożyć uzgodnione mechanizmy zgód, analitykę oraz wymagane technicznie ustawienia. Obowiązki administratora danych, treści dokumentów i podstawy prawne wymagają dopasowania do działalności klienta. Nie zastępujemy doradcy prawnego, a sam baner cookies nie zapewnia pełnej zgodności.",
    ],
    en: [
      "Can you help with cookies, analytics and privacy?",
      "We can implement agreed consent controls, analytics and technical settings. Controller responsibilities, privacy documents and legal bases must reflect the client’s business. We do not replace legal advice, and a cookie banner alone does not establish full compliance.",
    ],
  },
  {
    id: "faq-backups",
    category: "support",
    pl: [
      "Kto odpowiada za kopie zapasowe i awarie?",
      "Ustalamy to w zakresie hostingu lub wsparcia. Dla systemu z bazą i plikami trzeba określić, co jest kopiowane, jak długo przechowujemy kopie i jak sprawdzamy odtworzenie. Nie zakładamy, że sam hosting zapewnia kopię wszystkich danych lub całodobową obsługę.",
    ],
    en: [
      "Who handles backups and outages?",
      "Responsibilities are defined in the hosting or support scope. Systems with databases and files need agreed backup coverage, retention and restore checks. Hosting alone should not be assumed to include backups of all data or round-the-clock support.",
    ],
  },
  {
    id: "faq-branding",
    category: "branding",
    pl: [
      "Co obejmuje branding i identyfikacja wizualna?",
      "Zakres może obejmować projekt logo, paletę kolorów, dobór typografii i zasady stosowania identyfikacji na stronie, w aplikacji i materiałach firmowych. Liczbę wariantów, poprawki, formaty plików i prawa ustalamy w ofercie. Ta usługa dotyczy identyfikacji wizualnej.",
    ],
    en: [
      "What does branding and visual identity include?",
      "The scope can include logo design, a colour palette, typography and usage guidelines for websites, applications and business materials. Concepts, revisions, file formats and rights are agreed in the quotation. This service covers visual identity.",
    ],
  },
  {
    id: "faq-brand-colours",
    category: "branding",
    pl: [
      "Na jakiej podstawie dobieracie kolory?",
      "Bierzemy pod uwagę charakter firmy, kontekst użycia, hierarchię elementów i kontrast. Badania nad preferencjami i skojarzeniami kolorów mogą stanowić inspirację, ale nie potwierdzają skuteczności konkretnej palety ani wzrostu sprzedaży. Przykłady z uzasadnieniem pokazujemy w portfolio Dach Systema i LinkLang.",
    ],
    en: [
      "How do you choose colours?",
      "We consider the business, usage context, visual hierarchy and contrast. Research on colour preferences and associations can inform design, but does not validate a particular palette or prove a sales increase. Our Dach Systema and LinkLang case studies show examples and rationale.",
    ],
  },
  {
    id: "faq-configurators",
    category: "branding",
    pl: [
      "Czy tworzycie konfiguratory produktów 3D?",
      "Tak. Możemy połączyć wybór wariantów, wymiarów i wyposażenia z podglądem 3D oraz przygotowaniem zapytania. Zakres wymaga reguł produktu i potwierdzonych danych od klienta. Wizualizacja nie zastępuje CAD, dokumentacji konstrukcyjnej ani akceptacji producenta.",
    ],
    en: [
      "Do you build 3D product configurators?",
      "Yes. We can connect variant, dimension and equipment choices with a 3D preview and enquiry preparation. The scope requires product rules and confirmed client data. A visualisation does not replace CAD, structural documentation or manufacturer approval.",
    ],
  },
  {
    id: "faq-configurator-prices",
    category: "branding",
    pl: [
      "Czy konfigurator może obliczać cenę i zapisywać projekt?",
      "Tak, jeśli zostanie to objęte specyfikacją i dostępne są odpowiednie dane. Ustalamy reguły wyceny, aktualność cen i sposób zapisu konfiguracji. Gdy danych nie da się potwierdzić, wynik powinien prowadzić do indywidualnej wyceny zamiast sugerować wiążącą cenę.",
    ],
    en: [
      "Can a configurator calculate prices and save a project?",
      "Yes, when included in the specification and supported by suitable data. We agree pricing rules, data freshness and configuration storage. Where pricing cannot be verified, the result should lead to an individual quotation rather than imply a binding price.",
    ],
  },
  {
    id: "faq-due-diligence",
    category: "verification",
    pl: [
      "Na czym polega weryfikacja kontrahenta?",
      "To niezależna analiza dostępnych informacji o przedsiębiorstwie i ryzyku handlowym. Zależnie od zakresu sprawdzamy rejestrację, strukturę właścicielską, deklaracje rynkowe, dokumenty finansowe i obecność cyfrową. Ustalamy firmę, kraj i pytania, na które raport ma odpowiedzieć.",
    ],
    en: [
      "What does a counterparty assessment involve?",
      "It is an independent assessment of available business information and commercial risk. Depending on scope, we review registration, ownership, market claims, financial documents and digital presence. The business, jurisdiction and questions the report should answer are agreed first.",
    ],
  },
  {
    id: "faq-verification-report",
    category: "verification",
    pl: [
      "Co otrzymamy po analizie kontrahenta?",
      "Uzgodniony raport przedstawiający ustalenia, źródła, rozbieżności, sygnały ostrzegawcze i ograniczenia analizy. Dostępność danych różni się między krajami i firmami. Brak informacji nie jest sam w sobie dowodem nieprawidłowości.",
    ],
    en: [
      "What do we receive after a counterparty assessment?",
      "An agreed report covering findings, sources, discrepancies, warning signs and limitations. Data availability differs across businesses and jurisdictions. Missing information is not in itself evidence of wrongdoing.",
    ],
  },
  {
    id: "faq-verification-limits",
    category: "verification",
    pl: [
      "Czy raport gwarantuje bezpieczeństwo współpracy?",
      "Nie. Raport wspiera ocenę ryzyka na podstawie dostępnych informacji z określonego momentu. Nie jest gwarancją wypłacalności, przyszłych płatności ani rzetelności partnera i nie zastępuje porady prawnej, audytu finansowego lub decyzji zarządu.",
    ],
    en: [
      "Does the report guarantee a safe business relationship?",
      "No. It supports risk assessment using information available at a particular time. It does not guarantee solvency, future payment or a partner’s conduct, and does not replace legal advice, a financial audit or management decisions.",
    ],
  },
];
export function getFaqItems(lang: "pl" | "en"): FaqItem[] {
  return questions.map(({ id, category, ...text }) => ({
    id,
    category,
    q: text[lang][0],
    a: text[lang][1],
  }));
}
