import React, { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { alexis } from "@/api/alexisClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Trash2, Download, Search, X, Loader2, ArrowLeft, LogOut, Lock, Mail, MessageCircle, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AdminNavbar } from "@/components/AdminNavbar";

export default function AdminSocialLeads() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: isLoadingAuth } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['social-leads'],
    queryFn: () => alexis.entities.SocialMediaLead.list('-created_date'),
    enabled: isAuthenticated
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (leadId) => alexis.entities.SocialMediaLead.delete(leadId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-leads'] });
      toast({
        title: "Lead Excluído",
        description: "O lead foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao Excluir",
        description: error.message || "Não foi possível excluir o lead.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteLead = (leadId) => {
    if (window.confirm("Tem certeza que deseja excluir este lead?")) {
      deleteLeadMutation.mutate(leadId);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.whatsapp?.includes(searchTerm)
  );

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,WhatsApp,Data\n"
      + leads.map(l => `${l.email},${l.whatsapp},${new Date(l.created_date).toLocaleString('pt-BR')}`).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads_redes_sociais.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800 backdrop-blur-xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-white text-center text-2xl font-black tracking-tighter uppercase italic">Acesso Administrativo</CardTitle>
            <p className="text-white text-center text-sm mt-2 font-black uppercase tracking-widest leading-relaxed">Exclusivo para administradores.<br/>Faça login via Google Auth.</p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => alexis.auth.redirectToLogin(window.location.pathname)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 text-lg tracking-wide shadow-lg shadow-indigo-500/20"
            >
              Entrar com Google <Lock className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Gestão de Leads</h1>
              <p className="text-white text-[10px] uppercase font-black tracking-widest">Prospectos Capturados via Social</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button 
               onClick={exportLeads}
               variant="outline" 
               className="bg-slate-900/50 border-slate-800 hover:bg-slate-800 text-white border rounded-xl backdrop-blur-sm"
            >
              <Download className="mr-2 w-4 h-4" /> Exportar CSV
            </Button>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm flex items-center px-6 py-2 shadow-xl rounded-xl">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white mr-3">Total:</span>
               <span className="text-xl font-black text-white">{leads.length}</span>
            </Card>
          </div>
        </motion.div>

        <div className="grid gap-6 mb-8">
            <div className="relative">
                <Input
                  placeholder="Filtrar por e-mail ou número de contato..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900/50 border-slate-800 text-white pl-12 py-7 rounded-2xl focus:ring-indigo-500/20"
                />
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-20 bg-slate-900/10 rounded-3xl border border-slate-800 border-dashed">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white font-medium tracking-wide">Buscando leads na nuvem...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <Card className="bg-slate-900/20 border-slate-800 border-dashed py-20 text-center">
              <CardContent className="py-6">
                <MessageCircle className="w-16 h-16 text-white mx-auto mb-6 opacity-30" />
                <p className="text-white text-lg font-medium">Nenhum lead encontrado com estes critérios.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 transition-all group overflow-hidden relative rounded-2xl">
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                    <CardHeader className="pb-3 border-b border-slate-800/50 mb-4 bg-slate-800/10">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                            <Mail className="w-5 h-5 text-white" />
                         </div>
                         <CardTitle className="text-white text-base truncate pr-8" title={lead.email}>
                           {lead.email}
                         </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-green-500/5 border border-green-500/10">
                           <div className="flex items-center gap-3">
                              <MessageCircle className="w-5 h-5 text-green-500" />
                              <span className="text-green-200 font-bold tracking-wider">{lead.whatsapp}</span>
                           </div>
                           <a 
                             href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
                             target="_blank" 
                             className="text-xs font-bold text-green-400 hover:underline px-3 py-1 bg-green-500/10 rounded-lg"
                           >
                             ABRIR CONVERSA
                           </a>
                        </div>
                        <div className="flex items-center gap-2 text-white text-xs mt-2 px-1">
                          <Calendar className="w-3 h-3" />
                          <span>Capturado em: {new Date(lead.created_date).toLocaleString('pt-BR')}</span>
                        </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="max-w-7xl mx-auto py-12 px-6 border-t border-slate-900/50 flex justify-between items-center opacity-20 hover:opacity-100 transition-opacity mt-20">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Alexis Dev Admin Control</p>
        <Shield className="w-3 h-3 text-slate-500" />
      </footer>
    </div>
  );
}
