export interface PackagePreset {
  id: string;
  labelEn: string;
  labelPl: string;
  taglineEn: string;
  taglinePl: string;
  price: number;
  isFromPrice?: boolean;
  weeksEn: string;
  weeksPl: string;
  featuresEn: string[];
  featuresPl: string[];
}

export interface AddOn {
  value: string;
  labelEn: string;
  labelPl: string;
  price: number;
  perUnit?: boolean;
  // add-ons sharing a group are mutually exclusive (e.g. delivery speed tiers)
  group?: "delivery";
}

export interface MaintenanceOption {
  value: string;
  labelEn: string;
  labelPl: string;
  monthlyPrice: number;
  descriptionEn: string;
  descriptionPl: string;
}

export const packagePresets: PackagePreset[] = [
  {
    id: "starter",
    labelEn: "Starter",
    labelPl: "Starter",
    taglineEn: "For focused industrial sites",
    taglinePl: "Dla skoncentrowanych witryn przemysłowych",
    price: 7500,
    weeksEn: "6-8 weeks",
    weeksPl: "6-8 tygodni",
    featuresEn: [
      "5-7 pages",
      "SEO Foundation",
      "1 language",
      "Responsive design",
      "GDPR + Cookie Consent",
      "Contact form",
      "SSL (A+)",
      "PageSpeed 95+",
      "Cross-browser testing",
    ],
    featuresPl: [
      "5-7 stron",
      "Podstawy SEO",
      "1 język",
      "Responsywny design",
      "GDPR + zgoda na cookies",
      "Formularz kontaktowy",
      "SSL (A+)",
      "PageSpeed 95+",
      "Testy kompatybilności przeglądarek",
    ],
  },
  {
    id: "business",
    labelEn: "Business",
    labelPl: "Business",
    taglineEn: "Recommended for growing manufacturers",
    taglinePl: "Rekomendowany dla rozwijających się producentów",
    price: 15000,
    weeksEn: "8-10 weeks",
    weeksPl: "8-10 tygodni",
    featuresEn: [
      "10-15 pages",
      "SEO Professional",
      "2 languages (EN+PL)",
      "Responsive design",
      "GDPR + Compliance",
      "B2B Quote Form",
      "SSL (A+)",
      "PageSpeed 95+",
      "Cross-browser testing",
      "ERP Integration Ready",
    ],
    featuresPl: [
      "10-15 stron",
      "Profesjonalne SEO",
      "2 języki (EN+PL)",
      "Responsywny design",
      "GDPR + zgodność z przepisami",
      "Formularz wyceny B2B",
      "SSL (A+)",
      "PageSpeed 95+",
      "Testy kompatybilności przeglądarek",
      "Gotowość do integracji ERP",
    ],
  },
  {
    id: "premium",
    labelEn: "Premium",
    labelPl: "Premium",
    taglineEn: "Full-scale digital platform",
    taglinePl: "Pełna platforma cyfrowa",
    price: 25000,
    isFromPrice: true,
    weeksEn: "10-14 weeks",
    weeksPl: "10-14 tygodni",
    featuresEn: [
      "15+ pages / custom app",
      "SEO + Content Strategy",
      "3+ languages",
      "Full custom design",
      "Compliance + Audits",
      "B2B Portal",
      "ERP/CRM Integration",
      "Custom workflows",
      "Priority support",
    ],
    featuresPl: [
      "15+ stron / aplikacja dedykowana",
      "SEO + strategia treści",
      "3+ języki",
      "W pełni dedykowany design",
      "Zgodność z przepisami + audyty",
      "Portal B2B",
      "Integracja ERP/CRM",
      "Dedykowane procesy",
      "Priorytetowe wsparcie",
    ],
  },
];

export const addOns: AddOn[] = [
  {
    value: "extra-language",
    labelEn: "Additional language",
    labelPl: "Dodatkowy język",
    price: 850,
    perUnit: true,
  },
  {
    value: "photography",
    labelEn: "Professional industrial photography",
    labelPl: "Profesjonalna fotografia przemysłowa",
    price: 2000,
  },
  {
    value: "copywriting",
    labelEn: "Professional B2B copywriting",
    labelPl: "Profesjonalny copywriting B2B",
    price: 1200,
  },
  {
    value: "express-priority",
    labelEn: "Express Delivery — Priority (4-6 weeks)",
    labelPl: "Express Delivery — Priorytet (4-6 tygodni)",
    price: 2500,
    group: "delivery",
  },
  {
    value: "express-fasttrack",
    labelEn: "Express Delivery — Fast Track (2-3 weeks)",
    labelPl: "Express Delivery — Fast Track (2-3 tygodnie)",
    price: 5000,
    group: "delivery",
  },
];

export const maintenanceOptions: MaintenanceOption[] = [
  {
    value: "none",
    labelEn: "No Maintenance",
    labelPl: "Bez konserwacji",
    monthlyPrice: 0,
    descriptionEn: "30 days of support included with the project",
    descriptionPl: "30 dni wsparcia w cenie projektu",
  },
  {
    value: "business",
    labelEn: "Business Care Plan",
    labelPl: "Business Care Plan",
    monthlyPrice: 180,
    descriptionEn: "Security updates, backups, monitoring, email support",
    descriptionPl: "Aktualizacje bezpieczeństwa, kopie zapasowe, monitoring, wsparcie email",
  },
  {
    value: "premium",
    labelEn: "Premium Care Plan",
    labelPl: "Premium Care Plan",
    monthlyPrice: 350,
    descriptionEn:
      "Everything in Business, plus content updates, SEO monitoring, quarterly reviews, phone support",
    descriptionPl:
      "Wszystko z Business, plus aktualizacje treści, monitoring SEO, przeglądy kwartalne, wsparcie telefoniczne",
  },
];

export const VAT_RATE = 0;
