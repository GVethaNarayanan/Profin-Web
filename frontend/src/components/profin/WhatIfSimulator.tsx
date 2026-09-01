"use client";

import { useState } from "react";
import { mockScenario } from "@/lib/mockData";
import type { Scenario } from "@/lib/types";
import { FlaskConical, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  scenario?: Scenario;
  ticker?: string;
}

export default function WhatIfSimulator({ scenario: initialScenario = mockScenario, ticker }: Props) {
  const [asset] = useState(ticker || initialScenario.asset);
  const [amount, setAmount] = useState(initialScenario.amount);
  const [marketBias, setMarketBias] = useState(50); // 0=bear, 50=neutral, 100=bull
  const [simulated, setSimulated] = useState(true);
  const scenario = initialScenario;

  // Interpolate outcome based on market bias
  const getInterpolatedReturn = () => {
    if (marketBias < 33) return scenario.outcomes.bear.returnPercent;
    if (marketBias > 66) return scenario.outcomes.bull.returnPercent;
    return scenario.outcomes.base.returnPercent;
  };

  const currentReturn = getInterpolatedReturn();
  const afterValue = scenario.portfolioBefore + amount + (amount * currentReturn / 100);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }}
        />
        <span className="micro-label-cyan">WHAT IF?</span>
        <FlaskConical className="h-3 w-3 ml-1" style={{ color: "var(--text-dim)" }} />
      </div>

      <div className="glass-panel p-5">
        {/* Prompt */}
        <p className="text-[13px] mb-5" style={{ color: "var(--text-secondary)" }}>
          &ldquo;What happens if I invest{" "}
          <span style={{ color: "var(--cyan)" }}>₹{amount.toLocaleString("en-IN")}</span>{" "}
          in{" "}
          <span style={{ color: "var(--violet-bright)" }}>{asset}</span>?&rdquo;
        </p>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div>
            <p className="micro-label mb-1.5">ASSET</p>
            <div className="profin-input text-sm font-semibold text-center py-2">{asset}</div>
          </div>
          <div>
            <p className="micro-label mb-1.5">ACTION</p>
            <div className="profin-input text-sm font-semibold text-center py-2" style={{ color: "var(--positive)" }}>BUY</div>
          </div>
          <div>
            <p className="micro-label mb-1.5">AMOUNT</p>
            <input
              type="text"
              value={`₹${amount.toLocaleString("en-IN")}`}
              onChange={(e) => {
                const v = parseInt(e.target.value.replace(/[^\d]/g, ''));
                if (!isNaN(v)) setAmount(v);
              }}
              className="profin-input text-sm font-semibold text-center py-2"
            />
          </div>
        </div>

        {/* Market scenario slider */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider" style={{ color: "var(--negative)" }}>BEAR</span>
            <span className="micro-label">MARKET SCENARIO</span>
            <span className="text-[10px] font-bold tracking-wider" style={{ color: "var(--positive)" }}>BULL</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              value={marketBias}
              onChange={(e) => {
                setMarketBias(parseInt(e.target.value));
                setSimulated(true);
              }}
              className="w-full h-1 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(90deg, var(--negative) 0%, var(--warning) 50%, var(--positive) 100%)`,
                accentColor: "var(--violet)",
              }}
            />
          </div>
        </div>

        {/* Outcome cards */}
        {simulated && (
          <div className="animate-fade-in-scale">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <OutcomeCard
                icon={<TrendingUp className="h-3.5 w-3.5" />}
                label={scenario.outcomes.bull.label}
                value={`+${scenario.outcomes.bull.returnPercent}%`}
                color="var(--positive)"
                isActive={marketBias > 66}
              />
              <OutcomeCard
                icon={<Minus className="h-3.5 w-3.5" />}
                label={scenario.outcomes.base.label}
                value={`+${scenario.outcomes.base.returnPercent}%`}
                color="var(--cyan)"
                isActive={marketBias >= 33 && marketBias <= 66}
              />
              <OutcomeCard
                icon={<TrendingDown className="h-3.5 w-3.5" />}
                label={scenario.outcomes.bear.label}
                value={`${scenario.outcomes.bear.returnPercent}%`}
                color="var(--negative)"
                isActive={marketBias < 33}
              />
            </div>

            {/* Portfolio impact */}
            <div className="space-y-3">
              <ImpactRow
                label="Portfolio"
                before={`₹${scenario.portfolioBefore.toLocaleString("en-IN")}`}
                after={`₹${Math.round(afterValue).toLocaleString("en-IN")}`}
                isPositive={afterValue > scenario.portfolioBefore}
              />
              <ImpactRow
                label="Risk Score"
                before={String(scenario.riskBefore)}
                after={String(scenario.riskAfter)}
                isPositive={false}
              />
              <ImpactRow
                label="IT Concentration"
                before={`${scenario.sectorConcentrationBefore}%`}
                after={`${scenario.sectorConcentrationAfter}%`}
                isPositive={false}
                isWarning={scenario.sectorConcentrationAfter > 35}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OutcomeCard({
  icon,
  label,
  value,
  color,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  isActive: boolean;
}) {
  return (
    <div
      className="p-3 rounded-lg text-center transition-all duration-300"
      style={{
        background: isActive ? color + "10" : "var(--glass)",
        border: `1px solid ${isActive ? color + "30" : "var(--border)"}`,
        transform: isActive ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div className="flex items-center justify-center mb-1" style={{ color }}>
        {icon}
      </div>
      <p className="text-[8px] font-bold tracking-wider mb-1" style={{ color: "var(--text-dim)" }}>
        {label}
      </p>
      <p className="text-lg font-bold tabular-nums" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

function ImpactRow({
  label,
  before,
  after,
  isPositive,
  isWarning = false,
}: {
  label: string;
  before: string;
  after: string;
  isPositive: boolean;
  isWarning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: "var(--glass)" }}>
      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-semibold tabular-nums" style={{ color: "var(--text-dim)" }}>
          {before}
        </span>
        <ArrowRight className="h-3 w-3" style={{ color: "var(--text-dim)" }} />
        <span
          className="text-[12px] font-bold tabular-nums"
          style={{
            color: isWarning ? "var(--warning)" : isPositive ? "var(--positive)" : "var(--text-primary)",
          }}
        >
          {after}
        </span>
      </div>
    </div>
  );
}
