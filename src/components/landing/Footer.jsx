import React from "react";
import { motion } from "framer-motion";
import { Cpu, Mail, Phone, ExternalLink, Compass, Shield, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 items-center md:items-start"
            >
                <img
                  src="https://res.cloudinary.com/deivliasb/image/upload/v1774740064/patner_s65hfp.png"
                  alt="Alexis Marketing • Dev - Especialista Google Partner"
                  className="h-20 w-auto object-contain" />
            </motion.div>
            <p className="text-white mb-6 max-w-sm mx-auto md:mx-0">
              Sua <strong>presença digital premium</strong> começa aqui. Como <strong>Especialista em Desenvolvimento de Sites</strong>, entregamos soluções de criação de sites profissionais e estratégias de SEO de alta performance para colocar seu negócio no topo.
            </p>
            <div className="flex items-center gap-2 text-xs text-white justify-center md:justify-start">
              <Cpu className="w-3 h-3" />
              <span>Especialistas em Criação de Sites • Alexis Dev Authority</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-2 italic">
              <Compass className="w-3 h-3 text-brand-lime" />
              Navegação
            </h4>

            <ul className="space-y-3">
              <li><Link to="/" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Início</Link></li>
              <li><Link to="/google-meu-negocio" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Google Meu Negócio</Link></li>
              <li><Link to="/contrato" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Contrato</Link></li>
              <li><a href="/#servicos" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Serviços</a></li>
              <li><a href="/#portfolio" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Portfólio</a></li>
              <li><a href="/#sobre-nos" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Sobre Nós</a></li>
              <li><a href="/#contato" className="text-white/60 hover:text-brand-lime transition-colors text-sm">Contato</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 italic">Fale Conosco</h4>

            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:t.i@desenvolvimentodesites.com.br" className="flex items-center gap-3 text-white hover:text-white transition-colors text-sm">t.i@desenvolvimentodesites.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-white transition-colors text-sm">+55 (32) 987037221
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-4">
              <a href="https://instagram.com/alexismarketingedev" target="_blank" rel="noopener noreferrer" title="Siga no Instagram" className="p-2.5 bg-white/5 border border-white/10 rounded-none hover:bg-brand-lime hover:border-transparent transition-all duration-300 group hover:scale-110">
                <Instagram className="w-5 h-5 text-white group-hover:text-black transition-colors" />
              </a>
              <a href="https://www.facebook.com/alexdevmarketingIA/" target="_blank" rel="noopener noreferrer" title="Siga no Facebook" className="p-2.5 bg-white/5 border border-white/10 rounded-none hover:bg-brand-lime hover:border-transparent transition-all duration-300 group hover:scale-110">
                <Facebook className="w-5 h-5 text-white group-hover:text-black transition-colors" />
              </a>
            </div>

          </div>
        </div>

        {/* Regional SEO Presence Section */}
        <div className="mt-16 pt-12 border-t border-gray-900/50">
          <div className="text-center max-w-3xl mx-auto">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Abrangência & Presença Nacional</h5>
            <p className="text-white text-[11px] leading-relaxed italic">
              Liderança tecnológica com atendimento em <strong>todo o território nacional</strong>. Consolidamos nossa autoridade digital através de resultados extraordinários na Zona Norte de Rio, Zona Norte de BH e em todo o Norte do Brasil, operando hoje com infraestrutura de elite para clientes em qualquer parte do país e do mundo.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Alexis Dev • Especialista em Desenvolvimento de Sites e SEO.
          </p>
          <div className="flex gap-6 items-center">
            <Link to="/politica-de-privacidade" className="text-white/40 hover:text-brand-lime text-[10px] uppercase font-black tracking-widest transition-colors">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="text-white/40 hover:text-brand-lime text-[10px] uppercase font-black tracking-widest transition-colors">
              Termos
            </Link>
            <Link to="/contrato" className="text-white/40 hover:text-brand-lime text-[10px] uppercase font-black tracking-widest transition-colors">
              Contrato
            </Link>
            <Link to="/admin-leads" className="text-white hover:text-white transition-colors" title="Admin">
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}
