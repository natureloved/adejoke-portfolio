import { SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft py-12">
      <div className="wrap flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[17px] font-semibold text-ink">{SITE.name}</p>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-muted">
            Full-stack and protocol engineer. {SITE.location}. Currently taking on product
            and engineering work.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href={SITE.x}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            X / Twitter
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-[40px] items-center text-[15px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            {SITE.email}
          </a>
        </nav>
      </div>

      <div className="wrap mt-10 flex flex-col gap-3 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[13px] text-muted">
          © {year} {SITE.name}. Built and deployed, not templated.
        </p>
        <a
          href="#top"
          className="inline-flex min-h-[40px] w-fit items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-ink"
        >
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
