"use client";

import { mockAgentResults } from "@/lib/mockData";
import type { AgentResult } from "@/lib/types";
import { SIGNAL_COLORS } from "@/lib/utils";
import { CheckCircle, AlertTriangle, Loader2, Brain } from "lucide-react";

interface Props {
  agents?: AgentResult[];
  isAnalyzing?: boolean;
}

const AGENT_ICONS: Record<string, string> = {
  technical: "📊",
  fundamental: "📋",
  sentiment: "💬",
  risk: "🛡️",
};

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  COMPLETE: { icon: <CheckCircle className="h-3 w-3" />, label: "COMPLETE", color: "var(--positive)" },
  SCANNING: { icon: <Loader2 className="h-3 w-3 animate-spin" />, label: "SCANNING...", color: "var(--cyan)" },
  ANALYZING: { icon: <Brain className="h-3 w-3 animate-pulse-glow" />, label: "ANALYZING...", color: "var(--violet)" },
  ERROR: { icon: <AlertTriangle className="h-3 w-3" />, label: "ERROR", color: "var(--negative)" },
  DEGRADED: { icon: <AlertTriangle className="h-3 w-3" />, label: "DEGRADED", color: "var(--warning)" },
  IDLE: { icon: null, label: "IDLE", color: "var(--text-dim)" },
};

const SCAN_MESSAGES = [
  "Scanning market data...",
  "Retrieving evidence...",
  "Analyzing signals...",
  "Assessing portfolio...",
];

export default function AgentNetwork({ agents = mockAgentResults, isAnalyzing = false }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }}
        />
        <span className="micro-label-cyan">AGENT NETWORK</span>

        {isAnalyzing && (
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium" style={{ color: "var(--cyan)" }}>
            <Loader2 className="h-3 w-3 animate-spin" />
            Agents executing...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agents.map((agent, index) => {
          const status = STATUS_CONFIG[agent.status] || STATUS_CONFIG.IDLE;
          const signalColor = SIGNAL_COLORS[agent.signal] || "var(--text-muted)";
          const isWorking = agent.status === 'SCANNING' || agent.status === 'ANALYZING';

          return (
            <div
              key={agent.id}
              className="profin-card-interactive spidey-watermark-card animate-slide-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards",
                borderColor: isWorking ? `${status.color}30` : undefined,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{AGENT_ICONS[agent.id]}</span>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "var(--text-secondary)" }}>
                      {agent.name}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{
                    background: status.color + "12",
                    color: status.color,
                  }}
                >
                  {status.icon}
                  <span className="text-[9px] font-bold tracking-wider">
                    {status.label}
                  </span>
                </div>
              </div>

              {/* Signal + Confidence row */}
              {!isWorking ? (
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[9px] tracking-wider" style={{ color: "var(--text-dim)" }}>SIGNAL</p>
                    <p className="text-sm font-bold" style={{ color: signalColor }}>
                      {agent.signal}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider" style={{ color: "var(--text-dim)" }}>CONFIDENCE</p>
                    <p className="text-sm font-bold">{agent.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider" style={{ color: "var(--text-dim)" }}>EVIDENCE</p>
                    <p className="text-sm font-bold">{agent.evidenceCount}</p>
                  </div>

                  {/* Mini confidence bar */}
                  <div className="flex-1 ml-auto">
                    <div className="profin-progress">
                      <div
                        className="profin-progress-fill"
                        style={{
                          width: `${agent.confidence}%`,
                          background: `linear-gradient(90deg, ${signalColor}80, ${signalColor})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full animate-shimmer"
                      style={{
                        width: "50%",
                        background: `linear-gradient(90deg, transparent, ${status.color}60, transparent)`,
                      }}
                    />
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>
                    {SCAN_MESSAGES[index % SCAN_MESSAGES.length]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
