"use client";

import { useEffect, useState, useRef } from "react";
import { mockReasoningStream } from "@/lib/mockData";
import type { ReasoningEntry } from "@/lib/types";
import { AGENT_COLORS } from "@/lib/utils";
import { Terminal, Zap } from "lucide-react";

interface Props {
  entries?: ReasoningEntry[];
  autoStream?: boolean;
}

const TYPE_COLORS: Record<string, string> = {
  info: "var(--text-muted)",
  analysis: "var(--cyan)",
  conflict: "var(--negative)",
  synthesis: "var(--violet)",
  data: "var(--positive)",
};

export default function ReasoningStream({ entries: initialEntries, autoStream = true }: Props) {
  const [visibleEntries, setVisibleEntries] = useState<ReasoningEntry[]>(
    autoStream ? [] : (initialEntries || mockReasoningStream)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const allEntries = initialEntries || mockReasoningStream;

  // Sync with incoming entries prop if autoStream is false
  useEffect(() => {
    if (!autoStream && initialEntries) {
      setVisibleEntries(initialEntries);
    }
  }, [autoStream, initialEntries]);

  // Auto-stream entries with delay
  useEffect(() => {
    if (!autoStream) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < allEntries.length) {
        setVisibleEntries(prev => [...prev, allEntries[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [autoStream, allEntries]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleEntries]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet-glow)" }}
        />
        <span className="micro-label-violet">PROFIN REASONING STREAM</span>
        <Terminal className="h-3 w-3 ml-1" style={{ color: "var(--text-dim)" }} />
      </div>

      <div
        className="glass-panel overflow-hidden"
        style={{
          background: "rgba(5, 7, 11, 0.8)",
          borderColor: "rgba(139, 124, 255, 0.1)",
        }}
      >
        {/* Terminal header bar */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5C72" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFC857" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#38E6A5" }} />
          </div>
          <span className="text-[10px] font-medium ml-2" style={{ color: "var(--text-dim)" }}>
            profin-reasoning.stream
          </span>
          {visibleEntries.length < allEntries.length && (
            <span className="ml-auto flex items-center gap-1 text-[10px]" style={{ color: "var(--cyan)" }}>
              <Zap className="h-2.5 w-2.5" />
              streaming...
            </span>
          )}
        </div>

        {/* Stream content */}
        <div
          ref={containerRef}
          className="p-4 space-y-1 max-h-[340px] overflow-y-auto"
          style={{ fontFamily: "'IBM Plex Mono', 'Fira Code', monospace" }}
        >
          {visibleEntries.length === 0 && (
            <div className="flex items-center gap-2 py-8 justify-center">
              <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                Waiting for analysis to begin...
              </span>
              <span className="w-2 h-4 animate-typewriter-cursor" style={{ background: "var(--violet)" }} />
            </div>
          )}

          {visibleEntries.map((entry, i) => {
            if (!entry) return null;
            const agentName = entry.agent || "SYSTEM";
            const entryType = entry.type || "info";
            const agentColor = AGENT_COLORS[agentName.toLowerCase()] || TYPE_COLORS[entryType] || "var(--text-muted)";
            const typeColor = TYPE_COLORS[entryType] || "var(--text-muted)";
            const isLast = i === visibleEntries.length - 1;

            return (
              <div
                key={i}
                className="flex items-start gap-3 py-1.5 animate-slide-in rounded-md px-2 -mx-2 transition-colors hover:bg-white/[0.02]"
                style={{
                  opacity: isLast ? 1 : 0.85,
                }}
              >
                {/* Timestamp */}
                <span
                  className="text-[11px] font-medium shrink-0 pt-0.5"
                  style={{ color: "var(--text-dim)", fontFamily: "inherit" }}
                >
                  {entry.timestamp || new Date().toLocaleTimeString('en-US', { hour12: false })}
                </span>

                {/* Agent badge */}
                <span
                  className="text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded"
                  style={{
                    color: agentColor,
                    background: agentColor + "12",
                    minWidth: 80,
                    textAlign: "center",
                  }}
                >
                  {agentName}
                </span>

                {/* Content */}
                <span
                  className="text-[12px] leading-relaxed"
                  style={{
                    color: entryType === 'synthesis' ? "var(--violet-bright)"
                         : entryType === 'conflict' ? "var(--negative)"
                         : "var(--text-secondary)",
                  }}
                >
                  {entry.content || ""}
                </span>

                {/* Cursor on last entry */}
                {isLast && visibleEntries.length < allEntries.length && (
                  <span
                    className="w-1.5 h-3.5 ml-0.5 mt-0.5 animate-typewriter-cursor"
                    style={{ background: typeColor }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
