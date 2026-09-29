"use client";

import { useMemo, useState } from "react";
import { LAB, LAB_CATEGORIES, type LabCategory } from "@/data/work";
import { Section, SectionHead } from "./ui";

export default function Lab() {
  const [filter, setFilter] = useState<LabCategory>("All");

  const shown = useMemo(
    () => (filter === "All" ? LAB : LAB.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <Section id="lab">
      <SectionHead
        id="lab"
        eyebrow="More builds"
        title="Fifteen more things, with a link on each."
        lede="Smaller builds, experiments and hackathon entries. Each one has a live demo or readable source, and where only source exists, that is what is shown."
      />

      <div className="mb-7 flex flex-wrap items-center gap-2" role="group" aria-label="Filter builds by type">
        {LAB_CATEGORIES.map((category) => {
          const isOn = filter === category;
          const count =
            category === "All" ? LAB.length : LAB.filter((i) => i.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={isOn}
              className={`inline-flex min-h-[40px] items-center gap-2 border px-3.5 text-[15px] transition-colors ${
                isOn
                  ? "border-lime bg-lime/10 text-ink"
                  : "border-line text-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              {category}
              <span className="font-mono text-[13px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((item) => (
          <li key={item.id} className="flex flex-col gap-2 bg-bg px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{item.name}</h3>
              <span className="font-mono text-[13px] text-muted">
                {item.note ? `${item.note} · ${item.year}` : `${item.category} · ${item.year}`}
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-muted">{item.tagline}</p>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Stack">
              {item.stack.map((tech) => (
                <li
                  key={tech}
                  className="border border-line-soft px-2 py-1 font-mono text-[13px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-0.5 flex flex-wrap gap-4">
              {item.live ? (
                <a
                  href={item.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-[15px] text-teal underline decoration-teal/40 underline-offset-4 transition-colors hover:decoration-teal"
                >
                  Live demo
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              {item.repo ? (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                >
                  Source
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {shown.length === 0 ? (
        <p className="border border-line-soft p-8 text-center text-muted">Nothing in that category.</p>
      ) : null}
    </Section>
  );
}
