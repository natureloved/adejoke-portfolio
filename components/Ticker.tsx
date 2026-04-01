"use client";

const tickerItems = [
  "Bitcoin DeFi",
  "Smart Contracts",
  "Stacks Blockchain",
  "DeFi Aggregation",
  "Prediction Markets",
  "Full Stack Dev",
  "Multi-Chain Native",
  "Bitcoin L2",
  "African Builder",
];

// Duplicate for seamless loop
const allItems = [...tickerItems, ...tickerItems];

export default function Ticker() {
  return (
    <div className="ticker-wrapper reveal">
      <div className="ticker-track">
        {allItems.map((item, index) => (
          <span key={index} className="ticker-item">
            <span className="ticker-dot">⬡</span>
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker-wrapper {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 0.9rem 0;
          overflow: hidden;
          position: relative;
          z-index: 10;
        }

        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }

        .ticker-item {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.72rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted);
          padding: 0 2.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .ticker-item:hover {
          color: var(--white);
        }

        .ticker-dot {
          color: var(--orange);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
