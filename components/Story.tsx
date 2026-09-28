import { STORY } from "@/lib/site";
import { Section, SectionHead } from "./ui";

export default function Story() {
  return (
    <Section id="story">
      <SectionHead
        id="story"
        eyebrow="Background"
        title="I got here by a route nobody planned."
        lede={STORY.lead}
      />

      <ol className="grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
        {STORY.chapters.map((chapter, i) => (
          <li key={chapter.period} className="flex flex-col gap-3 bg-bg p-6">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-[13px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-amber">
                {chapter.period}
              </span>
            </div>
            <h3 className="text-[17px] font-semibold leading-snug text-ink">{chapter.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{chapter.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-10 max-w-[58ch] border-l-2 border-amber pl-6 text-[clamp(1.0625rem,1.9vw,1.25rem)] font-medium leading-[1.55] text-ink/90">
        {STORY.closing}
      </p>
    </Section>
  );
}
