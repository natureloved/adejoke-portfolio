"use client";

import { featuredProjects } from "@/data/projects";

const previewProjects = featuredProjects.slice(0, 3);

export default function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="site-grid hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker reveal">Lagos, Nigeria / Full-stack and multi-chain developer</p>
          <h1 className="hero-title reveal">
            Akinola <span>Adejoke</span>
          </h1>
          <p className="hero-lede reveal">
            I design and build useful digital products across Bitcoin, EVM, and emerging ecosystems, from smart contracts and APIs to interfaces people can actually use.
          </p>
          <div className="hero-actions reveal">
            <a className="button button-primary" href="#work">Explore the work</a>
            <a className="button button-quiet" href="/resume.pdf" target="_blank" rel="noopener noreferrer">View resume</a>
          </div>
          <div className="hero-meta reveal">
            <span>Currently building with Clarity, Solidity, Cairo, and Next.js</span>
            <span>Available for selected collaborations</span>
          </div>
        </div>

        <div className="hero-panel reveal" aria-label="Selected project preview">
          <div className="panel-topline">
            <span>Selected work</span>
            <span>03 / 12</span>
          </div>
          <div className="panel-list">
            {previewProjects.map((project, index) => (
              <a key={project.id} className="panel-item" href={project.href} target="_blank" rel="noopener noreferrer">
                <span className="panel-index">0{index + 1}</span>
                <span className="panel-item-copy">
                  <strong>{project.name}</strong>
                  <small>{project.categories[0]} / {project.tags.slice(0, 2).join(" / ")}</small>
                </span>
                <span className="panel-link">View</span>
              </a>
            ))}
          </div>
          <div className="panel-note">
            <span className="panel-dot" aria-hidden="true" />
            Shipping from idea to working product
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: 8rem;
          padding-bottom: 5rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.7fr);
          align-items: end;
          gap: clamp(3rem, 8vw, 9rem);
        }

        .hero-copy { max-width: 760px; }

        .hero-kicker {
          margin-bottom: 1.5rem;
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .hero-title {
          max-width: 800px;
          margin: 0;
          color: var(--white);
          font-size: clamp(4.2rem, 10vw, 9.5rem);
          font-weight: 650;
          letter-spacing: -0.075em;
          line-height: 0.87;
        }

        .hero-title span { color: var(--lime); }

        .hero-lede {
          max-width: 610px;
          margin: 2rem 0 0;
          color: var(--muted);
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 2rem;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.85rem;
          padding: 0.7rem 1rem;
          border: 1px solid transparent;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .button:hover { transform: translateY(-2px); }
        .button-primary { background: var(--lime); color: #111713; }
        .button-primary:hover { background: var(--white); }
        .button-quiet { border-color: var(--border); color: var(--white); }
        .button-quiet:hover { border-color: var(--white); }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem 1.5rem;
          margin-top: 2.3rem;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.03em;
          line-height: 1.6;
        }

        .hero-meta span + span { color: var(--cyan); }

        .hero-panel {
          align-self: end;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: rgba(18, 23, 26, 0.72);
        }

        .panel-topline,
        .panel-note {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .panel-topline { border-bottom: 1px solid var(--border-soft); }
        .panel-list { display: grid; }

        .panel-item {
          display: grid;
          grid-template-columns: 2rem minmax(0, 1fr) auto;
          align-items: center;
          gap: 0.7rem;
          padding: 1.1rem 1rem;
          border-bottom: 1px solid var(--border-soft);
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .panel-item:hover { background: rgba(217, 249, 157, 0.06); }
        .panel-index { color: var(--orange); font-family: var(--font-mono); font-size: 0.65rem; }
        .panel-item-copy { min-width: 0; display: grid; gap: 0.3rem; }
        .panel-item-copy strong { color: var(--white); font-size: 0.98rem; font-weight: 600; }
        .panel-item-copy small { overflow: hidden; color: var(--muted); font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.04em; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
        .panel-link { color: var(--cyan); font-family: var(--font-mono); font-size: 0.62rem; text-transform: uppercase; }
        .panel-note { justify-content: flex-start; gap: 0.55rem; border-top: 1px solid var(--border-soft); color: var(--cyan); text-transform: none; }
        .panel-dot { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 4px rgba(94, 234, 212, 0.1); }

        @media (max-width: 900px) {
          .hero { min-height: auto; padding-top: 8rem; }
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
          .hero-panel { max-width: 620px; }
        }

        @media (max-width: 560px) {
          .hero-title { font-size: clamp(3.6rem, 18vw, 6rem); }
          .hero-actions { display: grid; grid-template-columns: 1fr 1fr; }
          .button { width: 100%; }
          .hero-meta { display: grid; }
        }
      `}</style>
    </section>
  );
}
