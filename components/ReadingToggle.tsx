"use client";

import { useCallback, useEffect, useState } from "react";

type Reading = "plain" | "technical";

const KEY = "adejoke:reading";

/**
 * Two ways of reading the same page.
 *
 * The page is written so the default (plain) needs no knowledge of crypto
 * or web development. Technical mode reveals the architecture layer sitting
 * under each project for people who want it: same content, no second site.
 */
export default function ReadingToggle({
  variant = "compact",
}: {
  variant?: "compact" | "full";
}) {
  const [reading, setReading] = useState<Reading>("plain");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored === "plain" || stored === "technical") {
        setReading(stored);
        document.documentElement.dataset.reading = stored;
      }
    } catch {
      /* private mode: the default plain view still applies */
    }
    setReady(true);
  }, []);

  const apply = useCallback((next: Reading) => {
    setReading(next);
    document.documentElement.dataset.reading = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* nothing to do */
    }
  }, []);

  const base =
    "inline-flex items-center gap-1 border p-1 font-mono text-[13px] tracking-wide";
  const on = "bg-white/[0.10] text-ink";
  const off = "text-muted hover:text-ink";
  const box = "border-line";

  if (variant === "full") {
    return (
      <div className={`${base} ${box} bg-bg-card`} role="group" aria-label="Reading mode">
        {(["plain", "technical"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => apply(mode)}
            aria-pressed={ready && reading === mode}
            className={`min-h-[40px] px-3.5 capitalize transition-colors ${
              ready && reading === mode ? on : off
            }`}
          >
            {mode}
            <span className="sr-only"> reading mode</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => apply(reading === "plain" ? "technical" : "plain")}
      aria-label={`Switch to ${reading === "plain" ? "technical" : "plain"} reading mode`}
      className={`${base} ${box} min-h-[34px] px-2.5 text-muted transition-colors hover:text-ink`}
    >
      {reading === "plain" ? "Plain" : "Technical"}
    </button>
  );
}
