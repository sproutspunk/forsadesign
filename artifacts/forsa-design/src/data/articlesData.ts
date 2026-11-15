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
    slugEn: "industrial-website-supplier-checks",
    slugPl: "strona-przemyslowa-gotowa-na-weryfikacje-dostawcy",
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-11-15",
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
    dateIso: "2026-06-01",
    readingTimeMin: 5,
    en: {
      title: "How to Choose a Web Agency: 7 Questions You Should Ask",
      excerpt:
        "Choosing a web agency is a business decision. Many businesses focus only on price and forget about long-term value. Here are 7 questions that help separate professional agencies from companies that simply deliver a template and move on.",
      sections: [
        {
          body: "Choosing a web agency is one of those decisions that looks simple until you start looking. There are a lot of options, prices vary enormously, and most agencies will show you the same polished portfolio. These seven questions help cut through that and get to what actually matters.",
        },
        {
          heading: "1. Do you have experience in my industry?",
          body: "Ask what they have actually built in your industry, not just general portfolio pieces. Design is easy to present. What you really want to know is whether the sites they built performed well. Did they improve enquiry rates? Did they rank well in local searches? That is harder to fake than a good-looking homepage.",
        },
        {
          heading: "2. What is your discovery process?",
          body: "A good agency does not start building until they understand your business. The first meeting should feel like they are learning about you, not selling to you. If they arrive with design concepts before they have talked about your customers and goals, that is not a good sign.",
        },
        {
          heading: "3. Do you focus on SEO and performance?",
          body: "A site that looks great but loads slowly or does not appear in search is missing most of its value. Ask specifically how they approach page speed, mobile optimisation and local search visibility. If the answer is vague, keep looking.",
        },
        {
          heading: "4. Who will manage my project?",
          body: "You should know exactly who you will be speaking to and how often. Smaller studios and freelancers often work across several clients at once. A clear point of contact who knows your project makes a real difference when things need to move quickly.",
        },
        {
          heading: "5. What happens after launch?",
          body: "Launch is the beginning, not the end. Ask what is covered after go-live: security updates, backups, performance monitoring, small content changes. Some agencies are very present during the project and hard to reach afterwards.",
        },
        {
          heading: "6. Can I move my website if my needs change?",
          body: "You should own your domain, your hosting account and your content directly. If the agency or their platform controls those things, you are tied to them for as long as your site exists. Always check portability before you sign anything.",
        },
        {
          heading: "7. How is pricing structured?",
          body: 'Get the full picture upfront: what is included, how revisions work, what triggers extra cost, what ongoing fees look like. A clear quote with no ambiguity is a good sign. Lots of "it depends" before you have even agreed on scope is a warning.',
        },
        {
          heading: "Summary",
          body: "The best agencies ask more questions than you do in the first conversation. They want to understand your business before they start talking about solutions.",
        },
      ],
    },
    pl: {
      title: "Jak wybrać agencję webową: 7 pytań, które powinieneś zadać",
      excerpt:
        "Wybór agencji webowej to decyzja biznesowa. Wiele firm skupia się tylko na cenie i zapomina o długoterminowej wartości. Oto 7 pytań, które pomagają odróżnić profesjonalne agencje od firm, które po prostu dostarczają szablon i odchodzą.",
      sections: [
        {
          body: "Wybór agencji webowej to jedna z tych decyzji, które wyglądają prosto dopóki nie zaczniesz szukać. Ofert jest dużo, ceny różnią się ogromnie, a większość agencji pokaże Ci to samo dopracowane portfolio. Te siedem pytań pomaga przez to przebić i dotrzeć do tego, co naprawdę ma znaczenie.",
        },
        {
          heading: "1. Czy macie doświadczenie w mojej branży?",
          body: "Zapytaj co konkretnie zbudowali w Twojej branży, a nie tylko o ogólne portfolio. Design łatwo zaprezentować. Naprawdę chcesz wiedzieć, czy strony które zbudowali działały dobrze. Czy poprawiły wskaźniki zapytań? Czy dobrze wypadały w lokalnych wyszukiwaniach? To trudniej podrobić niż ładną stronę główną.",
        },
        {
          heading: "2. Jaki jest Wasz proces odkrywania projektu?",
          body: "Dobra agencja nie zaczyna budowania zanim nie zrozumie Twojego biznesu. Pierwsze spotkanie powinno wyglądać jak uczenie się o Tobie, a nie sprzedaż. Jeśli przychodzą z koncepcjami designu zanim porozmawiali o Twoich klientach i celach, to nie jest dobry znak.",
        },
        {
          heading: "3. Czy skupiacie się na SEO i wydajności?",
          body: "Strona, która świetnie wygląda, ale wolno się ładuje lub nie pojawia się w wyszukiwarce, traci większość swojej wartości. Zapytaj konkretnie jak podchodzą do szybkości strony, optymalizacji mobilnej i lokalnej widoczności. Jeśli odpowiedź jest ogólna, szukaj dalej.",
        },
        {
          heading: "4. Kto będzie zarządzał moim projektem?",
          body: "Powinieneś wiedzieć dokładnie z kim będziesz rozmawiał i jak często. Mniejsze studia i freelancerzy często pracują z kilkoma klientami jednocześnie. Jasny punkt kontaktu, który zna Twój projekt, robi realną różnicę gdy sprawy muszą się posuwać szybko.",
        },
        {
          heading: "5. Co się dzieje po uruchomieniu?",
          body: "Uruchomienie to początek, nie koniec. Zapytaj co jest objęte po go-live: aktualizacje bezpieczeństwa, kopie zapasowe, monitorowanie wydajności, małe zmiany w treści. Niektóre agencje są bardzo obecne w trakcie projektu i trudne do znalezienia po jego zakończeniu.",
        },
        {
          heading: "6. Czy mogę przenieść stronę, jeśli moje potrzeby się zmienią?",
          body: "Powinieneś bezpośrednio posiadać domenę, konto hostingowe i treść. Jeśli agencja lub jej platforma kontroluje te rzeczy, jesteś do nich przywiązany dopóki Twoja strona istnieje. Zawsze sprawdź przenośność przed podpisaniem czegokolwiek.",
        },
        {
          heading: "7. Jak wygląda wycena projektu?",
          body: 'Poznaj pełny obraz z góry: co jest zawarte, jak działają rewizje, co powoduje dodatkowy koszt, jak wyglądają opłaty bieżące. Jasna wycena bez niejednoznaczności to dobry znak. Dużo "to zależy" zanim uzgodniono nawet zakres to ostrzeżenie.',
        },
        {
          heading: "Podsumowanie",
          body: "Najlepsze agencje zadają więcej pytań niż Ty podczas pierwszej rozmowy. Chcą zrozumieć Twój biznes zanim zaczną mówić o rozwiązaniach.",
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
          body: "Most people browse on their phones these days. So responsiveness sounds like the obvious priority. But responsiveness and speed are two separate problems, and you need both working well. A site that adjusts perfectly to mobile but takes five seconds to load will lose visitors just as quickly as one that is hard to navigate.",
        },
        {
          heading: "What is responsiveness?",
          body: "A responsive site adjusts automatically to whatever screen it is viewed on. Text stays readable, buttons are tappable, images scale correctly. This is not a bonus feature any more. It is the starting point for any site built in the last ten years. If someone visits on a phone and has to pinch and zoom to read your content, they will leave.",
        },
        {
          heading: "What is loading speed?",
          body: "Speed is how quickly the site loads and becomes usable. Most visitors will abandon a page that takes more than three seconds to load. Speed also feeds directly into Google's ranking signals, particularly for mobile searches. A slow site pays twice: it loses visitors, and it ranks lower in search results.",
        },
        {
          heading: "How do they work together?",
          body: "A responsive site can still be slow if it was built with heavy images, unnecessary scripts or too many third-party tools. A fast site can still frustrate mobile users if buttons are tiny or navigation was designed for a desktop. The two problems need to be addressed together, not treated as separate checkboxes.",
        },
        {
          heading: "How do you measure speed?",
          body: "Google's Core Web Vitals are the benchmark worth knowing. LCP (Largest Content Paint) measures how quickly the main content loads, with a target of under 2.5 seconds. INP measures responsiveness to clicks and taps. CLS (Cumulative Layout Shift) measures whether the page shifts unexpectedly while loading. Page Speed Insights and GTmetrix will show you how your site scores on all three.",
        },
        {
          heading: "How do you build a fast and responsive website?",
          body: "The main levers are image optimisation (use modern formats, compress properly, load only what is visible), lean code without unnecessary plug-ins, and smart caching. Test on real mobile devices and real connections, not just a desktop emulator. A site that scores well in a lab but struggles on a rural 4G connection has a real problem for the people you most want to reach.",
        },
        {
          heading: "Summary",
          body: "Responsiveness means people can use your site on any device. Speed means they are willing to wait for it. Both matter and both need attention.",
        },
      ],
    },
    pl: {
      title: "Responsywność vs Szybkość: Dlaczego oba mają znaczenie dla konwersji",
      excerpt:
        "Większość ludzi przegląda internet na urządzeniach mobilnych. Ale responsywność i szybkość to dwie różne rzeczy. Obie bezpośrednio wpływają na doświadczenie użytkownika i konwersje.",
      sections: [
        {
          body: "Większość ludzi przegląda internet na telefonach. Więc responsywność brzmi jak oczywisty priorytet. Ale responsywność i szybkość to dwa osobne problemy i oba muszą działać dobrze. Strona, która perfekcyjnie dostosowuje się do telefonu, ale ładuje się pięć sekund, straci odwiedzających równie szybko jak ta, po której trudno się poruszać.",
        },
        {
          heading: "Co to jest responsywność?",
          body: "Responsywna strona automatycznie dostosowuje się do ekranu, na którym jest wyświetlana. Tekst pozostaje czytelny, przyciski dają się kliknąć, obrazy skalują się prawidłowo. To nie jest już bonus. To punkt wyjścia dla każdej strony zbudowanej w ostatnich dziesięciu latach. Jeśli ktoś odwiedza Twoją stronę na telefonie i musi szczypać ekran żeby przeczytać treść, odejdzie.",
        },
        {
          heading: "Co to jest szybkość ładowania?",
          body: "Szybkość to czas, w którym strona ładuje się i staje się użyteczna. Większość odwiedzających porzuca stronę, która ładuje się dłużej niż trzy sekundy. Szybkość wpływa też bezpośrednio na sygnały rankingowe Google, szczególnie dla wyszukiwań mobilnych. Wolna strona płaci podwójnie: traci odwiedzających i spada w wynikach wyszukiwania.",
        },
        {
          heading: "Jak działają razem?",
          body: "Responsywna strona może nadal być wolna jeśli zbudowano ją z ciężkimi obrazami, zbędnymi skryptami lub zbyt wieloma zewnętrznymi narzędziami. Szybka strona może nadal frustrować użytkowników mobilnych jeśli przyciski są małe lub nawigacja była zaprojektowana dla desktopa. Oba problemy muszą być rozwiązane razem, a nie traktowane jako osobne zadania.",
        },
        {
          heading: "Jak mierzyć szybkość?",
          body: "Core Web Vitals Google to benchmark wart znajomości. LCP (Largest Contentful Paint) mierzy jak szybko ładuje się główna treść, z celem poniżej 2,5 sekundy. INP mierzy responsywność na kliknięcia i dotknięcia. CLS (Cumulative Layout Shift) mierzy czy strona przesuwa się nieoczekiwanie podczas ładowania. PageSpeed Insights i GTmetrix pokażą jak Twoja strona wypada na wszystkich trzech.",
        },
        {
          heading: "Jak budować szybką i responsywną stronę?",
          body: "Główne dźwignie to optymalizacja obrazów (nowoczesne formaty, kompresja, ładowanie tylko tego co widoczne), lekki kod bez niepotrzebnych wtyczek i inteligentne cachowanie. Testuj na prawdziwych urządzeniach mobilnych i prawdziwych połączeniach, a nie tylko na emulatorze desktopu. Strona, która dobrze wypada w laboratorium, ale ma problemy na wiejskim połączeniu 4G, ma realny problem dla osób, które chcesz przyciągnąć.",
        },
        {
          heading: "Podsumowanie",
          body: "Responsywność oznacza że ludzie mogą korzystać z Twojej strony na każdym urządzeniu. Szybkość oznacza że są gotowi na nią poczekać. Oba mają znaczenie i oba wymagają uwagi.",
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
          body: "A template CMS is often the first stop for a new business that needs a website. It is fast to set up, relatively cheap and straightforward to edit. That works well for a lot of projects. But as a business grows and its requirements become more specific, the limitations of a template can start to show.",
        },
        {
          heading: "Advantages of a template CMS",
          body: "The main advantages are cost and speed. A template-based site can be live in days and costs a fraction of a custom build. Editing is designed for non-technical users, so you can update content without touching code. There is also a wide ecosystem of plugins and integrations available for the most popular platforms.",
        },
        {
          heading: "Limitations of a template CMS",
          body: "A template is built to work for many businesses, not one specific business. The result is that many sites end up looking similar because they share the same underlying themes. Custom changes often require workarounds that add complexity over time. Heavy plugin use can drag down performance and introduce security vulnerabilities. And when it comes to moving platforms later, migration can be a significant project.",
        },
        {
          heading: "Advantages of a custom website",
          body: "A custom site is built from the ground up around your specific goals and users. The design is unique, the functionality matches what you actually need, and the code is clean without unnecessary overhead. You have full control over SEO, integrations and how the site grows over time. It is also easier to adapt as your business evolves.",
        },
        {
          heading: "Limitations of a custom website",
          body: "The upfront investment is higher and the build timeline is longer. You are also more dependent on the agency or developer who built it for ongoing changes. Neither of these is a dealbreaker, but they are worth factoring in before you commit.",
        },
        {
          heading: "Who should use a template?",
          body: "Templates work well for small projects, portfolio sites, simple service businesses testing an idea, or any business with a tight launch budget and straightforward requirements.",
        },
        {
          heading: "Who should use a custom website?",
          body: "Custom development makes more sense when performance, search visibility, unique functionality or a specific user experience are central to how the business works. If your site is a key part of how you generate revenue, it is worth building it right.",
        },
        {
          heading: "Summary",
          body: "A template gets you online quickly. A custom site is built around how your business actually works. The right choice depends on where you are and where you are heading.",
        },
      ],
    },
    pl: {
      title: "Dlaczego szablon CMS to nie to samo co dedykowana strona",
      excerpt:
        "Szablon CMS może być szybkim i przystępnym rozwiązaniem. Jednak wraz z rozwojem biznesu mogą pojawić się ograniczenia. Szablony są projektowane dla wielu użytkowników. Dedykowane strony są tworzone wokół Twoich konkretnych celów.",
      sections: [
        {
          body: "Szablon CMS to często pierwsze zatrzymanie dla nowego biznesu potrzebującego strony. Szybko go uruchomić, jest stosunkowo tani i prosty do edycji. Sprawdza się to dobrze dla wielu projektów. Jednak gdy firma rośnie i jej wymagania stają się bardziej specyficzne, ograniczenia szablonu zaczynają być widoczne.",
        },
        {
          heading: "Zalety szablonu CMS",
          body: "Główne zalety to koszt i szybkość. Strona oparta na szablonie może być live w ciągu dni i kosztuje ułamek dedykowanego projektu. Edycja jest zaprojektowana dla użytkowników bez wiedzy technicznej, więc możesz aktualizować treść bez dotykania kodu. Istnieje też szeroki ekosystem wtyczek i integracji dla najpopularniejszych platform.",
        },
        {
          heading: "Ograniczenia szablonu CMS",
          body: "Szablon jest zbudowany by działać dla wielu firm, a nie jednej konkretnej. Efekt jest taki, że wiele stron wygląda podobnie, bo dzielą te same bazowe motywy. Niestandardowe zmiany często wymagają obejść, które z czasem dodają złożoności. Ciężkie użycie wtyczek może obniżyć wydajność i wprowadzić luki bezpieczeństwa. A gdy przyjdzie czas na zmianę platformy, migracja może być poważnym projektem.",
        },
        {
          heading: "Zalety dedykowanej strony",
          body: "Dedykowana strona jest zbudowana od podstaw wokół Twoich konkretnych celów i użytkowników. Design jest unikalny, funkcjonalność odpowiada temu czego naprawdę potrzebujesz, a kod jest czysty bez zbędnego nadmiaru. Masz pełną kontrolę nad SEO, integracjami i tym jak strona rośnie w czasie. Łatwiej też ją adaptować gdy biznes się zmienia.",
        },
        {
          heading: "Ograniczenia dedykowanej strony",
          body: "Inwestycja wstępna jest wyższa, a czas realizacji dłuższy. Jesteś też bardziej zależny od agencji lub developera, który ją zbudował, przy bieżących zmianach. Żadne z tych nie jest dyskwalifikatorem, ale warto je uwzględnić zanim się zdecydujesz.",
        },
        {
          heading: "Dla kogo szablon?",
          body: "Szablony sprawdzają się dobrze dla małych projektów, stron portfolio, prostych firm usługowych testujących pomysł lub każdego biznesu z ograniczonym budżetem startowym i prostymi wymaganiami.",
        },
        {
          heading: "Dla kogo dedykowana strona?",
          body: "Dedykowany development ma więcej sensu gdy wydajność, widoczność w wyszukiwarkach, unikalna funkcjonalność lub specyficzne doświadczenie użytkownika są centralną częścią jak działa biznes. Jeśli Twoja strona jest kluczową częścią generowania przychodów, warto zbudować ją dobrze.",
        },
        {
          heading: "Podsumowanie",
          body: "Szablon szybko stawia Cię online. Dedykowana strona jest zbudowana wokół tego, jak Twój biznes naprawdę działa. Właściwy wybór zależy od tego, gdzie jesteś i dokąd zmierzasz.",
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
          body: "In online retail, the margin between a completed sale and an abandoned cart is thinner than most people think. Speed, trust and a simple buying process all play a role. Small problems anywhere in the journey add up, and customers who hit friction will often just go elsewhere.",
        },
        {
          heading: "1. Speed affects conversions",
          body: "Customers browsing online have high expectations. A shop that takes too long to load creates doubt before they have even seen your products. The data consistently shows that every additional second of load time reduces conversion rates. When someone is ready to buy, they are not willing to wait.",
        },
        {
          heading: "2. Checkout experience",
          body: "The buying process should be as short as possible. Too many steps, mandatory account creation, hidden costs revealed late in the process, or limited payment options are all common reasons customers abandon checkout. A clean, transparent process with minimal friction helps people complete what they came to do.",
        },
        {
          heading: "3. Trust signals",
          body: "Before sharing payment details, customers need to feel confident in the shop they are buying from. Clear contact information, visible return policies, customer reviews, secure payment badges and a professional design all contribute to that confidence. A site that looks unfinished or hard to navigate creates doubt, and doubt kills sales.",
        },
        {
          heading: "4. Mobile shopping",
          body: "A significant and growing share of e-commerce happens on mobile devices. Mobile shops need easy navigation, clear and well-sized buttons, fast-loading product images and a checkout that works well on touch. Mobile UX is not about shrinking a desktop layout. It needs to be designed for how people actually use a phone.",
        },
        {
          heading: "5. Inventory and product management",
          body: "Accurate product information matters for trust and for reducing returns. Stock levels should update in real time, product descriptions should be clear and honest, and recommendations should be relevant. The small details of how products are presented directly influence whether someone decides to buy.",
        },
        {
          heading: "Summary",
          body: "E-commerce success comes down to removing obstacles. Every part of the customer journey, from first load to final confirmation, affects whether a sale happens.",
        },
      ],
    },
    pl: {
      title: "E-commerce: Dlaczego szybkość i doświadczenie użytkownika napędzają sprzedaż",
      excerpt:
        "W handlu online małe problemy mogą powodować utratę sprzedaży. Szybkość, zaufanie i prosty proces zakupu wpływają na to, czy klienci finalizują zamówienie.",
      sections: [
        {
          body: "W handlu online margines między ukończoną sprzedażą a porzuconym koszykiem jest mniejszy niż większość ludzi myśli. Szybkość, zaufanie i prosty proces zakupu odgrywają rolę. Małe problemy w dowolnym miejscu ścieżki się sumują, a klienci, którzy napotkają tarcie, często po prostu pójdą gdzie indziej.",
        },
        {
          heading: "1. Szybkość wpływa na konwersje",
          body: "Klienci przeglądający online mają wysokie oczekiwania. Sklep, który zbyt długo się ładuje, budzi wątpliwości zanim jeszcze zobaczyli Twoje produkty. Dane konsekwentnie pokazują, że każda dodatkowa sekunda czasu ładowania obniża wskaźniki konwersji. Gdy ktoś jest gotowy do zakupu, nie jest skłonny czekać.",
        },
        {
          heading: "2. Doświadczenie checkout",
          body: "Proces zakupu powinien być jak najkrótszy. Zbyt wiele kroków, obowiązkowe tworzenie konta, koszty ujawniane późno w procesie lub ograniczone opcje płatności to powszechne powody dla których klienci porzucają checkout. Czysty, przejrzysty proces z minimalnym tarciem pomaga ludziom dokończyć to po co przyszli.",
        },
        {
          heading: "3. Sygnały zaufania",
          body: "Przed podaniem danych płatności klienci muszą czuć się pewnie w sklepie, w którym kupują. Jasne dane kontaktowe, widoczne polityki zwrotów, opinie klientów, odznaki bezpiecznych płatności i profesjonalny design przyczyniają się do tej pewności. Strona, która wygląda niedokończenie lub jest trudna w obsłudze, budzi wątpliwości, a wątpliwości zabijają sprzedaż.",
        },
        {
          heading: "4. Zakupy mobilne",
          body: "Znaczna i rosnąca część e-commerce dzieje się na urządzeniach mobilnych. Sklepy mobilne potrzebują łatwej nawigacji, wyraźnych i dobrze wypozycjonowanych przycisków, szybko ładujących się obrazów produktów i checkout który dobrze działa na dotyk. Mobilne UX to nie kurczenie layoutu desktopa. Musi być zaprojektowane tak jak ludzie naprawdę używają telefonu.",
        },
        {
          heading: "5. Zarządzanie asortymentem",
          body: "Dokładne informacje o produktach mają znaczenie dla zaufania i zmniejszenia zwrotów. Stany magazynowe powinny aktualizować się w czasie rzeczywistym, opisy produktów powinny być jasne i uczciwe, a rekomendacje trafne. Małe szczegóły prezentacji produktów bezpośrednio wpływają na to, czy ktoś zdecyduje się kupić.",
        },
        {
          heading: "Podsumowanie",
          body: "Sukces e-commerce sprowadza się do usuwania przeszkód. Każda część ścieżki klienta, od pierwszego ładowania po ostateczne potwierdzenie, wpływa na to, czy sprzedaż dojdzie do skutku.",
        },
      ],
    },
  },
  {
    slugEn: "seo-2026-website-is-just-the-start",
    slugPl: "seo-2026-strona-to-dopiero-poczatek",
    dateIso: "2026-06-18",
    readingTimeMin: 7,
    en: {
      title: "SEO: Why Your Website Is Only the Beginning",
      excerpt:
        "Building a website does not automatically bring customers from Google. SEO combines technical quality, content, user experience, and online authority. Your website is the foundation, not the entire strategy.",
      sections: [
        {
          body: "Launching a website does not automatically bring you customers from Google. A lot of people assume it does, and then wonder why the traffic never arrives. SEO is a combination of technical quality, content, user experience and online credibility. Your website is the foundation, but it is only the start.",
        },
        {
          heading: "Website foundation",
          body: "Before anything else, your site needs to be technically sound. This means a clear structure that helps search engines understand what your pages are about and how they relate to each other. It means good performance, because speed affects both user experience and how search engines evaluate your site. And it means proper technical setup: clean code, correct indexing, structured data where relevant, and a solid mobile experience.",
        },
        {
          heading: "Content matters",
          body: "Good content answers the questions your customers are actually asking. It should match what people search for and offer genuinely useful information, not filler padded out for length. A page that clearly and honestly answers a specific question will tend to outperform a page that mentions a lot of keywords but says little of value.",
        },
        {
          heading: "Experience and trust",
          body: "Search engines pay attention to signals of credibility. Clear, accurate information, consistent business details across the web, genuine customer feedback and demonstrated expertise all build authority over time. This cannot be shortcut. It is the result of running a good business and representing it well online.",
        },
        {
          heading: "Links and mentions",
          body: "When other reputable websites link to yours, it strengthens your standing in search. Quality matters far more than quantity. A single link from a relevant, trusted source is worth more than hundreds of low-quality ones. Guest posts, directory listings, press mentions and partnerships can all contribute over time.",
        },
        {
          heading: "User behaviour",
          body: "How people interact with your site gives search engines signals about its quality. If visitors land and leave quickly without engaging, it suggests the page did not deliver what they were looking for. Improving the relevance, usability and clarity of your content directly improves this.",
        },
        {
          heading: "Technical SEO basics",
          body: "robots.txt tells search engines which pages to access and index. A sitemap helps them discover all your content. Redirects protect your existing rankings when pages move or are removed. These are not complex, but they need to be set up correctly from the beginning.",
        },
        {
          heading: "Summary",
          body: "SEO is ongoing work, not a one-time setup. Your website creates the foundation. Content, credibility and consistent effort build visibility over time.",
        },
      ],
    },
    pl: {
      title: "SEO: Dlaczego strona to dopiero początek",
      excerpt:
        "Stworzenie strony nie sprowadza automatycznie klientów z Google. SEO łączy jakość techniczną, treść, doświadczenie użytkownika i autorytet online. Twoja strona to fundament, nie cała strategia.",
      sections: [
        {
          body: "Uruchomienie strony internetowej nie sprowadza automatycznie klientów z Google. Wiele osób tak zakłada, a potem zastanawia się dlaczego ruch nie przychodzi. SEO to połączenie jakości technicznej, treści, doświadczenia użytkownika i wiarygodności online. Twoja strona to fundament, ale to dopiero początek.",
        },
        {
          heading: "Fundament strony",
          body: "Zanim cokolwiek innego, strona musi być technicznie solidna. Oznacza to przejrzystą strukturę, która pomaga wyszukiwarkom zrozumieć czego dotyczą Twoje strony i jak są ze sobą powiązane. Oznacza dobrą wydajność, bo szybkość wpływa zarówno na doświadczenie użytkownika, jak i na to jak wyszukiwarki oceniają Twoją stronę. I oznacza właściwą konfigurację techniczną: czysty kod, prawidłowe indeksowanie, dane strukturalne tam gdzie właściwe i solidne doświadczenie mobilne.",
        },
        {
          heading: "Treść ma znaczenie",
          body: "Dobra treść odpowiada na pytania, które Twoi klienci naprawdę zadają. Powinna odpowiadać temu czego ludzie szukają i oferować naprawdę użyteczne informacje, a nie wypełniacz dla długości. Strona, która jasno i uczciwie odpowiada na konkretne pytanie, zazwyczaj wyprzedzi stronę, która zawiera dużo słów kluczowych, ale mówi niewiele wartościowego.",
        },
        {
          heading: "Doświadczenie i zaufanie",
          body: "Wyszukiwarki zwracają uwagę na sygnały wiarygodności. Jasne, dokładne informacje, spójne dane biznesowe w internecie, autentyczne opinie klientów i wykazana ekspertyza budują autorytet w czasie. Tego nie można skrócić. To wynik prowadzenia dobrego biznesu i dobrego reprezentowania go online.",
        },
        {
          heading: "Linki i wzmianki",
          body: "Gdy inne renomowane strony linkują do Twojej, wzmacnia to Twoją pozycję w wyszukiwaniach. Jakość ma znacznie większe znaczenie niż ilość. Jeden link z odpowiedniego, zaufanego źródła jest warty więcej niż setki niskiej jakości. Wpisy gościnne, listy katalogowe, wzmianki w prasie i partnerstwa mogą z czasem przyczynić się do tego.",
        },
        {
          heading: "Zachowanie użytkowników",
          body: "To jak ludzie wchodzą w interakcję ze stroną daje wyszukiwarkom sygnały o jej jakości. Jeśli odwiedzający lądują i szybko odchodzą bez angażowania się, sugeruje to że strona nie dostarczyła tego czego szukali. Poprawa trafności, użyteczności i jasności treści bezpośrednio poprawia te sygnały.",
        },
        {
          heading: "Podstawy technicznego SEO",
          body: "robots.txt informuje wyszukiwarki do których stron mają dostęp i które indeksować. Sitemap pomaga im odkryć całą Twoją treść. Przekierowania chronią istniejące rankingi gdy strony są przenoszone lub usuwane. To nie jest skomplikowane, ale musi być poprawnie skonfigurowane od początku.",
        },
        {
          heading: "Podsumowanie",
          body: "SEO to bieżąca praca, nie jednorazowa konfiguracja. Twoja strona tworzy fundament. Treść, wiarygodność i stały wysiłek budują widoczność w czasie.",
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
      title: "Web Design for Small Businesses in Aberdeenshire: What to Expect in 2026",
      excerpt:
        "If you run a business in Aberdeenshire, whether in Banff, Huntly, Inverurie, Turriff or anywhere else in the region, this guide covers what to expect from a professional website, what it costs, and what to ask before you commit.",
      sections: [
        {
          body: "Aberdeenshire has a strong base of small and medium businesses. Tradespeople, hospitality, healthcare, agriculture, retail, professional services. A lot of them are still running without a proper website, or with one built years ago that no longer represents the business.\n\nThis guide is for business owners in Aberdeenshire who are thinking about a new site or a redesign. It covers what to expect, what it costs, what to avoid, and how to find the right person for the job.",
        },
        {
          heading: "Why a professional website matters for Aberdeenshire businesses",
          body: 'Most customers in Aberdeenshire, whether they\'re searching in Banff, Macduff, Huntly, Keith, Turriff, Inverurie, Ellon, Peterhead, Fraserburgh or Aberdeen, will check a business online before making contact. If your site is slow, hard to use on a phone, or simply doesn\'t exist, they\'ll go with whoever shows up next.\n\nPeople make quick decisions about whether to trust a business based on how its website looks and works. A site built with that in mind turns visitors into calls, bookings and enquiries. A well-optimised site can also put you in front of someone searching "electrician Inverurie" or "accountant Huntly" at exactly the right moment.',
        },
        {
          heading: "What makes a good small business website in 2026",
          body: 'A good website for a small Aberdeenshire business is not about features. It is about getting the basics right.\n\nSpeed matters more than most people think. The majority of your visitors will be on a mobile phone, possibly on a rural 4G connection. If the site takes more than a few seconds to load, a large portion of those visitors will leave before they see anything.\n\nYour phone number should be on every page. Not buried in the footer. Right there at the top, with a tap-to-call button on mobile.\n\nThe words on your pages should reflect what you do and where you do it. Not just "Services" but "Plumbing in Banff and Aberdeenshire". Google reads this when deciding when to show your site.\n\nAnd every page should make it obvious what you want the visitor to do next. Call, book, enquire, or buy. One clear action per page.',
        },
        {
          heading: "How much does a website cost for a small business in Aberdeenshire?",
          body: "Pricing varies quite a bit depending on what you need. Here is a rough sense of where things sit for Aberdeenshire businesses in 2026.\n\nA basic site of three to five pages starts from around £1,200. That covers a sole trader or small service business that needs a clean online presence: homepage, services, about and direct contact details.\n\nA standard business website of five to ten pages typically runs from £2,500 to £5,000. That includes custom design, SEO setup, mobile optimisation and basic analytics.\n\nE-commerce or more complex projects tend to start at £5,000 and go up from there depending on the scope.\n\nBe cautious with very cheap quotes. A website for £300 from a template platform will often cost more in lost business than it saves upfront. The right price reflects the actual complexity of the project and is delivered by someone who understands what you are trying to achieve, not just what it should look like.",
        },
        {
          heading: "What to look for when choosing a web designer in Aberdeenshire",
          body: "Before committing to anyone, it is worth checking a few things.\n\nDo they ask questions about your business before showing you designs? A good designer starts with your goals. If the first question is what colours do you like, that is not a great sign.\n\nWhat happens to your site if you stop working with them? You should own your domain, your hosting account and your content. If any of those are tied to a third party, you are dependent on them indefinitely.\n\nDo they understand local SEO? Getting found in Aberdeenshire searches takes more than a good-looking site. Ask how they approach local visibility.\n\nAsk to see examples of sites that perform well, not just sites that look nice. Page speed, Google rankings, enquiry rates. Not just a screenshot of a homepage.",
        },
        {
          heading: "Common mistakes made by small businesses in Aberdeenshire",
          body: "Going with the cheapest option. A website is a business asset. The cheapest quote rarely produces the best outcome.\n\nBuilding on a platform that locks you in. Some DIY platforms make it very difficult to move your site if you want to switch providers later. Always check portability before you commit.\n\nForgetting about mobile. A site that looks great on a laptop but is difficult on a phone will lose most of your local visitors.\n\nNot saying where you operate. Google cannot guess. If you serve Huntly, Keith and the surrounding villages, say so clearly on your site.\n\nNo contact information above the fold. If a visitor cannot see your phone number or a clear contact option within the first few seconds, most will leave.",
        },
        {
          heading: "Local SEO: getting found in Aberdeenshire searches",
          body: "Local SEO is simply making sure your site shows up when someone nearby searches for a service you offer.\n\nIf you have not set up a Google Business Profile, do that first. It is free, and you can register as a service area business even without a public address. Without it, you are essentially invisible on Google Maps.\n\nIf you serve specific towns, say so on your site. A page that mentions web design in Inverurie or bookkeeping in Turriff will pick up more local searches than a generic services page.\n\nKeep your business name, address and phone number consistent everywhere. Your site, Google Business Profile, Yell, Checkatrade. Any inconsistency can quietly undermine your local rankings.\n\nWriting about local areas helps too. Articles like this one give Google more signals to connect your site with searches from people in Aberdeenshire.",
        },
        {
          heading: "Working with Forsa Design",
          body: "We work from Banff, in Aberdeenshire, and take on projects across the region and further afield.\n\nEvery project starts with a proper conversation. We ask about your business, your customers, what you are trying to achieve and what is not working at the moment. We do not propose solutions before we understand the problem.\n\nNo templates. Everything we build is designed for the specific business we are working with, built to load fast and turn visitors into enquiries.\n\nIf you are based in Aberdeenshire and looking for a new site or a redesign, email hello@forsadesign.co.uk or call directly. First conversation is free.",
        },
        {
          heading: "Summary",
          body: "A professional website is one of the most worthwhile investments a small Aberdeenshire business can make right now. Not the most expensive option, not the fastest. Just the right one for where your business is and where you want it to go.\n\nIf you are in Banff, Macduff, Turriff, Huntly, Keith, Inverurie, Ellon, Peterhead, Fraserburgh, Aberdeen or anywhere else in Aberdeenshire, we are happy to talk.",
        },
      ],
    },
    pl: {
      title: "Web Design dla Małych Firm w Aberdeenshire: Czego Się Spodziewać w 2026",
      excerpt:
        "Jeśli prowadzisz firmę w Aberdeenshire, w Banff, Huntly, Inverurie, Turriff czy gdziekolwiek indziej w regionie, ten przewodnik wyjaśnia czego się spodziewać po profesjonalnej stronie, ile to kosztuje i o co warto zapytać przed podpisaniem umowy.",
      sections: [
        {
          body: "Aberdeenshire ma silną bazę małych i średnich firm. Rzemieślnicy, hotelarstwo, ochrona zdrowia, rolnictwo, handel, usługi profesjonalne. Wiele z nich nadal dziala bez porządnej strony internetowej, albo z taką, która powstała lata temu i już dawno przestała reprezentować firmę tak jak powinna.\n\nTen przewodnik jest dla właścicieli firm w Aberdeenshire, którzy rozważają nową stronę lub redesign. Opisuje czego się spodziewać, ile to kosztuje, czego unikać i jak znaleźć odpowiednią osobę do pracy.",
        },
        {
          heading: "Dlaczego profesjonalna strona ma znaczenie dla firm z Aberdeenshire",
          body: 'Większość klientów w Aberdeenshire, czy szukają w Banff, Macduff, Huntly, Keith, Turriff, Inverurie, Ellon, Peterhead, Fraserburgh czy Aberdeen, sprawdza firmę online przed nawiązaniem kontaktu. Jeśli Twoja strona jest wolna, trudna do obsługi na telefonie lub po prostu nie istnieje, klient trafi do konkurenta, który ma działającą witrynę.\n\nLudzie szybko oceniają wiarygodność firmy na podstawie tego, jak wygląda i działa jej strona. Strona zbudowana z myślą o konwersji zamienia odwiedzających w telefony, rezerwacje i zapytania. Dobrze zoptymalizowana witryna może też trafić do kogoś szukającego "elektryk Inverurie" lub "księgowy Huntly" dokładnie w odpowiednim momencie.',
        },
        {
          heading: "Co tworzy dobrą stronę dla małej firmy w 2026",
          body: 'Dobra strona dla małej firmy z Aberdeenshire to nie kwestia funkcji. Chodzi o dobre wykonanie podstaw.\n\nSzybkość ma większe znaczenie niż większość ludzi myśli. Większość odwiedzających będzie na telefonie, być może na wiejskim połączeniu 4G. Jeśli strona ładuje się dłużej niż kilka sekund, duża część tych osób odejdzie zanim cokolwiek zobaczą.\n\nNumer telefonu powinien być na każdej stronie. Nie ukryty w stopce. Dobrze widoczny na górze, z przyciskiem click-to-call na telefonie.\n\nTreść strony powinna odzwierciedlać co robisz i gdzie to robisz. Nie tylko "Usługi", ale "Usługi hydrauliczne w Banff i Aberdeenshire". Google to czyta, gdy decyduje kiedy pokazać Twoją stronę.\n\nKażda strona powinna jasno wskazywać co odwiedzający ma zrobić dalej. Zadzwonić, zarezerwować, wysłać zapytanie, kupić. Jedna czytelna akcja na stronę.',
        },
        {
          heading: "Ile kosztuje strona internetowa dla małej firmy w Aberdeenshire?",
          body: "Ceny różnią się dość znacznie w zależności od potrzeb. Oto przybliżony obraz dla firm z Aberdeenshire w 2026.\n\nPodstawowa strona z trzema do pięciu podstronami zaczyna się od około £1 200. To odpowiednie dla jednoosobowej działalności lub małej firmy usługowej, która potrzebuje porządnej obecności online: strona główna, usługi, o nas, kontakt.\n\nStandardowa strona biznesowa z pięcioma do dziesięciu podstronami to zazwyczaj £2 500 do £5 000. Obejmuje indywidualny projekt, konfigurację SEO, optymalizację mobilną, formularze kontaktowe i podstawową analitykę.\n\nE-commerce lub bardziej złożone projekty zaczynają się zazwyczaj od £5 000 i rosną w zależności od zakresu.\n\nUważaj na bardzo tanie oferty. Strona za £300 od platformy szablonowej często kosztuje więcej w postaci utraconych klientów niż oszczędza z góry. Właściwa cena odzwierciedla rzeczywistą złożoność projektu i jest realizowana przez kogoś, kto rozumie Twoje cele, a nie tylko jak strona ma wyglądać.",
        },
        {
          heading: "Na co zwrócić uwagę wybierając web designera w Aberdeenshire",
          body: "Zanim się zobowiążesz, warto sprawdzić kilka rzeczy.\n\nCzy zadają pytania o Twój biznes przed pokazaniem projektów? Dobry designer zaczyna od Twoich celów. Jeśli pierwsze pytanie dotyczy ulubionych kolorów, to niedobry znak.\n\nCo dzieje się z Twoją stroną, jeśli przestaniesz z nimi współpracować? Powinieneś być właścicielem domeny, konta hostingowego i treści. Jeśli cokolwiek z tego jest powiązane z zewnętrzną firmą, jesteś od niej uzależniony bezterminowo.\n\nCzy rozumieją lokalne SEO? Pojawienie się w wynikach wyszukiwania w Aberdeenshire wymaga czegoś więcej niż ładnie wyglądającej strony. Zapytaj konkretnie jak podchodzą do lokalnej widoczności.\n\nPoproś o przykłady stron, które dobrze działają, a nie tylko dobrze wyglądają. Szybkość ładowania, rankingi Google, wskaźniki zapytań. Nie tylko zrzut ekranu strony głównej.",
        },
        {
          heading: "Lokalne SEO: jak być widocznym w wyszukiwaniach w Aberdeenshire",
          body: "Lokalne SEO to po prostu sprawienie, żeby Twoja strona pojawiała się gdy ktoś w pobliżu szuka usługi, którą oferujesz.\n\nJeśli nie masz jeszcze Google Business Profile, zacznij od tego. To bezpłatne i możesz zarejestrować się jako firma obsługująca dany obszar nawet bez publicznego adresu. Bez tego jesteś praktycznie niewidoczny w Google Maps.\n\nJeśli obsługujesz konkretne miejscowości, powiedz to na stronie. Podstrona wspominająca web design w Inverurie lub usługi księgowe w Turriff przyciągnie więcej lokalnych wyszukiwań niż ogólna strona usług.\n\nPilnuj spójności nazwy firmy, adresu i numeru telefonu wszędzie. Strona, Google Business Profile, Yell, Checkatrade. Każda niespójność może po cichu obniżać Twoje lokalne pozycje.\n\nPisanie o lokalnych obszarach też pomaga. Takie artykuły jak ten dają Google więcej sygnałów, żeby połączyć Twoją stronę z wyszukiwaniami z Aberdeenshire.",
        },
        {
          heading: "Praca z Forsa Design",
          body: "Działamy z Banff w Aberdeenshire i realizujemy projekty w całym regionie i dalej.\n\nKażdy projekt zaczyna się od porządnej rozmowy. Pytamy o Twój biznes, Twoich klientów, co chcesz osiągnąć i co aktualnie nie działa. Nie proponujemy rozwiązań zanim nie zrozumiemy problemu.\n\nBez szablonów. Wszystko co budujemy jest zaprojektowane dla konkretnej firmy, z którą pracujemy. Szybkie, czytelne i nastawione na to, żeby zamieniać odwiedzających w zapytania.\n\nJeśli działasz w Aberdeenshire i szukasz nowej strony lub redesignu, napisz na hello@forsadesign.co.uk lub skorzystaj z formularza kontaktowego na tej stronie. Pierwsza rozmowa jest bezpłatna.",
        },
        {
          heading: "Podsumowanie",
          body: "Profesjonalna strona to jedna z bardziej opłacalnych inwestycji, jakie mała firma z Aberdeenshire może teraz poczynić. Nie najdroższa opcja, nie najszybsza. Po prostu właściwa dla tego, gdzie jesteś i dokąd zmierzasz.\n\nJeśli jesteś w Banff, Macduff, Turriff, Huntly, Keith, Inverurie, Ellon, Peterhead, Fraserburgh, Aberdeen lub gdziekolwiek indziej w Aberdeenshire, chętnie porozmawiamy.",
        },
      ],
    },
  },
  {
    slugEn: "website-conversion-what-actually-works",
    slugPl: "konwersja-strony-co-dziala-naprawde",
    dateIso: "2026-07-01",
    readingTimeMin: 6,
    en: {
      title: "What Makes a Website Actually Convert Visitors into Customers",
      excerpt:
        "Most websites look fine but do not convert. The problem is rarely design. It is usually clarity, trust, and friction. Here is what actually works based on real projects.",
      sections: [
        {
          body: "Most sites we audit look fine at a glance. Clean layout, decent typography, decent colours. But the numbers tell a different story: low enquiries, high bounce rates, short sessions. The gap between looking professional and actually turning visitors into customers is bigger than most business owners think.",
        },
        {
          heading: "Clarity beats cleverness every time",
          body: 'A visitor needs to know within three seconds what you do, who you do it for, and what to do next. Not after reading your mission statement. Not after scrolling through a carousel. We see this mistake over and over: vague headlines like "Innovative Solutions for Forward-Thinking Businesses." That means nothing. Compare it to "Web Design for Small Businesses in Aberdeenshire: Fixed Quotes, No Surprises." One is forgettable. The other tells the right person immediately that they are in the right place. Every headline, subheading and button on your site needs to pass this test: would a first-time visitor, scanning, understand what you offer and why it matters to them? If not, rewrite it.',
        },
        {
          heading: "Trust signals are not optional",
          body: 'Before someone emails or calls you, they check you are real. Can you deliver what you promise? Trust is built on specific signals, not general claims. "We are the best" is a claim. A specific line like "47 projects delivered across Aberdeenshire in the past three years" is a signal. Use your own real numbers, never invented ones. Use real client names where you have permission. Show actual results: a concrete figure like "34% fewer no-shows after the new booking system went live" beats any adjective. Put a direct phone number on every page. Show your location. For local businesses, being findable and reachable matters more than looking glossy.',
        },
        {
          heading: "Friction kills conversions silently",
          body: "Every extra click, every unclear label, every form field that feels unnecessary removes a percentage of potential enquiries. The effect is cumulative. Forms that ask for too much information upfront are the first culprit. Name, email, and what they need is enough. You can ask the rest on the call. Navigation with more than six items is another. Too many choices paralyse. Group related pages and make the path to contact obvious. Slow loading speeds cost real visitors, especially on mobile connections in rural areas. Compress images, lazy-load below the fold, and keep the critical path minimal. Hidden pricing is the last one. If your service has a standard range, say so. Vague pricing does not create curiosity. It creates suspicion.",
        },
        {
          heading: "One action per page",
          body: 'Every page needs one clear purpose and one prominent action. Contact pages need to make contacting easy. Service pages need to explain the service and offer a clear next step. Homepages need to orient the visitor and direct them to the right place. Multiple competing calls to action, "Call us", "Download our brochure", "Sign up for the newsletter", "Read our blog", dilute attention and reduce the chance of any one action being taken. Pick the most important action for that page and make it impossible to miss.',
        },
        {
          heading: "Mobile is not a separate version. It is the version.",
          body: "Most web traffic in the UK now comes from mobile. For many local businesses, the figure is higher. Your mobile experience is not a scaled-down desktop site. It is the primary experience for most of your visitors. Tap targets need to be big enough. Text needs to be readable without zooming. Phone numbers need to be tap-to-call. Forms need to work with the native keyboard. If any of these are broken, you are losing enquiries before the visitor even reads your content.",
        },
        {
          heading: "Summary",
          body: "Conversion is not a trick. It is the result of clarity, trust, and removing obstacles. Most improvements come from simplifying what is already there, not adding more. If your website looks good but the enquiries are not coming in, the problem is usually one of these three things. Fix them and the numbers change.",
        },
      ],
    },
    pl: {
      title: "Co Sprawia, że Strona Naprawdę Zamienia Odwiedzających w Klientów",
      excerpt:
        "Większość stron wygląda dobrze, ale nie konwertuje. Problem rzadko leży w designie. To zazwyczaj kwestia jasności, zaufania i tarcia. Oto co działa w praktyce.",
      sections: [
        {
          body: "Większość stron, które audytujemy, wygląda w porządku. Czysty layout, porządna typografia, zgrabne kolory. Ale liczby opowiadają inną historię: mało zapytań, dużo odrzuceń, krótkie wizyty. Luka między wyglądaniem profesjonalnie a rzeczywistym zamienianiem odwiedzających w klientów jest większa niż większość właścicieli firm sądzi.",
        },
        {
          heading: "Jasność bije spryt za każdym razem",
          body: 'Gość musi wiedzieć w ciągu trzech sekund co robisz, dla kogo to robisz i co ma zrobić dalej. Nie po przeczytaniu misji firmy. Nie po przewinięciu karuzeli.\n\nTen błąd widzimy ciągle: niejasne nagłówki typu "Innowacyjne Rozwiązania dla Biznesów Przyszłościowych." To nic nie znaczy. Porównaj to z "Web Design dla Małych Firm w Aberdeenshire: Stałe Wyceny, Żadnych Niespodzianek." Jedno jest niezapamiętywalne. Drugie od razu mówi właściwemu człowiekowi, że trafił we właściwe miejsce.\n\nKażdy nagłówek, podtytuł i przycisk na stronie musi przejść ten test: czy nowy odwiedzający, przeglądający szybko, zrozumie co oferujesz i dlaczego to dla niego ważne? Jeśli nie, przepisz to.',
        },
        {
          heading: "Sygnały zaufania nie są opcjonalne",
          body: 'Zanim ktoś wypełni formularz lub zadzwoni, chce się upewnić że jesteś prawdziwy. Czy dasz radę dostarczyć to, co obiecujesz?\n\nZaufanie budujemy na konkretnych sygnałach, nie ogólnych twierdzeniach. "Jesteśmy najlepsi" to twierdzenie. Konkretne zdanie w stylu "47 projektów zrealizowanych w Aberdeenshire w ciągu ostatnich trzech lat" to sygnał. Podaj swoje prawdziwe liczby, nigdy zmyślone.\n\nUżywaj prawdziwych nazw klientów, gdzie masz zgodę. Pokazuj faktyczne wyniki: konkretna liczba w stylu "34% mniej nieobecności po wdrożeniu nowego systemu rezerwacji" bije na głowę każdy przymiotnik. Daj bezpośredni numer telefonu na każdej stronie, nie formularz kontaktowy ukryty w stopce. Pokaż gdzie jesteś. Dla firm lokalnych bycie widocznym i osiągalnym ma większe znaczenie niż ładny wygląd.',
        },
        {
          heading: "Tarcie cicho zabija konwersję",
          body: "Każdy dodatkowy klik, każda niejasna etykieta, każde pole formularza, które wydaje się zbędne, odbiera procent potencjalnych zapytań. Efekt się nakłada.\n\nPierwszy problem to formularze, które proszą o zbyt wiele informacji od razu. Imię, email i czego potrzebują wystarczy. Resztę możesz zapytać podczas rozmowy.\n\nDrugi to nawigacja z więcej niż sześciu pozycjami. Zbyt wiele wyborów paraliżuje. Grupuj powiązane strony i upewnij się, że ścieżka do kontaktu jest oczywista.\n\nTrzeci to wolna prędkość ładowania. Na mobilnych łączach na terenach wiejskich każda dodatkowa sekunda kosztuje rzeczywistych odwiedzających. Kompresuj obrazy, lazy-loaduj treści poza ekranem i utrzymuj ścieżkę krytyczną na minimum.\n\nCzwarty to ukryte ceny. Jeśli Twoja usługa ma standardowy zakres, powiedz to. Niejasne cenniki nie budzą ciekawości. Budzą podejrzliwość.",
        },
        {
          heading: "Jedna akcja na stronę",
          body: 'Każda strona potrzebuje jednego jasnego celu i jednego widocznego wezwania do działania. Strona kontaktowa ułatwia kontakt. Strona usługowa tłumaczy usługę i oferuje jasny następny krok. Strona główna orientuje odwiedzającego i kieruje go we właściwe miejsce.\n\nWiele konkurujących wezwań do działania, "Zadzwoń do nas", "Pobierz naszą broszurę", "Zapisz się do newslettera", "Przeczytaj nasz blog", rozprasza uwagę i zmniejsza szansę, że którekolwiek zostanie podjęte. Wybierz najważniejszą akcję dla danej strony i spraw, żeby była niemożliwa do przeoczenia.',
        },
        {
          heading: "Mobile to nie osobna wersja. To główna wersja.",
          body: "Większość ruchu w internecie w UK teraz pochodzi z urządzeń mobilnych. Dla wielu firm lokalnych ten odsetek jest jeszcze wyższy. Twoje doświadczenie mobilne to nie zmniejszona wersja desktopowa. To główne doświadczenie dla większości Twoich odwiedzających.\n\nCele dotykowe muszą być wystarczająco duże. Tekst musi być czytelny bez powiększania. Numery telefonów muszą działać jako tap-to-call. Formularze muszą współpracować z natywną klawiaturą. Jeśli którykolwiek z tych elementów jest zepsuty, tracisz zapytania zanim odwiedzający przeczyta Twoją treść.",
        },
        {
          heading: "Podsumowanie",
          body: "Konwersja to nie trik. To efekt jasności, zaufania i usuwania przeszkód. Większość popraw wynika z upraszczania tego, co już jest, a nie dodawania kolejnych elementów.\n\nJeśli Twoja strona wygląda dobrze, ale zapytania nie przychodzą, problem zazwyczaj leży w jednej z tych trzech rzeczy. Napraw je, a liczby się zmienią.",
        },
      ],
    },
  },
  {
    slugEn: "website-maintenance-matters",
    slugPl: "dlaczego-utrzymanie-strony-ma-znaczenie",
    dateIso: "2026-07-10",
    readingTimeMin: 5,
    en: {
      title: "Why Website Maintenance Matters More Than the Build Itself",
      excerpt:
        "A website is not a one-time project. It is a business asset that needs ongoing care. Security, performance, content and search rankings all degrade without regular attention. Here is what maintenance actually involves.",
      sections: [
        {
          body: "Most businesses treat a website like a brochure: design it, print it, done. That mindset worked in 2005. It does not work now. A website is a living system. Software ages, vulnerabilities appear, search algorithms change, and content goes stale. Without regular maintenance, even the best-built site quietly loses value.",
        },
        {
          heading: "1. Security updates are not optional",
          body: "Every website runs on software: the server, the framework and the plug-ins. Developers regularly find security flaws and release patches. If those patches are not applied, your site becomes an easy target. A compromised site does not just affect you. It can be used to send spam, host phishing pages or infect visitors. Google will flag it in search results. Hosting providers may suspend it. The cleanup costs far more than routine maintenance ever would. Maintenance means applying updates promptly, monitoring for unusual activity and keeping backups that actually work.",
        },
        {
          heading: "2. Performance degrades over time",
          body: "A fast site at launch can become slow within a year. New images are uploaded without compression. Third-party scripts accumulate. Analytics tools, chat widgets and social feeds each add requests. The database grows. Caches need refreshing. Google uses speed as a ranking factor. Visitors use speed as a trust signal. A site that loaded in two seconds at launch and now takes six is losing both search visibility and conversions. Regular performance audits catch this before it becomes a problem.",
        },
        {
          heading: "3. Content goes stale quickly",
          body: "Opening hours change. Team members leave. Services are updated. Phone numbers change. If your site still shows last year's pricing or a team photo from two years ago, it quietly tells visitors you are not paying attention. Search engines also prefer fresh content. A blog post from 2022 does not carry the same weight as one from this month. Regular small updates, like a new article, a refreshed service page or updated testimonials, keep the site alive in Google's eyes.",
        },
        {
          heading: "4. Search rankings need defending",
          body: "SEO is not a finish line. Competitors publish new content. Google updates its algorithms. Local business listings need verification. Backlinks decay. A site that ranked well in January can be invisible by October if nothing is done. Maintenance includes checking what still ranks, what has dropped and why. It means updating technical SEO as standards evolve. It means making sure local search signals such as your Google Business Profile, directory listings and local citations stay accurate and consistent.",
        },
        {
          heading: "5. Broken links cost real enquiries",
          body: "A booking link that goes to a 404. An email address that no longer exists. These are invisible problems with visible consequences: lost enquiries, frustrated customers, missed revenue. Regular maintenance means checking links and verifying that every path a visitor might take still works. It takes minutes to check and seconds to fix. The alternative is finding out from an angry customer.",
        },
        {
          heading: "What does good maintenance look like?",
          body: "It does not need to be expensive or complicated. A solid routine covers monthly software updates and security patches, quarterly performance checks and content reviews, and regular backups stored away from the server. Once a year, the SEO deserves a proper audit and a strategy refresh. And anything broken gets fixed straight away, not next month. The key is consistency. Small, regular attention prevents the big problems that cost time, money and reputation.",
        },
        {
          heading: "Summary",
          body: "Building a website is the beginning, not the end. The businesses that get the most value from their sites treat them as ongoing investments. Maintenance is not an extra cost. It is what protects the value of the build in the first place.",
        },
      ],
    },
    pl: {
      title: "Dlaczego Utrzymanie Strony Jest Ważniejsze Niż Samo Zbudowanie",
      excerpt:
        "Strona internetowa to nie projekt jednorazowy. To aktyw biznesowy wymagający stałej opieki. Bezpieczeństwo, wydajność, treść i pozycje w wyszukiwarce wszystko to ulega degradacji bez regularnej uwagi. Oto czego wymaga utrzymanie.",
      sections: [
        {
          body: "Większość firm traktuje stronę jak broszurę: zaprojektować, wydrukować, gotowe. To podejście działało w 2005 roku. Teraz nie działa. Strona to żywy system. Oprogramowanie się starzeje, pojawiają się luki bezpieczeństwa, algorytmy wyszukiwania się zmieniają a treść starzeje się. Bez regularnego utrzymania, nawet najlepiej zbudowana strona cicho traci wartość.",
        },
        {
          heading: "1. Aktualizacje bezpieczeństwa nie są opcjonalne",
          body: "Każda strona działa na oprogramowaniu: serwer, framework, wtyczki, formularze kontaktowe. Deweloperzy regularnie znajdują luki bezpieczeństwa i wydają łatki. Jeśli tych łatek nie zastosujesz, Twoja strona staje się łatwym celem.\n\nSkompromitowana strona nie wpływa tylko na Ciebie. Może być wykorzystana do wysyłania spamu, hostowania stron phishingowych lub infekowania odwiedzających. Google oznaczy ją w wynikach wyszukiwania. Dostawca hostingu może ją zawiesić. Koszt naprawy znacznie przewyższa koszt rutynowego utrzymania.\n\nUtrzymanie oznacza stosowanie aktualizacji na bieżąco, monitorowanie nietypowej aktywności i przechowywanie kopii zapasowych, które faktycznie działają.",
        },
        {
          heading: "2. Wydajność degraduje się z czasem",
          body: "Szybka strona przy starcie może stać się wolna w ciągu roku. Nowe obrazy są uploadowane bez kompresji. Skrypty zewnętrzne się mnożą. Narzędzia analityczne, widgety czatu i feedy społecznościowe dodają kolejne żądania. Baza danych rośnie. Cache wymaga odświeżenia.\n\nGoogle używa szybkości jako czynnika rankingowego. Odwiedzający używają szybkości jako sygnału zaufania. Strona, która ładowała się w dwie sekundy przy starcie a teraz ładuje się w sześć, traci zarówno widoczność w wyszukiwarce jak i konwersje. Regularne audyty wydajności łapią to zanim stanie się problemem.",
        },
        {
          heading: "3. Treść szybko się starzeje",
          body: "Godziny otwarcia się zmieniają. Członkowie zespołu odchodzą. Usługi są aktualizowane. Numery telefonów się zmieniają. Jeśli Twoja strona nadal pokazuje cennik sprzed roku albo zdjęcie zespołu sprzed dwóch lat, cicho mówi odwiedzającym, że nie zwracasz uwagi.\n\nWyszukiwarki też preferują świeżą treść. Artykuł z 2022 roku nie ma takiej wagi jak ten z tego miesiąca. Regularne małe aktualizacje, jak nowy artykuł, odświeżona strona usług czy zaktualizowane referencje, utrzymują stronę żywą w oczach Google.",
        },
        {
          heading: "4. Pozycje wyszukiwania trzeba bronić",
          body: "SEO to nie meta. Konkurencja publikuje nową treść. Google aktualizuje algorytmy. Wizytówki firm lokalnych wymagają weryfikacji. Backlinki wygasają. Strona, która dobrze rankowała w styczniu, może być niewidoczna w październiku, jeśli nic się nie zrobi.\n\nUtrzymanie obejmuje sprawdzanie co nadal rankuje, co spadło i dlaczego. Oznacza aktualizowanie technicznego SEO w miarę ewolucji standardów. Oznacza upewnienie się, że sygnały lokalnego wyszukiwania, takie jak Google Business Profile, wypisy w katalogach i lokalne cytowania, pozostają dokładne i spójne.",
        },
        {
          heading: "5. Zepsute linki i formularze kosztują realne zapytania",
          body: "Formularz kontaktowy, który cicho przestaje działać. Link do rezerwacji prowadzący do 404. Adres email, który już nie istnieje. To niewidoczne problemy z widocznymi konsekwencjami: utracone zapytania, sfrustrowani klienci, stracony przychód.\n\nRegularne utrzymanie oznacza testowanie formularzy, sprawdzanie linków i weryfikowanie, że każda ścieżka, którą może pójść odwiedzający, nadal działa. To zajmuje minuty na sprawdzenie i sekundy na naprawę. Alternatywą jest dowiedzenie się o tym od złego klienta.",
        },
        {
          heading: "Jak wygląda dobre utrzymanie?",
          body: "Nie musi być drogie ani skomplikowane. Solidna rutyna to comiesięczne aktualizacje oprogramowania i łatki bezpieczeństwa, kwartalne sprawdzenie wydajności i przegląd treści oraz regularne kopie zapasowe trzymane poza serwerem. Raz w roku warto zrobić porządny audyt SEO i odświeżyć strategię. A wszystko, co się zepsuje, naprawia się od razu, nie za miesiąc.\n\nKluczem jest konsekwencja. Mała, regularna uwaga zapobiega dużym problemom, które kosztują czas, pieniądze i reputację.",
        },
        {
          heading: "Podsumowanie",
          body: "Zbudowanie strony to początek, nie koniec. Firmy, które czerpią najwięcej wartości ze swoich stron, traktują je jako ciągłe inwestycje. Utrzymanie to nie dodatkowy koszt. To ochrona wartości, którą wniosło zbudowanie strony.",
        },
      ],
    },
  },
  {
    slugEn: "from-template-to-shipyard",
    slugPl: "od-szablonu-do-stoczni",
    dateIso: "2026-08-04",
    readingTimeMin: 5,
    en: {
      title:
        "From template to shipyard. What actually works in web design for the marine industry.",
      excerpt:
        "A marine industry website needs to do more than look polished. It needs to pass procurement checks, work on weak connections and show buyers that your business can deliver.",
      sections: [
        {
          body: "Most sites I audit look fine. Clean layout, decent typography, nice colours. But when I speak to shipyard and offshore business owners, I hear the same thing. The site exists, but it does not attract the right enquiries. It does not pass procurement checks. It does not show what needs to be shown. This is not about pretty design. It is about whether the site convinces the buyer that you can deliver a vessel, platform or component on time and to standard.",
        },
        {
          body: "A shipyard is not an online shop. A client looking for an offshore contractor or hull manufacturer does not browse a catalogue like Amazon. This is B2B (Business to Business) trade. They check whether you have certificates, references and whether your team understands classification rules. Your site needs to answer these questions before anyone even calls you.",
        },
        {
          body: "In previous articles, I wrote about speed and responsiveness. I wrote that every second of loading time costs visitors. In a shipyard, this rule is even more brutal. Your potential client may be sitting in a site office container on the quayside with a connection that barely works. If the site takes five seconds to load, they do not wait. They go to the competition.",
        },
        {
          body: "I also wrote about the difference between a CMS (Content Management System) template and a bespoke site. For a shipyard, this difference is critical. A template does not account for technical documentation, vessel project cards or integration with an ERP (Enterprise Resource Planning) system. A bespoke site can. It can show a project portfolio in a way an engineer understands, not just a designer.",
        },
        {
          body: "In the article about conversion, I wrote about clarity and trust. In the shipyard industry, trust is built differently than in retail. It is not about reviews from portals. It is about whether the site shows real projects, names of responsible people and a direct number to someone who understands technical specifications. Trust is concrete numbers. The tonnage you have built. The year of build. The name of the vessel that underwent refit in your dock.",
        },
        {
          body: "I wrote that SEO (Search Engine Optimisation) is not just the site. In the shipyard industry, keywords are not just web design Aberdeen. It is offshore vessel fabrication Scotland, ship repair Banff, marine engineering procurement UK. Content must answer questions asked by buyers from platforms and design offices, not random internet users.",
        },
        {
          body: "In the last article, I wrote that maintaining a site matters more than building it. For a shipyard, this means references from a project finished two years ago are not enough. The site must live. New projects, new certificates, up-to-date contact details. An old site with outdated information signals that the company may not be active. And in an industry where contracts are worth millions, that signal is fatal.",
        },
        {
          body: "If you run a shipyard or offshore business in Scotland, you do not need a site that looks like it belongs in a creative agency portfolio. You need a site that passes procurement checks, works on a weak connection and shows you understand the industry. Because in this industry, the buyer does not choose the prettiest site. They choose the company they can trust.",
        },
        {
          body: "If you want to talk about a site for your shipyard or offshore business, email hello@forsadesign.co.uk. The first conversation is free.",
        },
      ],
    },
    pl: {
      title:
        "Od szablonu do stoczni. Co naprawdę sprawdza się w web designie dla przemysłu morskiego.",
      excerpt:
        "Strona dla przemysłu morskiego musi robić więcej niż dobrze wyglądać. Powinna przechodzić weryfikację zakupową, działać na słabym łączu i pokazywać kupującym, że firma potrafi dostarczyć projekt.",
      sections: [
        {
          body: "Większość stron które audytuję wygląda w porządku. Czysty layout, porządna typografia, zgrabne kolory. Ale gdy rozmawiam z właścicielami firm stoczniowych i offshore, słyszę to samo. Strona jest, ale nie przyciąga właściwych zapytań. Nie przechodzi weryfikacji zakupowej. Nie pokazuje tego co trzeba.\n\nTo nie jest kwestia ładnego designu. To kwestia tego czy strona przekonuje kupującego że jesteś w stanie dostarczyć statek, platformę lub komponent na czas i zgodnie z normą.",
        },
        {
          body: "Stocznia to nie sklep internetowy. Klient który szuka wykonawcy offshore lub producenta kadłuba nie przegląda katalogu jak Amazon. To jest handel B2B (Business to Business). On sprawdza czy masz certyfikaty, referencje i czy Twój zespół rozumie normy klasyfikacyjne. Twoja strona musi odpowiedzieć na te pytania zanim jeszcze ktoś do Ciebie zadzwoni.",
        },
        {
          body: "W poprzednich artykułach pisałem o szybkości i responsywności. Pisałem że każda sekunda ładowania kosztuje odwiedzających. W stoczni ta zasada jest jeszcze bardziej brutalna. Twój potencjalny klient może siedzieć w kontenerze biurowym na nabrzeżu z połączeniem które ledwo działa. Jeśli strona ładuje się pięć sekund, on nie czeka. Idzie do konkurencji.",
        },
        {
          body: "Pisałem też o różnicy między szablonem CMS (Content Management System) a dedykowaną stroną. Dla stoczni ta różnica jest kluczowa. Szablon nie przewiduje miejsca na dokumentację techniczną, karty projektów statków ani integrację z systemem ERP (Enterprise Resource Planning). Dedykowana strona może. Może pokazać portfolio projektów w sposób który rozumie inżynier, nie tylko grafik.",
        },
        {
          body: "W artykule o konwersji pisałem o jasności i zaufaniu. W branży stoczniowej zaufanie buduje się inaczej niż w sklepie detalicznym. Nie chodzi o opinie z portali. Chodzi o to czy na stronie widać realne projekty, nazwiska osób odpowiedzialnych i bezpośredni numer do osoby która rozumie techniczne specyfikacje. Zaufanie to konkretne liczby. Tonaż który zbudowałeś. Rok budowy. Nazwa statku który przeszedł remont u Ciebie w doku.",
        },
        {
          body: "Pisałem że SEO (Search Engine Optimization) to nie tylko strona. W branży stoczniowej słowa kluczowe to nie tylko web design Aberdeen. To offshore vessel fabrication Scotland, ship repair Banff, marine engineering procurement UK. Treść musi odpowiadać na pytania które zadają kupujący z platform i biur projektowych, nie losowi internauci.",
        },
        {
          body: "W ostatnim artykule pisałem że utrzymanie strony jest ważniejsze niż jej zbudowanie. Dla stoczni oznacza to że referencje z projektu zakończonego dwa lata temu nie wystarczą. Strona musi żyć. Nowe projekty, nowe certyfikaty, aktualne dane kontaktowe. Stara strona z przestarzałymi informacjami sygnalizuje że firma może nie być aktywna. A w branży gdzie kontrakty są warte miliony, taki sygnał jest śmiertelny.",
        },
        {
          body: "Jeśli prowadzisz firmę stoczniową lub offshore w Szkocji, nie potrzebujesz strony która wygląda jak z portfolio agencji kreatywnej. Potrzebujesz strony która przechodzi weryfikację zakupową, działa na słabym łączu i pokazuje że rozumiesz branżę. Bo w tej branży kupujący nie wybiera najładniejszej strony. Wybiera firmę której może zaufać.",
        },
        {
          body: "Jeśli chcesz porozmawiać o stronie dla swojej firmy stoczniowej lub offshore, napisz na hello@forsadesign.co.uk. Pierwsza rozmowa jest bezpłatna.",
        },
      ],
    },
  },
  {
    slugEn: "how-we-improved-performance-polish-version",
    slugPl: "jak-podnieslismy-wydajnosc-polskiej-wersji-strony",
    dateIso: "2026-08-07",
    readingTimeMin: 4,
    en: {
      title:
        "How We Improved the Performance of the Polish Version Without Rebuilding the Entire Application",
      excerpt:
        "The Polish version of Forsa Design was lagging behind the English site in PageSpeed. We matched the performance without rebuilding the application by fixing above-the-fold content and keeping React, prerendered HTML and CDN cache in sync.",
      sections: [
        {
          body: "The goal was straightforward. The English version of forsadesign.co.uk was hitting 95/100 on mobile and 100/100 on desktop. The Polish version was lagging behind. We wanted to level the scores without touching the architecture, bundles, or server.\n\nIt worked. And we did not have to rewrite the application.",
        },
        {
          heading: "Baseline Results",
          body: "The English version had stable PageSpeed Insights scores for some time:\n\n• 95/100 mobile\n• 100/100 desktop\n• remaining categories: 100/100\n\nThe root domain without a language path redirects 301 to /en/, so its score was slightly lower due to the extra hop. The canonical address is /en/.\n\nThe Polish version, despite running on the same application, the same infrastructure, and the same code, was not reaching those numbers.",
        },
        {
          heading: "What We Checked",
          body: "We started with the standard list. Preloads, JavaScript bundling, font loading, the Hero image, lazy loading of sections below the fold, number of scripts and images, server response time, prerendered HTML. We compared the EN and PL versions at every point.\n\nThe result was clear. Both versions loaded the same resources. They used the same preloads, the same main bundle, the same lazy loading mechanism. Server response time was practically identical.\n\nThe problem was not in the architecture of the Polish site. It was not a separate, heavier version.",
        },
        {
          heading: "The Main Difference",
          body: "The Polish version had a significantly longer text in the Hero section. On a phone, this made a difference.\n\nGreater content height above the fold meant more text to render. This affected the conditions for measuring LCP and caused a larger visual difference between the PL and EN first screens. PageSpeed measures what the user sees in the first moments. When the Hero takes up too much space, the metrics react.",
        },
        {
          heading: "The Fix Applied",
          body: "We shortened the Polish Hero text. We kept the same meaning, the same technical and calm style, natural language, and the Forsa Design brand character. We removed verbose fragments, but did not change the appearance of the page, layout, SEO, or remaining content.\n\nThe change touched two places: React translations and the prerendered HTML used by SEO and users without JavaScript. This kept both versions consistent.",
        },
        {
          heading: "Validation",
          body: "After the change, the following passed correctly:\n\n• 12/12 Forsa Design tests\n• full build\n• prerender of all EN and PL routes\n• typecheck\n• lint\n• format check\n• file diff check\n\nThe size of the Polish prerendered HTML decreased by about 350 bytes. While preserving the same set of resources as the English version.",
        },
        {
          heading: "Deployment and Cache",
          body: "The change was committed to the repository, pushed to GitHub, and deployed to Cloudflare Pages. The new version was immediately available at the Pages technical address.\n\nHowever, the custom domain forsadesign.co.uk was still serving the older HTML. The Cloudflare cache runs with a TTL of about two hours. The final step was therefore manual cache clearing for /pl/, /en/, and preferably the root domain HTML as well.",
        },
        {
          heading: "The Key Takeaway",
          body: "Website performance is not only about code size. Equally important are:\n\n• content length above the fold\n• prerendering approach\n• CDN cache\n• redirects\n• correct synchronisation of React and HTML versions for SEO\n\nIn this case, the code was already well optimised. The greatest factors were the length of the Polish Hero and stale Cloudflare cache.\n\nSometimes it is enough to look at what is visible before reaching for another bundler.",
        },
      ],
    },
    pl: {
      title: "Jak podnieśliśmy wydajność polskiej wersji strony bez przebudowy całej aplikacji",
      excerpt:
        "Polska wersja Forsa Design zostawała w tyle za angielską w PageSpeed. Wyrównaliśmy wydajność bez przebudowy aplikacji, skracając treść nad pierwszym ekranem i pilnując spójności React, prerenderowanego HTML oraz cache CDN.",
      sections: [
        {
          body: "Cel był prosty. Wersja angielska forsadesign.co.uk osiągała 95/100 na mobile i 100/100 na desktop. Wersja polska zostawała w tyle. Chcieliśmy wyrównać wyniki bez dotykania architektury, bundli ani serwera.\n\nTo się udało. I wcale nie musieliśmy przepisywać aplikacji.",
        },
        {
          heading: "Wyniki wyjściowe",
          body: "Wersja angielska od dawna miała stabilne wyniki w PageSpeed Insights:\n\n• 95/100 mobile\n• 100/100 desktop\n• pozostałe kategorie: 100/100\n\nGłówna domena bez ścieżki językowej przekierowuje 301 do /en/, więc jej wynik był nieco gorszy z powodu dodatkowego skoku. Kanonicznym adresem jest /en/.\n\nWersja polska, pomimo że działa na tej samej aplikacji, tej samej infrastrukturze i tym samym kodzie, nie osiągała tych liczb.",
        },
        {
          heading: "Co sprawdziliśmy",
          body: "Zaczęliśmy od standardowej listy. Preloady, bundlowanie JavaScriptu, ładowanie fontów, obraz Hero, lazy loading sekcji poniżej pierwszego ekranu, liczba skryptów i obrazów, czas odpowiedzi serwera, prerenderowany HTML. Porównaliśmy wersję EN i PL w każdym z tych punktów.\n\nWynik był jednoznaczny. Obie wersje ładowały te same zasoby. Korzystały z tych samych preloadów, tego samego głównego bundla, tego samego mechanizmu lazy loadingu. Czas odpowiedzi serwera był praktycznie identyczny.\n\nProblem nie leżał więc w architekturze polskiej strony. Nie była ona osobną, cięższą wersją.",
        },
        {
          heading: "Główna różnica",
          body: "Polska wersja miała znacznie dłuższy tekst w sekcji Hero. Na telefonie robiło to różnicę.\n\nWiększa wysokość treści nad pierwszym ekranem oznaczała więcej tekstu do wyrenderowania. To wpływało na warunki pomiaru LCP i powodowało większą różnicę wizualną między pierwszym ekranem PL i EN. PageSpeed mierzy to, co widzi użytkownik w pierwszych chwilach. Gdy Hero zajmuje za dużo przestrzeni, metryki reagują.",
        },
        {
          heading: "Wprowadzona poprawka",
          body: "Skróciliśmy polski tekst Hero. Zachowaliśmy ten sam sens, ten sam techniczny i spokojny styl, naturalny język i charakter marki Forsa Design. Usunęliśmy rozwlekłe fragmenty, ale nie zmienialiśmy wyglądu strony, układu, SEO ani pozostałych treści.\n\nZmiana dotknęła dwóch miejsc: tłumaczeń React oraz prerenderowanego HTML używanego przez SEO i użytkowników bez JavaScriptu. Dzięki temu obie wersje pozostały spójne.",
        },
        {
          heading: "Walidacja",
          body: "Po zmianie przeszły poprawnie:\n\n• 12/12 testów Forsa Design\n• pełny build\n• prerender wszystkich tras EN i PL\n• typecheck\n• lint\n• format check\n• kontrola różnic w plikach\n\nRozmiar polskiego prerenderowanego HTML zmalał o około 350 bajtów. Przy zachowaniu tego samego zestawu zasobów co wersja angielska.",
        },
        {
          heading: "Wdrożenie i cache",
          body: "Zmiana trafiła do repozytorium, na GitHub i została wdrożona na Cloudflare Pages. Nowa wersja była od razu dostępna pod technicznym adresem Pages.\n\nWłasna domena forsadesign.co.uk nadal serwowała jednak starszy HTML. Cache Cloudflare działa z czasem życia około dwóch godzin. Końcowym krokiem było więc ręczne wyczyszczenie cache dla /pl/, /en/ oraz głównego HTML domeny.",
        },
        {
          heading: "Najważniejszy wniosek",
          body: "Wydajność strony to nie tylko rozmiar kodu. Równie ważne są:\n\n• długość treści nad pierwszym ekranem\n• sposób prerenderowania\n• cache CDN\n• przekierowania\n• poprawna synchronizacja wersji React i HTML dla SEO\n\nW tym przypadku kod był już dobrze zoptymalizowany. Największe znaczenie miała długość polskiego Hero oraz stary cache Cloudflare.\n\nCzasami wystarczy spojrzeć na to, co jest widoczne, zanim sięgnie się po kolejny bundler.",
        },
      ],
    },
  },
];
