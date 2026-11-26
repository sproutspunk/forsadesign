import { aboutContent } from "@/data/about";
import { useLanguage } from "@/contexts/LanguageContext";
import { m as motion } from "framer-motion";

export default function About() {
  const { t, language } = useLanguage();
  const { intro, background } = aboutContent[language];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-7"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {t("about.heading")}
              </h2>
              <div className="w-16 h-1 bg-primary mb-8" />
            </div>

            {intro.map((paragraph) => (
              <p key={paragraph} className="text-lg text-foreground/80 font-light leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                {t("about.highlightsTitle")}
              </h3>
              {background.map(([title, desc]) => (
                <div key={title} className="space-y-1">
                  <p className="text-base font-semibold text-primary">{title}</p>
                  <p className="text-base text-foreground/75 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
