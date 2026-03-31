"use client";

import Typewriter from "./Typewriter";

export default function Hero() {
  const bioText = "Born curious. Built different. I speak Solidity, Cairo, and Clarity fluently — which basically means I argue with three different blockchains for a living. I build at the intersection of African ingenuity and decentralized finance, because the future of money shouldn't have gatekeepers.";

  return (
    <section id="hero" className="hero">
      {/* Background grid */}
      <div className="hero-grid" />

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <p className="hero-eyebrow reveal">
          ⬡ Full-Stack Developer · Multi-Chain Builder
        </p>

        {/* Name */}
        <h1 className="hero-name reveal">
          <span className="hero-name-line1">Akinola</span>
          <br />
          <span className="hero-name-line2 gradient-text animate-grad-shift">
            Adejoke
          </span>
        </h1>

        {/* Chain Tags */}
        <div className="hero-tags reveal">
          <span className="chain-tag chain-tag-orange">Clarity · Stacks</span>
          <span className="chain-tag chain-tag-purple">Solidity · EVM</span>
          <span className="chain-tag chain-tag-cyan">Cairo · StarkNet</span>
        </div>

        {/* Bio with Typewriter effect */}
        <div className="reveal">
          <Typewriter text={bioText} />
        </div>

        {/* CTAs */}
        <div className="hero-ctas reveal">
          <a href="#projects" id="cta-projects" className="btn btn-primary">
            See My Work
          </a>
          <a href="#contact" id="cta-contact" className="btn btn-secondary">
            Let&apos;s Talk
          </a>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint reveal">
          <span className="scroll-line" />
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10rem 4rem 6rem 6rem;
          overflow: hidden;
        }

        /* Grid Background */
        .hero-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(
              rgba(255, 95, 31, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 95, 31, 0.03) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
        }

        /* Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .orb-1 {
          width: 650px;
          height: 650px;
          background: rgba(255, 95, 31, 0.1);
          filter: blur(100px);
          top: -80px;
          right: -120px;
          animation: float 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 420px;
          height: 420px;
          background: rgba(155, 89, 245, 0.08);
          filter: blur(100px);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: float 11s ease-in-out infinite;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 280px;
          height: 280px;
          background: rgba(0, 212, 255, 0.07);
          filter: blur(100px);
          top: 40%;
          right: 10%;
          animation: float 9s ease-in-out infinite;
          animation-delay: 4s;
        }

        /* Content */
        .hero-content {
          position: relative;
          z-index: 2;
        }

        /* Eyebrow */
        .hero-eyebrow {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.72rem;
          font-weight: 400;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.28em;
          margin-bottom: 1.6rem;
        }

        /* Name */
        .hero-name {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(3.5rem, 11vw, 10.5rem);
          line-height: 0.72;
          margin-bottom: 3.5rem;
        }

        .hero-name-line1 {
          color: var(--white);
          display: block;
        }

        .hero-name-line2 {
          display: block;
        }

        /* Chain Tags */
        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.2rem;
        }

        .chain-tag {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
          border: 1px solid;
        }

        .chain-tag-orange {
          color: var(--orange);
          border-color: var(--orange);
          background: rgba(255, 95, 31, 0.04);
        }

        .chain-tag-purple {
          color: var(--purple);
          border-color: var(--purple);
          background: rgba(155, 89, 245, 0.04);
        }

        .chain-tag-cyan {
          color: var(--cyan);
          border-color: var(--cyan);
          background: rgba(0, 212, 255, 0.04);
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .btn {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          padding: 0.82rem 1.8rem;
          border-radius: 3px;
          border: 1px solid;
          transition: all 0.25s ease;
          cursor: pointer;
          display: inline-block;
        }

        .btn-primary {
          background: var(--orange);
          color: #06060c;
          border-color: var(--orange);
        }

        .btn-primary:hover {
          background: transparent;
          color: var(--orange);
          border-color: var(--orange);
        }

        .btn-secondary {
          background: transparent;
          color: var(--white);
          border-color: var(--border);
        }

        .btn-secondary:hover {
          color: var(--purple);
          border-color: var(--purple);
        }

        /* Scroll Hint */
        .scroll-hint {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .scroll-line {
          display: block;
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, var(--orange), var(--purple));
        }

        .scroll-text {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem;
          font-weight: 400;
          color: var(--muted);
          text-transform: lowercase;
          letter-spacing: 0.1em;
        }

        @media (max-width: 900px) {
          .hero {
            padding: 8rem 2rem 5rem 3.5rem;
            min-height: auto;
          }
          .hero-name {
            font-size: 4rem;
            line-height: 0.9;
          }
        }
      `}</style>
    </section>
  );
}
