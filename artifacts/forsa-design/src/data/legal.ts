export type LegalSection = {
  number: string;
  title: string;
  body: string;
  subsections?: { title: string; body: string }[];
};
export const legalUpdated = "2026-11-26";
const termsEN: LegalSection[] = [
  {
    number: "1",
    title: "Introduction",
    body: `These Terms and Conditions apply to the Forsa Design website and to services supplied by Forsa Design. Forsa Design is based in Banff, Scotland. Our main services are industrial digital systems and 3D engineering. We also provide branding and commercial due diligence. These Terms are intended for services supplied to businesses, organisations and individuals acting for purposes relating to their trade, business or profession. If we agree to provide services to a consumer, any statutory consumer rights that cannot legally be excluded or restricted will continue to apply. A quotation, project agreement or other written agreement may contain terms specific to a particular project. If a project-specific agreement conflicts with these general Terms, the project-specific agreement takes precedence for that project.`,
  },
  {
    number: "2",
    title: "Website Use",
    body: `The content of the Forsa Design website is provided for general information about our business and services. We make reasonable efforts to keep website information accurate and current, but project requirements, technical possibilities, third-party services and pricing may change. Information published on the website does not by itself constitute a binding quotation, contractual commitment or guarantee. The binding scope, price, deliverables and other project-specific terms are those stated in an accepted quotation, project agreement or other written agreement.`,
  },
  {
    number: "3",
    title: "Services",
    body: `Industrial digital projects can include websites, technical product catalogues, B2B portals, product selection tools, enquiry, quotation and ordering systems, API integrations and process automation. We agree any ongoing support or further development separately. The exact services and deliverables included in a project are defined in the relevant quotation or project agreement. A feature, integration or service mentioned on the website is not automatically included in a project unless it is included in the agreed scope.`,
  },
  {
    number: "4",
    title: "Quotations and Project Acceptance",
    body: `Each project is assessed and quoted individually. A quotation may specify the project scope, deliverables, estimated timescale, price, payment schedule, client responsibilities, revision allowance, third-party services and support arrangements. Unless the quotation states otherwise, a quotation is valid for 30 days from its date of issue. A project becomes binding when the quotation or project agreement is accepted in the manner stated in that document. Before a contract is formed, we may decline a project enquiry. If the requested scope changes before work begins, we may issue a revised quotation.`,
  },
  {
    number: "5",
    title: "Deposits and Payments",
    body: `The quotation or project agreement sets any deposit, its amount, the payment schedule and the conditions for starting work, including any information or access the client must provide. Remaining payments may be due at agreed milestones, on completion or according to another payment schedule stated in the project documentation. Unless a different payment period is stated on the invoice or agreed in writing, invoices are due within 14 days. The payment page takes the amount of an existing invoice or agreed deposit in pounds sterling and redirects the client to Stripe Checkout. The accepted quotation or project agreement sets the price and scope. The parties may agree another payment method. Third-party payment services operate under their own terms and policies.`,
  },
  {
    number: "6",
    title: "Late Payment",
    body: `If an invoice is not paid when due, we may, where appropriate, suspend work, postpone delivery, withhold unpaid deliverables, revise the project schedule, suspend agreed support, terminate the project in accordance with these Terms and the project agreement, or take reasonable steps to recover the outstanding amount. Any statutory rights relating to late payment of commercial debts remain unaffected.`,
  },
  {
    number: "7",
    title: "Project Timescales",
    body: `Timescales shown before the project has been fully scoped are estimates only. A typical business website may take around nine weeks. Delivery time for catalogues and ordering systems depends on product data, functions and integrations. More complex projects are assessed individually. A completion date is binding only where it has been expressly agreed in writing.`,
  },
  {
    number: "8",
    title: "Client Responsibilities and Delays",
    body: `The client is responsible for providing the information, materials, decisions, approvals and access reasonably required to complete the project. Depending on the project, this may include text and images, branding materials, product information, technical documentation, access credentials, API documentation or credentials, feedback and approvals. Delays in providing required information, content, access, feedback or decisions may affect the project schedule. Changes to the agreed scope may also affect the price and completion date. We are not responsible for delay caused solely by the client's failure to provide required information, materials, access, feedback or approvals on time.`,
  },
  {
    number: "9",
    title: "Client Content and Materials",
    body: `The client is responsible for ensuring that materials supplied for use in a project are accurate and that the client has the necessary rights or permissions to use them. This includes, where applicable, text, photographs, graphics, video, audio, logos, trademarks, product information, technical documents, software, code, databases and other supplied data. The client remains responsible for the factual accuracy and legality of information supplied for publication, including product specifications, prices, regulatory claims, business information and contact details.`,
  },
  {
    number: "10",
    title: "Scope Changes and Additional Work",
    body: `Work outside the agreed project scope is not automatically included in the original project price. If additional work is requested, we will assess its effect on the project and, where appropriate, provide additional pricing or a revised quotation before carrying out that work. A significant change may require a revised quotation, revised timescale, separate project phase or separate agreement. We may decline a requested change where it is not technically feasible or is outside the type of work we provide.`,
  },
  {
    number: "11",
    title: "Revisions",
    body: `The number and scope of revisions included in a project are defined in the quotation or project agreement. A revision within the agreed scope is different from a request for new functionality or a substantial change to the agreed requirements. Work beyond the agreed revision allowance or project scope will be priced separately unless another charging method has already been agreed in writing. There is no automatic fixed hourly charge unless one has been specifically agreed.`,
  },
  {
    number: "12",
    title: "Testing and Technical Standards",
    body: `We review and test the work according to the agreed project scope. Depending on the project, this may include responsive behaviour, mobile usability, accessibility, SSL/TLS configuration, performance, technical SEO, forms, supported browser behaviour, API integrations and security-related configuration. Testing reduces risk but cannot guarantee that a website, system or third-party service will remain completely free from defects, vulnerabilities, outages or future compatibility issues. Performance, security and availability may also depend on hosting providers, browsers, devices, APIs and other third-party infrastructure outside our direct control.`,
  },
  {
    number: "13",
    title: "Third-Party Services",
    body: `A project may rely on third-party services such as hosting, domain registration, payment processing, email delivery, APIs, analytics services, content delivery networks, cloud services, external software or platforms. Third-party services operate under their own terms, pricing, availability and technical limitations. Unless expressly included in the quotation, third-party fees are separate from Forsa Design project fees. We are not responsible for outages, price changes, discontinued services, API changes, security incidents or other failures caused by third-party providers outside our reasonable control. Where ongoing support has been agreed, we may assist with third-party service issues within the agreed support scope.`,
  },
  {
    number: "14",
    title: "API Integrations",
    body: `API integrations are assessed individually. Whether an integration can be implemented depends on factors including availability of the external API, documentation, authentication requirements, permissions and access, technical limitations, usage limits, compatibility, and third-party pricing or service restrictions. We do not guarantee that an integration can be completed where the external provider does not provide sufficient access, documentation or technical capability.`,
  },
  {
    number: "15",
    title: "Hosting",
    body: `Hosting arrangements and responsibilities depend on the individual project and any separate hosting or support agreement. Where hosting is supplied by a third-party provider, its availability, infrastructure and service levels are governed by that provider's terms unless we have expressly agreed otherwise in writing. We cannot guarantee uninterrupted availability of a third-party hosting service.`,
  },
  {
    number: "16",
    title: "Support After Launch",
    body: `Ongoing support is optional and is not automatically included indefinitely after project delivery. Support may include technical maintenance, updates, fixes, monitoring, hosting assistance, agreed changes and further development. The scope and price of support are agreed individually according to the project and the client's requirements. We do not require a client to purchase an ongoing support package unless such an arrangement has been specifically agreed. Support involving third-party services remains subject to the availability and limitations of those providers.`,
  },
  {
    number: "17",
    title: "Intellectual Property",
    body: `The original branding, text, graphics, design content and other original material belonging to the Forsa Design website remain the property of Forsa Design unless otherwise stated. Third-party software, libraries, fonts, images, APIs, platforms and other third-party materials remain subject to their respective licences and ownership rights. Nothing in these Terms transfers ownership of third-party intellectual property.`,
    subsections: [
      {
        title: "Project Deliverables",
        body: `Ownership and usage rights for project deliverables are defined by the quotation or project agreement. Unless otherwise agreed in writing, rights in custom work created specifically for the client transfer after full payment of the relevant project invoices, subject to third-party licences, open-source licences, external platform terms, pre-existing Forsa Design materials, reusable components and tools, and any other rights identified in the project agreement. Unpaid deliverables may be withheld until the relevant amounts have been paid.`,
      },
      {
        title: "Pre-Existing and Reusable Materials",
        body: `Reusable components, libraries, development workflows, patterns, methods and tools created before a project or developed for general reuse do not automatically become the client's exclusive property. We do not deliberately introduce vendor lock-in. However, a project may depend on third-party platforms, services or technologies that have their own technical or contractual limitations.`,
      },
    ],
  },
  {
    number: "18",
    title: "Portfolio and Case Studies",
    body: `We may ask a client for permission to present completed work as part of the Forsa Design portfolio or a case study. Confidential information, testimonials and materials requiring permission will not be treated as available for promotional use merely because the project has been completed. Any specific confidentiality or portfolio arrangements may be agreed in writing.`,
  },
  {
    number: "19",
    title: "Data Protection and Privacy",
    body: `We process personal data in accordance with applicable UK data protection law and the Forsa Design Privacy Policy. The respective data protection roles of Forsa Design, the client and third-party providers depend on the circumstances of the project and the processing involved. Where we process personal data on a client’s instructions as its processor, the contract must include the terms required by Article 28 UK GDPR before processing begins. The client remains responsible for the legal and regulatory obligations applicable to its own business and its use of the delivered website or system. Depending on the project, these may include privacy notices, lawful processing of personal data, cookie consent, marketing communications, customer data, retention requirements and industry-specific obligations. Forsa Design does not provide legal advice.`,
  },
  {
    number: "20",
    title: "Security",
    body: `We take reasonable technical and organisational measures appropriate to the project and agreed scope. No internet-connected website or system can be guaranteed to be completely secure. Security may be affected by third-party providers, hosting infrastructure, client configuration, passwords and credentials, user behaviour, external services and changes made after delivery. Any ongoing security or maintenance responsibilities after launch depend on the agreed support or hosting arrangements.`,
  },
  {
    number: "21",
    title: "Cancellation and Termination",
    body: `Either party may cancel or terminate a project in accordance with the project agreement, these Terms and applicable law. If a business client cancels after work has begun, we may invoice for work completed up to the cancellation date, completed project stages and non-recoverable third-party costs incurred for the project. The treatment of any deposit is governed by the accepted quotation, project agreement and applicable law.`,
    subsections: [
      {
        title: "UK consumer service contracts agreed at a distance",
        body: `Where a statutory cancellation right applies, you normally have 14 days from the day after the contract is made to cancel without giving a reason. You can email hello@forsadesign.co.uk with a clear statement that you wish to cancel. Before you are bound, we must provide the cancellation instructions and model form. Starting work during this period requires your express request. If you then cancel, a proportionate charge for work supplied is payable only where the legal conditions are met. The right ends on full performance only if you requested the early start and acknowledged beforehand that you would lose the right on completion.`,
      },
      {
        title: "Suspension or Termination by Forsa Design",
        body: `We may suspend or terminate work where there is serious or continuing non-payment, a material breach of the project agreement or these Terms, a request to use the project or services unlawfully, or repeated failure to provide information, access or decisions required to continue the work. Where reasonably possible, we will notify the client before suspension or termination.`,
      },
      {
        title: "Effect of Termination",
        body: `Termination does not remove the obligation to pay valid outstanding invoices or amounts due for work already completed. The handling of unfinished work, project files and client materials depends on the project agreement, the work completed and amounts paid.`,
      },
    ],
  },
  {
    number: "22",
    title: "Liability",
    body: `Nothing in these Terms excludes or limits liability where it would be unlawful to do so. We are not responsible for losses caused solely by failures of third-party services or infrastructure outside our reasonable control. We do not guarantee that a website, system or other deliverable will produce a particular level of sales, enquiries, revenue, search engine ranking or commercial performance. Any project-specific limitation of liability may be stated in the relevant project agreement.`,
  },
  {
    number: "23",
    title: "Events Outside Reasonable Control",
    body: `We are not responsible for a delay or failure caused by circumstances outside our reasonable control. This may include failures or interruptions affecting third-party infrastructure or services required for the project. Where such an event materially affects delivery, we will make reasonable efforts to inform the client and continue the project when reasonably possible.`,
  },
  {
    number: "24",
    title: "Governing Law",
    body: `These Terms and any project agreement governed by them are subject to the law of Scotland. Any dispute will be dealt with in accordance with applicable Scottish law and the jurisdiction applicable to the agreement. Where practical, both parties should first attempt to resolve a dispute through direct communication. Nothing in these Terms removes any legal right or remedy that cannot lawfully be excluded.`,
  },
  {
    number: "25",
    title: "Changes to These Terms",
    body: `We may update these Terms to reflect changes to Forsa Design services, business practices or legal requirements. The latest version will be published on the Forsa Design website with its revision date. A later change to these website Terms does not automatically change the agreed scope, price or contractual terms of an existing project unless the parties agree otherwise or applicable law requires it.`,
  },
  {
    number: "26",
    title: "Severability",
    body: `If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions continue to apply to the extent permitted by law.`,
  },
  {
    number: "27",
    title: "Entire Agreement",
    body: `For a particular project, the contractual documents may include the accepted quotation, project agreement, agreed scope, agreed written change requests, invoices, and these Terms and Conditions. Where a specific project agreement expressly differs from these general Terms, the project-specific agreement takes precedence for that project.`,
  },
  {
    number: "28",
    title: "Contact",
    body: `For questions or notices concerning these Terms and Conditions: Forsa Design, Banff, Scotland, United Kingdom. Email: hello@forsadesign.co.uk. Phone: 07770 110735.`,
  },
];

