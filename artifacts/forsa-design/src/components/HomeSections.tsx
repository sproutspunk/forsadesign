import { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import PricingSection from "@/components/PricingSection";

const Process = lazy(() => import("@/components/Process"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTA = lazy(() => import("@/components/CTA"));
const ContactInfo = lazy(() => import("@/components/ContactInfo"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));

export default function HomeSections() {
  return (
    <MotionConfig reducedMotion="user">
      <PricingSection />
      <Suspense fallback={null}>
        <Process />
        <FAQ />
        <CTA />
        <ContactInfo />
        <ContactForm />
        <Footer />
      </Suspense>
    </MotionConfig>
  );
}
