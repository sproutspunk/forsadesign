import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function Process() {
  const { t } = useLanguage();
  const steps = t("process.steps") as unknown as { title: string; desc: string }[];

  return (
    <section id="process" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t("process.heading")}
          </h2>
          <div className="w-16 h-1 bg-primary md:mx-auto" />
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-primary/20" />
          
          {/* Connector Line (Mobile) */}
          <div className="md:hidden absolute top-0 left-6 h-full w-[2px] bg-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 md:text-center"
              >
                {/* Numbered Circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-2 border-primary bg-background flex items-center justify-center text-primary font-serif font-bold text-xl shadow-[0_0_15px_rgba(201,168,76,0.18)]">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
