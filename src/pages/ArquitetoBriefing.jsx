import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Footer from "@/components/landing/Footer";

export default function ArquitetoBriefing() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function initConversation() {
    setStarting(true);
    const conv = await base44.agents.createConversation({
      agent_name: "arquiteto_prompts",
      metadata: { name: "Briefing de Site" },
    });
    setConversation(conv);

    const unsubscribe = base44.agents.subscribeToConversation(conv.id, (data) => {
      setMessages(data.messages || []);
    });

    // send initial greeting trigger
    await base44.agents.addMessage(conv, {
      role: "user",
      content: "Olá! Quero criar um site.",
    });

    setStarting(false);
    return () => unsubscribe();
  }

  async function sendMessage() {
    if (!input.trim() || loading || !conversation) return;
    const text = input.trim();
    setInput("");
    setLoading(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const visibleMessages = messages.filter(
    (m) => m.role === "user" || m.role === "assistant"
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4 flex items-center gap-3 bg-[#0A0A0A] sticky top-0 z-10">
        <div className="w-9 h-9 bg-[#D4FF33] flex items-center justify-center">
          <Bot className="w-5 h-5 text-black" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight">
            Arquiteto de Prompts
          </h1>
          <p className="text-white/50 text-xs">
            Crie o briefing do seu site com IA
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {starting && (
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Iniciando conversa...
          </div>
        )}

        {visibleMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-7 h-7 bg-[#D4FF33] flex items-center justify-center shrink-0 mr-2 mt-1">
                  <Bot className="w-4 h-4 text-black" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#D4FF33] text-black font-medium"
                    : "bg-[#141414] text-white border border-white/10"
                }`}
              >
                {isUser ? (
                  msg.content
                ) : (
                  <ReactMarkdown
                    className="prose prose-invert prose-sm max-w-none"
                    components={{
                      p: ({ children }) => <p className="my-1">{children}</p>,
                      ul: ({ children }) => (
                        <ul className="my-1 ml-4 list-disc">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="my-0.5">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-[#D4FF33]">{children}</strong>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 bg-[#D4FF33] flex items-center justify-center shrink-0 mr-2 mt-1">
              <Bot className="w-4 h-4 text-black" />
            </div>
            <div className="bg-[#141414] border border-white/10 px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-white/50" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 bg-[#0A0A0A] px-4 py-4 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Digite sua resposta..."
            disabled={loading || starting}
            className="flex-1 bg-[#141414] border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#D4FF33]"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || starting || !input.trim()}
            className="bg-[#D4FF33] text-black hover:bg-[#D4FF33]/90 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-white/30 text-xs text-center mt-2">
          Pressione Enter para enviar
        </p>
      </div>

      <Footer />
    </div>
  );
}