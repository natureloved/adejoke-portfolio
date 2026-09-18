"use client";

import SystemMap from "./SystemMap";

export default function Hero() {
  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <div className="site-grid hero-grid">
        <div className="hero-content">
          {/* Top Collaboration Badge & Location */}
          <div className="hero-top-meta">
            <div className="location-pill">
              <span className="live-indicator" aria-hidden="true" />
              <span>Lagos, Nigeria // Global Systems</span>
            </div>

            <a href="#contact" className="top-collab-badge" title="Connect directly">
              <span className="collab-pulse" aria-hidden="true" />
              <span className="collab-text">Available for selected product & engineering collaborations</span>
              <span className="collab-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <h1 className="hero-name">
            Akinola <span className="highlight-surname">Adejoke</span>
          </h1>

          {/* Sharp positioning statement — stays completely still */}
          <p className="hero-statement">
            I build full-stack products for money, ownership, and opportunity.
          </p>

          {/* Specialization line — complete, polished sentence */}
          <div className="hero-specialization">
            <span className="spec-label">Specializing in</span>
            <span className="spec-highlight">Bitcoin DeFi, full-stack products, and smart contracts</span>
          </div>

          {/* Action buttons — high-contrast, finger-friendly CTAs */}
          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary" id="hero-view-work-cta">
              <span>View selected work</span>
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="btn btn-collaborate" id="hero-collaborate-cta">
              <span>Let’s build</span>
              <span className="arrow-right" aria-hidden="true">→</span>
            </a>
            <a href="#about" className="btn btn-outline" id="hero-about-cta">
              <span>About me</span>
            </a>
          </div>

          {/* Curated core technology stack — compact & uncluttered on mobile */}
          <div className="hero-footnote">
            <span className="footnote-label">Core Stack:</span>
            <div className="footnote-pills">
              <span className="foot-pill">Stacks / Clarity</span>
              <span className="foot-pill">Solidity</span>
              <span className="foot-pill">TypeScript</span>
              <span className="foot-pill desktop-only">Cairo</span>
              <span className="foot-pill desktop-only">Next.js</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Floating System Map */}
        <div className="hero-visual">
          <SystemMap />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: 7rem;
          padding-bottom: 5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
          align-items: center;
          gap: clamp(2.5rem, 5vw, 5.5rem);
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          max-width: 640px;
          padding-left: clamp(0.5rem, 2vw, 1.8rem);
        }

        .hero-top-meta {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.6rem;
        }

        .location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          width: fit-content;
          padding: 0.35rem 0.75rem;
          border: 1px solid var(--border);
          background: rgba(18, 23, 26, 0.6);
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cyan);
        }

        .live-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 6px var(--cyan);
        }

        .top-collab-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          width: fit-content;
          padding: 0.4rem 0.85rem;
          background: rgba(0, 240, 118, 0.05);
          border: 1px solid rgba(0, 240, 118, 0.25);
          color: var(--white);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .top-collab-badge:hover {
          background: rgba(0, 240, 118, 0.12);
          border-color: #00f076;
          transform: translateX(2px);
        }

        .collab-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f076;
          box-shadow: 0 0 8px #00f076;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        .collab-arrow {
          color: #00f076;
          transition: transform 0.2s ease;
        }

        .top-collab-badge:hover .collab-arrow {
          transform: translateX(3px);
        }

        .hero-name {
          margin: 0;
          font-size: clamp(3.2rem, 7vw, 6.2rem);
          font-weight: 650;
          letter-spacing: -0.075em;
          line-height: 0.92;
          color: var(--white);
        }

        .highlight-surname {
          color: var(--lime);
        }

        .hero-statement {
          margin: 1.8rem 0 0;
          font-size: clamp(1.15rem, 2.1vw, 1.48rem);
          font-weight: 400;
          line-height: 1.5;
          color: rgba(244, 241, 234, 0.9);
          max-width: 540px;
          letter-spacing: -0.015em;
        }

        .hero-specialization {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.55rem;
          margin-top: 1.4rem;
          padding: 0.75rem 0;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          font-family: var(--font-mono);
          font-size: clamp(0.74rem, 1.3vw, 0.84rem);
          line-height: 1.5;
        }

        .spec-label {
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .spec-highlight {
          color: var(--orange);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-top: 2.4rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 48px;
          padding: 0.8rem 1.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary {
          background: var(--lime);
          color: #06090a;
          border: 1px solid var(--lime);
          box-shadow: 0 4px 18px rgba(217, 249, 157, 0.25);
        }

        .btn-primary:hover {
          background: var(--white);
          border-color: var(--white);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 255, 255, 0.3);
        }

        .btn-collaborate {
          background: rgba(94, 234, 212, 0.1);
          color: var(--cyan);
          border: 1px solid rgba(94, 234, 212, 0.35);
        }

        .btn-collaborate:hover {
          background: var(--cyan);
          color: #06090a;
          border-color: var(--cyan);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(94, 234, 212, 0.25);
        }

        .btn-outline {
          background: transparent;
          color: rgba(244, 241, 234, 0.85);
          border: 1px solid var(--border);
        }

        .btn-outline:hover {
          border-color: var(--lime);
          color: var(--lime);
          transform: translateY(-2px);
        }

        .arrow, .arrow-right {
          transition: transform 0.2s ease;
        }

        .btn-primary:hover .arrow {
          transform: translateY(2px);
        }

        .btn-collaborate:hover .arrow-right {
          transform: translateX(3px);
        }

        .hero-footnote {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2.2rem;
          font-family: var(--font-mono);
          font-size: 0.64rem;
        }

        .footnote-label {
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .footnote-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .foot-pill {
          padding: 0.2rem 0.55rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-soft);
          color: rgba(244, 241, 234, 0.75);
          letter-spacing: 0.04em;
        }

        .hero-visual {
          position: relative;
          width: 100%;
        }

        @media (max-width: 960px) {
          .hero-section {
            padding-top: 7rem;
            min-height: auto;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .hero-visual {
            max-width: 580px;
          }
        }

        @media (max-width: 640px) {
          .hero-content {
            padding-left: 0;
          }

          .hero-top-meta {
            gap: 0.5rem;
          }

          .top-collab-badge {
            font-size: 0.6rem;
            padding: 0.35rem 0.65rem;
            white-space: normal;
            line-height: 1.4;
          }

          .hero-name {
            font-size: 3.2rem;
          }

          .hero-statement {
            font-size: 1.1rem;
            margin-top: 1.2rem;
          }

          /* Impossible to miss on mobile */
          .hero-ctas {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
            margin-top: 1.8rem;
          }

          .btn {
            width: 100%;
            min-height: 50px;
            font-size: 0.76rem;
          }

          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
