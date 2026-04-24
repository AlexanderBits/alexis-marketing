import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Download, 
  ChevronRight, 
  Star, 
  Cpu, 
  Code2, 
  GitBranch, 
  PlusCircle, 
  Play, 
  Search,
  Globe,
  Github,
  Terminal,
  Zap,
  Box,
  Layout,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Compass,
  Layers,
  MousePointer2,
  Lock,
  MapPin,
  Instagram,
  Facebook,
  Shield,
  Menu,
  X
} from "lucide-react";
import ModernLogo from "@/assets/alexis-logo.png";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";



const ModernLanding = () => {
  const fadeInUp = {


    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      icon: <Zap className="w-6 h-6 text-brand-lime" />,
      title: "Performance & Tráfego",
      description: "Campanhas de Google Ads focadas em ROI. Transforme seu site em uma máquina de vendas.",
      link: "/performance"
    },
    {
      icon: <Instagram className="w-6 h-6 text-brand-lime" />,
      title: "Redes Sociais",
      description: "Posicionamento estratégico no Instagram, TikTok e YouTube para criar autoridade.",
      link: "/gestao-de-redes-sociais"
    },
    {
      icon: <Cpu className="w-6 h-6 text-brand-lime" />,
      title: "Sites Next-Gen",
      description: "Desenvolvimento com as tecnologias mais rápidas do mercado como React e Next.js.",
      link: "/"
    },
    {
      icon: <Layout className="w-6 h-6 text-brand-lime" />,
      title: "Landing Pages",
      description: "Páginas otimizadas para converter visitantes em clientes reais de forma automática.",
      link: "/"
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-lime" />,
      title: "Google Maps",
      description: "Domine o Google Maps e apareça para clientes locais que buscam seu serviço agora.",
      link: "/google-meu-negocio"
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-lime" />,
      title: "Estratégia Digital",
      description: "Consultoria completa para dominar o mercado e escalar seu faturamento online.",
      link: "/"
    }

  ];

  const cases = [
    {
      company: "ABME",
      fullName: "Associação Brasileira de Mídias Evangélicas",
      text: "Plataforma institucional completa desenvolvida para fortalecer veículos de comunicação cristãos em todo o Brasil. Sistema moderno com gestão avançada.",
      url: "https://abme.com.br/"
    },
    {
      company: "CEMAD-RJ",
      fullName: "Convenção Assembleias de Deus - RJ",
      text: "Portal institucional que integra diretórios regionais e área ministerial completa. Ferramentas modernas para o trabalho evangélico no Rio.",
      url: "https://convencaocemad.com.br/"
    },
    {
      company: "OMB-RJ",
      fullName: "Ordem dos Músicos do Brasil • RJ",
      text: "Autarquia Federal oficial de valorização profissional dos músicos. Garantindo direitos e regulamentação para a classe musical.",
      url: "https://novaombrj.org.br"
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
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
               <img src="https://res.cloudinary.com/deivliasb/image/upload/v1774740064/patner_s65hfp.png" alt="Google Partner" className="w-[250px] h-auto opacity-80" />
            </div>
            <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-['Outfit'] font-extrabold leading-[1.1] mb-8">
              Criação de <br className="hidden xs:block" />Sites Profissionais <br className="hidden xs:block" />Next-Gen
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
              Desenvolvemos projetos com design exclusivo e arquitetura digital de alta performance para dominar o Google.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a href="https://wa.me/5532987037221?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Alexis%20Dev%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os." target="_blank" rel="noopener noreferrer" className="bg-brand-lime text-black px-8 py-4 rounded-none font-bold flex items-center gap-3 hover:scale-105 transition-transform group">
                Iniciar Projeto <ChevronRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm text-white/40">Especialista Google Partner | Todo o Brasil</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-brand-lime text-brand-lime" />)}
                </div>
                <span className="text-sm font-bold">5.0 Expertise</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Visual Code Peek */}
            <div className="bg-[#1e1e1e] border border-white/10 rounded-none overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-none bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-none bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-none bg-[#27c93f]" />
                </div>
                <span className="text-white/40 text-xs ml-4">SitePerformance.config.js</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <div className="flex gap-4">
                  <div className="text-white/20 select-none text-right w-4">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
                  </div>
                  <div className="whitespace-pre">
                    <span className="text-[#6a9955]">// Alexis Dev Engine Optimization</span>{"\n"}
                    <span className="text-[#c586c0]">export const</span> config = {"{"}{"\n"}
                    {"  "}speed: <span className="text-[#ce9178]">'100/100'</span>,{"\n"}
                    {"  "}seo: <span className="text-[#ce9178]">'Advanced'</span>,{"\n"}
                    {"  "}security: <span className="text-[#ce9178]">'Ultra'</span>,{"\n"}
                    {"  "}hospedagem: <span className="text-[#ce9178]">'Ilimitada'</span>,{"\n"}
                    {"  "}framework: <span className="text-[#ce9178]">'Next.js + AI'</span>{"\n"}
                    {"}"};{"\n"}
                    {"\n"}
                    <span className="text-[#dcdcaa]">initProject</span>(<span className="text-[#ce9178]">'Premium Design'</span>);
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Checklist */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-4 md:-right-10 bg-brand-card border border-white/10 p-6 rounded-none shadow-2xl max-w-[280px]"
            >
              <ul className="space-y-3">
                {["Design Exclusivo", "SEO Nativo", "Mobile-First", "Alta Performance"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-4 h-4 rounded-none border border-brand-lime flex items-center justify-center">
                      <div className="w-2 h-2 rounded-none bg-brand-lime" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-['Outfit'] font-bold mb-4">Nossos diferenciais</h2>
              <p className="text-white/40 max-w-md">
                Metodologia em Desenvolvimento de Sites que transforma sua presença digital em resultados.
              </p>
            </div>
            <a href="#contato" className="text-brand-lime flex items-center gap-2 font-bold hover:gap-3 transition-all">
              Ver todos os serviços <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link 
                to={service.link}
                key={i}
                className="bg-brand-card border border-white/5 p-8 rounded-none hover:border-brand-lime/30 transition-all group block"
              >
                <div className="mb-6 p-3 bg-white/5 rounded-none w-fit group-hover:bg-brand-lime/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-lime opacity-0 group-hover:opacity-100 transition-all">
                  Saber mais <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Main Concept Section */}
      <section id="metodologia" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">Metodologia de Alta Performance</h2>
          <p className="text-white/40">Utilizamos o que há de mais avançado em tecnologia para garantir o sucesso do seu projeto.</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-40">
          {/* SEO Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-3xl font-bold mb-6 font-['Outfit']">SEO de Elite Nativo</h3>
              <p className="text-white/50 mb-8 leading-relaxed text-lg">
                Seu site não será apenas bonito; ele será uma máquina de vendas. Implementamos SEO técnico desde o primeiro dia para que você apareça nas primeiras páginas.
              </p>
              <div className="flex gap-4">
                 <CheckCircle2 className="text-brand-lime w-5 h-5" />
                 <span className="text-sm text-white/70">Otimização de Carregamento</span>
              </div>
              <div className="flex gap-4 mt-2">
                 <CheckCircle2 className="text-brand-lime w-5 h-5" />
                 <span className="text-sm text-white/70">Marcação de Dados Estruturados</span>
              </div>
            </motion.div>
            <div className="bg-brand-card rounded-none p-4 border border-white/5 shadow-2xl">
              <div className="bg-[#1e1e1e] rounded-none overflow-hidden aspect-video relative flex flex-col items-center justify-center">
                 <div className="text-brand-lime text-6xl font-black font-['Outfit'] mb-2">100</div>
                 <div className="text-white/40 uppercase tracking-widest text-xs">PageSpeed Insights Score</div>
                 <div className="flex gap-2 mt-8">
                    <div className="w-20 h-1 bg-brand-lime rounded-none" />
                    <div className="w-20 h-1 bg-brand-lime rounded-none" />
                    <div className="w-20 h-1 bg-brand-lime rounded-none" />
                 </div>
              </div>
            </div>
          </div>

          {/* Hosting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-brand-card rounded-none p-4 border border-white/5 shadow-2xl">
              <div className="bg-[#1e1e1e] rounded-none overflow-hidden aspect-video flex items-center justify-center">
                 <div className="relative">
                    <Globe className="w-32 h-32 text-brand-lime opacity-20 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <ShieldCheck className="w-16 h-16 text-brand-lime" />
                    </div>
                 </div>
              </div>
            </div>
            <motion.div {...fadeInUp} className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-6 font-['Outfit']">Hospedagem Premium</h3>
              <p className="text-white/50 mb-8 leading-relaxed text-lg">
                Infraestrutura robusta com hospedagem ilimitada e segurança de nível bancário. Protegemos sua marca e garantimos que seu site nunca fique fora do ar.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 bg-brand-lime rounded-none" />
                    SSL Gratuito Vitalício
                 </li>
                 <li className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1 h-1 bg-brand-lime rounded-none" />
                    Backup Diário Automático
                 </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration/Ecosystem */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8 leading-tight">Ecossistema Digital <br />Completo</h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-md">
              Integramos seu site com as melhores ferramentas de CRM, Marketing e Automação para escalar seu negócio de forma inteligente.
            </p>
            <button className="bg-brand-lime text-black px-6 py-3 rounded-none font-bold text-sm">Ver Integrações</button>
          </motion.div>

          <div className="relative h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-full h-full">
                  {[
                    { icon: <MessageSquare className="w-8 h-8"/>, pos: "top-10 left-20" },
                    { icon: <Github className="w-8 h-8"/>, pos: "top-0 right-20" },
                    { icon: <Globe className="w-8 h-8"/>, pos: "top-[40%] left-[10%]" },
                    { icon: <MousePointer2 className="w-8 h-8"/>, pos: "bottom-10 right-[30%]" },
                    { icon: <Zap className="w-8 h-8"/>, pos: "bottom-[20%] left-[30%]" },
                    { icon: <Box className="w-8 h-8"/>, pos: "top-[60%] right-[10%]" }
                  ].map((logo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute ${logo.pos} p-4 bg-brand-card border border-white/10 rounded-none shadow-xl backdrop-blur-sm"
                    >
                      <div className="text-brand-lime">{logo.icon}</div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-gradient-to-b from-brand-dark to-black">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-['Outfit'] font-bold mb-4">Cases de Sucesso</h2>
          <p className="text-white/40">Presença Digital Premium & Marketing Google para grandes marcas.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {cases.map((item, i) => (
             <motion.div key={i} {...fadeInUp} className="bg-brand-card border border-white/5 p-8 rounded-none hover:border-brand-lime/20 transition-all flex flex-col h-full">
                <h4 className="font-bold text-xl text-brand-lime mb-2">{item.company}</h4>
                <p className="text-white/30 text-xs mb-4 uppercase tracking-widest">{item.fullName}</p>
                <p className="text-white/60 mb-8 leading-relaxed flex-grow italic">"{item.text}"</p>
                <a href={item.url} target="_blank" className="flex items-center gap-2 text-sm font-bold text-white/80 hover:text-brand-lime">
                   Ver Projeto <ExternalLink className="w-4 h-4" />
                </a>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre-nos" className="py-32 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
             <h2 className="text-4xl md:text-5xl font-['Outfit'] font-black mb-8 tracking-tighter uppercase italic">
               Sobre <span className="text-brand-lime">Nós</span>
             </h2>
             <div className="space-y-6 text-white/60 text-lg leading-relaxed">
               <p>
                 A <strong>Alexis Marketing • Dev</strong> nasceu da visão de unir tecnologia de ponta com estratégias de marketing agressivas. Não somos apenas uma agência; somos o motor de crescimento do seu negócio.
               </p>
               <p>
                 Como especialistas com chancela <strong>Google Partner</strong>, nossa missão é simples: colocar sua marca no topo e garantir que ela permaneça lá através de sites Next Gen e SEO de elite.
               </p>
             </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 p-8 border border-white/10 text-center">
                <div className="text-3xl font-black text-brand-lime mb-2">100%</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Foco em ROI</div>
             </div>
             <div className="bg-white/5 p-8 border border-white/10 text-center">
                <div className="text-3xl font-black text-brand-lime mb-2">+10y</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Experiência</div>
             </div>
             <div className="bg-white/5 p-8 border border-white/10 text-center">
                <div className="text-3xl font-black text-brand-lime mb-2">Next</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Tech Stack</div>
             </div>
             <div className="bg-white/5 p-8 border border-white/10 text-center">
                <div className="text-3xl font-black text-brand-lime mb-2">Sec</div>
                <div className="text-[10px] uppercase tracking-widest font-bold">Banking Level</div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contato" className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto bg-gradient-to-r from-brand-lime/10 to-emerald-500/10 border border-brand-lime/20 rounded-none p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-lime/50 to-transparent" />
          
          <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8">Pronto para transformar sua <br />presença digital?</h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
            Agende uma consultoria gratuita com um Especialista Google Partner e descubra como dominar seu mercado online.
          </p>
          <button className="bg-brand-lime text-black px-10 py-4 rounded-none font-bold flex items-center gap-3 mx-auto hover:scale-105 transition-transform">
            Falar com Especialista <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ModernLanding;
