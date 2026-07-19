export interface QuoteOption {
  value: string;
  labelEn: string;
  labelPl: string;
  price: number;
}

export interface QuoteFeature {
  value: string;
  labelEn: string;
  labelPl: string;
  price: number;
}

export interface QuoteSection {
  id: string;
  titleEn: string;
  titlePl: string;
  type: "single" | "multiple" | "slider" | "toggle";
  options?: QuoteOption[];
  features?: QuoteFeature[];
  slider?: {
    min: number;
    max: number;
    step: number;
    pricePerUnit: number;
    unitLabelEn: string;
    unitLabelPl: string;
  };
  defaultValue?: string | string[] | number;
}

export interface DeliveryOption {
  value: string;
  labelEn: string;
  labelPl: string;
  multiplier: number;
}

export interface MaintenanceOption {
  value: string;
  labelEn: string;
  labelPl: string;
  monthlyPrice: number;
}

export interface PackagePreset {
  id: string;
  labelEn: string;
  labelPl: string;
  taglineEn: string;
  taglinePl: string;
  fromPrice: number;
  state: {
    projectType: string;
    design: string;
    content: string;
    logo: string;
    photography: string;
    seo: string;
    performance: string;
    hosting: string;
    maintenance: string;
    delivery: string;
    selectedFeatures: string[];
    additionalPages: number;
    discountPercent: number;
    multilangCount: number;
    apiCount: number;
  };
}

export const packagePresets: PackagePreset[] = [
  {
    id: "starter",
    labelEn: "Starter",
    labelPl: "Starter",
    taglineEn: "Perfect for new businesses",
    taglinePl: "Idealny dla nowych firm",
    fromPrice: 1200,
    state: {
      projectType: "landing",
      design: "template",
      content: "client",
      logo: "existing",
      photography: "client",
      seo: "none",
      performance: "standard",
      hosting: "client",
      maintenance: "none",
      delivery: "standard",
      selectedFeatures: ["contact-form"],
      additionalPages: 0,
      discountPercent: 0,
      multilangCount: 1,
      apiCount: 1,
    },
  },
  {
    id: "business",
    labelEn: "Business",
    labelPl: "Business",
    taglineEn: "Grow your online presence",
    taglinePl: "Rozwijaj swoją obecność online",
    fromPrice: 4000,
    state: {
      projectType: "small-business",
      design: "semi-custom",
      content: "ai-copy",
      logo: "simple",
      photography: "stock",
      seo: "basic",
      performance: "optimised",
      hosting: "managed",
      maintenance: "monthly",
      delivery: "standard",
      selectedFeatures: ["contact-form", "google-maps", "blog", "testimonials"],
      additionalPages: 2,
      discountPercent: 0,
      multilangCount: 1,
      apiCount: 1,
    },
  },
  {
    id: "premium",
    labelEn: "Premium",
    labelPl: "Premium",
    taglineEn: "Full-scale digital solution",
    taglinePl: "Pełne rozwiązanie cyfrowe",
    fromPrice: 8000,
    state: {
      projectType: "business",
      design: "fully-custom",
      content: "professional",
      logo: "professional",
      photography: "stock",
      seo: "professional",
      performance: "core-web",
      hosting: "managed",
      maintenance: "business",
      delivery: "priority",
      selectedFeatures: [
        "contact-form",
        "google-maps",
        "blog",
        "testimonials",
        "newsletter",
        "gdpr",
        "cookie",
        "analytics",
      ],
      additionalPages: 5,
      discountPercent: 0,
      multilangCount: 1,
      apiCount: 1,
    },
  },
];

