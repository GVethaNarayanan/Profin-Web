"use client";

import { useEffect, useState } from "react";
import { getAnalyses, type AnalysisResult } from "@/lib/api";
import { DECISION_COLORS, formatDate, formatPercent, AGENT_COLORS } from "@/lib/utils";
import { ChevronDown, ChevronUp, Clock, BarChart3 } from "lucide-react";
import Markdown from "react-markdown";

const TABS = ["fundamentals", "sentiment", "technical", "risk_manager"] as const;
const TAB_LABELS: Record<string, string> = {
  fundamentals: "Fundamental",
  sentiment: "Sentiment",
  technical: "Technical",
  risk_manager: "Risk",
};

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyses(20)
      .then(setAnalyses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" style={{ borderColor: "var(--violet)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 className="h-5 w-5" style={{ color: "var(--violet)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-violet">Research</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Past analyses and agent reports
        </p>
      </div>

      {analyses.length === 0 ? (
        <div className="flex h-48 items-center justify-center glass-panel">
          <p className="text-sm" style={{ color: "var(--text-dim)" }}>
            No analyses yet. Go to the dashboard to analyze a stock.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((a) => {
            const isExpanded = expandedId === a.analysis_id;
            const decisionColor = DECISION_COLORS[a.decision] || "var(--warning)";

            return (
              <div
                key={a.analysis_id}
                className="glass-panel overflow-hidden"
                style={{
                  borderColor: isExpanded ? "var(--border-hover)" : undefined,
                }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : a.analysis_id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">{a.ticker}</span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                      style={{
                        color: decisionColor,
                        backgroundColor: decisionColor + "15",
                      }}
                    >
                      {a.decision}
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {formatPercent(a.confidence)} confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-dim)" }}>
                      <Clock className="h-3 w-3" />
                      {formatDate(a.created_at)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" style={{ color: "var(--text-dim)" }} />
                    ) : (
                      <ChevronDown className="h-4 w-4" style={{ color: "var(--text-dim)" }} />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-4 p-5 animate-slide-in" style={{ borderTop: "1px solid var(--border)" }}>
                    {/* Decision summary */}
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        background: decisionColor + "08",
                        border: `1px solid ${decisionColor}20`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold" style={{ color: decisionColor }}>{a.decision}</span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                          {formatPercent(a.confidence)} confidence
                        </span>
                      </div>
                      {a.reasoning && (
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {a.reasoning}
                        </p>
                      )}
                    </div>

                    {/* Report tabs */}
                    <div className="glass-surface overflow-hidden">
                      <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
                        {TABS.map((tab) => {
                          const isActive = tab === activeTab;
                          const color = AGENT_COLORS[tab] || "var(--text-dim)";
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className="relative flex-1 px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                              style={{
                                color: isActive ? "var(--text-primary)" : "var(--text-dim)",
                              }}
                            >
                              <span className="flex items-center justify-center gap-1.5">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                                {TAB_LABELS[tab] || tab}
                              </span>
                              {isActive && (
                                <span
                                  className="absolute bottom-0 left-0 h-0.5 w-full"
                                  style={{ backgroundColor: color }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto p-5">
                        {(() => {
                          const reportKey = activeTab === 'risk_manager' ? 'risk_report' :
                                           activeTab === 'fundamentals' ? 'fundamentals_report' :
                                           activeTab === 'sentiment' ? 'sentiment_report' :
                                           'technical_report';
                          const report = (a as unknown as Record<string, unknown>)[reportKey] as Record<string, unknown> | undefined;
                          const analysis = (report?.analysis as string) || "";
                          const error = report?.error as string | undefined;

                          if (error) return <p className="text-sm" style={{ color: "var(--negative)" }}>Error: {error}</p>;
                          if (analysis) return (
                            <div className="prose prose-invert prose-sm max-w-none" style={{ color: "var(--text-secondary)" }}>
                              <Markdown>{analysis}</Markdown>
                            </div>
                          );
                          return <p className="text-sm" style={{ color: "var(--text-dim)" }}>No report available</p>;
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
