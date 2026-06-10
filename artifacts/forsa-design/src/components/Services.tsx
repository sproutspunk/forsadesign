import { useLanguage } from "@/contexts/LanguageContext";
import { Monitor, ShoppingCart, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Monitor size={32} strokeWidth={1.5} />,
      title: t("services.card1.title"),
      desc: t("services.card1.desc"),
    },
    {
      icon: <ShoppingCart size={32} strokeWidth={1.5} />,
      title: t("services.card2.title"),
      desc: t("services.card2.desc"),
    },
    {
      icon: <Layers size={32} strokeWidth={1.5} />,
      title: t("services.card3.title"),
      desc: t("services.card3.desc"),
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t("services.heading")}
          </h2>
          <div className="w-16 h-1 bg-primary md:mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card border-t-4 border-t-primary p-8 rounded-b-md shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(201,168,76,0.12)]"
            >
              <div className="text-primary mb-6">{service.icon}</div>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed font-light whitespace-pre-line">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
