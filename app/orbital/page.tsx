"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Award, Eye, Copy, Check, Lock, X } from "lucide-react";
import { StageGuard } from "../../components/StageGuard";

export default function OrbitalPublicPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const creds = "CLEARANCE_ID: ORB-88219 // PASSKEY: Vance!Plasma99";

  const handleCopy = () => {
    navigator.clipboard.writeText(creds);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StageGuard stageNumber={3}>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
        <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" /> ORBITAL CO.
            </span>
            <nav className="hidden md:flex gap-4 text-xs text-slate-400">
              <span className="hover:text-slate-200 cursor-pointer">About</span>
              <span className="hover:text-slate-200 cursor-pointer">Fusion Grid</span>
              <span className="hover:text-slate-200 cursor-pointer">Leadership</span>
            </nav>
          </div>
          <Link
            href="/auth/login"
            className="px-3 py-1.5 text-xs font-semibold bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded hover:bg-cyan-900 transition-colors"
          >
            EMPLOYEE INTRANET PORTAL &rarr;
          </Link>
        </header>

        <main className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="text-center space-y-2 py-4">
            <span className="text-xs uppercase tracking-widest text-cyan-400">Excellence in Fusion Systems</span>
            <h1 className="text-2xl font-bold">Orbital Corp &bull; Monthly Recognition</h1>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                <Award className="h-4 w-4" /> EMPLOYEE OF THE MONTH
              </div>
              <h2 className="text-xl font-bold text-slate-100">Dr. Alistair Vance</h2>
              <p className="text-xs text-cyan-300">Lead Containment Architect // Project ECLIPSE</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Honored for his tireless dedication to stabilizing the ECLIPSE fusion matrix. Dr. Vance&apos;s containment protocols ensure zero-fail safety across all subnets.
              </p>
            </div>

            <div className="border border-slate-800 bg-slate-950/80 rounded-lg p-4 space-y-3 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-xs font-bold">SECURITY BADGE // VERIFIED</div>
              <p className="text-[11px] text-slate-500">Tier-4 Access &bull; Bio-Matrix Synced</p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs bg-slate-900 border border-slate-700 hover:border-cyan-600 rounded text-cyan-300 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" /> INSPECT HIGH-RES SECURITY BADGE
              </button>
            </div>
          </div>
        </main>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-md w-full p-6 space-y-4 relative">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
              <div className="text-center space-y-1">
                <div className="text-xs text-cyan-400 font-bold">HIGH-RESOLUTION BADGE SCAN #088219</div>
                <div className="text-sm font-bold">DR. ALISTAIR VANCE</div>
              </div>
              <div className="border border-cyan-900/80 bg-slate-950 p-4 rounded text-center space-y-3">
                <div className="h-20 bg-slate-900/80 rounded flex items-center justify-center border border-slate-800 text-xs text-slate-500">
                  [ PHOTO ENCRYPTION BLOCK: ACTIVE ]
                </div>
                <div className="text-[10px] text-cyan-400/90 tracking-tighter bg-slate-900 p-2 rounded border border-cyan-900/50 select-all">
                  {creds}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? "COPIED" : "COPY ASSET PARAMETERS"}
                </button>
                <Link
                  href="/auth/login"
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 rounded text-cyan-300 font-bold transition-colors"
                >
                  <Lock className="h-3 w-3" /> PROCEED TO INTRANET LOGIN
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </StageGuard>
  );
}
