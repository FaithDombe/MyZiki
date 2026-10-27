"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Eye, 
  Check, 
  Sparkles, 
  Zap, 
  Bug, 
  Coffee, 
  Star, 
  Award, 
  Smile,
  Shield,
  Palette
} from "lucide-react";

interface Persona {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  auraGradient: string;
  glowColor: string;
  vibeText: string;
  tagColor: string;
}

const PERSONAS: Persona[] = [
  {
    id: "bug-whisperer",
    name: "Bug Whisperer",
    badge: "🐛",
    icon: <Bug size={14} className="text-emerald-500" />,
    auraGradient: "from-emerald-400/30 via-teal-500/20 to-transparent",
    glowColor: "rgba(16, 185, 129, 0.35)",
    vibeText: "Gentle with code, ruthless with bugs",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    id: "fast-shipper",
    name: "Spark Shipper",
    badge: "⚡",
    icon: <Zap size={14} className="text-amber-500" />,
    auraGradient: "from-amber-400/30 via-orange-500/20 to-transparent",
    glowColor: "rgba(245, 158, 11, 0.35)",
    vibeText: "Turning coffee into merged PRs",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    id: "pixel-crafter",
    name: "Pixel Crafter",
    badge: "✨",
    icon: <Sparkles size={14} className="text-pink-500" />,
    auraGradient: "from-pink-400/30 via-purple-500/20 to-transparent",
    glowColor: "rgba(236, 72, 153, 0.35)",
    vibeText: "Adding whimsy to every pixel",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
  },
  {
    id: "night-owl",
    name: "Deep Focus",
    badge: "☕",
    icon: <Coffee size={14} className="text-blue-500" />,
    auraGradient: "from-blue-400/30 via-indigo-500/20 to-transparent",
    glowColor: "rgba(59, 130, 246, 0.35)",
    vibeText: "In the zone, do not disturb",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
];

export const ProfileView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [displayName, setDisplayName] = useState("faith dombe");
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [customStatus, setCustomStatus] = useState("Refining Ziki graphics ✨");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-20 animate-in fade-in duration-300">
      {/* Back button & Title matching Ziki Screenshot */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to overview</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
              Profile
            </h1>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              Manage how your identity, whimsical badge, and aura appear across issues and comments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Eye size={14} />
            <span>{showLivePreview ? "Hide preview card" : "See how others see you"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Profile Form Card */}
        <section 
          className="lg:col-span-7 rounded-3xl border p-6 sm:p-7 flex flex-col gap-6 shadow-sm transition-all"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="border-b pb-4" style={{ borderColor: "var(--divider)" }}>
            <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>
              Your profile
            </h2>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              How you appear to everyone in the workspace.
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            {/* Whimsical Avatar & Layered Aura Section */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Avatar & Whimsical Aura
              </label>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
                {/* Avatar with TikTok-inspired Layered Depth & Glow */}
                <div className="relative shrink-0 flex items-center justify-center">
                  {/* Outer layered halo / glow aura */}
                  <div 
                    className="absolute -inset-2.5 rounded-full blur-md opacity-70 transition-all duration-500 animate-pulse"
                    style={{ backgroundColor: selectedPersona.glowColor }}
                  />

                  {/* Layered ring */}
                  <div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-tr ${selectedPersona.auraGradient} p-1 flex items-center justify-center relative transition-transform duration-300 hover:scale-105`}
                  >
                    {/* The core avatar circle */}
                    <div className="w-full h-full rounded-full bg-[#1E60E8] text-white flex items-center justify-center text-2xl font-black shadow-inner relative overflow-hidden">
                      {/* Subtle background monogram depth */}
                      <span className="absolute -right-1 -bottom-2 text-3xl font-black opacity-20 pointer-events-none select-none">
                        FD
                      </span>
                      FD
                    </div>
                  </div>

                  {/* Whimsical Accessory Sticker / Badge on the avatar corner */}
                  <div 
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-sm shadow-md animate-bounce"
                    title={`Current Persona: ${selectedPersona.name}`}
                  >
                    {selectedPersona.badge}
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>
                      {displayName || "faith dombe"}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedPersona.tagColor}`}>
                      {selectedPersona.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 italic">
                    "{selectedPersona.vibeText}"
                  </p>
                  <span className="text-[11px] text-blue-500 mt-1 font-semibold flex items-center gap-1">
                    <Sparkles size={11} />
                    Whimsical aura synced with 1,702.87 pts
                  </span>
                </div>
              </div>
            </div>

            {/* Persona Selector (TikTok-style Pill Selection) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Select Whimsical Persona Vibe</span>
                <span className="text-[11px] text-blue-500 font-semibold">Click to swap aura</span>
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {PERSONAS.map((p) => {
                  const isSelected = selectedPersona.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPersona(p)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                        isSelected 
                          ? "border-blue-500 bg-blue-500/5 shadow-sm ring-1 ring-blue-500" 
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <span className="text-xl shrink-0">{p.badge}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                          {p.vibeText}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display Name Input (Matching Ziki's Layout) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="display-name" className="text-xs font-bold" style={{ color: "var(--text)" }}>
                Display name
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex-1 h-11 px-3.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  placeholder="Your workspace display name"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition flex items-center gap-1.5 shrink-0"
                >
                  {savedSuccess ? (
                    <>
                      <Check size={14} className="text-emerald-300" />
                      <span>Saved! ✨</span>
                    </>
                  ) : (
                    <span>Save name</span>
                  )}
                </button>
              </div>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                Shown beside your issues and comments, including ones you've already posted.
              </p>
            </div>

            {/* Email Section */}
            <div className="pt-4 border-t flex flex-col gap-1" style={{ borderColor: "var(--divider)" }}>
              <span className="text-xs font-bold" style={{ color: "var(--text)" }}>
                Email
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                faith.dombe04@gmail.com
              </span>
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>
                Your sign-in email cannot be changed here.
              </span>
            </div>
          </form>
        </section>

        {/* Right Column: "How Others See You" Card (Transom-Clean & TikTok-Layered) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-500" />
              <span>Public Contributor Card</span>
            </span>
            <span className="text-[11px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Live Preview
            </span>
          </div>

          {/* The Transom/TikTok inspired card */}
          <div 
            className="rounded-3xl border p-6 flex flex-col gap-5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* Top decorative accent bar */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${selectedPersona.auraGradient}`} 
            />

            {/* Background Watermark Initials (Layered depth from TikTok idea) */}
            <div className="absolute right-3 -bottom-6 text-8xl font-black text-slate-200/40 dark:text-slate-800/30 select-none pointer-events-none group-hover:scale-110 transition-transform">
              ZIKI
            </div>

            {/* Profile Header on Card */}
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-black shadow-md"
                    style={{
                      boxShadow: `0 0 16px ${selectedPersona.glowColor}`,
                    }}
                  >
                    FD
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-sm bg-white dark:bg-slate-900 rounded-full px-1 shadow border">
                    {selectedPersona.badge}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-bold" style={{ color: "var(--text)" }}>
                    {displayName || "faith dombe"}
                  </span>
                  <span className="text-xs text-slate-400">
                    Product Contributor
                  </span>
                </div>
              </div>

              {/* Points Chip (From user's screenshot: 1,702.87 pts) */}
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
                <Award size={13} />
                <span>1,702.87 pts</span>
              </div>
            </div>

            {/* Contributor Persona Tag */}
            <div className={`p-3 rounded-2xl border ${selectedPersona.tagColor} flex items-center justify-between text-xs relative z-10`}>
              <div className="flex items-center gap-2">
                {selectedPersona.icon}
                <span className="font-bold">{selectedPersona.name}</span>
              </div>
              <span className="text-[11px] opacity-80">{selectedPersona.badge} Active</span>
            </div>

            {/* Transom-Style Micro Dot Matrix Activity Indicator (From Image 1) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 relative z-10">
              <div className="flex items-center justify-between text-[11px] mb-2 text-slate-400 font-medium">
                <span>Recent Bug Solver Matrix</span>
                <span className="text-emerald-500 font-bold">14 solved this sprint</span>
              </div>

              {/* Dot Grid */}
              <div className="grid grid-cols-12 gap-1.5 py-1">
                {Array.from({ length: 36 }).map((_, i) => {
                  const active = [2, 5, 6, 11, 14, 15, 18, 22, 23, 27, 28, 30, 31, 35].includes(i);
                  const isHigh = [6, 15, 23, 31].includes(i);
                  return (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        isHigh
                          ? "bg-amber-400"
                          : active
                          ? "bg-blue-500"
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                      title={active ? "Active contribution" : "Rest day"}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center relative z-10">
              This card appears when team members click your avatar in discussions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
