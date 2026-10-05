"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GitBranch,
  Folder,
  FileCode,
  FileText,
  Lock,
  ArrowRight,
  GitFork,
  Star,
  Search,
  X,
  Copy,
  Check,
  Shield,
  Layers,
} from "lucide-react";
import { useGameState } from "../../context/GameStateContext";
import { StageGuard } from "../../components/StageGuard";

interface RepoItem {
  id: string;
  name: string;
  description: string;
  isTarget?: boolean;
  files?: Array<{ name: string; type: "file" | "code"; size: string }>;
  readme: string;
}

const REPOSITORIES: RepoItem[] = [
  {
    id: "active-core",
    name: "orbital-containment-protocol",
    description: "Core reactor failsafe logic and automated SCRAM isolation routines.",
    isTarget: true,
    readme:
      "Containment protocol v9.04. Contains primary matrix stabilization routines and seed configuration parameters for emergency regeneration.",
    files: [
      { name: "main.rs", type: "code", size: "4.2 KB" },
      { name: "reactor_core.c", type: "code", size: "12.8 KB" },
      { name: ".gitignore", type: "file", size: "384 B" },
    ],
  },
  {
    id: "decoy-1",
    name: "cooling-pipe-maintenance",
    description: "Maintenance schedules and inspection checklists for cooling loops.",
    readme: "Maintenance schedules for cooling pipe loops. Last inspection: 14 days ago.",
  },
  {
    id: "decoy-2",
    name: "hr-personnel-handbook",
    description: "Corporate policies, badge clearance procedures, and dress code.",
    readme: "ORBITAL dress code and identification badges. All personnel must wear badges visibly.",
  },
  {
    id: "decoy-3",
    name: "corporate-branding-assets",
    description: "SVG logos, corporate typography, and slide presentation master files.",
    readme: "Corporate presentation templates. Do not distribute without Media Relations approval.",
  },
];

const GITIGNORE_RAW_CONTENT = `# ORBITAL REGENERATION SPECIFICATION
# WARNING: DO NOT CHANGE REGENERATION BASE OFFSET
node_modules/
*.log

# --- [WCC VALIDATION SEED CONSTANTS] ---
# SEED_REGENERATION_TARGET = 1073741824
# NON_REPLACING_FLUFF_BYTES = 3824
# PARSED_PASSWORD_LENGTH = TARGET - FLUFF`;

