import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const highlighted = isEn
    ? [
        [
          "Industrial B2B experience",
          "More than 20 years in international B2B sales means I approach a website as a commercial tool, not only as a visual project. I understand industrial products, technical sales, international trade and procurement.",
        ],
        [
          "Understanding the buying process",
          "I understand the questions buyers ask, the information they look for and the credibility signals that matter when a supplier is being evaluated.",
        ],
        [
          "Direct responsibility",
          "Forsa Design is a one-person business. There is no account-management layer between you and the person doing the work. I handle the project directly from specification through launch.",
        ],
      ]
    : [
        [
          "Doświadczenie w przemysłowym B2B",
          "Ponad 20 lat w międzynarodowej sprzedaży B2B sprawia, że traktuję stronę jako narzędzie biznesowe, a nie wyłącznie projekt wizualny. Rozumiem produkty przemysłowe, sprzedaż techniczną, handel międzynarodowy i procesy zakupowe.",
        ],
        [
          "Znajomość procesu zakupowego",
          "Rozumiem pytania zadawane przez kupujących, informacje, których szukają, oraz elementy budujące wiarygodność podczas oceny potencjalnego dostawcy.",
        ],
        [
          "Bezpośrednia odpowiedzialność",
          "Forsa Design jest jednoosobową firmą. Nie ma pośrednika pomiędzy Tobą a osobą wykonującą pracę. Prowadzę projekt bezpośrednio od specyfikacji do uruchomienia.",
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
