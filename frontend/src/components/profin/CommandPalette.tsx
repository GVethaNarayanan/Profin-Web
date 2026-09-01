"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Activity,
  Briefcase,
  FlaskConical,
  FileSearch,
  BarChart3,
  User,
  Settings,
  Zap,
  Command,
} from "lucide-react";

interface CommandItem {
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandItem[] = [
    { label: "Analyze stock", description: "Run multi-agent analysis on a ticker", icon: <Zap className="h-4 w-4" />, action: () => router.push("/"), category: "Analysis" },
    { label: "Open Intelligence", description: "View the intelligence web dashboard", icon: <Activity className="h-4 w-4" />, action: () => router.push("/"), category: "Navigation" },
    { label: "Open Portfolio", description: "View your portfolio holdings", icon: <Briefcase className="h-4 w-4" />, action: () => router.push("/portfolio"), category: "Navigation" },
    { label: "Run What-If", description: "Simulate investment scenarios", icon: <FlaskConical className="h-4 w-4" />, action: () => router.push("/whatif"), category: "Analysis" },
    { label: "View Evidence", description: "Browse evidence sources and chains", icon: <FileSearch className="h-4 w-4" />, action: () => router.push("/evidence"), category: "Research" },
    { label: "View Research", description: "Past analysis history", icon: <BarChart3 className="h-4 w-4" />, action: () => router.push("/analysis"), category: "Research" },
    { label: "Investor Profile", description: "Your financial DNA settings", icon: <User className="h-4 w-4" />, action: () => router.push("/investor"), category: "Settings" },
    { label: "System Settings", description: "Configure PROFIN preferences", icon: <Settings className="h-4 w-4" />, action: () => router.push("/settings"), category: "Settings" },
  ];

  const filtered = query
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        setIsOpen(false);
      }
    }
  }, [filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="profin-overlay animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette */}
      <div
        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[110] w-full max-w-[560px] animate-fade-in-scale"
        style={{
          background: "var(--bg-primary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(139,124,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-dim)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text-primary)" }}
          />
          <kbd
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{ background: "var(--glass)", color: "var(--text-dim)", border: "1px solid var(--border)" }}
          >
            ESC
          </kbd>
        </div>

        {/* Commands list */}
        <div className="py-2 max-h-[360px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>No commands found</p>
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={i}
                className="flex items-center gap-3 w-full px-5 py-3 text-left transition-colors"
                style={{
                  background: i === selectedIndex ? "var(--glass-hover)" : "transparent",
                }}
                onClick={() => {
                  cmd.action();
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                  style={{ background: "var(--glass)", color: "var(--violet)" }}
                >
                  {cmd.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                    {cmd.label}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                    {cmd.description}
                  </p>
                </div>
                <span className="text-[10px] shrink-0" style={{ color: "var(--text-dim)" }}>
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.01)" }}
        >
          <div className="flex items-center gap-3 text-[10px]" style={{ color: "var(--text-dim)" }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-2.5 w-2.5" style={{ color: "var(--text-dim)" }} />
            <span className="text-[10px]" style={{ color: "var(--text-dim)" }}>PROFIN COMMAND</span>
          </div>
        </div>
      </div>
    </>
  );
}
