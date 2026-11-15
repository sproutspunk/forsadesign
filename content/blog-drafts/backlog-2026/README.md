# Forsa Design — 14 artykułów do akceptacji

Pełne drafty: **14 tematów, 28 wersji językowych (PL i EN)**. Obejmują zaległości tematyczne po ostatnim wpisie z 7 sierpnia 2026, czyli 14 tygodni do 13 listopada. To zakres redakcyjny, nie daty publikacji. Wszystkie teksty mają status `draft` i `published_at: null`. Nie zostały opublikowane na blogu.

## Przegląd tekstów

Każdy plik zawiera tytuł, zajawkę, proponowane slugi, pełny tekst PL i EN, linki wewnętrzne i — tam, gdzie są przydatne — źródła. Czas czytania jest szacunkiem według 180 słów/min, zaokrąglonym w górę dla dłuższej wersji językowej.

| Nr | Artykuł — pełne PL i EN | Czytanie |
|---|---|---|
| 01 | [Czy Twoja strona przechodzi weryfikację dostawcy?](01-procurement-ready-website.md) | 3 min |
| 02 | [Katalog B2B bez koszyka. Kiedy to lepszy wybór?](02-catalogue-without-checkout.md) | 3 min |
| 03 | [Formularz RFQ, po którym da się przygotować ofertę](03-useful-rfq-form.md) | 3 min |
| 04 | [PDF na stronie to za mało. Jak uporządkować dokumentację techniczną?](04-technical-documentation.md) | 3 min |
| 05 | [Ceny w katalogu B2B: pokazać, ukryć czy wyjaśnić?](05-b2b-pricing.md) | 3 min |
| 06 | [Integracja strony z ERP i CRM zaczyna się od właściciela danych](06-erp-crm-integration.md) | 3 min |
| 07 | [Wielojęzyczna strona przemysłowa to więcej niż tłumaczenie](07-multilingual-industrial-website.md) | 3 min |
| 08 | [Konfigurator produktu czy dobry formularz zapytania?](08-product-configurator.md) | 3 min |
| 09 | [Dostępność katalogu B2B sprawdza się przy konkretnym zadaniu](09-accessible-industrial-catalogue.md) | 3 min |
| 10 | [Co powinien wiedzieć zagraniczny kupiec przed wysłaniem zapytania?](10-export-enquiries.md) | 2 min |
| 11 | [„Dostępny” w katalogu B2B: co właściwie obiecujesz?](11-stock-and-lead-times.md) | 2 min |
| 12 | [Przekazanie strony: czy firma potrafi przejąć jej obsługę?](12-website-handover.md) | 3 min |
| 13 | [Formularz zapytania B2B: mniej spamu, bezpieczniejsze załączniki](13-enquiry-form-security.md) | 3 min |
| 14 | [Animacja na stronie B2B: efekt, który daje się zatrzymać](14-motion-with-user-control.md) | 3 min |

## Proponowany początek

W pierwszej kolejności polecam 01 (weryfikacja dostawcy), 03 (formularz RFQ) i 02 (katalog bez koszyka). To konkretne problemy kupca i dobry punkt wyjścia do rozmowy o usługach Forsa Design. Pozostałe teksty rozwijają te tematy bez wymyślonych wyników, klientów ani referencji.

## Akceptacja i publikacja

Można zaakceptować cały pakiet albo wskazać numery tekstów i poprawki. Po akceptacji potrzebne będzie przeniesienie treści do `articlesData.ts`, synchronizacja `articlesMeta.ts`, sprawdzenie linków w rendererze, build/prerender i kontrola stron PL/EN. Obecny renderer artykułów nie interpretuje linków Markdown — nie należy przenosić ich jako surowego tekstu bez dopasowania renderowania.

Data zostanie nadana według faktycznej publikacji. Uzupełnienie zaległości nie oznacza wstecznego datowania. Ten PR zawiera wyłącznie dokumenty redakcyjne; nie zmienia bloga produkcyjnego, sitemap ani aplikacji.

## Kolejne tygodnie

Włączona automatyzacja przygotowuje jeden nowy draft PL/EN w poniedziałki rano, około 08:00 czasu Europe/London. Przed wyborem tematu sprawdza blog i otwarte drafty. Każdy kolejny tekst wymaga akceptacji; automatyzacja nie ma publikować ani scalać zmian bez odrębnego zatwierdzenia.

## Sprawdzenie pakietu

Sprawdzono kompletność 14 par językowych, unikalność proponowanych slugów względem obecnego bloga, brak nadanych dat publikacji, długości tekstów oraz istnienie wewnętrznych tras usług i kontaktu. Metadane i liczby słów zapisano w [manifest.json](manifest.json). Nie uruchamiano testów aplikacji dla zmian obejmujących wyłącznie dokumenty.
