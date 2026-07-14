import { useLanguage } from "@/contexts/LanguageContext";
import { motion, type Variants } from "framer-motion";

export default function Hero() {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 mx-auto">
            <img
              src="/logo-new.png"
              alt="Forsa Design"
              width={400}
              height={400}
              className="w-48 md:w-64 lg:w-72 h-auto object-contain block mx-auto"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="w-24 h-px bg-primary mb-8 mt-2" />

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 max-w-2xl"
          >
            {t("hero.tagline")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/70 font-light mb-6 max-w-2xl"
          >
            {t("hero.subheader")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground/60 font-light leading-relaxed mb-12 max-w-2xl"
          >
            {t("hero.body")}
          </motion.p>

          <motion.a
            variants={itemVariants}
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)]"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
