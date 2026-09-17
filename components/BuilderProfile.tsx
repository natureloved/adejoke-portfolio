"use client";

import { useState } from "react";
import { BUILDER_STAGES } from "@/data/portfolio";

export default function BuilderProfile() {
  const [activeStage, setActiveStage] = useState<string>("build");

  return (
    <section id="builder" className="builder-section" aria-label="How I Work">
      <div className="site-grid">
        <div className="builder-head">
          <p className="section-label">02 / Builder Profile</p>
          <h2 className="section-title">A map of how I work. No vanity percentages.</h2>
          <p className="section-intro">
            Instead of saying I am 95% skilled in a framework, here is the actual end-to-end engineering methodology I follow to ship software that holds up in production.
          </p>
        </div>

        {/* 4-Step Pipeline Flow */}
        <div className="pipeline-container">
          <div className="pipeline-grid">
            {BUILDER_STAGES.map((stage, idx) => {
              const isActive = activeStage === stage.id;
              return (
                <div
                  key={stage.id}
                  className={`pipeline-card ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveStage(stage.id)}
                >
                  <div className="card-top">
                    <span className="step-num">{stage.step}</span>
                    <span className="step-tag">{stage.tagline}</span>
                  </div>

                  <h3 className="step-title">{stage.title}</h3>

                  <p className="step-desc">{stage.description}</p>

                  <div className="step-tools">
                    <span className="tools-heading">Tools & Deliverables</span>
                    <div className="tools-list">
                      {stage.tools.map((t) => (
                        <span key={t} className="tool-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {idx < BUILDER_STAGES.length - 1 && (
                    <span className="step-connector" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Stack Deep Dive Banner */}
        <div className="stack-deep-dive">
          <div className="deep-dive-header">
            <span className="deep-dive-label">CORE TOOLCHAIN SPECIALIZATION</span>
            <span className="deep-dive-metric">Production Verified</span>
          </div>
          <div className="deep-dive-grid">
            <div className="deep-group">
              <span className="group-category">Frontend & Tactile UX</span>
              <p className="group-items">React, Next.js (App Router), TypeScript, Tailwind CSS, Responsive Design</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Backend & System Relays</span>
              <p className="group-items">Node.js, REST & GraphQL APIs, SQLite, Supabase, Claude 3.5 Agentic Workflows</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Smart Contracts & Protocols</span>
              <p className="group-items">Solidity (EVM / Foundry), Clarity (Stacks / Clarinet), Cairo (Starknet)</p>
            </div>
            <div className="deep-group">
              <span className="group-category">Ecosystems & Liquidity</span>
              <p className="group-items">Stacks, Bitcoin L2s, LI.FI Multi-Chain Routing, Solana, Nimiq Pay, TON</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .builder-section {
          position: relative;
          padding: 8rem 0;
          border-top: 1px solid var(--border-soft);
        }

        .builder-head {
          margin-bottom: 4rem;
        }

        .pipeline-container {
          position: relative;
          margin-bottom: 4rem;
        }

        .pipeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .pipeline-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 1.75rem 1.4rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pipeline-card:hover,
        .pipeline-card.is-active {
          border-color: var(--lime);
          background: rgba(18, 24, 30, 0.95);
          transform: translateY(-4px);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }

        .step-num {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--lime);
        }

        .step-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .step-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 650;
          letter-spacing: -0.02em;
          color: var(--white);
        }

        .step-desc {
          margin: 0.85rem 0 0;
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--muted);
          flex: 1;
        }

        .step-tools {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-soft);
        }

        .tools-heading {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.56rem;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.65rem;
        }

        .tools-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .tool-tag {
          padding: 0.2rem 0.45rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: rgba(244, 241, 234, 0.85);
        }

        .pipeline-card:hover .tool-tag,
        .pipeline-card.is-active .tool-tag {
          border-color: rgba(217, 249, 157, 0.3);
          color: var(--white);
        }

        .step-connector {
          display: none;
        }

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
          font-size: 0.85rem;
          color: rgba(244, 241, 234, 0.85);
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .pipeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .deep-dive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .pipeline-grid {
            grid-template-columns: 1fr;
          }
          .deep-dive-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
