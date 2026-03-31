"use client";

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="stat-card reveal">
      <span className="stat-number gradient-text">{number}</span>
      <span className="stat-label">{label}</span>
      <style jsx>{`
        .stat-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.5rem;
          transition: border-color 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .stat-card:hover {
          border-color: var(--orange);
          transform: translateY(-4px);
        }
        .stat-number {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: 3rem;
          line-height: 1;
        }
        .stat-label {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-label reveal">01 — About</div>
      <h2 className="section-title reveal">Who I Am</h2>

      <div className="about-grid">
        {/* Left — Text */}
        <div className="about-text">
          <p className="about-para reveal">
            I&apos;m <strong>Akinola Adejoke Elizabeth</strong> — a full-stack developer
            building at the frontier of Bitcoin finance. I work across the entire stack,
            from writing smart contracts in <strong>Clarity</strong>, <strong>Solidity</strong>,
            and <strong>Cairo</strong> to crafting polished frontends with Next.js and React.
          </p>
          <p className="about-para reveal">
            My flagship project, <strong>Staxiq</strong>, is a Bitcoin DeFi aggregator —
            think Zerion, but for Bitcoin&apos;s L2 ecosystem. I&apos;m also deeply invested
            in the African Web3 community, having completed and joined multiple fellowships
            focused on bringing more African builders to the decentralized web.
          </p>
          <p className="about-para reveal">
            I believe the tools of financial freedom should be open, accessible, and
            beautifully built. That&apos;s what I&apos;m here to create.
          </p>
        </div>

        {/* Right — Stats */}
        <div className="stats-grid">
          <StatCard number="3" label="Blockchain Languages" />
          <StatCard number="6+" label="Programs & Fellowships" />
          <StatCard number="2" label="Live DeFi Projects" />
          <StatCard number="∞" label="Problems Left to Solve" />
        </div>
      </div>

      <style jsx>{`
        .about {
          background: var(--surface);
          padding: 7rem 4rem 7rem 6rem;
          position: relative;
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

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          max-width: 1100px;
          align-items: start;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .about-para {
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(240, 237, 230, 0.75);
          font-family: var(--font-syne), "Syne", sans-serif;
        }

        .about-para strong {
          color: var(--white);
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .about {
            padding: 5rem 2rem 5rem 3rem;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
