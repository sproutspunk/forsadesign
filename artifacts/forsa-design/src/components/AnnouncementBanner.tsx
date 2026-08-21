import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";

const STORAGE_KEY = "forsa-announcement-dismissed-v1";

interface AnnouncementBannerProps {
  language: "en" | "pl";
}

export default function AnnouncementBanner({ language }: AnnouncementBannerProps) {
  const isEn = language === "en";
  const [dismissed, setDismissed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1",
  );

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
    trackEvent("announcement_banner_dismissed", { language });
  };

  return (
    <div className="relative flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-xs sm:text-sm font-medium text-primary-foreground">
      <Sparkles className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <p className="leading-snug">
        {isEn ? (
          <>
            <span className="font-bold">Coming soon:</span> a fully self-service editor for your
            website. Update your own content, no developer needed.
          </>
        ) : (
          <>
            <span className="font-bold">Wkrótce:</span> w pełni samoobsługowy edytor Twojej strony.
            Aktualizuj treści samodzielnie, bez programisty.
          </>
        )}
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={isEn ? "Dismiss announcement" : "Zamknij og\u0142oszenie"}
        className="absolute right-3 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
