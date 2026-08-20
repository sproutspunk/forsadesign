import { useState } from "react";
import type { FormEvent } from "react";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";

interface LeadMagnetFormProps {
  isEn: boolean;
  source: string;
  className?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadMagnetForm({ isEn, source, className }: LeadMagnetFormProps) {
  const t = (en: string, plStr: string) => (isEn ? en : plStr);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError(t("Enter a valid email address.", "Podaj poprawny adres email."));
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          company: company.trim(),
          language: isEn ? "en" : "pl",
        }),
      });
      const responseText = await response.text();
      let result: { ok?: boolean; error?: string } = {};
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            t("Something went wrong. Please try again.", "Cos poszlo nie tak. Sprobuj ponownie."),
          );
        }
      }
      if (!response.ok || !result.ok) {
        throw new Error(
          result.error || t("Could not send the checklist.", "Nie udalo sie wyslac checklisty."),
        );
      }
      trackEvent("lead_magnet_download", { source, language: isEn ? "en" : "pl" });
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("Something went wrong. Please try again.", "Cos poszlo nie tak. Sprobuj ponownie."),
      );
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <div className={`flex items-center gap-2 text-sm text-emerald-500 ${className ?? ""}`}>
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        {t(
          "Check your inbox \u2014 the checklist is on its way.",
          "Sprawd\u017a skrzynk\u0119 \u2014 checklista ju\u017c leci.",
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${className ?? ""}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("Work email", "Email firmowy")}
          className="flex-1 min-w-0 px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={t("Company (optional)", "Firma (opcjonalnie)")}
          maxLength={200}
          className="flex-1 min-w-0 px-3 py-2.5 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "sending" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {t("Download checklist", "Pobierz checklist\u0119")}
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </form>
  );
}
