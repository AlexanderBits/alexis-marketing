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
            Autoridade Digital & Liderança Regional: O Legado Nortec + Alexis
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Com raízes profundas no <strong>Norte de Minas Gerais</strong> e uma trajetória de inovação tecnológica, unimos a tradição da Nortecnet com a expertise em marketing da Alexis Digital. Nossa missão é clara: garantir que empresas da <strong>Zona Norte do Rio, Belo Horizonte e de todo o Norte brasileiro</strong> dominem a primeira página do Google. Como <strong>Especialistas Google Partner</strong>, transformamos visibilidade em faturamento real, unindo a força do Google Meu Negócio com sites de conversão cirúrgica.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mt-16" />

      </div>
    </section>);

}