import React from "react";
import { useSEO } from "@/hooks/useSEO";
import { SEO_Head } from "@/components/seo/SEO_Head";
import HeroSection from "@/components/landing/HeroSection";
import ConceptSection from "@/components/landing/ConceptSection";
import DifferentialsSection from "@/components/landing/DifferentialsSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ServicesNavSection from "@/components/landing/ServicesNavSection";
import SuccessCasesSection from "@/components/landing/SuccessCasesSection";
import SecondaryCTASection from "@/components/landing/SecondaryCTASection";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  const { seoData } = useSEO("/");

  return (
    <div className="dark bg-slate-950 min-h-screen">
      <SEO_Head 
        title={seoData?.title} 
        description={seoData?.description || "Especialista em Redes Sociais e Google Meu Negócio."}
        canonical="/"
      />
      <HeroSection />
      <ConceptSection />
      <DifferentialsSection />
      <ProcessSection />
      <ServicesNavSection />
      <SuccessCasesSection />
      <SecondaryCTASection />
      <ContactFormSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}