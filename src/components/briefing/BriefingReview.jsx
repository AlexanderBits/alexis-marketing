import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { alexis } from "@/api/alexisClient";

export default function BriefingReview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasContract, setHasContract] = useState(false);

  useEffect(() => {
    alexis.entities.Contract.list('-created_date', 1)
      .then(contracts => {
        if (contracts && contracts.length > 0) {
          setHasContract(true);
        }
      })
      .catch(err => {
        console.error("Erro ao verificar contrato:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4FF33]" />
        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest animate-pulse">
          Finalizando seu projeto...
        </p>
      </div>
    );
  }

  if (hasContract) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-16 h-16 bg-[#D4FF33] flex items-center justify-center animate-bounce shadow-2xl shadow-[#D4FF33]/20">
          <CheckCircle2 className="w-8 h-8 text-black" />
        </div>
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-black uppercase tracking-tight font-['Outfit']">Briefing Concluído! 🚀</h2>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            Recebemos todas as informações do seu projeto. Nosso time de especialistas já foi notificado e está iniciando a criação do seu <strong className="text-[#D4FF33] italic">Site Next-Gen</strong>!
          </p>
        </div>
        <div className="p-4 bg-[#D4FF33]/5 border border-[#D4FF33]/20 max-w-sm">
          <p className="text-[#D4FF33] text-[10px] font-black uppercase tracking-[0.2em]">🚀 Status: Desenvolvimento Iniciado</p>
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

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="w-16 h-16 bg-[#D4FF33] flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-black" />
      </div>
      <div className="space-y-2">
        <h2 className="text-white text-2xl font-black">Briefing Concluído!</h2>
        <p className="text-white/60 text-sm max-w-sm">
          Recebemos todas as informações do seu projeto. O próximo passo é assinar o contrato de prestação de serviços.
        </p>
      </div>
      <Button
        onClick={() => navigate("/contrato")}
        className="bg-[#D4FF33] text-black hover:bg-[#D4FF33]/90 font-black text-base px-10 py-6"
      >
        Ir para o Contrato
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}