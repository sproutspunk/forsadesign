export interface ContentSection {
  heading?: string;
  body: string;
}

export interface ArticleSource {
  label: string;
  href: string;
}

export interface ArticleLang {
  title: string;
  excerpt: string;
  sections: ContentSection[];
  sources?: ArticleSource[];
  relatedLinks?: ArticleSource[];
}

export interface Article {
  slugEn: string;
  slugPl: string;
  dateIso: string;
  publishedDateIso?: string;
  readingTimeMin: number;
  en: ArticleLang;
  pl: ArticleLang;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slugEn === slug || a.slugPl === slug);
}

export const articles: Article[] = [
  {
    dateIso: "2026-11-16",
    slugPl: "wyszukiwarka-katalogu-b2b-numery-czesci",
    slugEn: "b2b-catalogue-part-number-search",
    pl: {
      title: "Wyszukiwarka w katalogu B2B: jak szukać po numerach części",
      excerpt:
        "Numery części, warianty i brak wyników wymagają jasnych reguł. Jak zaprojektować wyszukiwanie, które zachowuje znaczenie oznaczeń produktu.",
      sections: [
        {
          body: "Kupujący wpisuje oznaczenie ze starego zamówienia. Katalog zwraca kilkanaście podobnych produktów, ale nie pokazuje, czy którykolwiek ma dokładnie ten numer. To przykładowa sytuacja, od której warto zacząć projektowanie wyszukiwarki. Osobno trzeba obsłużyć osobę znającą numer części i osobę dopiero szukającą produktu o określonych parametrach.",
        },
        {
          body: "Przed wyborem silnika wyszukiwania ustal, co oznaczają dane w katalogu. Numer producenta, symbol wewnętrzny, nazwa rodziny i opis zastosowania nie powinny być traktowane jak jedno pole. Każde pomaga odpowiedzieć na inne pytanie.",
        },
        {
          heading: "Dokładny numer powinien mieć pierwszeństwo",
          body: "Jeżeli zapytanie odpowiada pełnemu identyfikatorowi, pokaż dokładne dopasowanie w pierwszej kolejności i wyjaśnij, które pole się zgadza. Obok mogą pojawić się wyniki szersze, ale z odrębnym oznaczeniem. Podobieństwo tekstu nie potwierdza zgodności technicznej części.",
        },
        {
          body: "Numer bywa unikalny tylko w obrębie producenta lub systemu źródłowego. Ustal więc, czy wyszukiwanie wymaga pary producent plus numer. Jeżeli dwa rekordy mają podobne oznaczenia, karta wyników powinna pokazać informację pozwalającą je rozróżnić, zamiast wymagać otwarcia każdego produktu.",
        },
        {
          heading: "Nie usuwaj znaków bez reguły",
          body: "Przykładowe, fikcyjne oznaczenia AB-010 i AB010 mogą wskazywać ten sam element, jeżeli tak definiuje je źródło danych. Mogą też być dwoma różnymi numerami. Nie należy zakładać równoważności wyłącznie dlatego, że usunięcie myślnika poprawia liczbę wyników.",
        },
        {
          body: "To samo dotyczy zer na początku, ukośników i spacji. Zapisz dozwolone przekształcenia dla konkretnego pola, przetestuj je na zatwierdzonych rekordach i zachowaj oryginalne oznaczenie do wyświetlenia oraz wysłania zapytania. Traktowanie identyfikatora jak zwykłej liczby może zgubić istotną część zapisu.",
        },
        {
          heading: "Parametry zawężają wybór, ale nie zastępują doboru",
          body: "Gdy klient nie zna numeru, potrzebuje innej drogi: kategorii, materiału, wymiarów lub warunków zastosowania. Filtry powinny korzystać z uporządkowanych danych. Wyjaśnij jednostkę przy wartości i odróżnij brak informacji od wartości zero.",
        },
        {
          body: "Wybrane filtry muszą pozostać widoczne i dawać się pojedynczo usunąć. Jeżeli wyników nie ma, pokaż, które ograniczenia są nadal aktywne. Sugestia podobnego produktu wymaga ostrożnej nazwy: „podobne oznaczenie” albo „wynik w tej kategorii” nie oznacza zatwierdzonego zamiennika.",
        },
        {
          heading: "Brak wyników powinien zostawiać drogę do zapytania",
          body: "Zachowaj wpisany tekst. Zaproponuj sprawdzenie producenta lub zdjęcie jednego filtra, jeśli taka możliwość rzeczywiście istnieje. Nie poprawiaj automatycznie numeru części tak, aby bez potwierdzenia prowadził do innego produktu.",
        },
        {
          body: "Dodaj możliwość wysłania zapytania z zachowanym numerem i filtrami. Klient może dołączyć opis albo dokument przez odpowiednio przygotowany formularz. Handlowiec powinien otrzymać także oryginalne zapytanie, a nie tylko zmodyfikowaną wersję używaną przez wyszukiwarkę.",
        },
        {
          heading: "Wynik musi pozostać zrozumiały na telefonie i bez myszy",
          body: "Pole wyszukiwania potrzebuje etykiety opisującej jego cel. Przykład w pustym polu może pomagać, ale nie powinien zastępować etykiety. Sprawdź klawiaturą otwarcie wyników, zmianę filtrów i powrót do wcześniejszego zapytania.",
        },
        {
          body: "Jeśli wyniki aktualizują się bez przeładowania strony, udostępnij czytnikowi ekranu krótki komunikat o stanie, na przykład liczbę znalezionych pozycji lub brak dopasowania. W3C rozróżnia taki komunikat od samej listy wyników. Nie trzeba przenosić fokusu ani automatycznie odczytywać całej listy przy każdej zmianie.",
        },
        {
          heading: "Sprawdź reguły na małym zestawie rzeczywistych zapytań",
          body: "Przed odbiorem przygotuj zatwierdzony zestaw przypadków: pełny numer, dopuszczalny wariant zapisu, fragment oznaczenia, numer nieistniejący oraz zapytanie wykluczone aktywnym filtrem. Dla każdego zapisz oczekiwany wynik i pole, które ma o nim zdecydować. Powtórz próby na telefonie.",
        },
        {
          body: "Jeżeli katalog pokazuje informacje zależne od konta, sprawdź również dostęp po stronie API. Ukrycie pola w karcie wyników nie wystarcza, gdy odpowiedź nadal zawiera dane innej organizacji. Po zmianach w danych produktowych uruchom ten sam zestaw prób ponownie. Taki sprawdzian pozwala ocenić konkretną regułę, zamiast uznawać większą liczbę wyników za automatyczną poprawę.",
        },
      ],
      sources: [
        {
          label: "W3C WAI: Labeling Controls",
          href: "https://www.w3.org/WAI/tutorials/forms/labels/",
        },
        {
          label: "W3C: Understanding Status Messages (4.1.3)",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
        },
      ],
      relatedLinks: [
        {
          label: "Katalog B2B bez koszyka",
          href: "/pl/blog/katalog-b2b-bez-koszyka-kiedy-ma-sens/",
        },
        {
          label: "Formularz RFQ",
          href: "/pl/blog/formularz-zapytania-ofertowego-dla-przemyslu/",
        },
        {
          label: "Dostępność katalogu B2B",
          href: "/pl/blog/dostepny-katalog-i-formularz-b2b/",
        },
        {
          label: "Usługi Forsa Design",
          href: "/pl/services/",
        },
      ],
    },
    en: {
      title: "B2B catalogue search: getting part numbers right",
      excerpt:
        "Part numbers, variants and empty results need clear rules. Design catalogue search that preserves product identifiers and gives buyers a useful next step.",
      sections: [
        {
          body: "A buyer enters a reference from an earlier purchase order. The catalogue returns several similar products without showing whether any has that exact number. This is an example of a task worth testing before choosing a search engine. Someone who knows a part number needs a different route from someone still selecting a product by specification.",
        },
        {
          body: "First establish what the catalogue data means. A manufacturer reference, an internal stock code, a product-family name and an application description should not be treated as one interchangeable field. Each supports a different question.",
        },
        {
          heading: "Give an exact reference priority",
          body: "Where a query matches a complete identifier, show the exact match first and explain which field matched. Broader results can follow with a separate description. Text similarity does not establish that two components are technically interchangeable.",
        },
        {
          body: "A reference may be unique only within a manufacturer or source system. Decide whether a match needs both the manufacturer and its part number. Where records have similar identifiers, include enough context on each result to distinguish them without opening every product page.",
        },
        {
          heading: "Do not discard characters without an agreed rule",
          body: "Consider the fictional references AB-010 and AB010. They may identify the same item if the source data defines them as equivalent. They may also identify different items. Removing a hyphen should not establish equivalence simply because it produces more results.",
        },
        {
          body: "Apply the same discipline to leading zeroes, slashes and spaces. Document permitted transformations for each field, test them against approved records and retain the original identifier for display and enquiries. Converting an identifier into a number can remove a meaningful part of its notation.",
        },
        {
          heading: "Use specifications to narrow the choice",
          body: "A buyer without a reference needs categories, materials, dimensions or application conditions. Build filters from structured data. Identify the unit beside a value and distinguish missing information from zero.",
        },
        {
          body: "Keep selected filters visible and individually removable. When there are no results, show which restrictions remain active. Name suggestions carefully: a similar reference or a result in the same category is not an approved replacement component. Technical suitability still needs the appropriate assessment.",
        },
        {
          heading: "An empty result should still offer a route forward",
          body: "Retain the entered query. Offer a manufacturer check or removal of a filter where those options are genuinely available. Do not silently correct a part number so that it selects a different product.",
        },
        {
          body: "Provide an enquiry route that carries over the reference and selected filters. Buyers can supply a description or document through a suitably designed form. The commercial team should receive the original query as well as any transformed value used internally by search.",
        },
        {
          heading: "Keep the task usable on a phone and without a mouse",
          body: "Give the search input a label describing its purpose. An example inside an empty field can help, but should not replace the label. Use a keyboard to test opening results, changing filters and returning to the previous query.",
        },
        {
          body: "If results update without a page reload, make a short status message available to screen readers, such as the result count or the absence of a match. W3C distinguishes that message from the results list itself. There is no need to move focus or automatically announce the entire list after every update.",
        },
        {
          heading: "Review the rules with a small set of actual queries",
          body: "Before acceptance, agree a test set containing a complete reference, a permitted spelling variant, part of an identifier, a nonexistent reference and a query excluded by an active filter. Record the expected outcome and the field responsible for the match. Repeat the tasks on a phone.",
        },
        {
          body: "If the catalogue contains account-specific information, test API access as well. Hiding a field in the result card is insufficient when the response still contains another organisation’s data. Re-run the agreed queries after changes to product data. This assesses defined matching rules rather than assuming that a larger results list is necessarily better.",
        },
      ],
      sources: [
        {
          label: "W3C WAI: Labeling Controls",
          href: "https://www.w3.org/WAI/tutorials/forms/labels/",
        },
        {
          label: "W3C: Understanding Status Messages (4.1.3)",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
        },
      ],
      relatedLinks: [
        {
          label: "A B2B catalogue without checkout",
          href: "/en/blog/b2b-product-catalogue-without-checkout/",
        },
        {
          label: "An industrial RFQ form",
          href: "/en/blog/useful-industrial-rfq-form/",
        },
        {
          label: "Accessible B2B catalogue journeys",
          href: "/en/blog/accessible-b2b-catalogue-and-enquiry-forms/",
        },
        {
          label: "Forsa Design services",
          href: "/en/services/",
        },
      ],
    },
    readingTimeMin: 4,
  },
  {
    slugEn: "industrial-website-supplier-checks",
    slugPl: "strona-przemyslowa-gotowa-na-weryfikacje-dostawcy",
    dateIso: "2026-08-14",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
    pl: {
      title: "Czy Twoja strona przechodzi weryfikację dostawcy?",
      excerpt:
        "Strona może pomóc kupcowi sprawdzić, czy firma pasuje do zadania. Strona powinna pomóc mu potwierdzić kompetencje, zakres dostaw i właściwy kontakt.",
      sections: [
        {
          body: "Wyobraź sobie kupca szukającego alternatywnego dostawcy elementów ze stali nierdzewnej. Zna nazwę firmy, ale potrzebuje potwierdzenia dostępnych procesów, zakresu prac i drogi kontaktu. To konkretne zadanie, które można sprawdzić na własnej stronie.",
        },
        {
          body: "Nie zastąpi audytu dostawcy ani dokumentacji wymaganej w konkretnym przetargu. Może jednak usunąć niepotrzebne pytania już na początku. Jeżeli odbiorca musi zgadywać, czym zajmuje się firma, weryfikacja zaczyna się od przeszkody.",
        },
        {
          body: "„Kompleksowe rozwiązania dla przemysłu” niewiele mówi osobie szukającej określonego procesu. Lepiej wymienić obsługiwane materiały, typy urządzeń, zakres wymiarowy lub rodzaje dostaw. Tam, gdzie parametry zależą od projektu, trzeba to wyraźnie zaznaczyć.",
          heading: "Zakres, który da się zweryfikować",
        },
        {
          body: "Przykładowo informacja o obróbce elementów ze stali nierdzewnej jest użyteczniejsza niż samo zapewnienie o najwyższej jakości. Jeszcze lepiej, gdy odbiorca znajdzie opis dostępnych operacji i dowie się, jakie dane są potrzebne do oceny wykonalności. Konkret pozwala sprawdzić dopasowanie bez składania obietnic ponad rzeczywiste możliwości firmy.",
        },
        {
          body: "Certyfikaty, uprawnienia i realizacje mają wartość wtedy, gdy wiadomo, czego dotyczą. Przy certyfikacie warto podać zakres, jednostkę wystawiającą i aktualność dokumentu. Samo logo normy bez kontekstu nie wyjaśnia, czy obejmuje ono konkretną usługę.",
          heading: "Dowody zamiast ozdobnych znaczków",
        },
        {
          body: "Podobnie z realizacjami. Opis zadania, ograniczeń i dostarczonego zakresu bywa bardziej przydatny niż galeria podpisana „nasze projekty”. Jeżeli umowa zabrania ujawnienia klienta, można opisać proces lub kategorię zastosowania bez publikowania poufnych informacji. Najpierw trzeba sprawdzić, na co firma rzeczywiście ma zgodę.",
        },
        {
          body: "Ogólny formularz jest dobrym początkiem, ale odbiorca powinien wiedzieć, gdzie skierować pytanie techniczne, handlowe lub serwisowe. Nie trzeba publikować prywatnych numerów całego zespołu. Wystarczy jasna ścieżka oraz informacja, kto odpowiada za dalszą obsługę.",
          heading: "Kontakt do właściwej osoby",
        },
        {
          body: "Warto też podać nazwę podmiotu, lokalizację i obszar działania. Jeżeli montaż lub serwis jest dostępny tylko w określonych regionach, niech strona mówi o tym wprost. Kupiec potrzebuje praktycznych granic współpracy, nie samego hasła „działamy globalnie”.",
        },
        {
          body: "Poproś osobę spoza firmy o znalezienie trzech rzeczy: zakresu usługi, dokumentu potwierdzającego kompetencje i kontaktu do zapytania. Nie podpowiadaj, gdzie kliknąć. Zapisz miejsca, w których zaczyna zgadywać.",
          heading: "Szybki test własnej strony",
        },
        {
          body: "Zapisz brakujące informacje i przypisz każdą do osoby, która może ją potwierdzić. Następnie powtórz test po poprawkach. W ten sposób oceniasz konkretną ścieżkę weryfikacji, zamiast zgadywać, czy nowy układ jest czytelniejszy.",
        },
      ],
    },
    en: {
      title: "Does your industrial website help buyers check your business?",
      excerpt:
        "A website can help a buyer check whether your company fits the job. Your website should help them verify capabilities, delivery scope and the right contact.",
      sections: [
        {
          body: "Consider a buyer looking for an alternative supplier of stainless-steel components. They know the company name but need to establish its processes, scope and contact route. This gives you a specific task to test on your own website.",
        },
        {
          body: "It cannot replace a supplier audit or the documents required for a particular tender. It can remove unnecessary questions at the start. If visitors have to guess what the company actually does, the assessment begins with an obstacle.",
        },
        {
          body: "“Complete industrial solutions” tells somebody looking for a particular process very little. State the materials, equipment types, dimensional range or supply categories you support. Where a capability depends on the project, make that qualification visible.",
          heading: "A scope that buyers can check",
        },
        {
          body: "Information about machining stainless-steel components is more useful than a general promise of outstanding quality. A description of available operations and the information needed for a feasibility assessment is better still. Specific details help buyers establish a fit without promising more than the business can deliver.",
        },
        {
          body: "Certificates, qualifications and project examples matter when readers understand what they cover. A certificate entry should explain its scope, issuing organisation and current status. A standards logo on its own does not establish whether a particular service is covered.",
          heading: "Evidence with useful context",
        },
        {
          body: "The same applies to completed work. An explanation of the task, constraints and delivered scope can be more useful than a gallery labelled “our projects”. Where an agreement prevents identifying the customer, it may be possible to describe the process or application category without disclosing confidential information. Check permission before publishing anything.",
        },
        {
          body: "A general contact form is a reasonable starting point, but visitors should understand where technical, commercial and service questions go. Publishing everybody’s personal telephone number is unnecessary. What matters is a clear route and an explanation of who handles the next step.",
          heading: "A route to the right conversation",
        },
        {
          body: "Include the legal business name, location and operating area as well. If installation or servicing is available only in certain regions, say so. A buyer needs the practical boundaries of a working relationship, rather than an unsupported statement that the company operates globally.",
        },
        {
          body: "Ask somebody outside the company to find three things: a service’s scope, evidence supporting the relevant capability, and the contact route for an enquiry. Do not tell them where to click. Note where they start making assumptions.",
          heading: "Test the site without helping",
        },
        {
          body: "List the missing information and assign each item to someone who can verify it. Repeat the task after making changes. This assesses a specific supplier-checking journey rather than relying on an impression that the new layout looks clearer.",
        },
      ],
    },
  },
  {
    slugEn: "b2b-product-catalogue-without-checkout",
    slugPl: "katalog-b2b-bez-koszyka-kiedy-ma-sens",
    dateIso: "2026-08-21",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
    pl: {
      title: "Katalog B2B bez koszyka. Kiedy to lepszy wybór?",
      excerpt:
        "Nie każdy produkt przemysłowy powinien kończyć drogę zakupową płatnością online. Czasami dobrze zbudowany katalog i zapytanie ofertowe lepiej odpowiadają sposobowi sprzedaży.",
      sections: [
        {
          body: "Przy rozmowie o nowej stronie katalog produktów łatwo zamienia się w projekt sklepu. Skoro produkt ma nazwę, zdjęcie i numer, można przecież dodać cenę oraz koszyk. Problem pojawia się wtedy, gdy rzeczywista oferta wymaga doboru wariantu, sprawdzenia zastosowania albo uzgodnienia dostawy.",
        },
        {
          body: "W takiej sytuacji koszyk może sugerować gotowość do transakcji, której firma nie potrafi jeszcze potwierdzić. Najpierw ustal więc, które etapy sprzedaży można obsłużyć bez rozmowy, a które wymagają potwierdzenia.",
        },
        {
          body: "Dobry katalog pozwala zawęzić wybór: znaleźć rodzinę produktów, porównać istotne parametry, sprawdzić zastosowanie i pobrać dokumentację. Nie musi od razu obiecywać ostatecznej ceny ani terminu wysyłki.",
          heading: "Co kupujący może ustalić samodzielnie",
        },
        {
          body: "Przy części zamiennej kupujący może znać numer producenta. Przy wyposażeniu linii produkcyjnej ważniejsze mogą być warunki pracy, wydajność lub zgodność z istniejącą instalacją. Struktura katalogu powinna odpowiadać tym sposobom szukania. Sprawdź, czy nazwy kategorii pozostają zrozumiałe dla osoby, która nie zna struktury firmowych folderów.",
        },
        {
          body: "Jeżeli cena zależy od konfiguracji, ilości albo kosztów transportu, przycisk „Dodaj do zapytania” może być uczciwszy niż „Kup teraz”. Lista zapytania powinna zachować numery produktów, warianty i ilości. Klient nie powinien przepisywać tych informacji do wiadomości.",
          heading: "Zapytanie zamiast pozornego zamówienia",
        },
        {
          body: "Trzeba też jasno opisać, co stanie się po wysłaniu. Czy firma sprawdzi zgodność zastosowania? Czy potwierdzi dostępność? Czy potrzebne będą dodatkowe rysunki? Taki opis pomaga obu stronom zrozumieć, dlaczego odpowiedź nie jest jeszcze wiążącym zamówieniem.",
        },
        {
          body: "Brak koszyka nie usuwa obowiązku utrzymywania treści. Parametry, pliki i statusy produktów mogą się zmieniać. Ktoś musi odpowiadać za ich aktualność i za wycofanie nieprawidłowej wersji dokumentu.",
          heading: "Katalog też potrzebuje właściciela danych",
        },
        {
          body: "Przed budową warto wybrać źródło danych. Może nim być uporządkowany arkusz, system produktowy lub istniejące oprogramowanie firmy. Ręczne prowadzenie niezależnych opisów w kilku miejscach zwiększa ryzyko rozbieżności. Integracja ma sens wtedy, gdy wiadomo, które dane i z jaką częstotliwością powinny trafiać do katalogu.",
        },
        {
          body: "Rozsądnym pierwszym etapem bywa jedna dobrze opisana grupa produktów, wyszukiwarka po numerze i formularz zapytania zachowujący kontekst. Dopiero potem można ocenić, czy część asortymentu nadaje się do bezpośredniego zamawiania.",
          heading: "Można zacząć od mniejszego zakresu",
        },
        {
          body: "Decyzję warto oprzeć na rzeczywistym procesie handlowym. Jeżeli klient i tak musi uzgodnić specyfikację, katalog powinien przygotować tę rozmowę. Jeśli produkt jest jednoznaczny, dostępność wiarygodna, a warunki sprzedaży ustalone, koszyk może być kolejnym sensownym krokiem.",
        },
      ],
    },
    en: {
      title: "When a B2B product catalogue does not need a checkout",
      excerpt:
        "Not every industrial product should lead directly to an online payment. A structured catalogue and an enquiry process can better reflect the way a business sells.",
      sections: [
        {
          body: "A discussion about a new product catalogue can quickly become a discussion about an online shop. Once a product has a name, photograph and part number, adding a price and basket seems straightforward. The difficulty appears when the actual offer still requires configuration, an application check or an agreed delivery arrangement.",
        },
        {
          body: "In that situation, a checkout can suggest readiness to transact that the business cannot yet confirm. First establish which stages of the sale can happen without a conversation and which still require confirmation.",
        },
        {
          body: "A useful catalogue lets buyers find a product family, compare relevant specifications, check applications and obtain documentation. It does not have to promise a final price or dispatch date immediately.",
          heading: "Help buyers narrow the choice",
        },
        {
          body: "Somebody looking for a spare part may have a manufacturer’s reference. Somebody selecting equipment for a production line may start with operating conditions, capacity or compatibility. Catalogue structure should support those different approaches. Check whether category names make sense to somebody unfamiliar with the company’s internal folder structure.",
        },
        {
          body: "Where price depends on configuration, quantity or freight, “Add to enquiry” can describe the next step more accurately than “Buy now”. The enquiry list should preserve part numbers, variants and quantities. Buyers should not have to type those details into a separate message.",
          heading: "An enquiry should retain the product details",
        },
        {
          body: "Explain what follows submission. Will somebody check application suitability? Is availability still to be confirmed? Might drawings be required? That explanation helps both parties understand why an enquiry is not yet an accepted order.",
        },
        {
          body: "Removing checkout does not remove the need to maintain information. Specifications, documents and product status can change. Somebody needs responsibility for keeping them current and withdrawing an incorrect document version.",
          heading: "Data still needs an owner",
        },
        {
          body: "Choose the data source before building the catalogue. A structured spreadsheet, product information system or existing business application may be appropriate. Maintaining unrelated descriptions in several places creates opportunities for disagreement. Integration becomes useful once the business knows which information must be transferred and how often it changes.",
        },
        {
          body: "A sensible first release might cover one well-described category, part-number search and an enquiry form that retains the buyer’s selection. The business can then assess whether particular products are suitable for direct ordering.",
          heading: "Start with a manageable product family",
        },
        {
          body: "Base that decision on the actual sales process. If specification still needs agreement, the catalogue should prepare the conversation. If the product is unambiguous, availability is reliable and sales conditions are established, a checkout may become the next practical step. The website should represent the process the business can support today.",
        },
      ],
    },
  },
  {
    slugEn: "useful-industrial-rfq-form",
    slugPl: "formularz-zapytania-ofertowego-dla-przemyslu",
    dateIso: "2026-08-28",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
    pl: {
      title: "Formularz RFQ, po którym da się przygotować ofertę",
      excerpt:
        "Dobry formularz zapytania zbiera informacje potrzebne do kolejnego kroku. Nie powinien ani ograniczać się do pustego pola wiadomości, ani przypominać pełnego audytu dostawcy.",
      sections: [
        {
          body: "Wiadomość „proszę o cenę” może oznaczać wiele różnych rzeczy. Czasem dotyczy konkretnego numeru części. Czasem odbiorca dopiero szuka rozwiązania i nie zna specyfikacji. Jeden formularz może obsłużyć obie sytuacje, jeżeli nie zakłada, że wszyscy klienci startują z tego samego miejsca.",
        },
        {
          body: "Najpierw warto ustalić, co zespół handlowy musi wiedzieć, aby wykonać następny krok. Nie wszystko, co przyda się podczas realizacji zamówienia, jest potrzebne przy pierwszym kontakcie.",
        },
        {
          body: "Przy zapytaniu o produkt formularz może przejąć numer katalogowy, wariant i ilość z katalogu. Kupujący powinien zobaczyć ten wybór przed wysłaniem i móc go poprawić. Dane ukryte w kodzie formularza nie zastępują czytelnego podsumowania.",
          heading: "Rozdziel pytanie o produkt od pytania o rozwiązanie",
        },
        {
          body: "Przy zapytaniu o rozwiązanie ważniejsze mogą być zastosowanie, warunki pracy i ograniczenia. Zamiast wymagać modelu urządzenia, można zapytać, co klient chce osiągnąć. Opcja „nie znam jeszcze specyfikacji” pozwala zacząć rozmowę bez wpisywania przypadkowych wartości.",
        },
        {
          body: "Przy pierwszym kontakcie ustal, czy do odpowiedzi wystarczą adres e-mail, opis potrzeby i kontekst zapytania. Numer podatkowy lub pełny adres dostawy mogą być potrzebne na późniejszym etapie. Jeżeli określone pole jest obowiązkowe, zespół powinien umieć wyjaśnić dlaczego.",
          heading: "Wymagaj tylko informacji rzeczywiście niezbędnych",
        },
        {
          body: "Termin realizacji warto odróżnić od terminu odpowiedzi na ofertę. „Potrzebuję wyceny do piątku” nie oznacza „towar musi dotrzeć w piątek”. Osobne pytania pomagają uniknąć takiej pomyłki. Przy międzynarodowej dostawie kraj i orientacyjny kod pocztowy mogą wystarczyć do pierwszej oceny transportu.",
        },
        {
          body: "Rysunek lub lista części często ułatwia ocenę zapytania. Przed dodaniem załączników trzeba jednak ustalić dozwolone formaty, rozmiar oraz sposób przechowywania i udostępniania plików. Osobny komunikat powinien wyjaśniać, jak przekazać duże lub poufne dokumenty.",
          heading: "Załączniki bez pułapki",
        },
        {
          body: "Nie wystarczy sprawdzić rozszerzenia w przeglądarce. Weryfikacja po stronie serwera i kontrola dostępu do plików należą do projektu technicznego. Formularz nie powinien kierować poufnych rysunków do publicznego katalogu.",
        },
        {
          body: "Komunikat sukcesu powinien pojawić się po rzeczywistym przyjęciu zapytania przez serwer. Dobrze, gdy zawiera numer sprawy lub podsumowanie i wyjaśnia następny krok. Jeżeli firma nie ma ustalonego czasu reakcji, nie warto automatycznie obiecywać odpowiedzi w godzinę.",
          heading: "Potwierdzenie musi mówić, co się wydarzyło",
        },
        {
          body: "Przetestuj formularz na telefonie, przy błędnym adresie e-mail, bez załącznika i po przerwaniu połączenia. Sprawdź również, czy wiadomość trafia do osoby, która ma ją obsłużyć. Uwzględnij w odbiorze projektu zarówno wysłanie formularza, jak i odebranie zgłoszenia przez właściwy zespół.",
        },
      ],
      sources: [
        {
          label: "W3C: Forms Tutorial",
          href: "https://www.w3.org/WAI/tutorials/forms/",
        },
        {
          label: "OWASP: File Upload Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
        },
      ],
    },
    en: {
      title: "An industrial RFQ form that supports a useful quotation",
      excerpt:
        "A good enquiry form collects what the next step requires. It should offer more direction than an empty message box without turning first contact into a full supplier audit.",
      sections: [
        {
          body: "“Please send a price” can mean several different things. The buyer may have an exact part number, or they may still be investigating a solution without a finished specification. A form can support both situations if it does not assume that every visitor starts with the same information.",
        },
        {
          body: "Establish what the commercial team needs to take the next step. Not everything required to fulfil an eventual order belongs in the first enquiry.",
        },
        {
          body: "For a product enquiry, the form can carry over the catalogue reference, variant and quantity. Buyers should see that selection before submitting it and be able to correct it. Hidden form values are not a substitute for a readable summary.",
          heading: "Separate product enquiries from application questions",
        },
        {
          body: "For an application enquiry, operating conditions and constraints may matter more than an equipment model. Ask what the buyer needs to achieve. An option such as “specification not yet confirmed” lets somebody start a conversation without inventing values to satisfy required fields.",
        },
        {
          body: "Check whether a reply address, requirement description and enquiry context are enough for the initial response. Tax details or a complete delivery address may belong at a later stage. The team should be able to explain why each compulsory field is needed at this stage.",
          heading: "Be selective about compulsory fields",
        },
        {
          body: "Distinguish the quotation deadline from the required delivery date. “We need your quotation by Friday” does not mean the goods must arrive on Friday. Separate questions make that distinction explicit. For an initial international freight assessment, the destination country and approximate postcode may be enough.",
        },
        {
          body: "A drawing or parts list can help the team assess a requirement. First establish accepted formats, file sizes, storage arrangements and who may access the documents. Explain how buyers should supply large or confidential files.",
          heading: "Plan file handling before adding an upload box",
        },
        {
          body: "Checking the filename extension in the browser is insufficient. Server-side validation and access controls belong in the technical design. Confidential drawings should not be placed in a publicly accessible directory simply because they arrived through a web form.",
        },
        {
          body: "A success message should follow actual acceptance of the enquiry by the server. A reference or summary is useful, along with an explanation of the next step. Avoid promising a response within an hour unless the business has a process that supports it.",
          heading: "Make the confirmation accurate",
        },
        {
          body: "Test on a phone, with an incorrect email address, without an attachment and after interrupting the connection. Check that the submitted enquiry reaches the person responsible for handling it. Include both submission and receipt by the responsible team in the release checks.",
        },
      ],
      sources: [
        {
          label: "W3C: Forms Tutorial",
          href: "https://www.w3.org/WAI/tutorials/forms/",
        },
        {
          label: "OWASP: File Upload Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
        },
      ],
    },
  },
  {
    slugEn: "technical-documentation-website-version-control",
    slugPl: "dokumentacja-techniczna-na-stronie-wersje-i-aktualnosc",
    dateIso: "2026-09-04",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
    pl: {
      title: "PDF na stronie to za mało. Jak uporządkować dokumentację techniczną?",
      excerpt:
        "Instrukcja, karta produktu i deklaracja nie powinny tworzyć przypadkowej listy plików. Kupujący musi wiedzieć, do czego dokument się odnosi i czy jest właściwą wersją.",
      sections: [
        {
          body: "Plik nazwany „karta_final_nowa2.pdf” może być zrozumiały dla osoby, która go wczoraj zapisała. Dla klienta szukającego dokumentacji do konkretnego urządzenia nie jest wiarygodną informacją. Problemem nie musi być sam PDF. Sprawdź, czy przy linku podano kontekst potrzebny do wyboru właściwego dokumentu.",
        },
        {
          body: "Na stronie przemysłowej dokumentacja jest częścią informacji o produkcie. Powinna być powiązana z modelem, wariantem, językiem i zakresem zastosowania. Zanim dołożysz wyszukiwarkę plików, warto uporządkować te zależności.",
        },
        {
          body: "Ustal, kto zatwierdza publikację i kto odpowiada za późniejsze zmiany. Dostawca strony może obsługiwać techniczne dodawanie plików, ale nie powinien zgadywać, która rewizja specyfikacji jest prawidłowa.",
          heading: "Każdy dokument potrzebuje właściciela",
        },
        {
          body: "Przydatny rejestr zawiera nazwę dokumentu, identyfikator, wersję, datę obowiązywania, język i produkt, którego dotyczy. Nie wszystkie informacje muszą zajmować główne miejsce na stronie. Powinny jednak istnieć w uporządkowanym źródle danych, żeby aktualizacja nie zależała od pamięci jednej osoby.",
        },
        {
          body: "Kupujący powinien zobaczyć rodzaj dokumentu, wersję językową, format i rozmiar, zanim otworzy plik. Jest to szczególnie przydatne na telefonie lub słabym połączeniu. Link „Pobierz” bez opisu zmusza do sprawdzania plików po kolei.",
          heading: "Opisuj plik przed pobraniem",
        },
        {
          body: "Najważniejsze parametry produktu warto pokazać również jako tekst na stronie. Dzięki temu użytkownik może szybko ocenić dopasowanie bez pobierania całej instrukcji. To nie oznacza zastępowania dokumentu wymaganego w danym procesie. Chodzi o czytelne wprowadzenie i wskazanie właściwego źródła szczegółów.",
        },
        {
          body: "Przy wymianie pliku trzeba zdecydować, co ma się stać ze starym adresem. Dokument dotyczący wycofanego modelu może nadal być potrzebny jego użytkownikom. Usunięcie go bez ścieżki do archiwum nie zawsze jest dobrym rozwiązaniem.",
          heading: "Aktualizacja bez mieszania wersji",
        },
        {
          body: "Z drugiej strony adres opisany jako „aktualna instrukcja” nie powinien prowadzić raz do starego, raz do nowego pliku w zależności od cache. Spójne nazwy wersji, zasady przekierowań i sprawdzenie po wdrożeniu pomagają ograniczyć takie pomyłki. Archiwalne materiały trzeba wyraźnie oznaczyć.",
        },
        {
          body: "Podstawowa karta produktu i poufny rysunek wykonawczy mogą wymagać zupełnie innych zasad udostępniania. Samo ukrycie linku w menu nie jest kontrolą dostępu. Decyzję o publikacji powinien zatwierdzić właściciel informacji.",
          heading: "Dokument publiczny czy materiał po kontakcie?",
        },
        {
          body: "Dobry porządek w dokumentacji nie kończy się na dniu uruchomienia strony. Potrzebuje procesu aktualizacji oraz prostego testu: czy osoba, która nie zna struktury firmowych folderów, potrafi znaleźć właściwy dokument do konkretnego produktu?",
        },
      ],
    },
    en: {
      title: "Technical documentation needs more than a PDF download link",
      excerpt:
        "Manuals, product sheets and declarations should not become an arbitrary file list. Buyers need to understand what a document covers and whether it is the appropriate version.",
      sections: [
        {
          body: "“Datasheet_final_new2.pdf” may make sense to the person who saved it yesterday. It tells a customer looking for a particular machine’s documentation very little. The problem is not necessarily the PDF format. Check whether the link provides the context needed to select the right document.",
        },
        {
          body: "On an industrial website, documentation forms part of the product information. It should be associated with the relevant model, variant, language and application scope. Organise those relationships before adding another file-search tool.",
        },
        {
          body: "Decide who approves publication and who is responsible for later revisions. A website supplier can handle the technical upload, but should not have to guess which specification revision is correct.",
          heading: "Give the information an owner",
        },
        {
          body: "A useful register records the document name, reference, revision, effective date, language and associated product. Not every field needs prominent placement on the public page. The information should nevertheless exist in a structured source so that updates do not depend on one person remembering the details.",
        },
        {
          body: "Show the document type, language, format and file size before the visitor opens it. This is particularly useful on a phone or a weak connection. A row of identical “Download” links makes people inspect files one at a time.",
          heading: "Explain the download before opening it",
        },
        {
          body: "Present key product specifications as page text as well. Buyers can then assess basic suitability without downloading an entire manual. That does not replace any document required by the relevant process. It provides a readable introduction and a clear route to the detailed source.",
        },
        {
          body: "When replacing a file, decide what should happen to its old address. Documentation for a discontinued model may still be needed by people operating it. Deleting it without an archive route is not always appropriate.",
          heading: "Keep revisions distinguishable",
        },
        {
          body: "Conversely, a link labelled “current manual” should not return different revisions depending on cached responses. Consistent revision names, redirect rules and a check after release help reduce this risk. Archive documents should be clearly identified as such.",
        },
        {
          body: "A basic product sheet and a confidential manufacturing drawing may require different access arrangements. Removing a link from the navigation does not create access control. The information owner should approve the publication decision.",
          heading: "Decide what can be public",
        },
        {
          body: "Documentation management continues after launch. It needs an update process and a straightforward test: can somebody unfamiliar with the company’s folder structure find the appropriate document for a particular product? Record whether the difficulty concerns the filename, product association, revision or navigation, then correct that specific issue.",
        },
      ],
    },
  },
  {
    slugEn: "b2b-catalogue-public-prices-or-quotation",
    slugPl: "ceny-w-katalogu-b2b-publiczne-czy-na-zapytanie",
    dateIso: "2026-09-11",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
    pl: {
      title: "Ceny w katalogu B2B: pokazać, ukryć czy wyjaśnić?",
      excerpt:
        "Cena publiczna, cennik kontraktowy i wycena indywidualna rozwiązują różne problemy. Dobry katalog jasno pokazuje, który model obowiązuje i co klient powinien zrobić dalej.",
      sections: [
        {
          body: "Kupiec znajduje właściwy produkt, ale przy cenie widzi tylko „zapytaj”. Nie wie, czy chodzi o indywidualny rabat, skomplikowany dobór, czy nieaktualny cennik. Sam brak kwoty nie musi być problemem. Problemem jest brak informacji, dlaczego jej nie ma i jak ją uzyskać.",
        },
        {
          body: "Model prezentowania cen powinien wynikać ze sposobu sprzedaży. Jeżeli koszt zależy od materiału, konfiguracji, ilości lub warunków dostawy, jedna kwota może wprowadzać w błąd. Jeżeli firma sprzedaje standardowy element na stałych zasadach, obowiązkowy kontakt przed poznaniem każdej ceny może tylko wydłużać zakup.",
        },
        {
          body: "Przy cenie publicznej podaj walutę, jednostkę oraz informację o podatku. Kupiec musi wiedzieć, czy widzi koszt sztuki, opakowania, metra czy kompletu. Minimalna ilość i wielokrotność zamówienia powinny znajdować się obok, a nie dopiero w wiadomości od handlowca.",
          heading: "Cena wymaga kontekstu",
        },
        {
          body: "Koszt transportu, termin ważności oferty i ewentualne dopłaty wymagają osobnego wyjaśnienia. Cena „od” ma sens wtedy, gdy wiadomo, jakiej konfiguracji dotyczy. Nie powinna sugerować kosztu wersji, której w tej kwocie nie można zamówić.",
        },
        {
          body: "Jeżeli klient ma uzgodnione warunki, konto może pokazywać jego ceny. System musi jednak wiązać użytkownika z właściwą organizacją i jej uprawnieniami. Ukrycie kwoty w interfejsie nie wystarczy, jeżeli odpowiedź API nadal udostępnia cudze dane.",
          heading: "Cennik kontraktowy potrzebuje kontroli dostępu",
        },
        {
          body: "Warto zdefiniować też sytuacje wyjątkowe: wygasły kontrakt, nowy pracownik klienta, brak przypisanego cennika lub przerwa w integracji. Bezpieczniejszym komunikatem jest prośba o potwierdzenie ceny niż przypadkowa kwota z innego konta.",
        },
        {
          body: "Przycisk „Poproś o wycenę” powinien zachować numer produktu, wariant i ilość. Formularz nie może wymagać ponownego przepisywania informacji z karty. Warto wyjaśnić, jakie dodatkowe dane są potrzebne: miejsce dostawy, zastosowanie albo dokumentacja.",
          heading: "Wycena indywidualna też może być wygodna",
        },
        {
          body: "Nie obiecuj automatycznie odpowiedzi w godzinę, jeżeli proces tego nie zapewnia. Lepiej uczciwie opisać następny krok: sprawdzenie doboru, potwierdzenie dostępności i przygotowanie warunków.",
        },
        {
          body: "Przed zmianą całego katalogu wybierz jedną rodzinę produktów i sprawdź rzeczywiste zasady sprzedaży z handlowcami. Porównaj pytania klientów, kompletność zapytań i czas potrzebny na odpowiedź. Dopiero wtedy rozszerz model.",
          heading: "Zacznij od jednej grupy produktów",
        },
        {
          body: "Dla wybranej grupy zapisz trzy reguły: kto widzi cenę, jakie warunki obejmuje kwota i kiedy wymaga ona potwierdzenia. Sprawdź te same reguły w katalogu, formularzu i odpowiedzi z systemu.",
        },
      ],
    },
    en: {
      title: "B2B catalogue prices: publish them, restrict them or explain them?",
      excerpt:
        "Public prices, contract price lists and individual quotations serve different needs. A useful catalogue makes the pricing model clear and shows buyers what to do next.",
      sections: [
        {
          body: "A buyer finds the right product, but the price field says only “Enquire”. Does the product need technical selection? Is there a contract discount? Is the price list out of date? Leaving out a figure can be reasonable. Leaving the reason unexplained makes the process harder.",
        },
        {
          body: "The pricing model should reflect how the business sells. A single figure may mislead when cost depends on material, configuration, quantity or delivery arrangements. For a standard component sold on consistent terms, requiring a conversation before showing every price may simply delay a purchase.",
        },
        {
          body: "Show the currency, unit and tax basis. Buyers need to know whether the figure covers one item, a pack, a metre or a complete assembly. Put minimum quantities and order multiples beside the price.",
          heading: "Give a public price enough context",
        },
        {
          body: "Explain carriage and additional charges separately. A “from” price is useful only when its configuration is identifiable. It should not imply that a more complete version is available for the same amount.",
        },
        {
          body: "An account can display agreed customer prices, but the system must associate each user with the correct organisation and permissions. Hiding a number on screen is insufficient if an API response still exposes another customer's data.",
          heading: "Contract prices need proper access control",
        },
        {
          body: "Define what happens when an agreement expires, a new employee joins, a price list is missing or an integration is unavailable. Asking for confirmation is preferable to displaying an unrelated account's price.",
        },
        {
          body: "A quotation request should retain the product reference, variant and quantity. Buyers should not have to copy information they have already selected. Explain any further requirements, such as the delivery destination, application or supporting drawing.",
          heading: "Make individual quotations convenient",
        },
        {
          body: "Describe the next step honestly: technical selection, availability checks or commercial review. A response-time promise is useful only when the business can support it.",
        },
        {
          body: "Review the actual selling rules with the commercial team before changing the entire catalogue. Start with one family and assess the questions buyers ask, the completeness of enquiries and the work required to answer them.",
          heading: "Trial the model with one product family",
        },
        {
          body: "For the selected product family, record who can see a price, what it includes and when confirmation is required. Check those rules in the catalogue, enquiry form and system response.",
        },
      ],
    },
  },
  {
    slugEn: "website-erp-crm-integration-data-ownership",
    slugPl: "integracja-strony-z-erp-i-crm-zrodlo-danych",
    dateIso: "2026-09-18",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Integracja strony z ERP i CRM zaczyna się od właściciela danych",
      excerpt:
        "Połączenie systemów nie rozwiązuje samo problemu nieaktualnych informacji. Najpierw trzeba ustalić, skąd pochodzą dane, kto je zatwierdza i co dzieje się przy błędzie.",
      sections: [
        {
          body: "„Połączmy stronę z ERP” brzmi jak jedno zadanie. W praktyce może oznaczać publikację produktów, pobieranie stanów, przekazywanie zapytań lub synchronizację klientów. Każdy z tych procesów ma inne zasady i inny koszt pomyłki.",
        },
        {
          body: "Zanim powstanie integracja, warto opisać jeden konkretny przepływ. Na przykład: zaakceptowana karta produktu trafia do katalogu, a zapytanie z tej karty tworzy zadanie w CRM. Taki opis pozwala ustalić odpowiedzialność bez obiecywania, że wszystkie systemy natychmiast będą wiedzieć wszystko.",
        },
        {
          body: "Numer produktu może pochodzić z ERP, opis marketingowy z CMS, a dokumentacja z zatwierdzonego repozytorium. To rozsądny podział, jeżeli jest zapisany. Problem zaczyna się wtedy, gdy dwa systemy nadpisują to samo pole według różnych reguł.",
          heading: "Jedno pole, jedno źródło rozstrzygające",
        },
        {
          body: "Dla każdego pola ustal źródło, właściciela i dozwolony kierunek zmiany. Zmiana tytułu na stronie nie powinna przypadkiem zmieniać nazwy magazynowej w ERP. Dane wycofanego produktu też wymagają reguły: ukrycie, archiwizacja albo zastąpienie innym modelem.",
        },
        {
          body: "Łączenie rekordów po nazwie jest kruche. Nazwy bywają zmieniane, tłumaczone i skracane. Stabilny identyfikator powinien łączyć produkt, wariant, organizację lub zapytanie między systemami.",
          heading: "Identyfikatory są ważniejsze niż podobne nazwy",
        },
        {
          body: "Trzeba również ustalić format jednostek, walut i wartości pustych. Brak stanu magazynowego nie powinien automatycznie oznaczać zera, jeżeli w rzeczywistości oznacza brak aktualnej odpowiedzi.",
        },
        {
          body: "Integracja musi przewidywać niedostępne API, częściową odpowiedź i odrzucony rekord. Zaplanowane ponowienie operacji nie może tworzyć drugiego zapytania w CRM. W tym celu można stosować stabilny identyfikator operacji i wykrywanie duplikatów.",
          heading: "Błąd jest częścią procesu",
        },
        {
          body: "Operator potrzebuje czytelnego statusu: co się nie udało, jaki rekord dotyczy problemu i czy można ponowić operację. Logi nie powinny ujawniać haseł ani pełnej zawartości poufnych załączników.",
        },
        {
          body: "Nie wszystkie dane wymagają synchronizacji w tej samej chwili. Opisy produktów mogą mieć inny rytm niż dostępność. Ustal akceptowalne opóźnienie oraz zachowanie strony, gdy ostatnia aktualizacja jest zbyt stara.",
          heading: "Aktualność musi być widoczna",
        },
        {
          body: "Zacznij od małego przepływu i przetestuj również jego awarię. Przy odbiorze wskaż osobę odpowiedzialną za alarmy i przećwicz ponowienie odrzuconego rekordu bez tworzenia duplikatu.",
        },
      ],
    },
    en: {
      title: "Website integrations start with ownership of the data",
      excerpt:
        "Connecting a website to ERP or CRM does not automatically make its information reliable. First define where data comes from, who approves it and what happens when a transfer fails.",
      sections: [
        {
          body: "“Connect the website to ERP” can describe several different jobs: publishing products, retrieving stock, passing enquiries or synchronising customers. Each has different rules and a different consequence when something goes wrong.",
        },
        {
          body: "Start by describing one flow. An approved product record becomes available in the catalogue; an enquiry from that page creates a CRM task. A specific process is easier to design and assess than a promise that every system will instantly share everything.",
        },
        {
          body: "ERP may own product references, the CMS may own editorial descriptions and a separate repository may hold approved documents. That division works when it is explicit. Problems arise when two systems overwrite the same field under different rules.",
          heading: "Give each field a controlling source",
        },
        {
          body: "Define the source, owner and permitted direction of changes. Editing a website heading should not accidentally rename a stock item. Withdrawn products also need a rule: removal, archiving or a link to a replacement.",
        },
        {
          body: "Names change, get translated and become abbreviated. Use stable identifiers to connect products, variants, organisations and enquiries across systems.",
          heading: "Match records with stable identifiers",
        },
        {
          body: "Agree units, currencies and the meaning of empty values. A missing stock response should not become zero if it actually means that current availability is unknown.",
        },
        {
          body: "Expect unavailable APIs, partial responses and rejected records. Retrying a transfer must not create a second CRM enquiry. Stable operation identifiers and duplicate detection can help make retries safe.",
          heading: "Design the failure route",
        },
        {
          body: "The operator needs to see what failed, which record is affected and whether the operation can be retried. Logs should support diagnosis without exposing credentials or confidential attachments.",
        },
        {
          body: "Product descriptions and stock availability may need different update schedules. Define acceptable delay and what the website displays when its last successful update is too old.",
          heading: "Decide how current each value must be",
        },
        {
          body: "Begin with a small flow and test its failure as well as its success. At handover, assign responsibility for alerts and practise retrying a rejected record without creating a duplicate.",
        },
      ],
    },
  },
  {
    slugEn: "multilingual-industrial-website-beyond-translation",
    slugPl: "wielojezyczna-strona-przemyslowa-wiecej-niz-tlumaczenie",
    dateIso: "2026-09-25",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Wielojęzyczna strona przemysłowa to więcej niż tłumaczenie",
      excerpt:
        "Przetłumaczone menu nie wystarczy, jeżeli kupiec nadal otrzymuje niewłaściwe jednostki, dokumenty i informacje o obsłudze. Wersja językowa powinna wspierać cały proces zapytania.",
      sections: [
        {
          body: "Polska i angielska karta produktu mogą wyglądać identycznie, a mimo to przekazywać różne informacje. W jednej jest aktualna instrukcja, w drugiej stara karta. Jeden formularz trafia do właściwego zespołu, drugi nie przekazuje języka rozmowy. W przeglądzie wersji językowych uwzględnij więc pliki, przekazywanie zgłoszeń i treść potwierdzeń.",
        },
        {
          body: "Przy planowaniu wersji językowej warto przejść drogę klienta od wyszukania produktu do potwierdzenia wysłania zapytania. Każdy etap powinien pozostać zrozumiały również wtedy, gdy część dokumentacji jest dostępna tylko w jednym języku.",
        },
        {
          body: "Nazwy techniczne powinny być spójne w katalogu, formularzach i dokumentacji. Tłumaczenie tej samej części na trzy sposoby utrudnia znalezienie produktu i rozmowę z handlowcem. Warto przygotować krótki słownik zatwierdzony przez osobę znającą branżę.",
          heading: "Najpierw słownik terminów",
        },
        {
          body: "Nie tłumacz automatycznie oznaczeń modeli, numerów części i nazw norm. Oddziel identyfikatory od opisu. Tam, gdzie znaczenie zależy od zastosowania, tłumaczenie wymaga sprawdzenia merytorycznego.",
        },
        {
          body: "Separator dziesiętny, zapis daty, jednostka i waluta mogą zmienić interpretację wartości. Formularz powinien jasno podawać oczekiwany format i poprawnie walidować dane po stronie serwera.",
          heading: "Liczby też są treścią",
        },
        {
          body: "Przeliczanie jednostek wymaga ustalonej dokładności. Nie należy tworzyć pozornie precyzyjnych wartości przez automatyczne dodawanie cyfr. W razie wątpliwości lepiej pokazać zatwierdzone dane producenta i wskazać jednostkę źródłową.",
        },
        {
          body: "Jeżeli instrukcja istnieje tylko po angielsku, oznacz to przed pobraniem. Nie kieruj polskiego przycisku do przypadkowej, starszej wersji dokumentu tylko dlatego, że ma polski tytuł.",
          heading: "Dokumentacja i obsługa muszą być uczciwie opisane",
        },
        {
          body: "Podobnie z kontaktem: wyjaśnij dostępne języki obsługi i zakres dostaw. Formularz powinien zachować język strony oraz wybrany produkt, aby osoba odpowiadająca znała kontekst.",
        },
        {
          body: "Przełącznik języka powinien prowadzić do tego samego produktu lub artykułu, jeśli odpowiednik istnieje. Wysyłanie zawsze na stronę główną zmusza użytkownika do ponownego szukania.",
          heading: "Połącz odpowiadające sobie strony",
        },
        {
          body: "Dla wyszukiwarek należy poprawnie skonfigurować adresy wersji i wzajemne oznaczenia hreflang. Każda wersja potrzebuje spójnego adresu kanonicznego. To konfiguracja wymagająca sprawdzenia, a nie mechanicznego dodania tagów.",
        },
        {
          body: "Przed publikacją przetestuj pełne zapytanie w każdym języku. Sprawdź zgodność numeru produktu, danych liczbowych, języka dokumentu i wiadomości odebranej przez zespół.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: Localised versions",
          href: "https://developers.google.com/search/docs/specialty/international/localized-versions",
        },
      ],
    },
    en: {
      title: "A multilingual industrial website needs more than translated text",
      excerpt:
        "A translated menu is not enough when buyers still encounter unsuitable units, outdated documents or an enquiry route that loses their language. Localisation should cover the whole buying task.",
      sections: [
        {
          body: "Two language versions can look identical while providing different information. One product page has a current manual; the other links to an obsolete file. One enquiry reaches the right team; the other loses the customer's language. Include document links, enquiry routing and confirmation messages in the language review.",
        },
        {
          body: "Review the journey from product search to enquiry confirmation. Each step should remain understandable even where supporting documentation exists in only one language.",
        },
        {
          body: "Use consistent terminology across the catalogue, forms and documentation. Translating the same component in several ways makes both searching and discussing it harder. A short glossary reviewed by someone with industry knowledge is a useful starting point.",
          heading: "Agree the technical vocabulary",
        },
        {
          body: "Keep model references, part numbers and standards identifiers separate from descriptive text. Do not automatically translate identifiers. Application-specific terminology needs technical review.",
        },
        {
          body: "Decimal separators, date formats, units and currencies affect interpretation. A form should explain its expected format and validate submitted values on the server.",
          heading: "Treat numbers as content",
        },
        {
          body: "Unit conversions need an agreed level of precision. Adding digits does not make a converted value more accurate. Where appropriate, show approved manufacturer data and identify its source unit.",
        },
        {
          body: "If a manual is available only in English, say so before download. Do not substitute an older document merely because its title matches the visitor's language.",
          heading: "Explain documentation and support honestly",
        },
        {
          body: "Explain the available support languages and delivery coverage. Preserve the page language and selected product when passing an enquiry to the team.",
        },
        {
          body: "A language switch should take visitors to the corresponding product or article where one exists. Returning them to the home page makes them repeat their search.",
          heading: "Connect equivalent pages",
        },
        {
          body: "For search engines, configure language URLs and reciprocal hreflang annotations correctly. Give each version a consistent canonical URL. These relationships need checking rather than adding tags mechanically.",
        },
        {
          body: "Test a complete enquiry in every supported language before release. Compare the product reference, numeric inputs, document language and message received by the team.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: Localised versions",
          href: "https://developers.google.com/search/docs/specialty/international/localized-versions",
        },
      ],
    },
  },
  {
    slugEn: "product-configurator-or-enquiry-form",
    slugPl: "konfigurator-produktu-czy-formularz-zapytania",
    dateIso: "2026-10-02",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Konfigurator produktu czy dobry formularz zapytania?",
      excerpt:
        "Konfigurator pomaga wtedy, gdy potrafi sprawdzić rzeczywiste reguły doboru. Jeśli tych reguł jeszcze nie opisano, rozbudowany interfejs może tylko ukryć niepewność.",
      sections: [
        {
          body: "Wybór wymiaru, materiału i wyposażenia wygląda jak prosty zestaw pól. W produkcie przemysłowym jedna decyzja często zmienia dostępne opcje, dokumentację oraz termin. Zanim powstanie konfigurator, trzeba ustalić, które kombinacje są dozwolone i kto odpowiada za te zasady.",
        },
        {
          body: "Sam atrakcyjny ekran nie wystarczy. Klient może skonfigurować coś, czego firma nie produkuje, albo otrzymać orientacyjną cenę bez świadomości jej ograniczeń. Dobór techniczny musi mieć oparcie w zatwierdzonych danych.",
        },
        {
          body: "Zacznij od tabeli wariantów i zależności. Który materiał dopuszcza dany zakres wymiarów? Kiedy konieczna jest dodatkowa kontrola? Jakie dane wejściowe wymagają konsultacji z inżynierem?",
          heading: "Opisz decyzje, które rzeczywiście można zautomatyzować",
        },
        {
          body: "Właściciel produktu powinien zatwierdzić reguły. Trzeba również ustalić sposób ich aktualizacji. Jeżeli zespół nie potrafi utrzymać tej wiedzy, prostszy formularz z dobrze opisanymi wymaganiami może być rozsądniejszym pierwszym krokiem.",
        },
        {
          body: "Niedostępna opcja powinna mieć zrozumiałe uzasadnienie. „Nie można połączyć tego materiału z wybraną temperaturą pracy” daje więcej niż wyszarzony przycisk bez komentarza.",
          heading: "Wyjaśniaj ograniczenia w momencie wyboru",
        },
        {
          body: "Zmiana wcześniejszej odpowiedzi nie powinna po cichu kasować dalszych wyborów. Pokaż, co wymaga ponownego sprawdzenia. Na telefonie użytkownik musi móc wrócić do poprzedniego kroku bez utraty całej pracy.",
        },
        {
          body: "Podsumowanie powinno wymieniać parametry, ilość i założenia. Jeżeli wynik wymaga technicznego potwierdzenia, nazwij go zapytaniem lub wstępną konfiguracją. Nie sugeruj gotowego zamówienia, gdy cena i wykonalność nie zostały sprawdzone.",
          heading: "Oddziel konfigurację od zatwierdzonej oferty",
        },
        {
          body: "Przesłane dane trzeba ponownie zweryfikować na serwerze. Reguły widoczne w przeglądarce pomagają klientowi, ale nie stanowią wystarczającej kontroli poprawności zgłoszenia.",
        },
        {
          body: "Najlepszym początkiem bywa jedna rodzina produktów z ograniczoną liczbą wariantów. Sprawdź, czy klienci potrafią zakończyć dobór i czy handlowiec otrzymuje dane potrzebne do odpowiedzi. Testuj również kombinacje graniczne i niepełne zgłoszenia.",
          heading: "Zacznij od powtarzalnego przypadku",
        },
        {
          body: "Zapisuj pytania wymagające ręcznego wyjaśnienia. Kolejne reguły dodawaj dopiero po zatwierdzeniu przez właściciela produktu. Jeżeli dana decyzja nadal wymaga oceny inżyniera, zostaw wyraźną drogę do konsultacji.",
        },
      ],
      sources: [
        {
          label: "OWASP: Input Validation Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
        },
      ],
    },
    en: {
      title: "Do you need a product configurator or a better enquiry form?",
      excerpt:
        "A configurator is useful when it can apply genuine selection rules. If those rules remain undefined, a sophisticated interface may only hide uncertainty.",
      sections: [
        {
          body: "Choosing dimensions, material and accessories can look like a simple set of fields. For an industrial product, one choice may change the available options, documentation and lead time. Define permitted combinations and responsibility for the rules before building the interface.",
        },
        {
          body: "An attractive screen cannot establish technical feasibility. Buyers may select something the business cannot manufacture, or mistake an indicative price for a confirmed quotation. Product selection needs approved information behind it.",
        },
        {
          body: "Begin with a table of variants and dependencies. Which materials support a given size range? When is an additional review required? Which inputs need an engineer's assessment?",
          heading: "Identify decisions that can be automated",
        },
        {
          body: "The product owner should approve these rules and their update process. If the business cannot maintain that knowledge yet, a clear enquiry form may be the more useful first step.",
        },
        {
          body: "An unavailable option needs a reason. Explaining that a material is unsuitable for the selected operating temperature is more helpful than disabling a control without explanation.",
          heading: "Explain constraints as buyers encounter them",
        },
        {
          body: "Changing an earlier answer should not silently erase later choices. Show what needs checking again. Mobile users must be able to revisit a step without losing their work.",
        },
        {
          body: "The summary should list parameters, quantity and assumptions. If technical approval is still required, call the result an enquiry or provisional configuration. Do not present it as an order when price and feasibility remain unconfirmed.",
          heading: "Separate selection from a confirmed quotation",
        },
        {
          body: "Validate submitted values again on the server. Browser rules help the buyer, but they cannot be the only check on the request.",
        },
        {
          body: "One product family with a manageable set of variants is often enough for an initial release. Check whether buyers can finish the task and whether the sales team receives useful information. Include boundary combinations and incomplete requests in testing.",
          heading: "Start with a repeatable case",
        },
        {
          body: "Record questions that still require manual explanation. Add further rules only after product-owner approval. Where an engineering assessment remains necessary, retain a clear consultation route.",
        },
      ],
      sources: [
        {
          label: "OWASP: Input Validation Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
        },
      ],
    },
  },
  {
    slugEn: "accessible-b2b-catalogue-and-enquiry-forms",
    slugPl: "dostepny-katalog-i-formularz-b2b",
    dateIso: "2026-10-09",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Dostępność katalogu B2B sprawdza się przy konkretnym zadaniu",
      excerpt:
        "Czy da się znaleźć część, porównać parametry i wysłać zapytanie bez myszy? To praktyczny sposób sprawdzenia jednej ścieżki korzystania z katalogu.",
      sections: [
        {
          body: "Katalog przemysłowy może mieć czytelny układ, a mimo to utrudniać wykonanie prostego zadania. Filtr działa tylko po najechaniu, tabela wymaga precyzyjnego przesuwania, a błąd formularza jest zaznaczony wyłącznie kolorem. W takich przypadkach sprawdź, czy funkcja pozostaje dostępna bez wskazywania myszką, precyzyjnego gestu lub rozpoznawania koloru.",
        },
        {
          body: "Dostępność warto sprawdzać jako część codziennego procesu zakupowego. Wybierz produkt, znajdź właściwy wariant, dodaj go do zapytania i wyślij formularz. Przejdź tę drogę klawiaturą, na telefonie i przy powiększonym tekście.",
        },
        {
          body: "Użytkownik klawiatury powinien widzieć, który link lub przycisk ma fokus. Kolejność przejścia musi odpowiadać logicznemu układowi strony. Panel filtrów powinien pozwalać wrócić do wyników, a zamknięcie okna nie może zostawiać fokusu w przypadkowym miejscu.",
          heading: "Nawigacja musi mieć widoczny stan",
        },
        {
          body: "Ikona bez tekstu potrzebuje dostępnej nazwy opisującej działanie. „Wyczyść filtry” jest bardziej użyteczne niż nazwa kształtu ikony. Link do karty i przycisk dodania do zapytania powinny pozostać odrębnymi, zrozumiałymi kontrolkami.",
        },
        {
          body: "Nagłówki kolumn powinny być poprawnie powiązane z danymi. Jednostki muszą być czytelne, a różnic nie należy oznaczać wyłącznie kolorem. Jeśli tabela przewija się poziomo, warto pokazać, że poza ekranem znajdują się kolejne wartości.",
          heading: "Tabela nie może gubić znaczenia",
        },
        {
          body: "Mobilna prezentacja wymaga decyzji, które parametry są najważniejsze. Zmniejszenie całej tabeli do mikroskopijnego tekstu nie jest rozwiązaniem. Czasem lepszy będzie wybór kolumn lub osobna karta szczegółów.",
        },
        {
          body: "Każde pole potrzebuje etykiety. Informacja o wymaganym formacie musi pojawić się przed błędem, a komunikat powinien wskazywać konkretną poprawkę. Po odrzuceniu formularza zachowaj poprawnie wpisane dane.",
          heading: "Błąd powinien wskazywać drogę poprawy",
        },
        {
          body: "Sprawdź również status wysyłania i potwierdzenie. Osoba korzystająca z czytnika ekranu powinna otrzymać informację o wyniku bez konieczności szukania nowego tekstu na stronie.",
        },
        {
          body: "Ruchome elementy nie powinny utrudniać odczytania produktu ani kliknięcia linku. Zapewnij odpowiednią kontrolę zatrzymania i uwzględnij systemowe ograniczenie ruchu. Efekt wizualny ma wspierać orientację, a nie wymagać dodatkowej sprawności.",
          heading: "Animacja też jest decyzją użytkownika",
        },
        {
          body: "Automatyczny audyt pomoże znaleźć część problemów. Nie zastąpi jednak ręcznego przejścia zadania. Zacznij od jednej kompletnej ścieżki zakupowej i usuń przeszkody, które rzeczywiście na niej występują.",
        },
      ],
      sources: [
        {
          label: "W3C: Forms Tutorial",
          href: "https://www.w3.org/WAI/tutorials/forms/",
        },
        {
          label: "W3C: Pause, Stop, Hide",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        },
      ],
    },
    en: {
      title: "Test B2B catalogue accessibility through a real task",
      excerpt:
        "Can someone find a part, compare its specifications and submit an enquiry without a mouse? Use the task to assess a complete catalogue journey.",
      sections: [
        {
          body: "A catalogue can look clear while making ordinary tasks difficult. A filter opens only on hover, a table needs precise dragging, or an invalid field is marked only by colour. Check whether each function remains available without hover, precise gestures or colour recognition.",
        },
        {
          body: "Treat accessibility as part of the buying process. Choose a product, find a variant, add it to an enquiry and submit the form. Repeat the journey with a keyboard, on a phone and with enlarged text.",
        },
        {
          body: "Keyboard users need to see which control has focus. The sequence should follow a logical reading order. Filter panels should provide a clear route back to results, and closing a dialog should return focus to a sensible place.",
          heading: "Make navigation state visible",
        },
        {
          body: "An icon-only control needs an accessible name describing its action. “Clear filters” is more useful than a description of the icon's shape. Keep product links and enquiry buttons distinct and understandable.",
        },
        {
          body: "Associate headings with their data. Show units clearly and avoid using colour alone to identify differences. If a table scrolls horizontally, make the additional content discoverable.",
          heading: "Preserve the meaning of tables",
        },
        {
          body: "Mobile layouts need a decision about the most useful parameters. Shrinking the entire table into tiny text does not solve the problem. Column selection or a separate details view may work better.",
        },
        {
          body: "Give every field a label. Explain formatting requirements before submission and identify the specific correction when something goes wrong. Retain valid entries after an unsuccessful attempt.",
          heading: "Make errors actionable",
        },
        {
          body: "Check loading and confirmation states too. A screen-reader user should learn the outcome without having to search the page for newly inserted text.",
        },
        {
          body: "Moving content should not make a product harder to read or a link harder to select. Provide suitable pause controls and respect the operating system's reduced-motion preference.",
          heading: "Let people control movement",
        },
        {
          body: "Automated checks can identify some defects, but they cannot replace completing the task manually. Start with one whole enquiry journey and remove the obstacles found along it.",
        },
      ],
      sources: [
        {
          label: "W3C: Forms Tutorial",
          href: "https://www.w3.org/WAI/tutorials/forms/",
        },
        {
          label: "W3C: Pause, Stop, Hide",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        },
      ],
    },
  },
  {
    slugEn: "industrial-website-export-enquiries",
    slugPl: "zapytania-eksportowe-strona-przemyslowa",
    dateIso: "2026-10-16",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Co powinien wiedzieć zagraniczny kupiec przed wysłaniem zapytania?",
      excerpt:
        "Angielska wersja strony otwiera rozmowę, ale nie wyjaśnia jeszcze zakresu dostaw. Kupiec potrzebuje informacji o produkcie, dokumentacji, obsłudze i danych potrzebnych do oferty.",
      sections: [
        {
          body: "Zagraniczny klient może znaleźć właściwy produkt, a następnie zatrzymać się przy podstawowych pytaniach. Czy dostawca obsługuje jego kraj? Czy urządzenie pasuje do lokalnej instalacji? Kto potwierdzi warunki transportu? Jeśli strona tego nie wyjaśnia, zapytanie zaczyna się od ustalania podstaw.",
        },
        {
          body: "Nie trzeba publikować kompletnej instrukcji eksportowej. Warto natomiast wskazać zakres działania i granice informacji, które można potwierdzić dopiero po otrzymaniu szczegółów.",
        },
        {
          body: "„Dostarczamy na cały świat” jest mocną deklaracją. Jeżeli istnieją ograniczenia dotyczące produktu, transportu, serwisu lub wymogów obowiązujących przy danej transakcji, treść strony powinna je uwzględniać. Nie należy sugerować gotowości dostawy do każdego miejsca bez sprawdzenia.",
          heading: "Pokaż rzeczywisty obszar obsługi",
        },
        {
          body: "Można wskazać obsługiwane rynki oraz zaprosić do potwierdzenia pozostałych kierunków. Dla kupca ważna jest też dostępność wsparcia po dostawie, a nie tylko możliwość wysłania paczki.",
        },
        {
          body: "W urządzeniach znaczenie mogą mieć napięcie, częstotliwość, przyłącza, warunki środowiskowe i wymagana dokumentacja. Nie wystarczy informacja, że produkt jest „zgodny ze standardami”. Trzeba wskazać, jakiej wersji i jakiego zastosowania dotyczy deklaracja.",
          heading: "Parametry muszą pasować do zastosowania",
        },
        {
          body: "Strona może zebrać wymagania, ale ostateczne potwierdzenie powinno należeć do odpowiedniej osoby. Nie należy traktować automatycznego wyboru kraju jako dowodu zgodności produktu z każdym lokalnym wymaganiem.",
        },
        {
          body: "Na początku zwykle przydaje się kraj i przybliżone miejsce dostawy, ilość, oczekiwany termin oraz zastosowanie. Pełny adres rozliczeniowy może poczekać, jeśli nie jest potrzebny do pierwszej oceny.",
          heading: "Zapytanie powinno zawierać właściwy kontekst",
        },
        {
          body: "Rozdziel termin potrzebnej oferty od oczekiwanej dostawy. To dwie różne informacje. Umożliw dodanie dokumentacji i wskaż języki, w których zespół może prowadzić rozmowę.",
        },
        {
          body: "Zasady transportu, odpowiedzialności i rozliczeń powinny wynikać z uzgodnionej polityki firmy oraz konkretnej oferty. Na stronie można wskazać, które kwestie firma potwierdza w ofercie: koszt przewozu, miejsce dostawy, wymagane dokumenty i zakres obsługi. Szczegółowe zapisy handlowe powinny zatwierdzić osoby odpowiedzialne za daną transakcję.",
          heading: "Nie zgaduj warunków handlowych",
        },
        {
          body: "Przed rozbudową eksportowej części strony przejrzyj kilka typowych zapytań razem z osobą odpowiedzialną za sprzedaż. Pytania, które powracają, są dobrym punktem wyjścia do poprawienia treści i formularza.",
        },
      ],
    },
    en: {
      title: "What should an overseas buyer know before making an enquiry?",
      excerpt:
        "An English-language website starts the conversation, but buyers also need clarity about supply coverage, technical requirements, documentation and the information needed for a quotation.",
      sections: [
        {
          body: "An overseas buyer may find the correct product and still face basic questions. Does the supplier serve their country? Is the equipment suitable for the intended installation? Who confirms carriage arrangements? Without clear guidance, the enquiry begins with establishing the basics.",
        },
        {
          body: "The website does not need to become an export manual. It should explain the business's coverage and identify matters that need confirmation for a particular request.",
        },
        {
          body: "“Worldwide delivery” is a broad promise. Product restrictions, transport limitations, service coverage and transaction-specific requirements may affect what is possible. Avoid suggesting that every destination is automatically supported.",
          heading: "Describe actual supply coverage",
        },
        {
          body: "Name established markets where appropriate and invite confirmation for other destinations. Buyers also need to understand support after delivery, rather than simply whether an item can be dispatched.",
        },
        {
          body: "Voltage, frequency, connections, environmental conditions and documentation may affect equipment selection. Saying that a product “meets standards” is insufficient without identifying the relevant version and scope.",
          heading: "Relate specifications to the application",
        },
        {
          body: "A website can collect requirements, but the appropriate person should confirm suitability. Selecting a destination country in a form does not establish compliance with every local requirement.",
        },
        {
          body: "Country, approximate destination, quantity, required date and application are often useful early information. Full billing details can wait if they are unnecessary for the initial assessment.",
          heading: "Collect useful enquiry context",
        },
        {
          body: "Separate the quotation deadline from the requested delivery date. Provide a route for supporting documents and explain the languages in which the team can respond.",
        },
        {
          body: "Transport, responsibility and payment arrangements should follow the business's agreed policy and the specific quotation. Explain which matters the quotation confirms, such as carriage cost, destination, required documents and support coverage. Detailed commercial wording should be approved by the people responsible for the transaction.",
          heading: "Keep commercial terms explicit",
        },
        {
          body: "Review several typical enquiries with the person responsible for export sales. Repeated questions provide a practical starting point for improving website content and the form.",
        },
      ],
    },
  },
  {
    slugEn: "b2b-catalogue-stock-and-lead-times",
    slugPl: "dostepnosc-i-terminy-dostawy-w-katalogu-b2b",
    dateIso: "2026-10-23",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "„Dostępny” w katalogu B2B: co właściwie obiecujesz?",
      excerpt:
        "Stan magazynowy, możliwość zamówienia i potwierdzony termin dostawy to różne informacje. Ich pomieszanie może stworzyć obietnicę, której firma nie zamierzała składać.",
      sections: [
        {
          body: "Zielony napis „dostępny” wydaje się czytelny. Kupiec może jednak rozumieć go jako gotowość natychmiastowej wysyłki, podczas gdy system pokazuje jedynie obecność rekordu w ofercie. Przy produkcie potrzebnym do naprawy lub planowanego postoju taka różnica ma znaczenie.",
        },
        {
          body: "Zanim stan trafi na stronę, trzeba ustalić jego definicję. Czy obejmuje zarezerwowane sztuki? Czy dotyczy wybranego wariantu? Czy magazyn potrafi skompletować żądaną ilość? Samo pobranie liczby z ERP nie odpowiada na te pytania.",
        },
        {
          body: "Produkt może znajdować się w magazynie, ale być zarezerwowany, oczekiwać kontroli albo stanowić część innego zamówienia. Jeżeli strona ma pokazywać ilość możliwą do sprzedaży, potrzebuje uzgodnionej reguły jej wyliczenia.",
          heading: "Oddziel fizyczny stan od ilości dostępnej do sprzedaży",
        },
        {
          body: "Wariant też musi być jednoznaczny. Dostępność całej rodziny produktów nie potwierdza dostępności konkretnego rozmiaru lub materiału. Komunikat powinien odnosić się do faktycznie wybranego elementu.",
        },
        {
          body: "Dane sprzed kilku minut i dane sprzed dwóch dni nie znaczą tego samego. Ustal akceptowalny wiek odczytu. Gdy integracja przestaje działać, strona powinna przejść na odpowiedni komunikat, a nie bez końca utrzymywać ostatni zielony status.",
          heading: "Czas aktualizacji jest częścią informacji",
        },
        {
          body: "Nie trzeba ujawniać technicznych szczegółów systemu. „Dostępność wymaga potwierdzenia” jest dla kupca bardziej przydatne niż fałszywa pewność. Brak odpowiedzi z magazynu nie powinien automatycznie zmieniać się w „brak produktu”.",
        },
        {
          body: "Wysyłka z magazynu i doręczenie do klienta to dwa różne etapy. W terminie mogą mieć znaczenie kontrola, kompletacja, transport oraz uzgodnienia dotyczące zamówienia. Przy produkcji na zamówienie dochodzi obciążenie produkcji i dostępność materiału.",
          heading: "Termin dostawy wymaga własnych założeń",
        },
        {
          body: "Jeśli strona pokazuje zakres orientacyjny, nazwij go orientacyjnym. Jeżeli termin wymaga potwierdzenia dla konkretnej ilości i miejsca dostawy, powiedz to przy produkcie, nie dopiero po wysłaniu zapytania.",
        },
        {
          body: "Przejdź kilka przypadków: część ilości dostępna, produkt na zamówienie, wycofany wariant i awaria synchronizacji. Zapytaj handlowca, co w każdej sytuacji może rzeczywiście obiecać.",
          heading: "Sprawdź komunikaty razem z zespołem",
        },
        {
          body: "Zatwierdź treść każdego statusu i przypisz mu warunek w danych. Dzięki temu zespół może sprawdzić, dlaczego katalog pokazał określoną informację, oraz poprawić regułę, jeśli nie odpowiada ona procesowi sprzedaży.",
        },
      ],
    },
    en: {
      title: "What does “available” promise in a B2B catalogue?",
      excerpt:
        "Physical stock, the ability to order and a confirmed delivery date are different things. Combining them into one green label can create an unintended promise.",
      sections: [
        {
          body: "An “available” label looks straightforward. A buyer may read it as ready for immediate dispatch, while the system means only that the product remains in the range. For a repair or planned shutdown, that difference matters.",
        },
        {
          body: "Define the status before publishing it. Does the figure include reserved units? Does it apply to the selected variant? Can the warehouse fulfil the requested quantity? Retrieving a number from ERP does not answer these questions by itself.",
        },
        {
          body: "Items may be physically present but reserved, awaiting inspection or allocated elsewhere. A website showing saleable quantity needs an agreed calculation.",
          heading: "Separate stock from saleable quantity",
        },
        {
          body: "Variants must be specific too. Availability across a product family does not establish that a particular size or material is available. The message should relate to the item actually selected.",
        },
        {
          body: "A reading from a few minutes ago is different from one retrieved two days ago. Set an acceptable age for the data. If synchronisation stops, change the message rather than retaining the last green status indefinitely.",
          heading: "Include freshness in the design",
        },
        {
          body: "Buyers do not need the integration's technical details. “Availability requires confirmation” is more useful than false certainty. An unanswered stock request should not automatically become “out of stock”.",
        },
        {
          body: "Dispatch and delivery are separate stages. Inspection, picking, transport and order arrangements can all affect timing. Made-to-order products also depend on materials and production capacity.",
          heading: "Give lead times their own assumptions",
        },
        {
          body: "Label an indicative range as indicative. If the date requires confirmation for a particular quantity and destination, explain this beside the product rather than after the enquiry.",
        },
        {
          body: "Test partial availability, made-to-order items, withdrawn variants and a failed synchronisation. Ask the commercial team what it can actually promise in each case.",
          heading: "Review the messages with the team",
        },
        {
          body: "Approve each status message and map it to a defined data condition. The team can then establish why the catalogue displayed it and correct a rule that does not reflect the sales process.",
        },
      ],
    },
  },
  {
    slugEn: "business-website-handover-access-and-recovery",
    slugPl: "przekazanie-strony-firmowej-dostepy-i-odtworzenie",
    dateIso: "2026-10-30",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Przekazanie strony: czy firma potrafi przejąć jej obsługę?",
      excerpt:
        "Hasło do panelu nie oznacza jeszcze kontroli nad stroną. Przy odbiorze projektu warto sprawdzić domenę, konta, kod, wdrożenie i możliwość odtworzenia danych.",
      sections: [
        {
          body: "Strona działa, formularz wysyła wiadomości, a wykonawca przekazuje login. Na tym etapie łatwo uznać projekt za zakończony. Przed zamknięciem projektu sprawdź jeszcze, kto opłaca domenę, gdzie znajduje się repozytorium i czy ktoś przećwiczył odtworzenie kopii zapasowej.",
        },
        {
          body: "Przekazanie powinno pozwalać firmie utrzymać usługę i zlecić dalsze prace wybranej osobie. Nie oznacza to, że właściciel firmy musi sam wdrażać aplikację. Powinien jednak wiedzieć, gdzie znajdują się zasoby i kto może nimi zarządzać.",
        },
        {
          body: "Domena, DNS, hosting, poczta transakcyjna i analityka powinny mieć jasno wskazanego właściciela. Sprawdź adresy do odzyskiwania dostępu, osoby odpowiedzialne za płatności i sposób uwierzytelniania.",
          heading: "Ustal właścicieli kont",
        },
        {
          body: "Przyznawaj dostęp nazwanym osobom zamiast dzielić jedno wspólne hasło. Zewnętrzny wykonawca może mieć uprawnienia potrzebne do pracy, ale firma powinna zachować możliwość ich odebrania i dodania nowego zespołu.",
        },
        {
          body: "Repozytorium potrzebuje instrukcji instalacji, budowania i wdrażania. Powinno wskazywać wymagane wersje narzędzi oraz nazwy potrzebnych zmiennych konfiguracyjnych. Sekrety przekazuje się przez odpowiednio zabezpieczony kanał lub menedżer, nie wpisuje do publicznego pliku instrukcji.",
          heading: "Kod musi dać się uruchomić poza komputerem autora",
        },
        {
          body: "Warto rozdzielić środowisko testowe od produkcji i opisać, jak sprawdzić zmianę przed wydaniem. Osoba przejmująca projekt musi też wiedzieć, jak wrócić do poprzedniego wdrożenia.",
        },
        {
          body: "Lista plików w magazynie nie potwierdza, że można odzyskać działającą stronę. Sprawdź zakres kopii: treść, bazę danych, załączniki i konfigurację, zależnie od architektury.",
          heading: "Kopia zapasowa wymaga próby odtworzenia",
        },
        {
          body: "Odtworzenie najlepiej przećwiczyć w odizolowanym środowisku. Zapisz wynik i brakujące elementy. Uzgodnij też częstotliwość kopii, okres przechowywania i odpowiedzialność za kontrolę ich działania.",
        },
        {
          body: "Krótka instrukcja powinna pokazywać aktualizację treści, obsługę formularza, zmianę dokumentu oraz zgłoszenie awarii. Dołącz wykaz usług zewnętrznych i terminów odnowień. W przypadku materiałów licencjonowanych wyjaśnij zakres praw do dalszego użycia.",
          heading: "Przekaż wiedzę o codziennych zadaniach",
        },
        {
          body: "Odbiór można zakończyć prostą próbą: nowa osoba uruchamia projekt, publikuje zmianę w środowisku testowym i znajduje drogę odzyskania danych. Jeśli nie potrafi tego zrobić z przekazaną dokumentacją, przekazanie wymaga uzupełnienia.",
        },
      ],
      sources: [
        {
          label: "NCSC: Backing up your data",
          href: "https://www.ncsc.gov.uk/collection/small-organisations-guide-to-cyber-security/backing-up-your-data",
        },
      ],
    },
    en: {
      title: "A website handover should let the business take control",
      excerpt:
        "A control-panel password is only part of a handover. Check ownership of the domain, service accounts, source code, deployment process and recovery arrangements.",
      sections: [
        {
          body: "The website works and the supplier provides a login. It is easy to consider the project complete. Before closing the project, check who pays for the domain, where the repository is held and whether someone has practised restoring a backup.",
        },
        {
          body: "A handover should enable the business to maintain the service and appoint another team when needed. The owner need not deploy the application personally, but should know where the resources are and who controls them.",
        },
        {
          body: "Identify the owner of the domain, DNS, hosting, transactional email and analytics. Check recovery addresses, billing responsibility and authentication arrangements.",
          heading: "Establish account ownership",
        },
        {
          body: "Give named people access instead of sharing a single password. A supplier can hold the permissions needed for its work while the business retains the ability to remove access or appoint another team.",
        },
        {
          body: "The repository needs installation, build and deployment instructions, including required tool versions and configuration variable names. Transfer secrets through a suitable protected channel or secret manager rather than placing them in a public instruction file.",
          heading: "Make the code reproducible",
        },
        {
          body: "Separate testing from production where appropriate. Explain how to review a change before release and how to return to a previous deployment.",
        },
        {
          body: "Stored files do not prove that the service can be restored. Check whether the backup covers content, databases, uploads and the configuration required by the architecture.",
          heading: "Test recovery, not just backup creation",
        },
        {
          body: "Practise recovery in an isolated environment. Record the result and any missing elements. Agree backup frequency, retention and responsibility for monitoring successful operation.",
        },
        {
          body: "Provide short instructions for editing content, handling enquiries, replacing documents and reporting faults. List external services and renewal dates. Explain continuing usage rights for licensed materials.",
          heading: "Include everyday tasks",
        },
        {
          body: "Finish with a practical check: a new maintainer runs the project, releases a test change and identifies the recovery route. If the documentation does not support those tasks, the handover needs more work.",
        },
      ],
      sources: [
        {
          label: "NCSC: Backing up your data",
          href: "https://www.ncsc.gov.uk/collection/small-organisations-guide-to-cyber-security/backing-up-your-data",
        },
      ],
    },
  },
  {
    slugEn: "secure-b2b-enquiry-forms-and-attachments",
    slugPl: "bezpieczenstwo-formularza-b2b-i-zalacznikow",
    dateIso: "2026-11-06",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Formularz zapytania B2B: mniej spamu, bezpieczniejsze załączniki",
      excerpt:
        "Publiczny formularz przyjmuje dane od nieznanych osób. Ochrona musi obejmować serwer, pliki, wysyłkę i obsługę błędów, a nie tylko dodatkowe pole w przeglądarce.",
      sections: [
        {
          body: "Formularz ofertowy bywa traktowany jak prosty dodatek do strony. W praktyce może przekazywać dane do skrzynki, CRM i magazynu plików. Każdy z tych etapów wymaga ustalenia, co system przyjmuje i komu daje do tego dostęp.",
        },
        {
          body: "Celem jest ograniczenie nadużyć przy zachowaniu wygody prawdziwych klientów. Jedna kontrolka przeciw botom nie zastępuje sprawdzania danych ani bezpiecznej obsługi dokumentów.",
        },
        {
          body: "Pola w przeglądarce pomagają wpisać prawidłową treść, lecz można ominąć ich ograniczenia. Serwer powinien sprawdzać typ, długość i format danych oraz przyjmować tylko oczekiwane pola.",
          heading: "Walidacja musi działać na serwerze",
        },
        {
          body: "Dane klienta nie mogą swobodnie sterować odbiorcą wiadomości ani nagłówkami poczty. Przy wyświetlaniu treści stosuj kodowanie odpowiednie do kontekstu, a w zapytaniach SQL parametryzację. Walidacja danych nie zastępuje tych zabezpieczeń ani sprawdzania uprawnień. Uprawnienia integracji powinny ograniczać się do zadania formularza.",
        },
        {
          body: "Ustal dozwolone typy i wielkości plików. Sama końcówka nazwy nie potwierdza zawartości, a nazwa przesłana przez klienta nie powinna wyznaczać ścieżki zapisu. Pliki należy przechowywać tak, aby nie mogły uruchamiać się jako część aplikacji.",
          heading: "Załącznik to osobny obszar kontroli",
        },
        {
          body: "W zależności od ryzyka potrzebne mogą być dodatkowe kontrole, w tym skanowanie. Dostęp do poufnych rysunków musi wynikać z uprawnień, nie z nadziei, że nikt nie odgadnie publicznego adresu. Warto ustalić też czas przechowywania i sposób usuwania.",
        },
        {
          body: "Limity liczby i rozmiaru zgłoszeń chronią zasoby. Dodatkowe sygnały, takie jak pole pułapka lub mechanizm weryfikacji, mogą pomagać odróżniać nadużycia od normalnego ruchu. Ich wynik trzeba sprawdzać po stronie serwera zgodnie z wybranym rozwiązaniem.",
          heading: "Ogranicz automatyczne nadużycia warstwowo",
        },
        {
          body: "Zbyt agresywna blokada może utrudnić wysłanie ważnego zapytania. Zapewnij czytelny komunikat i alternatywną drogę kontaktu. Nie ujawniaj szczegółów wewnętrznej konfiguracji w odpowiedzi błędu.",
        },
        {
          body: "Komunikat „wysłano” powinien oznaczać, że serwer przyjął zgłoszenie w uzgodnionym procesie. Nie wolno wyświetlać sukcesu tylko dlatego, że użytkownik nacisnął przycisk. Nie oznacza on również automatycznie, że handlowiec już przeczytał wiadomość.",
          heading: "Potwierdzaj rzeczywisty wynik",
        },
        {
          body: "Monitoruj błędy przekazania i odrzucenia. Logi mają umożliwiać znalezienie problemu bez zbierania zbędnych danych osobowych i treści poufnych dokumentów. Właściciel formularza powinien wiedzieć, kto reaguje, gdy zgłoszenia przestają docierać.",
        },
      ],
      sources: [
        {
          label: "OWASP: File Upload Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
        },
        {
          label: "OWASP: Input Validation Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
        },
      ],
    },
    en: {
      title: "Protecting B2B enquiry forms and their attachments",
      excerpt:
        "A public form accepts information from unknown visitors. Protection needs to cover the server, uploads, delivery and error handling, rather than relying on one browser control.",
      sections: [
        {
          body: "An enquiry form may pass information to email, CRM and file storage. Each stage needs clear rules about accepted content and access. The aim is to limit abuse while keeping legitimate enquiries practical.",
        },
        {
          body: "A bot check can be one useful layer. It cannot replace input validation or safe document handling.",
        },
        {
          body: "Browser controls help visitors enter suitable information, but their restrictions can be bypassed. The server should check types, lengths and formats, and accept only expected fields.",
          heading: "Validate on the server",
        },
        {
          body: "Submitted values should not freely determine email recipients or headers. Use context-appropriate output encoding when displaying content and parameterised queries for SQL. Input validation does not replace those controls or authorisation checks. Give integrations only the permissions needed for the form's task.",
        },
        {
          body: "Define allowed file types and sizes. An extension alone does not establish content, and a customer-supplied filename should not control the storage path. Store documents so they cannot execute as application code.",
          heading: "Treat uploads as a separate concern",
        },
        {
          body: "Additional checks, including scanning, may be appropriate to the risk. Access to confidential drawings must depend on permissions rather than an obscure public URL. Define retention and deletion arrangements as well.",
        },
        {
          body: "Submission and size limits help protect resources. Other signals, such as a honeypot or verification mechanism, can help distinguish abuse from ordinary traffic. Validate the result on the server as required by the chosen system.",
          heading: "Limit automated abuse in layers",
        },
        {
          body: "An aggressive block can also prevent a genuine enquiry. Provide a useful message and another contact route. Error responses should not disclose internal configuration details.",
        },
        {
          body: "A success message should mean that the server accepted the submission into the agreed process, rather than merely that a button was pressed. It does not mean that a salesperson has already read it.",
          heading: "Confirm the actual outcome",
        },
        {
          body: "Monitor delivery failures and rejected requests. Logs should help diagnosis without unnecessarily collecting personal information or confidential document contents. Assign someone to respond when enquiries stop arriving.",
        },
      ],
      sources: [
        {
          label: "OWASP: File Upload Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html",
        },
        {
          label: "OWASP: Input Validation Cheat Sheet",
          href: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
        },
      ],
    },
  },
  {
    slugEn: "b2b-website-animation-with-user-control",
    slugPl: "animacje-na-stronie-b2b-kontrola-ruchu",
    dateIso: "2026-11-13",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
    pl: {
      title: "Animacja na stronie B2B: efekt, który daje się zatrzymać",
      excerpt:
        "Ruch może budować charakter marki, ale nie powinien utrudniać czytania ani kliknięcia. Przy projektowaniu animacji trzeba uwzględnić telefon, ograniczenie ruchu i kontrolę użytkownika.",
      sections: [
        {
          body: "Świecący znak, przesuwające się logotypy i aktywna siatka potrafią nadać technicznej stronie rozpoznawalny charakter. Trzeba jednak sprawdzić, co dzieje się, gdy użytkownik chce wybrać link, przeczytać treść albo po prostu zatrzymać efekt.",
        },
        {
          body: "W projekcie Forsa Design pojawiły się ruchomy pasek logotypów oraz siatka z sygnałami biegnącymi między punktami. Przy takich elementach trzeba osobno sprawdzić zatrzymanie ruchu, wybieranie linków i działanie na telefonie.",
        },
        {
          body: "Jeżeli logo prowadzi do zewnętrznego narzędzia, użytkownik musi móc spokojnie je wybrać. Na komputerze pasek może zwalniać przy zbliżeniu kursora i zatrzymywać się po najechaniu. Obsługa klawiatury również powinna pozwalać zapoznać się z elementem bez jego uciekania.",
          heading: "Celowanie w link nie powinno być zadaniem zręcznościowym",
        },
        {
          body: "Na ekranie dotykowym nie ma klasycznego najechania myszką. Potrzebna jest jawna kontrola pauzy. Warto odróżnić zatrzymanie ruchu od aktywowania linku, żeby pierwsze dotknięcie nie wymagało zgadywania wyniku.",
        },
        {
          body: "Systemowe ustawienie ograniczenia ruchu powinno mieć sensowny odpowiednik na stronie. Statyczna wersja może zachować kolory, siatkę i układ bez ciągłego przemieszczania elementów.",
          heading: "Ograniczenie ruchu jest częścią projektu",
        },
        {
          body: "Nie każdy chce zmieniać ustawienia całego telefonu. Dlatego przy wyrazistym, ciągłym efekcie przydaje się także kontrola na stronie. Stan zatrzymania musi być czytelny, a wybór może zostać zapamiętany przy kolejnej wizycie.",
        },
        {
          body: "Linie i rozbłyski powinny pozostawiać odpowiedni kontrast tekstu. Najbardziej aktywny fragment nie powinien regularnie przecinać przycisku ani odciągać uwagi od formularza. Warto ocenić całą stronę, nie tylko pierwszy ekran.",
          heading: "Tło nie może walczyć z treścią",
        },
        {
          body: "Na mniejszym urządzeniu można ograniczyć liczbę efektów i tempo aktualizacji. Ważniejsze od identycznej intensywności jest zachowanie charakteru przy płynnym przewijaniu i wygodnym czytaniu.",
        },
        {
          body: "Test powinien objąć prawdziwy telefon, zmianę orientacji, przewijanie, powrót do karty oraz włączone ograniczenie ruchu. Osobno warto sprawdzić obciążenie renderowania i wskaźniki wydajności. Pojedynczy wynik Lighthouse nie opisuje wszystkich warunków korzystania ze strony.",
          heading: "Sprawdzaj działanie, nie tylko wynik audytu",
        },
        {
          body: "Do listy odbiorowej dodaj statyczny wariant strony, działanie pauzy i możliwość wybrania każdego linku. Powtórz te sprawdzenia po zmianie układu lub dodaniu nowych logotypów.",
        },
      ],
      sources: [
        {
          label: "web.dev: prefers-reduced-motion",
          href: "https://web.dev/articles/prefers-reduced-motion",
        },
        {
          label: "W3C: Pause, Stop, Hide",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        },
      ],
    },
    en: {
      title: "B2B website animation should give visitors control",
      excerpt:
        "Movement can give a technical brand a distinctive character, but it should not make reading or selecting a link harder. Design for touch, reduced motion and an explicit pause.",
      sections: [
        {
          body: "An illuminated mark, moving technology logos and an active grid can create a recognisable visual identity. The design still needs to work when someone wants to read, choose a link or stop the effect.",
        },
        {
          body: "The Forsa Design project includes a moving logo strip and a grid with signals travelling between points. For these elements, check motion controls, link selection and phone behaviour separately.",
        },
        {
          body: "A logo linking to an external tool needs to remain easy to select. On desktop, a strip can slow as the pointer approaches and stop on hover. Keyboard interaction should also allow visitors to inspect a focused item without chasing it.",
          heading: "Do not turn links into moving targets",
        },
        {
          body: "Touchscreens have no conventional hover state. Provide an explicit pause control and distinguish stopping the strip from following a link. The result of the first tap should be understandable.",
        },
        {
          body: "Respect the operating system's reduced-motion preference with a sensible alternative. A static layout can retain the colour, grid and composition without continuous movement.",
          heading: "Design a reduced-motion version",
        },
        {
          body: "Visitors should not need to change their whole phone's settings to stop a prominent effect. An on-page control is useful for sustained motion. Make its state clear and consider remembering the choice for later visits.",
        },
        {
          body: "Lines and highlights must leave text legible. Avoid repeatedly drawing attention across a primary action or enquiry form. Review the whole page rather than only the opening screen.",
          heading: "Keep the background behind the content",
        },
        {
          body: "Smaller devices may need fewer effects and a lower update rate. Retaining the design's character matters more than reproducing identical intensity at the expense of comfortable scrolling.",
        },
        {
          body: "Use a real phone to check orientation changes, scrolling, returning to the tab and reduced-motion settings. Assess rendering work and performance separately. A single Lighthouse result cannot describe every viewing condition.",
          heading: "Test behaviour as well as audit scores",
        },
        {
          body: "Include the static page, pause behaviour and selection of every link in the release checklist. Repeat those checks after layout changes or the addition of further logos.",
        },
      ],
      sources: [
        {
          label: "web.dev: prefers-reduced-motion",
          href: "https://web.dev/articles/prefers-reduced-motion",
        },
        {
          label: "W3C: Pause, Stop, Hide",
          href: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
        },
      ],
    },
  },
  {
    slugEn: "how-to-choose-a-web-agency",
    slugPl: "jak-wybrac-agencje-webowa",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "How to choose a website provider: requirements, evidence and handover",
      excerpt: "How to assess delivery, responsibilities and the ability to maintain a website.",
      sections: [
        {
          heading: "Define the purpose before selecting technology",
          body: "Begin with the audience, workflows and limitations of the current website. Page count does not describe the complexity of a portal with accounts, documents and integrations. Requirements analysis should identify the tasks users need to complete and the information those tasks require.",
        },
        {
          heading: "Evidence of capability",
          body: "A case study should explain the task, delivered work and project status. A feature demonstration does not establish a sales increase. Performance claims should identify the date, method and tested page.",
        },
        {
          heading: "Scope and responsibility",
          body: "The project needs defined functions, required materials, review stages and acceptance criteria. Defect correction, refinement and new functionality are distinct activities. Development costs and external-service charges should be explained separately.",
        },
        {
          heading: "Handover and ongoing operation",
          body: "Changing providers depends on rights, licences and access to code, configuration and service accounts. Provider-managed hosting does not by itself establish permanent lock-in. The client should understand migration arrangements and responsibility for updates and backups.",
        },
      ],
    },
    pl: {
      title: "Jak wybrać wykonawcę strony: wymagania, dowody i przekazanie projektu",
      excerpt:
        "Jak ocenić proces pracy, zakres odpowiedzialności i możliwość dalszego utrzymania strony.",
      sections: [
        {
          heading: "Cel projektu przed wyborem technologii",
          body: "Rozmowę z wykonawcą warto rozpocząć od odbiorców, procesów i problemów obecnej strony. Liczba podstron nie opisuje złożoności portalu z kontami, dokumentami i integracjami. Dobra analiza wymagań wskazuje, co użytkownik ma zrobić i jakie informacje są do tego potrzebne.",
        },
        {
          heading: "Dowody kompetencji",
          body: "Portfolio powinno wyjaśniać zadanie, wykonany zakres i status realizacji. Demonstracja funkcji nie jest dowodem wzrostu sprzedaży. Jeżeli wykonawca przedstawia wyniki pomiarów, należy sprawdzić datę, metodę i adres badanej strony.",
        },
        {
          heading: "Zakres i odpowiedzialność",
          body: "Przed rozpoczęciem prac potrzebny jest opis funkcji, materiałów, etapów akceptacji i kryteriów odbioru. Należy rozróżnić usunięcie błędu, korektę rozwiązania i dodanie nowej funkcji. Cena projektu oraz koszty usług zewnętrznych powinny być czytelne oddzielnie.",
        },
        {
          heading: "Przekazanie i dalsza obsługa",
          body: "Możliwość zmiany wykonawcy zależy od praw do prac, licencji, dostępu do kodu, konfiguracji i kont usług. Hosting zarządzany przez wykonawcę nie oznacza sam w sobie trwałego uzależnienia. Klient powinien znać zasady przeniesienia oraz odpowiedzialność za aktualizacje i kopie zapasowe.",
        },
      ],
    },
    publishedDateIso: "2026-06-01",
  },
  {
    slugEn: "responsiveness-vs-speed",
    slugPl: "responsywnosc-vs-szybkosc",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "Responsive design and speed: two distinct measures of website quality",
      excerpt:
        "How to distinguish interface adaptation from performance and interpret measurements.",
      sections: [
        {
          heading: "Layout and interaction",
          body: "Responsive design adapts the interface to available space. Assessment covers legibility, navigation, touch targets and forms. Changing column widths is insufficient if the user still cannot complete a task on a phone.",
        },
        {
          heading: "Performance",
          body: "Speed depends on resource delivery, processing and interface responsiveness. Images, scripts, fonts, devices and networks all contribute. There is no universal duration after which every visitor leaves; behaviour must be assessed for the task and audience.",
        },
        {
          heading: "Laboratory and field measurements",
          body: "Core Web Vitals comprise LCP, INP and CLS: main-content rendering, interaction responsiveness and layout stability. A Lighthouse navigation test without interactions does not measure real-world INP. Field data and laboratory tests answer different questions and must be interpreted in context.",
        },
        {
          heading: "Assessing changes",
          body: "Record the URL, device, conditions and repeated baseline measurements. After a change, repeat measurements and verify forms and navigation. A better technical score alone does not establish increased sales or a particular Google ranking.",
        },
      ],
      sources: [
        {
          label: "Web Vitals: field and laboratory measurement",
          href: "https://web.dev/articles/vitals",
        },
      ],
    },
    pl: {
      title: "Responsywność i szybkość: dwa odrębne kryteria jakości strony",
      excerpt:
        "Jak odróżnić dostosowanie interfejsu od wydajności i właściwie interpretować pomiary.",
      sections: [
        {
          heading: "Układ i obsługa",
          body: "Responsywność oznacza dostosowanie układu do dostępnej przestrzeni. Sprawdza się czytelność tekstu, nawigację, elementy dotykowe i formularze. Sama zmiana szerokości kolumn nie wystarcza, jeżeli użytkownik nadal nie może wykonać zadania na telefonie.",
        },
        {
          heading: "Wydajność",
          body: "Szybkość zależy od czasu dostarczenia zasobów, ich przetwarzania i gotowości interfejsu do reakcji. Wpływają na nią obrazy, skrypty, fonty, urządzenie i połączenie. Nie istnieje jeden próg czasu, po którym każdy odbiorca rezygnuje; zachowanie trzeba oceniać dla konkretnego zadania i grupy użytkowników.",
        },
        {
          heading: "Pomiar w laboratorium i u użytkowników",
          body: "Core Web Vitals obejmują LCP, INP i CLS. LCP opisuje pojawienie się głównej treści, INP reakcję na interakcje, a CLS stabilność układu. Test Lighthouse bez interakcji nie mierzy rzeczywistego INP. Dane terenowe i test laboratoryjny odpowiadają na różne pytania i powinny być porównywane z uwzględnieniem ich warunków.",
        },
        {
          heading: "Ocena efektu zmian",
          body: "Przed optymalizacją warto zapisać adres, urządzenie, warunki i wyniki kilku prób. Po zmianie należy powtórzyć pomiary oraz sprawdzić formularze i nawigację. Poprawa wyniku technicznego nie jest sama w sobie dowodem wzrostu sprzedaży ani określonej pozycji w Google.",
        },
      ],
      sources: [
        {
          label: "Web Vitals: field and laboratory measurement",
          href: "https://web.dev/articles/vitals",
        },
      ],
    },
    publishedDateIso: "2026-06-05",
  },
  {
    slugEn: "cms-template-vs-custom-site",
    slugPl: "szablon-cms-vs-strona-na-zamowienie",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "CMS templates and custom development: selection criteria",
      excerpt:
        "Comparing cost, content editing, integration and maintenance without treating technology as a guarantee of quality.",
      sections: [
        {
          heading: "Define the alternatives",
          body: "A CMS manages content, while a template defines presentation. A custom application can also provide an editor. Interface design and content management should therefore be assessed separately.",
        },
        {
          heading: "When a template is sufficient",
          body: "A ready-made theme can reduce design work for a simple informational site. Accessibility, performance, updates and suitability still require assessment. Adaptation becomes more complex when functions need numerous extensions and exceptions.",
        },
        {
          heading: "When custom development is justified",
          body: "Specialised ordering workflows, account permissions and integrations may justify custom application logic. This provides implementation control but does not automatically guarantee clean code, security or speed. These properties require verification.",
        },
        {
          heading: "Maintenance and portability",
          body: "Both approaches need clear licences, access arrangements, updates and recovery procedures. Selection should consider the service lifetime as well as launch cost. Forsa Design develops custom solutions without WordPress or page builders; this does not make custom development necessary for every business.",
        },
      ],
    },
    pl: {
      title: "Szablon CMS a rozwiązanie dedykowane: kryteria wyboru",
      excerpt:
        "Porównanie kosztu, edycji treści, integracji i utrzymania bez automatycznego przypisywania jakości technologii.",
      sections: [
        {
          heading: "Co właściwie porównujemy",
          body: "CMS służy do zarządzania treścią, a szablon określa sposób jej prezentacji. Rozwiązanie dedykowane może również posiadać panel edycji. Należy więc oddzielić sposób projektowania interfejsu od sposobu aktualizowania danych.",
        },
        {
          heading: "Kiedy szablon jest wystarczający",
          body: "Przy prostej stronie informacyjnej gotowy motyw może ograniczyć pracę projektową. Znaczenie mają jego dostępność, wydajność, jakość aktualizacji i zgodność z wymaganiami. Koszt adaptacji rośnie, jeżeli funkcje wymagają wielu rozszerzeń i wyjątków.",
        },
        {
          heading: "Kiedy uzasadniona jest realizacja dedykowana",
          body: "Niestandardowe procesy zamówień, uprawnienia klientów i specyficzne integracje mogą uzasadniać projektowanie własnej logiki. Takie podejście daje kontrolę nad implementacją, ale nie gwarantuje automatycznie dobrego kodu, bezpieczeństwa czy szybkości. Te właściwości trzeba sprawdzić.",
        },
        {
          heading: "Utrzymanie i przenośność",
          body: "Oba podejścia wymagają określenia licencji, dostępów, aktualizacji i procedury odtworzenia. Wybór powinien uwzględniać cały okres użytkowania, a nie tylko koszt uruchomienia. Forsa Design realizuje projekty dedykowane bez WordPressa i kreatorów stron; nie oznacza to, że taka technologia jest konieczna dla każdego przedsiębiorstwa.",
        },
      ],
    },
    publishedDateIso: "2026-06-10",
  },
  {
    slugEn: "ecommerce-speed-and-ux",
    slugPl: "ecommerce-szybkosc-i-ux",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "B2B e-commerce: performance, information and ordering workflows",
      excerpt:
        "How to align catalogues, pricing, availability and ordering with the actual sales model.",
      sections: [
        {
          heading: "Purchase or enquiry",
          body: "Not every B2B product is suitable for immediate purchase. Technical selection, delivery and contract pricing may require confirmation. The interface should distinguish an order, an enquiry and an indicative configuration.",
        },
        {
          heading: "Product data",
          body: "Descriptions should identify the product, variant, unit and documentation. Availability needs a definition: physical stock differs from the quantity available for sale. Synchronisation frequency should reflect the workflow rather than a universal real-time requirement.",
        },
        {
          heading: "Pricing and permissions",
          body: "Prices need a currency, unit, tax treatment and delivery context. Contract prices require API-level access control. If an integration fails, a request for confirmation is preferable to presenting an outdated amount as certain.",
        },
        {
          heading: "Test the complete workflow",
          body: "Test the journey from product discovery to confirmed submission. Include mobile devices, invalid data and connection failures. Assess sales effects using the system’s own evidence rather than assuming every removed step automatically improves conversion.",
        },
      ],
    },
    pl: {
      title: "E-commerce B2B: wydajność, informacje i przebieg zamówienia",
      excerpt:
        "Jak dopasować katalog, ceny, stany i proces zamówienia do rzeczywistego modelu sprzedaży.",
      sections: [
        {
          heading: "Zakup lub zapytanie",
          body: "Nie każdy produkt B2B nadaje się do natychmiastowego zakupu. Dobór techniczny, transport i ceny kontraktowe mogą wymagać potwierdzenia. Interfejs powinien rozróżniać zamówienie, zapytanie i orientacyjną konfigurację.",
        },
        {
          heading: "Dane produktu",
          body: "Opis powinien identyfikować produkt, wariant, jednostkę i dokumentację. Dostępność musi mieć określone znaczenie: fizyczny stan nie jest tym samym co ilość dostępna do sprzedaży. Częstotliwość synchronizacji dobiera się do procesu, a nie do ogólnego hasła aktualizacji w czasie rzeczywistym.",
        },
        {
          heading: "Cena i uprawnienia",
          body: "Cena wymaga waluty, jednostki, informacji o podatku i warunkach dostawy. Cenniki kontraktowe muszą być chronione także po stronie API. Przy awarii integracji lepsza jest informacja o konieczności potwierdzenia niż nieaktualna kwota przedstawiona jako pewna.",
        },
        {
          heading: "Test całego procesu",
          body: "Należy przejść drogę od znalezienia produktu do potwierdzenia przyjęcia zgłoszenia. Test obejmuje urządzenie mobilne, błędne dane i przerwę w komunikacji. Wpływ zmian na sprzedaż ocenia się na podstawie danych z danego systemu, a nie założenia, że każdy skrócony krok automatycznie zwiększa konwersję.",
        },
      ],
    },
    publishedDateIso: "2026-06-14",
  },
  {
    slugEn: "seo-2026-website-is-just-the-start",
    slugPl: "seo-2026-strona-to-dopiero-poczatek",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "Technical SEO, content and visibility: distinct parts of one process",
      excerpt: "Indexing, crawler access and content quality require separate assessment.",
      sections: [
        {
          heading: "Crawling is not indexing",
          body: "robots.txt controls crawler access. It does not guarantee that a URL is excluded from search results. A noindex directive can prevent indexing when the crawler can read it. Confidential content requires access control rather than crawler instructions alone.",
        },
        {
          heading: "Structure and migration",
          body: "Canonicals, sitemaps, links and redirects help interpret site structure. Migration requires mapping old URLs to appropriate new resources. A redirect does not guarantee preservation of every ranking.",
        },
        {
          heading: "Content addresses a need",
          body: "Content should explain a service, product or user problem and make important claims verifiable. Updating it is useful when facts or the offer change. Changing a publication date alone does not automatically increase its value.",
        },
        {
          heading: "Results and limits",
          body: "Visibility also depends on competition, query type and search-engine evaluation. Traffic and query data help assess outcomes but do not reduce ranking to a single behavioural metric. Technical SEO enables access and interpretation; it does not promise a particular position.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: robots.txt",
          href: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
        },
        {
          label: "Google Search ranking systems",
          href: "https://developers.google.com/search/docs/appearance/ranking-systems-guide",
        },
      ],
    },
    pl: {
      title: "Techniczne SEO, treść i widoczność: odrębne elementy jednego procesu",
      excerpt: "Indeksowanie, dostęp robotów i jakość treści wymagają osobnej oceny.",
      sections: [
        {
          heading: "Dostęp nie oznacza indeksowania",
          body: "robots.txt steruje dostępem robotów do zasobów. Nie jest narzędziem gwarantującym wykluczenie adresu z wyników. Do wyłączenia indeksowania służy między innymi dyrektywa noindex, którą robot musi móc odczytać. Poufne treści wymagają kontroli dostępu, a nie tylko instrukcji dla wyszukiwarki.",
        },
        {
          heading: "Struktura i migracja",
          body: "Adresy kanoniczne, mapa witryny, linkowanie i przekierowania pomagają interpretować strukturę strony. Podczas migracji trzeba mapować stare adresy na odpowiednie nowe zasoby. Przekierowanie nie stanowi gwarancji utrzymania każdej pozycji.",
        },
        {
          heading: "Treść odpowiada na potrzebę",
          body: "Informacje powinny wyjaśniać usługę, produkt lub problem użytkownika i umożliwiać sprawdzenie istotnych deklaracji. Aktualizacja ma sens, gdy zmienia się stan wiedzy lub oferta. Sama zmiana daty publikacji nie zwiększa automatycznie wartości materiału.",
        },
        {
          heading: "Wyniki i granice wnioskowania",
          body: "Widoczność zależy również od konkurencji, rodzaju zapytania i sposobu oceny treści przez wyszukiwarkę. Dane o wejściach i zapytaniach pomagają badać efekty, lecz nie uprawniają do sprowadzenia rankingu do jednego wskaźnika zachowania. Techniczne SEO jest podstawą dostępności dla wyszukiwarki, nie obietnicą określonej pozycji.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: robots.txt",
          href: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
        },
        {
          label: "Google Search ranking systems",
          href: "https://developers.google.com/search/docs/appearance/ranking-systems-guide",
        },
      ],
    },
    publishedDateIso: "2026-06-18",
  },
  {
    slugEn: "web-design-aberdeenshire",
    slugPl: "web-design-aberdeenshire-szkocja",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "A business website in Aberdeenshire: scope and selection criteria",
      excerpt:
        "How to define a local business website and distinguish development from operating costs.",
      sections: [
        {
          heading: "Business and service area",
          body: "The website should explain the services, audience and actual service area. Place names are useful when they reflect genuine coverage. A location list does not replace information about travel, installation or support availability.",
        },
        {
          heading: "Scope matters more than page count",
          body: "Cost depends on functions, content, languages, integrations and data work. An informational site and a client portal have different requirements. Forsa Design does not publish one price schedule for every project. A quotation should identify deliverables and separate external-service charges.",
        },
        {
          heading: "Checks before launch",
          body: "On mobile, check legibility, navigation and contact options. Business details and services should agree with the channels the company actually uses. A Google Business Profile can support local presence where eligibility requirements are met, but does not guarantee visibility.",
        },
        {
          heading: "Working with Forsa Design",
          body: "Based in Banff, we develop custom websites and applications for industrial and technical businesses. Requirements analysis precedes solution selection. Visual identity and counterparty assessment are separate service areas. Contact: hello@forsadesign.co.uk.",
        },
      ],
    },
    pl: {
      title: "Strona firmy w Aberdeenshire: zakres projektu i kryteria wyboru",
      excerpt:
        "Jak określić wymagania strony lokalnej firmy i odróżnić koszt wykonania od utrzymania.",
      sections: [
        {
          heading: "Firma i rzeczywisty obszar obsługi",
          body: "Strona powinna wyjaśniać, jakie usługi firma świadczy, komu i na jakim obszarze. Nazwy miejscowości są użyteczne wtedy, gdy odpowiadają rzeczywistemu zasięgowi. Lista lokalizacji nie zastępuje informacji o dostępności dojazdu, montażu lub wsparcia.",
        },
        {
          heading: "Zakres ważniejszy od liczby podstron",
          body: "Koszt zależy od funkcji, treści, języków, integracji i pracy nad danymi. Strona informacyjna i portal klientów mają różne wymagania. Forsa Design nie publikuje jednego cennika obejmującego wszystkie realizacje. Kalkulacja powinna wskazywać rezultat prac i odrębne koszty usług zewnętrznych.",
        },
        {
          heading: "Co sprawdzić przed uruchomieniem",
          body: "Na telefonie należy sprawdzić czytelność, nawigację i możliwość kontaktu. Dane firmy i opisy usług powinny być spójne z innymi rzeczywiście używanymi kanałami. Profil firmy w Google może wspierać lokalną obecność, jeżeli przedsiębiorstwo spełnia wymagania tej usługi; nie jest gwarancją widoczności.",
        },
        {
          heading: "Współpraca z Forsa Design",
          body: "Działamy z Banff i tworzymy dedykowane strony oraz aplikacje dla przedsiębiorstw przemysłowych i technicznych. Analiza wymagań poprzedza wybór rozwiązania. Identyfikacja wizualna i analiza kontrahentów są odrębnymi obszarami oferty. Kontakt: hello@forsadesign.co.uk.",
        },
      ],
    },
    publishedDateIso: "2026-06-30",
  },
  {
    slugEn: "website-conversion-what-actually-works",
    slugPl: "konwersja-strony-co-dziala-naprawde",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "How to assess whether a website supports enquiries",
      excerpt: "Offer clarity, credibility and forms can be assessed through specific tasks.",
      sections: [
        {
          heading: "An understandable offer",
          body: "Visitors need to establish what the business supplies and what information is needed to begin a discussion. Service descriptions, conditions and examples are more useful than general quality claims. There is no universal number of seconds within which every visitor must understand the entire offer.",
        },
        {
          heading: "Credible evidence",
          body: "A portfolio should identify the task, functions and project status. Business results require data and a measurement period. Illustrative numbers must be labelled hypothetical rather than presented as company achievements.",
        },
        {
          heading: "Navigation and forms",
          body: "Menu structure should reflect audience needs; there is no universal six-item limit. Forms should collect what is needed for the next step, retain product context and clearly confirm submission outcomes.",
        },
        {
          heading: "Verifying outcomes",
          body: "Define a measure before making changes, such as successfully received enquiries of a specified quality. Compare results while accounting for traffic sources, seasonality and sample size. Improved clarity is a valid design objective, while increased sales needs separate evidence.",
        },
      ],
    },
    pl: {
      title: "Jak oceniać, czy strona ułatwia pozyskanie zapytania",
      excerpt:
        "Czytelność oferty, wiarygodność i formularze można oceniać przez konkretne zadania.",
      sections: [
        {
          heading: "Zrozumiała oferta",
          body: "Odbiorca powinien móc ustalić, co firma dostarcza i jakie informacje są potrzebne do rozpoczęcia rozmowy. Ogólne deklaracje jakości warto zastąpić zakresem usług, warunkami realizacji i przykładami. Nie istnieje jedna obowiązująca liczba sekund, w której każdy musi zrozumieć całą ofertę.",
        },
        {
          heading: "Wiarygodne dowody",
          body: "Portfolio powinno wskazywać zadanie, funkcje i status projektu. Wyniki biznesowe wymagają danych i okresu pomiaru. Liczby użyte jako przykład należy oznaczyć jako hipotetyczne; nie mogą wyglądać jak osiągnięcia firmy.",
        },
        {
          heading: "Nawigacja i formularz",
          body: "Struktura menu powinna wynikać z potrzeb odbiorców. Nie ma uniwersalnej granicy sześciu pozycji. Formularz powinien zbierać informacje niezbędne do następnego kroku, zachowywać kontekst produktu i jasno potwierdzać wynik wysłania.",
        },
        {
          heading: "Weryfikacja efektu",
          body: "Przed zmianą należy określić miarę, na przykład poprawnie odebrane zapytania o określonej jakości. Po zmianie trzeba porównać wyniki z uwzględnieniem źródeł ruchu, sezonowości i liczebności próby. Lepsza czytelność jest uzasadnionym celem projektu, lecz wzrost sprzedaży wymaga osobnego potwierdzenia.",
        },
      ],
    },
    publishedDateIso: "2026-07-01",
  },
  {
    slugEn: "website-maintenance-matters",
    slugPl: "dlaczego-utrzymanie-strony-ma-znaczenie",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "Website maintenance: updates, recovery and operational checks",
      excerpt:
        "How to distinguish technical maintenance from content changes, feature development and search promotion.",
      sections: [
        {
          heading: "What requires maintenance",
          body: "Dependencies, service configuration and integrations can change after launch. Technical maintenance covers update assessment, fault diagnosis and key-workflow checks. Frequency depends on risk and architecture rather than one schedule for every website.",
        },
        {
          heading: "Backups and recovery",
          body: "Backups should cover what is required to restore operation: code, data, files and configuration. A restore test assesses whether the procedure works. The existence of an archive alone is insufficient.",
        },
        {
          heading: "Content currency",
          body: "Changes to products, contact details or service conditions need updates. An older article can remain useful if it is accurate. The importance of freshness depends on the topic and query rather than document age alone.",
        },
        {
          heading: "Responsibilities",
          body: "Technical maintenance, content editing, feature development and ongoing SEO are distinct tasks. The business should know who handles each one. Forsa Design support is optional; another provider can maintain the system with suitable access and documentation.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: robots.txt",
          href: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
        },
        {
          label: "Google Search ranking systems",
          href: "https://developers.google.com/search/docs/appearance/ranking-systems-guide",
        },
      ],
    },
    pl: {
      title: "Utrzymanie strony: aktualizacje, odtwarzanie i kontrola działania",
      excerpt:
        "Jak oddzielić utrzymanie techniczne od zmian treści, rozwoju funkcji i promocji w wyszukiwarkach.",
      sections: [
        {
          heading: "Co wymaga utrzymania",
          body: "Zależności oprogramowania, konfiguracja usług i integracje mogą zmieniać się po publikacji. Utrzymanie techniczne obejmuje ocenę aktualizacji, diagnozę usterek i kontrolę kluczowych procesów. Częstotliwość kontroli zależy od ryzyka i architektury; nie każda strona wymaga identycznego harmonogramu.",
        },
        {
          heading: "Kopie i odtworzenie",
          body: "Zakres kopii powinien odpowiadać temu, co jest potrzebne do uruchomienia systemu: kodowi, danym, plikom i konfiguracji. Próba odtworzenia pozwala ocenić skuteczność procedury. Sam fakt istnienia archiwum nie wystarcza.",
        },
        {
          heading: "Aktualność treści",
          body: "Zmiana produktu, danych kontaktowych lub warunków usługi wymaga aktualizacji. Starszy artykuł może nadal być wartościowy, jeśli pozostaje poprawny. Świeżość ma znaczenie zależne od tematu i zapytania, a nie od samego wieku dokumentu.",
        },
        {
          heading: "Podział odpowiedzialności",
          body: "Utrzymanie techniczne, redakcja treści, rozwój funkcji i ciągłe działania SEO są odrębnymi zadaniami. Firma powinna wiedzieć, kto odpowiada za każde z nich. W Forsa Design dalsza obsługa jest opcjonalna; klient może zlecić ją innemu wykonawcy dysponującemu odpowiednimi dostępami i dokumentacją.",
        },
      ],
      sources: [
        {
          label: "Google Search Central: robots.txt",
          href: "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
        },
        {
          label: "Google Search ranking systems",
          href: "https://developers.google.com/search/docs/appearance/ranking-systems-guide",
        },
      ],
    },
    publishedDateIso: "2026-07-10",
  },
  {
    slugEn: "from-template-to-shipyard",
    slugPl: "od-szablonu-do-stoczni",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "Marine-industry websites: information for supplier assessment",
      excerpt:
        "How to present capability, documentation and projects without relying on general marketing claims.",
      sections: [
        {
          heading: "The buyer’s task",
          body: "A buyer or engineer needs to establish the scope of work, technical capability and contact route. A website can support initial supplier assessment but does not replace an audit or tender-specific review.",
        },
        {
          heading: "Documentation and projects",
          body: "Project descriptions should identify the actual work, date and material approved for publication. Certificates need a defined scope and validity. A project’s age alone does not make it irrelevant; its value depends on what it demonstrates.",
        },
        {
          heading: "Technology follows requirements",
          body: "Documentation, project cards and integrations can be implemented using different technologies. A CMS is not inherently unable to support them. Custom development is justified where data, permissions or workflows call for specialised logic.",
        },
        {
          heading: "Verification",
          body: "Test document discovery, specification reading and enquiry submission on mobile and slower connections. Use an actual task. Aesthetic assessment does not replace checks of factual accuracy and system behaviour.",
        },
      ],
    },
    pl: {
      title: "Strona dla branży morskiej: informacje potrzebne w weryfikacji dostawcy",
      excerpt:
        "Jak prezentować kompetencje, dokumentację i realizacje bez zastępowania strony deklaracjami marketingowymi.",
      sections: [
        {
          heading: "Zadanie odbiorcy",
          body: "Kupiec lub inżynier potrzebuje ustalić zakres prac, możliwości techniczne i drogę kontaktu. Strona może ułatwić wstępne sprawdzenie dostawcy, ale nie zastępuje audytu ani oceny wymaganej w przetargu.",
        },
        {
          heading: "Dokumentacja i realizacje",
          body: "Opis projektu powinien wskazywać rzeczywisty zakres wykonania, datę i dopuszczone do publikacji materiały. Certyfikat wymaga określenia zakresu i aktualności. Wiek realizacji sam w sobie nie odbiera jej wartości; istotna jest trafność jako dowodu kompetencji.",
        },
        {
          heading: "Technologia odpowiada na wymagania",
          body: "Dokumentację, karty projektów i integracje można realizować w różnych technologiach. Nie należy twierdzić, że CMS z zasady ich nie obsługuje. Dedykowane rozwiązanie jest uzasadnione wtedy, gdy wymagania dotyczące danych, uprawnień lub procesów wymagają własnej logiki.",
        },
        {
          heading: "Weryfikacja strony",
          body: "Warto sprawdzić odnalezienie dokumentu, odczyt parametrów i wysłanie zapytania na słabszym połączeniu oraz telefonie. Test powinien obejmować rzeczywiste zadanie. Ocena estetyczna nie zastępuje sprawdzenia poprawności informacji i działania systemu.",
        },
      ],
    },
    publishedDateIso: "2026-08-04",
  },
  {
    slugEn: "how-we-improved-performance-polish-version",
    slugPl: "jak-podnieslismy-wydajnosc-polskiej-wersji-strony",
    dateIso: "2026-11-17",
    readingTimeMin: 2,
    en: {
      title: "PL and EN performance: content, resources and caching",
      excerpt:
        "How to compare language versions without assigning a score change to an unverified single cause.",
      sections: [
        {
          heading: "Comparable conditions",
          body: "Language versions can share code while differing in text length, layout and the LCP element. Comparison requires consistent device, network, cache and consent conditions. A single run does not establish a persistent difference.",
        },
        {
          heading: "Content and resources",
          body: "Compare HTML, images, fonts and scripts, identifying what actually differs. Shortening text can change layout, but a small reduction in HTML size does not by itself prove an improvement in LCP or the overall score.",
        },
        {
          heading: "Caching and deployment versions",
          body: "Confirm that both paths serve the same deployment before testing. A mismatch between initial HTML and the application can lead to comparisons of different content. Cache policy should distinguish updated documents from versioned application assets.",
        },
        {
          heading: "Reporting",
          body: "A report should identify dates, URLs, tools, conditions and repeated measurements before and after a change. Conclusions must stay within the observed evidence. This procedure explains assessment; it is not a measured improvement report for a specific deployment.",
        },
      ],
      sources: [
        {
          label: "Web Vitals: field and laboratory measurement",
          href: "https://web.dev/articles/vitals",
        },
      ],
    },
    pl: {
      title: "Wydajność wersji PL i EN: treść, zasoby i pamięć podręczna",
      excerpt:
        "Jak porównywać wersje językowe bez przypisywania zmian wyniku jednej niezweryfikowanej przyczynie.",
      sections: [
        {
          heading: "Porównywalne warunki",
          body: "Dwie wersje językowe mogą korzystać z tego samego kodu, a mimo to różnić się długością tekstu, układem i elementem LCP. Porównanie wymaga tych samych warunków urządzenia, połączenia, stanu cache i zgód. Wynik pojedynczego uruchomienia nie jest wystarczającym dowodem trwałej różnicy.",
        },
        {
          heading: "Treść i zasoby",
          body: "Należy sprawdzić dokument HTML, obrazy, fonty i skrypty oraz wskazać, co rzeczywiście zmienia się między wersjami. Skrócenie tekstu może zmienić układ, ale mała redukcja rozmiaru HTML nie dowodzi sama w sobie poprawy LCP ani całego wyniku.",
        },
        {
          heading: "Cache i wersje wdrożenia",
          body: "Przed testem trzeba potwierdzić, że obie ścieżki udostępniają tę samą wersję wdrożenia. Niezgodność pierwotnego HTML-u z aplikacją może prowadzić do oceny różnych treści. Zasady cache powinny odróżniać aktualizowany dokument od wersjonowanych plików aplikacji.",
        },
        {
          heading: "Raportowanie wyników",
          body: "Raport powinien podawać datę, adres, narzędzie, warunki i wyniki powtórzonych pomiarów przed oraz po zmianie. Wnioski należy ograniczyć do obserwowanych danych. Ta procedura opisuje sposób oceny; nie stanowi raportu z udokumentowanym wzrostem wyniku konkretnego wdrożenia.",
        },
      ],
      sources: [
        {
          label: "Web Vitals: field and laboratory measurement",
          href: "https://web.dev/articles/vitals",
        },
      ],
    },
    publishedDateIso: "2026-08-07",
  },
];
