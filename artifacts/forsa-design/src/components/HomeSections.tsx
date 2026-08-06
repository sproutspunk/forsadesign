import { MotionConfig } from "framer-motion";
import PricingSection from "@/components/PricingSection";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import CTA from "@/components/CTA";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomeSections() {
  return (
    <MotionConfig reducedMotion="user">
      <PricingSection />
      <Portfolio />
      <Process />
      <About />
      <FAQ />
      <CTA />
      <ContactInfo />
      <ContactForm />
      <Footer />
    </MotionConfig>
  );
}
