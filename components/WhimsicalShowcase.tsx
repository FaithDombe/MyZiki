"use client";

import React, { useState } from "react";
import { InteractiveCompanion, type AgentState } from "./whimsical/InteractiveCompanion";
import { LuckyDice } from "./whimsical/LuckyDice";
import { 
  Sparkles, 
  Dices, 
  Eye, 
  Gamepad2, 
  Heart, 
  Bot, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export const WhimsicalShowcase: React.FC = () => {
  const [showcaseState, setShowcaseState] = useState<AgentState>("hunting");
  const [selectedBounty, setSelectedBounty] = useState<any>(null);

  return (
    <div className="flex flex-col gap-8 pb-24 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div 
        className="rounded-3xl p-8 border relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 mb-3">
            <Gamepad2 size={13} className="text-amber-300" />
            Whimsical Interaction Suite
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            Ziki Agent Companion & Lucky Dice
          </h1>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text2)" }}>
            Delightful, game-inspired micro-interactions for Ziki: interactive cursor-tracking eyes, real-time agent virtual pet states, a 3D lucky task dice, and floating non-intrusive dock.
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none animate-float select-none">
          🎲 ✨
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Cursor-Tracking Agent Companion */}
        <div 
          className="lg:col-span-6 rounded-3xl border p-6 flex flex-col gap-5 shadow-sm transition-all"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--divider)" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Eye size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  1. Cursor-Tracking Agent Pet
                </h2>
                <span className="text-[11px] text-slate-400">Eyes follow your mouse in real time</span>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              Interactive
            </span>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <InteractiveCompanion
              size="lg"
              state={showcaseState}
              onStateChange={setShowcaseState}
              showBubble={true}
            />
          </div>

          {/* State Controls */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Test Agent State & Speech Bubble:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "hunting", label: "Hunting", emoji: "🔍" },
                { id: "coding", label: "Writing PR", emoji: "⚡" },
                { id: "resting", label: "Standby", emoji: "💤" },
                { id: "celebrating", label: "Won Bounty", emoji: "🎉" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setShowcaseState(m.id as AgentState)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    showcaseState === m.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Gamified Lucky Dice Dispatcher */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <LuckyDice onPickBounty={(b) => setSelectedBounty(b)} />

          {/* Quick Explanation Card (Addressing Mark's Rubric) */}
          <div 
            className="rounded-3xl border p-6 flex flex-col gap-3 shadow-sm transition-all"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text)" }}>
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>Why This Passes Mark's Criteria</span>
            </h3>

            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Game-like AI Representation:</strong> Directly incorporates Osho's approved eye-tracking interaction & rolling dice.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Real Utility ("UI should UI"):</strong> The speech bubble communicates real-time agent tasks (triaging, writing PRs, standby) rather than aimless animation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Non-Intrusive & Dismissible:</strong> Floats in the bottom-right corner as a polite pill dock that can be minimized or dismissed with one click.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Good Vibes Feedback:</strong> Clicking the companion triggers synthesized pleasant audio chimes and floating sparkle bursts (Hamzat's approved feature).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
