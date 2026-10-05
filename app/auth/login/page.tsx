"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useGameState } from "../../../context/GameStateContext";
import { StageGuard } from "../../../components/StageGuard";

export default function LoginPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  const [employeeId, setEmployeeId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim() === "ORB-88219" && passphrase === "Vance!Plasma99") {
      setStatus("success");
      unlockNextStage(5);
      setTimeout(() => router.push("/dashboard/t4"), 1200);
    } else {
      setStatus("error");
    }
  };

  return (
    <StageGuard stageNumber={3}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-lg p-6 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-1 border-b border-slate-800 pb-4">
            <div className="inline-flex p-2.5 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 mb-2">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold tracking-wider text-slate-100">ORBITAL CO. // AUTH GATEWAY</h1>
            <p className="text-xs text-slate-400">Tier-4 Intranet Clearance Check</p>
          </div>

          {status === "error" && (
            <div className="bg-rose-950/40 border border-rose-800 text-rose-400 p-3 rounded text-xs flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>ACCESS DENIED // INVALID PERSONNEL CREDENTIALS. EVENT LOGGED.</span>
            </div>
          )}

          {status === "success" && (
            <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>CREDENTIALS VERIFIED. REDIRECTING TO TIER-4 INTRANET...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 block">EMPLOYEE ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="ORB-XXXXX"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 block">ACCESS PASSPHRASE</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "success"}
              className="w-full py-2.5 px-4 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-600 rounded text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              AUTHENTICATE PERSONNEL
            </button>
          </form>

          <div className="text-[10px] text-center text-slate-500 border-t border-slate-800/80 pt-3">
            SECURED GATEWAY &bull; UNAUTHORIZED ACCESS SUBJECT TO CORPORATE PROTOCOL 9
          </div>
        </div>
      </main>
    </StageGuard>
  );
}
