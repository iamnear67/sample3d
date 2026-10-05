"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  ShieldAlert,
  FileText,
  Binary,
  ArrowRight,
  AlertTriangle,
  Radio,
  UserCheck,
  Lock,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { useGameState } from "../../context/GameStateContext";
import { StageGuard } from "../../components/StageGuard";

export default function RebelTerminalPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  // Spoof Packet Red Herring State
  const [spoofState, setSpoofState] = useState<"idle" | "countdown" | "blocked">("idle");
  const [countdown, setCountdown] = useState<number>(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Infiltrate Gateway Transition
  const [infiltrating, setInfiltrating] = useState<boolean>(false);

  useEffect(() => {
    if (spoofState === "countdown") {
      if (countdown > 0) {
        timerRef.current = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setSpoofState("blocked");
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [spoofState, countdown]);

  const handleStartSpoof = () => {
    if (spoofState === "countdown") return;
    setCountdown(3);
    setSpoofState("countdown");
  };

  const handleResetSpoof = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSpoofState("idle");
    setCountdown(3);
  };

  const handleInfiltrateGateway = () => {
    if (infiltrating) return;
    setInfiltrating(true);
    unlockNextStage(3);
    setTimeout(() => {
      router.push("/orbital");
    }, 350);
  };

  return (
    <StageGuard stageNumber={2}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-10 relative overflow-hidden flex flex-col justify-between selection:bg-emerald-900 selection:text-emerald-100">
        {/* Ambient operative backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 sm:space-y-8">
          {/* Header Bar */}
          <header className="border-b border-emerald-950/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded border border-emerald-800 bg-emerald-950/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-emerald-500 font-semibold">
                    CLANDESTINE INTERCEPT FEED
                  </span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-emerald-400">
                  REBEL TAP // NODE 0x7E2
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-400">
                SESSION: <span className="text-emerald-400">OPERATIVE_ANON</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300">
                CLEARANCE: STAGE 02
              </span>
            </div>
          </header>

          {/* Red Herring Blocked Banner */}
          {spoofState === "blocked" && (
            <div className="bg-rose-950/50 border border-rose-800 text-rose-300 rounded-lg p-4 sm:p-5 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm tracking-wide text-rose-200">
                    PACKET BLOCKED BY SUBNET DEFENSE. MANUAL RECON REQUIRED.
                  </div>
                  <p className="text-xs text-rose-400/90 mt-1">
                    Automated payload injection rejected by firewall ruleset. Autonomous spoofing will trigger security traps. Proceed with manual intelligence gathering.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetSpoof}
                className="text-xs text-rose-300 hover:text-white px-2 py-1 rounded bg-rose-900/50 hover:bg-rose-900 border border-rose-700 transition-colors shrink-0"
              >
                DISMISS
              </button>
            </div>
          )}

          {/* Intelligence Briefing Dossier */}
          <div className="bg-slate-900/60 border border-emerald-900/60 rounded-xl p-5 sm:p-7 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <FileText className="h-4 w-4" /> CLASSIFIED OPERATIVE DOSSIER
              </div>
              <span className="text-[11px] text-slate-500">DECRYPTED STREAM: 98.4% INTEGRITY</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Target Profile Column */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase">
                  <UserCheck className="h-4 w-4 text-emerald-400" /> TARGET PROFILE
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-100">
                  Dr. Alistair Vance
                </div>
                <div className="text-xs text-slate-400">
                  ROLE: Lead Systems Architect &amp; Containment Director
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1">
                  <div>EMPLOYER: ORBITAL DEFENSE CORP</div>
                  <div>SECURITY STATUS: ROGUE / LEVEL 5 OVERRIDE</div>
                </div>
              </div>

              {/* Intercept Content */}
              <div className="lg:col-span-2 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Operative, our passive packet tap confirmed our worst suspicions: <span className="text-emerald-300 font-semibold">Dr. Alistair Vance has intentionally bypassed the primary reactor containment locks</span> inside the Orbital Corporation core grid.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The automated fail-safes are locked behind his personal administrative clearance. He left his workstation secured, but his clearance keys and authentication identifiers are stored in internal directories.
                </p>
                <div className="p-3.5 rounded bg-emerald-950/30 border border-emerald-800/60 text-xs text-emerald-300 flex items-start gap-2.5">
                  <Radio className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    TACTICAL INTEL: Infiltrate the public-facing <span className="font-bold underline">ORBITAL CORP PORTAL</span>. Search through public company press releases, employee rosters, and badge directories to extract Vance&apos;s credentials.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Hub Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Primary Action: Infiltrate Gateway */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-700/70 transition-all rounded-xl p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Binary className="h-4 w-4" /> VECTOR 01 // FRONT-DOOR RECON
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Infiltrate Orbital Public Gateway
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Route through the unauthenticated corporate landing portal. Harvest employee directory metadata and inspect personnel badge logs for Dr. Vance.
                </p>
              </div>

              <button
                type="button"
                onClick={handleInfiltrateGateway}
                disabled={infiltrating}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 hover:text-emerald-100 border border-emerald-800 hover:border-emerald-600 font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all text-xs sm:text-sm shadow-lg shadow-emerald-950/30 group"
              >
                <span>{infiltrating ? "ENGAGING ROUTE TO /ORBITAL..." : "INFILTRATE PUBLIC GATEWAY"}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
              </button>
            </div>

            {/* Red Herring Action: Spoof Defense Packet */}
            <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all rounded-xl p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Cpu className="h-4 w-4 text-cyan-400" /> VECTOR 02 // DIRECT INJECTION
                </div>
                <h3 className="text-base font-bold text-slate-100">
                  Brute-Force Subnet Defense
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Attempt to broadcast an unsanctioned ICMP spoof packet across the event LAN to bypass administrative barriers directly.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartSpoof}
                disabled={spoofState === "countdown"}
                className={`w-full inline-flex items-center justify-center gap-2.5 border font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all text-xs sm:text-sm ${
                  spoofState === "countdown"
                    ? "bg-slate-900 border-amber-700/80 text-amber-300 cursor-wait"
                    : "bg-slate-950/70 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100"
                }`}
              >
                {spoofState === "countdown" ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-amber-400" />
                    <span>BROADCASTING SPOOF IN [{countdown}s]...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-slate-400" />
                    <span>SPOOF DEFENSE PACKET</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Clandestine Footer */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-900 mt-8">
          <div>REBEL OPERATIVE CELL // SEC-TAP-V2</div>
          <div>OBJECTIVE: LOCATE VANCE CREDENTIALS &bull; STAGE [2/9]</div>
        </footer>
      </main>
    </StageGuard>
  );
}
