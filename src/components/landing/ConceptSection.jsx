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
            Domínio Local & Autoridade Digital: O Poder do Google Meu Negócio
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Estar no <strong>Google Meu Negócio</strong> é o primeiro passo para o sucesso local, mas um site profissional é o que consolida sua <strong>autoridade</strong>. Enquanto o GMN atrai o olhar imediato dos clientes no Maps, seu site oficial é onde a confiança é construída e o faturamento acontece. Como um <strong>Especialista Google Partner</strong>, garantimos que sua empresa não apenas apareça, mas domine a primeira página, unindo a visibilidade do mapa com a conversão de um site de alta performance.
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