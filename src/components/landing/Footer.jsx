import React from "react";
import { motion } from "framer-motion";
import { Cpu, Instagram, Linkedin, Mail, Phone, ExternalLink } from "lucide-react";
import combinedLogo from "@/assets/combined-logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
                <img
                  src={combinedLogo}
                  alt="Alexis Marketing • Dev - Especialista Google Partner"
                  className="h-20 w-auto object-contain" />
            </motion.div>
            <p className="text-gray-500 mb-6 max-w-sm">
              Sua <strong>presença digital premium</strong> começa aqui. Como <strong>Especialista Google Partner</strong>, entregamos soluções de criação de sites profissionais e estratégias de SEO de alta performance para colocar seu negócio na primeira página.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Cpu className="w-3 h-3" />
              <span>Desenvolvido com Tecnologia Next-Gen</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
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
          <div>
            <h4 className="text-white font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contato@desenvolvimentodesites.dev.br" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm">contato@desenvolvimentodesites.dev.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm">+55 (32) 987037221




                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
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

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Desenvolvimento de Sites e Marketing Google. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>);

}