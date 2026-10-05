"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertOctagon,
  FileWarning,
  ThermometerSnowflake,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  Flame,
} from "lucide-react";
import { useGameState } from "../../../context/GameStateContext";
import { StageGuard } from "../../../components/StageGuard";
import { OrbitChat } from "../../../components/OrbitChat";

export default function Tier3DashboardPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  const [sequenceInput, setSequenceInput] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmitSequence = (e: React.FormEvent) => {
    e.preventDefault();
    if (sequenceInput.trim() === "7749-REACTOR-OFFLINE-X") {
      setSubmissionStatus("success");
      unlockNextStage(7);
      setTimeout(() => {
        router.push("/dashboard/t2");
      }, 1200);
    } else {
      setSubmissionStatus("error");
    }
  };

  return (
    <StageGuard stageNumber={6}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-amber-900 selection:text-amber-100">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Top Status Bar */}
          <header className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              <div className="text-xs sm:text-sm font-bold tracking-wider text-slate-200 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-amber-400" />
                <span>LOGGED IN: DR. A. Vance // CLEARANCE: TIER-3 ELEVATED</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300 font-semibold">
                SYSTEM: T3-ARCHIVE
              </span>
              <span>INCIDENT VAULT // SECTOR 3</span>
            </div>
          </header>

          {/* Grid Layout: Main Incident Logs & Assistant Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Incident Log #409 Card */}
              <div className="bg-slate-900/60 border border-amber-900/60 rounded-xl p-5 sm:p-6 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <AlertOctagon className="h-4 w-4" /> CRITICAL INCIDENT LOG #409
                  </div>
                  <span className="text-[10px] text-slate-500">TIMESTAMP: 04:18:22 UTC</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Thermal drop in Core Alpha B. Automated primary safety dampers disengaged. Emergency cooling containment recorded a partial split-key event.
                  </p>
                  <div className="p-3 bg-slate-950/80 rounded border border-amber-800/80 text-amber-300 font-bold tracking-wide">
                    Logged Key Segment 1: [ 7749-REACTOR ]
                  </div>
                </div>
              </div>

              {/* Cooling Directive #12 Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <ThermometerSnowflake className="h-4 w-4" /> COOLING DIRECTIVE #12
                  </div>
                  <span className="text-[10px] text-slate-500">POLICY SPEC-C9</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    In the event of an uncontrolled core thermal cascade, emergency shutdown requires appending suffix segment to the logged key prefix.
                  </p>
                  <div className="p-3 bg-slate-950/80 rounded border border-cyan-800/80 text-cyan-300 font-bold tracking-wide">
                    Emergency shutdown requires appending suffix segment: [ -OFFLINE-X ]
                  </div>
                </div>
              </div>

              {/* Combined Recovery Form */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <KeyRound className="h-4 w-4 text-amber-400" />
                  <span>SUBMIT COMBINED RECOVERY SEQUENCE</span>
                </div>

                {submissionStatus === "error" && (
                  <div className="bg-rose-950/40 border border-rose-800 text-rose-400 p-3 rounded text-xs flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>KEY MISMATCH // REACTOR SECTORS LOCKED.</span>
                  </div>
                )}

                {submissionStatus === "success" && (
                  <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded text-xs flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>RECOVERY SEQUENCE VALIDATED. ELEVATING TO TIER-2 SECTOR ROUTING...</span>
                  </div>
                )}

                <form onSubmit={handleSubmitSequence} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 block font-semibold">
                      CONCATENATED RECOVERY KEY
                    </label>
                    <input
                      type="text"
                      value={sequenceInput}
                      onChange={(e) => setSequenceInput(e.target.value)}
                      placeholder="e.g. 7749-REACTOR-..."
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 uppercase tracking-wider"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submissionStatus === "success"}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 hover:border-amber-600 text-amber-300 hover:text-amber-100 font-bold uppercase tracking-wider rounded text-xs transition-all disabled:opacity-50"
                  >
                    <span>SUBMIT COMBINED RECOVERY SEQUENCE</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
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
          <span>ORBITAL INCIDENT VAULT // SECTOR 3</span>
          <span>STAGE [6/9] &bull; TIER-3 ACCESS ELEVATED</span>
        </footer>
      </main>
    </StageGuard>
  );
}
