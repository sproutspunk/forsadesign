import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-background border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t("portfolio.heading")}
          </h2>
          <p className="text-foreground/70 font-light max-w-2xl md:mx-auto mb-6">
            {t("portfolio.subheading")}
          </p>
          <div className="w-16 h-1 bg-primary md:mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="aspect-[4/3] rounded-md border-2 border-dashed border-primary/30 bg-gradient-to-br from-card to-background flex items-center justify-center p-8 text-center transition-colors hover:border-primary/60"
            >
              <p className="text-foreground/50 font-medium italic">
                {t("portfolio.placeholder")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
