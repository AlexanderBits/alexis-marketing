import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

/**
 * Componente para gerenciar metadados de uma página no Painel Admin.
 * @param {string} pagePath - O caminho da página (ex: '/gestao-de-redes-sociais')
 * @param {object} initialData - Dados atuais de SEO
 * @param {function} onSave - Callback para salvar os dados no Base44
 */
export function SEO_Editor({ pagePath, initialData, onSave }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    canonical: initialData?.canonical || pagePath,
  });

  // Função para limpar HTML do Quill e manter texto puro para a meta-tag
  const cleanHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanDescription = cleanHtml(formData.description);
    onSave({ ...formData, description: cleanDescription });
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Otimização SEO: {pagePath}</CardTitle>
        <CardDescription className="text-slate-400">
          Gerencie como esta página aparece no Google e nas redes sociais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título SEO (Tag Title)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Gestão de Redes Sociais em Juiz de Fora"
              className="bg-slate-950 border-slate-800 focus:ring-blue-500 py-6"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Descrição (Editor Rico)</Label>
            <div className="bg-white text-black rounded-lg overflow-hidden border border-slate-700">
              <ReactQuill 
                theme="snow" 
                value={formData.description} 
                onChange={(content) => setFormData({ ...formData, description: content })}
                className="min-h-[150px]"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Dica: O Google exibirá apenas o texto puro (aproximadamente 160 caracteres).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical">URL Canônica</Label>
            <Input
              id="canonical"
              value={formData.canonical}
              onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
              placeholder="Ex: /gestao-de-redes-sociais"
              className="bg-slate-950 border-slate-800 focus:ring-blue-500 py-6"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-bold shadow-lg shadow-blue-600/20">
            Salvar Alterações de SEO
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
