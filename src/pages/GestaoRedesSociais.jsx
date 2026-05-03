import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  Instagram, 
  Facebook, 
  Youtube, 
  Video, 
  MessageSquare, 
  History, 
  Users, 
  Calendar, 
  BarChart3, 
  Presentation, 
  ArrowLeft,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  ShieldCheck,
  Globe,
  Share2,
  Camera,
  Layers
} from "lucide-react";

import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadModal from "@/components/social/LeadModal";
import Navbar from "@/components/landing/Navbar";


const PlanCard = ({ title, originalPrice = null, price, subtitle, features, badge = null, highlighted = false, onCTA }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative flex flex-col p-8 rounded-none border-2 transition-all duration-300 ${
      highlighted
        ? "bg-brand-lime/5 border-brand-lime shadow-[0_0_50px_rgba(212,255,51,0.1)] scale-105 z-10"
        : "bg-brand-card border-white/5 hover:border-white/20"
    }`}
  >
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-lime text-black text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl">
        {badge}
      </div>
    )}
    <div className="mb-8">
      <h3 className={`text-2xl font-black uppercase italic tracking-tighter mb-1 ${highlighted ? 'text-brand-lime' : 'text-white'}`}>{title}</h3>
      <div className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-6 italic">{subtitle}</div>
      
      {originalPrice && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-white/20 line-through">R$ {originalPrice}</span>
          <span className="text-[8px] px-2 py-0.5 bg-brand-lime/10 text-brand-lime font-black uppercase tracking-widest italic border border-brand-lime/20">OFERTA ESPECIAL</span>
        </div>
      )}
      
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-bold text-white/40 italic">R$</span>
        <span className="text-5xl font-black tracking-tighter">{price}</span>
      </div>
      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mt-2 italic">Mensalidade Fixa</div>
    </div>

    <div className="space-y-4 mb-10 flex-grow">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-3 group">
          <div className={`mt-0.5 ${f.included ? 'text-brand-lime' : 'text-white/10'}`}>
            {f.included ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest ${f.included ? 'text-white/60' : 'text-white/20'}`}>{f.label}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onCTA}
      className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
        highlighted
          ? "bg-brand-lime text-black hover:bg-white"
          : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
      }`}
    >
      Contratar Agora
    </button>
  </motion.div>
);

const PLANS = [
  {
    title: "Starter",
    originalPrice: "597",
    price: "247",
    subtitle: "Ideal para novos negócios",
    features: [
      { label: "1 rede (Instagram ou Facebook)", included: true },
      { label: "8 posts por mês", included: true },
      { label: "Criação de arte premium", included: true },
      { label: "Legenda estratégica", included: true },
      { label: "Agendamento automático", included: true },
      { label: "Resposta a comentários", included: false }
    ],
  },
  {
    title: "Performance",
    originalPrice: "997",
    price: "397",
    subtitle: "Crescimento Acelerado",
    highlighted: true,
    badge: "Mais Recomendado",
    features: [
      { label: "2 redes (Insta + FB)", included: true },
      { label: "16 posts estratégicos/mês", included: true },
      { label: "Criação de artes + Copy", included: true },
      { label: "Resposta ativa a comentários", included: true },
      { label: "1 Reels/Shorts por mês", included: true },
      { label: "Relatório de engajamento", included: true }
    ],
  },
  {
    title: "Scale",
    originalPrice: "1.797",
    price: "967",
    subtitle: "Domínio Multiplataforma",
    features: [
      { label: "Redes (Insta + FB + TikTok)", included: true },
      { label: "24 posts mensais", included: true },
      { label: "Stories diários (Sugestão)", included: true },
      { label: "Gestão de Comentários & Inbox", included: true },
      { label: "4 Reels/Shorts por mês", included: true },
      { label: "Análise de ROI Mensal", included: true }
    ],
  },
];

export default function GestaoRedesSociais() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black overflow-x-hidden min-h-screen">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-lime/10 blur-[120px] rounded-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-none" />
      </div>

      {/* Navbar */}
      <Navbar />


      <section className="relative pt-48 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-8">
               <Share2 className="w-6 h-6 text-brand-lime" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-lime bg-brand-lime/10 px-3 py-1">Posicionamento de Elite</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
              Gestão de Redes <br /><span className="text-brand-lime">Sociais Profissional</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl mb-12 italic">
              Não poste apenas por postar. Transforme suas redes sociais em uma poderosa ferramenta de autoridade e vendas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-white/40">
              {[
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
                { icon: <Video className="w-5 h-5" />, label: "TikTok" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-brand-lime transition-colors cursor-default">
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p, i) => (
            <PlanCard key={i} {...p} onCTA={() => setIsLeadModalOpen(true)} />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Camera className="w-8 h-8" />, title: "Conteúdo Visual", desc: "Design exclusivo e edições de vídeo focadas em retenção e engajamento." },
              { icon: <MessageSquare className="w-8 h-8" />, title: "Engajamento Ativo", desc: "Não deixe seus clientes esperando. Gestão ativa de comentários e inbox." },
              { icon: <Layers className="w-8 h-8" />, title: "Planejamento", desc: "Calendário editorial estratégico baseado no comportamento do seu público." }
            ].map((item, i) => (
              <motion.div key={i} {...fadeInUp} className="space-y-4">
                 <div className="text-brand-lime">{item.icon}</div>
                 <h4 className="text-xl font-black uppercase italic tracking-tighter">{item.title}</h4>
                 <p className="text-sm text-white/40 leading-relaxed italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-brand-lime/20 to-emerald-500/5 border border-brand-lime/20 p-12 md:p-24 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-lime/50 to-transparent" />
          
          <h2 className="text-4xl md:text-6xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-8 leading-none">
            Sua marca merece <br /><span className="text-brand-lime">Protagonismo Digital.</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto italic">
            Agende uma análise gratuita do seu posicionamento atual e descubra como podemos acelerar seu crescimento.
          </p>
          <button onClick={() => setIsLeadModalOpen(true)} className="bg-brand-lime text-black px-12 py-5 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform flex items-center gap-4 mx-auto">
            Solicitar Análise Social <Zap className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppFloat onCTA={() => setIsLeadModalOpen(true)} />
      <LeadModal isOpen={isLeadModalOpen} onOpenChange={setIsLeadModalOpen} />
    </div>
  );
}
