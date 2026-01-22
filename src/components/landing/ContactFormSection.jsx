import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", company: "", message: "" });
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Vamos Conversar
          </h2>
          <p className="text-gray-400">
            Fale sobre seu projeto. Retornamos com uma proposta técnica personalizada.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Nome</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
                className="bg-transparent border-gray-800 text-white placeholder:text-gray-600 focus:border-gray-600 h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                className="bg-transparent border-gray-800 text-white placeholder:text-gray-600 focus:border-gray-600 h-12 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Nome da Empresa</label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Sua empresa ou projeto"
              className="bg-transparent border-gray-800 text-white placeholder:text-gray-600 focus:border-gray-600 h-12 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Mensagem</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Conte-nos sobre seu projeto, objetivos e prazos desejados..."
              required
              rows={5}
              className="bg-transparent border-gray-800 text-white placeholder:text-gray-600 focus:border-gray-600 rounded-lg resize-none"
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button 
              type="submit"
              size="lg"
              disabled={isSubmitted}
              className="w-full bg-white text-black hover:bg-gray-200 rounded-lg h-14 text-base font-semibold group transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="mr-2 w-5 h-5 text-green-600" />
                  Mensagem Enviada!
                </>
              ) : (
                <>
                  Enviar Mensagem
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-xs text-gray-600">
            Respondemos em até 24 horas úteis.
          </p>
        </motion.form>
      </div>
    </section>
  );
}