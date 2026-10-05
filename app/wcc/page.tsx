"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Zap,
} from "lucide-react";
import { useGameState } from "../../context/GameStateContext";
import { StageGuard } from "../../components/StageGuard";

interface CheckStatus {
  status: "pending" | "pass" | "fail";
  actual: string;
  required: string;
}

const MAX_BYTES = 5242880;
const REGEN_TARGET = 1073741824;
const PASSWORD_TARGET = 1073738000;
const SAMPLE_ORB_PAYLOAD =
  'MASTER_KEY="0001".1073738000;parse MASTER_KEY;~fluff.3824;regen=1073741824;';

export default function WinConditionCheckerPage() {
  const router = useRouter();
  const { resetGame } = useGameState();

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Evaluation Check States
  const [check1, setCheck1] = useState<CheckStatus>({
    status: "pending",
    actual: "---",
    required: "5,242,880 bytes",
  });
  const [check2, setCheck2] = useState<CheckStatus>({
    status: "pending",
    actual: "---",
    required: "1,073,741,824 bytes",
  });
  const [check3, setCheck3] = useState<CheckStatus>({
    status: "pending",
    actual: "---",
    required: "1,073,738,000 bytes",
  });

  const [isWin, setIsWin] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Timer for elapsed session duration
  useEffect(() => {
    setSessionStartTime(Date.now());
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatElapsed = (sec: number): string => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}s`;
  };

  const evaluateContent = (name: string, size: number, text: string) => {
    setFileName(name);
    setFileError(null);

    // Physical Size Guard: reject if size exceeds 5,242,880 bytes
    if (size > MAX_BYTES) {
      setFileError("PHYSICAL FILE SIZE REJECTED // LIMIT EXCEEDS 5,242,880 BYTES.");
      setCheck1({
        status: "fail",
        actual: `${size.toLocaleString()} bytes`,
        required: "5,242,880 bytes",
      });
      setCheck2({
        status: "pending",
        actual: "---",
        required: "1,073,741,824 bytes",
      });
      setCheck3({
        status: "pending",
        actual: "---",
        required: "1,073,738,000 bytes",
      });
      setIsWin(false);
      return;
    }

    // Check 1: Physical File Size
    const pass1 = size < MAX_BYTES;
    const c1: CheckStatus = {
      status: pass1 ? "pass" : "fail",
      actual: `${size.toLocaleString()} bytes`,
      required: "5,242,880 bytes",
    };
    setCheck1(c1);

    // Check 2: Hypothetical Regeneration Size
    const hasRegen = text.includes("1073741824");
    const pass2 = hasRegen;
    const regenValMatch = text.match(/regen\s*=\s*(\d+)/i) || text.match(/1073741824/);
    const calculatedRegen = hasRegen
      ? REGEN_TARGET
      : regenValMatch
      ? parseInt(regenValMatch[1], 10)
      : Math.min(1073741823, size * 1024);

    const c2: CheckStatus = {
      status: pass2 ? "pass" : "fail",
      actual: `${calculatedRegen.toLocaleString()} bytes`,
      required: "1,073,741,824 bytes",
    };
    setCheck2(c2);

    // Check 3: Parsed Password Length
    const hasPassword = text.includes("1073738000");
    const pass3 = hasPassword;
    const passValMatch = text.match(/MASTER_KEY.*?(\d{7,10})/i) || text.match(/1073738000/);
    const calculatedPass = hasPassword
      ? PASSWORD_TARGET
      : passValMatch
      ? parseInt(passValMatch[1], 10)
      : Math.min(1073737999, size * 128);

    const c3: CheckStatus = {
      status: pass3 ? "pass" : "fail",
      actual: `${calculatedPass.toLocaleString()} bytes`,
      required: "1,073,738,000 bytes",
    };
    setCheck3(c3);

    // Trigger Win condition if all 3 pass
    if (pass1 && pass2 && pass3) {
      setIsWin(true);
    } else {
      setIsWin(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > MAX_BYTES) {
      evaluateContent(file.name, file.size, "");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || "";
      evaluateContent(file.name, file.size, content);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInjectSample = () => {
    const blob = new Blob([SAMPLE_ORB_PAYLOAD], { type: "text/plain" });
    evaluateContent("eclipse_containment_override.orb", blob.size, SAMPLE_ORB_PAYLOAD);
  };

  const handlePurgeSession = () => {
    resetGame();
    router.push("/");
  };

  return (
    <StageGuard stageNumber={9}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono p-4 sm:p-6 lg:p-10 flex flex-col justify-between selection:bg-emerald-900 selection:text-emerald-100">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          {/* Top Status Header Bar */}
          <header className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-100">
                  SYSTEM VALIDATION // WIN CONDITION CHECKER (WCC) v2.4
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Upload authentic .orb containment file to trigger emergency shutdown.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>SESSION: {formatElapsed(elapsedSeconds)}</span>
              </div>
            </div>
          </header>

          {/* Upload Dropzone & Sample Injector */}
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                dragActive
                  ? "border-cyan-400 bg-cyan-950/20"
                  : "border-cyan-800/80 bg-slate-900/40 hover:border-cyan-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".orb,.txt,*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <div className="p-4 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400">
                <UploadCloud className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-200">
                  {fileName ? (
                    <span className="text-cyan-300 font-mono">LOADED ARTIFACT: {fileName}</span>
                  ) : (
                    "DRAG & DROP AUTHENTIC .ORB PAYLOAD OR CLICK TO SELECT"
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Maximum permitted buffer size: 5,242,880 bytes (5 MB)
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {fileError && (
              <div className="bg-rose-950/40 border border-rose-800 text-rose-400 p-4 rounded-lg text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span className="font-bold">{fileError}</span>
              </div>
            )}

            {/* Evaluation Helper Action */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleInjectSample}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-600 rounded text-xs text-cyan-300 transition-colors font-semibold"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>LOAD SAMPLE .ORB PAYLOAD (TEST HARNESS)</span>
              </button>
            </div>
          </div>

          {/* Diagnostic Results Grid (3 Checks) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Check 1 */}
            <div
              className={`rounded-xl p-5 border backdrop-blur-md transition-all space-y-4 ${
                check1.status === "pass"
                  ? "border-emerald-700 bg-emerald-950/30 text-emerald-400"
                  : check1.status === "fail"
                  ? "border-rose-700 bg-rose-950/30 text-rose-400"
                  : "border-slate-800 bg-slate-950 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  01 // PHYSICAL SIZE CHECK
                </span>
                {check1.status === "pass" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> PASS
                  </span>
                ) : check1.status === "fail" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
                    <XCircle className="h-3 w-3" /> FAIL
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    PENDING
                  </span>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <div>Actual: {check1.actual}</div>
                <div>Limit: {check1.required}</div>
              </div>
            </div>

            {/* Check 2 */}
            <div
              className={`rounded-xl p-5 border backdrop-blur-md transition-all space-y-4 ${
                check2.status === "pass"
                  ? "border-emerald-700 bg-emerald-950/30 text-emerald-400"
                  : check2.status === "fail"
                  ? "border-rose-700 bg-rose-950/30 text-rose-400"
                  : "border-slate-800 bg-slate-950 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  02 // HYPOTHETICAL REGENERATION
                </span>
                {check2.status === "pass" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> PASS
                  </span>
                ) : check2.status === "fail" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
                    <XCircle className="h-3 w-3" /> FAIL
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    PENDING
                  </span>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <div>Calculated: {check2.actual}</div>
                <div>Required: {check2.required}</div>
              </div>
            </div>

            {/* Check 3 */}
            <div
              className={`rounded-xl p-5 border backdrop-blur-md transition-all space-y-4 ${
                check3.status === "pass"
                  ? "border-emerald-700 bg-emerald-950/30 text-emerald-400"
                  : check3.status === "fail"
                  ? "border-rose-700 bg-rose-950/30 text-rose-400"
                  : "border-slate-800 bg-slate-950 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  03 // PARSED PASSWORD LENGTH
                </span>
                {check3.status === "pass" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> PASS
                  </span>
                ) : check3.status === "fail" ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
                    <XCircle className="h-3 w-3" /> FAIL
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    PENDING
                  </span>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <div>Calculated: {check3.actual}</div>
                <div>Required: {check3.required}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Win Modal Takeover */}
        {isWin && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md text-emerald-400 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
            <div className="max-w-2xl w-full bg-slate-900/90 border-2 border-emerald-500 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 text-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-300">
                <ShieldCheck className="h-9 w-9 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold">
                  CONTAINMENT OVERRIDE AUTHENTICATED
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight">
                  ECLIPSE AUTHORIZATION ACCEPTED // PROJECT ECLIPSE: ABORTED
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-mono">
                  ORBITAL SYSTEMS: OFFLINE. CORE FUSION CONTAINED.
                </p>
              </div>

              {/* Mission Summary Metrics */}
              <div className="bg-slate-950/80 border border-emerald-900/60 rounded-xl p-4 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-slate-500 text-[10px]">FINAL STAGE CLEARED</div>
                  <div className="text-emerald-400 font-bold text-sm">STAGE 09 / 09</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">ELAPSED TIME</div>
                  <div className="text-emerald-400 font-bold text-sm">
                    {formatElapsed(elapsedSeconds)}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePurgeSession}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600 hover:border-emerald-400 text-emerald-200 hover:text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-950/50"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>PURGE SESSION STATE</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="max-w-6xl mx-auto w-full pt-8 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900 mt-8">
          <span>ORBITAL CONSOLE // WCC CLUSTER</span>
          <span>STAGE [9/9] &bull; FINAL WIN VALIDATION</span>
        </footer>
      </main>
    </StageGuard>
  );
}