export const projectTypes: QuoteOption[] = [
  { value: "landing", labelEn: "Landing Page", labelPl: "Strona docelowa", price: 1200 },
  {
    value: "one-page",
    labelEn: "One Page Website",
    labelPl: "Strona jednostronicowa",
    price: 1500,
  },
  {
    value: "small-business",
    labelEn: "Small Business Website (up to 5 pages)",
    labelPl: "Mała strona firmowa (do 5 stron)",
    price: 2500,
  },
  {
    value: "business",
    labelEn: "Business Website (6\u201315 pages)",
    labelPl: "Strona firmowa (6\u201315 stron)",
    price: 4000,
  },
  {
    value: "corporate",
    labelEn: "Corporate Website",
    labelPl: "Strona korporacyjna",
    price: 6500,
  },
  {
    value: "ecommerce",
    labelEn: "E-commerce Website",
    labelPl: "Sklep internetowy",
    price: 6000,
  },
  { value: "marketplace", labelEn: "Marketplace", labelPl: "Marketplace", price: 12000 },
  {
    value: "booking",
    labelEn: "Booking Website",
    labelPl: "Strona z rezerwacjami",
    price: 6500,
  },
  {
    value: "membership",
    labelEn: "Membership Website",
    labelPl: "Strona członkowska",
    price: 8000,
  },
  {
    value: "custom-app",
    labelEn: "Custom Web Application",
    labelPl: "Dedykowana aplikacja webowa",
    price: 10000,
  },
];

export const designOptions: QuoteOption[] = [
  {
    value: "template",
    labelEn: "Template Design",
    labelPl: "Design z szablonu",
    price: 0,
  },
  {
    value: "semi-custom",
    labelEn: "Semi Custom Design",
    labelPl: "Design częściowo na zamówienie",
    price: 900,
  },
  {
    value: "fully-custom",
    labelEn: "Fully Custom Design",
    labelPl: "Design w pełni na zamówienie",
    price: 2500,
  },
  {
    value: "premium-brand",
    labelEn: "Premium Brand Identity Design",
    labelPl: "Premium identyfikacja wizualna",
    price: 4500,
  },
];

export const contentOptions: QuoteOption[] = [
  {
    value: "client",
    labelEn: "Client provides content",
    labelPl: "Klient dostarcza treść",
    price: 0,
  },
  {
    value: "ai-copy",
    labelEn: "AI Assisted Copywriting",
    labelPl: "Copywriting wspomagany AI",
    price: 350,
  },
  {
    value: "professional",
    labelEn: "Professional Copywriting",
    labelPl: "Profesjonalny copywriting",
    price: 1200,
  },
];

export const logoOptions: QuoteOption[] = [
  { value: "existing", labelEn: "Existing logo", labelPl: "Istniejące logo", price: 0 },
  { value: "simple", labelEn: "Simple Logo", labelPl: "Proste logo", price: 350 },
  {
    value: "professional",
    labelEn: "Professional Brand Identity",
    labelPl: "Profesjonalna identyfikacja marki",
    price: 1500,
  },
];

export const photographyOptions: QuoteOption[] = [
  { value: "client", labelEn: "Client images", labelPl: "Zdjęcia klienta", price: 0 },
  {
    value: "stock",
    labelEn: "Premium Stock Images",
    labelPl: "Premium zdjęcia stockowe",
    price: 250,
  },
  {
    value: "professional",
    labelEn: "Professional Photography",
    labelPl: "Profesjonalna fotografia",
    price: 2000,
  },
];