const termsPL: LegalSection[] = [
  {
    number: "1",
    title: "Postanowienia ogólne",
    body: `Niniejszy Regulamin dotyczy strony internetowej Forsa Design oraz usług świadczonych przez Forsa Design. Forsa Design ma siedzibę w Banff w Szkocji. Nasze główne usługi to przemysłowe rozwiązania cyfrowe i inżynieria 3D. Oferujemy również identyfikację wizualną oraz analizę wiarygodności kontrahentów i ryzyka handlowego. Regulamin jest przeznaczony dla usług świadczonych na rzecz firm, organizacji oraz osób działających w związku ze swoją działalnością gospodarczą lub zawodową. Jeżeli zgodzimy się świadczyć usługę konsumentowi, zastosowanie zachowują wszystkie ustawowe prawa konsumenta, których zgodnie z prawem nie można wyłączyć ani ograniczyć. Oferta, umowa projektowa lub inne pisemne uzgodnienie może zawierać warunki dotyczące konkretnego projektu. Jeżeli takie uzgodnienie jest sprzeczne z niniejszym Regulaminem, w odniesieniu do danego projektu pierwszeństwo ma uzgodnienie projektowe.`,
  },
  {
    number: "2",
    title: "Korzystanie ze strony",
    body: `Treści na stronie Forsa Design służą do przekazywania ogólnych informacji o działalności i oferowanych usługach. Dokładamy rozsądnych starań, aby informacje na stronie były aktualne i prawidłowe, jednak wymagania projektowe, możliwości techniczne, usługi zewnętrzne i ceny mogą się zmieniać. Informacje opublikowane na stronie nie stanowią same w sobie wiążącej oferty, zobowiązania umownego ani gwarancji. Wiążący zakres, cena, elementy projektu i pozostałe warunki dotyczące konkretnego projektu wynikają z zaakceptowanej oferty, umowy projektowej lub innego pisemnego uzgodnienia.`,
  },
  {
    number: "3",
    title: "Usługi",
    body: `Projekty cyfrowe dla przemysłu mogą obejmować strony internetowe, katalogi techniczne, portale B2B, narzędzia do doboru produktów, systemy zapytań, wycen i zamówień, integracje API oraz automatyzację procesów. Zakres dalszego rozwoju i wsparcia po wdrożeniu uzgadniamy osobno. Dokładny zakres usług i elementów projektu określa odpowiednia oferta lub umowa projektowa. Funkcja, integracja lub usługa wymieniona na stronie nie jest automatycznie częścią projektu, jeżeli nie została uwzględniona w uzgodnionym zakresie.`,
  },
  {
    number: "4",
    title: "Oferty i przyjęcie projektu",
    body: `Każdy projekt analizujemy i wyceniamy indywidualnie. Oferta może określać zakres projektu, elementy do wykonania, przewidywany czas realizacji, cenę, harmonogram płatności, obowiązki klienta, zakres poprawek, usługi zewnętrzne i zasady wsparcia. Jeżeli oferta nie stanowi inaczej, jest ważna przez 30 dni od daty wystawienia. Projekt staje się wiążący po zaakceptowaniu oferty lub umowy projektowej w sposób określony w danym dokumencie. Przed zawarciem umowy możemy odmówić przyjęcia projektu. Jeżeli zakres projektu zmieni się przed rozpoczęciem prac, możemy przedstawić zmienioną ofertę.`,
  },
  {
    number: "5",
    title: "Zaliczki i płatności",
    body: `Oferta lub umowa projektowa określa, czy wymagana jest zaliczka, jej wysokość, harmonogram płatności oraz warunki rozpoczęcia prac, w tym informacje i dostęp, które klient ma zapewnić. Pozostałe płatności mogą być wymagane na uzgodnionych etapach, po zakończeniu projektu lub zgodnie z innym harmonogramem wskazanym w dokumentacji projektowej. Jeżeli faktura lub pisemne uzgodnienie nie określa innego terminu, faktura jest płatna w ciągu 14 dni. Na stronie płatności klient podaje w funtach szterlingach kwotę z wystawionej faktury lub uzgodnionej zaliczki, po czym przechodzi do Stripe Checkout. Cenę i zakres prac określa zaakceptowana oferta lub umowa projektowa. Strony mogą uzgodnić inną metodę płatności. Zewnętrzni dostawcy usług płatniczych działają na podstawie własnych warunków i polityk.`,
  },
  {
    number: "6",
    title: "Opóźnienia w płatnościach",
    body: `Jeżeli faktura nie zostanie opłacona w terminie, możemy w odpowiednich przypadkach wstrzymać prace, przesunąć termin dostawy, wstrzymać przekazanie nieopłaconych elementów projektu, zmienić harmonogram projektu, wstrzymać uzgodnione wsparcie, zakończyć projekt zgodnie z Regulaminem i umową projektową lub podjąć rozsądne działania w celu odzyskania należności. Powyższe postanowienia nie ograniczają ustawowych praw związanych z opóźnieniami w płatnościach w transakcjach handlowych.`,
  },
  {
    number: "7",
    title: "Terminy realizacji",
    body: `Terminy podawane przed pełnym ustaleniem zakresu projektu są jedynie szacunkowe. Typowa strona firmowa może wymagać około dziewięciu tygodni realizacji. Czas realizacji katalogu lub systemu zamówień B2B zależy od danych produktowych, funkcji i integracji. Bardziej złożone projekty wyceniamy i planujemy indywidualnie. Termin zakończenia jest wiążący tylko wtedy, gdy został wyraźnie uzgodniony na piśmie.`,
  },
  {
    number: "8",
    title: "Obowiązki klienta i opóźnienia",
    body: `Klient odpowiada za dostarczenie informacji, materiałów, decyzji, akceptacji i dostępu, które są w rozsądnym zakresie potrzebne do realizacji projektu. W zależności od projektu mogą to być teksty i zdjęcia, materiały identyfikacji wizualnej, informacje o produktach, dokumentacja techniczna, dane dostępowe, dokumentacja lub dane dostępowe API, uwagi i akceptacje. Opóźnienia w przekazaniu wymaganych informacji, treści, dostępu, uwag lub decyzji mogą wpłynąć na harmonogram projektu. Zmiany uzgodnionego zakresu mogą również wpłynąć na cenę i termin realizacji. Nie odpowiadamy za opóźnienie spowodowane wyłącznie niedostarczeniem przez klienta wymaganych informacji, materiałów, dostępu, uwag lub akceptacji w odpowiednim czasie.`,
  },
  {
    number: "9",
    title: "Treści i materiały klienta",
    body: `Klient odpowiada za prawidłowość materiałów przekazanych do wykorzystania w projekcie oraz za posiadanie praw lub zezwoleń potrzebnych do ich wykorzystania. Dotyczy to w szczególności tekstów, zdjęć, grafik, materiałów wideo i audio, logo, znaków towarowych, informacji o produktach, dokumentacji technicznej, oprogramowania, kodu, baz danych i innych przekazanych danych. Klient pozostaje odpowiedzialny za zgodność z prawem i poprawność informacji przeznaczonych do publikacji, w tym specyfikacji produktów, cen, twierdzeń regulacyjnych, danych firmy i danych kontaktowych.`,
  },
  {
    number: "10",
    title: "Zmiana zakresu i prace dodatkowe",
    body: `Prace wykraczające poza uzgodniony zakres nie są automatycznie objęte pierwotną ceną projektu. Jeżeli klient zleci dodatkowe prace, ocenimy ich wpływ na projekt i, w odpowiednich przypadkach, przedstawimy dodatkową wycenę lub zmienioną ofertę przed rozpoczęciem tych prac. Istotna zmiana może wymagać zmienionej oferty, zmiany harmonogramu, wydzielenia osobnego etapu projektu lub osobnego uzgodnienia. Możemy odmówić wykonania zmiany, jeżeli nie jest technicznie możliwa lub wykracza poza rodzaj świadczonych przez nas usług.`,
  },
  {
    number: "11",
    title: "Poprawki",
    body: `Liczba i zakres poprawek zawartych w projekcie są określone w ofercie lub umowie projektowej. Poprawka mieszcząca się w uzgodnionym zakresie nie jest tym samym co zlecenie nowej funkcjonalności lub istotna zmiana wcześniej uzgodnionych wymagań. Prace wykraczające poza uzgodniony zakres poprawek lub zakres projektu są wyceniane osobno, chyba że wcześniej pisemnie uzgodniono inny sposób rozliczenia. Nie obowiązuje automatyczna stała stawka godzinowa, jeżeli nie została ona wyraźnie uzgodniona.`,
  },
  {
    number: "12",
    title: "Testowanie i standardy techniczne",
    body: `Sprawdzamy i testujemy wykonane prace zgodnie z uzgodnionym zakresem projektu. W zależności od projektu może to obejmować responsywność, obsługę urządzeń mobilnych, dostępność, konfigurację SSL/TLS, wydajność, techniczne SEO, formularze, działanie w obsługiwanych przeglądarkach, integracje API i konfigurację związaną z bezpieczeństwem. Testowanie ogranicza ryzyko, ale nie może zagwarantować, że strona, system lub usługa zewnętrzna pozostaną całkowicie wolne od błędów, podatności, awarii lub problemów z przyszłą kompatybilnością. Na wydajność, bezpieczeństwo i dostępność mogą również wpływać dostawcy hostingu, przeglądarki, urządzenia, API i inna infrastruktura zewnętrzna pozostająca poza naszą bezpośrednią kontrolą.`,
  },
  {
    number: "13",
    title: "Usługi zewnętrzne",
    body: `Projekt może korzystać z usług zewnętrznych, takich jak hosting, rejestracja domen, obsługa płatności, dostarczanie wiadomości e-mail, API, usługi analityczne, sieci dostarczania treści, usługi chmurowe, zewnętrzne oprogramowanie lub platformy. Usługi zewnętrzne działają na podstawie własnych warunków, cenników, dostępności i ograniczeń technicznych. Jeżeli oferta nie stanowi wyraźnie inaczej, koszty usług zewnętrznych nie są częścią wynagrodzenia Forsa Design za projekt. Nie odpowiadamy za awarie, zmiany cen, zakończenie świadczenia usług, zmiany API, incydenty bezpieczeństwa ani inne problemy spowodowane przez zewnętrznych dostawców i pozostające poza naszą rozsądną kontrolą. Jeżeli uzgodniono dalsze wsparcie, możemy pomagać w rozwiązywaniu problemów z usługami zewnętrznymi w ramach uzgodnionego zakresu wsparcia.`,
  },
  {
    number: "14",
    title: "Integracje API",
    body: `Każdą integrację API oceniamy indywidualnie. Możliwość wykonania integracji zależy między innymi od dostępności zewnętrznego API, dokumentacji, sposobu uwierzytelniania, uprawnień i dostępu, ograniczeń technicznych, limitów użycia, kompatybilności oraz cen i ograniczeń zewnętrznego dostawcy. Nie gwarantujemy możliwości wykonania integracji, jeżeli zewnętrzny dostawca nie zapewnia odpowiedniego dostępu, dokumentacji lub możliwości technicznych.`,
  },
  {
    number: "15",
    title: "Hosting",
    body: `Zasady hostingu i podział odpowiedzialności zależą od konkretnego projektu oraz ewentualnej osobnej umowy dotyczącej hostingu lub wsparcia. Jeżeli hosting zapewnia zewnętrzny dostawca, jego dostępność, infrastruktura i poziom usług podlegają warunkom tego dostawcy, chyba że wyraźnie uzgodniłem na piśmie inaczej. Nie możemy zagwarantować nieprzerwanej dostępności zewnętrznej usługi hostingowej.`,
  },
  {
    number: "16",
    title: "Wsparcie po uruchomieniu",
    body: `Dalsze wsparcie jest opcjonalne i nie jest automatycznie świadczone bezterminowo po zakończeniu projektu. Wsparcie może obejmować utrzymanie techniczne, aktualizacje, poprawki, monitoring, pomoc przy hostingu, uzgodnione zmiany i dalszy rozwój. Zakres i cenę wsparcia ustalamy indywidualnie w zależności od projektu i potrzeb klienta. Nie wymagamy od klienta zakupu stałego pakietu wsparcia, chyba że takie rozwiązanie zostało wyraźnie uzgodnione. Wsparcie dotyczące usług zewnętrznych podlega dostępności i ograniczeniom ich dostawców.`,
  },
  {
    number: "17",
    title: "Własność intelektualna",
    body: `Oryginalne elementy marki, teksty, grafiki, treści projektowe i inne oryginalne materiały należące do strony Forsa Design pozostają własnością Forsa Design, chyba że wskazano inaczej. Oprogramowanie, biblioteki, fonty, obrazy, API, platformy i inne materiały podmiotów trzecich podlegają ich własnym licencjom i prawom własności. Niniejszy Regulamin nie przenosi praw własności intelektualnej należących do osób lub podmiotów trzecich.`,
    subsections: [
      {
        title: "Elementy projektu",
        body: `Prawa własności i prawa do korzystania z elementów wykonanych w ramach projektu określa oferta lub umowa projektowa. Jeżeli nie uzgodniono inaczej na piśmie, prawa do dedykowanych prac wykonanych specjalnie dla klienta przechodzą po pełnym opłaceniu odpowiednich faktur za projekt, z uwzględnieniem licencji podmiotów trzecich, licencji open-source, warunków zewnętrznych platform, wcześniej istniejących materiałów Forsa Design, komponentów i narzędzi przeznaczonych do ponownego wykorzystania oraz innych praw wskazanych w umowie projektowej. Nieopłacone elementy projektu mogą zostać wstrzymane do czasu uregulowania odpowiednich należności.`,
      },
      {
        title: "Materiały istniejące wcześniej i wielokrotnego użytku",
        body: `Komponenty, biblioteki, procesy developerskie, wzorce, metody i narzędzia utworzone przed rozpoczęciem projektu lub przeznaczone do ogólnego ponownego wykorzystania nie stają się automatycznie wyłączną własnością klienta. Nie wprowadzamy celowo vendor lock-in. Projekt może jednak zależeć od zewnętrznych platform, usług lub technologii, które mają własne ograniczenia techniczne lub umowne.`,
      },
    ],
  },
  {
    number: "18",
    title: "Portfolio i case studies",
    body: `Możemy poprosić klienta o zgodę na zaprezentowanie ukończonego projektu w portfolio Forsa Design lub jako case study. Informacje poufne, referencje oraz materiały wymagające zgody nie są automatycznie przeznaczone do wykorzystania promocyjnego tylko dlatego, że projekt został ukończony. Szczególne zasady dotyczące poufności lub prezentowania projektu w portfolio mogą zostać uzgodnione na piśmie.`,
  },
  {
    number: "19",
    title: "Ochrona danych i prywatność",
    body: `Przetwarzamy dane osobowe zgodnie z obowiązującymi przepisami Wielkiej Brytanii dotyczącymi ochrony danych oraz Polityką prywatności Forsa Design. Role Forsa Design, klienta i zewnętrznych dostawców w zakresie ochrony danych zależą od okoliczności konkretnego projektu i rodzaju przetwarzania. Gdy przetwarzamy dane osobowe na polecenie klienta jako podmiot przetwarzający, przed rozpoczęciem przetwarzania umowa musi zawierać postanowienia wymagane przez art. 28 UK GDPR. Klient pozostaje odpowiedzialny za obowiązki prawne i regulacyjne dotyczące jego własnej działalności oraz sposobu korzystania z dostarczonej strony lub systemu. W zależności od projektu mogą one obejmować politykę prywatności, zgodne z prawem przetwarzanie danych osobowych, zgodę na pliki cookie, komunikację marketingową, dane klientów, okresy przechowywania danych i wymagania właściwe dla danej branży. Forsa Design nie świadczy usług doradztwa prawnego.`,
  },
  {
    number: "20",
    title: "Bezpieczeństwo",
    body: `Stosujemy rozsądne środki techniczne i organizacyjne odpowiednie do projektu i uzgodnionego zakresu. Żadna strona ani system połączony z internetem nie może mieć zagwarantowanego całkowitego bezpieczeństwa. Na bezpieczeństwo mogą wpływać zewnętrzni dostawcy, infrastruktura hostingowa, konfiguracja klienta, hasła i dane dostępowe, zachowanie użytkowników, usługi zewnętrzne oraz zmiany wprowadzone po przekazaniu projektu. Zakres odpowiedzialności za bezpieczeństwo i utrzymanie po uruchomieniu zależy od uzgodnionych zasad wsparcia lub hostingu.`,
  },
  {
    number: "21",
    title: "Rezygnacja i rozwiązanie umowy",
    body: `Każda ze stron może zrezygnować z projektu lub rozwiązać umowę zgodnie z umową projektową, niniejszym Regulaminem i obowiązującym prawem. Jeżeli klient biznesowy zrezygnuje po rozpoczęciu prac, możemy wystawić fakturę za prace wykonane do dnia rezygnacji, ukończone etapy projektu i bezzwrotne koszty usług zewnętrznych poniesione na potrzeby projektu. Sposób rozliczenia zaliczki wynika z zaakceptowanej oferty, umowy projektowej i obowiązującego prawa.`,
    subsections: [
      {
        title: "Umowy o usługi zawierane na odległość z konsumentami w Wielkiej Brytanii",
        body: `Jeżeli przysługuje Ci ustawowe prawo odstąpienia, zwykle masz 14 dni, licząc od dnia następującego po zawarciu umowy, na odstąpienie bez podania przyczyny. Wystarczy wysłać jednoznaczne oświadczenie na hello@forsadesign.co.uk. Przed zawarciem umowy musimy przekazać instrukcję odstąpienia i wzór formularza. Abyśmy rozpoczęli prace w tym okresie, potrzebne jest Twoje wyraźne żądanie. Jeśli następnie odstąpisz od umowy, proporcjonalna opłata za wykonaną część usługi jest należna wyłącznie po spełnieniu warunków ustawowych. Prawo wygasa po wykonaniu całej usługi tylko wtedy, gdy wyraźnie zażądasz wcześniejszego rozpoczęcia prac i uprzednio przyjmiesz do wiadomości utratę tego prawa po zakończeniu usługi.`,
      },
      {
        title: "Wstrzymanie lub zakończenie prac przez Forsa Design",
        body: `Możemy wstrzymać lub zakończyć prace w przypadku poważnego lub utrzymującego się braku płatności, istotnego naruszenia umowy projektowej lub Regulaminu, żądania wykorzystania projektu lub usług w sposób niezgodny z prawem albo powtarzającego się braku informacji, dostępu lub decyzji niezbędnych do kontynuowania prac. Jeżeli będzie to rozsądnie możliwe, poinformujemy klienta przed wstrzymaniem lub zakończeniem prac.`,
      },
      {
        title: "Skutki rozwiązania umowy",
        body: `Rozwiązanie umowy nie usuwa obowiązku zapłaty prawidłowo wystawionych i wymagalnych faktur ani kwot należnych za już wykonane prace. Sposób postępowania z niedokończonymi pracami, plikami projektowymi i materiałami klienta zależy od umowy projektowej, zakresu wykonanych prac i dokonanych płatności.`,
      },
    ],
  },
  {
    number: "22",
    title: "Odpowiedzialność",
    body: `Żadne postanowienie Regulaminu nie wyłącza ani nie ogranicza odpowiedzialności w zakresie, w którym byłoby to niezgodne z prawem. Nie odpowiadamy za straty spowodowane wyłącznie awarią usług lub infrastruktury podmiotów trzecich pozostającą poza naszą rozsądną kontrolą. Nie gwarantujemy, że strona, system lub inny wykonany element zapewni określony poziom sprzedaży, liczby zapytań, przychodów, pozycji w wynikach wyszukiwania lub wyników biznesowych. Ewentualne ograniczenie odpowiedzialności dotyczące konkretnego projektu może zostać określone w odpowiedniej umowie projektowej.`,
  },
  {
    number: "23",
    title: "Zdarzenia pozostające poza rozsądną kontrolą",
    body: `Nie odpowiadamy za opóźnienie lub niewykonanie zobowiązania spowodowane okolicznościami pozostającymi poza naszą rozsądną kontrolą. Może to obejmować awarie lub przerwy w działaniu zewnętrznej infrastruktury albo usług potrzebnych do realizacji projektu. Jeżeli takie zdarzenie istotnie wpłynie na realizację, podejmiemy rozsądne działania, aby poinformować klienta i kontynuować projekt, gdy będzie to możliwe.`,
  },
  {
    number: "24",
    title: "Prawo właściwe",
    body: `Do niniejszego Regulaminu oraz objętych nim umów projektowych stosuje się prawo Szkocji. Spory będą rozstrzygane zgodnie z obowiązującym prawem szkockim i zasadami jurysdykcji mającymi zastosowanie do danej umowy. Jeżeli jest to praktycznie możliwe, strony powinny najpierw podjąć próbę rozwiązania sporu w drodze bezpośredniego porozumienia. Żadne postanowienie Regulaminu nie pozbawia strony prawa ani środka ochrony prawnej, którego zgodnie z prawem nie można wyłączyć.`,
  },
  {
    number: "25",
    title: "Zmiany Regulaminu",
    body: `Możemy aktualizować Regulamin w związku ze zmianami usług Forsa Design, sposobu prowadzenia działalności lub wymagań prawnych. Aktualna wersja będzie publikowana na stronie Forsa Design wraz z datą ostatniej aktualizacji. Późniejsza zmiana Regulaminu na stronie nie zmienia automatycznie uzgodnionego zakresu, ceny ani warunków istniejącego projektu, chyba że strony uzgodnią inaczej lub wymaga tego prawo.`,
  },
  {
    number: "26",
    title: "Rozdzielność postanowień",
    body: `Jeżeli którekolwiek postanowienie Regulaminu zostanie uznane za nieważne lub niewykonalne, pozostałe postanowienia zachowują moc w zakresie dozwolonym przez prawo.`,
  },
  {
    number: "27",
    title: "Całość uzgodnień",
    body: `W przypadku konkretnego projektu dokumenty umowne mogą obejmować zaakceptowaną ofertę, umowę projektową, uzgodniony zakres, uzgodnione na piśmie zmiany zakresu, faktury oraz niniejszy Regulamin. Jeżeli szczegółowa umowa dotycząca projektu wyraźnie różni się od niniejszego Regulaminu, w odniesieniu do tego projektu pierwszeństwo ma umowa projektowa.`,
  },
  {
    number: "28",
    title: "Kontakt",
    body: `W sprawach dotyczących niniejszego Regulaminu: Forsa Design, Banff, Szkocja, Wielka Brytania. E-mail: hello@forsadesign.co.uk. Telefon: 07770 110735.`,
  },
];

