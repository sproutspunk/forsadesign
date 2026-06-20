import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { submitContact } from "@workspace/api-client-react";
import Turnstile from "./Turnstile";

type Status = "idle" | "sending" | "success" | "error";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

export default function Contact() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    details: "",
  });
  // Honeypot: hidden from real users; only bots fill it in.
  const [website, setWebsite] = useState("");
  // Cloudflare Turnstile token; only relevant when a site key is configured.
  const [captchaToken, setCaptchaToken] = useState("");
  // True when the Turnstile widget fired an error (e.g. domain not in allowlist).
  // In that case we skip the captcha requirement so the form still works.
  const [captchaWidgetFailed, setCaptchaWidgetFailed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const projectTypes = t("contact.projectTypes") as unknown as string[];

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

    // Require a Turnstile token only when a site key is configured AND the widget
    // loaded successfully. If the widget errored (e.g. 400020 domain not in allowlist)
    // we degrade gracefully and allow submission without a token.
    if (TURNSTILE_SITE_KEY && !captchaToken && !captchaWidgetFailed) {
      newErrors.captcha = t("contact.errors.captcha");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await submitContact({ ...formData, website, language, captchaToken });
      setStatus("success");
      setFormData({ name: "", email: "", projectType: "", details: "" });
      setWebsite("");
      setCaptchaToken("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isSending = status === "sending";

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
          <p className="text-foreground/70 font-light mb-6">{t("contact.subheading")}</p>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot field: hidden from real users, only bots fill it in. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
              style={{ position: "absolute" }}
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
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
                  className={`w-full bg-background border ${errors.name ? "border-destructive" : "border-border"} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                  data-testid="input-name"
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
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
                  className={`w-full bg-background border ${errors.email ? "border-destructive" : "border-border"} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors`}
                  data-testid="input-email"
                />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
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
                className={`w-full bg-background border ${errors.projectType ? "border-destructive" : "border-border"} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none`}
                data-testid="select-project-type"
              >
                <option value="" disabled>
                  {t("contact.selectPlaceholder")}
                </option>
                {projectTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p className="mt-1 text-sm text-destructive">{errors.projectType}</p>
              )}
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
                className={`w-full bg-background border ${errors.details ? "border-destructive" : "border-border"} rounded-sm px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                data-testid="textarea-details"
              />
              {errors.details && <p className="mt-1 text-sm text-destructive">{errors.details}</p>}
            </div>

            {status === "success" && (
              <div
                className="p-4 bg-primary/20 border border-primary/50 text-primary rounded-sm text-center font-medium"
                data-testid="msg-success"
              >
                {t("contact.success")}
              </div>
            )}

            {status === "error" && (
              <div
                className="p-4 bg-destructive/20 border border-destructive/50 text-destructive rounded-sm text-center font-medium"
                data-testid="msg-error"
              >
                {t("contact.error")}
              </div>
            )}

            {TURNSTILE_SITE_KEY && (
              <div className="flex flex-col items-center gap-2 pt-2">
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  theme="dark"
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    setCaptchaWidgetFailed(false);
                    if (errors.captcha) {
                      setErrors((prev) => ({ ...prev, captcha: "" }));
                    }
                  }}
                  onExpire={() => setCaptchaToken("")}
                  onError={() => {
                    setCaptchaToken("");
                    setCaptchaWidgetFailed(true);
                    setErrors((prev) => ({ ...prev, captcha: "" }));
                  }}
                />
                {errors.captcha && (
                  <p className="text-sm text-destructive" data-testid="msg-captcha-error">
                    {errors.captcha}
                  </p>
                )}
              </div>
            )}

            <div className="text-center pt-4">
              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                data-testid="btn-submit"
              >
                {isSending ? t("contact.sending") : t("contact.submit")}
              </motion.button>
            </div>
          </form>

          <div className="mt-16 text-center border-t border-border/20 pt-12">
            <p className="text-foreground/80 font-medium mb-6">{t("contact.alternative")}</p>

            <div className="space-y-2 mb-8">
              <p className="text-foreground/70">
                <span className="text-foreground/50">{t("contact.contactPersonLabel")}: </span>
                <span className="text-white font-medium" data-testid="text-contact-person">
                  {t("contact.contactPerson")}
                </span>
              </p>
              <p>
                <a
                  href={`mailto:${t("contact.directEmail")}`}
                  className="text-primary hover:underline font-medium"
                  data-testid="link-email"
                >
                  {t("contact.directEmail")}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${t("contact.phone")}`}
                  className="text-primary hover:underline font-medium"
                  data-testid="link-phone"
                >
                  {t("contact.phone")}
                </a>
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/forsa.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors p-2"
                aria-label="Instagram"
                data-testid="link-social-instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
