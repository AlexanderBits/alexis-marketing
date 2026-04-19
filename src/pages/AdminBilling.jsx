import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Search, RefreshCw, DollarSign, Users, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { AdminNavbar } from "@/components/AdminNavbar";
import ManualSubscriptionForm from "@/components/billing/ManualSubscriptionForm";
import SubscriptionCard from "@/components/billing/SubscriptionCard";
import PaymentLogTable from "@/components/billing/PaymentLogTable";

export default function AdminBilling() {
  const { isAuthenticated, isLoadingAuth, logout } = useAdminAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("subscriptions");

  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => base44.entities.Subscription.list("-created_date", 200),
    enabled: isAuthenticated,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["subscriptions"] });

  const filtered = subscriptions.filter(s => {
    const matchSearch = !search || s.customer_name?.toLowerCase().includes(search.toLowerCase()) || s.customer_email?.toLowerCase().includes(search.toLowerCase()) || s.customer_whatsapp?.includes(search);
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: subscriptions.length,
    ativos: subscriptions.filter(s => s.status === "ativo").length,
    atrasados: subscriptions.filter(s => s.status === "atrasado").length,
    pendentes: subscriptions.filter(s => s.status === "pendente").length,
    mrr: subscriptions.filter(s => s.status === "ativo").reduce((acc, s) => acc + (s.amount || 0), 0),
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800">
          <CardContent className="pt-10 pb-8 text-center space-y-4">
            <Shield className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="text-white text-2xl font-black">Acesso Restrito</h2>
            <p className="text-slate-400 text-sm">Exclusivo para administradores.</p>
            <Button onClick={() => base44.auth.redirectToLogin(window.location.pathname)} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Entrar com Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminNavbar />
      {/* Subheader */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white">Gestão de Cobranças</h1>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="sm" onClick={refresh} className="text-slate-400 hover:text-white gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Atualizar
            </Button>
            <ManualSubscriptionForm onSuccess={refresh} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Total", value: stats.total, Icon: Users, color: "text-slate-300" },
            { label: "Ativos", value: stats.ativos, Icon: CheckCircle2, color: "text-green-400" },
            { label: "Atrasados", value: stats.atrasados, Icon: AlertTriangle, color: "text-red-400" },
            { label: "Pendentes", value: stats.pendentes, Icon: Clock, color: "text-yellow-400" },
            { label: "MRR", value: `R$ ${stats.mrr.toFixed(0)}`, Icon: DollarSign, color: "text-indigo-400" },
          ].map(({ label, value, Icon, color }) => (
            <Card key={label} className="bg-slate-900 border-slate-800">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <div>
                  <div className={`text-lg font-black ${color}`}>{value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-800">
          {["subscriptions", "logs"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold transition-colors ${activeTab === tab ? "text-indigo-400 border-b-2 border-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              {tab === "subscriptions" ? "Assinaturas" : "Log de Pagamentos"}
            </button>
          ))}
        </div>

        {activeTab === "subscriptions" && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Buscar por nome, e-mail ou WhatsApp..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* List */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>Nenhuma assinatura encontrada.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filtered.map(sub => (
                  <SubscriptionCard key={sub.id} subscription={sub} onRefresh={refresh} />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "logs" && isAuthenticated && <PaymentLogTable />}
      </div>
    </div>
  );
}