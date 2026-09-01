"use client";

import { mockMarketTicker } from "@/lib/mockData";
import type { MarketTickerItem } from "@/lib/types";

interface Props {
  items?: MarketTickerItem[];
}

export default function MarketTicker({ items = mockMarketTicker }: Props) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        background: "rgba(255,255,255,0.015)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="animate-ticker flex items-center whitespace-nowrap py-2">
        {doubled.map((item, i) => {
          const isPositive = item.changePercent >= 0;
          return (
            <span key={i} className="flex items-center gap-1.5 px-5">
              <span className="text-[11px] font-semibold" style={{ color: "var(--text-muted)" }}>
                {item.symbol}
              </span>
              <span
                className="text-[11px] font-bold tabular-nums"
                style={{ color: isPositive ? "var(--positive)" : "var(--negative)" }}
              >
                {isPositive ? "+" : ""}{item.changePercent.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
