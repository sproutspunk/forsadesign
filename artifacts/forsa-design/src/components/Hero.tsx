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
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-8 text-primary"
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-4.65 9.19 9.19 0 0 0-4.85-4.85 5.4 5.4 0 0 0-4.65 1l-.5.5Z" />
              <path d="m12 15 3.3 3.3a1 1 0 0 0 1.4 0l2.6-2.6a1 1 0 0 0 0-1.4L16 11" />
              <path d="m9 12-3.3-3.3a1 1 0 0 1 0-1.4l2.6-2.6a1 1 0 0 1 1.4 0L13 8" />
              <path d="M22 2c-1.63 0-5.74.88-9.08 4.22-3.21 3.22-4.14 7.2-4.22 8.78-.02.34.22.64.55.7l.15.02c1.78.3 4.25.99 6.2 3.46.26.33.7.4 1.05.15l.13-.1c1.58-1.46 2.45-5.44 2.45-8.86V2Z" />
              <path d="M14.5 9.5a1 1 0 1 0-2-2 1 1 0 0 0 2 2Z" />
            </svg>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          >
            FORSA DESIGN
          </motion.h1>

          <motion.div variants={itemVariants} className="w-24 h-1 bg-primary mb-8" />

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-medium text-foreground/90 mb-4"
          >
            {t("hero.tagline")}
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground/70 font-light mb-12 max-w-2xl"
          >
            {t("hero.subheader")}
          </motion.p>

          <motion.a 
            variants={itemVariants}
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(212,165,116,0.4)]"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
