"use client";

import { CHAINS } from "@/data/chains";
import { projects } from "@/data/projects";

const capabilities = [
  {
    number: "01",
    title: "Product thinking",
    text: "I turn fuzzy ideas into clear, useful experiences with a sharp point of view.",
  },
  {
    number: "02",
    title: "Full-stack craft",
    text: "I can carry a product from contract and data layer through to the interface and launch.",
  },
  {
    number: "03",
    title: "On-chain fluency",
    text: "I build across Bitcoin L2, EVM, Solana, TON, and the ecosystems growing around them.",
  },
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="site-grid">
        <p className="section-label reveal">01 / About</p>
        <h2 className="section-title reveal">The work sits where product, code, and curiosity meet.</h2>

        <div className="about-layout">
          <div className="about-copy reveal">
            <p>
              I&apos;m Akinola Adejoke, a full-stack and multi-chain developer based in Lagos. I build products that make complex systems easier to understand and more useful to the people they serve.
            </p>
            <p>
              My work spans DeFi, creator tools, education, automation, and cross-border services. I care about the details that turn a technically impressive idea into something people return to.
            </p>
            <div className="about-location"><span aria-hidden="true" /> Lagos, Nigeria / working globally</div>
          </div>

          <div className="capability-list">
            {capabilities.map((item) => (
              <div className="capability reveal" key={item.number}>
                <span className="capability-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-stats reveal" aria-label="Portfolio summary">
          <div><strong>{projects.length}</strong><span>products shipped</span></div>
          <div><strong>{CHAINS.length}</strong><span>ecosystems explored</span></div>
          <div><strong>3</strong><span>smart contract languages</span></div>
          <div><strong>1</strong><span>curious mind</span></div>
        </div>
      </div>

      <style jsx>{`
        .about-section { border-top: 1px solid var(--border-soft); }
        .about-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 0.85fr); gap: clamp(3rem, 9vw, 9rem); margin-top: 4rem; }
        .about-copy { max-width: 560px; color: var(--muted); font-size: 1.08rem; line-height: 1.8; }
        .about-copy p + p { margin-top: 1.35rem; }
        .about-location { display: flex; align-items: center; gap: 0.55rem; margin-top: 2rem; color: var(--cyan); font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.05em; text-transform: uppercase; }
        .about-location span { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--cyan); }
        .capability-list { border-top: 1px solid var(--border); }
        .capability { display: grid; grid-template-columns: 2.5rem 1fr; gap: 1rem; padding: 1.25rem 0; border-bottom: 1px solid var(--border-soft); }
        .capability-number { color: var(--orange); font-family: var(--font-mono); font-size: 0.68rem; }
        .capability h3 { margin: 0; color: var(--white); font-size: 1rem; font-weight: 600; }
        .capability p { margin: 0.45rem 0 0; color: var(--muted); font-size: 0.86rem; line-height: 1.65; }
        .about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 5rem; border-block: 1px solid var(--border); background: var(--border); }
        .about-stats div { display: grid; gap: 0.45rem; min-height: 7.5rem; padding: 1.4rem; background: var(--bg); }
        .about-stats strong { color: var(--lime); font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.05em; }
        .about-stats span { color: var(--muted); font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.06em; text-transform: uppercase; }
        @media (max-width: 820px) { .about-layout { grid-template-columns: 1fr; gap: 3rem; } }
        @media (max-width: 620px) { .about-stats { grid-template-columns: repeat(2, 1fr); margin-top: 3.5rem; } .about-stats div { min-height: 6.5rem; padding: 1rem; } .about-copy { font-size: 1rem; } }
      `}</style>
    </section>
  );
}
