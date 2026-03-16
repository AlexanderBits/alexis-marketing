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
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Empresa que Faz Site Profissional
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              de Alta Performance
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Somos empresas que fazem sites profissionais com metodologias avançadas. 
            Fazer site profissional requer experiência em desenvolvimento de sites profissionais, 
            design estratégico e tecnologia. Construir site profissional conosco garante 
            sites profissionais em WordPress, criação de websites profissionais personalizados 
            e montagem de site profissional com custo acessível.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mt-16"
        />
      </div>
    </section>
  );
}