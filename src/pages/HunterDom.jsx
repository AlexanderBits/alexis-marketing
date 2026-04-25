import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Search,
  ArrowRight,
  Star,
  Play,
  Menu,
  X,
  MessageSquare,
  Globe,
  Lock,
  ExternalLink,
  Share2
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";



const HunterDom = () => {
  const [domain, setDomain] = useState("");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const steps = [
    {
      title: "1. Diagnóstico de Autoridade",
      description: "Análise profunda do seu domínio e presença digital atual via HunterDom.",
      icon: <Search className="w-6 h-6 text-brand-lime" />
    },
    {
      title: "2. Estrutura de Tráfego Pago",
      description: "Configuração de campanhas otimizadas em Google Ads e Meta Ads.",
      icon: <Target className="w-6 h-6 text-brand-lime" />
    },
    {
      title: "3. Otimização de Conversão (CRO)",
      description: "Ajustes técnicos e de copy para garantir que o tráfego vire venda.",
      icon: <TrendingUp className="w-6 h-6 text-brand-lime" />
    },
    {
      title: "4. Relatórios Inteligentes",
      description: "Acompanhamento em tempo real com dashboards focados em ROI.",
      icon: <BarChart3 className="w-6 h-6 text-brand-lime" />
    }
  ];

  const pricing = [
    {
      name: "Entry",
      objective: "Ponto de Partida",
      price: "400",
      features: ["Presença Básica", "Configuração Inicial", "Suporte via Email"],
      highlight: false,
      cta: "Começar Agora"
    },
    {
      name: "Starter",
      objective: "Presença Digital",
      price: "1.000",
      features: ["Gestão de Google Ads", "SEO Local", "Relatório Mensal"],
      highlight: false,
      cta: "Solicitar Escala"
    },
    {
      name: "Growth",
      objective: "Aquisição de Leads",
      price: "2.500",
      features: ["Tráfego + CRO", "Landing Page Inclusa", "Dashboard VIP", "Google Partner Support"],
      highlight: true,
      cta: "Dominar Mercado"
    },
    {
      name: "Scale",
      objective: "Domínio de Mercado",
      price: "5.000",
      features: ["Estratégia Full Stack", "SEO de Elite", "Automação de Leads", "Gestão de CRM"],
      highlight: false,
      cta: "Falar com Alexis"
    }
  ];

  const faqs = [
    {
      question: "Quanto tempo para ver resultados?",
      answer: "Nossa metodologia foca em resultados de curto e médio prazo. As primeiras métricas e conversões costumam aparecer nos primeiros 30 dias após a implementação da estrutura de tráfego."
    },
    {
      question: "Como funciona o contrato?",
      answer: "Trabalhamos com contratos de prestação de serviços transparentes, baseados em recorrência mensal. Nosso foco é o ROI: se o serviço se paga e gera lucro, a parceria é duradoura."
    },
    {
      question: "Como é feito o monitoramento?",
      answer: "Você recebe acesso a um dashboard exclusivo com dados do Google Analytics, Ads e conversões em tempo real. Nada de relatórios 'vagos', apenas números reais de vendas e leads."
    }
  ];

  return (
    <div className="bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-lime/10 blur-[120px] rounded-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-none" />
      </div>

      {/* Navbar */}
      <Navbar />


      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-4">
               <img src="https://res.cloudinary.com/deivliasb/image/upload/v1774740064/patner_s65hfp.png" alt="Google Partner" className="h-10 opacity-100" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-lime bg-brand-lime/10 px-3 py-1">Expertise de Elite</span>
            </div>
            <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-['Outfit'] font-black leading-[0.95] mb-8 tracking-tighter uppercase italic">
              Transforme seu site em uma <span className="text-brand-lime">máquina de vendas</span> com a expertise de um Google Partner.
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
              Não somos apenas uma agência. Somos o motor de performance que pequenas e médias empresas precisam para dominar o mercado digital.
            </p>
            
            <div id="analise" className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-grow max-w-md">
                <Input 
                  placeholder="Seu domínio (ex: meunegocio.com)" 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-brand-card border-white/10 rounded-none h-14 text-white focus:border-brand-lime/50 transition-colors pl-4"
                />
              </div>
              <button className="bg-brand-lime text-black px-8 py-4 rounded-none font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-transform">
                Solicitar Análise Gratuita <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-none border border-brand-dark bg-brand-card flex items-center justify-center text-[10px] font-bold">A{i}</div>
                 ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-white/40 italic">+200 Empresas Escaladas</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* HunterDom UI Peek */}
            <div className="bg-[#1e1e1e] border border-white/10 rounded-none overflow-hidden shadow-[0_0_80px_rgba(212,255,51,0.1)]">
              <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-none bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-none bg-[#27c93f]" />
                </div>
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest italic">HunterDom Authority Analyzer</span>
                <div className="w-12" />
              </div>
              <div className="p-8">
                 <div className="flex items-end justify-between mb-8">
                    <div>
                       <div className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">Status da Autoridade</div>
                       <div className="text-3xl font-black text-brand-lime uppercase italic tracking-tighter">Domínio Crítico</div>
                    </div>
                    <div className="text-right">
                       <div className="text-5xl font-black italic tracking-tighter leading-none">24<span className="text-xs text-white/20">/100</span></div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Performance Técnica", val: "32%", color: "bg-red-500" },
                      { label: "Otimização de SEO", val: "45%", color: "bg-yellow-500" },
                      { label: "Taxa de Conversão", val: "1.2%", color: "bg-red-500" }
                    ].map((item, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                            <span>{item.label}</span>
                            <span className="text-brand-lime">{item.val}</span>
                         </div>
                         <div className="h-1 bg-white/5 w-full">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: item.val }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${item.color}`} 
                            />
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-brand-lime" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Análise de Segurança OK</span>
                    </div>
                    <div className="bg-brand-lime/10 px-3 py-1 border border-brand-lime/20 text-[8px] font-black uppercase text-brand-lime animate-pulse">
                       Aguardando Otimização
                    </div>
                 </div>
              </div>
            </div>

            {/* Video Placeholder */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-10 -right-4 md:-right-10 bg-brand-card border border-brand-lime/30 p-2 rounded-none shadow-2xl w-[200px] aspect-video flex flex-col group cursor-pointer overflow-hidden"
            >
               <div className="flex-grow bg-black flex items-center justify-center relative overflow-hidden">
                  <Play className="w-8 h-8 text-brand-lime relative z-10" />
                  <div className="absolute inset-0 bg-brand-lime/5 group-hover:bg-brand-lime/20 transition-colors" />
               </div>
               <div className="p-3 bg-brand-card">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/40">Assista Agora</div>
                  <div className="text-[10px] font-bold uppercase italic text-white leading-tight">Auditoria Express</div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="py-24 px-6 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-4 text-brand-lime">
              A Engenharia do Crescimento
            </h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">Nossa metodologia de 4 pilares focada em resultado direto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                {...fadeInUp}
                className="bg-brand-card border border-white/5 p-8 rounded-none relative group hover:border-brand-lime/30 transition-all"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-brand-lime group-hover:h-full transition-all duration-500" />
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-lg font-black uppercase italic mb-4 tracking-tight">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp}>
             <h2 className="text-4xl md:text-5xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-8 leading-none">
               Por que a Alexis <br />é a sua <span className="text-brand-lime text-6xl">Melhor Escolha?</span>
             </h2>
             <div className="space-y-10">
                {[
                  { title: "Aumento de Leads", desc: "Capture o dobro de oportunidades com funis otimizados.", icon: <CheckCircle2 className="w-5 h-5 text-brand-lime" /> },
                  { title: "Domínio de Palavras-Chave", desc: "Apareça quando seu cliente mais precisa e no lugar certo.", icon: <Globe className="w-5 h-5 text-brand-lime" /> },
                  { title: "Redução de Custo por Clique", desc: "Pague menos por cada visitante qualificado com inteligência de dados.", icon: <TrendingUp className="w-5 h-5 text-brand-lime" /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                     <div className="mt-1">{item.icon}</div>
                     <div>
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2 italic">{item.title}</h4>
                        <p className="text-white/40 leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
          
          <div className="relative">
             <div className="bg-brand-card border border-white/10 p-10 relative z-10">
                <div className="text-brand-lime text-6xl font-black italic tracking-tighter mb-2">ROI Real.</div>
                <div className="text-white/60 text-lg leading-relaxed mb-8 italic">
                  "Nossa Engine não foca em cliques vazios. Focamos em <span className="text-white font-bold">Conversão Direta</span>. Cada real investido é rastreado para garantir que o retorno supere o custo de aquisição."
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                      <div className="text-2xl font-black text-white italic tracking-tighter">Data-Driven</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-black">Alexis Dev Authority</div>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10" />
                   <div className="flex flex-col">
                      <div className="text-2xl font-black text-brand-lime italic tracking-tighter">Real-Time</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-black">Monitoramento 24/7</div>
                   </div>
                </div>
             </div>
             <div className="absolute -top-6 -right-6 w-full h-full border border-brand-lime/20 -z-0" />
          </div>

        </div>
      </section>

      {/* Pricing Table */}
      <section id="precos" className="py-32 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-6xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-4 leading-none">
              Níveis de <span className="text-brand-lime">Escala</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black italic">Escolha o motor ideal para a fase atual do seu negócio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricing.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col p-8 border-2 transition-all ${
                  plan.highlight 
                    ? "border-brand-lime bg-brand-lime/5 shadow-[0_0_50px_rgba(212,255,51,0.1)] z-10 scale-105" 
                    : "border-white/5 bg-brand-card hover:border-white/20"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-lime text-black text-[10px] font-black px-4 py-1.5 uppercase tracking-widest italic shadow-xl">
                    Mais Recomendado
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-black uppercase italic italic mb-1 tracking-tighter">{plan.name}</h3>
                  <div className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-6 italic">{plan.objective}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-white/40">R$</span>
                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 mt-2 italic">Investimento Mensal</div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-bold text-white/60">
                       <CheckCircle2 className={`w-4 h-4 ${plan.highlight ? "text-brand-lime" : "text-white/20"}`} />
                       {feat}
                    </div>
                  ))}
                </div>

                <Link 
                  to={`/contrato?plan=${plan.name.toLowerCase()}`}
                  className={`w-full py-4 text-center text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    plan.highlight 
                      ? "bg-brand-lime text-black hover:bg-white" 
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <div className="flex items-center justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
                <div className="flex flex-col items-center gap-2">
                   <Lock className="w-4 h-4" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Pagamento Seguro via Stripe</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Google Partner Certificado</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Humanization / Specialist Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
           <div className="w-64 h-64 flex-shrink-0 bg-brand-card border-2 border-brand-lime relative overflow-hidden">
              {/* Placeholder for Specialist Photo - User recommended humanizing */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <img src="https://avatars.githubusercontent.com/u/124599?v=4" alt="Alexis" className="w-full h-full object-cover grayscale contrast-125" />
              </div>
           </div>
           <div>
              <div className="text-brand-lime text-[10px] font-black uppercase tracking-[0.3em] mb-4">O Especialista</div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6 leading-none">Alexis <span className="text-white/20">Marketing & Dev</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                "Não acredito em agências com centenas de clientes e atendimento genérico. Meu foco é atuar como um braço técnico e estratégico direto no seu negócio. Se eu não puder garantir o ROI, eu nem começo o projeto."
              </p>
              <div className="flex gap-8">
                 <div>
                    <div className="text-2xl font-black italic tracking-tighter leading-none mb-1">+R$ 2M</div>
                    <div className="text-[8px] uppercase tracking-widest font-bold text-white/40">Gerenciados em Ads</div>
                 </div>
                 <div>
                    <div className="text-2xl font-black italic tracking-tighter leading-none mb-1">98%</div>
                    <div className="text-[8px] uppercase tracking-widest font-bold text-white/40">Taxa de Retenção</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 bg-brand-dark/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Eliminando <span className="text-brand-lime">Dúvidas</span></h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Sem letras miúdas. Transparência total.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-brand-card px-8 py-2 rounded-none hover:border-white/10 transition-colors">
                <AccordionTrigger className="text-sm font-black uppercase italic tracking-widest hover:no-underline hover:text-brand-lime text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 leading-relaxed pt-4 pb-6 italic">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
          
          <h2 className="text-5xl md:text-7xl font-['Outfit'] font-black uppercase italic tracking-tighter mb-8 leading-none">
            Pare de Gastar. <br /><span className="text-brand-lime">Comece a Investir.</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto italic">
            Não espere a concorrência dominar as palavras-chave do seu setor. Solicite agora sua análise gratuita de domínio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-brand-lime text-black px-12 py-5 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform flex items-center gap-4">
               Fazer Análise Gratuita <Search className="w-5 h-5" />
             </button>
             <a href="https://wa.me/5532987037221" target="_blank" className="text-white/60 hover:text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                Ou falar via WhatsApp <MessageSquare className="w-4 h-4" />
             </a>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-2 opacity-20">
             <Star className="w-3 h-3 fill-white" />
             <Star className="w-3 h-3 fill-white" />
             <Star className="w-3 h-3 fill-white" />
             <Star className="w-3 h-3 fill-white" />
             <Star className="w-3 h-3 fill-white" />
          </div>
        </motion.div>
      </section>

      {/* Complementary Services */}
      <section className="py-24 px-6 border-t border-white/5 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Estratégia <span className="text-brand-lime">Omnichannel</span></h2>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-black italic">Expanda seu domínio para além do Google.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/gestao-de-redes-sociais" className="group bg-brand-card border border-white/5 p-10 hover:border-brand-lime/30 transition-all flex flex-col justify-between">
              <div>
                <Share2 className="w-10 h-10 text-brand-lime mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Gestão de Redes Sociais</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 italic">
                  Domine o Instagram, TikTok e YouTube com conteúdo de alta retenção e posicionamento de autoridade.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-lime group-hover:gap-5 transition-all">
                Ver Planos Sociais <ChevronRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/google-meu-negocio" className="group bg-brand-card border border-white/5 p-10 hover:border-brand-lime/30 transition-all flex flex-col justify-between">
              <div>
                <Globe className="w-10 h-10 text-brand-lime mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Google Meu Negócio</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 italic">
                  Domine as buscas locais e o Google Maps para atrair clientes que estão perto de você.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-lime group-hover:gap-5 transition-all">
                Explorar Mapas <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default HunterDom;
