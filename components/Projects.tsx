"use client";

import TiltCard from "./TiltCard";

const projects = [
  {
    id: "voz",
    name: "Voz",
    badge: "HACKATHON - DEV3PACK",
    badgeType: "orange" as const,
    description:
      "A voice-first cross-border remittance app. Senders speak their payment intent in natural language, which is parsed by Claude and settled instantly via LI.FI across chains directly into the recipient's Solana wallet.",
    tags: ["Voice AI", "LI.FI", "Claude", "Solana", "Next.js"],
    href: "https://voz-three.vercel.app/",
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
  },
  {
    id: "hashpilot",
    name: "HashPilot",
    badge: "HACKATHON - HASHATHON",
    badgeType: "purple" as const,
    description:
      "A production-grade, retro-futuristic \"Mining Intelligence Terminal\" built exclusively for the Club HashCash ecosystem on Avalanche. It combines real-time blockchain data with advanced AI modeling to provide miners with tactical decision support.",
    tags: ["AI", "Next.js", "Anthropic", "Strategy"],
    href: "https://hashpilot-taupe.vercel.app/",
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
  },
  {
    id: "stashflow",
    name: "StashFlow",
    badge: "HACKATHON - DEFI MULLET",
    badgeType: "cyan" as const,
    description:
      "Goal-based DeFi savings powered by LI.FI Earn. A goal based defi savings platform powered by LI.FI EARN that allows users to easily manage their savings goals, deposit into yield-generating vaults, and monitor their portfolio seamlessly.",
    tags: ["DeFi", "LI.FI", "Next.js", "Web3"],
    href: "https://stashflow-two.vercel.app/",
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
  },
  {
    id: "staxiq",
    name: "Staxiq",
    badge: "Flagship Project",
    badgeType: "orange" as const,
    description:
      "The Zerion of Bitcoin L2. Staxiq is a unified DeFi aggregator and AI copilot built on the Stacks blockchain — letting users discover, compare, and manage Bitcoin DeFi protocols in one place.",
    tags: ["Stacks", "Clarity", "Next.js", "React", "DefiLlama API"],
    href: "https://staxiq.vercel.app/",
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
  },
  {
    id: "runes-rumble",
    name: "Runes Rumble",
    badge: "Hackathon · MIDL",
    badgeType: "purple" as const,
    description:
      "A prediction market for Runes — Bitcoin's newest token standard. Built for the MIDL Hackathon, Runes Rumble lets users bet on Rune price movements in a trustless environment.",
    tags: ["Bitcoin", "Runes", "Prediction Market", "On-chain"],
    href: "https://runes-rumble.vercel.app/",
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
  },
  {
    id: "ton-pilot",
    name: "TonPilot",
    badge: "HACKATHON - TON",
    badgeType: "cyan" as const,
    description:
      "An agentic wallet automation tool for the TON ecosystem. TonPilot streamlines on-chain interactions through an intelligent Telegram bot interface, focusing on security and ease of use.",
    tags: ["TON", "TypeScript", "Telegram API", "Automation"],
    href: "https://t.me/TonAutoPilotBot",
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
  },
];

// ─── Thumbnail components ────────────────────────────────────────

function Chrome({ label, accent }: { label: string; accent: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '7px 12px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {['#ff5564', '#ffbd2e', '#27c93f'].map(c => (
          <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
        ))}
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: 9, color: accent, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

function VozThumbnail() {
  const bars = [22, 38, 28, 52, 40, 58, 32, 48, 36, 60, 30, 54, 44, 62, 28, 46, 56, 38, 42, 64];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="VOZ — LIVE" accent="#ff5f1f" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '0 16px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              width: 4,
              height: h,
              background: i % 3 === 0 ? '#ff5f1f' : i % 3 === 1 ? '#9b59f5' : 'rgba(155,89,245,0.3)',
              borderRadius: 2,
            }} />
          ))}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(240,237,230,0.4)', letterSpacing: '0.04em' }}>
          "send $50 usdc to sarah via li.fi"
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, color: '#27c93f', letterSpacing: '0.1em' }}>PROCESSING — SOLANA</span>
        </div>
      </div>
    </div>
  );
}

