import { ABOUT_FACTS, SITE, STORY } from "@/lib/site";
import { Eyebrow, SectionTitle } from "./ui";

/**
 * A flat illustration of a desk. Decoration, so it is hidden from assistive
 * technology.
 *
 * `preserveAspectRatio` is set to `slice` rather than left at its default
 * `meet`: on a narrow column the box is taller than the artwork is wide, and
 * `meet` letterboxes the drawing with empty bands above and below. `slice`
 * crops, filling the box the way `object-fit: cover` does for an image.
 */
function DeskArt() {
  return (
    <svg
      className="desk-svg"
      viewBox="0 0 520 372"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="520" height="372" fill="#e8e9df" />
      <rect x="0" y="272" width="520" height="100" fill="#e0e1d4" />
      <rect x="34" y="36" width="196" height="128" rx="6" fill="#fbfcf5" stroke="#d8dccb" />
      <rect x="52" y="58" width="120" height="9" rx="4.5" fill="#cdd4be" />
      <rect x="52" y="78" width="160" height="6" rx="3" fill="#dde2d2" />
      <rect x="52" y="92" width="140" height="6" rx="3" fill="#dde2d2" />
      <rect x="52" y="106" width="152" height="6" rx="3" fill="#dde2d2" />
      <rect x="52" y="126" width="86" height="22" rx="4" fill="#e9f0da" />
      <rect x="52" y="126" width="86" height="22" rx="4" fill="none" stroke="#b9c7a2" />
      <rect x="146" y="130" width="62" height="14" rx="3" fill="#d5ddc6" />
      <circle cx="452" cy="96" r="58" fill="#dfe3d2" />
      <circle cx="452" cy="96" r="46" fill="#eef1e4" />
      <rect x="262" y="52" width="120" height="88" rx="6" fill="#fbfcf5" stroke="#d8dccb" />
      <rect x="276" y="68" width="70" height="7" rx="3.5" fill="#cdd4be" />
      <rect x="276" y="84" width="92" height="5" rx="2.5" fill="#dde2d2" />
      <rect x="276" y="96" width="80" height="5" rx="2.5" fill="#dde2d2" />
      <rect x="276" y="114" width="40" height="16" rx="3" fill="#dfe7d2" />
      <rect x="140" y="196" width="240" height="18" rx="4" fill="#2c4531" />
      <rect x="152" y="214" width="216" height="58" rx="4" fill="#f3f5ea" stroke="#d3d8c7" />
      <rect x="164" y="226" width="80" height="6" rx="3" fill="#cfd6c1" />
      <rect x="164" y="240" width="140" height="5" rx="2.5" fill="#dde2d2" />
      <rect x="164" y="252" width="120" height="5" rx="2.5" fill="#dde2d2" />
      <rect x="326" y="240" width="34" height="26" rx="3" fill="#dff3a4" stroke="#c3d98a" />
      <rect x="46" y="236" width="66" height="42" rx="4" fill="#f6f7f0" stroke="#d6dbca" />
      <rect x="58" y="248" width="42" height="5" rx="2.5" fill="#d3d8c7" />
      <rect x="58" y="260" width="32" height="5" rx="2.5" fill="#e0e4d6" />
      <rect x="418" y="228" width="26" height="44" rx="3" fill="#f6f7f0" stroke="#d6dbca" />
      <circle cx="431" cy="288" r="15" fill="#b9c7a2" />
      <path d="M431 280v16M423 288h16" stroke="#8a9b73" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Section 05, "The person".
 *
 * The layout used to be one narrow column of copy beside a short illustration
 * that `align-items: center` floated in the middle of it. Measured at 1440px
 * that was 1601px of copy in a 563px column against a 372px image in a 551px
 * column, with a 614px dead band above the art and nothing to fill the left
 * side of the section.
 *
 * It is now three horizontal bands, which is also how the copy is organised:
 *
 *   1. a header band spanning the full width - the headline on the left, the
 *      two opening paragraphs on the right, so neither runs long on its own
 *   2. a two-column body - the narrative and the problem-solving block on the
 *      left, the chapters and the closing on the right, each at a readable
 *      measure
 *   3. a footer band - the illustration alongside the facts and the
 *      signature, so the art carries weight instead of floating in a gap
 */
export default function Story() {
  return (
    <section className="container about-section" id="about" aria-labelledby="aboutHeading">
      {/* 1. Header band. */}
      <div className="about-head">
        <div className="about-head-text">
          <Eyebrow>05 The person</Eyebrow>
          <SectionTitle id="aboutHeading">
            Not a straight <em>line.</em> That&rsquo;s the point.
          </SectionTitle>
        </div>
        <div className="about-head-copy">
          <p className="about-lead">{STORY.lead}</p>
          <p>{STORY.middle}</p>
        </div>
      </div>

      {/* 2. Body band. */}
      <div className="about-body">
        {/*
          The problem-solving reframe. It is pulled out of the paragraph flow
          and given its own block because it answers "what actually drives
          this person" with four specific examples a reader can check, rather
          than asserting an attitude.
        */}
        <div className="about-drive">
          <h3>{STORY.drive.title}</h3>
          <p>{STORY.drive.body}</p>
          <p>
            <strong>{STORY.drive.close}</strong>
          </p>
        </div>

        <div className="about-chapters-column">
          {/*
            The chapters, ordered first thing to now. Each names a field, a
            role, and what it left behind; together they are the "not a
            straight line" the headline claims, shown rather than asserted.
          */}
          <ol className="about-chapters">
            {STORY.chapters.map((c) => (
              <li key={c.period}>
                <span className="about-chapter-period">{c.period}</span>
                <div>
                  <strong>{c.title}</strong>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="about-closing">{STORY.closing}</p>
        </div>
      </div>

      {/* 3. Footer band. */}
      <div className="about-foot">
        <div className="desk-visual">
          <DeskArt />
          <span className="desk-label">WHERE I WORK</span>
          {/*
            The note sits in the lower band of the illustration, which is
            otherwise a plain surface: the drawing's content stops around
            two thirds down, so the foot reads as dead space without it. It
            also ties the picture to the section's argument instead of being
            decoration beside it.
          */}
          <div className="desk-note">
            <span>Two fields, one instinct.</span>
          </div>
        </div>

        <div className="about-foot-side">
          <div className="about-facts">
            {ABOUT_FACTS.map((f) => (
              <span className="about-fact" key={f}>
                {f}
              </span>
            ))}
          </div>

          <div className="about-signature">
            <span className="signature" aria-hidden="true">
              {SITE.alias}
            </span>
            <small>
              {SITE.name}
              <br />
              {SITE.availability}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
