"use client";

import { useEffect, useState } from "react";

const TRIGGER = "rasta";

const LINES = [
  "> RASTADEV OS v9.0 — boot sequence initiated",
  "> verifying wallet signature... ✓",
  "> syncing chains [BTC · STX · SOL · TON · NIM · AVAX]... ✓",
  "> vibes check... IRIE ✓",
  "> one love. keep building. 🇳🇬",
];

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState(0);

  // Listen for the secret word typed anywhere on the page
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "Escape") {
        setActive(false);
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-TRIGGER.length);
      if (buffer === TRIGGER) {
        buffer = "";
        setActive(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reveal lines one by one, then auto-dismiss
  useEffect(() => {
    if (!active) {
      setShown(0);
      return;
    }
    const typer = setInterval(
      () => setShown((s) => Math.min(s + 1, LINES.length)),
      550
    );
    const close = setTimeout(() => setActive(false), 9000);
    return () => {
      clearInterval(typer);
      clearTimeout(close);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="egg-overlay" onClick={() => setActive(false)}>
      <div className="egg-terminal" onClick={(e) => e.stopPropagation()}>
        <div className="egg-stripe" />
        <div className="egg-chrome">
          <div className="egg-dots">
            <span style={{ background: "#e02b2b" }} />
            <span style={{ background: "#fcd116" }} />
            <span style={{ background: "#27c93f" }} />
          </div>
          <span className="egg-title">rastadev@portfolio: ~/irie</span>
          <button className="egg-close" onClick={() => setActive(false)}>
            ✕
          </button>
        </div>
        <div className="egg-body">
          {LINES.slice(0, shown).map((line) => (
            <div key={line} className="egg-line">
              {line}
            </div>
          ))}
          <span className="egg-cursor">▌</span>
        </div>
      </div>

      <style jsx>{`
        .egg-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(4, 4, 10, 0.72);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: eggFade 0.25s ease-out;
        }
        .egg-terminal {
          width: min(560px, 100%);
          background: #060610;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(39, 201, 63, 0.12),
            0 0 30px rgba(252, 209, 22, 0.06);
          animation: eggPop 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .egg-stripe {
          height: 3px;
          background: linear-gradient(
            90deg,
            #e02b2b 0%,
            #e02b2b 33%,
            #fcd116 33%,
            #fcd116 66%,
            #27c93f 66%,
            #27c93f 100%
          );
        }
        .egg-chrome {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.55rem 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .egg-dots {
          display: flex;
          gap: 5px;
        }
        .egg-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: block;
        }
        .egg-title {
          flex: 1;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: rgba(240, 237, 230, 0.45);
        }
        .egg-close {
          background: none;
          border: none;
          color: rgba(240, 237, 230, 0.4);
          font-size: 0.75rem;
          cursor: pointer;
          padding: 0.1rem 0.3rem;
        }
        .egg-close:hover {
          color: #fff;
        }
        .egg-body {
          padding: 1.2rem 1.3rem 1.4rem;
          min-height: 170px;
        }
        .egg-line {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          line-height: 1.9;
          color: #27c93f;
          text-shadow: 0 0 8px rgba(39, 201, 63, 0.35);
          animation: eggFade 0.2s ease-out;
        }
        .egg-cursor {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          color: #27c93f;
          animation: eggBlink 1s steps(1) infinite;
        }
        @keyframes eggFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes eggPop {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes eggBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
