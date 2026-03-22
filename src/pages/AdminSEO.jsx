import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Search, Layout, LogOut, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { base44 } from "@/api/base44Client";
import { SEO_Editor } from "@/components/seo/SEO_Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ROUTES = [
  { id: "Home", path: "/", label: "Página Inicial" },
  { id: "google-meu-negocio", path: "/google-meu-negocio", label: "GMN" },
  { id: "gestao-de-redes-sociais", path: "/gestao-de-redes-sociais", label: "Redes Sociais" },
  { id: "politica-de-privacidade", path: "/politica-de-privacidade", label: "Privacidade" },
];

export default function AdminSEO() {
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState("Home");
  const [seoMap, setSeoMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await base44.entities.SiteMetadata.list();
      const map = {};
      data.forEach(item => { map[item.path] = item; });
      setSeoMap(map);
    } catch (e) {
      console.error("SEO_FETCH_ERR", e);
    } finally {
      setLoading(false);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (pass === "alexisrio2019") setAuthed(true);
    else toast({ title: "Erro de autenticação", variant: "destructive" });
  };

  const handleSave = async (payload) => {
    try {
      const existing = seoMap[payload.canonical];
      if (existing) {
        await base44.entities.SiteMetadata.update(existing.id, payload);
      } else {
        await base44.entities.SiteMetadata.create({ ...payload, path: payload.canonical });
      }
      toast({ title: "SEO_SYNC_OK" });
      fetchData();
    } catch (e) {
      toast({ title: "SEO_SYNC_ERR", variant: "destructive" });
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800 text-white p-8">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <CardTitle>SEO Admin Gate</CardTitle>
          </CardHeader>
          <form onSubmit={onLogin} className="space-y-6 mt-4">
            <Input 
              type="password" 
              placeholder="Master Pass" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="bg-slate-950 border-slate-800 py-6"
              autoFocus
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6">
              Acessar
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Otimização Auditada</h1>
              <p className="text-slate-400 text-sm">JSON-LD & Meta Management</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => window.location.href = "/"} className="text-slate-400 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </header>

        <div className="grid lg:grid-cols-[250px_1fr] gap-12">
          <aside className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Páginas
            </h3>
            {ROUTES.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoute(r.id)}
                className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 border flex items-center justify-between ${
                  selectedRoute === r.id
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg"
                    : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {r.label}
                <CheckCircle2 className={`w-4 h-4 ${selectedRoute === r.id ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </aside>

          <main>
            <AnimatePresence mode="wait">
              {loading ? (
                <div key="loader" className="flex items-center justify-center p-24">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
              ) : (
                <motion.div
                  key={selectedRoute}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {ROUTES.map(r => selectedRoute === r.id && (
                      <SEO_Editor 
                        key={r.id}
                        pagePath={r.path}
                        initialData={seoMap[r.path]}
                        onSave={handleSave}
                      />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
