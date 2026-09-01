"use client";

import { mockInvestorProfile } from "@/lib/mockData";
import type { InvestorProfile } from "@/lib/types";
import { User, Shield } from "lucide-react";

interface Props {
  profile?: InvestorProfile;
}

export default function InvestorDNA({ profile = mockInvestorProfile }: Props) {
  const bars = [
    { label: "RISK TOLERANCE", value: profile.riskTolerance, color: "var(--violet)" },
    { label: "LOSS SENSITIVITY", value: profile.lossSensitivity, color: "var(--negative)" },
    { label: "DIVERSIFICATION", value: profile.diversification, color: "var(--cyan)" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet-glow)" }}
        />
        <span className="micro-label-violet">YOUR FINANCIAL DNA</span>
        <User className="h-3 w-3 ml-1" style={{ color: "var(--text-dim)" }} />
      </div>

      <div className="glass-panel p-5">
        {/* Progress bars */}
        <div className="space-y-4 mb-5">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold tracking-wider" style={{ color: "var(--text-dim)" }}>
                  {bar.label}
                </span>
                <span className="text-[11px] font-bold tabular-nums" style={{ color: "var(--text-secondary)" }}>
                  {bar.value}%
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${bar.value}%`,
                    background: `linear-gradient(90deg, ${bar.color}60, ${bar.color})`,
                    boxShadow: `0 0 8px ${bar.color}30`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg" style={{ background: "var(--glass)" }}>
            <p className="micro-label mb-1">HORIZON</p>
            <p className="text-lg font-bold">{profile.horizonYears} YEARS</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: "var(--glass)" }}>
            <p className="micro-label mb-1">PORTFOLIO VALUE</p>
            <p className="text-lg font-bold" style={{ color: "var(--positive)" }}>
              {profile.currency}{profile.portfolioValue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Personalization note */}
        <div
          className="flex items-center gap-2 p-3 rounded-lg"
          style={{
            background: "rgba(139, 124, 255, 0.04)",
            border: "1px solid rgba(139, 124, 255, 0.1)",
          }}
        >
          <Shield className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--violet)" }} />
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            PROFIN is adapting analysis to your portfolio and risk profile.
          </p>
        </div>
      </div>
    </div>
  );
}
