"use client";

type Program = {
  name: string;
  status: "active" | "completed";
  href?: string;
  description: string;
};

const programs: Program[] = [
  { name: "Bitcoin Diploma Course", status: "active", description: "Deepening protocol, consensus, and economic understanding of Bitcoin." },
  { name: "Dev3Pack", status: "active", href: "https://x.com/dev3pack", description: "A Web3 fellowship for developers moving from Web2 into decentralized technologies." },
  { name: "Dada Devs", status: "active", href: "https://x.com/dadadevs", description: "A community for women building in the Bitcoin and Web3 ecosystem." },
  { name: "Claude Certified Architect", status: "active", description: "Designing production systems and agentic workflows with Claude." },
  { name: "Urbe Campus", status: "completed", href: "https://x.com/urbeeth", description: "An intensive Ethereum developer residency with the Rome-based Web3 community." },
  { name: "Farcastic Agentic Bootcamp", status: "completed", description: "Building mini-apps and autonomous agents for Farcaster." },
  { name: "DeFi Bootcamp", status: "active", description: "Advanced technical training in decentralized finance protocols and architecture." },
  { name: "Bitcoin Dada", status: "completed", href: "https://x.com/btc_dada", description: "A pioneer cohort of African women learning and building on Bitcoin." },
  { name: "StarkNet", status: "completed", href: "https://x.com/starknet", description: "Cairo language and zero-knowledge rollup fundamentals." },
];

export default function Programs() {
  return (
    <section id="journey" className="section journey-section">
      <div className="site-grid">
        <p className="section-label reveal">04 / Journey</p>
        <div className="journey-heading">
          <h2 className="section-title reveal">Learning in public, building with people.</h2>
          <p className="section-intro reveal">The best work keeps changing you. These are the programs, communities, and rooms that have shaped how I build.</p>
        </div>

        <div className="program-list">
          {programs.map((program, index) => {
            const content = (
              <>
                <span className={`program-status ${program.status}`}><i aria-hidden="true" /> {program.status}</span>
                <span className="program-name">{program.name}</span>
                <span className="program-description">{program.description}</span>
                <span className="program-index">{String(index + 1).padStart(2, "0")}</span>
              </>
            );
            return program.href ? (
              <a className="program-row reveal" href={program.href} target="_blank" rel="noopener noreferrer" key={program.name}>{content}</a>
            ) : (
              <div className="program-row reveal" key={program.name}>{content}</div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .journey-section { border-top: 1px solid var(--border-soft); }
        .journey-heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, 0.6fr); gap: 3rem; align-items: end; }
        .journey-heading .section-intro { margin: 0 0 0.35rem auto; }
        .program-list { margin-top: 4rem; border-top: 1px solid var(--border); }
        .program-row { display: grid; grid-template-columns: 7rem minmax(170px, 0.7fr) minmax(0, 1fr) 2rem; gap: 1.2rem; align-items: center; padding: 1.25rem 0; border-bottom: 1px solid var(--border-soft); color: inherit; text-decoration: none; }
        .program-row:hover { background: rgba(217, 249, 157, 0.04); }
        .program-status { display: inline-flex; align-items: center; gap: 0.45rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.07em; text-transform: uppercase; }
        .program-status i { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--muted); }
        .program-status.active { color: var(--cyan); }
        .program-status.active i { background: var(--cyan); }
        .program-name { color: var(--white); font-size: 0.95rem; font-weight: 600; }
        .program-description { color: var(--muted); font-size: 0.82rem; line-height: 1.5; }
        .program-index { color: var(--orange); font-family: var(--font-mono); font-size: 0.65rem; text-align: right; }
        @media (max-width: 820px) { .journey-heading { grid-template-columns: 1fr; gap: 1rem; } .journey-heading .section-intro { margin: 0; } .program-row { grid-template-columns: 5.5rem 1fr 1.5rem; gap: 0.8rem; } .program-description { grid-column: 2 / 3; } .program-index { grid-column: 3; grid-row: 1; } }
        @media (max-width: 520px) { .program-row { grid-template-columns: 1fr 1.5rem; gap: 0.55rem; } .program-status, .program-name, .program-description { grid-column: 1; } .program-index { grid-column: 2; grid-row: 1; } }
      `}</style>
    </section>
  );
}
