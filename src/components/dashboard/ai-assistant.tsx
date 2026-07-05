"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Sparkles, RefreshCw, Lightbulb } from "lucide-react";
import { askAIAssistant } from "@/actions/ai";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What is the GST return filing due date?",
  "How to claim HRA exemption in ITR?",
  "What documents are needed for company registration?",
  "When is TDS to be deposited?",
  "What is the advance tax payment schedule?",
  "How to get DPIIT startup recognition?",
];

const WELCOME_MESSAGE = `Hello! I'm your AI Tax Assistant powered by TaxPro. I can help you with:

• **GST questions** — rates, filing, registration, returns
• **Income Tax** — deductions, exemptions, filing deadlines
• **ROC compliance** — annual filings, forms, penalties
• **TDS/TCS** — rates, due dates, certificates
• **Company registration** — types, documents, process
• **Startup advisory** — DPIIT, seed funding, exemptions

Ask me anything about Indian taxation and compliance!`;

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(question?: string) {
    const q = question ?? input.trim();
    if (!q) return;

    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await askAIAssistant(q);
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    }
    setLoading(false);
  }

  function formatContent(content: string) {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="space-y-6 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#D4AF37]" />
            AI Tax Assistant
          </h1>
          <p className="text-slate-500">Get instant answers to your tax and compliance questions</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMessages([{ role: "assistant", content: WELCOME_MESSAGE }])}
        >
          <RefreshCw className="h-4 w-4" /> New Chat
        </Button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Chat */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-card">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
                {/* Avatar */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                    msg.role === "assistant"
                      ? "bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]"
                      : "bg-[#0F172A]"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={cn(
                    "max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-slate-50 text-slate-800 rounded-tl-sm border border-slate-100"
                      : "bg-[#2563EB] text-white rounded-tr-sm"
                  )}
                  dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                />
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask about GST, Income Tax, ROC compliance..."
                className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                disabled={loading}
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                variant="primary"
                size="icon"
                className="h-11 w-11"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              AI responses are for informational purposes only. Consult your CA for professional advice.
            </p>
          </div>
        </div>

        {/* Quick Questions Sidebar */}
        <div className="w-72 flex-shrink-0 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[#D4AF37]" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-xs text-slate-600 p-3 rounded-xl border border-slate-100 hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50 transition-all"
                >
                  {q}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold text-slate-900">AI Capabilities</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-500">
                {[
                  "GST rates & compliance",
                  "ITR filing guidance",
                  "TDS/TCS rules",
                  "ROC annual filings",
                  "Company registration",
                  "NRI taxation",
                  "Startup exemptions",
                ].map((cap) => (
                  <li key={cap} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    {cap}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
