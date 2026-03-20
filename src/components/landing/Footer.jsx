import React from "react";
import { motion } from "framer-motion";
import { Cpu, Instagram, Linkedin, Mail, Phone, ExternalLink, Compass, Shield } from "lucide-react";
import combinedLogo from "@/assets/combined-logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-gray-900">
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
                  src={combinedLogo}
                  alt="Alexis Marketing • Dev - Especialista Google Partner"
                  className="h-20 w-auto object-contain" />
            </motion.div>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto md:mx-0">
              Sua <strong>presença digital premium</strong> começa aqui. Como <strong>Especialista em Desenvolvimento de Sites</strong>, entregamos soluções de criação de sites profissionais e estratégias de SEO de alta performance para colocar seu negócio no topo.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600 justify-center md:justify-start">
              <Cpu className="w-3 h-3" />
              <span>Especialistas em Criação de Sites • Alexis Dev Authority</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-500" />
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/google-meu-negocio" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Google Meu Negócio
                </Link>
              </li>
              <li>
                <Link to="/contrato" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Contrato 1
                </Link>
              </li>
              {["Serviços", "Portfólio", "Sobre Nós", "Contato"].map((link) =>
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-white font-semibold mb-6">Fale Conosco</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contato@alexis.dev.br" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm">contato@alexis.dev.br
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm">+55 (32) 987037221
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {[Instagram, Linkedin].map((Icon, i) =>
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-all">

                  <Icon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Regional SEO Presence Section */}
        <div className="mt-16 pt-12 border-t border-gray-900/50">
          <div className="text-center max-w-3xl mx-auto">
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Abrangência & Presença Nacional</h5>
            <p className="text-gray-600 text-[11px] leading-relaxed italic">
              Liderança tecnológica com atendimento em <strong>todo o território nacional</strong>. Consolidamos nossa autoridade digital através de resultados extraordinários na Zona Norte do Rio, Zona Norte de BH e em todo o Norte do Brasil, operando hoje com infraestrutura de elite para clientes em qualquer parte do país e do mundo.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Alexis Dev • Especialista em Desenvolvimento de Sites e SEO.
          </p>
          <div className="flex gap-6 items-center">
            <Link to="/politica-de-privacidade" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Termos
            </Link>
            <Link to="/admin-contratos" className="text-gray-600 hover:text-blue-500 transition-colors" title="Dashboard Admin">
              <Shield className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}