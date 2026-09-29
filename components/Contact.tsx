"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, SITE } from "@/lib/site";
import { useContact } from "./ContactContext";
import { Eyebrow, Icon } from "./ui";

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Formspree endpoints are public: the value ships to the browser with any
 * request, so the default here is not a secret. It is kept as a fallback so a
 * missing environment variable cannot silently break the contact form on a
 * deployed build. Set NEXT_PUBLIC_FORMSPREE_URL to point at a different form.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "https://formspree.io/f/xojrppdv";

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
   */
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!ENDPOINT) {
      setStatus("failed");
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

                {status === "failed" ? (
                  <p className="form-error" role="alert">
                    The form could not be sent just now. Please email me directly at{" "}
                    <a className="glossary-link" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                    . Nothing you typed has been lost.
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