function HashPilotThumbnail() {
  const rows = [
    { label: 'HASH RATE', value: '847.3 TH/s', color: '#00d4ff' },
    { label: 'BLOCK', value: '#892,441', color: 'rgba(240,237,230,0.45)' },
    { label: 'EFFICIENCY', value: '94.2%', color: '#27c93f' },
    { label: 'AI SIGNAL', value: '▲ BUY', color: '#ff5f1f' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="HASHPILOT — TERMINAL" accent="#9b59f5" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 14px', gap: 7 }}>
        {rows.map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 9 }}>
            <span style={{ color: '#6b6b80' }}>{'>'} {r.label}</span>
            <span style={{ color: r.color, fontWeight: 600 }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StashFlowThumbnail() {
  const goals = [
    { label: 'Emergency Fund', pct: 82, color: '#00d4ff' },
    { label: 'Vacation Trip', pct: 45, color: '#9b59f5' },
    { label: 'MacBook Pro', pct: 100, color: '#ff5f1f' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="STASHFLOW — GOALS" accent="#00d4ff" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 14px', gap: 9 }}>
        {goals.map(g => (
          <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(240,237,230,0.45)' }}>
              <span>{g.label}</span>
              <span style={{ color: g.color }}>{g.pct}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${g.pct}%`, background: g.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
        <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#27c93f', marginTop: 1 }}>
          ↑ Yield earned: $127.40
        </div>
      </div>
    </div>
  );
}

function StaxiqThumbnail() {
  const protocols = [
    { name: 'ALEX Protocol', tvl: '$124.3M', change: '+2.3%', up: true },
    { name: 'Velar DEX', tvl: '$89.1M', change: '+5.1%', up: true },
    { name: 'Bitflow', tvl: '$67.8M', change: '-0.8%', up: false },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="STAXIQ — BITCOIN L2" accent="#ff5f1f" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6px 14px', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 7.5, color: '#6b6b80', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 4, marginBottom: 2 }}>
          <span>PROTOCOL</span><span>TVL</span><span>24H</span>
        </div>
        {protocols.map(p => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 8.5 }}>
            <span style={{ color: 'rgba(240,237,230,0.65)' }}>{p.name}</span>
            <span style={{ color: 'rgba(240,237,230,0.4)' }}>{p.tvl}</span>
            <span style={{ color: p.up ? '#27c93f' : '#ff5f1f' }}>{p.change}</span>
          </div>
        ))}
        <div style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#9b59f5', marginTop: 3 }}>
          ⬡ Powered by Stacks Blockchain
        </div>
      </div>
    </div>
  );
}

function RunesRumbleThumbnail() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="RUNES RUMBLE — LIVE" accent="#9b59f5" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 14px', gap: 8 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(240,237,230,0.55)', letterSpacing: '0.04em' }}>
          DOG•GO•TO•THE•MOON (RUNE)
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#6b6b80' }}>
          Will price exceed $0.05 by Friday?
        </div>
        <div style={{ display: 'flex', height: 22, borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ width: '64%', background: 'rgba(155,89,245,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 8.5, color: '#9b59f5' }}>
            YES 64%
          </div>
          <div style={{ flex: 1, background: 'rgba(255,95,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 8.5, color: 'rgba(255,95,31,0.65)' }}>
            NO 36%
          </div>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 7.5, color: '#6b6b80' }}>
          Pool: 2.4 BTC · Closes in 11h 32m
        </div>
      </div>
    </div>
  );
}

function TonPilotThumbnail() {
  const messages = [
    { from: 'user', text: '/stake 100 TON to LP' },
    { from: 'bot', text: '✓ Staked to Dedust. APY: 18.4%' },
    { from: 'user', text: '/balance' },
    { from: 'bot', text: '💎 3,421 TON (~$18,491)' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Chrome label="TONPILOT — BOT" accent="#00d4ff" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6px 12px', gap: 4 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 8.5,
              padding: '3px 8px',
              borderRadius: m.from === 'user' ? '7px 7px 2px 7px' : '7px 7px 7px 2px',
              background: m.from === 'user' ? 'rgba(0,212,255,0.13)' : 'rgba(255,255,255,0.04)',
              color: m.from === 'user' ? '#00d4ff' : 'rgba(240,237,230,0.55)',
              border: `1px solid ${m.from === 'user' ? 'rgba(0,212,255,0.22)' : 'rgba(255,255,255,0.05)'}`,
              maxWidth: '80%',
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectThumbnail({ id }: { id: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    voz: <VozThumbnail />,
    hashpilot: <HashPilotThumbnail />,
    stashflow: <StashFlowThumbnail />,
    staxiq: <StaxiqThumbnail />,
    'runes-rumble': <RunesRumbleThumbnail />,
    'ton-pilot': <TonPilotThumbnail />,
  };
  return (
    <div className="thumbnail-wrap">
      {thumbnails[id] ?? null}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-label reveal">02 — Projects</div>
      <h2 className="section-title reveal">What I&apos;ve Built</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <TiltCard key={project.id} className="reveal">
            <div
              className="project-card"
              style={
                {
                  "--accent-gradient": project.accentGradient,
                  "--hover-border": project.hoverBorder,
                } as React.CSSProperties
              }
            >
              {/* Top accent bar (sits above thumbnail) */}
              <div className="accent-bar" />

              {/* Thumbnail mockup */}
              <ProjectThumbnail id={project.id} />

              {/* Badge */}
              <span className={`badge badge-${project.badgeType}`}>{project.badge}</span>

              {/* Name */}
              <h3 className="project-name">{project.name}</h3>

              {/* Description */}
              <p className="project-desc">{project.description}</p>

              {/* Tags */}
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{ color: project.linkColor }}
              >
                View Website <span className="link-arrow">→</span>
              </a>
            </div>
          </TiltCard>
        ))}
      </div>

      <style jsx>{`
        .projects {
          background: var(--bg);
          padding: 7rem 4rem 7rem 6rem;
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
          margin-bottom: 4rem;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1100px;
        }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          height: 100%;
        }
        .project-card:hover {
          border-color: var(--hover-border);
        }
        /* Thumbnail lives flush at the top, padding starts below it */
        :global(.thumbnail-wrap) {
          height: 168px;
          background: #04040a;
          overflow: hidden;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        /* Card content after thumbnail gets padding */
        .project-card > :not(.accent-bar):not(:global(.thumbnail-wrap)) {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .project-card > .badge { padding-top: 1.5rem; }
        .project-card > .project-link { padding-bottom: 2rem; }
        .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-gradient);
          z-index: 1;
        }
        .badge {
          display: inline-block;
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
          border: 1px solid;
          width: fit-content;
        }
        .badge-orange {
          color: var(--orange);
          border-color: var(--orange);
          background: rgba(255, 95, 31, 0.15);
        }
        .badge-purple {
          color: var(--purple);
          border-color: var(--purple);
          background: rgba(155, 89, 245, 0.15);
        }
        .badge-cyan {
          color: var(--cyan);
          border-color: var(--cyan);
          background: rgba(0, 212, 255, 0.15);
        }
        .project-name {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 2.5rem;
          color: var(--white);
          line-height: 1;
        }
        .project-desc {
          font-size: 0.92rem;
          line-height: 1.75;
          color: rgba(240, 237, 230, 0.72);
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }
        .tag-pill {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.2rem 0.6rem;
          border-radius: 2px;
        }
        .project-link {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          width: fit-content;
          transition: gap 0.2s ease;
        }
        .project-link:hover { gap: 0.8rem; }
        .link-arrow { transition: transform 0.2s ease; }
        .project-link:hover .link-arrow { transform: translateX(3px); }

        @media (max-width: 900px) {
          .projects { padding: 5rem 2.5rem 5rem 3.5rem; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
