import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import TermsPage from "@/pages/TermsPage";
import TermsPagePL from "@/pages/TermsPagePL";
import PrivacyPage from "@/pages/PrivacyPage";
import PrivacyPagePL from "@/pages/PrivacyPagePL";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import { useEffect } from "react";
import { applyAnalyticsConsent, CONSENT_UPDATED_EVENT } from "@/lib/consentManager";

const queryClient = new QueryClient();

function Redirector() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (location === "/" || location === "") {
      const savedLang = localStorage.getItem("forsa-lang");
      if (savedLang === "pl" || savedLang === "en") {
        setLocation(`/${savedLang}/`);
        return;
      }

      const navLang = navigator.language.toLowerCase();
      if (navLang.startsWith("pl")) {
        setLocation("/pl/");
      } else {
        setLocation("/en/");
      }
    }
  }, [location, setLocation]);

  return null;
}

function Router() {
  return (
    <>
      <Redirector />
      <Switch>
        <Route path="/en/" component={() => <HomePage lang="en" />} />
        <Route path="/pl/" component={() => <HomePage lang="pl" />} />
        <Route path="/en/terms" component={TermsPage} />
        <Route path="/pl/terms" component={TermsPagePL} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/en/privacy" component={PrivacyPage} />
        <Route path="/pl/privacy" component={PrivacyPagePL} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/" component={() => null} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function AnalyticsGate() {
  useEffect(() => {
    applyAnalyticsConsent();

    const handler = () => applyAnalyticsConsent();
    window.addEventListener(CONSENT_UPDATED_EVENT, handler);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handler);
  }, []);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LanguageProvider>
            <Router />
            <CookieConsent />
            <AnalyticsGate />
          </LanguageProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
