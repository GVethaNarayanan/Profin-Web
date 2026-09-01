"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;         // 0-100
  size?: number;         // px
  strokeWidth?: number;
  color?: string;
  glowColor?: string;
  label?: string;
  animate?: boolean;
}

export default function ConfidenceRing({
  value,
  size = 140,
  strokeWidth = 6,
  color = "var(--violet)",
  glowColor = "var(--violet-glow)",
  label = "CONFIDENCE",
  animate = true,
}: Props) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const rafRef = useRef<number>(0);

  const center = size / 2;
  const radius = center - strokeWidth - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    const start = performance.now();
    const duration = 1500;
    const startVal = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.round(startVal + (value - startVal) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, animate]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`ring-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
          <filter id={`ring-glow-${size}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Active ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#ring-gradient-${size})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={`url(#ring-glow-${size})`}
          style={{
            transition: animate ? "none" : "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* End dot */}
        {displayValue > 5 && (
          <circle
            cx={center + radius * Math.cos(((displayValue / 100) * 360 - 90) * Math.PI / 180)}
            cy={center + radius * Math.sin(((displayValue / 100) * 360 - 90) * Math.PI / 180)}
            r={strokeWidth / 2 + 1}
            fill="var(--cyan)"
            style={{
              filter: `drop-shadow(0 0 4px ${glowColor})`,
            }}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="number-xl animate-count-up"
          style={{ color: "var(--text-primary)", fontSize: size > 100 ? 32 : 22 }}
        >
          {displayValue}%
        </span>
        <span className="micro-label mt-1" style={{ fontSize: size > 100 ? 10 : 8 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
