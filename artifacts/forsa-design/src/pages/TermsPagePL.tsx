import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { ArrowLeft } from "lucide-react";

export default function TermsPagePL() {
  const { t } = useLanguage();

  useSeoMeta({
    title: "Regulamin | Forsa Design",
    description:
      "Zapoznaj się z regulaminem Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    ogTitle: "Regulamin | Forsa Design",
    ogDescription:
      "Zapoznaj się z regulaminem Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    twitterTitle: "Regulamin | Forsa Design",
    twitterDescription:
      "Zapoznaj się z regulaminem Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    ogLocale: "pl_PL",
    canonical: buildHref("/pl/terms"),
    alternates: [
      { lang: "en", href: buildHref("/en/terms") },
      { lang: "pl", href: buildHref("/pl/terms") },
    ],
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="border-b border-border/10 py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/pl/"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            {t("nav.home")}
          </a>
          <span className="text-sm font-medium text-primary">Forsa Design</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Regulamin</h1>
          <p className="text-foreground/60 font-light">
            Forsa Design, Banff, Szkocja, Wielka Brytania
          </p>
          <p className="text-foreground/50 font-light text-sm mt-2">
            Ostatnia aktualizacja: Wrzesień 2026
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 font-light leading-relaxed">
          {sections.map((section) => (
            <Section key={section.number} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface SectionData {
  number: string;
  title: string;
  body: string;
  subsections?: Array<{ title: string; body: string }>;
}

function Section({ section }: { section: SectionData }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-white mb-4">
        {section.number}. {section.title}
      </h2>
      <p className="mb-4">{section.body}</p>
      {section.subsections &&
        section.subsections.map((sub, i) => (
          <div key={i} className="ml-4 mb-4">
            <h3 className="font-semibold text-white mb-2">
              {section.number}.{i + 1} {sub.title}
            </h3>
            <p>{sub.body}</p>
          </div>
        ))}
    </div>
  );
}

const sections: SectionData[] = [
  {
    number: "1",
    title: "Postanowienia ogólne",
    body: `Niniejszy Regulamin dotyczy strony internetowej Forsa Design oraz usług świadczonych przez Forsa Design. Forsa Design jest jednoosobową działalnością z siedzibą w Banff w Szkocji. Świadczę usługi obejmujące tworzenie dedykowanych stron internetowych, katalogów i systemów zamówień B2B, dedykowanych narzędzi webowych, integracji API oraz opcjonalnego wsparcia po wdrożeniu. Regulamin jest przeznaczony dla usług świadczonych na rzecz firm, organizacji oraz osób działających w związku ze swoją działalnością gospodarczą lub zawodową. Jeżeli zgodzę się świadczyć usługę konsumentowi, zastosowanie zachowują wszystkie ustawowe prawa konsumenta, których zgodnie z prawem nie można wyłączyć ani ograniczyć. Oferta, umowa projektowa lub inne pisemne uzgodnienie może zawierać warunki dotyczące konkretnego projektu. Jeżeli takie uzgodnienie jest sprzeczne z niniejszym Regulaminem, w odniesieniu do danego projektu pierwszeństwo ma uzgodnienie projektowe.`,
  },
  {
    number: "2",
    title: "Korzystanie ze strony",
    body: `Treści na stronie Forsa Design służą do przekazywania ogólnych informacji o działalności i oferowanych usługach. Dokładam rozsądnych starań, aby informacje na stronie były aktualne i prawidłowe, jednak wymagania projektowe, możliwości techniczne, usługi zewnętrzne i ceny mogą się zmieniać. Informacje opublikowane na stronie nie stanowią same w sobie wiążącej oferty, zobowiązania umownego ani gwarancji. Wiążący zakres, cena, elementy projektu i pozostałe warunki dotyczące konkretnego projektu wynikają z zaakceptowanej oferty, umowy projektowej lub innego pisemnego uzgodnienia.`,
  },
  {
    number: "3",
    title: "Usługi",
    body: `Usługi mogą obejmować dedykowane strony internetowe, katalogi i systemy zamówień B2B, dedykowane narzędzia webowe, integracje API oraz opcjonalne wsparcie techniczne i dalszy rozwój po uruchomieniu. Dokładny zakres usług i elementów projektu określa odpowiednia oferta lub umowa projektowa. Funkcja, integracja lub usługa wymieniona na stronie nie jest automatycznie częścią projektu, jeżeli nie została uwzględniona w uzgodnionym zakresie.`,
  },
  {
    number: "4",
    title: "Oferty i przyjęcie projektu",
    body: `Każdy projekt analizuję i wyceniam indywidualnie. Oferta może określać zakres projektu, elementy do wykonania, przewidywany czas realizacji, cenę, harmonogram płatności, obowiązki klienta, zakres poprawek, usługi zewnętrzne i zasady wsparcia. Jeżeli oferta nie stanowi inaczej, jest ważna przez 30 dni od daty wystawienia. Projekt staje się wiążący po zaakceptowaniu oferty lub umowy projektowej w sposób określony w danym dokumencie. Przed zawarciem umowy mogę odmówić przyjęcia projektu. Jeżeli zakres projektu zmieni się przed rozpoczęciem prac, mogę przedstawić zmienioną ofertę.`,
  },
  {
    number: "5",
    title: "Zaliczki i płatności",
    body: `Wysokość zaliczki i harmonogram płatności są określane w ofercie lub umowie projektowej. Jeżeli dla danego projektu określono zaliczkę w wysokości 25%, prace zwykle rozpoczynam po jej otrzymaniu oraz po otrzymaniu informacji lub dostępu potrzebnego do rozpoczęcia projektu. Pozostałe płatności mogą być wymagane na uzgodnionych etapach, po zakończeniu projektu lub zgodnie z innym harmonogramem wskazanym w dokumentacji projektowej. Jeżeli faktura lub pisemne uzgodnienie nie określa innego terminu, faktura jest płatna w ciągu 14 dni. Płatności mogą być obsługiwane przez Stripe lub inną uzgodnioną metodę płatności. Zewnętrzni dostawcy usług płatniczych działają na podstawie własnych warunków i polityk.`,
  },
  {
    number: "6",
    title: "Opóźnienia w płatnościach",
    body: `Jeżeli faktura nie zostanie opłacona w terminie, mogę w odpowiednich przypadkach wstrzymać prace, przesunąć termin dostawy, wstrzymać przekazanie nieopłaconych elementów projektu, zmienić harmonogram projektu, wstrzymać uzgodnione wsparcie, zakończyć projekt zgodnie z Regulaminem i umową projektową lub podjąć rozsądne działania w celu odzyskania należności. Powyższe postanowienia nie ograniczają ustawowych praw związanych z opóźnieniami w płatnościach w transakcjach handlowych.`,
  },
  {
    number: "7",
    title: "Terminy realizacji",
    body: `Terminy podawane przed pełnym ustaleniem zakresu projektu są jedynie szacunkowe. Typowa strona firmowa może wymagać około dziewięciu tygodni realizacji. Dedykowany katalog lub system zamówień B2B może wymagać około 6-10 tygodni od uzgodnienia specyfikacji oraz otrzymania wymaganych treści i dostępu potrzebnego do integracji. Bardziej złożone projekty wyceniam i planuję indywidualnie. Termin zakończenia jest wiążący tylko wtedy, gdy został wyraźnie uzgodniony na piśmie.`,
  },
  {
    number: "8",
    title: "Obowiązki klienta i opóźnienia",
    body: `Klient odpowiada za dostarczenie informacji, materiałów, decyzji, akceptacji i dostępu, które są w rozsądnym zakresie potrzebne do realizacji projektu. W zależności od projektu mogą to być teksty i zdjęcia, materiały identyfikacji wizualnej, informacje o produktach, dokumentacja techniczna, dane dostępowe, dokumentacja lub dane dostępowe API, uwagi i akceptacje. Opóźnienia w przekazaniu wymaganych informacji, treści, dostępu, uwag lub decyzji mogą wpłynąć na harmonogram projektu. Zmiany uzgodnionego zakresu mogą również wpłynąć na cenę i termin realizacji. Nie odpowiadam za opóźnienie spowodowane wyłącznie niedostarczeniem przez klienta wymaganych informacji, materiałów, dostępu, uwag lub akceptacji w odpowiednim czasie.`,
  },
  {
    number: "9",
    title: "Treści i materiały klienta",
    body: `Klient odpowiada za prawidłowość materiałów przekazanych do wykorzystania w projekcie oraz za posiadanie praw lub zezwoleń potrzebnych do ich wykorzystania. Dotyczy to w szczególności tekstów, zdjęć, grafik, materiałów wideo i audio, logo, znaków towarowych, informacji o produktach, dokumentacji technicznej, oprogramowania, kodu, baz danych i innych przekazanych danych. Klient pozostaje odpowiedzialny za zgodność z prawem i poprawność informacji przeznaczonych do publikacji, w tym specyfikacji produktów, cen, twierdzeń regulacyjnych, danych firmy i danych kontaktowych.`,
  },
  {
    number: "10",
    title: "Zmiana zakresu i prace dodatkowe",
    body: `Prace wykraczające poza uzgodniony zakres nie są automatycznie objęte pierwotną ceną projektu. Jeżeli klient zleci dodatkowe prace, ocenię ich wpływ na projekt i, w odpowiednich przypadkach, przedstawię dodatkową wycenę lub zmienioną ofertę przed rozpoczęciem tych prac. Istotna zmiana może wymagać zmienionej oferty, zmiany harmonogramu, wydzielenia osobnego etapu projektu lub osobnego uzgodnienia. Mogę odmówić wykonania zmiany, jeżeli nie jest technicznie możliwa lub wykracza poza rodzaj świadczonych przeze mnie usług.`,
  },
  {
    number: "11",
    title: "Poprawki",
    body: `Liczba i zakres poprawek zawartych w projekcie są określone w ofercie lub umowie projektowej. Poprawka mieszcząca się w uzgodnionym zakresie nie jest tym samym co zlecenie nowej funkcjonalności lub istotna zmiana wcześniej uzgodnionych wymagań. Prace wykraczające poza uzgodniony zakres poprawek lub zakres projektu są wyceniane osobno, chyba że wcześniej pisemnie uzgodniono inny sposób rozliczenia. Nie obowiązuje automatyczna stała stawka godzinowa, jeżeli nie została ona wyraźnie uzgodniona.`,
  },
  {
    number: "12",
    title: "Testowanie i standardy techniczne",
    body: `Sprawdzam i testuję wykonane prace zgodnie z uzgodnionym zakresem projektu. W zależności od projektu może to obejmować responsywność, obsługę urządzeń mobilnych, dostępność, konfigurację SSL/TLS, wydajność, techniczne SEO, formularze, działanie w obsługiwanych przeglądarkach, integracje API i konfigurację związaną z bezpieczeństwem. Testowanie ogranicza ryzyko, ale nie może zagwarantować, że strona, system lub usługa zewnętrzna pozostaną całkowicie wolne od błędów, podatności, awarii lub problemów z przyszłą kompatybilnością. Na wydajność, bezpieczeństwo i dostępność mogą również wpływać dostawcy hostingu, przeglądarki, urządzenia, API i inna infrastruktura zewnętrzna pozostająca poza moją bezpośrednią kontrolą.`,
  },
  {
    number: "13",
    title: "Usługi zewnętrzne",
    body: `Projekt może korzystać z usług zewnętrznych, takich jak hosting, rejestracja domen, obsługa płatności, dostarczanie wiadomości e-mail, API, usługi analityczne, sieci dostarczania treści, usługi chmurowe, zewnętrzne oprogramowanie lub platformy. Usługi zewnętrzne działają na podstawie własnych warunków, cenników, dostępności i ograniczeń technicznych. Jeżeli oferta nie stanowi wyraźnie inaczej, koszty usług zewnętrznych nie są częścią wynagrodzenia Forsa Design za projekt. Nie odpowiadam za awarie, zmiany cen, zakończenie świadczenia usług, zmiany API, incydenty bezpieczeństwa ani inne problemy spowodowane przez zewnętrznych dostawców i pozostające poza moją rozsądną kontrolą. Jeżeli uzgodniono dalsze wsparcie, mogę pomagać w rozwiązywaniu problemów z usługami zewnętrznymi w ramach uzgodnionego zakresu wsparcia.`,
  },
  {
    number: "14",
    title: "Integracje API",
    body: `Każdą integrację API oceniam indywidualnie. Możliwość wykonania integracji zależy między innymi od dostępności zewnętrznego API, dokumentacji, sposobu uwierzytelniania, uprawnień i dostępu, ograniczeń technicznych, limitów użycia, kompatybilności oraz cen i ograniczeń zewnętrznego dostawcy. Nie gwarantuję możliwości wykonania integracji, jeżeli zewnętrzny dostawca nie zapewnia odpowiedniego dostępu, dokumentacji lub możliwości technicznych.`,
  },
  {
    number: "15",
    title: "Hosting",
    body: `Zasady hostingu i podział odpowiedzialności zależą od konkretnego projektu oraz ewentualnej osobnej umowy dotyczącej hostingu lub wsparcia. Jeżeli hosting zapewnia zewnętrzny dostawca, jego dostępność, infrastruktura i poziom usług podlegają warunkom tego dostawcy, chyba że wyraźnie uzgodniłem na piśmie inaczej. Nie mogę zagwarantować nieprzerwanej dostępności zewnętrznej usługi hostingowej.`,
  },
  {
    number: "16",
    title: "Wsparcie po uruchomieniu",
    body: `Dalsze wsparcie jest opcjonalne i nie jest automatycznie świadczone bezterminowo po zakończeniu projektu. Wsparcie może obejmować utrzymanie techniczne, aktualizacje, poprawki, monitoring, pomoc przy hostingu, uzgodnione zmiany i dalszy rozwój. Zakres i cenę wsparcia ustalam indywidualnie w zależności od projektu i potrzeb klienta. Nie wymagam od klienta zakupu stałego pakietu wsparcia, chyba że takie rozwiązanie zostało wyraźnie uzgodnione. Wsparcie dotyczące usług zewnętrznych podlega dostępności i ograniczeniom ich dostawców.`,
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
        body: `Komponenty, biblioteki, procesy developerskie, wzorce, metody i narzędzia utworzone przed rozpoczęciem projektu lub przeznaczone do ogólnego ponownego wykorzystania nie stają się automatycznie wyłączną własnością klienta. Nie wprowadzam celowo vendor lock-in. Projekt może jednak zależeć od zewnętrznych platform, usług lub technologii, które mają własne ograniczenia techniczne lub umowne.`,
      },
    ],
  },
  {
    number: "18",
    title: "Portfolio i case studies",
    body: `Mogę poprosić klienta o zgodę na zaprezentowanie ukończonego projektu w portfolio Forsa Design lub jako case study. Informacje poufne, referencje oraz materiały wymagające zgody nie są automatycznie przeznaczone do wykorzystania promocyjnego tylko dlatego, że projekt został ukończony. Szczególne zasady dotyczące poufności lub prezentowania projektu w portfolio mogą zostać uzgodnione na piśmie.`,
  },
  {
    number: "19",
    title: "Ochrona danych i prywatność",
    body: `Przetwarzam dane osobowe zgodnie z obowiązującymi przepisami Wielkiej Brytanii dotyczącymi ochrony danych oraz Polityką prywatności Forsa Design. Role Forsa Design, klienta i zewnętrznych dostawców w zakresie ochrony danych zależą od okoliczności konkretnego projektu i rodzaju przetwarzania. Jeżeli jest to wymagane, odpowiednie zasady przetwarzania danych mogą zostać uzgodnione osobno. Klient pozostaje odpowiedzialny za obowiązki prawne i regulacyjne dotyczące jego własnej działalności oraz sposobu korzystania z dostarczonej strony lub systemu. W zależności od projektu mogą one obejmować politykę prywatności, zgodne z prawem przetwarzanie danych osobowych, zgodę na pliki cookie, komunikację marketingową, dane klientów, okresy przechowywania danych i wymagania właściwe dla danej branży. Forsa Design nie świadczy usług doradztwa prawnego.`,
  },
  {
    number: "20",
    title: "Bezpieczeństwo",
    body: `Stosuję rozsądne środki techniczne i organizacyjne odpowiednie do projektu i uzgodnionego zakresu. Żadna strona ani system połączony z internetem nie może mieć zagwarantowanego całkowitego bezpieczeństwa. Na bezpieczeństwo mogą wpływać zewnętrzni dostawcy, infrastruktura hostingowa, konfiguracja klienta, hasła i dane dostępowe, zachowanie użytkowników, usługi zewnętrzne oraz zmiany wprowadzone po przekazaniu projektu. Zakres odpowiedzialności za bezpieczeństwo i utrzymanie po uruchomieniu zależy od uzgodnionych zasad wsparcia lub hostingu.`,
  },
  {
    number: "21",
    title: "Rezygnacja i rozwiązanie umowy",
    body: `Każda ze stron może zrezygnować z projektu lub rozwiązać umowę zgodnie z umową projektową, niniejszym Regulaminem i obowiązującym prawem. Jeżeli klient zrezygnuje po rozpoczęciu prac, mogę wystawić fakturę za prace wykonane do dnia rezygnacji, ukończone etapy projektu i bezzwrotne koszty usług zewnętrznych poniesione na potrzeby projektu. Sposób rozliczenia zaliczki wynika z zaakceptowanej oferty, umowy projektowej i obowiązującego prawa.`,
    subsections: [
      {
        title: "Wstrzymanie lub zakończenie prac przez Forsa Design",
        body: `Mogę wstrzymać lub zakończyć prace w przypadku poważnego lub utrzymującego się braku płatności, istotnego naruszenia umowy projektowej lub Regulaminu, żądania wykorzystania projektu lub usług w sposób niezgodny z prawem albo powtarzającego się braku informacji, dostępu lub decyzji niezbędnych do kontynuowania prac. Jeżeli będzie to rozsądnie możliwe, poinformuję klienta przed wstrzymaniem lub zakończeniem prac.`,
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
    body: `Żadne postanowienie Regulaminu nie wyłącza ani nie ogranicza odpowiedzialności w zakresie, w którym byłoby to niezgodne z prawem. Nie odpowiadam za straty spowodowane wyłącznie awarią usług lub infrastruktury podmiotów trzecich pozostającą poza moją rozsądną kontrolą. Nie gwarantuję, że strona, system lub inny wykonany element zapewni określony poziom sprzedaży, liczby zapytań, przychodów, pozycji w wynikach wyszukiwania lub wyników biznesowych. Ewentualne ograniczenie odpowiedzialności dotyczące konkretnego projektu może zostać określone w odpowiedniej umowie projektowej.`,
  },
  {
    number: "23",
    title: "Zdarzenia pozostające poza rozsądną kontrolą",
    body: `Nie odpowiadam za opóźnienie lub niewykonanie zobowiązania spowodowane okolicznościami pozostającymi poza moją rozsądną kontrolą. Może to obejmować awarie lub przerwy w działaniu zewnętrznej infrastruktury albo usług potrzebnych do realizacji projektu. Jeżeli takie zdarzenie istotnie wpłynie na realizację, podejmę rozsądne działania, aby poinformować klienta i kontynuować projekt, gdy będzie to możliwe.`,
  },
  {
    number: "24",
    title: "Prawo właściwe",
    body: `Do niniejszego Regulaminu oraz objętych nim umów projektowych stosuje się prawo Szkocji. Spory będą rozstrzygane zgodnie z obowiązującym prawem szkockim i zasadami jurysdykcji mającymi zastosowanie do danej umowy. Jeżeli jest to praktycznie możliwe, strony powinny najpierw podjąć próbę rozwiązania sporu w drodze bezpośredniego porozumienia. Żadne postanowienie Regulaminu nie pozbawia strony prawa ani środka ochrony prawnej, którego zgodnie z prawem nie można wyłączyć.`,
  },
  {
    number: "25",
    title: "Zmiany Regulaminu",
    body: `Mogę aktualizować Regulamin w związku ze zmianami usług Forsa Design, sposobu prowadzenia działalności lub wymagań prawnych. Aktualna wersja będzie publikowana na stronie Forsa Design wraz z datą ostatniej aktualizacji. Późniejsza zmiana Regulaminu na stronie nie zmienia automatycznie uzgodnionego zakresu, ceny ani warunków istniejącego projektu, chyba że strony uzgodnią inaczej lub wymaga tego prawo.`,
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
