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
      className="relative min-h-[70dvh] flex items-center justify-center pt-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/logo-hero.png?v=8"
            alt="Forsa Design"
            width={2048}
            height={2048}
            className="w-64 md:w-80 lg:w-96 h-auto object-contain block mx-auto mb-2 opacity-[1] border-t-[color:var(--elevate-2)] border-r-[color:var(--elevate-2)] border-b-[color:var(--elevate-2)] border-l-[color:var(--elevate-2)]"
          />

          <motion.div variants={itemVariants} className="w-20 h-px bg-primary mb-4 mt-3" />

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight mb-3 max-w-4xl"
          >
            {t("hero.tagline")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/70 font-light mb-3 max-w-3xl"
          >
            {t("hero.subheader")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-foreground/60 font-light leading-relaxed mb-6 max-w-5xl text-center"
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
