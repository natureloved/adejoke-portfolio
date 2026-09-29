"use client";

import { useEffect, useState } from "react";

const KEY = "adejoke:reading";

/**
 * Plain by default, with a technical layer available on demand. The two modes
 * swap which paragraphs are visible rather than navigating anywhere, so a
 * recruiter and a protocol engineer can read the same page in the register
 * that suits them.
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

  return (
    <div className="reading-switch" role="group" aria-label="Reading mode">
      <button
        type="button"
        aria-pressed={mode === "plain"}
        onClick={() => choose("plain")}
        className={compact ? "text-[13px]" : undefined}
      >
        Plain
      </button>
      <button
        type="button"
        aria-pressed={mode === "technical"}
        onClick={() => choose("technical")}
        className={compact ? "text-[13px]" : undefined}
      >
        Technical
      </button>
    </div>
  );
}
