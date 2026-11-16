import { useId, useState, type FormEvent } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function NewsletterSignup({
  lang,
  source = "blog",
}: {
  lang: "pl" | "en";
  source?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const en = lang === "en";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          consent: form.get("consent") === "yes",
          _gotcha: form.get("_gotcha"),
          language: lang,
          source,
        }),
      });
      if (!response.ok) throw new Error("signup failed");
      setState("success");
    } catch {
      setState("error");
    }
  }
  return (
    <section
      id="newsletter"
      aria-labelledby={`${id}-heading`}
      className="rounded-lg border border-primary/30 bg-card p-6 md:p-8 scroll-mt-32"
    >
      <div className="flex items-start gap-4">
        <Mail className="text-primary mt-1 shrink-0" size={24} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-heading`} className="font-serif text-2xl text-white mb-3">
            {en ? "New articles, straight to your inbox" : "Nowe artykuły prosto na Twoją skrzynkę"}
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-5">
            {en
              ? "Practical guidance on B2B websites, catalogues and web systems. Confirm your email to subscribe. You can unsubscribe at any time."
              : "Praktyczne wskazówki o stronach, katalogach i systemach B2B. Potwierdź adres, aby dołączyć. Możesz wypisać się w każdej chwili."}
          </p>
          {state === "success" ? (
            <p role="status" className="text-primary font-medium">
              {en
                ? "Check your inbox and confirm using the email link. If you are already subscribed, no further action is needed."
                : "Sprawdź skrzynkę i potwierdź zapis linkiem w wiadomości. Jeśli adres jest już zapisany, nie musisz nic robić."}
            </p>
          ) : !open ? (
            <button
              type="button"
              aria-expanded={false}
              aria-controls={`${id}-form`}
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-sm font-semibold"
            >
              {en ? "Subscribe to the newsletter" : "Zapisz się do newslettera"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          ) : (
            <form id={`${id}-form`} onSubmit={submit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor={`${id}-email`} className="block text-sm text-white mb-2">
                    {en ? "Email address" : "Adres e-mail"}
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={320}
                    placeholder="you@example.com"
                    className="w-full min-w-0 bg-background border border-border rounded-sm px-4 py-3 text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="self-end w-full sm:w-auto bg-primary text-primary-foreground px-5 py-3 rounded-sm font-semibold disabled:opacity-60"
                >
                  {state === "sending"
                    ? en
                      ? "Sending…"
                      : "Wysyłanie…"
                    : en
                      ? "Send confirmation"
                      : "Wyślij potwierdzenie"}
                </button>
              </div>
              <div aria-hidden="true" className="hidden">
                <label htmlFor={`${id}-company`}>Company</label>
                <input id={`${id}-company`} name="_gotcha" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  className="mt-1 shrink-0 accent-primary"
                />
                <span>
                  {en
                    ? "I agree to receive Forsa Design articles and guidance by email. I can withdraw consent at any time."
                    : "Zgadzam się otrzymywać e-mailem artykuły i wskazówki Forsa Design. Mogę wycofać zgodę w każdej chwili."}{" "}
                  <a href={`/${lang}/privacy/`} className="text-primary underline">
                    {en ? "Privacy policy" : "Polityka prywatności"}
                  </a>
                  .
                </span>
              </label>
              {state === "error" && (
                <p role="alert" className="text-red-300 text-sm">
                  {en
                    ? "We could not send the confirmation. Please try again later."
                    : "Nie udało się wysłać potwierdzenia. Spróbuj ponownie później."}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
