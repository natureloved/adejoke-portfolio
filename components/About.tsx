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
            I&apos;m <strong>Akinola Adejoke</strong>. Curiosity took me down
            the building hole and I never came back.
          </p>
          <p className="about-para reveal">
            I build full-stack DeFi products — smart contracts, frontends, and
            everything in between. Bitcoin L2 is where I&apos;m most obsessed
            right now, because the infrastructure is still being written and the
            problems are still worth solving.
          </p>
          <p className="about-para reveal">
            I believe the tools of financial freedom should be open, accessible,
            and beautifully built.
          </p>
          <p className="about-para reveal">
            Every line of code is proof that we&apos;re here, we&apos;re
            shipping, and we&apos;re not waiting for permission.
          </p>
        </div>

        {/* Right — Stats */}
        <div className="stats-grid">
          <StatCard number="3" label="Blockchain Languages" />
          <StatCard number="6+" label="Programs & Fellowships" />
          <StatCard number="4" label="Live DeFi Projects" />
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
