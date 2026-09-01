"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Loader2, Zap } from "lucide-react";
import { AnalysisWebSocket, type WSMessage } from "@/lib/websocket";
import { getAnalyses, type AnalysisResult } from "@/lib/api";
import { AGENT_COLORS } from "@/lib/utils";

import HeroSection from "@/components/profin/HeroSection";
import IntelligenceWeb from "@/components/profin/IntelligenceWeb";
import AgentNetwork from "@/components/profin/AgentNetwork";
import ReasoningStream from "@/components/profin/ReasoningStream";
import DecisionTrace from "@/components/profin/DecisionTrace";
import ConflictEngine from "@/components/profin/ConflictEngine";
import AIDebate from "@/components/profin/AIDebate";
import EvidenceGraph from "@/components/profin/EvidenceGraph";
import WhatIfSimulator from "@/components/profin/WhatIfSimulator";
import InvestorDNA from "@/components/profin/InvestorDNA";
import SystemStatus from "@/components/profin/SystemStatus";
import PerformanceMetrics from "@/components/profin/PerformanceMetrics";

import { getDynamicMarketData, getDynamicDecision } from "@/lib/mockData";

export default function Dashboard() {
  const [ticker, setTicker] = useState("");
  const [activeTicker, setActiveTicker] = useState("INFY");
  const [messages, setMessages] = useState<WSMessage[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedWebNode, setSelectedWebNode] = useState<string | null>(null);
  const wsRef = useRef<AnalysisWebSocket | null>(null);

  useEffect(() => {
    const ws = new AnalysisWebSocket();
    wsRef.current = ws;
    ws.connect();

    const unsub = ws.onMessage((msg) => {
      if (msg.type === "agent_message" || msg.type === "status") {
        setMessages((prev) => [...prev, msg]);
      } else if (msg.type === "result") {
        setResult(msg.data || null);
        setIsRunning(false);
        getAnalyses(5).catch(() => {});
      } else if (msg.type === "error") {
        setMessages((prev) => [...prev, msg]);
        setIsRunning(false);
      }
    });

    return () => {
      unsub();
      ws.disconnect();
    };
  }, []);

  const handleAnalyze = useCallback(() => {
    const t = ticker.trim().toUpperCase();
    if (!t || isRunning) return;
    setActiveTicker(t);
    setMessages([]);
    setResult(null);
    setIsRunning(true);
    wsRef.current?.analyze(t);
  }, [ticker, isRunning]);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedWebNode(nodeId === selectedWebNode ? null : nodeId);
  }, [selectedWebNode]);

  // Compute live market data and decision for the active ticker
  const activeMarketData = result?.market_data || getDynamicMarketData(activeTicker);
  const activeDecision = result?.decision || getDynamicDecision(activeTicker);

  return (
    <div className="space-y-6 pb-12">
      {/* ═══ SEARCH BAR (PRIMARY TOP POSITION) ═══ */}
      <div className="glass-panel p-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--violet)" }} />
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="Enter stock ticker symbol (e.g., INFY, TCS, RELIANCE, AAPL)..."
              className="profin-input pl-12 pr-4 bg-black/20"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isRunning || !ticker.trim()}
            className="profin-button-primary px-6"
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {isRunning ? "Analyzing..." : "Analyze Stock"}
          </button>
        </div>
      </div>

      {/* ═══ HERO SECTION ═══ */}
      <HeroSection marketData={activeMarketData} decision={activeDecision} />

      {/* ═══ LIVE AGENT STATUS STRIP ═══ */}
      {isRunning && messages.length > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl animate-slide-in"
          style={{
            background: "var(--glass)",
            border: "1px solid var(--border)",
          }}
        >
          <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--violet)" }} />
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            {(() => {
              const last = messages[messages.length - 1];
              const agent = last.agent || "system";
              const color = AGENT_COLORS[agent] || "var(--text-dim)";
              return (
                <>
                  <span
                    className="h-2 w-2 shrink-0 rounded-full animate-pulse-glow"
                    style={{ backgroundColor: color }}
                  />
                  <span className="truncate text-sm" style={{ color: "var(--text-secondary)" }}>
                    {last.content}
                  </span>
                </>
              );
            })()}
          </div>
          <span className="ml-auto shrink-0 text-[11px] tabular-nums" style={{ color: "var(--text-dim)" }}>
            {messages.length} steps
          </span>
        </div>
      )}

      {/* ═══ INTELLIGENCE WEB ═══ */}
      <IntelligenceWeb
        onNodeSelect={handleNodeSelect}
        selectedNode={selectedWebNode}
        height={460}
      />

      {/* ═══ AGENT NETWORK + REASONING STREAM ═══ */}
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <AgentNetwork isAnalyzing={isRunning} />
        <ReasoningStream
          entries={
            messages.length > 0
              ? messages.map((m) => ({
                  timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
                  agent: m.agent || "SYSTEM",
                  content: m.content || m.message || "Processing...",
                  type: (m.type === "error" ? "conflict" : m.agent === "portfolio_manager" ? "synthesis" : "analysis") as any,
                }))
              : undefined
          }
          autoStream={messages.length === 0}
        />
      </div>

      {/* ═══ DECISION TRACE + CONFLICT ENGINE ═══ */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <DecisionTrace
          onStepClick={(step) => {
            if (step.agentId) handleNodeSelect(step.agentId);
          }}
        />
        <div className="space-y-6">
          <ConflictEngine />
          <SystemStatus />
        </div>
      </div>

      {/* ═══ AI DEBATE + EVIDENCE GRAPH ═══ */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AIDebate />
        <EvidenceGraph />
      </div>

      {/* ═══ WHAT-IF + INVESTOR DNA ═══ */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        <WhatIfSimulator ticker={activeTicker} />
        <InvestorDNA />
      </div>

      {/* ═══ PERFORMANCE METRICS ═══ */}
      <PerformanceMetrics />

      {/* ═══ TAGLINE FOOTER ═══ */}
      <div className="text-center py-8">
        <p className="micro-label mb-2">HACKVERSE: INTO THE WEB</p>
        <p className="text-sm font-medium gradient-text-violet">
          &ldquo;Connect the signals. Understand the decision.&rdquo;
        </p>
      </div>
    </div>
  );
}
