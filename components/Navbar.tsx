"use client";

import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    menu.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleKey);
    first?.focus();
    return () => {
      menu.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <header className={`navbar ${isOpen ? "is-open" : ""}`}>
      <a href="#hero" className="navbar-logo" aria-label="Home" onClick={closeMenu}>
        ADEJOKE
      </a>
      <span className="badge-open">Open to work</span>

      <nav className="navbar-links" aria-label="Main navigation">
        {[
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
          { label: "Skills", href: "#skills" },
          { label: "Programs", href: "#programs" },
          { label: "Contact", href: "#contact" },
        ].map((link) => (
          <a key={link.label} href={link.href} className="navbar-link">
            {link.label}
          </a>
        ))}
      </nav>

      <button
        ref={toggleRef}
        className={`nav-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <div
        id="mobile-nav"
        ref={menuRef}
        className={`nav-overlay ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="mobile-nav" role="menu">
          {[
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Skills", href: "#skills" },
            { label: "Programs", href: "#programs" },
            { label: "Contact", href: "#contact" },
          ].map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-link"
              style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
              onClick={closeMenu}
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 4rem 1.4rem 5rem;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(6, 6, 12, 0.75);
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease;
        }

        .navbar-logo {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          background: linear-gradient(90deg, var(--orange), var(--purple), var(--cyan));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 5s ease infinite;
          z-index: 1001;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .navbar-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
        }

        .navbar-link::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--orange);
          transition: width 0.25s ease;
        }

        .navbar-link:hover {
          color: var(--white);
        }

        .navbar-link:hover::after {
          width: 100%;
        }

        .badge-open {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cyan);
          border: 1px solid rgba(0, 212, 255, 0.35);
          background: rgba(0, 212, 255, 0.08);
          padding: 0.45rem 0.9rem;
          border-radius: 3px;
          display: none;
          animation: pulse-badge 2.2s ease-in-out infinite;
          z-index: 1001;
        }

        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 1024px) {
          .badge-open { display: block; }
        }

        @media (max-width: 900px) {
          .navbar {
            padding: 1rem 1.2rem 1rem 1.4rem;
          }

          .navbar-links {
            display: none;
          }

          .nav-toggle {
            display: flex;
          }

          .nav-toggle.active .bar:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }
          .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
          }
          .nav-toggle.active .bar:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
          }
        }
      `}</style>
    </header>
  );
}
