import { PROCESS, PROCESS_NOTE, WHAT_I_DO } from "@/lib/site";
import { Eyebrow, Icon, SectionTitle } from "./ui";

/** One icon per service, keyed by position so the data stays presentational. */
const ICONS = ["i-window", "i-cube", "i-sparkle"];

export default function Capabilities() {
  return (
    <>
      <section className="container section" id="expertise" aria-labelledby="expertiseHeading">
        <div className="services-panel">
          <div className="services-layout">
            <div className="services-intro">
              <Eyebrow>02 What I do</Eyebrow>
              <SectionTitle id="expertiseHeading">
                Three things, done <em>properly.</em>
              </SectionTitle>
              <p>
                I would rather be genuinely useful in three areas than name-check fifteen
                technologies. These are the problems I have solved end to end, including the
                unglamorous parts.
              </p>
              <p className="plain-language-note">
                <Icon name="i-leaf" />
                No jargon without a definition.
              </p>
            </div>

            <div>
              {WHAT_I_DO.map((s, i) => (
                <div className="service-item" key={s.title}>
                  <span className="service-icon" aria-hidden="true">
                    <Icon name={ICONS[i]} />
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <code className="service-examples">{s.examples}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services-footer">
            <p>
              <strong>Not sure which one you need?</strong> Describe the problem and I will tell
              you honestly whether I am the right person for it.
            </p>
            <a className="text-link" href="#contact">
              Ask me directly
              <Icon name="i-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>

      <section className="container section" id="process" aria-labelledby="processHeading">
        <div className="section-heading">
          <div>
            <Eyebrow>03 How it works</Eyebrow>
            <SectionTitle id="processHeading">
              A process you can <em>hold me to.</em>
            </SectionTitle>
            <p className="section-description">
              Four steps. No jargon, no mystery, and a written record of the decisions at each
              one.
            </p>
          </div>
        </div>

        <ol className="process-grid">
          {PROCESS.map((p, i) => (
            <li className="process-step" key={p.title}>
              <span className="step-number" aria-hidden="true">
                {p.step}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              {i === 2 ? (
                <span className="step-footnote">
                  Typed, tested, and deployed on infrastructure you can inspect.
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <p className="process-note">
          <Icon name="i-message" />
          {PROCESS_NOTE}
        </p>
      </section>
    </>
  );
}
