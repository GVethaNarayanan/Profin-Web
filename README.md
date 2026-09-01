# 🕸️ PROFIN WEB — Living Financial Intelligence Platform

> *“Connect the signals. Understand the decision.”*

[![Hackathon](https://img.shields.io/badge/HACKVERSE-INTO_THE_WEB-8B7CFF?style=for-the-badge)](https://github.com/SRIKRISH-S/hedge-web-ai)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi_Agent-39D8FF?style=for-the-badge)](https://www.langchain.com/langgraph)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![License](https://img.shields.io/badge/License-MIT-38E6A5?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Overview

**PROFIN WEB** is an institutional-grade, multi-agent AI financial intelligence platform built for **HACKVERSE: INTO THE WEB**.

Rather than a static grid of charts, PROFIN WEB models financial market dynamics as a **living, 3D holographic neural web**. Every glowing node, traveling energy pulse, and tension line visualizes real-time relationships between market signals, SEC filings, sentiment disclosures, technical indicators, portfolio risk, and multi-agent AI reasoning.

---

## ✨ Core Features & Key Innovations

### 1. 🕸️ 3D Holographic Intelligence Web (Canvas 3D Engine)
- Zero-dependency, high-performance **HTML5 Canvas 2D/3D projection engine** running at 60fps.
- **Interactive 3D Mouse Parallax Tilt**: Moving your cursor orbits the intelligence web in 3D perspective (`fov = 400`).
- **Depth-Sorted Nodes & Energy Particles**: Metallic nodes float with radial glow auras, depth blur, and traveling signal pulses along active connections.

### 2. 🕷️ Spidey Sense Market Anomaly Radar Engine
- **Threat & Opportunity Radar**: Real-time detection of signal conflicts (e.g. Technical ↔ Sentiment disagreement) and portfolio concentration spikes (`32% → 41%`).
- **3D Radar Wave Sweep**: Continuous radial wave pulse animating outward across 3D web strands.
- **Spider-Man Action Watermark**: Geometric Spider Web Shield and cyber-mesh backdrop watermarks.

### 3. 🧠 Multi-Agent Orchestration (LangGraph + LangChain)
- **Technical Analyst**: RSI, MACD, EMA crossover, and Bollinger Bands calculation.
- **Fundamental Analyst**: RAG retrieval over SEC 10-K/10-Q filings using **ChromaDB**.
- **Sentiment Analyst**: Live news & market mood aggregation powered by **Tavily Search**.
- **Risk Manager**: Portfolio concentration thresholds, beta risk, and volatility assessment.
- **Portfolio Manager**: Final synthesis generating actionable `BUY`, `HOLD`, or `SELL` decisions with confidence rings (`78%`).

### 4. 🧪 What-If Scenario Simulator & Portfolio Stress Testing
- Interactive position simulation with asset, action (`BUY`), and custom amount inputs.
- Draggable **BEAR ↔ BULL** market scenario slider interpolating projected portfolio returns (`+8.2%` vs `-7.6%`).
- Portfolio impact matrix detailing Risk Score (`42 → 49`) and Sector Concentration (`32% → 41%`).

### 5. 🧬 Investor Digital Twin & Personalized Financial DNA
- Customizable risk tolerance (`68%`), loss sensitivity (`74%`), and diversification target (`55%`).
- Multi-agent AI reasoning dynamically adapts its conviction threshold to match the investor's digital twin.

### 6. 💻 Institutional Command Center UI (9 Working Views)
- **Top Primary Search Bar**: Instant stock ticker analysis (`INFY`, `TCS`, `RELIANCE`, `AAPL`, `NVDA`).
- **Command Palette (`Ctrl+K` / `⌘K`)**: Instant search overlay across all platform views.
- **9 Dedicated Routes**: `Dashboard (/)`, `Markets (/markets)`, `Portfolio (/portfolio)`, `Research (/analysis)`, `What-If (/whatif)`, `Evidence (/evidence)`, `Investor (/investor)`, `Settings (/settings)`, `System Status (/status)`.

---

## 📐 System Architecture

```
                                 ┌─────────────────────────────────────────┐
                                 │           PROFIN WEB FRONTEND           │
                                 │   (Next.js 15 + 3D Holographic Canvas)  │
                                 └────────────────────┬────────────────────┘
                                                      │ WebSocket / REST
                                                      ▼
                                 ┌─────────────────────────────────────────┐
                                 │         FASTAPI / LANGGRAPH CORE        │
                                 └────────────────────┬────────────────────┘
                                                      │
          ┌──────────────────────────┬────────────────┴──────────────────────────┬──────────────────────────┐
          ▼                          ▼                                           ▼                          ▼
┌──────────────────┐       ┌──────────────────┐                        ┌──────────────────┐       ┌──────────────────┐
│ TECHNICAL AGENT  │       │ FUNDAMENTALS AGENT│                        │ SENTIMENT AGENT  │       │   RISK MANAGER   │
│ (RSI, MACD, BB)  │       │ (SEC EDGAR RAG)  │                        │ (Tavily Search)  │       │ (Portfolio Risk) │
└─────────┬────────┘       └─────────┬────────┘                        └─────────┬────────┘       └─────────┬────────┘
          │                          │                                           │                          │
          └──────────────────────────┴────────────────┬──────────────────────────┴──────────────────────────┘
                                                      ▼
                                       ┌───────────────────────────┐
                                       │ PORTFOLIO MANAGER ENGINE  │
                                       │  (BUY / HOLD / SELL)      │
                                       └───────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & Design** | Vanilla CSS Tokens, Tailwind CSS, Lucide Icons, Custom Keyframe Animations |
| **Visualizations** | HTML5 Canvas 2D/3D Engine, SVG Radial Charts |
| **Backend Core** | Python 3.11+, FastAPI, Uvicorn, WebSockets |
| **AI & Agents** | LangGraph, LangChain, Google Gemini 1.5 Flash (Swappable to OpenAI / Groq) |
| **RAG & Search** | ChromaDB Vector Store, SEC EDGAR Filings, Tavily Search API |
| **Database** | SQLite + aiosqlite (Async ORM) |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.11 or higher
- **Git**

---

### 1. Clone Repository

```bash
git clone https://github.com/SRIKRISH-S/hedge-web-ai.git
cd hedge-web-ai
```

---

### 2. Configure Backend (`backend/.env`)

Create `backend/.env` (or copy `.env.example`):

```bash
cd backend
copy .env.example .env
```

Add your API keys to `backend/.env`:

```env
# LLM Provider (gemini | openai | groq)
LLM_PROVIDER=gemini

# Google Gemini API Key (Free from https://aistudio.google.com/)
GOOGLE_API_KEY=your_gemini_api_key_here

# SEC EDGAR User Agent (Your email address)
SEC_EDGAR_USER_AGENT=your_email@example.com

# Tavily Search API Key (Free from https://tavily.com/)
TAVILY_API_KEY=your_tavily_api_key_here

# App Settings
DATABASE_URL=sqlite+aiosqlite:///./hedge_fund.db
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8000
```

Install backend dependencies and run server:

```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

### 3. Configure Frontend (`frontend/.env.local`)

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/analysis
```

Install frontend dependencies and start dev server:

```bash
cd ../frontend
npm install
npm run dev
```

Open **`http://localhost:3000`** in your browser!

---

## 📡 REST API & WebSocket Specifications

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze/{ticker}` | Trigger full multi-agent analysis |
| `GET` | `/api/analyses` | List recent analysis history |
| `GET` | `/api/analyses/{id}` | Retrieve detailed analysis report |
| `GET` | `/api/portfolio` | Get active portfolio holdings & exposure |
| `GET` | `/api/health` | Service health status check |
| `WS` | `/ws/analysis` | Live streaming WebSocket agent execution |

---

## 📂 Project Directory Architecture

```
hedge-web-ai/
├── backend/
│   ├── app/
│   │   ├── agents/            # LangGraph multi-agent workflow
│   │   │   ├── graph.py       # Graph execution pipeline
│   │   │   ├── state.py       # Shared state definitions
│   │   │   ├── fundamentals.py# SEC filing RAG analyst
│   │   │   ├── technical.py   # Indicator calculator
│   │   │   ├── sentiment.py   # News & social sentiment
│   │   │   ├── risk_manager.py# Risk aggregator
│   │   │   └── portfolio_manager.py # Decision synthesizer
│   │   ├── api/               # FastAPI REST & WebSocket endpoints
│   │   ├── rag/               # ChromaDB SEC filing vector store
│   │   ├── db/                # Async SQLite models
│   │   └── main.py            # FastAPI entry point
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── page.tsx       # Main 3D Holographic Dashboard
│   │   │   ├── markets/       # Markets Intelligence Hub
│   │   │   ├── portfolio/     # Holdings & Exposure
│   │   │   ├── analysis/      # Research & History
│   │   │   ├── whatif/        # Decision Simulator
│   │   │   ├── evidence/      # Evidence Graph & RAG Explorer
│   │   │   ├── investor/      # Financial DNA Twin
│   │   │   ├── settings/      # System Settings
│   │   │   └── status/        # System Telemetry
│   │   ├── components/profin/ # Custom PROFIN UI Components
│   │   │   ├── IntelligenceWeb.tsx  # 3D Canvas Projection Engine
│   │   │   ├── HeroSection.tsx      # Above-the-fold Decision Card
│   │   │   ├── AgentNetwork.tsx     # Live Agent Cards
│   │   │   ├── ReasoningStream.tsx  # Terminal Log Stream
│   │   │   ├── DecisionTrace.tsx    # 8-Stage Timeline
│   │   │   ├── WhatIfSimulator.tsx  # Scenario Controller
│   │   │   └── CommandPalette.tsx   # Ctrl+K Search Overlay
│   │   └── lib/
│   │       ├── mockData.ts    # Centralized data adapter
│   │       ├── types.ts       # Master TypeScript interfaces
│   │       └── websocket.ts   # WebSocket client listener
│   ├── package.json
│   └── tailwind.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🏆 Hackathon Details

- **Hackathon**: `HACKVERSE: INTO THE WEB`
- **Team Repository**: `https://github.com/SRIKRISH-S/hedge-web-ai`
- **Author**: SRIKRISH-S

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
