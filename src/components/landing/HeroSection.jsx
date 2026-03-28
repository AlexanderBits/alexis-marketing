import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Facebook } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Logo centralizado no topo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <img src="https://media.base44.com/images/public/6971f9afeb3f9dc786ab5347/8f20b116d_logo-removebg-preview.png" alt="Google Partners" width={350} className="h-auto" />
        </div>

        {/* Redes Sociais no topo direito */}
        <div className="absolute top-8 right-4 md:right-8 z-20 flex gap-4">
          <a href="https://instagram.com/alexismarketingedev" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:scale-110 transition-all duration-300 hover:border-transparent group hover:shadow-[0_0_20px_rgba(219,39,119,0.4)]">
            <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </a>
          <a href="https://www.facebook.com/alexdevmarketingIA/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-blue-600 hover:scale-110 transition-all duration-300 hover:border-transparent group hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </a>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-40">
        {/* Heading principal */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">

          Criação de Site Profissional
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Seguro. Veloz. Exclusivo.
          </span>
          <br />
          Desenvolvimento de Sites
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            com Tecnologia de Ponta
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">Especialista em criação de sites profissionais. Desenvolvo projetos com design exclusivo e arquitetura digital de alta performance, utilizando foundation models de última geração, automação inteligente avançada e data center com hospedagem ilimitada





        </motion.p>

      </div>
    </section>);

}