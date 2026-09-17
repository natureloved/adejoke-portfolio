"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = window.scrollY / totalHeight;
        setProgress(Math.min(Math.max(current, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(progress * 100).toFixed(2)}%`,
          background: "linear-gradient(90deg, #d9f99d 0%, #5eead4 50%, #ff8a65 100%)",
          boxShadow: "0 0 8px rgba(217, 249, 157, 0.4)",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
