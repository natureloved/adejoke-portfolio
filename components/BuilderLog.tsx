"use client";

import { useEffect, useState } from "react";

const milestones = [
  {
    date: "May 2026",
    project: "Voz",
    description:
      "Shipped voice-first cross-chain remittance in 48 hours for Dev3pack. Integrated Claude for intent parsing and LI.FI for EVM-to-Solana settlement.",
    status: "Shipped",
  },
  {
    date: "Apr 2026",
    project: "Staxiq",
    description:
      "Wallet connection logic finalized — optimized @stacks/connect v8 callback flow for production.",
    status: "Shipped",
  },
  {
    date: "Mar 2026",
    project: "TonPilot",
    description:
      "Submitted to TON AI Agent Hackathon. Live at @TonAutoPilotBot on Telegram.",
    status: "Shipped",
  },
  {
    date: "Up next",
    project: "Bitcoin Mining Platform",
    description:
      "Scoping a standalone Bitcoin mining intelligence platform — analytics, profitability calculator, community.",
    status: "Ideation",
  },
];

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
    ref_type?: string;
    ref?: string;
    action?: string;
  };
  created_at: string;
}

interface LiveEntry {
  date: string;
  repo: string;
  text: string;
}

function formatEventDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function parseGitHubEvents(events: GitHubEvent[]): LiveEntry[] {
  return events
    .filter((e) => e.type === "PushEvent" && e.payload.commits?.length)
    .slice(0, 4)
    .map((e) => ({
      date: formatEventDate(e.created_at),
      repo: e.repo.name.replace("natureloved/", ""),
      text: (e.payload.commits![0].message.split("\n")[0] ?? "").slice(0, 72),
    }));
}

export default function BuilderLog() {
  const [liveEntries, setLiveEntries] = useState<LiveEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/natureloved/events/public?per_page=10")
      .then((r) => r.json())
      .then((data: GitHubEvent[]) => {
        setLiveEntries(parseGitHubEvents(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress": return "status-cyan";
      case "shipped":     return "status-purple";
      case "ideation":    return "status-orange";
      default:            return "";
    }
  };

  return (
    <section id="builder-log" className="builder-log section-container">
      <div className="log-container reveal">
        {/* Header */}
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

        {/* ── Live GitHub Activity ── */}
        <div className="activity-section">
          <div className="section-rule">
            <span className="rule-label">— recent github activity</span>
          </div>

          {loading ? (
            <div className="skeleton-list">
              {[0, 1, 2].map((i) => (
                <div key={i} className="skeleton-row">
                  <div className="skeleton skeleton-date" />
                  <div className="skeleton skeleton-repo" />
                  <div className="skeleton skeleton-msg" />
                </div>
              ))}
            </div>
          ) : liveEntries.length > 0 ? (
            <div className="activity-list">
              {liveEntries.map((e, i) => (
                <div key={i} className="activity-row">
                  <span className="activity-date">{e.date}</span>
                  <span className="activity-repo">{e.repo}</span>
                  <span className="activity-text">{e.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="activity-empty">Unable to fetch recent activity</div>
          )}
        </div>

        {/* ── Pinned Milestones ── */}
        <div className="section-rule">
          <span className="rule-label">— pinned milestones</span>
        </div>

        <div className="log-body">
          {milestones.map((item, idx) => (
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

        /* ── Section rules ── */
        .section-rule {
          padding: 0.65rem 1.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          background: rgba(255, 255, 255, 0.01);
        }

        .rule-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 9px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        /* ── Live activity ── */
        .activity-section {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-row {
          display: grid;
          grid-template-columns: 72px 140px 1fr;
          gap: 1rem;
          padding: 0.75rem 1.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          align-items: baseline;
          transition: background 0.2s ease;
        }

        .activity-row:last-child { border-bottom: none; }
        .activity-row:hover { background: rgba(255, 255, 255, 0.01); }

        .activity-date {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 9px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .activity-repo {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 9.5px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activity-text {
          font-family: var(--font-syne), "Syne", sans-serif;
          font-size: 11px;
          color: rgba(240, 237, 230, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activity-empty {
          padding: 1.2rem 1.4rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 9.5px;
          color: var(--muted);
        }

        /* ── Skeleton rows ── */
        .skeleton-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .skeleton-row {
          display: grid;
          grid-template-columns: 72px 140px 1fr;
          gap: 1rem;
          padding: 0.8rem 1.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          align-items: center;
        }

        .skeleton-date { height: 8px; }
        .skeleton-repo { height: 8px; }
        .skeleton-msg  { height: 8px; }

        /* ── Milestones ── */
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

        .log-entry:last-child { border-bottom: none; }
        .log-entry:hover { background: rgba(255, 255, 255, 0.01); }

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

        .status-cyan   { color: var(--cyan);   background: rgba(0, 212, 255, 0.08); }
        .status-purple { color: var(--purple); background: rgba(155, 89, 245, 0.08); }
        .status-orange { color: var(--orange); background: rgba(255, 95, 31, 0.08); }

        .description {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(240, 237, 230, 0.65);
          font-family: var(--font-syne), "Syne", sans-serif;
        }

        @media (max-width: 768px) {
          .builder-log { padding: 4rem 2rem 4rem 3rem; }
          .activity-row { grid-template-columns: 60px 1fr; }
          .activity-text { display: none; }
          .log-entry { flex-direction: column; gap: 0.8rem; }
          .entry-top { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
