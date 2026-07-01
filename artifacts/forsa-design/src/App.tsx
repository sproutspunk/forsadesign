import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import { lazy, Suspense, useEffect } from "react";
import { applyAnalyticsConsent, CONSENT_UPDATED_EVENT } from "@/lib/consentManager";

import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import ComparisonPage from "@/pages/ComparisonPage";
import NotFound from "@/pages/not-found";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const TermsPagePL = lazy(() => import("@/pages/TermsPagePL"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const PrivacyPagePL = lazy(() => import("@/pages/PrivacyPagePL"));
const QuoteCalculatorPage = lazy(() => import("@/pages/QuoteCalculatorPage"));

const queryClient = new QueryClient();

function PrefetchHints() {
  useEffect(() => {
    const prefetch = () => {
      import("@/pages/BlogPage").catch(() => {});
      import("@/pages/ComparisonPage").catch(() => {});
      import("@/pages/AboutPage").catch(() => {});
      import("@/pages/ArticlePage").catch(() => {});
    };
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(prefetch, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(prefetch, 2000);
      return () => clearTimeout(id);
    }
  }, []);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

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

function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to);
  }, [to, setLocation]);
  return null;
}

function ScrollToSection({ lang, sectionId }: { lang: "en" | "pl"; sectionId: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(`/${lang}/`);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [lang, sectionId, setLocation]);
  return null;
}

function RootLandingPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-serif text-3xl font-bold text-white">Forsa Design</h1>
      <p className="text-foreground/70 text-center max-w-md">
        Web Design &amp; Development Agency in Banff, Scotland
      </p>
      <nav className="flex items-center gap-6 text-sm font-semibold">
        <a
          href="/en/"
          className="text-primary hover:text-primary/80 transition-colors"
          hrefLang="en"
        >
          English
        </a>
        <span className="text-foreground/30">|</span>
        <a
          href="/pl/"
          className="text-foreground/60 hover:text-foreground transition-colors"
          hrefLang="pl"
        >
          Polski
        </a>
      </nav>
    </div>
  );
}

function Router() {
  return (
    <>
      <Redirector />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/en/about" component={() => <AboutPage lang="en" />} />
          <Route path="/pl/about" component={() => <AboutPage lang="pl" />} />
          <Route path="/en/sitemap" component={() => <SitemapPage lang="en" />} />
          <Route path="/pl/sitemap" component={() => <SitemapPage lang="pl" />} />
          <Route
            path="/en/blog/:slug"
            component={({ params }: { params: { slug: string } }) => (
              <ArticlePage lang="en" slug={params.slug} />
            )}
          />
          <Route
            path="/pl/blog/:slug"
            component={({ params }: { params: { slug: string } }) => (
              <ArticlePage lang="pl" slug={params.slug} />
            )}
          />
          <Route path="/en/blog" component={() => <BlogPage lang="en" />} />
          <Route path="/pl/blog" component={() => <BlogPage lang="pl" />} />
          <Route path="/en/comparison" component={() => <ComparisonPage lang="en" />} />
          <Route path="/pl/comparison" component={() => <ComparisonPage lang="pl" />} />
          <Route path="/en/quote" component={() => <QuoteCalculatorPage lang="en" />} />
          <Route path="/pl/quote" component={() => <QuoteCalculatorPage lang="pl" />} />
          <Route path="/en/terms" component={TermsPage} />
          <Route path="/pl/terms" component={TermsPagePL} />
          <Route path="/terms" component={() => <RedirectTo to="/en/terms" />} />
          <Route path="/en/privacy" component={PrivacyPage} />
          <Route path="/pl/privacy" component={PrivacyPagePL} />
          <Route path="/privacy" component={() => <RedirectTo to="/en/privacy" />} />
          <Route path="/en/faq" component={() => <ScrollToSection lang="en" sectionId="faq" />} />
          <Route path="/pl/faq" component={() => <ScrollToSection lang="pl" sectionId="faq" />} />
          <Route
            path="/en/contact"
            component={() => <ScrollToSection lang="en" sectionId="contact" />}
          />
          <Route
            path="/pl/contact"
            component={() => <ScrollToSection lang="pl" sectionId="contact" />}
          />
          <Route path="/en/" component={() => <HomePage lang="en" />} />
          <Route path="/pl/" component={() => <HomePage lang="pl" />} />
          <Route path="/" component={RootLandingPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
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
            <PrefetchHints />
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
