"use client";

import { useState } from "react";
import { mockTraceSteps } from "@/lib/mockData";
import type { TraceStep } from "@/lib/types";
import { AGENT_COLORS, DECISION_COLORS } from "@/lib/utils";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

interface Props {
  steps?: TraceStep[];
  finalDecision?: string;
  finalConfidence?: number;
  onStepClick?: (step: TraceStep) => void;
}

export default function DecisionTrace({
  steps = mockTraceSteps,
  finalDecision = "HOLD / WATCH",
  finalConfidence = 78,
  onStepClick,
}: Props) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const decisionColor = DECISION_COLORS[finalDecision] || "var(--warning)";

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet-glow)" }}
        />
        <span className="micro-label-violet">WHY THIS DECISION?</span>
      </div>

      <div className="glass-panel p-5">
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] top-0 bottom-0 w-[1px]"
            style={{ background: "var(--border)" }}
          />

          {/* Steps */}
          <div className="space-y-1">
            {steps.map((step, i) => {
              const isExpanded = expandedStep === i;
              const agentColor = step.agentId ? AGENT_COLORS[step.agentId] || "var(--violet)" : "var(--violet)";
              const isComplete = step.status === 'complete';
              const isActive = step.status === 'active';

              return (
                <div key={i} className="relative">
                  <button
                    className="flex items-start gap-4 w-full text-left py-2.5 px-1 rounded-lg transition-all hover:bg-white/[0.02] group"
                    onClick={() => {
                      setExpandedStep(isExpanded ? null : i);
                      if (onStepClick) onStepClick(step);
                    }}
                  >
                    {/* Step circle */}
                    <div
                      className="relative z-10 flex items-center justify-center shrink-0"
                      style={{ width: 30, height: 30 }}
                    >
                      {isComplete ? (
                        <div
                          className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
                          style={{
                            background: agentColor + "15",
                            border: `1.5px solid ${agentColor}50`,
                          }}
                        >
                          <CheckCircle className="h-3.5 w-3.5" style={{ color: agentColor }} />
                        </div>
                      ) : isActive ? (
                        <div
                          className="flex items-center justify-center w-[30px] h-[30px] rounded-full animate-pulse-glow"
                          style={{
                            background: "var(--violet-glow)",
                            border: "1.5px solid var(--violet)",
                          }}
                        >
                          <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: "var(--violet)" }} />
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
                          style={{
                            background: "var(--bg-surface)",
                            border: "1.5px solid var(--border)",
                          }}
                        >
                          <Circle className="h-3 w-3" style={{ color: "var(--text-dim)" }} />
                        </div>
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold" style={{ color: "var(--text-dim)" }}>
                          {String(step.step).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] font-semibold tracking-wider uppercase" style={{ color: isComplete ? "var(--text-secondary)" : "var(--text-dim)" }}>
                          {step.label}
                        </span>
                        {step.timestamp && (
                          <span className="text-[9px] ml-auto" style={{ color: "var(--text-dim)" }}>
                            {step.timestamp}
                          </span>
                        )}
                      </div>

                      {/* Description (expanded) */}
                      {isExpanded && (
                        <p className="text-[12px] leading-relaxed mt-1 animate-slide-in" style={{ color: "var(--text-muted)" }}>
                          {step.description}
                        </p>
                      )}
                    </div>

                    {/* Click hint */}
                    {step.agentId && (
                      <span
                        className="text-[8px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                        style={{ color: agentColor }}
                      >
                        FOCUS →
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Final decision */}
          <div className="relative mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-4 ml-1">
              <div
                className="flex items-center justify-center shrink-0 rounded-full"
                style={{
                  width: 30,
                  height: 30,
                  background: decisionColor + "15",
                  border: `2px solid ${decisionColor}`,
                  boxShadow: `0 0 12px ${decisionColor}30`,
                }}
              >
                <span className="text-[10px] font-bold" style={{ color: decisionColor }}>✓</span>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest" style={{ color: "var(--text-dim)" }}>FINAL</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold" style={{ color: decisionColor }}>
                    {finalDecision}
                  </span>
                  <span
                    className="text-sm font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--violet-glow)",
                      color: "var(--violet-bright)",
                    }}
                  >
                    {finalConfidence}% CONFIDENCE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
