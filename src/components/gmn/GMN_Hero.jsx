import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, ShieldCheck, Globe } from "lucide-react";
import combinedLogo from "@/assets/combined-logo.png";
import consultantImg from "@/assets/consultant-new.jpg";

export default function GMN_Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-40 md:pt-56">
      {/* Unified Logo at Top Right */}
      <div className="absolute top-0 right-0 w-full px-6 md:px-12 py-8 flex justify-end items-center z-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={combinedLogo} alt="Alexis Marketing • Dev - Especialista Google Partner" className="w-[300px] md:w-[500px] h-auto object-contain" />
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-green-600/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
            <ShieldCheck className="w-4 h-4" />
            Estratégia Google Partner Certificada
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Sua Empresa no Topo com a Chancela de um <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400">Google Partner</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
            O Google Meu Negócio e o Google Maps são as ferramentas de visibilidade mais poderosas para o mercado local. Transformamos essa visibilidade em faturamento real com estratégias de elite.
          </p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-base font-bold flex items-center gap-2 group transition-all duration-300 shadow-xl shadow-white/5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Quero minha empresa no topo
                </span>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/20">
            <img src={consultantImg} alt="Alexis Marketing • Dev - Especialista Google Partner" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            
            {/* Floating badges */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <MapPin className="text-green-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Domine o Mercado Local</div>
                  <div className="text-gray-400 text-xs text-balance">Presença otimizada no Google Maps.</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background glow decoration */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 via-green-500/20 to-yellow-500/20 blur-2xl -z-10 rounded-[40px]" />
        </motion.div>
      </div>

      {/* Scroll indicator - Pinned to bottom right of the section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-3 z-30 hidden md:flex">
        
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold rotate-90 translate-y-8 origin-right opacity-50">Scroll</span>
        
        <div className="w-5 h-8 border border-gray-800 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-blue-500/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}