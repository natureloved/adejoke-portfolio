"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="site-grid footer-inner">
        <div className="footer-left">
          <span className="footer-name">Akinola Adejoke</span>
          <span className="footer-sep">/</span>
          <span className="footer-role">Full-Stack & Protocol Developer</span>
        </div>

        <div className="footer-right">
          <span>Lagos, Nigeria</span>
          <span className="footer-sep">•</span>
          <button type="button" onClick={scrollToTop} className="back-to-top">
            Back to top ↑
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          z-index: 10;
          border-top: 1px solid var(--border-soft);
          padding: 2.2rem 0 3rem;
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.05em;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .footer-left,
        .footer-right {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .footer-name {
          color: var(--white);
          font-weight: 600;
        }

        .footer-sep {
          color: #4b5558;
        }

        .back-to-top {
          background: transparent;
          border: 0;
          color: var(--cyan);
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
          transition: color 0.2s ease;
        }

        .back-to-top:hover {
          color: var(--lime);
        }

        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
          }
        }
      `}</style>
    </footer>
  );
}
