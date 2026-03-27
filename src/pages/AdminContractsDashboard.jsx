import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Calendar, DollarSign, User, Mail, MapPin, Lock, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminContractsDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => base44.entities.Contract.list('-created_date'),
    enabled: isAuthenticated
  });

  const deleteContractMutation = useMutation({
    mutationFn: (contractId) => base44.entities.Contract.delete(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Contrato Excluído",
        description: "O contrato foi removido com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao Excluir",
        description: error.message || "Não foi possível excluir o contrato.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteContract = (contractId) => {
    if (window.confirm("Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.")) {
      deleteContractMutation.mutate(contractId);
    }
  };

  const planNames = {
    simple: "Essencial",
    bronze: "Bronze",
    prata: "Prata",
    ouro: "Ouro"
  };

  const planColors = {
    simple: "bg-amber-100 text-amber-800",
    bronze: "bg-orange-100 text-orange-800",
    prata: "bg-gray-100 text-gray-800",
    ouro: "bg-yellow-100 text-yellow-800"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "siterio2019") {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
      setPassword("");
    }
  };

  const filteredContracts = contracts.filter(contract => 
    contract.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.client_cpf?.includes(searchTerm) ||
    contract.client_cnpj?.includes(searchTerm)
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-slate-900 border-slate-800">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <CardTitle className="text-white text-center text-2xl">Dashboard de Contratos</CardTitle>
            <p className="text-gray-400 text-center text-sm">Digite a senha para acessar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
                autoFocus
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Acessar Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Dashboard de Contratos
            </h1>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-3xl font-bold text-white">{contracts.length}</p>
                  </div>
                  <FileText className="w-10 h-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Essencial</p>
                    <p className="text-3xl font-bold text-white">
                      {contracts.filter(c => c.selected_plan === 'simple').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-800 font-bold">E</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Bronze</p>
                    <p className="text-3xl font-bold text-white">
                      {contracts.filter(c => c.selected_plan === 'bronze').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-800 font-bold">B</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Prata</p>
                    <p className="text-3xl font-bold text-white">
                      {contracts.filter(c => c.selected_plan === 'prata').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-800 font-bold">P</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Ouro</p>
                    <p className="text-3xl font-bold text-white">
                      {contracts.filter(c => c.selected_plan === 'ouro').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-800 font-bold">O</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Input
            placeholder="Buscar por nome, e-mail, CPF ou CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border-slate-800 text-white"
          />
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filteredContracts.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Nenhum contrato encontrado.</p>
              </CardContent>
            </Card>
          ) : (
            filteredContracts.map((contract) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-3">
                          <User className="w-5 h-5 text-blue-500" />
                          {contract.client_name}
                        </CardTitle>
                        <p className="text-sm text-gray-400 mt-1">
                          {contract.client_type === "cnpj" ? "CNPJ" : "CPF"}: {contract.client_type === "cnpj" ? contract.client_cnpj : contract.client_cpf}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={planColors[contract.selected_plan]}>
                          {planNames[contract.selected_plan]}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteContract(contract.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{contract.client_email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {contract.client_street}, {contract.client_number} - {contract.client_neighborhood}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {contract.client_city}/{contract.client_state} - CEP: {contract.client_cep}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-semibold">
                            R$ {contract.plan_value?.toFixed(2)}/mês
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            Aceito em: {new Date(contract.created_date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}