"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Award,
  Eye,
  Copy,
  Check,
  Lock,
  X,
  Users,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Calendar,
  Building,
} from "lucide-react";
import { StageGuard } from "../../components/StageGuard";
import { useGameState } from "../../context/GameStateContext";

interface EmployeeRecord {
  id: string;
  name: string;
  department: string;
  project: string;
  clearance: string;
  status: string;
}

const EMPLOYEE_DIRECTORY: EmployeeRecord[] = [
  {
    id: "ORB-88219",
    name: "Dr. Alistair Vance",
    department: "Containment Architecture",
    project: "Project ECLIPSE",
    clearance: "Tier-4 (Elevated)",
    status: "Active // Under Safety Review",
  },
  {
    id: "ORB-10492",
    name: "Elena Rostova",
    department: "Thermal Coolant Dynamics",
    project: "Sub-Station 4B",
    clearance: "Tier-3",
    status: "On Shift",
  },
  {
    id: "ORB-33910",
    name: "Marcus Thorne",
    department: "Magnetic Field Stabilization",
    project: "Tokamak Ring Delta",
    clearance: "Tier-3",
    status: "On Shift",
  },
  {
    id: "ORB-55201",
    name: "Sarah Chen",
    department: "Auxiliary Energy Grid",
    project: "Secondary Transformers",
    clearance: "Tier-2",
    status: "Standby",
  },
];

