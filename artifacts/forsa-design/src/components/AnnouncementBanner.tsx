import { useState } from "react";
import { Megaphone, X } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";
import WaitlistForm from "@/components/WaitlistForm";

const STORAGE_KEY = "forsa-announcement-dismissed-v1";

interface AnnouncementBannerProps {
  language: "en" | "pl";
}

export default function AnnouncementBanner({ language }: AnnouncementBannerProps) {
  const isEn = language === "en";
  const [dismissed, setDismissed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1",
  );
  const [showForm, setShowForm] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
    trackEvent("announcement_banner_dismissed", { language });
  };

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 bg-primary px-4 py-2.5 pr-10 text-center text-xs sm:text-sm font-medium text-primary-foreground">
      <div className="flex items-center gap-2">
        <Megaphone className="w-4 h-4 flex-shrink-0 text-red-600" aria-hidden="true" />
        <p className="leading-snug">
          {isEn ? (
            <>
              <span className="font-bold">Coming soon:</span> a fully self-service editor for your
              website. Update your own content, no developer needed.
            </>
          ) : (
            <>
              <span className="font-bold">Wkrótce:</span> w pełni samoobsługowy edytor Twojej
              strony. Aktualizuj treści samodzielnie, bez programisty.
            </>
          )}
        </p>
      </div>

      {showForm ? (
        <WaitlistForm isEn={isEn} className="relative" />
      ) : (
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
            trackEvent("editor_waitlist_form_open", { language });
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-foreground text-primary font-semibold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
        >
          {isEn ? "Stay Tuned" : "B\u0105d\u017a na bie\u017c\u0105co"}
        </button>
      )}

      <button
        type="button"
        onClick={handleDismiss}
        aria-label={isEn ? "Dismiss announcement" : "Zamknij og\u0142oszenie"}
        className="absolute right-3 top-2.5 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
