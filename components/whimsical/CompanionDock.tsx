"use client";

import React, { useState } from "react";
import { InteractiveCompanion, type AgentState } from "./InteractiveCompanion";
import { LuckyDice } from "./LuckyDice";
import { Sparkles, Minus, X, Maximize2, Bot, ChevronUp, ChevronDown } from "lucide-react";

export const CompanionDock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [agentState, setAgentState] = useState<AgentState>("hunting");
  const [activeTab, setActiveTab] = useState<"companion" | "dice">("companion");
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={() => setDismissed(false)}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xl hover:scale-105 transition-transform flex items-center gap-1.5"
        title="Re-open Ziki Companion"
      >
        <Bot size={13} />
        <span>Companion 🐾</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {!isExpanded ? (
        /* Collapsed Non-Intrusive Pill Dock (Mark's requirement for dismissible/subtle UI) */
        <div 
          className="flex items-center gap-2 p-1.5 pr-3 rounded-full border shadow-xl backdrop-blur-md transition-all hover:scale-102"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2"
          >
            {/* Mini companion head */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              Zi
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold leading-tight" style={{ color: "var(--text)" }}>
                Ziki Companion
              </span>
              <span className="text-[9px] text-emerald-500 font-semibold leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active Tracker
              </span>
            </div>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

          {/* Quick Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="text-slate-400 hover:text-blue-500 transition"
            title="Expand playful companion"
          >
            <ChevronUp size={15} />
          </button>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-red-500 transition ml-0.5"
            title="Dismiss from screen"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        /* Expanded Game-Like Floating Dock */
        <div 
          className="w-[320px] rounded-3xl border shadow-2xl backdrop-blur-md overflow-hidden flex flex-col transition-all animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {/* Dock Header */}
          <div 
            className="p-3 border-b flex items-center justify-between"
            style={{ borderColor: "var(--divider)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
                Agent Companion & Dice
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Tab Toggles */}
              <button
                type="button"
                onClick={() => setActiveTab("companion")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                  activeTab === "companion"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Pet
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dice")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                  activeTab === "dice"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                Dice
              </button>

              <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

              {/* Minimize */}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                title="Minimize into pill"
              >
                <Minus size={13} />
              </button>
            </div>
          </div>

          {/* Dock Body */}
          <div className="p-4 flex flex-col items-center justify-center">
            {activeTab === "companion" ? (
              <InteractiveCompanion
                size="md"
                state={agentState}
                onStateChange={setAgentState}
                showBubble={true}
              />
            ) : (
              <LuckyDice />
            )}
          </div>

          {/* Quick Mood Strip */}
          <div 
            className="p-2 border-t flex items-center justify-around text-[10px] bg-slate-50 dark:bg-slate-900/50"
            style={{ borderColor: "var(--divider)" }}
          >
            {(["hunting", "coding", "resting", "celebrating"] as AgentState[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setAgentState(st)}
                className={`px-2 py-0.5 rounded-full capitalize font-semibold transition ${
                  agentState === st
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
