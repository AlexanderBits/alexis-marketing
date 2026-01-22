import React from "react";
import { motion } from "framer-motion";
import { Star, Monitor, Smartphone } from "lucide-react";

const cases = [
  {
    company: "Arquitex Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    testimonial: "Entrega rápida e qualidade excepcional. O site superou todas as expectativas.",
    author: "Marina Silva",
    role: "CEO"
  },
  {
    company: "Tech Startup",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    testimonial: "Performance incrível e design moderno. Nossa taxa de conversão triplicou.",
    author: "Carlos Santos",
    role: "Fundador"
  },
  {
    company: "E-commerce Plus",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    testimonial: "Profissionalismo do início ao fim. Site seguro e extremamente rápido.",
    author: "Ana Beatriz",
    role: "Diretora"
  }
];

export default function SuccessCasesSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.3)_0%,transparent_50%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4 block">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Empresas que confiam na Alexis Marketing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Conheça alguns dos projetos que transformamos em cases de sucesso
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-slate-950 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-500">
                {/* Mockup container */}
                <div className="relative p-6 bg-gradient-to-b from-slate-900/50 to-transparent">
                  <div className="relative">
                    {/* Browser mockup */}
                    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
                      {/* Browser bar */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-gray-800">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-slate-800 rounded px-3 py-1 text-[10px] text-gray-500 text-center">
                            www.{item.company.toLowerCase().replace(/\s/g, '')}.com
                          </div>
                        </div>
                      </div>
                      {/* Screen content */}
                      <div className="aspect-video">
                        <img 
                          src={item.image} 
                          alt={item.company}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Phone mockup - overlapping */}
                    <div className="absolute -bottom-4 -right-2 w-16 bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                      <div className="w-full h-1.5 bg-slate-900 flex justify-center items-center">
                        <div className="w-6 h-0.5 bg-gray-700 rounded-full" />
                      </div>
                      <div className="aspect-[9/16]">
                        <img 
                          src={item.image} 
                          alt={item.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.company}
                  </h3>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 italic">
                    "{item.testimonial}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {item.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{item.author}</p>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}