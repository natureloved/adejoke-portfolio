"use client";

import { useState } from "react";
import TiltCard from "./TiltCard";
import { featuredProjects, archivedProjects } from "@/data/projects";
import { CHAINS } from "@/data/chains";
import { useConstellation } from "@/lib/constellation-context";

// ─── Thumbnail components (preserved bespoke animated previews) ──

function Chrome({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "7px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
    }}>
      <div style={{ display: "flex", gap: 4 }}>
        {["#ff5564", "#ffbd2e", "#27c93f"].map((c) => (
          <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <span style={{ fontFamily: "monospace", fontSize: 9, color: accent, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function VozThumbnail() {
  const bars = [22, 38, 28, 52, 40, 58, 32, 48, 36, 60, 30, 54, 44, 62, 28, 46, 56, 38, 42, 64];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="VOZ — LIVE" accent="#ff5f1f" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 9, padding: "0 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {bars.map((h, i) => (
            <div key={i} className="viz-bar" style={{ width: 4, height: h, background: i % 3 === 0 ? "#ff5f1f" : i % 3 === 1 ? "#9b59f5" : "rgba(155,89,245,0.3)", borderRadius: 2, animationDelay: `${i * 0.045}s` }} />
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(240,237,230,0.4)", letterSpacing: "0.04em" }}>
          &ldquo;send $50 usdc to sarah via li.fi&rdquo;
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "#27c93f", letterSpacing: "0.1em" }}>PROCESSING — SOLANA</span>
        </div>
      </div>
    </div>
  );
}

function HashPilotThumbnail() {
  const rows = [
    { label: "HASH RATE", value: "847.3 TH/s", color: "#00d4ff" },
    { label: "BLOCK", value: "#892,441", color: "rgba(240,237,230,0.45)" },
    { label: "EFFICIENCY", value: "94.2%", color: "#27c93f" },
    { label: "AI SIGNAL", value: "▲ BUY", color: "#ff5f1f" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="HASHPILOT — TERMINAL" accent="#9b59f5" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        {rows.map((r, i) => (
          <div key={r.label} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 9, animationDelay: `${i * 0.09}s` }}>
            <span style={{ color: "#6b6b80" }}>{">"} {r.label}</span>
            <span className={r.label === "AI SIGNAL" ? "blink-soft" : undefined} style={{ color: r.color, fontWeight: 600 }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StashFlowThumbnail() {
  const goals = [
    { label: "Emergency Fund", pct: 82, color: "#00d4ff" },
    { label: "Vacation Trip", pct: 45, color: "#9b59f5" },
    { label: "MacBook Pro", pct: 100, color: "#ff5f1f" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="STASHFLOW — GOALS" accent="#00d4ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 9 }}>
        {goals.map((g, i) => (
          <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, color: "rgba(240,237,230,0.45)" }}>
              <span>{g.label}</span>
              <span style={{ color: g.color }}>{g.pct}%</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div className="fill-bar" style={{ height: "100%", width: `${g.pct}%`, background: g.color, borderRadius: 2, animationDelay: `${i * 0.12}s` }} />
            </div>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", marginTop: 1, animationDelay: "0.4s" }}>
          ↑ Yield earned: $127.40
        </div>
      </div>
    </div>
  );
}

function StaxiqThumbnail() {
  const protocols = [
    { name: "ALEX Protocol", tvl: "$124.3M", change: "+2.3%", up: true },
    { name: "Velar DEX", tvl: "$89.1M", change: "+5.1%", up: true },
    { name: "Bitflow", tvl: "$67.8M", change: "-0.8%", up: false },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="STAXIQ — BITCOIN L2" accent="#ff5f1f" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 14px", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 7.5, color: "#6b6b80", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 4, marginBottom: 2 }}>
          <span>PROTOCOL</span><span>TVL</span><span>24H</span>
        </div>
        {protocols.map((p, i) => (
          <div key={p.name} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: `${i * 0.1}s` }}>
            <span style={{ color: "rgba(240,237,230,0.65)" }}>{p.name}</span>
            <span style={{ color: "rgba(240,237,230,0.4)" }}>{p.tvl}</span>
            <span style={{ color: p.up ? "#27c93f" : "#ff5f1f" }}>{p.change}</span>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#9b59f5", marginTop: 3, animationDelay: "0.35s" }}>
          ⬡ Powered by Stacks Blockchain
        </div>
      </div>
    </div>
  );
}

function RunesRumbleThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="RUNES RUMBLE — LIVE" accent="#9b59f5" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 8 }}>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8.5, color: "rgba(240,237,230,0.55)", letterSpacing: "0.04em" }}>
          DOG•GO•TO•THE•MOON (RUNE)
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8, color: "#6b6b80", animationDelay: "0.1s" }}>
          Will price exceed $0.05 by Friday?
        </div>
        <div className="row-stagger" style={{ display: "flex", height: 22, borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", animationDelay: "0.2s" }}>
          <div style={{ width: "64%", background: "rgba(155,89,245,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 8.5, color: "#9b59f5" }}>
            YES 64%
          </div>
          <div style={{ flex: 1, background: "rgba(255,95,31,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 8.5, color: "rgba(255,95,31,0.65)" }}>
            NO 36%
          </div>
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#6b6b80", animationDelay: "0.3s" }}>
          Pool: 2.4 BTC · <span className="blink-soft">Closes in 11h 32m</span>
        </div>
      </div>
    </div>
  );
}

function TonPilotThumbnail() {
  const messages = [
    { from: "user", text: "/stake 100 TON to LP" },
    { from: "bot", text: "✓ Staked to Dedust. APY: 18.4%" },
    { from: "user", text: "/balance" },
    { from: "bot", text: "💎 3,421 TON (~$18,491)" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TONPILOT — BOT" accent="#00d4ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 12px", gap: 4 }}>
        {messages.map((m, i) => (
          <div key={i} className="row-stagger" style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", animationDelay: `${i * 0.15}s` }}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, padding: "3px 8px", borderRadius: m.from === "user" ? "7px 7px 2px 7px" : "7px 7px 7px 2px", background: m.from === "user" ? "rgba(0,212,255,0.13)" : "rgba(255,255,255,0.04)", color: m.from === "user" ? "#00d4ff" : "rgba(240,237,230,0.55)", border: `1px solid ${m.from === "user" ? "rgba(0,212,255,0.22)" : "rgba(255,255,255,0.05)"}`, maxWidth: "80%" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipWallThumbnail() {
  const tips = [
    { from: "anon.nim", amount: "+250 NIM", note: '"keep building 🔥"' },
    { from: "sarah_web3", amount: "+1,000 NIM", note: '"love the podcast"' },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TIPWALL — @RASTADEV" accent="#ff5f1f" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, color: "rgba(240,237,230,0.45)" }}>
            <span>Goal: New Studio Mic</span>
            <span style={{ color: "#ff5f1f" }}>68%</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div className="fill-bar" style={{ height: "100%", width: "68%", background: "linear-gradient(90deg, #ff5f1f, #9b59f5)", borderRadius: 2 }} />
          </div>
        </div>
        {tips.map((t, i) => (
          <div key={t.from} className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: `${0.15 + i * 0.15}s` }}>
            <span style={{ color: "rgba(240,237,230,0.65)" }}>{t.from} <span style={{ color: "#6b6b80" }}>{t.note}</span></span>
            <span style={{ color: "#27c93f", fontWeight: 600 }}>{t.amount}</span>
          </div>
        ))}
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#6b6b80", animationDelay: "0.45s" }}>
          ⬡ Signed by wallet · 0 platform fees
        </div>
      </div>
    </div>
  );
}

function DeadmanVaultThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="DEADMAN VAULT — ARMED" accent="#9b59f5" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <svg viewBox="0 0 200 24" style={{ width: "100%", height: 22 }} aria-hidden>
          <polyline className="ekg-line" pathLength={240} points="0,12 30,12 40,12 46,4 52,20 58,8 64,12 110,12 120,12 126,4 132,20 138,8 144,12 200,12" fill="none" stroke="#9b59f5" strokeWidth="1.5" />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5 }}>
          <span style={{ color: "#6b6b80" }}>{">"} VAULT LOCKED</span>
          <span style={{ color: "#00d4ff", fontWeight: 600 }}>4,200 USDCx</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5 }}>
          <span style={{ color: "#6b6b80" }}>{">"} NEXT HEARTBEAT</span>
          <span className="blink-soft" style={{ color: "#ff5f1f", fontWeight: 600 }}>6d 11h 04m</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", letterSpacing: "0.1em" }}>OWNER ALIVE · 2 HEIRS SET</span>
        </div>
      </div>
    </div>
  );
}

function ClarityQuestThumbnail() {
  const code = [
    { text: "(define-public (transfer", color: "rgba(240,237,230,0.6)" },
    { text: "  (amount uint) (to principal))", color: "#6b6b80" },
    { text: "  (ok (stx-transfer? amount", color: "rgba(240,237,230,0.6)" },
    { text: "    tx-sender to)))", color: "#6b6b80" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="CLARITYQUEST — λ 12/20" accent="#00d4ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 3 }}>
        {code.map((l, i) => (
          <div key={i} className="row-stagger" style={{ fontFamily: "monospace", fontSize: 8.5, color: l.color, whiteSpace: "pre", animationDelay: `${i * 0.08}s` }}>
            {l.text}
            {i === code.length - 1 && <span className="cursor-blink" style={{ color: "#00d4ff" }}>▌</span>}
          </div>
        ))}
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontFamily: "monospace", fontSize: 8, animationDelay: "0.45s" }}>
          <span style={{ color: "#27c93f" }}>✓ 4/4 tests passed · +180 XP</span>
          <span style={{ color: "#9b59f5" }}>⚒️ BUILDER</span>
        </div>
      </div>
    </div>
  );
}

function ProofOfRestThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="PROOF OF REST — SESSION" accent="#ff5f1f" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "#6b6b80" }}>{">"} FOCUS ⏾</span>
          <span className="blink-soft" style={{ fontFamily: "monospace", fontSize: 15, color: "#ff5f1f", fontWeight: 600, letterSpacing: "0.05em" }}>41:12</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div className="fill-bar" style={{ height: "100%", width: "69%", background: "linear-gradient(90deg, #ff5f1f, #9b59f5)", borderRadius: 2 }} />
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.1s" }}>
          <span style={{ color: "#6b6b80" }}>{">"} STAKED</span>
          <span style={{ color: "#00d4ff", fontWeight: 600 }}>25 MON</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.2s" }}>
          <span style={{ color: "#6b6b80" }}>{">"} STREAK</span>
          <span style={{ color: "#27c93f", fontWeight: 600 }}>🌱 TOUCHED GRASS ×6</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#9b59f5" }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "#9b59f5", letterSpacing: "0.1em" }}>RESTGUARDIAN · SIMULATING TX</span>
        </div>
      </div>
    </div>
  );
}

