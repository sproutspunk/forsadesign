import { useLanguage } from "@/contexts/LanguageContext";
export default function TrustBar() {
  const { language } = useLanguage();
  const labels =
    language === "pl"
      ? ["Wydajność", "Dostępność", "Bezpieczeństwo", "Techniczne SEO"]
      : ["Performance", "Accessibility", "Security", "Technical SEO"];
  return (
    <div className="mt-8">
      <ul
        aria-label={language === "pl" ? "Obszary kontroli jakości" : "Quality review areas"}
        className="flex flex-wrap justify-center gap-3"
      >
        {labels.map((label) => (
          <li
            key={label}
            className="rounded-md border border-primary/30 px-4 py-3 text-base text-foreground/80"
          >
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-foreground/70 text-center">
        {language === "pl"
          ? "Sprawdzamy działanie projektu w tych obszarach. Wyniki pomiarów zależą od badanej strony i warunków testu."
          : "We assess project behaviour in these areas. Measurement results depend on the page and test conditions."}
      </p>
    </div>
  );
}
