"use client";

import React from "react";
import { 
  Sun, 
  Moon, 
  Plus, 
  Award,
} from "lucide-react";
import { WhimsicalBot, WHIMSICAL_BOTS } from "./whimsical/botData";

interface AppHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onNewIssueClick: () => void;
  onProfileClick: () => void;
  points: number;
  selectedBot?: WhimsicalBot;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  darkMode,
  onToggleTheme,
  onNewIssueClick,
  onProfileClick,
  points,
  selectedBot = WHIMSICAL_BOTS[1], // default to Triaging Bug ZK-646
}) => {
  return (
    <header 
      className="sticky top-0 z-10 w-full px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-200"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left: Points Target */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: "var(--tint)",
            borderColor: "var(--border)",
            color: "var(--accentText)",
          }}
        >
          <Award size={14} className="text-amber-500 shrink-0" />
          <span className="font-bold">1,702.87 pts</span>
          <span className="opacity-75">/ Top Contributor</span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* New Issue Button */}
        <button
          type="button"
          onClick={onNewIssueClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white transition-all shadow-sm"
          style={{
            backgroundColor: "var(--accent)",
          }}
        >
          <Plus size={15} />
          <span>New Issue</span>
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--chip)",
            color: "var(--text2)",
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
        </button>

        {/* Profile Avatar (With Active Bot Symbol replacing static online tag) */}
        <button
          type="button"
          onClick={onProfileClick}
          className="flex items-center gap-2.5 pl-2 border-l text-left group transition-all" 
          style={{ borderColor: "var(--border)" }}
          title={`Active Persona: ${selectedBot.name} (${selectedBot.role}) - Click to view Settings & Profile`}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xs shadow-sm group-hover:ring-2 group-hover:ring-blue-500 transition-all">
              FD
            </div>
            {/* Selected Bot's Symbol badge replacing the static green online tag */}
            <span 
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ring-2 ring-white dark:ring-slate-900 shadow-sm transition-transform duration-200 group-hover:scale-125"
              style={{ 
                backgroundColor: selectedBot.primaryColor,
              }}
              title={`Active Bot Status: ${selectedBot.name}`}
            >
              {selectedBot.symbol}
            </span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight group-hover:text-blue-500 transition-colors" style={{ color: "var(--text)" }}>
              faith dombe
            </span>
            <span 
              className="text-[10px] leading-tight font-semibold flex items-center gap-1 mt-0.5" 
              style={{ color: selectedBot.glowColor || "var(--muted)" }}
            >
              <span>{selectedBot.symbol}</span>
              <span className="truncate max-w-[130px]">{selectedBot.role || selectedBot.name}</span>
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
