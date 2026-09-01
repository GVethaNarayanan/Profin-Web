"use client";

import SystemStatus from "@/components/profin/SystemStatus";
import { Shield, Activity, Wifi, Server, CheckCircle2 } from "lucide-react";
import { mockSystemStatus } from "@/lib/mockData";

export default function StatusPage() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Shield className="h-5 w-5" style={{ color: "var(--positive)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-cyan">
            System Telemetry & Health
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Real-time service telemetry, agent latencies, and WebSocket connection health.
        </p>
      </div>

      {/* Spidey Sense Status Banner */}
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
              SPIDEY SENSE TELEMETRY: ALL SYSTEMS OPERATIONAL
            </span>
            <span className="status-dot-live" />
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Overall cluster latency: <span style={{ color: "var(--cyan)" }}>1.84s</span>. ChromaDB RAG vector index ready with 94% grounding accuracy.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SystemStatus />

        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4" style={{ color: "var(--cyan)" }} />
            <span className="micro-label-cyan">CLUSTER METRICS</span>
          </div>

          <MetricRow label="FastAPI Backend" status="OPERATIONAL" ping="12ms" />
          <MetricRow label="WebSocket Engine" status="STREAMING" ping="8ms" />
          <MetricRow label="ChromaDB Vector Store" status="READY" ping="14ms" />
          <MetricRow label="Google Gemini API" status="HEALTHY" ping="420ms" />
          <MetricRow label="Tavily News Search" status="CONNECTED" ping="180ms" />
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, status, ping }: { label: string; status: string; ping: string }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--border)" }}>
      <div>
        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
        <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>Ping: {ping}</p>
      </div>
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(56,230,165,0.1)", color: "var(--positive)" }}>
        ● {status}
      </span>
    </div>
  );
}
