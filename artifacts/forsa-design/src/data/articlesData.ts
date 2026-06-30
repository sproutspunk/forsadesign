export interface ContentSection {
  heading?: string;
  body: string;
}

export interface ArticleLang {
  title: string;
  excerpt: string;
  sections: ContentSection[];
}

export interface Article {
  slugEn: string;
  slugPl: string;
  dateIso: string;
  readingTimeMin: number;
  en: ArticleLang;
  pl: ArticleLang;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slugEn === slug || a.slugPl === slug);
}

export const articles: Article[] = [
  {
    slugEn: "how-to-choose-a-web-agency",
    slugPl: "jak-wybrac-agencje-webowa",
    dateIso: "2026-06-01",
    readingTimeMin: 5,
    en: {
      title: "How to Choose a Web Agency: 7 Questions You Should Ask",
      excerpt:
        "Choosing a web agency is a business decision. Many businesses focus only on price and forget about long-term value. Here are 7 questions that help separate professional agencies from companies that simply deliver a template and move on.",
      sections: [
        {
          body: "Choosing a web agency is a business decision. It requires time, research, and a clear understanding of what you need.\n\nMany businesses focus only on price and forget about long-term value. A website should support your business, not become another problem.\n\nHere are 7 questions that help separate professional agencies from companies that simply deliver a template and move on.",
        },
        {
          heading: "1. Do you have experience in my industry?",
          body: "An agency that works with every type of business may not always have deep experience in a specific area.\n\nAsk what projects they have completed in your industry and what results they achieved.\n\nLook at more than just design. Consider performance, usability, conversions, and business impact.",
        },
        {
          heading: "2. What is your discovery process?",
          body: "A professional agency should not start building after a short conversation.\n\nThe first stage should include understanding your goals, customers, competitors, and current challenges.\n\nIf the process starts with choosing a template, important details may be missed.",
        },
        {
          heading: "3. Do you focus on SEO and performance?",
          body: "A website needs to do more than look good.\n\nIt should load quickly, work well across devices, and help customers find your business.\n\nAsk how they approach technical SEO, speed, and measuring results.",
        },
        {
          heading: "4. Who will manage my project?",
          body: "Clear communication matters.\n\nYou should know who is responsible for your project and who understands your business goals.\n\nA dedicated contact person keeps the process organised.",
        },
        {
          heading: "5. What happens after launch?",
          body: "A website needs ongoing care.\n\nAsk about updates, security, backups, technical support, and future improvements.\n\nA launch should be the beginning, not the end.",
        },
        {
          heading: "6. Can I move my website if my needs change?",
          body: "Your website should belong to you.\n\nA good agency builds with flexibility in mind, allowing you to change providers without losing control of your data or domain.",
        },
        {
          heading: "7. How is pricing structured?",
          body: "Pricing should be clear from the beginning.\n\nYou should understand what is included, what happens if the project changes, and what future costs may appear.",
        },
        {
          heading: "Summary",
          body: "Choose an agency that takes time to understand your business.\n\nThe right questions should come from both sides. A good agency wants to understand your goals before building anything.",
        },
      ],
    },
    pl: {
      title: "Jak wybrać agencję webową: 7 pytań, które powinieneś zadać",
      excerpt:
        "Wybór agencji webowej to decyzja biznesowa. Wiele firm skupia się tylko na cenie i zapomina o długoterminowej wartości. Oto 7 pytań, które pomagają odróżnić profesjonalne agencje od firm, które po prostu dostarczają szablon i odchodzą.",
      sections: [
        {
          body: "Wybór agencji webowej to decyzja biznesowa. Wymaga czasu, badań i jasnego zrozumienia swoich potrzeb.\n\nWiele firm skupia się tylko na cenie i zapomina o długoterminowej wartości. Strona internetowa powinna wspierać Twój biznes, a nie stać się kolejnym problemem.\n\nOto 7 pytań, które pomagają odróżnić profesjonalne agencje od firm, które po prostu dostarczają szablon i odchodzą.",
        },
        {
          heading: "1. Czy macie doświadczenie w mojej branży?",
          body: "Agencja pracująca z każdym typem biznesu nie zawsze ma głębokie doświadczenie w konkretnej dziedzinie.\n\nZapytaj, jakie projekty zrealizowali w Twojej branży i jakie wyniki osiągnęli.\n\nPatrz szerzej niż tylko na design. Weź pod uwagę wydajność, użyteczność, konwersje i wpływ na biznes.",
        },
        {
          heading: "2. Jaki jest Wasz proces odkrywania projektu?",
          body: "Profesjonalna agencja nie powinna zaczynać budowania po krótkim spotkaniu.\n\nPierwszy etap powinien obejmować zrozumienie Twoich celów, klientów, konkurencji i aktualnych wyzwań.\n\nJeśli proces zaczyna się od wyboru szablonu, ważne szczegóły mogą zostać pominięte.",
        },
        {
          heading: "3. Czy skupiacie się na SEO i wydajności?",
          body: "Strona internetowa musi robić więcej niż tylko dobrze wyglądać.\n\nPowinna ładować się szybko, działać dobrze na wszystkich urządzeniach i pomagać klientom znaleźć Twój biznes.\n\nZapytaj, jak podchodzą do technicznego SEO, szybkości i mierzenia wyników.",
        },
        {
          heading: "4. Kto będzie zarządzał moim projektem?",
          body: "Jasna komunikacja ma znaczenie.\n\nPowinieneś wiedzieć, kto jest odpowiedzialny za Twój projekt i kto rozumie Twoje cele biznesowe.\n\nDedykowana osoba kontaktowa utrzymuje proces w porządku.",
        },
        {
          heading: "5. Co się dzieje po uruchomieniu?",
          body: "Strona internetowa wymaga stałej opieki.\n\nZapytaj o aktualizacje, bezpieczeństwo, kopie zapasowe, wsparcie techniczne i przyszłe ulepszenia.\n\nUruchomienie powinno być początkiem, nie końcem.",
        },
        {
          heading: "6. Czy mogę przenieść stronę, jeśli moje potrzeby się zmienią?",
          body: "Twoja strona powinna należeć do Ciebie.\n\nDobra agencja buduje z myślą o elastyczności, pozwalając Ci zmienić dostawcę bez utraty kontroli nad danymi lub domeną.",
        },
        {
          heading: "7. Jak wygląda wycena projektu?",
          body: "Ceny powinny być jasne od samego początku.\n\nPowinieneś rozumieć, co jest zawarte, co się stanie, jeśli projekt się zmieni, i jakie przyszłe koszty mogą się pojawić.",
        },
        {
          heading: "Podsumowanie",
          body: "Wybierz agencję, która poświęca czas na zrozumienie Twojego biznesu.\n\nWłaściwe pytania powinny płynąć z obu stron. Dobra agencja chce zrozumieć Twoje cele przed rozpoczęciem czegokolwiek.",
        },
      ],
    },
  },
  {
    slugEn: "responsiveness-vs-speed",
    slugPl: "responsywnosc-vs-szybkosc",
    dateIso: "2026-06-05",
    readingTimeMin: 6,
    en: {
      title: "Responsiveness vs Speed: Why Both Matter for Conversions",
      excerpt:
        "Most people browse the internet using mobile devices. But responsiveness and speed are two different things. Both directly affect user experience and conversions. A website needs both to perform well.",
      sections: [
        {
          body: "Most people browse the internet using mobile devices.\n\nBut responsiveness and speed are two different things.\n\nA website needs to look good on every screen and load quickly. Both directly affect user experience and conversions.",
        },
        {
          heading: "What is responsiveness?",
          body: "A responsive website automatically adapts to different screen sizes.\n\nText, images, buttons, and navigation adjust to work properly on phones, tablets, and desktops.\n\nThis is no longer an extra feature. It is a basic requirement for modern websites.",
        },
        {
          heading: "What is loading speed?",
          body: "Speed is how quickly a website loads and becomes usable.\n\nA slow website creates frustration. Visitors leave before they contact you, make a purchase, or explore your services.\n\nSpeed also affects SEO because search engines consider performance when evaluating websites.",
        },
        {
          heading: "How do they work together?",
          body: "A website can be responsive but poorly optimised.\n\nIt may look good on mobile but load slowly because of unnecessary code or large files.\n\nA fast website that is not mobile-friendly creates another problem. Visitors struggle with navigation and leave.\n\nBoth areas need attention.",
        },
        {
          heading: "How do you measure speed?",
          body: "LCP (Largest Contentful Paint): Measures how quickly the main content loads. Target: under 2.5 seconds.\n\nFID (First Input Delay): Measures how quickly the website responds to interaction. Target: under 100ms.\n\nCLS (Cumulative Layout Shift): Measures whether the page moves unexpectedly while loading. Target: under 0.1.\n\nThese metrics show how users experience your website.",
        },
        {
          heading: "How do you build a fast and responsive website?",
          body: "Efficient code: Avoid unnecessary scripts and keep the website lightweight.\n\nOptimised images: Use modern formats, compression, and lazy loading.\n\nSmart structure: Use caching and performance improvements where needed.\n\nReal testing: Check the website on real devices and different connections.",
        },
        {
          heading: "Summary",
          body: "Responsiveness helps people use your website.\n\nSpeed helps people stay on your website.\n\nBoth are essential for conversions.",
        },
      ],
    },
    pl: {
      title: "Responsywność vs Szybkość: Dlaczego oba mają znaczenie dla konwersji",
      excerpt:
        "Większość ludzi przegląda internet na urządzeniach mobilnych. Ale responsywność i szybkość to dwie różne rzeczy. Obie bezpośrednio wpływają na doświadczenie użytkownika i konwersje.",
      sections: [
        {
          body: "Większość ludzi przegląda internet na urządzeniach mobilnych.\n\nAle responsywność i szybkość to dwie różne rzeczy.\n\nStrona musi dobrze wyglądać na każdym ekranie i ładować się szybko. Oba czynniki bezpośrednio wpływają na doświadczenie użytkownika i konwersje.",
        },
        {
          heading: "Co to jest responsywność?",
          body: "Responsywna strona automatycznie dostosowuje się do różnych rozmiarów ekranu.\n\nTekst, obrazy, przyciski i nawigacja dostosowują się, by działać prawidłowo na telefonach, tabletach i komputerach.\n\nTo nie jest już dodatkowa funkcja. To podstawowe wymaganie dla nowoczesnych stron.",
        },
        {
          heading: "Co to jest szybkość ładowania?",
          body: "Szybkość to czas, w którym strona ładuje się i staje się użyteczna.\n\nWolna strona tworzy frustrację. Odwiedzający odchodzą, zanim się skontaktują, dokonają zakupu lub poznają usługi.\n\nSzybkość wpływa też na SEO, ponieważ wyszukiwarki biorą wydajność pod uwagę przy ocenie stron.",
        },
        {
          heading: "Jak działają razem?",
          body: "Strona może być responsywna, ale słabo zoptymalizowana.\n\nMoże dobrze wyglądać na mobile, ale ładować się wolno z powodu zbędnego kodu lub dużych plików.\n\nSzybka strona, która nie jest przyjazna mobilnie, tworzy inny problem. Odwiedzający mają trudności z nawigacją i odchodzą.\n\nOba obszary wymagają uwagi.",
        },
        {
          heading: "Jak mierzyć szybkość?",
          body: "LCP (Largest Contentful Paint): Mierzy, jak szybko ładuje się główna treść. Cel: poniżej 2,5 sekundy.\n\nFID (First Input Delay): Mierzy, jak szybko strona reaguje na interakcję. Cel: poniżej 100ms.\n\nCLS (Cumulative Layout Shift): Mierzy, czy strona przesuwa się nieoczekiwanie podczas ładowania. Cel: poniżej 0,1.\n\nTe metryki pokazują, jak użytkownicy doświadczają Twojej strony.",
        },
        {
          heading: "Jak budować szybką i responsywną stronę?",
          body: "Efektywny kod: Unikaj zbędnych skryptów i trzymaj stronę lekką.\n\nZoptymalizowane obrazy: Używaj nowoczesnych formatów, kompresji i lazy loading.\n\nInteligentna struktura: Używaj cachowania i ulepszeń wydajności tam, gdzie potrzeba.\n\nPrawdziwe testy: Sprawdzaj stronę na rzeczywistych urządzeniach i różnych połączeniach.",
        },
        {
          heading: "Podsumowanie",
          body: "Responsywność pomaga użytkownikom korzystać ze strony.\n\nSzybkość pomaga im pozostać na stronie.\n\nOba są niezbędne dla konwersji.",
        },
      ],
    },
  },
  {
    slugEn: "cms-template-vs-custom-site",
    slugPl: "szablon-cms-vs-strona-na-zamowienie",
    dateIso: "2026-06-10",
    readingTimeMin: 5,
    en: {
      title: "Why a CMS Template Is Not the Same as a Custom Website",
      excerpt:
        "A template CMS can be a quick and affordable solution. But as a business grows, limitations can appear. Templates are designed for many users. Custom websites are designed around your specific goals.",
      sections: [
        {
          body: "A template CMS can be a quick and affordable solution.\n\nHowever, as a business grows, limitations can appear.\n\nTemplates are designed for many users. Custom websites are designed around your specific goals.",
        },
        {
          heading: "Advantages of a template CMS",
          body: "Lower initial cost.\n\nFaster setup.\n\nSimple editing for non-technical users.\n\nMany features available through existing tools.",
        },
        {
          heading: "Limitations of a template CMS",
          body: "Many websites look similar because they use the same themes.\n\nCustom changes can become difficult or require workarounds.\n\nToo many plugins can affect performance and security.\n\nMoving to another platform can become complicated.",
        },
        {
          heading: "Advantages of a custom website",
          body: "Unique design and functionality built for your business.\n\nBetter performance through cleaner, more efficient code.\n\nFull control over SEO, integrations, and data.\n\nAbility to grow and adapt with your business.\n\nEasier long-term flexibility.",
        },
        {
          heading: "Limitations of a custom website",
          body: "Higher initial investment.\n\nRequires proper development and ongoing maintenance.",
        },
        {
          heading: "Who should use a template?",
          body: "Templates work well for small projects, simple websites, portfolios, or businesses testing an idea on a limited budget.",
        },
        {
          heading: "Who should use a custom website?",
          body: "Custom development makes more sense for businesses focused on growth, strong user experience, specific integrations, and long-term flexibility.",
        },
        {
          heading: "Summary",
          body: "A template is a quick solution.\n\nA custom website is built around your business.",
        },
      ],
    },
    pl: {
      title: "Dlaczego szablon CMS to nie to samo co dedykowana strona",
      excerpt:
        "Szablon CMS może być szybkim i przystępnym rozwiązaniem. Jednak wraz z rozwojem biznesu mogą pojawić się ograniczenia. Szablony są projektowane dla wielu użytkowników. Dedykowane strony są tworzone wokół Twoich konkretnych celów.",
      sections: [
        {
          body: "Szablon CMS może być szybkim i przystępnym rozwiązaniem.\n\nJednak wraz z rozwojem biznesu mogą pojawić się ograniczenia.\n\nSzablony są projektowane dla wielu użytkowników. Dedykowane strony są tworzone wokół Twoich konkretnych celów.",
        },
        {
          heading: "Zalety szablonu CMS",
          body: "Niższy koszt wejścia.\n\nSzybsza konfiguracja.\n\nProsta edycja dla osób bez wiedzy technicznej.\n\nWiele funkcji dostępnych przez istniejące narzędzia.",
        },
        {
          heading: "Ograniczenia szablonu CMS",
          body: "Wiele stron wygląda podobnie, bo korzysta z tych samych szablonów.\n\nNiestandardowe zmiany mogą być trudne lub wymagać obejść.\n\nZbyt wiele wtyczek może wpływać na wydajność i bezpieczeństwo.\n\nPrzejście na inną platformę może być skomplikowane.",
        },
        {
          heading: "Zalety dedykowanej strony",
          body: "Unikalny design i funkcjonalność zbudowane dla Twojego biznesu.\n\nLepsza wydajność dzięki czystszemu, bardziej efektywnemu kodowi.\n\nPełna kontrola nad SEO, integracjami i danymi.\n\nMożliwość rozwoju i adaptacji wraz z Twoim biznesem.\n\nŁatwiejsza długoterminowa elastyczność.",
        },
        {
          heading: "Ograniczenia dedykowanej strony",
          body: "Wyższa inwestycja wstępna.\n\nWymaga odpowiedniego developmentu i bieżącego utrzymania.",
        },
        {
          heading: "Dla kogo szablon?",
          body: "Szablony sprawdzają się dobrze dla małych projektów, prostych stron, portfolio lub firm testujących pomysł przy ograniczonym budżecie.",
        },
        {
          heading: "Dla kogo dedykowana strona?",
          body: "Dedykowany development ma więcej sensu dla firm skupionych na wzroście, silnym doświadczeniu użytkownika, konkretnych integracjach i długoterminowej elastyczności.",
        },
        {
          heading: "Podsumowanie",
          body: "Szablon to szybkie rozwiązanie.\n\nDedykowana strona jest zbudowana wokół Twojego biznesu.",
        },
      ],
    },
  },
  {
    slugEn: "ecommerce-speed-and-ux",
    slugPl: "ecommerce-szybkosc-i-ux",
    dateIso: "2026-06-14",
    readingTimeMin: 6,
    en: {
      title: "E-commerce: Why Speed and User Experience Drive Sales",
      excerpt:
        "In online retail, small problems can create lost sales. Speed, trust, and a simple buying process all influence whether customers complete a purchase.",
      sections: [
        {
          body: "In online retail, small problems can create lost sales.\n\nSpeed, trust, and a simple buying process all influence whether customers complete a purchase.",
        },
        {
          heading: "1. Speed affects conversions",
          body: "Customers expect online shops to respond quickly.\n\nA slow website creates hesitation and increases the number of abandoned visits.\n\nEvery second matters when someone is ready to buy.",
        },
        {
          heading: "2. Checkout experience",
          body: "The buying process should be simple.\n\nToo many steps, hidden costs, or limited payment options create unnecessary barriers.\n\nA smooth checkout helps customers complete their purchase with confidence.",
        },
        {
          heading: "3. Trust signals",
          body: "Customers need confidence before sharing payment details.\n\nClear information, secure connections, customer reviews, return policies, and visible contact details all help build trust.\n\nA professional website removes doubt.",
        },
        {
          heading: "4. Mobile shopping",
          body: "Many customers browse and buy using phones.\n\nMobile shops need easy navigation, clear buttons, fast-loading product images, and simple search.\n\nThe experience should feel natural on a smaller screen.",
        },
        {
          heading: "5. Inventory and product management",
          body: "Customers expect accurate information.\n\nStock levels, product updates, and recommendations should work correctly and update in real time.\n\nSmall details influence buying decisions.",
        },
        {
          heading: "Summary",
          body: "E-commerce success depends on removing friction.\n\nEvery part of the customer journey affects sales.",
        },
      ],
    },
    pl: {
      title: "E-commerce: Dlaczego szybkość i doświadczenie użytkownika napędzają sprzedaż",
      excerpt:
        "W handlu online małe problemy mogą powodować utratę sprzedaży. Szybkość, zaufanie i prosty proces zakupu wpływają na to, czy klienci finalizują zamówienie.",
      sections: [
        {
          body: "W handlu online małe problemy mogą powodować utratę sprzedaży.\n\nSzybkość, zaufanie i prosty proces zakupu wpływają na to, czy klienci finalizują zamówienie.",
        },
        {
          heading: "1. Szybkość wpływa na konwersje",
          body: "Klienci oczekują, że sklepy online reagują szybko.\n\nWolna strona tworzy wahanie i zwiększa liczbę porzuconych wizyt.\n\nKażda sekunda ma znaczenie, gdy ktoś jest gotowy do zakupu.",
        },
        {
          heading: "2. Doświadczenie checkout",
          body: "Proces zakupu powinien być prosty.\n\nZbyt wiele kroków, ukryte koszty lub ograniczone opcje płatności tworzą zbędne bariery.\n\nPłynny checkout pomaga klientom sfinalizować zakup z pewnością siebie.",
        },
        {
          heading: "3. Sygnały zaufania",
          body: "Klienci potrzebują pewności przed podaniem danych płatności.\n\nJasne informacje, bezpieczne połączenia, opinie klientów, polityki zwrotów i widoczne dane kontaktowe pomagają budować zaufanie.\n\nProfesjonalna strona usuwa wątpliwości.",
        },
        {
          heading: "4. Zakupy mobilne",
          body: "Wielu klientów przegląda i kupuje za pomocą telefonów.\n\nSklepy mobilne potrzebują łatwej nawigacji, wyraźnych przycisków, szybko ładujących się obrazów produktów i prostego wyszukiwania.\n\nDoświadczenie powinno być naturalne na mniejszym ekranie.",
        },
        {
          heading: "5. Zarządzanie asortymentem",
          body: "Klienci oczekują dokładnych informacji.\n\nStan magazynu, aktualizacje produktów i rekomendacje powinny działać prawidłowo i aktualizować się w czasie rzeczywistym.\n\nMałe szczegóły wpływają na decyzje zakupowe.",
        },
        {
          heading: "Podsumowanie",
          body: "Sukces e-commerce zależy od eliminowania trudności.\n\nKażda część ścieżki klienta wpływa na sprzedaż.",
        },
      ],
    },
  },
  {
    slugEn: "seo-2024-website-is-just-the-start",
    slugPl: "seo-2024-strona-to-dopiero-poczatek",
    dateIso: "2026-06-18",
    readingTimeMin: 7,
    en: {
      title: "SEO: Why Your Website Is Only the Beginning",
      excerpt:
        "Building a website does not automatically bring customers from Google. SEO combines technical quality, content, user experience, and online authority. Your website is the foundation, not the entire strategy.",
      sections: [
        {
          body: "Building a website does not automatically bring customers from Google.\n\nSEO combines technical quality, content, user experience, and online authority.\n\nYour website is the foundation, not the entire strategy.",
        },
        {
          heading: "Website foundation",
          body: "Structure: A clear website structure helps search engines understand your pages and how they relate to each other.\n\nSpeed: Performance affects both user experience and search engine visibility.\n\nMobile experience: Search engines focus heavily on the mobile version of websites.\n\nTechnical setup: Correct indexing, structured data, and clean code help search engines read and understand your content.",
        },
        {
          heading: "Content matters",
          body: "Good content answers real customer questions.\n\nIt should match what people are searching for and provide genuinely useful information.\n\nQuality matters more than adding unnecessary length.",
        },
        {
          heading: "Experience and trust",
          body: "Search engines look for signs that a business is reliable and credible.\n\nClear information, demonstrated expertise, customer feedback, and real experience all help build authority over time.",
        },
        {
          heading: "Links and mentions",
          body: "Other websites linking to yours can strengthen your online reputation.\n\nQuality matters far more than quantity when it comes to backlinks.",
        },
        {
          heading: "User behaviour",
          body: "How people interact with your website gives search engines important signals.\n\nIf visitors quickly leave or cannot find what they need, it can negatively affect your performance.",
        },
        {
          heading: "Technical SEO basics",
          body: "Robots.txt: Controls which pages search engines should access and index.\n\nSitemap: Helps search engines discover and navigate your content.\n\nRedirects: Protect your existing rankings when pages change or are removed.",
        },
        {
          heading: "Summary",
          body: "SEO is ongoing work.\n\nA website creates the foundation.\n\nContent, optimisation, and trust build long-term visibility.",
        },
      ],
    },
    pl: {
      title: "SEO: Dlaczego strona to dopiero początek",
      excerpt:
        "Stworzenie strony nie sprowadza automatycznie klientów z Google. SEO łączy jakość techniczną, treść, doświadczenie użytkownika i autorytet online. Twoja strona to fundament, nie cała strategia.",
      sections: [
        {
          body: "Stworzenie strony nie sprowadza automatycznie klientów z Google.\n\nSEO łączy jakość techniczną, treść, doświadczenie użytkownika i autorytet online.\n\nTwoja strona to fundament, nie cała strategia.",
        },
        {
          heading: "Fundament strony",
          body: "Struktura: Jasna struktura strony pomaga wyszukiwarkom zrozumieć Twoje strony i ich wzajemne relacje.\n\nSzybkość: Wydajność wpływa zarówno na doświadczenie użytkownika, jak i widoczność w wyszukiwarkach.\n\nDoświadczenie mobilne: Wyszukiwarki skupiają się mocno na mobilnej wersji stron.\n\nKonfiguracja techniczna: Prawidłowe indeksowanie, dane strukturalne i czysty kod pomagają wyszukiwarkom czytać i rozumieć Twoje treści.",
        },
        {
          heading: "Treść ma znaczenie",
          body: "Dobra treść odpowiada na prawdziwe pytania klientów.\n\nPowinna pasować do tego, czego ludzie szukają i dostarczać naprawdę przydatnych informacji.\n\nJakość jest ważniejsza niż dodawanie zbędnej długości.",
        },
        {
          heading: "Doświadczenie i zaufanie",
          body: "Wyszukiwarki szukają oznak, że firma jest wiarygodna i godna zaufania.\n\nJasne informacje, wykazana ekspertyza, opinie klientów i prawdziwe doświadczenie pomagają budować autorytet w czasie.",
        },
        {
          heading: "Linki i wzmianki",
          body: "Inne strony linkujące do Twojej mogą wzmocnić Twoją reputację online.\n\nJakość ma o wiele większe znaczenie niż ilość, jeśli chodzi o backlinki.",
        },
        {
          heading: "Zachowanie użytkowników",
          body: "To, jak ludzie wchodzą w interakcję z Twoją stroną, daje wyszukiwarkom ważne sygnały.\n\nJeśli odwiedzający szybko odchodzą lub nie mogą znaleźć tego, czego potrzebują, może to negatywnie wpłynąć na Twoje wyniki.",
        },
        {
          heading: "Podstawy technicznego SEO",
          body: "Robots.txt: Kontroluje, do których stron wyszukiwarki powinny mieć dostęp i które indeksować.\n\nSitemap: Pomaga wyszukiwarkom odkrywać i nawigować po Twoich treściach.\n\nPrzekierowania: Chronią istniejące rankingi przy zmianach lub usuwaniu stron.",
        },
        {
          heading: "Podsumowanie",
          body: "SEO to ciągła praca.\n\nStrona tworzy fundament.\n\nTreść, optymalizacja i zaufanie budują długoterminową widoczność.",
        },
      ],
    },
  },
  {
    slugEn: "web-design-aberdeenshire",
    slugPl: "web-design-aberdeenshire-szkocja",
    dateIso: "2026-06-30",
    readingTimeMin: 8,
    en: {
      title: "Web Design for Small Businesses in Aberdeenshire: What to Expect in 2025",
      excerpt:
        "If your business is based in Aberdeenshire — whether in Banff, Huntly, Inverurie, Turriff or anywhere across the region — this guide covers what to expect when investing in a professional website, what it costs, and what questions to ask before signing anything.",
      sections: [
        {
          body: "Aberdeenshire has a strong base of small and medium businesses — tradespeople, hospitality, healthcare, agriculture, retail and professional services — many of whom are still operating without a professional website, or with one built years ago that no longer represents the business properly.\n\nThis guide is written for business owners in Aberdeenshire considering a new website or a redesign. It covers what to expect, what it costs, what to avoid, and how to choose the right agency or freelancer for the job.",
        },
        {
          heading: "Why a professional website matters for Aberdeenshire businesses",
          body: "Most customers in Aberdeenshire — whether they're searching in Banff, Macduff, Huntly, Keith, Turriff, Inverurie, Ellon, Peterhead, Fraserburgh or Aberdeen — will check a business online before making contact.\n\nIf your website is slow, hard to navigate on a phone, or simply doesn't exist, you lose that customer to a competitor who does have a working site.\n\nA professional website does three things for a local business:\n\n1. It builds credibility — customers make snap judgements about legitimacy based on how your site looks and performs.\n2. It generates enquiries — a site built with conversion in mind turns visitors into calls, bookings or purchases.\n3. It improves local search visibility — when someone searches 'electrician Inverurie' or 'accountant Huntly', a well-optimised site can put you in front of them.",
        },
        {
          heading: "What makes a good small business website in 2025",
          body: "A good website for a small Aberdeenshire business is not about having the most features. It is about doing the basics very well.\n\n**Speed.** Most of your visitors will be on a mobile phone, possibly on a rural 4G connection. A site that takes more than 3 seconds to load will lose a significant portion of those visitors before they see anything.\n\n**Clear contact information.** Your phone number should be visible on every page. A click-to-call button on mobile is essential. If you serve a specific area — say Turriff and surrounding villages — say that clearly.\n\n**Local SEO structure.** Pages should include the name of your service and your location. Not just 'Services' but 'Plumbing services in Banff and Aberdeenshire'. Google reads this and uses it to decide when to show your site.\n\n**Mobile-first design.** More than 60% of searches for local services happen on a phone. Your site should be built for mobile as the primary experience, not added as an afterthought.\n\n**A clear call to action.** Every page should guide the visitor towards one action — calling you, filling in a form, booking an appointment, or making a purchase.",
        },
        {
          heading: "How much does a website cost for a small business in Aberdeenshire?",
          body: "Pricing varies significantly depending on what you need. Here is a rough guide for Aberdeenshire businesses in 2025:\n\n**Basic website (3–5 pages)** — From £1,200. Suitable for a sole trader or small service business that needs a professional online presence: homepage, services, about, contact.\n\n**Standard business website (5–10 pages)** — £2,500–£5,000. Includes custom design, SEO setup, mobile optimisation, contact forms and basic analytics. Suitable for most SMEs.\n\n**E-commerce or custom project** — £5,000–£12,000+. Online shop, booking system, or a site with complex functionality.\n\nBeware of very cheap quotes — a website for £300 from a template platform will likely cost you more in lost business than it saves upfront. Equally, a large agency quote of £20,000+ for a basic brochure site is unlikely to be justified for most small businesses.\n\nThe right price is one that reflects the actual complexity of your project and is delivered by someone who understands your business goals — not just your design preferences.",
        },
        {
          heading: "What to look for when choosing a web designer in Aberdeenshire",
          body: "Whether you're working with a local freelancer or a small agency, there are a few things worth checking before you commit.\n\n**Do they ask questions about your business before showing you designs?** A good designer starts with your goals, not with a portfolio of templates. If the first question is 'what colours do you like?', that is a warning sign.\n\n**Can they explain what happens to your site if you stop working with them?** You should own your domain, your hosting account and your content. If those are controlled by a third party, you are dependent on them indefinitely.\n\n**Do they understand local SEO?** Getting found in Aberdeenshire searches requires more than just a nice-looking site. Ask specifically about how they approach local visibility.\n\n**Do they have examples of sites that perform well, not just look good?** Ask about page speed scores, Google rankings, and enquiry rates — not just screenshots of the homepage.",
        },
        {
          heading: "Common mistakes made by small businesses in Aberdeenshire",
          body: "**Choosing the cheapest option.** A website is a business asset. The cheapest option rarely produces the best business outcome.\n\n**Building on a platform that locks you in.** Some DIY platforms make it very difficult to migrate your site if you want to switch providers or take more control. Always check portability before committing.\n\n**Forgetting about mobile.** A site that looks great on a laptop but is difficult to use on a phone will lose the majority of local visitors.\n\n**Not providing clear location information.** Google cannot guess where you operate. If you serve Huntly, Keith and surrounding areas, say so explicitly on your site.\n\n**No contact information above the fold.** If a visitor cannot see your phone number or a clear contact option within the first few seconds, most will leave.",
        },
        {
          heading: "Local SEO: getting found in Aberdeenshire searches",
          body: "Local SEO is the practice of optimising your website so that it appears when someone nearby searches for a service you provide.\n\nFor an Aberdeenshire business, this means:\n\n**Google Business Profile.** Set up a free listing at business.google.com. Even without a public address, you can register as a service area business. This is essential for appearing in Google Maps results.\n\n**Location-specific pages or content.** A dedicated page for 'web design in Inverurie' or 'accountancy services in Turriff' performs better in local searches than a generic services page.\n\n**Consistent name, address and phone number.** Your business details should appear identically across your website, Google Business Profile, Yell, Checkatrade and any other directory listings.\n\n**Local content.** Blog posts or guides that mention specific areas — like this one — help Google associate your site with Aberdeenshire searches.",
        },
        {
          heading: "Working with Forsa Design",
          body: "We are based in Banff, Aberdeenshire, and work with businesses across the region and beyond.\n\nEvery project starts with a discovery conversation — we ask about your business, your customers, your goals and your current challenges before we propose any solution.\n\nWe do not use templates. We build custom sites that are fast, clean and designed to produce results for the specific business we are working with.\n\nIf you are based in Aberdeenshire and looking for a new website or a redesign, get in touch at hello@forsadesign.co.uk or use the contact form on this site. Initial consultations are free and come with no obligation.",
        },
        {
          heading: "Summary",
          body: "A professional website is one of the most valuable investments a small Aberdeenshire business can make in 2025.\n\nThe key is not the most expensive option or the fastest one — it is finding someone who understands your business goals and builds a site that serves them.\n\nIf you are based in Banff, Macduff, Turriff, Huntly, Keith, Inverurie, Ellon, Peterhead, Fraserburgh, Aberdeen or anywhere across Aberdeenshire, we are happy to talk through what you need.",
        },
      ],
    },
    pl: {
      title: "Web Design dla Małych Firm w Aberdeenshire: Czego Się Spodziewać w 2025",
      excerpt:
        "Jeśli Twoja firma działa w Aberdeenshire — w Banff, Huntly, Inverurie, Turriff lub gdziekolwiek indziej w regionie — ten przewodnik wyjaśnia, czego oczekiwać inwestując w profesjonalną stronę internetową, ile to kosztuje i jakie pytania zadać przed podpisaniem umowy.",
      sections: [
        {
          body: "Aberdeenshire ma silną bazę małych i średnich firm — rzemieślnicy, hotelarstwo, ochrona zdrowia, rolnictwo, handel detaliczny i usługi profesjonalne — z których wiele nadal działa bez profesjonalnej strony internetowej lub z witryną stworzoną lata temu, która już nie reprezentuje firmy właściwie.\n\nTen przewodnik jest napisany dla właścicieli firm w Aberdeenshire rozważających nową stronę lub redesign. Obejmuje czego oczekiwać, ile to kosztuje, czego unikać i jak wybrać odpowiednią agencję lub freelancera.",
        },
        {
          heading: "Dlaczego profesjonalna strona ma znaczenie dla firm z Aberdeenshire",
          body: "Większość klientów w Aberdeenshire — czy szukają w Banff, Macduff, Huntly, Keith, Turriff, Inverurie, Ellon, Peterhead, Fraserburgh czy Aberdeen — sprawdza firmę online przed nawiązaniem kontaktu.\n\nJeśli Twoja strona jest wolna, trudna do obsługi na telefonie lub po prostu nie istnieje, tracisz tego klienta na rzecz konkurenta, który ma działającą witrynę.\n\nProfesjonalna strona robi trzy rzeczy dla lokalnej firmy:\n\n1. Buduje wiarygodność — klienci oceniają wiarygodność na podstawie wyglądu i działania strony.\n2. Generuje zapytania — strona zbudowana z myślą o konwersji zamienia odwiedzających w telefony, rezerwacje lub zakupy.\n3. Poprawia widoczność w lokalnym wyszukiwaniu — gdy ktoś szuka 'elektryk Inverurie' lub 'księgowy Huntly', dobrze zoptymalizowana strona może go do Ciebie skierować.",
        },
        {
          heading: "Co tworzy dobrą stronę dla małej firmy w 2025",
          body: "Dobra strona dla małej firmy z Aberdeenshire to nie kwestia posiadania jak największej liczby funkcji. Chodzi o bardzo dobre wykonanie podstaw.\n\n**Szybkość.** Większość odwiedzających będzie na telefonie, być może na wiejskim połączeniu 4G. Strona ładująca się ponad 3 sekundy straci znaczną część tych odwiedzających zanim cokolwiek zobaczą.\n\n**Wyraźne dane kontaktowe.** Numer telefonu powinien być widoczny na każdej stronie. Przycisk click-to-call na telefonie jest niezbędny.\n\n**Struktura lokalnego SEO.** Strony powinny zawierać nazwę usługi i lokalizację. Nie tylko 'Usługi' ale 'Usługi hydrauliczne w Banff i Aberdeenshire'.\n\n**Projekt mobile-first.** Ponad 60% wyszukiwań lokalnych usług odbywa się na telefonie. Strona powinna być zbudowana z myślą o urządzeniach mobilnych jako o głównym doświadczeniu.\n\n**Wyraźne wezwanie do działania.** Każda strona powinna kierować odwiedzającego do jednej czynności — zadzwonienia, wypełnienia formularza, umówienia wizyty lub dokonania zakupu.",
        },
        {
          heading: "Ile kosztuje strona internetowa dla małej firmy w Aberdeenshire?",
          body: "Ceny znacznie się różnią w zależności od potrzeb. Przybliżony przewodnik dla firm z Aberdeenshire w 2025:\n\n**Podstawowa strona (3–5 podstron)** — Od £1 200. Odpowiednia dla jednoosobowej działalności lub małej firmy usługowej: strona główna, usługi, o nas, kontakt.\n\n**Standardowa strona biznesowa (5–10 podstron)** — £2 500–£5 000. Obejmuje indywidualny projekt, konfigurację SEO, optymalizację mobilną, formularze kontaktowe i podstawową analitykę.\n\n**E-commerce lub projekt niestandardowy** — £5 000–£12 000+. Sklep internetowy, system rezerwacji lub strona z rozbudowaną funkcjonalnością.\n\nUważaj na bardzo tanie oferty — strona za £300 od platformy szablonowej prawdopodobnie kosztuje Cię więcej w utraconych klientach niż oszczędza z góry. Właściwa cena odzwierciedla rzeczywistą złożoność projektu i jest dostarczona przez kogoś, kto rozumie Twoje cele biznesowe.",
        },
        {
          heading: "Na co zwrócić uwagę wybierając web designera w Aberdeenshire",
          body: "Czy zadają pytania o Twój biznes przed pokazaniem projektów? Dobry designer zaczyna od Twoich celów, nie od portfolio szablonów.\n\nCzy mogą wyjaśnić, co dzieje się z Twoją stroną, jeśli przestaniesz z nimi współpracować? Powinieneś być właścicielem swojej domeny, konta hostingowego i treści.\n\nCzy rozumieją lokalne SEO? Pojawienie się w wynikach wyszukiwania w Aberdeenshire wymaga czegoś więcej niż tylko ładnie wyglądającej strony.\n\nCzy mają przykłady stron, które dobrze działają, a nie tylko dobrze wyglądają? Zapytaj konkretnie o szybkość ładowania, rankingi Google i wskaźniki zapytań.",
        },
        {
          heading: "Lokalne SEO: jak być widocznym w wyszukiwaniach w Aberdeenshire",
          body: "Dla firmy z Aberdeenshire lokalne SEO oznacza:\n\n**Google Business Profile.** Utwórz bezpłatny profil na business.google.com. Nawet bez publicznego adresu możesz zarejestrować się jako firma obsługująca obszar. Jest to niezbędne do pojawiania się w wynikach Google Maps.\n\n**Treści specyficzne dla lokalizacji.** Dedykowana strona dla 'web design w Inverurie' lub 'usługi księgowe w Turriff' działa lepiej w lokalnych wyszukiwaniach niż ogólna strona usług.\n\n**Spójne dane NAP.** Twoje dane firmowe powinny być identyczne na stronie internetowej, w Google Business Profile i we wszystkich innych katalogach.\n\n**Lokalne treści.** Artykuły na blogu lub przewodniki wspominające konkretne obszary — takie jak ten — pomagają Google powiązać Twoją stronę z wyszukiwaniami w Aberdeenshire.",
        },
        {
          heading: "Praca z Forsa Design",
          body: "Działamy z Banff w Aberdeenshire i pracujemy z firmami z całego regionu i nie tylko.\n\nKażdy projekt zaczyna się od rozmowy odkrywczej — pytamy o Twój biznes, Twoich klientów, Twoje cele i aktualne wyzwania przed zaproponowaniem jakiegokolwiek rozwiązania.\n\nNie używamy szablonów. Budujemy niestandardowe strony, które są szybkie, czyste i zaprojektowane tak, aby przynosić wyniki konkretnemu biznesowi, z którym pracujemy.\n\nJeśli prowadzisz działalność w Aberdeenshire i szukasz nowej strony lub redesignu, skontaktuj się z nami przez hello@forsadesign.co.uk lub formularz na tej stronie.",
        },
        {
          heading: "Podsumowanie",
          body: "Profesjonalna strona internetowa to jedna z najcenniejszych inwestycji, jaką mała firma z Aberdeenshire może poczynić w 2025 roku.\n\nKluczem nie jest najdroższa opcja ani najszybsza — to znalezienie kogoś, kto rozumie Twoje cele biznesowe i buduje stronę, która im służy.\n\nJeśli działasz w Banff, Macduff, Turriff, Huntly, Keith, Inverurie, Ellon, Peterhead, Fraserburgh, Aberdeen lub gdziekolwiek w Aberdeenshire, chętnie porozmawiamy o tym, czego potrzebujesz.",
        },
      ],
    },
  },
];
