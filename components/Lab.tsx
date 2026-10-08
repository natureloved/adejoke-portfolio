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
          <article className="project-card" key={l.id} data-live={l.live ? "true" : "false"}>
            {/*
              Status dot, in the top-right corner rather than inline with the
              tags. The old layout put a year chip here, but all entries read
              "2026", so the chip carried no information while taking a slot.
              A live/source dot says the one thing a visitor scans for: does
              this one open?
            */}
            <span className="project-status" title={l.live ? "Live demo" : "Source only"}>
              <span className="status-dot" aria-hidden="true" />
              <span className="project-status-text">{l.live ? "Live" : "Source only"}</span>
            </span>

            <h3 className="project-title">{l.name}</h3>
            <p className="project-description">{l.tagline}</p>
            <div className="project-tags">
              {l.note ? <span>{l.note}</span> : null}
              {l.stack.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            {/*
              Actions in a footer row, with both links spelled out. Previously
              the only click target was a bare </> icon between the title and
              the description, which interrupted the reading flow and gave no
              clue where it went.

              The live demo is normally the primary link, but not every entry
              has a deployment to point at: SatsLoom runs against a local
              signet Lightning node and has no public URL. Where there is no
              demo, the repository takes the primary slot rather than leaving
              the card with only a secondary action.
            */}
            <div className="project-actions">
              {l.live ? (
                <a
                  className="project-action project-action-primary"
                  href={l.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="i-arrow-up-right" />
                  Live
                </a>
              ) : null}
              {l.repo ? (
                <a
                  className={`project-action${l.live ? "" : " project-action-primary"}`}
                  href={l.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="i-github" />
                  Source
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
