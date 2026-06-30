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

export const projectTypes: QuoteOption[] = [
  { value: "landing", labelEn: "Landing Page", labelPl: "Strona docelowa", price: 700 },
  { value: "one-page", labelEn: "One Page Website", labelPl: "Strona jednostronicowa", price: 950 },
  {
    value: "small-business",
    labelEn: "Small Business Website (up to 5 pages)",
    labelPl: "Mała strona firmowa (do 5 stron)",
    price: 1600,
  },
  {
    value: "business",
    labelEn: "Business Website (6\u201315 pages)",
    labelPl: "Strona firmowa (6\u201315 stron)",
    price: 2700,
  },
  { value: "corporate", labelEn: "Corporate Website", labelPl: "Strona korporacyjna", price: 5000 },
  { value: "ecommerce", labelEn: "E-commerce Website", labelPl: "Sklep internetowy", price: 4500 },
  { value: "marketplace", labelEn: "Marketplace", labelPl: "Marketplace", price: 9500 },
  { value: "booking", labelEn: "Booking Website", labelPl: "Strona z rezerwacjami", price: 5500 },
  {
    value: "membership",
    labelEn: "Membership Website",
    labelPl: "Strona cz\u0142onkowska",
    price: 6500,
  },
  {
    value: "custom-app",
    labelEn: "Custom Web Application",
    labelPl: "Dedykowana aplikacja webowa",
    price: 8000,
  },
];

export const designOptions: QuoteOption[] = [
  { value: "template", labelEn: "Template Design", labelPl: "Design z szablonu", price: 0 },
  {
    value: "semi-custom",
    labelEn: "Semi Custom Design",
    labelPl: "Design cz\u0119\u015bciowo na zam\u00f3wienie",
    price: 900,
  },
  {
    value: "fully-custom",
    labelEn: "Fully Custom Design",
    labelPl: "Design w pe\u0142ni na zam\u00f3wienie",
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
    labelPl: "Klient dostarcza tre\u015b\u0107",
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
  { value: "existing", labelEn: "Existing logo", labelPl: "Istniej\u0105ce logo", price: 0 },
  { value: "simple", labelEn: "Simple Logo", labelPl: "Proste logo", price: 350 },
  {
    value: "professional",
    labelEn: "Professional Brand Identity",
    labelPl: "Profesjonalna identyfikacja marki",
    price: 1500,
  },
];

export const photographyOptions: QuoteOption[] = [
  { value: "client", labelEn: "Client images", labelPl: "Zdj\u0119cia klienta", price: 0 },
  {
    value: "stock",
    labelEn: "Premium Stock Images",
    labelPl: "Premium zdj\u0119cia stockowe",
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
  { value: "live-chat", labelEn: "Live Chat", labelPl: "Czat na \u017cywo", price: 250 },
  { value: "blog", labelEn: "Blog", labelPl: "Blog", price: 450 },
  { value: "testimonials", labelEn: "Testimonials", labelPl: "Opinie klient\u00f3w", price: 250 },
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
    labelPl: "Wieloj\u0119zyczno\u015b\u0107",
    price: 850,
  },
  {
    value: "appointment",
    labelEn: "Appointment Booking",
    labelPl: "Rezerwacje termin\u00f3w",
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
    labelPl: "Strefa cz\u0142onkowska",
    price: 2200,
  },
  { value: "client-portal", labelEn: "Client Portal", labelPl: "Portal klienta", price: 3500 },
  {
    value: "user-dashboard",
    labelEn: "User Dashboard",
    labelPl: "Panel u\u017cytkownika",
    price: 3500,
  },
  {
    value: "customer-accounts",
    labelEn: "Customer Accounts",
    labelPl: "Konta klient\u00f3w",
    price: 950,
  },
  { value: "wishlist", labelEn: "Wishlist", labelPl: "Lista \u017cycze\u0144", price: 450 },
  { value: "reviews", labelEn: "Product Reviews", labelPl: "Opinie o produktach", price: 350 },
  {
    value: "payment",
    labelEn: "Payment Gateway",
    labelPl: "Bramka p\u0142atno\u015bci",
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
    labelPl: "Wyszukiwanie na \u017cywo",
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
  { value: "customer-login", labelEn: "Customer Login", labelPl: "Logowanie klienta", price: 650 },
  {
    value: "admin-dashboard",
    labelEn: "Admin Dashboard",
    labelPl: "Panel administracyjny",
    price: 3500,
  },
  { value: "analytics", labelEn: "Analytics Dashboard", labelPl: "Panel analityczny", price: 1500 },
];

export const seoOptions: QuoteOption[] = [
  { value: "none", labelEn: "No SEO", labelPl: "Bez SEO", price: 0 },
  { value: "basic", labelEn: "Basic SEO", labelPl: "Podstawowe SEO", price: 450 },
  { value: "professional", labelEn: "Professional SEO", labelPl: "Profesjonalne SEO", price: 1200 },
  { value: "advanced", labelEn: "Advanced SEO", labelPl: "Zaawansowane SEO", price: 2800 },
];

export const performanceOptions: QuoteOption[] = [
  { value: "standard", labelEn: "Standard", labelPl: "Standardowe", price: 0 },
  {
    value: "optimised",
    labelEn: "Performance Optimisation",
    labelPl: "Optymalizacja wydajno\u015bci",
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
    labelPl: "Zarz\u0105dzany hosting",
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
    labelPl: "Miesi\u0119czny plan opieki",
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
    labelPl: "Szybka \u015bcie\u017cka (2\u20133 tygodnie)",
    multiplier: 0.4,
  },
  {
    value: "express",
    labelEn: "Express (1\u20132 weeks)",
    labelPl: "Ekspres (1\u20132 tygodnie)",
    multiplier: 0.7,
  },
];

export const VAT_RATE = 0.2;

export const ADDITIONAL_PAGE_PRICE = 180;
export const MAX_ADDITIONAL_PAGES = 50;
