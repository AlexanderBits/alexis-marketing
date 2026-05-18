import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { alexis } from "@/api/alexisClient";
import { useToast } from "@/components/ui/use-toast";
import { FileText, CheckCircle2, Loader2, ChevronRight, MapPin } from "lucide-react";
import Footer from "@/components/landing/Footer";
import pixQrCode from "@/assets/pix-qr-code.png";

export default function ContractPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const initialService = urlParams.get('service') || "default";

  const [formData, setFormData] = useState({
    client_type: "cpf",
    client_name: "",
    client_cpf: "",
    client_cnpj: "",
    client_email: "",
    client_whatsapp: "",
    client_cep: "",
    client_street: "",
    client_number: "",
    client_neighborhood: "",
    client_city: "",
    client_state: "",
    selected_plan: urlParams.get('plan') || (initialService === "nortecnet" ? "simple" : "bronze"),
    nortecnet_email: "",
    target_email: "",
    payment_method: "stripe"
  });

  const [accepted, setAccepted] = useState(false);
  const [serviceType, setServiceType] = useState(initialService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await alexis.auth.me();
        if (!user) {
          alexis.auth.redirectToLogin('/contrato');
          return;
        }
        setCurrentUser(user);
        setFormData(prev => ({
          ...prev,
          client_email: user.email || '',
          client_name: user.full_name || ''
        }));
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        alexis.auth.redirectToLogin('/contrato');
      } finally {
        setIsLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const planValues = {
    simple: 29.90,
    bronze: 49.90,
    prata: 99.90,
    ouro: 199.90,
    entry: 400.00,
    starter: 1000.00,
    growth: 2500.00,
    scale: 5000.00
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'client_cep') {
      const cep = value.replace(/\D/g, '');
      if (cep.length === 8) {
        setIsLoadingCep(true);
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(r => r.json())
          .then(data => {
            if (!data.erro) {
              setFormData(prev => ({
                ...prev,
                client_street: data.logradouro || '',
                client_neighborhood: data.bairro || '',
                client_city: data.localidade || '',
                client_state: data.uf || '',
              }));
            }
          })
          .finally(() => setIsLoadingCep(false));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accepted) {
      toast({
        title: "Aceite Necessário",
        description: "Você precisa aceitar os termos do contrato para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const contractResponse = await alexis.functions.invoke('submitContract', {
        ...formData,
        plan_value: planValues[formData.selected_plan]
      });

        if (contractResponse.data.success) {
          if (formData.payment_method === "pix") {
            setSubmitted(true);
            toast({
              title: "Contrato Assinado!",
              description: "Agora realize o pagamento via PIX e envie o comprovante.",
            });
          } else {
            const checkoutResponse = await alexis.functions.invoke('createCheckoutSession', {
              selected_plan: formData.selected_plan,
              customer_email: formData.client_email,
              contract_id: contractResponse.data.contract_id || '',
            });

            if (checkoutResponse.data.url) {
              window.location.href = checkoutResponse.data.url;
            } else {
              setSubmitted(true);
            }
          }
        } else {
          toast({
            title: "Erro ao Aceitar",
            description: contractResponse.data.error || "Ocorreu um erro ao processar o contrato.",
            variant: "destructive"
          });
        }
    } catch (error) {
      toast({
        title: "Erro ao processar contrato",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-white">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md bg-brand-card border border-white/5 p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-lime" />
          <div className="w-20 h-20 bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-lime" />
          </div>
          <h1 className="text-4xl font-['Outfit'] font-extrabold text-white mb-4 tracking-tight">
            {formData.payment_method === "pix" ? "Contrato Gerado!" : <>Contrato <span className="text-brand-lime">Ativado!</span></>}
          </h1>
          <p className="text-white/50 text-sm mb-10 leading-relaxed uppercase tracking-widest font-bold">
            {formData.payment_method === "pix" ? (
              <>Realize o pagamento via PIX, envie o comprovante no WhatsApp e depois <span className="text-white">clique abaixo para iniciar o Briefing de Campanha</span>.</>
            ) : (
              <>Contrato processado! Próximo passo: <span className="text-white">iniciar o Briefing de Campanha</span>.</>
            )}
          </p>

          {formData.payment_method === "pix" && (
            <div className="mb-8 p-4 border border-brand-lime/20 bg-brand-lime/5 flex flex-col items-center">
              <img src={pixQrCode} alt="QR Code PIX" className="w-40 h-40 mb-4" />
              <p className="text-brand-lime text-xs font-bold uppercase tracking-wider">
                Aguardando comprovante no WhatsApp
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <Button 
              onClick={() => window.location.href = "/onboarding"} 
              className="w-full bg-brand-lime hover:bg-brand-lime/90 text-black py-8 rounded-none text-sm font-black uppercase tracking-[0.2em] group"
            >
              Clique aqui para terminar a etapa
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark text-white font-['Inter'] selection:bg-brand-lime selection:text-black overflow-x-hidden min-h-screen">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-lime/10 blur-[120px] rounded-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-none" />
      </div>

      {/* Navbar - Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={() => window.location.href = "/"}
          className="flex items-center gap-2 text-white/50 hover:text-brand-lime transition-colors bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest shadow-2xl"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Voltar para Home
        </button>
      </div>

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-card border border-white/5 rounded-none shadow-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-lime/50 to-transparent" />
            
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center">
                <FileText className="w-8 h-8 text-brand-lime" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-['Outfit'] font-extrabold tracking-tight text-white leading-none">
                  Contrato de <span className="text-brand-lime">Prestação de Serviços</span>
                </h1>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mt-4 italic">Documento Oficial • Alexis Dev Engine</p>
              </div>
            </div>

            {/* Contract Text */}
            <div className="bg-black/40 border border-white/5 rounded-none p-8 mb-12 max-h-[400px] overflow-y-auto text-white/60 text-sm leading-relaxed custom-scrollbar scrollbar-thin scrollbar-thumb-brand-lime/20">
              <h2 className="text-2xl font-['Outfit'] font-bold text-white mb-6">
                CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TÉCNICA E TREINAMENTO EM INFORMÁTICA
              </h2>
              
              <p className="mb-6">Pelo presente instrumento particular de contrato de prestação de serviços, de um lado:</p>
              
              <div className="bg-white/5 p-6 border-l-2 border-brand-lime mb-8">
                <p>
                  <strong className="text-white uppercase text-xs tracking-widest block mb-2">Contratado:</strong>
                  ISRAEL DE OLIVEIRA PINHEIRO, pessoa física, inscrito no CNPJ sob o nº 65.739.462/0001-70, 
                  com sede na RUA A4, nº 400, Bairro PARADA IDEAL, no Município de GUAPIMIRIM, Estado do Rio de Janeiro, CEP 25942-716.
                </p>
              </div>

              <div className="bg-white/5 p-6 border-l-2 border-white/20 mb-8">
                <p>
                  <strong className="text-white uppercase text-xs tracking-widest block mb-2">Contratante:</strong>
                  Os dados serão preenchidos abaixo.
                </p>
              </div>

              <h3 className="text-xl font-['Outfit'] font-bold text-white mt-10 mb-4 border-b border-white/5 pb-2">CLÁUSULA PRIMEIRA – DO OBJETO DO CONTRATO</h3>
              <p className="mb-4">
                1.1. O presente contrato tem como objeto a prestação de serviços de consultoria técnica e treinamento em informática, 
                focados na gestão e otimização de conteúdo digital em ambiente web, a serem realizados pelo CONTRATADO em favor do CONTRATANTE.
              </p>
              <p className="mb-4">
                1.2. Os serviços incluem, mas não se limitam a: otimização de sites, estratégias de conteúdo, análise de performance, 
                treinamento em ferramentas de gerenciamento de conteúdo.
              </p>
              <p className="mb-4">
                1.3. Para os planos de Assessoria em Marketing (Níveis de Escala), o serviço engloba a gestão e otimização de campanhas de tráfego pago nas plataformas Google Ads, Facebook Ads e Instagram, visando a escala e performance do negócio.
              </p>
              {serviceType === "nortecnet" && (
                <p className="mb-4 text-brand-lime font-bold">
                  1.4. Especificamente para o serviço de Redirecionamento de E-mail, fica acordado o encaminhamento de todas as mensagens recebidas no endereço <span className="underline">{formData.nortecnet_email || "[E-mail Nortecnet]"}</span> para o endereço de destino <span className="underline">{formData.target_email || "[Gmail de Destino]"}</span>.
                </p>
              )}

              <h3 className="text-xl font-['Outfit'] font-bold text-white mt-10 mb-4 border-b border-white/5 pb-2">CLÁUSULA SEGUNDA – DO PLANO E VALOR MENSAL</h3>
              <p className="mb-4">2.1. O CONTRATANTE opta por um dos seguintes planos de serviços, com o valor mensal correspondente:</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-lime" /> <strong className="text-white">Simple:</strong> R$ 29,90/mês</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-lime" /> <strong className="text-white">Bronze:</strong> R$ 49,90/mês</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-lime" /> <strong className="text-white">Prata:</strong> R$ 99,90/mês</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-lime" /> <strong className="text-white">Ouro:</strong> R$ 199,90/mês</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-lime" /> <strong className="text-white">Assessoria em Marketing (Níveis de Escala):</strong> R$ 400 a R$ 5.000/mês</li>
              </ul>

              <p className="mb-4 italic text-xs text-white/40">
                * O Plano Essencial possui escopo restrito e não se aplica a 98% dos modelos de negócio tradicionais.
              </p>

              <h3 className="text-xl font-['Outfit'] font-bold text-white mt-10 mb-4 border-b border-white/5 pb-2">CLÁUSULA TERCEIRA – DA FIDELIDADE</h3>
              <p className="mb-4">
                3.1. As partes acordam um período de fidelidade de 1 (um) ano, conforme proposta comercial.
              </p>
              <p className="mb-4 text-brand-lime/80 font-medium">
                3.2. Caso a proposta tenha sido "sem fidelidade" para compradores do site, esta cláusula fica dispensada sem custos adicionais.
              </p>
              <p className="mb-4 text-brand-lime/80 font-medium">
                3.3. Especificamente para o serviço de Redirecionamento de E-mail Nortecnet, o período de fidelidade será de 12 (doze) meses para o plano Simple (R$ 29,90) e de 6 (seis) meses para o plano Bronze (R$ 49,90).
              </p>

              <h3 className="text-xl font-['Outfit'] font-bold text-white mt-10 mb-4 border-b border-white/5 pb-2">CLÁUSULA QUARTA – DA PLATAFORMA (BÔNUS)</h3>
              <p className="mb-4">
                4.1. Como benefício pela fidelidade, disponibilizamos interface digital (site institucional) em regime de comodato.
              </p>

              <h3 className="text-xl font-['Outfit'] font-bold text-white mt-10 mb-4 border-b border-white/5 pb-2">CLÁUSULA SÉTIMA – DO ACEITE</h3>
              <p className="mb-4">
                7.1. Ao clicar em "Aceitar Contrato", o CONTRATANTE confirma a leitura e concordância integral deste instrumento.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="bg-white/5 p-8 border border-white/5">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 block">Configuração de Perfil</Label>
                <div className="flex flex-wrap gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${formData.client_type === "cpf" ? "border-brand-lime bg-brand-lime" : "border-white/20 group-hover:border-brand-lime/50"}`}>
                      {formData.client_type === "cpf" && <div className="w-2 h-2 bg-black" />}
                    </div>
                    <input type="radio" name="client_type" value="cpf" checked={formData.client_type === "cpf"} onChange={handleInputChange} className="hidden" />
                    <span className={`text-sm font-bold uppercase tracking-widest ${formData.client_type === "cpf" ? "text-white" : "text-white/40"}`}>Pessoa Física</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${formData.client_type === "cnpj" ? "border-brand-lime bg-brand-lime" : "border-white/20 group-hover:border-brand-lime/50"}`}>
                      {formData.client_type === "cnpj" && <div className="w-2 h-2 bg-black" />}
                    </div>
                    <input type="radio" name="client_type" value="cnpj" checked={formData.client_type === "cnpj"} onChange={handleInputChange} className="hidden" />
                    <span className={`text-sm font-bold uppercase tracking-widest ${formData.client_type === "cnpj" ? "text-white" : "text-white/40"}`}>Pessoa Jurídica</span>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="client_name" className="text-[10px] font-black uppercase tracking-widest text-white/40">{formData.client_type === "cpf" ? "Nome Completo" : "Razão Social"} *</Label>
                  <Input id="client_name" name="client_name" value={formData.client_name} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-14 text-white focus:border-brand-lime/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="client_identifier" className="text-[10px] font-black uppercase tracking-widest text-white/40">{formData.client_type === "cpf" ? "CPF" : "CNPJ"} *</Label>
                  <Input id="client_identifier" name={formData.client_type === "cpf" ? "client_cpf" : "client_cnpj"} value={formData.client_type === "cpf" ? formData.client_cpf : formData.client_cnpj} onChange={handleInputChange} required placeholder={formData.client_type === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"} className="bg-black/40 border-white/10 rounded-none h-14 text-white focus:border-brand-lime/50 transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="client_whatsapp" className="text-[10px] font-black uppercase tracking-widest text-white/40">WhatsApp (com DDI) *</Label>
                  <Input id="client_whatsapp" name="client_whatsapp" type="tel" value={formData.client_whatsapp} onChange={handleInputChange} required placeholder="5521999999999" className="bg-black/40 border-white/10 rounded-none h-14 text-white focus:border-brand-lime/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="client_email" className="text-[10px] font-black uppercase tracking-widest text-white/40">E-mail de Cadastro *</Label>
                  <Input id="client_email" name="client_email" type="email" value={formData.client_email} readOnly className="bg-white/5 border-white/5 rounded-none h-14 text-white/40 cursor-not-allowed italic" />
                </div>
              </div>

              <div className="bg-white/5 p-8 border border-white/5 space-y-8">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block">Endereço e Localização</Label>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="client_cep" className="text-[10px] font-bold text-white/40">CEP</Label>
                    <div className="relative">
                      <Input id="client_cep" name="client_cep" value={formData.client_cep} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-12 pr-10" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isLoadingCep ? <Loader2 className="w-4 h-4 animate-spin text-brand-lime" /> : <MapPin className="w-4 h-4 text-white/20" />}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label htmlFor="client_street" className="text-[10px] font-bold text-white/40">Logradouro</Label>
                    <Input id="client_street" name="client_street" value={formData.client_street} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="client_number" className="text-[10px] font-bold text-white/40">Número</Label>
                    <Input id="client_number" name="client_number" value={formData.client_number} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-12" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label htmlFor="client_neighborhood" className="text-[10px] font-bold text-white/40">Bairro</Label>
                    <Input id="client_neighborhood" name="client_neighborhood" value={formData.client_neighborhood} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-12" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="client_state" className="text-[10px] font-bold text-white/40">Estado</Label>
                    <Input id="client_state" name="client_state" value={formData.client_state} onChange={handleInputChange} required placeholder="UF" maxLength={2} className="bg-black/40 border-white/10 rounded-none h-12 text-center" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="client_city" className="text-[10px] font-bold text-white/40">Cidade</Label>
                  <Input id="client_city" name="client_city" value={formData.client_city} onChange={handleInputChange} required className="bg-black/40 border-white/10 rounded-none h-12" />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 block">Tipo de Serviço</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      onClick={() => {
                        setServiceType("default");
                        setFormData(prev => ({ ...prev, selected_plan: "bronze" }));
                      }}
                      className={`relative cursor-pointer p-6 border-2 transition-all ${
                        serviceType === "default"
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-sm font-['Outfit'] font-bold mb-1 ${serviceType === "default" ? "text-brand-lime" : "text-white"}`}>
                        Consultoria Host
                      </h3>
                      <p className="text-white/40 text-xs">Planos padrão de marketing e presença digital.</p>
                    </div>
                    <div
                      onClick={() => {
                        setServiceType("nortecnet");
                        setFormData(prev => ({ ...prev, selected_plan: "simple" }));
                      }}
                      className={`relative cursor-pointer p-6 border-2 transition-all ${
                        serviceType === "nortecnet"
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-sm font-['Outfit'] font-bold mb-1 ${serviceType === "nortecnet" ? "text-brand-lime" : "text-white"}`}>
                        Redirecionamento de E-mail
                      </h3>
                      <p className="text-white/40 text-xs">Encaminhamento de antigo endereço NORTECNET.COM.BR para Gmail.</p>
                    </div>
                    <div
                      onClick={() => {
                        setServiceType("scale");
                        setFormData(prev => ({ ...prev, selected_plan: "entry" }));
                      }}
                      className={`relative cursor-pointer p-6 border-2 transition-all ${
                        serviceType === "scale"
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-sm font-['Outfit'] font-bold mb-1 ${serviceType === "scale" ? "text-brand-lime" : "text-white"}`}>
                        Assessoria em Marketing
                      </h3>
                      <p className="text-white/40 text-xs">Níveis de Escala e Performance.</p>
                    </div>
                  </div>

                </div>

                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 block">Seleção do Plano Estratégico</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(planValues)
                      .filter(plan => {
                        if (serviceType === "nortecnet") return ["simple", "bronze"].includes(plan);
                        if (serviceType === "scale") return ["entry", "starter", "growth", "scale"].includes(plan);
                        return ["simple", "bronze", "prata", "ouro"].includes(plan);
                      })
                      .map((plan) => (
                    <div
                      key={plan}
                      onClick={() => setFormData({ ...formData, selected_plan: plan })}
                      className={`relative cursor-pointer p-4 rounded-none border-2 transition-all group ${
                        formData.selected_plan === plan
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-xs font-['Outfit'] font-bold capitalize mb-1 ${formData.selected_plan === plan ? "text-brand-lime" : "text-white"}`}>
                        {plan}
                      </h3>
                      <p className="text-sm font-black text-white/80">R$ {planValues[plan].toFixed(2).replace('.', ',')}</p>
                      {serviceType === "nortecnet" && plan === "simple" && (
                        <p className="text-[10px] text-brand-lime font-bold mt-1">Fidelidade 12 meses</p>
                      )}
                      {serviceType === "nortecnet" && plan === "bronze" && (
                        <p className="text-[10px] text-brand-lime font-bold mt-1">Fidelidade 6 meses</p>
                      )}
                    </div>
                  ))}
                </div>
                </div>

                {serviceType === "nortecnet" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4 border border-brand-lime/20 bg-brand-lime/5">
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 block">E-mail @nortecnet.com.br a recuperar</Label>
                      <Input id="nortecnet_email" name="nortecnet_email" value={formData.nortecnet_email} onChange={handleInputChange} placeholder="exemplo@nortecnet.com.br" required={serviceType === "nortecnet"} className="bg-black/40 border-white/10 rounded-none h-12" />
                    </div>
                    <div>
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 block">Gmail de Destino</Label>
                      <Input id="target_email" name="target_email" value={formData.target_email} onChange={handleInputChange} placeholder="seu.email@gmail.com" required={serviceType === "nortecnet"} className="bg-black/40 border-white/10 rounded-none h-12" />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 block">Forma de Pagamento</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setFormData({ ...formData, payment_method: "stripe" })}
                      className={`relative cursor-pointer p-4 rounded-none border-2 transition-all ${
                        formData.payment_method === "stripe"
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-xs font-['Outfit'] font-bold capitalize mb-1 ${formData.payment_method === "stripe" ? "text-brand-lime" : "text-white"}`}>
                        Cartão de Crédito
                      </h3>
                      <p className="text-white/40 text-xs">Pague via Stripe com segurança.</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, payment_method: "pix" })}
                      className={`relative cursor-pointer p-4 rounded-none border-2 transition-all ${
                        formData.payment_method === "pix"
                          ? "border-brand-lime bg-brand-lime/5"
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <h3 className={`text-xs font-['Outfit'] font-bold capitalize mb-1 ${formData.payment_method === "pix" ? "text-brand-lime" : "text-white"}`}>
                        PIX
                      </h3>
                      <p className="text-white/40 text-xs">Pague via QR Code e envie o comprovante.</p>
                    </div>
                  </div>

                  {formData.payment_method === "pix" && (
                    <div className="mt-4 p-4 border border-brand-lime/20 bg-brand-lime/5 flex flex-col items-center">
                      <p className="text-white/60 text-sm mb-4 text-center">
                        Escaneie o QR Code abaixo para pagar. Após o pagamento, **envie o comprovante para o nosso WhatsApp**.
                      </p>
                      <img src={pixQrCode} alt="QR Code PIX" className="w-48 h-48 mb-4" />
                      <p className="text-brand-lime text-xs font-bold uppercase tracking-wider">
                        Aguardando envio do comprovante
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 pt-8 border-t border-white/5">
                <div 
                  onClick={() => setAccepted(!accepted)}
                  className={`w-6 h-6 border-2 flex-shrink-0 cursor-pointer transition-all flex items-center justify-center ${accepted ? "border-brand-lime bg-brand-lime" : "border-white/20 hover:border-brand-lime/50"}`}
                >
                  {accepted && <div className="w-2.5 h-2.5 bg-black" />}
                </div>
                <Label 
                  onClick={() => setAccepted(!accepted)} 
                  className="text-sm text-white/50 leading-relaxed cursor-pointer hover:text-white transition-colors"
                >
                  Li e aceito todos os termos e condições deste contrato de elite, conforme as cláusulas de fidelidade e performance estabelecidas.
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!accepted || isSubmitting}
                className="w-full bg-brand-lime text-black py-8 rounded-none font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 shadow-[0_0_30px_rgba(212,255,51,0.1)] group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Assinar e Ativar Projeto <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}