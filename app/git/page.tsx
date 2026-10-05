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
  GitCommit,
  History,
  Star,
  Search,
  X,
  Copy,
  Check,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
  Code2,
} from "lucide-react";
import { useGameState } from "../../context/GameStateContext";
import { StageGuard } from "../../components/StageGuard";

interface RepoItem {
  id: string;
  name: string;
  description: string;
  isTarget?: boolean;
  files?: Array<{ name: string; type: "file" | "code" | "orb"; size: string }>;
  readme: string;
}

interface CommitRecord {
  hash: string;
  author: string;
  date: string;
  message: string;
  diffSummary: string;
  rawDiff?: string;
}

const REPOSITORIES: RepoItem[] = [
  {
    id: "active-core",
    name: "orbital-containment-protocol",
    description: "Core reactor failsafe logic, .orb regeneration scripts, and automated isolation routines.",
    isTarget: true,
    readme:
      "Containment protocol v9.04. Contains primary matrix stabilization routines and seed configuration parameters for emergency regeneration. Note: All production payloads must pass WCC validation.",
    files: [
      { name: "containment_override.orb", type: "orb", size: "78 B" },
      { name: ".gitignore", type: "file", size: "384 B" },
      { name: "main.rs", type: "code", size: "4.2 KB" },
      { name: "reactor_core.c", type: "code", size: "12.8 KB" },
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

const COMMITS: CommitRecord[] = [
  {
    hash: "f41c90e",
    author: "dr.vance@orbital.internal",
    date: "2 hours ago",
    message: "Sanitize raw constants from production tree; relocate to secure .gitignore seed",
    diffSummary: "- 3 deletions (sensitive constants stripped from code)",
    rawDiff: `--- a/containment_override.orb
+++ b/containment_override.orb
@@ -1,4 +1,4 @@
-SEED_TARGET=1073741824;
-NON_REPLACING_FLUFF=3824;
+MASTER_KEY="0001".1073738000;
+parse MASTER_KEY;~fluff.3824;regen=1073741824;`,
  },
  {
    hash: "d89f2a1",
    author: "dr.vance@orbital.internal",
    date: "Yesterday 18:42",
    message: "Add WCC mathematical regeneration specifications and seed constants",
    diffSummary: "+ 4 additions (explicit target: 1,073,741,824 bytes, fluff: 3824 bytes)",
    rawDiff: `--- /dev/null
+++ b/.gitignore
@@ -0,0 +1,7 @@
+# ORBITAL REGENERATION SPECIFICATION
+# SEED_REGENERATION_TARGET = 1073741824
+# NON_REPLACING_FLUFF_BYTES = 3824
+# PARSED_PASSWORD_LENGTH = TARGET - FLUFF`,
  },
  {
    hash: "a0928e3",
    author: "sysadmin@orbital.internal",
    date: "3 days ago",
    message: "Initial commit of containment framework",
    diffSummary: "+ 24 files",
  },
];

const GITIGNORE_RAW_CONTENT = `# ORBITAL REGENERATION SPECIFICATION
# WARNING: DO NOT CHANGE REGENERATION BASE OFFSET
node_modules/
*.log

# --- [WCC VALIDATION SEED CONSTANTS] ---
# SEED_REGENERATION_TARGET = 1073741824
# NON_REPLACING_FLUFF_BYTES = 3824
# PARSED_PASSWORD_LENGTH = TARGET - FLUFF = 1073738000`;

const ORB_RAW_CONTENT = `// ORBITAL CONTAINMENT OVERRIDE ARTIFACT
// File: containment_override.orb
MASTER_KEY="0001".1073738000;
parse MASTER_KEY;
~fluff.3824;
regen=1073741824;`;

export default function GitSourceControlPage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();

  const [activeRepoId, setActiveRepoId] = useState<string>("active-core");
  const [activeTab, setActiveTab] = useState<"files" | "commits" | "grammar">("files");
  const [activeFileViewer, setActiveFileViewer] = useState<string | null>(null);
  const [activeCommitViewer, setActiveCommitViewer] = useState<CommitRecord | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedRepo = REPOSITORIES.find((r) => r.id === activeRepoId) || REPOSITORIES[0];

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text);
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
          {/* Top Bar */}
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
                className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800 hover:border-cyan-600 rounded text-cyan-300 font-bold text-xs uppercase tracking-wide transition-all shadow-lg shadow-cyan-950/40"
              >
                <span>PROCEED TO WCC MATRIX</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
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
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
                          {repo.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Repository Content Area (8 cols) */}
              <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-md space-y-0">
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
                    <p className="text-xs text-slate-400 font-sans">{selectedRepo.description}</p>
                  </div>

                  {/* Nav tabs for target repo: Files / Commits / Grammar */}
                  {selectedRepo.isTarget && (
                    <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveTab("files")}
                        className={`px-2.5 py-1 rounded transition-colors ${
                          activeTab === "files" ? "bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold" : "text-slate-400"
                        }`}
                      >
                        Files
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("commits")}
                        className={`px-2.5 py-1 rounded transition-colors ${
                          activeTab === "commits" ? "bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold" : "text-slate-400"
                        }`}
                      >
                        Commits (3)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("grammar")}
                        className={`px-2.5 py-1 rounded transition-colors ${
                          activeTab === "grammar" ? "bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold" : "text-slate-400"
                        }`}
                      >
                        ORB Grammar
                      </button>
                    </div>
                  )}
                </div>

                {/* TAB 1: FILES LIST */}
                {activeTab === "files" && selectedRepo.files && (
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
                          {file.type === "orb" ? (
                            <Sparkles className="h-4 w-4 text-emerald-400" />
                          ) : file.type === "code" ? (
                            <FileCode className="h-4 w-4 text-cyan-400" />
                          ) : (
                            <FileText className="h-4 w-4 text-amber-400" />
                          )}
                          <span
                            className={`font-semibold group-hover:underline ${
                              file.name.endsWith(".orb")
                                ? "text-emerald-300 group-hover:text-emerald-200"
                                : file.name === ".gitignore"
                                ? "text-amber-300 group-hover:text-amber-200"
                                : "text-slate-200"
                            }`}
                          >
                            {file.name}
                          </span>
                          {file.name.endsWith(".orb") && (
                            <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold">
                              ORB PAYLOAD
                            </span>
                          )}
                          {file.name === ".gitignore" && (
                            <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-800 text-amber-300">
                              SEED CONSTANTS
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 2: COMMITS TAB (Puzzle 15) */}
                {activeTab === "commits" && (
                  <div className="divide-y divide-slate-800/80">
                    <div className="px-4 py-2.5 bg-slate-950/60 text-[11px] text-slate-400">
                      <span>COMMIT HISTORY // BRANCH: main</span>
                    </div>

                    {COMMITS.map((c) => (
                      <div
                        key={c.hash}
                        onClick={() => setActiveCommitViewer(c)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setActiveCommitViewer(c);
                        }}
                        className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-cyan-400 text-xs font-bold flex items-center gap-1.5">
                            <GitCommit className="h-3.5 w-3.5" /> {c.hash}
                          </span>
                          <span className="text-[11px] text-slate-500">{c.date}</span>
                        </div>
                        <p className="text-xs text-slate-200 group-hover:text-cyan-200 font-medium">
                          {c.message}
                        </p>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                          <span>{c.author}</span>
                          <span className="text-amber-400 font-semibold">{c.diffSummary}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: ORB GRAMMAR GUIDE (Puzzle 17 & 18 & 19) */}
                {activeTab === "grammar" && (
                  <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs">
                      <BookOpen className="h-4 w-4" /> THE ORB SPECIFICATION &amp; GRAMMAR
                    </div>

                    <p className="text-slate-300 font-sans leading-relaxed">
                      ORB is a lightweight fictional declarative language used by Orbital engineers to express astronomical payloads without memory-crashing allocation.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <span className="text-emerald-400 font-bold">1. LITERAL REPETITION</span>
                        <div className="font-mono text-[11px] text-slate-400">
                          <code>&quot;0001&quot;.1073738000</code>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Repeats the literal until reaching the specified byte length.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <span className="text-amber-400 font-bold">2. FLUFF INJECTION</span>
                        <div className="font-mono text-[11px] text-slate-400">
                          <code>~fluff.3824</code>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Inserts 3,824 padding bytes that are omitted during password extraction.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <span className="text-cyan-400 font-bold">3. REGEN DECLARATION</span>
                        <div className="font-mono text-[11px] text-slate-400">
                          <code>regen=1073741824</code>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Declares theoretical 1 GB target size without physical generation.
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                        <span className="text-rose-400 font-bold">4. MATHEMATICAL FORMULA</span>
                        <div className="font-mono text-[11px] text-slate-300">
                          Target (1073741824) - Fluff (3824) = 1073738000
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans">
                          WCC evaluates this formula mathematically!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* README Preview */}
                <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <FileText className="h-3.5 w-3.5" /> README.md
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedRepo.readme}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: .gitignore File Viewer */}
        {activeFileViewer === ".gitignore" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
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

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre leading-relaxed select-all">
                {GITIGNORE_RAW_CONTENT}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopyContent(GITIGNORE_RAW_CONTENT)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>COPIED SEED CONSTANTS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY CONSTANTS</span>
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

        {/* Modal: .orb File Viewer (Puzzle 16) */}
        {activeFileViewer === "containment_override.orb" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-emerald-700/80 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setActiveFileViewer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  orbital-containment-protocol / <span className="text-emerald-400">containment_override.orb</span>
                </h3>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                {ORB_RAW_CONTENT}
              </div>

              <div className="text-xs text-slate-400 font-sans leading-relaxed">
                This concise .orb file satisfies the WCC requirements: it declares the 1 GB regeneration target and specifies 3,824 non-replacing fluff bytes while remaining only 78 bytes in physical file size.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopyContent(ORB_RAW_CONTENT)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>COPIED .ORB PAYLOAD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY .ORB CONTENT</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleProceedToWCC}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-bold rounded text-xs uppercase tracking-wider transition-colors"
                >
                  <span>TEST IN WCC MATRIX</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Commit Diff Viewer (Puzzle 15) */}
        {activeCommitViewer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => setActiveCommitViewer(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-1">
                <div className="text-xs text-cyan-400 font-mono font-bold">
                  COMMIT // {activeCommitViewer.hash}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100">
                  {activeCommitViewer.message}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>Author: {activeCommitViewer.author}</span>
                  <span>{activeCommitViewer.date}</span>
                </div>
              </div>

              {activeCommitViewer.rawDiff ? (
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
                  {activeCommitViewer.rawDiff}
                </div>
              ) : (
                <div className="p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-400">
                  Initial revision tree commit.
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveCommitViewer(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200 transition-colors"
              >
                CLOSE COMMIT DIFF
              </button>
            </div>
          </div>
        )}

        {/* Generic File Viewer Modal */}
        {activeFileViewer &&
          activeFileViewer !== ".gitignore" &&
          activeFileViewer !== "containment_override.orb" && (
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
                  // Core routines compiled under hardware enclave.
                  <br />
                  // Consult containment_override.orb and .gitignore for WCC parameters.
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

        {/* Footer */}
        <footer className="max-w-7xl mx-auto w-full p-4 sm:p-6 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900">
          <span>ORBITAL REPO CLUSTER // MIRROR 192.168.1.100</span>
          <span>STAGE [8/9] &bull; SOURCE CODE AUDIT ACTIVE</span>
        </footer>
      </main>
    </StageGuard>
  );
}
