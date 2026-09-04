import { useState } from "react";
import type { FormEvent } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";

interface WaitlistFormProps {
  isEn: boolean;
  className?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ isEn, className }: WaitlistFormProps) {
  const t = (en: string, plStr: string) => (isEn ? en : plStr);
  const [email, setEmail] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (gotcha.trim() !== "") {
      trackEvent("editor_waitlist_bot_honeypot", { language: isEn ? "en" : "pl" });
      setError(t("Could not sign you up.", "Nie udalo sie zapisac."));
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError(t("Enter a valid email address.", "Podaj poprawny adres email."));
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          language: isEn ? "en" : "pl",
          _gotcha: gotcha,
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
        throw new Error(result.error || t("Could not sign you up.", "Nie udalo sie zapisac."));
      }
      trackEvent("editor_waitlist_signup", { language: isEn ? "en" : "pl" });
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
      <div className={`flex items-center gap-1.5 text-primary-foreground ${className ?? ""}`}>
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        {t("You're on the list!", "Jestes na liscie!")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className ?? ""}`}>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="waitlist-company">Company</label>
        <input
          id="waitlist-company"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("Your email", "Twoj email")}
        className="w-40 sm:w-52 px-3 py-1.5 text-xs sm:text-sm rounded-md border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/70 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-primary-foreground text-primary hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
      >
        {status === "sending" ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Send className="w-3.5 h-3.5" />
        )}
        {t("Notify Me", "Powiadom mnie")}
      </button>
      {error && (
        <p className="absolute top-full left-0 mt-1 text-xs text-red-100 bg-red-900/80 px-2 py-1 rounded">
          {error}
        </p>
      )}
    </form>
  );
}
