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
export type FaqItem = {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
  links: { label: string; href: string }[];
};
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
      "Czy korzystacie z WordPressa lub gotowych szablonów?",
      "Nie. Tworzymy dedykowane strony i aplikacje internetowe, których strukturę, interfejs i funkcje projektujemy z myślą o konkretnym przedsiębiorstwie. Korzystamy z bibliotek programistycznych, lecz nie opieramy realizacji na WordPressie, Elementorze ani gotowych szablonach stron. Takie podejście pozwala dostosować sposób prezentacji produktów i obsługi zapytań do procesów firmy.",
    ],
    en: [
      "Do you use WordPress or ready-made website templates?",
      "No. We develop custom websites and web applications whose structure, interface and functionality are designed for the business. We use software libraries, but do not base projects on WordPress, Elementor or ready-made website templates. This approach allows product presentation and enquiry handling to reflect the company’s actual workflows.",
    ],
  },
  {
    id: "faq-2",
    category: "process",
    pl: [
      "Ile trwa realizacja strony internetowej?",
      "Orientacyjny czas realizacji typowej strony firmowej wynosi około dziewięciu tygodni. Obejmuje analizę wymagań, opracowanie struktury i interfejsu, programowanie, wprowadzenie treści oraz testy przed publikacją. Katalogi B2B, portale klientów i integracje wymagają dodatkowej pracy nad danymi oraz logiką systemu, dlatego zwykle powstają dłużej. Na termin wpływa również dostępność materiałów i sprawność akceptacji kolejnych etapów.",
    ],
    en: [
      "How long does website development take?",
      "A typical business website takes approximately nine weeks. This covers requirements analysis, information structure and interface design, development, content entry and testing before launch. B2B catalogues, client portals and integrations usually take longer because they require additional work on data and application logic. Delivery also depends on the availability of content and timely review of each stage.",
    ],
  },
  {
    id: "faq-3",
    category: "content",
    pl: [
      "Jak przygotować materiały wizualne bez profesjonalnej sesji zdjęciowej?",
      "Punktem wyjścia są istniejące zdjęcia zakładu, urządzeń, zespołu i wykonanych realizacji. Ocenie podlegają ich ostrość, oświetlenie, rozdzielczość i przydatność dla odbiorcy. W branżach technicznych wartość dokumentacyjna autentycznej fotografii często przewyższa wartość dekoracyjną zdjęcia stockowego. Brakujące ujęcia można następnie uzupełnić na podstawie listy potrzeb, zamiast organizować sesję bez określonego celu.",
    ],
    en: [
      "How can visual material be prepared without a professional photo shoot?",
      "Existing photographs of facilities, equipment, the team and completed work provide a starting point. We assess sharpness, lighting, resolution and relevance to the audience. In technical industries, the documentary value of an authentic photograph often exceeds the decorative value of a stock image. A list of missing shots helps focus any further photography on specific needs.",
    ],
  },
  {
    id: "faq-4",
    category: "support",
    pl: [
      "Na czym polega wsparcie techniczne po wdrożeniu?",
      "Wsparcie techniczne służy utrzymaniu poprawnego działania opublikowanego systemu. Obejmuje takie zadania jak aktualizowanie zależności, diagnozowanie usterek, kontrola konfiguracji usług i obsługa kopii zapasowych. Rozbudowa funkcji jest odrębnym rodzajem pracy: zmienia możliwości systemu, zamiast jedynie utrzymywać jego dotychczasowe działanie. Stała obsługa pozostaje usługą opcjonalną.",
    ],
    en: [
      "What does technical support after launch involve?",
      "Technical support maintains the operation of the published system. Tasks include dependency updates, fault diagnosis, service configuration checks and backup management. Feature development is a separate activity: it extends the system’s capabilities rather than maintaining existing behaviour. Ongoing support is optional.",
    ],
  },
  {
    id: "faq-5",
    category: "scope",
    pl: [
      "Jak przebiega integracja strony z innymi systemami?",
      "Integracja umożliwia wymianę danych między stroną a systemem zewnętrznym, na przykład CRM, ERP lub operatorem płatności. Najpierw analizujemy dokumentację API, sposób uwierzytelniania i strukturę danych. Następnie określamy kierunek oraz częstotliwość synchronizacji, zasady obsługi błędów i system będący źródłem danych. Dzięki temu można ograniczyć ręczne przepisywanie informacji bez tworzenia sprzecznych rekordów.",
    ],
    en: [
      "How is a website integrated with other systems?",
      "An integration exchanges data between the website and an external service, such as a CRM, ERP or payment provider. We first examine API documentation, authentication and data structures. We then define synchronisation direction and frequency, error handling and the authoritative data source. This can reduce manual data entry while preventing conflicting records.",
    ],
  },
  {
    id: "faq-services",
    category: "scope",
    pl: [
      "Jakie rozwiązania tworzy Forsa Design?",
      "Tworzymy strony i systemy cyfrowe dla przemysłu, w tym katalogi techniczne, portale B2B oraz narzędzia do obsługi zapytań, wycen i zamówień. W ramach inżynierii 3D opracowujemy wizualizacje CAD, interaktywne modele produktów i konfiguratory. Oferujemy także identyfikację wizualną i weryfikację kontrahentów.",
    ],
    en: [
      "What solutions does Forsa Design develop?",
      "We develop industrial websites and digital systems, including technical catalogues, B2B portals and tools for managing enquiries, quotations and orders. Our 3D engineering work includes CAD visualisation, interactive product models and configurators. We also offer visual identity and commercial due diligence.",
    ],
  },
  {
    id: "faq-location",
    category: "scope",
    pl: [
      "Czy współpracujecie z firmami spoza Szkocji?",
      "Tak. Działamy w Banff, w hrabstwie Aberdeenshire, i obsługujemy przedsiębiorstwa z Wielkiej Brytanii oraz innych krajów. Współpraca może odbywać się zdalnie w języku polskim lub angielskim. Dokumentacja wymagań, prezentacje postępu prac i uporządkowane uwagi do projektu pozwalają prowadzić realizację bez konieczności regularnych spotkań stacjonarnych.",
    ],
    en: [
      "Do you work with businesses outside Scotland?",
      "Yes. We are based in Banff, Aberdeenshire, and work with businesses in the UK and other countries. Projects can be conducted remotely in Polish or English. Written requirements, progress presentations and consolidated project feedback allow delivery without regular in-person meetings.",
    ],
  },
  {
    id: "faq-ai",
    category: "scope",
    pl: [
      "Jaką rolę pełni sztuczna inteligencja w procesie tworzenia strony?",
      "Narzędzia sztucznej inteligencji wspomagają wybrane czynności programistyczne, między innymi przygotowanie fragmentów kodu i analizę możliwych rozwiązań. Wynik ich działania wymaga weryfikacji pod względem poprawności, bezpieczeństwa i zgodności z wymaganiami projektu. Za architekturę systemu, przegląd kodu, testy i wdrożenie odpowiadamy my. Automatyzacja części pracy nie przenosi odpowiedzialności na narzędzie.",
    ],
    en: [
      "What role does artificial intelligence play in website development?",
      "AI tools support selected development tasks, including drafting code and examining implementation options. Their output requires review for correctness, security and conformity with project requirements. We remain responsible for architecture, code review, testing and deployment. Automating part of the work does not transfer responsibility to the tool.",
    ],
  },
  {
    id: "faq-price",
    category: "budget",
    pl: [
      "Od czego zależy koszt strony lub aplikacji internetowej?",
      "Koszt wynika przede wszystkim z nakładu pracy projektowej i programistycznej. Zwiększają go między innymi rozbudowane modele danych, role użytkowników, płatności, integracje, migracja treści i dodatkowe wersje językowe. Dlatego prosta strona informacyjna i portal obsługujący zamówienia nie są porównywalnymi produktami. Nie stosujemy jednej ceny dla wszystkich realizacji; koszt obliczamy na podstawie listy funkcji i czynności potrzebnych do ich wdrożenia.",
    ],
    en: [
      "What determines the cost of a website or web application?",
      "Cost primarily reflects design and development effort. Complex data models, user roles, payments, integrations, content migration and additional languages increase that effort. An informational website and an ordering portal are therefore different products. We calculate the cost from the functions and implementation work required, rather than applying a single price to every project.",
    ],
  },
  {
    id: "faq-quote-brief",
    category: "budget",
    pl: [
      "Jakie informacje są potrzebne do oszacowania kosztu projektu?",
      "Najważniejsze są cel biznesowy, grupa odbiorców i czynności, które użytkownik ma wykonywać w systemie. Warto dołączyć adres obecnej strony, listę produktów lub usług, wymagane języki, planowany termin i orientacyjny budżet. Przy integracjach potrzebna jest dokumentacja istniejących systemów. Gotowa specyfikacja techniczna nie jest konieczna: wymagania można uporządkować na podstawie opisu działalności i problemów obecnego rozwiązania.",
    ],
    en: [
      "What information is needed to estimate a project?",
      "The key inputs are the business objective, intended audience and tasks users need to complete. Useful supporting information includes the existing website, products or services, required languages, target date and indicative budget. Integrations also require documentation of the existing systems. A finished technical specification is unnecessary; requirements can be developed from the business context and limitations of the current solution.",
    ],
  },
  {
    id: "faq-deposit",
    category: "budget",
    pl: [
      "Jak są ustalane płatności za realizację projektu?",
      "Warunki płatności określają wysokość zaliczki, terminy kolejnych rozliczeń i odpowiadające im etapy prac. Zaliczkę należy odróżnić od opłat eksploatacyjnych, takich jak hosting lub abonament usługi zewnętrznej. Nie podajemy jednej obowiązującej stawki procentowej, ponieważ harmonogram finansowy zależy od wielkości i czasu realizacji projektu. Konkretne kwoty i terminy klient otrzymuje przed rozpoczęciem prac.",
    ],
    en: [
      "How are project payments arranged?",
      "Payment terms specify the deposit, subsequent payment dates and associated delivery stages. A deposit is separate from operating expenses such as hosting or third-party subscriptions. There is no single mandatory percentage because the payment schedule depends on project size and duration. The client receives the actual amounts and due dates before work begins.",
    ],
  },
  {
    id: "faq-extra-costs",
    category: "budget",
    pl: [
      "Jakie są koszty eksploatacji strony po jej uruchomieniu?",
      "Podstawowe koszty eksploatacyjne obejmują domenę, hosting i pocztę elektroniczną. Dodatkowe opłaty mogą wynikać z używania płatnych API, licencji na materiały, usług wysyłki wiadomości lub obsługi płatności. Część z nich ma stałą wysokość, a część zależy od liczby użytkowników, transakcji lub przetwarzanych danych. Koszty utrzymania należy zatem rozpatrywać oddzielnie od jednorazowego kosztu wykonania systemu.",
    ],
    en: [
      "What are the operating costs after launch?",
      "Basic operating expenses include the domain, hosting and email. Additional charges may arise from paid APIs, licensed assets, messaging services or payment processing. Some charges are fixed; others depend on users, transactions or data volume. Operating costs should therefore be assessed separately from the one-off cost of developing the system.",
    ],
  },
  {
    id: "faq-start",
    category: "process",
    pl: [
      "Jak przebiega rozpoczęcie współpracy?",
      "Rozpoczynamy od analizy działalności firmy, odbiorców i problemu, który ma rozwiązać projekt. Na tej podstawie porządkujemy wymagania funkcjonalne, treści i zależności od systemów zewnętrznych. Wynikiem jest opis prac, harmonogram i podział odpowiedzialności za materiały oraz akceptacje. Po ich zatwierdzeniu przechodzimy do projektowania struktury i interfejsu.",
    ],
    en: [
      "How does a project begin?",
      "We begin by examining the business, its audience and the problem the project needs to address. We use this analysis to organise functional requirements, content and external-system dependencies. The outcome is a description of the work, a schedule and clear responsibilities for materials and approvals. Once these are accepted, structure and interface design can begin.",
    ],
  },
  {
    id: "faq-revisions",
    category: "process",
    pl: [
      "Jak rozróżniacie poprawkę od rozbudowy projektu?",
      "Poprawka doprecyzowuje rozwiązanie przyjęte w projekcie, na przykład układ sekcji lub sposób działania istniejącego formularza. Rozbudowa wprowadza nową funkcję, dodatkowy proces albo zmianę wcześniej zaakceptowanych założeń. Usunięcie błędu, przez który funkcja nie spełnia zatwierdzonych wymagań, stanowi odrębną kategorię. To rozróżnienie pozwala oceniać zmiany według ich rzeczywistego wpływu na pracę, zamiast każdą uwagę traktować jako nowe zamówienie.",
    ],
    en: [
      "How do you distinguish a revision from additional development?",
      "A revision refines an agreed solution, such as a section layout or an existing form. Additional development introduces a new function, workflow or change to previously accepted requirements. Fixing a defect that prevents a function from meeting those requirements is a separate category. This distinction allows changes to be assessed by their actual effect on the work rather than treating every comment as a new commission.",
    ],
  },
  {
    id: "faq-delays",
    category: "process",
    pl: [
      "Co najczęściej opóźnia realizację?",
      "Najczęstsze przyczyny to brak zatwierdzonych treści, przedłużające się akceptacje, niedostępna dokumentacja integracji i zmiany wymagań w trakcie programowania. Zależności te mają charakter sekwencyjny: bez danych o produkcie nie można rzetelnie zakończyć katalogu, a bez dostępu do API sprawdzić integracji. Wczesne przygotowanie materiałów i zbiorcze przekazywanie uwag ograniczają liczbę przestojów.",
    ],
    en: [
      "What most commonly delays delivery?",
      "Common causes include missing approved content, slow reviews, unavailable integration documentation and requirements that change during development. These dependencies are sequential: a catalogue cannot be completed accurately without product data, and an integration cannot be verified without API access. Preparing materials early and consolidating feedback reduces interruptions.",
    ],
  },
  {
    id: "faq-launch",
    category: "process",
    pl: [
      "Co sprawdzacie przed publikacją strony?",
      "Weryfikujemy działanie funkcji, formularzy, nawigacji i kluczowych procesów użytkownika. Kontrola obejmuje także układ na różnych ekranach, obsługę klawiaturą, wydajność oraz elementy technicznego SEO. W przypadku migracji sprawdzamy mapowanie starych adresów na nowe i przekierowania. Publikacja polega na przeniesieniu sprawdzonej wersji do środowiska produkcyjnego oraz kontroli jej działania pod docelową domeną.",
    ],
    en: [
      "What do you check before publishing a website?",
      "We verify functions, forms, navigation and key user workflows. Checks also cover layouts across screen sizes, keyboard operation, performance and technical SEO elements. Migrations require checking the mapping of old URLs to new ones and the corresponding redirects. Launch involves deploying the tested version to production and checking its operation under the live domain.",
    ],
  },
  {
    id: "faq-content",
    category: "content",
    pl: [
      "Kto odpowiada za przygotowanie i poprawność treści?",
      "Klient jest źródłem informacji o swojej działalności, ofercie i parametrach produktów. Na tej podstawie można opracować strukturę treści i ich redakcję, natomiast dane techniczne, certyfikaty i deklaracje wymagają potwierdzenia przez firmę. Materiały powinny również posiadać ustalone prawa do wykorzystania. Rozdzielenie redakcji językowej od weryfikacji merytorycznej ogranicza ryzyko opublikowania informacji niezgodnych ze stanem faktycznym.",
    ],
    en: [
      "Who is responsible for preparing and verifying content?",
      "The client provides information about its business, offer and product specifications. This information supports content structure and editing, while technical data, certifications and claims require confirmation by the business. Rights to use supplied materials must also be established. Separating language editing from factual verification reduces the risk of publishing inaccurate information.",
    ],
  },
  {
    id: "faq-multilingual",
    category: "content",
    pl: [
      "Na czym polega prawidłowe przygotowanie strony wielojęzycznej?",
      "Strona wielojęzyczna wymaga odrębnych adresów dla wersji językowych, spójnej nawigacji i oznaczeń pozwalających wyszukiwarkom rozpoznać język treści. Tłumaczenie obejmuje również formularze, komunikaty systemowe i elementy interfejsu. W branżach technicznych szczególne znaczenie ma jednolita terminologia. Aktualizacja produktu lub usługi powinna być odzwierciedlana we wszystkich wersjach językowych, aby odbiorcy otrzymywali te same informacje.",
    ],
    en: [
      "What does a properly implemented multilingual website require?",
      "A multilingual website needs separate language URLs, consistent navigation and signals that help search engines identify each version. Translation also covers forms, system messages and interface controls. Consistent terminology is particularly important in technical industries. Changes to products or services should be reflected across language versions so that audiences receive equivalent information.",
    ],
  },
  {
    id: "faq-migration",
    category: "content",
    pl: [
      "Jak przebiega zastąpienie istniejącej strony nowym rozwiązaniem?",
      "Migrację rozpoczyna inwentaryzacja treści, adresów i funkcji obecnej strony. Następnie określamy, które elementy zachować, zaktualizować lub usunąć. Zmiana adresów wymaga przekierowań, aby użytkownicy i wyszukiwarki mogli dotrzeć do właściwych podstron. Po uruchomieniu nowej wersji sprawdza się między innymi błędy dostępu, indeksowanie i działanie formularzy; ruch organiczny może zmieniać się w okresie ponownej oceny strony przez wyszukiwarkę.",
    ],
    en: [
      "How is an existing website replaced?",
      "Migration begins with an inventory of current content, URLs and functions. We then identify what to retain, revise or remove. URL changes require redirects so that users and search engines reach the appropriate pages. After launch, checks include access errors, indexing and form operation; organic traffic may fluctuate while search engines reassess the site.",
    ],
  },
  {
    id: "faq-editing",
    category: "content",
    pl: [
      "Jak można samodzielnie aktualizować treści na stronie?",
      "Samodzielną edycję umożliwia panel zarządzania treścią. Może on udostępniać określone pola, na przykład opisy usług, parametry produktów, zdjęcia lub aktualności, bez ingerencji w kod aplikacji. Ograniczenie edycji do uporządkowanych danych pomaga zachować spójność układu i zapobiega przypadkowemu uszkodzeniu strony. Brak WordPressa nie wyklucza takiego panelu; jego obecność i funkcje wynikają z architektury konkretnego systemu.",
    ],
    en: [
      "How can website content be updated without editing code?",
      "A content management panel can expose selected fields, such as service descriptions, product specifications, images or news. Restricting editing to structured data helps preserve layout consistency and prevents accidental damage to the site. A custom website can provide this facility without WordPress; the availability and functions of its editor depend on the system architecture.",
    ],
  },
  {
    id: "faq-seo",
    category: "quality",
    pl: [
      "Czym różni się techniczne SEO od pozycjonowania?",
      "Techniczne SEO dotyczy warunków, w których wyszukiwarka odczytuje i interpretuje stronę: struktury adresów, indeksowania, metadanych, mapy witryny, przekierowań i danych strukturalnych. Pozycjonowanie jest szerszym, ciągłym procesem obejmującym również treść, konkurencję i autorytet domeny. Poprawna implementacja usuwa bariery techniczne, lecz sama nie przesądza o pozycji na konkretną frazę. Dlatego jakość wykonania strony i wyniki jej późniejszej promocji należy oceniać oddzielnie.",
    ],
    en: [
      "How does technical SEO differ from ongoing search optimisation?",
      "Technical SEO concerns how search engines access and interpret a website: URL structure, indexing, metadata, sitemaps, redirects and structured data. Ongoing search optimisation is broader and also involves content, competition and domain authority. Correct implementation removes technical barriers but does not determine rankings for a particular query. Website implementation and subsequent promotional results should therefore be assessed separately.",
    ],
  },
  {
    id: "faq-ai-search",
    category: "quality",
    pl: [
      "Co wpływa na widoczność strony w odpowiedziach systemów AI?",
      "Znaczenie mają dostępność treści dla robotów, jednoznaczny opis usług, poprawna struktura dokumentu i wiarygodność informacji. System powinien móc odróżnić fakty o firmie od ogólnych deklaracji marketingowych. Są to podstawy czytelności treści, a nie metoda zapewniająca cytowanie przez konkretny model. Samo dodanie pliku llms.txt lub oznaczeń FAQ nie ustanawia szczególnego kanału rekomendacji.",
    ],
    en: [
      "What affects visibility in AI-generated search answers?",
      "Relevant factors include crawlable content, clear service descriptions, sound document structure and reliable information. Systems should be able to distinguish business facts from general marketing claims. These are foundations for understandable content, not a method of securing citations by a particular model. Adding llms.txt or FAQ markup alone does not create a privileged recommendation channel.",
    ],
  },
  {
    id: "faq-accessibility",
    category: "quality",
    pl: [
      "Jak oceniacie dostępność cyfrową strony?",
      "Dostępność oceniamy na podstawie możliwości wykonania zadania przez osoby korzystające z różnych sposobów obsługi interfejsu. Sprawdzamy między innymi klawiaturę, widoczność fokusu, etykiety formularzy, strukturę nagłówków i kontrast. Wytyczne WCAG porządkują te wymagania w kryteria możliwe do weryfikacji. Testy automatyczne uzupełniamy oceną ręczną, ponieważ sam wynik skanera nie wykazuje, czy cały proces, na przykład wysłanie zapytania, jest rzeczywiście dostępny.",
    ],
    en: [
      "How do you assess digital accessibility?",
      "Accessibility is assessed through the ability to complete tasks using different methods of interaction. Checks include keyboard operation, visible focus, form labels, heading structure and contrast. WCAG organises these requirements into testable criteria. Automated checks are complemented by manual assessment because a scanner score alone does not establish whether a complete workflow, such as submitting an enquiry, is accessible.",
    ],
  },
  {
    id: "faq-performance",
    category: "quality",
    pl: [
      "Jak interpretować wynik PageSpeed Insights?",
      "PageSpeed Insights łączy test laboratoryjny z danymi rzeczywistych użytkowników, jeżeli są one dostępne. Wynik laboratoryjny opisuje pomiar wykonany w określonych warunkach, dlatego może zmieniać się między testami. Przy ocenie strony istotne są czas wyświetlenia głównej treści, stabilność układu i szybkość reakcji na działania użytkownika. Optymalizacja powinna poprawiać te właściwości, a nie wyłącznie pojedynczą ocenę punktową.",
    ],
    en: [
      "How should a PageSpeed Insights result be interpreted?",
      "PageSpeed Insights combines a laboratory test with real-user data where available. The laboratory score represents a measurement under defined conditions and can vary between runs. Meaningful assessment considers when the main content appears, layout stability and responsiveness to user interaction. Optimisation should improve these properties rather than focus solely on a single numerical score.",
    ],
  },
  {
    id: "faq-mobile",
    category: "quality",
    pl: [
      "Co oznacza dostosowanie strony do urządzeń mobilnych?",
      "Responsywność polega na dostosowaniu układu i sposobu obsługi do dostępnej przestrzeni, a nie na mechanicznym pomniejszeniu wersji komputerowej. Ocenie podlegają czytelność tekstu, wielkość elementów dotykowych, nawigacja i możliwość wypełnienia formularzy. W rozbudowanych narzędziach trzeba również uwzględnić wydajność urządzenia i wygodę pracy z danymi. Kryterium końcowym jest możliwość wykonania zadania na telefonie.",
    ],
    en: [
      "What does adapting a website for mobile devices involve?",
      "Responsive design adjusts layout and interaction to the available space rather than mechanically shrinking the desktop version. Assessment covers text legibility, touch target sizes, navigation and form completion. Complex tools also require attention to device performance and the practicality of working with data. The final criterion is whether users can complete their task on a phone.",
    ],
  },
  {
    id: "faq-ownership",
    category: "support",
    pl: [
      "Jakie prawa i dostępy są przekazywane klientowi?",
      "Należy rozróżnić prawa do wykonanych prac, licencje na komponenty zewnętrzne oraz kontrolę nad domeną i kontami usług. Przekazanie dedykowanego kodu nie znosi warunków licencyjnych bibliotek, fontów czy fotografii. Umowa określa moment i sposób przeniesienia praw, zwykle po pełnym rozliczeniu projektu. Dla samodzielnego utrzymania równie ważne są dostęp do repozytorium, konfiguracji wdrożenia i kont administracyjnych.",
    ],
    en: [
      "Which rights and access credentials are handed over?",
      "Rights in custom work, third-party licences and control of domains and service accounts are distinct matters. Handover of custom code does not remove licence conditions for libraries, fonts or photographs. The agreement defines when and how rights transfer, generally after full payment. Independent maintenance also depends on access to the repository, deployment configuration and administrative accounts.",
    ],
  },
  {
    id: "faq-hosting",
    category: "support",
    pl: [
      "Czy stronę można utrzymywać u innego dostawcy hostingu?",
      "Tak, jeżeli środowisko dostawcy obsługuje technologię zastosowaną w projekcie. Statyczna strona, aplikacja z backendem i system korzystający z bazy danych mają różne wymagania infrastrukturalne. Zmiana hostingu może wymagać przeniesienia danych, konfiguracji domeny, zmiennych środowiskowych i usług zewnętrznych. Sam transfer plików nie zawsze jest więc kompletną migracją systemu.",
    ],
    en: [
      "Can the website be hosted by another provider?",
      "Yes, provided that the provider’s environment supports the technology used. A static website, a backend application and a database-driven system have different infrastructure requirements. Moving providers may involve data migration, domain configuration, environment variables and external services. Copying website files alone is therefore not always a complete system migration.",
    ],
  },
  {
    id: "faq-security",
    category: "support",
    pl: [
      "Jakie elementy składają się na bezpieczeństwo aplikacji?",
      "Bezpieczeństwo obejmuje ochronę transmisji, kontrolę dostępu, walidację danych, zarządzanie uprawnieniami i aktualizację zależności. W systemach z kontami klientów istotne jest również oddzielenie danych poszczególnych użytkowników i ograniczenie dostępu administracyjnego. Mechanizmy dobiera się do rodzaju przetwarzanych informacji i funkcji aplikacji. Ich skuteczność wymaga utrzymania po publikacji, ponieważ wraz z rozwojem oprogramowania ujawniane są nowe podatności.",
    ],
    en: [
      "What contributes to application security?",
      "Security involves protecting data in transit, access control, input validation, permission management and dependency updates. Client-account systems also require separation of user data and restrictions on administrative access. Controls depend on the information processed and the application’s functions. They require ongoing maintenance because new vulnerabilities emerge as software evolves.",
    ],
  },
  {
    id: "faq-privacy",
    category: "support",
    pl: [
      "Jaką funkcję pełnią mechanizmy zgód na cookies i analitykę?",
      "Mechanizm zgód steruje uruchamianiem usług, które wymagają decyzji użytkownika, i pozwala tę decyzję później zmienić. Powinien odpowiadać rzeczywistemu działaniu strony: odrzucenie opcjonalnej analityki musi blokować jej uruchomienie. Dokumentacja prywatności opisuje natomiast cele przetwarzania, odbiorców danych i obowiązki administratora. Poprawna konfiguracja techniczna i prawidłowe podstawy prawne są powiązanymi, lecz odrębnymi elementami ochrony danych.",
    ],
    en: [
      "What is the purpose of cookie and analytics consent controls?",
      "Consent controls govern services that require a user decision and allow that decision to be changed later. They must match actual site behaviour: rejecting optional analytics should prevent it from running. Privacy documentation separately explains processing purposes, data recipients and controller responsibilities. Technical configuration and the legal basis for processing are related but distinct elements of data protection.",
    ],
  },
  {
    id: "faq-backups",
    category: "support",
    pl: [
      "Co powinna obejmować skuteczna kopia zapasowa?",
      "Kopia powinna umożliwiać odtworzenie działającego systemu, dlatego zależnie od jego architektury obejmuje kod, bazę danych, pliki użytkowników i potrzebną konfigurację. Istotne są częstotliwość wykonywania kopii, czas ich przechowywania i miejsce składowania. Najważniejszą weryfikacją jest próba odtworzenia, a nie samo potwierdzenie utworzenia pliku. Dla obsługi awarii trzeba ponadto określić dopuszczalną utratę danych i oczekiwany czas przywrócenia działania.",
    ],
    en: [
      "What should an effective backup include?",
      "A backup must support recovery of a working system. Depending on its architecture, this includes code, the database, user files and necessary configuration. Backup frequency, retention and storage location all matter. A restore test provides stronger evidence than confirmation that a backup file exists. Outage planning also requires acceptable data-loss and recovery-time objectives.",
    ],
  },
  {
    id: "faq-branding",
    category: "branding",
    pl: [
      "Co obejmuje identyfikacja wizualna przedsiębiorstwa?",
      "Identyfikacja wizualna jest systemem elementów graficznych, które pozwalają rozpoznawać markę i zachować spójność jej prezentacji. Obejmuje logo, paletę barw, typografię oraz zasady ich stosowania w interfejsach i materiałach firmowych. Projekt wymaga sprawdzenia czytelności w różnych rozmiarach, na różnych tłach i w odmiennych zastosowaniach. Rezultatem powinien być uporządkowany zestaw elementów i reguł, a nie wyłącznie pojedynczy plik z logo.",
    ],
    en: [
      "What does a business visual identity include?",
      "A visual identity is a system of graphic elements that makes a brand recognisable and its presentation consistent. It includes the logo, colour palette, typography and rules for use in interfaces and business materials. Design requires checking legibility at different sizes, on different backgrounds and across applications. The result should be a coherent set of assets and rules rather than a single logo file.",
    ],
  },
  {
    id: "faq-brand-colours",
    category: "branding",
    pl: [
      "Na jakiej podstawie dobieracie kolorystykę?",
      "Dobór kolorystyki łączy charakter marki z funkcją interfejsu. Analizujemy hierarchię informacji, kontrast tekstu, rozróżnialność stanów i widoczność elementów interaktywnych. Badania nad preferencjami oraz skojarzeniami barw stanowią kontekst interpretacyjny; wynik dotyczący określonej grupy badanych nie dowodzi skuteczności każdej palety w innej branży. Uzasadnienie zastosowanych rozwiązań przedstawiamy w opisach realizacji Dach Systema i LinkLang.",
    ],
    en: [
      "How do you select a colour palette?",
      "Colour selection connects brand character with interface function. We examine information hierarchy, text contrast, distinguishable states and the visibility of interactive controls. Research on colour preferences and associations provides interpretive context; findings from a particular study population do not establish that every palette will be effective in another industry. The Dach Systema and LinkLang case studies explain the rationale behind the applied designs.",
    ],
  },
  {
    id: "faq-configurators",
    category: "branding",
    pl: [
      "Jak działa konfigurator produktu 3D?",
      "Konfigurator wiąże parametry produktu z jego wizualizacją. Zmiana wymiarów, wariantu dachu lub wyposażenia aktualizuje model i zestaw wybranych opcji. Reguły produktu określają, które kombinacje są dopuszczalne, a zapis konfiguracji pozwala wykorzystać ją w zapytaniu ofertowym. Model ułatwia zrozumienie wyboru, lecz nie zastępuje obliczeń konstrukcyjnych ani dokumentacji wykonawczej.",
    ],
    en: [
      "How does a 3D product configurator work?",
      "A configurator connects product parameters to a visual model. Changes to dimensions, roof type or equipment update the model and selected options. Product rules determine valid combinations, while saved configurations can support an enquiry. The model helps users understand their selection but does not replace structural calculations or manufacturing documentation.",
    ],
  },
  {
    id: "faq-configurator-prices",
    category: "branding",
    pl: [
      "Jak konfigurator oblicza cenę i zapisuje projekt?",
      "Obliczenie ceny wymaga reguł określających koszt wariantu podstawowego, dopłat, wymiarów i zależności między opcjami. Wynik zależy od aktualności danych cenowych oraz przyjętych zasad obliczeń. Zapis projektu polega na utrwaleniu parametrów konfiguracji, dzięki czemu można ponownie odtworzyć model lub przekazać wybór do obsługi sprzedaży. Wycena orientacyjna powinna być wyraźnie odróżniona od ceny stanowiącej podstawę zamówienia.",
    ],
    en: [
      "How does a configurator calculate prices and save a project?",
      "Pricing requires rules for the base product, supplements, dimensions and dependencies between options. The result depends on current pricing data and the calculation rules. Saving a project stores its configuration parameters so the model can be recreated or the selection passed to sales staff. An indicative estimate should be clearly distinguished from a price used to place an order.",
    ],
  },
  {
    id: "faq-due-diligence",
    category: "verification",
    pl: [
      "Na czym polega analiza wiarygodności kontrahenta?",
      "Analiza polega na zestawieniu informacji o przedsiębiorstwie w celu rozpoznania ryzyka handlowego. Obejmuje między innymi identyfikację podmiotu, strukturę właścicielską, dostępne dane finansowe i zgodność deklaracji z możliwymi do potwierdzenia faktami. Znaczenie ma nie tylko treść pojedynczego źródła, lecz również jego aktualność i zgodność z pozostałymi materiałami. Wynik stanowi podstawę do formułowania dalszych pytań i oceny warunków współpracy.",
    ],
    en: [
      "What does a counterparty credibility assessment involve?",
      "The assessment compares business information to identify commercial risk. It examines matters such as legal identity, ownership, available financial data and consistency between claims and verifiable facts. A source’s currency and agreement with other material matter alongside its content. Findings support further questions and assessment of the proposed business relationship.",
    ],
  },
  {
    id: "faq-verification-report",
    category: "verification",
    pl: [
      "Jakie informacje zawiera raport o kontrahencie?",
      "Raport przedstawia ustalenia, wykorzystane źródła, wykryte rozbieżności i ograniczenia dostępnych danych. Powinien odróżniać fakty potwierdzone od wniosków analitycznych i informacji wymagających dalszej weryfikacji. Brak dokumentu lub wpisu w rejestrze wymaga interpretacji w kontekście kraju, formy prawnej i obowiązków sprawozdawczych. Sam niedostatek informacji nie jest dowodem nierzetelności przedsiębiorstwa.",
    ],
    en: [
      "What information does a counterparty report contain?",
      "The report presents findings, sources, discrepancies and limitations in the available data. It distinguishes verified facts from analytical conclusions and matters requiring further investigation. A missing document or register entry must be interpreted in the context of jurisdiction, legal form and reporting obligations. Limited information alone is not evidence of misconduct.",
    ],
  },
  {
    id: "faq-verification-limits",
    category: "verification",
    pl: [
      "Jak należy interpretować wynik analizy kontrahenta?",
      "Wynik opisuje stan wiedzy na dzień przeprowadzenia analizy. Pozwala identyfikować ryzyko, lecz nie przewiduje z pewnością przyszłej wypłacalności ani zachowania partnera. Decyzja o współpracy powinna uwzględniać również wartość transakcji, warunki płatności, zabezpieczenia i własną tolerancję ryzyka. Raport wspiera decyzję gospodarczą; nie zastępuje audytu finansowego ani oceny prawnej umowy.",
    ],
    en: [
      "How should a counterparty assessment be interpreted?",
      "The findings describe information available at the time of analysis. They help identify risk but cannot predict future solvency or conduct with certainty. A business decision should also consider transaction value, payment terms, safeguards and the organisation’s risk tolerance. The report supports that decision; it does not replace a financial audit or legal assessment of the contract.",
    ],
  },
];
export function getFaqItems(lang: "pl" | "en"): FaqItem[] {
  return questions.map(({ id, category, ...text }) => {
    const dach = { label: "Dach Systema", href: `/${lang}/case-studies/dachsystema/` };
    const linklang = { label: "LinkLang", href: `/${lang}/case-studies/linklang/` };
    let a = text[lang][1];
    let links: FaqItem["links"] = [];
    if (id === "faq-brand-colours") {
      links = [
        { ...dach, href: `${dach.href}#dach-colours` },
        { ...linklang, href: `${linklang.href}#linklang-branding` },
      ];
    } else if (id === "faq-branding") {
      a +=
        lang === "pl"
          ? " Przykłady identyfikacji wizualnej: Dach Systema i LinkLang."
          : " Visual identity examples: Dach Systema and LinkLang.";
      links = [
        { ...dach, href: `${dach.href}#dach-colours` },
        { ...linklang, href: `${linklang.href}#linklang-branding` },
      ];
    } else if (["faq-configurators", "faq-configurator-prices"].includes(id)) {
      a +=
        lang === "pl"
          ? " Zobacz prototyp konfiguratora 3D Dach Systema w naszym portfolio."
          : " See the Dach Systema 3D configurator prototype in our portfolio.";
      links = [dach];
    } else if (id === "faq-multilingual") {
      a +=
        lang === "pl"
          ? " Przykładem platformy w wersji polskiej i angielskiej jest LinkLang."
          : " LinkLang is an example of a platform with Polish and English versions.";
      links = [linklang];
    } else if (id === "faq-services") {
      a +=
        lang === "pl"
          ? " Przykładowe realizacje: Dach Systema i LinkLang."
          : " Example projects: Dach Systema and LinkLang.";
      links = [dach, linklang];
    }
    return { id, category, q: text[lang][0], a, links };
  });
}
