import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Send, Ban, Settings } from "lucide-react";

const EVENT_LABELS = {
  cobranca_enviada: { label: "Cobrança Enviada", icon: Send, color: "text-blue-400" },
  pagamento_confirmado: { label: "Pago ✅", icon: CheckCircle2, color: "text-green-400" },
  pagamento_falhou: { label: "Falhou", icon: XCircle, color: "text-red-400" },
  cancelamento: { label: "Cancelado", icon: Ban, color: "text-slate-400" },
  manual: { label: "Manual", icon: Settings, color: "text-yellow-400" },
};

const WA_LABELS = {
  enviado: <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border text-xs">Enviado</Badge>,
  falhou: <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border text-xs">Falhou</Badge>,
  nao_aplicavel: <span className="text-slate-600 text-xs">—</span>,
};

export default function PaymentLogTable() {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["payment-logs"],
    queryFn: () => base44.entities.PaymentLog.list("-created_date", 100),
  });

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="w-7 h-7 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (logs.length === 0) {
    return <div className="text-center py-16 text-slate-500">Nenhum registro de pagamento ainda.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900">
            {["Data", "Cliente", "Evento", "Valor", "WhatsApp", "Detalhes"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 uppercase tracking-widest font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map(log => {
            const ev = EVENT_LABELS[log.event_type] || { label: log.event_type, color: "text-slate-400" };
            const EventIcon = ev.icon;
            return (
              <tr key={log.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                  {new Date(log.created_date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                </td>
                <td className="px-4 py-3 text-white font-medium max-w-[150px] truncate">{log.customer_name}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 font-bold ${ev.color}`}>
                    {EventIcon && <EventIcon className="w-3.5 h-3.5" />}
                    {ev.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-green-400 font-bold text-xs">
                  {log.amount ? `R$ ${log.amount.toFixed(2)}` : "—"}
                </td>
                <td className="px-4 py-3">{WA_LABELS[log.whatsapp_status] || "—"}</td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-[200px] truncate">{log.details || "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}