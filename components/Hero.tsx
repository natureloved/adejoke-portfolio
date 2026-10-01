import Image from "next/image";
import { FLAGSHIPS } from "@/data/work";
import { HERO_PROOF, POSITIONING, SITE } from "@/lib/site";
import { ContactTrigger } from "./ContactContext";
import { Eyebrow, Icon } from "./ui";
import ReadingToggle from "./ReadingToggle";

export default function Hero() {
  // The art board frames a real screenshot of a real deployment rather than an
  // invented dashboard, so the largest visual on the page is also evidence.
  const shot = FLAGSHIPS[0].shot;
  const host = FLAGSHIPS[0].links.live;

  return (
    <section className="container hero" id="top" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <Eyebrow className="hero-eyebrow">Full-stack &amp; blockchain developer</Eyebrow>

        <h1 id="hero-heading">
          I build software that <em>moves money</em> and saves people work.
        </h1>

        <p className="hero-description">
          I&rsquo;m {SITE.name}, a full-stack and blockchain developer based in {SITE.location}.{" "}
          <strong>
            I design and build software for Bitcoin Layer-2s, on-chain agents, and the
            institutions that depend on it.
          </strong>{" "}
          Most of it ships live, open source, and linked below.
        </p>

        <div data-plain className="hero-description">
          {POSITIONING.plain}
        </div>
        <div data-tech className="hero-description">
          {POSITIONING.technical}
        </div>

        <div className="hero-actions">
          <a className="btn" href="#work">
            See the work
            <Icon name="i-arrow-down" />
          </a>
          <ContactTrigger className="btn btn-outline hero-secondary">
            Start a conversation
          </ContactTrigger>
          <a className="btn btn-outline hero-secondary" href={SITE.resume} download>
            Résumé
            <Icon name="i-download" />
          </a>
        </div>

        <div className="hero-actions" style={{ marginTop: 18 }}>
          <ReadingToggle />
          {/*
            The switch used to sit here unlabelled. "Plain" and "Technical"
            are meaningless to the reader who most needs the choice, so the
            hint is the sentence that tells them what they are choosing
            between. The reassurance line removed alongside it ("Jargon
            explained in the FAQ") pointed at the same thing twice.
          */}
          <span data-plain className="hero-reassurance" style={{ margin: 0 }}>
            <Icon name="i-message" />
            Not a developer? Start in Plain, every term is explained.
          </span>
        </div>

        <dl className="hero-stats">
          {HERO_PROOF.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
              <dd className="stat-note">{item.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="art-board" />
        <span className="art-label">REAL CODE. REAL DEPLOYMENTS.</span>

        <div className="browser-window">
          <div className="browser-chrome">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="browser-address">
              {host ? host.replace(/^https?:\/\//, "").replace(/\/$/, "") : "drawbound.app"}
            </div>
            <Icon name="i-plus" />
          </div>
          <Image
            className="browser-shot"
            src={shot.src}
            alt=""
            width={1200}
            height={750}
            sizes="(max-width: 780px) 100vw, 560px"
            priority
          />
        </div>

        <div className="deploy-card">
          <span className="deploy-check">
            <Icon name="i-check" />
          </span>
          <div>
            <strong>Borrow without handing over.</strong>
            <small>DrawBound, live on signet.</small>
          </div>
        </div>

        <div className="code-card">
          <div className="code-header">
            <i />
            loan-health.ts
            <Icon name="i-code" />
          </div>
          <pre>
            <span className="code-line-num">1</span>
            <span className="code-purple">const</span> health ={' '}
            <span className="code-yellow">verify</span>({'{'}
            {'\n'}
            <span className="code-line-num">2</span> proof, vault, action
            {'\n'}
            <span className="code-line-num">3</span>
            {'}'});
          </pre>
        </div>

        <div className="art-note">
          <svg className="note-arrow" viewBox="0 0 65 36">
            <path d="M52 32C58 13 32 1 8 11m0 0 9-1M8 11l6 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Nice on the surface. Solid underneath.
        </div>
      </div>
    </section>
  );
}
