import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code2, Rocket, Compass, Cpu, Globe, ShieldCheck } from "lucide-react";

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

        {/* Regional Focus Badges - Non-rounded */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        >
          <div className="flex items-center gap-2 px-4 py-3 rounded-none border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest justify-center">
            <Compass className="w-3 h-3" />
            NOR (Direção & SEO)
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-none border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest justify-center">
            <Cpu className="w-3 h-3" />
            TEC (Performance & Código)
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-none border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest justify-center">
            <Globe className="w-3 h-3" />
            NET (Rede & Hospedagem)
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-none border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest justify-center">
            <ShieldCheck className="w-3 h-3" />
            ABRANGÊNCIA NACIONAL
          </div>
        </motion.div>
      </div>
    </section>
  );
}
