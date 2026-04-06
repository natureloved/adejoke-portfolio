"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Programs", href: "#programs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className={`navbar ${isMounted ? "is-visible" : "is-hidden"} ${isOpen ? "is-open" : ""}`}>
      {/* Logo */}
      <Link href="#hero" className="navbar-logo" onClick={() => setIsOpen(false)}>
        ADEJOKE
      </Link>

      {/* Nav Links - Desktop */}
      <nav className="navbar-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="navbar-link">
            {link.label}
          </a>
        ))}
      </nav>

      {/* Hamburger - Mobile Only */}
      <button 
        className={`nav-toggle ${isOpen ? "active" : ""}`} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`nav-overlay ${isOpen ? "is-open" : ""}`}>
        <nav className="mobile-nav">
          {navLinks.map((link, idx) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="mobile-link"
              style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
              onClick={() => setIsOpen(false)}
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
          background: linear-gradient(
            90deg,
            var(--orange),
            var(--purple),
            var(--cyan)
          );
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

        /* Mobile Styles */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
          padding: 10px;
        }

        .navbar.is-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .navbar.is-visible {
          opacity: 1;
          pointer-events: all;
        }

        .bar {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--white);
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }

        .nav-overlay {
          position: fixed;
          top: 3.8rem;
          right: 1.5rem;
          width: 210px;
          background: rgba(10, 10, 20, 0.98);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 1.8rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transform: translateY(-10px) scale(0.98);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        .nav-overlay.is-open {
          opacity: 1;
          pointer-events: all;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.2rem;
        }

        .mobile-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 1rem;
          color: var(--white);
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(10px);
        }

        .is-open .mobile-link {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-link:hover {
          color: var(--white);
          transform: translateX(-5px);
        }

        @media (max-width: 900px) {
          .navbar {
            padding: 1.2rem 2rem 1.2rem 3rem;
          }

          .navbar-links {
            display: none;
          }

          .nav-toggle {
            display: flex;
          }

          .nav-toggle.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
          }
          .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
          }
          .nav-toggle.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
          }
        }
      `}</style>
    </header>
  );
}
