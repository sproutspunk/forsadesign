# Draft do akceptacji: wyszukiwanie po numerach części

Przygotowany 16 listopada 2026. Pełny tekst PL i EN: [article.md](article.md). [article.json](article.json) zawiera ten sam tekst i metadane.

Status: **draft**. Daty publikacji są puste. Szacowany czas czytania: 4 minuty, na podstawie dłuższej wersji przy 180 słowach/min.

Temat rozwija reguły dopasowania numerów, filtry i brak wyników. Sprawdzono 24 opublikowane tematy PL/EN, foldery redakcyjne w main i pięć otwartych PR-ów. Stary checkpoint PR #12 zawiera wcześniejsze artykuły; pozostałe PR-y dotyczą formatowania, plików społecznościowych i wdrożeń. Nie znaleziono draftu o tym samym głównym temacie.

Zalecenia projektowe są przedstawione jako zalecenia. Oznaczenia AB-010 i AB010 są wyraźnie fikcyjnym przykładem; tekst nie przedstawia ich jako rzeczywistych produktów lub zamienników. Nie zawiera klientów, wyników ani statystyk Forsa. Zalecenia dotyczące etykiet i komunikatów stanu sprawdzono w dokumentacji W3C. Szczególnie rozróżniono listę wyników od krótkiego komunikatu o wynikach, zgodnie z opisem WCAG 4.1.3.

Tekst napisano od podstaw; nie wykonano zewnętrznego skanowania antyplagiatowego. Nie stosowano em dash ani twierdzeń o skuteczności opartych na nieistniejących badaniach.

## Integracja po zatwierdzeniu

Dane strukturalne zapisano w odrębnych kolekcjach `articleDrafts` i `articleDraftsMeta` w plikach danych aplikacji. Kolekcje produkcyjne `articles` i `articlesMeta` pozostają bez zmian. Draft nie pojawia się w routingu, spisie, wyszukiwarce ani sitemap.

Po akceptacji trzeba ustawić rzeczywistą datę publikacji i przenieść rekord do kolekcji produkcyjnych. Linki powiązane są osobnym polem draftu; obecny renderer ma już sekcję źródeł i CTA usług/kontaktu, ale nie renderuje automatycznie pola `relatedLinks`. Przed publikacją należy dodać obsługę tych odnośników albo świadomie dopasować je do istniejącego renderowania. Następnie sprawdzić synchronizację metadanych, build i prerender.

Ten PR nie jest zgodą na scalenie ani publikację. Nie zmienia dat redakcyjnych istniejących artykułów.

## Walidacja draftu

TypeScript, lint, formatowanie i build/prerender przeszły. Zakończyło się powodzeniem 33 testów aplikacji i 5 testów statycznej obsługi Pages. Sprawdzono zgodność tekstu JSON z kolekcją draftów, synchronizację metadanych, puste daty publikacji, brak kolizji slugów, brak nowej trasy i wpisu w sitemap oraz 8 działających odnośników wewnętrznych. Opublikowane kolekcje nadal zawierają 24 artykuły.
