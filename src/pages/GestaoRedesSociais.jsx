import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Instagram, Facebook, Youtube, Video, MessageSquare, History, Users, Calendar, BarChart3, Presentation, ArrowLeft } from "lucide-react";

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
        ? "bg-slate-900/50 border-blue-500/50 shadow-2xl backdrop-blur-xl scale-105 z-10"
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
      <p className="mt-4 text-slate-400 text-sm leading-relaxed">{subtitle}</p>
    </div>

    <div className="space-y-4 mb-8 flex-grow">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-3 group">
          <div className={`mt-1 p-0.5 rounded-full ${f.included ? 'text-blue-400' : 'text-slate-600'}`}>
            {f.included ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span className={`text-sm ${f.included ? 'text-slate-300' : 'text-slate-500'}`}>{f.label}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onCTA}
      className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
        highlighted
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
      }`}
    >
      Começar Agora
    </button>
  </motion.div>
);

const PLANS = [
  {
    title: "🥉 Plano Básico",
    originalPrice: "597",
    price: "247",
    subtitle: "Presença profissional essencial.",
    features: [
      { label: "1 rede (Instagram ou Facebook)", included: true },
      { label: "8 posts por mês", included: true },
      { label: "Criação de arte", included: true },
      { label: "Legenda + hashtags", included: true },
      { label: "Agendamento", included: true },
      { label: "Resposta a comentários", included: false }
    ],
  },
  {
    title: "🥈 Plano Profissional",
    originalPrice: "997",
    price: "397",
    subtitle: "Crescimento e engajamento ativo.",
    highlighted: true,
    badge: "Mais Popular",
    features: [
      { label: "2 redes (Instagram + Facebook)", included: true },
      { label: "16 posts por mês", included: true },
      { label: "Criação de arte", included: true },
      { label: "Resposta a comentários", included: true },
      { label: "1 reels/mês", included: true }
    ],
  },
  {
    title: "🥇 Plano Premium",
    originalPrice: "1.797",
    price: "967",
    subtitle: "Estratégia completa omnicanal.",
    features: [
      { label: "Redes (Insta + FB + TikTok)", included: true },
      { label: "24 posts + stories diários", included: true },
      { label: "Relatório mensal completo", included: true },
      { label: "Gestão de stories", included: true },
      { label: "2 reels/mês", included: true }
    ],
  },
];

export default function GestaoRedesSociais() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dark bg-slate-950 min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -2 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </motion.div>
        </Link>
      </div>

      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 inline-block">Social Media</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Gestão de Redes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sociais</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12">Domine o posicionamento da sua marca no Instagram, YouTube, TikTok e Facebook.</p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              <div className="flex items-center gap-2 text-sm"><Instagram className="w-4 h-4 text-pink-500" /> Instagram</div>
              <div className="flex items-center gap-2 text-sm"><Facebook className="w-4 h-4 text-blue-600" /> Facebook</div>
              <div className="flex items-center gap-2 text-sm"><Youtube className="w-4 h-4 text-red-600" /> YouTube</div>
              <div className="flex items-center gap-2 text-sm"><Video className="w-4 h-4 text-teal-400" /> TikTok</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((p, i) => (
            <PlanCard key={i} {...p} onCTA={() => setIsLeadModalOpen(true)} />
          ))}
        </div>
      </section>

      <ContactFormSection onCTA={() => setIsLeadModalOpen(true)} />
      <Footer />
      <WhatsAppFloat onCTA={() => setIsLeadModalOpen(true)} />
      <LeadModal isOpen={isLeadModalOpen} onOpenChange={setIsLeadModalOpen} />
    </div>
  );
}