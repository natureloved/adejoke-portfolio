"use client";

export default function About() {
  return (
    <section id="about" className="about-section" aria-label="About Adejoke">
      <div className="site-grid">
        <div className="about-split-layout">
          {/* Left: Abstract Mark / Personal Visual of Precision & Systems */}
          <div className="visual-column">
            <div className="precision-mark-frame">
              <svg
                viewBox="0 0 320 320"
                className="precision-svg"
                aria-label="Abstract optical precision emblem representing radiography physics and blockchain systems"
              >
                <defs>
                  <radialGradient id="mark-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5eead4" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#d9f99d" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5eead4" />
                    <stop offset="100%" stopColor="#d9f99d" />
                  </linearGradient>
                </defs>

                {/* Central Soft Glow */}
                <circle cx="160" cy="160" r="140" fill="url(#mark-glow)" />

                {/* Concentric Precision Rings */}
                <circle cx="160" cy="160" r="128" stroke="rgba(244, 241, 234, 0.08)" strokeWidth="1" fill="none" />
                <circle
                  cx="160"
                  cy="160"
                  r="104"
                  stroke="rgba(94, 234, 212, 0.35)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  fill="none"
                  className="spin-slow"
                />
                <circle cx="160" cy="160" r="80" stroke="rgba(244, 241, 234, 0.12)" strokeWidth="1" fill="none" />
                <circle
                  cx="160"
                  cy="160"
                  r="56"
                  stroke="rgba(217, 249, 157, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                  fill="none"
                  className="spin-reverse"
                />
                <circle cx="160" cy="160" r="32" stroke="rgba(94, 234, 212, 0.5)" strokeWidth="1.5" fill="none" />

                {/* Radiation / Optical Coordinate Crosshairs */}
                <line x1="160" y1="16" x2="160" y2="304" stroke="rgba(244, 241, 234, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="16" y1="160" x2="304" y2="160" stroke="rgba(244, 241, 234, 0.1)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Diagonal Beam Rays */}
                <line x1="48" y1="48" x2="272" y2="272" stroke="rgba(94, 234, 212, 0.15)" strokeWidth="0.8" />
                <line x1="272" y1="48" x2="48" y2="272" stroke="rgba(94, 234, 212, 0.15)" strokeWidth="0.8" />

                {/* Satellite Nodes */}
                <circle cx="160" cy="32" r="4" fill="#5eead4" />
                <circle cx="288" cy="160" r="4" fill="#d9f99d" />
                <circle cx="160" cy="288" r="4" fill="#ff8a65" />
                <circle cx="32" cy="160" r="4" fill="#c5a7ff" />

                {/* Central Core */}
                <circle cx="160" cy="160" r="7" fill="url(#beam-grad)" className="core-pulse" />
              </svg>

              <div className="visual-caption">
                <span className="caption-label">SYSTEM PRECISION & HUMAN DYNAMICS</span>
                <span className="caption-coords">06° 31′ N, 03° 23′ E // LAGOS</span>
              </div>
            </div>
          </div>

          {/* Right: Personal Narrative */}
          <div className="narrative-column">
            <p className="section-label">01 / About</p>
            <h2 className="about-heading">Where complex systems become simple products.</h2>

            <div className="about-copy-blocks">
              <p className="lead-paragraph">
                I’m a full-stack and blockchain developer interested in the space where complex systems become simple products. I work across interfaces, APIs, smart contracts, and protocol design, with a focus on tools that expand access to money, ownership, and opportunity.
              </p>

              <div className="radiography-highlight">
                <div className="highlight-bar" aria-hidden="true" />
                <p>
                  I’m also studying <strong>Radiography and Radiation Science</strong>, which gives me another way to think about precision, systems, and the human side of technology.
                </p>
              </div>

              <p className="sub-paragraph">
                Whether diagnosing radiation physics in high-precision medical imaging or architecting non-custodial smart contracts on Bitcoin L2s, the instinct is identical: break down intricate, invisible mechanisms into interfaces people can understand, verify, and depend on.
              </p>
            </div>

            {/* Core Tenets */}
            <div className="tenets-grid">
              <div className="tenet-item">
                <span className="tenet-num">01</span>
                <div>
                  <h4 className="tenet-title">Clarity over complexity</h4>
                  <p className="tenet-desc">A complex backend is no excuse for a confusing user interface.</p>
                </div>
              </div>
              <div className="tenet-item">
                <span className="tenet-num">02</span>
                <div>
                  <h4 className="tenet-title">Protocol-level rigor</h4>
                  <p className="tenet-desc">Smart contracts and APIs built with deterministic reliability and security.</p>
                </div>
              </div>
              <div className="tenet-item">
                <span className="tenet-num">03</span>
                <div>
                  <h4 className="tenet-title">Human-first utility</h4>
                  <p className="tenet-desc">Products that expand access to capital, ownership, and independent creator agency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          padding: 8rem 0;
          border-top: 1px solid var(--border-soft);
        }

        .about-split-layout {
          display: grid;
          grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(3rem, 7vw, 7.5rem);
          align-items: center;
        }

        .visual-column {
          position: relative;
          width: 100%;
        }

        .precision-mark-frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2.5rem 2rem 1.75rem;
          border: 1px solid var(--border);
          background: rgba(14, 18, 22, 0.7);
          backdrop-filter: blur(16px);
        }

        .precision-svg {
          width: 100%;
          max-width: 280px;
          height: auto;
        }

        .spin-slow {
          transform-origin: 160px 160px;
          animation: spin 32s linear infinite;
        }

        .spin-reverse {
          transform-origin: 160px 160px;
          animation: spinRev 24s linear infinite;
        }

        .core-pulse {
          animation: corePulse 2.4s ease-in-out infinite alternate;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes spinRev {
          to { transform: rotate(-360deg); }
        }

        @keyframes corePulse {
          0% { transform: scale(0.85); transform-origin: 160px 160px; }
          100% { transform: scale(1.3); transform-origin: 160px 160px; }
        }

        .visual-caption {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-soft);
          font-family: var(--font-mono);
          text-align: center;
        }

        .caption-label {
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--cyan);
          text-transform: uppercase;
        }

        .caption-coords {
          font-size: 0.58rem;
          color: var(--muted);
          letter-spacing: 0.06em;
        }

        .narrative-column {
          display: flex;
          flex-direction: column;
        }

        .about-heading {
          margin: 0;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          font-weight: 650;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--white);
        }

        .about-copy-blocks {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .lead-paragraph {
          font-size: 1.12rem;
          line-height: 1.75;
          color: rgba(244, 241, 234, 0.95);
        }

        .radiography-highlight {
          position: relative;
          display: flex;
          gap: 1.2rem;
          padding: 1.1rem 1.4rem;
          background: rgba(94, 234, 212, 0.05);
          border: 1px solid rgba(94, 234, 212, 0.18);
        }

        .highlight-bar {
          width: 3px;
          background: var(--cyan);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .radiography-highlight p {
          margin: 0;
          font-size: 0.98rem;
          line-height: 1.68;
          color: rgba(244, 241, 234, 0.9);
        }

        .radiography-highlight strong {
          color: var(--cyan);
          font-weight: 600;
        }

        .sub-paragraph {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--muted);
        }

        .tenets-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.1rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-soft);
        }

        .tenet-item {
          display: flex;
          gap: 1.25rem;
        }

        .tenet-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--lime);
          font-weight: 700;
          padding-top: 0.1rem;
        }

        .tenet-title {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--white);
        }

        .tenet-desc {
          margin: 0.25rem 0 0;
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .about-split-layout {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .precision-mark-frame {
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
