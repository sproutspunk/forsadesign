export const dachCase = {
  pl: {
    title: "Dach Systema: konfigurator garaży i hal 3D",
    intro:
      "Klient wybiera kształt, dach, wymiary i wyposażenie garażu lub hali. Zmiany widzi w podglądzie 3D. Może zapisać projekt i przygotować zapytanie ofertowe z wybranymi parametrami.",
    status: "Działający konfigurator 3D",
    caption:
      "Rzeczywisty zrzut rosyjskiej wersji konfiguratora, wykonany 16 listopada 2026 z aplikacji uruchomionej lokalnie z gałęzi projektu.",
    scope: "Zakres konfiguratora",
    features: [
      [
        "Cztery kroki",
        "Model i dach, wymiary, wyposażenie oraz podsumowanie projektu porządkują przejście od gotowego wariantu do własnej konfiguracji.",
      ],
      [
        "Bryła i wymiary",
        "Garaże i hale, bryły prostokątne, podcień oraz układy L/T/U mają reguły dostępnych dachów i wymiarów. Zakres wizualizacji nie jest potwierdzeniem możliwości produkcji.",
      ],
      [
        "Edycja wyposażenia",
        "Otwory i wiaty można rozmieszczać przy ścianach z kontrolą miejsca oraz kolizji. Podgląd obejmuje animacje bram, drzwi i okien, kolory i orientacyjne faktury materiałów.",
      ],
      [
        "Zapis i powrót do projektu",
        "Stan jest zapisywany w przeglądarce. Eksport i import JSON umożliwiają zachowanie konfiguracji; dostępne są też wydruk i zapis obrazu PNG.",
      ],
      [
        "Telefon i trzy języki",
        "Interfejs działa w PL, UA i RU. Na odpowiednio wysokim ekranie telefonu model pozostaje przypięty podczas edycji; przy małej wysokości ekranu ten tryb jest wyłączany.",
      ],
      [
        "Świadome zmiany",
        "Zmiana bryły z istniejącym wyposażeniem wymaga potwierdzenia. Użytkownik może zapisać projekt przed rozpoczęciem nowego układu.",
      ],
    ],
    decisions: "Od konfiguracji do zapytania",
    pricing:
      "Cena z migawki produktów jest pokazywana tylko dla zgodnego gotowego wariantu i danych młodszych niż 36 godzin. Podgląd nie odświeża cen automatycznie. Zmiany wymagają indywidualnej wyceny, zamiast zachowywać pozornie aktualną cenę bazowego produktu.",
    enquiry:
      "Podsumowanie zbiera parametry wybranego wariantu i przygotowuje wiadomość w aplikacji pocztowej klienta. Wysyłkę zatwierdza użytkownik; dalsze ustalenia techniczne i wycena odbywają się z dostawcą.",
    technology: "Technologia i model 3D",
    tech: "Konfigurator łączy komponenty CAD z interaktywnym modelem 3D. Wybór parametrów aktualizuje podgląd.",
    limits:
      "Model wspiera rozmowę o wymaganiach i przygotowanie zapytania. Możliwość wykonania, wymiary otworów i wykończenie potwierdza producent.",
    result: "Rezultat: wspólny punkt odniesienia do rozmowy technicznej",
    outcome:
      "Klient przekazuje wybraną konfigurację wraz z poglądowym modelem i zestawieniem parametrów. Zespół otrzymuje punkt wyjścia do rozmowy o wymiarach, wyposażeniu i warunkach wykonania. Zapis projektu pozwala wrócić do wcześniejszych ustaleń.",
    note: "Case study przedstawia zaimplementowane funkcje konfiguratora: wizualizację, dobór parametrów, zapis projektu i przygotowanie zapytania.",
    back: "Powrót do portfolio",
    cta: "Omów podobny konfigurator",
  },
  en: {
    title: "Dach Systema: a 3D garage and hall configurator",
    intro:
      "Customers choose the footprint, roof, dimensions and equipment for a garage or hall. The 3D preview updates as they make changes. They can save the design and prepare an enquiry with their chosen specifications.",
    status: "Working 3D configurator",
    caption:
      "An actual Russian-language interface capture, taken on 16 November 2026 from the application run locally from the project branch.",
    scope: "What the configurator includes",
    features: [
      [
        "Four steps",
        "Model and roof, dimensions, equipment and project review organise the journey from a preset to a custom configuration.",
      ],
      [
        "Footprint and dimensions",
        "Garages and halls, rectangular footprints, recesses and L/T/U layouts have rules governing available roofs and dimensions. The visualisation range does not confirm manufacturing feasibility.",
      ],
      [
        "Equipment placement",
        "Openings and canopies can be placed against walls with space and collision checks. The preview includes gate, door and window animations, colours and indicative material textures.",
      ],
      [
        "Save and return",
        "State is saved in the browser. JSON export and import preserve a configuration; printing and PNG image export are also available.",
      ],
      [
        "Mobile and three languages",
        "The interface supports Polish, Ukrainian and Russian. The model stays pinned during editing on sufficiently tall mobile screens; this mode is disabled when the viewport is too short.",
      ],
      [
        "Explicit changes",
        "Changing a footprint with existing equipment requires confirmation. Users can save their project before starting a new layout.",
      ],
    ],
    decisions: "From configuration to enquiry",
    pricing:
      "A product-snapshot price is displayed only for a matching preset and data less than 36 hours old. The preview does not refresh prices automatically. Changed configurations require an individual quotation rather than retaining an apparently current base-product price.",
    enquiry:
      "The summary collects the selected parameters and prepares a message in the customer's email application. The user authorises sending; technical details and quotation terms are then discussed with the supplier.",
    technology: "Technology and the 3D model",
    tech: "The configurator incorporates CAD components into an interactive 3D model. The preview updates as parameters change.",
    limits:
      "The model helps clarify requirements and prepare an enquiry. The manufacturer confirms feasibility, clear opening dimensions and finishes.",
    result: "The result: a shared reference for a technical discussion",
    outcome:
      "Customers can share the selected configuration with an indicative model and parameter summary. The team receives a starting point for discussing dimensions, equipment and manufacturing requirements. A saved project preserves the choices for later review.",
    note: "This case study presents implemented configurator features: visualisation, parameter selection, project saving and enquiry preparation.",
    back: "Back to portfolio",
    cta: "Discuss a similar configurator",
  },
};
export const dachImage = "/projects/dachsystema-configurator-ru.webp";
export const dachPath = (lang: "pl" | "en") => `/${lang}/case-studies/dachsystema/`;
export function dachSchema(lang: "pl" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: dachCase[lang].title,
    description: dachCase[lang].intro,
    inLanguage: lang,
    url: `https://forsadesign.co.uk${dachPath(lang)}`,
    image: `https://forsadesign.co.uk${dachImage}`,
    author: { "@type": "Organization", name: "Forsa Design" },
  };
}
