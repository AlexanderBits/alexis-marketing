import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Globe, FileText, Map, MessageSquare, ArrowRight } from "lucide-react";

export default function BriefingReview({ conversationId }) {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrompt() {
      // Busca o WebsitePrompt vinculado a esta conversa
      const results = await base44.entities.WebsitePrompt.filter({ conversation_id: conversationId });
      if (results && results.length > 0) {
        setPrompt(results[0]);
      }
      setLoading(false);
    }
    if (conversationId) fetchPrompt();
  }, [conversationId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4FF33]" />
        <p className="text-white/60 text-sm">Carregando seu briefing...</p>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-4 px-6 text-center">
        <p className="text-white/50">Não conseguimos carregar o resumo. Clique abaixo para continuar.</p>
        <Button onClick={() => navigate("/contrato")} className="bg-[#D4FF33] text-black hover:bg-[#D4FF33]/90 font-bold px-8">
          Ir para o Contrato <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  const sections = [
    { icon: Globe, label: "Negócio", value: `${prompt.client_name}${prompt.segment ? ` · ${prompt.segment}` : ""}` },
    { icon: FileText, label: "Resumo do Projeto", value: prompt.summary },
    { icon: Map, label: "Mapa do Site", value: prompt.sitemap },
    { icon: MessageSquare, label: "Próximos Passos", value: prompt.next_steps },
  ].filter(s => s.value);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
      {/* Cabeçalho de revisão */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-7 h-7 bg-[#D4FF33] flex items-center justify-center shrink-0 mt-1">
          <CheckCircle2 className="w-4 h-4 text-black" />
        </div>
        <div className="bg-[#141414] border border-white/10 px-4 py-3 text-sm text-white leading-relaxed">
          <p>Perfeito! Aqui está o resumo de tudo que coletamos para o seu projeto. Confirme se está correto antes de prosseguirmos para o contrato.</p>
        </div>
      </div>

      {/* Cards de revisão */}
      <div className="space-y-3 mb-8">
        {sections.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-[#141414] border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-[#D4FF33]" />
              <span className="text-[#D4FF33] text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{value}</p>
          </div>
        ))}
      </div>

      {/* Botão de confirmação */}
      <div className="sticky bottom-0 bg-[#0A0A0A] pt-4 pb-2 border-t border-white/10">
        <Button
          onClick={() => navigate("/contrato")}
          className="w-full bg-[#D4FF33] text-black hover:bg-[#D4FF33]/90 font-black text-base py-6"
        >
          ✅ Está tudo certo — Ir para o Contrato
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-white/30 text-xs text-center mt-2">
          Ao confirmar, você será redirecionado para assinar o contrato de serviço.
        </p>
      </div>
    </div>
  );
}