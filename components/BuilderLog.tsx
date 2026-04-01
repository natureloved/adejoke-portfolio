"use client";

const entries = [
  {
    date: "Apr 2026",
    project: "Staxiq",
    description: "Wallet connection logic finalized — optimized @stacks/connect v8 callback flow for production.",
    status: "Shipped"
  },
  {
    date: "Mar 2026",
    project: "Mogul",
    description: "Submitted to Bags Hackathon. Privy fast-refresh bug patched and shipped.",
    status: "Shipped"
  },
  {
    date: "Mar 2026",
    project: "TonPilot",
    description: "Submitted to TON AI Agent Hackathon. Live at @TonAutoPilotBot on Telegram.",
    status: "Shipped"
  },
  {
    date: "Up next",
    project: "Bitcoin Mining Platform",
    description: "Scoping a standalone Bitcoin mining intelligence platform — analytics, profitability calculator, community.",
    status: "Ideation"
  }
];

export default function BuilderLog() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "status-cyan";
      case "shipped":
        return "status-purple";
      case "ideation":
        return "status-orange";
      default:
        return "";
    }
  };

  return (
    <section id="builder-log" className="builder-log section-container">
      <div className="log-container reveal">
        {/* Header Bar */}
        <div className="log-header">
          <div className="header-left">
            <span className="icon">⬡</span>
            <span className="title">Builder Log</span>
          </div>
          <div className="header-right">
            <span className="dot pulse-cyan animate-blink" />
            <span className="live-label">Live Updates</span>
          </div>
        </div>

        {/* Entries */}
        <div className="log-body">
          {entries.map((item, idx) => (
            <div key={idx} className="log-entry">
              <div className="date-col">{item.date}</div>
              <div className="content-col">
                <div className="entry-top">
                  <span className="project-name">{item.project}</span>
                  <span className={`status-badge ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className="description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .builder-log {
          padding: 6rem 4rem 6rem 6rem;
          background: transparent;
        }

        .log-container {
          background: #06060c;
          border: 1px solid rgba(155, 89, 245, 0.25);
          border-radius: 6px;
          overflow: hidden;
          max-width: 900px;
          margin: 0 auto;
        }

        .log-header {
          padding: 1rem 1.4rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 11px;
          color: var(--purple);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 10px;
          color: var(--muted);
          text-transform: uppercase;
        }

        .pulse-cyan {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 8px var(--cyan);
        }

        .log-body {
          display: flex;
          flex-direction: column;
        }

        .log-entry {
          padding: 1.5rem 1.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          gap: 2rem;
          transition: background 0.3s ease;
        }

        .log-entry:last-child {
          border-bottom: none;
        }

        .log-entry:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        .date-col {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 10px;
          color: var(--muted);
          min-width: 65px;
          padding-top: 0.3rem;
          text-transform: uppercase;
        }

        .content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .entry-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .project-name {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 13px;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.15rem 0.6rem;
          border-radius: 3px;
          border: 1px solid currentColor;
        }

        .status-cyan {
          color: var(--cyan);
          background: rgba(0, 212, 255, 0.08);
        }

        .status-purple {
          color: var(--purple);
          background: rgba(155, 89, 245, 0.08);
        }

        .status-orange {
          color: var(--orange);
          background: rgba(255, 95, 31, 0.08);
        }

        .description {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(240, 237, 230, 0.65);
          font-family: var(--font-syne), "Syne", sans-serif;
        }

        @media (max-width: 768px) {
          .builder-log {
            padding: 4rem 2rem 4rem 3rem;
          }
          .log-entry {
            flex-direction: column;
            gap: 0.8rem;
          }
          .entry-top {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
