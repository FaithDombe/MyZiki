"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  MessageSquare
} from "lucide-react";

interface IssueItem {
  id: string;
  key: string;
  title: string;
  description: string;
  platform: "web" | "ios" | "android" | "backend";
  severity: "high" | "medium" | "low";
  status: "open" | "in_progress" | "resolved";
  stage: "Reported" | "Confirmed" | "Resolved";
  author: string;
  commentsCount: number;
}

interface IssuesViewProps {
  onOpenNewIssueModal: () => void;
}

export const IssuesView: React.FC<IssuesViewProps> = ({
  onOpenNewIssueModal,
}) => {
  const [activePlatform, setActivePlatform] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const [issues] = useState<IssueItem[]>([
    {
      id: "1",
      key: "ZK-646",
      title: "Theme settings switch creates false success indicator on rapid clicks",
      description: "When toggling between Dark and Light mode repeatedly, the notification banner displays saved successfully even when the request fails.",
      platform: "web",
      severity: "high",
      status: "in_progress",
      stage: "Confirmed",
      author: "Faith Dombe",
      commentsCount: 4,
    },
    {
      id: "2",
      key: "ZK-582",
      title: "Unsatisfiable job schemas error when validating dispatcher payload",
      description: "Job dispatch schema validation rejects null values in custom metadata fields for agent tasks.",
      platform: "backend",
      severity: "high",
      status: "open",
      stage: "Reported",
      author: "Ziki Dispatcher",
      commentsCount: 9,
    },
    {
      id: "3",
      key: "ZK-711",
      title: "Milestone completion event listener drops payload on re-render",
      description: "Introduce reliable event handling upon ticket milestone resolution.",
      platform: "web",
      severity: "low",
      status: "in_progress",
      stage: "Confirmed",
      author: "Faith Dombe",
      commentsCount: 7,
    },
    {
      id: "4",
      key: "ZK-404",
      title: "Leaderboard avatar images flickering during pagination render",
      description: "Image component remounts unexpectedly causing a white flash when users switch pages on the contributor board.",
      platform: "web",
      severity: "medium",
      status: "open",
      stage: "Reported",
      author: "Alex Morgan",
      commentsCount: 2,
    },
    {
      id: "5",
      key: "ZK-329",
      title: "iOS biometric passcode prompt fails silently in low battery state",
      description: "FaceID fallback timeout triggers background error without displaying the keypad fallback UI.",
      platform: "ios",
      severity: "medium",
      status: "open",
      stage: "Reported",
      author: "Sarah Chen",
      commentsCount: 3,
    },
    {
      id: "6",
      key: "ZK-219",
      title: "Android bottom sheet gesture conflicts with predictive back animation",
      description: "Swiping down to dismiss ticket drawer triggers system back action on Android 15 devices.",
      platform: "android",
      severity: "low",
      status: "resolved",
      stage: "Resolved",
      author: "Devon Reed",
      commentsCount: 5,
    },
  ]);

  const filteredIssues = issues.filter((item) => {
    const matchesPlatform = activePlatform === "all" || item.platform === activePlatform;
    const matchesSeverity = selectedSeverity === "all" || item.severity === selectedSeverity;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.key.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSeverity && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            Issues Tracker
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Browse, filter, and assign bugs across all platforms.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewIssueModal}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-all hover:brightness-110"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Plus size={15} />
          <span>New Issue</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b" style={{ borderColor: "var(--divider)" }}>
        {[
          { id: "all", label: "All Platforms", count: issues.length },
          { id: "web", label: "Web", count: issues.filter((i) => i.platform === "web").length },
          { id: "ios", label: "iOS", count: issues.filter((i) => i.platform === "ios").length },
          { id: "android", label: "Android", count: issues.filter((i) => i.platform === "android").length },
          { id: "backend", label: "Backend", count: issues.filter((i) => i.platform === "backend").length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActivePlatform(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activePlatform === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activePlatform === tab.id ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div 
        className="p-3 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 transition-all"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search issues by title or key..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-blue-500 focus:outline-none transition-colors"
            style={{ color: "var(--text)" }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none"
            style={{ borderColor: "var(--border)" }}
          >
            <option value="all">All Severities</option>
            <option value="high">High Only</option>
            <option value="medium">Medium Only</option>
            <option value="low">Low Only</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col gap-3"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-400/20">
                  {issue.key}
                </span>

                <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  {issue.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{
                    backgroundColor:
                      issue.severity === "high"
                        ? "var(--badBg)"
                        : issue.severity === "medium"
                        ? "var(--warnBg)"
                        : "var(--chip)",
                    color:
                      issue.severity === "high"
                        ? "var(--badFg)"
                        : issue.severity === "medium"
                        ? "var(--warnFg)"
                        : "var(--text2)",
                    border: `1px solid ${
                      issue.severity === "high" ? "var(--badBd)" : issue.severity === "medium" ? "var(--warnBd)" : "var(--border)"
                    }`,
                  }}
                >
                  {issue.severity}
                </span>

                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: issue.status === "resolved" ? "var(--okBg)" : "var(--infoBg)",
                    color: issue.status === "resolved" ? "var(--okFg)" : "var(--infoFg)",
                  }}
                >
                  {issue.stage}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: "var(--text2)" }}>
              {issue.description}
            </p>

            <div className="flex items-center gap-3 pt-3 border-t text-xs" style={{ borderColor: "var(--divider)", color: "var(--muted)" }}>
              <span>Reported by <strong className="text-slate-800 dark:text-slate-200">{issue.author}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MessageSquare size={13} />
                {issue.commentsCount} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
