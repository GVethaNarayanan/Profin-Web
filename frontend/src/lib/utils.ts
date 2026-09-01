import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency Formatting ─────────────────

export function formatINR(value: number | null | undefined): string {
  if (value == null) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function formatCompactINR(value: number): string {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2)} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(2)} L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return "N/A";
  // If value is already in percentage form (>1 or <-1), show directly
  if (Math.abs(value) > 1) return `${value.toFixed(1)}%`;
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// ─── Agent Colors & Labels (PROFIN Palette) ─

export const AGENT_COLORS: Record<string, string> = {
  technical: "#39D8FF",
  fundamentals: "#38E6A5",
  fundamental: "#38E6A5",
  sentiment: "#FFC857",
  risk: "#FF5C72",
  risk_manager: "#FF5C72",
  portfolio_manager: "#8B7CFF",
  profin: "#8B7CFF",
  system: "#778397",
};

export const AGENT_LABELS: Record<string, string> = {
  technical: "Technical Intelligence",
  fundamentals: "Fundamental Intelligence",
  fundamental: "Fundamental Intelligence",
  sentiment: "Sentiment Intelligence",
  risk: "Risk Intelligence",
  risk_manager: "Risk Intelligence",
  portfolio_manager: "PROFIN Synthesis",
  profin: "PROFIN Synthesis",
  system: "System",
};

export const DECISION_COLORS: Record<string, string> = {
  BUY: "#38E6A5",
  SELL: "#FF5C72",
  HOLD: "#FFC857",
  "HOLD / WATCH": "#FFC857",
  "WAIT / WATCH": "#FFC857",
};

export const SIGNAL_COLORS: Record<string, string> = {
  BULLISH: "#38E6A5",
  POSITIVE: "#38E6A5",
  BEARISH: "#FF5C72",
  NEGATIVE: "#FF5C72",
  NEUTRAL: "#FFC857",
  CAUTION: "#FF5C72",
};

// ─── Number Animation Helper ─────────────

export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) {
  const startTime = performance.now();
  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const eased = 1 - Math.pow(2, -10 * progress);
    const current = start + (end - start) * eased;
    callback(current);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}
