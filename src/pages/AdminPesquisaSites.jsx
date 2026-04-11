import React, { useState, useEffect } from "react";
import { 
  Globe, Search, Zap, Trash2, ExternalLink, 
  BarChart3, ShieldCheck, Clock, CheckCircle2,
  Lock, AlertCircle, Trophy, Activity,
  Info, History, ArrowRight, MousePointer2,
  Filter, RefreshCw, Loader2, Heart, MessageSquare, Building, Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminNavbar } from "@/components/AdminNavbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Sheet, SheetContent, SheetHeader, 
  SheetTitle, SheetTrigger 
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = "http://localhost:3001"; // URL do servidor hunter-dom

export default function AdminPesquisaSites() {
  const { toast } = useToast();
  const { isAuthenticated, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  
  // Estados da Pesquisa (Portados de hunter-dom)
  const [searchMode, setSearchMode] = useState("mining"); // 'mining' ou 'direct'
  const [keywords, setKeywords] = useState("");
  const [directDomains, setDirectDomains] = useState("");
  const [minPR, setMinPR] = useState("0.1");
  const [maxPR, setMaxPR] = useState("10");
  const [maxGlobalRank, setMaxGlobalRank] = useState("50000000");

  const [domainsList, setDomainsList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [stats, setStats] = useState({ analyzed: 0, found: 0 });

  // Histórico de monitoramento (Base44 ou LocalStorage)
  const [savedDomains, setSavedDomains] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("pesquisa-sites-monitoramento");
    if (saved) setSavedDomains(JSON.parse(saved));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      toast({
        title: "Acesso Autorizado",
        description: "Bem-vindo ao caçador de domínios.",
      });
    } else {
      toast({
        title: "Erro de Acesso",
        description: "Senha incorreta!",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  /** Processamento Principal (Logic de hunter-dom) */
  const handleProcess = async () => {
    setIsProcessing(true);
    setDomainsList([]);
    setStats({ analyzed: 0, found: 0 });
    
    try {
      let domainList = [];

      if (searchMode === "mining") {
        // MODO MINERAÇÃO: Chama a API do Registro.br (local file no hunter-dom)
        const keywordList = keywords.trim() 
          ? keywords.split(",").map(k => k.trim()).filter(Boolean)
          : [];
          
        const res = await fetch(`${API_BASE_URL}/api/process-list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords: keywordList })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        domainList = data.domains || [];
      } else {
        // MODO DIRETO: Pega da textarea
        domainList = directDomains
          .split(/[\n,]/)
          .map(d => d.trim().toLowerCase())
          .filter(d => d && d.includes(".")); 
      }

      if (domainList.length === 0) {
        toast({ 
          title: "Nenhum domínio", 
          description: "Nenhum domínio encontrado para os critérios informados.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Verificação de Rank em Lote (Batch de 100)
      const batchSize = 100;
      let allRankData = [];
      
      for (let i = 0; i < domainList.length; i += batchSize) {
        const batch = domainList.slice(i, i + batchSize);
        const rankRes = await fetch(`${API_BASE_URL}/api/check-rank`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domains: batch })
        });
        const rankBatchData = await rankRes.json();
        if (rankBatchData.response) {
          allRankData = [...allRankData, ...rankBatchData.response];
        }
      }

      // Filtros de UI
      const min = parseFloat(minPR) || 0;
      const max = parseFloat(maxPR) || 10;
      const maxGlobal = parseInt(maxGlobalRank) || 100000000;

      const formattedResults = allRankData
        .map((r) => ({
          id: Date.now() + Math.random(),
          name: r.name || r.domain,
          rank: r.pagerank || (r.page_rank_decimal ? parseFloat(r.page_rank_decimal) : 0),
          globalRank: r.global_rank || r.rank || 0,
          status: "available"
        }))
        .filter((d) => {
          const prMatch = d.rank >= min && d.rank <= max;
          const globalMatch = d.globalRank === 0 || Number(d.globalRank) <= maxGlobal;
          return prMatch && globalMatch;
        })
        .sort((a, b) => b.rank - a.rank);

      setDomainsList(formattedResults);
      setStats({ analyzed: domainList.length, found: formattedResults.length });

      toast({
        title: "Pesquisa Concluída",
        description: `${formattedResults.length} pérolas encontradas entre ${domainList.length} analisados.`
      });

    } catch (error) {
      console.error("Process error:", error);
      toast({
        title: "Erro na Pesquisa",
        description: "Certifique-se que o servidor hunter-dom (3001) está rodando.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeepAnalysis = async (targetDomain) => {
    setIsAnalyzing(true);
    setAnalysisData(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-domain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: targetDomain })
      });

      if (!response.ok) throw new Error("Falha na comunicação com o servidor.");
      
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      toast({
        title: "Erro na Análise",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveToMonitor = (domain) => {
    if (savedDomains.find(d => d.name === domain.name)) {
      toast({ title: "Já Monitorado", description: "Este domínio já está na sua lista." });
      return;
    }
    const newList = [domain, ...savedDomains];
    setSavedDomains(newList);
    localStorage.setItem("pesquisa-sites-monitoramento", JSON.stringify(newList));
    toast({
      title: "Monitoramento Ativado",
      description: `${domain.name} foi adicionado à sua lista estratégica.`
    });
  };

  const removeFromMonitor = (name) => {
    const newList = savedDomains.filter(d => d.name !== name);
    setSavedDomains(newList);
    localStorage.setItem("pesquisa-sites-monitoramento", JSON.stringify(newList));
  };

  const getAuthorityColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 50) return "text-indigo-400";
    if (score >= 20) return "text-amber-400";
    return "text-slate-400";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Lock className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
            <CardTitle className="text-white text-center text-2xl font-black tracking-tighter">Garimpo Antigravity</CardTitle>
            <p className="text-slate-500 text-center text-[10px] font-black uppercase tracking-widest">Acesso restrito ao caçador de domínios</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha mestra"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white shadow-inner"
                autoFocus
              />
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20 py-6">
                Entrar no Painel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <AdminNavbar />
      
      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* Header Profissional */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-lg shadow-indigo-500/10 transition-transform hover:scale-105">
                <Globe className="w-10 h-10 text-indigo-500" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-white">Pesquisa de Sites</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Garimpo Inteligente & Auditoria Moz V2</p>
              </div>
            </div>
          </div>

          {/* Toggle de Modo */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-xl">
            <button 
              onClick={() => setSearchMode("mining")}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${searchMode === "mining" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
            >
              Garimpar Lista
            </button>
            <button 
              onClick={() => setSearchMode("direct")}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${searchMode === "direct" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
            >
              Pesquisa Direta
            </button>
          </div>
        </header>

        {/* Card de Configuração de Busca */}
        <Card className="bg-slate-900 border-slate-800 backdrop-blur-sm p-8 mb-12 rounded-3xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
          
          <div className="grid lg:grid-cols-2 gap-8 relative z-10">
            {/* Esquerda: Input Principal */}
            <div className="space-y-6">
              {searchMode === "mining" ? (
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Palavras-Chave (Registro.br)</label>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      placeholder="Ex: imobiliaria, corretor, saude..."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="bg-slate-950 border-slate-800 h-14 pl-12 rounded-2xl text-white focus:ring-indigo-500/20 shadow-inner"
                    />
                  </div>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter italic">Deixe vazio para minerar domínios aleatórios da lista de liberação.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Domínios para Auditoria Direta</label>
                  <textarea 
                    placeholder="Cole os domínios aqui (um por linha ou vírgula)..."
                    value={directDomains}
                    onChange={(e) => setDirectDomains(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl text-white p-6 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-inner font-mono text-xs"
                  />
                </div>
              )}
            </div>

            {/* Direita: Filtros e Botão */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mín. PR</label>
                  <Input type="number" step="0.1" value={minPR} onChange={(e) => setMinPR(e.target.value)} className="bg-slate-950 border-slate-800 h-12 rounded-xl text-center font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Máx. PR</label>
                  <Input type="number" step="0.1" value={maxPR} onChange={(e) => setMaxPR(e.target.value)} className="bg-slate-950 border-slate-800 h-12 rounded-xl text-center font-bold" />
                </div>
                <div className="space-y-2 lg:col-span-1 col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ranking Global</label>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                    <Input type="number" value={maxGlobalRank} onChange={(e) => setMaxGlobalRank(e.target.value)} className="bg-slate-950 border-slate-800 h-12 rounded-xl pl-9 font-bold" />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-500 h-16 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 group transition-all"
              >
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <RefreshCw className="mr-3 w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
                    {searchMode === "mining" ? "Garimpar Registro.br" : "Avaliar Lista Direta"}
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {stats.analyzed > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-indigo-400">
              <p className="text-[10px] font-bold uppercase tracking-widest">Amostra: {stats.analyzed} domínios verificados</p>
              <p className="text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-xl border border-indigo-500/20">Aprovados nos filtros: {stats.found}</p>
            </div>
          )}
        </Card>

        {/* Tabela de Resultados */}
        <AnimatePresence>
          {domainsList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Oportunidades Detectadas</h2>
              </div>
              
              <Card className="bg-slate-900 border-slate-800 backdrop-blur-sm overflow-hidden rounded-3xl shadow-2xl">
                <Table>
                  <TableHeader className="bg-slate-900/80 backdrop-blur-sm">
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] pl-10 py-6">Domínio</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">PageRank</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em]">Rank Global</TableHead>
                      <TableHead className="text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] text-right pr-12">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domainsList.map((item) => (
                      <TableRow key={item.id} className="border-slate-800 group hover:bg-slate-800/20 transition-colors">
                        <TableCell className="pl-10 py-7">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-indigo-500 font-black group-hover:border-indigo-500/50 transition-all text-xl">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)] ${item.rank >= 3 ? "bg-emerald-500" : "bg-slate-700"}`}></div>
                            <span className={`font-mono font-bold text-lg ${item.rank >= 3 ? "text-emerald-400" : "text-slate-400"}`}>
                              {item.rank.toFixed(2)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 bg-slate-950 px-4 py-1.5 w-fit rounded-xl border border-slate-800">
                            <Trophy className="w-3.5 h-3.5 text-amber-500/40" />
                            {item.globalRank.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <div className="flex justify-end gap-3">
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeepAnalysis(item.name)}
                                  className="bg-slate-950 border-slate-800 text-slate-400 hover:text-indigo-400 transition-all rounded-xl px-5 h-11"
                                >
                                  <Zap className="mr-2 h-4 w-4" />
                                  Full Scan
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="w-full sm:max-w-[800px] bg-slate-950 border-slate-800 p-0 overflow-hidden">
                                <DetailContent item={item} isAnalyzing={isAnalyzing} analysisData={analysisData} getAuthorityColor={getAuthorityColor} handleDeepAnalysis={handleDeepAnalysis} />
                              </SheetContent>
                            </Sheet>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => saveToMonitor(item)}
                              className="w-11 h-11 text-slate-600 hover:text-indigo-500 hover:bg-indigo-500/10 rounded-xl transition-all"
                            >
                              <Heart className="h-5 w-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategic Monitoring Section */}
        <div className="mt-24 space-y-10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-8">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-amber-500/10 rounded-3xl border border-amber-500/20 shadow-xl shadow-amber-500/5">
                <Target className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Monitoramento Estratégico</h2>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Domínios Favoritados p/ Auditoria Profunda</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedDomains.length === 0 ? (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-900 rounded-[2rem] opacity-30">
                <Heart className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">Sua lista de oportunidades está limpa.</p>
              </div>
            ) : (
              savedDomains.map((item) => (
                <Card key={item.name} className="bg-slate-900 border-slate-800 p-8 rounded-[2rem] hover:border-amber-500/30 transition-all group overflow-hidden relative shadow-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <Heart className="w-24 h-24 text-indigo-500" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                     <div className="space-y-2">
                       <h3 className="text-2xl font-black text-white tracking-tight break-all">{item.name}</h3>
                       <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">High Value</span>
                         <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">{item.rank} PR</span>
                       </div>
                     </div>
                     <button onClick={() => removeFromMonitor(item.name)} className="text-slate-700 hover:text-rose-500 transition-colors bg-slate-950 p-2 rounded-xl">
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <Button 
                      variant="outline" 
                      onClick={() => handleDeepAnalysis(item.name)}
                      className="flex-1 bg-slate-950 border-slate-800 text-slate-400 h-12 text-[10px] font-black uppercase tracking-widest hover:text-indigo-400 rounded-xl"
                    >
                      Deep Scan
                    </Button>
                    <Sheet>
                       <SheetTrigger asChild>
                         <Button className="flex-1 bg-indigo-600 hover:bg-indigo-500 h-12 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/10 rounded-xl">
                           Estrategy
                         </Button>
                       </SheetTrigger>
                       <SheetContent className="bg-slate-950 border-slate-800 p-0 overflow-hidden">
                         <NotesContent item={item} />
                       </SheetContent>
                    </Sheet>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer com Status da Engine */}
      <footer className="max-w-7xl mx-auto p-12 mt-24 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center bg-slate-950/50 gap-8">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">Antigravity Research Engine V2.5</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Moz Scape: Connected</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Local Node 3001: Active</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4 opacity-30">
          <Globe className="w-8 h-8 text-slate-600" />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[.8em]">AlexisMarketing</span>
        </div>
      </footer>
    </div>
  );
}

/** Componentes Auxiliares p/ Organização */

function DetailContent({ item, isAnalyzing, analysisData, getAuthorityColor, handleDeepAnalysis }) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sticky top-0 z-50"></div>
      <div className="flex-1 overflow-y-auto p-10 sm:p-16 space-y-16">
        <SheetHeader className="border-b border-slate-900 pb-12">
          <div className="flex items-center gap-8">
            <div className="bg-indigo-600 p-5 rounded-[2rem] shadow-2xl shadow-indigo-600/20">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <div>
              <SheetTitle className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">{item.name}</SheetTitle>
              <p className="text-xs font-bold text-indigo-500 tracking-[.5em] uppercase mt-4">Auditoria Moz Expert</p>
            </div>
          </div>
        </SheetHeader>

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center h-[50vh] gap-12">
            <div className="relative">
               <Loader2 className="h-20 w-20 text-indigo-500 animate-spin" />
               <Search className="h-6 w-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="text-center space-y-4">
              <p className="text-3xl font-black text-white tracking-widest uppercase italic">Interceptando Dados</p>
              <p className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.5em]">Consultando Moz Scape V2 API (Padrão Ouro)</p>
            </div>
          </div>
        ) : analysisData ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-16">
            {/* Métricas Grandes */}
            <div className="grid sm:grid-cols-2 gap-8">
               <Card className="bg-slate-900 border-slate-800 p-12 flex flex-col items-center justify-center group overflow-hidden relative shadow-2xl rounded-[2.5rem]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <Trophy className="w-32 h-32 text-indigo-500" />
                  </div>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-8">Score de Autoridade (DA)</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-[10rem] font-black tracking-tighter leading-none ${getAuthorityColor(analysisData.backlinks.rank || 0)}`}>
                      {analysisData.backlinks.rank || 0}
                    </p>
                    <span className="text-slate-700 text-3xl font-black">/100</span>
                  </div>
               </Card>
               
               <div className="grid grid-cols-1 gap-6">
                  <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col justify-center space-y-2 rounded-[2rem] shadow-xl">
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Domínios de Referência</span>
                     <span className="text-5xl font-black text-white tracking-tighter">{analysisData.backlinks.referring_domains?.toLocaleString() || 0}</span>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800 p-8 flex flex-col justify-center space-y-2 rounded-[2rem] shadow-xl">
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Métrica de Spam</span>
                     <span className={`text-5xl font-black tracking-tighter ${analysisData.backlinks.backlinks_spam_score > 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {analysisData.backlinks.backlinks_spam_score || 0}%
                     </span>
                  </Card>
               </div>
            </div>

            {/* Whois & Meta */}
            <div className="grid md:grid-cols-2 gap-12">
               <section className="space-y-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3 italic">
                    <History className="w-5 h-5 text-indigo-500" /> Histórico Host
                  </h3>
                  <div className="space-y-4">
                     <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-600 uppercase">Criação</span>
                        <span className="text-white font-black">{analysisData.whois?.created_datetime ? new Date(analysisData.whois.created_datetime).toLocaleDateString() : 'N/A'}</span>
                     </div>
                     <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-600 uppercase">Vencimento</span>
                        <span className="text-indigo-400 font-bold">{analysisData.whois?.expiration_datetime ? new Date(analysisData.whois.expiration_datetime).toLocaleDateString() : 'N/A'}</span>
                     </div>
                  </div>
               </section>

               <section className="space-y-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3 italic">
                    <Globe className="w-5 h-5 text-indigo-500" /> Auditoria On-Page
                  </h3>
                  <Card className="bg-slate-900 border-none overflow-hidden rounded-2xl">
                    <div className="bg-slate-800 px-6 py-4 border-b border-indigo-500/10">
                       <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Meta Title Tag</h4>
                    </div>
                    <CardContent className="p-8">
                       <p className="text-slate-300 font-bold leading-relaxed text-sm italic">
                         {analysisData.onPage?.meta?.title || "Nenhum título detectado. Domínio possivelmente offline ou estacionado."}
                       </p>
                    </CardContent>
                  </Card>
               </section>
            </div>

            <Button className="w-full bg-white text-black hover:bg-slate-200 font-black uppercase tracking-[0.3em] h-20 rounded-[2rem] shadow-2xl shadow-white/5 active:scale-95 transition-transform" asChild>
               <a href={`http://${item.name}`} target="_blank" rel="noopener noreferrer">Inspecionar URL <ExternalLink className="ml-4 w-6 h-6" /></a>
            </Button>
            
            <div className="text-center pt-8">
               <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.8em]">Antigravity Intelligence Unit</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-8 h-[40vh]">
             <AlertCircle className="w-16 h-16 text-rose-500 opacity-50" />
             <div className="text-center space-y-2">
                <p className="text-xl font-black text-white uppercase tracking-tighter">Erro Crítico de Fetch</p>
                <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest max-w-[300px] leading-relaxed">Não foi possível carregar os dados. Verifique a chave de API ou se o domínio é válido.</p>
             </div>
             <Button variant="outline" onClick={() => handleDeepAnalysis(item.name)} className="border-slate-800 text-slate-400 hover:text-white rounded-xl px-10 h-14 uppercase font-black text-[10px] tracking-widest">Tentar Novamente</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function NotesContent({ item }) {
  const [note, setNote] = useState(() => {
    const saved = localStorage.getItem(`note-${item.name}`);
    return saved || "";
  });

  const saveNote = () => {
    localStorage.setItem(`note-${item.name}`, note);
    window.dispatchEvent(new Event('storage')); // Força update se necessário
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="h-2 w-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] sticky top-0 z-50"></div>
      <div className="flex-1 p-10 sm:p-16 space-y-12 overflow-y-auto">
         <SheetHeader className="border-b border-slate-900 pb-10">
            <div className="flex items-center gap-6">
               <div className="bg-amber-500/10 p-4 rounded-3xl border border-amber-500/20">
                  <MessageSquare className="w-10 h-10 text-amber-500" />
               </div>
               <div>
                  <SheetTitle className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">{item.name}</SheetTitle>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-3">Notas Estratégicas e Planejamento</p>
               </div>
            </div>
         </SheetHeader>

         <div className="space-y-6">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Memorial Descritivo do Domínio</label>
            <textarea 
              className="w-full h-80 bg-slate-900 border border-slate-800 rounded-[2rem] p-8 text-white text-sm focus:ring-2 focus:ring-amber-500/20 font-sans leading-relaxed shadow-inner outline-none transition-all"
              placeholder="Documente aqui a estratégia para este domínio... (Ex: Valor de compra, nicho alvo, próximos passos)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={saveNote} className="w-full bg-amber-600 hover:bg-amber-500 font-black uppercase tracking-[0.2em] h-16 rounded-2xl shadow-xl shadow-amber-600/10 transition-all active:scale-95">
              Arquivar Notas
            </Button>
         </div>
      </div>
    </div>
  );
}
