"use client";

import { mockSystemStatus } from "@/lib/mockData";
import type { SystemStatus as SystemStatusType } from "@/lib/types";
import { Wifi, WifiOff } from "lucide-react";

interface Props {
  status?: SystemStatusType;
}

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  CONNECTED: { color: "var(--positive)", bg: "rgba(56,230,165,0.1)" },
  OPERATIONAL: { color: "var(--positive)", bg: "rgba(56,230,165,0.1)" },
  READY: { color: "var(--cyan)", bg: "rgba(57,216,255,0.1)" },
  DEGRADED: { color: "var(--warning)", bg: "rgba(255,200,87,0.1)" },
  DISCONNECTED: { color: "var(--negative)", bg: "rgba(255,92,114,0.1)" },
  ERROR: { color: "var(--negative)", bg: "rgba(255,92,114,0.1)" },
};

export default function SystemStatus({ status = mockSystemStatus }: Props) {
  const allHealthy = status.services.every(s =>
    s.status === 'CONNECTED' || s.status === 'OPERATIONAL' || s.status === 'READY'
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: allHealthy ? "var(--positive)" : "var(--warning)",
            boxShadow: allHealthy ? "0 0 6px var(--positive-glow)" : "0 0 6px var(--warning-glow)",
          }}
        />
        <span className="micro-label">PROFIN SYSTEM</span>
        {allHealthy ? (
          <Wifi className="h-3 w-3 ml-1" style={{ color: "var(--positive)" }} />
        ) : (
          <WifiOff className="h-3 w-3 ml-1" style={{ color: "var(--warning)" }} />
        )}
      </div>

      <div className="glass-panel p-4">
        <div className="space-y-2">
          {status.services.map((service, i) => {
            const style = STATUS_STYLES[service.status] || STATUS_STYLES.DISCONNECTED;
            return (
              <div key={i} className="flex items-center justify-between py-1.5">
                <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
                  {service.name}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                    style={{ color: style.color, background: style.bg }}
                  >
                    ● {service.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Latency */}
        <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-[10px] font-medium" style={{ color: "var(--text-dim)" }}>LATENCY</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: "var(--cyan)" }}>
            {status.overallLatency}s
          </span>
        </div>
      </div>
    </div>
  );
}
