import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const cases = [
{
  company: "ABME",
  fullName: "Associação Brasileira de Mídias Evangélicas",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6971f9afeb3f9dc786ab5347/ef1a88a66_image.png",
  description: "Plataforma institucional completa desenvolvida para conectar e fortalecer veículos de comunicação cristãos em todo o Brasil. Sistema moderno que integra notícias, eventos, diretoria executiva e área de associados com recursos avançados de gestão e comunicação.",
  url: "https://abme.com.br/"
},
{
  company: "CEMAD-RJ",
  fullName: "Convenção de Ministros das Assembleias de Deus - RJ",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6971f9afeb3f9dc786ab5347/8daf6b135_image.png",
  description: "Portal institucional que integra diretórios regionais, departamentos e área ministerial completa. Um lugar de amigos onde a comunidade ministerial encontra recursos, notícias e ferramentas para fortalecer o trabalho evangélico no Rio de Janeiro.",
  url: "https://convencaocemad.com.br/"
},
{
  company: "Boi Gordo",
  fullName: "Boi Gordo Churrasqueiras",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6971f9afeb3f9dc786ab5347/e2859294a_image.png",
  description: "E-commerce completo para fábrica de churrasqueiras premium. Site desenvolvido com catálogo de produtos, sistema de carrinho de compras e área de contato integrada. Tradição e qualidade em cada detalhe, atendendo toda a região com produtos de alto padrão.",
  url: "https://boigordochurrasqueiras.com.br/"
}];


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
          className="text-center mb-20">

          <span className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4 block">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Cases de Sucesso | Presença Digital Premium & Marketing Google
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore os últimos projetos desenvolvidos com foco em performance e resultados reais por um Especialista Google Partner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) =>
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group">

              <div className="bg-slate-950 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700/50 transition-all duration-500">
                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {item.company}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {item.fullName}
                  </p>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer">

                    <Button
                    variant="outline" className="bg-transparent text-white px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-9 w-full border-gray-800 hover:bg-white/5 hover:border-gray-600 group/btn">


                      Conheça o site no ar
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}