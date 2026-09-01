"use client";

import WhatIfSimulator from "@/components/profin/WhatIfSimulator";
import { FlaskConical, Sliders, ShieldAlert, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { mockScenario } from "@/lib/mockData";

export default function WhatIfPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <FlaskConical className="h-5 w-5" style={{ color: "var(--cyan)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-cyan">
            What-If Decision Simulator
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Simulate position entries, stress-test market scenarios, and analyze portfolio risk impact.
        </p>
      </div>

      {/* Spidey Sense Stress Test Alert Banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl animate-slide-in"
        style={{
          background: "rgba(139, 124, 255, 0.06)",
          border: "1px solid rgba(139, 124, 255, 0.2)",
        }}
      >
        <span className="text-xl">🕷️</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--violet-bright)" }}>
              SPIDEY SENSE: STRESS TEST RADAR ACTIVE
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Simulating ₹50,000 INFY buy action against 1,000 Monte Carlo scenarios. Maximum drawdown risk: -7.6% under severe bear market conditions.
          </p>
        </div>
      </div>

      {/* Main What-If Simulator Component */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <WhatIfSimulator />

        {/* Stress Test Breakdown */}
        <div className="space-y-6">
          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="h-4 w-4" style={{ color: "var(--violet)" }} />
              <span className="micro-label-violet">SCENARIO MATRIX</span>
            </div>

            <div className="space-y-3">
              <MatrixItem label="Bull Case (+10% Market)" outcome="+8.2%" color="var(--positive)" confidence="92%" />
              <MatrixItem label="Base Case (+2% Market)" outcome="+3.1%" color="var(--cyan)" confidence="78%" />
              <MatrixItem label="Bear Case (-8% Market)" outcome="-7.6%" color="var(--negative)" confidence="64%" />
              <MatrixItem label="Rate Hike Spike Scenario" outcome="-4.2%" color="var(--warning)" confidence="70%" />
            </div>
          </div>

          <div className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-4 w-4" style={{ color: "var(--warning)" }} />
              <span className="micro-label" style={{ color: "var(--warning)" }}>CONCENTRATION WARNING</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Adding ₹50,000 in INFY increases IT sector allocation from <span style={{ color: "var(--text-primary)" }}>32%</span> to <span style={{ color: "var(--warning)" }}>41%</span>. Consider rebalancing into Banking or Energy to maintain diversification optimal limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixItem({
  label,
  outcome,
  color,
  confidence,
}: {
  label: string;
  outcome: string;
  color: string;
  confidence: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--glass)" }}>
      <div>
        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
        <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>Confidence: {confidence}</p>
      </div>
      <span className="text-sm font-bold tabular-nums" style={{ color }}>
        {outcome}
      </span>
    </div>
  );
}
