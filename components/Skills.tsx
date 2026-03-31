"use client";

import { useEffect, useRef, useState } from "react";

type SkillNode = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label?: string;
  category: string;
  percent: number;
};

const skillsData = [
  { id: "Clarity", category: "smart-contract", percent: 88 },
  { id: "Solidity", category: "smart-contract", percent: 85 },
  { id: "Cairo", category: "smart-contract", percent: 78 },
  { id: "Next.js", category: "frontend", percent: 90 },
  { id: "React", category: "frontend", percent: 88 },
  { id: "TypeScript", category: "frontend", percent: 75 },
  { id: "Node.js", category: "tools", percent: 80 },
  { id: "Git", category: "tools", percent: 90 },
  { id: "Figma", category: "tools", percent: 70 },
  { id: "Stacks", category: "blockchain", percent: 85 },
  { id: "StarkNet", category: "blockchain", percent: 80 },
  { id: "EVM", category: "blockchain", percent: 92 },
];

export default function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const nodes = useRef<SkillNode[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      initNodes();
    };

    const initNodes = () => {
      const { width, height } = canvas;
      nodes.current = skillsData.map((s) => ({
        ...s,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { width, height } = canvas;

      // Update positions
      nodes.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;

        // Draw connections
        nodes.current.forEach((other) => {
          if (node.id === other.id) return;
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(160, 160, 180, ${0.4 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.current.forEach((node) => {
        const isHovered = hoveredNode?.id === node.id;
        
        // Node Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 9 : 5, 0, Math.PI * 2);
        ctx.fillStyle = node.category === "smart-contract" ? "#ff5f1f" : 
                        node.category === "frontend" ? "#9b59f5" : "#00d4ff";
        ctx.shadowBlur = isHovered ? 25 : 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label if hovered or desktop
        if (isHovered || window.innerWidth > 900) {
          ctx.font = `${isHovered ? "15px" : "13px"} 'DM Mono', monospace`;
          ctx.fillStyle = isHovered ? "white" : "rgba(255,255,255,0.65)";
          ctx.textAlign = "center";
          ctx.fillText(node.label || node.id, node.x, node.y - 18);
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const found = nodes.current.find(n => Math.hypot(n.x - x, n.y - y) < 20);
    setHoveredNode(found || null);
  };

  return (
    <section id="skills" className="skills">
      <div className="section-label reveal">03 — Skills</div>
      <h2 className="section-title reveal">Interconnected <br /> Proficiency</h2>

      <div ref={containerRef} className="constellation-container reveal" onMouseMove={handleMouseMove}>
        <canvas ref={canvasRef} className="skills-canvas" />
        
        {/* Info Overlay (Desktop only) */}
        {hoveredNode && (
          <div className="skill-tooltip" style={{ left: hoveredNode.x, top: hoveredNode.y }}>
            <span className="tooltip-percent">{hoveredNode.percent}% Mastery</span>
            <span className="tooltip-cat">{hoveredNode.category}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .skills {
          background: var(--surface);
          padding: 7rem 4rem 7rem 6rem;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
        }
        .section-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.70rem;
          color: var(--orange);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 0.95;
          color: var(--white);
          margin-bottom: 2rem;
        }
        .constellation-container {
          position: relative;
          width: 100%;
          height: 500px;
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: crosshair;
          margin-top: 2rem;
          overflow: hidden;
        }
        .skills-canvas {
          width: 100%;
          height: 100%;
        }
        .skill-tooltip {
          position: absolute;
          pointer-events: none;
          background: rgba(14, 14, 28, 0.95);
          border: 1px solid var(--orange);
          padding: 0.6rem 1rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transform: translate(15px, 15px);
          z-index: 10;
          backdrop-filter: blur(8px);
          animation: tooltipFade 0.2s ease;
        }
        @keyframes tooltipFade {
          from { opacity: 0; transform: translate(15px, 20px); }
          to { opacity: 1; transform: translate(15px, 15px); }
        }
        .tooltip-percent {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 1.2rem;
          color: var(--white);
        }
        .tooltip-cat {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.6rem;
          color: var(--muted);
          text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .skills {
            padding: 5rem 2.5rem 5rem 3.5rem;
          }
          .constellation-container {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
}
