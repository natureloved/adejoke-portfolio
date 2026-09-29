"use client";

import { useState } from "react";
import { LAB } from "@/data/work";
import { Eyebrow, Icon, SectionTitle } from "./ui";

const FILTERS = ["All", "Product", "Protocol", "Agent", "Tooling"] as const;

export default function Lab() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = LAB.filter((l) => filter === "All" || l.category === filter);

  return (
    <section className="section container" id="lab" aria-labelledby="labHeading">
      <div className="section-heading">
        <div>
          <Eyebrow>04 The lab</Eyebrow>
          <SectionTitle id="labHeading">
            Things I built <em>to learn.</em>
          </SectionTitle>
          <p className="section-description">
            Smaller experiments, each one solving a question I could not answer any other way.
            Most are hackathon entries and weekend builds.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter lab projects">
          {FILTERS.map((f) => {
            const count = f === "All" ? LAB.length : LAB.filter((l) => l.category === f).length;
            return (
              <button
                key={f}
                type="button"
                className={`filter-btn${filter === f ? " is-active" : ""}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} of {LAB.length} lab projects.
      </p>

      <div className="projects-grid">
        {shown.map((l) => (
          <article className="project-card" key={l.id}>
            <div className="project-tags" style={{ marginBottom: 14 }}>
              <span>{l.category}</span>
              <span>{l.year}</span>
              {l.note ? <span>{l.note}</span> : null}
            </div>
            <h3 className="project-title">
              {l.repo ? (
                <a href={l.repo} target="_blank" rel="noopener noreferrer">
                  {l.name}
                  <span className="project-arrow" aria-hidden="true">
                    <Icon name="i-code" />
                  </span>
                </a>
              ) : (
                l.name
              )}
            </h3>
            <p className="project-description">{l.tagline}</p>
            <div className="project-tags">
              {l.stack.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
