/* ══════════════════════════════════════════
   PROFIN WEB — Centralized Mock Data Adapter
   ══════════════════════════════════════════
   Single source of truth for all mock data.
   Follows the same schema as the real API.
   Toggle USE_MOCK to switch between mock and real data.
   ══════════════════════════════════════════ */

import type {
  MarketData,
  AgentResult,
  EvidenceSource,
  EvidenceChain,
  InvestorProfile,
  PortfolioSummary,
  PortfolioHolding,
  Scenario,
  Decision,
  TraceStep,
  WebNode,
  WebConnection,
  SystemStatus,
  SignalConflict,
  DebateEntry,
  ReasoningEntry,
  MarketTickerItem,
  PerformanceMetric,
  PricePoint,
} from './types';

// ─── Toggle ──────────────────────────────
export const USE_MOCK = true;

// ─── Market Data ─────────────────────────

export const mockMarketData: MarketData = {
  ticker: 'INFY',
  name: 'Infosys Limited',
  exchange: 'NSE',
  price: 1482.50,
  change: 34.92,
  changePercent: 2.41,
  volume: 12_450_000,
  high: 1498.00,
  low: 1445.20,
  open: 1447.60,
  previousClose: 1447.58,
  marketCap: 6_140_000_000_000,
  currency: '₹',
  isLive: true,
  lastUpdated: new Date().toISOString(),
};

export const mockPriceHistory: PricePoint[] = (() => {
  const points: PricePoint[] = [];
  let price = 1380;
  const now = Date.now();
  for (let i = 60; i >= 0; i--) {
    const day = new Date(now - i * 86400000);
    const change = (Math.random() - 0.45) * 20;
    price = Math.max(1300, Math.min(1550, price + change));
    points.push({
      date: day.toISOString().split('T')[0],
      close: Math.round(price * 100) / 100,
      open: Math.round((price - Math.random() * 10) * 100) / 100,
      high: Math.round((price + Math.random() * 15) * 100) / 100,
      low: Math.round((price - Math.random() * 15) * 100) / 100,
      volume: Math.round(8_000_000 + Math.random() * 8_000_000),
    });
  }
  // Ensure last point matches our market price
  points[points.length - 1].close = 1482.50;
  return points;
})();

// ─── Agent Results ───────────────────────

export const mockAgentResults: AgentResult[] = [
  {
    id: 'technical',
    name: 'Technical Intelligence',
    status: 'COMPLETE',
    signal: 'BULLISH',
    confidence: 84,
    latency: 420,
    evidenceCount: 12,
    analysis: 'RSI at 58 indicates continued bullish momentum without overbought conditions. MACD shows positive crossover with increasing histogram. Price trading above 20-day and 50-day EMAs. Bollinger Bands showing expansion suggesting strong trend continuation.',
    highlights: [
      'RSI momentum supports entry',
      'MACD positive crossover confirmed',
      'Price above all key moving averages',
    ],
  },
  {
    id: 'fundamental',
    name: 'Fundamental Intelligence',
    status: 'COMPLETE',
    signal: 'POSITIVE',
    confidence: 76,
    latency: 680,
    evidenceCount: 8,
    analysis: 'Q1 FY27 earnings beat estimates by 4.2%. Revenue growth at 6.8% YoY driven by digital services. Operating margins improved 120bps. Strong deal pipeline with $4.2B TCV signed. Attrition declining to 12.4%.',
    highlights: [
      'Earnings beat estimates by 4.2%',
      'Revenue growth 6.8% YoY',
      'Operating margin expansion',
    ],
  },
  {
    id: 'sentiment',
    name: 'Sentiment Intelligence',
    status: 'COMPLETE',
    signal: 'NEUTRAL',
    confidence: 63,
    latency: 340,
    evidenceCount: 24,
    analysis: 'Mixed sentiment landscape. Positive analyst coverage with 18/24 buy ratings. However, social media sentiment shows uncertainty around IT sector spending trends. Insider trading neutral with minor sells by mid-management.',
    highlights: [
      'Analyst consensus: BUY (18/24)',
      'Social media sentiment mixed',
      'Insider activity neutral',
    ],
  },
  {
    id: 'risk',
    name: 'Risk Intelligence',
    status: 'COMPLETE',
    signal: 'CAUTION',
    confidence: 71,
    latency: 520,
    evidenceCount: 6,
    analysis: 'Portfolio concentration risk detected — IT sector already at 32% allocation. Adding INFY would increase to 41%, exceeding recommended 35% threshold. Currency risk (USD/INR) exposure elevated. Beta of 0.92 within acceptable range.',
    highlights: [
      'Sector concentration: 32% → 41%',
      'Currency risk elevated',
      'Beta within acceptable range',
    ],
  },
];

