"use client";

import InvestorDNA from "@/components/profin/InvestorDNA";
import { User, Sliders, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { mockInvestorProfile } from "@/lib/mockData";

export default function InvestorPage() {
  const [profile, setProfile] = useState(mockInvestorProfile);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <User className="h-5 w-5" style={{ color: "var(--violet)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-violet">
            Investor Digital Twin & DNA
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Customize your financial DNA to adapt multi-agent AI synthesis to your personal risk tolerance.
        </p>
      </div>

      {/* Spidey Sense DNA Banner */}
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
              SPIDEY SENSE: ADAPTIVE PERSONALIZATION ACTIVE
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            PROFIN synthesizes BUY / HOLD / SELL recommendations strictly calibrated against your Risk Tolerance ({profile.riskTolerance}%) and Loss Sensitivity ({profile.lossSensitivity}%).
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        {/* DNA Sliders & Controls */}
        <div className="glass-panel p-6 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="h-4 w-4" style={{ color: "var(--violet)" }} />
            <span className="micro-label-violet">FINANCIAL DNA CONFIGURATION</span>
          </div>

          <SliderControl
            label="RISK TOLERANCE"
            value={profile.riskTolerance}
            onChange={(val) => setProfile((p) => ({ ...p, riskTolerance: val }))}
            description="Controls conviction threshold for high-volatility buy signals."
          />

          <SliderControl
            label="LOSS SENSITIVITY"
            value={profile.lossSensitivity}
            onChange={(val) => setProfile((p) => ({ ...p, lossSensitivity: val }))}
            description="Triggers tighter stop-loss recommendations on drawdown risk."
          />

          <SliderControl
            label="DIVERSIFICATION TARGET"
            value={profile.diversification}
            onChange={(val) => setProfile((p) => ({ ...p, diversification: val }))}
            description="Caps max sector exposure (e.g. 35% concentration threshold)."
          />

          <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <button className="profin-button-primary w-full justify-center">
              <Zap className="h-4 w-4" />
              Save DNA Profile
            </button>
          </div>
        </div>

        {/* Investor DNA Live Preview */}
        <InvestorDNA profile={profile} />
      </div>
    </div>
  );
}

function SliderControl({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider" style={{ color: "var(--text-primary)" }}>{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: "var(--violet-bright)" }}>{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(90deg, var(--violet) 0%, var(--cyan) ${value}%, rgba(255,255,255,0.06) ${value}%)`,
          accentColor: "var(--violet-bright)",
        }}
      />
      <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>{description}</p>
    </div>
  );
}
