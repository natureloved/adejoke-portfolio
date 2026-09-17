"use client";

import { useEffect, useState } from "react";

export default function CinematicEntrance() {
  const [stage, setStage] = useState<"enter" | "name" | "thesis" | "exit" | "done">("enter");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("done");
      return;
    }

    // Step 1: Horizontal light beam expands (300ms)
    const t1 = setTimeout(() => setStage("name"), 400);

    // Step 2: Name kinetic typography reveals with light sweep (1200ms)
    const t2 = setTimeout(() => setStage("thesis"), 1400);

    // Step 3: Thesis and system handshake complete, curtain prepares to lift (2500ms)
    const t3 = setTimeout(() => setStage("exit"), 2600);

    // Step 4: Curtain fully lifts, unmount overlay (3200ms)
    const t4 = setTimeout(() => setStage("done"), 3300);

    const handleSkip = () => {
      setStage("exit");
      setTimeout(() => setStage("done"), 600);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const skipIntro = () => {
    setStage("exit");
    setTimeout(() => setStage("done"), 600);
  };

  if (stage === "done") return null;

  return (
    <div
      className={`cinematic-curtain ${stage === "exit" ? "is-exiting" : ""}`}
      aria-label="Cinematic entrance animation"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Film Grain and Ambient Radial Flare */}
      <div className="ambient-flare" aria-hidden="true" />

      {/* Skip Button in Top Right */}
      <button
        type="button"
        className="skip-intro-btn"
        onClick={skipIntro}
        aria-label="Skip cinematic introduction"
      >
        <span>Skip intro</span>
        <span className="skip-key">ESC</span>
      </button>

      {/* Main Cinematic Scene */}
      <div className="cinematic-scene">
        {/* Top Eyebrow Identifier */}
        <div className={`cinematic-eyebrow ${stage !== "enter" ? "is-visible" : ""}`}>
          <span className="pulse-dot" aria-hidden="true" />
          <span className="eyebrow-text">06° 31′ N, 03° 23′ E // LAGOS PROTOCOL ENGINE</span>
        </div>

        {/* Central Kinetic Name Reveal */}
        <div className="name-reveal-box">
          <div className={`name-mask ${stage === "name" || stage === "thesis" || stage === "exit" ? "is-active" : ""}`}>
            <h1 className="cinematic-name">
              <span className="first-name">AKINOLA</span>
              <span className="last-name">ADEJOKE</span>
            </h1>
            {/* Luminous Light Sweep Ray */}
            <div className="light-sweep" aria-hidden="true" />
          </div>
        </div>

        {/* Core Thesis & Positioning Reveal */}
        <div className={`cinematic-thesis ${stage === "thesis" || stage === "exit" ? "is-visible" : ""}`}>
          <div className="thesis-line">
            <span>MONEY</span>
            <span className="thesis-sep">•</span>
            <span>OWNERSHIP</span>
            <span className="thesis-sep">•</span>
            <span>OPPORTUNITY</span>
          </div>
          <p className="thesis-sub">
            Full-stack digital products across Bitcoin Layer 2s, smart contracts & decentralized systems.
          </p>
        </div>

        {/* Bottom System Initializer Bar */}
        <div className={`system-progress-bar ${stage !== "enter" ? "is-visible" : ""}`}>
          <div className="progress-track">
            <div className={`progress-fill ${stage === "thesis" || stage === "exit" ? "is-full" : ""}`} />
          </div>
          <div className="progress-meta">
            <span>SYSTEM_INIT // 100%</span>
            <span>AUTONOMOUS PROTOCOL LAUNCH</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cinematic-curtain {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #06080a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.75s cubic-bezier(0.85, 0, 0.15, 1),
            opacity 0.75s cubic-bezier(0.85, 0, 0.15, 1);
        }

        .cinematic-curtain.is-exiting {
          transform: translateY(-100%);
          opacity: 0.95;
        }

        .ambient-flare {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217, 249, 157, 0.08) 0%, rgba(94, 234, 212, 0.04) 45%, transparent 70%);
          pointer-events: none;
          filter: blur(40px);
          animation: ambientPulse 4s ease-in-out infinite alternate;
        }

        @keyframes ambientPulse {
          0% { transform: scale(0.9); opacity: 0.4; }
          100% { transform: scale(1.15); opacity: 0.85; }
        }

        .skip-intro-btn {
          position: absolute;
          top: 2rem;
          right: 2.5rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.45rem 0.9rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .skip-intro-btn:hover {
          border-color: var(--lime);
          color: var(--white);
          background: rgba(217, 249, 157, 0.08);
        }

        .skip-key {
          padding: 0.1rem 0.35rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          font-size: 0.58rem;
          color: var(--white);
        }

        .cinematic-scene {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 900px;
          padding: 0 2rem;
        }

        .cinematic-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: var(--cyan);
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-eyebrow.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px var(--cyan);
        }

        .name-reveal-box {
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .name-mask {
          position: relative;
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          filter: blur(12px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .name-mask.is-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .cinematic-name {
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: clamp(3.6rem, 9.5vw, 8rem);
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 0.92;
          user-select: none;
        }

        .first-name {
          color: var(--white);
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .last-name {
          background: linear-gradient(135deg, #d9f99d 0%, #5eead4 50%, #ff8a65 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 25px rgba(217, 249, 157, 0.3));
        }

        .light-sweep {
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: skewX(-25deg);
          animation: sweep 1.8s 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        @keyframes sweep {
          to { left: 160%; }
        }

        .cinematic-thesis {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-thesis.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .thesis-line {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-mono);
          font-size: clamp(0.78rem, 1.6vw, 1.05rem);
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--white);
        }

        .thesis-sep {
          color: var(--lime);
        }

        .thesis-sub {
          margin: 0;
          font-size: clamp(0.85rem, 1.4vw, 1rem);
          color: var(--muted);
          max-width: 54ch;
          line-height: 1.6;
        }

        .system-progress-bar {
          margin-top: 3rem;
          width: min(380px, 85vw);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s 0.3s ease;
        }

        .system-progress-bar.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .progress-track {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, var(--lime), var(--cyan));
          transition: width 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .progress-fill.is-full {
          width: 100%;
        }

        .progress-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .cinematic-name {
            font-size: 3.4rem;
          }
          .skip-intro-btn {
            top: 1.25rem;
            right: 1.25rem;
          }
          .thesis-line {
            gap: 0.5rem;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </div>
  );
}