// ─── Decision ────────────────────────────

export const mockDecision: Decision = {
  action: 'HOLD / WATCH',
  confidence: 78,
  reasoning: 'Strong technical momentum and positive fundamentals are offset by mixed sentiment and elevated portfolio concentration. Three of four signals support entry, but portfolio risk reduces conviction. Recommend monitoring for improved sentiment or sector rebalancing before accumulating.',
  ticker: 'INFY',
  targetPrice: 1580,
  stopLoss: 1420,
  positionSizePct: 5,
  timeHorizon: '3-6 months',
};

// ─── Evidence Chain ──────────────────────

export const mockEvidenceSources: EvidenceSource[] = [
  {
    id: 'ev-1',
    type: 'filing',
    title: 'Q1 FY27 Earnings Disclosure',
    source: 'NSE EDGAR',
    page: 14,
    relevance: 94,
    timestamp: '2026-08-28T10:30:00Z',
    verified: true,
    excerpt: 'Revenue from digital services grew 11.2% YoY reaching ₹28,400 crore, driven by large deal execution in financial services and manufacturing verticals...',
    agentId: 'fundamental',
  },
  {
    id: 'ev-2',
    type: 'filing',
    title: 'Annual Report FY26',
    source: 'NSE EDGAR',
    page: 42,
    relevance: 87,
    timestamp: '2026-06-15T08:00:00Z',
    verified: true,
    excerpt: 'Operating margin improved to 21.3% from 20.1% in FY25, aided by operational efficiency programs and pyramid optimization initiatives...',
    agentId: 'fundamental',
  },
  {
    id: 'ev-3',
    type: 'news',
    title: 'Infosys wins $2.1B deal from European bank',
    source: 'Reuters',
    relevance: 82,
    timestamp: '2026-08-25T14:22:00Z',
    verified: true,
    excerpt: 'Infosys has secured a $2.1 billion multi-year contract from a major European financial institution for digital transformation services...',
    agentId: 'sentiment',
  },
  {
    id: 'ev-4',
    type: 'technical',
    title: 'RSI & MACD Signal Analysis',
    source: 'Technical Engine',
    relevance: 91,
    timestamp: new Date().toISOString(),
    verified: true,
    excerpt: 'RSI(14) = 58.2, MACD(12,26,9) showing bullish crossover. Price above 20-EMA (₹1,458) and 50-EMA (₹1,432). Volume profile supports continuation.',
    agentId: 'technical',
  },
  {
    id: 'ev-5',
    type: 'market_data',
    title: 'Portfolio Concentration Analysis',
    source: 'Risk Engine',
    relevance: 88,
    timestamp: new Date().toISOString(),
    verified: true,
    excerpt: 'Current IT sector allocation at 32.4%. Recommended maximum: 35%. Adding ₹50,000 in INFY would push allocation to 41.2%, triggering concentration warning.',
    agentId: 'risk',
  },
];

