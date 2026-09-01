"use client";

import { mockDebate } from "@/lib/mockData";
import type { DebateEntry } from "@/lib/types";
import { AGENT_COLORS, SIGNAL_COLORS } from "@/lib/utils";
import { MessageCircle, Zap } from "lucide-react";

interface Props {
  entries?: DebateEntry[];
}

export default function AIDebate({ entries = mockDebate }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }}
        />
        <span className="micro-label-cyan">AI INVESTMENT DEBATE</span>
        <MessageCircle className="h-3 w-3 ml-1" style={{ color: "var(--text-dim)" }} />
      </div>

      <div className="glass-panel p-5 space-y-3">
        {entries.map((entry, i) => {
          const isProfin = entry.agentId === 'profin';
          const agentColor = AGENT_COLORS[entry.agentId] || "var(--violet)";
          const signalColor = entry.signal ? SIGNAL_COLORS[entry.signal] || "var(--text-muted)" : null;

          return (
            <div
              key={i}
              className="animate-slide-in"
              style={{
                animationDelay: `${i * 150}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div
                className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-white/[0.02]"
                style={{
                  background: isProfin ? "rgba(139, 124, 255, 0.05)" : "transparent",
                  border: isProfin ? "1px solid rgba(139, 124, 255, 0.12)" : "1px solid transparent",
                }}
              >
                {/* Agent avatar */}
                <div
                  className="flex items-center justify-center shrink-0 rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    background: agentColor + "15",
                    border: `1.5px solid ${agentColor}40`,
                  }}
                >
                  {isProfin ? (
                    <Zap className="h-3.5 w-3.5" style={{ color: agentColor }} />
                  ) : (
                    <div className="h-2 w-2 rounded-full" style={{ background: agentColor }} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase"
                      style={{ color: agentColor }}
                    >
                      {entry.agentName}
                    </span>
                    {signalColor && (
                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: signalColor + "15", color: signalColor }}
                      >
                        {entry.signal}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{
                      color: isProfin ? "var(--violet-bright)" : "var(--text-secondary)",
                      fontStyle: isProfin ? "normal" : "normal",
                    }}
                  >
                    &ldquo;{entry.statement}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
