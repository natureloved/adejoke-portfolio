import { GLOSSARY } from "@/lib/site";
import { Eyebrow, Icon, SectionTitle } from "./ui";

const WORKING_TOGETHER = [
  {
    q: "Are you available for new work?",
    a: "Yes, for product and engineering work: a contract, a protocol, a product that needs shipping, or a team that needs a technical lead. I reply to everything that looks like a real problem, usually within a day or two.",
  },
  {
    q: "Do you work with non-technical teams?",
    a: "That is most of the work. A clinic, a school, a small fund: I care about the problem and who it hurts, not which framework we land on. If a problem needs a spreadsheet and a process change rather than an app, I will say so.",
  },
  {
    q: "What does a project usually cost?",
    a: "It depends entirely on scope, so I quote after the first conversation rather than posting a fake range. Small, well-defined builds are quick to price. Anything touching money, auth, or data integrity needs real time in the estimate, and I would rather quote honestly and adjust than quote cheap and disappear.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Often, and it is my preferred kind of work. I start by reading the code and running it, then write down what I found before changing anything. You get that write-up whether or not we continue.",
  },
  {
    q: "Do you offer a technical audit?",
    a: "Yes. A fixed-scope review of a contract, a system, or a codebase, delivered as a prioritised findings document you can act on or hand to someone else. If the honest answer is that your project is fine, that is what the report says.",
  },
  {
    q: "How do you handle AI in your work?",
    a: "I use it as a tool and I say so. Anything an agent does on a user's behalf is built to be auditable afterwards, and I will tell you which parts were generated and which parts are my own decisions. I do not ship model output I have not read.",
  },
  {
    q: "What if the project does not work?",
    a: "Then we find out early, which is the entire point of the process on this page. You keep everything I produce, the code is yours, and you get an honest account of what failed and why.",
  },
  {
    q: "What is your timezone?",
    a: "West Africa Time, UTC+1. That overlaps comfortably with Europe in the morning and US Eastern in the afternoon, so a few hours of overlap is easy to arrange.",
  },
] as const;

export default function FAQ() {
  return (
    <section className="container faq-section" id="faq" aria-labelledby="faqHeading">
      <div className="faq-grid">
        <div className="faq-intro">
          <Eyebrow>06 Questions</Eyebrow>
          <SectionTitle id="faqHeading">
            Everything else, <em>answered.</em>
          </SectionTitle>
          <p>
            The questions I get most, plus every piece of jargon on this page, defined in one
            sentence each. No account required, no email gate.
          </p>
          <a className="text-link" href="#contact">
            Ask something else
            <Icon name="i-arrow-up-right" />
          </a>
        </div>

        <div>
          {WORKING_TOGETHER.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>
                {f.q}
                <Icon name="i-chevron" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}

          <h3 className="faq-subhead" id="glossary">
            The glossary, in plain English
          </h3>

          {GLOSSARY.map((g) => (
            <details
              className="faq-item"
              key={g.term}
              id={`faq-${g.term.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <summary>
                {g.term}
                <Icon name="i-chevron" />
              </summary>
              <p>{g.def}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