export const mockEvidenceChain: EvidenceChain = {
  decision: 'HOLD / WATCH',
  confidence: 78,
  agents: [
    {
      agentId: 'fundamental',
      agentName: 'Fundamental Intelligence',
      sources: mockEvidenceSources.filter(e => e.agentId === 'fundamental'),
    },
    {
      agentId: 'technical',
      agentName: 'Technical Intelligence',
      sources: mockEvidenceSources.filter(e => e.agentId === 'technical'),
    },
    {
      agentId: 'sentiment',
      agentName: 'Sentiment Intelligence',
      sources: mockEvidenceSources.filter(e => e.agentId === 'sentiment'),
    },
    {
      agentId: 'risk',
      agentName: 'Risk Intelligence',
      sources: mockEvidenceSources.filter(e => e.agentId === 'risk'),
    },
  ],
};

// ─── Investor Profile ────────────────────

export const mockInvestorProfile: InvestorProfile = {
  riskTolerance: 68,
  lossSensitivity: 74,
  diversification: 55,
  horizonYears: 3,
  portfolioValue: 542680,
  currency: '₹',
};

// ─── Portfolio ───────────────────────────

export const mockPortfolioSummary: PortfolioSummary = {
  totalValue: 542680,
  currency: '₹',
  sectors: [
    { name: 'IT', allocation: 32, isConcentrated: false },
    { name: 'Banking', allocation: 27, isConcentrated: false },
    { name: 'Energy', allocation: 12, isConcentrated: false },
    { name: 'Pharma', allocation: 8, isConcentrated: false },
    { name: 'Other', allocation: 21, isConcentrated: false },
  ],
  riskScore: 42,
  diversificationScore: 65,
};

export const mockPortfolioHoldings: PortfolioHolding[] = [
  { ticker: 'INFY', shares: 50, avgEntryPrice: 1420, currentPrice: 1482.50, currentDecision: 'HOLD', lastAnalysisId: 'a1', updatedAt: new Date().toISOString(), sector: 'IT', allocation: 14 },
  { ticker: 'TCS', shares: 20, avgEntryPrice: 3450, currentPrice: 3580, currentDecision: 'HOLD', lastAnalysisId: 'a2', updatedAt: new Date().toISOString(), sector: 'IT', allocation: 13 },
  { ticker: 'HDFCBANK', shares: 100, avgEntryPrice: 1580, currentPrice: 1620, currentDecision: 'BUY', lastAnalysisId: 'a3', updatedAt: new Date().toISOString(), sector: 'Banking', allocation: 30 },
  { ticker: 'RELIANCE', shares: 30, avgEntryPrice: 2380, currentPrice: 2445, currentDecision: 'HOLD', lastAnalysisId: 'a4', updatedAt: new Date().toISOString(), sector: 'Energy', allocation: 14 },
  { ticker: 'SUNPHARMA', shares: 60, avgEntryPrice: 1180, currentPrice: 1210, currentDecision: 'SELL', lastAnalysisId: 'a5', updatedAt: new Date().toISOString(), sector: 'Pharma', allocation: 13 },
  { ticker: 'WIPRO', shares: 80, avgEntryPrice: 420, currentPrice: 445, currentDecision: 'HOLD', lastAnalysisId: 'a6', updatedAt: new Date().toISOString(), sector: 'IT', allocation: 7 },
  { ticker: 'ICICIBANK', shares: 40, avgEntryPrice: 980, currentPrice: 1020, currentDecision: 'BUY', lastAnalysisId: 'a7', updatedAt: new Date().toISOString(), sector: 'Banking', allocation: 8 },
];

// ─── Scenario ────────────────────────────

export const mockScenario: Scenario = {
  asset: 'INFY',
  action: 'BUY',
  amount: 50000,
  outcomes: {
    bull: { label: 'BULL CASE', returnPercent: 8.2, portfolioValue: 596580 },
    base: { label: 'BASE CASE', returnPercent: 3.1, portfolioValue: 594080 },
    bear: { label: 'BEAR CASE', returnPercent: -7.6, portfolioValue: 588880 },
  },
  portfolioBefore: 542680,
  portfolioAfter: 592680,
  riskBefore: 42,
  riskAfter: 49,
  sectorConcentrationBefore: 32,
  sectorConcentrationAfter: 41,
};

