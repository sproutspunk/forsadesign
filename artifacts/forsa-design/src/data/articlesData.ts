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

export const articles: Article[] = [
  {
    slugEn: "how-to-choose-a-web-agency",
    slugPl: "jak-wybrac-agencje-webowa",
    dateIso: "2026-06-01",
    readingTimeMin: 5,
    en: {
      title: "How to Choose a Web Agency — 7 Questions You Should Ask",
      excerpt:
        "Choosing a web agency is a business decision. Many businesses focus on price instead of value. Here are 7 questions that separate professional agencies from those who deliver a template and disappear.",
      sections: [
        {
          body: "Choosing a web agency is a business decision — it requires time and due diligence. Many businesses make the mistake of focusing on price instead of value. In this guide, I'll show you 7 questions that separate professional agencies from those who'll deliver a template site and disappear.",
        },
        {
          heading: "1. Do you have experience in my industry?",
          body: "An agency that builds sites for everyone — e-commerce, B2B, services — sometimes means they don't specialise in anything. Ask: what projects have they completed in your industry? What were the results — traffic growth, conversion rates, ROI?",
        },
        {
          heading: "2. What is your discovery process?",
          body: 'A good agency doesn\'t start coding based on a brief conversation. They should conduct proper analysis — your goals, your competitors, your users, and your current problems. If they start with "here are our templates," walk away.',
        },
        {
          heading: "3. Do you take responsibility for SEO and performance?",
          body: "A beautiful site that doesn't drive traffic and doesn't convert is a waste. Ask: how will you optimise for search engines? What metrics will we track? What do you guarantee?",
        },
        {
          heading: "4. Who will be my main point of contact?",
          body: 'You want a specific person, not "an assigned team that rotates." A single project manager who understands your business and is accountable for results.',
        },
        {
          heading: "5. What happens after launch?",
          body: "Do they disappear after deployment, or do they support you — technical support, security updates, ongoing optimisation? What does it cost?",
        },
        {
          heading: "6. Can I switch providers?",
          body: "Your site should be yours — not locked in with one supplier. Ask about portability of code, data, and domain.",
        },
        {
          heading: "7. What is their pricing structure?",
          body: 'It should be immediately transparent. Fixed prices per project phase, clear escalation paths, no "extras" that mysteriously appear at the end.',
        },
        {
          heading: "Summary",
          body: "Choose an agency that asks YOU questions. If only you're asking, they're not doing due diligence on their end.",
        },
      ],
    },
    pl: {
      title: "Jak wybrać agencję webową — 7 pytań, które powinieneś zadać",
      excerpt:
        "Wybór agencji webowej to decyzja biznesowa. Wiele firm popełnia błąd, focusując się na cenie zamiast na wartości. 7 pytań, które oddzielą agencje profesjonalne od tych, które dostarczą szablon i znikną.",
      sections: [
        {
          body: "Wybór agencji webowej to decyzja biznesowa — wymaga czasu i due diligence. Wiele firm popełnia błąd, focusując się na cenie zamiast na wartości. W tym przewodniku pokazuję 7 pytań, które oddzielą agencje profesjonalne od tych, które dostarczą szablonową stronę i znikną.",
        },
        {
          heading: "1. Czy macie doświadczenie w mojej branży?",
          body: "Agencja, która robi strony dla wszystkich — e-commerce, B2B, usługi — czasami oznacza, że nie specjalizuje się w niczym. Pytaj: jakie projekty zrobili w Twojej branży? Jakie były ich rezultaty — wzrost ruchu, konwersja, ROI?",
        },
        {
          heading: "2. Jaki jest Wasz proces odkrywania?",
          body: "Dobra agencja nie zaczyna kodować na podstawie krótkiej rozmowy. Powinna przeprowadzić analizę — Twoje cele, konkurencja, użytkownicy, bieżące problemy. Jeśli zaczyna od 'tutaj są nasze szablony', uciekaj.",
        },
        {
          heading: "3. Czy odpowiada za SEO i wydajność?",
          body: "Ładna strona, która nie generuje ruchu i nie konwertuje, to marnotrawstwo. Pytaj: jak będziecie optymalizować pod kątem wyszukiwarek? Jakie metryki będziemy śledzić? Co gwarantujecie?",
        },
        {
          heading: "4. Kto będzie moim głównym kontaktem?",
          body: "Chcesz konkretną osobę, a nie 'przypisany zespół, który się zmienia'. Pojedynczy PM, który rozumie Twój biznes i jest odpowiedzialny za rezultat.",
        },
        {
          heading: "5. Co się dzieje po uruchomieniu?",
          body: "Czy znikają po wdrożeniu, czy wspierają Cię — wsparcie techniczne, aktualizacje bezpieczeństwa, optymalizacja? Ile to kosztuje?",
        },
        {
          heading: "6. Czy mogę zmienić dostawcę?",
          body: "Twoja strona powinna być Twoja — nie zablokowana u jednego dostawcy. Pytaj o portabilność kodu, danych, domeny.",
        },
        {
          heading: "7. Jaka jest ich struktura cenowa?",
          body: "Od razu powinna być przejrzysta. Stałe ceny za etapy projektu, jasne ścieżki eskalacji, brak 'dodatków' wylęgniętych na koniec.",
        },
        {
          heading: "Podsumowanie",
          body: "Wybierz agencję, która zadaje TOBIE pytania. Jeśli tylko ty pytasz, oni nie robią due diligence na swoim końcu.",
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
      title: "Responsiveness vs Speed — Why Both Matter for Conversions",
      excerpt:
        "70% of internet traffic comes from mobile. But responsiveness and speed are not the same thing. Both affect conversion — ignore one, lose customers.",
      sections: [
        {
          body: "70% of internet traffic comes from mobile devices. But few businesses understand that responsiveness (adapting to every screen size) is not the same as speed (loading in 2 seconds). Both affect conversion — ignore one, lose customers.",
        },
        {
          heading: "What is responsiveness?",
          body: "A responsive site automatically adapts to the screen size. Text, images, buttons — everything reorganises for optimal display. You no longer do this manually — CSS and JavaScript handle it. It's a standard, not a luxury. Your site must be excellent on every device — it directly impacts SEO, conversions, and user experience.",
        },
        {
          heading: "What is loading speed?",
          body: "Speed is the time it actually takes for your site to load. Google says: if it takes longer than 3 seconds, the user is waiting. Above 5 seconds — 90% abandon. Speed directly affects conversions and SEO ranking.",
        },
        {
          heading: "How do they work together?",
          body: "A responsive site written inefficiently can be slow on mobile. Result: user waits, abandons, goes to a competitor. A fast site that's poor on mobile? The user sees misaligned text and off-screen buttons — confusing to click, they abandon. Both must be excellent.",
        },
        {
          heading: "How to measure speed?",
          body: 'LCP (Largest Contentful Paint): How long does it take to load the main content? Target: under 2.5 seconds. FID (First Input Delay): How long does it take to respond to a click? Target: under 100ms. CLS (Cumulative Layout Shift): Does the page "jump" during loading? Target: under 0.1.',
        },
        {
          heading: "How to build responsive and fast sites?",
          body: "1. Efficient code — no unnecessary libraries, minimised JavaScript. 2. Optimised images — compression, modern formats (WebP), lazy loading. 3. Smart architecture — caching, CDN, Service Workers where appropriate. 4. Real-world testing — tests on actual devices and connections, not just Chrome DevTools.",
        },
        {
          heading: "Summary",
          body: "Responsiveness without speed = poor UX. Speed without responsiveness = low mobile visibility. Both together = conversion.",
        },
      ],
    },
    pl: {
      title: "Responsywność vs Szybkość — Dlaczego oba są ważne dla konwersji",
      excerpt:
        "70% ruchu w internecie pochodzi z urządzeń mobilnych. Ale responsywność i szybkość to nie to samo. Oba wpływają na konwersję — ignoruj jedno, stracisz klientów.",
      sections: [
        {
          body: "70% ruchu w internecie pochodzi z urządzeń mobilnych. Ale mało firm rozumie, że responsywność (dostosowanie do każdego rozmiaru ekranu) to nie to samo co szybkość (ładowanie w 2 sekundy). Oba wpływają na konwersję — ignoruj jedno, stracisz klientów.",
        },
        {
          heading: "Co to jest responsywność?",
          body: "Strona responsywna automatycznie dostosowuje się do wielkości ekranu. Tekst, obrazy, przyciski — wszystko reorganizuje się dla optymalnego wyświetlania. Tego nie robisz już ręcznie — CSS i JavaScript robią to za Ciebie. To standard, nie luksus. Twoja strona musi być doskonała na każdym urządzeniu — to wpływa na SEO, konwersję i doświadczenie użytkownika.",
        },
        {
          heading: "Co to jest szybkość ładowania?",
          body: "Szybkość to czas, w którym strona rzeczywiście ładuje się dla użytkownika. Google mówi: jeśli ładuje się dłużej niż 3 sekundy, użytkownik czeka. Powyżej 5 sekund — 90% porzuca stronę. Szybkość wpływa bezpośrednio na konwersję i SEO ranking.",
        },
        {
          heading: "Jak działają razem?",
          body: "Responsywna strona napisana nieefektywnie może być wolna na mobilnych. Wynik: użytkownik czeka, porzuca, idzie do konkurencji. Szybka strona, ale zła na mobilnych? Użytkownik widzi tekst przesunięty, przyciski poza ekranem — myli się klikanie, porzuca. Obie rzeczy muszą być doskonałe.",
        },
        {
          heading: "Jak mierzyć szybkość?",
          body: "LCP (Largest Contentful Paint): Ile czasu zajmuje załadowanie głównej zawartości? Target: poniżej 2.5 sekundy. FID (First Input Delay): Ile czasu zajmuje odpowiedź na kliknięcie użytkownika? Target: poniżej 100ms. CLS (Cumulative Layout Shift): Czy strona 'podskakuje' podczas ładowania? Target: poniżej 0.1.",
        },
        {
          heading: "Jak się tworzy responsywne i szybkie strony?",
          body: "1. Kod pisany efektywnie — bez zbędnych bibliotek, zminimalizowany JavaScript. 2. Obrazy zoptymalizowane — kompresja, nowoczesne formaty (WebP), lazy loading. 3. Architektura strony — cachowanie, CDN, opcjonalnie Service Workers. 4. Testowanie rzeczywiste — testy na rzeczywistych urządzeniach i połączeniach.",
        },
        {
          heading: "Podsumowanie",
          body: "Responsywność bez szybkości = zły UX. Szybkość bez responsywności = niska widoczność mobilna. Obie razem = konwersja.",
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
      title: "Why a CMS Template Is Not the Same as a Custom Site",
      excerpt:
        "A template CMS is cheap and fast. But if your business has specific requirements or needs a competitive edge — the template runs out quickly. Here's what to consider.",
      sections: [
        {
          body: "A template CMS (WordPress, Wix, Squarespace) is cheap and fast. But if your business has specific requirements or needs a competitive edge — a template runs out quickly.",
        },
        {
          heading: "Pros of a template CMS",
          body: "Low cost. Quick deployment. Easy editing for non-technical users. Hosting and security often handled by the platform.",
        },
        {
          heading: "Cons of a template CMS",
          body: "Looks like your competitors (everyone uses the same themes). Limited customisation. Slower performance (plugin-heavy). Difficult migration. Less control over data and SEO. Plugin hell — the more add-ons, the more unstable the site.",
        },
        {
          heading: "Pros of a custom site",
          body: "Unique design and functionality. Faster (efficient code, no unnecessary plugins). Full control — SEO, data, integrations. Scalable — grows with your business. Portable — you can change hosting or framework without losing anything.",
        },
        {
          heading: "Cons of a custom site",
          body: "Higher upfront cost. Requires a developer for changes. Responsibility for hosting and security (though this can be delegated).",
        },
        {
          heading: "Who should use a template?",
          body: "Startups testing an idea on a small budget. Blogs, portfolios, and simple brochure sites where uniqueness isn't critical. Projects that won't need to scale.",
        },
        {
          heading: "Who should use a custom site?",
          body: "Businesses competing on visibility and UX. Projects with unique user flows (e.g. product configurators, client portals). Businesses that will grow and scale. Operations requiring integrations (CRM, ERP, payment gateways).",
        },
        {
          heading: "Summary",
          body: "A template is the fast route. A custom site is an investment that pays off.",
        },
      ],
    },
    pl: {
      title: "Dlaczego szablon CMS to nie to samo co dostosowana strona",
      excerpt:
        "Szablon CMS jest tani i szybki. Ale jeśli Twój biznes ma konkretne wymagania lub potrzebujesz przewagi konkurencyjnej — szablon wyczerpuje się szybko. Co warto wiedzieć.",
      sections: [
        {
          body: "Templatowy CMS (WordPress, Wix, Squarespace) jest tani i szybki. Ale jeśli Twój biznes ma konkretne wymagania lub potrzebujesz konkurencyjnej przewagi — szablon wyczerpuje się szybko.",
        },
        {
          heading: "Zalety szablonu CMS",
          body: "Niska cena. Szybkie wdrożenie. Łatwa edycja dla osób bez wiedzy technicznej. Hosting i bezpieczeństwo często obsługiwane przez platformę.",
        },
        {
          heading: "Wady szablonu CMS",
          body: "Wygląda jak konkurencja (wszyscy używają tych samych szablonów). Ograniczone możliwości customizacji. Wolniejsze (obciążone pluginami). Trudna migracja. Mniej kontroli nad danymi i SEO. Plugin-hell — im więcej dodatków, tym bardziej niestabilna strona.",
        },
        {
          heading: "Zalety dostosowanej strony",
          body: "Unikalny design i funkcjonalność. Szybsza (efektywny kod, bez zbędnych pluginów). Pełna kontrola — SEO, dane, integracje. Skalowalna — rozrasta się ze stroną w miarę wzrostu biznesu. Przenośna — możesz zmienić hosting lub framework bez utraty czegokolwiek.",
        },
        {
          heading: "Wady dostosowanej strony",
          body: "Wyższa cena. Wymaga programisty, jeśli chcesz cokolwiek zmienić. Odpowiedzialność za hosting i bezpieczeństwo (możesz delegować).",
        },
        {
          heading: "Dla kogo szablon?",
          body: "Startup, który chce testować ideę za mały budżet. Blogi, portfolio, wizytówki (gdzie unikalność nie jest kluczowa). Projekty, które nie będą rosnąć.",
        },
        {
          heading: "Dla kogo dostosowana strona?",
          body: "Firmy, które konkurują na widoczność i UX. Projekty z unikalnym flow użytkownika (np. konfigurator produktu, portal dla klientów). Biznes, który będzie rosnąć i skalować się. Operacje, które potrzebują integracji (CRM, ERP, bramki płatności).",
        },
        {
          heading: "Podsumowanie",
          body: "Szablon to szybka droga. Dostosowana strona to inwestycja, która się zwraca.",
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
      title: "E-commerce — Why Speed and UX Drive Sales, Not Just Experience",
      excerpt:
        "A small delay in loading speed means a drop in sales. E-commerce data is unambiguous. Here's how it translates directly into money.",
      sections: [
        {
          body: "A small delay in loading speed = a drop in sales. E-commerce data is unambiguous. In this article I show how this translates directly into money.",
        },
        {
          heading: "1. Speed → Conversion",
          body: "Amazon tested this: every 100ms of loading delay cost 1% in sales. Your e-shop? If you're doing £10,000/month and your site loads in 3 seconds instead of 1 second — you're potentially losing £100–300 per month. Every second counts.",
        },
        {
          heading: "2. Checkout UX",
          body: 'How many steps to checkout? 3+ is too many. A guest checkout option increases conversion by 23%. Are hidden fees visible? A surprise at the "final price" stage = abandoned cart. Can users pay with multiple methods? Not everyone has a credit card — PayPal, Apple Pay, bank transfer are standard.',
        },
        {
          heading: "3. Trust Signals",
          body: 'A security badge: "SSL secure", "GDPR compliant", "PCI DSS certified". Customer reviews and product ratings. A return guarantee. Company contact details (not an anonymous shop). Without these signals = no sales. A random person online won\'t hand over their card details without trust.',
        },
        {
          heading: "4. Mobile Commerce",
          body: "65% of e-commerce traffic is mobile. But most shops have a UI designed for desktop. Large buttons (minimum 44×44 px). Simple touchscreen flows (no hover-only elements). Fast loading product images. Quickly accessible search and filters.",
        },
        {
          heading: "5. Inventory & Dynamics",
          body: 'Real-time stock: is the product available? Fast updates: if someone buys the last item, other customers should see this immediately. Recommendations: "Customers also bought…" increases average order value.',
        },
        {
          heading: "Summary",
          body: "E-commerce is not art. It's conversion, conversion, conversion. Every pixel, every second, every piece of text — affects sales. Pay attention to it.",
        },
      ],
    },
    pl: {
      title: "E-commerce — Dlaczego szybkość i UX wpływają na sprzedaż, nie tylko na wrażenia",
      excerpt:
        "Małe opóźnienie w szybkości ładowania = spadek sprzedaży. E-commerce to dane, i są one jednoznaczne. Jak to przekłada się bezpośrednio na pieniądze.",
      sections: [
        {
          body: "Małe opóźnienie w szybkości ładowania = spadek sprzedaży. E-commerce to dane, ciężko. W tym artykule pokazuję, jak się to tłumaczy na pieniądze.",
        },
        {
          heading: "1. Szybkość → Konwersja",
          body: "Amazon testował: każde 100ms opóźnienia ładowania kosztowało 1% sprzedaży. Twój e-shop? Jeśli robi 10 000 £/miesiąc i Twoja strona ładuje się 3 sekundy zamiast 1 sekundy — tracisz potencjalnie 100–300 £/miesiąc. Każda sekunda ma znaczenie.",
        },
        {
          heading: "2. UX Koszyka",
          body: "Ile kroków do checkout? 3+ to za dużo. Opcja 'guest checkout' zwiększa konwersję o 23%. Czy widać ukryte opłaty? Zaskoczenie przy 'finalnej cenie' = porzucenie koszyka. Czy można płacić wieloma metodami? Nie każdy ma kartę kredytową — PayPal, Apple Pay, Przelewy24 to standard.",
        },
        {
          heading: "3. Trust Signals",
          body: "Kolumna z bezpieczeństwem: 'SSL secure', 'GDPR compliant', 'PCI DSS certified'. Opinie klientów, oceny produktów. Gwarancja zwrotu. Dane kontaktowe firmy (nie anonimowy e-shop). Brak tych sygnałów = brak sprzedaży. Ktoś losowy z internetu nie powie 'dam Ci kartę kredytową'.",
        },
        {
          heading: "4. Mobile Commerce",
          body: "65% ruchu e-commerce to mobile. Ale większość e-shopów ma UI zaprojektowany dla desktop. Duże przyciski (minimum 44×44 px). Prosty flow na touchscreen (bez elementów tylko z hover). Szybkie ładowanie obrazów produktów. Szybko dostępne wyszukiwanie i filtry.",
        },
        {
          heading: "5. Inventory & Dynamika",
          body: "Stock real-time: czy widać, czy produkt jest dostępny? Szybkie aktualizacje: jeśli ktoś kupi ostatni egzemplarz, inny klient powinien to widzieć natychmiast. Rekomendacje: 'Klienci kupili też…' zwiększa średnią wartość zamówienia.",
        },
        {
          heading: "Podsumowanie",
          body: "E-commerce to nie art. To konwersja, konwersja, konwersja. Każdy piksel, każda sekunda, każdy tekst — ma wpływ na sprzedaż. Zwróć na to uwagę.",
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
      title: "SEO in 2024 — Why Your Website Is Just the Start",
      excerpt:
        "The idea that you build a site and Google rankings arrive is a myth from 2010. In 2024, SEO is a combination of architecture, content, backlinks, user signals, and E-E-A-T. The site is the foundation, not the whole picture.",
      sections: [
        {
          body: "The idea that you build a site and rankings in Google start rolling in — that's a myth from 2010. In 2024, SEO is a combination: site architecture, content, link building, user signals, E-E-A-T. The site is the foundation, not the whole strategy.",
        },
        {
          heading: "Foundation: On-Page",
          body: "Architecture: Logical structure, clear hierarchy (Homepage → Category → Product). Google should understand how to navigate your site. Speed: LCP under 2.5 seconds. Without this, ranking drops. Mobile-first: Google indexes the mobile version. If mobile is slow or poorly designed, SEO suffers. Structured data: Schema.org — Google needs to know if it's an article, product, or recipe. Without it, you may never appear in Featured Snippets.",
        },
        {
          heading: "Content: It Decides the Ranking",
          body: "Keywords: What are users searching for? What do you offer? Find the balance. Intent matching: If they're searching \"compare web agencies,\" the content should compare agencies — don't just talk about yourself. Depth: Google prefers 2000+ word articles for competitive keywords. But nothing unnecessary — 500 words if that's all that's needed. Freshness: Old content = poor ranking. Update regularly, especially for news-related keywords.",
        },
        {
          heading: "E-E-A-T: The New Google",
          body: "Google now evaluates: Experience, Expertise, Authority, Trust. Who writes the article? (No author = red flag.) Do they have experience in the topic? Are they cited by other credible sources? Does the business have reviews, certifications, references? An article written anonymously, without linking to the author's expertise — ranking drops.",
        },
        {
          heading: "Off-Page: Links, Mentions, Social",
          body: "Backlinks: How many sites link to you? From what authority? 10 links from TechCrunch > 1000 spam links. Brand mentions: Is your name being talked about (with or without a link)? Google hears. Social: Not a direct ranking signal, but — how many people share your content? It signals value.",
        },
        {
          heading: "User Signals: Click, Dwell Time, Bounce",
          body: "CTR (Click-Through Rate): Is your title and description in Google results attractive? Low CTR = Google thinks the result is irrelevant. Dwell time: Does the user come and immediately leave? If so — the page doesn't answer the question. Pogo-sticking: User clicks your result, returns to Google and clicks a competitor. This signals you're not meeting their expectation.",
        },
        {
          heading: "Technical Foundations",
          body: "Robots.txt: Tell Google which pages to index, which to skip. Sitemap: A list of all pages — a map for crawlers. Redirects: If you change a URL, use a 301 redirect. Otherwise you lose ranking authority. Hreflang: If your site is multilingual, tell Google which version to show whom.",
        },
        {
          heading: "Summary",
          body: "SEO is a marathon, not a sprint. The site is the start. The rest — content, backlinks, engagement, E-E-A-T — is monthly work.",
        },
      ],
    },
    pl: {
      title: "SEO 2024 — Dlaczego strona to dopiero początek",
      excerpt:
        "Myśl, że stworzysz stronę i zaczną się rankingi w Google — to mit z 2010 roku. W 2024 SEO to kombinacja architektury, treści, linków, sygnałów użytkownika i E-E-A-T. Strona to fundament, nie całość.",
      sections: [
        {
          body: "Myśl, że stworzysz stronę i zaczynają się rankingi w Google — to mit z 2010 roku. W 2024 SEO to kombinacja: architektura strony, treść, budowa linków, sygnały użytkownika, E-E-A-T. Strona to fundament, nie całość.",
        },
        {
          heading: "Fundament: On-Page",
          body: "Architektura: Logiczna struktura, jasna hierarchia (Homepage → Kategoria → Produkt). Google powinien zrozumieć, jak się poruszasz. Szybkość: LCP poniżej 2.5 sekundy. Bez tego, ranking spada. Mobile-first: Google indeksuje mobilną wersję. Jeśli mobile jest wolny lub źle zaprojektowany, SEO cierpi. Structured data: Schema.org — Google musi wiedzieć, że to artykuł, czy produkt, czy recipe. Bez tego możesz nie pojawić się w Featured Snippet.",
        },
        {
          heading: "Treść: Ona decyduje o rankingu",
          body: "Słowa kluczowe: Co szukają użytkownicy? Co Ty oferujesz? Równowaga między nimi. Intent matching: Jeśli szukają 'porównaj agencje webowe', treść powinna porównać agencje — nie mów samych o sobie. Depth: Google preferuje artykuły 2000+ słów dla competitive keywords. Ale nic ponad to co potrzebne. Freshness: Stara treść = zły ranking. Aktualizuj regularnie, szczególnie dla news-related keywords.",
        },
        {
          heading: "E-E-A-T: Nowe Google",
          body: "Google teraz ocenia: Experience, Expertise, Authority, Trust. Kto pisze artykuł? (Brak autora = red flag.) Czy ma doświadczenie w temacie? Czy jest cytowany przez inne wiarygodne źródła? Czy firma ma opinie, certyfikaty, referencje? Artykuł napisany anonimowo, bez linkowania do ekspertyzy autora — ranking spada.",
        },
        {
          heading: "Off-Page: Linki, Mentions, Social",
          body: "Backlinki: Jak wiele stron linkuje do Ciebie? Z jakiego autorytetu? 10 linków z TechCrunch > 1000 linków ze spamu. Brand mentions: Czy mówi się o Tobie (z linkiem czy bez)? Google słyszy. Social: Nie bezpośrednio ranking, ale sygnały — ile ludzi dzieli Twoją treść? Oznacza wartość.",
        },
        {
          heading: "User Signals: Klik, czas na stronie, bounce",
          body: "CTR (Click-Through Rate): Czy Twój tytuł i opis w Google wyniku są atrakcyjne? Niska CTR = Google myśli, że wynik jest nieistotny. Dwell time: Czy użytkownik przychodzi i natychmiast opuszcza? Jeśli tak — strona nie odpowiada na pytanie. Pogo-sticking: Użytkownik klika w Twój wynik, wraca do Google i klika konkurentowi. To oznacza, że nie spełniasz oczekiwań.",
        },
        {
          heading: "Techniczne Fundamenty",
          body: "Robots.txt: Powiedz Google, które strony ma indeksować, które pomijać. Sitemap: Lista wszystkich stron — mapa dla crawlerów. Redirects: Jeśli zmienisz URL, pamiętaj o 301 redirect. Inaczej tracisz ranking authority. Hreflang: Jeśli strona w kilku językach, powiedz Google, którą wersję pokazać komu.",
        },
        {
          heading: "Podsumowanie",
          body: "SEO to maraton, nie sprint. Strona to start. Reszta — treść, backlinki, obsługa, E-E-A-T — to praca co miesiąc.",
        },
      ],
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slugEn === slug || a.slugPl === slug);
}
