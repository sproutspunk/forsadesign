import { Switch, Route, Router as WouterRouter, useLocation, useRoute } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { LazyMotion } from "framer-motion";

const loadMotionFeatures = () => import("@/lib/motionFeatures").then((m) => m.default);
import HomePage from "@/pages/HomePage";

import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import ErrorBoundary from "@/components/ErrorBoundary";
import { applyAnalyticsConsent, CONSENT_UPDATED_EVENT } from "@/lib/consentManager";

const NotFound = lazy(() => import("@/pages/not-found"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const TermsPagePL = lazy(() => import("@/pages/TermsPagePL"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const PrivacyPagePL = lazy(() => import("@/pages/PrivacyPagePL"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ComparisonPage = lazy(() => import("@/pages/ComparisonPage"));
const QuoteCalculatorPage = lazy(() => import("@/pages/QuoteCalculatorPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));

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

function ArticleRoute({ lang }: { lang: "en" | "pl" }) {
  const [, params] = useRoute(`/${lang}/blog/:slug`);
  return <ArticlePage lang={lang} slug={params?.slug ?? ""} />;
}

function RootLandingPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center gap-6 p-8">
      <p className="font-serif text-3xl font-bold text-white">Forsa Design</p>
      <p className="text-foreground/70 text-center max-w-md">
        Web Design &amp; Development Agency - Banff, Scotland
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
    <Suspense fallback={null}>
      <Redirector />
      <Switch>
        <Route path="/en/" component={() => <HomePage lang="en" />} />
        <Route path="/pl/" component={() => <HomePage lang="pl" />} />
        <Route path="/en/terms" component={TermsPage} />
        <Route path="/pl/terms" component={TermsPagePL} />
        <Route path="/terms" component={() => <RedirectTo to="/en/terms" />} />
        <Route path="/en/privacy" component={PrivacyPage} />
        <Route path="/pl/privacy" component={PrivacyPagePL} />
        <Route path="/privacy" component={() => <RedirectTo to="/en/privacy" />} />
        <Route path="/en/about" component={() => <AboutPage lang="en" />} />
        <Route path="/pl/about" component={() => <AboutPage lang="pl" />} />
        <Route path="/en/services" component={() => <ServicesPage lang="en" />} />
        <Route path="/pl/services" component={() => <ServicesPage lang="pl" />} />
        <Route path="/en/contact" component={() => <ContactPage lang="en" />} />
        <Route path="/pl/contact" component={() => <ContactPage lang="pl" />} />
        <Route path="/en/comparison" component={() => <ComparisonPage lang="en" />} />
        <Route path="/pl/comparison" component={() => <ComparisonPage lang="pl" />} />
        <Route path="/en/quote" component={() => <QuoteCalculatorPage lang="en" />} />
        <Route path="/pl/quote" component={() => <QuoteCalculatorPage lang="pl" />} />
        <Route path="/en/search" component={() => <SearchPage lang="en" />} />
        <Route path="/pl/search" component={() => <SearchPage lang="pl" />} />
        <Route path="/en/blog/:slug" component={() => <ArticleRoute lang="en" />} />
        <Route path="/pl/blog/:slug" component={() => <ArticleRoute lang="pl" />} />
        <Route path="/en/blog" component={() => <BlogPage lang="en" />} />
        <Route path="/pl/blog" component={() => <BlogPage lang="pl" />} />
        <Route path="/" component={RootLandingPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
    <LazyMotion features={loadMotionFeatures} strict>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <LanguageProvider>
          <ErrorBoundary>
            <Router />
            <CookieConsent />
            <AnalyticsGate />
          </ErrorBoundary>
        </LanguageProvider>
      </WouterRouter>
    </LazyMotion>
  );
}

export default App;
