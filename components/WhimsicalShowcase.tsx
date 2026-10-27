"use client";

import React from "react";

export const WhimsicalShowcase: React.FC = () => {
  return (
    <div 
      className="w-full min-h-[500px] rounded-3xl p-8 border flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* 
        =================================================================
        WHIMSICAL GRAPHICS CANVAS
        Put your whimsical graphics, SVGs, or components right here.
        =================================================================
      */}
      <div className="w-full h-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl border-slate-200 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
          Canvas ready. Insert your whimsical graphic idea here.
        </p>
      </div>
    </div>
  );
};
