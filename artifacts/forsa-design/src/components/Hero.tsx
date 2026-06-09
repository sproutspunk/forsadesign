import { useLanguage } from "@/contexts/LanguageContext";
import { motion, type Variants } from "framer-motion";
import logo from "../assets/forsa-logo.png";

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
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="mb-6 mx-auto"
            style={{ position: "relative", width: "fit-content" }}
          >
            {/* Orbit arm — rotates 360° in 10 s, centred on the logo */}
            <motion.div
              className="pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "center center",
                overflow: "visible",
              }}
            >
              {/* Glow bead — 40 px above the container edge ≈ 40-50 px from rocket outline */}
              <motion.div
                animate={{ opacity: [0.3, 0.35, 0.8, 0.35, 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                  times: [0, 0.15, 0.5, 0.85, 1],
                }}
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #FFEC40 0%, #FFD700 40%, #FFA500 100%)",
                  boxShadow:
                    "0 0 6px 3px rgba(255,215,0,0.9), 0 0 16px 8px rgba(255,215,0,0.55), 0 0 36px 18px rgba(255,200,0,0.25)",
                  filter: "blur(0.5px)",
                }}
              />
            </motion.div>

            {/* Rocket shines in sync with the orbiting sun (peaks at t=0.5) */}
            <motion.img
              src={logo}
              alt="Forsa Design"
              className="w-56 md:w-72 lg:w-80 h-auto object-contain"
              animate={{
                filter: [
                  "drop-shadow(0 0 6px rgba(201,168,76,0.15)) brightness(0.92)",
                  "drop-shadow(0 0 12px rgba(255,215,0,0.35)) brightness(1.0)",
                  "drop-shadow(0 0 28px rgba(255,215,0,0.75)) brightness(1.18)",
                  "drop-shadow(0 0 12px rgba(255,215,0,0.35)) brightness(1.0)",
                  "drop-shadow(0 0 6px rgba(201,168,76,0.15)) brightness(0.92)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
                times: [0, 0.15, 0.5, 0.85, 1],
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="w-24 h-px bg-primary mb-8" />

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
