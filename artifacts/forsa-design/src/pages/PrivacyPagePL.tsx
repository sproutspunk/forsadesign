import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { openCookiePreferences } from "@/components/CookieConsent";
import { ArrowLeft, Settings2 } from "lucide-react";

export default function PrivacyPagePL() {
  const { t } = useLanguage();

  useSeoMeta({
    title: "Polityka Prywatności | Forsa Design",
    description:
      "Zapoznaj się z polityką prywatności Forsa Design i dowiedz się, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z UK GDPR i przepisami o ochronie danych.",
    ogTitle: "Polityka Prywatności | Forsa Design",
    ogDescription:
      "Zapoznaj się z polityką prywatności Forsa Design i dowiedz się, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z UK GDPR i przepisami o ochronie danych.",
    twitterTitle: "Polityka Prywatności | Forsa Design",
    twitterDescription:
      "Zapoznaj się z polityką prywatności Forsa Design i dowiedz się, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z UK GDPR i przepisami o ochronie danych.",
    ogLocale: "pl_PL",
    canonical: buildHref("/pl/privacy"),
    alternates: [
      { lang: "en", href: buildHref("/en/privacy") },
      { lang: "pl", href: buildHref("/pl/privacy") },
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
            Polityka Prywatności
          </h1>
          <p className="text-foreground/60 font-light">Forsa Design – Art &amp; Web Design</p>
          <p className="text-foreground/50 font-light text-sm mt-2">
            Ostatnia aktualizacja: Czerwiec 2026
          </p>
          <button
            onClick={openCookiePreferences}
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors font-light"
          >
            <Settings2 size={15} />
            {t("cookies.managePreferences")}
          </button>
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
    body: `Forsa Design ("My", "nas", "naszych" lub "Spółka") jest zaangażowana w ochronę Twojej prywatności i zapewnienie pozytywnego doświadczenia na naszej stronie internetowej oraz podczas korzystania z naszych usług. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, wykorzystujemy, ujawniamy i przetwarzamy Twoje dane osobowe zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO), Ustawą o Ochronie Danych z 2018 r. i wszystkimi obowiązującymi przepisami o ochronie danych. Uzyskując dostęp do naszej strony internetowej lub korzystając z naszych usług, wyrażasz zgodę na praktyki opisane w niniejszej Polityce Prywatności. Jeśli nie zgadzasz się z naszymi praktykami prywatności, prosimy nie korzystaj z naszej strony ani usług.`,
  },
  {
    number: "2",
    title: "Definicje",
    body: `"Dane Osobowe" to wszelkie informacje dotyczące zidentyfikowanej lub możliwej do zidentyfikowania osoby fizycznej. "Przetwarzanie" to wszelkie operacje wykonywane na Danych Osobowych, takie jak zbieranie, rejestrowanie, organizowanie, przechowywanie, wykorzystywanie, przesyłanie lub usuwanie. "Osoba Zainteresowana" to osoba fizyczna, której dotyczą Dane Osobowe. "Administrator" to jednostka, która określa cele i środki Przetwarzania. Forsa Design jest Administratorem dla tej strony internetowej.`,
  },
  {
    number: "3",
    title: "Administrator i Funkcjonariusz Ochrony Danych",
    body: `Forsa Design, Art & Web Design, Banff, Szkocja jest Administratorem Danych. W związku ze wszystkimi pytaniami dotyczącymi ochrony danych i korzystaniem z Twoich praw, prosimy o kontakt z Funkcjonariuszem Ochrony Danych w Forsa Design.`,
  },
  {
    number: "4",
    title: "Dane Osobowe, Które Zbieramy",
    body: `Zbieramy Dane Osobowe, które dobrowolnie udostępniasz, w tym: dane z formularzy kontaktowych (imię, email, telefon, firma, wiadomość), dane z zapytań o usługi i wyceny (informacje biznesowe, opis projektu, budżet, harmonogram), dane klientów projektowych (imię, adres rozliczeniowy, dane płatności przetwarzane przez dostawców zewnętrznych, materiały projektowe), dane komunikacji (korespondencja email, czat, nagrania rozmów za zgodą), oraz dane rejestracji konta (dane logowania, preferencje, historia płatności).`,
    subsections: [
      {
        title: "Dane Zbierane Automatycznie",
        body: `Zbieramy dane automatycznie podczas odwiedzania naszej strony: adres IP, typ przeglądarki, system operacyjny, strona referująca, odwiedzone strony, czas spędzony, dane kliknięć, zapytania wyszukiwania, typ urządzenia i identyfikatory. Używamy też plików cookie i technologii śledzących (sesyjne, trwałe, web beacons, local storage) oraz danych analitycznych przez Google Analytics (zagregowane wzorce, źródła ruchu, podróż użytkownika, dane konwersji).`,
      },
      {
        title: "Dane od Stron Trzecich",
        body: `Możemy otrzymywać Dane Osobowe od Twojego pracodawcy (jeśli angażuje nas do usług), źródeł rekomendujących, publicznie dostępnych źródeł i dostawców usług zewnętrznych.`,
      },
    ],
  },
  {
    number: "5",
    title: "Prawna Podstawa Przetwarzania",
    body: `Przetwarzamy Twoje Dane Osobowe wyłącznie wtedy, gdy mamy prawną podstawę zgodnie z RODO.`,
    subsections: [
      {
        title: "Zgoda",
        body: `Wyraźnie zgodziłeś się na Przetwarzanie dla wiadomości email marketingowych, biuletynów, nieistotnych plików cookie, użycia referencji, nagrań rozmów i opcjonalnych pól danych. Możesz wycofać zgodę w dowolnym momencie, anulując subskrypcję lub kontaktując się z nami.`,
      },
      {
        title: "Wykonanie Umowy",
        body: `Przetwarzanie jest niezbędne do wykonania umowy z Tobą lub podjęcia działań na Twoją prośbę przed zawarciem umowy. Dotyczy danych klienta, email, telefon, adres rozliczeniowy, materiałów projektowych, danych płatności i danych dostarczania usług.`,
      },
      {
        title: "Obowiązek Prawny",
        body: `Przetwarzanie jest wymagane do zgodności z obowiązującym prawem, w tym ewidencji podatkowych, danych księgowych, zapobiegania oszustwom i bezpieczeństwa publicznego.`,
      },
      {
        title: "Uzasadniony Interes",
        body: `Przetwarzanie jest niezbędne dla uzasadnionych interesów realizowanych przez Spółkę, w tym bezpieczeństwa witryny, zapobiegania oszustwom, analityki, ulepszeń doświadczenia użytkownika, marketingu (z oceną uzasadnionego interesu) i operacji biznesowych.`,
      },
      {
        title: "Interesy Życiowe",
        body: `Przetwarzanie jest niezbędne do ochrony interesów Życiowych (np. życie, bezpieczeństwo), zastosowane w sytuacjach awaryjnych i naruszeniach danych dotyczących Twojego bezpieczeństwa.`,
      },
    ],
  },
  {
    number: "6",
    title: "Jak Wykorzystujemy Twoje Dane Osobowe",
    body: `Wykorzystujemy Twoje Dane Osobowe do świadczenia usług (oferty, projektowanie, komunikacja, płatności, wsparcie), komunikacji i obsługi klienta (odpowiedzi na zapytania, wsparcie, emaile transakcyjne, powiadomienia), marketingu i promocji (za Twoją zgodą, prezentowanie projektów, referencje, materiały marketingowe), analityki witryny i ulepszeń (wzorce użytkowania, problemy techniczne, testy A/B, statystyki zagregowane), bezpieczeństwa i zapobiegania oszustwom, zgodności prawnej i operacji biznesowych.`,
  },
  {
    number: "7",
    title: "Przechowywanie Danych",
    body: `Przechowujemy Dane Osobowe tylko tak długo, jak jest to niezbędne do osiągnięcia celów, dla których zostały zebrane, chyba że dłuższy okres jest wymagany przez prawo.`,
    subsections: [
      {
        title: "Okresy Przechowywania",
        body: `Zapytania z Formularza Kontaktowego: 2 lata (chyba że przekonwertowane na klienta). Klienci Projektów: czas trwania projektu + 7 lat. Listy Marketingowe: do czasu anulowania subskrypcji, plus 2 lata dowodu anulowania. Analityka Witryny: 26 miesięcy (domyślne Google Analytics). Komunikacja E-mail: 2 lata lub czas trwania relacji biznesowej, w zależności od tego, co jest dłuższe. Ewidencje Płatności: 7 lat (wymagania przechowywania podatków w UK). Nagrania Rozmów: 1 rok. Dzienniki Serwerów i Dane IP: 90 dni.`,
      },
      {
        title: "Usunięcie",
        body: `Gdy Dane Osobowe nie są już niezbędne, bezpiecznie je usuwamy lub anonimizujemy. Możesz w dowolnym momencie zażądać usunięcia, z zastrzeżeniem wymogów przechowywania prawnego.`,
      },
    ],
  },
  {
    number: "8",
    title: "Udostępnianie i Ujawnianie Danych Osobowych",
    body: `Udostępniamy Twoje Dane Osobowe stronom trzecim wyłącznie za Twoją zgodą lub jeśli jest to konieczne do świadczenia usług.`,
    subsections: [
      {
        title: "Dostawcy Usług i Strony Trzecie",
        body: `Możemy ujawniać Dane Osobowe dostawcom hostingu, procesorom płatności (Stripe, PayPal itp.), dostawcom usług email (jeśli wyraziłeś zgodę na marketing), dostawcom analityki (Google Analytics), narzędziom komunikacyjnym, usługom profesjonalnym (księgowi, prawnicy, konsultanci) i magazynowi w chmurze. Wszyscy dostawcy usług są umownie zobowiązani do przetwarzania danych wyłącznie na nasze polecenie i utrzymywania poufności.`,
      },
      {
        title: "Obowiązki Prawne",
        body: `Możemy ujawniać Dane Osobowe, jeśli jest to wymagane przez prawo, postanowienie sądowe lub uzasadnione żądanie władz.`,
      },
      {
        title: "Transfer Biznesowy",
        body: `Jeśli Forsa Design zostanie przejęta, połączona lub restrukturyzowana, Dane Osobowe mogą zostać przeniesione w ramach tej transakcji. Powiadomimy Cię o wszelkich takich zmianach i Twoich prawach.`,
      },
      {
        title: "Brak Sprzedaży Danych",
        body: `Nie sprzedajemy, nie wynajmujemy ani nie wymieniamy Twoich Danych Osobowych stronom trzecim do celów marketingowych.`,
      },
    ],
  },
  {
    number: "9",
    title: "Międzynarodowe Transfery Danych",
    body: `Forsa Design przetwarza i przechowuje Dane Osobowe przede wszystkim w Wielkiej Brytanii i Unii Europejskiej. Jeśli Dane Osobowe są przenoszone poza Wielką Brytanię lub UE, zapewniamy odpowiednie zabezpieczenia (np. Standardowe Klauzule Umowne, decyzje o adekwatności) i że transfer jest konieczny do świadczenia usług. Masz prawo do sprzeciwienia się transferom poza Wielką Brytanię/UE.`,
  },
  {
    number: "10",
    title: "Pliki Cookie i Technologie Śledzenia",
    body: `Pliki cookie to małe pliki tekstowe przechowywane na Twoim urządzeniu, które pozwalają witrynom Cię rozpoznawać i zapamiętywać. Używamy niezbędnych plików cookie (funkcjonalność, bezpieczeństwo, zarządzanie sesją, nie wymagają zgody), plików cookie analityki (Google Analytics, wymagają zgody), plików cookie preferencji (motyw, język, nie wymagają zgody) i plików cookie marketingowych (ukierunkowana reklama, wymagają zgody). Dostawcy usług zewnętrznych mogą ustawiać własne pliki cookie. Przy pierwszej wizycie wyświetlamy baner zgody na pliki cookie. Możesz zaakceptować wszystkie, odrzucić nieistotne, dostosować preferencje lub zmienić zgodę w dowolnym momencie. Możesz wyłączyć pliki cookie w ustawieniach przeglądarki, ale może to wpłynąć na funkcjonalność.`,
  },
  {
    number: "11",
    title: "Twoje Prawa na Mocy RODO",
    body: `Jako Osoba Zainteresowana masz następujące prawa:`,
    subsections: [
      {
        title: "Prawo Dostępu",
        body: `Masz prawo do żądania dostępu do Twoich Danych Osobowych i informacji o tym, w jaki sposób je przetwarzamy. Udostępnimy to w ciągu 30 dni bez opłat.`,
      },
      {
        title: "Prawo do Sprostowania",
        body: `Masz prawo do poprawy niedokładnych lub niekompletnych Danych Osobowych.`,
      },
      {
        title: `Prawo do Usunięcia ("Prawo do Bycia Zapomnianym")`,
        body: `Masz prawo do żądania usunięcia Twoich Danych Osobowych, z wyjątkiem sytuacji, w których przetwarzanie jest konieczne do obowiązków prawnych, wykonania umowy, uzasadnione interesy przesłaniają Twoje prawa, lub dane są niezbędne do zapobiegania oszustwom lub bezpieczeństwa.`,
      },
      {
        title: "Prawo do Ograniczenia Przetwarzania",
        body: `Masz prawo do żądania ograniczenia sposobu przetwarzania Twoich danych podczas rozstrzygania sporu lub korzystania z innych praw.`,
      },
      {
        title: "Prawo do Przenośności Danych",
        body: `Masz prawo do otrzymania kopii Twoich Danych Osobowych w ustrukturyzowanym, powszechnie używanym, czytelnym dla maszyn formacie i do ich transmisji do innego administratora.`,
      },
      {
        title: "Prawo Sprzeciwu",
        body: `Masz prawo do sprzeciwienia się przetwarzaniu na podstawie uzasadnionego interesu, w tym do celów marketingowych. Zaprzestaniemy Przetwarzania, chyba że mamy uzasadnione racje.`,
      },
      {
        title: "Prawo do Złożenia Skargi",
        body: `Masz prawo do złożenia skargi do właściwego organu ochrony danych. Brytyjski Urząd Komisarza Informacji (ICO): www.ico.org.uk. Inne organy państw członkowskich UE: skontaktuj się ze swoim lokalnym organem ochrony danych.`,
      },
      {
        title: "Automatyczne Podejmowanie Decyzji",
        body: `Nie wykorzystujemy automatycznego podejmowania decyzji ani profilowania w celu podejmowania decyzji, które znacząco na Ciebie wpływają.`,
      },
    ],
  },
  {
    number: "12",
    title: "Prywatność Dzieci",
    body: `Nasza witryna i usługi nie są skierowane do dzieci poniżej 13 lat. Nie zbieramy świadomie Danych Osobowych od dzieci poniżej 13 lat. Jeśli dowiemy się, że dziecko dostarczyło Dane Osobowe, natychmiast je usuniemy. W przypadku dzieci w wieku 13–18 lat zgoda rodziców może być wymagana w zależności od jurysdykcji. Jeśli jesteś rodzicem lub opiekunem i uważasz, że Dane Osobowe Twojego dziecka zostały zebrane, prosimy o natychmiastowy kontakt.`,
  },
  {
    number: "13",
    title: "Bezpieczeństwo Danych",
    body: `Wdrażamy rozsądne techniczne, administracyjne i organizacyjne środki bezpieczeństwa w celu ochrony Danych Osobowych: szyfrowanie SSL/TLS dla danych przesyłanych, zaszyfrowane przechowywanie danych, ograniczony dostęp do danych osobowych, regularne oceny i aktualizacje bezpieczeństwa, zapory i systemy wykrywania włamań, bezpieczne polityki haseł i uwierzytelnianie wielofaktorowe.`,
    subsections: [
      {
        title: "Ograniczenia",
        body: `Chociaż wdrażamy odpowiednie środki bezpieczeństwa, żaden sposób transmisji przez Internet ani magazyn elektroniczny nie jest całkowicie bezpieczny. Nie możemy zagwarantować bezwzględnego bezpieczeństwa. Odpowiadasz za zachowanie hasła w poufności i zabezpieczenie Twoich danych logowania.`,
      },
      {
        title: "Powiadomienie o Naruszeniu Danych",
        body: `Jeśli odkryjemy naruszenie danych, które stwarzałoby ryzyko dla Twoich praw i wolności, będziemy: powiadamiać właściwy organ ochrony danych w ciągu 72 godzin (jeśli wymagane), powiadamiać osoby, których to dotyczy, bez zbędnej zwłoki, oraz dostarczać informacje na temat naruszenia i kroki, które możesz podjąć w celu ochrony siebie.`,
      },
    ],
  },
  {
    number: "14",
    title: "Linki Stron Trzecich i Usługi",
    body: `Nasza strona może zawierać linki do witryn, aplikacji i usług stron trzecich. Niniejsza Polityka Prywatności dotyczy wyłącznie naszej witryny i usług. Nie odpowiadamy za praktyki prywatności witryn stron trzecich. Usługi stron trzecich, z których korzystamy (Google Analytics, processory płatności, dostawcy hostingu), mają własne polityki prywatności.`,
  },
  {
    number: "15",
    title: "Partnerzy Biznesowi i Przetwarzanie Danych Klientów",
    body: `Jeśli jesteś klientem Forsa Design, przetwarzamy Dane Osobowe w Twoim imieniu do hostowania, konserwacji i obsługi witryny. Jako Administrator, odpowiadasz za: uzyskanie niezbędnych zgód od użytkowników końcowych, utrzymanie polityki prywatności dla Twojej witryny, i zgodność z RODO i obowiązującymi przepisami o ochronie danych. Jako Procesor, przetwarzamy dane wyłącznie zgodnie z Twoimi poleceniami. W przypadku projektów klientów obejmujących znaczące przetwarzanie Danych Osobowych zostanie wykonana oddzielna Umowa Przetwarzania Danych (DPA).`,
  },
  {
    number: "16",
    title: "Przechowywanie i Żądania Usunięcia",
    body: `Możesz zażądać usunięcia Twoich Danych Osobowych, kontaktując się z nami pod adresem hello@forsadesign.co.uk. Będziemy odpowiadać na żądania usunięcia w ciągu 30 dni, z wyjątkiem sytuacji, w których obowiązują wymogi przechowywania prawnego, przetwarzanie jest niezbędne do wykonania umowy, lub uzasadnione interesy przesłaniają Twoje żądanie. Jeśli masz konto lub profil u nas, możesz żądać całkowitego usunięcia konta. Spowoduje to usunięcie powiązanych Danych Osobowych, z wyjątkiem sytuacji, w których przechowywanie jest wymagane przez prawo.`,
  },
  {
    number: "17",
    title: "Komunikacja Marketingowa i Rezygnacja",
    body: `Możemy wysyłać emaile marketingowe, biuletyny lub materiały promocyjne wyłącznie za Twoją zgodą. Możesz zrezygnować z komunikacji marketingowej w dowolnym momencie: klikając link "Anuluj Subskrypcję" w każdym emailu, kontaktując się z nami bezpośrednio, lub aktualizując swoje preferencje na koncie. Będziemy honorować żądania anulowania subskrypcji w ciągu 10 dni roboczych. Nawet jeśli anulujesz subskrypcję marketingu, będziemy nadal wysyłać emaile transakcyjne (faktury, aktualizacje usług, powiadomienia o koncie), jeśli jest to konieczne.`,
  },
  {
    number: "18",
    title: "Zmiany w Niniejszej Polityce Prywatności",
    body: `Możemy okresowo aktualizować niniejszą Politykę Prywatności w celu odzwierciedlenia zmian w naszych praktykach, technologii, wymogach prawnych lub innych czynnikach. Ostatnia Aktualizacja: Czerwiec 2026. Data Wejścia w Życie Zmian: zaktualizowane Polityki Prywatności obowiązują po opublikowaniu na tej stronie. Będziemy Cię powiadamiać o istotnych zmianach za pośrednictwem emaila (jeśli podałeś adres email) lub publikując zawiadomienie na tej stronie. Dalsze korzystanie z naszej witryny lub usług po zmianach stanowi zaakceptowanie zaktualizowanej Polityki Prywatności.`,
  },
  {
    number: "19",
    title: "Skontaktuj Się z Nami",
    body: `W przypadku pytań, obaw lub skorzystania z Twoich praw na mocy RODO: Forsa Design, Art & Web Design, Banff, Szkocja. Email: hello@forsadesign.co.uk. Telefon: 07770110735. Czas Odpowiedzi: będziemy odpowiadać na wszystkie zapytania dotyczące prywatności w ciągu 30 dni. Skargi: jeśli nie jesteś zadowolony z naszej odpowiedzi, możesz złożyć skargę u Brytyjskiego Urzędu Komisarza Informacji (ICO) na stronie www.ico.org.uk.`,
  },
  {
    number: "20",
    title: "Tabela Podsumowania Podstaw Prawnych",
    body: `Dane z formularza kontaktowego: Zgoda + Umowa (zapytania o usługi). Dane klienta projektu: Umowa (świadczenie usług). Adres email: Zgoda (komunikacja marketingowa). Dane użytkowania witryny: Uzasadniony interes (analityka, ulepszenia). Adres IP, informacje o urządzeniu: Uzasadniony interes (bezpieczeństwo, zapobieganie oszustwom). Informacje o płatnościach: Umowa + Obowiązek prawny (przetwarzanie płatności). Referencje: Zgoda (marketing). Nagrania rozmów: Zgoda (ulepszanie usług). Pliki Cookie: Zgoda (pliki cookie niezbędne są wyłączone) dla funkcjonalności witryny i analityki.`,
  },
];
