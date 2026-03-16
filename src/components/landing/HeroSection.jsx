import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

        {/* Gradient orbsStatus */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-60 md:mt-80">


        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">

          Tenha Presença Digital
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Criação de Sites de Alta Conversão
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            com Estratégias de SEO e Marketing Aplicados no Código
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Entregamos sites com tecnologia de ponta, desenvolvidos em <strong>Next Gen</strong> com código otimizado nativamente para máxima indexação no Google. Unimos <strong>SEO de alto impacto</strong> a campanhas de Google Ads desenhadas metodicamente para garantir que sua marca alcance o topo das buscas. Nosso foco é claro: posicionar você exatamente onde o seu cliente está.
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
              className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-base font-bold group transition-all duration-300 shadow-xl shadow-white/5">

              Iniciar meu projeto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>

          <Link to="/google-meu-negocio">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-black hover:bg-white/5 hover:border-white/40 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 backdrop-blur-sm">
              Consultoria Google Meu Negócio
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