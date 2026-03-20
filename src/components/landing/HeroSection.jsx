import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Cpu, Globe, ShieldCheck } from "lucide-react";
import combinedLogo from "@/assets/combined-logo.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden pt-32 md:pt-48">
        {/* Unified Logo at Top Right (Reduced size) */}
        <div className="absolute top-0 right-0 w-full px-6 md:px-12 py-8 flex justify-end items-center z-20">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={combinedLogo} alt="Alexis Marketing • Dev - Especialista Google Partner" className="w-[500px] h-auto object-contain" />
          </motion.div>
        </div>

        {/* Semantic Bridge Badge (SEO Gold) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-30">
          <span className="text-[10px] text-blue-400 font-mono tracking-[0.5em] uppercase">
            Powered by Nortec Tech Legacy Infrastructure
          </span>
        </div>

        {/* Gradient orbsStatus */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-60 md:mt-80">

        {/* Regional Focus Badge */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest">
            <Compass className="w-3 h-3" />
            NOR (Direção & SEO)
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest">
            <Cpu className="w-3 h-3" />
            TEC (Performance & Código)
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest">
            <Globe className="w-3 h-3" />
            NET (Rede & Hospedagem)
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            ABRANGÊNCIA NACIONAL
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
          Alexis Dev: Líder em
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400">
            Desenvolvimento de Sites
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Profissionais com SEO Nativo
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Lideramos o <strong>Desenvolvimento de Sites Profissionais</strong> com abrangência em todo o território nacional. Unimos o legado tecnológico da Nortecnet à expertise da Alexis Marketing para entregar soluções de alta autoridade para empresas no <strong>Brasil e no mundo</strong>, mantendo a excelência estratégica consolidada na Zona Norte de BH, Rio de Janeiro e em todo o Norte brasileiro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20"
        >

          <a href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 rounded-none px-10 py-7 text-base font-bold group transition-all duration-300 shadow-2xl shadow-indigo-500/20 uppercase tracking-widest border-b-4 border-white/20">
              CRIAR MEU SITE AGORA
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>

          <Link to="/google-meu-negocio">
            <Button
              variant="outline"
              size="lg"
              className="border-indigo-500/50 text-white hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 rounded-none px-10 py-7 text-base font-semibold transition-all duration-300 backdrop-blur-sm uppercase tracking-widest border-b-4 border-transparent hover:border-white/20">
              EXPLORAR BUSCAS LOCAIS
            </Button>
          </Link>
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
    </section>);

}