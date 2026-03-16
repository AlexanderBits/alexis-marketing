import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Por que minha empresa precisa do Google Meu Negócio?",
    a: "É a forma mais rápida de ser encontrado localmente. Mais de 80% das buscas por serviços locais terminam em uma visita ou ligação em menos de 24 horas."
  },
  {
    q: "Apenas ter o perfil no Google Maps é suficiente?",
    a: "Não. O perfil atrai, mas o seu Site Oficial com Domínio Próprio é o que converte e transmite a autoridade necessária para fechar negócios de maior valor."
  },
  {
    q: "O que significa ser um Google Partner?",
    a: "Significa que fomos certificados pelo Google por manter padrões de qualidade, gerir orçamentos com eficiência e entregar resultados reais para nossos clientes."
  },
  {
    q: "Quanto tempo leva para ver os resultados?",
    a: "A visibilidade no mapa pode ser imediata após a otimização, mas a consolidação da autoridade digital é um processo contínuo que traz retornos crescentes."
  },
  {
      q: "Como o selo Google Partner me protege?",
      a: "Garante que as estratégias aplicadas seguem rigorosamente as diretrizes oficiais do Google, evitando punições e garantindo longevidade ao seu posicionamento."
  }
];

export default function GMN_FAQ() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20"
          >
            <HelpCircle className="w-6 h-6 text-blue-400" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Perguntas Frequentes</h2>
          <p className="text-gray-400">Tire suas dúvidas sobre como dominar o mercado local.</p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 rounded-2xl bg-slate-900/40 px-6">
                <AccordionTrigger className="text-white hover:text-blue-400 transition-colors py-6 text-left font-bold text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 leading-relaxed text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
