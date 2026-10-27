"use client";

import React from "react";
import { 
  Sun, 
  Moon, 
  Bell, 
  Flame, 
  Plus, 
  Sparkles, 
  Award,
  CheckCircle2
} from "lucide-react";

interface AppHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  whimsicalMode: boolean;
  onToggleWhimsicalMode: () => void;
  onNewIssueClick: () => void;
  points: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  darkMode,
  onToggleTheme,
  whimsicalMode,
  onToggleWhimsicalMode,
  onNewIssueClick,
  points,
}) => {
  return (
    <header 
      className="sticky top-0 z-10 w-full px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-200"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left: Quick Search / Project Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: "var(--tint)",
            borderColor: "var(--border)",
            color: "var(--accentText)",
          }}
        >
          <Award size={14} className="text-amber-500 shrink-0" />
          <span className="font-bold">{points}</span>
          <span className="opacity-75">/ 500 Weekly Target</span>
          {points >= 500 && <CheckCircle2 size={13} className="text-emerald-500" />}
        </div>

        {whimsicalMode && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-400/30 animate-pulse">
            <Sparkles size={13} className="text-pink-500" />
            <span>Whimsical Mode Active! ✨</span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Whimsical Mode Switch */}
        <button
          type="button"
          onClick={onToggleWhimsicalMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            whimsicalMode
              ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white border-transparent shadow-md shadow-pink-500/20"
              : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          title="Toggle playful whimsical animations & artwork"
        >
          <Sparkles size={14} className={whimsicalMode ? "animate-spin" : ""} />
          <span>{whimsicalMode ? "Whimsy: ON" : "Whimsy: OFF"}</span>
        </button>

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

        {/* Profile Avatar / Demo Badge */}
        <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: "var(--border)" }}>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
              FD
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>Faith Dombe</span>
            <span className="text-[10px] leading-tight font-medium" style={{ color: "var(--muted)" }}>Tutor Demo / Designer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
