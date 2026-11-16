# Forsa Design: pakiet 14 artykułów PL/EN

Użytkownik zatwierdził poprawienie i publikację całego pakietu. Data publikacji: 2026-11-15, bez datowania wstecz. Teksty uzupełniają 14 zaległych tematów po wpisie z 7 sierpnia 2026.

## Pełne teksty

| Nr  | Artykuł PL/EN                                                                                         | Czytanie |
| --- | ----------------------------------------------------------------------------------------------------- | -------- |
| 01  | [Czy Twoja strona przechodzi weryfikację dostawcy?](01-procurement-ready-website.md)                  | 3 min    |
| 02  | [Katalog B2B bez koszyka. Kiedy to lepszy wybór?](02-catalogue-without-checkout.md)                   | 3 min    |
| 03  | [Formularz RFQ, po którym da się przygotować ofertę](03-useful-rfq-form.md)                           | 3 min    |
| 04  | [PDF na stronie to za mało. Jak uporządkować dokumentację techniczną?](04-technical-documentation.md) | 3 min    |
| 05  | [Ceny w katalogu B2B: pokazać, ukryć czy wyjaśnić?](05-b2b-pricing.md)                                | 3 min    |
| 06  | [Integracja strony z ERP i CRM zaczyna się od właściciela danych](06-erp-crm-integration.md)          | 2 min    |
| 07  | [Wielojęzyczna strona przemysłowa to więcej niż tłumaczenie](07-multilingual-industrial-website.md)   | 2 min    |
| 08  | [Konfigurator produktu czy dobry formularz zapytania?](08-product-configurator.md)                    | 2 min    |
| 09  | [Dostępność katalogu B2B sprawdza się przy konkretnym zadaniu](09-accessible-industrial-catalogue.md) | 2 min    |
| 10  | [Co powinien wiedzieć zagraniczny kupiec przed wysłaniem zapytania?](10-export-enquiries.md)          | 2 min    |
| 11  | [„Dostępny” w katalogu B2B: co właściwie obiecujesz?](11-stock-and-lead-times.md)                     | 2 min    |
| 12  | [Przekazanie strony: czy firma potrafi przejąć jej obsługę?](12-website-handover.md)                  | 2 min    |
| 13  | [Formularz zapytania B2B: mniej spamu, bezpieczniejsze załączniki](13-enquiry-form-security.md)       | 2 min    |
| 14  | [Animacja na stronie B2B: efekt, który daje się zatrzymać](14-motion-with-user-control.md)            | 2 min    |

## Zakres redakcji i weryfikacji

Usunięto uogólnienia przedstawiające zachowania kupców jako ustalone fakty. Scenariusze są przykładami, a wskazówki projektowe zaleceniami, bez obietnic wzrostu sprzedaży, wymyślonych statystyk, klientów lub realizacji. Zmieniono powtarzalne zakończenia i usunięto em dash z nowych tekstów.

Sprawdzono w dokumentacji źródłowej zalecenia dotyczące etykiet i błędów formularzy (W3C), obsługi plików i walidacji na serwerze (OWASP), wzajemnych odnośników hreflang (Google), ograniczenia ruchu i pauzy (web.dev, W3C) oraz kopii zapasowych (NCSC). Odnośnik NCSC z pierwotnego draftu prowadził do szerszego przewodnika; zastąpiono go właściwą stroną o kopiach. Źródła znajdują się w odpowiednich artykułach i są renderowane jako linki także w statycznym HTML. Porady biznesowe są zaleceniami redakcyjnymi, nie wynikami badań.

Teksty napisano od podstaw. Nie przeprowadzono zewnętrznego skanowania antyplagiatowego; nie należy deklarować wyniku takiej kontroli ani braku autorstwa AI. Interpunkcja nie potwierdza sposobu powstania tekstu.

Dane produkcyjne znajdują się w articlesData.ts i articlesMeta.ts. [Manifest](manifest.json) zawiera slugi, zajawki, źródła oraz rzeczywiste liczby słów. Czas czytania oszacowano według 180 słów/min dla dłuższej wersji językowej.

Kolejne cotygodniowe teksty nadal powstają jako drafty do akceptacji, w poniedziałki około 08:00 Europe/London. Zgoda na publikację tego pakietu nie zmienia tej zasady.

## Walidacja wydania

Build i prerender zakończyły się powodzeniem. TypeScript bez błędów; 30 testów aplikacji i 5 testów obsługi statycznych zasobów przeszło. Sprawdzono zgodność 24 wpisów między danymi a metadanymi oraz kompletność 28 nowych stron: treść, datę, canonical, hreflang, obecność w spisie bloga i sitemap oraz klikalne źródła. W nowych tekstach nie ma em dash ani surowych znaczników Markdown.

## Chronologia redakcyjna

Na prośbę użytkownika 14 zaległych tematów otrzymało tygodniowe daty redakcyjne od 14 sierpnia do 13 listopada 2026. Blog sortuje wpisy według tych dat i oznacza je jako daty redakcyjne. Rzeczywista publikacja 15 listopada pozostaje zapisana osobno w `publishedDateIso` oraz danych strukturalnych. Chronologia nie stanowi deklaracji historycznych publikacji.
