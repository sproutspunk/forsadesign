---
status: published
published_at: 2026-11-15
reading_time_min: 2
slug_pl: bezpieczenstwo-formularza-b2b-i-zalacznikow
slug_en: secure-b2b-enquiry-forms-and-attachments
---

# PL: Formularz zapytania B2B: mniej spamu, bezpieczniejsze załączniki

**Zajawka:** Publiczny formularz przyjmuje dane od nieznanych osób. Ochrona musi obejmować serwer, pliki, wysyłkę i obsługę błędów, a nie tylko dodatkowe pole w przeglądarce.

Formularz ofertowy bywa traktowany jak prosty dodatek do strony. W praktyce może przekazywać dane do skrzynki, CRM i magazynu plików. Każdy z tych etapów wymaga ustalenia, co system przyjmuje i komu daje do tego dostęp.

Celem jest ograniczenie nadużyć przy zachowaniu wygody prawdziwych klientów. Jedna kontrolka przeciw botom nie zastępuje sprawdzania danych ani bezpiecznej obsługi dokumentów.

## Walidacja musi działać na serwerze

Pola w przeglądarce pomagają wpisać prawidłową treść, lecz można ominąć ich ograniczenia. Serwer powinien sprawdzać typ, długość i format danych oraz przyjmować tylko oczekiwane pola.

Dane klienta nie mogą swobodnie sterować odbiorcą wiadomości ani nagłówkami poczty. Przy wyświetlaniu treści stosuj kodowanie odpowiednie do kontekstu, a w zapytaniach SQL parametryzację. Walidacja danych nie zastępuje tych zabezpieczeń ani sprawdzania uprawnień. Uprawnienia integracji powinny ograniczać się do zadania formularza.

## Załącznik to osobny obszar kontroli

Ustal dozwolone typy i wielkości plików. Sama końcówka nazwy nie potwierdza zawartości, a nazwa przesłana przez klienta nie powinna wyznaczać ścieżki zapisu. Pliki należy przechowywać tak, aby nie mogły uruchamiać się jako część aplikacji.

W zależności od ryzyka potrzebne mogą być dodatkowe kontrole, w tym skanowanie. Dostęp do poufnych rysunków musi wynikać z uprawnień, nie z nadziei, że nikt nie odgadnie publicznego adresu. Warto ustalić też czas przechowywania i sposób usuwania.

## Ogranicz automatyczne nadużycia warstwowo

Limity liczby i rozmiaru zgłoszeń chronią zasoby. Dodatkowe sygnały, takie jak pole pułapka lub mechanizm weryfikacji, mogą pomagać odróżniać nadużycia od normalnego ruchu. Ich wynik trzeba sprawdzać po stronie serwera zgodnie z wybranym rozwiązaniem.

Zbyt agresywna blokada może utrudnić wysłanie ważnego zapytania. Zapewnij czytelny komunikat i alternatywną drogę kontaktu. Nie ujawniaj szczegółów wewnętrznej konfiguracji w odpowiedzi błędu.

## Potwierdzaj rzeczywisty wynik

Komunikat „wysłano” powinien oznaczać, że serwer przyjął zgłoszenie w uzgodnionym procesie. Nie wolno wyświetlać sukcesu tylko dlatego, że użytkownik nacisnął przycisk. Nie oznacza on również automatycznie, że handlowiec już przeczytał wiadomość.

Monitoruj błędy przekazania i odrzucenia. Logi mają umożliwiać znalezienie problemu bez zbierania zbędnych danych osobowych i treści poufnych dokumentów. Właściciel formularza powinien wiedzieć, kto reaguje, gdy zgłoszenia przestają docierać.

**Powiązane:** [Systemy i integracje](/pl/services/) · [Kontakt](/pl/contact/)

# EN: Protecting B2B enquiry forms and their attachments

**Excerpt:** A public form accepts information from unknown visitors. Protection needs to cover the server, uploads, delivery and error handling, rather than relying on one browser control.

An enquiry form may pass information to email, CRM and file storage. Each stage needs clear rules about accepted content and access. The aim is to limit abuse while keeping legitimate enquiries practical.

A bot check can be one useful layer. It cannot replace input validation or safe document handling.

## Validate on the server

Browser controls help visitors enter suitable information, but their restrictions can be bypassed. The server should check types, lengths and formats, and accept only expected fields.

Submitted values should not freely determine email recipients or headers. Use context-appropriate output encoding when displaying content and parameterised queries for SQL. Input validation does not replace those controls or authorisation checks. Give integrations only the permissions needed for the form's task.

## Treat uploads as a separate concern

Define allowed file types and sizes. An extension alone does not establish content, and a customer-supplied filename should not control the storage path. Store documents so they cannot execute as application code.

Additional checks, including scanning, may be appropriate to the risk. Access to confidential drawings must depend on permissions rather than an obscure public URL. Define retention and deletion arrangements as well.

## Limit automated abuse in layers

Submission and size limits help protect resources. Other signals, such as a honeypot or verification mechanism, can help distinguish abuse from ordinary traffic. Validate the result on the server as required by the chosen system.

An aggressive block can also prevent a genuine enquiry. Provide a useful message and another contact route. Error responses should not disclose internal configuration details.

## Confirm the actual outcome

A success message should mean that the server accepted the submission into the agreed process, rather than merely that a button was pressed. It does not mean that a salesperson has already read it.

Monitor delivery failures and rejected requests. Logs should help diagnosis without unnecessarily collecting personal information or confidential document contents. Assign someone to respond when enquiries stop arriving.

**Related:** [Web systems and integrations](/en/services/) · [Contact](/en/contact/)

## Źródła / Sources

- [OWASP: File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [OWASP: Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
