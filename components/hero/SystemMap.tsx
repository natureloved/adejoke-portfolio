"use client";

import { useRef, useState } from "react";

interface NodeItem {
  id: string;
  label: string;
  sublabel: string;
  badge: string;
  x: number;
  y: number;
  color: string;
  details: string;
}

const NODES: NodeItem[] = [
  {
    id: "users",
    label: "Users & Wallets",
    sublabel: "Keyless / WalletConnect",
    badge: "Active Session",
    x: 18,
    y: 28,
    color: "#ff8a65",
    details: "Non-custodial signers, voice input, biometrics",
  },
  {
    id: "frontend",
    label: "Frontend Systems",
    sublabel: "Next.js / TypeScript",
    badge: "60 FPS Tactile",
    x: 52,
    y: 15,
    color: "#5eead4",
    details: "Reactive state, optimistic UI, accessible interfaces",
  },
  {
    id: "backend",
    label: "Backend & Relayers",
    sublabel: "APIs / Claude AI / Indexers",
    badge: "Sub-100ms",
    x: 82,
    y: 50,
    color: "#c5a7ff",
    details: "Semantic intent parsing, cross-chain LI.FI routing",
  },
  {
    id: "blockchain",
    label: "Blockchain Protocols",
    sublabel: "Clarity / Solidity / Cairo",
    badge: "Consensus Final",
    x: 36,
    y: 78,
    color: "#d9f99d",
    details: "Stacks L2, EVM contracts, trustless settlement",
  },
];

