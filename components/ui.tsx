/** A design-system icon. Referenced by id from the inline sprite. */
export function Icon({
  name,
  className = "",
  label,
}: {
  name: string;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      // Without a viewBox the 24-unit path is stretched into whatever box CSS
      // gives this element, so a 17px icon and a 34px icon draw the same arrow
      // at different scales and the small one loses its arrowhead. Every
      // PATH in IconSprite.tsx is authored on this grid.
      viewBox="0 0 24 24"
    >
      <use href={`#${name}`} />
    </svg>
  );
}

export function Eyebrow({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${className}`.trim()} id={id}>
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={`section-title ${className}`.trim()}>
      {children}
    </h2>
  );
}

/**
 * A term the reader may not know. Renders as a dotted-underlined link into the
 * glossary accordion, which is reachable by keyboard and by touch. The previous
 * build hid definitions behind a hover tooltip, which does not exist on a
 * phone.
 */
export function Gloss({ children, term }: { children: React.ReactNode; term: string }) {
  return (
    <a className="glossary-link" href={`#faq-${term.toLowerCase().replace(/\s+/g, "-")}`}>
      {children}
    </a>
  );
}
