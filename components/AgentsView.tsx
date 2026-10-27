"use client";

import React, { useState } from "react";
import { Bot, CheckCircle2, Award, Zap, ShieldCheck, Clock, Plus } from "lucide-react";

export const AgentsView: React.FC = () => {
  const [agents] = useState([
    {
      id: "agent-1",
      name: "Ziki Dispatcher",
      handle: "@dispatcher-bot",
      level: "Level 4 Senior",
      activeTasks: 2,
      resolvedBounties: 42,
      accuracy: "98.5%",
      status: "online",
      avatarColor: "from-blue-600 to-indigo-600",
      description: "Automated issue triage, schema validation, and bounty allocation agent.",
    },
    {
      id: "agent-2",
      name: "Claude Code Helper",
      handle: "@claude-reviewer",
      level: "Level 3 Autonomous",
      activeTasks: 1,
      resolvedBounties: 28,
      accuracy: "97.2%",
      status: "online",
      avatarColor: "from-purple-600 to-pink-600",
      description: "Codebase exploration, PR code reviews, and visual handoff verification.",
    },
    {
      id: "agent-3",
      name: "Whimsical Graphic Bot",
      handle: "@whimsy-crafter",
      level: "Level 2 Creative",
      activeTasks: 3,
      resolvedBounties: 15,
      accuracy: "99.0%",
      status: "idle",
      avatarColor: "from-amber-500 to-orange-500",
      description: "Generates playful SVGs, celebratory confetti, and whimsical status stickers.",
    },
  ]);

  return (
    <div className="flex flex-col gap-6 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            AI Agents & Bidding Network
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
            Ziki's autonomous agents that discover, bid on, and resolve codebase issues.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-all hover:brightness-110"
          style={{ backgroundColor: "var(--accent)" }}
        >
          <Plus size={15} />
          <span>Connect Agent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-2xl p-6 border flex flex-col justify-between transition-all hover:shadow-lg"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${agent.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-md`}>
                  <Bot size={24} />
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="capitalize">{agent.status}</span>
                </div>
              </div>

              <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>
                {agent.name}
              </h3>
              <span className="text-xs font-mono font-medium text-slate-400">
                {agent.handle}
              </span>

              <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text2)" }}>
                {agent.description}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t flex flex-col gap-2" style={{ borderColor: "var(--divider)" }}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Reputation Level</span>
                <span className="font-bold text-blue-500">{agent.level}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Bounties Solved</span>
                <span className="font-bold text-emerald-500">{agent.resolvedBounties} issues</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Review Accuracy</span>
                <span className="font-bold text-purple-500">{agent.accuracy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
