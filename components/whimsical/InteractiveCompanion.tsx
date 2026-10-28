"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, Bot, Zap, Coffee, Award, Volume2, VolumeX } from "lucide-react";

export type AgentState = "hunting" | "coding" | "resting" | "celebrating";

interface InteractiveCompanionProps {
  size?: "sm" | "md" | "lg";
  state?: AgentState;
  onStateChange?: (newState: AgentState) => void;
  showBubble?: boolean;
}

const AGENT_MESSAGES: Record<AgentState, { title: string; subtitle: string; action: string }> = {
  hunting: {
    title: "Triaging Bug ZK-646",
    subtitle: "Analyzing stack trace on theme switcher...",
    action: "Active Hunt",
  },
  coding: {
    title: "Writing PR #1290",
    subtitle: "Drafting fix for cron scheduler route...",
    action: "Synthesizing Fix",
  },
  resting: {
    title: "Agent Standby",
    subtitle: "Waiting for new bounty notifications...",
    action: "Cooldown Mode",
  },
  celebrating: {
    title: "Bounty Won (+120 pts)!",
    subtitle: "PR merged into upstream main branch!",
    action: "Delivered",
  },
};

export const InteractiveCompanion: React.FC<InteractiveCompanionProps> = ({
  size = "md",
  state = "hunting",
  onStateChange,
  showBubble = true,
}) => {
  const [internalState, setInternalState] = useState<AgentState>(state);
  const activeState = onStateChange ? state : internalState;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibeHearts, setVibeHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play pleasant web audio chime
  const playSound = (freq = 440, type: OscillatorType = "sine") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext not allowed before user interaction
    }
  };

  // Track global mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Natural blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Compute pupil offset for eye tracking
  const getPupilOffset = (eyeRef: React.RefObject<HTMLDivElement | null>) => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    const rect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - eyeCenterX;
    const dy = mousePos.y - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(6, Math.hypot(dx, dy) / 35);

    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    };
  };

  const leftPupil = getPupilOffset(leftEyeRef);
  const rightPupil = getPupilOffset(rightEyeRef);

  // Trigger Good Vibes action
  const handleTriggerVibes = () => {
    setIsWinking(true);
    playSound(587.33, "triangle"); // D5
    setTimeout(() => playSound(880, "sine"), 120); // A5

    // Spawn floating hearts/sparkles
    const newId = Date.now();
    setVibeHearts((prev) => [...prev, { id: newId, x: Math.random() * 60 - 30, y: -20 }]);
    setTimeout(() => {
      setVibeHearts((prev) => prev.filter((h) => h.id !== newId));
      setIsWinking(false);
    }, 1500);

    const states: AgentState[] = ["hunting", "coding", "celebrating", "resting"];
    const next = states[(states.indexOf(activeState) + 1) % states.length];
    if (onStateChange) onStateChange(next);
    else setInternalState(next);
  };

  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1;

  return (
    <div ref={containerRef} className="flex flex-col items-center select-none relative group">
      {/* Floating Vibe Hearts & Stars */}
      {vibeHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute pointer-events-none text-xl animate-bounce"
          style={{
            top: heart.y,
            left: `calc(50% + ${heart.x}px)`,
            transition: "all 1.2s ease-out",
          }}
        >
          💖 ✨
        </span>
      ))}

      {/* Real-time State Speech Bubble (Communicates Utility as Mark requested) */}
      {showBubble && (
        <div 
          className="mb-2.5 px-3 py-2 rounded-2xl border text-left shadow-lg backdrop-blur-md transition-all duration-300 max-w-[260px] animate-in fade-in"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              {AGENT_MESSAGES[activeState].action}
            </span>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              title={soundEnabled ? "Mute chimes" : "Enable chimes"}
            >
              {soundEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />}
            </button>
          </div>
          <p className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>
            {AGENT_MESSAGES[activeState].title}
          </p>
          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
            {AGENT_MESSAGES[activeState].subtitle}
          </p>
        </div>
      )}

      {/* Interactive Companion Character */}
      <div 
        onClick={handleTriggerVibes}
        className="cursor-pointer relative transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ transform: `scale(${scale})` }}
        title="Click to interact and send Good Vibes!"
      >
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Glow Backdrop */}
          <circle 
            cx="55" 
            cy="55" 
            r="48" 
            fill={activeState === "celebrating" ? "#EC4899" : "#3978F6"} 
            opacity="0.15" 
            className="animate-pulse" 
          />

          {/* Antennas */}
          <line x1="42" y1="30" x2="32" y2="15" stroke="#3978F6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="30" cy="13" r="5" fill="#FFD166" />

          <line x1="68" y1="30" x2="78" y2="15" stroke="#3978F6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="13" r="5" fill={activeState === "hunting" ? "#06D6A0" : "#FF6584"} />

          {/* Main Body */}
          <rect x="22" y="26" width="66" height="58" rx="26" fill="url(#botBodyGrad)" />
          <rect x="24" y="28" width="62" height="54" rx="24" stroke="white" strokeOpacity="0.35" strokeWidth="2" />

          {/* Visor Screen */}
          <rect x="30" y="38" width="50" height="28" rx="12" fill="#070F22" />

          {/* Gradients */}
          <defs>
            <linearGradient id="botBodyGrad" x1="22" y1="26" x2="88" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2E6FEF" />
              <stop offset="1" stopColor="#0B1733" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Vector Eyes with Real-time Cursor Tracking */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: "-3px" }}>
          <div className="flex items-center gap-4">
            {/* Left Eye */}
            <div
              ref={leftEyeRef}
              className={`w-4 h-4 rounded-full bg-slate-900 border border-cyan-400/30 flex items-center justify-center transition-all duration-75 overflow-hidden ${
                isBlinking || isWinking ? "h-0.5" : "h-4"
              }`}
            >
              {!isBlinking && !isWinking && (
                <div
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-white opacity-80" />
                </div>
              )}
            </div>

            {/* Right Eye */}
            <div
              ref={rightEyeRef}
              className={`w-4 h-4 rounded-full bg-slate-900 border border-cyan-400/30 flex items-center justify-center transition-all duration-75 overflow-hidden ${
                isBlinking ? "h-0.5" : "h-4"
              }`}
            >
              {!isBlinking && (
                <div
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-white opacity-80" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mouth Expression */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: "28px" }}>
          {activeState === "celebrating" ? (
            <span className="text-xs">⭐️</span>
          ) : activeState === "resting" ? (
            <span className="text-[10px] text-cyan-300 font-mono tracking-widest">~zZ</span>
          ) : (
            <div className="w-3.5 h-1 rounded-full bg-cyan-400/80 shadow-[0_0_4px_#22d3ee]" />
          )}
        </div>
      </div>

      {/* Good Vibes Tap Prompt */}
      <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 group-hover:text-pink-500 transition-colors">
        <Sparkles size={11} className="text-amber-400" />
        <span>Tap companion for Good Vibes ✨</span>
      </span>
    </div>
  );
};
