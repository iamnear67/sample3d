"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Radio,
  Terminal,
  Wifi,
  ShieldAlert,
  ArrowRight,
  Activity,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { useGameState } from "../context/GameStateContext";

export default function ProjectorCluePage() {
  const router = useRouter();
  const { unlockNextStage } = useGameState();
  const [currentTime, setCurrentTime] = useState<string>("00:00:00 UTC");
  const [connecting, setConnecting] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.toISOString().substring(11, 19)} UTC // T-SYS.${Math.floor(now.getTime() / 1000) % 10000}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    if (connecting) return;
    setConnecting(true);
    unlockNextStage(2);
    setTimeout(() => {
      router.push("/rebel");
    }, 400);
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100 font-mono flex flex-col justify-between p-4 sm:p-8 lg:p-12 relative overflow-hidden select-none">
      {/* Background ambient grid & lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,182,212,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(2,6,23,0.7)_100%)]" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80" />

      {/* Top Header / Projector Telemetry Bar */}
      <header className="relative z-10 w-full border-b border-slate-800 pb-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-cyan-400 flex items-center gap-2">
                PROJECT ECLIPSE <span className="text-slate-600">//</span> LIVE DIRECTIVE
              </h1>
              <p className="text-xs text-slate-400 tracking-widest uppercase mt-0.5">
                SUB-FREQUENCY 441.90 MHz &bull; ORBITAL LAN DISPATCH BEACON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">GRID: UNSTABLE</span>
            </div>
            <div className="hidden sm:block text-slate-400 tracking-mono">
              {currentTime}
            </div>
          </div>
        </div>
      </header>

      {/* Main Tactical Projection Briefing */}
      <section className="relative z-10 my-auto py-8 sm:py-12 max-w-6xl mx-auto w-full">
        {/* Cinematic Projected System Notice Card */}
        <div className="bg-slate-900/80 border-2 border-cyan-500/70 rounded-2xl p-6 sm:p-10 mb-8 backdrop-blur-md shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-extrabold">
            ORBITAL CO. // INTERNAL SYSTEM NOTICE
          </div>
          <div className="text-2xl sm:text-4xl md:text-5xl font-black text-rose-500 tracking-tight flex items-center justify-center gap-3">
            <ShieldAlert className="h-8 w-8 sm:h-12 sm:w-12 text-rose-500 animate-pulse" />
            <span>PROJECT ECLIPSE &bull; CONNECTION LOST</span>
          </div>
          <div className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-200 font-medium leading-relaxed">
            &ldquo;If you are seeing this, the system has already noticed you.&rdquo;
          </div>
          <div className="inline-block bg-cyan-950/70 border border-cyan-500/80 text-cyan-300 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-widest uppercase animate-pulse">
            START HERE // TERMINAL ADDRESS VECTOR BELOW
          </div>
        </div>

        {/* Urgent Status Banner */}
        <div className="bg-rose-950/30 border border-rose-900/70 rounded-lg p-4 sm:p-5 mb-8 backdrop-blur-sm flex items-start gap-4">
          <div className="p-2 rounded bg-rose-900/30 border border-rose-800 text-rose-400 shrink-0">
            <Activity className="h-6 w-6 text-rose-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                CONTAINMENT BREACH // SECTOR 4 OVERLAY
              </span>
              <span className="text-xs text-slate-400">INCIDENT ID: #ECL-882-BREACH</span>
            </div>
            <p className="text-sm sm:text-base text-rose-200/90 font-medium">
              Containment grid breach detected on local event subnet. Reactor flux stabilization offline.
            </p>
          </div>
        </div>

        {/* In-Universe Briefing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 backdrop-blur-md hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Cpu className="h-4 w-4" /> 01 // TELEMETRY STATUS
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Orbital Corporation primary power regulators have ceased broadcast responses. All remote control nodes are locked under secondary protocol lockdown.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
              CORE VOLTAGE: 14.8 kV &bull; FLUX BIAS: +19.4%
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 backdrop-blur-md hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Radio className="h-4 w-4" /> 02 // CLANDESTINE SIGNAL
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              An unsanctioned relay channel has opened across the internal LAN. Rebel operative cells claim to have captured an interception pipeline on Sector 4.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
              CIPHER: ASYMMETRIC RSA-4096 &bull; BEACON: REBEL-TAP
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 backdrop-blur-md hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Layers className="h-4 w-4" /> 03 // FIELD INSTRUCTION
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Field agents are instructed to establish a terminal bridge with the rebel clandestine cache to extract authorization keys before purge sequence begins.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
              CLEARANCE REQUIRED: STAGE 01 &rarr; STAGE 02
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Projector Infiltration Vector Footer Card */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent" />

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                <Wifi className="h-4 w-4 animate-pulse" />
                <span>ACTIVE BROADCAST VECTOR // SUBNET RELAY</span>
              </div>
              <div
                onClick={handleConnect}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleConnect()}
                className="cursor-pointer inline-flex items-center gap-3 bg-slate-950/80 border border-slate-700/80 hover:border-cyan-500/80 rounded-lg px-4 py-2.5 transition-all text-sm sm:text-lg font-bold text-cyan-300 hover:text-cyan-200"
              >
                <Terminal className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="tracking-wide">INFILTRATION VECTOR: http://192.168.1.100:3000/rebel</span>
              </div>
              <p className="text-xs text-slate-400">
                Connect your operative portable device to this node or trigger the manual gateway override.
              </p>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={handleConnect}
                disabled={connecting}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-950 to-slate-900 hover:from-cyan-900 hover:to-slate-800 text-cyan-300 hover:text-cyan-100 border border-cyan-800 hover:border-cyan-500 font-bold uppercase tracking-wider py-4 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-950/40 text-sm sm:text-base group"
              >
                <span>{connecting ? "CONNECTING GATEWAY..." : "CONNECT GATEWAY"}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono tracking-tight gap-2 pb-2">
          <span>ORBITAL DEFENSE ARCHITECTURE // SEC-LAN-V4</span>
          <span>STAGE [1/9] &bull; READY FOR INGRESS</span>
        </div>
      </footer>
    </main>
  );
}
