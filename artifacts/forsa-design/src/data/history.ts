export const historyCopy = {
  en: {
    title: "History & Development",
    description:
      "Documented milestones in the development of digital systems, industrial visualisation and 3D configuration at Forsa Design.",
  },
  pl: {
    title: "Historia i rozwój",
    description:
      "Udokumentowane etapy rozwoju systemów cyfrowych, wizualizacji przemysłowych i konfiguracji 3D w Forsa Design.",
  },
};

export const historyMilestones: { date: string; en: string; pl: string }[] = [
  {
    date: "2026-11-16",
    en: "Documentation of a bespoke service platform incorporating customer accounts, order management, quotations and documents.",
    pl: "Udokumentowanie projektu dedykowanej platformy usługowej obejmującej konta klientów, obsługę zamówień, wyceny i dokumentację.",
  },
  {
    date: "2026-11-17",
    en: "Development of industrial component visualisation based on technical documentation.",
    pl: "Rozwój wizualizacji komponentów przemysłowych na podstawie dokumentacji technicznej.",
  },
  {
    date: "2026-11-26",
    en: "Development of a CAD-integrated parametric building configurator prototype with interactive 3D visualisation.",
    pl: "Rozwój prototypu parametrycznego konfiguratora obiektów z integracją CAD i interaktywną wizualizacją 3D.",
  },
];

export const historyPath = (lang: "en" | "pl") => `/${lang}/history/`;
