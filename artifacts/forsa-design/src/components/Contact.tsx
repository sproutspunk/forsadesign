import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = t("contact.projectTypes") as string[];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t("contact.errors.required");
    if (!formData.email.trim()) {
      newErrors.email = t("contact.errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.errors.invalidEmail");
    }
    if (!formData.projectType) newErrors.projectType = t("contact.errors.selectRequired");
    if (!formData.details.trim()) newErrors.details = t("contact.errors.required");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", projectType: "", details: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-card border-t border-border/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t("contact.heading")}
          </h2>
          <p className="text-foreground/70 font-light mb-6">
            {t("contact.subheading")}
          </p>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t("contact.name.label")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.name.placeholder")}
                  className={`w-full bg-background border ${errors.name ? 'border-destructive' : 'border-border'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t("contact.email.label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.email.placeholder")}
                  className={`w-full bg-background border ${errors.email ? 'border-destructive' : 'border-border'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                  data-testid="input-email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t("contact.projectType.label")}
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                data-testid="select-project-type"
              >
                <option value="" disabled>{t("contact.selectPlaceholder")}</option>
                {projectTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                {t("contact.details.label")}
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder={t("contact.details.placeholder")}
                rows={5}
                className={`w-full bg-background border ${errors.details ? 'border-destructive' : 'border-border'} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                data-testid="textarea-details"
              />
            </div>

            {isSuccess && (
              <div className="p-4 bg-primary/20 border border-primary/50 text-primary rounded-sm text-center font-medium">
                {t("contact.success")}
              </div>
            )}

            <div className="text-center pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(212,165,116,0.4)]"
                data-testid="btn-submit"
              >
                {t("contact.submit")}
              </motion.button>
            </div>
          </form>

          <div className="mt-16 text-center border-t border-border/20 pt-12">
            <p className="text-foreground/80 font-medium mb-6">
              {t("contact.alternative")}
            </p>
            
            <div className="flex justify-center gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors p-2" aria-label="LinkedIn" data-testid="link-social-linkedin">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors p-2" aria-label="X (Twitter)" data-testid="link-social-x">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors p-2" aria-label="Instagram" data-testid="link-social-instagram">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
