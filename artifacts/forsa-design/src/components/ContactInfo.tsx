import { motion } from "framer-motion";
import { Mail, Phone, User, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactInfo() {
  const { t } = useLanguage();

  const items = [
    {
      icon: <User size={32} />,
      label: t("footer.contactPersonLabel") as string,
      value: t("footer.contactPerson") as string,
      href: undefined,
    },
    {
      icon: <Mail size={32} />,
      label: "Email",
      value: t("footer.email") as string,
      href: `mailto:${t("footer.email")}`,
    },
    {
      icon: <Phone size={32} />,
      label: "Phone",
      value: t("footer.phone") as string,
      href: `tel:${t("footer.phone")}`,
    },
    {
      icon: <Linkedin size={32} />,
      label: "LinkedIn",
      value: "",
      href: "https://www.linkedin.com/in/miroslaw-potaczek",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-card border-t border-border/10 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="container mx-auto px-6 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("nav.contact")}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const inner = (
              <>
                <div className="text-primary mb-4">{item.icon}</div>
                <p className="text-foreground/50 text-sm uppercase tracking-widest mb-2 font-medium">
                  {item.label}
                </p>
                {item.value && (
                  <p className="text-white text-xl md:text-2xl break-all font-medium">
                    {item.value}
                  </p>
                )}
              </>
            );

            const cardClass =
              "group flex flex-col items-center text-center p-8 md:p-10 rounded-sm border border-primary/20 bg-background/60 transition-all duration-300 hover:border-primary/60 hover:bg-background";
            const glowStyle = {
              boxShadow: "0 0 0 0 rgba(201,168,76,0)",
            };

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{
                  boxShadow: "0 0 32px 4px rgba(201,168,76,0.22)",
                  y: -4,
                }}
                style={glowStyle}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className={cardClass}
                    {...(item.href.startsWith("https")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
