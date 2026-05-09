import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Mail, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  MessageSquare,
  Lock,
  Clock
} from "lucide-react";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import nortecnetEmailImg from "@/assets/nortecnet-email.png";

const ReativacaoEmailNortecnet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reativação de E-mails Nortecnet - Janaúba MG | Alexis Dev";
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const includes = [
    "Ativação do endereço de e-mail",
    "Configuração completa do encaminhamento",
    "Integração com Gmail",
    "Suporte técnico",
    "Manutenção contínua do funcionamento",
    "Proteção e gerenciamento do encaminhamento"
  ];

  return (
    <div className="bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black overflow-x-hidden min-h-screen">
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
            <div className="inline-flex items-center gap-2 bg-brand-lime/10 border border-brand-lime/20 px-4 py-2 rounded-none text-brand-lime text-[10px] font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" /> Continuidade Digital Segura
            </div>
            <h1 className="text-4xl lg:text-6xl font-['Outfit'] font-extrabold leading-[1.1] mb-8 break-words">
              Seu antigo e-mail <span className="text-brand-lime">@nortecnet.com.br</span> pode voltar a funcionar
            </h1>
            <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
              <strong>Atenção ex-usuários da Nortecnet em Janaúba, Porteirinha, Jaíba e Monte Azul!</strong><br /><br />
              Você utilizava o famoso <strong>Webmail da Nortecnet</strong> na época da internet discada e precisa recuperar o acesso às mensagens ou redirecionar novas mensagens enviadas para o seu endereço antigo? Nós oferecemos o serviço de resgate e redirecionamento de e-mails para o seu Gmail atual.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link to="/contrato?service=nortecnet" className="bg-brand-lime text-black px-8 py-4 rounded-none font-bold flex items-center gap-3 hover:scale-105 transition-transform group">
                Reativar meu e-mail agora <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center gap-6 text-white/40 text-sm">
              <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Encaminhamento Seguro</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Fidelidade de 12 meses</span>
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
                    src={nortecnetEmailImg} 
                    alt="Reativação de E-mail Nortecnet" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Status */}
                  <div className="absolute bottom-6 left-6 right-6 bg-brand-dark/80 backdrop-blur-md border border-white/10 p-5 rounded-none">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-lime flex items-center justify-center text-black">
                           <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-white font-bold text-sm">Recupere suas Mensagens</p>
                           <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Encaminhamento automático para Gmail</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">Como Funciona?</h2>
            <p className="text-white/40 max-w-2xl mx-auto italic">
              É simples, prático e você não precisa aprender a usar uma plataforma nova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="bg-brand-card border border-white/5 p-10 hover:border-brand-lime/30 transition-all">
              <div className="w-12 h-12 bg-brand-lime/10 flex items-center justify-center text-brand-lime mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">Seu Antigo E-mail</h3>
              <p className="text-brand-lime font-mono text-lg mb-4">voce@nortecnet.com.br</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Todas as mensagens recebidas no seu antigo endereço são capturadas pelo nosso sistema.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-brand-card border border-white/5 p-10 hover:border-brand-lime/30 transition-all">
              <div className="w-12 h-12 bg-brand-lime/10 flex items-center justify-center text-brand-lime mb-6">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-['Outfit']">Seu Gmail Atual</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Encaminhamos tudo automaticamente para o seu Gmail (ou outro e-mail de sua preferência). Você continua recebendo normalmente pelo celular, computador ou aplicativo Gmail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included & Pricing */}
      <section id="incluso-preco" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8">O que está incluso no serviço?</h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Cuidamos de toda a parte técnica para que você recupere sua identidade digital sem complicações.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {includes.map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle2 className="text-brand-lime w-5 h-5 flex-shrink-0" />
                  <span className="uppercase tracking-widest text-xs">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.2 }}
            className="bg-brand-card border border-white/10 p-12 text-center relative"
          >
            <div className="absolute top-0 right-0 bg-brand-lime text-black px-4 py-1 text-xs font-bold uppercase">
              Plano Anual
            </div>
            <h3 className="text-2xl font-bold mb-6 font-['Outfit']">Valor do Serviço</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-white/40 text-2xl font-bold">R$</span>
              <span className="text-brand-lime text-7xl font-extrabold">29,90</span>
              <span className="text-white/40 text-xl font-bold">/mês</span>
            </div>
            <p className="text-white/40 text-sm mb-8 italic">
              Fidelidade de 12 meses
            </p>
            <Link to="/contrato?service=nortecnet" className="w-full bg-brand-lime text-black px-8 py-4 rounded-none font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform group">
              Contratar Agora <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Important Notes */}
      <section id="importante" className="py-32 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-brand-lime/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-6 h-6 text-brand-lime" />
            </div>
            <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-6">Informações Importantes</h2>
            <p className="text-white/40 italic">Transparência e segurança em primeiro lugar.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-card border border-white/5 p-8">
              <h4 className="text-white font-bold text-lg mb-2 font-['Outfit']">Continuidade Digital</h4>
              <p className="text-white/40 text-sm leading-relaxed">
                O serviço consiste em encaminhamento e continuidade digital do endereço de e-mail. Não realizamos acesso a mensagens antigas, invasão de contas ou recuperação indevida de dados.
              </p>
            </div>
            <div className="bg-brand-card border border-white/5 p-8">
              <h4 className="text-white font-bold text-lg mb-2 font-['Outfit']">Vínculo Legítimo</h4>
              <p className="text-white/40 text-sm leading-relaxed">
                O cliente deve possuir vínculo legítimo com o endereço solicitado. Não ativaremos e-mails para fins de personificação ou uso indevido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-['Outfit'] font-bold mb-8">Atendimento Especial para Janaúba MG e Região</h2>
          <p className="text-white/50 text-lg mb-12 italic">
            Caso você possua um antigo endereço @nortecnet.com.br e deseje verificar disponibilidade para reativação, entre em contato conosco ou siga para o contrato.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contrato?service=nortecnet" className="bg-brand-lime text-black px-12 py-5 rounded-none font-bold text-lg inline-flex items-center gap-3 hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" /> Seguir para o Contrato
            </Link>
            <a href="https://wa.me/5532987037221?text=Ol%C3%A1%2C%20gostaria%20de%20verificar%20a%20disponibilidade%20do%20meu%20e-mail%20Nortecnet." target="_blank" rel="noopener noreferrer" className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-none font-bold text-lg inline-flex items-center gap-3 hover:bg-white/5 transition-colors">
              <MessageSquare className="w-6 h-6" /> Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReativacaoEmailNortecnet;
