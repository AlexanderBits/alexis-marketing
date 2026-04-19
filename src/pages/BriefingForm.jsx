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
    console.log("📦 BRIEFING PAYLOAD (7 Pilares):", payload);
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="max-w-md text-center"
        >
          <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/10">
            <CheckCircle2 className="w-12 h-12 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tighter">Briefing Enviado!</h1>
          <p className="text-slate-400 mb-2">
            Obrigado, <span className="text-white font-bold">{form.client_name}</span>!
          </p>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Seu Blueprint de Campanha foi recebido. Nossa inteligência irá analisar os dados e estruturar a estratégia ideal para <strong className="text-slate-300">{form.company_name}</strong>.
          </p>
          <div className="mt-8 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
            <p className="text-indigo-300 text-sm font-bold">📱 Em breve entraremos em contato para alinhar os próximos passos.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Layout principal ──
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-6 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white font-black text-xl tracking-tighter uppercase">Blueprint de Campanha</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Inteligência Estratégica Alexis</p>
            </div>
            <span className="text-indigo-400 text-xs font-black bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
              {step + 1} / {totalSteps}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${currentStep.color} rounded-full`}
              initial={false}
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-3 px-1">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i <= step ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-slate-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentStep.title}</h2>
                  <p className="text-slate-400 text-sm">{currentStep.subtitle}</p>
                </div>
              </div>

              {/* ── Passo 0: Identificação ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block flex items-center gap-2">
                      <User className="w-4 h-4" /> Seu nome completo *
                    </Label>
                    <Input
                      value={form.client_name}
                      onChange={(e) => set("client_name", e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 py-6 text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Nome da empresa / negócio *
                    </Label>
                    <Input
                      value={form.company_name}
                      onChange={(e) => set("company_name", e.target.value)}
                      placeholder="Ex: João Consultoria Ltda"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 py-6 text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block">
                      Nicho / Setor de atuação *
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {NICHES.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => set("niche", n)}
                          className={`text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                            form.niche === n
                              ? "border-violet-500 bg-violet-500/10 text-violet-300"
                              : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500"
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
                <div className="grid gap-3">
                  {OBJECTIVES.map((obj) => (
                    <button
                      key={obj.value}
                      type="button"
                      onClick={() => set("pillar_1_objective", obj.value)}
                      className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-base ${
                        form.pillar_1_objective === obj.value
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {obj.label}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Passo 2: Valores ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block">
                      Ticket Médio (R$) *
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={form.pillar_2_ticket}
                      onChange={(e) => set("pillar_2_ticket", e.target.value)}
                      placeholder="Ex: 1500"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 py-6 text-xl font-bold"
                    />
                    <p className="text-slate-500 text-xs mt-1">Valor médio de uma venda ou contrato</p>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block">
                      CPL Estimado (R$) — Custo por Lead *
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={form.pillar_2_cpl_estimate}
                      onChange={(e) => set("pillar_2_cpl_estimate", e.target.value)}
                      placeholder="Ex: 25"
                      className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 py-6 text-xl font-bold"
                    />
                    <p className="text-slate-500 text-xs mt-1">Quanto você acredita que custará cada lead</p>
                  </div>
                  {roiTarget !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border ${
                        parseFloat(roiTarget) > 0
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <p className="text-slate-400 text-sm mb-1">ROI Estimado por Lead</p>
                      <p className={`text-3xl font-bold ${parseFloat(roiTarget) > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {roiTarget}%
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        {parseFloat(roiTarget) > 200
                          ? "🚀 Excelente! Alta margem para investir em tráfego."
                          : parseFloat(roiTarget) > 50
                          ? "✅ Bom potencial de retorno."
                          : parseFloat(roiTarget) > 0
                          ? "⚠️ Margem apertada. Avalie otimizar o funil."
                          : "❌ CPL maior que o ticket. Revisar os valores."}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── Passo 3: Dados ── */}
              {step === 3 && (
                <div className="space-y-3">
                  <p className="text-slate-400 text-sm mb-4">Selecione todos que se aplicam ao seu negócio hoje:</p>
                  {CONVERSION_DATA.map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-4 px-5 py-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.pillar_3_conversion_data.includes(item.value)
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <Checkbox
                        checked={form.pillar_3_conversion_data.includes(item.value)}
                        onCheckedChange={() => toggleCheckbox("pillar_3_conversion_data", item.value)}
                        className="border-slate-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <span className={form.pillar_3_conversion_data.includes(item.value) ? "text-orange-200 font-medium" : "text-slate-300"}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* ── Passo 4: Público ── */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 mb-4">
                    <p className="text-pink-300 text-sm">💡 <strong>Dica:</strong> Quanto mais específico, melhor a IA segmentará. Ex: "Mulheres de 30-45 anos, com renda acima de R$5k, interessadas em emagrecimento, que já consumiram produtos naturais."</p>
                  </div>
                  <Label className="text-slate-300 text-sm mb-2 block">Descreva seu cliente ideal *</Label>
                  <textarea
                    value={form.pillar_4_audience}
                    onChange={(e) => set("pillar_4_audience", e.target.value)}
                    placeholder="Idade, gênero, localização, interesses, comportamentos, poder aquisitivo, dores, desejos..."
                    rows={6}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                  <p className="text-slate-500 text-xs text-right">{form.pillar_4_audience.length} caracteres (mín. 20)</p>
                </div>
              )}

              {/* ── Passo 5: Contexto (React Quill) ── */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-2">
                    <p className="text-indigo-300 text-sm">📖 Conte sobre sua empresa, diferenciais, por que os clientes escolhem você, objeções comuns, jornada do cliente, resultados anteriores.</p>
                  </div>
                  <Label className="text-slate-300 text-sm mb-2 block">Contexto do Negócio *</Label>
                  <RichTextEditor
                    value={form.pillar_5_context}
                    onChange={(val) => set("pillar_5_context", val)}
                    placeholder="Descreva seu negócio com riqueza de detalhes..."
                  />
                </div>
              )}

              {/* ── Passo 6: Criativos ── */}
              {step === 6 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-2">
                    <p className="text-teal-300 text-sm">🎨 Descreva os formatos de anúncio disponíveis (vídeo, carrossel, imagem estática), o tom da comunicação, e qualquer referência criativa que você goste.</p>
                  </div>
                  <Label className="text-slate-300 text-sm mb-2 block">Descrição dos Criativos *</Label>
                  <textarea
                    value={form.pillar_6_creatives}
                    onChange={(e) => set("pillar_6_creatives", e.target.value)}
                    placeholder="Ex: Temos vídeos de depoimentos de 30s, fotos do produto, e um carrossel com o passo a passo. Tom: profissional mas acessível..."
                    rows={6}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                  />
                </div>
              )}

              {/* ── Passo 7: Estrutura ── */}
              {step === 7 && (
                <div className="grid gap-3">
                  <p className="text-slate-400 text-sm mb-2">Como você quer organizar a campanha?</p>
                  {STRUCTURES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => set("pillar_7_structure", s.value)}
                      className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-base ${
                        form.pillar_7_structure === s.value
                          ? "border-slate-400 bg-slate-700 text-white"
                          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-10">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={goPrev}
                className="flex-1 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 py-6"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
              </Button>
            )}
            {step < totalSteps - 1 ? (
              <Button
                type="button"
                onClick={goNext}
                className={`flex-1 bg-gradient-to-r ${currentStep.color} text-white font-semibold py-6 shadow-lg hover:opacity-90 transition-opacity`}
              >
                Próximo <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canAdvance()}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-black uppercase tracking-widest py-8 shadow-xl shadow-indigo-500/20 hover:opacity-90 transition-opacity disabled:opacity-50 rounded-2xl"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processando Blueprint...</>
                ) : (
                  <><CheckCircle2 className="w-5 h-5 mr-2" /> Finalizar Blueprint</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}