// ─── Decision Trace ──────────────────────

export const mockTraceSteps: TraceStep[] = [
  { step: 1, label: 'MARKET INGESTION', description: 'Live market data received for INFY. Price: ₹1,482.50 (+2.41%)', status: 'complete', timestamp: '10:42:12' },
  { step: 2, label: 'TECHNICAL ANALYSIS', description: 'RSI, MACD, Bollinger Bands computed. Bullish momentum detected.', agentId: 'technical', status: 'complete', timestamp: '10:42:13' },
  { step: 3, label: 'FUNDAMENTAL ANALYSIS', description: 'SEC filings retrieved via RAG. Earnings beat identified on page 14.', agentId: 'fundamental', status: 'complete', timestamp: '10:42:14' },
  { step: 4, label: 'SENTIMENT ANALYSIS', description: 'News and social sentiment aggregated. Mixed signals detected.', agentId: 'sentiment', status: 'complete', timestamp: '10:42:15' },
  { step: 5, label: 'RISK ASSESSMENT', description: 'Portfolio concentration risk identified. IT allocation at 32%.', agentId: 'risk', status: 'complete', timestamp: '10:42:16' },
  { step: 6, label: 'CONFLICT DETECTION', description: 'Technical ↔ Sentiment disagreement. Confidence gap: 21 points.', status: 'complete', timestamp: '10:42:17' },
  { step: 7, label: 'INVESTOR PERSONALIZATION', description: 'Risk tolerance (68%) and 3-year horizon applied to decision.', status: 'complete', timestamp: '10:42:17' },
  { step: 8, label: 'PROFIN SYNTHESIS', description: 'Final decision generated: HOLD / WATCH at 78% confidence.', status: 'complete', timestamp: '10:42:18' },
];

// ─── Intelligence Web Nodes ──────────────

export const mockWebNodes: WebNode[] = [
  { id: 'core', label: 'PROFIN\nAI CORE', type: 'core', x: 0, y: 0, radius: 32, color: '#8B7CFF', glowColor: 'rgba(139,124,255,0.3)' },
  { id: 'market', label: 'MARKET', type: 'data', x: 0, y: -160, radius: 18, color: '#39D8FF', glowColor: 'rgba(57,216,255,0.2)' },
  { id: 'technical', label: 'TECHNICAL', type: 'agent', x: 140, y: -100, radius: 22, color: '#39D8FF', glowColor: 'rgba(57,216,255,0.2)', signal: 'BULLISH', confidence: 84, status: 'COMPLETE' },
  { id: 'fundamental', label: 'FUNDAMENTAL', type: 'agent', x: 160, y: 40, radius: 22, color: '#38E6A5', glowColor: 'rgba(56,230,165,0.2)', signal: 'POSITIVE', confidence: 76, status: 'COMPLETE' },
  { id: 'sentiment', label: 'SENTIMENT', type: 'agent', x: 80, y: 150, radius: 22, color: '#FFC857', glowColor: 'rgba(255,200,87,0.2)', signal: 'NEUTRAL', confidence: 63, status: 'COMPLETE' },
  { id: 'risk', label: 'RISK', type: 'agent', x: -80, y: 150, radius: 22, color: '#FF5C72', glowColor: 'rgba(255,92,114,0.2)', signal: 'CAUTION', confidence: 71, status: 'COMPLETE' },
  { id: 'portfolio', label: 'PORTFOLIO', type: 'portfolio', x: -160, y: 40, radius: 18, color: '#8B7CFF', glowColor: 'rgba(139,124,255,0.2)' },
  { id: 'evidence', label: 'EVIDENCE', type: 'evidence', x: -140, y: -100, radius: 18, color: '#39D8FF', glowColor: 'rgba(57,216,255,0.2)' },
];

