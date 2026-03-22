import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { SEO_Editor } from "@/components/seo/SEO_Editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Search, Layout, LogOut, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const ROUTES = [
  { id: "Home", path: "/", label: "Página Inicial" },
  { id: "google-meu-negocio", path: "/google-meu-negocio", label: "Google Meu Negócio" },
  { id: "gestao-de-redes-sociais", path: "/gestao-de-redes-sociais", label: "Gestão Redes Sociais" },
  { id: "politica-de-privacidade", path: "/politica-de-privacidade", label: "Política de Privacidade" },
];

export default function AdminSEO() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("Home");
  const [seoData, setSeoData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchSeoData();
    }
  }, [isAuthenticated]);

  const fetchSeoData = async () => {
    setIsLoading(true);
    try {
      // Tentar carregar dados do Base44
      const { data } = await base44.entities.SiteMetadata.list();
      const mappedData = {};
      data.forEach(item => {
        mappedData[item.path] = item;
      });
      setSeoData(mappedData);
    } catch (error) {
      console.error("Erro ao carregar SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "alexisrio2019") {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Senha incorreta.",
        variant: "destructive",
      });
    }
  };

  const saveSeo = async (updatedData) => {
    try {
      const existing = seoData[updatedData.canonical];
      if (existing) {
        await base44.entities.SiteMetadata.update(existing.id, updatedData);
      } else {
        await base44.entities.SiteMetadata.create({
          ...updatedData,
          path: updatedData.canonical
        });
      }
      toast({
        title: "SEO Atualizado!",
        description: "As metatags foram salvas com sucesso no banco de dados.",
      });
      fetchSeoData();
    } catch (error) {
      console.error("Erro ao salvar SEO:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível persistir as alterações de SEO.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800 text-white p-8">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <CardTitle>Acesso Restrito: SEO Admin</CardTitle>
            <CardDescription className="text-slate-400 pt-2">
              Insira a senha mestra para gerenciar a indexação do site.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin} className="space-y-6 mt-4">
            <Input 
              type="password" 
              placeholder="Digite a senha..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 focus:ring-blue-500 py-6"
              autoFocus
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6">
              Entrar no Painel SEO
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Otimização Auditada (SEO)</h1>
              <p className="text-slate-400 text-sm">Gerenciamento dinâmico de JSON-LD e MetaTags</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-900 gap-2">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Selecione a Página
            </h3>
            {ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedPage(route.id)}
                className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 border flex items-center justify-between group ${
                  selectedPage === route.id
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20"
                    : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {route.label}
                <CheckCircle2 className={`w-4 h-4 ${selectedPage === route.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"} transition-all`} />
              </button>
            ))}
          </aside>

          <main>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div key="loader" className="flex items-center justify-center p-24">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
              ) : (
                <motion.div
                  key={selectedPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {ROUTES.map(route => 
                    selectedPage === route.id ? (
                      <SEO_Editor 
                        key={route.id}
                        pagePath={route.path}
                        initialData={seoData[route.path]}
                        onSave={saveSeo}
                      />
                    ) : null
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
