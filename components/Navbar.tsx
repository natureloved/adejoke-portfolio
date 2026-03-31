"use client";

import { useState } from "react";
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

  return (
    <header className={`navbar ${isOpen ? "is-open" : ""}`}>
      {/* Logo */}
      <Link href="#hero" className="navbar-logo" onClick={() => setIsOpen(false)}>
        AEJ
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
        className="nav-toggle" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`nav-overlay ${isOpen ? "visible" : ""}`}>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="mobile-link"
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

        .bar {
          display: block;
          width: 25px;
          height: 1px;
          background: var(--white);
          transition: 0.3s ease;
        }

        .nav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(6, 6, 12, 0.98);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .nav-overlay.visible {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .mobile-link {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 3rem;
          color: var(--white);
          text-decoration: none;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .mobile-link:hover {
          color: var(--orange);
          transform: scale(1.1);
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

          .navbar.is-open .bar:nth-child(1) {
            transform: translateY(3.5px) rotate(45deg);
          }
          .navbar.is-open .bar:nth-child(2) {
            transform: translateY(-3.5px) rotate(-45deg);
          }
        }
      `}</style>
    </header>
  );
}
