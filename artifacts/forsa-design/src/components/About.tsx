import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px] rounded-md overflow-hidden bg-card border border-border/20 flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

            {/* 3D Cube — a regular solid with equal sides, tumbling in 3D space */}
            <div
              className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* Static sphere silhouette + soft gold glow (always faces the camera) */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16rem] h-[16rem] rounded-full border-2 border-primary/70 shadow-[0_0_50px_rgba(201,168,76,0.3)]"
                style={{
                  background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
                }}
              />

              {/* 3D scene: wireframe globe rings + cube share the same space so the cube reads as ENCLOSED */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  transformStyle: "preserve-3d",
                  width: "16rem",
                  height: "16rem",
                  marginLeft: "-8rem",
                  marginTop: "-8rem",
                }}
                animate={{ rotateY: 360 }}
                transition={{ rotateY: { repeat: Infinity, duration: 26, ease: "linear" } }}
              >
                {/* meridians (vertical great circles through the poles) */}
                {[0, 45, 90, 135].map((deg, i) => (
                  <div
                    key={`mer-${i}`}
                    className="absolute inset-0 rounded-full border border-primary/30"
                    style={{ transform: `rotateY(${deg}deg)` }}
                  />
                ))}
                {/* equator + parallels (horizontal rings at different heights) */}
                {[
                  { h: 0, s: 1 },
                  { h: 4, s: 0.866 },
                  { h: -4, s: 0.866 },
                  { h: 6.93, s: 0.5 },
                  { h: -6.93, s: 0.5 },
                ].map((p, i) => (
                  <div
                    key={`par-${i}`}
                    className="absolute inset-0 rounded-full border border-primary/30"
                    style={{
                      transform: `translateY(${-p.h}rem) rotateX(90deg) scale(${p.s})`,
                    }}
                  />
                ))}

                {/* Rotating cube nested at the centre of the sphere */}
                <motion.div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transformStyle: "preserve-3d",
                    width: "5rem",
                    height: "5rem",
                    marginLeft: "-2.5rem",
                    marginTop: "-2.5rem",
                  }}
                  animate={{ rotateX: -360, rotateY: -360 }}
                  transition={{
                    rotateX: { repeat: Infinity, duration: 20, ease: "linear" },
                    rotateY: { repeat: Infinity, duration: 13, ease: "linear" },
                  }}
                >
                  {/* 6 equal square faces — translateZ is half the edge length (2.5rem) */}
                  {[
                    "rotateY(0deg)",
                    "rotateY(90deg)",
                    "rotateY(180deg)",
                    "rotateY(-90deg)",
                    "rotateX(90deg)",
                    "rotateX(-90deg)",
                  ].map((rot, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 border-2 border-primary/50 bg-primary/[0.08] backdrop-blur-sm"
                      style={{ transform: `${rot} translateZ(2.5rem)` }}
                    />
                  ))}
                  {/* glowing gold core at the centre */}
                  <div className="absolute inset-[42%] rounded-full bg-primary shadow-[0_0_28px_rgba(201,168,76,0.9)]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Gold Accent Line */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              {t("about.heading")}
            </h2>
            <div className="w-16 h-1 bg-primary mb-8" />

            <p className="text-lg text-foreground/80 font-light leading-relaxed mb-6 text-justify">
              {t("about.body")}
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed text-justify">
              {t("about.body2")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
