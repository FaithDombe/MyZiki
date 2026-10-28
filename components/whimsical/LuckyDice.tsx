"use client";

import React, { useState } from "react";
import { Dices, Sparkles, ArrowRight, CheckCircle2, Trophy } from "lucide-react";

interface BountyPick {
  id: string;
  key: string;
  title: string;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Boss";
  tag: string;
}

const BOUNTY_POOL: BountyPick[] = [
  { id: "1", key: "ZK-646", title: "Fix theme switcher rapid-click flicker", points: 80, difficulty: "Medium", tag: "Frontend" },
  { id: "2", key: "ZK-582", title: "Resolve dispatcher payload null rejection", points: 120, difficulty: "Hard", tag: "Backend" },
  { id: "3", key: "ZK-711", title: "Milestone completion event listener drops", points: 50, difficulty: "Easy", tag: "Bugfix" },
  { id: "4", key: "ZK-404", title: "Optimize leaderboard avatar pagination", points: 60, difficulty: "Medium", tag: "Performance" },
  { id: "5", key: "ZK-900", title: "Design playful easter egg for solved issues", points: 150, difficulty: "Boss", tag: "Whimsy" },
  { id: "6", key: "ZK-219", title: "Android gesture conflicts with predictive back", points: 90, difficulty: "Medium", tag: "Mobile" },
];

export const LuckyDice: React.FC<{ onPickBounty?: (bounty: BountyPick) => void }> = ({ onPickBounty }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [selectedBounty, setSelectedBounty] = useState<BountyPick | null>(null);
  const [rollCount, setRollCount] = useState(0);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setSelectedBounty(null);

    // Audio chime
    try {
      if (typeof window !== "undefined") {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        [329.63, 440, 659.25, 880].forEach((freq, i) => {
          setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
          }, i * 110);
        });
      }
    } catch {}

    // Random roll cycle
    let count = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalNumber);
        const pick = BOUNTY_POOL[finalNumber - 1];
        setSelectedBounty(pick);
        setIsRolling(false);
        setRollCount((c) => c + 1);
        if (onPickBounty) onPickBounty(pick);
      }
    }, 90);
  };

  // Render dots for dice faces
  const renderDots = (num: number) => {
    const dotCoords: Record<number, string[]> = {
      1: ["col-start-2 row-start-2"],
      2: ["col-start-1 row-start-1", "col-start-3 row-start-3"],
      3: ["col-start-1 row-start-1", "col-start-2 row-start-2", "col-start-3 row-start-3"],
      4: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-1 row-start-3", "col-start-3 row-start-3"],
      5: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-2 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"],
      6: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-1 row-start-2", "col-start-3 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"],
    };

    return (
      <div className="grid grid-cols-3 grid-rows-3 w-10 h-10 p-1.5 gap-1 items-center justify-items-center">
        {(dotCoords[num] || []).map((pos, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 ${pos}`} />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="p-5 rounded-3xl border flex flex-col gap-4 shadow-sm transition-all"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--divider)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-sm">
            <Dices size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
              Lucky Task Dice
            </h3>
            <span className="text-[11px] text-slate-400">Gamified task selection</span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
          Rolls: {rollCount}
        </span>
      </div>

      {/* Interactive 3D Rolling Area */}
      <div className="flex items-center justify-around py-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        {/* Dice Visual */}
        <button
          type="button"
          onClick={rollDice}
          disabled={isRolling}
          className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 ${
            isRolling ? "animate-spin" : ""
          }`}
          title="Click to roll the dice!"
        >
          {renderDots(diceNumber)}
        </button>

        {/* Action Button */}
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={rollDice}
            disabled={isRolling}
            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md shadow-blue-500/20 hover:brightness-110 transition flex items-center gap-1.5"
          >
            <Sparkles size={14} className={isRolling ? "animate-spin" : ""} />
            <span>{isRolling ? "Rolling..." : "Roll Random Task"}</span>
          </button>
          <span className="text-[10px] text-slate-400 italic">
            Overcomes decision fatigue!
          </span>
        </div>
      </div>

      {/* Dispatched Bounty Result */}
      {selectedBounty && (
        <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/30 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {selectedBounty.key}
              </span>
              <span className="text-[10px] font-bold px-1.5 rounded bg-purple-500/10 text-purple-500">
                {selectedBounty.tag}
              </span>
            </div>
            <p className="text-xs font-bold truncate mt-0.5" style={{ color: "var(--text)" }}>
              {selectedBounty.title}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              +{selectedBounty.points} pts
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
