"use client";

import React, { useState } from "react";
import { InteractiveCompanion, type AgentState } from "./whimsical/InteractiveCompanion";
import { LuckyDice } from "./whimsical/LuckyDice";
import { WhimsicalBot, WHIMSICAL_BOTS } from "./whimsical/botData";
import { 
  Sparkles, 
  Eye, 
  Gamepad2, 
  Bot, 
  Check,
  ChevronRight
} from "lucide-react";

interface WhimsicalShowcaseProps {
  selectedBot: WhimsicalBot;
  onSelectBot: (bot: WhimsicalBot) => void;
}

export const WhimsicalShowcase: React.FC<WhimsicalShowcaseProps> = ({
  selectedBot,
  onSelectBot,
}) => {
  const [showcaseState, setShowcaseState] = useState<AgentState>("hunting");
  const [selectedBounty, setSelectedBounty] = useState<any>(null);

  return (
    <div className="flex flex-col gap-8 pb-24 max-w-6xl mx-auto animate-in fade-in duration-300">
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
            Ziki Agent Companions & Lucky Dice
          </h1>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text2)" }}>
            Delightful, game-inspired companion bots with real-time cursor-tracking eyes, customized personas, 3D lucky task dice, and dynamic avatar status badges.
          </p>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-6 top-6 text-7xl opacity-20 pointer-events-none animate-float select-none">
          🎲 ✨
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Cursor-Tracking Agent Companion */}
        <div 
          className="lg:col-span-6 rounded-3xl border p-6 flex flex-col gap-5 shadow-sm transition-all"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--divider)" }}>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold shadow-sm transition-colors"
                style={{ backgroundColor: selectedBot.primaryColor }}
              >
                <Eye size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "var(--text)" }}>
                  <span>Cursor-Tracking Companion</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold border" style={{ borderColor: selectedBot.glowColor, color: selectedBot.glowColor }}>
                    {selectedBot.name}
                  </span>
                </h2>
                <span className="text-[11px] text-slate-400">Eyes follow your mouse in real time</span>
              </div>
            </div>

            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1"
              style={{
                backgroundColor: `${selectedBot.primaryColor}15`,
                color: selectedBot.primaryColor,
                borderColor: `${selectedBot.primaryColor}30`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: selectedBot.primaryColor }} />
              Active
            </span>
          </div>

          {/* Interactive Robot with Mouse Tracking */}
          <div className="py-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <InteractiveCompanion
              size="lg"
              state={showcaseState}
              onStateChange={setShowcaseState}
              showBubble={true}
              bot={selectedBot}
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
                      ? "text-white shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                  style={{
                    backgroundColor: showcaseState === m.id ? selectedBot.primaryColor : undefined,
                    borderColor: showcaseState === m.id ? selectedBot.primaryColor : undefined,
                  }}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lucky Task Dice & 7 Whimsical Companion Bots Selector */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Lucky Task Dice */}
          <LuckyDice onPickBounty={(b) => setSelectedBounty(b)} />

          {/* 7 Whimsical Companion Bots Selection Grid (Beside Cursor-Tracking Agent) */}
          <div 
            className="rounded-3xl border p-6 flex flex-col gap-4 shadow-sm transition-all"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--divider)" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
                    Whimsical Companion Bots ({WHIMSICAL_BOTS.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">Click any companion to activate persona and header status</span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {selectedBot.name} Selected
              </span>
            </div>

            {/* List of 7 Whimsical Bots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WHIMSICAL_BOTS.map((bot) => {
                const isSelected = selectedBot.id === bot.id;
                return (
                  <button
                    key={bot.id}
                    type="button"
                    onClick={() => onSelectBot(bot)}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 relative group ${
                      isSelected
                        ? "shadow-md"
                        : "hover:scale-[1.02] hover:shadow-sm"
                    }`}
                    style={{
                      borderColor: isSelected ? bot.primaryColor : "var(--border)",
                      backgroundColor: isSelected 
                        ? (typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "#1e293b" : "#f8fafc")
                        : "var(--chip)",
                      boxShadow: isSelected ? `0 0 0 2px ${bot.primaryColor}40` : undefined,
                    }}
                  >
                    {/* Bot Icon with Distinct Color & Symbol */}
                    <div 
                      className="w-10 h-10 rounded-2xl text-white flex items-center justify-center text-lg shrink-0 shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: bot.primaryColor }}
                    >
                      <span>{bot.symbol}</span>
                    </div>

                    {/* Bot Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black truncate" style={{ color: "var(--text)" }}>
                          {bot.name}
                        </span>
                        {isSelected && (
                          <span 
                            className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] shrink-0"
                            style={{ backgroundColor: bot.primaryColor }}
                          >
                            <Check size={10} strokeWidth={3} />
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] font-bold truncate mt-0.5" style={{ color: bot.primaryColor }}>
                        {bot.role}
                      </p>

                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 leading-tight">
                        {bot.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
