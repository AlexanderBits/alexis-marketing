import React from "react";
import { motion } from "framer-motion";
import { Map, Laptop, Award } from "lucide-react";

const cycleSteps = [
  {
    icon: Map,
    title: "Google Maps & GMN",
    subtitle: "Atração Imediata",
    description: "Colocamos sua empresa na cara do cliente exatamente quando ele pesquisa por você. Otimização completa para máxima relevância local.",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Laptop,
    title: "Site com Domínio Próprio",
    subtitle: "Autoridade e Conversão",
    description: "Um site oficial (www.suaempresa.com.br) separa os curiosos dos clientes reais, transmitindo a confiança necessária para o fechamento.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Award,
    title: "Estratégia Google Partner",
    subtitle: "Excelência Reconhecida",
    description: "Aplicamos as melhores práticas recomendadas pelo próprio Google para garantir que seu investimento traga o melhor retorno possível.",
    color: "from-yellow-500 to-amber-500"
  }
];

export default function GMN_Cycle() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            O Ciclo Perfeito para o seu Negócio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Combinamos visibilidade local com autoridade digital para criar uma jornada de cliente impecável.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cycleSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-white/20 transition-all duration-500 h-full flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
              <div className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-4">{step.subtitle}</div>
              <p className="text-gray-400 leading-relaxed font-medium">
                {step.description}
              </p>
              
              {/* Connector line for desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
