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
            Autoridade em Desenvolvimento de Sites: O Legado Nortec + Alexis
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Com uma trajetória de mais de 20 anos na web, somos especialistas em <strong>Desenvolvimento de Sites</strong> que não apenas impressionam visualmente, mas dominam o Google em <strong>todo o Brasil e no mundo</strong>. Nosso trabalho com empresas de <strong>Belo Horizonte, Rio de Janeiro e de todo o Norte brasileiro</strong> se expande para resultados globais com foco em performance extrema e SEO nativo. Como <strong>Especialistas Google Partner</strong>, garantimos a <strong>Criação de Sites</strong> profissionais com a máxima autoridade técnica disponível no mercado hoje.
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