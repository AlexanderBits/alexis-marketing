import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Loader2 } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            Quase lá!
          </DialogTitle>
          <DialogDescription className="text-slate-400 pt-2 text-base">
            Preencha seus dados para que nossa equipe possa te oferecer o melhor atendimento personalizado via WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-300">
              E-mail Comercial *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium text-slate-300">
              WhatsApp *
            </Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="(00) 00000-0000"
              required
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="bg-slate-800 border-slate-700 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold shadow-lg shadow-green-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Prosseguir para o WhatsApp"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
