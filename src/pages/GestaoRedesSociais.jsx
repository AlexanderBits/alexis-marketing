import React, { useEffect, useState } from "react";
import { Check, X, Instagram, Facebook, Youtube, Video, MessageSquare, History, Users, Calendar, BarChart3, Presentation } from "lucide-react";
import { motion } from "framer-motion";
import ContactFormSection from "@/components/landing/ContactFormSection";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadModal from "@/components/social/LeadModal";

const PlanCard = ({ title, originalPrice = null, price, subtitle, features, badge = null, highlighted = false, onCTA }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative flex flex-col p-8 rounded-3xl border ${
      highlighted
        ? "bg-slate-900/50 border-blue-500/50 shadow-2xl shadow-blue-500/10 backdrop-blur-xl scale-105 z-10"
        : "bg-slate-900/30 border-slate-800 shadow-xl backdrop-blur-md"
    }`}
  >
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
        {badge}
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      {originalPrice && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-slate-500 line-through decoration-red-500/50">R$ {originalPrice}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold uppercase tracking-wider">Promoção</span>
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-medium text-slate-400">R$</span>
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-slate-400 font-medium">/mês</span>
      </div>
      <p className="mt-4 text-slate-400 text-sm leading-relaxed">
        {subtitle}
      </p>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3 group">
          <div className={`mt-1 p-0.5 rounded-full ${feature.included ? 'text-blue-400' : 'text-slate-600'}`}>
            {feature.included ? (
              <Check className="w-4 h-4" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </div>
          <span className={`text-sm ${feature.included ? 'text-slate-300' : 'text-slate-500'}`}>
            {feature.label}
          </span>
        </div>
      ))}
    </div>

    <button
      onClick={onCTA}
      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
        highlighted
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
      }`}
    >
      Começar Agora
    </button>
  </motion.div>
);

const GestaoRedesSociais = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      title: "🥉 Plano Básico",
      originalPrice: "597",
      price: "247",
      subtitle: "Ideal para quem está começando e precisa de uma presença profissional.",
      features: [
        { label: "1 rede (Instagram ou Facebook)", included: true },
        { label: "8 posts por mês", included: true },
        { label: "Criação de arte", included: true },
        { label: "Legenda + hashtags", included: true },
        { label: "Agendamento", included: true },
        { label: "Resposta a comentários", included: false },
        { label: "Relatório mensal", included: false },
        { label: "Gestão de stories", included: false },
        { label: "1 reels/mês", included: false },
        { label: "Reunião de alinhamento", included: false },
      ],
    },
    {
      title: "🥈 Plano Profissional",
      originalPrice: "997",
      price: "397",
      subtitle: "Para negócios que buscam crescimento e maior engajamento.",
      highlighted: true,
      badge: "Mais Popular",
      features: [
        { label: "2 redes (Instagram + Facebook)", included: true },
        { label: "16 posts por mês", included: true },
        { label: "Criação de arte", included: true },
        { label: "Legenda + hashtags", included: true },
        { label: "Agendamento", included: true },
        { label: "Resposta a comentários", included: true },
        { label: "Relatório mensal básico", included: true },
        { label: "Gestão de stories", included: false },
        { label: "1 reels/mês", included: true },
        { label: "Reunião de alinhamento mensal", included: true },
      ],
    },
    {
      title: "🥇 Plano Premium",
      originalPrice: "1.797",
      price: "967",
      subtitle: "Estratégia completa omnicanal para autoridade máxima no mercado.",
      features: [
        { label: "3 redes (Insta + FB + TikTok/Google)", included: true },
        { label: "24 posts + stories diários", included: true },
        { label: "Criação de arte premium", included: true },
        { label: "Legenda + hashtags estratégicas", included: true },
        { label: "Agendamento e monitoramento", included: true },
        { label: "Resposta a comentários", included: true },
        { label: "Relatório mensal completo", included: true },
        { label: "Gestão de stories", included: true },
        { label: "2 reels/mês", included: true },
        { label: "Reunião de alinhamento quinzenal", included: true },
      ],
    },
  ];

  return (
    <div className="dark bg-slate-950 min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium inline-block mb-6 uppercase tracking-widest">
              Social Media Marketing
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Gestão de Redes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sociais</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12">
              Domine o posicionamento da sua marca no Instagram, YouTube, TikTok e Facebook com estratégias focadas em conversão e autoridade.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <div className="flex items-center gap-2"><Instagram className="w-5 h-5 text-pink-500" /> Instagram</div>
              <div className="flex items-center gap-2"><Facebook className="w-5 h-5 text-blue-600" /> Facebook</div>
              <div className="flex items-center gap-2"><Youtube className="w-5 h-5 text-red-600" /> YouTube</div>
              <div className="flex items-center gap-2"><Video className="w-5 h-5 text-teal-400" /> TikTok</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Planos que cabem no seu negócio</h2>
            <p className="text-slate-400">Escolha a estratégia ideal para o seu momento atual</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} onCTA={() => setIsLeadModalOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 px-4 bg-slate-900/20 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Presentation className="w-8 h-8 text-blue-400" />, title: "Criação de Arte", desc: "Design moderno e alinhado com sua identidade visual." },
              { icon: <BarChart3 className="w-8 h-8 text-indigo-400" />, title: "Relatórios", desc: "Análise completa de métricas e performance." },
              { icon: <Calendar className="w-8 h-8 text-teal-400" />, title: "Agendamentos", desc: "Postagens frequentes nos melhores horários." },
              { icon: <Users className="w-8 h-8 text-purple-400" />, title: "Engajamento", desc: "Gestão inteligente de comentários e seguidores." }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-slate-800/50 mb-6 border border-slate-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection onCTA={() => setIsLeadModalOpen(true)} />
      <Footer />
      <WhatsAppFloat onCTA={() => setIsLeadModalOpen(true)} />
      
      <LeadModal 
        isOpen={isLeadModalOpen} 
        onOpenChange={setIsLeadModalOpen} 
      />
    </div>
  );
};

export default GestaoRedesSociais;
