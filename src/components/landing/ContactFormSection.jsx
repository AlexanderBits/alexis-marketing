import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function ContactFormSection({ onCTA }) {
  const handleClick = (e) => {
    if (onCTA) {
      e.preventDefault();
      onCTA();
    }
  };

  return (
    <section id="contato" className="py-32 bg-black relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Profissional para Criar Site - Contato Direto
          </h2>
          <p className="text-gray-400 mb-8">
            Profissional que faz site e profissionais que criam sites. Fazemos sites profissionais 
            e criação de site profissional preço competitivo. Entre em contato via WhatsApp para 
            montar um site profissional ou criar site de vendas profissional.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="https://wa.me/5532987037221" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg group transition-all duration-300"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chamar no WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}