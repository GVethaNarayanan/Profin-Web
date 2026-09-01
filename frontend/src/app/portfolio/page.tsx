"use client";

import { useEffect, useState } from "react";
import { getPortfolio, type PortfolioHolding as APIHolding } from "@/lib/api";
import { DECISION_COLORS, formatCurrency, formatDate } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import InvestorDNA from "@/components/profin/InvestorDNA";
import { mockPortfolioSummary } from "@/lib/mockData";

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<APIHolding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolio()
      .then(setHoldings)
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

  const summary = mockPortfolioSummary;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Briefcase className="h-5 w-5" style={{ color: "var(--violet)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-violet">Portfolio</h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Track your holdings and AI recommendations
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <SummaryCard label="Total Value" value={`₹${summary.totalValue.toLocaleString("en-IN")}`} color="var(--text-primary)" />
        <SummaryCard label="Risk Score" value={`${summary.riskScore}%`} color="var(--warning)" />
        <SummaryCard
          label="Buy Signals"
          value={holdings.filter((h) => h.current_decision === "BUY").length.toString()}
          color="var(--positive)"
        />
        <SummaryCard
          label="Sell Signals"
          value={holdings.filter((h) => h.current_decision === "SELL").length.toString()}
          color="var(--negative)"
        />
      </div>

      {/* Portfolio Exposure */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet-glow)" }} />
          <span className="micro-label-violet">PORTFOLIO EXPOSURE</span>
        </div>
        <div className="glass-panel p-5">
          <div className="grid grid-cols-5 gap-3">
            {summary.sectors.map((sector) => (
              <div key={sector.name} className="text-center">
                <div className="relative mb-2">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke={sector.isConcentrated ? "var(--warning)" : "var(--violet)"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${sector.allocation * 2.51} 251`}
                      transform="rotate(-90 50 50)"
                      style={{ filter: sector.isConcentrated ? "drop-shadow(0 0 4px var(--warning-glow))" : undefined }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
                    {sector.allocation}%
                  </span>
                </div>
                <p className="text-[10px] font-semibold tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {sector.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings table + Investor DNA */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }} />
            <span className="micro-label-cyan">HOLDINGS</span>
          </div>

          {holdings.length === 0 ? (
            <div className="flex h-48 items-center justify-center glass-panel">
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>
                No holdings yet. Run an analysis to get started.
              </p>
            </div>
          ) : (
            <div className="glass-panel overflow-hidden p-0">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th className="px-5 py-3 text-left micro-label">Ticker</th>
                    <th className="px-5 py-3 text-left micro-label">Shares</th>
                    <th className="px-5 py-3 text-left micro-label">Avg Entry</th>
                    <th className="px-5 py-3 text-left micro-label">Signal</th>
                    <th className="px-5 py-3 text-left micro-label">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr
                      key={h.ticker}
                      className="transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <td className="px-5 py-3 font-semibold">{h.ticker}</td>
                      <td className="px-5 py-3 text-sm tabular-nums">{h.shares}</td>
                      <td className="px-5 py-3 text-sm tabular-nums">{formatCurrency(h.avg_entry_price)}</td>
                      <td className="px-5 py-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{
                            color: DECISION_COLORS[h.current_decision] || "var(--warning)",
                            backgroundColor: (DECISION_COLORS[h.current_decision] || "var(--warning)") + "15",
                          }}
                        >
                          {h.current_decision}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm" style={{ color: "var(--text-dim)" }}>
                        {formatDate(h.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <InvestorDNA />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass-panel p-5">
      <p className="micro-label mb-2">{label}</p>
      <p className="number-lg" style={{ color: color || "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}
