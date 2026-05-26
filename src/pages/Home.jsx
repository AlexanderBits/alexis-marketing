import React, { useEffect } from "react";
import ModernLanding from "@/components/landing/ModernLanding";

export default function Home() {
  useEffect(() => {
    document.title = "Desenvolvimento de Sites Profissionais | Criação de Sites e Marketing Digital";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Especialista Google Partner em criação de sites de alta conversão e gestão de tráfego pago. Transformamos sua presença digital em uma máquina de vendas.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://desenvolvimentodesites.dev.br/");
  }, []);

  return (
    <div className="dark bg-[#0A0A0A] min-h-screen">
      <ModernLanding />
      {/* <WhatsAppFloat /> */}
    </div>
  );
}