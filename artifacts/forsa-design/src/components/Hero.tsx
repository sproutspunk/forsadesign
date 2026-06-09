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
              {/* Glow bead — brightest when at front of rocket (t=0.125), dimmest at back (t=0.625) */}
              <motion.div
                animate={{ opacity: [0.45, 0.95, 0.45, 0.2, 0.45, 0.45] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                  times: [0, 0.125, 0.375, 0.625, 0.875, 1],
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

            {/* Rocket: brightest at front (t=0.125 = top-right), darkest at back (t=0.625 = bottom-left) */}
            <motion.img
              src={logo}
              alt="Forsa Design"
              className="w-56 md:w-72 lg:w-80 h-auto object-contain"
              animate={{
                filter: [
                  /* t=0     sun at top — warming toward front */
                  "brightness(0.85) saturate(0.8) sepia(0.1) drop-shadow(0 0 8px rgba(255,200,0,0.3))",
                  /* t=0.125 sun at top-right = FRONT of rocket — peak blaze */
                  "brightness(1.25) saturate(2.2) sepia(0.5) drop-shadow(0 0 32px rgba(255,215,0,0.85))",
                  /* t=0.375 sun at bottom-right — fading */
                  "brightness(0.78) saturate(0.55) sepia(0.05) drop-shadow(0 0 4px rgba(100,120,160,0.15))",
                  /* t=0.625 sun at bottom-left = BACK of rocket — darkest */
                  "brightness(0.52) saturate(0.25) sepia(0) drop-shadow(0 0 2px rgba(80,100,140,0.1))",
                  /* t=0.875 sun at top-left — approaching front again */
                  "brightness(0.78) saturate(0.55) sepia(0.05) drop-shadow(0 0 4px rgba(100,120,160,0.15))",
                  /* t=1     back to top */
                  "brightness(0.85) saturate(0.8) sepia(0.1) drop-shadow(0 0 8px rgba(255,200,0,0.3))",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
                times: [0, 0.125, 0.375, 0.625, 0.875, 1],
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
