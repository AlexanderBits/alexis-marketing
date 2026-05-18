import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2, ArrowLeft, MessageSquare, ShieldCheck } from "lucide-react";
import { alexis } from "@/api/alexisClient";
import { useAuth } from "@/lib/AuthContext";

export default function BriefingReview({ conversationId, messages = [], onBackToChat }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasContract, setHasContract] = useState(false);
  const [briefingData, setBriefingData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Verificar se já tem contrato
        const contracts = await alexis.entities.Contract.list('-created_date', 1);
        if (contracts && contracts.length > 0) {
          setHasContract(true);
        }

        // 2. Buscar o WebsitePrompt mais recente gerado pelo agente
        const prompts = await alexis.entities.WebsitePrompt.list('-created_date', 1);
        if (prompts && prompts.length > 0) {
          setBriefingData(prompts[0]);
        }
      } catch (err) {
        console.error("Erro ao carregar dados de revisão:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      
      let finalPrompt = briefingData;

      // Se por algum motivo o agente não tiver gerado o prompt ainda, criamos um
      if (!finalPrompt) {
        const clientName = user ? (user.first_name + " " + user.last_name).trim() || user.email : "Cliente Alexis";
        finalPrompt = await alexis.entities.WebsitePrompt.create({
          client_name: clientName,
          segment: "Desenvolvimento de Site",
          summary: "Briefing conversacional coletado via assistente inteligente.",
          master_prompt: messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Consultor'}: ${m.content}`).join("\n"),
          status: "concluido"
        });
      } else {
        // Atualiza o status para concluído se não estiver
        await alexis.entities.WebsitePrompt.update(finalPrompt.id, {
          status: "concluido"
        });
      }

      // Preparar a mensagem formatada para o WhatsApp do proprietário
      const waNumber = "5532987037221";
      const title = `🚀 *NOVO BRIEFING DE SITE RECEBIDO*`;
      const line = `━━━━━━━━━━━━━━━━━━━━━━━━━`;
      const clientStr = `*Cliente:* ${finalPrompt.client_name || 'Não informado'}`;
      const segmentStr = `*Segmento:* ${finalPrompt.segment || 'Não informado'}`;
      const summaryStr = `*Resumo do Projeto:*\n${finalPrompt.summary || 'Não informado'}`;
      const sitemapStr = finalPrompt.sitemap ? `*Mapa do Site:*\n${finalPrompt.sitemap}` : '';
      
      let waText = `${title}\n${line}\n\n${clientStr}\n${segmentStr}\n\n${summaryStr}\n\n`;
      if (sitemapStr) {
        waText += `${sitemapStr}\n\n`;
      }
      waText += `*Área de Admin:* Acesse para ver o Prompt Mestre completo e blocos de texto! 💻`;

      // Abrir o WhatsApp em nova aba
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');

      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao confirmar briefing:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#0A0A0A]">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4FF33]" />
        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">
          Carregando dados do briefing...
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 bg-[#0A0A0A]">
        <div className="w-16 h-16 bg-[#D4FF33] flex items-center justify-center animate-bounce shadow-2xl shadow-[#D4FF33]/20">
          <CheckCircle2 className="w-8 h-8 text-black" />
        </div>
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-black uppercase tracking-tight font-['Outfit']">Briefing Confirmado! 🚀</h2>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            Seu briefing foi registrado e enviado com sucesso para a nossa equipe de desenvolvimento e atendimento!
          </p>
        </div>
        <div className="p-4 bg-[#D4FF33]/5 border border-[#D4FF33]/20 max-w-md">
          <p className="text-[#D4FF33] text-[10px] font-black uppercase tracking-[0.2em] mb-1">🚀 Status do Site Next-Gen</p>
          <p className="text-white/40 text-[10px] font-medium leading-relaxed">
            O briefing já está disponível no painel do administrador e uma notificação de acompanhamento foi enviada.
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-[#D4FF33] text-black hover:bg-white font-black text-xs uppercase tracking-widest px-10 py-6 rounded-none shadow-xl shadow-[#D4FF33]/10"
        >
          Voltar para a Página Inicial
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  // Fallback se não gerou nenhum briefing de forma estruturada (mostra diálogo original)
  const isStructured = briefingData && briefingData.summary;

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 overflow-y-auto max-w-3xl mx-auto w-full gap-6 bg-[#0A0A0A]">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4FF33]/10 border border-[#D4FF33]/20 mb-2">
          <ShieldCheck className="w-4 h-4 text-[#D4FF33]" />
          <span className="text-[#D4FF33] text-[9px] font-black uppercase tracking-widest">
            Revisão de Briefing Gerada por IA
          </span>
        </div>
        <h2 className="text-white text-2xl font-black uppercase tracking-tight font-['Outfit']">
          Tudo Pronto com seu Briefing!
        </h2>
        <p className="text-white/60 text-xs max-w-md mx-auto leading-relaxed">
          Confira abaixo a estruturação inicial recomendada pelo nosso consultor. Se estiver tudo certo, confirme para enviar ao desenvolvimento e atendimento.
        </p>
      </div>

      {/* Conteúdo do Briefing */}
      <div className="w-full bg-[#111111] border border-white/5 p-6 space-y-6 shadow-2xl">
        {isStructured ? (
          <div className="space-y-5">
            {/* Header info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-4">
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Cliente / Marca</p>
                <p className="text-white font-bold text-sm mt-0.5">{briefingData.client_name}</p>
              </div>
              <div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Segmento de Atuação</p>
                <p className="text-white font-bold text-sm mt-0.5">{briefingData.segment || "Não informado"}</p>
              </div>
            </div>

            {/* Resumo */}
            <div className="space-y-1">
              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Resumo do Projeto</p>
              <div className="text-white/80 text-xs leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-sm whitespace-pre-wrap font-sans">
                {briefingData.summary}
              </div>
            </div>

            {/* Sitemap */}
            {briefingData.sitemap && (
              <div className="space-y-1">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Mapa do Site Sugerido</p>
                <pre className="text-white/80 text-xs leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-sm whitespace-pre-wrap font-mono">
                  {briefingData.sitemap}
                </pre>
              </div>
            )}

            {/* Next Steps */}
            {briefingData.next_steps && (
              <div className="space-y-1">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Próximos Passos</p>
                <div className="text-white/70 text-xs leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-sm whitespace-pre-wrap font-sans">
                  {briefingData.next_steps}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Dialog Q&A fallback */
          <div className="space-y-4">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest text-center">Histórico da Conversa</p>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
              {messages.filter(m => m.role === 'user' && m.content !== '__init__').map((m, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-3">
                  <p className="text-brand-lime text-[9px] font-black uppercase tracking-widest">Sua Resposta</p>
                  <p className="text-white text-xs leading-relaxed mt-1">{m.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center mt-2">
        <Button
          onClick={onBackToChat}
          variant="outline"
          className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 hover:text-white text-xs uppercase tracking-widest py-6 px-8 rounded-none"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ajustar no Chat
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={submitting}
          className="w-full sm:w-auto bg-[#D4FF33] text-black hover:bg-white text-xs uppercase tracking-widest py-6 px-12 rounded-none font-black shadow-2xl shadow-[#D4FF33]/15 transition-all animate-pulse"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processando...
            </>
          ) : (
            <>
              Está tudo certo! Enviar Briefing
              <ArrowRight className="w-4 h-4 ml-2 animate-bounce" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}