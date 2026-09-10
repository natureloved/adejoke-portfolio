"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modKey, setModKey] = useState("⌘K");

  useEffect(() => {
    document.body.dataset.menuOpen = String(isOpen);
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [isOpen]);

  // Show Ctrl on Windows/Linux. Set after mount so SSR and client agree.
  useEffect(() => {
    const isMac = /mac|iphone|ipad|ipod/i.test(navigator.userAgent ?? "");
    if (!isMac) setModKey("Ctrl K");
  }, []);

  const close = () => setIsOpen(false);

  // The palette owns its own state; a synthetic shortcut opens it without
  // threading a context or global store through the tree.
  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <header className="site-nav">
      <div className="site-grid nav-inner">
        <a className="nav-logo" href="#hero" onClick={close} aria-label="Adejoke home">
          ADEJOKE<span>.</span>
        </a>

        <nav className={`nav-links${isOpen ? " is-open" : ""}`} aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="cmd-hint"
            onClick={openPalette}
            aria-label="Open command palette"
            title="Search — jump to any section or project"
          >
            {modKey}
          </button>
          <span className="availability"><i aria-hidden="true" /> Open to work</span>
          <a className="nav-cta" href="#contact" onClick={close}>Let&apos;s talk</a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-nav {
          position: fixed;
          inset: 0 0 auto;
          z-index: 1000;
          border-bottom: 1px solid var(--border-soft);
          background: rgba(11, 14, 16, 0.84);
          backdrop-filter: blur(18px);
        }

        .nav-inner {
          min-height: 4.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .nav-logo {
          color: var(--white);
          font-family: var(--font-mono);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-decoration: none;
        }

        .nav-logo span { color: var(--lime); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.65rem;
          margin-left: auto;
        }

        .nav-links a {
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-links a:hover { color: var(--white); }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .cmd-hint {
          padding: 0.42rem 0.55rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .cmd-hint:hover {
          border-color: var(--orange);
          color: var(--orange);
        }

        .availability {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .availability i {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 0 4px rgba(94, 234, 212, 0.1);
        }

        .nav-cta {
          padding: 0.62rem 0.9rem;
          border: 1px solid var(--lime);
          color: var(--lime);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav-cta:hover { background: var(--lime); color: #101513; }

        .nav-toggle {
          display: none;
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.55rem;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
        }

        .nav-toggle span {
          display: block;
          height: 1px;
          margin: 0.32rem 0;
          background: var(--white);
          transition: transform 0.2s ease;
        }

        @media (max-width: 900px) {
          .nav-inner { min-height: 4rem; }
          .nav-toggle { display: block; }
          /* No hardware keyboard on phones — the shortcut is useless there. */
          .cmd-hint { display: none; }
          .nav-links {
            position: fixed;
            inset: 4rem 0 auto;
            display: grid;
            gap: 0;
            padding: 0.5rem 1rem 1rem;
            border-bottom: 1px solid var(--border);
            background: rgba(11, 14, 16, 0.98);
            transform: translateY(-120%);
            visibility: hidden;
            pointer-events: none;
            transition: transform 0.25s ease;
          }
          .nav-links.is-open { transform: translateY(0); visibility: visible; pointer-events: auto; }
          .nav-links a { padding: 0.95rem 0; border-bottom: 1px solid var(--border-soft); }
          .nav-links a:last-child { border-bottom: 0; }
          .nav-cta { display: none; }
        }

        @media (max-width: 560px) {
          .availability { display: none; }
        }
      `}</style>
    </header>
  );
}
