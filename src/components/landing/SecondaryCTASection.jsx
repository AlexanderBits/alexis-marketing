import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SecondaryCTASection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-3xl" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-300">Tecnologia Next-Gen</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">Infraestrutura completa com dashboard administrativo, banco de dados dedicado, hospedagem otimizada e domínio .com.br - .org   incluso





          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Criador de site profissional especializado em criar sites profissionais. 
            Desenvolver site profissional com nosso construtor de sites profissional. 
            Preço para criar um site profissional acessível. Crie sites profissionais com WordPress 
            ou site profissional com hospedagem própria.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>

            <a href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-purple-500/20 group transition-all duration-300">

                Quero um site agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}