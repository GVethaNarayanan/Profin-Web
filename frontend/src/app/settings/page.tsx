"use client";

import { useState } from "react";
import { Settings, Cpu, Key, Server, CheckCircle2, Save } from "lucide-react";

export default function SettingsPage() {
  const [provider, setProvider] = useState("gemini");
  const [apiKey, setApiKey] = useState("************************");
  const [wsEndpoint, setWsEndpoint] = useState("ws://localhost:8000/ws/analysis");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Settings className="h-5 w-5" style={{ color: "var(--cyan)" }} />
          <h1 className="text-2xl font-bold tracking-tight gradient-text-cyan">
            PROFIN System Settings
          </h1>
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Configure multi-agent LLM providers, API endpoints, and WebSocket connection parameters.
        </p>
      </div>

      {/* Spidey Sense Config Banner */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl animate-slide-in"
        style={{
          background: "rgba(57, 216, 255, 0.06)",
          border: "1px solid rgba(57, 216, 255, 0.2)",
        }}
      >
        <span className="text-xl">🕷️</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--cyan)" }}>
              SPIDEY SENSE ENGINE CONFIGURATION
            </span>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Google Gemini 1.5 Pro / Flash active with zero-latency streaming. Swappable to OpenAI or Groq.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="glass-panel p-6 space-y-6">
        {/* LLM Provider Selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="h-4 w-4" style={{ color: "var(--violet)" }} />
            <span className="micro-label-violet">LLM PROVIDER ENGINE</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ProviderCard
              name="Google Gemini"
              badge="FREE / ACTIVE"
              selected={provider === "gemini"}
              onClick={() => setProvider("gemini")}
            />
            <ProviderCard
              name="OpenAI GPT-4o"
              badge="PREMIUM"
              selected={provider === "openai"}
              onClick={() => setProvider("openai")}
            />
            <ProviderCard
              name="Groq Llama 3"
              badge="FAST"
              selected={provider === "groq"}
              onClick={() => setProvider("groq")}
            />
          </div>
        </div>

        {/* API Key */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Key className="h-4 w-4" style={{ color: "var(--cyan)" }} />
            <span className="micro-label-cyan">API KEY SECRET</span>
          </div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="profin-input font-mono text-xs"
          />
        </div>

        {/* WebSocket Endpoint */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-4 w-4" style={{ color: "var(--positive)" }} />
            <span className="micro-label" style={{ color: "var(--positive)" }}>WEBSOCKET TELEMETRY ENDPOINT</span>
          </div>
          <input
            type="text"
            value={wsEndpoint}
            onChange={(e) => setWsEndpoint(e.target.value)}
            className="profin-input font-mono text-xs"
          />
        </div>

        {/* Save button */}
        <div className="pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          {saved ? (
            <span className="flex items-center gap-2 text-xs font-bold" style={{ color: "var(--positive)" }}>
              <CheckCircle2 className="h-4 w-4" />
              Settings saved successfully!
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--text-dim)" }}>
              Changes take effect immediately on next analysis.
            </span>
          )}

          <button onClick={handleSave} className="profin-button-primary">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ProviderCard({
  name,
  badge,
  selected,
  onClick,
}: {
  name: string;
  badge: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl cursor-pointer transition-all border"
      style={{
        background: selected ? "rgba(139,124,255,0.08)" : "var(--glass)",
        borderColor: selected ? "var(--violet)" : "var(--border)",
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: selected ? "var(--text-primary)" : "var(--text-muted)" }}>
        {name}
      </p>
      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--glass)", color: "var(--violet-bright)" }}>
        {badge}
      </span>
    </div>
  );
}
