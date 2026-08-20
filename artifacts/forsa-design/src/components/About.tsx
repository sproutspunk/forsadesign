import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const highlighted = isEn
    ? [
        [
          "Real business perspective",
          "Having run a business for over 20 years, negotiated international contracts across three continents and managed teams in multiple countries, I understand what a website needs to do for your bottom line. Every design decision is filtered through a business lens, not just an aesthetic one.",
        ],
        [
          "Communication at every level",
          "I’ve worked with clients and stakeholders from every walk of life. That translates into websites that communicate clearly with audiences, whether local clients or international partners.",
        ],
        [
          "Delivering results",
          "My whole career has been built on closing deals, managing projects from A to Z and delivering measurable results. I bring that same discipline to web development: clear deadlines, transparent communication and a focus on what actually benefits your business.",
        ],
      ]
    : [
        [
          "Prawdziwa perspektywa biznesowa",
          "Prowadząc firmę przez ponad 20 lat, negocjując międzynarodowe kontrakty na trzech kontynentach i zarządzając zespołami w wielu krajach, rozumiem, co strona internetowa musi robić dla Twojego zysku. Każda decyzja projektowa jest filtrowana przez pryzmat biznesowy, nie tylko estetyczny.",
        ],
        [
          "Komunikacja na każdym poziomie",
          "Pracowałem z klientami i interesariuszami z każdej dziedziny życia. To przekłada się na strony, które jasno komunikują się z odbiorcami, czy to lokalnymi klientami, czy międzynarodowymi partnerami.",
        ],
        [
          "Dostarczanie wyników",
          "Cała moja kariera opierała się na zawieraniu umów, zarządzaniu projektami od A do Z i dostarczaniu mierzalnych rezultatów. Tę samą dyscyplinę przenoszę do web developmentu: jasne terminy, transparentna komunikacja i skupienie na tym, co naprawdę przynosi korzyść Twojej firmie.",
        ],
      ];

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

            <p className="text-lg text-foreground/80 font-light leading-relaxed text-justify">
              {t("about.body")}
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed text-justify">
              {t("about.body2")}
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed text-justify">
              {t("about.body3")}
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed text-justify">
              {t("about.body4")}
            </p>

            <div className="pt-4 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                {t("about.highlightsTitle")}
              </h3>
              {highlighted.map(([title, desc]) => (
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
