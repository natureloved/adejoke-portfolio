"use client";

import { useState, useEffect } from "react";

const vibes = [
  "building on stacks",
  "writing smart contracts",
  "shipping something new",
  "deep in Next.js",
  "exploring Bitcoin L2",
  "debugging cairo code"
];

export default function LagosVibe() {
  const [time, setTime] = useState("");
  const [vibeIndex, setVibeIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Clock updates every second
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now) + " WAT");
    };

    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Vibe rotation every 3 seconds with a fade effect
    const vibeInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setVibeIndex((prev) => (prev + 1) % vibes.length);
        setIsFading(false);
      }, 300); // 300ms fade transition
    }, 3000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(vibeInterval);
    };
  }, []);

  return (
    <div className="lagos-vibe reveal">
      <div className="vibe-side vibe-left">
        <div className="status-indicator">
          <span className="dot pulse-orange" />
          <span className="label">Lagos, Nigeria</span>
        </div>
        <div className="time">{time}</div>
      </div>

      <div className="vibe-side vibe-right">
        <span className="label">Currently</span>
        <div className={`vibe-badge ${isFading ? "fade-out" : "fade-in"}`}>
          {vibes[vibeIndex]}
        </div>
      </div>

      <style jsx>{`
        .lagos-vibe {
          background: #06060c;
          border: 1px solid rgba(255, 95, 31, 0.25);
          border-radius: 6px;
          padding: 0.85rem 1.4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto 2.5rem;
        }

        .vibe-side {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .vibe-left { align-items: flex-start; }
        .vibe-right { align-items: flex-end; }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .pulse-orange {
          background: var(--orange);
          box-shadow: 0 0 8px var(--orange);
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 10px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .time {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 13px;
          color: var(--orange);
        }

        .vibe-badge {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 11px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          background: rgba(0, 212, 255, 0.06);
          border: 1px solid rgba(0, 212, 255, 0.3);
          border-radius: 4px;
          transition: opacity 0.3s ease;
        }

        .fade-out { opacity: 0; }
        .fade-in { opacity: 1; }

        @media (max-width: 600px) {
          .lagos-vibe {
            flex-direction: column;
            gap: 1.2rem;
            text-align: center;
            padding: 1.2rem;
          }
          .vibe-left, .vibe-right {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
