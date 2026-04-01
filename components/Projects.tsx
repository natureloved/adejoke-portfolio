"use client";

import TiltCard from "./TiltCard";

const projects = [
  {
    id: "staxiq",
    name: "Staxiq",
    badge: "Flagship Project",
    badgeType: "orange" as const,
    description:
      "The Zerion of Bitcoin L2. Staxiq is a unified DeFi aggregator and AI copilot built on the Stacks blockchain — letting users discover, compare, and manage Bitcoin DeFi protocols in one place.",
    tags: ["Stacks", "Clarity", "Next.js", "React", "DefiLlama API"],
    href: "https://staxiq.vercel.app/",
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
  },
  {
    id: "runes-rumble",
    name: "Runes Rumble",
    badge: "Hackathon · MIDL",
    badgeType: "purple" as const,
    description:
      "A prediction market for Runes — Bitcoin's newest token standard. Built for the MIDL Hackathon, Runes Rumble lets users bet on Rune price movements in a trustless environment.",
    tags: ["Bitcoin", "Runes", "Prediction Market", "On-chain"],
    href: "https://runes-rumble.vercel.app/",
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
  },
  {
    id: "ton-pilot",
    name: "TonPilot",
    badge: "HACKATHON - TON",
    badgeType: "cyan" as const,
    description:
      "An agentic wallet automation tool for the TON ecosystem. TonPilot streamlines on-chain interactions through an intelligent Telegram bot interface, focusing on security and ease of use.",
    tags: ["TON", "TypeScript", "Telegram API", "Automation"],
    href: "https://t.me/TonAutoPilotBot",
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
  },
  {
    id: "mogul",
    name: "Mogul",
    badge: "HACKATHON - BAGS",
    badgeType: "orange" as const,
    description:
      "An AI-driven dashboard for token intelligence. Mogul provides deep insights into crypto markets, social sentiment, and whale movements to give traders a strategic edge.",
    tags: ["Solana", "AI", "Next.js", "Analytics"],
    href: "https://mogul-sable.vercel.app/",
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-label reveal">02 — Projects</div>
      <h2 className="section-title reveal">What I&apos;ve Built</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <TiltCard key={project.id} className="reveal">
            <div
              className="project-card"
              style={
                {
                  "--accent-gradient": project.accentGradient,
                  "--hover-border": project.hoverBorder,
                } as React.CSSProperties
              }
            >
              {/* Top accent bar */}
              <div className="accent-bar" />

              {/* Badge */}
              <span className={`badge badge-${project.badgeType}`}>{project.badge}</span>

              {/* Name */}
              <h3 className="project-name">{project.name}</h3>

              {/* Description */}
              <p className="project-desc">{project.description}</p>

              {/* Tags */}
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{ color: project.linkColor }}
              >
                View Website <span className="link-arrow">→</span>
              </a>
            </div>
          </TiltCard>
        ))}
      </div>

      <style jsx>{`
        .projects {
          background: var(--bg);
          padding: 7rem 4rem 7rem 6rem;
        }
        .section-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.70rem;
          color: var(--orange);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 0.95;
          color: var(--white);
          margin-bottom: 4rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 1100px;
        }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          height: 100%;
        }
        .project-card:hover {
          border-color: var(--hover-border);
        }
        .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-gradient);
        }
        .badge {
          display: inline-block;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
          border: 1px solid;
          width: fit-content;
        }
        .badge-orange {
          color: var(--orange);
          border-color: var(--orange);
          background: rgba(255, 95, 31, 0.15);
        }
        .badge-purple {
          color: var(--purple);
          border-color: var(--purple);
          background: rgba(155, 89, 245, 0.15);
        }
        .badge-cyan {
          color: var(--cyan);
          border-color: var(--cyan);
          background: rgba(0, 212, 255, 0.15);
        }
        .project-name {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 2.5rem;
          color: var(--white);
          line-height: 1;
        }
        .project-desc {
          font-size: 0.92rem;
          line-height: 1.75;
          color: rgba(240, 237, 230, 0.72);
          max-width: 760px;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }
        .tag-pill {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
        }
        .project-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          transition: gap 0.2s ease;
          margin-top: 0.5rem;
        }
        .project-link:hover {
          gap: 0.8rem;
        }
        .link-arrow {
          transition: transform 0.2s ease;
        }
        .project-link:hover .link-arrow {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .projects {
            padding: 5rem 2.5rem 5rem 3.5rem;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
