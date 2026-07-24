"use client";

import { useState, useEffect } from "react";

export default function TerminalName() {
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const fullCommand = "whoami";

  useEffect(() => {
    let index = 0;
    // Type out "whoami" character by character
    const typingInterval = setInterval(() => {
      if (index < fullCommand.length) {
        setDisplayedCommand(fullCommand.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        // Pause briefly after typing, then display the response
        setTimeout(() => {
          setShowResponse(true);
        }, 400);
      }
    }, 120); // Speed of typing animation

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="font-mono bg-slate-900 text-slate-100 p-4 rounded-lg border border-slate-800 shadow-xl max-w-2xl">
      {/* Terminal Header Bar */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
        </div>
        <span className="ml-2 font-semibold text-slate-400">bash — 80x24</span>
      </div>

      {/* Command Line Prompt */}
      <div className="flex items-center gap-2 text-sm sm:text-base">
        <span className="text-emerald-400 font-bold">
          guest@scottdiemer.com
        </span>
        <span className="text-slate-400">:</span>
        <span className="text-blue-400 font-bold">~</span>
        <span className="text-slate-200 font-bold">$</span>
        <span className="text-amber-300 font-semibold">{displayedCommand}</span>
        {!showResponse && (
          <span className="w-2 h-4 bg-slate-200 animate-pulse inline-block"></span>
        )}
      </div>

      {/* Terminal Output / System Response */}
      {showResponse && (
        <div className="mt-4 pt-2 space-y-1.5 text-slate-300 animate-fade-in">
          <p className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide">
            Scott Diemer
          </p>
          <p className="text-blue-400 font-semibold text-base sm:text-xl">
            IT Support Specialist & Systems Administrator
          </p>
        </div>
      )}
    </div>
  );
}
