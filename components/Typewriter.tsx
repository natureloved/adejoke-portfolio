"use client";

import { useState, useEffect } from "react";

export default function Typewriter({ text, delay = 15, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return (
    <p className="typewriter-text">
      {displayText}
      <span className="typewriter-cursor">|</span>
      <style jsx>{`
        .typewriter-text {
          min-height: 5em; /* Prevent layout shift */
          max-width: 600px;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(240, 237, 230, 0.72);
          margin-bottom: 2.5rem;
          font-family: var(--font-syne), "Syne", sans-serif;
        }
        .typewriter-cursor {
          display: inline-block;
          width: 0.1em;
          color: var(--orange);
          animation: blink 0.8s step-end infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 768px) {
          .typewriter-text {
            font-size: 0.95rem;
            min-height: 8em;
          }
        }
      `}</style>
    </p>
  );
}
