"use client";

import { useEffect, useRef, useState } from "react";

const skillsData = [
  { id: "Clarity",    category: "smart-contract", level: "Expert",   color: "var(--orange)", pct: 92, logo: "CL" },
  { id: "Solidity",   category: "smart-contract", level: "Expert",   color: "var(--orange)", pct: 92, logo: "ETH" },
  { id: "Cairo",      category: "smart-contract", level: "Advanced", color: "var(--orange)", pct: 75, logo: "CR" },
  { id: "Next.js",    category: "frontend",       level: "Expert",   color: "var(--purple)", pct: 95, logo: "NX" },
  { id: "React",      category: "frontend",       level: "Expert",   color: "var(--purple)", pct: 95, logo: "RE" },
  { id: "TypeScript", category: "frontend",       level: "Advanced", color: "var(--purple)", pct: 78, logo: "TS" },
  { id: "Stacks",     category: "blockchain",     level: "Expert",   color: "var(--cyan)",   pct: 90, logo: "STX" },
  { id: "StarkNet",   category: "blockchain",     level: "Advanced", color: "var(--cyan)",   pct: 72, logo: "SN" },
  { id: "EVM",        category: "blockchain",     level: "Expert",   color: "var(--cyan)",   pct: 88, logo: "EVM" },
  { id: "Tailwind",   category: "frontend",       level: "Expert",   color: "var(--purple)", pct: 93, logo: "TW" },
  { id: "Node.js",    category: "tools",          level: "Advanced", color: "var(--cyan)",   pct: 76, logo: "NO" },
  { id: "Git/Github", category: "tools",          level: "Expert",   color: "var(--cyan)",   pct: 95, logo: "GH" },
];

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="section-label reveal">03 — Skills</div>
      <h2 className="section-title reveal">
        My <span className="gradient-text">Stack</span>
      </h2>

      <div className="skills-grid reveal" ref={gridRef}>
        {skillsData.map((skill, idx) => (
          <div
            key={skill.id}
            className="skill-card"
            style={{ "--accent": skill.color } as React.CSSProperties}
          >
            <div className="card-glass" />
            <div className="card-scanline" />

            <div className="skill-content">
              <div className="skill-id">{skill.id}</div>
              <div className="skill-meta">
                <span className="skill-cat">{skill.category}</span>
                <span className="skill-level">{skill.level}</span>
              </div>
              <div className="skill-logo">{skill.logo}</div>
            </div>

            {/* Animated proficiency bar */}
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: animated ? `${skill.pct}%` : "0%",
                  background: skill.color,
                  transition: `width 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 55}ms`,
                }}
              />
            </div>

            {/* Percentage label — appears with the bar */}
            <div
              className="bar-pct"
              style={{
                opacity: animated ? 1 : 0,
                transition: `opacity 0.4s ease ${idx * 55 + 600}ms`,
                color: skill.color,
              }}
            >
              {skill.pct}%
            </div>

            {/* Corner decorations */}
            <div className="corner corner-tl" />
            <div className="corner corner-br" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .skills-section {
          background: var(--bg);
          padding: 8rem 6rem;
          position: relative;
          overflow: hidden;
        }

        .section-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          color: var(--orange);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(3.5rem, 8vw, 7rem);
          line-height: 0.9;
          color: var(--white);
          margin-bottom: 5rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.2rem;
          max-width: 1200px;
        }

        .skill-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          padding: 1.2rem 1.2rem 2rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card-scanline {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05), transparent);
          transition: transform 0.6s ease;
          pointer-events: none;
        }

        .skill-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5),
                      0 0 15px -5px var(--accent);
        }

        .skill-card:hover .card-glass { opacity: 1; }
        .skill-card:hover .card-scanline { transform: translateY(200%); }

        .skill-content {
          position: relative;
          z-index: 2;
        }

        .skill-id {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 2.2rem;
          color: var(--white);
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }

        .skill-card:hover .skill-id { color: var(--accent); }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.9rem;
        }

        .skill-cat {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .skill-level {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.6rem;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 0.1rem 0.4rem;
          border-radius: 2px;
          opacity: 0.8;
        }

        .skill-logo {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.7;
          margin-top: 0.25rem;
        }

        /* ── Proficiency bar ── */
        .bar-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
        }

        .bar-fill {
          height: 100%;
          border-radius: 1px;
        }

        .bar-pct {
          position: absolute;
          bottom: 6px;
          right: 10px;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.58rem;
          letter-spacing: 0.04em;
          z-index: 2;
        }

        /* Corner decorations */
        .corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid var(--accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .corner-tl { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
        .corner-br { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }
        .skill-card:hover .corner { opacity: 1; }

        @media (max-width: 900px) {
          .skills-section { padding: 5rem 1.5rem 5rem 2rem; }
          .skills-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.8rem; }
          .skill-id { font-size: 1.6rem; }
          .skill-card { padding: 0.9rem 0.9rem 1.6rem; }
          .bar-pct { right: 6px; bottom: 4px; font-size: 0.52rem; }
        }

        @media (max-width: 480px) {
          .skills-section { padding: 4rem 1rem 4rem 1.2rem; }
          .section-title { font-size: 2.6rem; margin-bottom: 3rem; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
          .skill-id { font-size: 1.4rem; }
        }
      `}</style>
    </section>
  );
}
