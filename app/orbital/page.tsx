"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Award,
  Lock,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Activity,
  Layers,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Users,
  ChevronRight,
  ExternalLink,
  KeyRound,
  FileCheck,
  Flame,
} from "lucide-react";
import { StageGuard } from "../../components/StageGuard";
import { useGameState } from "../../context/GameStateContext";

export default function OrbitalPublicPage() {
  const { unlockNextStage } = useGameState();
  const [activeTab, setActiveTab] = useState<"home" | "about" | "solutions" | "employee" | "contact">("home");
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);

  useEffect(() => {
    // Unlock stage 4 (employee login)
    unlockNextStage(4);
  }, [unlockNextStage]);

  const copyToClipboard = (text: string, type: "id" | "pass") => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const scrollToSection = (tab: "home" | "about" | "solutions" | "employee" | "contact") => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StageGuard stageNumber={3}>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        {/* Subtle Ambient Background Gradients */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(2,6,23,0.8)_100%)]" />

        {/* Corporate Top Navigation Header */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-slate-100 flex items-center gap-1.5">
                  ORBITAL <span className="text-cyan-400 font-black">CORP</span>
                </span>
                <span className="block text-[10px] text-slate-400 tracking-widest uppercase font-mono">
                  Advanced Fusion Dynamics
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === "home"
                    ? "bg-slate-800 text-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900"
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === "about"
                    ? "bg-slate-800 text-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900"
                }`}
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("solutions")}
                className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === "solutions"
                    ? "bg-slate-800 text-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900"
                }`}
              >
                Our Solutions
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("employee")}
                className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === "employee"
                    ? "bg-cyan-950/80 border border-cyan-700 text-cyan-300 font-bold"
                    : "text-amber-300 hover:text-amber-200 hover:bg-amber-950/30"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>Star Employee</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                  activeTab === "contact"
                    ? "bg-slate-800 text-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900"
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Employee Intranet Login CTA */}
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-600/20 hover:shadow-cyan-500/30"
              >
                <Lock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Employee Login</span>
                <span className="sm:hidden">Login</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION (HOME) */}
        <section id="home" className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                Tier-4 Clean Fusion Infrastructure
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-tight">
                Powering Tomorrow With{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                  Zero-Emission Fusion
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-normal">
                Orbital Corporation operates next-generation magnetic containment reactors worldwide. Delivering reliable, safe, and carbon-free energy to sovereign grids and critical infrastructure.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("employee")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
                >
                  <Award className="h-4 w-4" />
                  <span>Meet Star Employee</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("solutions")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
                >
                  <Zap className="h-4 w-4 text-cyan-400" />
                  <span>Explore Our Solutions</span>
                </button>
                <Link
                  href="/auth/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 font-bold text-xs sm:text-sm transition-all"
                >
                  <Lock className="h-4 w-4" />
                  <span>Staff Portal</span>
                </Link>
              </div>

              {/* Metrics / Key Corporate Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">4.8 GW</div>
                  <div className="text-xs text-slate-400 mt-1">Clean Plasma Output</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">99.999%</div>
                  <div className="text-xs text-slate-400 mt-1">Containment Uptime</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">18</div>
                  <div className="text-xs text-slate-400 mt-1">Global Research Nodes</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">Tier 4</div>
                  <div className="text-xs text-slate-400 mt-1">Certified Failsafe Grid</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT US SECTION */}
        <section id="about" className="relative z-10 py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  <Globe className="h-4 w-4" /> About Orbital Corporation
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-snug">
                  Engineering Zero-Harm, Limitless Energy For The Planet
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Established in 2012, Orbital Corporation has pioneered the development of high-density magnetic confinement fusion reactors. Our proprietary magnetic shield dampening technology enables sustainable fusion reactions at 150 million degrees Celsius without material degradation.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Zero Radioactive Waste</h4>
                      <p className="text-xs text-slate-400">Pure deuterium-helium3 reaction cycles generate harmless helium emissions with zero long-lived radioactive byproducts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Triple-Redundant Tier-4 Containment</h4>
                      <p className="text-xs text-slate-400">Automated failsafe magnetic dampers isolate localized anomalies in under 4 milliseconds.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Global Energy Grid Synchronization</h4>
                      <p className="text-xs text-slate-400">Direct integration into high-voltage municipal grids across North America, Europe, and Asia-Pacific.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphical Corporate Overview Card */}
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Mission Statement</span>
                        <h3 className="text-lg font-bold text-slate-100 mt-1">Our Core Commitment</h3>
                      </div>
                      <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                        <Flame className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                      &ldquo;To unlock boundless energy through unyielding engineering rigor, absolute transparency, and unprecedented containment safety standards for all generations.&rdquo;
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400">Headquarters</div>
                        <div className="text-sm font-semibold text-slate-200 mt-0.5">Sector 4 Technological Campus</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Total Workforce</div>
                        <div className="text-sm font-semibold text-slate-200 mt-0.5">2,400+ Fusion Engineers</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Operational Subnets</div>
                        <div className="text-sm font-semibold text-slate-200 mt-0.5">Tier 1 through Tier 4</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Safety Verification</div>
                        <div className="text-sm font-semibold text-emerald-400 mt-0.5">ISO 9001 / IEC 61508</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR SOLUTIONS SECTION */}
        <section id="solutions" className="relative z-10 py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
                <Cpu className="h-4 w-4" /> Enterprise Capabilities
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Integrated Fusion Energy Solutions
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                End-to-end plasma generation, containment safeguards, and autonomous grid distribution platforms engineered for mission-critical reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Solution 1 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/60 transition-all group backdrop-blur-sm space-y-4">
                <div className="h-12 w-12 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Magnetic Confinement</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-temperature superconducting magnetic fields capable of stabilizing 150M °C plasma cores with zero wall contact.
                </p>
                <div className="pt-2 text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1">
                  <span>99.98% Field Efficiency</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Solution 2 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/60 transition-all group backdrop-blur-sm space-y-4">
                <div className="h-12 w-12 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Failsafe Containment</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Triple-tier automated damper architecture. Fail-closed pneumatic gates isolate reactor segments upon abnormal flux detection.
                </p>
                <div className="pt-2 text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1">
                  <span>Tier-4 Defense Verified</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Solution 3 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/60 transition-all group backdrop-blur-sm space-y-4">
                <div className="h-12 w-12 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-100">AI Reactor Telemetry</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Neural network telemetry monitoring over 250,000 thermal and magnetic sensors in real-time, predicting micro-flux variance.
                </p>
                <div className="pt-2 text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1">
                  <span>Sub-Millisecond Response</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Solution 4 */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/60 transition-all group backdrop-blur-sm space-y-4">
                <div className="h-12 w-12 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Grid Synchronization</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct Ultra-High Voltage DC converters connecting tokamak fusion energy directly to metropolitan energy distribution rings.
                </p>
                <div className="pt-2 text-[11px] text-cyan-400 font-mono font-semibold flex items-center gap-1">
                  <span>4.8 GW Max Transmission</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. STAR EMPLOYEE SECTION (SOLOMON HIGGS - TIER 4) */}
        <section id="employee" className="relative z-10 py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/80 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Annual Corporate Recognition</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Star Employee Spotlight
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Recognizing distinguished technical achievement and leadership in containment safety architecture.
              </p>
            </div>

            {/* Featured Star Employee Showcase Card */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border-2 border-cyan-500/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Employee Picture Column */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative group">
                    {/* Glowing Picture Frame */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <div className="relative h-64 w-64 rounded-xl overflow-hidden border-2 border-cyan-400 bg-slate-900 shadow-2xl">
                      <Image
                        src="/images/solomon-higgs.jpg"
                        alt="Solomon Higgs - Star Employee"
                        width={256}
                        height={256}
                        priority
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Verification Tag */}
                  <div className="mt-4 flex items-center gap-2 bg-slate-900/90 border border-emerald-500/80 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400 shadow">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verified Tier 4 Active Employee</span>
                  </div>
                </div>

                {/* Employee Details Column */}
                <div className="md:col-span-7 space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-[11px] font-bold uppercase mb-2">
                      Star Employee &bull; Tier 4 Clearance
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                      Solomon Higgs
                    </h3>
                    <p className="text-sm font-semibold text-cyan-400 mt-1">
                      Lead Fusion Reactor Specialist &bull; Containment Architecture
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Awarded Star Employee of the Year for outstanding leadership on Project ECLIPSE. Operating under highest Tier-4 classified clearance, Solomon Higgs engineered the automated emergency containment damper routines that maintain grid equilibrium across Sector 4.
                  </p>

                  {/* High Security Credentials Card */}
                  <div className="bg-slate-950/90 border border-cyan-900/80 rounded-xl p-4 sm:p-5 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                        <KeyRound className="h-4 w-4" /> Intranet Access Parameters
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        TIER 4 CLEARANCE
                      </span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      {/* Employee ID Row */}
                      <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded border border-slate-800">
                        <div>
                          <span className="text-slate-400 text-[11px]">EMPLOYEE ID: </span>
                          <span className="text-cyan-300 font-bold select-all">@solomonhiggs</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("@solomonhiggs", "id")}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
                        >
                          {copiedId ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId ? "Copied" : "Copy"}</span>
                        </button>
                      </div>

                      {/* Password Row */}
                      <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded border border-slate-800">
                        <div>
                          <span className="text-slate-400 text-[11px]">PASSWORD: </span>
                          <span className="text-emerald-300 font-bold select-all">@fryit123</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("@fryit123", "pass")}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
                        >
                          {copiedPass ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedPass ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Proceed to Intranet CTA Button */}
                  <div className="pt-2">
                    <Link
                      href="/auth/login"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-600/30 transition-all group"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Authenticate Solomon Higgs In Employee Login &rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="relative z-10 py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  <Mail className="h-4 w-4" /> Connect With Orbital
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                  Contact Our Corporate Office
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Have questions about our fusion containment systems or corporate partnerships? Get in touch with our executive relations team.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Global Headquarters</h4>
                      <p className="text-xs text-slate-400">400 Orbital Way, Sector 4 Research District, ORB-98001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Direct Inquiries</h4>
                      <p className="text-xs text-slate-400">inquiries@orbitalenergy.corp &bull; press@orbitalenergy.corp</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Corporate Dispatch</h4>
                      <p className="text-xs text-slate-400">+1 (800) 555-ORBIT (Mon-Fri 08:00 - 18:00 UTC)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">Send a Corporate Message</h3>

                  {contactSubmitted ? (
                    <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-700 text-emerald-300 text-center space-y-2 animate-in fade-in">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-400" />
                      <h4 className="font-bold text-base">Message Dispatched Successfully</h4>
                      <p className="text-xs text-emerald-300/80">
                        Thank you for reaching out. An Orbital representative will review your inquiry shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-slate-400 font-semibold block">Your Name</label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="e.g. Elena Rostova"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 font-semibold block">Corporate Email</label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="name@organization.com"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-400 font-semibold block">Subject</label>
                        <input
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="e.g. Containment Grid Consultation"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-400 font-semibold block">Message Body</label>
                        <textarea
                          rows={4}
                          required
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Provide details regarding your technical inquiry..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        <span>Transmit Message</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-10 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-500" />
              <span>&copy; 2026 Orbital Corporation. All Rights Reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/auth/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold">
                <Lock className="h-3.5 w-3.5" />
                <span>Employee Intranet</span>
              </Link>
              <span>&bull;</span>
              <span>Stage [3/9] Public Portal</span>
            </div>
          </div>
        </footer>
      </div>
    </StageGuard>
  );
}
