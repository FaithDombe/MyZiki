"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  Award,
  ChevronRight,
  Filter,
  Flame,
  Bug
} from "lucide-react";

interface Issue {
  id: string;
  key: string;
  title: string;
  severity: "high" | "medium" | "low";
  status: "open" | "in_progress" | "resolved";
  stage: "Reported" | "Confirmed" | "Resolved";
  whimsicalReaction?: string;
  points: number;
}

interface OverviewViewProps {
  whimsicalMode: boolean;
  onNavigateToIssues: () => void;
  onNavigateToWhimsical: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  whimsicalMode,
  onNavigateToIssues,
  onNavigateToWhimsical,
}) => {
  const [chartView, setChartView] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [assignedIssues, setAssignedIssues] = useState<Issue[]>([
    {
      id: "1",
      key: "ZK-646",
      title: "Theme settings switch creates false success indicator on rapid clicks",
      severity: "high",
      status: "in_progress",
      stage: "Confirmed",
      whimsicalReaction: "🐝 Spicy Bug",
      points: 80,
    },
    {
      id: "2",
      key: "ZK-582",
      title: "Unsatisfiable job schemas error when validating dispatcher payload",
      severity: "high",
      status: "open",
      stage: "Reported",
      whimsicalReaction: "🚨 Dragon Alert",
      points: 120,
    },
    {
      id: "3",
      key: "ZK-711",
      title: "Add whimsical celebratory animations to solved ticket milestones",
      severity: "low",
      status: "in_progress",
      stage: "Confirmed",
      whimsicalReaction: "✨ Sparkle Master",
      points: 50,
    },
    {
      id: "4",
      key: "ZK-404",
      title: "Leaderboard avatar images flickering during pagination render",
      severity: "medium",
      status: "open",
      stage: "Reported",
      whimsicalReaction: "🐞 Curious Critter",
      points: 60,
    },
  ]);

  const toggleResolve = (id: string) => {
    setAssignedIssues((prev) =>
      prev.map((iss) =>
        iss.id === id
          ? {
              ...iss,
              status: iss.status === "resolved" ? "in_progress" : "resolved",
              stage: iss.status === "resolved" ? "Confirmed" : "Resolved",
            }
          : iss
      )
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Welcome Banner */}
      <div 
        className="rounded-3xl p-6 relative overflow-hidden border transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10 relative">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text)" }}>
                Welcome to MyZiki
              </h1>
              {whimsicalMode && (
                <span className="animate-wiggle text-xl inline-block">🎨</span>
              )}
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Interactive issue tracker prototype with whimsical graphics integration. Ready for Vercel deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateToWhimsical}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 shadow-md shadow-pink-500/20 hover:scale-105 transition-transform"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>Explore Whimsical Graphics</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Background Ambient Glow */}
        <div 
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: "var(--accent)" }}
        />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Weekly Points */}
        <div 
          className="stat-card rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span className="font-semibold uppercase tracking-wider text-[11px]">Weekly Points</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Award size={16} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold tracking-tight stat-value" style={{ color: "var(--text)" }}>
              420 <span className="text-sm font-semibold text-slate-400">/ 500</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: "84%" }}
              />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <TrendingUp size={12} />
            80 pts to reach weekly milestone
          </span>
        </div>

        {/* Card 2: Created by Me */}
        <div 
          className="stat-card rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span className="font-semibold uppercase tracking-wider text-[11px]">Created By Me</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Bug size={16} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold tracking-tight stat-value" style={{ color: "var(--text)" }}>
              8
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              3 resolved this month
            </p>
          </div>
          <span className="text-[11px] font-medium" style={{ color: "var(--accentText)" }}>
            View all created tickets →
          </span>
        </div>

        {/* Card 3: Assigned to Me */}
        <div 
          className="stat-card rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span className="font-semibold uppercase tracking-wider text-[11px]">Assigned To Me</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock size={16} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold tracking-tight stat-value" style={{ color: "var(--text)" }}>
              4
            </div>
            <p className="text-xs mt-1 text-red-500 font-semibold">
              2 high severity tickets
            </p>
          </div>
          <span className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
            Next deadline in 3 days
          </span>
        </div>

        {/* Card 4: Resolved Issues */}
        <div 
          className="stat-card rounded-2xl p-5 border flex flex-col justify-between"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span className="font-semibold uppercase tracking-wider text-[11px]">Resolved Issues</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold tracking-tight stat-value" style={{ color: "var(--text)" }}>
              19
            </div>
            <p className="text-xs mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
              82% resolution rate
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Top 10% on contributor board
          </span>
        </div>
      </div>

      {/* Points History Chart Section */}
      <div 
        className="rounded-3xl p-6 border transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Your Contribution & Points Trend
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Tracking solved bugs, code deliveries, and agent reviews
            </p>
          </div>

          {/* Segmented Control */}
          <div 
            className="flex items-center p-1 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: "var(--seg)",
              borderColor: "var(--border)",
            }}
          >
            {(["daily", "weekly", "monthly"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setChartView(mode)}
                className={`px-3 py-1 rounded-full capitalize transition-all ${
                  chartView === mode
                    ? "bg-white dark:bg-[#1A2844] text-blue-600 dark:text-blue-400 shadow-sm font-bold"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Mock Chart Visualizer */}
        <div className="h-44 w-full flex items-end gap-3 pt-6 border-b pb-2 relative" style={{ borderColor: "var(--divider)" }}>
          {/* 500 Point Target Line */}
          <div className="absolute top-6 left-0 right-0 border-b border-dashed border-blue-400/50 flex items-center justify-end pr-2">
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">
              500 pt Target
            </span>
          </div>

          {[
            { label: "Mon", pts: 60, height: "30%" },
            { label: "Tue", pts: 110, height: "55%" },
            { label: "Wed", pts: 85, height: "42%" },
            { label: "Thu", pts: 140, height: "70%" },
            { label: "Fri", pts: 95, height: "48%" },
            { label: "Sat", pts: 520, height: "92%", targetMet: true },
            { label: "Sun (Today)", pts: 420, height: "78%" },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div 
                className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 relative group-hover:brightness-110 ${
                  bar.targetMet 
                    ? "bg-gradient-to-t from-blue-600 to-emerald-400 shadow-md shadow-emerald-500/20" 
                    : "bg-gradient-to-t from-blue-700/60 to-blue-400/80"
                }`}
                style={{ height: bar.height }}
              >
                {bar.targetMet && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black px-1 rounded bg-emerald-500 text-white shadow-sm">
                    +500!
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-400 truncate">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Issues Table */}
      <div 
        className="rounded-3xl border overflow-hidden transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "var(--divider)" }}>
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
              Issues Assigned to Me
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Click any issue to test action states or whimsical bug reactions
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToIssues}
            className="flex items-center gap-1.5 text-xs font-bold"
            style={{ color: "var(--accentText)" }}
          >
            <span>View All Issues</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Table Rows */}
        <div className="divide-y" style={{ borderColor: "var(--divider)" }}>
          {assignedIssues.map((issue) => (
            <div
              key={issue.id}
              className="p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-500/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleResolve(issue.id)}
                  title={issue.status === "resolved" ? "Mark incomplete" : "Mark resolved"}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    issue.status === "resolved"
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-slate-300 dark:border-slate-600 hover:border-emerald-500"
                  }`}
                >
                  {issue.status === "resolved" && <CheckCircle2 size={14} />}
                </button>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {issue.key}
                    </span>
                    <span 
                      className={`text-sm font-semibold truncate ${
                        issue.status === "resolved" ? "line-through opacity-50" : ""
                      }`}
                      style={{ color: "var(--text)" }}
                    >
                      {issue.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px]">
                    {/* Severity Badge */}
                    <span 
                      className="px-2 py-0.5 rounded-full font-bold uppercase tracking-wide text-[10px]"
                      style={{
                        backgroundColor: issue.severity === "high" ? "var(--badBg)" : "var(--warnBg)",
                        color: issue.severity === "high" ? "var(--badFg)" : "var(--warnFg)",
                        border: `1px solid ${issue.severity === "high" ? "var(--badBd)" : "var(--warnBd)"}`,
                      }}
                    >
                      {issue.severity}
                    </span>

                    {/* Stage Badge */}
                    <span 
                      className="px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: issue.status === "resolved" ? "var(--okBg)" : "var(--infoBg)",
                        color: issue.status === "resolved" ? "var(--okFg)" : "var(--infoFg)",
                      }}
                    >
                      {issue.stage}
                    </span>

                    {/* Whimsical Stamp / Reaction if in whimsical mode */}
                    {whimsicalMode && issue.whimsicalReaction && (
                      <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-400/30 font-bold flex items-center gap-1">
                        <Sparkles size={10} />
                        {issue.whimsicalReaction}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  +{issue.points} pts
                </span>
                <button
                  type="button"
                  onClick={() => toggleResolve(issue.id)}
                  className="px-3 py-1 rounded-full text-xs font-semibold border transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text2)",
                  }}
                >
                  {issue.status === "resolved" ? "Re-open" : "Resolve"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
