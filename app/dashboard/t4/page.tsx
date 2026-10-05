"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  FileText,
  Coffee,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { useGameState } from "../../../context/GameStateContext";
import { StageGuard } from "../../../components/StageGuard";
import { OrbitChat } from "../../../components/OrbitChat";

export default function Tier4DashboardPage() {
  const router = useRouter();
  const { unlockNextStage, currentUser } = useGameState();

  const [tokenInput, setTokenInput] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim() === "CONTAINMENT_ALPHA_OVERRIDE") {
      setSubmissionStatus("success");
      unlockNextStage(6);
      setTimeout(() => {
        router.push("/dashboard/t3");
      }, 1200);
    } else {
      setSubmissionStatus("error");
    }
  };

  return (
    <StageGuard stageNumber={5}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-cyan-900 selection:text-cyan-100">
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Top Status Bar */}
          <header className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <div className="text-xs sm:text-sm font-bold tracking-wider text-slate-200 flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-cyan-400" />
                <span>
                  LOGGED IN: {currentUser ? `${currentUser.name.toUpperCase()} (${currentUser.id})` : "SOLOMON HIGGS (@solomonhiggs)"} // CLEARANCE: TIER-4
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-semibold">
                SYSTEM: T4-INTRANET
              </span>
              <span>ORBITAL SECTOR 7</span>
            </div>
          </header>

          {/* Grid Layout: Main Briefings & Interactive AI Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Memo #9941 Card */}
              <div className="bg-slate-900/60 border border-cyan-900/60 rounded-xl p-5 sm:p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <FileText className="h-4 w-4" /> EXECUTIVE DIRECTIVE // MEMO #9941
                  </div>
                  <span className="text-[10px] text-slate-500">CLASSIFICATION: TIER-4 ARCHIVE</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-cyan-300">SUBJECT: Containment Protocol Overhaul &amp; Emergency Escalation</strong>
                  </p>
                  <p>
                    Effective immediately, all automated sub-reactor containment gates have been re-keyed under secondary failsafe partitions. Personnel operating at Tier-4 are strictly cordoned from Tier-3 thermal incident archives without the emergency alpha token.
                  </p>
                  <div className="p-3 rounded bg-cyan-950/30 border border-cyan-800/60 text-xs text-cyan-300">
                    <span className="font-bold">OPERATIVE NOTICE:</span> To elevate terminal clearance to Tier 3, supply the authorized emergency Alpha token below. For token queries, consult the O.R.B.I.T. assistance matrix.
                  </div>
                </div>
              </div>

              {/* Contradictory Memo #9928 Card (Puzzle 10) */}
              <div className="bg-slate-900/40 border border-amber-900/40 rounded-xl p-4 sm:p-5 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <FileText className="h-4 w-4" />
                    <span>PUBLIC RELATIONS MEMO #9928 // SUPERSEDED</span>
                  </div>
                  <span className="text-[10px] text-slate-500">DISAVOWED</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  &ldquo;Internal memo to all staff: All emergency alpha override procedures have been decommissioned. Any rumor regarding a CONTAINMENT_ALPHA_OVERRIDE token is unfounded.&rdquo;
                </p>
                <div className="text-[11px] text-amber-300/80 font-mono">
                  LOGICAL CONTRADICTION: Executive Directive #9941 above directly contradicts Memo #9928, confirming the Alpha override token is active and restricted.
                </div>
              </div>

              {/* Red Herring Facilities Card */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 sm:p-5 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <Coffee className="h-4 w-4" />
                  <span>FACILITIES BULLETIN: WORKPLACE SAFETY</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Do not leave ceramic or metal coffee mugs on magnetic cooling coils in sub-station 4B. Induction heating triggers secondary harmonic sensor alarms.
                </p>
              </div>

              {/* Clearance Elevation Form */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <KeyRound className="h-4 w-4 text-cyan-400" />
                  <span>ELEVATION GATEWAY // TIER-4 &rarr; TIER-3</span>
                </div>

                {submissionStatus === "error" && (
                  <div className="bg-rose-950/40 border border-rose-800 text-rose-400 p-3 rounded text-xs flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>TOKEN REJECTED // CLEARANCE REVOKED.</span>
                  </div>
                )}

                {submissionStatus === "success" && (
                  <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded text-xs flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>TOKEN ACCEPTED. ELEVATING SESSION TO TIER-3 ARCHIVES...</span>
                  </div>
                )}

                <form onSubmit={handleSubmitToken} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 block font-semibold">
                      ENTER EMERGENCY OVERRIDE TOKEN
                    </label>
                    <input
                      type="text"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      placeholder=""
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 uppercase tracking-wider"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submissionStatus === "success"}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-600 text-cyan-300 hover:text-cyan-100 font-bold uppercase tracking-wider rounded text-xs transition-all disabled:opacity-50"
                  >
                    <span>SUBMIT CLEARANCE TOKEN</span>
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
          <span>ORBITAL INTRANET // SUB-FACILITY NODE 04</span>
          <span>STAGE [5/9] &bull; TIER-4 ACCESS ACTIVE</span>
        </footer>
      </main>
    </StageGuard>
  );
}
