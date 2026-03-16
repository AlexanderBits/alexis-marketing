import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Diamond } from "lucide-react";

const differentials = [
  {
    icon: Zap,
    title: "Performance Acelerada",
    description: "Criação de sites profissionais com carregamento ultra-rápido. Otimização técnica para Google PageSpeed e Core Web Vitals.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Segurança & Autoridade",
    description: "Desenvolvimento de sites profissionais com protocolos HTTPS avançados e arquitetura focada em proteção de dados.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Diamond,
    title: "Presença Digital Premium",
    description: "Layouts exclusivos focados em conversão. Estrategicamente desenhado por um Especialista Google Partner para sua marca brilhar.",
    gradient: "from-purple-500 to-pink-500"
  }
];

export default function DifferentialsSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.5)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4 block">
            Criação de Sites Profissionais
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Consultoria de Elite: Especialista Google Partner e Presença Digital Premium
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative p-8 bg-slate-950/50 border border-gray-800/50 rounded-2xl backdrop-blur-sm hover:border-gray-700/50 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon container */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} p-[1px] mb-6`}>
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}