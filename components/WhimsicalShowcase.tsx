"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Smile, 
  Flame, 
  Heart, 
  Wand2, 
  Palette, 
  Bug, 
  Copy, 
  Check, 
  Rocket, 
  Gift, 
  Layers
} from "lucide-react";

export const WhimsicalShowcase: React.FC = () => {
  const [mascotMood, setMascotMood] = useState<"happy" | "thinking" | "celebrating" | "alarmed">("happy");
  const [graphicStyle, setGraphicStyle] = useState<"doodle" | "vector" | "pixel">("vector");
  const [copiedCode, setCopiedCode] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const triggerCelebration = () => {
    setConfettiActive(true);
    setMascotMood("celebrating");
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(`<WhimsicalBadge mood="${mascotMood}" style="${graphicStyle}" />`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-20 relative">
      {/* Confetti Explosion Overlay */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div className="text-6xl animate-bounce">🎉 🎈 ✨ 🌟 🚀 🥳</div>
        </div>
      )}

      {/* Header Banner */}
      <div 
        className="rounded-3xl p-8 border relative overflow-hidden bg-gradient-to-br from-indigo-900/10 via-purple-900/10 to-pink-900/10"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20 mb-3">
            <Sparkles size={13} className="text-amber-300" />
            Whimsical Graphics Laboratory
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            Ziki Whimsical Ideas & Graphics
          </h1>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text2)" }}>
            This sandbox is built for designing, testing, and demonstrating playful graphics for Ziki. 
            When you and your tutor brainstorm graphic ideas, you can slot them directly into this showcase and preview them live!
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none animate-float">
          ✨
        </div>
      </div>

      {/* Interactive Mascot Studio */}
      <div 
        className="rounded-3xl p-6 border transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--text)" }}>
              <span>1. Ziki Mascot Studio</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                Interactive SVG
              </span>
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Change moods or trigger actions to preview animated whimsical expressions.
            </p>
          </div>

          {/* Mood Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "happy", label: "Happy & Ready", icon: "😊" },
              { id: "thinking", label: "Investigating Bug", icon: "🧐" },
              { id: "celebrating", label: "Task Solved!", icon: "🎉" },
              { id: "alarmed", label: "Critical Alarm", icon: "🚨" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMascotMood(m.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mascotMood === m.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
                style={{ borderColor: "var(--border)" }}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mascot Character Stage */}
        <div className="flex flex-col lg:flex-row items-center justify-around p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/80 dark:to-slate-950/80 border border-dashed border-slate-300 dark:border-slate-800 gap-8">
          {/* Animated SVG Mascot */}
          <div className="flex flex-col items-center">
            <div className={`relative transition-transform duration-500 ${mascotMood === "celebrating" ? "animate-bounce" : "animate-float"}`}>
              {/* Mascot Body */}
              <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glow Backdrop */}
                <circle cx="100" cy="100" r="90" fill="url(#mascotGlow)" opacity="0.25" />
                
                {/* Antennas / Robot Ears */}
                <path d="M75 55 L65 25" stroke="#3978F6" strokeWidth="6" strokeLinecap="round" />
                <circle cx="63" cy="23" r="8" fill="#FF6584" className="animate-pulse" />
                
                <path d="M125 55 L135 25" stroke="#3978F6" strokeWidth="6" strokeLinecap="round" />
                <circle cx="137" cy="23" r="8" fill="#FFD166" className="animate-pulse" />

                {/* Head Body */}
                <rect x="40" y="50" width="120" height="110" rx="45" fill="url(#mascotGradient)" />
                <rect x="44" y="54" width="112" height="102" rx="41" stroke="white" strokeOpacity="0.4" strokeWidth="3" />

                {/* Visor Screen */}
                <rect x="55" y="70" width="90" height="50" rx="20" fill="#070F22" />

                {/* Eyes depending on mood */}
                {mascotMood === "happy" && (
                  <>
                    <circle cx="80" cy="95" r="9" fill="#06D6A0" />
                    <circle cx="120" cy="95" r="9" fill="#06D6A0" />
                    <circle cx="82" cy="92" r="3" fill="white" />
                    <circle cx="122" cy="92" r="3" fill="white" />
                  </>
                )}

                {mascotMood === "thinking" && (
                  <>
                    <path d="M72 90 Q80 84 88 90" stroke="#FFD166" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="120" cy="95" r="9" fill="#FFD166" />
                    {/* Monocle */}
                    <circle cx="120" cy="95" r="14" stroke="#3978F6" strokeWidth="3" fill="none" />
                    <line x1="130" y1="105" x2="140" y2="120" stroke="#3978F6" strokeWidth="3" />
                  </>
                )}

                {mascotMood === "celebrating" && (
                  <>
                    <path d="M72 95 Q80 83 88 95" stroke="#FF6584" strokeWidth="5" strokeLinecap="round" />
                    <path d="M112 95 Q120 83 128 95" stroke="#FF6584" strokeWidth="5" strokeLinecap="round" />
                    {/* Cheeks */}
                    <circle cx="68" cy="102" r="5" fill="#FF6584" opacity="0.6" />
                    <circle cx="132" cy="102" r="5" fill="#FF6584" opacity="0.6" />
                  </>
                )}

                {mascotMood === "alarmed" && (
                  <>
                    <circle cx="80" cy="95" r="11" fill="#FF6584" />
                    <circle cx="120" cy="95" r="11" fill="#FF6584" />
                    <circle cx="80" cy="95" r="4" fill="white" />
                    <circle cx="120" cy="95" r="4" fill="white" />
                  </>
                )}

                {/* Cheerful Smile */}
                <path 
                  d={
                    mascotMood === "celebrating" 
                      ? "M85 135 Q100 150 115 135" 
                      : mascotMood === "alarmed"
                      ? "M90 140 Q100 132 110 140"
                      : "M88 135 Q100 145 112 135"
                  } 
                  stroke={mascotMood === "alarmed" ? "#FF6584" : "#8FC9FF"} 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  fill="none" 
                />

                {/* Bowtie / Badge */}
                <path d="M92 165 L108 165 L100 174 Z" fill="#FF6584" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="mascotGradient" x1="40" y1="50" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3978F6" />
                    <stop offset="1" stopColor="#0B1733" />
                  </linearGradient>
                  <radialGradient id="mascotGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) scale(90)">
                    <stop stopColor="#3978F6" />
                    <stop offset="1" stopColor="#3978F6" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <div className="text-center mt-3">
              <span className="font-extrabold text-base" style={{ color: "var(--text)" }}>
                "Zikibot" — Whimsical Mascot
              </span>
              <p className="text-xs text-slate-400">
                Reacts dynamically when issues are created, assigned, or solved!
              </p>
            </div>
          </div>

          {/* Action Trigger Box */}
          <div className="flex flex-col gap-4 max-w-sm w-full">
            <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Try Interactive Effects</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 mb-3">
                Experience celebratory graphics for when a user or AI agent finishes a task:
              </p>
              <button
                type="button"
                onClick={triggerCelebration}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-lg shadow-pink-500/25 hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                <Gift size={16} />
                <span>Simulate Task Solved Confetti!</span>
              </button>
            </div>

            {/* Quick Snippet Box */}
            <div className="p-4 rounded-xl border bg-slate-950 text-slate-300 font-mono text-xs" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Reusable Component</span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="text-[11px] text-blue-400 hover:text-white flex items-center gap-1"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <code className="block pt-2 text-[11px] text-emerald-400">
                {`<WhimsicalBadge mood="${mascotMood}" />`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Whimsical Severity Badges Concept */}
      <div 
        className="rounded-3xl p-6 border transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
          2. Playful Bug Severity Graphic Badges
        </h2>
        <p className="text-xs mb-6" style={{ color: "var(--muted)" }}>
          Instead of plain text badges, whimsical illustrations convey urgency with personality:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Badge 1: Low */}
          <div className="p-5 rounded-2xl border flex flex-col items-center text-center gap-3 bg-emerald-500/5 border-emerald-500/20">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl shadow-sm border border-emerald-500/30">
              🌱
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Low Severity
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                "Gentle Sprout"
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Minor cosmetic glitches or tiny text improvements. Zero panic needed!
              </p>
            </div>
          </div>

          {/* Badge 2: Medium */}
          <div className="p-5 rounded-2xl border flex flex-col items-center text-center gap-3 bg-amber-500/5 border-amber-500/20">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl shadow-sm border border-amber-500/30">
              🐝
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Medium Severity
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                "Spicy Hornet"
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Functional quirks or intermittent bugs that give a little sting.
              </p>
            </div>
          </div>

          {/* Badge 3: High */}
          <div className="p-5 rounded-2xl border flex flex-col items-center text-center gap-3 bg-red-500/5 border-red-500/20">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-3xl shadow-sm border border-red-500/30">
              🔥
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                Critical / High
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                "Fire Dragon"
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                App crashes or blocker bugs. All hands on deck to extinguish!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Review Checklist */}
      <div 
        className="rounded-3xl p-6 border transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: "var(--text)" }}>
          <Rocket size={20} className="text-blue-500" />
          <span>3. Ready for Tutor Review & Next Steps</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4">
          <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900" style={{ borderColor: "var(--border)" }}>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
              ✓ Localhost Demonstration
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Run <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">pnpm dev</code> to show this entire working mockup to your tutor on <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[11px]">localhost:3000</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-900" style={{ borderColor: "var(--border)" }}>
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1">
              ✓ 1-Click Vercel Deployment
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Zero database setup needed. Pushing to GitHub means you can import it into Vercel and get a public live URL instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
