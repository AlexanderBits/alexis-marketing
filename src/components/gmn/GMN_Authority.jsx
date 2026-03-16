import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

export default function GMN_Authority() {
  const benefits = [
    {
      icon: Star,
      title: "Prova Social Máxima",
      desc: "Você tem o 'carimbo' da maior empresa de buscas do mundo. Autoridade instantânea perante seus clientes."
    },
    {
      icon: ShieldCheck,
      title: "Segurança Total",
      desc: "O cliente sente que o investimento dele está em boas mãos e que você segue padrões de qualidade rigorosos."
    },
    {
      icon: CheckCircle2,
      title: "Diferenciação",
      desc: "Muitos criam sites, mas pouquíssimos são parceiros oficiais do Google. Isso justifica seu valor e autoridade."
    }
  ];

  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 opacity-10 blur-3xl -z-10 bg-yellow-500/20 rounded-full" />
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Por que a Chancela de um Google Partner ajuda a vender?
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Não arrisque o futuro da sua empresa com quem não tem certificação. Use o poder do Google para posicionar sua marca à frente da concorrência com uma jornada completa: do mapa ao clique final no seu site.
          </p>
          
          <div className="space-y-4">
             {["Excelência em Gestão", "Resultados Comprovados", "Papiros Oficiais do Google"].map((item, id) => (
                <div key={id} className="flex items-center gap-3 text-white font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  {item}
                </div>
             ))}
          </div>
        </motion.div>

        <div className="grid gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-900/40 border border-white/10 rounded-2xl flex items-center gap-6 hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <b.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{b.title}</h4>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
