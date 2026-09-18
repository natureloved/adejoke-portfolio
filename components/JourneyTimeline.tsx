"use client";

import { JOURNEY_MILESTONES } from "@/data/portfolio";

export default function JourneyTimeline() {
  return (
    <section id="journey" className="journey-section" aria-label="Journey and Problem Solving Path">
      <div className="site-grid">
        <div className="journey-head">
          <p className="section-label">04 / Journey</p>
          <h2 className="section-title">A trajectory of changing interests and problem-solving.</h2>

          {/* Anchor Manifesto Quote */}
          <div className="anchor-manifesto">
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="manifesto-line">
              Different fields, same instinct: understand complex systems and make them useful to people.
            </p>
          </div>
        </div>

        {/* Timeline Path */}
        <div className="timeline-container">
          <div className="timeline-spine" aria-hidden="true" />

          <div className="timeline-events">
            {JOURNEY_MILESTONES.map((milestone, idx) => (
              <div key={milestone.title} className="timeline-item">
                {/* Node marker */}
                <div className="item-marker">
                  <span className="marker-dot" />
                  <span className="marker-num">0{idx + 1}</span>
                </div>

                {/* Content card */}
                <div className="item-card">
                  <div className="card-period">
                    <span className="period-label">{milestone.period}</span>
                  </div>

                  <h3 className="card-title">{milestone.title}</h3>
                  <h4 className="card-subtitle">{milestone.subtitle}</h4>

                  <p className="card-description">{milestone.description}</p>

                  {milestone.highlight && (
                    <div className="milestone-highlight">
                      <span>✦ {milestone.highlight}</span>
                    </div>
                  )}

                  <div className="card-tags">
                    {milestone.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-section {
          position: relative;
          padding: 8rem 0;
          border-top: 1px solid var(--border-soft);
        }

        .journey-head {
          margin-bottom: 5rem;
        }

        .anchor-manifesto {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-top: 2.5rem;
          padding: 1.5rem 1.75rem;
          background: rgba(217, 249, 157, 0.04);
          border: 1px solid rgba(217, 249, 157, 0.2);
          border-left: 3px solid var(--lime);
          max-width: 760px;
        }

        .quote-mark {
          font-family: serif;
          font-size: 2.8rem;
          line-height: 0.8;
          color: var(--lime);
        }

        .manifesto-line {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 500;
          line-height: 1.55;
          color: var(--white);
          letter-spacing: -0.01em;
        }

        .timeline-container {
          position: relative;
          padding-left: 2.5rem;
        }

        .timeline-spine {
          position: absolute;
          left: 12px;
          top: 16px;
          bottom: 24px;
          width: 1px;
          background: linear-gradient(180deg, var(--lime) 0%, var(--cyan) 50%, rgba(244, 241, 234, 0.1) 100%);
        }

        .timeline-events {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: flex-start;
          gap: 1.8rem;
        }

        .item-marker {
          position: absolute;
          left: -2.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .marker-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 10px var(--lime);
        }

        .marker-num {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--muted);
          display: none;
        }

        .item-card {
          padding: 2rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          backdrop-filter: blur(12px);
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .item-card:hover {
          border-color: rgba(94, 234, 212, 0.4);
          transform: translateX(4px);
        }

        .card-period {
          margin-bottom: 0.65rem;
        }

        .period-label {
          font-family: var(--font-mono);
          font-size: 0.64rem;
          font-weight: 600;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-title {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 650;
          color: var(--white);
          letter-spacing: -0.02em;
        }

        .card-subtitle {
          margin: 0.4rem 0 0;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--cyan);
        }

        .card-description {
          margin: 1rem 0 0;
          font-size: 0.88rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 68ch;
        }

        .milestone-highlight {
          margin-top: 1.1rem;
          padding: 0.7rem 0.9rem;
          background: rgba(94, 234, 212, 0.08);
          border: 1px solid rgba(94, 234, 212, 0.2);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--cyan);
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 1.4rem;
        }

        .tag-pill {
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-soft);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          color: rgba(244, 241, 234, 0.7);
        }

        @media (max-width: 640px) {
          .journey-section {
            padding: 4.5rem 0;
          }
          .journey-head {
            margin-bottom: 2.5rem;
          }
          .anchor-manifesto {
            margin-top: 1.5rem;
            padding: 1.1rem 1.25rem;
          }
          .manifesto-line {
            font-size: 0.95rem;
          }
          .timeline-container {
            padding-left: 2rem;
          }
          .timeline-spine {
            left: 10px;
          }
          .item-marker {
            left: -2rem;
          }
          .item-card {
            padding: 1.25rem 1rem;
          }
          .card-title {
            font-size: 1.15rem;
          }
          .card-subtitle {
            font-size: 0.82rem;
          }
          .card-description {
            font-size: 0.82rem;
            line-height: 1.65;
          }
        }
      `}</style>
    </section>
  );
}
