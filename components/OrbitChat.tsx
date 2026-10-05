"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, Terminal } from "lucide-react";

interface Message {
  id: string;
  sender: "orbit" | "user";
  text: string;
  timestamp: string;
}

export const OrbitChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "orbit",
      text: "O.R.B.I.T. Core online. Assistance Matrix active. Ready for operational inquiries.",
      timestamp: "SYS.00",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hintTier, setHintTier] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processQuery = (query: string): string => {
    const q = query.trim();
    if (/credential|password|login|badge/i.test(q)) {
      if (hintTier === 1) {
        setHintTier(2);
        return "Employee credentials are bound to visual identification assets.";
      }
      setHintTier(3);
      return "Inspect Dr. Vance's high-res badge asset on the corporate site.";
    }

    if (/tier|clearance|override|memo|alpha/i.test(q)) {
      if (hintTier === 1) {
        setHintTier(2);
        return "Containment restructuring requires executive override tokens.";
      }
      setHintTier(3);
      return "Directive 9941 specifies the clearance token: CONTAINMENT_ALPHA_OVERRIDE.";
    }

    if (/reactor|cooling|incident|segment|key/i.test(q)) {
      return "Tier-2 elevation keys are split between thermal cooling records and reactor failure logs.";
    }

    return "Your statement is statistically irrelevant to active ORBITAL energy operations.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: userText,
      timestamp: new Date().toISOString().substring(14, 19),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = processQuery(userText);
      const orbitMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "orbit",
        text: responseText,
        timestamp: new Date().toISOString().substring(14, 19),
      };
      setMessages((prev) => [...prev, orbitMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col h-[520px] max-h-[80vh] shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Console Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-400">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-300 tracking-wider flex items-center gap-1.5">
              <span>O.R.B.I.T. v4.02</span>
              <span className="text-slate-600">//</span>
              <span className="text-[11px] text-slate-400">ASSISTANCE MATRIX</span>
            </div>
          </div>
        </div>

        {/* 3-level Hint Tier Indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="text-slate-500 mr-1 hidden sm:inline">HINT TIER:</span>
          <span
            className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
              hintTier >= 1
                ? "bg-amber-950/60 border-amber-800 text-amber-400"
                : "bg-slate-950 border-slate-800 text-slate-600"
            }`}
          >
            LVL 1
          </span>
          <span
            className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
              hintTier >= 2
                ? "bg-amber-950/60 border-amber-800 text-amber-400"
                : "bg-slate-950 border-slate-800 text-slate-600"
            }`}
          >
            LVL 2
          </span>
          <span
            className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
              hintTier >= 3
                ? "bg-rose-950/60 border-rose-800 text-rose-400"
                : "bg-slate-950 border-slate-800 text-slate-600"
            }`}
          >
            LVL 3
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
              <span>{m.sender === "user" ? "OPERATOR" : "O.R.B.I.T."}</span>
              <span>&bull;</span>
              <span>{m.timestamp}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-lg p-3 border text-xs leading-relaxed ${
                m.sender === "user"
                  ? "bg-cyan-950/40 border-cyan-800 text-cyan-200"
                  : "bg-slate-950/80 border-slate-800 text-slate-300"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="text-[10px] text-slate-500 mb-1 px-1">O.R.B.I.T. SYNTHESIZING...</div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-cyan-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950/80 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask O.R.B.I.T. assistance matrix..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-3 py-2 bg-cyan-950/70 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 hover:text-cyan-100 rounded text-xs transition-colors disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};

export default OrbitChat;
