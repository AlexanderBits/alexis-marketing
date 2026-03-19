import React from "react";
import { motion } from "framer-motion";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-300 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Termos de Uso
          </h1>
          <p className="text-sm text-gray-500 mb-12">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o site da <strong>Alexis Marketing • Dev</strong>, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços ou acessar este site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição dos Serviços</h2>
              <p>
                A Alexis Marketing • Dev oferece serviços especializados em:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Desenvolvimento de sites profissionais, landing pages e sistemas Next Gen.</li>
                <li>Consultoria estratégica em Google Meu Negócio e Google Ads.</li>
                <li>Otimização de SEO (Search Engine Optimization) aplicada diretamente no código.</li>
                <li>Integração de gateways de pagamento e bancos de dados.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones, imagens e códigos-fonte, é de propriedade exclusiva da Alexis Marketing • Dev ou de seus licenciadores, protegidos pelas leis de direitos autorais brasileiras e internacionais. A reprodução não autorizada é estritamente proibida.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitação de Responsabilidade</h2>
              <p>
                Embora utilizemos tecnologias de ponta e sigamos as diretrizes de <strong>Especialista Google Partner</strong>, não garantimos resultados específicos de faturamento, uma vez que o sucesso comercial depende de variáveis externas ao desenvolvimento técnico. Não nos responsabilizamos por perdas de dados ou lucros cessantes decorrentes do uso indevido do site pelo usuário.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, visando a melhoria dos nossos serviços e a conformidade com novas legislações. Recomendamos a consulta periódica desta página.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Foro e Legislação Aplicável</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. Para qualquer controvérsia decorrente do uso deste site, fica eleito o foro da comarca de Juiz de Fora - MG, com renúncia expressa a qualquer outro.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-800 text-center">
              <p className="text-gray-400">
                Obrigado por escolher a excelência da Alexis Marketing • Dev.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
