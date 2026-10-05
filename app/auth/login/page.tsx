"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2, ArrowLeft } from "lucide-react";
import { useGameState } from "../../../context/GameStateContext";
import { StageGuard } from "../../../components/StageGuard";

export default function LoginPage() {
  const router = useRouter();
  const { unlockNextStage, setCurrentUser } = useGameState();

  const [employeeId, setEmployeeId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [authenticatedName, setAuthenticatedName] = useState<string>("Solomon Higgs");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = employeeId.trim().toLowerCase();
    const pass = passphrase.trim();

    const isSolomon = (id === "@solomonhiggs" || id === "solomonhiggs") && pass === "@fryit123";
    const isVance = id === "orb-88219" && pass === "Vance!Plasma99";

    if (isSolomon || isVance) {
      const name = isSolomon ? "Solomon Higgs" : "Dr. Alistair Vance";
      const cleanId = isSolomon ? "@solomonhiggs" : "ORB-88219";
      setAuthenticatedName(name);
      setCurrentUser({
        id: cleanId,
        name: name,
        clearance: "Tier-4",
      });
      setStatus("success");
      unlockNextStage(5);
      setTimeout(() => router.push("/dashboard/t4"), 1200);
    } else {
      setStatus("error");
    }
  };

  return (
    <StageGuard stageNumber={4}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <Link
              href="/orbital"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Site</span>
            </Link>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              STAGE [4/9]
            </span>
          </div>

          <div className="text-center space-y-1">
            <div className="inline-flex p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-lg font-bold tracking-wider text-slate-100">ORBITAL CO. // AUTH GATEWAY</h1>
            <p className="text-xs text-slate-400">Tier-4 Intranet Clearance Check</p>
          </div>

          {status === "error" && (
            <div className="bg-rose-950/40 border border-rose-800 text-rose-300 p-3 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>ACCESS DENIED // INVALID PERSONNEL CREDENTIALS. CHECK STAR EMPLOYEE BADGE.</span>
            </div>
          )}

          {status === "success" && (
            <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>CREDENTIALS VERIFIED. WELCOME, {authenticatedName.toUpperCase()}. ADVANCING TO TIER-4...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400 block font-semibold">EMPLOYEE ID</label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="@solomonhiggs"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-0 focus:border-cyan-500 placeholder:text-slate-600 font-mono shadow-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 block font-semibold">ACCESS PASSPHRASE</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="@fryit123"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-0 focus:border-cyan-500 placeholder:text-slate-600 pr-10 font-mono shadow-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "success"}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-50"
            >
              AUTHENTICATE PERSONNEL &rarr;
            </button>
          </form>

          <div className="text-[10px] text-center text-slate-500 border-t border-slate-800/80 pt-3">
            SECURED GATEWAY &bull; TIER 4 CREDENTIALS VERIFIED BY ORBITAL DEFENSE ARCHITECTURE
          </div>
        </div>
      </main>
    </StageGuard>
  );
}
