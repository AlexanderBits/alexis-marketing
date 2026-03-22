import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SEO_Editor({ pagePath, initialData, onSave }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    canonical: initialData?.canonical || pagePath,
  });

  const getPlainText = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleSave = (e) => {
    e.preventDefault();
    const description = getPlainText(formData.description);
    onSave({ ...formData, description });
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">SEO: {pagePath}</CardTitle>
        <CardDescription className="text-slate-400">
          Gerenciamento de visibilidade para motores de busca.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título SEO (Tag Title)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Meta Title"
              className="bg-slate-950 border-slate-800 focus:ring-blue-500 py-6"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Descrição</Label>
            <div className="bg-white text-black rounded-lg overflow-hidden border border-slate-700">
              <ReactQuill 
                theme="snow" 
                value={formData.description} 
                onChange={(c) => setFormData({ ...formData, description: c })}
                className="min-h-[150px]"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Google SEO: Texto puro extraído do editor (~160 chars).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical">URL Canônica</Label>
            <Input
              id="canonical"
              value={formData.canonical}
              onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
              className="bg-slate-950 border-slate-800 focus:ring-blue-500 py-6"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-bold shadow-lg shadow-blue-600/20">
            Commit SEO Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}