export const features: QuoteFeature[] = [
  { value: "contact-form", labelEn: "Contact Form", labelPl: "Formularz kontaktowy", price: 180 },
  { value: "google-maps", labelEn: "Google Maps", labelPl: "Mapy Google", price: 120 },
  { value: "whatsapp", labelEn: "WhatsApp Chat", labelPl: "Czat WhatsApp", price: 120 },
  { value: "live-chat", labelEn: "Live Chat", labelPl: "Czat na żywo", price: 250 },
  { value: "blog", labelEn: "Blog", labelPl: "Blog", price: 450 },
  { value: "testimonials", labelEn: "Testimonials", labelPl: "Opinie klientów", price: 250 },
  { value: "portfolio", labelEn: "Portfolio", labelPl: "Portfolio", price: 350 },
  { value: "gallery", labelEn: "Gallery", labelPl: "Galeria", price: 250 },
  {
    value: "newsletter",
    labelEn: "Newsletter Integration",
    labelPl: "Integracja newslettera",
    price: 220,
  },
  { value: "cookie", labelEn: "Cookie Banner", labelPl: "Baner ciasteczek", price: 150 },
  { value: "gdpr", labelEn: "GDPR Setup", labelPl: "Konfiguracja GDPR", price: 300 },
  {
    value: "multilang",
    labelEn: "Multi-language",
    labelPl: "Wielojęzyczność",
    price: 850,
  },
  {
    value: "appointment",
    labelEn: "Appointment Booking",
    labelPl: "Rezerwacje terminów",
    price: 850,
  },
  {
    value: "online-booking",
    labelEn: "Online Booking System",
    labelPl: "System rezerwacji online",
    price: 1500,
  },
  {
    value: "membership",
    labelEn: "Membership Area",
    labelPl: "Strefa członkowska",
    price: 2200,
  },
  { value: "client-portal", labelEn: "Client Portal", labelPl: "Portal klienta", price: 3500 },
  {
    value: "user-dashboard",
    labelEn: "User Dashboard",
    labelPl: "Panel użytkownika",
    price: 3500,
  },
  {
    value: "customer-accounts",
    labelEn: "Customer Accounts",
    labelPl: "Konta klientów",
    price: 950,
  },
  { value: "wishlist", labelEn: "Wishlist", labelPl: "Lista życzeń", price: 450 },
  { value: "reviews", labelEn: "Product Reviews", labelPl: "Opinie o produktach", price: 350 },
  {
    value: "payment",
    labelEn: "Payment Gateway",
    labelPl: "Bramka płatności",
    price: 450,
  },
  { value: "stripe", labelEn: "Stripe Integration", labelPl: "Integracja Stripe", price: 450 },
  { value: "paypal", labelEn: "PayPal Integration", labelPl: "Integracja PayPal", price: 350 },
  { value: "apple-pay", labelEn: "Apple Pay", labelPl: "Apple Pay", price: 350 },
  { value: "google-pay", labelEn: "Google Pay", labelPl: "Google Pay", price: 350 },
  { value: "subscriptions", labelEn: "Subscriptions", labelPl: "Subskrypcje", price: 850 },
  {
    value: "advanced-search",
    labelEn: "Advanced Search",
    labelPl: "Zaawansowane wyszukiwanie",
    price: 700,
  },
  { value: "filtering", labelEn: "Filtering", labelPl: "Filtrowanie", price: 450 },
  {
    value: "live-search",
    labelEn: "Live Search",
    labelPl: "Wyszukiwanie na żywo",
    price: 350,
  },
  { value: "crm", labelEn: "CRM Integration", labelPl: "Integracja CRM", price: 1200 },
  { value: "erp", labelEn: "ERP Integration", labelPl: "Integracja ERP", price: 3000 },
  { value: "api", labelEn: "API Integration", labelPl: "Integracja API", price: 850 },
  {
    value: "email-automation",
    labelEn: "Email Automation",
    labelPl: "Automatyzacja email",
    price: 650,
  },
  { value: "sms", labelEn: "SMS Notifications", labelPl: "Powiadomienia SMS", price: 450 },
  { value: "push", labelEn: "Push Notifications", labelPl: "Powiadomienia push", price: 650 },
  { value: "pdf-gen", labelEn: "PDF Generation", labelPl: "Generowanie PDF", price: 450 },
  { value: "invoice", labelEn: "Invoice Generator", labelPl: "Generator faktur", price: 750 },
  { value: "quote-gen", labelEn: "Quote Generator", labelPl: "Generator wycen", price: 650 },
  { value: "calculator", labelEn: "Calculator", labelPl: "Kalkulator", price: 550 },
  { value: "chatbot", labelEn: "Chatbot", labelPl: "Chatbot", price: 950 },
  { value: "ai-assistant", labelEn: "AI Assistant", labelPl: "Asystent AI", price: 2500 },
  {
    value: "customer-login",
    labelEn: "Customer Login",
    labelPl: "Logowanie klienta",
    price: 650,
  },
  {
    value: "admin-dashboard",
    labelEn: "Admin Dashboard",
    labelPl: "Panel administracyjny",
    price: 3500,
  },
  {
    value: "analytics",
    labelEn: "Analytics Dashboard",
    labelPl: "Panel analityczny",
    price: 1500,
  },
];

