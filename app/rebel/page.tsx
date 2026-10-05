"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Terminal,
  FileText,
  Keyboard,
  Download,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Lock,
  ExternalLink,
  Info,
  Radio,
  FileCode,
} from "lucide-react";
import { useGameState } from "../../context/GameStateContext";
import { StageGuard } from "../../components/StageGuard";

export default function RebelTerminalPage() {
  const router = useRouter();
  const { unlockNextStage, classLevel } = useGameState();

  const [activeTab, setActiveTab] = useState<"home" | "shortcuts" | "proof">("home");

  // Eclipse Access Password Input State
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [accessPassword, setAccessPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = accessPassword.trim();
    if (clean === "127.0.0.1" || clean === "PASSWORD - 127.0.0.1" || clean.includes("127.0.0.1")) {
      setAuthSuccess(true);
      setAuthError(null);
      unlockNextStage(3);
      setTimeout(() => {
        router.push("/orbital");
      }, 1000);
    } else {
      setAuthError("AUTHENTICATION REJECTED // INVALID INGRESS ADDRESS. RE-INSPECT LEAKED ARTICLE.");
    }
  };

  // Safe Batch File Download Red Herring
  const handleDownloadProof = () => {
    const batContent = `@echo off
echo ORBITAL INTERNAL EVIDENCE FILE
echo --------------------------------
echo.
echo Verifying rebel claims...
timeout /t 2 /nobreak >nul
echo.
echo RESULT: INCONCLUSIVE
echo.
echo This file contains absolutely no useful evidence.
echo You downloaded a batch file for this.
echo.
pause`;

    const blob = new Blob([batContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orbital_evidence.bat";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <StageGuard stageNumber={2}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-10 relative overflow-hidden flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
        {/* Ambient operative backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)]" />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6">
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

            {/* Navigation Tabs (HOME, KEYBOARD SHORTCUTS, PROOF) */}
            <nav className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("home")}
                className={`px-3 py-1.5 rounded font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "home"
                    ? "bg-emerald-950 border border-emerald-700 text-emerald-300 shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>HOME</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("shortcuts")}
                className={`px-3 py-1.5 rounded font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "shortcuts"
                    ? "bg-emerald-950 border border-emerald-700 text-emerald-300 shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Keyboard className="h-3.5 w-3.5" />
                <span>KEYBOARD SHORTCUTS</span>
              </button>

              {/* PROOF tab is available only for CLASS 6–8 and CLASS 9–12; NOT displayed for Class 3–5 */}
              {classLevel !== "3-5" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("proof")}
                  className={`px-3 py-1.5 rounded font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === "proof"
                      ? "bg-emerald-950 border border-emerald-700 text-emerald-300 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>PROOF</span>
                </button>
              )}
            </nav>
          </header>

          {/* TAB 1: HOME (Leaked Article with Hidden Text & Sentence Extraction) */}
          {activeTab === "home" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <article className="bg-slate-900/60 border border-emerald-900/60 rounded-xl p-5 sm:p-8 backdrop-blur-md relative overflow-hidden space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <Radio className="h-4 w-4" /> LEAKED DISPATCH: THE TRUTH ABOUT PROJECT ECLIPSE
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    AUTHOR: REBEL INTEL CELL // VERIFIED
                  </span>
                </div>

                {/* Leaked Article Body */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  <p>
                    <strong className="text-emerald-400 font-mono text-base">I</strong>nside the subterranean containment bunkers of Sector 4, Orbital Corporation has quietly buried its most dangerous experiment.{" "}
                    <strong className="text-emerald-400 font-mono text-base">P</strong>roject ECLIPSE was advertised to the public as an inexhaustible zero-emission fusion matrix, yet internal radiation sensors tell a catastrophic truth.{" "}
                    <strong className="text-emerald-400 font-mono text-base">V</strong>ast amounts of thermal discharge have breached the primary cooling conduits, while executive directors enforce complete media silence.
                  </p>

                  <p>
                    <strong className="text-emerald-400 font-mono text-base italic underline">4</strong> containment dampers have already failed in sequence, leaving the central core hovering near critical thermal resonance.{" "}
                    <strong className="text-emerald-400 font-mono text-base">L</strong>ead systems architect Dr. Vance attempted to alert regional safety oversight, but corporate administrators revoked his external transmission rights.{" "}
                    <strong className="text-emerald-400 font-mono text-base">O</strong>nly an internal network bridge can now pierce the automated firewall ring before total core meltdown begins.
                    <span className="text-transparent selection:text-slate-950 selection:bg-emerald-400 text-[8px] font-mono select-all ml-1 cursor-default tracking-tight">
                      127.0.0.1
                    </span>
                  </p>

                  <p>
                    <strong className="text-emerald-400 font-mono text-base">C</strong>landestine relay nodes scattered across the facility offer the last surviving diagnostic telemetry.{" "}
                    <strong className="text-emerald-400 font-mono text-base">A</strong>ll external internet gateways have been severed by Orbital corporate security, leaving only local loopback interfaces intact.{" "}
                    <strong className="text-emerald-400 font-mono text-base">L</strong>ocal loopback routing remains the sole unmonitored channel through which containment overrides can be sent.
                  </p>

                  <p>
                    <strong className="text-emerald-400 font-mono text-base">H</strong>idden diagnostic terminals throughout the campus await authorization from an inquisitive terminal operator.{" "}
                    <strong className="text-emerald-400 font-mono text-base">O</strong>peratives must cross-reference leaked personnel badges and maintenance archives to reconstruct the emergency protocol.{" "}
                    <strong className="text-emerald-400 font-mono text-base">S</strong>ecrecy is Orbital&apos;s greatest shield, but the digital footprints left in their internal systems cannot be erased.{" "}
                    <strong className="text-emerald-400 font-mono text-base">T</strong>ime is running out before the automated failsafe permanently seals the facility from the outside world.
                  </p>
                </div>

                {/* Transition Link: ACCESS PROJECT ECLIPSE */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Info className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Cross-reference article clues to identify the loopback ingress password.</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 hover:border-emerald-500 text-emerald-300 hover:text-emerald-100 font-bold uppercase tracking-wider rounded-lg text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 group"
                  >
                    <span>ACCESS PROJECT ECLIPSE &rarr;</span>
                  </button>
                </div>
              </article>
            </div>
          )}

          {/* TAB 2: KEYBOARD SHORTCUTS */}
          {activeTab === "shortcuts" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
                <div className="space-y-2 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400">
                    <Keyboard className="h-4 w-4" /> TERMINAL QUICK REFERENCE
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-100">
                    We think these shortcuts could be useful to you, Rebel.
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Copy active selection</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + c
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Paste clipboard payload</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + v
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Find in document</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + f
                    </kbd>
                  </div>

                  {/* Deliberate Anomaly: CTRL + A uppercase */}
                  <div className="p-3 bg-emerald-950/30 border border-emerald-700/80 rounded flex items-center justify-between shadow-sm">
                    <span className="text-emerald-300 font-semibold">Select entire document contents</span>
                    <kbd className="px-2 py-1 bg-emerald-900/60 border border-emerald-500 rounded text-emerald-200 font-black">
                      CTRL + A
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Undo last input mutation</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + z
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Save workspace cache</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + s
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Print diagnostic capture</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + p
                    </kbd>
                  </div>

                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded flex items-center justify-between">
                    <span className="text-slate-400">Cut selection to buffer</span>
                    <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300">
                      ctrl + x
                    </kbd>
                  </div>
                </div>

                <div className="p-4 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">OPERATIVE TIP:</span> An astute researcher uses every terminal capability to inspect obscured digital surfaces.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROOF (Only Class 6–8 and 9–12) */}
          {activeTab === "proof" && classLevel !== "3-5" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 backdrop-blur-md space-y-6">
                <div className="space-y-2 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400">
                    <FileCode className="h-4 w-4" /> EVIDENCE ARCHIVE // RED HERRING REPOSITORY
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-100">
                    Recovered Evidence Batch Script
                  </h2>
                  <p className="text-xs text-slate-400">
                    Rebel scouts recovered this executable script from an unencrypted terminal drive outside Sector 4.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-[11px] text-slate-500">// Script Preview: orbital_evidence.bat</div>
                  <pre className="text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre">
{`@echo off
echo ORBITAL INTERNAL EVIDENCE FILE
echo --------------------------------
echo.
echo Verifying rebel claims...
timeout /t 2 /nobreak >nul
echo.
echo RESULT: INCONCLUSIVE
echo.
echo This file contains absolutely no useful evidence.
echo You downloaded a batch file for this.
echo.
pause`}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-slate-400">
                    Safe inspection artifact &bull; No modifications made to host system.
                  </span>

                  <button
                    type="button"
                    onClick={handleDownloadProof}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800 hover:border-amber-600 text-amber-300 hover:text-amber-100 font-bold uppercase tracking-wider rounded-lg text-xs transition-all shadow-lg shadow-amber-950/30"
                  >
                    <Download className="h-4 w-4" />
                    <span>DOWNLOAD PROOF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal: ACCESS PROJECT ECLIPSE Password Input */}
        {passwordModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-700/80 rounded-xl max-w-md w-full p-6 space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Lock className="h-4 w-4" /> PROJECT ECLIPSE // INGRESS GATEWAY
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModalOpen(false);
                    setAuthError(null);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  ESC [X]
                </button>
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <p className="font-semibold text-slate-200">
                  Input the discovered loopback ingress authorization address:
                </p>
                <p className="text-[11px] text-slate-400">
                  Reference: Decrypted clandestine dispatch stream.
                </p>
              </div>

              {authError && (
                <div className="bg-rose-950/50 border border-rose-800 text-rose-300 p-3 rounded text-xs flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="bg-emerald-950/50 border border-emerald-700 text-emerald-300 p-3 rounded text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>INGRESS ADDRESS VERIFIED. CONNECTING TO ORBITAL PORTAL...</span>
                </div>
              )}

              <form onSubmit={handleAccessSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-bold">
                    PASSWORD / LOOPBACK ADDRESS
                  </label>
                  <input
                    type="text"
                    value={accessPassword}
                    onChange={(e) => setAccessPassword(e.target.value)}
                    placeholder=""
                    autoFocus
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-0 focus:border-emerald-500 font-mono tracking-wider shadow-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold transition-colors"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={authSuccess}
                    className="flex-1 py-2.5 px-4 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 hover:text-emerald-100 rounded text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    AUTHORIZE &rarr;
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-900 mt-8">
          <div>REBEL OPERATIVE CELL // SEC-TAP-V2</div>
          <div>STAGE [2/9] &bull; LOOPBACK RECON &bull; CLASS {classLevel}</div>
        </footer>
      </main>
    </StageGuard>
  );
}
