import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import ConceptSection from "@/components/landing/ConceptSection";
import DifferentialsSection from "@/components/landing/DifferentialsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import SuccessCasesSection from "@/components/landing/SuccessCasesSection";
import SecondaryCTASection from "@/components/landing/SecondaryCTASection";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <HeroSection />
      <ConceptSection />
      <DifferentialsSection />
      <ProcessSection />
      <SuccessCasesSection />
      <SecondaryCTASection />
      <ContactFormSection />
      <Footer />
    </div>
  );
}