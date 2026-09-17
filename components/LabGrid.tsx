"use client";

import { useState } from "react";
import { LAB_PROJECTS } from "@/data/portfolio";

const CATEGORIES = ["All", "DeFi", "Payments", "Developer tools", "Experiments"] as const;

export default function LabGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? LAB_PROJECTS
      : LAB_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="lab" className="lab-section" aria-label="The Lab & Archive">
      <div className="site-grid">
        <div className="lab-head">
          <div>
            <p className="section-label">03 / The Lab</p>
            <h2 className="section-title">Experiments, tools & hackathon builds.</h2>
            <p className="section-intro">
              Smaller projects, protocol utilities, and exploratory code that prove technical range across decentralized ecosystems.
            </p>
          </div>

          <div className="lab-count-badge">
            <span className="count-num">{filteredProjects.length}</span>
            <span className="count-label">
              {selectedCategory === "All" ? "Archive Projects" : `${selectedCategory} Items`}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-bar">
          <div className="filter-pills" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-btn ${selectedCategory === cat ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lab Compact Cards Grid */}
        <div className="lab-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="lab-card">
              <div className="card-header">
                <h3 className="card-name">{project.name}</h3>
                <span className={`status-tag ${project.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {project.status}
                </span>
              </div>

              <p className="card-tagline">{project.tagline}</p>

              <div className="card-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="card-actions">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  Live <span aria-hidden="true">↗</span>
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link quiet"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .lab-section {
          position: relative;
          padding: 8rem 0;
          border-top: 1px solid var(--border-soft);
        }

        .lab-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        .lab-count-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
          font-family: var(--font-mono);
        }

        .count-num {
          font-size: 2.4rem;
          font-weight: 600;
          color: var(--cyan);
          line-height: 1;
        }

        .count-label {
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .filter-bar {
          margin-bottom: 2.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-soft);
        }

        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .filter-btn {
          padding: 0.45rem 0.95rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          color: var(--white);
          border-color: var(--cyan);
        }

        .filter-btn.is-active {
          border-color: var(--cyan);
          background: rgba(94, 234, 212, 0.08);
          color: var(--cyan);
        }

        .lab-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .lab-card {
          display: flex;
          flex-direction: column;
          padding: 1.6rem 1.4rem;
          background: rgba(14, 18, 22, 0.65);
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lab-card:hover {
          border-color: rgba(94, 234, 212, 0.4);
          transform: translateY(-3px);
          background: rgba(18, 24, 30, 0.85);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .card-name {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--white);
        }

        .status-tag {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          padding: 0.15rem 0.45rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .status-tag.built-and-live {
          border-color: rgba(0, 240, 118, 0.3);
          color: #00f076;
          background: rgba(0, 240, 118, 0.06);
        }

        .status-tag.hackathon-winner {
          border-color: rgba(255, 122, 69, 0.3);
          color: #ff7a45;
          background: rgba(255, 122, 69, 0.08);
        }

        .card-tagline {
          margin: 0;
          font-size: 0.84rem;
          line-height: 1.6;
          color: var(--muted);
          flex: 1;
        }

        .card-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 1.4rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-soft);
        }

        .tech-badge {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: rgba(244, 241, 234, 0.7);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.15rem 0.4rem;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          margin-top: 1.2rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
        }

        .card-link {
          color: var(--cyan);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color 0.2s ease;
        }

        .card-link:hover {
          color: var(--white);
        }

        .card-link.quiet {
          color: var(--muted);
        }

        .card-link.quiet:hover {
          color: var(--cyan);
        }

        @media (max-width: 1024px) {
          .lab-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .lab-head {
            flex-direction: column;
            align-items: flex-start;
          }
          .lab-count-badge {
            align-items: flex-start;
          }
          .lab-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
