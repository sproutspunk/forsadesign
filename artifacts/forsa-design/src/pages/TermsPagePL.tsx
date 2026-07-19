import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { ArrowLeft } from "lucide-react";

export default function TermsPagePL() {
  const { t } = useLanguage();

  useSeoMeta({
    title: "Regulamin i Warunki Świadczenia Usług | Forsa Design",
    description:
      "Zapoznaj się z regulaminem i warunkami świadczenia usług Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    ogTitle: "Regulamin i Warunki Świadczenia Usług | Forsa Design",
    ogDescription:
      "Zapoznaj się z regulaminem i warunkami świadczenia usług Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    twitterTitle: "Regulamin i Warunki Świadczenia Usług | Forsa Design",
    twitterDescription:
      "Zapoznaj się z regulaminem i warunkami świadczenia usług Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Regulamin i Warunki Świadczenia Usług
          </h1>
          <p className="text-foreground/60 font-light">Forsa Design - Art &amp; Web Design</p>
          <p className="text-foreground/50 font-light text-sm mt-2">
            Ostatnia aktualizacja: Czerwiec 2026
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
    title: "Wstęp",
    body: `Witaj w Forsa Design ("My", "nas", "naszych" lub "Spółka"). Niniejszy Regulamin i Warunki Świadczenia Usług ("Regulamin") reguluje dostęp do naszej strony internetowej i zaangażowanie naszych usług. Uzyskując dostęp do naszej strony internetowej lub korzystając z naszych usług, zgadzasz się być związany niniejszym Regulaminem. Jeśli nie zgadzasz się z jakąkolwiek częścią niniejszego regulaminu, prosimy nie korzystaj z naszej strony ani usług. Niniejszy Regulamin ma zastosowanie do wszystkich usług świadczonych przez Forsa Design, w tym między innymi projektowania stron internetowych, tworzenia aplikacji webowych, rozwiązań e-commerce, systemów niestandardowych i wsparcia bieżącego.`,
  },
  {
    number: "2",
    title: "Korzystanie ze Strony Internetowej",
    body: `Zawartość naszej strony internetowej jest udostępniana wyłącznie do celów informacyjnych i może być aktualizowana lub zmieniana bez powiadomienia. Dokładamy rozsądnych starań, aby zapewnić dokładność informacji na naszej stronie; jednak nie gwarantujemy kompletności, dokładności ani przydatności dla jakiegokolwiek konkretnego celu. Zastrzegamy sobie prawo do ograniczenia lub odmowy dostępu dowolnej osobie lub organizacji bez podawania przyczyn.`,
  },
  {
    number: "3",
    title: "Prawa Autorskie i Własność Intelektualna",
    body: `O ile nie uzgodniono inaczej na piśmie, wszystkie prawa autorskie i prawa własności intelektualnej dotyczące naszej strony internetowej, w tym między innymi tekst, grafiki, branding, elementy projektowe, layouty, kod i zawartość, należą wyłącznie do Forsa Design. Możesz przeglądać i drukować strony z naszej witryny wyłącznie do osobistego, niekomercyjnego użytku. Każde inne powielanie, rozpowszechnianie lub wykorzystanie zawartości strony jest surowo zakazane bez uprzedniej pisemnej zgody Forsa Design.`,
    subsections: [
      {
        title: "Deliverable'e Projektów",
        body: `Prawo własności do niestandardowych rezultatów projektu (w tym stron internetowych, projektów, kodu i innych materiałów) stworzonych specjalnie dla klienta przechodzi na klienta po otrzymaniu 100% płatności całkowitej wartości projektu. Aż do otrzymania pełnej płatności wszystkie prawa autorskie i prawa własności intelektualnej, w tym kod źródłowy, pliki projektowe, bazy danych i wszystkie powiązane materiały, pozostają wyłączną własnością Forsa Design. Forsa Design zastrzega sobie prawo do wykorzystywania rezultatów projektów jako przykładów z portfolio i studiów przypadków z odpowiednią anonimizacją, jeśli będzie tego życzył klient.`,
      },
      {
        title: "Wcześniej Istniejące Materiały",
        body: `Forsa Design zachowuje wszystkie prawa autorskie i prawa własności intelektualnej do wcześniej istniejących szablonów, frameworków, bibliotek, komponentów, procesów i metodologii opracowanych przed lub niezależnie od projektów klienta.`,
      },
    ],
  },
  {
    number: "4",
    title: "Zapytania o Usługi i Oferty",
    body: `Każda oferta, oszacowanie, propozycja lub zakres pracy dostarczony przez Forsa Design jest niewiążący aż do formalnego zaakceptowania przez klienta i potwierdzenia w podpisanej umowie projektowej lub kontrakcie. Oferty są ważne przez 30 dni od daty wydania. Po upływie 30 dni oferty muszą być odświeżone i mogą podlegać zmienionej wycenie. Zastrzegamy sobie prawo do odmowy jakiegokolwiek zapytania projektowego lub propozycji wyłącznie według naszego uznania, bez podawania przyczyn.`,
  },
  {
    number: "5",
    title: "Zaliczki, Płatności i Warunki Płatności",
    body: `Nierefundowana zaliczka w wysokości 25% całkowitej wartości projektu jest wymagana przed rozpoczęciem prac. Zaliczka będzie traktowana jako płatność na poczet faktury końcowej. Zaliczka musi być otrzymana i zaksięgowana przed rozpoczęciem jakichkolwiek prac.`,
    subsections: [
      {
        title: "Plan Płatności",
        body: `Pozostałe saldo w wysokości 75% będzie płacone zgodnie z harmonogramem określonym w indywidualnej umowie projektowej. Standardowe warunki płatności to: pozostałe saldo po zakończeniu projektu, lub płatności etapowe w uzgodnionych kamieniach milowych, lub zgodnie z wystawioną fakturą po zakończeniu projektu.`,
      },
      {
        title: "Metoda Płatności i Termin Płatności",
        body: `Wszystkie faktury są wymagalne w ciągu 14 dni od wystawienia, o ile nie uzgodniono innych warunków na piśmie. Płatność musi być dokonana przesyłką bankową lub inną uzgodnioną metodą.`,
      },
      {
        title: "Płatność Zaległa",
        body: `Niezłożenie płatności w wyznaczonym terminie może spowodować natychmiastowe wstrzymanie prac do czasu spłacenia całości zalegających kwot. Jeśli płatność pozostaje zaległa przez ponad 30 dni od daty wymagalności, Forsa Design zastrzega sobie prawo do: natychmiastowego zakończenia projektu, wystawienia faktury za wszystkie wykonane dotychczas prace, ograniczenia lub wyłączenia dostępu do strony internetowej lub rezultatów, oraz dochodzenia zalegających kwot drogą prawną.`,
      },
      {
        title: "Prawo Własności i Dostęp",
        body: `Klient nabywa wyłączne prawo własności do ukończonej strony internetowej i wszystkich rezultatów wyłącznie po otrzymaniu 100% płatności całkowitej wartości projektu. Aż do pełnej zapłaty Forsa Design zachowuje wszystkie prawa autorskie i może ograniczyć lub wyłączyć dostęp do strony internetowej, kodu źródłowego i wszystkich powiązanych materiałów.`,
      },
      {
        title: "Polityka Zwrotów",
        body: `Zaliczka w wysokości 25% jest nierefundowalna w żadnych okolicznościach, włączając anulowanie projektu przez klienta. Jeśli klient anuluje projekt po rozpoczęciu prac, klient będzie zobowiązany zapłacić za wszystkie dotychczas wykonane prace, a także za wszelkie koszty poniesione przez Forsa Design, których nie można odzyskać.`,
      },
    ],
  },
  {
    number: "6",
    title: "Terminy Projektów i Kamienie Milowe",
    body: `Wszystkie szacunkowe daty zakończenia, harmonogramy lub harmonogramy dostarczenia podane przed podpisaniem formalnej umowy projektowej są wyłącznie orientacyjne i nie powinny być uważane za gwarantowane. Terminy projektów stają się wiążące tylko po wykonaniu formalnej pisemnej umowy projektowej podpisanej przez obie strony. Wszystkie terminy projektów, kamienie milowe, rezultaty, dopuszczalne liczby rewizji, daty zakończenia i szczegółowe wymagania będą udokumentowane w formalnej umowie projektowej podpisanej przez obie strony.`,
    subsections: [
      {
        title: "Opóźnienia Spowodowane przez Klienta",
        body: `Forsa Design nie będzie odpowiedzialna za opóźnienia spowodowane przez klienta, w tym opóźnienia w dostarczeniu treści, tekstu, obrazów, materiałów brandingowych lub innych informacji niezbędnych do postępu projektu; opóźnienia w udzieleniu sprzężenia zwrotnego, zatwierdzeń lub podjęciu decyzji; zmiany zakresu projektu lub wymagań po rozpoczęciu prac; dostarczanie niedokładnych lub niekompletnych informacji; lub niedostępność przedstawicieli klienta do konsultacji lub przeglądu. Wszelkie opóźnienia spowodowane przez klienta będą odpowiednio przedłużać harmonogram projektu i nie spowodują kar lub odpowiedzialności dla Forsa Design.`,
      },
      {
        title: "Siła Wyższa",
        body: `Forsa Design nie będzie odpowiedzialna za opóźnienia lub brak wykonania spowodowane okolicznościami pozostającymi poza rozsądną kontrolą, w tym między innymi klęski żywiołowe, pandemie, działania rządowe, awarie infrastruktury lub inne nieprzewidziane zdarzenia.`,
      },
    ],
  },
  {
    number: "7",
    title: "Zakres Prac i Żądania Zmian",
    body: `Zakres pracy będzie określony w indywidualnej umowie projektowej. Prace będą ograniczone do uzgodnionego zakresu, chyba że autoryzowano inaczej na piśmie. Liczba rund rewizji, cykli sprzężenia zwrotnego i rewizji zawartych w opłacie projektowej będzie określona w umowie projektowej.`,
    subsections: [
      {
        title: "Zmiany Poza Zakresem",
        body: `Wszelkie zmiany, uzupełnienia lub rewizje żądane poza uzgodnionym zakresem lub poza dopuszczalną liczbę rewizji będą podlegać dodatkowym opłatom. Żądania zmian muszą być złożone na piśmie i będą wycenione oddzielnie przed rozpoczęciem prac. Dodatkowe prace nie będą wykonywane bez pisemnej zgody i uzgodnienia zmienionej wysokości opłat. Dodatkowe rundy rewizji są naliczane w wysokości £75 za godzinę lub zgodnie z wyceną.`,
      },
      {
        title: "Zapobieganie Rozszerzaniu Się Zakresu",
        body: `Jeśli żądane zmiany istotnie zmieniają zakres projektu lub harmonogram, Forsa Design zastrzega sobie prawo do: udzielenia zmienionej wyceny, przedłużenia harmonogramu projektu, żądania dodatkowej zaliczki, lub odmowy realizacji żądanych zmian.`,
      },
    ],
  },
  {
    number: "8",
    title: "Odpowiedzialność Klienta",
    body: `Klient jest odpowiedzialny za dostarczenie dokładnych, kompletnych, terminowych i prawidłowo sformatowanych informacji, treści, materiałów, obrazów i zasobów brandingowych niezbędnych do wykonania projektu. Klient zobowiązany jest zapewnić, że wszystkie dostarczone materiały mają wystarczającą jakość i rozdzielczość do profesjonalnego użytku.`,
    subsections: [
      {
        title: "Gwarancja Praw Autorskich",
        body: `Klient gwarantuje, że wszystkie materiały, zawartość, obrazy, teksty, audio, wideo i kod dostarczone Forsa Design są oryginalnym dziełem klienta lub klient uzyskał wszelkie niezbędne uprawnienia i licencje. Żaden z dostarczonych materiałów nie narusza praw autorskich, znaków towarowych, prywatności ani innych praw jakiejkolwiek strony trzeciej.`,
      },
      {
        title: "Odszkodowanie",
        body: `Klient zgadza się zabezpieczyć i wyzwolić Forsa Design z wszelkich roszczeń stron trzecich, szkód, kosztów lub strat wynikających z materiałów, zawartości lub informacji klienta, wykorzystania przez klienta rezultatów, naruszenia przez klienta niniejszego Regulaminu lub obowiązującego prawa, lub jakiegokolwiek naruszenia gwarancji udzielonych przez klienta.`,
      },
      {
        title: "Dokładność Zawartości",
        body: `Forsa Design nie jest odpowiedzialna za dokładność, legalność lub odpowiedniość zawartości dostarczonej przez klienta. Klient ponosi wyłączną odpowiedzialność za zapewnienie, że cała zawartość jest zgodna z obowiązującym prawem i nie narusza praw stron trzecich.`,
      },
      {
        title: "Terminowe Sprzężenie Zwrotne i Decyzje",
        body: `Klient zobowiązany jest dostarczać terminowe sprzężenie zwrotne, zatwierdzenia i decyzje w celu zapobieżenia opóźnieniom projektu. Forsa Design nie będzie odpowiedzialna za opóźnienia spowodowane wolną odpowiedzią klienta.`,
      },
    ],
  },
  {
    number: "9",
    title: "Rewizje i Dodatkowe Prace",
    body: `Liczba rund rewizji, cykli przeglądu i godzin rewizji zawartych w opłacie projektowej powinna być wyraźnie określona w umowie projektowej. O ile nie stwierdzono inaczej, "rewizje" obejmują zmiany projektowania, layoutu, tekstu, funkcjonalności lub innych elementów w ramach pierwotnego zakresu. Rewizje poza uzgodnionym dozwolonym zakresem będą naliczane w wysokości £75 za godzinę lub zgodnie z oddzielną wyceną. Jeśli żądanie rewizji stanowi istotną zmianę zakresu projektu, rezultatów lub harmonogramu, Forsa Design zastrzega sobie prawo do potraktowania go jako oddzielnego żądania zmiany podlegającego dodatkowym opłatom.`,
  },
  {
    number: "10",
    title: "Ograniczenie Odpowiedzialności",
    body: `W największym dozwolonym przez prawo zakresie, Forsa Design nie będzie odpowiedzialna za żadne: pośrednie, incydentalne, specjalne lub następcze szkody; stratę zysku, przychodu, szans biznesowych, goodwillu lub reputacji; stratę danych, przerwanie działalności biznesu lub awarię systemu; szkody wynikające z korzystania przez Ciebie lub niemożności korzystania z naszej strony lub usług. Ograniczenie to dotyczy niezależnie od przyczyny roszczeń i niezależnie od tego, czy taka odpowiedzialność opiera się na umowie, delikt, odpowiedzialność bezwzględną czy jakakolwiek inna teoria prawna.`,
    subsections: [
      {
        title: "Maksymalny Limit Odpowiedzialności",
        body: `W żadnym wypadku całkowita odpowiedzialność Forsa Design wynikająca z lub związana z niniejszym Regulaminem lub naszymi usługami nie będzie przekraczać kwoty wpłaconej przez klienta w 12 miesiącach poprzedzających roszczenie lub £500, w zależności od tego, która kwota jest większa.`,
      },
      {
        title: "Wyjątki",
        body: `Nic w niniejszym Regulaminie nie wyłącza ani nie ogranicza odpowiedzialności Forsa Design za: śmierć lub obrażenia ciała spowodowane zaniedbaniem; oszustwo, oszukańcze wprowadzenie w błąd lub umyślne naruszenie; każdą odpowiedzialność, która nie może być prawnie wyłączona lub ograniczona na mocy obowiązującego prawa szkockiego.`,
      },
    ],
  },
  {
    number: "11",
    title: "Usługi Stron Trzecich i Hosting",
    body: `Projekty mogą uwzględniać lub być zależne od usług stron trzecich, platform, dostawców hostingu, wtyczek, oprogramowania, narzędzi lub sieci dostarczania treści. Mogą to być (ale nie są ograniczone do): dostawcy hostingu, rejestry domen, dostawcy certyfikatów SSL, usługi email, bramy płatności, narzędzia analityczne, sieci CDN i wtyczki stron trzecich.`,
    subsections: [
      {
        title: "Odpowiedzialność Forsa Design",
        body: `Forsa Design nie bierze odpowiedzialności za: awarie, przerwy w usługach lub przestoje spowodowane dostawcami stron trzecich; zmiany warunków, funkcji, cen lub dostępności od dostawców stron trzecich; naruszenia bezpieczeństwa, utratę danych lub luki w zabezpieczeniach na platformach stron trzecich; lub słabą wydajność, wolne czasy ładowania lub problemy techniczne spowodowane usługami stron trzecich.`,
      },
      {
        title: "Odpowiedzialność Klienta",
        body: `O ile nie stwierdzono wyraźnie inaczej w umowie projektowej, klient odpowiada za: wybór i zawarcie umowy z dostawcami hostingu, rejestrację i utrzymanie nazw domen, utrzymanie certyfikatów SSL/TLS, zarządzanie usługami poczty elektronicznej i kopii zapasowych, oraz płacenie wszystkich opłat za hosting, domeny i usługi stron trzecich.`,
      },
      {
        title: "Umowy Poziomu Usług",
        body: `Forsa Design nie zapewnia ani nie gwarantuje żadnej umowy poziomu usług (SLA) dla usług stron trzecich. Czas pracy, dostępność i wydajność zależą całkowicie od dostawców stron trzecich.`,
      },
    ],
  },
  {
    number: "12",
    title: "Dostępność Strony Internetowej i Konserwacja",
    body: `Nie gwarantujemy, że strona będzie stale dostępna, nieprzerywana, wolna od błędów lub bezpieczna. Dostęp do strony może być czasowo wstrzymany z powodu: zaplanowanej konserwacji i aktualizacji, napraw awaryjnych, poprawek bezpieczeństwa, uaktualnień serwerów, lub okoliczności pozostających poza naszą rozsądną kontrolą. Forsa Design nie będzie odpowiedzialna za jakiekolwiek przestoje, utratę danych lub niemożność dostępu do strony, z wyjątkiem sytuacji spowodowanej bezpośrednio zaniedbaniem Forsa Design.`,
  },
  {
    number: "13",
    title: "Własność Intelektualna i Wykorzystanie w Portfolio",
    body: `Forsa Design zastrzega sobie prawo do: wyświetlania strony internetowej jako przykładu z portfolio, prezentowania projektu w studiach przypadków, materiałach marketingowych lub referencjach, oraz wykorzystywania zanonimizowanych opisów i zrzutów ekranu do celów promocyjnych. Jeśli klient zażąda anonimowości, musi to być uzgodnione na piśmie w momencie rozpoczęcia projektu. Forsa Design może poprosić o zezwolenie na wykorzystanie referencji klienta, sprzężenia zwrotnego lub opinii do celów marketingowych. Wykorzystywanie referencji wymaga uprzedniej pisemnej zgody.`,
  },
  {
    number: "14",
    title: "Ochrona Danych i Prywatność",
    body: `Obie strony będą zgodne z Ogólnym Rozporządzeniem o Ochronie Danych (RODO), Ustawą o Ochronie Danych z 2018 r. i wszystkimi obowiązującymi przepisami o ochronie danych. Klient jest odpowiedzialny za: uzyskanie wszelkich niezbędnych zgód od użytkowników końcowych na zbieranie i przetwarzanie danych, zapewnienie, że polityka prywatności strony internetowej jest zgodna z RODO, utrzymanie odpowiednich środków bezpieczeństwa dla danych osobowych, oraz powiadomienie Forsa Design o wszelkich naruszeniach danych dotyczących strony internetowej.`,
    subsections: [
      {
        title: "Odpowiedzialność Forsa Design",
        body: `Forsa Design wdroży rozsądne środki bezpieczeństwa w celu ochrony danych hostowanych na stronach klientów. Jednak Forsa Design nie bierze odpowiedzialności za naruszenia danych spowodowane dostawcami hostingu stron trzecich lub lukami w bezpieczeństwie spowodowanymi przez klienta.`,
      },
      {
        title: "Umowa Przetwarzania Danych",
        body: `Jeśli zaangażowane jest przetwarzanie danych osobowych, Umowa Przetwarzania Danych (DPA) będzie wykonana jako część umowy projektowej.`,
      },
    ],
  },
  {
    number: "15",
    title: "Rozwiązanie i Anulowanie",
    body: `Jeśli klient zażąda anulowania projektu po wpłaceniu zaliczki: zaliczka w wysokości 25% jest nierefundowalna w żadnych okolicznościach; klient będzie zobowiązany zapłacić za wszystkie dotychczas wykonane prace oraz wszelkie koszty nieodwracalne poniesione przez Forsa Design; i klient nie nabywa praw własności do niekompletnych prac do czasu pełnej zapłaty wszystkich wykonanych prac.`,
    subsections: [
      {
        title: "Rozwiązanie przez Forsa Design",
        body: `Forsa Design zastrzega sobie prawo do natychmiastowego rozwiązania projektu, jeśli: płatność jest zaległa o ponad 30 dni po terminie płatności, klient istotnie narusza niniejszy Regulamin lub umowę projektową, postępowanie klienta jest obraźliwe, groźne lub nieuzasadnione, lub klient dostarcza fałszywe, mylące lub niekompletne informacje. Po rozwiązaniu przez Forsa Design, Forsa Design wystawia fakturę za wszystkie dotychczas wykonane prace, klient musi zapłacić wszystkie zalegające faktury w ciągu 7 dni, i klient nie nabywa praw własności do rezultatów do czasu pełnej zapłaty wszystkich kwot.`,
      },
      {
        title: "Skutek Rozwiązania",
        body: `Po rozwiązaniu wszystkie prace w toku natychmiast ustają. Forsa Design usunie lub zwróci wszystkie materiały klienta, pod warunkiem że wszystkie zalegające płatności zostały dokonane.`,
      },
    ],
  },
  {
    number: "16",
    title: "Prawo Właściwe i Rozstrzyganie Sporów",
    body: `Niniejszy Regulamin i Warunki Świadczenia Usług będą regulowane i interpretowane zgodnie z prawem Szkocji, bez względu na jego zasady dotyczące kolizji praw. Każdy spór wynikający z niniejszego Regulaminu lub naszych usług będzie podlegać wyłącznej jurysdykcji sądów szkockich. Obie strony wyrażają zgodę na jurysdykcję sądów szkockich. Przed wszczęciem postępowania sądowego obie strony zgadzają się spróbować rozwiązać spory poprzez uczciwą negocjację. Jeśli negocjacja zawiedzie, spory będą rozstrzygane przez sądy szkockie.`,
  },
  {
    number: "17",
    title: "Zmiany w Niniejszym Regulaminie",
    body: `Forsa Design zastrzega sobie prawo do aktualizacji, zmiany lub modyfikacji niniejszego Regulaminu w dowolnym momencie wyłącznie według swojego uznania. Zmiany wchodzą w życie po opublikowaniu na naszej stronie internetowej. Dalsze korzystanie z naszej strony lub usług stanowi zaakceptowanie zaktualizowanego Regulaminu. W przypadku istniejących projektów obowiązujący Regulamin w momencie rozpoczęcia projektu będzie regulować ten projekt.`,
  },
  {
    number: "18",
    title: "Nieważność Postanowień",
    body: `Jeśli którekolwiek postanowienie niniejszego Regulaminu okaże się niewykonalne lub nieważne na mocy obowiązującego prawa, to postanowienie będzie usunięte, a pozostałe postanowienia będą obowiązywać w pełnej mocy i skuteczności.`,
  },
  {
    number: "19",
    title: "Całość Umowy",
    body: `Niniejszy Regulamin i Warunki Świadczenia Usług, wraz z każdą umową projektową, ofertą i fakturą, stanowią całość umowy między stronami dotyczącej usług Forsa Design. Wszelkie wcześniejsze dyskusje, oświadczenia lub umowy nie opisane na piśmie są zastępowane przez niniejszy Regulamin.`,
  },
  {
    number: "20",
    title: "Informacje Kontaktowe",
    body: `W przypadku pytań, sporów lub zawiadomień dotyczących niniejszego Regulaminu, prosimy o kontakt: Forsa Design, Art & Web Design, Banff, Szkocja. Email: hello@forsadesign.co.uk. Telefon: 07770110735.`,
  },
];
