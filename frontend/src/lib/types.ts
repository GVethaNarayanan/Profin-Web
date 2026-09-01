/* ══════════════════════════════════════════
   PROFIN WEB — TypeScript Interfaces
   ══════════════════════════════════════════ */

// ─── Market Data ─────────────────────────

export interface MarketData {
  ticker: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  currency: string;
  isLive: boolean;
  lastUpdated: string;
}

export interface PricePoint {
  date: string;
  close: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}

// ─── Agent Results ───────────────────────

export type AgentSignal = 'BULLISH' | 'BEARISH' | 'NEUTRAL' | 'POSITIVE' | 'NEGATIVE' | 'CAUTION';
export type AgentStatus = 'IDLE' | 'SCANNING' | 'ANALYZING' | 'COMPLETE' | 'ERROR' | 'DEGRADED';
export type AgentType = 'technical' | 'fundamental' | 'sentiment' | 'risk';

export interface AgentResult {
  id: AgentType;
  name: string;
  status: AgentStatus;
  signal: AgentSignal;
  confidence: number;
  latency: number;
  evidenceCount: number;
  analysis: string;
  highlights: string[];
  error?: string;
}

// ─── Evidence ────────────────────────────

export interface EvidenceSource {
  id: string;
  type: 'filing' | 'news' | 'technical' | 'market_data';
  title: string;
  source: string;
  page?: number;
  relevance: number;
  timestamp: string;
  verified: boolean;
  excerpt: string;
  agentId: AgentType;
}

export interface EvidenceChain {
  decision: string;
  confidence: number;
  agents: {
    agentId: AgentType;
    agentName: string;
    sources: EvidenceSource[];
  }[];
}

// ─── Investor Profile ────────────────────

export interface InvestorProfile {
  riskTolerance: number;      // 0-100
  lossSensitivity: number;    // 0-100
  diversification: number;    // 0-100
  horizonYears: number;
  portfolioValue: number;
  currency: string;
}

// ─── Portfolio ───────────────────────────

export interface PortfolioSector {
  name: string;
  allocation: number;
  isConcentrated: boolean;
}

export interface PortfolioSummary {
  totalValue: number;
  currency: string;
  sectors: PortfolioSector[];
  riskScore: number;
  diversificationScore: number;
}

export interface PortfolioHolding {
  ticker: string;
  shares: number;
  avgEntryPrice: number;
  currentPrice: number;
  currentDecision: string;
  lastAnalysisId: string;
  updatedAt: string | null;
  sector: string;
  allocation: number;
}

// ─── Scenario / What-If ──────────────────

export interface ScenarioOutcome {
  label: string;
  returnPercent: number;
  portfolioValue: number;
}

export interface Scenario {
  asset: string;
  action: 'BUY' | 'SELL';
  amount: number;
  outcomes: {
    bull: ScenarioOutcome;
    base: ScenarioOutcome;
    bear: ScenarioOutcome;
  };
  portfolioBefore: number;
  portfolioAfter: number;
  riskBefore: number;
  riskAfter: number;
  sectorConcentrationBefore: number;
  sectorConcentrationAfter: number;
}

// ─── Decision ────────────────────────────

export type DecisionAction = 'BUY' | 'SELL' | 'HOLD' | 'HOLD / WATCH' | 'WAIT / WATCH';

export interface Decision {
  action: DecisionAction;
  confidence: number;
  reasoning: string;
  ticker: string;
  targetPrice?: number;
  stopLoss?: number;
  positionSizePct?: number;
  timeHorizon?: string;
}

// ─── Decision Trace ──────────────────────

export interface TraceStep {
  step: number;
  label: string;
  description: string;
  agentId?: AgentType;
  status: 'complete' | 'active' | 'pending';
  timestamp?: string;
}

// ─── Intelligence Web ────────────────────

export type WebNodeType = 'core' | 'agent' | 'data' | 'evidence' | 'portfolio';

export interface WebNode {
  id: string;
  label: string;
  type: WebNodeType;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  signal?: AgentSignal;
  confidence?: number;
  status?: AgentStatus;
}

export type ConnectionStrength = 'strong' | 'medium' | 'weak' | 'warning' | 'conflict';

export interface WebConnection {
  from: string;
  to: string;
  strength: ConnectionStrength;
  label?: string;
  animated: boolean;
}

// ─── System Status ───────────────────────

export type ServiceStatus = 'CONNECTED' | 'OPERATIONAL' | 'READY' | 'DEGRADED' | 'DISCONNECTED' | 'ERROR';

export interface SystemService {
  name: string;
  status: ServiceStatus;
  latency?: number;
}

export interface SystemStatus {
  services: SystemService[];
  overallLatency: number;
  timestamp: string;
}

// ─── Conflict ────────────────────────────

export interface SignalConflict {
  agent1: AgentType;
  agent2: AgentType;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

// ─── AI Debate ───────────────────────────

export interface DebateEntry {
  agentId: AgentType | 'profin';
  agentName: string;
  statement: string;
  signal?: AgentSignal;
}

// ─── Reasoning Stream ────────────────────

export interface ReasoningEntry {
  timestamp: string;
  agent: string;
  content: string;
  type: 'info' | 'analysis' | 'conflict' | 'synthesis' | 'data';
}

// ─── Market Ticker ───────────────────────

export interface MarketTickerItem {
  symbol: string;
  changePercent: number;
}

// ─── Performance Metrics ─────────────────

export interface PerformanceMetric {
  label: string;
  value: string;
  change?: number;
  sparkline?: number[];
}
