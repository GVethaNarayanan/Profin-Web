"use client";

import { useState } from "react";
import { mockEvidenceChain } from "@/lib/mockData";
import type { EvidenceChain, EvidenceSource } from "@/lib/types";
import { AGENT_COLORS } from "@/lib/utils";
import { ExternalLink, FileText, CheckCircle, ChevronDown, ChevronRight, X } from "lucide-react";

interface Props {
  chain?: EvidenceChain;
}

export default function EvidenceGraph({ chain = mockEvidenceChain }: Props) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }}
        />
        <span className="micro-label-cyan">EVIDENCE GRAPH</span>
      </div>

      <div className="glass-panel p-5">
        {/* Decision root node */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "var(--violet-glow)",
              border: "1.5px solid var(--violet)",
            }}
          >
            <span className="text-[10px] font-bold" style={{ color: "var(--violet)" }}>D</span>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider" style={{ color: "var(--text-dim)" }}>DECISION</p>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {chain.decision} · {chain.confidence}% confidence
            </p>
          </div>
        </div>

        {/* Vertical connector */}
        <div className="ml-4 border-l border-dashed space-y-2 pl-6 pb-2" style={{ borderColor: "var(--border)" }}>
          {chain.agents.map((agent) => {
            const agentColor = AGENT_COLORS[agent.agentId] || "var(--violet)";
            const isExpanded = expandedAgent === agent.agentId;

            return (
              <div key={agent.agentId}>
                {/* Agent node */}
                <button
                  className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-lg -ml-3 transition-colors hover:bg-white/[0.02] group"
                  onClick={() => setExpandedAgent(isExpanded ? null : agent.agentId)}
                >
                  <div className="relative">
                    {/* Horizontal connector */}
                    <div
                      className="absolute -left-[27px] top-1/2 w-[21px] h-[1px]"
                      style={{ background: "var(--border)" }}
                    />
                    <div
                      className="flex items-center justify-center w-6 h-6 rounded-full"
                      style={{
                        background: agentColor + "15",
                        border: `1.5px solid ${agentColor}40`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: agentColor }} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: agentColor }}>
                      {agent.agentName}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>
                      {agent.sources.length} source{agent.sources.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" style={{ color: "var(--text-dim)" }} />
                  ) : (
                    <ChevronRight className="h-3 w-3" style={{ color: "var(--text-dim)" }} />
                  )}
                </button>

                {/* Sources */}
                {isExpanded && (
                  <div className="ml-5 space-y-2 mt-2 animate-slide-in">
                    {agent.sources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-white/[0.03]"
                        style={{
                          background: "rgba(255,255,255,0.01)",
                          border: "1px solid var(--border)",
                        }}
                        onClick={() => setSelectedSource(source)}
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: agentColor }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[11px] font-semibold truncate" style={{ color: "var(--text-secondary)" }}>
                              {source.title}
                            </p>
                            {source.verified && (
                              <span className="flex items-center gap-0.5 text-[8px] font-bold shrink-0" style={{ color: "var(--positive)" }}>
                                <CheckCircle className="h-2.5 w-2.5" />
                                VERIFIED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[9px]" style={{ color: "var(--text-dim)" }}>
                            {source.page && <span>PAGE {source.page}</span>}
                            <span>{source.relevance}% RELEVANCE</span>
                            <span>{source.source}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-dim)" }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Drawer */}
      {selectedSource && (
        <>
          <div className="profin-overlay animate-fade-in" onClick={() => setSelectedSource(null)} />
          <div className="profin-drawer animate-slide-in-right p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="micro-label-cyan">EVIDENCE SOURCE</span>
              <button
                onClick={() => setSelectedSource(null)}
                className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                <X className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{selectedSource.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium" style={{ color: "var(--text-dim)" }}>
                    {selectedSource.source}
                  </span>
                  {selectedSource.page && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ background: "var(--glass)", color: "var(--text-muted)" }}
                    >
                      PAGE {selectedSource.page}
                    </span>
                  )}
                  {selectedSource.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--positive)" }}>
                      <CheckCircle className="h-3 w-3" />
                      SOURCE VERIFIED
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg" style={{ background: "var(--glass)" }}>
                  <p className="micro-label mb-1">RELEVANCE</p>
                  <p className="text-lg font-bold" style={{ color: "var(--cyan)" }}>
                    {selectedSource.relevance}%
                  </p>
                </div>
                <div className="p-3 rounded-lg" style={{ background: "var(--glass)" }}>
                  <p className="micro-label mb-1">TYPE</p>
                  <p className="text-sm font-semibold uppercase">{selectedSource.type.replace('_', ' ')}</p>
                </div>
              </div>

              <div>
                <p className="micro-label mb-2">EXTRACTED EVIDENCE</p>
                <div
                  className="p-4 rounded-lg text-[13px] leading-relaxed"
                  style={{
                    background: "rgba(57, 216, 255, 0.03)",
                    border: "1px solid rgba(57, 216, 255, 0.1)",
                    color: "var(--text-secondary)",
                    borderLeft: "3px solid var(--cyan)",
                  }}
                >
                  {selectedSource.excerpt}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
