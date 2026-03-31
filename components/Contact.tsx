"use client";

const socials = [
  {
    name: "Twitter / X",
    href: "https://x.com/adejoke_btc",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/natureloved",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.131c0-7.88-8.922-7.593-11.02-3.708v-2.161z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:akinolaa769@gmail.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-container reveal">
        <div className="section-label reveal">05 — Contact</div>
        
        <h2 className="section-title reveal creative-font">
          Let&apos;s Build <br />
          Something
        </h2>
        
        <p className="subtext reveal">
          Open to collaborations, grants, and interesting problems. If you&apos;re
          building in Web3 let&apos;s talk.
        </p>

        {/* Unified Social Link Row */}
        <div className="social-row reveal">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              {social.icon}
              {social.name}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .contact {
          background: var(--surface);
          padding: 8rem 4rem;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .contact-container {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }

        .section-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          color: var(--orange);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .section-title {
          font-family: var(--font-syne), "Syne", sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: var(--white);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .subtext {
          font-size: 1rem;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 4rem;
          max-width: 500px;
          margin-inline: auto;
        }

        .social-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-btn {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--white);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          padding: 0.8rem 1.6rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .social-btn:hover {
          background: var(--orange);
          border-color: var(--orange);
          color: #06060c;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .social-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
