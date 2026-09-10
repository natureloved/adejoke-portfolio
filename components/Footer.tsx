"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-grid footer-inner">
        <span>Akinola Adejoke Elizabeth</span>
        <span>Full-stack / multi-chain / Lagos</span>
        <span>2026</span>
      </div>
      <style jsx>{`
        .site-footer { position: relative; z-index: 1; border-top: 1px solid var(--border-soft); padding: 1.4rem 0 2rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.06em; text-transform: uppercase; }
        .footer-inner { display: flex; justify-content: space-between; gap: 1rem; }
        .footer-inner span:last-child { color: var(--lime); }
        @media (max-width: 620px) { .footer-inner { display: grid; gap: 0.55rem; } }
      `}</style>
    </footer>
  );
}
