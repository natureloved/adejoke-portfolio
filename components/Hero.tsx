"use client";

import Typewriter from "./Typewriter";

export default function Hero() {
  const bioText = "Somewhere between curiosity and obsession, I became a Full-Stack developer and Vibecoder. I build DeFi tools on Bitcoin L2, Ethereum, StarkNet, Ton and Solana not because someone told me to, but because I looked at the problems people face navigating Web3 and thought someone should fix this. Might as well be me.";

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
          ⬡ Full-Stack Developer · VIBE CODER
        </p>

        {/* Cinematic Kinetic Name */}
        <div className="name-container">
          <h1 className="hero-name shutter-reveal">
            <span className="name-line line-1">Akinola</span>
            <span className="name-line line-2 plasma-text">Adejoke</span>
          </h1>
        </div>

        {/* Chain Tags */}
        <div className="hero-tags reveal">
          <span className="chain-tag chain-tag-orange">Clarity · Stacks</span>
          <span className="chain-tag chain-tag-purple">Solidity · EVM</span>
          <span className="chain-tag chain-tag-cyan">Cairo · StarkNet</span>
        </div>

        {/* Bio with Typewriter effect */}
        <div className="reveal hero-bio-container">
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
          background: #06060c;
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

        .orb-1 { width: 650px; height: 650px; background: rgba(255, 95, 31, 0.1); filter: blur(100px); top: -80px; right: -120px; animation: float 12s ease-in-out infinite; }
        .orb-2 { width: 420px; height: 420px; background: rgba(155, 89, 245, 0.08); filter: blur(100px); bottom: 0; left: 50%; transform: translateX(-50%); animation: float 15s ease-in-out infinite; }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.72rem;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.28em;
          margin-bottom: 2rem;
        }

        /* Kinetic Typography */
        .name-container {
          perspective: 1000px;
          margin-bottom: 3.5rem;
        }

        .hero-name {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(3.5rem, 12vw, 11rem);
          line-height: 0.82;
          display: flex;
          flex-direction: column;
        }

        .name-line {
          display: block;
          position: relative;
          padding: 0.05em 0;
        }

        .line-1 {
          color: var(--white);
        }

        /* Plasma Text Effect */
        .plasma-text {
          background: linear-gradient(
            -45deg,
            var(--orange),
            var(--purple),
            var(--cyan),
            var(--orange)
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: plasma-flow 8s ease infinite;
          letter-spacing: -0.01em;
        }

        @keyframes plasma-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Shutter Reveal Animation */
        .shutter-reveal .line-1 {
          animation: shutter-in-bottom 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .shutter-reveal .line-2 {
          animation: shutter-in-bottom 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
        }

        @keyframes shutter-in-bottom {
          0% {
            transform: translateY(100%) rotateX(-30deg);
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            transform: translateY(0) rotateX(0);
            opacity: 1;
            filter: blur(0);
          }
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
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.3s ease;
        }
        .chain-tag:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--white);
        }

        .hero-bio-container {
          max-width: 650px;
          margin-bottom: 2.5rem;
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
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 0.9rem 2.2rem;
          border-radius: 4px;
          border: 1px solid;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .btn-primary {
          background: var(--orange);
          color: #06060c;
          border-color: var(--orange);
        }
        .btn-primary:hover {
          background: transparent;
          color: var(--orange);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 95, 31, 0.15);
        }

        .btn-secondary {
          background: transparent;
          color: var(--white);
          border-color: var(--border);
        }
        .btn-secondary:hover {
          border-color: var(--white);
          transform: translateY(-2px);
        }

        /* Scroll Hint */
        .scroll-hint {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .scroll-line { width: 40px; height: 1px; background: var(--border); }
        .scroll-text {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: lowercase;
        }

        @media (max-width: 900px) {
          .hero { padding: 8rem 2rem 5rem 3rem; }
          .hero-name { font-size: 4.5rem; line-height: 0.8; }
          .name-container { margin-bottom: 2.5rem; }
        }
      `}</style>
    </section>
  );
}
