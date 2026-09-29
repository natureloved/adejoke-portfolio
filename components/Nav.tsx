"use client";

import { useEffect, useRef, useState } from "react";
import { useContact } from "./ContactContext";
import { Icon } from "./ui";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#process", label: "Process" },
  { href: "#lab", label: "Lab" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const { open: openContact } = useContact();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Shadow only once the page has moved, so the header stays flat at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section the reader is actually in. Measuring every section on
  // each frame is deliberate: an IntersectionObserver callback only reports the
  // entries that changed, so it keeps naming a section that has already left
  // the viewport, which is visible as a stale dot on long sections.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector<HTMLElement>(l.href)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.32;
      let current: string | null = null;
      for (const s of sections) {
        if (s.offsetTop <= line) current = s.id;
      }
      // The last section is often too short to reach the measuring line.
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;
      if (atBottom) current = sections[sections.length - 1].id;
      // No section yet, so no link is current: the reader is still in the hero.
      setActive(current ? `#${current}` : "");
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu on Escape, and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move focus so keyboard and screen reader users land on the new section.
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="container header-inner">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
        >
          <span className="brand-mark" aria-hidden="true">
            <Icon name="i-sparkle" />
          </span>
          Akinola<span className="brand-dot">.</span>
        </a>

        <nav className={`main-nav${open ? " open" : ""}`} aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? "active" : undefined}
              aria-current={active === l.href ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              openContact();
            }}
          >
            Start a conversation
            <Icon name="i-arrow-up-right" />
          </a>
        </nav>

        <div className="header-actions">
          <span className="availability">
            <span className="status-dot" aria-hidden="true" />
            Open to work
          </span>
          <button
            type="button"
            className="btn header-cta"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
          >
            Let&rsquo;s talk
            <Icon name="i-arrow-up-right" />
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "i-plus" : "i-menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
