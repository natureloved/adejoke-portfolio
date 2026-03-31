"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseEnter);
    window.addEventListener("mouseout", onMouseLeave);
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseEnter);
      window.removeEventListener("mouseout", onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${isHovering ? "hover" : ""}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? "hover" : ""}`}
      />

      <style jsx global>{`
        .cursor {
          position: fixed;
          width: 10px;
          height: 10px;
          background-color: var(--orange);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          transform: translate(-50%, -50%);
          transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cursor-ring {
          position: fixed;
          width: 38px;
          height: 38px;
          border: 1.5px solid rgba(255, 95, 31, 0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease, border-color 0.3s ease;
        }

        .cursor.hover {
          transform: translate(-50%, -50%) scale(2.5);
        }

        .cursor-ring.hover {
          opacity: 0;
        }

        @media (max-width: 900px) {
          .cursor, .cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
