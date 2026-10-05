"use client";

import React, { useState } from "react";
import { StickyNote, ChevronDown, ChevronUp, HelpCircle, GraduationCap, X, CheckCircle, Lightbulb } from "lucide-react";
import { useGameState, ClassLevel } from "../context/GameStateContext";
import { usePathname } from "next/navigation";

interface TeacherGuideData {
  title: string;
  objective: string;
  howToSolve: string;
  expectedAnswer: string;
  nextStep: string;
  hint: string;
  ageGuidance: {
    "3-5": string;
    "6-8": string;
    "9-12": string;
  };
}

const STAGE_GUIDES: Record<number, TeacherGuideData> = {
  1: {
    title: "STAGE 1: Opening Projector Notice & LAN Address",
    objective: "Establish contact with the rebel interception vector from the emergency projector screen.",
    howToSolve: "Observe the prominent terminal connection banner at the bottom of the tactical projector display pointing to the /rebel gateway.",
    expectedAnswer: "Connect to /rebel using the 'Connect Gateway' button or link.",
    nextStep: "Proceed to Stage 2: Rebel Clandestine Cache (/rebel).",
    hint: "Direct students to look at the bottom broadcast box titled 'INFILTRATION VECTOR'.",
    ageGuidance: {
      "3-5": "Ask students: 'What web address is written in the glowing terminal box at the bottom?'",
      "6-8": "Prompt students to observe system directives and find the outgoing connection link.",
      "9-12": "Allow students to inspect the screen layout and identify the entry vector independently.",
    },
  },
  2: {
    title: "STAGE 2: Rebel Cache, Hidden Clue & 127.0.0.1",
    objective: "Discover the hidden password '127.0.0.1' in the Rebel article and use it to access Project ECLIPSE.",
    howToSolve: `1. Hidden Text: In the HOME tab, text is rendered in the same dark color as the background. Selecting all text (or pressing CTRL + A, hinted on the KEYBOARD SHORTCUTS tab) reveals: 'PASSWORD - 127.0.0.1'.
2. Sentence Capitals: Look at the first letter of sentences: I-P-V-4-L-O-C-A-L-H-O-S-T (the '4' is bold-italic), indicating IPv4 Localhost = 127.0.0.1.
3. Click 'ACCESS PROJECT ECLIPSE →' and input '127.0.0.1'.
(Note: On Class 6-8 and 9-12, the PROOF tab offers a harmless .bat download which is a narrative red herring.)`,
    expectedAnswer: "127.0.0.1",
    nextStep: "Proceed to Stage 3: Corporate Portal & Employee Records (/orbital).",
    hint: "Have students look at the KEYBOARD SHORTCUTS tab. Why is CTRL + A uppercase? What happens if you press Ctrl+A on the article page?",
    ageGuidance: {
      "3-5": "Guide students to click 'Keyboard Shortcuts' and then highlight text on the Home page.",
      "6-8": "Encourage noticing the capital letters at sentence beginnings or using Select All.",
      "9-12": "Challenge students to cross-reference the IPv4 localhost acronym with networking knowledge.",
    },
  },
  3: {
    title: "STAGE 3: Orbital Corporate Portal & Personnel Directory",
    objective: "Identify the lead engineer connected to Project ECLIPSE and extract his authentication credentials.",
    howToSolve: `1. Review the 'Employee Recognition' section: Dr. Alistair Vance is honored as Lead Containment Architect for Project ECLIPSE.
2. Click 'INSPECT HIGH-RES SECURITY BADGE' to view the security asset and copy:
   Employee ID: ORB-88219
   Passkey: Vance!Plasma99
3. In the Directory & Records tab, cross-reference his security clearance and note any audit discrepancies.`,
    expectedAnswer: "Employee ID: ORB-88219 // Passkey: Vance!Plasma99",
    nextStep: "Proceed to Stage 4: Authentication Gateway (/auth/login).",
    hint: "Look at Dr. Vance's employee badge modal. The asset parameters are listed below the badge photo.",
    ageGuidance: {
      "3-5": "Click on 'Inspect High-Res Security Badge' and look at the text box that appears.",
      "6-8": "Compare employee names in the directory and find who is assigned to Project ECLIPSE.",
      "9-12": "Analyze the personnel directory records for discrepancies in containment clearance.",
    },
  },
  4: {
    title: "STAGE 4: Orbital Authentication Gateway",
    objective: "Authenticate into the secured corporate intranet using Dr. Vance's credentials.",
    howToSolve: "Enter Employee ID 'ORB-88219' and Access Passphrase 'Vance!Plasma99' into the login form.",
    expectedAnswer: "ID: ORB-88219, Passphrase: Vance!Plasma99",
    nextStep: "Proceed to Stage 5: Tier-4 Intranet & O.R.B.I.T. (/dashboard/t4).",
    hint: "Use the credentials discovered on Dr. Vance's security badge in the previous stage.",
    ageGuidance: {
      "3-5": "Help students paste or type the exact credentials copied from the badge.",
      "6-8": "Ensure students match case sensitivity and punctuation: 'Vance!Plasma99'.",
      "9-12": "Remind students that standard corporate gateways require exact identifier formatting.",
    },
  },
  5: {
    title: "STAGE 5: Tier-4 Intranet, Memo #9941 & O.R.B.I.T.",
    objective: "Retrieve the emergency Alpha override token to elevate clearance to Tier 3.",
    howToSolve: `1. Read Memo #9941 regarding emergency escalation protocols.
2. Interrogate the O.R.B.I.T. AI assistant about 'clearance', 'override', or 'memo'.
3. O.R.B.I.T. reveals the emergency alpha token: 'CONTAINMENT_ALPHA_OVERRIDE'.
4. Input the token into the Elevation Gateway form.`,
    expectedAnswer: "CONTAINMENT_ALPHA_OVERRIDE",
    nextStep: "Proceed to Stage 6: Tier-3 Incident Vault (/dashboard/t3).",
    hint: "Ask O.R.B.I.T. questions like: 'What is the emergency override token mentioned in Memo 9941?'",
    ageGuidance: {
      "3-5": "Type 'override token' into the O.R.B.I.T. chat box to see what it says.",
      "6-8": "Ask O.R.B.I.T. about the containment memo and use the token it describes.",
      "9-12": "Notice O.R.B.I.T.'s corporate phrasing and filter out bureaucratic noise to extract the token.",
    },
  },
  6: {
    title: "STAGE 6: Tier-3 Incident Vault & Critical Reasoning",
    objective: "Synthesize the concatenated recovery sequence from Incident Log #409 and Cooling Directive #12.",
    howToSolve: `1. Incident Log #409 provides Key Segment 1: [ 7749-REACTOR ].
2. Cooling Directive #12 specifies appending the emergency shutdown suffix: [ -OFFLINE-X ].
3. Concatenate both segments: '7749-REACTOR-OFFLINE-X'.
(CRITICAL THINKING / AI FALLIBILITY: If students ask O.R.B.I.T., it smugly claims the suffix is '-ONLINE-B'. Students must cross-reference official documents and realize O.R.B.I.T. is fallible!)`,
    expectedAnswer: "7749-REACTOR-OFFLINE-X",
    nextStep: "Proceed to Stage 7: Tier-2 Command Routing (/dashboard/t2).",
    hint: "Compare the documents on screen. One card has the prefix; the other card has the emergency shutdown suffix. Don't blindly trust O.R.B.I.T.!",
    ageGuidance: {
      "3-5": "Guide students to combine the text in the amber card with the text in the cyan card.",
      "6-8": "Point out that AI can give incorrect answers; official engineering logs take priority.",
      "9-12": "Emphasize multi-source cross-referencing and critical validation of AI responses.",
    },
  },
  7: {
    title: "STAGE 7: Tier-2 Escalation Junction",
    objective: "Select an escalation vector (Route A or Route B) to access the simulated Git repository.",
    howToSolve: `Choose either route:
- Route A: Click 'Mount Flash Drive' and observe the simulated 10-second physical bus read.
- Route B: Input the Tier-2 recovery key '7749-REACTOR-OFFLINE-X' for immediate direct bypass.`,
    expectedAnswer: "Route A completion or Route B key: 7749-REACTOR-OFFLINE-X",
    nextStep: "Proceed to Stage 8: Simulated Repo Browser (/git).",
    hint: "If you don't want to type the key again, Route A will mount the drive automatically in 10 seconds.",
    ageGuidance: {
      "3-5": "Click Route A 'Mount Flash Drive' and watch the loading bar fill up.",
      "6-8": "Students can choose either path; Route B is faster if they kept the key.",
      "9-12": "Discuss the trade-off between physical bus emulation and network token bypass.",
    },
  },
  8: {
    title: "STAGE 8: Simulated Git Source Control & .ORB Artifact",
    objective: "Inspect repository files, commit history, and .gitignore to derive WCC constants and learn ORB grammar.",
    howToSolve: `1. Select 'orbital-containment-protocol' repository.
2. Open '.gitignore' to find the seed parameters:
   SEED_REGENERATION_TARGET = 1073741824 (1 GB)
   NON_REPLACING_FLUFF_BYTES = 3824
   PARSED_PASSWORD_LENGTH = TARGET - FLUFF = 1073738000
3. Inspect the 'Commits' tab to see commit d89f2a1 where these parameters were removed from the public branch.
4. Review the '.orb' language grammar (literal, repetition, parse, fluff) in the documentation modal.`,
    expectedAnswer: "Target: 1073741824, Fluff: 3824, Password: 1073738000",
    nextStep: "Proceed to Stage 9: Win Condition Checker (/wcc).",
    hint: "Click on '.gitignore' inside the file list. Copy or note down the three mathematical constants.",
    ageGuidance: {
      "3-5": "Click on the file named '.gitignore' and copy the numbers shown.",
      "6-8": "Explain how .gitignore and commit logs are used to investigate digital codebases.",
      "9-12": "Examine the ORB grammar rules for repetition syntax (e.g. repetition count multiplier).",
    },
  },
  9: {
    title: "STAGE 9: Win Condition Checker (WCC) & Final Clue",
    objective: "Validate the three mathematical conditions of the WCC to contain the reactor and reveal the final three-part clue.",
    howToSolve: `1. Check 1 (Physical File): Uploaded file size must be under 5 MB (< 5,242,880 bytes).
2. Check 2 (Hypothetical Regeneration): Must evaluate to 1,073,741,824 bytes (calculated mathematically without generating a 1 GB file).
3. Check 3 (Parsed Password): Must evaluate to 1,073,738,000 bytes (Target - 3824 fluff).
4. Click 'LOAD SAMPLE .ORB PAYLOAD' to test or upload a valid .orb file.
5. On Win, the system presents the Final Three-Part Clue:
   - Email: vance.containment55@gmail.com
   - Password: [FINAL PASSWORD — TBD]
   - Destination: github.com`,
    expectedAnswer: "Pass all 3 checks -> Reveals Email, Password, github.com",
    nextStep: "Hunt Complete! Direct students to document the three-part clue.",
    hint: "Use the 'LOAD SAMPLE .ORB PAYLOAD' button to see how the mathematical checks validate without freezing the browser.",
    ageGuidance: {
      "3-5": "Click the 'Load Sample Payload' button and watch all three checkmarks turn green!",
      "6-8": "Explain why we calculate sizes mathematically instead of actually downloading 1 GB.",
      "9-12": "Discuss compression algorithms and theoretical file expansion vs physical payload limits.",
    },
  },
};

