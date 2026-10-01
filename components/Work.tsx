"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FLAGSHIPS, type Flagship } from "@/data/work";
import { Eyebrow, Icon, SectionTitle } from "./ui";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "Protocol", label: "Protocol" },
  { key: "Product", label: "Product" },
  { key: "Agent", label: "Agents" },
] as const;

function CaseDialog({
  project,
  onClose,
}: {
  project: Flagship | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const lastId = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
  }, [project]);

  // Return focus to the card that was opened, but only after a real open then
  // close. Running this on mount would grab focus from the header and make the
  // page unreachable by keyboard.
  useEffect(() => {
    if (project) {
      lastId.current = project.id;
      return;
    }
    if (!lastId.current) return;
    const id = lastId.current;
    lastId.current = null;
    document.querySelector<HTMLElement>(`[data-case-opener="${id}"]`)?.focus();
  }, [project]);

  return (
    <dialog ref={ref} className="modal case-modal" onClose={onClose} aria-labelledby="case-title">
      {project ? (
        <>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="Close case study">
            <Icon name="i-plus" />
          </button>

          <div className="case-header">
            <Eyebrow>
              {project.number} {project.role}
            </Eyebrow>
            <h2 className="case-title" id="case-title">
              {project.name}
            </h2>
            <p className="case-subtitle">{project.headline}</p>
          </div>

          <Image
            className="case-shot"
            src={project.shot.src}
            alt={project.shot.alt}
            width={1200}
            height={750}
            sizes="(max-width: 850px) 100vw, 810px"
          />

          <div className="case-main">
            <p className="case-lead">{project.problem}</p>

            <div className="case-layout">
              <div className="case-story">
                <h3>What it actually does</h3>
                <ul className="delivery-list">
                  {project.does.map((d) => (
                    <li key={d}>
                      <Icon name="i-check" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {project.tech.how.length > 0 ? (
                  <>
                    <h3>How it is built</h3>
                    {project.tech.how.slice(0, 2).map((h) => (
                      <p key={h.title}>
                        <strong>{h.title}.</strong> {h.body}
                      </p>
                    ))}
                  </>
                ) : null}

                {project.tech.hard.length > 0 ? (
                  <>
                    {/* Authored per project and otherwise dropped: these are the
                        parts a reader cannot see in a screenshot, which is the
                        evidence the rest of the page promises. */}
                    <h3>What was hard about it</h3>
                    <ul className="delivery-list case-hard">
                      {project.tech.hard.map((h) => (
                        <li key={h}>
                          <Icon name="i-sparkle" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              <aside className="case-facts">
                <dl>
                  <dt>Context</dt>
                  <dd>{project.context}</dd>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                  {project.proof.map((p) => (
                    <div key={p.label}>
                      <dt>{p.label}</dt>
                      <dd>{p.value}</dd>
                    </div>
                  ))}
                  <dt>Stack</dt>
                  <dd>
                    <div className="project-tags">
                      {project.tech.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </dd>
                </dl>
              </aside>
            </div>

            <div className="case-footer">
              <p>
                {project.links.live && project.links.repo
                  ? "Live and open source."
                  : project.links.repo
                    ? "Source only."
                    : "Live deployment."}
              </p>
              <div className="hero-actions" style={{ margin: 0 }}>
                {project.links.live ? (
                  <a className="btn" href={project.links.live} target="_blank" rel="noopener noreferrer">
                    {project.links.liveLabel ?? "Open the live site"}
                    <Icon name="i-arrow-up-right" />
                  </a>
                ) : null}
                {project.links.repo ? (
                  <a className="btn btn-outline" href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    Read the source
                    <Icon name="i-code" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<string>("all");
  const [openCase, setOpenCase] = useState<Flagship | null>(null);

  const shown = FLAGSHIPS.filter((p) => filter === "all" || p.category === filter);

  const open = useCallback((p: Flagship) => setOpenCase(p), []);
  const close = useCallback(() => setOpenCase(null), []);

  return (
    <section className="section container" id="work" aria-labelledby="workHeading">
      <div className="section-heading">
        <div>
          <Eyebrow>01 Selected work</Eyebrow>
          <SectionTitle id="workHeading">
            Less talk. <em>More building.</em>
          </SectionTitle>
          <p className="section-description">
            Four builds, and what each one is actually for. Every one has a live demo or a
            repository you can read.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${filter === f.key ? " is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key === "all" ? <span className="filter-count">{FLAGSHIPS.length}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} of {FLAGSHIPS.length} projects.
      </p>

      <div className="projects-grid">
        {shown.map((p) => (
          <article className="project-card" key={p.id}>
            <button
              type="button"
              className="project-media"
              onClick={() => open(p)}
              aria-label={`Read the ${p.name} case study`}
            >
              <Image
                src={p.shot.src}
                alt={p.shot.alt}
                width={1200}
                height={750}
                sizes="(max-width: 600px) 100vw, (max-width: 780px) 50vw, 380px"
              />
              <span className="media-hint">
                Read the case study
                <Icon name="i-arrow-up-right" />
              </span>
            </button>

            <div className="project-meta">
              <span>{p.role}</span>
              <span>
                {p.number} / {FLAGSHIPS.length.toString().padStart(2, "0")}
              </span>
            </div>

            <h3 className="project-title">
              <button type="button" onClick={() => open(p)} data-case-opener={p.id}>
                {p.name}
                <span className="project-arrow" aria-hidden="true">
                  <Icon name="i-arrow-up-right" />
                </span>
              </button>
            </h3>

            <p className="project-description">{p.headline} {p.does[0]}</p>

            <div className="project-tags">
              {p.tech.stack.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="work-bottom">
        <span>Smaller builds and experiments are in the lab below.</span>
        <a className="text-link" href="#lab">
          Browse the lab
          <Icon name="i-arrow-up-right" />
        </a>
      </div>

      <CaseDialog project={openCase} onClose={close} />
    </section>
  );
}
