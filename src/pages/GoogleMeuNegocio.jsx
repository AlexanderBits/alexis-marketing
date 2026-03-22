import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import GMN_Hero from "@/components/gmn/GMN_Hero";
import GMN_Cycle from "@/components/gmn/GMN_Cycle";
import GMN_Authority from "@/components/gmn/GMN_Authority";
import GMN_FAQ from "@/components/gmn/GMN_FAQ";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadModal from "@/components/social/LeadModal";

export default function GoogleMeuNegocio() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dark bg-slate-950 min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -2 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </motion.div>
        </Link>
      </div>

      <GMN_Hero onCTA={() => setIsLeadModalOpen(true)} />
      <GMN_Cycle />
      <GMN_Authority />
      <GMN_FAQ />
      <ContactFormSection onCTA={() => setIsLeadModalOpen(true)} />
      <Footer />
      <WhatsAppFloat onCTA={() => setIsLeadModalOpen(true)} />
      
      <LeadModal 
        isOpen={isLeadModalOpen} 
        onOpenChange={setIsLeadModalOpen} 
      />
    </div>
  );
}