export const mockWebConnections: WebConnection[] = [
  { from: 'market', to: 'core', strength: 'strong', animated: true },
  { from: 'technical', to: 'core', strength: 'strong', animated: true },
  { from: 'fundamental', to: 'core', strength: 'strong', animated: true },
  { from: 'sentiment', to: 'core', strength: 'medium', animated: true },
  { from: 'risk', to: 'core', strength: 'warning', animated: true },
  { from: 'portfolio', to: 'core', strength: 'medium', animated: true },
  { from: 'evidence', to: 'core', strength: 'strong', animated: true },
  { from: 'technical', to: 'market', strength: 'strong', animated: false },
  { from: 'fundamental', to: 'evidence', strength: 'strong', animated: false },
  { from: 'risk', to: 'portfolio', strength: 'medium', animated: false },
  { from: 'technical', to: 'sentiment', strength: 'conflict', label: 'SIGNAL CONFLICT', animated: true },
];

// ─── System Status ───────────────────────

export const mockSystemStatus: SystemStatus = {
  services: [
    { name: 'MARKET FEED', status: 'CONNECTED' },
    { name: 'AI AGENTS', status: 'OPERATIONAL' },
    { name: 'RAG ENGINE', status: 'READY' },
    { name: 'EVIDENCE INDEX', status: 'READY' },
    { name: 'WEBSOCKET', status: 'CONNECTED' },
  ],
  overallLatency: 1.84,
  timestamp: new Date().toISOString(),
};

// ─── Conflicts ───────────────────────────

export const mockConflicts: SignalConflict[] = [
  {
    agent1: 'technical',
    agent2: 'sentiment',
    description: 'Technical momentum and sentiment disagree. Technical sees bullish momentum while sentiment remains uncertain.',
    severity: 'medium',
  },
];

// ─── AI Debate ───────────────────────────

export const mockDebate: DebateEntry[] = [
  { agentId: 'technical', agentName: 'Technical Intelligence', statement: 'Momentum supports entry. RSI and MACD both confirm bullish trend continuation.', signal: 'BULLISH' },
  { agentId: 'fundamental', agentName: 'Fundamental Intelligence', statement: 'Earnings trajectory supports accumulation. Q1 beat and strong deal pipeline signal growth.', signal: 'POSITIVE' },
  { agentId: 'sentiment', agentName: 'Sentiment Intelligence', statement: 'Short-term sentiment remains uncertain. Social signals show caution despite analyst optimism.', signal: 'NEUTRAL' },
  { agentId: 'risk', agentName: 'Risk Intelligence', statement: 'Position increases portfolio concentration. IT allocation would exceed the 35% threshold.', signal: 'CAUTION' },
  { agentId: 'profin', agentName: 'PROFIN SYNTHESIS', statement: 'Three signals support entry, but portfolio risk reduces conviction. Recommend watch with reduced position size.' },
];

// ─── Reasoning Stream ────────────────────

