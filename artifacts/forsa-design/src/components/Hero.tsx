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
            className="mb-1 mx-auto"
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
              {/* Sun bead opacity — cosine curve, 8 equal steps, peak at t=0.125 (front of rocket) */}
              <motion.div
                animate={{ opacity: [0.80, 0.90, 0.80, 0.55, 0.30, 0.20, 0.30, 0.55, 0.80] }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
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

            {/* Rocket: smooth cosine brightness — 8 equal 45° steps, peak at front (t=0.125), darkest at back (t=0.625) */}
            <motion.img
              src={logo}
              alt="Forsa Design"
              className="w-56 md:w-72 lg:w-80 h-auto object-contain block"
              animate={{
                filter: [
                  /* t=0    0°   — 45° before peak, already warming */
                  "brightness(1.14) saturate(1.7)  sepia(0.38) drop-shadow(0 0 16px rgba(255,215,0,0.55))",
                  /* t=.125 45°  — FRONT of rocket, peak */
                  "brightness(1.25) saturate(2.0)  sepia(0.45) drop-shadow(0 0 32px rgba(255,215,0,0.85))",
                  /* t=.25  90°  — right side, easing off */
                  "brightness(1.14) saturate(1.7)  sepia(0.38) drop-shadow(0 0 16px rgba(255,215,0,0.55))",
                  /* t=.375 135° — below-right, fading */
                  "brightness(0.88) saturate(1.0)  sepia(0.18) drop-shadow(0 0 6px rgba(200,175,80,0.2))",
                  /* t=.5   180° — directly below */
                  "brightness(0.62) saturate(0.35) sepia(0.03) drop-shadow(0 0 3px rgba(90,110,150,0.15))",
                  /* t=.625 225° — BACK of rocket, darkest */
                  "brightness(0.51) saturate(0.2)  sepia(0)    drop-shadow(0 0 2px rgba(70,90,130,0.1))",
                  /* t=.75  270° — left side, still dark */
                  "brightness(0.62) saturate(0.35) sepia(0.03) drop-shadow(0 0 3px rgba(90,110,150,0.15))",
                  /* t=.875 315° — above-left, warming again */
                  "brightness(0.88) saturate(1.0)  sepia(0.18) drop-shadow(0 0 6px rgba(200,175,80,0.2))",
                  /* t=1    360° — back to 0°, seamless loop */
                  "brightness(1.14) saturate(1.7)  sepia(0.38) drop-shadow(0 0 16px rgba(255,215,0,0.55))",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
              }}
            />

          </motion.div>

          <motion.div variants={itemVariants} className="w-24 h-px bg-primary mb-8 mt-6" />

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