function ExpatShipThumbnail() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="EXPATSHIP — QUOTE" accent="#00d4ff" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px", gap: 7 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "monospace", fontSize: 9 }}>
          <span style={{ color: "rgba(240,237,230,0.65)" }}>🇳🇬 LOS</span>
          <div style={{ flex: 1, position: "relative", height: 10 }}>
            <div style={{ position: "absolute", top: 4, left: 0, right: 0, borderTop: "1px dashed rgba(0,212,255,0.4)" }} />
            <span className="row-stagger" style={{ position: "absolute", top: -3, left: "55%", fontSize: 9, color: "#00d4ff" }}>✈</span>
          </div>
          <span style={{ color: "rgba(240,237,230,0.65)" }}>🇬🇧 LON</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.1s" }}>
          <span style={{ color: "#6b6b80" }}>Rate (duty incl.)</span>
          <span style={{ color: "#27c93f", fontWeight: 600 }}>£184.50</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 8.5, animationDelay: "0.2s" }}>
          <span style={{ color: "#6b6b80" }}>Est. delivery</span>
          <span style={{ color: "rgba(240,237,230,0.6)" }}>5–7 days</span>
        </div>
        <div className="row-stagger" style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", gap: 3, animationDelay: "0.3s" }}>
          {[1, 1, 1, 0.25].map((o, i) => (
            <div key={i} style={{ flex: 1, background: "#00d4ff", opacity: o, borderRadius: 2 }} />
          ))}
        </div>
        <div className="row-stagger" style={{ fontFamily: "monospace", fontSize: 7.5, color: "#ff5f1f", animationDelay: "0.4s" }}>
          ▸ In customs · commercial invoice ready
        </div>
      </div>
    </div>
  );
}

