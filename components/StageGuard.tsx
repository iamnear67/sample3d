"use client";

import React from "react";
import Link from "next/link";
import { useGameState, STAGE_ROUTES } from "../context/GameStateContext";

export interface StageGuardProps {
  stageNumber: number;
  children: React.ReactNode;
}

export const StageGuard: React.FC<StageGuardProps> = ({ stageNumber, children }) => {
  const { unlockedStage, highestAccessibleRoute, isHydrated } = useGameState();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isHydrated) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-400 font-mono flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-widest text-slate-400">Verifying Security Clearance...</span>
        </div>
      </div>
    );
  }

  if (unlockedStage < stageNumber) {
    const authorizedStage = STAGE_ROUTES[unlockedStage];
    const targetStage = STAGE_ROUTES[stageNumber];

    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex items-center justify-center p-4 selection:bg-rose-900 selection:text-rose-100">
        <div className="w-full max-w-xl bg-slate-900/60 border border-slate-800 rounded-lg p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <span className="text-xs uppercase tracking-widest text-slate-500">
              ORBITAL // ACCESS CONTROL
            </span>
            <span className="flex items-center gap-1.5 text-xs text-rose-400">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              LOCKDOWN ACTIVE
            </span>
          </div>

          <div className="bg-rose-950/40 border border-rose-800 text-rose-400 p-4 rounded mb-6 text-sm">
            <p className="font-bold tracking-tight">
              SECURITY CLEARANCE VOID // ACCESS LEVEL RESTRICTED TO STAGE [{unlockedStage}]
            </p>
            <p className="mt-1 text-xs text-rose-400/80">
              Stage [{stageNumber}] access denied. Physical authorization token required.
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 mb-8 border-l-2 border-slate-800 pl-3">
            <div>TARGET NODE: Stage {stageNumber} ({targetStage?.codename ?? "UNKNOWN"})</div>
            <div>CURRENT CLEARANCE: Stage {unlockedStage} ({authorizedStage?.codename ?? "UNKNOWN"})</div>
            <div>DIRECTIVE: Fall back to your highest validated checkpoint.</div>
          </div>

          <Link
            href={highestAccessibleRoute}
            className="flex w-full items-center justify-center gap-2 rounded bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/60 hover:text-rose-100 hover:border-rose-600 transition-all duration-200 py-3 px-4 text-xs sm:text-sm font-semibold tracking-wide uppercase"
          >
            &larr; Fallback to Authorized Terminal [Stage {unlockedStage}]
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default StageGuard;
