import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckCircle2, Loader2, ChevronRight, ChevronLeft, Target,
  DollarSign, BarChart2, Users, BookOpen, Image, Layers, User, Building2
} from "lucide-react";
import RichTextEditor from "@/components/editor/RichTextEditor";

// ─────────────────────────────────────────────
// Configuração dos 8 passos (0 = Identificação + 7 Pilares)
// ─────────────────────────────────────────────

const STEPS = [
  {
    id: 0,
    icon: User,
    title: "Identificação",
    subtitle: "Quem é você e seu negócio?",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 1,
    icon: Target,
    title: "Pilar 1 – Objetivo",
    subtitle: "O que a campanha deve alcançar?",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Pilar 2 – Valores",
    subtitle: "Ticket e ROI esperado",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 3,
    icon: BarChart2,
    title: "Pilar 3 – Dados",
    subtitle: "Quais dados de conversão você tem?",
    color: "from-orange-500 to-amber-600",
  },
  {
    id: 4,
    icon: Users,
    title: "Pilar 4 – Público",
    subtitle: "Descreva seu cliente ideal",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 5,
    icon: BookOpen,
    title: "Pilar 5 – Contexto",
    subtitle: "Contexto do seu negócio",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 6,
    icon: Image,
    title: "Pilar 6 – Criativos",
    subtitle: "Descrição dos anúncios",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 7,
    icon: Layers,
    title: "Pilar 7 – Estrutura",
    subtitle: "Como montar a campanha",
    color: "from-slate-500 to-gray-600",
  },
];

const OBJECTIVES = [
  { value: "leads", label: "📋 Geração de Leads" },
  { value: "vendas", label: "🛒 Vendas Online / E-commerce" },
  { value: "awareness", label: "📣 Reconhecimento de Marca" },
  { value: "app_installs", label: "📱 Instalações de App" },
  { value: "trafego", label: "🌐 Tráfego para Site" },
  { value: "mensagens", label: "💬 Mensagens (WhatsApp/DM)" },
];

const CONVERSION_DATA = [
  { value: "pixel", label: "Pixel do Facebook instalado" },
  { value: "google_tag", label: "Google Tag / GA4 configurado" },
  { value: "historico_conversoes", label: "Histórico de conversões (+30 dias)" },
  { value: "lista_clientes", label: "Lista de clientes para público similar" },
  { value: "crm", label: "CRM / Base de emails" },
  { value: "dados_vendas", label: "Dados de vendas anteriores" },
  { value: "nenhum", label: "Nenhum dado disponível ainda" },
];

const STRUCTURES = [
  { value: "campanha_unica", label: "🎯 Campanha única com 1 público" },
  { value: "abtest", label: "🧪 Teste A/B (múltiplos criativos)" },
  { value: "funil", label: "🔄 Funil completo (Topo/Meio/Fundo)" },
  { value: "retargeting", label: "🔁 Retargeting + Aquisição" },
];

const NICHES = [
  "Saúde e Bem-estar", "Educação / Cursos", "E-commerce / Varejo",
  "Imóveis / Construção", "Jurídico / Advocacia", "Financeiro / Investimentos",
  "Restaurante / Alimentação", "Beleza / Estética", "Tecnologia / SaaS",
  "Serviços Locais", "Moda / Lifestyle", "Outro",
];

// ─────────────────────────────────────────────
// Estado inicial
// ─────────────────────────────────────────────

const initialForm = {
  client_name: "",
  company_name: "",
  niche: "",
  pillar_1_objective: "",
  pillar_2_ticket: "",
  pillar_2_cpl_estimate: "",
  pillar_3_conversion_data: [],
  pillar_4_audience: "",
  pillar_5_context: "",
  pillar_6_creatives: "",
  pillar_7_structure: "",
};

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────

