import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40"
        >
          <div className="bg-slate-950/90 rounded-2xl p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Cookie className="w-6 h-6 text-blue-400" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-lg tracking-tight">Privacidade & Cookies</h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Utilizamos cookies para otimizar sua experiência e analisar o tráfego em conformidade com a nossa 
                  <Link to="/politica-de-privacidade" className="text-blue-400 hover:text-blue-300 ml-1 underline decoration-blue-400/30 underline-offset-4">
                    Política de Privacidade
                  </Link>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAccept}
                    className="bg-white text-black hover:bg-gray-200 rounded-full font-bold px-6 py-2 transition-all duration-300 shadow-lg shadow-white/5 active:scale-95 flex-1"
                  >
                    Aceitar tudo
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleDecline}
                    className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 rounded-full font-medium px-6 py-2 transition-all duration-300 active:scale-95 flex-1"
                  >
                    Apenas essenciais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
