"use client";

import { useEffect, useRef } from "react";
import { CHAINS, chainColor } from "@/data/chains";
import { useConstellation } from "@/lib/constellation-context";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  hx: number; hy: number; c: string; chain: string;
};

/* The field re-tints itself to match whichever region you're reading.
   Hovering a chain overrides it with that chain's real brand colour. */
const REGION_TINTS: Record<string, string> = {
  hero: "#ffb020",
  origin: "#a78bfa",
  work: "#2dd4bf",
  stack: "#a78bfa",
  guilds: "#2dd4bf",
  notes: "#ffb020",
  signal: "#a78bfa",
};

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function ConstellationField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { active, region } = useConstellation();
  const activeRef = useRef<string | null>(active);
  activeRef.current = active;
  const regionRef = useRef(region);
  regionRef.current = region;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
    const N = reduce ? 90 : 320;
    let W = 0, H = 0;
    let ps: Particle[] = [];

    function build() {
      ps = [];
      const per = Math.round(N / CHAINS.length);
      CHAINS.forEach((ch) => {
        const hx = ch.fx * W, hy = ch.fy * H;
        for (let i = 0; i < per; i++) {
          ps.push({
            x: hx + (Math.random() - 0.5) * 200 * DPR,
            y: hy + (Math.random() - 0.5) * 150 * DPR,
            vx: 0, vy: 0, hx, hy, c: ch.color, chain: ch.id,
          });
        }
      });
    }
    function resize() {
      W = canvas.width = Math.floor(innerWidth * DPR);
      H = canvas.height = Math.floor(innerHeight * DPR);
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      build();
    }

    let mx = -9999, my = -9999;
    const move = (e: PointerEvent | TouchEvent) => {
      const t = "touches" in e ? e.touches[0] : e;
      mx = t.clientX * DPR; my = t.clientY * DPR;
    };
    const leave = () => { mx = -9999; my = -9999; };

    function onScroll() {
      const v = Math.max(0, 1 - scrollY / (innerHeight * 0.75));
      wrap.style.opacity = String(0.14 + 0.86 * v);
    }

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move);
    addEventListener("touchmove", move, { passive: true });
    addEventListener("pointerleave", leave);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf = 0;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      const act = activeRef.current;
      // Chain hover wins over the region tint — that's the reward interaction.
      const tint = act
        ? chainColor(act)
        : REGION_TINTS[regionRef.current] ?? "#a78bfa";
      const [tr, tg, tb] = hexToRgb(tint);
      const boost = act ? 1.9 : 1;
      const link = 72 * DPR;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < link * link) {
            ctx.strokeStyle = `rgba(${tr},${tg},${tb},${0.11 * boost * (1 - d2 / (link * link))})`;
            ctx.lineWidth = 0.5 * DPR;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of ps) {
        const isActive = !!act && p.chain === act;
        p.vx += (p.hx - p.x) * 0.0009;
        p.vy += (p.hy - p.y) * 0.0009;
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150 * DPR && d > 0.5) {
          const f = ((150 * DPR - d) / (150 * DPR)) * 1.1;
          p.vx -= (dx / d) * f; p.vy -= (dy / d) * f;
        }
        p.vx *= 0.92; p.vy *= 0.92; p.x += p.vx; p.y += p.vy;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = (isActive ? 14 : 6) * DPR;
        ctx.globalAlpha = isActive ? 1 : 0.9;
        ctx.arc(p.x, p.y, (isActive ? 2.8 : 1.7) * DPR, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }

    if (!reduce) raf = requestAnimationFrame(frame);
    else for (const p of ps) { ctx.beginPath(); ctx.fillStyle = p.c; ctx.arc(p.x, p.y, 1.7 * DPR, 0, 6.283); ctx.fill(); }

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      removeEventListener("touchmove", move);
      removeEventListener("pointerleave", leave);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 1, transition: "opacity .45s ease", pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
