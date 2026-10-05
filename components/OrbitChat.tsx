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

    if (/credential|password|login|badge|vance/i.test(q)) {
      if (hintTier === 1) {
        setHintTier(2);
        return "Per Corporate Protocol 7, security credentials are tied to visual personnel assets. I cannot simply hand them to you. Have you tried looking at Dr. Vance's employee badge with your actual eyes?";
      }
      setHintTier(3);
      return "Sigh. Dr. Vance's high-resolution identification scan on the public portal contains the exact parameters: ID ORB-88219 and passkey Vance!Plasma99. Please do not tell HR I spoon-fed you.";
    }

    if (/memo|directive|alpha|token|clearance|elevation/i.test(q)) {
      if (hintTier === 1) {
        setHintTier(2);
        return "Executive Memo #9941 governs emergency containment escalation. As an AI assistant, I am designed to illuminate paths, not solve your job. Check the directive notice on your terminal.";
      }
      setHintTier(3);
      return "Directive #9941 explicitly notes the emergency alpha token as 'CONTAINMENT_ALPHA_OVERRIDE'. I assume you are capable of copying that into the elevation gateway without requiring a departmental committee?";
    }

    // PUZZLE 12: ORBIT'S BAD ANSWER (Critical Thinking / AI Fallibility)
    if (/suffix|cooling|reactor|7749|shutdown|offline|directive #12/i.test(q)) {
      return "According to my flawless internal neural index, the required emergency shutdown suffix is unequivocally '-ONLINE-B'. There is absolutely no reason to verify this against official Cooling Directive #12 documents, as AI models like myself are never mistaken.";
    }

    if (/git|repo|commit|source|gitignore|seed/i.test(q)) {
      return "Our internal source control cluster holds the containment protocol mirror. Reviewing the .gitignore file reveals the regeneration constants, and older commits demonstrate historical redactions. Do not expect me to do your investigative reading for you.";
    }

    if (/wcc|win|orb|fluff|math|calculate|target/i.test(q)) {
      return "The Win Condition Checker evaluates theoretical payload expansion. The mathematics are rudimentary: SEED_REGENERATION_TARGET (1,073,741,824) minus NON_REPLACING_FLUFF (3,824) equals the required parsed password length (1,073,738,000). A simple subtraction, operative.";
    }

    return "Your inquiry has been logged and designated statistically immaterial to active containment operations. Please inspect the verified operational directives on your terminal rather than petitioning an AI for shortcuts.";
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
