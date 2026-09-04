import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/consentManager";
import Turnstile from "@/components/Turnstile";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

export default function ContactForm() {
  const { language } = useLanguage();
  const en = language === "en";
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage(
        en ? "Please complete the security check." : "Uzupełnij weryfikację bezpieczeństwa.",
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const gotcha = formData.get("_gotcha");
    if (typeof gotcha === "string" && gotcha.trim() !== "") {
      trackEvent("contact_form_bot_honeypot", { language });
      setStatus("error");
      setErrorMessage(
        en
          ? "We could not send your message. Please try again or email hello@forsadesign.co.uk."
          : "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na hello@forsadesign.co.uk.",
      );
      return;
    }

    const form = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") form.set(key, value);
    });
    form.set("language", language);
    if (turnstileToken) form.set("cf-turnstile-response", turnstileToken);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: form,
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        const errorCode = response.status.toString();
        trackEvent("contact_form_error", { status: errorCode, language });
        throw new Error(
          result.error ||
            (en
              ? "We could not send your message. Please try again or email hello@forsadesign.co.uk."
              : "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na hello@forsadesign.co.uk."),
        );
      }
      trackEvent("contact_form_success", { language });
      setStatus("success");
      formRef.current?.reset();
      setTurnstileToken("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : en
            ? "We could not send your message. Please try again or email hello@forsadesign.co.uk."
            : "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na hello@forsadesign.co.uk.",
      );
    }
  };

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {en ? "Start a conversation" : "Rozpocznij rozmowę"}
          </p>
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            {en ? "Tell us what you are building." : "Opowiedz, co chcesz zbudować."}
          </h2>
          <p className="mt-5 leading-relaxed text-foreground/65">
            {en
              ? "Share a few details, and we will reply with a practical next step."
              : "Napisz kilka szczegółów, a odpowiemy z konkretną propozycją kolejnego kroku."}
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={submit}
          className="rounded-sm border border-primary/20 bg-card p-6 md:p-8"
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input id="contact-company" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm text-foreground/70">
              {en ? "Name" : "Imię i nazwisko"}
              <input
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-white outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
              />
            </label>
            <label className="text-sm text-foreground/70">
              {en ? "Email" : "Adres email"}
              <input
                name="email"
                type="email"
                required
                maxLength={320}
                autoComplete="email"
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-white outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/60"
              />
            </label>
          </div>
          <label className="mt-5 block text-sm text-foreground/70">
            {en ? "Message" : "Wiadomość"}
            <textarea
              name="message"
              required
              maxLength={5000}
              rows={6}
              className="mt-2 w-full resize-y rounded-sm border border-border bg-background px-4 py-3 text-white outline-none transition-colors focus:border-primary"
            />
          </label>
          {SITE_KEY && (
            <div className="mt-5">
              <Turnstile siteKey={SITE_KEY} onVerify={setTurnstileToken} />
            </div>
          )}
          {status === "success" && (
            <p role="status" className="mt-4 text-sm text-primary">
              {en
                ? "Thanks! Your message has been sent. We will be in touch shortly."
                : "Dziękujemy! Wiadomość została wysłana. Wkrótce się odezwiemy."}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full rounded-sm bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending"
              ? en
                ? "Sending…"
                : "Wysyłanie…"
              : en
                ? "Send message"
                : "Wyślij wiadomość"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {en
              ? "Your details are used only to respond to this enquiry."
              : "Twoje dane zostaną użyte wyłącznie do odpowiedzi na to zapytanie."}
          </p>
        </form>
      </div>
    </section>
  );
}
