"use client";

import { mockPerformanceMetrics } from "@/lib/mockData";
import type { PerformanceMetric } from "@/lib/types";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  metrics?: PerformanceMetric[];
}

export default function PerformanceMetrics({ metrics = mockPerformanceMetrics }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan-glow)" }}
        />
        <span className="micro-label-cyan">PROFIN PERFORMANCE</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, i) => {
          const isPositive = (metric.change || 0) >= 0;
          return (
            <div
              key={i}
              className="glass-panel p-4 animate-slide-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
            >
              <p className="micro-label mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <span className="number-lg" style={{ color: "var(--text-primary)" }}>
                  {metric.value}
                </span>
                {metric.change !== undefined && (
                  <span
                    className="flex items-center gap-0.5 text-[10px] font-semibold"
                    style={{ color: isPositive ? "var(--positive)" : "var(--negative)" }}
                  >
                    {isPositive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {isPositive ? "+" : ""}{metric.change}%
                  </span>
                )}
              </div>

              {/* Mini sparkline */}
              {metric.sparkline && (
                <div className="mt-3 h-6">
                  <MiniSparkline data={metric.sparkline} color={isPositive ? "var(--positive)" : "var(--negative)"} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 100;
  const step = w / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * step;
    const y = h - ((val - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#spark-${color})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
