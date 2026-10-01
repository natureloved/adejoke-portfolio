import { SITE } from "@/lib/site";
import { ContactTrigger } from "./ContactContext";
import { Icon } from "./ui";

const SOCIALS = [
  { href: SITE.github, label: "GitHub", icon: "i-github" },
  { href: SITE.linkedin, label: "LinkedIn", icon: "i-linkedin" },
  { href: SITE.x, label: "X", icon: "i-x" },
];

export default function Footer() {
  return (
    <footer className="container site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <Icon name="i-sparkle" />
            </span>
            Akinola<span className="brand-dot">.</span>
          </a>
          <p>
            Building software that moves money and saves people work. Currently studying
            radiography, and building alongside it.
          </p>
        </div>

        <div className="social-links">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon name={s.icon} />
            </a>
          ))}
        </div>

        <ContactTrigger className="btn btn-lime">
          Start a conversation
          <Icon name="i-arrow-up-right" />
        </ContactTrigger>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} {SITE.name}.</span>
        <a href="#top">
          Back to the top
          <Icon name="i-arrow-up-right" />
        </a>
      </div>

      {/*
        A colophon, because a portfolio that argues for showing your evidence
        should show when it was last shown. The date is read from the build, so
        it cannot drift from what is deployed: NEXT_PUBLIC_BUILD_TIME is set in
        next.config.mjs at build time, and falls back to the render time in
        dev where there is no build to speak of.
      */}
      <p className="footer-colophon">
        Last updated {SITE.lastUpdated}. Every claim on this page links to something you can
        check.
      </p>
    </footer>
  );
}
