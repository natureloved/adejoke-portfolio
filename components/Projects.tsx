"use client";

import { useMemo, useState } from "react";
import {
  archivedProjects,
  featuredProjects,
  projects,
  type Project,
} from "@/data/projects";
import { CHAINS } from "@/data/chains";
import { useConstellation } from "@/lib/constellation-context";
import { ProjectThumbnail } from "@/components/ProjectVisuals";

/**
 * Domain groupings. The old chain filter was a trap: every chain owns exactly
 * one project, so eight chips each returned a single card. These overlap the
 * way the work actually does, and every project maps to at least one.
 */
const DOMAINS: Record<string, string[]> = {
  voz: ["DeFi", "AI"],
  hashpilot: ["AI"],
  stashflow: ["DeFi"],
  staxiq: ["DeFi", "AI", "Bitcoin L2"],
  "runes-rumble": ["DeFi", "Bitcoin L2"],
  "ton-pilot": ["AI", "Tools"],
  tipwall: ["Tools"],
  "deadman-vault": ["DeFi", "Bitcoin L2"],
  clarityquest: ["Bitcoin L2", "Tools"],
  "proof-of-rest": ["DeFi", "AI"],
  expatship: ["Tools"],
  tasky: ["Tools", "AI"],
};

const FILTERS = ["All", "DeFi", "AI", "Bitcoin L2", "Tools"];

const chainName = (id: string) =>
  CHAINS.find((chain) => chain.id === id)?.name ?? id;

const chainTint = (id: string) =>
  CHAINS.find((chain) => chain.id === id)?.color ?? "var(--lime)";

