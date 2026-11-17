import { useLanguage } from "@/contexts/LanguageContext";
import { openCookiePreferences } from "@/components/CookieConsent";
import { Mail, Phone, Linkedin } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background py-12 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <a href={`/${language}/`} className="mb-5 inline-block">
              <img
                src="/brand/forsa-logo-gradient.svg"
                alt="Forsa Design"
                width="1000"
                height="710"
                loading="lazy"
                decoding="async"
                className="h-auto w-40"
              />
            </a>
            <p className="text-foreground/60 font-light mb-2">{t("footer.tagline")}</p>
            <p className="text-foreground/60 font-light mb-4">{t("footer.location")}</p>
            <div className="space-y-2">
              <p className="text-sm text-foreground/50">
                {t("footer.contactPersonLabel")}:{" "}
                <span className="text-foreground/70">{t("footer.contactPerson")}</span>
              </p>
              <a
                href={`mailto:${t("footer.email")}`}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors w-fit"
                data-testid="footer-link-email"
              >
                <Mail size={14} /> {t("footer.email")}
              </a>
              <a
                href={`tel:${t("footer.phone")}`}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors w-fit"
                data-testid="footer-link-phone"
              >
                <Phone size={14} /> {t("footer.phone")}
              </a>
              <a
                href="https://www.linkedin.com/in/miroslaw-potaczek"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors w-fit"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>

          <nav
            aria-label={language === "pl" ? "Nawigacja w stopce" : "Footer navigation"}
            className="flex flex-col gap-3"
          >
            <h2 className="text-lg font-semibold">
              {language === "pl" ? "Na skróty" : "Quick links"}
            </h2>
            {[
              { href: `/${language}/#home`, label: t("nav.home") },
              { href: `/${language}/#pricing`, label: t("nav.pricing") },
              { href: `/${language}/#portfolio`, label: "Portfolio" },
              { href: `/${language}/#process`, label: t("nav.process") },
              { href: language === "pl" ? "/pl/o-nas/" : "/en/about/", label: t("nav.about") },
              { href: `/${language}/blog/`, label: "Blog" },
              { href: `/${language}/#contact`, label: t("nav.contact") },
              { href: `/${language}/#faq`, label: t("nav.faq") },
              { href: `/${language}/comparison/`, label: t("nav.comparison") },
              { href: `/${language}/quote`, label: t("nav.quote") },
              { href: `/${language}/pay`, label: t("nav.pay") },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors w-fit"
              >
                {label}
              </a>
            ))}
          </nav>
          <nav
            aria-label={language === "pl" ? "Usługi w stopce" : "Footer services"}
            className="flex flex-col gap-3"
          >
            <h2 className="text-lg font-semibold">{t("nav.services")}</h2>
            {[
              {
                href: `/${language}/services/#branding`,
                label:
                  language === "pl"
                    ? "Branding i identyfikacja wizualna"
                    : "Branding and visual identity",
              },
              {
                href: `/${language}/services/`,
                label: language === "pl" ? "Wszystkie usługi" : "All services",
              },
              {
                href: `/${language}/services/commercial-due-diligence/`,
                label: language === "pl" ? "Weryfikacja kontrahentów" : "Commercial due diligence",
              },
              {
                href: `/${language}/services/#industrial-websites`,
                label: language === "pl" ? "Strony dla przemysłu" : "Industrial websites",
              },
              {
                href: `/${language}/services/#b2b-e-commerce`,
                label: language === "pl" ? "E-commerce B2B" : "B2B e-commerce",
              },
              {
                href: `/${language}/services/#web-systems`,
                label: language === "pl" ? "Systemy webowe" : "Web systems",
              },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors w-fit"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-border/20 text-sm text-foreground/40 font-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <p className="text-center md:text-left">{t("footer.copyright")}</p>
          </div>
          <a
            href={`/${language}/terms`}
            className="hover:text-primary transition-colors mr-4 inline-block py-3 -my-2"
            data-testid="footer-link-terms"
          >
            {t("footer.terms")}
          </a>
          <a
            href={`/${language}/privacy`}
            className="hover:text-primary transition-colors mr-4 inline-block py-3 -my-2"
            data-testid="footer-link-privacy"
          >
            {t("footer.privacy")}
          </a>
          <button
            onClick={openCookiePreferences}
            className="hover:text-primary transition-colors inline-block py-3 -my-2"
            data-testid="footer-link-cookie-preferences"
          >
            {t("footer.cookiePreferences")}
          </button>
        </div>
      </div>
    </footer>
  );
}
