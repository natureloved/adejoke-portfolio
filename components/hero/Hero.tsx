"use client";

import { useEffect, useState } from "react";
import { HERO_KEYWORDS } from "@/data/portfolio";
import SystemMap from "./SystemMap";

export default function Hero() {
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % HERO_KEYWORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <div className="site-grid hero-grid">
        <div className="hero-content">
          <div className="location-pill">
            <span className="live-indicator" aria-hidden="true" />
            <span>Lagos, Nigeria / Global Systems & Protocols</span>
          </div>

          <h1 className="hero-name">
            Akinola <span className="highlight-surname">Adejoke</span>
          </h1>

          {/* Sharp positioning statement — stays completely still */}
          <p className="hero-statement">
            I build full-stack products for money, ownership, and opportunity.
          </p>

          {/* Animated line underneath cycling words smoothly */}
          <div className="hero-specialization">
            <span className="spec-label">Specializing in:</span>
            <div className="spec-rotator" aria-live="polite">
              <span key={keywordIndex} className="spec-word">
                {HERO_KEYWORDS[keywordIndex]}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary">
              View selected work
              <span className="arrow" aria-hidden="true">↓</span>
            </a>
            <a href="#about" className="btn btn-outline">
              About me
            </a>
            <a href="#contact" className="btn btn-quiet">
              Let’s build
              <span className="arrow-right" aria-hidden="true">→</span>
            </a>
          </div>

          <div className="hero-footnote">
            <span>Clarity • Solidity • Cairo • TypeScript • Next.js</span>
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
          padding-top: 6.5rem;
          padding-bottom: 4rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          align-items: center;
          gap: clamp(2.5rem, 5vw, 5.5rem);
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          max-width: 620px;
          padding-left: clamp(0.75rem, 2.5vw, 2.5rem);
        }

        .location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          width: fit-content;
          padding: 0.35rem 0.75rem;
          margin-bottom: 1.5rem;
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
          align-items: center;
          gap: 0.65rem;
          margin-top: 1.35rem;
          padding: 0.6rem 0;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        .spec-label {
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .spec-rotator {
          position: relative;
          display: inline-block;
          overflow: hidden;
          min-width: 200px;
          height: 1.4rem;
        }

        .spec-word {
          display: inline-block;
          font-weight: 600;
          color: var(--orange);
          letter-spacing: 0.06em;
          animation: wordSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes wordSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          margin-top: 2.2rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: var(--lime);
          color: #0b0e10;
          border: 1px solid var(--lime);
        }

        .btn-primary:hover {
          background: var(--white);
          border-color: var(--white);
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: var(--white);
          border: 1px solid var(--border);
        }

        .btn-outline:hover {
          border-color: var(--lime);
          color: var(--lime);
          transform: translateY(-2px);
        }

        .btn-quiet {
          background: transparent;
          color: var(--cyan);
          border: 1px solid transparent;
        }

        .btn-quiet:hover {
          color: var(--white);
          transform: translateX(3px);
        }

        .arrow, .arrow-right {
          transition: transform 0.2s ease;
        }

        .btn-primary:hover .arrow {
          transform: translateY(2px);
        }

        .btn-quiet:hover .arrow-right {
          transform: translateX(4px);
        }

        .hero-footnote {
          margin-top: 2.2rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: #6d7b80;
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

        @media (max-width: 520px) {
          .hero-ctas {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
          }
          .btn {
            justify-content: center;
          }
          .hero-name {
            font-size: 3.2rem;
          }
        }
      `}</style>
    </section>
  );
}
