"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, Bot, Zap, Coffee, Award, Volume2, VolumeX } from "lucide-react";
import { WhimsicalBot, WHIMSICAL_BOTS } from "./botData";

export type AgentState = "hunting" | "coding" | "resting" | "celebrating";

interface InteractiveCompanionProps {
  size?: "sm" | "md" | "lg";
  state?: AgentState;
  onStateChange?: (newState: AgentState) => void;
  showBubble?: boolean;
  bot?: WhimsicalBot;
}

export const InteractiveCompanion: React.FC<InteractiveCompanionProps> = ({
  size = "md",
  state = "hunting",
  onStateChange,
  showBubble = true,
  bot = WHIMSICAL_BOTS[1], // default to Triaging Bug ZK-646
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

  // Play pleasant web audio chime customized by bot's sound frequency
  const playSound = (freq = bot.soundFrequency || 523.25, type: OscillatorType = "sine") => {
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
    playSound(bot.soundFrequency, "triangle");
    setTimeout(() => playSound(bot.soundFrequency * 1.5, "sine"), 120);

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

  // Custom Antennas based on bot's role and antenna style
  const renderBotAntennas = () => {
    switch (bot.antennaStyle) {
      case "triaging":
        // Bug antennae with green curved feelers
        return (
          <g>
            <path
              d="M 42 30 Q 30 14 22 8"
              stroke={bot.primaryColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="21" cy="7" r="4.5" fill={bot.glowColor} className="animate-pulse" />
            <path
              d="M 68 30 Q 80 14 88 8"
              stroke={bot.primaryColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="89" cy="7" r="4.5" fill={bot.glowColor} className="animate-pulse" />
          </g>
        );
      case "comment":
        // Speech bubble antenna
        return (
          <g>
            <line x1="55" y1="28" x2="55" y2="18" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <rect x="43" y="6" width="24" height="14" rx="5" fill={bot.primaryColor} />
            <polygon points="51,20 56,20 53,24" fill={bot.primaryColor} />
            <circle cx="48" cy="13" r="1.5" fill="white" />
            <circle cx="55" cy="13" r="1.5" fill="white" />
            <circle cx="62" cy="13" r="1.5" fill="white" />
          </g>
        );
      case "review":
        // Monocle / Inspector magnifying lens antenna
        return (
          <g>
            <line x1="66" y1="28" x2="76" y2="15" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="81" cy="10" r="7" stroke={bot.primaryColor} strokeWidth="2.5" fill="none" />
            <circle cx="81" cy="10" r="4" fill={bot.glowColor} fillOpacity="0.4" />
            <line x1="44" y1="28" x2="36" y2="17" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="34" cy="15" r="4" fill={bot.primaryColor} />
          </g>
        );
      case "merger":
        // Git branch fork antenna
        return (
          <g>
            <line x1="55" y1="28" x2="55" y2="18" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="55" y1="18" x2="42" y2="9" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="55" y1="18" x2="68" y2="9" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="42" cy="9" r="4" fill={bot.glowColor} />
            <circle cx="68" cy="9" r="4" fill={bot.glowColor} />
            <circle cx="55" cy="18" r="3" fill="white" />
          </g>
        );
      case "dispatcher":
        // Satellite radar dish with signal arcs
        return (
          <g>
            <line x1="55" y1="28" x2="55" y2="18" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <path d="M 43 14 A 12 12 0 0 1 67 14" stroke={bot.primaryColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="55" cy="9" r="3.5" fill="#FBBF24" />
            <path d="M 39 10 A 17 17 0 0 1 71 10" stroke={bot.glowColor} strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
          </g>
        );
      case "contributor":
        // Golden Star Crown Antenna
        return (
          <g>
            <line x1="55" y1="28" x2="55" y2="17" stroke={bot.primaryColor} strokeWidth="3" strokeLinecap="round" />
            <polygon
              points="55,3 58,11 66,11 60,16 62,24 55,19 48,24 50,16 44,11 52,11"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="1"
            />
          </g>
        );
      case "ziki":
      default:
        // Classic dual antennas with playful yellow & colored spheres
        return (
          <g>
            <line x1="42" y1="30" x2="32" y2="15" stroke={bot.primaryColor} strokeWidth="4" strokeLinecap="round" />
            <circle cx="30" cy="13" r="5" fill="#FFD166" />
            <line x1="68" y1="30" x2="78" y2="15" stroke={bot.primaryColor} strokeWidth="4" strokeLinecap="round" />
            <circle cx="80" cy="13" r="5" fill={activeState === "hunting" ? bot.glowColor : "#FF6584"} />
          </g>
        );
    }
  };

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

      {/* Real-time State Speech Bubble */}
      {showBubble && (
        <div 
          className="mb-2.5 px-3 py-2 rounded-2xl border text-left shadow-lg backdrop-blur-md transition-all duration-300 max-w-[270px] animate-in fade-in"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span 
              className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
              style={{ color: bot.glowColor }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: bot.primaryColor }}
              />
              {activeState === "celebrating" 
                ? "Celebration" 
                : activeState === "coding" 
                ? "Synthesizing Fix" 
                : activeState === "resting" 
                ? "Cooldown Mode" 
                : bot.badge}
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
          <p className="text-xs font-bold leading-tight flex items-center gap-1.5" style={{ color: "var(--text)" }}>
            <span>{bot.symbol}</span>
            <span>{bot.name} &bull; {bot.role}</span>
          </p>
          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
            {activeState === "celebrating" 
              ? "Bounty Won (+120 pts)! PR merged successfully." 
              : activeState === "coding"
              ? `Synthesizing fix for ${bot.name}...`
              : activeState === "resting"
              ? "Standby mode, listening for repository events..."
              : bot.currentTask}
          </p>
        </div>
      )}

      {/* Interactive Companion Character */}
      <div 
        onClick={handleTriggerVibes}
        className="cursor-pointer relative transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ transform: `scale(${scale})` }}
        title={`Click to interact with ${bot.name} and send Good Vibes!`}
      >
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Glow Backdrop */}
          <circle 
            cx="55" 
            cy="55" 
            r="48" 
            fill={activeState === "celebrating" ? "#EC4899" : bot.glowColor} 
            opacity="0.18" 
            className="animate-pulse" 
          />

          {/* Dynamic Bot Antennas */}
          {renderBotAntennas()}

          {/* Main Body */}
          <rect x="22" y="26" width="66" height="58" rx="26" fill={`url(#botBodyGrad-${bot.id})`} />
          <rect x="24" y="28" width="62" height="54" rx="24" stroke="white" strokeOpacity="0.35" strokeWidth="2" />

          {/* Visor Screen */}
          <rect x="30" y="38" width="50" height="28" rx="12" fill="#070F22" />

          {/* Gradients */}
          <defs>
            <linearGradient id={`botBodyGrad-${bot.id}`} x1="22" y1="26" x2="88" y2="84" gradientUnits="userSpaceOnUse">
              <stop stopColor={bot.primaryColor} />
              <stop offset="1" stopColor={bot.secondaryColor} />
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
            <div 
              className="w-3.5 h-1 rounded-full shadow-[0_0_4px_#22d3ee]"
              style={{ backgroundColor: bot.glowColor }}
            />
          )}
        </div>
      </div>

      {/* Good Vibes Tap Prompt */}
      <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 group-hover:text-pink-500 transition-colors">
        <Sparkles size={11} className="text-amber-400" />
        <span>Tap {bot.name} for Good Vibes ✨</span>
      </span>
    </div>
  );
};
