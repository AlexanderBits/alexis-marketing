import React from "react";
import { motion } from "framer-motion";
import { Cpu, Instagram, Linkedin, Mail, Phone } from "lucide-react";

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
              className="mb-6"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6971f9afeb3f9dc786ab5347/13e39b337_LogdaAlexisMarketingeDevelopersemFUndo.png"
                alt="Alexis Marketing & Dev"
                className="h-12 w-auto"
              />
            </motion.div>
            <p className="text-gray-500 mb-6 max-w-sm">
              Transformamos ideias em experiências digitais de alta performance. 
              Seu parceiro em tecnologia e inovação.
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
              {["Início", "Serviços", "Portfólio", "Sobre Nós", "Contato"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:contato@alexismarketing.com" 
                  className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  contato@alexismarketing.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+5511999999999" 
                  className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +55 (11) 99999-9999
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} Alexis Marketing & Dev. Todos os direitos reservados.
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
    </footer>
  );
}