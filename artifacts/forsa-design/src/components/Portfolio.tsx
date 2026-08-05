import { useLanguage } from "@/contexts/LanguageContext";
import { m as motion } from "framer-motion";

export default function Portfolio() {
  const { t } = useLanguage();
  const body = t("portfolio.body") as unknown as string[];

  return (
    <section id="portfolio" className="py-24 bg-background border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("portfolio.heading")}
          </h2>
          <p className="text-foreground/70 font-light max-w-2xl md:mx-auto mb-6">
            {t("portfolio.subheading")}
          </p>
          <div className="w-16 h-1 bg-primary md:mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl bg-card border-t-4 border-t-primary rounded-b-md p-8 md:p-12 shadow-sm text-justify"
        >
          <div className="space-y-5 text-foreground/70 leading-relaxed font-light">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={t("portfolio.ctaHref") as string}
            className="mt-8 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("portfolio.cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
