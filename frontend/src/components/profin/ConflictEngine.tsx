"use client";

import { mockConflicts, mockAgentResults } from "@/lib/mockData";
import type { SignalConflict } from "@/lib/types";
import { AGENT_COLORS, SIGNAL_COLORS } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface Props {
  conflicts?: SignalConflict[];
}

const AGENT_SCORES: Record<string, { score: number; signal: string }> = {
  technical: { score: 84, signal: "BULLISH" },
  fundamental: { score: 76, signal: "POSITIVE" },
  sentiment: { score: 18, signal: "NEUTRAL" },
  risk: { score: -42, signal: "CAUTION" },
};

export default function ConflictEngine({ conflicts = mockConflicts }: Props) {
  const agents = mockAgentResults;
  const hasConflict = conflicts.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: hasConflict ? "var(--negative)" : "var(--positive)",
            boxShadow: hasConflict ? "0 0 6px var(--negative-glow)" : "0 0 6px var(--positive-glow)",
          }}
        />
        <span
          className="micro-label"
          style={{ color: hasConflict ? "var(--negative)" : "var(--positive)" }}
        >
          SIGNAL TENSION
        </span>
      </div>

      <div className="glass-panel p-5">
        {/* Force balance bars */}
        <div className="space-y-3 mb-5">
          {Object.entries(AGENT_SCORES).map(([agentId, data]) => {
            const color = AGENT_COLORS[agentId] || "var(--text-muted)";
            const isNegative = data.score < 0;
            const absScore = Math.abs(data.score);
            const barWidth = absScore;
            const agentData = agents.find(a => a.id === agentId);

            return (
              <div key={agentId} className="flex items-center gap-3">
                <span className="text-[10px] font-semibold tracking-wider uppercase w-[90px] shrink-0" style={{ color }}>
                  {agentData?.name?.split(' ')[0] || agentId}
                </span>

                {/* Bar container */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${barWidth}%`,
                        background: isNegative
                          ? `linear-gradient(90deg, ${color}40, ${color})`
                          : `linear-gradient(90deg, ${color}40, ${color})`,
                        marginLeft: isNegative ? "auto" : 0,
                        float: isNegative ? "right" : "left",
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-bold tabular-nums w-[36px] text-right"
                    style={{ color }}
                  >
                    {isNegative ? "" : "+"}{data.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conflict alerts */}
        {hasConflict && (
          <div className="space-y-2">
            {conflicts.map((conflict, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg animate-slide-in"
                style={{
                  background: "rgba(255, 92, 114, 0.06)",
                  border: "1px solid rgba(255, 92, 114, 0.12)",
                }}
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 animate-tension" style={{ color: "var(--negative)" }} />
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: "var(--negative)" }}>
                    ⚠ SIGNAL CONFLICT DETECTED
                  </p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {conflict.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