export default function GitSourceControlPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  const [activeRepoId, setActiveRepoId] = useState<string>("active-core");
  const [activeFileViewer, setActiveFileViewer] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedRepo = REPOSITORIES.find((r) => r.id === activeRepoId) || REPOSITORIES[0];

  const handleCopyGitignore = () => {
    navigator.clipboard.writeText(GITIGNORE_RAW_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToWCC = () => {
    unlockNextStage(9);
    router.push("/wcc");
  };

  return (
    <StageGuard stageNumber={8}>
      <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex flex-col justify-between selection:bg-cyan-900 selection:text-cyan-100">
        <div>
          {/* Gitea/GitHub Style Top Navigation */}
          <header className="border-b border-slate-800 bg-slate-900 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
                <GitBranch className="h-5 w-5" />
                <span>ORBITAL SYSTEMS // SOURCE CONTROL</span>
              </div>
              <span className="hidden md:inline text-xs text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                LAN MIRROR #03
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleProceedToWCC}
                className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-600 rounded text-cyan-300 font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-cyan-950/40"
              >
                <span>PROCEED TO WCC MATRIX</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Repository Explorer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Repositories Sidebar List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
                  <span>INTERNAL REPOSITORIES</span>
                  <span>{REPOSITORIES.length} TOTAL</span>
                </div>

                <div className="space-y-2">
                  {REPOSITORIES.map((repo) => {
                    const isSelected = repo.id === activeRepoId;
                    return (
                      <div
                        key={repo.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setActiveRepoId(repo.id);
                          setActiveFileViewer(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setActiveRepoId(repo.id);
                            setActiveFileViewer(null);
                          }
                        }}
                        className={`cursor-pointer p-3.5 rounded-lg border transition-all text-left ${
                          isSelected
                            ? "bg-slate-900 border-cyan-700/80 shadow-md shadow-cyan-950/30"
                            : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className={`text-xs font-bold truncate ${
                              isSelected ? "text-cyan-300" : "text-slate-200"
                            }`}
                          >
                            {repo.name}
                          </span>
                          {repo.isTarget && (
                            <span className="shrink-0 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                              ACTIVE REVISION
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Repository Content Viewer (8 cols) */}
              <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-md">
                {/* Repo Banner Header */}
                <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-cyan-400" />
                      <h2 className="text-sm sm:text-base font-bold text-slate-100">
                        orbital / <span className="text-cyan-400">{selectedRepo.name}</span>
                      </h2>
                      {selectedRepo.isTarget && (
                        <span className="text-[10px] bg-emerald-950/60 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded">
                          PUBLIC INTERNAL
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{selectedRepo.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      <GitBranch className="h-3 w-3 text-cyan-400" /> main
                    </span>
                    <span className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      <Star className="h-3 w-3 text-amber-400" /> 12
                    </span>
                  </div>
                </div>

                {/* File Tree (Only in active target repo) */}
                {selectedRepo.files ? (
                  <div className="divide-y divide-slate-800/80">
                    <div className="px-4 py-2.5 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>FILE / DIRECTORY</span>
                      <span>SIZE</span>
                    </div>

                    {selectedRepo.files.map((file) => (
                      <div
                        key={file.name}
                        onClick={() => setActiveFileViewer(file.name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setActiveFileViewer(file.name);
                          }
                        }}
                        className="px-4 py-3 flex items-center justify-between hover:bg-slate-800/50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 text-xs">
                          {file.type === "code" ? (
                            <FileCode className="h-4 w-4 text-cyan-400" />
                          ) : (
                            <FileText className="h-4 w-4 text-amber-400" />
                          )}
                          <span
                            className={`font-semibold group-hover:underline ${
                              file.name === ".gitignore"
                                ? "text-amber-300 group-hover:text-amber-200"
                                : "text-slate-200"
                            }`}
                          >
                            {file.name}
                          </span>
                          {file.name === ".gitignore" && (
                            <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
                              INSPECT ARTIFACT
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{file.size}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* README Preview Box */}
                <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/40 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5" /> README.md
                  </div>
                  <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                    {selectedRepo.readme}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* .gitignore Modal Viewer */}
        {activeFileViewer === ".gitignore" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveFileViewer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  orbital-containment-protocol / <span className="text-amber-400">.gitignore</span>
                </h3>
              </div>

              {/* Raw Monospace Code Viewer */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre leading-relaxed select-all">
                {GITIGNORE_RAW_CONTENT}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyGitignore}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>COPIED CONSTANTS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY ARTIFACT PARAMETERS</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleProceedToWCC}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 font-bold rounded text-xs uppercase tracking-wider transition-colors"
                >
                  <span>LAUNCH WCC CALCULATOR</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generic File Viewer Modal for other code files */}
        {activeFileViewer && activeFileViewer !== ".gitignore" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setActiveFileViewer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100">{activeFileViewer}</h3>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded p-4 text-xs font-mono text-slate-300">
                // System implementation module.
                <br />
                // Core routines encrypted under hardware secure enclave.
                <br />
                // Reference auxiliary config files for regeneration offsets.
              </div>
              <button
                type="button"
                onClick={() => setActiveFileViewer(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200"
              >
                CLOSE VIEWER
              </button>
            </div>
          </div>
        )}

        {/* Git Portal Footer */}
        <footer className="max-w-7xl mx-auto w-full p-4 sm:p-6 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900">
          <span>ORBITAL REPO CLUSTER // MIRROR 192.168.1.100</span>
          <span>STAGE [8/9] &bull; SOURCE CODE AUDIT ACTIVE</span>
        </footer>
      </main>
    </StageGuard>
  );
}
