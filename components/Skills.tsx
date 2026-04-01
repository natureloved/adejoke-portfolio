"use client";

const skillsData = [
  { id: "Clarity", category: "smart-contract", level: "Expert", color: "var(--orange)" },
  { id: "Solidity", category: "smart-contract", level: "Expert", color: "var(--orange)" },
  { id: "Cairo", category: "smart-contract", level: "Advanced", color: "var(--orange)" },
  { id: "Next.js", category: "frontend", level: "Expert", color: "var(--purple)" },
  { id: "React", category: "frontend", level: "Expert", color: "var(--purple)" },
  { id: "TypeScript", category: "frontend", level: "Advanced", color: "var(--purple)" },
  { id: "Stacks", category: "blockchain", level: "Expert", color: "var(--cyan)" },
  { id: "StarkNet", category: "blockchain", level: "Advanced", color: "var(--cyan)" },
  { id: "EVM", category: "blockchain", level: "Expert", color: "var(--cyan)" },
  { id: "Tailwind", category: "frontend", level: "Expert", color: "var(--purple)" },
  { id: "Node.js", category: "tools", level: "Advanced", color: "var(--cyan)" },
  { id: "Git/Github", category: "tools", level: "Expert", color: "var(--cyan)" },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-label reveal">03 — Skills</div>
      <h2 className="section-title reveal">
        My <span className="gradient-text">Stack</span>
      </h2>

      <div className="skills-grid reveal">
        {skillsData.map((skill, index) => (
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
            </div>

            {/* Corner Deco */}
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
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
        }

        .skill-card {
          position: relative;
          height: 140px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          padding: 1.8rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .card-glass {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card-scanline {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
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
        .skill-card:hover .card-scanline {
          transform: translateY(200%);
        }

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

        .skill-card:hover .skill-id {
          color: var(--accent);
        }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        /* Decoration Corners */
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
          .skills-section {
            padding: 6rem 3rem;
          }
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }
          .skill-id { font-size: 1.8rem; }
        }

        @media (max-width: 480px) {
          .skills-section { padding: 4rem 1.5rem; }
          .section-title { font-size: 3rem; }
        }
      `}</style>
    </section>
  );
}
