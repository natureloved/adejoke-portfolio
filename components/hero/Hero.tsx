"use client";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow reveal">Full-Stack × Multi-Chain Builder</p>

        <h1 className="hero-name">
          <span className="name-line line-1 kinetic">AKINOLA</span>
          <span className="name-line line-2 kinetic d">ADEJOKE</span>
        </h1>

        <div className="hero-tags reveal">
          <span className="chain-tag">Clarity · Stacks</span>
          <span className="chain-tag">Solidity · EVM</span>
          <span className="chain-tag">Cairo · StarkNet</span>
          <span className="chain-tag">Bitcoin L2</span>
        </div>

        <p className="hero-bio reveal">
          Eight chains. One builder. A living map of everything I&apos;ve shipped —
          move your cursor and feel the gravity of the work.
        </p>

        <div className="hero-ctas reveal">
          <a href="#work" className="btn btn-primary">Enter the universe</a>
          <a href="#signal" className="btn btn-secondary">Open a channel</a>
        </div>

        <div className="scroll-hint reveal">
          <span className="scroll-line" />
          <span className="scroll-text">Scroll to travel through the work</span>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 9rem 6vw 6rem;
          z-index: 1;
        }
        .hero-content { position: relative; z-index: 2; max-width: 1100px; }

        .hero-eyebrow {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.74rem;
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 0.28em;
          margin-bottom: 1.8rem;
        }

        .hero-name {
          font-family: var(--font-bebas), "Bebas Neue", cursive;
          font-size: clamp(3.6rem, 13vw, 11rem);
          line-height: 0.82;
          display: flex;
          flex-direction: column;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1.8rem;
        }
        .name-line { display: block; position: relative; z-index: 2; }
        .line-1 { color: var(--white); text-shadow: 0 12px 50px rgba(0, 0, 0, 0.5); }
        .line-2 {
          background: linear-gradient(90deg, var(--orange), var(--purple), var(--cyan));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 34px rgba(255, 95, 31, 0.25));
        }

        .kinetic {
          clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
          transform: translateY(120px) skewY(10deg);
          opacity: 0;
          filter: blur(20px);
          animation: kinetic-in 1.3s cubic-bezier(1, 0, 0, 1) both;
        }
        .kinetic.d { animation-delay: 0.16s; }
        @keyframes kinetic-in {
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateY(0) skewY(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        .hero-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
        .chain-tag {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.32rem 0.8rem;
          border-radius: 3px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.02);
          color: var(--white);
          transition: all 0.3s ease;
        }
        .chain-tag:hover { background: rgba(255, 255, 255, 0.06); border-color: var(--white); }

        .hero-bio {
          max-width: 560px;
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(240, 237, 230, 0.72);
          margin-bottom: 2.2rem;
        }

        .hero-ctas { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 3.5rem; }
        .btn {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 0.9rem 2.1rem;
          border-radius: 4px;
          border: 1px solid;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .btn-primary { background: var(--orange); color: #06060c; border-color: var(--orange); }
        .btn-primary:hover { background: transparent; color: var(--orange); transform: translateY(-2px); }
        .btn-secondary { background: transparent; color: var(--white); border-color: var(--border); }
        .btn-secondary:hover { border-color: var(--white); transform: translateY(-2px); }

        .scroll-hint { display: flex; align-items: center; gap: 1rem; }
        .scroll-line { width: 42px; height: 1px; background: var(--border); }
        .scroll-text {
          font-family: var(--font-dm-mono), "DM Mono", monospace;
          font-size: 0.78rem;
          color: var(--muted);
          text-transform: lowercase;
          letter-spacing: 0.04em;
        }

        @media (max-width: 900px) {
          .hero { padding: 7rem 7vw 5rem; }
          .hero-name { font-size: clamp(3rem, 15vw, 6rem); }
          .hero-ctas { flex-direction: column; }
          .btn { width: 100%; text-align: center; }
          .scroll-hint { display: none; }
        }
      `}</style>
    </section>
  );
}