export const mockReasoningStream: ReasoningEntry[] = [
  { timestamp: '10:42:12', agent: 'SYSTEM', content: 'Market data ingested — INFY ₹1,482.50 (+2.41%)', type: 'data' },
  { timestamp: '10:42:13', agent: 'TECHNICAL', content: 'Momentum anomaly detected — RSI breakout above 55', type: 'analysis' },
  { timestamp: '10:42:13', agent: 'TECHNICAL', content: 'MACD crossover confirmed on daily timeframe', type: 'analysis' },
  { timestamp: '10:42:14', agent: 'FUNDAMENTAL', content: 'Relevant earnings disclosure retrieved (Q1 FY27)', type: 'analysis' },
  { timestamp: '10:42:14', agent: 'FUNDAMENTAL', content: 'Revenue beat detected: +4.2% vs consensus', type: 'analysis' },
  { timestamp: '10:42:15', agent: 'SENTIMENT', content: 'Sentiment confidence: 63% — mixed signals', type: 'analysis' },
  { timestamp: '10:42:15', agent: 'SENTIMENT', content: 'Analyst consensus positive (18/24 BUY)', type: 'analysis' },
  { timestamp: '10:42:16', agent: 'RISK', content: 'Portfolio concentration detected — IT at 32%', type: 'analysis' },
  { timestamp: '10:42:17', agent: 'CONFLICT ENGINE', content: 'Technical ↔ Sentiment disagreement identified', type: 'conflict' },
  { timestamp: '10:42:17', agent: 'PERSONALIZATION', content: 'Investor profile applied — risk tolerance 68%', type: 'info' },
  { timestamp: '10:42:18', agent: 'PROFIN SYNTHESIS', content: 'Final decision generated — HOLD / WATCH at 78%', type: 'synthesis' },
];

// ─── Market Ticker ───────────────────────

export const mockMarketTicker: MarketTickerItem[] = [
  { symbol: 'NIFTY 50', changePercent: 0.72 },
  { symbol: 'SENSEX', changePercent: 0.61 },
  { symbol: 'BANK NIFTY', changePercent: 0.44 },
  { symbol: 'INFY', changePercent: 2.41 },
  { symbol: 'TCS', changePercent: 1.12 },
  { symbol: 'RELIANCE', changePercent: -0.38 },
  { symbol: 'HDFCBANK', changePercent: 0.89 },
  { symbol: 'WIPRO', changePercent: 1.54 },
  { symbol: 'ICICIBANK', changePercent: 0.67 },
  { symbol: 'SUNPHARMA', changePercent: -0.21 },
];

// ─── Performance Metrics ─────────────────

export const mockPerformanceMetrics: PerformanceMetric[] = [
  { label: 'Signal Accuracy', value: '74%', change: 2.1, sparkline: [68, 70, 72, 69, 73, 74, 74] },
  { label: 'Agent Latency', value: '1.84s', change: -0.3, sparkline: [2.4, 2.1, 2.0, 1.9, 1.8, 1.85, 1.84] },
  { label: 'Portfolio Risk', value: '31%', change: 1.2, sparkline: [28, 29, 30, 29, 31, 30, 31] },
  { label: 'Evidence Coverage', value: '94%', change: 3.0, sparkline: [88, 89, 91, 92, 93, 93, 94] },
];

// ─── Dynamic Stock Lookup Generator ──────

const KNOWN_STOCKS: Record<string, { name: string; price: number; change: number; changePercent: number; action: string; confidence: number; reasoning: string; target: number; currency: string }> = {
  TCS: {
    name: 'Tata Consultancy Services',
    price: 3580.00,
    change: 39.60,
    changePercent: 1.12,
    action: 'BUY',
    confidence: 82,
    reasoning: 'Strong Q1 deal wins totaling $4.2B, robust cloud migration demand, and stable 24.2% operating margins support immediate accumulation.',
    target: 3850,
    currency: '₹',
  },
  RELIANCE: {
    name: 'Reliance Industries Ltd.',
    price: 2445.00,
    change: -9.30,
    changePercent: -0.38,
    action: 'HOLD',
    confidence: 71,
    reasoning: 'Telecom subscriber growth steady, but oil-to-chemicals margin compression creates short-term pressure. Accumulate on dips near ₹2,400.',
    target: 2600,
    currency: '₹',
  },
  HDFCBANK: {
    name: 'HDFC Bank Limited',
    price: 1620.00,
    change: 14.30,
    changePercent: 0.89,
    action: 'BUY',
    confidence: 86,
    reasoning: 'Net interest margin stabilizing post-merger with credit growth outperforming industry average at 15.4%. Low NPA ratio confirms asset quality.',
    target: 1780,
    currency: '₹',
  },
  WIPRO: {
    name: 'Wipro Limited',
    price: 445.00,
    change: 6.75,
    changePercent: 1.54,
    action: 'BUY',
    confidence: 79,
    reasoning: 'Turnaround strategy delivering early gains in healthcare & enterprise AI automation. Positive MACD crossover signals ongoing momentum.',
    target: 490,
    currency: '₹',
  },
  AAPL: {
    name: 'Apple Inc.',
    price: 224.50,
    change: 4.08,
    changePercent: 1.85,
    action: 'BUY',
    confidence: 88,
    reasoning: 'Apple Intelligence rollout driving super-cycle iPhone upgrade expectations. Services revenue hit record high with strong margin profile.',
    target: 245,
    currency: '$',
  },
  NVDA: {
    name: 'NVIDIA Corporation',
    price: 128.20,
    change: 4.24,
    changePercent: 3.42,
    action: 'BUY',
    confidence: 92,
    reasoning: 'Blackwell chip architecture demand exceeding supply through FY27. Data center GPU revenue up 154% YoY with gross margin above 75%.',
    target: 150,
    currency: '$',
  },
};