export default function SystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ rx: -y * 8, ry: x * 10 });
  };

  const handleMouseLeave = () => {
    setCoords({ rx: 0, ry: 0 });
    setActiveNode(null);
  };

  return (
    <div
      ref={containerRef}
      className="system-map-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive architecture system map: Users, Frontend, Backend, and Blockchain"
      style={{
        transform: `perspective(1000px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`,
      }}
    >
      <div className="map-header">
        <div className="header-left">
          <span className="live-dot" aria-hidden="true" />
          <span className="header-title">SYSTEM ARCHITECTURE MAP</span>
        </div>
        <span className="header-status">LIVE PROTOCOL TOPOLOGY</span>
      </div>

      <div className="map-viewport">
        {/* Subtle architectural background grid */}
        <div className="grid-overlay" />

        {/* SVG connection lines between nodes */}
        <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad-user-fe" x1="18%" y1="28%" x2="52%" y2="15%">
              <stop offset="0%" stopColor="#ff8a65" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="grad-fe-be" x1="52%" y1="15%" x2="82%" y2="50%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c5a7ff" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="grad-be-bc" x1="82%" y1="50%" x2="36%" y2="78%">
              <stop offset="0%" stopColor="#c5a7ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d9f99d" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="grad-bc-user" x1="36%" y1="78%" x2="18%" y2="28%">
              <stop offset="0%" stopColor="#d9f99d" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff8a65" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="grad-fe-bc" x1="52%" y1="15%" x2="36%" y2="78%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d9f99d" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Primary data routes */}
          <line
            x1="18"
            y1="28"
            x2="52"
            y2="15"
            stroke="url(#grad-user-fe)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            className="pulse-line"
          />
          <line
            x1="52"
            y1="15"
            x2="82"
            y2="50"
            stroke="url(#grad-fe-be)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            className="pulse-line delay-1"
          />
          <line
            x1="82"
            y1="50"
            x2="36"
            y2="78"
            stroke="url(#grad-be-bc)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            className="pulse-line delay-2"
          />
          <line
            x1="36"
            y1="78"
            x2="18"
            y2="28"
            stroke="url(#grad-bc-user)"
            strokeWidth="0.8"
            strokeDasharray="2 1.5"
            className="pulse-line delay-3"
          />
          <line
            x1="52"
            y1="15"
            x2="36"
            y2="78"
            stroke="url(#grad-fe-bc)"
            strokeWidth="0.5"
            strokeDasharray="1.5 2"
          />

          {/* Central data packet beacon */}
          <circle cx="48" cy="46" r="1.4" fill="#d9f99d" opacity="0.75" className="beacon-dot" />
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const isCurrent = activeNode === node.id;
          return (
            <div
              key={node.id}
              className={`system-node ${isCurrent ? "is-active" : ""}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                "--node-color": node.color,
              } as React.CSSProperties}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div className="node-anchor">
                <span className="node-ring" />
                <span className="node-core" />
              </div>
              <div className="node-card">
                <div className="node-top">
                  <span className="node-title">{node.label}</span>
                  <span className="node-badge">{node.badge}</span>
                </div>
                <div className="node-sub">{node.sublabel}</div>
                {isCurrent && <div className="node-details">{node.details}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="map-footer">
        <span className="footer-label">
          {activeNode
            ? NODES.find((n) => n.id === activeNode)?.details
            : "Hover nodes to inspect end-to-end transaction pipeline"}
        </span>
        <span className="footer-metric">Deterministic Execution</span>
      </div>

      <style jsx>{`
        .system-map-card {
          position: relative;
          width: 100%;
          min-height: 420px;
          border: 1px solid var(--border);
          background: rgba(14, 18, 21, 0.76);
          backdrop-filter: blur(16px);
          overflow: hidden;
          transition: transform 0.15s ease-out, border-color 0.3s ease;
        }

        .system-map-card:hover {
          border-color: rgba(217, 249, 157, 0.3);
        }

        .map-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.25rem;
          border-bottom: 1px solid var(--border-soft);
          background: rgba(11, 14, 16, 0.6);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 8px var(--lime);
          animation: mapPulse 2s infinite ease-in-out;
        }

        .header-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--white);
        }

        .header-status {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .map-viewport {
          position: relative;
          height: 330px;
          overflow: hidden;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(244, 241, 234, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 241, 234, 0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .connection-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .pulse-line {
          animation: dashMove 12s linear infinite;
        }

        .delay-1 { animation-delay: -3s; }
        .delay-2 { animation-delay: -6s; }
        .delay-3 { animation-delay: -9s; }

        @keyframes dashMove {
          to { stroke-dashoffset: -100; }
        }

        .beacon-dot {
          animation: beaconFade 3s ease-in-out infinite alternate;
        }

        @keyframes beaconFade {
          0% { transform: scale(0.8); opacity: 0.3; }
          100% { transform: scale(1.6); opacity: 0.8; }
        }

        .system-node {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .system-node:hover {
          transform: translate(-50%, -50%) scale(1.05);
          z-index: 20;
        }

        .node-anchor {
          position: relative;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .node-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid var(--node-color);
          opacity: 0.6;
          animation: ringPulse 2.4s ease-out infinite;
        }

        .node-core {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--node-color);
          box-shadow: 0 0 10px var(--node-color);
        }

        .node-card {
          min-width: 140px;
          max-width: 190px;
          padding: 0.55rem 0.75rem;
          border: 1px solid var(--border);
          background: rgba(8, 11, 13, 0.92);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .system-node:hover .node-card,
        .system-node.is-active .node-card {
          border-color: var(--node-color);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .node-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }

        .node-title {
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--white);
          white-space: nowrap;
        }

        .node-badge {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          color: var(--node-color);
          text-transform: uppercase;
        }

        .node-sub {
          margin-top: 0.15rem;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          white-space: nowrap;
        }

        .node-details {
          margin-top: 0.4rem;
          padding-top: 0.35rem;
          border-top: 1px solid var(--border-soft);
          font-size: 0.62rem;
          color: rgba(244, 241, 234, 0.8);
          line-height: 1.35;
          animation: fadeIn 0.2s ease forwards;
        }

        .map-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--border-soft);
          background: rgba(11, 14, 16, 0.6);
          font-family: var(--font-mono);
          font-size: 0.6rem;
        }

        .footer-label {
          color: var(--cyan);
          letter-spacing: 0.04em;
        }

        .footer-metric {
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        @keyframes mapPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .system-map-card {
            transform: none !important;
          }
          .map-viewport {
            height: auto;
            min-height: auto;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.65rem;
            padding: 0.85rem;
          }
          .connection-svg {
            display: none;
          }
          .grid-overlay {
            opacity: 0.3;
          }
          .system-node {
            position: relative;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100%;
          }
          .system-node:hover {
            transform: none !important;
          }
          .node-anchor {
            display: none;
          }
          .node-card {
            min-width: 0;
            max-width: 100%;
            width: 100%;
            padding: 0.65rem;
          }
          .node-title {
            font-size: 0.72rem;
          }
          .node-sub {
            font-size: 0.55rem;
          }
          .map-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
            padding: 0.65rem 0.85rem;
          }
        }

        @media (max-width: 380px) {
          .map-viewport {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
