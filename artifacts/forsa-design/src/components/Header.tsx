import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

type DropdownKey = "services" | "work" | "about" | null;

export default function Header() {
  const { language, syncLanguage, t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const base = `/${language}/`;
  const isHomePage = location === `/${language}/` || location === `/${language}`;
  const sectionHref = (hash: string) => (isHomePage ? hash : `${base}${hash}`);
  const quoteHref = `${base}quote`;
  const aboutHref = language === "pl" ? "/pl/o-nas/" : "/en/about/";
  const blogHref = `${base}blog/`;
  const servicesHref = `${base}services/`;
  const workLinks = [
    { label: language === "pl" ? "Proces" : "Process", href: sectionHref("#process") },
    { label: "FAQ", href: sectionHref("#faq") },
    { label: language === "pl" ? "Porównanie" : "Comparison", href: `${base}comparison/` },
  ];
  const serviceLinks = [
    {
      label: language === "pl" ? "Strony dla przemysłu" : "Industrial websites",
      href: `${servicesHref}#industrial-websites`,
    },
    {
      label: language === "pl" ? "E-commerce B2B" : "B2B e-commerce",
      href: `${servicesHref}#b2b-e-commerce`,
    },
    {
      label: language === "pl" ? "Systemy webowe" : "Web systems",
      href: `${servicesHref}#web-systems`,
    },
  ];
  const aboutLinks = [
    { label: language === "pl" ? "O nas" : "About us", href: aboutHref },
    { label: "Blog", href: blogHref },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const switchLang = (lang: "en" | "pl") => {
    syncLanguage(lang);
    let newPath = location.replace(/^\/(en|pl)/, `/${lang}`);
    if (lang === "pl" && /\/about\/?$/.test(newPath))
      newPath = newPath.replace(/\/about\/?$/, "/o-nas/");
    if (lang === "en" && /\/o-nas\/?$/.test(newPath))
      newPath = newPath.replace(/\/o-nas\/?$/, "/about/");
    setLocation(newPath || `/${lang}/`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    mobileNavRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleDropdown = (key: Exclude<DropdownKey, null>) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const dropdownButton = (key: Exclude<DropdownKey, null>, label: string, mobile = false) => (
    <button
      type="button"
      onClick={() => toggleDropdown(key)}
      aria-expanded={openDropdown === key}
      aria-controls={`${mobile ? "mobile-" : "desktop-"}${key}-menu`}
      className={
        mobile
          ? "flex w-full items-center justify-between py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
          : "flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
      }
      data-testid={`btn-nav-${key}${mobile ? "-mobile" : ""}`}
    >
      {label}
      <ChevronDown
        size={mobile ? 18 : 14}
        className={`transition-transform ${openDropdown === key ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
    </button>
  );

  const dropdownLinks = (
    key: Exclude<DropdownKey, null>,
    links: { label: string; href: string }[],
    mobile = false,
  ) => (
    <div
      id={`${mobile ? "mobile-" : "desktop-"}${key}-menu`}
      hidden={openDropdown !== key}
      className={
        mobile
          ? "ml-3 flex flex-col gap-2 border-l border-primary/30 pl-4 pb-2"
          : "absolute left-0 top-full z-50 mt-3 min-w-56 rounded-sm border border-border/30 bg-card p-2 shadow-lg"
      }
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={mobile ? closeMobileMenu : () => setOpenDropdown(null)}
          className={
            mobile
              ? "py-2 text-base text-foreground/80 hover:text-primary transition-colors"
              : "block rounded-sm px-3 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
          }
        >
          {link.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {language === "pl" ? "Przejdź do treści" : "Skip to main content"}
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto flex items-center gap-6 px-6">
          <a
            href={sectionHref("#home")}
            data-testid="link-logo"
            className="flex shrink-0 items-center"
          >
            <img
              src="/logo-header.webp?v=9"
              alt="Forsa Design"
              width="160"
              height="132"
              loading="eager"
              fetchPriority="low"
              decoding="async"
              className="h-11 w-auto object-contain"
            />
          </a>

          <nav
            aria-label={language === "pl" ? "Główna nawigacja" : "Main navigation"}
            className="hidden min-w-0 flex-1 items-center justify-center gap-6 md:flex"
          >
            <a
              href={sectionHref("#home")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </a>
            <div className="relative">
              {dropdownButton("services", t("nav.services"))}
              {dropdownLinks("services", serviceLinks)}
            </div>
            <a
              href={sectionHref("#pricing")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </a>
            <div className="relative">
              {dropdownButton("work", language === "pl" ? "Jak pracujemy" : "How we work")}
              {dropdownLinks("work", workLinks)}
            </div>
            <div className="relative">
              {dropdownButton("about", language === "pl" ? "O nas" : "About")}
              {dropdownLinks("about", aboutLinks)}
            </div>
            <a
              href={sectionHref("#contact")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-5 md:flex">
            <a
              href={quoteHref}
              data-testid="link-nav-quote"
              className="rounded-sm bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("nav.quote")}
            </a>
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              aria-label={language === "pl" ? "Wybór języka" : "Language selector"}
            >
              <a
                href="/en/"
                hrefLang="en"
                onClick={(event) => {
                  event.preventDefault();
                  switchLang("en");
                }}
                className={
                  language === "en" ? "text-primary" : "text-foreground/60 hover:text-foreground"
                }
              >
                EN
              </a>
              <span className="text-foreground/30" aria-hidden="true">
                |
              </span>
              <a
                href="/pl/"
                hrefLang="pl"
                onClick={(event) => {
                  event.preventDefault();
                  switchLang("pl");
                }}
                className={
                  language === "pl" ? "text-primary" : "text-foreground/60 hover:text-foreground"
                }
              >
                PL
              </a>
            </div>
          </div>

          <button
            ref={menuToggleRef}
            type="button"
            className="ml-auto text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={
              isMobileMenuOpen
                ? language === "pl"
                  ? "Zamknij menu"
                  : "Close menu"
                : language === "pl"
                  ? "Otwórz menu"
                  : "Open menu"
            }
            data-testid="btn-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          ref={mobileNavRef}
          id="mobile-nav"
          aria-hidden={!isMobileMenuOpen}
          inert={!isMobileMenuOpen ? true : undefined}
          className={`md:hidden overflow-y-auto overscroll-contain border-b border-border bg-card transition-all duration-200 ${isMobileMenuOpen ? "max-h-[calc(100dvh-6rem)] opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
        >
          <nav
            aria-label={language === "pl" ? "Mobilna nawigacja" : "Mobile navigation"}
            className="flex flex-col gap-1 px-6 py-4"
          >
            <a
              href={sectionHref("#home")}
              onClick={closeMobileMenu}
              className="py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("nav.home")}
            </a>
            <div>
              {dropdownButton("services", t("nav.services"), true)}
              {dropdownLinks("services", serviceLinks, true)}
            </div>
            <a
              href={sectionHref("#pricing")}
              onClick={closeMobileMenu}
              className="py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </a>
            <div>
              {dropdownButton("work", language === "pl" ? "Jak pracujemy" : "How we work", true)}
              {dropdownLinks("work", workLinks, true)}
            </div>
            <div>
              {dropdownButton("about", language === "pl" ? "O nas" : "About", true)}
              {dropdownLinks("about", aboutLinks, true)}
            </div>
            <a
              href={sectionHref("#contact")}
              onClick={closeMobileMenu}
              className="py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </a>
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <a
                href={quoteHref}
                onClick={closeMobileMenu}
                className="rounded-sm bg-primary px-4 py-3 text-center text-base font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t("nav.quote")}
              </a>
              <div className="flex items-center gap-4 text-lg font-semibold">
                <a
                  href="/en/"
                  hrefLang="en"
                  onClick={(event) => {
                    event.preventDefault();
                    switchLang("en");
                    closeMobileMenu();
                  }}
                  className={language === "en" ? "text-primary" : "text-foreground/60"}
                >
                  EN
                </a>
                <span className="text-foreground/30" aria-hidden="true">
                  |
                </span>
                <a
                  href="/pl/"
                  hrefLang="pl"
                  onClick={(event) => {
                    event.preventDefault();
                    switchLang("pl");
                    closeMobileMenu();
                  }}
                  className={language === "pl" ? "text-primary" : "text-foreground/60"}
                >
                  PL
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
