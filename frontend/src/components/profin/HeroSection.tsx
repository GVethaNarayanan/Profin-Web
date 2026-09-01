"use client";

import { getGreeting } from "@/lib/utils";
import { mockMarketData, mockDecision } from "@/lib/mockData";
import ConfidenceRing from "./ConfidenceRing";
import { SIGNAL_COLORS, DECISION_COLORS } from "@/lib/utils";
import { ArrowUpRight, Eye, FlaskConical, FileSearch, Radio } from "lucide-react";

import type { MarketData, Decision } from "@/lib/types";

interface HeroSectionProps {
  marketData?: MarketData;
  decision?: Decision;
}

export default function HeroSection({ marketData, decision: customDecision }: HeroSectionProps) {
  const market = marketData || mockMarketData;
  const decision = customDecision || mockDecision;
  const greeting = getGreeting();
  const isPositive = market.changePercent >= 0;
  const decisionColor = DECISION_COLORS[decision.action] || "var(--warning)";

  return (
    <section className="animate-fade-in">
      {/* Top header row */}
      <div className="flex items-start justify-between mb-8">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight gradient-text-violet">
              PROFIN WEB
            </h1>
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
              style={{
                background: "rgba(56,230,165,0.1)",
                color: "var(--positive)",
                border: "1px solid rgba(56,230,165,0.15)",
              }}
            >
              <span className="status-dot-live" />
              LIVE
            </span>
          </div>

          {/* Subtitle */}
          <p className="micro-label-violet mb-5">
            LIVE FINANCIAL INTELLIGENCE
          </p>

          {/* Spidey Sense Threat Radar Banner */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg mb-4 animate-slide-in"
            style={{
              background: "rgba(255, 92, 114, 0.08)",
              border: "1px solid rgba(255, 92, 114, 0.2)",
            }}
          >
            <span className="text-sm">🕷️</span>
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "var(--negative)" }}>
              SPIDEY SENSE:
            </span>
            <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
              Technical momentum bullish but Sector Concentration Risk (32% → 41%) detected.
            </span>
          </div>

          {/* Greeting */}
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {greeting}. Your portfolio has{" "}
            <span style={{ color: "var(--warning)" }}>3 signals</span>{" "}
            requiring attention.
          </p>
        </div>
      </div>

      {/* Main hero grid: Stock info + Decision panel */}
      <div className="grid gap-5 lg:grid-cols-[1fr,380px]">
        {/* Stock information card */}
        <div className="glass-panel p-6 animate-slide-in">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {market.ticker}
                </span>
                <span className="micro-label" style={{ color: "var(--text-dim)" }}>
                  {market.exchange}: {market.ticker}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {market.name}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 animate-pulse-glow" style={{ color: "var(--positive)" }} />
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--positive)" }}>
                LIVE
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="flex items-end gap-4 mb-6">
            <span className="number-xl" style={{ fontSize: 40, color: "var(--text-primary)" }}>
              {market.currency}{market.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-1 mb-1">
              <ArrowUpRight
                className="h-4 w-4"
                style={{
                  color: isPositive ? "var(--positive)" : "var(--negative)",
                  transform: isPositive ? "none" : "rotate(90deg)",
                }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: isPositive ? "var(--positive)" : "var(--negative)" }}
              >
                {isPositive ? "+" : ""}{market.changePercent.toFixed(2)}%
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                ({isPositive ? "+" : ""}{market.currency}{market.change.toFixed(2)})
              </span>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-4 gap-4">
            <QuickStat label="OPEN" value={`${market.currency}${market.open.toLocaleString("en-IN")}`} />
            <QuickStat label="HIGH" value={`${market.currency}${market.high.toLocaleString("en-IN")}`} color="var(--positive)" />
            <QuickStat label="LOW" value={`${market.currency}${market.low.toLocaleString("en-IN")}`} color="var(--negative)" />
            <QuickStat label="VOLUME" value={`${(market.volume / 1_000_000).toFixed(1)}M`} />
          </div>
        </div>

        {/* PROFIN Decision Panel */}
        <div
          className="glass-panel p-6 animate-slide-in-right flex flex-col items-center"
          style={{
            background: "rgba(139,124,255,0.03)",
            borderColor: "rgba(139,124,255,0.12)",
          }}
        >
          <span className="micro-label-violet mb-4">PROFIN DECISION</span>

          {/* Decision badge */}
          <div
            className="flex items-center gap-2 px-5 py-2 rounded-full mb-5"
            style={{
              background: decisionColor + "15",
              border: `1px solid ${decisionColor}30`,
            }}
          >
            <span
              className="text-lg font-bold tracking-wide"
              style={{ color: decisionColor }}
            >
              {decision.action}
            </span>
          </div>

          {/* Confidence ring */}
          <ConfidenceRing value={decision.confidence} size={140} />

          {/* Reasoning */}
          <p
            className="text-[12px] leading-relaxed text-center mt-4 mb-5 px-2"
            style={{ color: "var(--text-muted)" }}
          >
            {decision.reasoning.length > 160
              ? decision.reasoning.slice(0, 160) + "..."
              : decision.reasoning}
          </p>

          {/* Action buttons */}
          <div className="flex gap-2 w-full">
            <button className="profin-button-ghost flex-1 justify-center">
              <Eye className="h-3 w-3" />
              WHY?
            </button>
            <button className="profin-button-ghost flex-1 justify-center">
              <FlaskConical className="h-3 w-3" />
              SIMULATE
            </button>
            <button className="profin-button-ghost flex-1 justify-center">
              <FileSearch className="h-3 w-3" />
              EVIDENCE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <p className="micro-label mb-1">{label}</p>
      <p className="text-sm font-semibold number-display" style={{ color: color || "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}
