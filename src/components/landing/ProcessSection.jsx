import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Briefing Estratégico",
    description: "Entendemos sua necessidade, objetivos e público-alvo para criar a estratégia perfeita.",
    step: "01"
  },
  {
    icon: PenTool,
    title: "Design & Prototipagem",
    description: "Visualização completa do projeto antes do desenvolvimento, garantindo sua aprovação.",
    step: "02"
  },
  {
    icon: Code2,
    title: "Desenvolvimento High-Tech",
    description: "Implementação com tecnologia moderna, código limpo e otimizado para performance.",
    step: "03"
  },
  {
    icon: Rocket,
    title: "Entrega & Lançamento",
    description: "Seu site no ar, pronto para vender e conquistar novos clientes.",
    step: "04"
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4 block">
            Nossa metodologia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Processo de Desenvolvimento Ágil
          </h2>
        </motion.div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 md:gap-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col md:py-12`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                <span className="text-5xl font-bold text-gray-800/50 mb-2 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 max-w-sm mx-auto md:mx-0 md:ml-auto">
                  {item.description}
                </p>
              </div>

              {/* Icon - Center */}
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-slate-900 border border-gray-800 flex items-center justify-center group hover:border-gray-600 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Connector dot */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-12 bg-gradient-to-b from-gray-700 to-transparent hidden md:block" />
                )}
              </div>

              {/* Empty space for alignment */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}