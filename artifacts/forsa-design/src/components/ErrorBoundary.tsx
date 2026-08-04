import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global error boundary. If any component throws during rendering, the user
 * sees a bilingual fallback with a reload action and a contact email instead
 * of a blank page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Log without sending any user data anywhere.
    console.error("Unhandled render error:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[100dvh] bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-foreground/70 font-light mb-2">
            Please reload the page. If the problem persists, contact us at{" "}
            <a href="mailto:hello@forsadesign.co.uk" className="text-primary">
              hello@forsadesign.co.uk
            </a>
            .
          </p>
          <p className="text-foreground/70 font-light mb-8">
            Odśwież stronę. Jeśli problem się powtarza, napisz do nas.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-sm transition-opacity hover:opacity-90"
          >
            Reload / Odśwież
          </button>
        </div>
      </div>
    );
  }
}
