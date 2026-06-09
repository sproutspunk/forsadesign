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
              {/* wireframe globe framing the cube — sphere outline + equator + parallels + meridians */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16rem] h-[16rem]">
                {/* sphere outline + soft gold glow */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-primary/70 shadow-[0_0_50px_rgba(201,168,76,0.3)]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
                  }}
                />
                {/* equator + parallels (horizontal ellipses) */}
                {[
                  { w: 16, h: 4, dy: 0 },
                  { w: 14, h: 3, dy: -4 },
                  { w: 14, h: 3, dy: 4 },
                  { w: 8, h: 2, dy: -7 },
                  { w: 8, h: 2, dy: 7 },
                ].map((l, i) => (
                  <div
                    key={`lat-${i}`}
                    className="absolute left-1/2 top-1/2 rounded-[50%] border border-primary/35"
                    style={{
                      width: `${l.w}rem`,
                      height: `${l.h}rem`,
                      transform: `translate(-50%, calc(-50% + ${l.dy}rem))`,
                    }}
                  />
                ))}
                {/* meridians (vertical ellipses) */}
                {[10, 5].map((w, i) => (
                  <div
                    key={`mer-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[16rem] rounded-[50%] border border-primary/35"
                    style={{ width: `${w}rem` }}
                  />
                ))}
              </div>

              <motion.div
                className="relative"
                style={{ transformStyle: "preserve-3d", width: "10rem", height: "10rem" }}
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{
                  rotateX: { repeat: Infinity, duration: 20, ease: "linear" },
                  rotateY: { repeat: Infinity, duration: 13, ease: "linear" },
                }}
              >
                {/* 6 equal square faces — translateZ is half the edge length (5rem) */}
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
                    className="absolute inset-0 border-2 border-primary/50 bg-primary/[0.06] backdrop-blur-sm"
                    style={{ transform: `${rot} translateZ(5rem)` }}
                  />
                ))}
                {/* glowing gold core at the centre */}
                <div
                  className="absolute inset-[42%] rounded-full bg-primary shadow-[0_0_28px_rgba(201,168,76,0.9)]"
                />
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
            
            <p className="text-lg text-foreground/80 font-light leading-relaxed mb-6">
              {t("about.body")}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
