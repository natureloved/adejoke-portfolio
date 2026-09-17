"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Builder", href: "#builder" },
  { label: "Lab", href: "#lab" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`navbar-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-grid navbar-inner">
        {/* Brand */}
        <a href="#hero" className="nav-brand" onClick={closeMenu} aria-label="Adejoke portfolio home">
          Adejoke<span className="brand-dot">.</span>
        </a>

        {/* Minimal Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-item">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Status Indicator */}
        <div className="nav-right">
          <div className="status-indicator" title="Currently accepting contract and collaboration work">
            <span className="status-pulse" aria-hidden="true" />
            <span className="status-text">Available for selected projects</span>
          </div>

          <a href="#contact" className="nav-cta">
            Let’s talk
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`mobile-toggle ${isOpen ? "is-active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="toggle-bar" />
            <span className="toggle-bar" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="mobile-nav-item" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <div className="mobile-status">
            <span className="status-pulse" aria-hidden="true" />
            <span>Available for selected projects</span>
          </div>
          <a href="#contact" className="btn-mobile-talk" onClick={closeMenu}>
            Let’s talk →
          </a>
        </div>
      </div>

      <style jsx>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          background: rgba(11, 14, 16, 0.72);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .navbar-header.is-scrolled {
          background: rgba(11, 14, 16, 0.92);
          border-bottom-color: var(--border-soft);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 4.25rem;
          gap: 1.5rem;
        }

        .nav-brand {
          font-family: var(--font-mono);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--white);
          text-decoration: none;
        }

        .brand-dot {
          color: var(--lime);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .nav-item {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-item:hover {
          color: var(--white);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.4rem 0.8rem;
          border: 1px solid rgba(0, 240, 118, 0.25);
          background: rgba(0, 240, 118, 0.06);
          border-radius: 999px;
        }

        .status-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00f076;
          box-shadow: 0 0 8px #00f076;
          animation: pulseGreen 2s infinite ease-in-out;
        }

        @keyframes pulseGreen {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.6;
          }
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #00f076;
          white-space: nowrap;
        }

        .nav-cta {
          padding: 0.55rem 0.95rem;
          border: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--white);
          transition: all 0.2s ease;
        }

        .nav-cta:hover {
          border-color: var(--lime);
          color: var(--lime);
          background: rgba(217, 249, 157, 0.08);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          width: 2.4rem;
          height: 2.4rem;
          padding: 0.4rem;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
        }

        .toggle-bar {
          display: block;
          width: 100%;
          height: 1.5px;
          background: var(--white);
          transition: transform 0.25s ease;
        }

        .mobile-toggle.is-active .toggle-bar:first-child {
          transform: translateY(3.5px) rotate(45deg);
        }

        .mobile-toggle.is-active .toggle-bar:last-child {
          transform: translateY(-4px) rotate(-45deg);
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .status-text {
            display: none;
          }

          .status-indicator {
            padding: 0.45rem;
          }

          .mobile-menu {
            display: block;
            position: fixed;
            top: 4.25rem;
            left: 0;
            right: 0;
            border-bottom: 1px solid var(--border);
            background: rgba(11, 14, 16, 0.98);
            backdrop-filter: blur(18px);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .mobile-menu.is-open {
            max-height: 28rem;
          }

          .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
            padding: 1.5rem 1.75rem;
          }

          .mobile-nav-item {
            font-family: var(--font-mono);
            font-size: 0.95rem;
            color: var(--white);
            text-decoration: none;
          }

          .mobile-status {
            display: flex;
            align-items: center;
            gap: 0.55rem;
            margin-top: 0.5rem;
            font-family: var(--font-mono);
            font-size: 0.68rem;
            color: #00f076;
          }

          .btn-mobile-talk {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 1rem;
            margin-top: 0.5rem;
            background: var(--lime);
            color: #0b0e10;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            text-transform: uppercase;
            text-decoration: none;
          }
        }
      `}</style>
    </header>
  );
}
