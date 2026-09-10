"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { chainColor } from "@/data/chains";

const EMAIL = "akinolaa769@gmail.com";

type Group = "Jump to" | "Projects" | "Actions";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: Group;
  color?: string;
  run: () => void;
};

// Matches the section ids currently rendered by app/page.tsx.
const REGIONS: { id: string; label: string; hint: string }[] = [
  { id: "hero", label: "Top", hint: "hero" },
  { id: "about", label: "About", hint: "bio" },
  { id: "work", label: "The Work", hint: "projects" },
  { id: "stack", label: "Stack", hint: "skills" },
  { id: "journey", label: "Journey", hint: "programs" },
  { id: "contact", label: "Contact", hint: "get in touch" },
];

const GROUP_ORDER: Group[] = ["Jump to", "Projects", "Actions"];

/** Cheap subsequence match — "dfv" finds "deadman vault". */
function fuzzy(needle: string, haystack: string): boolean {
  if (!needle) return true;
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  if (h.includes(n)) return true;
  let i = 0;
  for (const ch of h) {
    if (ch === n[i]) i++;
    if (i === n.length) return true;
  }
  return false;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const [lagos, setLagos] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context) — fall back to the mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  const items = useMemo<Item[]>(() => {
    const jump: Item[] = REGIONS.map((r) => ({
      id: `jump-${r.id}`,
      label: r.label,
      hint: r.hint,
      group: "Jump to",
      color: "var(--cyan)",
      run: () => go(r.id),
    }));

    const work: Item[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.name,
      hint: p.badge.split(" · ")[0] || p.categories[0],
      group: "Projects",
      color: chainColor(p.chain),
      run: () => window.open(p.href, "_blank", "noopener,noreferrer"),
    }));

    const acts: Item[] = [
      {
        id: "act-email",
        label: "Copy email address",
        hint: EMAIL,
        group: "Actions",
        color: "var(--orange)",
        run: copyEmail,
      },
      {
        id: "act-resume",
        label: "Download resume",
        hint: "pdf",
        group: "Actions",
        color: "var(--purple)",
        run: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
      },
      {
        id: "act-github",
        label: "Open GitHub",
        hint: "natureloved",
        group: "Actions",
        color: "var(--white)",
        run: () =>
          window.open("https://github.com/natureloved", "_blank", "noopener,noreferrer"),
      },
      {
        id: "act-x",
        label: "Open X / Twitter",
        hint: "@adejoke_btc",
        group: "Actions",
        color: "var(--white)",
        run: () => window.open("https://x.com/adejoke_btc", "_blank", "noopener,noreferrer"),
      },
      {
        id: "act-linkedin",
        label: "Open LinkedIn",
        hint: "profile",
        group: "Actions",
        color: "var(--cyan)",
        run: () =>
          window.open(
            "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
            "_blank",
            "noopener,noreferrer"
          ),
      },
    ];

    return [...jump, ...work, ...acts];
  }, [go, copyEmail]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return items.filter((it) => fuzzy(q, `${it.label} ${it.hint} ${it.group}`));
  }, [items, query]);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((g) => ({
      group: g,
      rows: filtered.filter((it) => it.group === g),
    })).filter((g) => g.rows.length > 0);
  }, [filtered]);

  // Flat list keeps keyboard nav simple while rendering stays grouped.
  const flat = useMemo(() => grouped.flatMap((g) => g.rows), [grouped]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const activate = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      close();
      // Let the overlay unmount before scroll/anchor work starts.
      window.setTimeout(() => item.run(), 10);
    },
    [close]
  );

  // Global open shortcut: Cmd/Ctrl+K, or "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset + autofocus whenever the palette opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCursor(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  // Live Lagos time in the footer — updates while the palette is open.
  useEffect(() => {
    if (!open) return;
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setLagos(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [open]);

  // Keep the highlighted row in view during keyboard nav.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(".cmd-item.is-active");
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor, open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown" || (e.key === "n" && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (flat.length === 0 ? 0 : (c + 1) % flat.length));
      return;
    }
    if (e.key === "ArrowUp" || (e.key === "p" && e.ctrlKey)) {
      e.preventDefault();
      setCursor((c) => (flat.length === 0 ? 0 : (c - 1 + flat.length) % flat.length));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      activate(flat[cursor]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-scrim" onMouseDown={close}>
      <div
        className="cmd-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmd-input-row">
          <span className="cmd-caret" aria-hidden="true">
            ❯
          </span>
          <input
            ref={inputRef}
            className="cmd-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Jump to a section, open a project, copy my email…"
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmd-kbd">esc</kbd>
        </div>

        <div className="cmd-list" ref={listRef}>
          {flat.length === 0 && (
            <div className="cmd-empty">no matches for “{query}”</div>
          )}

          {grouped.map((g) => (
            <div key={g.group} className="cmd-group">
              <div className="cmd-group-label">{g.group}</div>
              {g.rows.map((item) => {
                const index = flat.indexOf(item);
                const active = index === cursor;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`cmd-item${active ? " is-active" : ""}`}
                    onMouseEnter={() => setCursor(index)}
                    onClick={() => activate(item)}
                  >
                    <span
                      className="cmd-dot"
                      style={{ background: item.color }}
                      aria-hidden="true"
                    />
                    <span className="cmd-label">{item.label}</span>
                    <span className="cmd-hint">{item.hint}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmd-footer">
          <span className="cmd-foot-left">
            {copied ? (
              <span className="cmd-copied">✓ email copied</span>
            ) : (
              <>
                <kbd className="cmd-kbd">↑</kbd>
                <kbd className="cmd-kbd">↓</kbd>
                <span>to navigate</span>
                <kbd className="cmd-kbd">↵</kbd>
                <span>to select</span>
              </>
            )}
          </span>
          <span className="cmd-foot-right">
            <span className="cmd-live" aria-hidden="true" />
            LAGOS {lagos ?? "--:--"} · OPEN TO WORK
          </span>
        </div>
      </div>

      <style jsx>{`
        .cmd-scrim {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(4, 4, 10, 0.62);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 14vh 1.2rem 2rem;
          animation: cmdFade 0.16s ease-out;
        }

        @keyframes cmdFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cmd-panel {
          width: min(620px, 100%);
          background: rgba(16, 16, 28, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7),
            0 0 60px rgba(255, 138, 101, 0.07);
          animation: cmdPop 0.2s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          max-height: 68vh;
        }

        @keyframes cmdPop {
          from { opacity: 0; transform: translateY(-10px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cmd-input-row {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 1rem 1.1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .cmd-caret {
          color: var(--orange);
          font-size: 0.8rem;
          font-family: var(--font-mono);
        }

        .cmd-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: var(--white);
          font-family: var(--font-sans);
          font-size: 0.95rem;
        }

        .cmd-input::placeholder {
          color: rgba(139, 139, 163, 0.7);
        }

        .cmd-list {
          overflow-y: auto;
          padding: 0.5rem 0;
          flex: 1;
        }

        .cmd-group-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--muted);
          padding: 0.8rem 1.15rem 0.45rem;
        }

        .cmd-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          background: none;
          border: none;
          border-left: 2px solid transparent;
          padding: 0.6rem 1.15rem;
          cursor: pointer;
          text-align: left;
          color: var(--white);
          transition: background 0.12s ease;
        }

        .cmd-item.is-active {
          background: rgba(255, 138, 101, 0.09);
          border-left-color: var(--orange);
        }

        .cmd-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cmd-label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cmd-hint {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          flex-shrink: 0;
          max-width: 45%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cmd-empty {
          padding: 2rem 1.15rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--muted);
        }

        .cmd-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.65rem 1.15rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          flex-shrink: 0;
        }

        .cmd-foot-left,
        .cmd-foot-right {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }

        .cmd-kbd {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 3px;
          padding: 0.1rem 0.35rem;
          color: var(--muted);
          background: rgba(255, 255, 255, 0.04);
        }

        .cmd-copied {
          color: var(--cyan);
        }

        .cmd-live {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #27c93f;
          box-shadow: 0 0 8px #27c93f;
          animation: cmdPulse 2s ease-in-out infinite;
        }

        @keyframes cmdPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @media (max-width: 600px) {
          .cmd-scrim { padding: 8vh 0.8rem 1rem; }
          .cmd-hint { display: none; }
          .cmd-foot-left { display: none; }
          .cmd-footer { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
