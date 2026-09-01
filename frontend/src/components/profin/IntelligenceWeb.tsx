"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { WebNode, WebConnection } from "@/lib/types";
import { mockWebNodes, mockWebConnections } from "@/lib/mockData";
import { SIGNAL_COLORS } from "@/lib/utils";

interface Props {
  nodes?: WebNode[];
  connections?: WebConnection[];
  onNodeSelect?: (nodeId: string) => void;
  selectedNode?: string | null;
  height?: number;
}

interface Node3D extends WebNode {
  z: number;
  projX: number;
  projY: number;
  projR: number;
  projScale: number;
}

interface Particle3D {
  progress: number;
  speed: number;
  connectionIndex: number;
}

const CONNECTION_COLORS: Record<string, string> = {
  strong: "rgba(139, 124, 255, 0.6)",
  medium: "rgba(57, 216, 255, 0.4)",
  weak: "rgba(119, 131, 151, 0.2)",
  warning: "rgba(255, 200, 87, 0.5)",
  conflict: "rgba(255, 92, 114, 0.7)",
};

export default function IntelligenceWeb({
  nodes = mockWebNodes,
  connections = mockWebConnections,
  onNodeSelect,
  selectedNode = null,
  height = 500,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle3D[]>([]);
  const hoverNodeRef = useRef<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const timeRef = useRef(0);
  const rotYRef = useRef(0);
  const rotXRef = useRef(0.15);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const particles: Particle3D[] = [];
    connections.forEach((_, i) => {
      const count = connections[i].strength === 'strong' ? 3 : connections[i].strength === 'conflict' ? 4 : 2;
      for (let j = 0; j < count; j++) {
        particles.push({
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.003,
          connectionIndex: i,
        });
      }
    });
    particlesRef.current = particles;
  }, [connections]);

  // 3D Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const fov = 400;

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      timeRef.current += 0.016;
      const time = timeRef.current;

      // Mouse interactive 3D rotation target
      const targetRotY = time * 0.15 + (mousePosRef.current.x / w - 0.5) * 0.6;
      const targetRotX = 0.15 + (mousePosRef.current.y / h - 0.5) * 0.4;

      rotYRef.current += (targetRotY - rotYRef.current) * 0.05;
      rotXRef.current += (targetRotX - rotXRef.current) * 0.05;

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);

      ctx.clearRect(0, 0, w, h);

      // ─── 1. Draw Spider-Man Action Watermark Backdrop ───
      ctx.save();
      const cx = w / 2;
      const cy = h / 2;

      // Glowing Spidey Emblem Watermark
      ctx.globalAlpha = 0.04 + Math.sin(time * 1.5) * 0.015;
      ctx.strokeStyle = "#8B7CFF";
      ctx.fillStyle = "rgba(139, 124, 255, 0.02)";
      ctx.lineWidth = 1.5;

      // Spider Emblem Paths
      ctx.beginPath();
      // Outer Diamond Web Shield
      ctx.moveTo(cx, cy - 140);
      ctx.lineTo(cx + 120, cy);
      ctx.lineTo(cx, cy + 140);
      ctx.lineTo(cx - 120, cy);
      ctx.closePath();
      ctx.stroke();

      // Spider Legs Watermark Strands
      const spiderLegs = [
        [cx, cy, cx + 180, cy - 90],
        [cx, cy, cx + 200, cy - 30],
        [cx, cy, cx + 190, cy + 40],
        [cx, cy, cx + 160, cy + 100],
        [cx, cy, cx - 180, cy - 90],
        [cx, cy, cx - 200, cy - 30],
        [cx, cy, cx - 190, cy + 40],
        [cx, cy, cx - 160, cy + 100],
      ];
      ctx.strokeStyle = "rgba(57, 216, 255, 0.05)";
      spiderLegs.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Spidey Sense Expanding 3D Pulse Wave Ring
      const waveRadius = (time * 60) % 260;
      const waveAlpha = Math.max(0, 1 - waveRadius / 260) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 92, 114, ${waveAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // ─── 2. Calculate 3D Projection for Nodes ───
      const nodes3D: Node3D[] = nodes.map(node => {
        // Initial coordinates (if core, stays near origin)
        const rawX = node.type === 'core' ? 0 : node.x;
        const rawY = node.type === 'core' ? 0 : node.y;
        const rawZ = node.type === 'core' ? 0 : Math.sin(node.x * 0.01 + node.y * 0.01) * 60;

        // 3D Rotation Y
        const x1 = rawX * cosY - rawZ * sinY;
        const z1 = rawZ * cosY + rawX * sinY;

        // 3D Rotation X
        const y2 = rawY * cosX - z1 * sinX;
        const z2 = z1 * cosX + rawY * sinX;

        // Perspective projection
        const projScale = fov / (fov + z2);
        const projX = cx + x1 * projScale;
        const projY = cy + y2 * projScale;
        const projR = node.radius * projScale;

        return {
          ...node,
          z: z2,
          projX,
          projY,
          projR,
          projScale,
        };
      });

      // Depth sort for painter's rendering algorithm
      const sortedNodes = [...nodes3D].sort((a, b) => b.z - a.z);

      // ─── 3. Draw 3D Web Connections ───
      connections.forEach((conn, connIdx) => {
        const fromNode = nodes3D.find(n => n.id === conn.from);
        const toNode = nodes3D.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return;

        const color = CONNECTION_COLORS[conn.strength] || CONNECTION_COLORS.weak;
        const avgScale = (fromNode.projScale + toNode.projScale) / 2;

        let alpha = Math.min(1, Math.max(0.2, avgScale * 0.8));
        if (conn.animated) {
          alpha *= 0.6 + 0.4 * Math.sin(time * 2 + connIdx * 0.5);
        }

        ctx.save();
        ctx.globalAlpha = alpha;

        // 3D Web Line
        ctx.beginPath();
        ctx.moveTo(fromNode.projX, fromNode.projY);
        ctx.lineTo(toNode.projX, toNode.projY);
        ctx.strokeStyle = color;
        ctx.lineWidth = (conn.strength === 'strong' ? 2 : conn.strength === 'conflict' ? 2.5 : 1) * avgScale;

        if (conn.strength === 'conflict') {
          ctx.setLineDash([4 * avgScale, 4 * avgScale]);
          ctx.lineDashOffset = -time * 25;
        }

        ctx.stroke();
        ctx.setLineDash([]);

        // Outer 3D Web Glow
        if (conn.strength === 'strong' || conn.strength === 'conflict') {
          ctx.beginPath();
          ctx.moveTo(fromNode.projX, fromNode.projY);
          ctx.lineTo(toNode.projX, toNode.projY);
          ctx.strokeStyle = color;
          ctx.lineWidth = 8 * avgScale;
          ctx.globalAlpha = alpha * 0.18;
          ctx.stroke();
        }

        ctx.restore();

        // 3D Conflict Label
        if (conn.strength === 'conflict' && conn.label) {
          const mx = (fromNode.projX + toNode.projX) / 2;
          const my = (fromNode.projY + toNode.projY) / 2;
          const labelAlpha = (0.6 + 0.4 * Math.sin(time * 3)) * avgScale;
          ctx.save();
          ctx.globalAlpha = labelAlpha;
          ctx.font = `700 ${Math.round(9 * avgScale)}px Inter, sans-serif`;
          ctx.fillStyle = "#FF5C72";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const tw = ctx.measureText(conn.label).width + 12;
          ctx.fillStyle = "rgba(255, 92, 114, 0.15)";
          ctx.beginPath();
          ctx.roundRect(mx - tw / 2, my - 9 * avgScale, tw, 18 * avgScale, 4);
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 92, 114, 0.4)";
          ctx.stroke();

          ctx.fillStyle = "#FF5C72";
          ctx.fillText(`⚡ ${conn.label}`, mx, my);
          ctx.restore();
        }
      });

      // ─── 4. Draw 3D Web Particles ───
      particlesRef.current.forEach(particle => {
        const conn = connections[particle.connectionIndex];
        if (!conn || !conn.animated) return;

        const fromNode = nodes3D.find(n => n.id === conn.from);
        const toNode = nodes3D.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return;

        particle.progress += particle.speed;
        if (particle.progress > 1) particle.progress = 0;

        const p = particle.progress;
        const px = fromNode.projX + (toNode.projX - fromNode.projX) * p;
        const py = fromNode.projY + (toNode.projY - fromNode.projY) * p;
        const pScale = fromNode.projScale + (toNode.projScale - fromNode.projScale) * p;

        const pAlpha = Math.sin(p * Math.PI) * Math.min(1, pScale);
        const pColor = conn.strength === 'conflict' ? "255,92,114" :
                       conn.strength === 'warning' ? "255,200,87" :
                       conn.strength === 'strong' ? "139,124,255" : "57,216,255";

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.5 * pScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pColor}, ${pAlpha * 0.9})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 7 * pScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pColor}, ${pAlpha * 0.25})`;
        ctx.fill();
        ctx.restore();
      });

      // ─── 5. Draw 3D Depth-Sorted Nodes ───
      sortedNodes.forEach(node => {
        const isHovered = hoverNodeRef.current === node.id;
        const isSelected = selectedNode === node.id;
        const r = node.projR * (isHovered ? 1.2 : 1);
        const pos = { x: node.projX, y: node.projY };

        // 3D Depth Radial Glow
        const gradient = ctx.createRadialGradient(pos.x, pos.y, r * 0.4, pos.x, pos.y, r * 3.2);
        gradient.addColorStop(0, node.glowColor);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.globalAlpha = (isHovered || isSelected ? 0.8 : 0.4) * node.projScale;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 3D Holographic Node Sphere
        ctx.save();
        ctx.globalAlpha = Math.min(1, node.projScale * 0.95);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isSelected
          ? node.color + "45"
          : "rgba(14, 20, 29, 0.92)";
        ctx.fill();

        ctx.strokeStyle = isSelected ? node.color : node.color + "90";
        ctx.lineWidth = (isSelected ? 3 : 1.8) * node.projScale;
        ctx.stroke();

        // Inner 3D Highlight Ring
        ctx.beginPath();
        ctx.arc(pos.x - r * 0.3, pos.y - r * 0.3, r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();
        ctx.restore();

        // Pulsing Spidey Sense Ring for Core & Conflict Nodes
        if (node.type === 'core') {
          const pulseR = r + 8 * node.projScale + Math.sin(time * 2.5) * 4;
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = node.color + "40";
          ctx.lineWidth = 1.2 * node.projScale;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();
        }

        // 3D Node Labels
        ctx.save();
        ctx.globalAlpha = Math.min(1, node.projScale);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (node.type === 'core') {
          const lines = node.label.split('\n');
          lines.forEach((line, i) => {
            ctx.fillStyle = i === 0 ? "#F5F7FA" : "#8B7CFF";
            ctx.font = `${i === 0 ? "800" : "600"} ${Math.round((i === 0 ? 11 : 9) * node.projScale)}px Inter, sans-serif`;
            ctx.fillText(line, pos.x, pos.y + (i - (lines.length - 1) / 2) * (13 * node.projScale));
          });
        } else {
          ctx.fillStyle = isHovered || isSelected ? "#F5F7FA" : node.color;
          ctx.font = `700 ${Math.round(10 * node.projScale)}px Inter, sans-serif`;
          ctx.fillText(node.label, pos.x, pos.y + r + (14 * node.projScale));
        }
        ctx.restore();

        // Signal Badge on Agent Nodes
        if (node.signal && node.type === 'agent') {
          const sigColor = SIGNAL_COLORS[node.signal] || "#778397";
          ctx.save();
          ctx.globalAlpha = Math.min(1, node.projScale);
          ctx.font = `700 ${Math.round(8 * node.projScale)}px Inter, sans-serif`;
          const sigText = `${node.signal} ${node.confidence}%`;
          const stw = ctx.measureText(sigText).width + 10;
          const sx = pos.x - stw / 2;
          const sy = pos.y + r + (23 * node.projScale);

          ctx.fillStyle = sigColor + "22";
          ctx.beginPath();
          ctx.roundRect(sx, sy, stw, 15 * node.projScale, 4);
          ctx.fill();
          ctx.strokeStyle = sigColor + "50";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = sigColor;
          ctx.textAlign = "center";
          ctx.fillText(sigText, pos.x, sy + 8 * node.projScale);
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [nodes, connections, selectedNode]);

  // 3D Parallax Mouse Tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    mousePosRef.current = { x: mx, y: my };

    // Check hit test on nodes
    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const fov = 400;

    const cosY = Math.cos(rotYRef.current);
    const sinY = Math.sin(rotYRef.current);
    const cosX = Math.cos(rotXRef.current);
    const sinX = Math.sin(rotXRef.current);

    let found: string | null = null;
    for (const node of nodes) {
      const rawX = node.type === 'core' ? 0 : node.x;
      const rawY = node.type === 'core' ? 0 : node.y;
      const rawZ = node.type === 'core' ? 0 : Math.sin(node.x * 0.01 + node.y * 0.01) * 60;

      const x1 = rawX * cosY - rawZ * sinY;
      const z1 = rawZ * cosY + rawX * sinY;
      const y2 = rawY * cosX - z1 * sinX;
      const z2 = z1 * cosX + rawY * sinX;

      const projScale = fov / (fov + z2);
      const px = cx + x1 * projScale;
      const py = cy + y2 * projScale;
      const r = node.radius * projScale * 1.5;

      const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
      if (dist < r) {
        found = node.id;
        setTooltipPos({ x: e.clientX, y: e.clientY });
        break;
      }
    }

    hoverNodeRef.current = found;
    setHoveredNode(found);
    canvas.style.cursor = found ? "pointer" : "grab";
  }, [nodes]);

  const handleClick = useCallback(() => {
    if (hoverNodeRef.current && onNodeSelect) {
      onNodeSelect(hoverNodeRef.current);
    }
  }, [onNodeSelect]);

  const hoveredNodeData = hoveredNode ? nodes.find(n => n.id === hoveredNode) : null;

  return (
    <div className="relative" ref={containerRef}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--violet)", boxShadow: "0 0 10px var(--violet-glow)" }}
          />
          <span className="micro-label-violet text-xs font-bold tracking-widest">
            3D HOLOGRAPHIC INTELLIGENCE WEB
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full animate-pulse-glow"
          style={{
            background: "rgba(255, 92, 114, 0.1)",
            border: "1px solid rgba(255, 92, 114, 0.25)",
            color: "var(--negative)",
          }}
        >
          <span className="text-xs">🕷️</span>
          <span className="text-[10px] font-extrabold tracking-widest uppercase">
            SPIDEY SENSE: 3D RADAR SWEEP ACTIVE
          </span>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div
        className="glass-panel overflow-hidden relative"
        style={{
          height,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(139,124,255,0.03)",
          borderColor: "rgba(139, 124, 255, 0.15)",
        }}
      >
        {/* Spider Web Watermark Background Label */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(139,124,255,0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <span className="text-[140px] font-black tracking-widest uppercase text-white">
            SPIDEY
          </span>
        </div>

        <canvas
          ref={canvasRef}
          className="w-full h-full relative z-10"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onMouseLeave={() => { hoverNodeRef.current = null; setHoveredNode(null); }}
        />
      </div>

      {/* Hover Tooltip */}
      {hoveredNodeData && hoveredNodeData.type === 'agent' && tooltipPos && (
        <div
          className="fixed z-[60] glass-elevated p-4 pointer-events-none animate-fade-in-scale"
          style={{
            left: tooltipPos.x + 16,
            top: tooltipPos.y - 10,
            minWidth: 220,
            borderColor: "var(--violet)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(139,124,255,0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="micro-label-cyan font-bold">
              {hoveredNodeData.label} INTELLIGENCE
            </p>
            <span className="text-xs">🕷️</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>Signal</p>
              <p className="text-sm font-bold" style={{ color: SIGNAL_COLORS[hoveredNodeData.signal || ''] || "var(--text-primary)" }}>
                {hoveredNodeData.signal}
              </p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: "var(--text-dim)" }}>Confidence</p>
              <p className="text-sm font-bold tabular-nums">{hoveredNodeData.confidence}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
