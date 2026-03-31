"use client";

type Program = {
  name: string;
  status: "active" | "completed";
  href?: string;
  description: string;
};

const programs: Program[] = [
  {
    name: "Dev3Pack",
    status: "active",
    href: "https://x.com/dev3pack",
    description:
      "Web3 fellowship helping developers transition from Web2 to decentralized technologies.",
  },
  {
    name: "Dada Devs",
    status: "active",
    href: "https://x.com/dadadevs",
    description:
      "Africa's community for women building in the Bitcoin and Web3 ecosystem.",
  },
  {
    name: "Urbe Campus",
    status: "active",
    href: "https://x.com/urbeeth",
    description:
      "Intensive Ethereum developer residency run by the Rome-based Web3 community.",
  },
  {
    name: "DeFi Bootcamp",
    status: "active",
    description:
      "Advanced technical training in decentralized finance protocols and architecture.",
  },
  {
    name: "Bitcoin Dada",
    status: "completed",
    href: "https://x.com/btc_dada",
    description:
      "Pioneer cohort of African women learning and building on the Bitcoin network.",
  },
  {
    name: "StarkNet",
    status: "completed",
    href: "https://x.com/starknet",
    description:
      "Official StarkNet developer program — Cairo language and ZK-rollup fundamentals.",
  },
];

function ProgramCard({ program }: { program: Program }) {
  const isActive = program.status === "active";
  const hoverBorder = isActive ? "var(--cyan)" : "var(--muted)";

  const CardContent = (
    <>
      <div className="status-row">
        <span className={`status-dot ${isActive ? "dot-active" : "dot-done"}`} />
        <span className={`status-text ${isActive ? "text-active" : "text-done"}`}>
          {isActive ? "Active" : "Completed"}
        </span>
      </div>
      <h3 className="program-name">{program.name}</h3>
      <p className="program-desc">{program.description}</p>
    </>
  );

  const cardStyle = { "--hover-border": hoverBorder } as React.CSSProperties;

  return (
    <div className="program-card-wrapper reveal">
      {program.href ? (
        <a
          href={program.href}
          target="_blank"
          rel="noopener noreferrer"
          className="program-card"
          style={cardStyle}
        >
          {CardContent}
        </a>
      ) : (
        <div className="program-card" style={cardStyle}>
          {CardContent}
        </div>
      )}

      <style jsx>{`
        .program-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.8rem;
          text-decoration: none;
          color: var(--white);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          height: 100%;
          transition: transform 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        a.program-card {
          cursor: pointer;
        }
        .program-card:hover {
          transform: translateY(-4px);
          border-color: var(--hover-border);
        }
        .status-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-active {
          background: #00ff00;
          box-shadow: 0 0 8px #00ff00;
          animation: blink 1.2s step-end infinite;
        }
        .dot-done {
          background: #ff5f1f;
          box-shadow: 0 0 4px #ff5f1f;
        }
        .status-text {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .text-active {
          color: #00ff00;
        }
        .text-done {
          color: #ff5f1f;
        }
        .program-name {
          font-family: var(--font-syne), "Syne", sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--white);
        }
        .program-desc {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="programs">
      <div className="section-label reveal">04 — Programs</div>
      <div className="section-title reveal">
        Fellowships &amp;
        <br />
        Recognitions
      </div>

      <div className="programs-grid">
        {programs.map((program) => (
          <ProgramCard key={program.name} program={program} />
        ))}
      </div>

      <style jsx>{`
        .programs {
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
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1100px;
        }
        @media (max-width: 900px) {
          .programs {
            padding: 5rem 2rem 5rem 3rem;
          }
          .programs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
