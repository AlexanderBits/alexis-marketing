import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Gestão de Redes Sociais",
    description: "Estratégias completas para Instagram, Facebook e LinkedIn. Conteúdo profissional que converte.",
    icon: Share2,
    path: "/gestao-de-redes-sociais",
    gradient: "from-pink-600 to-purple-600"
  },
  {
    title: "Google Meu Negócio",
    description: "Domine as buscas locais. Apareça no Google Maps e atraia mais clientes para seu negócio.",
    icon: MapPin,
    path: "/google-meu-negocio",
    gradient: "from-blue-600 to-cyan-600"
  }
];

export default function ServicesNavSection() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08)_0%,transparent_60%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Soluções Digitais Completas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Além do desenvolvimento de sites, oferecemos serviços especializados para expandir sua presença digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative p-8 bg-slate-900/40 border border-gray-800/50 rounded-2xl backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10 flex-grow">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px] mb-6 shadow-2xl`}>
                    <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <Link to={service.path}>
                    <Button 
                      className={`bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white rounded-full px-6 py-6 group/btn transition-all duration-300`}
                    >
                      Saiba Mais
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
