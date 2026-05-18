import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function BriefingReview() {
  const navigate = useNavigate();

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