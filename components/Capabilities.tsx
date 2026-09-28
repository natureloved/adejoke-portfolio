import { GLOSSARY, PROCESS, WHAT_I_DO } from "@/lib/site";
import { Gloss, Section, SectionHead } from "./ui";

export default function Capabilities() {
  return (
    <Section id="capabilities">
      <SectionHead
        id="capabilities"
        eyebrow="What I do"
        title="Three kinds of problem I keep being handed."
        lede="Not a skills list. These are the shapes of work that recur, and what I actually do about each."
      />

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {WHAT_I_DO.map((item, i) => (
          <div key={item.title} className="flex flex-col gap-3">
            <span className="font-mono text-[13px] text-amber">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[19px] font-semibold leading-snug text-ink">{item.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      {/* ── Glossary ──
          The previous build hid every one of these behind a hover
          tooltip, which is invisible on a phone. This is a tap-to-open
          panel instead: reachable by keyboard, readable on a
          touchscreen, and closed by default so it does not become a wall
          of text before the reader reaches the work. */}
      <details className="group mt-12 border border-line-soft">
        <summary className="flex min-h-[60px] cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-bg-raise">
          <span className="flex flex-col gap-1">
            <span className="text-[17px] font-semibold text-ink">
              New to this? {GLOSSARY.length} terms, in plain English.
            </span>
            <span className="text-[15px] text-muted">
              Every piece of jargon used on this page, explained.
            </span>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[13px] uppercase tracking-[0.14em] text-teal transition-transform group-open:rotate-180"
          >
            Open ↓
          </span>
        </summary>
        <dl className="grid border-t border-line-soft sm:grid-cols-2 sm:gap-x-10">
          {GLOSSARY.map((entry) => (
            <div
              key={entry.term}
              className="flex flex-col gap-1.5 border-b border-line-soft px-6 py-4 sm:[&:nth-last-child(2)]:border-b-0"
            >
              <dt>
                <Gloss id={`term-${entry.term.toLowerCase().replace(/\s+/g, "-")}`}>
                  {entry.term}
                </Gloss>
              </dt>
              <dd className="text-[15px] leading-relaxed text-muted">{entry.def}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div id="process" className="mt-16 scroll-mt-28 border-t border-line-soft pt-12">
        <p className="eyebrow">How I work</p>
        <h2 id="process-heading" className="max-w-[24ch] text-[clamp(1.4rem,2.8vw,1.9rem)] font-semibold text-ink">
          The order I do things in.
        </h2>
        <p className="lede">
          Most projects here were built in 48–72 hours in a hackathon, or alone in a few
          weeks. This is the shape they all take.
        </p>

        <ol className="mt-8 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <li key={step.step} className="flex flex-col gap-3 bg-bg p-5">
              <span className="font-mono text-[13px] text-teal">{step.step}</span>
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
