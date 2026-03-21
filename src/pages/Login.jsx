import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState({ a: 0, b: 0, result: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    // Gera um desafio simples de soma
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setQuestion({ a, b, result: a + b });
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (parseInt(answer) === question.result) {
      setIsVerified(true);
      setError(false);
      // Redireciona automaticamente após verificação bem sucedida (opcional delay)
      setTimeout(() => {
        base44.auth.redirectToLogin(window.location.href);
      }, 800);
    } else {
      setError(true);
      setAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center overflow-hidden">
      
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-sm w-full bg-slate-900/50 border border-gray-800 p-8 pt-10 backdrop-blur-xl shadow-2xl">
        
        <AnimatePresence mode="wait">
          {!isVerified ? (
            <motion.div
              key="captcha"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-none flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div>
                <h1 className="text-xl font-bold mb-2 uppercase tracking-widest text-white/90">Verificação de Segurança</h1>
                <p className="text-gray-500 text-xs">Prove que você é humano resolvendo o cálculo abaixo para prosseguir.</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="bg-slate-950 border border-gray-800 p-6 text-2xl font-mono tracking-tighter text-blue-400">
                  {question.a} + {question.b} = ?
                </div>
                
                <div className="relative">
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Sua resposta"
                    className={`w-full bg-slate-950 border ${error ? 'border-red-500/50' : 'border-gray-800'} p-4 text-center focus:outline-none focus:border-blue-500 transition-colors rounded-none text-lg font-bold`}
                    required
                    autoFocus
                  />
                  {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-500 font-bold uppercase"
                    >
                      Resposta incorreta. Tente novamente.
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg uppercase tracking-widest border-b-4 border-white/20 active:translate-y-1 active:border-b-0"
                >
                  Verificar e Entrar
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6 animate-pulse" />
              <h2 className="text-xl font-bold mb-2 text-emerald-400 tracking-widest uppercase">Verificado!</h2>
              <p className="text-gray-500 text-xs flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Redirecionando para login seguro...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-8 text-[10px] text-gray-700 uppercase tracking-widest font-bold">
        Alexis Dev • Securesphere Authentication System
      </p>
    </div>
  );
}