export function getDynamicMarketData(tickerSymbol: string): MarketData {
  const sym = tickerSymbol.trim().toUpperCase();
  if (KNOWN_STOCKS[sym]) {
    const s = KNOWN_STOCKS[sym];
    return {
      ticker: sym,
      name: s.name,
      exchange: s.currency === '$' ? 'NASDAQ' : 'NSE',
      price: s.price,
      change: s.change,
      changePercent: s.changePercent,
      volume: 18_420_000,
      high: Math.round(s.price * 1.015 * 100) / 100,
      low: Math.round(s.price * 0.985 * 100) / 100,
      open: Math.round(s.price * 0.992 * 100) / 100,
      previousClose: Math.round((s.price - s.change) * 100) / 100,
      marketCap: 5_200_000_000_000,
      currency: s.currency,
      isLive: true,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Fallback for any unknown symbol
  const hash = sym.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = (hash * 17) % 3000 + 100;
  const changePct = ((hash % 100) - 45) / 10;
  const changeVal = Math.round((basePrice * changePct / 100) * 100) / 100;

  return {
    ticker: sym,
    name: `${sym} Global Corporation`,
    exchange: 'NSE',
    price: basePrice,
    change: changeVal,
    changePercent: Math.round(changePct * 100) / 100,
    volume: 8_500_000,
    high: Math.round(basePrice * 1.02 * 100) / 100,
    low: Math.round(basePrice * 0.98 * 100) / 100,
    open: Math.round(basePrice * 0.99 * 100) / 100,
    previousClose: basePrice - changeVal,
    marketCap: 1_200_000_000_000,
    currency: '₹',
    isLive: true,
    lastUpdated: new Date().toISOString(),
  };
}

export function getDynamicDecision(tickerSymbol: string): Decision {
  const sym = tickerSymbol.trim().toUpperCase();
  if (KNOWN_STOCKS[sym]) {
    const s = KNOWN_STOCKS[sym];
    return {
      action: s.action,
      confidence: s.confidence,
      reasoning: s.reasoning,
      ticker: sym,
      targetPrice: s.target,
      stopLoss: Math.round(s.price * 0.94),
      positionSizePct: s.action.includes('BUY') ? 8 : 4,
      timeHorizon: '3-6 months',
    };
  }

  return {
    action: 'HOLD / WATCH',
    confidence: 76,
    reasoning: `Analysis completed for ${sym}. Technical indicators show neutral consolidation pattern while fundamental metrics support long-term holding.`,
    ticker: sym,
    targetPrice: Math.round(getDynamicMarketData(sym).price * 1.12),
    stopLoss: Math.round(getDynamicMarketData(sym).price * 0.93),
    positionSizePct: 5,
    timeHorizon: '3-6 months',
  };
}

