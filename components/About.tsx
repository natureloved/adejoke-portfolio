"use client";

import { CHAINS } from "@/data/chains";
import { useConstellation } from "@/lib/constellation-context";

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="stat-card reveal">
      <span className="stat-number gradient-text">{number}</span>
      <span className="stat-label">{label}</span>
      <style jsx>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.5rem;
          transition: border-color 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .stat-card:hover {
          border-color: var(--orange);
          transform: translateY(-4px);
        }
        .stat-number {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 3rem;
          line-height: 1;
        }
        .stat-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

function Avatar() {
  return (
    <div className="avatar-card reveal">
      <div className="avatar-ring">
        <div className="avatar-inner">
          <span className="avatar-initials">AE</span>
          <span className="avatar-hex">⬡</span>
        </div>
      </div>
      <div className="avatar-meta">
        <div className="avatar-name">Akinola Adejoke</div>
        <div className="avatar-role">Full Stack × Multi-Chain</div>
        <div className="avatar-loc">
          <span className="loc-dot" />
          Lagos, Nigeria
        </div>
      </div>

      <style jsx>{`
        .avatar-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .avatar-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--orange), var(--purple), var(--cyan));
          padding: 2.5px;
          flex-shrink: 0;
        }
        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .avatar-initials {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 2.2rem;
          color: var(--white);
          line-height: 1;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }
        .avatar-hex {
          position: absolute;
          bottom: -6px;
          right: -2px;
          font-size: 2.8rem;
          color: var(--orange);
          opacity: 0.12;
          line-height: 1;
        }
        .avatar-meta {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .avatar-name {
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--white);
          line-height: 1;
        }
        .avatar-role {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.67rem;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .avatar-loc {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.63rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .loc-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cyan);
          flex-shrink: 0;
          box-shadow: 0 0 5px var(--cyan);
        }
        @media (max-width: 900px) {
          .avatar-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .avatar-meta { align-items: center; }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  const { setActive } = useConstellation();

  return (
    <section id="origin" className="about section">
      <div className="section-label reveal">01 — Origin</div>
      <h2 className="section-title reveal">Who I Am</h2>

      <div className="about-grid">
        <div className="about-left">
          <Avatar />

          <div className="about-text">
            <p className="about-para reveal">
              I&apos;m <strong>Akinola Adejoke</strong>. Curiosity took me down
              the building hole and I never came back.
            </p>
            <p className="about-para reveal">
              I build full-stack DeFi products, smart contracts, frontends, and
              everything in between. Bitcoin L2 is where I&apos;m most obsessed
              right now, because the infrastructure is still being written and the
              problems are still worth solving.
            </p>
            <p className="about-para reveal">
              I believe the tools of financial freedom should be open, accessible,
              and beautifully built.
            </p>
            <p className="about-para reveal">
              Every line of code is proof that we&apos;re here, we&apos;re
              shipping, and we&apos;re not waiting for permission.
            </p>
          </div>

          {/* Constellation legend — hover a chain to light its node in the field */}
          <div className="chain-legend reveal">
            <span className="legend-hint">hover a node — watch the sky</span>
            <div className="legend-row">
              {CHAINS.map((c) => (
                <span
                  key={c.id}
                  className="legend-node"
                  style={{ "--node": c.color } as React.CSSProperties}
                  onMouseEnter={() => setActive(c.id)}
                  onMouseLeave={() => setActive(null)}
                  title={c.name}
                >
                  <i style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard number="3" label="Blockchain Languages" />
          <StatCard number="9" label="Programs & Fellowships" />
          <StatCard number="6" label="Live DeFi Projects" />
          <StatCard number="∞" label="Problems Left to Solve" />
        </div>

        <div className="stack-snapshot reveal">
          <div className="snapshot-header">
            <span className="snapshot-icon">⚡</span>
            <span className="snapshot-title">Current Stack</span>
          </div>
          <div className="snapshot-grid">
            <div className="snapshot-item">
              <span className="snapshot-label">Editor</span>
              <span className="snapshot-value">VS Code</span>
            </div>
            <div className="snapshot-item">
              <span className="snapshot-label">Terminal</span>
              <span className="snapshot-value">Warp</span>
            </div>
            <div className="snapshot-item">
              <span className="snapshot-label">OS</span>
              <span className="snapshot-value">Windows 11</span>
            </div>
            <div className="snapshot-item">
              <span className="snapshot-label">Theme</span>
              <span className="snapshot-value">Dracula + Custom</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about { position: relative; }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          max-width: 1100px;
          align-items: start;
        }
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .about-text {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }
        .about-para {
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(240, 237, 230, 0.75);
          font-family: var(--font-syne), "Syne", sans-serif;
        }
        .about-para strong {
          color: var(--white);
          font-weight: 700;
        }
        .chain-legend {
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.2rem 1.4rem;
          background: rgba(255, 255, 255, 0.02);
        }
        .legend-hint {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted);
        }
        .legend-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
          margin-top: 0.9rem;
        }
        .legend-node {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(240, 237, 230, 0.6);
          border: 1px solid var(--border);
          border-radius: 3px;
          padding: 0.32rem 0.6rem;
          cursor: default;
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .legend-node i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: block;
          flex: none;
        }
        .legend-node:hover {
          color: var(--white);
          border-color: var(--node);
          transform: translateY(-2px);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .stack-snapshot {
          margin-top: 3rem;
          padding: 1.8rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 6px;
          max-width: 1100px;
        }
        .snapshot-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
        }
        .snapshot-icon { font-size: 1.1rem; }
        .snapshot-title {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--orange);
        }
        .snapshot-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .snapshot-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .snapshot-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .snapshot-value {
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: 0.85rem;
          color: var(--white);
          font-weight: 600;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-para { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 0.8rem; }
          .stat-number { font-size: 2.2rem; }
          .avatar-ring { width: 70px; height: 70px; }
          .snapshot-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
