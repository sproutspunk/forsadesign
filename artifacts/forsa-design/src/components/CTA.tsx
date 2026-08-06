import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-card border-t border-border/10">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 font-light mb-10 leading-relaxed">
            {t("cta.body")}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)]"
          >
            {t("cta.button")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
