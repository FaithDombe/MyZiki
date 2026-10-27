"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { OverviewView } from "@/components/OverviewView";
import { IssuesView } from "@/components/IssuesView";
import { WhimsicalShowcase } from "@/components/WhimsicalShowcase";
import { AgentsView } from "@/components/AgentsView";
import { X, Plus } from "lucide-react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<"overview" | "issues" | "whimsical" | "agents">("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [points, setPoints] = useState(420);
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  // New issue form state
  const [newTitle, setNewTitle] = useState("");
  const [newSeverity, setNewSeverity] = useState<"low" | "medium" | "high">("medium");

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const handleCreateMockIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setPoints((p) => p + 30);
    setIsNewIssueModalOpen(false);
    setNewTitle("");
    setCurrentTab("issues");
  };

  return (
    <div 
      className={`min-h-screen flex ${darkMode ? "dark" : ""}`}
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Sidebar */}
      <AppSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <AppHeader
          darkMode={darkMode}
          onToggleTheme={handleToggleTheme}
          onNewIssueClick={() => setIsNewIssueModalOpen(true)}
          points={points}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {currentTab === "overview" && (
            <OverviewView
              onNavigateToIssues={() => setCurrentTab("issues")}
              onNavigateToWhimsical={() => setCurrentTab("whimsical")}
            />
          )}

          {currentTab === "issues" && (
            <IssuesView
              onOpenNewIssueModal={() => setIsNewIssueModalOpen(true)}
            />
          )}

          {currentTab === "whimsical" && <WhimsicalShowcase />}

          {currentTab === "agents" && <AgentsView />}
        </main>
      </div>

      {/* New Issue Modal */}
      {isNewIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg rounded-3xl p-6 border shadow-2xl relative"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--divider)" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Plus size={16} />
                </div>
                <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
                  Create New Issue
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsNewIssueModalOpen(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
                style={{ borderColor: "var(--border)" }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateMockIssue} className="flex flex-col gap-4 mt-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Issue Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Issue description..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs bg-slate-100 dark:bg-slate-800 focus:outline-none focus:border-blue-500"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Severity Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setNewSeverity(sev)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                        newSeverity === sev
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t mt-2" style={{ borderColor: "var(--divider)" }}>
                <button
                  type="button"
                  onClick={() => setIsNewIssueModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
                >
                  Create Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
