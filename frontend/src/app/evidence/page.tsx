"use client";

import EvidenceGraph from "@/components/profin/EvidenceGraph";
import { FileSearch, CheckCircle, Database, ShieldCheck, Search } from "lucide-react";
import { mockEvidenceSources } from "@/lib/mockData";

export default function EvidencePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <FileSearch className="h-5 w-5" style={{ color: "var(--cyan)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-cyan">
            Evidence Graph & RAG Explorer
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Audit verified SEC filings, news disclosures, and grounded agent reasoning chains.
        </p>
      </div>

      {/* Spidey Sense Grounding Banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl animate-slide-in"
        style={{
          background: "rgba(56, 230, 165, 0.06)",
          border: "1px solid rgba(56, 230, 165, 0.2)",
        }}
      >
        <span className="text-xl">🕷️</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--positive)" }}>
              SPIDEY SENSE: 94% GROUNDED EVIDENCE VERIFIED
            </span>
            <span className="status-dot-live" />
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            All fundamental reports are strictly grounded in SEC 10-K disclosures (Page 14 & 42) retrieved via ChromaDB vector index.
          </p>
        </div>
      </div>

      {/* Main Evidence Graph */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <EvidenceGraph />

        {/* Evidence Sources Overview */}
        <div className="space-y-6">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4" style={{ color: "var(--cyan)" }} />
              <span className="micro-label-cyan">INDEX STATS</span>
            </div>
            <div className="space-y-3">
              <StatRow label="Indexed Filings" value="48 SEC Documents" />
              <StatRow label="Vector Embeddings" value="12,450 Chunks" />
              <StatRow label="RAG Retrieval Latency" value="320ms" />
              <StatRow label="Verification Status" value="100% Grounded" color="var(--positive)" />
            </div>
          </div>

          {/* Source List */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4" style={{ color: "var(--positive)" }} />
              <span className="micro-label" style={{ color: "var(--positive)" }}>VERIFIED SOURCES</span>
            </div>
            <div className="space-y-2">
              {mockEvidenceSources.map((ev) => (
                <div key={ev.id} className="p-2.5 rounded-lg" style={{ background: "var(--glass)" }}>
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{ev.title}</p>
                  <div className="flex items-center justify-between mt-1 text-[10px]" style={{ color: "var(--text-dim)" }}>
                    <span>{ev.source}</span>
                    <span style={{ color: "var(--cyan)" }}>{ev.relevance}% relevance</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-xs font-bold" style={{ color: color || "var(--text-primary)" }}>{value}</span>
    </div>
  );
}
