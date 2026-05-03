import { Badge } from "@/components/ui/badge";

const config = {
  pendente: { label: "Pendente", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  ativo: { label: "Ativo", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  atrasado: { label: "Vencida", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  cancelado: { label: "Cancelado", className: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
};

export default function SubscriptionStatusBadge({ status }) {
  const c = config[status] || config.pendente;
  return (
    <Badge className={`border text-xs font-bold px-2 py-0.5 ${c.className}`}>
      {c.label}
    </Badge>
  );
}
