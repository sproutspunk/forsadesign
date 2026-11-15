---
status: draft
published_at: null
reading_time_min: 3
slug_pl: integracja-strony-z-erp-i-crm-zrodlo-danych
slug_en: website-erp-crm-integration-data-ownership
---

# PL — Integracja strony z ERP i CRM zaczyna się od właściciela danych

**Zajawka:** Połączenie systemów nie rozwiązuje samo problemu nieaktualnych informacji. Najpierw trzeba ustalić, skąd pochodzą dane, kto je zatwierdza i co dzieje się przy błędzie.

„Połączmy stronę z ERP” brzmi jak jedno zadanie. W praktyce może oznaczać publikację produktów, pobieranie stanów, przekazywanie zapytań lub synchronizację klientów. Każdy z tych procesów ma inne zasady i inny koszt pomyłki.

Zanim powstanie integracja, warto opisać jeden konkretny przepływ. Na przykład: zaakceptowana karta produktu trafia do katalogu, a zapytanie z tej karty tworzy zadanie w CRM. Taki opis pozwala ustalić odpowiedzialność bez obiecywania, że wszystkie systemy natychmiast będą wiedzieć wszystko.

## Jedno pole, jedno źródło rozstrzygające

Numer produktu może pochodzić z ERP, opis marketingowy z CMS, a dokumentacja z zatwierdzonego repozytorium. To rozsądny podział, jeżeli jest zapisany. Problem zaczyna się wtedy, gdy dwa systemy nadpisują to samo pole według różnych reguł.

Dla każdego pola ustal źródło, właściciela i dozwolony kierunek zmiany. Zmiana tytułu na stronie nie powinna przypadkiem zmieniać nazwy magazynowej w ERP. Dane wycofanego produktu też wymagają reguły: ukrycie, archiwizacja albo zastąpienie innym modelem.

## Identyfikatory są ważniejsze niż podobne nazwy

Łączenie rekordów po nazwie jest kruche. Nazwy bywają zmieniane, tłumaczone i skracane. Stabilny identyfikator powinien łączyć produkt, wariant, organizację lub zapytanie między systemami.

Trzeba również ustalić format jednostek, walut i wartości pustych. Brak stanu magazynowego nie powinien automatycznie oznaczać zera, jeżeli w rzeczywistości oznacza brak aktualnej odpowiedzi.

## Błąd jest częścią procesu

Integracja musi przewidywać niedostępne API, częściową odpowiedź i odrzucony rekord. Zaplanowane ponowienie operacji nie może tworzyć drugiego zapytania w CRM. W tym celu można stosować stabilny identyfikator operacji i wykrywanie duplikatów.

Operator potrzebuje czytelnego statusu: co się nie udało, jaki rekord dotyczy problemu i czy można ponowić operację. Logi nie powinny ujawniać haseł ani pełnej zawartości poufnych załączników.

## Aktualność musi być widoczna

Nie wszystkie dane wymagają synchronizacji w tej samej chwili. Opisy produktów mogą mieć inny rytm niż dostępność. Ustal akceptowalne opóźnienie oraz zachowanie strony, gdy ostatnia aktualizacja jest zbyt stara.

Zacznij od małego przepływu i przetestuj również jego awarię. Udana integracja to nie tylko poprawny pierwszy import. To proces, który firma potrafi zrozumieć, obserwować i naprawić.

**Powiązane:** [Integracje i systemy webowe](/pl/services/) · [Omówienie procesu](/pl/contact/)

# EN — Website integrations start with ownership of the data

**Excerpt:** Connecting a website to ERP or CRM does not automatically make its information reliable. First define where data comes from, who approves it and what happens when a transfer fails.

“Connect the website to ERP” can describe several different jobs: publishing products, retrieving stock, passing enquiries or synchronising customers. Each has different rules and a different consequence when something goes wrong.

Start by describing one flow. An approved product record becomes available in the catalogue; an enquiry from that page creates a CRM task. A specific process is easier to design and assess than a promise that every system will instantly share everything.

## Give each field a controlling source

ERP may own product references, the CMS may own editorial descriptions and a separate repository may hold approved documents. That division works when it is explicit. Problems arise when two systems overwrite the same field under different rules.

Define the source, owner and permitted direction of changes. Editing a website heading should not accidentally rename a stock item. Withdrawn products also need a rule: removal, archiving or a link to a replacement.

## Match records with stable identifiers

Names change, get translated and become abbreviated. Use stable identifiers to connect products, variants, organisations and enquiries across systems.

Agree units, currencies and the meaning of empty values. A missing stock response should not become zero if it actually means that current availability is unknown.

## Design the failure route

Expect unavailable APIs, partial responses and rejected records. Retrying a transfer must not create a second CRM enquiry. Stable operation identifiers and duplicate detection can help make retries safe.

The operator needs to see what failed, which record is affected and whether the operation can be retried. Logs should support diagnosis without exposing credentials or confidential attachments.

## Decide how current each value must be

Product descriptions and stock availability may need different update schedules. Define acceptable delay and what the website displays when its last successful update is too old.

Begin with a small flow and test its failure as well as its success. A useful integration is a process the business can monitor and recover, rather than just an import that worked once.

**Related:** [Web systems and integrations](/en/services/) · [Discuss your process](/en/contact/)
