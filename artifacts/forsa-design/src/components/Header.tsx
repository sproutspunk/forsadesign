import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/forsa-logo.png";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.process"), href: "#process" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#home"
          data-testid="link-logo"
          className="flex items-center shrink-0"
        >
          <img
            src={logo}
            alt="Forsa Design"
            className="h-11 w-auto object-contain"
          />
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
        </nav>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2 text-sm font-semibold">
          <button
            onClick={() => setLanguage("en")}
            className={`transition-colors ${language === "en" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            data-testid="btn-lang-en"
          >
            EN
          </button>
          <span className="text-foreground/30">|</span>
          <button
            onClick={() => setLanguage("pl")}
            className={`transition-colors ${language === "pl" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            data-testid="btn-lang-pl"
          >
            PL
          </button>
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
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }}
                  className={`text-lg font-semibold ${language === "en" ? "text-primary" : "text-foreground/60"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLanguage("pl"); setIsMobileMenuOpen(false); }}
                  className={`text-lg font-semibold ${language === "pl" ? "text-primary" : "text-foreground/60"}`}
                >
                  PL
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
