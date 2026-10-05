"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  HardDrive,
  Flame,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";
import { useGameState } from "../../../context/GameStateContext";
import { StageGuard } from "../../../components/StageGuard";
import { OrbitChat } from "../../../components/OrbitChat";

export default function Tier2RouteSelectPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  // Route A: Pen drive progress state (10s = 100 intervals of 100ms)
  const [mountingDrive, setMountingDrive] = useState<boolean>(false);
  const [driveProgress, setDriveProgress] = useState<number>(0);
  const [driveComplete, setDriveComplete] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Route B: Direct bypass state
  const [bypassToken, setBypassToken] = useState<string>("");
  const [bypassStatus, setBypassStatus] = useState<"idle" | "error" | "success">("idle");

  // Route A Progress Timer
  useEffect(() => {
    if (mountingDrive && driveProgress < 100) {
      timerRef.current = setTimeout(() => {
        setDriveProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setDriveComplete(true);
            setMountingDrive(false);
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mountingDrive, driveProgress]);

  const handleStartMount = () => {
    if (mountingDrive || driveComplete) return;
    setDriveProgress(0);
    setMountingDrive(true);
  };

  const handleRouteAProceed = () => {
    unlockNextStage(8);
    router.push("/git");
  };

  const handleRouteBSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bypassToken.trim() === "7749-REACTOR-OFFLINE-X") {
      setBypassStatus("success");
      unlockNextStage(8);
      setTimeout(() => {
        router.push("/git");
      }, 1000);
    } else {
      setBypassStatus("error");
    }
  };

  return (
    <StageGuard stageNumber={7}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-cyan-900 selection:text-cyan-100">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <header className="border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
              <Layers className="h-4 w-4" /> SECURE ESCALATION JUNCTION
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              CLEARANCE: TIER-2 COMMAND ROUTING // DIRECTIVE ECLIPSE
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select Containment Abort Vector to Access Repository Source Control.
            </p>
          </header>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Route Choices (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Route A: Physical Pen Drive Emulation */}
                <div className="bg-slate-900/60 border border-amber-800/80 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-800/80 px-2.5 py-1 rounded">
                      <HardDrive className="h-4 w-4" /> ROUTE A
                    </div>
                    <h2 className="text-base font-bold text-slate-100">
                      Physical Pen Drive Emulation
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Simulates direct USB flash authorization. Enforces physical bus transfer delay.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {mountingDrive && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] text-amber-300 flex justify-between">
                          <span>Reading Bus Sectors: {driveProgress}%</span>
                          <span>@ 14 KB/s</span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-amber-400 transition-all duration-100"
                            style={{ width: `${driveProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {!driveComplete ? (
                      <button
                        type="button"
                        onClick={handleStartMount}
                        disabled={mountingDrive}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 hover:border-amber-600 text-amber-300 hover:text-amber-100 font-bold uppercase tracking-wider rounded text-xs transition-all disabled:opacity-50"
                      >
                        <HardDrive className="h-4 w-4" />
                        <span>{mountingDrive ? "READING BUS..." : "MOUNT FLASH DRIVE"}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRouteAProceed}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 hover:text-emerald-100 font-bold uppercase tracking-wider rounded text-xs transition-all animate-pulse"
                      >
                        <span>PROCEED TO SOURCE REPO</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Route B: Direct Reactor Core Bypass */}
                <div className="bg-slate-900/60 border border-rose-800/80 rounded-xl p-5 backdrop-blur-md flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-800/80 px-2.5 py-1 rounded">
                      <Flame className="h-4 w-4" /> ROUTE B
                    </div>
                    <h2 className="text-base font-bold text-slate-100">
                      Direct Reactor Core Bypass
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Network-level immediate override. Requires verification of the Tier-2 access code.
                    </p>
                  </div>

                  <form onSubmit={handleRouteBSubmit} className="space-y-3 pt-2">
                    {bypassStatus === "error" && (
                      <div className="text-[11px] text-rose-400 bg-rose-950/60 border border-rose-800 p-2 rounded flex items-center gap-1.5">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                        <span>OVERRIDE SEQUENCE INVALID.</span>
                      </div>
                    )}

                    {bypassStatus === "success" && (
                      <div className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 p-2 rounded flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>OVERRIDE VALIDATED. ROUTING...</span>
                      </div>
                    )}

                    <input
                      type="text"
                      value={bypassToken}
                      onChange={(e) => setBypassToken(e.target.value)}
                      placeholder=""
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-rose-500 uppercase tracking-wider"
                    />

                    <button
                      type="submit"
                      disabled={bypassStatus === "success"}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 hover:border-rose-600 text-rose-300 hover:text-rose-100 font-bold uppercase tracking-wider rounded text-xs transition-all disabled:opacity-50"
                    >
                      <Zap className="h-4 w-4" />
                      <span>EXECUTE DIRECT OVERRIDE</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* In-Universe Briefing Note */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">PROTOCOL DISPATCH:</div>
                <p>
                  Either route grants read-only administrative mirror rights to the Orbital Corporation private Git source control cluster.
                </p>
              </div>
            </div>

            {/* Right Column: O.R.B.I.T. Chat Console (5 Cols) */}
            <div className="lg:col-span-5 sticky top-6">
              <OrbitChat />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto w-full pt-8 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900 mt-8">
          <span>ORBITAL ROUTE MATRIX // ECLIPSE CORE</span>
          <span>STAGE [7/9] &bull; TIER-2 ROUTE SPLIT</span>
        </footer>
      </main>
    </StageGuard>
  );
}
