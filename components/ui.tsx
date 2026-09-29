import type { ReactNode } from "react";

/**
 * A term the reader may not know. Rendered with a dotted underline and, when
 * the definition is shown, as the anchor a reader can jump to in the
 * glossary. Deliberately not a hover tooltip: those do not exist on a
 * touchscreen, and most people reading a portfolio are on a phone.
 */
export function Gloss({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <span id={id} className="border-b border-dashed border-teal/60 text-ink">
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  aside,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={`${id}-heading`} className="h2">
          {title}
        </h2>
        {lede ? <div className="lede">{lede}</div> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

export function LinkOut({
  href,
  children,
  variant = "quiet",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "quiet";
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-quiet"}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : { download: href.endsWith(".pdf") || undefined })}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="opacity-60">
        {external ? "↗" : "↓"}
      </span>
    </a>
  );
}
