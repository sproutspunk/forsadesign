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
          <motion.div
            variants={itemVariants}
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-0 mx-auto"
            style={{ position: "relative", width: "fit-content" }}
          >
            <picture>
              <source srcSet="/logo-new-lg.webp?v=2" type="image/webp" />
              <img
                src="/logo-new-lg.png?v=2"
                alt="Forsa Design"
                width={640}
                height={640}
                className="w-56 md:w-72 lg:w-80 h-auto object-contain block"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "73%",
                left: 0,
                right: 0,
                height: "12%",
                background: "hsl(210 66% 15%)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "76%",
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: "clamp(6px, 1.6vw, 10px)",
                letterSpacing: "0.15em",
                fontWeight: 700,
                color: "#DBB993",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              Websites for Industrial and Trade Businesses
            </span>
          </motion.div>

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
