import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Search, 
  Star, 
  Navigation, 
  MessageSquare, 
  Phone, 
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Map as MapIcon,
  Laptop,
  Award,
  HelpCircle,
  ShieldCheck,
  Globe,
  ArrowRight,
  Instagram,
  Facebook
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/landing/Footer";

import ModernLogo from "@/assets/alexis-logo.png";

const GoogleMeuNegocio = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const cycleSteps = [
    {
      icon: <MapIcon className="w-8 h-8 text-brand-lime" />,
      title: "Google Maps & GMN",
      subtitle: "Atração Imediata",
      description: "Colocamos sua empresa na cara do cliente exatamente quando ele pesquisa por você. Otimização completa para máxima relevância local."
    },
    {
      icon: <Laptop className="w-8 h-8 text-brand-lime" />,
      title: "Site com Domínio Próprio",
      subtitle: "Autoridade e Conversão",
      description: "Um site oficial (www.suaempresa.com.br) separa os curiosos dos clientes reais, transmitindo a confiança necessária para o fechamento."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-lime" />,
      title: "Estratégia Google Partner",
      subtitle: "Excelência Reconhecida",
      description: "Aplicamos as melhores práticas recomendadas pelo próprio Google para garantir que seu investimento traga o melhor retorno possível."
    }
  ];

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

  const whatsappLink = "https://wa.me/5532987037221?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Alexis%20Dev%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os.";

  return (
    <div className="bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black overflow-x-hidden min-h-screen">
      {/* Navbar - Matching Home Style */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 px-10 py-1.5 rounded-none flex items-center justify-between w-[95%] max-w-7xl pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-3">
            <Link to="/" className="absolute left-10 top-1/2 -translate-y-1/2">
              <img src={ModernLogo} alt="Alexis Marketing • Dev" className="h-[100px] w-auto drop-shadow-2xl" />
            </Link>
            <div className="w-[180px]"></div>
          </div>
          <div className="hidden md:flex items-center gap-12 text-sm font-medium text-white/70">
            <Link to="/" className="hover:text-brand-lime transition-colors flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold">
              <ArrowLeft className="w-4 h-4" /> Voltar para Home
            </Link>
            <a href="#ciclo" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-bold">O Ciclo</a>
            <a href="#autoridade" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-bold">Autoridade</a>
            <a href="#faq" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-bold">Dúvidas</a>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-brand-lime transition-all">
            Falar com Especialista
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-lime/10 border border-brand-lime/20 px-4 py-2 rounded-none text-brand-lime text-[10px] font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" /> Estratégia Google Partner Certificada
            </div>
            <h1 className="text-5xl lg:text-7xl font-['Outfit'] font-extrabold leading-[1.1] mb-8">
              Sua Empresa no Topo com a <span className="text-brand-lime">Chancela de um Google Partner</span>
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
              O Google Meu Negócio e o Google Maps são as ferramentas de visibilidade mais poderosas para o mercado local. Transformamos essa visibilidade em faturamento real com estratégias de elite.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-brand-lime text-black px-8 py-4 rounded-none font-bold flex items-center gap-3 hover:scale-105 transition-transform group">
                Quero minha empresa no topo <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <img src="https://res.cloudinary.com/deivliasb/image/upload/v1774740064/patner_s65hfp.png" alt="Google Partner" className="h-10 w-auto opacity-80" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="bg-brand-card border border-white/10 rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] p-1">
               <div className="relative aspect-square overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/deivliasb/image/upload/v1774740376/foto_quadrada_cwelxp.png" 
                    alt="Alexis Google Partner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Status */}
                  <div className="absolute bottom-6 left-6 right-6 bg-brand-dark/80 backdrop-blur-md border border-white/10 p-5 rounded-none">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-lime flex items-center justify-center text-black">
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-white font-bold text-sm">Domine o Mercado Local</p>
                           <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Presença otimizada no Google Maps</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cycle Section */}
      <section id="ciclo" className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">O Ciclo Perfeito para o seu Negócio</h2>
            <p className="text-white/40 max-w-2xl mx-auto italic">
              Combinamos visibilidade local com autoridade digital para criar uma jornada de cliente impecável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {cycleSteps.map((step, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.2 }} className="bg-brand-card border border-white/5 p-10 text-center hover:border-brand-lime/30 transition-all group relative z-10">
                <div className="w-16 h-16 bg-brand-lime/5 flex items-center justify-center mx-auto mb-8 border border-brand-lime/20 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Outfit']">{step.title}</h3>
                <div className="text-brand-lime text-[10px] uppercase font-bold tracking-[0.2em] mb-6">{step.subtitle}</div>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                
                {i < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section id="autoridade" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8">Por que a Chancela de um Google Partner ajuda a vender?</h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Não arrisque o futuro da sua empresa com quem não tem certificação. Use o poder do Google para posicionar sua marca à frente da concorrência com uma jornada completa: do mapa ao clique final no seu site.
            </p>
            <div className="space-y-4">
              {["Excelência em Gestão", "Resultados Comprovados", "Certificações Oficiais"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle2 className="text-brand-lime w-5 h-5" />
                  <span className="uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="p-8 bg-brand-card border border-white/5 flex items-center gap-8 hover:bg-white/5 transition-all">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <b.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2 font-['Outfit']">{b.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-12 h-12 bg-brand-lime/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-6 h-6 text-brand-lime" />
            </div>
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">Perguntas Frequentes</h2>
            <p className="text-white/40 italic">Tire suas dúvidas sobre como dominar o mercado local.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-brand-card px-8 py-2">
                <AccordionTrigger className="text-white hover:text-brand-lime transition-colors text-left font-bold text-lg font-['Outfit']">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 leading-relaxed text-base pt-2 pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8">Profissional para Criar Site - Contato Direto</h2>
          <p className="text-white/50 text-lg mb-12 italic">
            Transformamos sua presença local em autoridade digital máxima. Fale agora com quem entende o ecossistema do Google.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-brand-lime text-black px-12 py-5 rounded-none font-bold text-lg inline-flex items-center gap-3 hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" /> Chamar no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GoogleMeuNegocio;
