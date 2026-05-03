import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Trash2, Phone, Mail, Calendar, DollarSign, Check } from "lucide-react";
import { alexis } from "@/api/alexisClient";
import { useToast } from "@/components/ui/use-toast";
import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

const PLAN_COLORS = {
  bronze: "text-orange-400",
  prata: "text-slate-300",
  ouro: "text-yellow-400",
};

export default function SubscriptionCard({ subscription, onRefresh }) {
  const { toast } = useToast();
  const [sendingBill, setSendingBill] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [markingPaid, setMarkingPaid] = useState(false);

  const handleSendBill = async () => {
    setSendingBill(true);
    const res = await alexis.functions.invoke("sendBillingWhatsApp", { subscription_id: subscription.id });
    if (res.data?.success) {
      toast({ title: "Cobrança enviada! ✅", description: "Link de pagamento enviado via WhatsApp." });
    } else {
      toast({ title: "Falha no envio ⚠️", description: res.data?.whatsapp_status || "Erro ao enviar.", variant: "destructive" });
    }
    setSendingBill(false);
    onRefresh?.();
  };

  const handleDelete = async () => {
    if (!confirm(`Excluir assinatura de ${subscription.customer_name}?`)) return;
    setDeleting(true);
    await alexis.entities.Subscription.delete(subscription.id);
    onRefresh?.();
    setDeleting(false);
  };

  const handleMarkAsPaid = async () => {
    setMarkingPaid(true);
    try {
      // Calculate next month's due date
      let nextDate = new Date();
      if (subscription.due_date) {
        nextDate = new Date(subscription.due_date);
        nextDate.setMonth(nextDate.getMonth() + 1);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      
      const nextDateStr = nextDate.toISOString().split('T')[0];

      await alexis.entities.Subscription.update(subscription.id, {
        status: "ativo",
        due_date: nextDateStr,
        last_payment_date: new Date().toISOString()
      });

      toast({ title: "Pago! ✅", description: `${subscription.customer_name} está em dia.` });
      onRefresh?.();
    } catch (error) {
      toast({ title: "Erro ao atualizar", description: "Não foi possível marcar como pago.", variant: "destructive" });
    }
    setMarkingPaid(false);
  };

  const isOverdue = subscription.due_date && subscription.due_date < new Date().toISOString().split('T')[0];

  return (
    <Card className={`bg-slate-800/60 border-slate-700 hover:border-slate-500 transition-all ${isOverdue && subscription.status === 'ativo' ? 'border-red-500/50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-sm truncate">{subscription.customer_name}</span>
              <SubscriptionStatusBadge status={isOverdue && subscription.status === 'ativo' ? 'atrasado' : subscription.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{subscription.customer_email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{subscription.customer_whatsapp}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-2">
              <span className={`font-bold uppercase tracking-wider ${PLAN_COLORS[subscription.selected_plan]}`}>
                {subscription.selected_plan}
              </span>
              <span className="flex items-center gap-1 text-green-400 font-bold">
                <DollarSign className="w-3 h-3" />R$ {subscription.amount?.toFixed(2)}
              </span>
              <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}>
                <Calendar className="w-3 h-3" />
                Vence: {subscription.due_date || "—"}
              </span>
            </div>
            {subscription.notes && (
              <p className="text-xs text-slate-500 mt-2 italic truncate">{subscription.notes}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            <Button
              size="sm"
              onClick={handleSendBill}
              disabled={sendingBill || subscription.status === 'cancelado'}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 gap-1"
            >
              <Send className="w-3 h-3" />
              {sendingBill ? "Enviando..." : "Cobrar"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs px-3 gap-1"
            >
              <Trash2 className="w-3 h-3" />
              {deleting ? "..." : "Excluir"}
            </Button>
            
            {(subscription.status === 'atrasado' || subscription.status === 'pendente' || isOverdue) && (
              <Button
                size="sm"
                onClick={handleMarkAsPaid}
                disabled={markingPaid}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 font-bold gap-2 shadow-lg shadow-emerald-900/20"
              >
                <Check className="w-4 h-4" />
                {markingPaid ? "..." : "Marcar como Pago"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