export default function OrbitalPublicPage() {
  const { unlockNextStage } = useGameState();
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<"recognition" | "directory" | "audit">("recognition");

  React.useEffect(() => {
    unlockNextStage(4);
  }, [unlockNextStage]);

  const creds = "CLEARANCE_ID: ORB-88219 // PASSKEY: Vance!Plasma99";

  const handleCopy = () => {
    navigator.clipboard.writeText(creds);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StageGuard stageNumber={3}>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col justify-between selection:bg-cyan-900 selection:text-cyan-100">
        <div>
          {/* Corporate Header */}
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" /> ORBITAL CO.
              </span>
              <nav className="flex gap-3 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => setActiveSection("recognition")}
                  className={`hover:text-slate-200 transition-colors ${
                    activeSection === "recognition" ? "text-cyan-300 font-bold underline" : ""
                  }`}
                >
                  Recognition
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("directory")}
                  className={`hover:text-slate-200 transition-colors ${
                    activeSection === "directory" ? "text-cyan-300 font-bold underline" : ""
                  }`}
                >
                  Personnel Directory
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("audit")}
                  className={`hover:text-slate-200 transition-colors ${
                    activeSection === "audit" ? "text-cyan-300 font-bold underline" : ""
                  }`}
                >
                  Security Audit
                </button>
              </nav>
            </div>

            <Link
              href="/auth/login"
              className="px-3.5 py-1.5 text-xs font-semibold bg-cyan-950/70 border border-cyan-800 hover:border-cyan-600 text-cyan-300 hover:text-cyan-100 rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>EMPLOYEE INTRANET PORTAL &rarr;</span>
            </Link>
          </header>

          <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="text-center space-y-2 py-2">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                Orbital Corporation &bull; Public Corporate Interface
              </span>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Pioneering Next-Generation Fusion Energy
              </h1>
            </div>

            {/* SECTION 1: RECOGNITION & BADGE (Puzzles 5 & 6) */}
            {activeSection === "recognition" && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center backdrop-blur-md animate-in fade-in duration-200">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-950/50 border border-cyan-800 px-2.5 py-1 rounded">
                    <Award className="h-4 w-4" /> EMPLOYEE OF THE MONTH
                  </div>
                  <h2 className="text-2xl font-bold text-slate-100">Dr. Alistair Vance</h2>
                  <p className="text-xs font-semibold text-cyan-300">
                    Lead Containment Architect // Project ECLIPSE
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Honored for his tireless dedication to stabilizing the ECLIPSE fusion matrix. Dr. Vance&apos;s automated containment protocols ensure zero-fail safety across all subnets.
                  </p>
                  <div className="pt-2 text-xs text-slate-400 space-y-1">
                    <div>DEPARTMENT: Containment Architecture</div>
                    <div>ASSIGNMENT: Project ECLIPSE Core Conduits</div>
                  </div>
                </div>

                <div className="border border-slate-800 bg-slate-950/80 rounded-xl p-6 space-y-4 text-center shadow-xl">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-cyan-700 flex items-center justify-center text-cyan-400">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">SECURITY BADGE // VERIFIED</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tier-4 Access &bull; Bio-Matrix Synced</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-lg text-cyan-300 transition-colors shadow"
                  >
                    <Eye className="h-4 w-4" />
                    <span>INSPECT HIGH-RES SECURITY BADGE</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 2: PERSONNEL DIRECTORY (Puzzle 7) */}
            {activeSection === "directory" && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-md space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <FileSpreadsheet className="h-4 w-4" /> PERSONNEL DIRECTORY &bull; SECTOR 4 ROSTER
                  </div>
                  <span className="text-[11px] text-slate-500">CROSS-REFERENCE AUDIT</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                        <th className="p-3">EMPLOYEE ID</th>
                        <th className="p-3">FULL NAME</th>
                        <th className="p-3">DEPARTMENT</th>
                        <th className="p-3">PROJECT</th>
                        <th className="p-3">CLEARANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {EMPLOYEE_DIRECTORY.map((emp) => (
                        <tr
                          key={emp.id}
                          className={emp.id === "ORB-88219" ? "bg-cyan-950/20 text-cyan-200 font-semibold" : "hover:bg-slate-900/50"}
                        >
                          <td className="p-3 font-mono font-bold">{emp.id}</td>
                          <td className="p-3">{emp.name}</td>
                          <td className="p-3">{emp.department}</td>
                          <td className="p-3">{emp.project}</td>
                          <td className="p-3 font-mono text-[11px]">{emp.clearance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  Cross-referencing identifies Dr. Vance as the solitary Lead Containment Architect assigned to Project ECLIPSE.
                </p>
              </div>
            )}

            {/* SECTION 3: CONTRADICTORY AUDIT RECORDS (Puzzle 8) */}
            {activeSection === "audit" && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-md space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-3">
                  <AlertTriangle className="h-4 w-4" /> INTERNAL DISCREPANCY RECORD // AUDIT LOG #8819
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-bold uppercase text-[11px]">
                      RECORD A: PUBLIC EMPLOYEE DIRECTORY
                    </span>
                    <div className="text-slate-300 space-y-1">
                      <div>Name: Dr. Alistair Vance</div>
                      <div>Clearance: Tier-4 (Elevated)</div>
                      <div>Status: Active on Campus</div>
                      <div>Badge: ORB-88219 (Functional)</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/80 space-y-2">
                    <span className="text-amber-400 font-bold uppercase text-[11px]">
                      RECORD B: SECURITY INCIDENT OVERRIDE
                    </span>
                    <div className="text-amber-200/90 space-y-1">
                      <div>Name: Dr. Alistair Vance</div>
                      <div>Clearance: Flagged for Revocation</div>
                      <div>Note: Access to Tier-3 logs restricted</div>
                      <div>Warning: Requires Emergency Alpha Token</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400 leading-relaxed">
                  <span className="text-cyan-400 font-bold">DEDUCTION:</span> The public directory shows Dr. Vance in good standing, while the internal security incident system already placed his terminal under quarantine. His high-res badge contains his intranet passkey.
                </div>
              </div>
            )}

            {/* Proceed to Intranet Call-to-Action */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-200">READY FOR INTRANET INGRESS?</div>
                <div className="text-xs text-slate-400">
                  Inspect Dr. Vance&apos;s badge, copy the credentials, and proceed to the Employee Intranet Portal.
                </div>
              </div>

              <Link
                href="/auth/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-600 rounded-lg text-cyan-300 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>OPEN INTRANET LOGIN</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>

        {/* High-Resolution Security Badge Inspection Modal (Puzzle 6) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-cyan-800/80 rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center space-y-1">
                <div className="text-xs text-cyan-400 font-bold tracking-wider uppercase">
                  HIGH-RESOLUTION BADGE SCAN #088219
                </div>
                <div className="text-base font-bold text-slate-100">DR. ALISTAIR VANCE</div>
                <div className="text-xs text-slate-400">Sector 4 Containment Architecture</div>
              </div>

              {/* Fictional Visual Badge Card */}
              <div className="border border-cyan-900 bg-slate-950 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-bold text-cyan-400">
                    <Building className="h-3.5 w-3.5" /> ORBITAL CO.
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" /> ISSUED: 2026-03-12
                  </span>
                </div>

                <div className="h-24 bg-slate-900/90 rounded border border-slate-800 flex flex-col items-center justify-center gap-1 text-slate-400">
                  <Shield className="h-7 w-7 text-cyan-400" />
                  <span className="text-[10px] tracking-widest text-slate-500 font-mono">
                    [ BIOMETRIC ENCRYPTED ASSET ]
                  </span>
                </div>

                <div className="text-[11px] text-cyan-300 font-mono bg-slate-900 p-2.5 rounded border border-cyan-900/60 select-all text-center">
                  {creds}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors font-medium"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "COPIED" : "COPY ASSET PARAMS"}</span>
                </button>
                <Link
                  href="/auth/login"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-700 rounded-lg text-cyan-300 font-bold transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>GO TO LOGIN &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="max-w-5xl mx-auto w-full p-4 sm:p-6 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900">
          <span>ORBITAL CORP // PUBLIC RELATIONS ARCHIVE</span>
          <span>STAGE [3/9] &bull; PERSONNEL INTELLIGENCE</span>
        </footer>
      </div>
    </StageGuard>
  );
}
