import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";

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
        <Route path="/" component={() => null} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LanguageProvider>
            <Router />
          </LanguageProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
