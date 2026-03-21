<<<<<<< HEAD
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Cpu, Globe, ShieldCheck } from "lucide-react";
import combinedLogo from "@/assets/combined-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await base44.auth.isAuthenticated();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };
    checkAuth();
  }, []);

  const handleContractClick = async () => {
    if (isAuthenticated) {
      navigate('/contrato');
    } else {
      // Navega para a página de login local que contém o CAPTCHA
      navigate('/login');
    }
  };
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
              GOOGLE MEU NEGÓCIO
            </Button>
          </Link>

          <Button
            onClick={handleContractClick}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-500 hover:to-green-500 rounded-none px-10 py-7 text-base font-bold group transition-all duration-300 shadow-2xl shadow-green-500/20 uppercase tracking-widest border-b-4 border-white/20">
            {isAuthenticated ? "ACESSAR CONTRATO" : "ASSINAR CONTRATO"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
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
=======
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await base44.auth.isAuthenticated();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      }
    };
    checkAuth();
  }, []);

  const handleContractClick = async () => {
    if (isAuthenticated) {
      navigate('/contrato');
    } else {
      base44.auth.redirectToLogin('/contrato');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Logo centralizado no topo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-medium tracking-widest text-gray-400 uppercase border border-gray-800 rounded-full">
            Alexis Marketing & Dev
          </span>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <motion.button
            onClick={handleContractClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-base font-semibold group transition-all duration-300 flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  Acessar Contrato
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google" className="h-5 w-5" />
                  Entrar com Google para Contratar
                </>
              )}
            </Button>
          </motion.button>

          <a href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-base font-semibold group transition-all duration-300">
              Solicitar Orçamento
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2">

          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2" />

          </div>
        </motion.div>
      </div>
    </section>);

}
>>>>>>> 2dfd918d03e7804c1d8f5c0683c17bf51274af01
