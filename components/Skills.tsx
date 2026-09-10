"use client";

const groups = [
  {
    label: "Build",
    items: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "Supabase"],
  },
  {
    label: "On-chain",
    items: ["Clarity", "Solidity", "Cairo", "Stacks", "EVM", "Solana"],
  },
  {
    label: "Product",
    items: ["UX direction", "Rapid prototyping", "API design", "Technical writing", "Shipping", "Collaboration"],
  },
];

export default function Skills() {
  return (
    <section id="stack" className="section stack-section">
      <div className="site-grid">
        <p className="section-label reveal">03 / Stack</p>
        <div className="stack-heading-row">
          <h2 className="section-title reveal">The tools change. The standard stays high.</h2>
          <p className="section-intro reveal">A practical stack for moving quickly without losing clarity, accessibility, or the thread of the original idea.</p>
        </div>

        <div className="stack-groups">
          {groups.map((group) => (
            <div className="stack-group reveal" key={group.label}>
              <h3>{group.label}</h3>
              <div className="stack-items">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stack-section { border-top: 1px solid var(--border-soft); }
        .stack-heading-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, 0.6fr); gap: 3rem; align-items: end; }
        .stack-heading-row .section-intro { margin: 0 0 0.35rem auto; }
        .stack-groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 4rem; border: 1px solid var(--border); background: var(--border); }
        .stack-group { min-height: 16rem; padding: 1.5rem; background: var(--bg); }
        .stack-group h3 { margin: 0; color: var(--orange); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
        .stack-items { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 2.25rem; align-content: flex-start; }
        .stack-items span { padding: 0.55rem 0.7rem; border: 1px solid var(--border); color: var(--white); font-size: 0.82rem; }
        .stack-items span:hover { border-color: var(--lime); color: var(--lime); }
        @media (max-width: 820px) { .stack-heading-row { grid-template-columns: 1fr; gap: 1rem; } .stack-heading-row .section-intro { margin: 0; } .stack-groups { grid-template-columns: 1fr; } .stack-group { min-height: auto; } }
      `}</style>
    </section>
  );
}
