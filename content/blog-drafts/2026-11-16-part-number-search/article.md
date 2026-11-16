---
status: published
prepared_at: 2026-11-16
published_at: 2026-11-16
slug_pl: wyszukiwarka-katalogu-b2b-numery-czesci
slug_en: b2b-catalogue-part-number-search
reading_time_min: 4
---

# PL: Wyszukiwarka w katalogu B2B: jak szukać po numerach części

**Zajawka:** Numery części, warianty i brak wyników wymagają jasnych reguł. Jak zaprojektować wyszukiwanie, które zachowuje znaczenie oznaczeń produktu.

Kupujący wpisuje oznaczenie ze starego zamówienia. Katalog zwraca kilkanaście podobnych produktów, ale nie pokazuje, czy którykolwiek ma dokładnie ten numer. To przykładowa sytuacja, od której warto zacząć projektowanie wyszukiwarki. Osobno trzeba obsłużyć osobę znającą numer części i osobę dopiero szukającą produktu o określonych parametrach.

Przed wyborem silnika wyszukiwania ustal, co oznaczają dane w katalogu. Numer producenta, symbol wewnętrzny, nazwa rodziny i opis zastosowania nie powinny być traktowane jak jedno pole. Każde pomaga odpowiedzieć na inne pytanie.

## Dokładny numer powinien mieć pierwszeństwo

Jeżeli zapytanie odpowiada pełnemu identyfikatorowi, pokaż dokładne dopasowanie w pierwszej kolejności i wyjaśnij, które pole się zgadza. Obok mogą pojawić się wyniki szersze, ale z odrębnym oznaczeniem. Podobieństwo tekstu nie potwierdza zgodności technicznej części.

Numer bywa unikalny tylko w obrębie producenta lub systemu źródłowego. Ustal więc, czy wyszukiwanie wymaga pary producent plus numer. Jeżeli dwa rekordy mają podobne oznaczenia, karta wyników powinna pokazać informację pozwalającą je rozróżnić, zamiast wymagać otwarcia każdego produktu.

## Nie usuwaj znaków bez reguły

Przykładowe, fikcyjne oznaczenia AB-010 i AB010 mogą wskazywać ten sam element, jeżeli tak definiuje je źródło danych. Mogą też być dwoma różnymi numerami. Nie należy zakładać równoważności wyłącznie dlatego, że usunięcie myślnika poprawia liczbę wyników.

To samo dotyczy zer na początku, ukośników i spacji. Zapisz dozwolone przekształcenia dla konkretnego pola, przetestuj je na zatwierdzonych rekordach i zachowaj oryginalne oznaczenie do wyświetlenia oraz wysłania zapytania. Traktowanie identyfikatora jak zwykłej liczby może zgubić istotną część zapisu.

## Parametry zawężają wybór, ale nie zastępują doboru

Gdy klient nie zna numeru, potrzebuje innej drogi: kategorii, materiału, wymiarów lub warunków zastosowania. Filtry powinny korzystać z uporządkowanych danych. Wyjaśnij jednostkę przy wartości i odróżnij brak informacji od wartości zero.

Wybrane filtry muszą pozostać widoczne i dawać się pojedynczo usunąć. Jeżeli wyników nie ma, pokaż, które ograniczenia są nadal aktywne. Sugestia podobnego produktu wymaga ostrożnej nazwy: „podobne oznaczenie” albo „wynik w tej kategorii” nie oznacza zatwierdzonego zamiennika.

## Brak wyników powinien zostawiać drogę do zapytania

Zachowaj wpisany tekst. Zaproponuj sprawdzenie producenta lub zdjęcie jednego filtra, jeśli taka możliwość rzeczywiście istnieje. Nie poprawiaj automatycznie numeru części tak, aby bez potwierdzenia prowadził do innego produktu.

Dodaj możliwość wysłania zapytania z zachowanym numerem i filtrami. Klient może dołączyć opis albo dokument przez odpowiednio przygotowany formularz. Handlowiec powinien otrzymać także oryginalne zapytanie, a nie tylko zmodyfikowaną wersję używaną przez wyszukiwarkę.

## Wynik musi pozostać zrozumiały na telefonie i bez myszy

Pole wyszukiwania potrzebuje etykiety opisującej jego cel. Przykład w pustym polu może pomagać, ale nie powinien zastępować etykiety. Sprawdź klawiaturą otwarcie wyników, zmianę filtrów i powrót do wcześniejszego zapytania.

Jeśli wyniki aktualizują się bez przeładowania strony, udostępnij czytnikowi ekranu krótki komunikat o stanie, na przykład liczbę znalezionych pozycji lub brak dopasowania. W3C rozróżnia taki komunikat od samej listy wyników. Nie trzeba przenosić fokusu ani automatycznie odczytywać całej listy przy każdej zmianie.

## Sprawdź reguły na małym zestawie rzeczywistych zapytań

