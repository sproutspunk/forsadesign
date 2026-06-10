import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { t } = useLanguage();

  const cases = [
    {
      title: t("portfolio.case1.title"),
      desc: t("portfolio.case1.desc"),
      tag: t("portfolio.case1.tag"),
    },
    {
      title: t("portfolio.case2.title"),
      desc: t("portfolio.case2.desc"),
      tag: t("portfolio.case2.tag"),
    },
    {
      title: t("portfolio.case3.title"),
      desc: t("portfolio.case3.desc"),
      tag: t("portfolio.case3.tag"),
    },
  ];

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
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card border-t-4 border-t-primary rounded-b-md p-8 shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(201,168,76,0.12)]"
            >
              <span className="inline-block text-xs font-bold tracking-wider text-primary mb-4 border border-primary/30 px-3 py-1 rounded-sm">
                {item.tag}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
