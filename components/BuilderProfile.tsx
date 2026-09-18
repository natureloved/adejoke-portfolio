"use client";

import { useState } from "react";
import { BUILDER_STAGES } from "@/data/portfolio";

export default function BuilderProfile() {
  const [activeStageId, setActiveStageId] = useState<string>("build");

  const activeStage = BUILDER_STAGES.find((s) => s.id === activeStageId) ?? BUILDER_STAGES[2];

  return (
    <section id="builder" className="builder-section" aria-label="Engineering Process">
      <div className="site-grid">
        <div className="builder-head">
          <p className="section-label">02 / Process & Methodology</p>
          <h2 className="section-title">An interactive map of how I ship software.</h2>
          <p className="section-intro">
            Deterministic engineering from system discovery to mainnet release. Click any milestone to inspect deliverables and verification points.
          </p>
        </div>

        {/* Visual Pipeline Progress Stepper */}
        <div className="pipeline-stepper-wrap">
          <div className="stepper-track" aria-hidden="true" />
          <div className="stepper-nodes" role="tablist" aria-label="Engineering Process Stages">
            {BUILDER_STAGES.map((stage, idx) => {
              const isSelected = activeStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`stepper-node-btn ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveStageId(stage.id)}
                  id={`stage-tab-${stage.id}`}
                >
                  <div className="node-circle">
                    <span className="node-icon">{stage.visualIcon}</span>
                  </div>
                  <div className="node-meta">
                    <span className="node-step">STAGE {stage.step}</span>
                    <span className="node-title">{stage.title}</span>
                  </div>
                  {idx < BUILDER_STAGES.length - 1 && (
                    <span className="node-connector" aria-hidden="true">→</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Stage Inspector Card */}
        <div className="stage-inspector-card">
          <div className="inspector-left">
            <div className="inspector-badge">
              <span className="badge-step">PHASE {activeStage.step} OF 04</span>
              <span className="badge-sep">{"//"}</span>
              <span className="badge-tagline">{activeStage.tagline}</span>
            </div>

            <h3 className="inspector-title">
              <span className="icon-title">{activeStage.visualIcon}</span> {activeStage.title}
            </h3>

            <p className="inspector-desc">{activeStage.description}</p>

            {/* Deliverables Chips */}
            <div className="inspector-block">
              <span className="block-title">Key Concrete Deliverables</span>
              <div className="chips-row">
                {activeStage.deliverables.map((deliv, idx) => (
                  <span key={idx} className="deliverable-chip">
                    <span className="chip-check">✓</span>
                    <span>{deliv}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Frameworks */}
            <div className="inspector-block">
              <span className="block-title">Primary Toolchain</span>
              <div className="chips-row">
                {activeStage.tools.map((tool, idx) => (
                  <span key={idx} className="tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Graphic Schematic */}
          <div className="inspector-right">
            <div className="schematic-window">
              <div className="schematic-header">
                <span className="schematic-title">
                  TELEMETRY // {activeStage.title.toUpperCase()}_SPECIFICATION
                </span>
                <span className="schematic-status">ACTIVE STAGE</span>
              </div>

              <div className="schematic-content">
                {activeStage.id === "discover" && (
                  <div className="diagram-box">
                    <div className="diagram-node">Problem Domain</div>
                    <div className="diagram-arrow">↓ State Constraints</div>
                    <div className="diagram-node node-highlight">Economic Model & Token Flows</div>
                    <div className="diagram-arrow">↓ Attack Vectors</div>
                    <div className="diagram-node">Threat Surface Verified</div>
                  </div>
                )}

                {activeStage.id === "design" && (
                  <div className="diagram-box">
                    <div className="diagram-node">Information Architecture</div>
                    <div className="diagram-arrow">↓ Component Tokens</div>
                    <div className="diagram-node node-highlight">Tactile Micro-Interactions</div>
                    <div className="diagram-arrow">↓ Usability Checks</div>
                    <div className="diagram-node">High-Density Responsive UI</div>
                  </div>
                )}

                {activeStage.id === "build" && (
                  <div className="diagram-box">
                    <div className="diagram-node">Next.js Frontend & TypeScript</div>
                    <div className="diagram-arrow">↕ Multi-Chain Relays</div>
                    <div className="diagram-node node-highlight">Smart Contracts (Clarity & Solidity)</div>
                    <div className="diagram-arrow">↕ RPC Telemetry</div>
                    <div className="diagram-node">Deterministic System Execution</div>
                  </div>
                )}

                {activeStage.id === "ship" && (
                  <div className="diagram-box">
                    <div className="diagram-node">Clarinet & Foundry Test Suites</div>
                    <div className="diagram-arrow">↓ Edge Deployment</div>
                    <div className="diagram-node node-highlight">Testnet Verification & Bug Bounties</div>
                    <div className="diagram-arrow">↓ Telemetry Monitoring</div>
                    <div className="diagram-node">Public Mainnet Release</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Stack Deep Dive Strip */}
        <div className="stack-deep-dive">
          <div className="deep-dive-header">
            <span className="deep-dive-label">SPECIALIZED CORE CAPABILITIES</span>
            <span className="deep-dive-metric">Production Verified</span>
          </div>
          <div className="deep-dive-grid">
            <div className="deep-group">
              <span className="group-category">Frontend Systems</span>
              <p className="group-items">React, Next.js (App Router), TypeScript, Tailwind CSS, Responsive Design</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Smart Contracts</span>
              <p className="group-items">Clarity (Stacks / Clarinet), Solidity (EVM / Foundry), Cairo (Starknet)</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Cross-Chain & APIs</span>
              <p className="group-items">LI.FI Aggregator, Solana, Nimiq Pay, TON, Node.js REST & WebSockets</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Verification & DevOps</span>
              <p className="group-items">WASM In-Browser Runners, Vitest, Vercel Edge, GitHub Actions CI</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .builder-section {
          position: relative;
          padding: clamp(6rem, 10vw, 8rem) 0;
          border-top: 1px solid var(--border-soft);
        }

        .builder-head {
          margin-bottom: 3.5rem;
        }

        /* ── Visual Stepper Track ── */
        .pipeline-stepper-wrap {
          position: relative;
          margin-bottom: 2.5rem;
        }

        .stepper-track {
          position: absolute;
          top: 24px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }

        .stepper-nodes {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stepper-node-btn {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.85rem 1.1rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .stepper-node-btn:hover {
          border-color: rgba(217, 249, 157, 0.4);
          background: rgba(18, 24, 30, 0.9);
          transform: translateY(-2px);
        }

        .stepper-node-btn.is-active {
          border-color: var(--lime);
          background: rgba(18, 24, 30, 0.95);
          box-shadow: 0 4px 20px rgba(217, 249, 157, 0.15);
        }

        .node-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .stepper-node-btn.is-active .node-circle {
          background: rgba(217, 249, 157, 0.15);
          border-color: var(--lime);
        }

        .node-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .node-step {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          letter-spacing: 0.08em;
        }

        .stepper-node-btn.is-active .node-step {
          color: var(--lime);
          font-weight: 600;
        }

        .node-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--white);
        }

        .node-connector {
          display: none;
        }

        /* ── Stage Inspector Card ── */
        .stage-inspector-card {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 3rem;
          padding: clamp(2rem, 4vw, 3.5rem);
          background: rgba(14, 18, 22, 0.8);
          border: 1px solid var(--border);
          backdrop-filter: blur(14px);
          margin-bottom: 3.5rem;
        }

        .inspector-left {
          display: flex;
          flex-direction: column;
        }

        .inspector-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          margin-bottom: 0.85rem;
        }

        .badge-step {
          color: var(--lime);
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .badge-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .badge-tagline {
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .inspector-title {
          margin: 0;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 650;
          letter-spacing: -0.03em;
          color: var(--white);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-title {
          font-size: 1.8rem;
        }

        .inspector-desc {
          margin: 1rem 0 1.8rem;
          font-size: 0.92rem;
          line-height: 1.7;
          color: rgba(244, 241, 234, 0.85);
          max-width: 58ch;
        }

        .inspector-block {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-soft);
        }

        .block-title {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .deliverable-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          background: rgba(0, 240, 118, 0.06);
          border: 1px solid rgba(0, 240, 118, 0.25);
          color: var(--white);
          font-size: 0.75rem;
        }

        .chip-check {
          color: #00f076;
          font-weight: 700;
        }

        .tool-chip {
          padding: 0.35rem 0.65rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-soft);
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: 0.68rem;
        }

        /* ── Right Diagram / Schematic ── */
        .inspector-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .schematic-window {
          background: rgba(6, 9, 12, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .schematic-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
          font-family: var(--font-mono);
          font-size: 0.58rem;
        }

        .schematic-title {
          color: var(--muted);
          letter-spacing: 0.08em;
        }

        .schematic-status {
          color: var(--lime);
          font-weight: 600;
        }

        .schematic-content {
          padding: 1.5rem;
        }

        .diagram-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .diagram-node {
          width: 100%;
          padding: 0.75rem 1rem;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-soft);
          color: rgba(244, 241, 234, 0.85);
        }

        .diagram-node.node-highlight {
          border-color: var(--lime);
          background: rgba(217, 249, 157, 0.08);
          color: var(--white);
          font-weight: 600;
        }

        .diagram-arrow {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--muted);
        }

        /* ── Deep Dive Matrix ── */
        .stack-deep-dive {
          border: 1px solid var(--border);
          background: rgba(11, 15, 18, 0.85);
          overflow: hidden;
        }

        .deep-dive-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border-soft);
          font-family: var(--font-mono);
        }

        .deep-dive-label {
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          color: var(--white);
          font-weight: 600;
        }

        .deep-dive-metric {
          font-size: 0.58rem;
          color: var(--lime);
          text-transform: uppercase;
        }

        .deep-dive-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border-soft);
        }

        .deep-group {
          padding: 1.5rem;
          background: rgba(11, 15, 18, 0.95);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .group-category {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .group-items {
          margin: 0;
          font-size: 0.82rem;
          color: rgba(244, 241, 234, 0.85);
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .stepper-nodes {
            grid-template-columns: repeat(2, 1fr);
          }
          .stage-inspector-card {
            grid-template-columns: 1fr;
          }
          .deep-dive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stepper-nodes {
            grid-template-columns: 1fr;
          }
          .stepper-track {
            display: none;
          }
          .deep-dive-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
