import LagosVibe from "./LagosVibe";

export default function Footer() {
  return (
    <footer className="footer">
      <LagosVibe />
      <div className="footer-content">
        <p className="footer-text">
          Akinola Adejoke · Full-Stack Developer · <span className="highlight-orange">2026</span>
        </p>
      </div>

      <style jsx>{`
        .footer {
          background: var(--bg);
          text-align: center;
          padding: 2rem 4rem;
          border-top: 1px solid var(--border);
          position: relative;
          z-index: 10;
        }

        .footer-text {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .highlight-orange {
          color: var(--orange);
          opacity: 1;
        }

        @media (max-width: 600px) {
          .footer {
            padding: 2rem 1rem;
          }
          .footer-text {
            line-height: 1.6;
          }
        }
      `}</style>
    </footer>
  );
}
