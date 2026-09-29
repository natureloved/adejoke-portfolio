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
            Building software that moves money and saves people work. Based in {SITE.location},
            working with teams anywhere.
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
        <span>&copy; {new Date().getFullYear()} {SITE.name}. Built in Lagos.</span>
        <a href="#top">
          Back to the top
          <Icon name="i-arrow-up-right" />
        </a>
      </div>
    </footer>
  );
}
