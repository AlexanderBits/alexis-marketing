import React, { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { alexis } from "@/api/alexisClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Shield, Loader2, Search, X, Copy, ClipboardCheck,
  CheckCircle2, Clock, Globe, Trash2, ExternalLink, ChevronDown, ChevronUp
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AdminNavbar } from "@/components/AdminNavbar";

export default function AdminWebsiteBriefing() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isLoadingAuth } = useAdminAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [copied, setCopied] = useState(null);

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["website-prompts"],
    queryFn: () => alexis.entities.WebsitePrompt.list("-created_date"),
    enabled: isAuthenticated,
  });

  const deletePrompt = async (e, id) => {
    e.stopPropagation();
    if (!confirm("Apagar este briefing de site?")) return;
    await alexis.entities.WebsitePrompt.delete(id);
    toast({ title: "Briefing apagado." });
    queryClient.invalidateQueries({ queryKey: ["website-prompts"] });
  };

  const copyField = async (text, id, field) => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(`${id}-${field}`);
      setTimeout(() => setCopied(null), 2000);
      toast({ title: "✅ Copiado!" });
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  };

  const filtered = prompts.filter(
    (p) =>
      p.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.segment?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800">
          <CardContent className="pt-10 pb-8 text-center space-y-4">
            <Shield className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-white text-2xl font-black">Acesso Restrito</h2>
            <Button onClick={() => alexis.auth.redirectToLogin(window.location.pathname)} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Entrar com Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminNavbar />

      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4FF33]/10 rounded-xl border border-[#D4FF33]/20">
              <Globe className="w-7 h-7 text-[#D4FF33]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Briefings de Sites</h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Projetos gerados pelo agente consultor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Card className="bg-slate-900 border-slate-800 px-5 py-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4FF33]" />
              <span className="font-black text-xl text-white">{prompts.length}</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total</span>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Buscar por cliente ou segmento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900/50 border-slate-800 text-white pl-12 py-6 focus:ring-[#D4FF33]/20"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-400 mx-auto mb-4" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800">
            <Globe className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {prompts.length === 0 ? "Nenhum briefing de site recebido ainda." : "Nenhum resultado encontrado."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => {
              const isOpen = expanded === p.id;
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-slate-900/50 border-slate-800 hover:border-[#D4FF33]/30 transition-all">
                    <CardContent className="p-0">
                      {/* Card Header Row */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => setExpanded(isOpen ? null : p.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#D4FF33]/10 border border-[#D4FF33]/20 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-[#D4FF33]" />
                          </div>
                          <div>
                            <p className="text-white font-bold">{p.client_name}</p>
                            <p className="text-slate-400 text-xs">{p.segment || "—"} · <span className="text-slate-500">{new Date(p.created_date).toLocaleDateString("pt-BR")}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-1 border ${
                            p.status === "concluido"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}>
                            {p.status === "concluido" ? "Concluído" : p.status || "Em andamento"}
                          </span>
                          <button
                            onClick={(e) => deletePrompt(e, p.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expanded Detail */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-800 p-4 space-y-4">

                              {/* Summary */}
                              {p.summary && (
                                <Section label="Resumo do Projeto" id={p.id} field="summary" value={p.summary} onCopy={copyField} copied={copied} />
                              )}

                              {/* Master Prompt — destaque principal */}
                              {p.master_prompt && (
                                <div className="bg-[#D4FF33]/5 border border-[#D4FF33]/20 p-4 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[#D4FF33] text-xs font-black uppercase tracking-wider">🤖 Prompt Mestre para IA Codificadora</span>
                                    <Button
                                      size="sm"
                                      onClick={() => copyField(p.master_prompt, p.id, "master")}
                                      className="bg-[#D4FF33] text-black hover:bg-[#D4FF33]/90 text-xs font-bold gap-1"
                                    >
                                      {copied === `${p.id}-master` ? <ClipboardCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                      {copied === `${p.id}-master` ? "Copiado!" : "Copiar Prompt"}
                                    </Button>
                                  </div>
                                  <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-mono bg-slate-950/50 p-3">
                                    {p.master_prompt}
                                  </pre>
                                </div>
                              )}

                              {/* Sitemap */}
                              {p.sitemap && (
                                <Section label="Mapa do Site" id={p.id} field="sitemap" value={p.sitemap} onCopy={copyField} copied={copied} />
                              )}

                              {/* Text Blocks */}
                              {p.text_blocks && (
                                <Section label="Blocos de Texto" id={p.id} field="text_blocks" value={p.text_blocks} onCopy={copyField} copied={copied} />
                              )}

                              {/* Next Steps */}
                              {p.next_steps && (
                                <Section label="Próximos Passos" id={p.id} field="next_steps" value={p.next_steps} onCopy={copyField} copied={copied} />
                              )}

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ label, id, field, value, onCopy, copied }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</span>
        <button
          onClick={() => onCopy(value, id, field)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied === `${id}-${field}` ? <ClipboardCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied === `${id}-${field}` ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto font-mono">
        {value}
      </pre>
    </div>
  );
}