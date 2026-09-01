"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  Briefcase,
  FileSearch,
  FlaskConical,
  Globe,
  Layers,
  Settings,
  Shield,
  User,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Intelligence", icon: Activity, shortcut: "1" },
  { href: "/markets", label: "Markets", icon: Globe, shortcut: "2" },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase, shortcut: "3" },
  { href: "/analysis", label: "Research", icon: BarChart3, shortcut: "4" },
  { href: "/whatif", label: "What If?", icon: FlaskConical, shortcut: "5" },
  { href: "/evidence", label: "Evidence", icon: FileSearch, shortcut: "6" },
];

const BOTTOM_ITEMS = [
  { href: "/investor", label: "Investor", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/status", label: "System", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
      style={{
        width: isExpanded ? "var(--sidebar-expanded)" : "var(--sidebar-width)",
        background: "var(--bg-primary)",
        borderRight: "1px solid var(--border)",
        transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-5"
        style={{ minHeight: 68 }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--violet) 0%, var(--cyan) 100%)",
            boxShadow: "0 0 20px var(--violet-glow)",
          }}
        >
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div
          className="overflow-hidden whitespace-nowrap"
          style={{
            opacity: isExpanded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <div className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            PROFIN
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold tracking-[0.15em]" style={{ color: "var(--violet)" }}>
              WEB
            </span>
            <span
              className="text-[8px] font-extrabold px-1 py-0.2 rounded"
              style={{
                background: "rgba(255, 92, 114, 0.12)",
                color: "var(--negative)",
                border: "1px solid rgba(255, 92, 114, 0.25)",
              }}
            >
              🕷️ SPIDEY
            </span>
          </div>
        </div>
      </Link>

      {/* Separator */}
      <div className="mx-3 mb-2" style={{ height: 1, background: "var(--border)" }} />

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200"
              style={{
                background: isActive ? "var(--violet-glow)" : "transparent",
                color: isActive ? "var(--violet-bright)" : "var(--text-muted)",
              }}
              title={!isExpanded ? item.label : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  style={{
                    width: 3,
                    height: 20,
                    borderRadius: "0 2px 2px 0",
                    background: "var(--violet)",
                    boxShadow: "0 0 8px var(--violet-glow)",
                  }}
                />
              )}

              <Icon
                className="h-[18px] w-[18px] shrink-0 transition-colors duration-200"
                style={{
                  color: isActive ? "var(--violet)" : undefined,
                }}
              />

              <span
                className="text-[13px] font-medium whitespace-nowrap overflow-hidden transition-all duration-200"
                style={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                }}
              >
                {item.label}
              </span>

              {/* Keyboard shortcut */}
              {isExpanded && (
                <span
                  className="ml-auto text-[10px] font-medium"
                  style={{ color: "var(--text-dim)" }}
                >
                  {item.shortcut}
                </span>
              )}

              {/* Hover effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: isActive ? "transparent" : "var(--glass)",
                }}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="flex flex-col gap-1 px-2 py-2 mb-2">
        <div className="mx-1 mb-1" style={{ height: 1, background: "var(--border)" }} />

        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200"
              style={{
                color: isActive ? "var(--text-primary)" : "var(--text-dim)",
              }}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className="text-[12px] font-medium whitespace-nowrap overflow-hidden transition-all duration-200"
                style={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                }}
              >
                {item.label}
              </span>
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "var(--glass)" }}
              />
            </Link>
          );
        })}

        {/* Command palette hint */}
        {isExpanded && (
          <div
            className="flex items-center gap-2 mx-1 mt-2 px-3 py-2 rounded-lg"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--border)",
            }}
          >
            <Layers className="h-3 w-3" style={{ color: "var(--text-dim)" }} />
            <span className="text-[11px]" style={{ color: "var(--text-dim)" }}>
              ⌘K Command
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