function RowLinks({ project }: { project: Project }) {
  return (
    <div className="row-links">
      <a href={project.href} target="_blank" rel="noopener noreferrer">
        View live <span aria-hidden="true">↗</span>
      </a>
      {project.repo ? (
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          Source <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}

function FeaturedRow({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const { setActive } = useConstellation();

  return (
    <article
      className={`project-card featured-row${flip ? " flip" : ""}`}
      style={
        {
          // Tinted by chain, not by palette token — so each project reads as
          // a node of the constellation it belongs to.
          "--row-accent": chainTint(project.chain),
          animationDelay: `${Math.min(index, 5) * 70}ms`,
        } as React.CSSProperties
      }
      onMouseEnter={() => setActive(project.chain)}
      onMouseLeave={() => setActive(null)}
    >
      <div className="featured-visual">
        <ProjectThumbnail id={project.id} color={chainTint(project.chain)} />
      </div>

      <div className="featured-body">
        <div className="row-head">
          <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="row-badge" style={{ color: chainTint(project.chain) }}>
            {project.badge}
          </span>
        </div>

        <h3>{project.name}</h3>
        <p>{project.description}</p>

        <div className="row-tags">
          <span className="row-chain" style={{ color: chainTint(project.chain) }}>
            {chainName(project.chain)}
          </span>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <RowLinks project={project} />
      </div>
    </article>
  );
}

function ArchiveCard({ project, index }: { project: Project; index: number }) {
  const { setActive } = useConstellation();

  return (
    <article
      className="project-card archive-card"
      style={
        {
          "--row-accent": chainTint(project.chain),
          animationDelay: `${index * 55}ms`,
        } as React.CSSProperties
      }
      onMouseEnter={() => setActive(project.chain)}
      onMouseLeave={() => setActive(null)}
    >
      <div className="archive-visual">
        <ProjectThumbnail id={project.id} color={chainTint(project.chain)} />
      </div>
      <div className="archive-body">
        <div className="archive-top">
          <h4>{project.name}</h4>
          <span className="archive-chain" style={{ color: chainTint(project.chain) }}>
            {chainName(project.chain)}
          </span>
        </div>
        <p>{project.description}</p>
        <RowLinks project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showArchive, setShowArchive] = useState(false);

  const isFiltered = filter !== "All";

  const matches = (project: Project) =>
    !isFiltered || (DOMAINS[project.id] ?? []).includes(filter);

  // Unfiltered: the curated six as rows, the rest behind the drawer.
  // Filtered: everything that matches, so nothing hides in the archive.
  const rows = useMemo(
    () => (isFiltered ? projects.filter(matches) : featuredProjects),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  const archived = useMemo(
    () => archivedProjects.filter(matches),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  const shownCount = isFiltered ? rows.length : projects.length;

  return (
    <section id="work" className="section work-section">
      <div className="site-grid">
        <p className="section-label reveal">02 / Work</p>

        <div className="work-head">
          <div>
            <h2 className="section-title reveal">A portfolio of useful things.</h2>
            <p className="section-intro reveal">
              Selected products across DeFi, developer tools, creator
              infrastructure, and the systems around them.
            </p>
          </div>
          <div className="work-count reveal">
            <strong>{shownCount}</strong>
            <span>{isFiltered ? `${filter} products` : "shipped products"}</span>
          </div>
        </div>

        <div className="work-filters reveal" aria-label="Filter projects by domain">
          <div className="filter-list">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="filter-note">
            {isFiltered ? `${rows.length} of ${projects.length} shown` : "Curated selection"}
          </span>
        </div>

        <div className="featured-list">
          {rows.map((project, index) => (
            <FeaturedRow
              key={project.id}
              project={project}
              index={index}
              flip={index % 2 === 1}
            />
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="empty-state">Nothing is tagged to this domain yet.</p>
        ) : null}

        {!isFiltered ? (
          <>
            <button
              type="button"
              className="archive-toggle"
              onClick={() => setShowArchive((open) => !open)}
              aria-expanded={showArchive}
              aria-controls="project-archive"
            >
              <span className="archive-line" aria-hidden="true" />
              {showArchive ? "Hide the archive" : `The archive — ${archived.length} more`}
              <span className="archive-line" aria-hidden="true" />
              <span className={`archive-caret${showArchive ? " up" : ""}`} aria-hidden="true">
                ↓
              </span>
            </button>

            <div
              id="project-archive"
              className={`archive-panel${showArchive ? " open" : ""}`}
            >
              <div className="archive-inner">
                <div className="archive-grid">
                  {archived.map((project, index) => (
                    <ArchiveCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {/* Global, not scoped: styled-jsx only stamps its scope class onto
          elements rendered by THIS component. The rows live in child
          components, so a scoped block silently dropped every row style —
          which is exactly why this section used to render unstyled. */}
      <style jsx global>{`
        .work-section { border-top: 1px solid var(--border-soft); }

        /* ── Header ── */
        .work-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: end;
          gap: 2rem;
        }
        .work-count {
          display: grid;
          gap: 0.3rem;
          padding-bottom: 0.35rem;
          color: var(--muted);
          font-family: var(--font-mono);
          text-align: right;
          text-transform: uppercase;
        }
        .work-count strong {
          color: var(--lime);
          font-size: 2.8rem;
          font-weight: 500;
          letter-spacing: -0.06em;
          line-height: 1;
        }
        .work-count span { font-size: 0.62rem; letter-spacing: 0.08em; }

        /* ── Filters ── */
        .work-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-top: 3rem;
          padding-block: 0.85rem;
          border-block: 1px solid var(--border);
        }
        .filter-list { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .filter-list button {
          padding: 0.45rem 0.8rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .filter-list button:hover { color: var(--white); border-color: var(--border); }
        .filter-list button.active {
          border-color: var(--lime);
          color: var(--lime);
          background: rgba(217, 249, 157, 0.07);
        }
        .filter-note {
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Featured rows ── */
        .featured-list { display: grid; gap: 1.4rem; margin-top: 3rem; }

        .featured-row {
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr);
          border: 1px solid var(--border);
          background: var(--surface);
          overflow: hidden;
          animation: rowInUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: border-color 0.3s ease;
        }
        .featured-row:hover { border-color: var(--row-accent, var(--lime)); }
        .featured-row.flip .featured-visual { order: 2; }

        .featured-visual {
          position: relative;
          min-height: 300px;
          border-right: 1px solid var(--border);
        }
        .featured-row.flip .featured-visual {
          border-right: 0;
          border-left: 1px solid var(--border);
        }

        .featured-body {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 2.1rem 2.3rem;
        }

        .row-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .row-index {
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.24em;
        }
        .row-badge {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: right;
        }

        .featured-body h3 {
          margin: 1.1rem 0 0;
          color: var(--white);
          font-size: clamp(1.6rem, 2.6vw, 2.25rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.05;
        }
        .featured-body p {
          margin: 0.95rem 0 0;
          max-width: 48ch;
          color: var(--muted);
          font-size: 0.87rem;
          line-height: 1.72;
        }

        .row-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1.4rem; }
        .row-tags span {
          padding: 0.3rem 0.5rem;
          border: 1px solid var(--border-soft);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.56rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .row-tags .row-chain { border-color: currentColor; }

        .row-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: auto;
          padding-top: 1.7rem;
        }
        .row-links a {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid var(--border);
          color: var(--white);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.09em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .row-links a:hover { color: var(--lime); border-color: var(--lime); }

        /* ── Archive ── */
        .archive-toggle {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          margin-top: 3.5rem;
          padding: 1.3rem 0;
          border: 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: transparent;
          color: var(--cyan);
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .archive-toggle:hover { color: var(--white); }
        .archive-line { flex: 0 0 38px; height: 1px; background: var(--border); }
        .archive-caret {
          margin-left: auto;
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }
        .archive-caret.up { transform: rotate(180deg); }

        .archive-panel {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
          transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .archive-panel.open { grid-template-rows: 1fr; }
        .archive-inner { min-height: 0; }

        .archive-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
          padding-top: 2rem;
        }
        .archive-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          background: var(--surface);
          overflow: hidden;
          animation: rowInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: border-color 0.3s ease;
        }
        .archive-card:hover { border-color: var(--row-accent, var(--cyan)); }
        .archive-visual { height: 150px; border-bottom: 1px solid var(--border); }
        .archive-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 1.1rem 1.2rem 1.3rem;
        }
        .archive-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.6rem;
        }
        .archive-body h4 {
          margin: 0;
          color: var(--white);
          font-size: 1.02rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .archive-chain {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .archive-body p {
          display: -webkit-box;
          overflow: hidden;
          margin: 0.6rem 0 0;
          color: var(--muted);
          font-size: 0.75rem;
          line-height: 1.62;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .archive-body .row-links { gap: 1rem; padding-top: 1.2rem; }
        .archive-body .row-links a { font-size: 0.6rem; }

        .empty-state {
          margin-top: 2rem;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }

        @keyframes rowInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .featured-row,
          .featured-row.flip { grid-template-columns: 1fr; }
          .featured-row.flip .featured-visual { order: 0; }
          .featured-visual,
          .featured-row.flip .featured-visual {
            min-height: 230px;
            border-right: 0;
            border-left: 0;
            border-bottom: 1px solid var(--border);
          }
          .archive-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 620px) {
          .work-head { grid-template-columns: 1fr; }
          .work-count { text-align: left; }
          .work-count strong { font-size: 2.1rem; }
          .work-filters { align-items: flex-start; flex-direction: column; }
          .featured-body { padding: 1.5rem 1.3rem; }
          .featured-visual { min-height: 190px; }
          .archive-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
