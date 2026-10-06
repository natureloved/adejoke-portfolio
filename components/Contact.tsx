"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, SITE } from "@/lib/site";
import { useContact } from "./ContactContext";
import { Eyebrow, Icon } from "./ui";

type Status = "idle" | "sending" | "sent" | "failed" | "unconfigured";

/**
 * The Formspree endpoint id is public (it ships to the browser in any Next.js
 * build, `NEXT_PUBLIC_` or not), so it is not a secret and does not need to be
 * hidden. What it must not do is fall back to a fixed literal: a build shipped
 * without the variable would then send every visitor's message to whichever
 * inbox happened to own that id, and nobody would notice until messages went
 * missing. With no endpoint configured the form says so and offers the real
 * mailto link, which fails loudly rather than quietly losing mail.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "";

export default function Contact() {
  const { request } = useContact();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      setStatus("idle");
    }
    if (!open && el.open) el.close();
  }, [open]);

  // Any trigger anywhere on the page opens this one dialog. The counter is what
  // the effect watches, so a second click reopens it after a close.
  useEffect(() => {
    if (request > 0) setOpen(true);
  }, [request]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setToast("Email address copied.");
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setToast(`Copy failed. The address is ${SITE.email}`);
    }
  };

  /**
   * Posts to Formspree when an endpoint is configured. The previous build
   * showed a success message without sending anything, which quietly loses
   * every message; if there is no endpoint we say so and hand the visitor a
   * real mailto link instead of pretending.
   *
   * The honeypot comes first: a hidden field no human can fill. Headless form
   * fillers populate every input they find, so a value here means a bot. We
   * short-circuit to the same success message a human gets, because replying
   * "rejected" only teaches the sender how to rephrase. Real messages still
   * fail loudly through the try/catch when Formspree itself errors.
   */
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (new FormData(form).get("company_website")) {
      setStatus("sent");
      return;
    }

    if (!ENDPOINT) {
      // No endpoint configured. Say so instead of failing a network call.
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <>
      <section className="container contact-section" id="contact" aria-labelledby="contactHeading">
        <div className="contact-panel">
          <div>
            <Eyebrow>07 Contact</Eyebrow>
            <h2 id="contactHeading">
              Have a project? <em>Let&rsquo;s make it real.</em>
            </h2>
            <p>{CONTACT.sub}</p>
          </div>

          <div className="contact-actions">
            <button type="button" className="btn" onClick={() => setOpen(true)}>
              Start a conversation
              <Icon name="i-arrow-up-right" />
            </button>
            <div className="contact-email">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <button
                type="button"
                className="copy-btn"
                onClick={copyEmail}
                aria-label={`Copy ${SITE.email} to clipboard`}
              >
                <Icon name={copied ? "i-check" : "i-copy"} />
              </button>
            </div>
            <p className="reply-note">
              <span className="status-dot" aria-hidden="true" />
              Reply usually within 48 hours
            </p>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="modal contact-modal"
        onClose={() => setOpen(false)}
        aria-labelledby="contactDialogTitle"
      >
        <button className="dialog-close" type="button" onClick={() => setOpen(false)} aria-label="Close">
          <Icon name="i-plus" />
        </button>

        <div className="dialog-body">
          {status === "sent" ? (
            <div className="contact-success">
              <span className="success-icon" aria-hidden="true">
                <Icon name="i-check" />
              </span>
              <h2 className="dialog-title" id="contactDialogTitle">
                Message <em>sent.</em>
              </h2>
              <p className="dialog-description">
                Thank you. I read every one of these myself, and I reply to all of them within
                two working days. If it is urgent, email me directly at{" "}
                <a className="glossary-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                .
              </p>
              <button type="button" className="btn form-submit" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          ) : (
            <>
              <Eyebrow>{CONTACT.headline}</Eyebrow>
              <h2 className="dialog-title" id="contactDialogTitle">
                Tell me what you&rsquo;re <em>trying to build.</em>
              </h2>
              <p className="dialog-description">
                A paragraph is plenty. What the problem is, who has it, and roughly when you
                need it. I will reply with honest next steps, even if that is not me.
              </p>

              <form ref={formRef} onSubmit={submit}>
                {/*
                  Honeypot: hidden from sight and from assistive tech, so only
                  automated fillers that scrape every input ever populate it.
                  A value here means bot — the handler above rejects it.
                */}
                <div className="sr-only" aria-hidden="true">
                  <label className="form-field">
                    <span className="form-label">Company website</span>
                    <input
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      placeholder="Leave this empty"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label className="form-field">
                    <span className="form-label">Name</span>
                    <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
                  </label>
                  <label className="form-field">
                    <span className="form-label">Email</span>
                    <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                  </label>
                </div>

                <label className="form-field">
                  <span className="form-label">What kind of help?</span>
                  <select name="kind" defaultValue="Product build">
                    <option>Product build</option>
                    <option>Smart contract or protocol</option>
                    <option>AI agent</option>
                    <option>Technical audit</option>
                    <option>Full-time or contract role</option>
                    <option>Something else</option>
                  </select>
                </label>

                <label className="form-field">
                  <span className="form-label">
                    The project <small>a paragraph is plenty</small>
                  </span>
                  <textarea
                    name="message"
                    required
                    placeholder="What are you trying to build, who has the problem, and when do you need it?"
                  />
                </label>

                <button type="submit" className="btn form-submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending" : "Send it over"}
                  <Icon name="i-arrow-up-right" />
                </button>

                {status === "failed" || status === "unconfigured" ? (
                  <p className="form-error" role="alert">
                    {status === "unconfigured" ? (
                      <>
                        The form is not connected to an inbox on this build, so please email me
                        directly at{" "}
                        <a className="glossary-link" href={`mailto:${SITE.email}`}>
                          {SITE.email}
                        </a>
                        . Nothing you typed has been lost.
                      </>
                    ) : (
                      <>
                        The form could not be sent just now. Please email me directly at{" "}
                        <a className="glossary-link" href={`mailto:${SITE.email}`}>
                          {SITE.email}
                        </a>
                        . Nothing you typed has been lost.
                      </>
                    )}
                  </p>
                ) : (
                  <p className="form-privacy">
                    No newsletter, no CRM, no tracking. The message goes to one inbox: mine.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </dialog>

      <div className={`toast${toast ? " visible" : ""}`} role="status" aria-live="polite">
        <Icon name="i-check" />
        {toast}
      </div>
    </>
  );
}
