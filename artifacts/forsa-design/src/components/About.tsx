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
            
            {/* Geometric Decorative Element */}
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 border-2 border-primary/40 rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-1000 ease-in-out" />
              <div className="absolute inset-4 border-2 border-primary/60 rotate-[60deg] group-hover:rotate-[120deg] transition-transform duration-1000 ease-in-out" />
              <div className="absolute inset-8 border border-primary/80 rotate-12 group-hover:-rotate-12 transition-transform duration-1000 ease-in-out" />
              <div className="absolute inset-[30%] bg-primary/20 backdrop-blur-sm rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-1000 ease-in-out" />
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
