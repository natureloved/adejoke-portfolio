"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import ReadingToggle from "./ReadingToggle";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "What I do" },
  { href: "#process", label: "Process" },
  { href: "#lab", label: "More builds" },
  { href: "#story", label: "Background" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently owns the top of the viewport, so
  // a scroller always knows where they are in a seven-screen page.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-line-soft bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <a
          href="#top"
          className="group flex items-baseline gap-2.5 no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink group-hover:text-lime">
            Akinola Adejoke
          </span>
          <span className="hidden font-mono text-[13px] text-muted sm:inline">
            full-stack &amp; protocol
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`inline-flex min-h-[40px] items-center rounded px-3 text-[15px] no-underline transition-colors ${
                active === link.href ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ReadingToggle />
          </div>
          <a
            href="#contact"
            className="hidden min-h-[38px] items-center border border-lime bg-lime px-4 text-[15px] font-semibold text-[#0a0d0e] no-underline transition-colors hover:bg-white hover:border-white sm:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-[38px] w-[38px] items-center justify-center border border-line text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-4 bg-current transition-transform ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto border-t border-line-soft bg-bg lg:hidden"
        >
          <nav aria-label="Sections" className="wrap flex flex-col py-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-4 text-[19px] text-ink no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <ReadingToggle variant="full" />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                {SITE.availability}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
