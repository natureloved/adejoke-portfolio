"use client";

import { useState } from "react";
import Image from "next/image";
import { FLAGSHIPS, type Flagship } from "@/data/work";
import { Section, SectionHead } from "./ui";

function FlagshipCard({ project }: { project: Flagship }) {
  const [open, setOpen] = useState(false);
  const panelId = `${project.id}-tech`;

  return (
    <article
      className="group relative border-t border-line pt-8 first:border-t-0 first:pt-0 sm:pt-10"
      style={{ ["--accent" as string]: project.accent }}
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[13px]">
        <span className="font-semibold tracking-[0.12em]" style={{ color: project.accent }}>
          {project.number}
        </span>
        <span className="uppercase tracking-[0.12em] text-muted">{project.context}</span>
        <span aria-hidden="true" className="text-line">
          ·
        </span>
        <span className="uppercase tracking-[0.12em] text-muted">{project.year}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12">
        {/* ── Text column ── */}
        <div className="flex flex-col">
          <h3 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold text-ink">
            {project.name}
          </h3>

          {/* The one line that matters, at a size that survives a five-second skim. */}
          <p className="mt-3 text-[clamp(1.0625rem,1.9vw,1.25rem)] font-medium leading-snug text-ink/90">
            {project.headline}
          </p>

          <div className="mt-5 flex flex-col gap-3.5">
            {/* The problem is the reason to care, so it is set as a
                pull-quote in near-body size rather than buried as body
                copy. The previous build gave it the same weight as
                everything else on the card. */}
            <blockquote
              className="border-l-2 pl-4 text-[17px] leading-[1.6] text-ink/85"
              style={{ borderColor: project.accent }}
            >
              {project.problem}
            </blockquote>

            <div>
              <h4 className="font-mono text-[13px] uppercase tracking-[0.14em] text-teal">
                What it does
              </h4>
              <ul className="mt-2.5 flex flex-col gap-2">
                {project.does.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0" style={{ background: project.accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Evidence */}
          <dl className="mt-6 grid grid-cols-1 gap-px border border-line-soft bg-line-soft sm:grid-cols-3">
            {project.proof.map((p) => (
              <div key={p.label} className="bg-bg p-3.5">
                <dd className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {p.value}
                </dd>
                <dt className="mt-1.5 text-[13px] leading-snug text-muted">{p.label}</dt>
              </div>
            ))}
          </dl>

          {/* Stack — one line, no ceremony */}
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology used">
            {project.tech.stack.map((tech) => (
              <li
                key={tech}
                className="border border-line-soft px-2 py-1 font-mono text-[13px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>{project.links.liveLabel ?? "Open it"}</span>
                <span aria-hidden="true" className="opacity-70">
                  ↗
                </span>
              </a>
            ) : null}
            {project.links.repo ? (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-1.5 px-1 text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
              >
                Source
                <span aria-hidden="true" className="opacity-60">
                  ↗
                </span>
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex min-h-[48px] items-center gap-1.5 px-1 text-[15px] text-teal underline decoration-teal/40 underline-offset-4 transition-colors hover:decoration-teal"
            >
              {open ? "Hide build details" : "How it is built"}
              <span
                aria-hidden="true"
                className={open ? "rotate-180 transition-transform" : "transition-transform"}
              >
                ↓
              </span>
            </button>
          </div>
        </div>

        {/* ── Screenshot column ──
            A real capture of the running product, replacing the previous
            build's four hand-drawn mockups with invented figures. */}
        <figure className="flex flex-col gap-3 lg:pt-2">
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden border border-line bg-bg-raise no-underline transition-colors hover:border-ink/40"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={project.shot.src}
              alt=""
              width={1200}
              height={750}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="text-[13px] leading-relaxed text-muted">
            {project.shot.alt} {project.shot.caption}
          </figcaption>
        </figure>
      </div>

      {/* ── Build details ──
          Collapsed by default. The previous build left all four case
          studies fully expanded, which made 983 words in the work section
          an unwall of equal-weight text. */}
      <div id={panelId} hidden={!open} className="mt-9 border-l-2 pl-6" style={{ borderColor: project.accent }}>
        <h4 className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
          How it is built
        </h4>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {project.tech.how.map((item) => (
            <div key={item.title}>
              <h5 className="text-[15px] font-semibold text-ink">{item.title}</h5>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <h4 className="mt-7 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
          The hard parts
        </h4>
        <ul className="mt-3 flex flex-col gap-2">
          {project.tech.hard.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
              <span aria-hidden="true" className="mt-[10px] h-px w-3 shrink-0" style={{ background: project.accent }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-7 font-mono text-[13px] text-muted">
          {project.role} · {project.year}
        </p>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <SectionHead
        id="work"
        eyebrow="Selected work"
        title="Four builds, and what each one is actually for."
        lede={
          <>
            Every one of these is live and open source. Start with the sentence under
            each name — that is the whole idea — and only open the build details if you
            want the engineering.
          </>
        }
      />

      <div className="flex flex-col gap-10 sm:gap-14">
        {FLAGSHIPS.map((project) => (
          <FlagshipCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
