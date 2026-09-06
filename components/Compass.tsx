"use client";

import { useEffect } from "react";
import { useConstellation } from "@/lib/constellation-context";

const REGIONS = [
  { id: "hero", label: "Enter" },
  { id: "origin", label: "Origin" },
  { id: "work", label: "The Work" },
  { id: "stack", label: "Stack" },
  { id: "guilds", label: "Guilds" },
  { id: "notes", label: "Field Notes" },
  { id: "signal", label: "Signal" },
];

export default function Compass() {
  // Region lives in shared state so the constellation field can re-tint
  // itself as the reader travels through the universe.
  const { region: active, setRegion } = useConstellation();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRegion(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    REGIONS.forEach((r) => {
      const el = document.getElementById(r.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [setRegion]);

  const progress = ((REGIONS.findIndex((r) => r.id === active) + 1) / REGIONS.length) * 100;

  return (
    <nav className="compass" aria-label="Section progress">
      <span className="compass-label">JOURNEY</span>
      {REGIONS.map((r) => (
        <a
          key={r.id}
          href={`#${r.id}`}
          className={`compass-dot ${active === r.id ? "on" : ""}`}
        >
          <i />
          {r.label}
        </a>
      ))}
      <span className="compass-rail" aria-hidden>
        <span className="compass-fill" style={{ height: `${progress}%` }} />
      </span>

      <style jsx>{`
        .compass {
          position: fixed;
          right: 2.2vw;
          top: 50%;
          transform: translateY(-50%);
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          align-items: flex-end;
        }
        .compass-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          color: var(--muted);
          margin-bottom: 0.3rem;
        }
        .compass-dot {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.62rem;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .compass-dot i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: block;
          flex: none;
          transition: all 0.3s ease;
        }
        .compass-dot.on { color: var(--white); }
        .compass-dot.on i {
          background: var(--cyan);
          border-color: var(--cyan);
          box-shadow: 0 0 10px var(--cyan);
        }
        .compass-rail {
          position: absolute;
          right: 3px;
          top: 2.2rem;
          bottom: 0;
          width: 1px;
          background: var(--border);
        }
        .compass-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(var(--orange), var(--cyan));
          transition: height 0.4s ease;
        }
        @media (max-width: 1100px) {
          .compass { display: none; }
        }
      `}</style>
    </nav>
  );
}
