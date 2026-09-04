import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";
import Turnstile from "@/components/Turnstile";

const SITE_KEY = import.meta.env.TURNSTILE_SITE_KEY as string | undefined;

interface QuoteRequestFormProps {
  isEn: boolean;
  source: string;
  className?: string;
}

export default function QuoteRequestForm({ isEn, source, className }: QuoteRequestFormProps) {
  const t = (en: string, plStr: string) => (isEn ? en : plStr);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const gotcha = formData.get("_gotcha");
    if (typeof gotcha === "string" && gotcha.trim() !== "") {
      trackEvent("quote_request_bot_honeypot", { language: isEn ? "en" : "pl", source });
      setStatus("success");
      return;
    }

    if (SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage(t("Please complete the security check.", "Uzupełnij weryfikację bezpieczeństwa."));
      return;
    }

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();
    const message = [company ? `${t("Company", "Firma")}: ${company}` : "", details]
      .filter(Boolean)
      .join("\n\n");

    const form = new URLSearchParams();
    form.set("name", name);
    form.set("email", email);
    form.set("message", message || t("Request a quote.", "Prośba o wycenę."));
    form.set("language", isEn ? "en" : "pl");
    if (turnstileToken) form.set("cf-turnstile-response", turnstileToken);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: form,
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(
          result.error ||
            t(
              "We could not send your request. Please try again or email hello@forsadesign.co.uk.",
              "Nie udało się wysłać zapytania. Spróbuj ponownie lub napisz na hello@forsadesign.co.uk.",
            ),
        );
      }
      trackEvent("quote_request_submitted", { language: isEn ? "en" : "pl", source });
      setStatus("success");
      formRef.current?.reset();
      setTurnstileToken("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t(
              "We could not send your request. Please try again or email hello@forsadesign.co.uk.",
              "Nie udało się wysłać zapytania. Spróbuj ponownie lub napisz na hello@forsadesign.co.uk.",
            ),
      );
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-sm text-emerald-500 ${className ?? ""}`}>
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        {t("Thanks, we will reply within 24 hours.", "Dzięki, odpowiemy w ciągu 24 godzin.")}
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className={`space-y-2 ${className ?? ""}`}>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="quote-request-company-trap">Company</label>
        <input id="quote-request-company-trap" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          maxLength={200}
          autoComplete="name"
          placeholder={t("Name", "Imię i nazwisko")}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="email"
          name="email"
          required
          maxLength={320}
          autoComplete="email"
          placeholder={t("Work email", "Email firmowy")}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <input
        type="text"
        name="company"
        maxLength={200}
        placeholder={t("Company (optional)", "Firma (opcjonalnie)")}
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
      />
      <textarea
        name="details"
        rows={3}
        maxLength={2000}
        placeholder={t(
          "Briefly, what do you need? (optional)",
          "Krótko, czego potrzebujesz? (opcjonalnie)",
        )}
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-y"
      />
      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
      {SITE_KEY && <Turnstile siteKey={SITE_KEY} onVerify={setTurnstileToken} />}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        {t("Request a Quote", "Poproś o wycenę")}
      </button>
    </form>
  );
}