function TaskyThumbnail() {
  const alerts = [
    { tag: "BOUNTY", text: "Solidity audit · $2,500", color: "#ff5f1f" },
    { tag: "AIRDROP", text: "zkSync quest live now", color: "#00d4ff" },
    { tag: "HACKATHON", text: "ETHGlobal — 3d left", color: "#9b59f5" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Chrome label="TASKY — @TASKYNOTIFY_BOT" accent="#9b59f5" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 12px", gap: 5 }}>
        {alerts.map((a, i) => (
          <div key={a.tag} className="row-stagger" style={{ display: "flex", alignItems: "center", gap: 6, animationDelay: `${i * 0.13}s` }}>
            <span style={{ fontFamily: "monospace", fontSize: 7, letterSpacing: "0.08em", color: a.color, border: `1px solid ${a.color}`, borderRadius: 2, padding: "1px 4px", flexShrink: 0 }}>{a.tag}</span>
            <span style={{ fontFamily: "monospace", fontSize: 8.5, color: "rgba(240,237,230,0.6)" }}>{a.text}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
          <div className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#27c93f" }} />
          <span className="blink-soft" style={{ fontFamily: "monospace", fontSize: 8, color: "#27c93f", letterSpacing: "0.08em" }}>SCANNING FEEDS · 3 NEW MATCHES</span>
        </div>
      </div>
    </div>
  );
}

function ProjectThumbnail({ id }: { id: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    voz: <VozThumbnail />, hashpilot: <HashPilotThumbnail />, stashflow: <StashFlowThumbnail />,
    staxiq: <StaxiqThumbnail />, "runes-rumble": <RunesRumbleThumbnail />, "ton-pilot": <TonPilotThumbnail />,
    tipwall: <TipWallThumbnail />, "deadman-vault": <DeadmanVaultThumbnail />, clarityquest: <ClarityQuestThumbnail />,
    "proof-of-rest": <ProofOfRestThumbnail />, expatship: <ExpatShipThumbnail />, tasky: <TaskyThumbnail />,
  };
  return <div className="thumbnail-wrap">{thumbnails[id] ?? null}</div>;
}

function ProjectCard({ project, visible }: { project: (typeof featuredProjects)[number]; visible?: boolean }) {
  const { setActive } = useConstellation();
  return (
    <TiltCard className={`reveal ${visible ? "visible" : ""}`}>
      <div
        className="project-card"
        style={{ "--accent-gradient": project.accentGradient, "--hover-border": project.hoverBorder } as React.CSSProperties}
        onMouseEnter={() => setActive(project.chain)}
        onMouseLeave={() => setActive(null)}
      >
        <div className="accent-bar" />
        <ProjectThumbnail id={project.id} />
        <div className="card-body">
          <span className={`badge badge-${project.badgeType}`}>{project.badge}</span>
          <span className="chain-tag" style={{ color: project.linkColor }}>{project.categories[0]}</span>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => (<span key={tag} className="tag-pill">{tag}</span>))}
          </div>
          <div className="links-row">
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: project.linkColor }}>
              View Website <span className="link-arrow">→</span>
            </a>
            {"repo" in project && project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link repo-link">
                Code <span className="link-arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const { setActive } = useConstellation();

  const match = (chain: string) => filter === "All" || chain === filter;
  const featured = featuredProjects.filter((p) => match(p.chain));
  const archived = archivedProjects.filter((p) => match(p.chain));

  const pick = (f: string) => { setFilter(f); setTouched(true); };

  return (
    <section id="work" className="projects section">
      <div className="section-label reveal">02 — The Work</div>
      <h2 className="section-title reveal">
        A Living <span className="gradient-text">Constellation</span>
      </h2>

      <div className="stats-row reveal">
        <span><b className="stat-orange">{featuredProjects.length + archivedProjects.length}</b> projects</span>
        <span className="stat-sep">·</span>
        <span><b className="stat-purple">{CHAINS.length}</b> chains</span>
        <span className="stat-sep">·</span>
        <span><b className="stat-cyan">6</b> featured</span>
      </div>

      {/* Chain filter — selecting a chain re-lights that node in the field */}
      <div className="filter-row reveal">
        <button className={`chip ${filter === "All" ? "active" : ""}`} onClick={() => pick("All")}>All</button>
        {CHAINS.map((c) => (
          <button
            key={c.id}
            className={`chip ${filter === c.id ? "active" : ""}`}
            style={{ "--chip": c.color } as React.CSSProperties}
            onClick={() => pick(c.id)}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="featured-grid">
        {featured.map((p) => (<ProjectCard key={p.id} project={p} visible={touched} />))}
      </div>

      {featured.length === 0 && (
        <div className="empty-note">— nothing on this chain yet —</div>
      )}

      {/* Archive drawer — the rest of the work, one click away */}
      <div className="archive">
        <button
          className="archive-toggle reveal"
          onClick={() => setArchiveOpen((o) => !o)}
          aria-expanded={archiveOpen}
        >
          <span className="archive-line" />
          {archiveOpen ? "Hide the archive" : `Open the archive · ${archivedProjects.length} more transmissions`}
          <span className={`archive-caret ${archiveOpen ? "up" : ""}`}>⌄</span>
        </button>

        <div className={`archive-panel ${archiveOpen ? "open" : ""}`}>
          <div className="archive-grid">
            {archived.map((p) => (<ProjectCard key={p.id} project={p} visible={touched} />))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .projects { position: relative; }
        .stats-row {
          display: flex; align-items: center; gap: 0.9rem;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 2rem;
        }
        .stats-row b { font-weight: 500; font-size: 0.85rem; }
        .stat-orange { color: var(--orange); }
        .stat-purple { color: var(--purple); }
        .stat-cyan { color: var(--cyan); }
        .stat-sep { color: var(--border); }

        .filter-row { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 3rem; }
        .chip {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em;
          padding: 0.4rem 0.95rem; border: 1px solid var(--border); border-radius: 2px;
          background: transparent; color: var(--muted); cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .chip:hover { color: var(--white); border-color: rgba(255,255,255,0.3); }
        .chip.active {
          color: var(--chip, var(--orange)); border-color: var(--chip, var(--orange));
          background: color-mix(in srgb, var(--chip, var(--orange)) 14%, transparent);
        }

        /* Featured = hero scale (2-up on desktop) */
        .featured-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 1100px;
        }
        .archive-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; max-width: 1100px;
        }

        .project-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 6px;
          position: relative; overflow: hidden; transition: border-color 0.3s ease;
          display: flex; flex-direction: column; height: 100%;
        }
        .project-card:hover { border-color: var(--hover-border); }
        .card-body { padding: 1.6rem 2rem 2rem; display: flex; flex-direction: column; gap: 1.1rem; flex: 1; }
        .accent-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent-gradient); z-index: 1; }
        .chain-tag {
          font-family: var(--font-dm-mono), "DM Mono", monospace; font-size: 0.6rem;
          text-transform: uppercase; letter-spacing: 0.16em; margin-top: -0.6rem;
          display: inline-block;
        }
        .badge {
          display: inline-block; font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
          padding: 0.25rem 0.6rem; border-radius: 2px; border: 1px solid; width: fit-content;
        }
        .badge-orange { color: var(--orange); border-color: var(--orange); background: rgba(255,95,31,0.15); }
        .badge-purple { color: var(--purple); border-color: var(--purple); background: rgba(155,89,245,0.15); }
        .badge-cyan { color: var(--cyan); border-color: var(--cyan); background: rgba(0,212,255,0.15); }
        .project-name { font-family: var(--font-bebas), "Bebas Neue", cursive; font-size: 2.5rem; color: var(--white); line-height: 1; }
        .project-desc { font-size: 0.92rem; line-height: 1.75; color: rgba(240,237,230,0.72); }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; }
        .tag-pill {
          font-family: var(--font-dm-mono), "DM Mono", monospace; font-size: 0.65rem;
          text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted);
          border: 1px solid var(--border); background: rgba(255,255,255,0.04);
          padding: 0.2rem 0.6rem; border-radius: 2px;
        }
        .links-row { display: flex; align-items: center; gap: 1.5rem; }
        .project-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace; font-size: 0.78rem;
          text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem; width: fit-content;
          transition: gap 0.2s ease;
        }
        .project-link:hover { gap: 0.8rem; }
        .link-arrow { transition: transform 0.2s ease; }
        .project-link:hover .link-arrow { transform: translateX(3px); }
        .repo-link { color: var(--muted); }
        .repo-link:hover { color: var(--white); }
        .empty-note {
          font-family: var(--font-dm-mono), "DM Mono", monospace; font-size: 0.8rem;
          letter-spacing: 0.15em; color: var(--muted); padding: 3rem 0;
        }

        /* Archive drawer */
        .archive { margin-top: 4rem; }
        .archive-toggle {
          display: flex; align-items: center; gap: 1rem; width: 100%;
          font-family: var(--font-dm-mono), "DM Mono", monospace; font-size: 0.72rem;
          text-transform: uppercase; letter-spacing: 0.14em; color: var(--cyan);
          background: transparent; border: none; border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border); padding: 1.4rem 0; cursor: pointer;
          transition: color 0.2s ease;
        }
        .archive-toggle:hover { color: var(--white); }
        .archive-line { flex: 0 0 40px; height: 1px; background: var(--border); }
        .archive-caret { transition: transform 0.3s ease; font-size: 1rem; }
        .archive-caret.up { transform: rotate(180deg); }
        .archive-panel {
          display: grid; grid-template-rows: 0fr; overflow: hidden;
          transition: grid-template-rows 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .archive-panel.open { grid-template-rows: 1fr; }
        .archive-panel > .archive-grid {
          min-height: 0; padding-top: 2.5rem;
        }

        @media (max-width: 1000px) {
          .featured-grid { grid-template-columns: 1fr; }
          .archive-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .archive-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <style jsx global>{`
        .thumbnail-wrap {
          height: 168px; background: #04040a; overflow: hidden; flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @keyframes vozPulse { from { transform: scaleY(0.35); } to { transform: scaleY(1.15); } }
        @keyframes fillIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes rowIn { from { opacity: 0; transform: translateX(-7px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes softBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes dotPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.7); opacity: 0.5; } }
        @keyframes ekgDraw { from { stroke-dashoffset: 240; } to { stroke-dashoffset: -240; } }
        .project-card:hover .viz-bar { animation: vozPulse 0.65s ease-in-out infinite alternate; }
        .project-card:hover .fill-bar { transform-origin: left; animation: fillIn 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .project-card:hover .row-stagger { animation: rowIn 0.4s ease-out both; }
        .project-card:hover .blink-soft { animation: softBlink 1s ease-in-out infinite; }
        .pulse-dot { animation: dotPulse 1.6s ease-in-out infinite; }
        .cursor-blink { animation: softBlink 1.1s steps(1) infinite; }
        .ekg-line { stroke-dasharray: 60 180; stroke-dashoffset: 240; animation: ekgDraw 2.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .project-card:hover .viz-bar, .project-card:hover .fill-bar, .project-card:hover .row-stagger,
          .project-card:hover .blink-soft, .pulse-dot, .cursor-blink, .ekg-line { animation: none; }
          .ekg-line { stroke-dasharray: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
