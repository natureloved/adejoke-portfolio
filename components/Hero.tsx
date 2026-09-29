import { HERO_PROOF, ONE_LINER, POSITIONING, SITE, WHAT_I_DO } from "@/lib/site";
import ReadingToggle from "./ReadingToggle";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* A single static glow. The previous build animated a full-canvas
          constellation field behind every section; this is deliberately quiet
          so nothing competes with the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[min(1100px,120vw)] -translate-x-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,138,101,0.10) 0%, rgba(94,234,212,0.05) 38%, transparent 68%)",
        }}
      />

      <div className="wrap relative pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="flex flex-col gap-8">
          {/* Availability */}
          <p className="inline-flex w-fit items-center gap-2.5 border border-line bg-bg-card px-3.5 py-2 font-mono text-[13px] uppercase tracking-[0.1em] text-teal">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {SITE.availability}
          </p>

          {/* The name is context. The sentence is the headline: it comes
              first in size, which is the whole point: a visitor should
              understand the work before they read anything else. */}
          <div className="flex flex-col gap-5">
            <p className="font-mono text-[15px] uppercase tracking-[0.18em] text-muted">
              {SITE.name} · {SITE.location}
            </p>
            <h1
              id="hero-heading"
              className="max-w-[19ch] text-[clamp(2.35rem,7.2vw,4.6rem)] font-semibold leading-[1.02] text-ink"
            >
              I build software that{" "}
              <span className="text-amber">moves money</span> and{" "}
              <span className="text-teal">saves people work.</span>
            </h1>
            <p className="max-w-[54ch] text-[clamp(1.0625rem,2.1vw,1.3125rem)] leading-[1.55] text-ink/90">
              {ONE_LINER}
            </p>
          </div>

          {/* Two ways of reading, stated rather than hidden. */}
          <div className="flex flex-col gap-4 border-l-2 border-line pl-5 sm:pl-6">
            <p data-plain className="max-w-[62ch] text-[17px] leading-[1.7] text-muted">
              {POSITIONING.plain}
            </p>
            <p
              data-tech
              className="max-w-[62ch] font-mono text-[15px] leading-[1.7] text-muted"
            >
              {POSITIONING.technical}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <ReadingToggle variant="full" />
              <span data-plain className="text-[15px] text-muted">
                Technical terms are explained in the glossary.
              </span>
              <span data-tech className="text-[15px] text-muted">
                Showing the full engineering position.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary">
              <span>See the work</span>
              <span aria-hidden="true" className="opacity-70">
                ↓
              </span>
            </a>
            <a href="#contact" className="btn btn-quiet">
              <span>Start a conversation</span>
            </a>
            <a
              href={SITE.resume}
              download
              className="inline-flex min-h-[48px] items-center px-1 text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              Résumé (PDF)
            </a>
          </div>

          {/* Hard numbers, up front. These are the only claims on the page
              that don't need a click to check. */}
          <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-line-soft pt-7 sm:grid-cols-3">
            {HERO_PROOF.map((item) => (
              <div key={item.label} className="flex flex-col">
                {/* The label is the term and the value is its definition, so
                    the reading order matches what is on screen. */}
                <dt className="order-2 mt-2 text-[15px] leading-snug text-muted">
                  {item.label}
                </dt>
                <dd className="order-1 flex flex-col">
                  <span className="block text-[clamp(1.6rem,3.4vw,2.1rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                    {item.value}
                  </span>
                </dd>
                <dd className="order-3 mt-0.5 text-[13px] leading-snug text-muted/70">
                  {item.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The three questions a visitor actually arrived with. These are
            parallel capabilities rather than a sequence, so they are not
            numbered: 01/02/03 would imply an order that does not exist. */}
        <ul className="mt-12 grid gap-px border border-line-soft bg-line-soft sm:mt-14 sm:grid-cols-3">
          {WHAT_I_DO.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 bg-bg p-5">
              <span aria-hidden="true" className="h-1 w-8 bg-amber" />
              <h2 className="text-[17px] font-semibold leading-snug text-ink">{item.title}</h2>
              <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
