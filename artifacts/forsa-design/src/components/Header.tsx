import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { language, syncLanguage, t } = useLanguage();
  const [location, setLocation] = useLocation();

  const switchLang = (lang: "en" | "pl") => {
    syncLanguage(lang);
    const newPath = location.replace(/^\/(en|pl)/, `/${lang}`);
    setLocation(newPath || `/${lang}/`);
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const base = `/${language}/`;
  const isHomePage = location === `/${language}/` || location === `/${language}`;

  const sectionHref = (hash: string) => (isHomePage ? hash : `${base}${hash}`);

  const navLinks = [
    { name: t("nav.home"), href: sectionHref("#home") },
    { name: t("nav.services"), href: sectionHref("#services") },
    { name: t("nav.pricing"), href: sectionHref("#pricing") },
    { name: t("nav.portfolio"), href: sectionHref("#portfolio") },
    { name: t("nav.process"), href: sectionHref("#process") },
    { name: t("nav.about"), href: sectionHref("#about") },
    { name: t("nav.contact"), href: sectionHref("#contact") },
    { name: t("nav.faq"), href: sectionHref("#faq") },
    { name: t("nav.blog"), href: `${base}blog` },
    { name: t("nav.comparison"), href: `${base}comparison` },
  ];

  const quoteHref = `${base}quote`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href={sectionHref("#home")}
          data-testid="link-logo"
          className="font-serif text-xl tracking-[0.2em] font-bold text-white uppercase"
        >
          Forsa Design
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href={quoteHref}
            data-testid="link-nav-quote"
            className="text-sm font-bold px-4 py-1.5 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("nav.quote")}
          </a>
        </nav>
        {/* About Us page link (desktop) */}
        <a
          href={`/${language}/about`}
          className="hidden md:inline-flex items-center border border-primary/40 text-primary text-xs font-semibold px-4 py-1.5 rounded-sm hover:bg-primary/10 transition-colors"
          data-testid="link-about-page"
        >
          {t("nav.aboutPage")}
        </a>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
          <a
            href="/en/"
            onClick={(e) => {
              e.preventDefault();
              switchLang("en");
            }}
            className={`transition-colors ${language === "en" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            data-testid="btn-lang-en"
            hrefLang="en"
          >
            EN
          </a>
          <span className="text-foreground/30">|</span>
          <a
            href="/pl/"
            onClick={(e) => {
              e.preventDefault();
              switchLang("pl");
            }}
            className={`transition-colors ${language === "pl" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            data-testid="btn-lang-pl"
            hrefLang="pl"
          >
            PL
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="btn-mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={quoteHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-base font-bold px-4 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t("nav.quote")}
              </a>
              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-border">
                <a
                  href="/en/"
                  hrefLang="en"
                  onClick={(e) => {
                    e.preventDefault();
                    switchLang("en");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-semibold ${language === "en" ? "text-primary" : "text-foreground/60"}`}
                >
                  EN
                </a>
                <a
                  href="/pl/"
                  hrefLang="pl"
                  onClick={(e) => {
                    e.preventDefault();
                    switchLang("pl");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-semibold ${language === "pl" ? "text-primary" : "text-foreground/60"}`}
                >
                  PL
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
