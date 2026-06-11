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
      "a[href], button:not([disabled])"
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
          <div className="mobile-badge-row">
            <span className="badge-open">Open to work</span>
          </div>
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
          padding: 1.2rem 2.5rem;
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
          display: none;
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
          animation: pulse-badge 2.2s ease-in-out infinite;
          z-index: 1001;
          display: none;
        }

        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .nav-toggle {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 2001;
          padding: 10px;
        }

        .bar {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--white);
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }

        .nav-overlay {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          background: rgba(12, 12, 24, 0.98);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          padding: 6rem 2rem 2rem;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0;
          pointer-events: none;
          transform: translateX(20px);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: -20px 0 40px rgba(0, 0, 0, 0.6);
        }

        .nav-overlay.is-open {
          opacity: 1;
          pointer-events: all;
          transform: translateX(0);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        .mobile-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 1rem;
          color: var(--white);
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .mobile-link:hover {
          color: var(--orange);
          transform: translateX(4px);
        }

        .mobile-badge-row {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .mobile-badge-row .badge-open {
          display: block;
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

        @media (max-width: 480px) {
          .navbar {
            padding: 1rem 1.2rem;
          }
          .nav-overlay {
            width: 100vw;
            padding: 5rem 1.5rem 2rem;
          }
        }
      `}</style>
    </header>
  );
}
