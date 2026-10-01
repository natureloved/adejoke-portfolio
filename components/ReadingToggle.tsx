"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui";

const KEY = "adejoke:reading";

/**
 * Plain by default, with a technical layer available on demand. The two modes
 * swap which paragraphs are visible rather than navigating anywhere, so a
 * recruiter and a protocol engineer can read the same page in the register
 * that suits them.
 *
 * `compact` is the header copy. It keeps the same accessible names, and at
 * narrow widths the words are hidden by CSS (`.header-reading` in globals.css)
 * in favour of the glyph rendered here, so the six nav labels stay in the
 * header instead of being pushed off it. The glyph is always in the DOM and
 * only visually swapped by the media query, which means the button works
 * before the stylesheet resolves.
 */
export default function ReadingToggle({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<"plain" | "technical">("plain");

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    const initial: "plain" | "technical" = stored === "technical" ? "technical" : "plain";
    setMode(initial);
    document.documentElement.dataset.reading = initial;
  }, []);

  const choose = (next: "plain" | "technical") => {
    setMode(next);
    document.documentElement.dataset.reading = next;
    window.localStorage.setItem(KEY, next);
  };

  const button = (value: "Plain" | "Technical", glyph: string) => (
    <button
      type="button"
      aria-pressed={mode === value.toLowerCase()}
      onClick={() => choose(value.toLowerCase() as "plain" | "technical")}
      className={compact ? "text-[13px]" : undefined}
    >
      <span className="reading-glyph" aria-hidden="true">
        <Icon name={glyph} />
      </span>
      <span className="reading-label">{value}</span>
    </button>
  );

  return (
    <div className="reading-switch" role="group" aria-label="Reading mode">
      {button("Plain", "i-message")}
      {button("Technical", "i-code")}
    </div>
  );
}
