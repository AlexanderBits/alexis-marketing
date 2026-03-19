import React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, Globe } from "lucide-react";

const differentials = [
  {
    icon: Compass,
    title: "NORTE (Estratégia & Foco)",
    description: "Direcionamos sua marca para o topo. Especialistas em SEO para a Zona Norte (RJ/BH) e mercados nacionais, garantindo que seu negócio tenha o rumo certo para converter.",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    icon: Cpu,
    title: "TEC (Tecnologia & Performance)",
    description: "Desenvolvimento técnico de elite utilizando tecnologias Next-Gen. Código limpo, rápido e otimizado nativamente para Google Vitals e máxima performance.",
    gradient: "from-purple-600 to-fuchsia-600"
  },
  {
    icon: Globe,
    title: "NET (Rede & Infraestrutura)",
    description: "Sua rede sempre online. Hospedagem premium com servidores estáveis, segurança avançada e infraestrutura de rede global para garantir que seu site nunca pare.",
    gradient: "from-cyan-600 to-blue-600"
  }
];

export default function DifferentialsSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden border-y border-gray-900/50">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase mb-4 block">
            Os Pilares Nortec + Alexis
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
            Nossa Metodologia Integrada
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic">
            Transformamos a autoridade do domínio Nortecnet em uma estrutura de sucesso para o seu negócio.
          </p>
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
              <div className="relative p-8 bg-slate-900/30 border border-gray-800/50 rounded-2xl backdrop-blur-sm hover:border-blue-500/20 transition-all duration-500 h-full flex flex-col">
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10 flex-grow">
                  {/* Icon container with spinning border on hover */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} p-[1px] mb-8 shadow-2xl`}>
                    <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-900 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">Alexis Dev Ready</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}