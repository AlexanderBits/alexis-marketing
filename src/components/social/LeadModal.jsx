import React, { useState } from "react";
import { MessageCircle, Loader2, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function LeadModal({ isOpen, onOpenChange }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create lead in Base44
      // We use base44.entities.SocialMediaLead.create if it exists, 
      // otherwise it might show an error if the entity is not defined in the backend.
      // However, Base44 often handles dynamic entity creation if configured.
      await base44.entities.SocialMediaLead.create(formData);

      toast({
        title: "Sucesso!",
        description: "Suas informações foram salvas. Redirecionando para o WhatsApp...",
      });

      // Redirect after a short delay
      setTimeout(() => {
        window.open("https://wa.me/5532987037221", "_blank");
        onOpenChange(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      // Even if it fails to save, we might still want to redirect the user to WhatsApp
      // but let's try to save first.
      window.open("https://wa.me/5532987037221", "_blank");
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />
        
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <MessageCircle className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Quase lá!</h2>
        </div>

        <p className="text-slate-400 mb-8 leading-relaxed">
          Preencha seus dados para que nossa equipe possa oferecer o melhor atendimento personalizado via WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">E-mail Comercial *</label>
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">WhatsApp *</label>
            <input
              name="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              required
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando informações...
              </>
            ) : (
              <>
                Prosseguir para o WhatsApp
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
