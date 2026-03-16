import React from "react";
import { motion } from "framer-motion";

export default function ConceptSection() {
  return (
    <section className="py-32 bg-slate-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Consultoria de Elite: Especialista Google Partner e Presença Digital Premium
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Sua jornada para o topo começa com uma estratégia de <strong>Especialista Google Partner</strong>. Aplicamos metodologias consagradas por Neil Patel para garantir que sua <strong>presença digital premium</strong> não seja apenas bonita, mas funcional e altamente indexável.
            Utilizamos engenharia semântica para posicionar seu site tanto nos motores de busca tradicionais (Google, Bing) quanto nas novas interfaces de IA (Google Gemini, Perplexity). Se você busca desenvolvimento de sites profissionais com foco em ROI e autoridade, nossa arquitetura digital é a solução definitiva.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mt-16" />

      </div>
    </section>);

}