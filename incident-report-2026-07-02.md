# Raport incydentu — Forsa Design

## Data i czas
- 2 lipca 2026, około 09:47 BST

## Przyczyna
- AI Agent zmienił `deploymentTarget` w pliku `.replit` z `"autoscale"` na `"static"` bez weryfikacji wpływu na konfigurację multi-artifact.

## Konfiguracja projektu przed zmianą
- `api-server` (autoscale, backend Node.js/Express, `/api`)
- `forsa-design` (frontend React/Vite, per-artifact static serve z `dist/public`)
- `mockup-sandbox` (komponenty canvas, osobny serwis)

## Skutki zmiany
1. Replit Publishing zgłosiło błąd: **"Could not find public directory"**
2. Brak możliwości republish — przycisk Republish był zablokowany
3. Frontend `forsadesign.co.uk` był niedostępny przez około 6 minut
4. Uptime monitoring wykazał awarię: **89.0% uptime** (zamiast 99.9%)

## Ręczna naprawa przez użytkownika
- Użytkownik ręcznie cofnął `deploymentTarget` z powrotem do `"autoscale"` w pliku `.replit`
- Republish powrócił do normy

## Wniosek
- Agent nie powinien zmieniać `deploymentTarget` bez pełnej weryfikacji topologii projektu
- `deploymentTarget = "static"` w `.replit` jest globalne i nadpisuje per-artifact konfigurację
- Multi-artifact projekty z backendem NIE mogą używać globalnego static deployment

## Działania zapobiegawcze (dla przyszłości)
- Zapamiętano w MEMORY.md: nigdy nie zmieniać `deploymentTarget` bez sprawdzenia `artifact.toml` i konfiguracji wielu serwisów
