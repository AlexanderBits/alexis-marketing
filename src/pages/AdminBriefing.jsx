import React, { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Shield, Loader2, Lock, Search, X, Download, Copy, ClipboardCheck,
  Target, DollarSign, BarChart2, Users, BookOpen, Image, Layers,
  CheckCircle2, Clock, Star, ArrowLeft, Building2, User
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { AdminNavbar } from "@/components/AdminNavbar";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const OBJECTIVE_LABELS = {
  leads: "📋 Geração de Leads",
  vendas: "🛒 Vendas Online / E-commerce",
  awareness: "📣 Reconhecimento de Marca",
  app_installs: "📱 Instalações de App",
  trafego: "🌐 Tráfego para Site",
  mensagens: "💬 Mensagens (WhatsApp/DM)",
};

const STRUCTURE_LABELS = {
  campanha_unica: "🎯 Campanha única com 1 público",
  abtest: "🧪 Teste A/B (múltiplos criativos)",
  funil: "🔄 Funil completo (Topo/Meio/Fundo)",
  retargeting: "🔁 Retargeting + Aquisição",
};

const STATUS_CONFIG = {
  pendente: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  em_analise: { label: "Em Análise", color: "bg-blue-500/10 text-white border-blue-500/20" },
  aprovado: { label: "Aprovado", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

/** Gera o prompt de contexto para a IA de anúncios */
function generateAIPrompt(b) {
  const stripHtml = (html) => (html || "").replace(/<[^>]*>/g, "").trim();

  return `
╔══════════════════════════════════════════════╗
   BLUEPRINT DE CAMPANHA — ALEXIS MARKETING
╚══════════════════════════════════════════════╝

Cliente: ${b.client_name}
Empresa: ${b.company_name}
Nicho: ${b.niche}
Data: ${new Date(b.created_date).toLocaleDateString("pt-BR")}

━━━ 7 PILARES ESTRUTURAIS ━━━

🎯 PILAR 1 — OBJETIVO
${OBJECTIVE_LABELS[b.pillar_1_objective] || b.pillar_1_objective}

💰 PILAR 2 — VALORES FINANCEIROS
• Ticket Médio: R$ ${Number(b.pillar_2_ticket).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• CPL Estimado: R$ ${Number(b.pillar_2_cpl_estimate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
• ROI Target: ${b.pillar_2_roi_target}%

📊 PILAR 3 — DADOS DE CONVERSÃO DISPONÍVEIS
${(b.pillar_3_conversion_data || []).join(", ") || "Nenhum informado"}

👥 PILAR 4 — PÚBLICO-ALVO
${b.pillar_4_audience}

📖 PILAR 5 — CONTEXTO DO NEGÓCIO
${stripHtml(b.pillar_5_context)}

🎨 PILAR 6 — CRIATIVOS DISPONÍVEIS
${b.pillar_6_creatives}

🏗️ PILAR 7 — ESTRUTURA DE CAMPANHA
${STRUCTURE_LABELS[b.pillar_7_structure] || b.pillar_7_structure}

━━━ INSTRUÇÃO PARA A IA DE ANÚNCIOS ━━━

Com base nos 7 pilares acima, desenvolva uma estratégia de campanha completa no Google Ads / Meta Ads para atingir o objetivo de "${OBJECTIVE_LABELS[b.pillar_1_objective] || b.pillar_1_objective}" para a empresa ${b.company_name} no nicho ${b.niche}.

Considere os dados de conversão disponíveis para otimização algorítmica, segmente para o público descrito e estruture conforme: ${STRUCTURE_LABELS[b.pillar_7_structure] || b.pillar_7_structure}.

Target de ROI: ${b.pillar_2_roi_target}% por lead qualificado.
  `.trim();
}

/** Exporta para CSV */
function exportCSV(briefings) {
  const headers = ["Cliente", "Empresa", "Nicho", "Objetivo", "Ticket", "CPL", "ROI%", "Estrutura", "Status", "Data"];
  const rows = briefings.map((b) => [
    b.client_name,
    b.company_name,
    b.niche,
    OBJECTIVE_LABELS[b.pillar_1_objective] || b.pillar_1_objective,
    b.pillar_2_ticket,
    b.pillar_2_cpl_estimate,
    b.pillar_2_roi_target,
    b.pillar_7_structure,
    b.status,
    new Date(b.created_date).toLocaleDateString("pt-BR"),
  ]);
  const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].map((r) => r.join(",")).join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", "briefings_campanha.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────

export default function AdminBriefing() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: isLoadingAuth } = useAdminAuth();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const { data: briefings = [], isLoading } = useQuery({
    queryKey: ["campaign-briefings"],
    queryFn: () => base44.entities.CampaignBriefing.list("-created_date"),
    enabled: isAuthenticated,
  });

  const copyPrompt = async (briefing) => {
    const prompt = generateAIPrompt(briefing);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast({ title: "✅ Prompt copiado!", description: "Cole no Google Ads AI ou no Meta Advantage+." });
    } catch {
      toast({ title: "Erro ao copiar", variant: "destructive" });
    }
  };

  const filtered = briefings.filter(
    (b) =>
      b.client_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.niche?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Login ──
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
        <Card className="max-w-md w-full bg-slate-900 border-slate-800 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <CardTitle className="text-white text-2xl font-black tracking-tighter">Área de Inteligência</CardTitle>
            <p className="text-white text-[10px] font-black uppercase tracking-widest">Exclusivo para Administradores</p>
            <p className="text-white text-sm mt-3">Faça login com sua conta Google de administrador para acessar.</p>
          </CardHeader>
          <CardContent className="mt-2">
            <Button
              onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg font-bold shadow-lg shadow-indigo-500/20"
            >
              Entrar com Google <Lock className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Modal de detalhe ──
  const DetailModal = () => {
    if (!selected) return null;
    const b = selected;
    const status = STATUS_CONFIG[b.status] || STATUS_CONFIG.pendente;
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-start z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <h2 className="text-white font-bold text-xl">{b.client_name}</h2>
                <p className="text-white text-sm flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> {b.company_name}
                  <span className="mx-1">·</span>
                  {b.niche}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Pilar 1 */}
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 1 — Objetivo</span>
                </div>
                <p className="text-white font-medium">{OBJECTIVE_LABELS[b.pillar_1_objective] || b.pillar_1_objective}</p>
              </div>

              {/* Pilar 2 */}
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 2 — Valores</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Ticket Médio", value: `R$ ${Number(b.pillar_2_ticket).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` },
                    { label: "CPL Estimado", value: `R$ ${Number(b.pillar_2_cpl_estimate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` },
                    { label: "ROI Target", value: `${b.pillar_2_roi_target}%`, highlight: true },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-800 rounded-xl p-3 text-center">
                      <p className="text-white text-xs mb-1">{item.label}</p>
                      <p className={`font-bold text-lg ${item.highlight ? "text-white" : "text-white"}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart2 className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 3 — Dados</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(b.pillar_3_conversion_data || []).map((d) => (
                    <span key={d} className="px-3 py-1 rounded-lg bg-orange-500/10 text-white text-xs font-medium border border-orange-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pilar 4 */}
              <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 4 — Público</span>
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{b.pillar_4_audience}</p>
              </div>

              {/* Pilar 5 */}
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 5 — Contexto</span>
                </div>
                <div
                  className="text-white text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: b.pillar_5_context }}
                />
              </div>

              {/* Pilar 6 */}
              <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 6 — Criativos</span>
                </div>
                <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{b.pillar_6_creatives}</p>
              </div>

              {/* Pilar 7 */}
              <div className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Pilar 7 — Estrutura</span>
                </div>
                <p className="text-white font-medium">{STRUCTURE_LABELS[b.pillar_7_structure] || b.pillar_7_structure}</p>
              </div>

              {/* Exportar Prompt */}
              <Button
                onClick={() => copyPrompt(b)}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold py-6 text-base shadow-lg shadow-violet-500/20 hover:opacity-90 transition-opacity"
              >
                {copied ? (
                  <><ClipboardCheck className="w-5 h-5 mr-2" /> Prompt Copiado!</>
                ) : (
                  <><Copy className="w-5 h-5 mr-2" /> Exportar Prompt de IA (Copiar)</>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // ── Dashboard principal ──
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <AdminNavbar />
      
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Briefings Estratégicos</h1>
              <p className="text-white text-[10px] font-black uppercase tracking-widest">Blueprints de Campanha Auditados</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Card className="bg-slate-900 border-slate-800 px-5 py-2 flex items-center gap-2 text-white rounded-xl backdrop-blur-sm">
              <Star className="w-4 h-4 text-white" />
              <span className="font-black text-xl">{briefings.length}</span>
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Total</span>
            </Card>
            <Button
              variant="outline"
              onClick={() => exportCSV(briefings)}
              className="border-slate-800 bg-slate-900/50 text-white hover:bg-slate-800 rounded-xl backdrop-blur-sm"
            >
              <Download className="w-4 h-4 mr-2" /> CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Input
            placeholder="Buscar por cliente, empresa ou nicho..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900/50 border-slate-800 text-white pl-12 py-7 rounded-2xl focus:ring-indigo-500/20"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grid de briefings */}
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-white mx-auto mb-4" />
            <p className="text-white font-bold uppercase text-[10px] tracking-widest">Sincronizando Briefings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl">
            <Shield className="w-16 h-16 text-white mx-auto mb-4 opacity-40" />
            <p className="text-white text-lg">
              {briefings.length === 0 ? "Nenhum briefing recebido ainda." : "Nenhum resultado encontrado."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => {
              const status = STATUS_CONFIG[b.status] || STATUS_CONFIG.pendente;
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 transition-all cursor-pointer group rounded-2xl overflow-hidden"
                    onClick={() => setSelected(b)}
                  >
                    <CardHeader className="pb-3 border-b border-slate-800 bg-slate-800/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-base font-bold">{b.client_name}</CardTitle>
                            <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-white" /> {b.company_name}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[10px] uppercase font-bold tracking-widest">Nicho:</span>
                        <span className="text-white text-xs font-bold">{b.niche}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">{OBJECTIVE_LABELS[b.pillar_1_objective] || b.pillar_1_objective}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                          <p className="text-white text-xs">Ticket</p>
                          <p className="text-white font-bold text-sm">R$ {Number(b.pillar_2_ticket).toLocaleString("pt-BR")}</p>
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                          <p className="text-white text-xs">ROI</p>
                          <p className="text-white font-bold text-sm">{b.pillar_2_roi_target}%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 -mx-4 -mb-4 p-4 mt-4 border-t border-slate-800/50">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(b.created_date).toLocaleDateString("pt-BR")}
                        </span>
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                          Blueprint →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <DetailModal />
    </div>
  );
}
