import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { FileText, CheckCircle2, Loader2, ChevronRight, MapPin } from "lucide-react";
export default function ContractPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [formData, setFormData] = useState({
    client_type: "cpf",
    client_name: "",
    client_cpf: "",
    client_cnpj: "",
    client_email: "",
    client_cep: "",
    client_street: "",
    client_number: "",
    client_neighborhood: "",
    client_city: "",
    client_state: "",
    selected_plan: "bronze"
  });
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Remoção do auto-redirect: o fluxo agora vai para o Stripe checkout

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        if (!user) {
          base44.auth.redirectToLogin('/contrato');
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
        base44.auth.redirectToLogin('/contrato');
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
    ouro: 199.99
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
      const contractResponse = await base44.functions.invoke('submitContract', {
        ...formData,
        plan_value: planValues[formData.selected_plan]
      });

        if (contractResponse.data.success) {
          // Redirecionar para o checkout do Stripe
          const checkoutResponse = await base44.functions.invoke('createCheckoutSession', {
            selected_plan: formData.selected_plan,
            customer_email: formData.client_email,
            contract_id: contractResponse.data.contract_id || '',
          });

          if (checkoutResponse.data.url) {
            window.location.href = checkoutResponse.data.url;
          } else {
            // Fallback: mostrar tela de sucesso sem checkout
            setSubmitted(true);
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Contrato Aceito!</h1>
          <p className="text-gray-400 mb-8">
            Seu contrato foi registrado com sucesso. Para iniciarmos sua estratégia, precisamos que você preencha o **Briefing de Campanha**.
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => window.location.href = "/briefing"} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-bold group"
            >
              Ir para o Briefing
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-slate-500 text-xs mt-4">
              Você será redirecionado automaticamente em alguns segundos...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Contrato de Prestação de Serviços
            </h1>
          </div>

          {/* Contract Text */}
          <div className="bg-slate-800 rounded-xl p-6 mb-8 max-h-96 overflow-y-auto text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-4">
              CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TÉCNICA E TREINAMENTO EM INFORMÁTICA
            </h2>
            
            <p className="mb-4">Pelo presente instrumento particular de contrato de prestação de serviços, de um lado:</p>
            
            <p className="mb-4">
              <strong className="text-white">CONTRATADO:</strong> ISRAEL DE OLIVEIRA PINHEIRO, pessoa física, inscrito no CNPJ sob o nº 65.739.462/0001-70, 
              com sede na RUA A4, nº 400, Bairro PARADA IDEAL, no Município de GUAPIMIRIM, Estado do Rio de Janeiro, CEP 25942-716.
            </p>

            <p className="mb-4">E, de outro lado:</p>
            
            <p className="mb-4">
              <strong className="text-white">CONTRATANTE:</strong> Os dados serão preenchidos abaixo.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA PRIMEIRA – DO OBJETO DO CONTRATO</h3>
            <p className="mb-4">
              1.1. O presente contrato tem como objeto a prestação de serviços de consultoria técnica e treinamento em informática, 
              focados na gestão e otimização de conteúdo digital em ambiente web, a serem realizados pelo CONTRATADO em favor do CONTRATANTE.
            </p>
            <p className="mb-4">
              1.2. Os serviços incluem, mas não se limitam a: otimização de sites, estratégias de conteúdo, análise de performance, 
              treinamento em ferramentas de gerenciamento de conteúdo.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA SEGUNDA – DO PLANO E VALOR MENSAL</h3>
            <p className="mb-4">2.1. O CONTRATANTE opta por um dos seguintes planos de serviços, com o valor mensal correspondente:</p>
            <ul className="list-disc ml-8 mb-4">
              <li><strong>Plano Essencial (Landing Page Simplificada):</strong> R$ 29,90 (Vinte e nove reais e noventa centavos). <em>Este plano possui escopo extremamente restrito e não se aplica a 98% dos modelos de negócio tradicionais.</em></li>
              <li><strong>Plano Bronze:</strong> R$ 49,90 (Quarenta e nove reais e noventa centavos)</li>
              <li><strong>Plano Prata:</strong> R$ 99,90 (Noventa e nove reais e noventa centavos)</li>
              <li><strong>Plano Ouro:</strong> R$ 199,99 (Cento e noventa e nove reais e noventa e nove centavos)</li>
            </ul>
            <p className="mb-4">
              2.2. O CONTRATANTE declara ter ciência e aceita o plano e o valor mensal selecionado, que será pago recorrentemente.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA TERCEIRA – DA FIDELIDADE</h3>
            <p className="mb-4">
              3.1. As partes acordam um período de fidelidade de 1 (um) ano, a contar da data de aceite deste contrato, conforme o que for acertado na proposta comercial enviada por e-mail.
            </p>
            <p className="mb-4">
              3.2. Caso a proposta comercial tenha sido apresentada com os termos "sem complicações" ou "sem fidelidade contratual", a fidelidade fica dispensada, podendo a rescisão ocorrer a qualquer momento sem o pagamento de multa rescisória.
            </p>
            <p className="mb-4">
              3.3. Em caso de rescisão antecipada por parte do CONTRATANTE antes do término do período de fidelidade (quando aplicável conforme a proposta), 
              será aplicada multa equivalente a 30% (trinta por cento) do valor remanescente das mensalidades até o fim do período.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA QUARTA – DA DISPONIBILIZAÇÃO DE PLATAFORMA DIGITAL (BÔNUS)</h3>
            <p className="mb-4">
              4.1. Como benefício pela adesão ao período de fidelidade, o CONTRATADO disponibilizará ao CONTRATANTE, em regime de comodato de uso, 
              uma interface digital (site institucional padrão), configurada para fins de divulgação dos serviços objeto deste contrato.
            </p>
            <p className="mb-4">
              4.2. A gratuidade da configuração e hospedagem desta interface está estritamente vinculada à manutenção do contrato pelo prazo de 12 (doze) meses.
            </p>
            <p className="mb-4">
              4.3. Em caso de rescisão antecipada por iniciativa do CONTRATANTE, este deverá indenizar o CONTRATADO pelo serviço de implementação técnica 
              no valor de R$ 1.500,00 (mil e quinhentos reais), sem prejuízo da multa rescisória prevista na Cláusula Terceira.
            </p>
            <p className="mb-4">
              4.4. O CONTRATANTE declara estar ciente de que a referida interface é de propriedade intelectual do CONTRATADO, sendo interrompido o acesso 
              e a exibição desta em caso de rescisão contratual, salvo se houver negociação à parte para a migração de arquivos e banco de dados.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA QUINTA – DAS OBRIGAÇÕES DO CONTRATADO</h3>
            <p className="mb-4">5.1. Prestar os serviços objeto deste contrato com diligência e de acordo com as boas práticas de mercado.</p>
            <p className="mb-4">
              5.2. Manter sigilo sobre todas as informações confidenciais do CONTRATANTE de que venha a ter conhecimento 
              em razão da prestação dos serviços.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA SEXTA – DAS OBRIGAÇÕES DO CONTRATANTE</h3>
            <p className="mb-4">6.1. Fornecer todas as informações, acessos e materiais necessários para a adequada prestação dos serviços.</p>
            <p className="mb-4">6.2. Efetuar o pagamento dos valores mensais na forma e prazos acordados.</p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA SÉTIMA – DA CONFIRMAÇÃO E ACEITE</h3>
            <p className="mb-4">
              7.1. Ao clicar no botão "Aceitar Contrato", o CONTRATANTE declara ter lido, compreendido e concordado 
              com todos os termos e condições deste contrato.
            </p>
            <p className="mb-4">
              7.2. O aceite eletrônico, juntamente com o registro dos dados do CONTRATANTE, constituirá prova legal 
              da contratação e aceitação das condições aqui estabelecidas.
            </p>

            <h3 className="text-lg font-bold text-white mt-6 mb-2">CLÁUSULA OITAVA – DO FORO</h3>
            <p className="mb-4">
              8.1. Fica eleito o foro da comarca de Guapimirim/RJ para dirimir quaisquer dúvidas oriundas deste contrato, 
              renunciando as partes a qualquer outro, por mais privilegiado que seja.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-white mb-3 block">Tipo de Cliente *</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="client_type"
                    value="cpf"
                    checked={formData.client_type === "cpf"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-white">Pessoa Física (CPF)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="client_type"
                    value="cnpj"
                    checked={formData.client_type === "cnpj"}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-white">Pessoa Jurídica (CNPJ)</span>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="client_name" className="text-white">
                  {formData.client_type === "cpf" ? "Nome Completo" : "Razão Social"} *
                </Label>
                <Input
                  id="client_name"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="client_identifier" className="text-white">
                  {formData.client_type === "cpf" ? "CPF" : "CNPJ"} *
                </Label>
                <Input
                  id="client_identifier"
                  name={formData.client_type === "cpf" ? "client_cpf" : "client_cnpj"}
                  value={formData.client_type === "cpf" ? formData.client_cpf : formData.client_cnpj}
                  onChange={handleInputChange}
                  required
                  placeholder={formData.client_type === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="client_email" className="text-white">E-mail *</Label>
              <Input
                id="client_email"
                name="client_email"
                type="email"
                value={formData.client_email}
                readOnly
                className="bg-slate-800 border-slate-700 text-white opacity-75 cursor-not-allowed"
              />
              <div className="mt-2 p-3 bg-blue-900/30 border border-blue-700 rounded-md">
                <p className="text-blue-300 text-sm flex items-start gap-2">
                  <span>ℹ️</span>
                  <span>Seu e-mail foi preenchido automaticamente com sua conta Google.</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="client_cep" className="text-white">CEP *</Label>
                <div className="relative">
                  <Input
                    id="client_cep"
                    name="client_cep"
                    value={formData.client_cep}
                    onChange={handleInputChange}
                    required
                    placeholder="00000-000"
                    className="bg-slate-800 border-slate-700 text-white pr-9"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isLoadingCep
                      ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      : <MapPin className="w-4 h-4 text-slate-500" />
                    }
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="client_street" className="text-white">Logradouro *</Label>
                <Input
                  id="client_street"
                  name="client_street"
                  value={formData.client_street}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="client_number" className="text-white">Número *</Label>
                <Input
                  id="client_number"
                  name="client_number"
                  value={formData.client_number}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="client_neighborhood" className="text-white">Bairro *</Label>
                <Input
                  id="client_neighborhood"
                  name="client_neighborhood"
                  value={formData.client_neighborhood}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="client_state" className="text-white">Estado *</Label>
                <Input
                  id="client_state"
                  name="client_state"
                  value={formData.client_state}
                  onChange={handleInputChange}
                  required
                  placeholder="RJ"
                  maxLength={2}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="client_city" className="text-white">Cidade *</Label>
              <Input
                id="client_city"
                name="client_city"
                value={formData.client_city}
                onChange={handleInputChange}
                required
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-3 block">Selecione o Plano *</Label>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["simple", "bronze", "prata", "ouro"].map((plan) => (
                  <div
                    key={plan}
                    onClick={() => setFormData({ ...formData, selected_plan: plan })}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      formData.selected_plan === plan
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-slate-600"
                    } ${plan === "simple" ? "border-amber-500/30" : ""}`}
                  >
                    {plan === "simple" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-[10px] font-bold px-2 py-0.5 rounded text-white whitespace-nowrap">
                        NÃO SE APLICA A 98% DOS NEGÓCIOS
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white capitalize mb-2">
                      {plan === "simple" ? "Essencial" : plan}
                    </h3>
                    <p className="text-2xl font-bold text-blue-400">R$ {planValues[plan].toFixed(2)}</p>
                    <p className="text-sm text-gray-400 mt-1">por mês</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox
                id="accept"
                checked={accepted}
                onCheckedChange={setAccepted}
                className="mt-1 border-white data-[state=checked]:bg-white data-[state=checked]:text-slate-900"
              />
              <Label htmlFor="accept" className="text-white cursor-pointer">
                Li e aceito todos os termos e condições deste contrato, conforme as condições de fidelidade acertadas na proposta comercial.
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!accepted || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              {isSubmitting ? "Processando..." : "Aceitar Contrato"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}