Przed odbiorem przygotuj zatwierdzony zestaw przypadków: pełny numer, dopuszczalny wariant zapisu, fragment oznaczenia, numer nieistniejący oraz zapytanie wykluczone aktywnym filtrem. Dla każdego zapisz oczekiwany wynik i pole, które ma o nim zdecydować. Powtórz próby na telefonie.

Jeżeli katalog pokazuje informacje zależne od konta, sprawdź również dostęp po stronie API. Ukrycie pola w karcie wyników nie wystarcza, gdy odpowiedź nadal zawiera dane innej organizacji. Po zmianach w danych produktowych uruchom ten sam zestaw prób ponownie. Taki sprawdzian pozwala ocenić konkretną regułę, zamiast uznawać większą liczbę wyników za automatyczną poprawę.

## Powiązane artykuły i usługi

- [Katalog B2B bez koszyka](https://forsadesign.co.uk/pl/blog/katalog-b2b-bez-koszyka-kiedy-ma-sens/)
- [Formularz RFQ](https://forsadesign.co.uk/pl/blog/formularz-zapytania-ofertowego-dla-przemyslu/)
- [Dostępność katalogu B2B](https://forsadesign.co.uk/pl/blog/dostepny-katalog-i-formularz-b2b/)
- [Usługi Forsa Design](https://forsadesign.co.uk/pl/services/)

## Źródła

- [W3C WAI: Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C: Understanding Status Messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)

# EN: B2B catalogue search: getting part numbers right

**Excerpt:** Part numbers, variants and empty results need clear rules. Design catalogue search that preserves product identifiers and gives buyers a useful next step.

A buyer enters a reference from an earlier purchase order. The catalogue returns several similar products without showing whether any has that exact number. This is an example of a task worth testing before choosing a search engine. Someone who knows a part number needs a different route from someone still selecting a product by specification.

First establish what the catalogue data means. A manufacturer reference, an internal stock code, a product-family name and an application description should not be treated as one interchangeable field. Each supports a different question.

## Give an exact reference priority

Where a query matches a complete identifier, show the exact match first and explain which field matched. Broader results can follow with a separate description. Text similarity does not establish that two components are technically interchangeable.

A reference may be unique only within a manufacturer or source system. Decide whether a match needs both the manufacturer and its part number. Where records have similar identifiers, include enough context on each result to distinguish them without opening every product page.

## Do not discard characters without an agreed rule

Consider the fictional references AB-010 and AB010. They may identify the same item if the source data defines them as equivalent. They may also identify different items. Removing a hyphen should not establish equivalence simply because it produces more results.

Apply the same discipline to leading zeroes, slashes and spaces. Document permitted transformations for each field, test them against approved records and retain the original identifier for display and enquiries. Converting an identifier into a number can remove a meaningful part of its notation.

## Use specifications to narrow the choice

A buyer without a reference needs categories, materials, dimensions or application conditions. Build filters from structured data. Identify the unit beside a value and distinguish missing information from zero.

Keep selected filters visible and individually removable. When there are no results, show which restrictions remain active. Name suggestions carefully: a similar reference or a result in the same category is not an approved replacement component. Technical suitability still needs the appropriate assessment.

## An empty result should still offer a route forward

Retain the entered query. Offer a manufacturer check or removal of a filter where those options are genuinely available. Do not silently correct a part number so that it selects a different product.

Provide an enquiry route that carries over the reference and selected filters. Buyers can supply a description or document through a suitably designed form. The commercial team should receive the original query as well as any transformed value used internally by search.

## Keep the task usable on a phone and without a mouse

Give the search input a label describing its purpose. An example inside an empty field can help, but should not replace the label. Use a keyboard to test opening results, changing filters and returning to the previous query.

If results update without a page reload, make a short status message available to screen readers, such as the result count or the absence of a match. W3C distinguishes that message from the results list itself. There is no need to move focus or automatically announce the entire list after every update.

## Review the rules with a small set of actual queries

Before acceptance, agree a test set containing a complete reference, a permitted spelling variant, part of an identifier, a nonexistent reference and a query excluded by an active filter. Record the expected outcome and the field responsible for the match. Repeat the tasks on a phone.

If the catalogue contains account-specific information, test API access as well. Hiding a field in the result card is insufficient when the response still contains another organisation’s data. Re-run the agreed queries after changes to product data. This assesses defined matching rules rather than assuming that a larger results list is necessarily better.

## Related articles and services

- [A B2B catalogue without checkout](https://forsadesign.co.uk/en/blog/b2b-product-catalogue-without-checkout/)
- [An industrial RFQ form](https://forsadesign.co.uk/en/blog/useful-industrial-rfq-form/)
- [Accessible B2B catalogue journeys](https://forsadesign.co.uk/en/blog/accessible-b2b-catalogue-and-enquiry-forms/)
- [Forsa Design services](https://forsadesign.co.uk/en/services/)

## Sources

- [W3C WAI: Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/)
- [W3C: Understanding Status Messages (4.1.3)](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)
