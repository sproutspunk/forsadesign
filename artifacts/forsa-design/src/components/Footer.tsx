import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-background py-12 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <h4 className="font-serif text-xl tracking-[0.2em] font-bold text-white uppercase mb-4">
              Forsa Design
            </h4>
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
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#home"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.home")}
            </a>
            <a
              href="#services"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.services")}
            </a>
            <a
              href="#portfolio"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.portfolio")}
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.process")}
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.about")}
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors w-fit"
            >
              {t("nav.contact")}
            </a>
          </div>

          <div className="flex gap-4 md:justify-end">
            <a
              href="https://www.facebook.com/share/1BvxH2rXRc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-primary transition-colors bg-card p-3 rounded-full h-fit"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/forsa.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-primary transition-colors bg-card p-3 rounded-full h-fit"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 text-center md:text-left text-sm text-foreground/40 font-light">
          <p className="mb-2">{t("footer.copyright")}</p>
          <a
            href={`/${language}/terms`}
            className="hover:text-primary transition-colors mr-4"
            data-testid="footer-link-terms"
          >
            {t("footer.terms")}
          </a>
          <a
            href={`/${language}/privacy`}
            className="hover:text-primary transition-colors"
            data-testid="footer-link-privacy"
          >
            {t("footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