export const termsSections = { en: termsEN, pl: termsPL };
const serviceDetails = {
  pl: [
    {
      title: "Identyfikacja wizualna",
      body: "Przedmiotem usługi są elementy identyfikacji wizualnej, takie jak logo, paleta barw, typografia i zasady stosowania. Dokumentacja projektu określa formaty plików, zakres opracowania i prawa do ich wykorzystania. Materiały zewnętrzne pozostają objęte własnymi licencjami.",
    },
    {
      title: "Inżynieria 3D i wizualizacja CAD",
      body: "Zakres prac może obejmować wizualizacje na podstawie CAD, interaktywne modele komponentów lub konfiguratory parametryczne. Oferta określa wymagane od klienta rysunki źródłowe, formaty modeli, parametry i reguły doboru produktu. Demonstracje w portfolio pokazują dostępne funkcje. Model nie zastępuje obliczeń konstrukcyjnych, dokumentacji wykonawczej ani akceptacji producenta. Sposób obliczania cen, zapisu konfiguracji i przekazywania zapytań wynika z funkcji wskazanych w projekcie.",
    },
    {
      title: "Analiza kontrahentów",
      body: "Raport opiera się na informacjach dostępnych na dzień analizy. Rozróżnia potwierdzone fakty, deklaracje i wnioski. Nie gwarantuje przyszłej wypłacalności ani zachowania kontrahenta i nie zastępuje audytu finansowego lub opinii prawnej. Zlecenie określa badany podmiot, cel, odbiorców raportu i wymagania poufności.",
    },
  ],
  en: [
    {
      title: "Visual identity",
      body: "The service concerns visual assets such as logos, colour palettes, typography and usage guidelines. Project documentation specifies deliverables, file formats and usage rights. Third-party materials remain subject to their own licences.",
    },
    {
      title: "3D engineering and CAD visualisation",
      body: "The agreed deliverables may include CAD-based visualisations, interactive component models or parametric configurators. The quotation identifies the source drawings, model formats, parameters and product rules required from the client. Portfolio demonstrations illustrate the available functions. The model does not replace structural calculations, manufacturing documentation or manufacturer approval. Pricing, configuration storage and enquiry handling depend on the functions included in the project.",
    },
    {
      title: "Counterparty assessment",
      body: "Reports use information available at the time of analysis and distinguish verified facts, claims and analytical conclusions. They do not guarantee future solvency or conduct and do not replace a financial audit or legal opinion. The engagement identifies the subject, purpose, report recipients and confidentiality requirements.",
    },
  ],
};
for (const lang of ["pl", "en"] as const) {
  const section = termsSections[lang].find((s) => s.number === "3");
  if (section) section.subsections = serviceDetails[lang];
}
export const privacySections: Record<"pl" | "en", LegalSection[]> = {
  pl: [
    {
      number: "1",
      title: "Administrator i kontakt",
      body: "Forsa Design prowadzi tę witrynę i odpowiada za przetwarzanie danych w związku z własnymi zapytaniami, usługami i subskrypcjami. Kontakt w sprawach ochrony danych: hello@forsadesign.co.uk; telefon +44 7770 110735; Banff, Szkocja, Wielka Brytania. Niniejszy dokument informuje o przetwarzaniu danych. Samo wejście na stronę nie oznacza zgody na marketing ani opcjonalną analitykę.",
    },
    {
      number: "2",
      title: "Zapytania i realizacja usług",
      body: "W formularzach kontaktu i wyceny prosimy o imię i adres e-mail, aby móc odpowiedzieć. Formularz kontaktowy wymaga również treści wiadomości. W formularzu wyceny nazwa firmy i opis projektu są dobrowolne. Zapisujemy język, czas zgłoszenia i przekazane informacje. Korzystamy z nich, aby odpowiedzieć, ocenić wymagania i przygotować ofertę. Jeżeli to Ty masz być stroną umowy, podstawą są działania podejmowane na Twoje żądanie przed jej zawarciem lub wykonanie umowy. W przypadku przedstawiciela firmy naszym uzasadnionym interesem jest obsługa zapytania i realizacja uzgodnionych prac. Dokumentację księgową i podatkową przechowujemy w zakresie wymaganym prawem.",
    },
    {
      number: "3",
      title: "Checklista, informacje o edytorze i newsletter",
      body: "Gdy zamawiasz checklistę, wysyłamy ją na podany adres. Forsa Design otrzymuje powiadomienie z adresem e-mail, podaną dobrowolnie nazwą firmy, językiem i czasem zgłoszenia. Naszym uzasadnionym interesem jest dostarczenie i obsługa zamówionego materiału. Zapis na listę zainteresowanych edytorem oznacza zgodę na wiadomości o jego wersji demonstracyjnej. Newsletter bloga wymaga osobnej zgody i potwierdzenia adresu e-mail. Zapisujemy adres, język, źródło zapisu, wersję zgody, daty i status subskrypcji. Zgodę można wycofać przez link rezygnacji z newslettera lub e-mail na hello@forsadesign.co.uk. Pobranie checklisty nie zapisuje na żadną z tych list.",
    },
    {
      number: "4",
      title: "Analiza kontrahentów",
      body: "Raport może zawierać dane przedsiębiorców, członków zarządu, beneficjentów rzeczywistych i przedstawicieli firm. Źródłami mogą być zleceniodawca, rejestry przedsiębiorstw, opublikowane sprawozdania finansowe, urzędowe listy sankcyjne i publikacje branżowe. Uzgodniony raport otrzymuje zleceniodawca. Gdy sami określamy sposób wykorzystania danych jako administrator, oceniamy, czy uzasadniony interes nasz lub klienta w sprawdzeniu partnera handlowego uzasadnia ich użycie, z uwzględnieniem praw danej osoby. Gdy działamy jako podmiot przetwarzający na polecenie klienta, podstawę prawną określa klient. Jeśli jako administrator pozyskamy dane z innego źródła niż bezpośrednio od Ciebie, przekazujemy informacje wymagane przez UK GDPR, chyba że zastosowanie ma ustawowy wyjątek.",
    },
    {
      number: "5",
      title: "Dostawcy i odbiorcy danych",
      body: "Cloudflare zapewnia hosting strony i API, zabezpiecza ruch oraz przechowuje dane zgłoszeń i płatności. Resend dostarcza wiadomości dotyczące zapytań, potwierdzenia i zamówione materiały. Przy płatności za fakturę lub zaliczkę przekazujemy do Stripe kwotę, adres e-mail i podany opis płatności. Dane karty podajesz bezpośrednio w Stripe. Do rozliczenia zapisujemy identyfikator transakcji, kwotę, opis, e-mail, język, czas i status płatności. Google otrzymuje dane analityczne po wyrażeniu zgody. Uprawnione organy i doradcy mogą otrzymać odpowiednie dane, gdy wymaga tego prawo lub obsługa danej sprawy.",
    },
    {
      number: "6",
      title: "Okresy przechowywania",
      body: "Wpisy z formularzy kontaktu i wyceny wygasają w bazie zgłoszeń po 730 dniach, a wpisy na listę zainteresowanych edytorem po 365 dniach. Niepotwierdzony zapis na newsletter i link potwierdzający wygasają po 24 godzinach. Potwierdzona subskrypcja trwa do rezygnacji. System zachowuje następnie wpis ze statusem rezygnacji, aby uwzględnić sprzeciw i udokumentować historię zgody. Kopie wiadomości i dane o płatnościach mają odrębne okresy przechowywania, zależne od obsługi zapytania, realizacji projektu, obowiązków księgowych i ewentualnych roszczeń. Aplikacja nie usuwa automatycznie wpisów o płatnościach ani wypisanych subskrypcjach. Okres przechowywania zdarzeń w Google Analytics określa ustawienie usługi, niezależne od czasu życia cookies w przeglądarce.",
    },
    {
      number: "7",
      title: "Cookies i pamięć urządzenia",
      body: "Twój wybór dotyczący cookies jest ważny w tej przeglądarce przez 365 dni. Język, wybór zatrzymania animacji i zamknięcie banera produktu służą zapamiętaniu wyborów użytkownika. Opcjonalna analityka Google Analytics jest uruchamiana po jej zaakceptowaniu. Wybór można zmienić w ustawieniach cookies dostępnych w stopce lub poniżej. Brak zgody nie uniemożliwia kontaktu ani przeglądania oferty.",
      subsections: [
        {
          title: "Ustawienia zgód",
          body: "Wpis forsa-cookie-consent w pamięci localStorage zawiera Twój wybór i jego datę. Po 365 dniach lub po zmianie wersji mechanizmu strona pomija poprzednią decyzję i pyta ponownie. Wpis pozostaje w przeglądarce do zastąpienia lub usunięcia.",
        },
        {
          title: "Preferencje interfejsu",
          body: "Forsa Design korzysta z pamięci localStorage w przeglądarce. Wpis forsa-lang zapisuje język strony, forsa-blueprint-paused ustawienie animacji tła, a forsa-announcement-dismissed-v1 zamknięcie zapowiedzi edytora. Te wpisy nie mają automatycznego terminu wygaśnięcia. Możesz je usunąć, czyszcząc dane witryny w przeglądarce. Ustawienie Google Analytics dotyczy wyłącznie analityki.",
        },
        {
          title: "Google Analytics",
          body: "Po wyrażeniu zgody Google Analytics 4 mierzy odsłony i działania, takie jak przesłanie formularza lub rozpoczęcie płatności wraz z jej kwotą. W tagu wyłączono Google Signals i personalizację reklam. Google może używać cookies _ga i _ga_* do rozróżniania wizyt i obsługi pomiaru. Ich czas zależy od konfiguracji tagu i przeglądarki; domyślnie może wynosić do dwóch lat i być odnawiany. Nie należy utożsamiać tego z okresem przechowywania zdarzeń na koncie usługi. Po wycofaniu zgody blokujemy dalsze zdarzenia aplikacji i usuwamy dostępne dla witryny cookies tej kategorii.",
        },
        {
          title: "Usługi bezpieczeństwa",
          body: "Cloudflare i nasze API wykorzystują adres IP i dane techniczne żądania do dostarczenia strony, ograniczania liczby powtarzanych żądań oraz sprawdzania podejrzeń spamu. Naszym uzasadnionym interesem jest zapewnienie dostępności witryny i ochrona formularzy przed nadużyciami. Po przejściu do Stripe Checkout informacje o zapisie na urządzeniu i zapobieganiu oszustwom podaje Stripe.",
        },
      ],
    },
    {
      number: "8",
      title: "Bezpieczeństwo i transfery",
      body: "Korzystamy z HTTPS i ograniczamy dostęp do dokumentacji projektowej oraz danych usługowych. Nasi dostawcy działają w różnych krajach. W szczególności Resend przetwarza pocztę w Stanach Zjednoczonych. Zależnie od odbiorcy i kraju zabezpieczenia transferu z Wielkiej Brytanii obejmują brytyjskie przepisy stwierdzające odpowiedni stopień ochrony, w tym brytyjskie rozszerzenie EU–US Data Privacy Framework w odniesieniu do objętych nim odbiorców w USA, lub standardowe klauzule umowne z brytyjskim aneksem. O szczegóły lub kopię zabezpieczeń dotyczących Twoich danych możesz poprosić pod adresem hello@forsadesign.co.uk.",
    },
    {
      number: "9",
      title: "Prawa osób",
      body: "W zależności od podstawy i okoliczności przetwarzania przysługuje prawo dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia danych, sprzeciwu oraz wycofania zgody. Wycofanie nie wpływa na zgodność wcześniejszego przetwarzania. Sprzeciw wobec marketingu bezpośredniego jest respektowany. Wnioski obsługujemy bez zbędnej zwłoki, co do zasady w ciągu miesiąca kalendarzowego, z uwzględnieniem ustawowych zasad potwierdzenia tożsamości i przedłużenia terminu.",
      subsections: [
        {
          title: "Prawo do sprzeciwu",
          body: "Możesz sprzeciwić się przetwarzaniu opartemu na uzasadnionym interesie z przyczyn związanych z Twoją sytuacją. Wobec marketingu bezpośredniego możesz wnieść sprzeciw w dowolnym momencie. W obu sprawach możesz napisać na hello@forsadesign.co.uk.",
        },
        {
          title: "Skargi dotyczące danych osobowych",
          body: "Skargę na sposób wykorzystania danych możesz zgłosić e-mailem na hello@forsadesign.co.uk lub telefonicznie pod numerem +44 7770 110735. Musimy potwierdzić jej otrzymanie w ciągu 30 dni, zbadać sprawę i bez zbędnej zwłoki przekazać wynik. Możesz również złożyć skargę do brytyjskiego Information Commissioner’s Office.",
        },
      ],
    },
    {
      number: "10",
      title: "Dane przetwarzane dla klientów",
      body: "Przy utrzymaniu systemu klienta role stron zależą od tego, kto określa cele i środki przetwarzania. Gdy działamy jako procesor, przetwarzanie wymaga odpowiednich postanowień zgodnych z art. 28 UK GDPR, również przy niewielkiej ilości danych. Mogą one stanowić część umowy projektowej. Klient odpowiada za własne cele i informacje przekazywane użytkownikom swojego systemu.",
    },
    {
      number: "11",
      title: "Zakres witryny i zmiany",
      body: "Witryna jest skierowana do odbiorców usług biznesowych. Nie prowadzi panelu kont klientów ani usługi nagrywania rozmów. Jeżeli sposób obsługi usługi wymaga nowych kategorii danych lub narzędzi, należy przekazać informacje właściwe dla tego procesu. Aktualizacje dokumentu są oznaczane datą i nie zastępują zgody wymaganej dla nowego celu.",
    },
  ],
  en: [
    {
      number: "1",
      title: "Controller and contact",
      body: "Forsa Design operates this website and is responsible for processing connected with its own enquiries, services and subscriptions. Data protection contact: hello@forsadesign.co.uk; telephone +44 7770 110735; Banff, Scotland, United Kingdom. This document explains processing. Visiting the website does not constitute consent to marketing or optional analytics.",
    },
    {
      number: "2",
      title: "Enquiries and service delivery",
      body: "The contact and quote forms ask for your name and email address so we can reply. The contact form also requires a message. On the quote form, the company and project description are optional. We keep the language, submission time and details you send. We use them to respond, assess the project and prepare a quotation. If you would be the contracting party, the basis is taking steps at your request before a contract or performing that contract. For contacts acting for a business, our legitimate interest is handling its enquiry and delivering the agreed work. We retain the records required to meet our accounting and tax obligations.",
    },
    {
      number: "3",
      title: "Checklist, editor updates and newsletter",
      body: "When you request the checklist, we email it to you and notify Forsa Design of the request, including your email, any company name you enter, language and time. Our legitimate interest is delivering and administering the material you requested. Joining the editor waiting list gives us permission to email you about that demo. The blog newsletter has its own consent checkbox and email confirmation step. We record the address, language, signup source, consent version, dates and subscription status. To withdraw, use the newsletter unsubscribe link or email hello@forsadesign.co.uk. A checklist request does not subscribe you to either list.",
    },
    {
      number: "4",
      title: "Counterparty assessments",
      body: "A report may identify sole traders, directors, beneficial owners or business representatives. Sources can include the commissioning client, company registers, published accounts, official sanctions lists and business publications. The client commissioning the assessment receives the agreed report. Where we determine how personal data is used, we assess whether our or our client’s legitimate interest in checking a trading partner justifies using the information, taking account of the individual’s rights. Where we act on a client’s instructions as its processor, the client determines the lawful basis. If we obtain your details indirectly as controller, we provide the information required by UK GDPR unless a statutory exception applies.",
    },
    {
      number: "5",
      title: "Providers and recipients",
      body: "Cloudflare hosts the site and API, protects traffic and stores form and payment records. Resend delivers enquiry messages, confirmations and requested materials. For an invoice or deposit payment we send Stripe the amount, your email and any payment reference you enter. Card details go directly to Stripe. We record the checkout reference, amount, description, email, language, time and payment status to reconcile payments. Google receives analytics data when you opt in. Advisers or public authorities may receive relevant records where necessary to handle a matter or meet a legal obligation.",
    },
    {
      number: "6",
      title: "Retention",
      body: "Contact and quote form records in the form database expire after 730 days. Editor waiting-list records expire after 365 days. A pending newsletter signup and its confirmation link expire after 24 hours. Confirmed subscriptions continue until withdrawal. The system then keeps the subscription record with its unsubscribe status to honour the request and document the consent history. Email copies and payment records are separate from the form database expiry. Their retention depends on the enquiry, project, accounting obligations and any outstanding claims. Payment and unsubscribed newsletter records have no automatic expiry in the application. Google Analytics event retention is a separate property setting from the lifetime of its browser cookies.",
    },
    {
      number: "7",
      title: "Cookies and device storage",
      body: "Your consent choice is valid for 365 days in this browser. Language, motion and announcement-dismissal preferences remember user choices. Optional Google Analytics starts after analytics is accepted. Preferences can be changed through the footer or the control below. Refusing optional analytics does not prevent browsing services or contacting us.",
      subsections: [
        {
          title: "Consent preferences",
          body: "The forsa-cookie-consent entry in localStorage records your choice and its date. After 365 days, or when its version changes, the site disregards the old choice and asks again. The entry remains in the browser until replaced or cleared.",
        },
        {
          title: "Interface preferences",
          body: "Forsa Design uses localStorage on this browser. The forsa-lang entry stores the language of the page, forsa-blueprint-paused stores the background animation choice and forsa-announcement-dismissed-v1 remembers closing the editor announcement. These entries have no automatic expiry. You can remove them by clearing site data in your browser. The Google Analytics setting controls analytics only.",
        },
        {
          title: "Google Analytics",
          body: "If you consent, Google Analytics 4 measures page views and interactions such as form submissions and the start of checkout, including the payment amount. The site disables Google Signals and advertising personalisation in its tag. Google may use _ga and _ga_* cookies to distinguish visits and support measurement. Duration depends on tag and browser settings; the default may be up to two years and can be renewed. This differs from event retention in the service account. On withdrawal we block further application analytics events and remove analytics cookies accessible to the website.",
        },
        {
          title: "Security services",
          body: "Cloudflare and our API use IP addresses and technical request information to deliver the site, limit repeated requests and investigate suspected spam. Our legitimate interest is keeping the site available and protecting its forms from abuse. If you proceed to Stripe Checkout, Stripe provides its own information about storage and fraud prevention on the payment page.",
        },
      ],
    },
    {
      number: "8",
      title: "Security and international transfers",
      body: "We use HTTPS and restrict access to project and service records. Our providers operate internationally. In particular, Resend processes email in the United States. Depending on the provider and destination, protections for restricted UK transfers include UK adequacy regulations, including the UK Extension to the EU–US Data Privacy Framework for covered US recipients, or standard contractual clauses with the UK Addendum. Email hello@forsadesign.co.uk for details or a copy of the safeguards relevant to your information.",
    },
    {
      number: "9",
      title: "Individual rights",
      body: "Depending on the basis and circumstances, rights include access, correction, erasure, restriction, portability, objection and consent withdrawal. Withdrawal does not affect earlier lawful processing. Objections to direct marketing are honoured. Requests are handled without undue delay, normally within one calendar month, subject to statutory identity-verification and extension rules.",
      subsections: [
        {
          title: "Your right to object",
          body: "You can object to processing based on legitimate interests on grounds relating to your situation. You can object to direct marketing at any time. Email hello@forsadesign.co.uk to exercise either right.",
        },
        {
          title: "Data protection complaints",
          body: "Email hello@forsadesign.co.uk or call +44 7770 110735 to complain about how we use your information. We must acknowledge receipt within 30 days, investigate and tell you the outcome without undue delay. You may also complain to the UK Information Commissioner’s Office.",
        },
      ],
    },
    {
      number: "10",
      title: "Processing for clients",
      body: "Roles in client systems depend on who determines processing purposes and means. Where we act as a processor, appropriate UK GDPR Article 28 terms are required even for small amounts of personal information. These can form part of a project agreement. Clients remain responsible for their own purposes and notices to their system’s users.",
    },
    {
      number: "11",
      title: "Website scope and changes",
      body: "This website serves a business audience. It does not operate client accounts or call-recording services. New categories of data or tools require information appropriate to that process. Changes to this notice are dated and do not replace any consent needed for a new purpose.",
    },
  ],
};
