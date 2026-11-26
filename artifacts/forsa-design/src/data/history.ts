export const historyCopy = {
  en: {
    title: "History & Development",
    description:
      "Industrial experience since 2000. From machinery trading and international commerce to industrial digital solutions and 3D engineering.",
  },
  pl: {
    title: "Historia i rozwój",
    description:
      "Doświadczenie w przemyśle od 2000 roku. Od handlu maszynami i współpracy międzynarodowej do przemysłowych rozwiązań cyfrowych i inżynierii 3D.",
  },
};

export const historyMilestones: { date: string; en: string; pl: string }[] = [
  {
    date: "2000",
    en: "Industrial machinery and international trade. Our founder developed his experience through Techson in Poland, working with CNC machine tools, industrial equipment, procurement and technical sales. The business subsequently operated in Ukraine through APM Group Service.",
    pl: "Maszyny przemysłowe i handel międzynarodowy. Założyciel rozwijał doświadczenie w firmie Techson w Polsce, zajmując się obrabiarkami CNC, wyposażeniem przemysłowym, zakupami i sprzedażą techniczną. Działalność rozszerzono następnie na Ukrainę poprzez APM Group Service.",
  },
  {
    date: "2019",
    en: "Independent commercial activities, including research into international trade opportunities, supplier sourcing and assessment of commercial projects.",
    pl: "Niezależna działalność biznesowa, obejmująca analizę możliwości handlu międzynarodowego, pozyskiwanie dostawców i ocenę przedsięwzięć handlowych.",
  },
  {
    date: "2026",
    en: "Forsa Design combines industrial and commercial experience with digital technologies through the development of bespoke web systems, technical catalogues, API integrations and automation tools.",
    pl: "Forsa Design łączy doświadczenie przemysłowe i handlowe z technologiami cyfrowymi poprzez rozwój dedykowanych systemów webowych, katalogów technicznych, integracji API i narzędzi automatyzacji.",
  },
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
    date: "2026-11-24",
    en: "Development of interactive 3D product visualisation within an industrial catalogue.",
    pl: "Rozwój interaktywnej wizualizacji produktów 3D w katalogu przemysłowym.",
  },
  {
    date: "2026-11-26",
    en: "Development of a CAD-integrated parametric building configurator prototype with interactive 3D visualisation.",
    pl: "Rozwój prototypu parametrycznego konfiguratora obiektów z integracją CAD i interaktywną wizualizacją 3D.",
  },
];

export const historyPath = (lang: "en" | "pl") => `/${lang}/history/`;
