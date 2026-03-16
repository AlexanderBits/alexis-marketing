import React, { useEffect } from "react";
import GMN_Hero from "@/components/gmn/GMN_Hero";
import GMN_Cycle from "@/components/gmn/GMN_Cycle";
import GMN_Authority from "@/components/gmn/GMN_Authority";
import GMN_FAQ from "@/components/gmn/GMN_FAQ";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function GoogleMeuNegocio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <GMN_Hero />
      <GMN_Cycle />
      <GMN_Authority />
      <GMN_FAQ />
      <ContactFormSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
