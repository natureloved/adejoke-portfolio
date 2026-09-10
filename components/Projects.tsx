"use client";

import { useMemo, useState } from "react";
import { archivedProjects, featuredProjects, type Project } from "@/data/projects";
import { CHAINS } from "@/data/chains";
import { useConstellation } from "@/lib/constellation-context";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { setActive } = useConstellation();

  return (
    <article
      className="project-row reveal"
      onMouseEnter={() => setActive(project.chain)}
      onMouseLeave={() => setActive(null)}
    >
      <div className="project-visual" style={{ "--project-accent": project.linkColor } as React.CSSProperties} aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{project.name.slice(0, 2).toUpperCase()}</strong>
        <small>{project.categories[0]}</small>
      </div>
      <div className="project-content">
        <div className="project-topline">
          <span className={`project-badge badge-${project.badgeType}`}>{project.badge}</span>
          <span className="project-chain">{project.chain}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          <a href={project.href} target="_blank" rel="noopener noreferrer">Live project</a>
          {project.repo ? <a href={project.repo} target="_blank" rel="noopener noreferrer">Source code</a> : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsTemplate() {
  const [filter, setFilter] = useState("All");
  const [showArchive, setShowArchive] = useState(false);

  const filters = ["All", ...CHAINS.map((chain) => chain.id)];
  const visibleProjects = useMemo(() => {
    const source = showArchive ? [...featuredProjects, ...archivedProjects] : featuredProjects;
    return source.filter((project) => filter === "All" || project.chain === filter);
  }, [filter, showArchive]);

  return (
    <section id="work" className="section work-section">
      <div className="site-grid">
        <p className="section-label reveal">02 / Work</p>
        <div className="work-heading">
          <div>
            <h2 className="section-title reveal">A portfolio of useful things.</h2>
            <p className="section-intro reveal">Selected products across DeFi, developer tools, creator infrastructure, and the systems around them.</p>
          </div>
          <div className="work-count reveal"><strong>12</strong><span>shipped products</span></div>
        </div>

        <div className="work-toolbar reveal" aria-label="Filter projects by chain">
          <div className="filter-list">
            {filters.map((item) => (
              <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
                {item === "All" ? item : CHAINS.find((chain) => chain.id === item)?.name ?? item}
              </button>
            ))}
          </div>
          <button type="button" className="archive-button" onClick={() => setShowArchive((open) => !open)} aria-expanded={showArchive}>
            {showArchive ? "Show featured" : `Show all ${featuredProjects.length + archivedProjects.length}`}
          </button>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}
        </div>
        {visibleProjects.length === 0 ? <p className="empty-state">No projects are tagged to this chain yet.</p> : null}
      </div>

      <style jsx>{`
        .work-section { border-top: 1px solid var(--border-soft); }
        .work-heading { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 2rem; }
        .work-count { display: grid; gap: 0.25rem; padding-bottom: 0.3rem; color: var(--muted); font-family: var(--font-mono); text-align: right; text-transform: uppercase; }
        .work-count strong { color: var(--lime); font-size: 2.8rem; font-weight: 500; letter-spacing: -0.06em; line-height: 1; }
        .work-count span { font-size: 0.62rem; letter-spacing: 0.08em; }
        .work-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-block: 0.9rem; border-block: 1px solid var(--border); }
        .filter-list { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .filter-list button, .archive-button { padding: 0.45rem 0.65rem; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-family: var(--font-mono); font-size: 0.61rem; letter-spacing: 0.06em; text-transform: uppercase; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .filter-list button:hover, .filter-list button.active { border-color: var(--lime); color: var(--lime); background: rgba(217, 249, 157, 0.06); }
        .archive-button { border-color: var(--cyan); color: var(--cyan); white-space: nowrap; }
        .archive-button:hover { background: rgba(94, 234, 212, 0.08); }
        .project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin-top: 3rem; border: 1px solid var(--border); background: var(--border); }
        .project-row { min-width: 0; display: grid; grid-template-columns: 7.5rem minmax(0, 1fr); gap: 1.4rem; padding: 1.4rem; background: var(--bg); transition: background 0.2s ease; }
        .project-row:hover { background: var(--surface); }
        .project-visual { display: flex; min-height: 9rem; flex-direction: column; justify-content: space-between; padding: 0.75rem; border: 1px solid var(--border); background: var(--surface); }
        .project-row:hover .project-visual { border-color: var(--project-accent, var(--lime)); }
        .project-visual span, .project-visual small { color: var(--muted); font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .project-visual strong { color: var(--project-accent, var(--lime)); font-size: 2.5rem; font-weight: 600; letter-spacing: -0.08em; }
        .project-content { min-width: 0; display: flex; flex-direction: column; }
        .project-topline { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
        .project-badge, .project-chain { color: var(--muted); font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.06em; text-transform: uppercase; }
        .badge-orange { color: var(--orange); }
        .badge-purple { color: var(--purple); }
        .badge-cyan { color: var(--cyan); }
        .project-chain { color: var(--cyan); }
        .project-content h3 { margin: 0.7rem 0 0; color: var(--white); font-size: 1.35rem; font-weight: 600; letter-spacing: -0.03em; }
        .project-content p { display: -webkit-box; overflow: hidden; margin: 0.65rem 0 0; color: var(--muted); font-size: 0.83rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 1rem; }
        .project-tags span { padding: 0.28rem 0.45rem; border: 1px solid var(--border-soft); color: var(--muted); font-family: var(--font-mono); font-size: 0.56rem; letter-spacing: 0.04em; text-transform: uppercase; }
        .project-links { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: auto; padding-top: 1.2rem; }
        .project-links a { color: var(--white); font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.06em; text-decoration: underline; text-decoration-color: var(--cyan); text-underline-offset: 0.25rem; text-transform: uppercase; }
        .project-links a:hover { color: var(--lime); }
        .empty-state { margin-top: 2rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.75rem; }
        @media (max-width: 980px) { .project-grid { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .work-heading { grid-template-columns: 1fr; } .work-count { display: flex; align-items: baseline; gap: 0.55rem; text-align: left; } .work-count strong { font-size: 2rem; } .work-toolbar { align-items: flex-start; flex-direction: column; } }
        @media (max-width: 520px) { .project-row { grid-template-columns: 1fr; } .project-visual { min-height: 7rem; } .project-visual strong { font-size: 2.2rem; } }
      `}</style>
    </section>
  );
}
