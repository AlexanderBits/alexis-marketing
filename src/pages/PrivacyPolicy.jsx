import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-dark text-white/70 font-['Inter'] selection:bg-brand-lime selection:text-black">
      <div className="fixed top-8 left-8 z-50">
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -2 }}
            className="flex items-center gap-2 text-white/40 hover:text-brand-lime transition-colors bg-black/40 backdrop-blur-md px-6 py-2 rounded-none border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Voltar</span>
          </motion.div>
        </Link>
      </div>

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-['Outfit'] font-black text-white mb-8 tracking-tighter uppercase italic">
            Política de <br/><span className="text-brand-lime">Privacidade</span>
          </h1>
          <p className="text-sm text-gray-500 mb-12">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introdução</h2>
              <p>
                A <strong>Alexis Marketing • Dev</strong> está comprometida com a proteção de sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Coleta de Dados</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como quando você entra em contato conosco via WhatsApp ou preenche um formulário de consultoria. Isso pode incluir:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Nome e telefone de contato.</li>
                <li>Informações sobre sua empresa e necessidades de marketing/desenvolvimento.</li>
                <li>Dados de navegação coletados automaticamente por meio de cookies e tecnologias similares (Google Analytics).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Uso das Informações</h2>
              <p>
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Prestar nossos serviços de criação de sites e consultoria Google.</li>
                <li>Otimizar a experiência do usuário em nosso site por meio de SEO e análise de performance.</li>
                <li>Responder a solicitações de suporte ou contato comercial.</li>
                <li>Cumprir obrigações legais vinculadas ao selo Google Partner.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Compartilhamento de Dados</h2>
              <p>
                Não vendemos ou alugamos seus dados pessoais. Podemos compartilhar informações com provedores de serviços terceirizados (como Google Ads, Stripe ou Asaas) apenas na medida necessária para a execução do serviço contratado ou análise de marketing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Seus Direitos</h2>
              <p>
                Como titular de dados, você tem o direito de solicitar o acesso, retificação ou exclusão de suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato através do nosso canal oficial no WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Segurança</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição. Nosso site utiliza criptografia HTTPS e arquitetura otimizada para máxima proteção.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-800">
              <p className="text-gray-400">
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  </div>
  );
}