export const seoOptions: QuoteOption[] = [
  { value: "none", labelEn: "No SEO", labelPl: "Bez SEO", price: 0 },
  { value: "basic", labelEn: "Basic SEO", labelPl: "Podstawowe SEO", price: 450 },
  {
    value: "professional",
    labelEn: "Professional SEO",
    labelPl: "Profesjonalne SEO",
    price: 1200,
  },
  { value: "advanced", labelEn: "Advanced SEO", labelPl: "Zaawansowane SEO", price: 2800 },
];

export const performanceOptions: QuoteOption[] = [
  { value: "standard", labelEn: "Standard", labelPl: "Standardowe", price: 0 },
  {
    value: "optimised",
    labelEn: "Performance Optimisation",
    labelPl: "Optymalizacja wydajności",
    price: 650,
  },
  {
    value: "core-web",
    labelEn: "Core Web Vitals Optimisation",
    labelPl: "Optymalizacja Core Web Vitals",
    price: 950,
  },
];

export const hostingOptions: QuoteOption[] = [
  { value: "client", labelEn: "Client Hosting", labelPl: "Hosting klienta", price: 0 },
  {
    value: "managed",
    labelEn: "Managed Hosting Setup",
    labelPl: "Zarządzany hosting",
    price: 250,
  },
  {
    value: "cloudflare",
    labelEn: "Cloudflare Setup",
    labelPl: "Konfiguracja Cloudflare",
    price: 250,
  },
];

export const maintenanceOptions: MaintenanceOption[] = [
  { value: "none", labelEn: "No Maintenance", labelPl: "Bez konserwacji", monthlyPrice: 0 },
  {
    value: "monthly",
    labelEn: "Monthly Care Plan",
    labelPl: "Miesięczny plan opieki",
    monthlyPrice: 95,
  },
  {
    value: "business",
    labelEn: "Business Care Plan",
    labelPl: "Biznesowy plan opieki",
    monthlyPrice: 180,
  },
  {
    value: "premium",
    labelEn: "Premium Care Plan",
    labelPl: "Premium plan opieki",
    monthlyPrice: 350,
  },
];

export const deliveryOptions: DeliveryOption[] = [
  {
    value: "standard",
    labelEn: "Standard (6\u201310 weeks)",
    labelPl: "Standard (6\u201310 tygodni)",
    multiplier: 0,
  },
  {
    value: "priority",
    labelEn: "Priority (4\u20136 weeks)",
    labelPl: "Priorytet (4\u20136 tygodni)",
    multiplier: 0.2,
  },
  {
    value: "fast",
    labelEn: "Fast Track (2\u20133 weeks)",
    labelPl: "Szybka ścieżka (2\u20133 tygodnie)",
    multiplier: 0.4,
  },
  {
    value: "express",
    labelEn: "Express (1\u20132 weeks)",
    labelPl: "Ekspres (1\u20132 tygodnie)",
    multiplier: 0.7,
  },
];

export const VAT_RATE = 0;

export const ADDITIONAL_PAGE_PRICE = 200;
export const MAX_ADDITIONAL_PAGES = 50;
