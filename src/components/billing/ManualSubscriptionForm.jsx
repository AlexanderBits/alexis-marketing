import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { alexis } from "@/api/alexisClient";
import { useToast } from "@/components/ui/use-toast";

const PLAN_VALUES = { simples: 29.90, bronze: 49.90, prata: 99.90, ouro: 199.99 };

export default function ManualSubscriptionForm({ onSuccess }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_whatsapp: "",
    selected_plan: "bronze",
    amount: 49.90,
    due_date: "",
    notes: "",
    origin: "manual",
    status: "pendente",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePlanChange = (plan) => {
    set("selected_plan", plan);
    set("amount", PLAN_VALUES[plan] || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await alexis.entities.Subscription.create(form);
    toast({ title: "Assinatura criada!", description: `${form.customer_name} adicionado com sucesso.` });
    setOpen(false);
    setForm({ customer_name: "", customer_email: "", customer_whatsapp: "", selected_plan: "bronze", amount: 49.90, due_date: "", notes: "", origin: "manual", status: "pendente" });
    onSuccess?.();
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
          <Plus className="w-4 h-4" /> Nova Assinatura
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-black">Lançamento Manual</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Nome do Cliente</Label>
              <Input value={form.customer_name} onChange={e => set("customer_name", e.target.value)} required className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">E-mail</Label>
              <Input type="email" value={form.customer_email} onChange={e => set("customer_email", e.target.value)} required className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">WhatsApp (com DDI)</Label>
              <Input placeholder="5511999999999" value={form.customer_whatsapp} onChange={e => set("customer_whatsapp", e.target.value)} required className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Plano</Label>
              <Select value={form.selected_plan} onValueChange={handlePlanChange}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="simples">Simples — R$ 29,90</SelectItem>
                  <SelectItem value="bronze">Bronze — R$ 49,90</SelectItem>
                  <SelectItem value="prata">Prata — R$ 99,90</SelectItem>
                  <SelectItem value="ouro">Ouro — R$ 199,99</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Valor (R$)</Label>
              <Input type="number" value={form.amount} onChange={e => set("amount", parseFloat(e.target.value))} required className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Vencimento</Label>
              <Input type="date" value={form.due_date} onChange={e => set("due_date", e.target.value)} required className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Status Inicial</Label>
              <Select value={form.status} onValueChange={v => set("status", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-widest">Observações</Label>
              <Textarea value={form.notes} onChange={e => set("notes", e.target.value)} className="bg-slate-800 border-slate-600 text-white resize-none h-20" />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5">
            {loading ? "Salvando..." : "Criar Assinatura"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
