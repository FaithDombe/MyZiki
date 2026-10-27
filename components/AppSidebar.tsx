"use client";

import React from "react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Palette, 
  Bot,
  User,
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface AppSidebarProps {
  currentTab: "overview" | "issues" | "whimsical" | "agents" | "profile";
  onSelectTab: (tab: "overview" | "issues" | "whimsical" | "agents" | "profile") => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between p-4 z-20 ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{
        backgroundColor: "var(--sidebar)",
        color: "#DCE5F5",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col gap-5">
        {/* Top Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-2 pt-1">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="relative w-28 h-8">
                <Image
                  src="/brand/ziki-logo-dark.png"
                  alt="Ziki Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Mockup
              </span>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/30">
              Zi
            </div>
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-8 h-8 rounded-full border border-[#34507F] bg-transparent text-[#C9D6EF] hover:bg-[#263B63] hover:text-white flex items-center justify-center transition"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* Project Switcher Pill */}
        {!collapsed ? (
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#34507F] bg-[#263B63]/60 text-white shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-white text-[#2E6FEF] flex items-center justify-center font-extrabold text-xs shadow-sm">
              Zi
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] text-[#A9BCDF] uppercase tracking-wide font-medium">Project</span>
              <span className="text-sm font-bold truncate">MyZiki</span>
            </div>
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Dev
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-lg bg-[#263B63] text-white flex items-center justify-center font-bold text-xs" title="Project: MyZiki">
              Zi
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {/* Overview */}
          <button
            type="button"
            onClick={() => onSelectTab("overview")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === "overview"
                ? "bg-[#2E6FEF] text-white shadow-lg shadow-blue-600/30 font-bold"
                : "text-[#B7C3DA] hover:text-white hover:bg-white/5"
            }`}
            title="Overview"
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {!collapsed && <span className="flex-1 text-left">Overview</span>}
          </button>

          {/* Issues */}
          <button
            type="button"
            onClick={() => onSelectTab("issues")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === "issues"
                ? "bg-[#2E6FEF] text-white shadow-lg shadow-blue-600/30 font-bold"
                : "text-[#B7C3DA] hover:text-white hover:bg-white/5"
            }`}
            title="Issues"
          >
            <CheckSquare size={18} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Issues</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white font-medium">
                  14
                </span>
              </>
            )}
          </button>

          {/* Whimsical Profile (User's feature) */}
          <button
            type="button"
            onClick={() => onSelectTab("profile")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === "profile"
                ? "bg-[#2E6FEF] text-white shadow-lg shadow-blue-600/30 font-bold"
                : "text-[#B7C3DA] hover:text-white hover:bg-white/5"
            }`}
            title="Profile"
          >
            <User size={18} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Profile & Whimsy</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-pink-500 text-white font-bold animate-pulse">
                  Idea ✨
                </span>
              </>
            )}
          </button>

          {/* Whimsical Canvas */}
          <button
            type="button"
            onClick={() => onSelectTab("whimsical")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === "whimsical"
                ? "bg-[#2E6FEF] text-white shadow-lg shadow-blue-600/30 font-bold"
                : "text-[#B7C3DA] hover:text-white hover:bg-white/5"
            }`}
            title="Whimsical Canvas"
          >
            <Palette size={18} className="shrink-0" />
            {!collapsed && <span className="flex-1 text-left">Whimsical Canvas</span>}
          </button>

          {/* Agents */}
          <button
            type="button"
            onClick={() => onSelectTab("agents")}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              currentTab === "agents"
                ? "bg-[#2E6FEF] text-white shadow-lg shadow-blue-600/30 font-bold"
                : "text-[#B7C3DA] hover:text-white hover:bg-white/5"
            }`}
            title="AI Agents"
          >
            <Bot size={18} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Agents & Bids</span>
                <span className="px-1.5 py-0.5 text-[11px] rounded bg-purple-500/20 text-purple-300 font-semibold">
                  3 active
                </span>
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-4 border-t border-[#1F335E]/60 flex flex-col gap-2">
        <a
          href="https://ziki.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-2 py-1.5 text-xs text-[#8EA6D1] hover:text-white transition"
        >
          {!collapsed && <span>Official Ziki.dev</span>}
          <ExternalLink size={13} />
        </a>
      </div>
    </aside>
  );
};
