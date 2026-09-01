"use client";

import { useState } from "react";
import { Globe, TrendingUp, TrendingDown, ArrowUpRight, Search, Zap, ShieldAlert } from "lucide-react";
import { mockMarketTicker, mockMarketData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

const SECTORS = [
  { name: "IT / Tech", change: 1.84, signal: "BULLISH", anomaly: false, volume: "₹4,280 Cr" },
  { name: "Banking & Fin", change: 0.89, signal: "POSITIVE", anomaly: false, volume: "₹6,120 Cr" },
  { name: "Energy & Oil", change: -0.42, signal: "CAUTION", anomaly: true, volume: "₹3,450 Cr" },
  { name: "Pharma", change: 0.12, signal: "NEUTRAL", anomaly: false, volume: "₹1,890 Cr" },
  { name: "Auto & Mobility", change: 2.15, signal: "BULLISH", anomaly: false, volume: "₹2,760 Cr" },
];

const WATCHLIST = [
  { symbol: "INFY", name: "Infosys Ltd.", price: 1482.50, change: 2.41, signal: "HOLD / WATCH", target: 1580, rsi: 58 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3580.00, change: 1.12, signal: "BUY", target: 3850, rsi: 62 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2445.00, change: -0.38, signal: "HOLD", target: 2600, rsi: 48 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1620.00, change: 0.89, signal: "BUY", target: 1780, rsi: 55 },
  { symbol: "WIPRO", name: "Wipro Ltd.", price: 445.00, change: 1.54, signal: "BUY", target: 490, rsi: 60 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", price: 1020.00, change: 0.67, signal: "BUY", target: 1120, rsi: 54 },
];

export default function MarketsPage() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const filteredWatchlist = WATCHLIST.filter(
    (item) =>
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Globe className="h-5 w-5" style={{ color: "var(--cyan)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-cyan">
            Markets Intelligence
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Real-time market signals, sector momentum, and Spidey Sense anomaly radar.
        </p>
      </div>

      {/* Spidey Sense Market Alert Banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl animate-slide-in"
        style={{
          background: "rgba(255, 92, 114, 0.06)",
          border: "1px solid rgba(255, 92, 114, 0.2)",
        }}
      >
        <span className="text-xl">🕷️</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--negative)" }}>
              SPIDEY SENSE: SECTOR ANOMALY RADAR
            </span>
            <span className="status-dot-warning" />
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Energy sector volume spike (+34%) detected with negative momentum divergence (-0.42%). Spidey Sense recommends monitoring oil inventory reports.
          </p>
        </div>
      </div>

      {/* Top Indices Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mockMarketTicker.slice(0, 4).map((ticker, idx) => {
          const isPos = ticker.changePercent >= 0;
          return (
            <div key={idx} className="glass-panel p-4 animate-slide-in">
              <p className="micro-label mb-1">{ticker.symbol}</p>
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold" style={{ color: isPos ? "var(--positive)" : "var(--negative)" }}>
                  {isPos ? "+" : ""}{ticker.changePercent.toFixed(2)}%
                </span>
                <ArrowUpRight
                  className="h-4 w-4 mb-0.5"
                  style={{
                    color: isPos ? "var(--positive)" : "var(--negative)",
                    transform: isPos ? "none" : "rotate(90deg)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sector Momentum Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--violet)", boxShadow: "0 0 6px var(--violet-glow)" }} />
          <span className="micro-label-violet">SECTOR RADAR</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SECTORS.map((sector) => {
            const isPos = sector.change >= 0;
            return (
              <div
                key={sector.name}
                className="glass-panel p-4 cursor-pointer transition-all hover:border-[var(--violet-bright)]"
                onClick={() => setSelectedSector(sector.name === selectedSector ? null : sector.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">{sector.name}</span>
                  {sector.anomaly && <span className="text-xs" title="Spidey Sense Anomaly">🕷️</span>}
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-lg font-bold" style={{ color: isPos ? "var(--positive)" : "var(--negative)" }}>
                    {isPos ? "+" : ""}{sector.change}%
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--glass)", color: "var(--text-muted)" }}>
                    {sector.signal}
                  </span>
                </div>
                <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>Volume: {sector.volume}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Watchlist Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }} />
            <span className="micro-label-cyan">LIVE MARKET WATCHLIST</span>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "var(--text-dim)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search watchlist..."
              className="profin-input pl-9 py-1.5 text-xs"
            />
          </div>
        </div>

        <div className="glass-panel overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="px-5 py-3 text-left micro-label">Symbol</th>
                <th className="px-5 py-3 text-left micro-label">Company</th>
                <th className="px-5 py-3 text-left micro-label">Price</th>
                <th className="px-5 py-3 text-left micro-label">24h Change</th>
                <th className="px-5 py-3 text-left micro-label">RSI (14)</th>
                <th className="px-5 py-3 text-left micro-label">Target</th>
                <th className="px-5 py-3 text-left micro-label">PROFIN Signal</th>
              </tr>
            </thead>
            <tbody>
              {filteredWatchlist.map((stock) => {
                const isPos = stock.change >= 0;
                return (
                  <tr
                    key={stock.symbol}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="px-5 py-3.5 font-bold text-sm" style={{ color: "var(--violet-bright)" }}>
                      {stock.symbol}
                    </td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                      {stock.name}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold tabular-nums">
                      ₹{stock.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-bold tabular-nums" style={{ color: isPos ? "var(--positive)" : "var(--negative)" }}>
                      {isPos ? "+" : ""}{stock.change}%
                    </td>
                    <td className="px-5 py-3.5 text-xs tabular-nums" style={{ color: stock.rsi > 60 ? "var(--positive)" : "var(--text-muted)" }}>
                      {stock.rsi}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-semibold tabular-nums" style={{ color: "var(--cyan)" }}>
                      ₹{stock.target}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                        style={{
                          background: stock.signal.includes("BUY") ? "rgba(56,230,165,0.15)" : "rgba(255,200,87,0.15)",
                          color: stock.signal.includes("BUY") ? "var(--positive)" : "var(--warning)",
                        }}
                      >
                        {stock.signal}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
