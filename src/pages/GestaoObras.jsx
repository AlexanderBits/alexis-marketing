import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  TrendingUp, 
  Calculator, 
  Users, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Layers,
  AlertCircle,
  LayoutDashboard,
  Settings2,
  FileText,
  Lock,
  Wallet,
  Truck,
  BarChart4,
  CalendarDays,
  Monitor,
  PackageCheck,
  ChevronRight,
  PlusCircle,
  Download,
  Flame,
  Loader2,
  X,
  MessageCircle,
  Smartphone,
  User,
  Mail
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

// Software UI Component - ZERO GREEN
const SoftwareMockup = ({ screen = 'dashboard' }) => {
  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, active: screen === 'dashboard' },
    { name: 'Insumos', icon: <Layers size={18} />, active: screen === 'insumos' },
    { name: 'Produção', icon: <PackageCheck size={18} />, active: false },
    { name: 'Pagamentos M.O.', icon: <Users size={18} />, active: screen === 'pagamentos' },
    { name: 'Despesas', icon: <Wallet size={18} />, active: screen === 'despesas' },
    { name: 'Contas a Pagar', icon: <FileText size={18} />, active: false },
    { name: 'Veículos', icon: <Truck size={18} />, active: false },
    { name: 'Calendário', icon: <CalendarDays size={18} />, active: false },
    { name: 'Relatórios', icon: <BarChart4 size={18} />, active: false },
    { name: 'Configurações', icon: <Settings2 size={18} />, active: false },
  ];

  return (
    <div className="bg-[#FAF7F2] rounded-xl overflow-hidden border border-slate-200 shadow-2xl flex h-[550px] w-full font-sans text-slate-800">
      <div className="w-52 bg-white border-r border-slate-100 flex flex-col p-4">
        <div className="flex items-center gap-2 mb-10 px-1">
          <div className="bg-red-500 p-1.5 rounded-lg text-white">
            <Flame size={20} fill="white" />
          </div>
          <div className="leading-none">
            <p className="font-black text-[10px] text-slate-900 uppercase tracking-tighter">Controle e Custos</p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">Gestão de Produção</p>
          </div>
        </div>
        
        <div className="space-y-0.5">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-3">Navegação</p>
          {sidebarItems.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${item.active ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className={item.active ? 'text-red-500' : 'text-slate-400'}>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-red-400 flex items-center justify-center font-black text-white text-xs">C</div>
          <div className="text-[9px]">
            <p className="font-black text-slate-900">Administrador</p>
            <p className="text-slate-400 font-bold">Versão 2.8</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">
              {screen === 'dashboard' && 'Dashboard de Produção'}
              {screen === 'insumos' && 'Gestão de Insumos'}
            </h3>
            <p className="text-sm text-slate-500 font-medium italic mt-1">Visão geral do seu negócio de produção e custos</p>
          </div>
          <div className="bg-[#8B5CF6] text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 uppercase tracking-tighter">
             <PlusCircle size={16} /> Novo Lembrete
          </div>
        </div>

        <div className="space-y-8">
           <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2 tracking-tight">Produção Mensal</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">0 un</p>
                  <div className="p-2 bg-slate-100 rounded-xl"><PackageCheck className="text-slate-400" size={20} /></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2 tracking-tight">Custo Médio</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">R$ 0,00</p>
                  <div className="p-2 bg-orange-50 rounded-xl text-orange-500 font-black text-lg">$</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2 tracking-tight">Lucro Médio/Un</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">R$ 0,00</p>
                  <div className="p-2 bg-slate-100 rounded-xl"><TrendingUp className="text-slate-400" size={20} /></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const GestaoObras = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    consent: false
  });
  const [timeLeft, setTimeLeft] = useState({
    hours: 11, minutes: 45, seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartPurchase = () => {
    setShowModal(true);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customerData.consent) {
      toast({
        title: "Atenção",
        description: "Você precisa confirmar que receberá a chave via WhatsApp.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await base44.functions.invoke('createSoftwareCheckout', {
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_whatsapp: customerData.whatsapp
      });
      
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error(response.data?.error || "Erro ao gerar checkout");
      }
    } catch (error) {
      console.error("Erro completo do checkout:", error);
      const errorMessage = error.response?.data?.error || error.message || "Não foi possível iniciar o pagamento.";
      toast({
        title: "Erro no Checkout",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F6] text-slate-800 selection:bg-red-500/20 font-sans">
      {/* Top Banner */}
      <div className="bg-[#1F2937] py-3 px-4 text-center text-sm font-bold text-white flex items-center justify-center gap-4 sticky top-0 z-50 shadow-lg">
        <Clock className="w-4 h-4 animate-pulse text-red-400" />
        <span className="uppercase tracking-[0.1em]">OFERTA DE LANÇAMENTO: 50% DE DESCONTO ENCERRA EM {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}S</span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-[#F2EBE4] to-[#FDF9F6]">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Badge className="bg-red-600 text-white border-0 px-5 py-2 text-xs uppercase tracking-widest font-black shadow-lg shadow-red-500/20">
                Software Desktop Profissional (.EXE)
              </Badge>
              <Badge className="bg-slate-900 text-white border-0 px-5 py-2 text-xs uppercase tracking-widest font-black shadow-lg flex gap-2 items-center">
                <Monitor className="w-4 h-4" /> Windows 7 / 10 / 11
              </Badge>
            </div>

            <h1 className="text-6xl md:text-[100px] font-black tracking-tight mb-10 text-slate-900 leading-[0.95] uppercase italic">
              Tenha controle <br />
              <span className="text-red-600 underline decoration-slate-200 decoration-8 underline-offset-8">dos gastos e lucro.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-14 leading-relaxed max-w-5xl mx-auto font-medium">
              Solução ideal para negócios como <span className="text-slate-900 font-black italic">lojas de churrasqueiras, venda de piscinas de fibra com instalação, instaladores de gesso e drywall, marmorarias, telhados e marcenarias</span>.
            </p>

            <div className="bg-white/40 backdrop-blur-md p-8 rounded-[32px] border border-slate-100 mb-16 max-w-4xl mx-auto shadow-xl">
               <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-bold">
                  Saiba exatamente quanto ganhou em cada venda com a <span className="text-red-600 italic">porcentagem real de lucro</span>. Tenha controle da mão de obra e dos insumos em um só lugar.
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
              <Button 
                size="lg" 
                onClick={handleStartPurchase}
                className="bg-[#DC2626] hover:bg-red-700 text-white px-16 h-24 text-3xl font-black rounded-2xl group shadow-[0_20px_50px_rgba(220,38,38,0.3)] transition-all hover:scale-105 active:scale-95 border-b-8 border-red-800 uppercase italic"
              >
                BAIXAR AGORA
                <Download className="ml-4 w-10 h-10 group-hover:translate-y-1 transition-transform" />
              </Button>
              <div className="text-left bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 group cursor-pointer hover:border-red-500 transition-colors">
                <div className="flex items-center gap-2 text-slate-900 font-black text-2xl italic tracking-tight">
                  <MessageCircle className="w-8 h-8 text-emerald-500" />
                  Falar com Consultor
                </div>
                <p className="text-slate-500 text-sm font-bold ml-10 uppercase tracking-tighter">Dúvidas via WhatsApp</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative mx-auto max-w-6xl group"
          >
            <SoftwareMockup screen="dashboard" />
          </motion.div>
        </div>
      </section>

      {/* Niches Bar */}
      <section className="py-24 bg-white border-y border-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 uppercase tracking-[0.4em] text-[10px] font-black mb-12">Desenvolvido para Profissionais e Lojistas</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-30 grayscale contrast-125 font-black text-2xl italic tracking-normal text-slate-900 uppercase">
            <span>CHURRASQUEIRAS</span>
            <span>PISCINAS DE FIBRA</span>
            <span>GESSO & DRYWALL</span>
            <span>TELHADOS</span>
            <span>MARMORARIAS</span>
            <span>MARCENARIAS</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 bg-[#F2EBE4]/30">
        <div className="container mx-auto px-6 text-center mb-24">
            <h2 className="text-6xl font-black mb-6 text-slate-900 tracking-tight uppercase italic underline decoration-red-500 decoration-8 underline-offset-8">Gestão Profissional 360°</h2>
            <p className="text-2xl text-slate-500 max-w-4xl mx-auto font-medium">Controle total de insumos e mão de obra em um só lugar.</p>
        </div>
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <motion.div {...fadeIn}>
                    <div className="p-5 bg-red-50 rounded-3xl inline-block mb-8 shadow-sm">
                        <Wallet className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-5xl font-black mb-8 leading-tight text-slate-900 uppercase italic tracking-tight">
                        Domine suas <br /><span className="text-red-600">Despesas Gerais</span>
                    </h3>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                        De gasolina ao salário do escritório. No nosso programa, você cadastra cada saída e visualiza o impacto real no seu lucro mensal instantaneamente.
                    </p>
                    <Button onClick={handleStartPurchase} size="lg" className="bg-slate-900 text-white font-black px-10 h-16 rounded-xl uppercase tracking-widest italic">Comprar Licença Agora</Button>
                </motion.div>
                <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                    <SoftwareMockup screen="insumos" />
                </motion.div>
            </div>
        </div>
      </section>

      {/* Pricing - Using Same Gateway Logic */}
      <section className="py-40 bg-[#1F2937] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-7xl font-black mb-6 italic tracking-tight uppercase text-white leading-tight">Sua empresa <span className="text-red-600">organizada</span> hoje.</h2>
            
            <div className="max-w-xl mx-auto mt-24">
              <Card className="bg-white border-[12px] border-slate-900 shadow-[0_60px_150px_-20px_rgba(220,38,38,0.25)] overflow-hidden scale-110 rounded-[50px]">
                <div className="bg-red-600 py-6 text-center">
                  <span className="text-white font-black uppercase tracking-[0.3em] text-xs italic">LICENÇA ANUAL • CHAVE VIA WHATSAPP</span>
                </div>
                <CardContent className="p-16">
                  <div className="mb-14 text-center">
                    <span className="text-slate-400 line-through text-3xl block mb-4 font-black italic uppercase tracking-tight">De R$ 997,00</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[140px] font-black text-slate-900 tracking-tight leading-none mb-6">R$ 497</span>
                      <Badge className="bg-[#8B5CF6] text-white px-10 py-4 rounded-3xl text-3xl font-black italic shadow-[0_10px_30px_rgba(139,92,246,0.3)]">PAGAMENTO ÚNICO</Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={handleStartPurchase}
                    className="w-full bg-[#DC2626] hover:bg-red-700 text-white h-28 text-4xl font-black rounded-[40px] shadow-2xl shadow-red-500/40 group transition-all active:scale-95 border-b-[12px] border-red-800 mb-10 uppercase tracking-tight italic"
                  >
                    BAIXAR PROGRAMA
                    <Download className="ml-5 w-12 h-12 group-hover:translate-y-2 transition-transform" />
                  </Button>
                  
                  <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.4em] italic leading-relaxed">
                    Você receberá 7 (Sete) dias de teste grátis. <br />
                    Após esse período, é necessário adquirir a licença que é <br />
                    enviada no seu WhatsApp logo após a confirmação do pagamento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal - Collect WhatsApp Data */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden p-10 border border-slate-100"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>

              <div className="text-center mb-10">
                 <div className="w-20 h-20 bg-red-50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-red-600" />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight mb-2">Quase lá!</h3>
                 <p className="text-slate-500 font-medium leading-relaxed">
                    Você receberá **7 dias de teste grátis**. <br />
                    Informe onde deseja receber o link de download e sua chave.
                 </p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Seu Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <Input 
                      id="name" 
                      required
                      placeholder="Ex: João da Silva"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-red-500 focus:border-red-500 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">WhatsApp (Com DDD)</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <Input 
                      id="whatsapp" 
                      required
                      type="tel"
                      placeholder="Ex: 11999999999"
                      value={customerData.whatsapp}
                      onChange={(e) => setCustomerData({...customerData, whatsapp: e.target.value})}
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-red-500 focus:border-red-500 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Seu Melhor E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <Input 
                      id="email" 
                      required
                      type="email"
                      placeholder="Ex: joao@empresa.com.br"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-red-500 focus:border-red-500 font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div 
                    onClick={() => setCustomerData({...customerData, consent: !customerData.consent})}
                    className={`w-6 h-6 border-2 flex-shrink-0 cursor-pointer transition-all flex items-center justify-center rounded-lg ${customerData.consent ? "border-red-600 bg-red-600" : "border-red-200 bg-white"}`}
                  >
                    {customerData.consent && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-[11px] text-red-900 font-bold leading-tight">
                    Estou ciente que receberei **7 dias de teste grátis** e que a licença definitiva será enviada para o meu WhatsApp após o pagamento.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white h-20 text-2xl font-black rounded-2xl shadow-xl shadow-red-500/20 uppercase italic transition-all active:scale-95"
                >
                  {isProcessing ? <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : "IR PARA O PAGAMENTO"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="font-black text-6xl tracking-tight italic text-slate-900 mb-8 uppercase">ALEXIS GESTÃO</div>
          <div className="flex justify-center gap-10 items-center">
             <a href="https://wa.me/55SEUNUMERO" target="_blank" className="flex items-center gap-2 text-emerald-600 font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                <MessageCircle size={18} /> Chamar no WhatsApp
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GestaoObras;
