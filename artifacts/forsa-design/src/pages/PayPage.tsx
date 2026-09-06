import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { trackEvent } from "@/lib/consentManager";
import { API_BASE_URL } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CreditCard, Loader2 } from "lucide-react";

interface PayPageProps {
  lang: "en" | "pl";
}

function usePaymentStatus(): "success" | "cancelled" | null {
  const [status] = useState<"success" | "cancelled" | null>(() => {
    const value = new URLSearchParams(window.location.search).get("payment");
    return value === "success" || value === "cancelled" ? value : null;
  });
  return status;
}

export default function PayPage({ lang }: PayPageProps) {
  const { syncLanguage } = useLanguage();
  const isEn = lang === "en";
  const t = (en: string, pl: string) => (isEn ? en : pl);
  const paymentStatus = usePaymentStatus();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: isEn ? "Pay an Invoice | Forsa Design" : "Zap\u0142a\u0107 faktur\u0119 | Forsa Design",
    description: isEn
      ? "Securely pay an invoice or deposit to Forsa Design via Stripe."
      : "Bezpiecznie zap\u0142a\u0107 faktur\u0119 lub zaliczk\u0119 dla Forsa Design przez Stripe.",
    ogTitle: isEn
      ? "Pay an Invoice | Forsa Design"
      : "Zap\u0142a\u0107 faktur\u0119 | Forsa Design",
    ogDescription: isEn
      ? "Securely pay an invoice or deposit to Forsa Design via Stripe."
      : "Bezpiecznie zap\u0142a\u0107 faktur\u0119 lub zaliczk\u0119 dla Forsa Design przez Stripe.",
    twitterTitle: isEn
      ? "Pay an Invoice | Forsa Design"
      : "Zap\u0142a\u0107 faktur\u0119 | Forsa Design",
    twitterDescription: isEn
      ? "Securely pay an invoice or deposit to Forsa Design via Stripe."
      : "Bezpiecznie zap\u0142a\u0107 faktur\u0119 lub zaliczk\u0119 dla Forsa Design przez Stripe.",
    ogLocale: isEn ? "en_GB" : "pl_PL",
    canonical: buildHref(`/${lang}/pay`),
    alternates: [
      { lang: "en", href: buildHref("/en/pay") },
      { lang: "pl", href: buildHref("/pl/pay") },
    ],
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (gotcha.trim() !== "") {
      trackEvent("pay_form_bot_honeypot", { language: lang });
      setStatus("error");
      setError(
        t(
          "Could not start checkout.",
          "Nie uda\u0142o si\u0119 rozpocz\u0105\u0107 p\u0142atno\u015bci.",
        ),
      );
      return;
    }
    const amountGBP = parseFloat(amount);
    if (!Number.isFinite(amountGBP) || amountGBP <= 0) {
      setStatus("error");
      setError(t("Enter a valid amount.", "Podaj poprawn\u0105 kwot\u0119."));
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkout/custom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountGBP,
          description: description.trim(),
          email: email.trim(),
          language: lang,
          _gotcha: gotcha,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(
          result.error ||
            t(
              "Could not start checkout.",
              "Nie uda\u0142o si\u0119 rozpocz\u0105\u0107 p\u0142atno\u015bci.",
            ),
        );
      }
      trackEvent("pay_form_checkout_start", { language: lang, amount: amountGBP });
      window.location.href = result.url;
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : t(
              "Could not start checkout.",
              "Nie uda\u0142o si\u0119 rozpocz\u0105\u0107 p\u0142atno\u015bci.",
            ),
      );
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content">
        <section className="pt-36 pb-24 bg-card">
          <div className="container mx-auto px-6 max-w-lg">
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              {t("Pay an invoice", "Zap\u0142a\u0107 faktur\u0119")}
            </h1>
            <p className="text-foreground/70 font-light mb-8">
              {t(
                "Enter the amount from your invoice or agreed deposit. You'll be redirected to Stripe's secure checkout.",
                "Podaj kwot\u0119 z faktury lub uzgodnionej zaliczki. Zostaniesz przekierowany do bezpiecznej p\u0142atno\u015bci Stripe.",
              )}
            </p>

            {paymentStatus === "success" && (
              <p role="status" className="mb-6 text-sm text-primary">
                {t(
                  "Payment received. Thank you!",
                  "P\u0142atno\u015b\u0107 otrzymana. Dzi\u0119kujemy!",
                )}
              </p>
            )}
            {paymentStatus === "cancelled" && (
              <p role="status" className="mb-6 text-sm text-foreground/60">
                {t("Payment was cancelled.", "P\u0142atno\u015b\u0107 zosta\u0142a anulowana.")}
              </p>
            )}

            <form
              onSubmit={submit}
              className="rounded-sm border border-primary/20 bg-background p-6 space-y-4"
            >
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="pay-company">Company</label>
                <input
                  id="pay-company"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                />
              </div>
              <label className="block text-sm text-foreground/70">
                {t("Amount (GBP)", "Kwota (GBP)")}
                <input
                  type="number"
                  min={1}
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-white outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm text-foreground/70">
                {t("Email", "Adres email")}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-white outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm text-foreground/70">
                {t("Name (optional)", "Imi\u0119 (opcjonalnie)")}
                <input
                  type="text"
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-white outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm text-foreground/70">
                {t("Reference / description (optional)", "Referencja / opis (opcjonalnie)")}
                <input
                  type="text"
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("e.g. Invoice #1042", "np. Faktura #1042")}
                  className="mt-2 w-full rounded-sm border border-border bg-card px-4 py-3 text-white outline-none focus:border-primary"
                />
              </label>
              {status === "error" && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4" />
                )}
                {status === "sending"
                  ? t("Redirecting\u2026", "Przekierowywanie\u2026")
                  : t("Pay now", "Zap\u0142a\u0107 teraz")}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