export default function BriefingForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Verificar se veio do Stripe com pagamento confirmado
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get('payment') === 'success';

  const totalSteps = STEPS.length;
  const currentStep = STEPS[step];
  const Icon = currentStep.icon;

  // ROI automático
  const roiTarget =
    form.pillar_2_ticket && form.pillar_2_cpl_estimate && parseFloat(form.pillar_2_cpl_estimate) > 0
      ? (((parseFloat(form.pillar_2_ticket) - parseFloat(form.pillar_2_cpl_estimate)) / parseFloat(form.pillar_2_cpl_estimate)) * 100).toFixed(0)
      : null;

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const toggleCheckbox = (key, value) => {
    const current = form[key] || [];
    setForm((prev) => ({
      ...prev,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    }));
  };

  // Validação de cada passo
  const canAdvance = () => {
    switch (step) {
      case 0: return form.client_name.trim() && form.company_name.trim() && form.niche;
      case 1: return !!form.pillar_1_objective;
      case 2: return !!form.pillar_2_ticket && !!form.pillar_2_cpl_estimate;
      case 3: return form.pillar_3_conversion_data.length > 0;
      case 4: return form.pillar_4_audience.trim().length > 20;
      case 5: return form.pillar_5_context.replace(/<[^>]*>/g, "").trim().length > 20;
      case 6: return form.pillar_6_creatives.trim().length > 10;
      case 7: return !!form.pillar_7_structure;
      default: return true;
    }
  };

  const goNext = () => {
    if (!canAdvance()) {
      toast({ title: "Campo obrigatório", description: "Preencha todos os campos antes de avançar.", variant: "destructive" });
      return;
    }
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canAdvance()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      ...form,
      pillar_2_ticket: parseFloat(form.pillar_2_ticket),
      pillar_2_cpl_estimate: parseFloat(form.pillar_2_cpl_estimate),
      pillar_2_roi_target: roiTarget ? parseFloat(roiTarget) : 0,
      status: "pendente",
    };
    try {
      await base44.entities.CampaignBriefing.create(payload);
      setSubmitted(true);
    } catch (err) {
      toast({ title: "Erro ao enviar", description: err.message || "Tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Tela de pagamento confirmado ──
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="max-w-lg text-center"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/10">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tighter">Pagamento Confirmado! 🎉</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Sua assinatura foi ativada com sucesso. Agora preencha o <strong className="text-white">Blueprint de Campanha</strong> para iniciarmos sua estratégia.
          </p>
          <div className="mb-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-300 text-sm font-bold">✅ Assinatura ativa — você já faz parte da Alexis Marketing!</p>
          </div>
          <Button
            onClick={() => window.location.href = '/briefing'}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-black uppercase tracking-widest py-6 shadow-xl shadow-indigo-500/20 hover:opacity-90 rounded-2xl"
          >
            Preencher o Blueprint de Campanha <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-slate-600 text-xs mt-4">Você pode preencher o briefing a qualquer momento</p>
        </motion.div>
      </div>
    );
  }

  // ── Tela de sucesso ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4 overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-lime/10 blur-[120px] rounded-none animate-pulse" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="max-w-md text-center bg-brand-card border border-white/5 p-12 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-lime" />
          <div className="w-24 h-24 bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-brand-lime" />
          </div>
          <h1 className="text-4xl font-['Outfit'] font-black text-white mb-4 tracking-tight">Blueprint <span className="text-brand-lime">Enviado!</span></h1>
          <p className="text-white/40 text-sm mb-10 leading-relaxed uppercase tracking-widest font-bold italic">
            Obrigado, <span className="text-white">{form.client_name}</span>. Sua estratégia está sendo processada.
          </p>
          <div className="p-6 bg-white/5 border border-white/5 backdrop-blur-sm">
            <p className="text-brand-lime text-[10px] font-black uppercase tracking-[0.2em]">Status: Em Análise Estratégica</p>
          </div>
          <Button 
            onClick={() => window.location.href = "/"}
            className="mt-10 w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-none text-[10px] font-black uppercase tracking-[0.3em] py-6"
          >
            Voltar para o Início
          </Button>
        </motion.div>
      </div>
    );
  }

  // ── Layout principal ──
  return (
    <div className="min-h-screen bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black flex flex-col overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-lime/5 blur-[120px] rounded-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-none" />
      </div>

      {/* Header */}
      <div className="bg-black/40 backdrop-blur-md border-b border-white/5 px-6 py-8 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-black text-xl tracking-tighter uppercase font-['Outfit']">Blueprint de <span className="text-brand-lime">Campanha</span></h1>
              <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em] mt-1">Inteligência Estratégica • Alexis Dev</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-brand-lime text-[10px] font-black bg-brand-lime/10 px-6 py-2 rounded-none border border-brand-lime/20 tracking-widest uppercase">
                Etapa {step + 1} / {totalSteps}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-[2px] bg-white/5 rounded-none overflow-hidden relative">
            <motion.div
              className={`absolute top-0 left-0 h-full bg-brand-lime`}
              initial={false}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-start justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-brand-card border border-white/5 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent" />
              
              {/* Step Header */}
              <div className="flex items-center gap-6 mb-12">
                <div className={`w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shadow-xl`}>
                  <Icon className="w-8 h-8 text-brand-lime" />
                </div>
                <div>
                  <h2 className="text-3xl font-['Outfit'] font-extrabold text-white leading-none mb-2">{currentStep.title}</h2>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold italic">{currentStep.subtitle}</p>
                </div>
              </div>

              {/* ── Passo 0: Identificação ── */}
              {step === 0 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Seu nome completo *</Label>
                    <Input
                      value={form.client_name}
                      onChange={(e) => set("client_name", e.target.value)}
                      placeholder="Identificação do Responsável"
                      className="bg-black/40 border-white/10 text-white placeholder-white/10 rounded-none h-14"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Nome da empresa / negócio *</Label>
                    <Input
                      value={form.company_name}
                      onChange={(e) => set("company_name", e.target.value)}
                      placeholder="Nome da Entidade"
                      className="bg-black/40 border-white/10 text-white placeholder-white/10 rounded-none h-14"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 block">Nicho / Setor de atuação *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {NICHES.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => set("niche", n)}
                          className={`text-left px-4 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest border transition-all ${
                            form.niche === n
                              ? "border-brand-lime bg-brand-lime/10 text-brand-lime"
                              : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Passo 1: Objetivo ── */}
              {step === 1 && (
                <div className="grid gap-4">
                  {OBJECTIVES.map((obj) => (
                    <button
                      key={obj.value}
                      type="button"
                      onClick={() => set("pillar_1_objective", obj.value)}
                      className={`text-left px-8 py-6 rounded-none border-2 transition-all group ${
                        form.pillar_1_objective === obj.value
                          ? "border-brand-lime bg-brand-lime/5 text-brand-lime"
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                      }`}
                    >
                      <span className={`text-sm font-bold uppercase tracking-widest ${form.pillar_1_objective === obj.value ? "text-brand-lime" : "text-white/60 group-hover:text-white"}`}>
                        {obj.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* ── Passo 2: Valores ── */}
              {step === 2 && (
                <div className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Ticket Médio (R$) *</Label>
                      <Input
                        type="number"
                        min="0"
                        value={form.pillar_2_ticket}
                        onChange={(e) => set("pillar_2_ticket", e.target.value)}
                        className="bg-black/40 border-white/10 text-white rounded-none h-16 text-2xl font-black focus:border-brand-lime/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">CPL Estimado (R$) *</Label>
                      <Input
                        type="number"
                        min="0"
                        value={form.pillar_2_cpl_estimate}
                        onChange={(e) => set("pillar_2_cpl_estimate", e.target.value)}
                        className="bg-black/40 border-white/10 text-white rounded-none h-16 text-2xl font-black focus:border-brand-lime/50 transition-colors"
                      />
                    </div>
                  </div>
                  {roiTarget !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-10 rounded-none border ${
                        parseFloat(roiTarget) > 0
                          ? "bg-brand-lime/5 border-brand-lime/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Projeção de Performance (ROI)</p>
                      <div className="flex items-baseline gap-4">
                        <p className={`text-6xl font-['Outfit'] font-black ${parseFloat(roiTarget) > 0 ? "text-brand-lime" : "text-red-400"}`}>
                          {roiTarget}%
                        </p>
                        <p className="text-white/20 text-xs font-bold uppercase tracking-widest italic">Target Automático</p>
                      </div>
                      <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-8 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${parseFloat(roiTarget) > 0 ? "bg-brand-lime animate-pulse" : "bg-red-500"}`} />
                        {parseFloat(roiTarget) > 200
                          ? "Engine: Potencial de Escala Agressiva detectado."
                          : parseFloat(roiTarget) > 50
                          ? "Engine: Fluxo Sustentável de Conversão."
                          : parseFloat(roiTarget) > 0
                          ? "Engine: Necessidade de Otimização Criativa."
                          : "Engine: Atenção - Margem de Prejuízo Detectada."}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── Passo 3: Dados ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-6">Selecione as fontes de dados disponíveis:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {CONVERSION_DATA.map((item) => (
                      <label
                        key={item.value}
                        className={`flex items-center gap-6 px-6 py-5 rounded-none border transition-all cursor-pointer group ${
                          form.pillar_3_conversion_data.includes(item.value)
                            ? "border-brand-lime bg-brand-lime/10"
                            : "border-white/5 bg-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${form.pillar_3_conversion_data.includes(item.value) ? "border-brand-lime bg-brand-lime" : "border-white/20 group-hover:border-brand-lime/50"}`}>
                          {form.pillar_3_conversion_data.includes(item.value) && <div className="w-2 h-2 bg-black" />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={form.pillar_3_conversion_data.includes(item.value)}
                          onChange={() => toggleCheckbox("pillar_3_conversion_data", item.value)}
                        />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${form.pillar_3_conversion_data.includes(item.value) ? "text-brand-lime" : "text-white/40"}`}>
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Passo 4: Público ── */}
              {step === 4 && (
                <div className="space-y-8">
                  <div className="p-6 bg-brand-lime/5 border-l-2 border-brand-lime">
                    <p className="text-brand-lime text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic">
                      "A segmentação é o coração da Engine. Defina quem é o seu cliente com precisão cirúrgica."
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Descrição do Perfil de Público *</Label>
                    <textarea
                      value={form.pillar_4_audience}
                      onChange={(e) => set("pillar_4_audience", e.target.value)}
                      placeholder="Ex: Profissionais liberais, 25-40 anos, residentes em capitais, interessados em alta performance..."
                      rows={8}
                      className="w-full bg-black/40 border border-white/10 rounded-none text-white placeholder-white/10 p-6 text-sm resize-none focus:outline-none focus:border-brand-lime/50 transition-colors custom-scrollbar"
                    />
                    <div className="flex justify-between items-center">
                       <p className="text-white/20 text-[8px] font-black uppercase tracking-widest italic">Mínimo 20 caracteres para validação</p>
                       <p className="text-white/40 text-[10px] font-black tracking-widest">{form.pillar_4_audience.length} / 500</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Passo 5: Contexto ── */}
              {step === 5 && (
                <div className="space-y-8">
                  <div className="p-6 bg-indigo-500/5 border-l-2 border-indigo-500">
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic">
                      "A narrativa do seu negócio define o sucesso do criativo. Conte-nos sua história."
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Contexto Estratégico do Negócio *</Label>
                    <RichTextEditor
                      value={form.pillar_5_context}
                      onChange={(val) => set("pillar_5_context", val)}
                      placeholder="Diferenciais, autoridade, dores que resolve..."
                    />
                  </div>
                </div>
              )}

              {/* ── Passo 6: Criativos ── */}
              {step === 6 && (
                <div className="space-y-8">
                   <div className="p-6 bg-teal-500/5 border-l-2 border-teal-500">
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic">
                      "O visual atrai, a mensagem converte. Liste seus ativos visuais disponíveis."
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Definição de Ativos Criativos *</Label>
                    <textarea
                      value={form.pillar_6_creatives}
                      onChange={(e) => set("pillar_6_creatives", e.target.value)}
                      placeholder="Ex: Vídeos de depoimento, carrossel de resultados, artes estáticas institucionais..."
                      rows={8}
                      className="w-full bg-black/40 border border-white/10 rounded-none text-white placeholder-white/10 p-6 text-sm resize-none focus:outline-none focus:border-brand-lime/50 transition-colors custom-scrollbar"
                    />
                  </div>
                </div>
              )}

              {/* ── Passo 7: Estrutura ── */}
              {step === 7 && (
                <div className="grid gap-4">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-6 italic">Selecione o modelo de arquitetura de campanha:</p>
                  {STRUCTURES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => set("pillar_7_structure", s.value)}
                      className={`text-left px-8 py-6 rounded-none border-2 transition-all group ${
                        form.pillar_7_structure === s.value
                          ? "border-brand-lime bg-brand-lime/5 text-brand-lime"
                          : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                      }`}
                    >
                      <span className={`text-sm font-bold uppercase tracking-widest ${form.pillar_7_structure === s.value ? "text-brand-lime" : "text-white/60 group-hover:text-white"}`}>
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-6 mt-12">
            {step > 0 && (
              <button
                type="button"
                onClick={goPrev}
                className="flex items-center gap-3 text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <ChevronLeft className="w-4 h-4 rotate-0" /> Voltar
              </button>
            )}
            <div className="flex-1" />
            {step < totalSteps - 1 ? (
              <Button
                type="button"
                onClick={goNext}
                className={`bg-brand-lime text-black font-black uppercase tracking-[0.2em] text-[10px] px-12 py-8 rounded-none shadow-[0_0_30px_rgba(212,255,51,0.1)] group transition-all active:scale-95`}
              >
                Próximo Passo <ChevronRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canAdvance()}
                className="bg-brand-lime text-black font-black uppercase tracking-[0.3em] text-[10px] px-16 py-8 rounded-none shadow-[0_0_40px_rgba(212,255,51,0.2)] active:scale-95 transition-all disabled:opacity-20"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processando Blueprint...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5 mr-3" /> Finalizar Blueprint</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}