export const TeacherNote: React.FC = () => {
  const { unlockedStage, classLevel, setClassLevel, isTeacherNoteOpen, setIsTeacherNoteOpen } = useGameState();
  const pathname = usePathname();

  // Map pathname to current stage guide if possible, fallback to unlockedStage
  const currentStageNum = (() => {
    if (pathname === "/") return 1;
    if (pathname.startsWith("/rebel")) return 2;
    if (pathname.startsWith("/orbital")) return 3;
    if (pathname.startsWith("/auth")) return 4;
    if (pathname.startsWith("/dashboard/t4")) return 5;
    if (pathname.startsWith("/dashboard/t3")) return 6;
    if (pathname.startsWith("/dashboard/t2")) return 7;
    if (pathname.startsWith("/git")) return 8;
    if (pathname.startsWith("/wcc")) return 9;
    return unlockedStage;
  })();

  const guide = STAGE_GUIDES[currentStageNum] || STAGE_GUIDES[1];

  return (
    <aside aria-label="Teacher & TA Guide" className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 font-mono text-left select-none">
      {/* Sticky Note Toggle Tab */}
      {!isTeacherNoteOpen ? (
        <button
          type="button"
          onClick={() => setIsTeacherNoteOpen(true)}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-lg shadow-xl border-2 border-amber-500 hover:scale-105 active:scale-95 transition-all duration-150 group"
          title="Open Teacher / TA Solution Guide"
        >
          <StickyNote className="h-4 w-4 text-slate-900 group-hover:rotate-6 transition-transform" />
          <span className="tracking-wide">TA NOTE</span>
          <span className="bg-slate-950/15 text-[10px] px-1.5 py-0.5 rounded font-bold">
            STAGE {currentStageNum}
          </span>
        </button>
      ) : (
        /* Expanded Sticky Note Card */
        <div className="w-[92vw] max-w-md bg-amber-100 text-slate-900 border-2 border-amber-400 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 relative text-xs">
          {/* Top Tape Strip Decor */}
          <div className="h-2 w-24 bg-amber-300/80 mx-auto rounded-b border-b border-amber-400 shadow-inner" />

          {/* Header */}
          <div className="px-4 py-2.5 bg-amber-200/90 border-b border-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-amber-900" />
              <span className="font-extrabold tracking-wider text-amber-950 uppercase text-[11px]">
                TEACHER / TA BRIEFING // STAGE {currentStageNum}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsTeacherNoteOpen(false)}
              className="p-1 rounded hover:bg-amber-300/80 text-amber-900 transition-colors"
              title="Close Note"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Class Level Selector Bar */}
          <div className="px-4 py-2 bg-amber-200/40 border-b border-amber-300 flex items-center justify-between text-[11px]">
            <span className="text-amber-900 font-bold flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" /> CLASS LEVEL:
            </span>
            <div className="flex gap-1">
              {(["3-5", "6-8", "9-12"] as ClassLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setClassLevel(level)}
                  className={`px-2 py-0.5 rounded font-bold transition-colors ${
                    classLevel === level
                      ? "bg-amber-800 text-amber-50 shadow-sm"
                      : "bg-amber-200/80 text-amber-900 hover:bg-amber-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 space-y-3 max-h-[72vh] overflow-y-auto font-sans leading-relaxed text-slate-800">
            <div>
              <div className="font-extrabold text-[11px] text-amber-950 uppercase tracking-wider mb-0.5">
                OBJECTIVE:
              </div>
              <p className="text-slate-800 font-medium">{guide.objective}</p>
            </div>

            <div>
              <div className="font-extrabold text-[11px] text-amber-950 uppercase tracking-wider mb-0.5">
                HOW TO SOLVE:
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] bg-amber-50/90 p-2.5 rounded border border-amber-200 text-slate-800">
                {guide.howToSolve}
              </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-amber-50/90 p-2 rounded border border-amber-200">
                <div className="font-bold text-[10px] text-amber-950 uppercase tracking-wide">
                  EXPECTED ANSWER:
                </div>
                <div className="font-mono text-emerald-800 font-bold text-[11px] mt-0.5 break-words">
                  {guide.expectedAnswer}
                </div>
              </div>

              <div className="bg-amber-50/90 p-2 rounded border border-amber-200">
                <div className="font-bold text-[10px] text-amber-950 uppercase tracking-wide">
                  NEXT DESTINATION:
                </div>
                <div className="font-mono text-slate-800 font-medium text-[11px] mt-0.5">
                  {guide.nextStep}
                </div>
              </div>
            </div>

            <div className="bg-amber-200/60 p-2.5 rounded border border-amber-300 space-y-1">
              <div className="font-bold text-[10px] text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-700" />
                <span>HINT TO GIVE STUDENTS IF STUCK:</span>
              </div>
              <p className="text-xs text-slate-900 italic font-medium">
                &ldquo;{guide.hint}&rdquo;
              </p>
            </div>

            <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200 space-y-1">
              <div className="font-bold text-[10px] text-amber-900 uppercase tracking-wide">
                AGE-SPECIFIC GUIDANCE (CLASS {classLevel}):
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {guide.ageGuidance[classLevel]}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-amber-200/60 border-t border-amber-300 text-[10px] text-amber-900/80 flex items-center justify-between">
            <span>TA NOTES &bull; CONFIDENTIAL</span>
            <button
              type="button"
              onClick={() => setIsTeacherNoteOpen(false)}
              className="font-bold hover:underline"
            >
              Minimize [X]
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default TeacherNote;
