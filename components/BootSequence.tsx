"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> booting adejoke.os v9.0",
  "> linking 8 chains ............. ok",
  "> calibrating cursor gravity ... ok",
  "> syncing lagos clock .......... ok",
  "> one love. keep building. 🇳🇬",
];

const BOOT_KEY = "adejoke_booted";

/**
 * A short first-paint boot overlay. Runs once per session, is skippable with
 * any key/click, and is bypassed entirely under prefers-reduced-motion.
 * The overlay background matches --bg so the transition in/out is seamless.
 */
export default function BootSequence() {
  const [run, setRun] = useState(false);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only once per browser session.
    if (sessionStorage.getItem(BOOT_KEY)) return;
    sessionStorage.setItem(BOOT_KEY, "1");
    setRun(true);
  }, []);

  // Fade out first, then unmount — a hard cut feels like a glitch.
  const finish = () => {
    sessionStorage.setItem(BOOT_KEY, "1");
    setLeaving(true);
    window.setTimeout(() => setDone(true), 420);
  };

  // Reveal lines one at a time, then auto-dismiss.
  useEffect(() => {
    if (!run) return;
    const typer = setInterval(
      () => setShown((s) => Math.min(s + 1, LINES.length)),
      240
    );
    const closer = setTimeout(finish, 240 * LINES.length + 700);
    return () => {
      clearInterval(typer);
      clearTimeout(closer);
    };
  }, [run]);

  // Any key or click skips the sequence.
  useEffect(() => {
    if (!run || done || leaving) return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [run, done, leaving]);

  if (!run || done) return null;

  return (
    <div
      className={`boot${leaving ? " leaving" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="boot-inner">
        {LINES.slice(0, shown).map((line) => (
          <div key={line} className="boot-line">
            {line}
          </div>
        ))}
        {shown < LINES.length && <span className="boot-cursor">▌</span>}
      </div>
      <span className="boot-skip">press any key to skip</span>

      <style jsx>{`
        .boot {
          position: fixed;
          inset: 0;
          z-index: 9997;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          animation: bootIn 0.12s ease-out;
        }
        @keyframes bootIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .boot.leaving {
          animation: bootOut 0.4s ease-in forwards;
          pointer-events: none;
        }
        @keyframes bootOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.015); }
        }
        .boot-inner {
          width: min(420px, 86vw);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 2.1;
          color: var(--cyan);
          text-shadow: 0 0 12px rgba(94, 234, 212, 0.28);
        }
        .boot-line {
          animation: bootLine 0.22s ease-out;
          white-space: nowrap;
        }
        @keyframes bootLine {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .boot-cursor {
          color: var(--orange);
          animation: bootBlink 0.9s steps(1) infinite;
        }
        @keyframes bootBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .boot-skip {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
