"use client";

import { useEffect, useState } from "react";
import { CONTACT_DATA } from "@/data/portfolio";

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "https://formspree.io/f/xojrppdv";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [lagosTime, setLagosTime] = useState("--:--:--");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", _gotcha: "" });

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setLagosTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    }
  };

  const updateField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((curr) => ({ ...curr, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form._gotcha) return;
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact and Collaboration">
      <div className="site-grid">
        <div className="contact-head">
          <p className="section-label">05 / Contact</p>
          <h2 className="contact-headline">{CONTACT_DATA.headline}</h2>
          <p className="contact-subhead">{CONTACT_DATA.subhead}</p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Direct Links and Actions */}
          <div className="direct-column">
            <span className="column-title">Direct Connections</span>

            <div className="action-buttons-list">
              {/* Email Button with Copy Option */}
              <div className="email-action-row">
                <a href={`mailto:${CONTACT_DATA.email}`} className="action-btn email-btn">
                  <span className="btn-icon">✉</span>
                  <span>Email me</span>
                  <span className="btn-detail">{CONTACT_DATA.email}</span>
                </a>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={copyEmail}
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>

              {/* View GitHub */}
              <a
                href={CONTACT_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
              >
                <span className="btn-icon">⌨</span>
                <span>View GitHub</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>

              {/* Connect on LinkedIn */}
              <a
                href={CONTACT_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
              >
                <span className="btn-icon">in</span>
                <span>Connect on LinkedIn</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>

              {/* Download Résumé */}
              <a
                href={CONTACT_DATA.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn resume-btn"
              >
                <span className="btn-icon">📄</span>
                <span>Download résumé</span>
                <span className="btn-arrow" aria-hidden="true">↓</span>
              </a>
            </div>

            {/* Lagos Time Footnote */}
            <div className="lagos-clock-card">
              <span className="clock-dot" />
              <span>Lagos, Nigeria // {lagosTime} WAT</span>
            </div>
          </div>

          {/* Right Column: Clean, Short Inquiry Form */}
          <div className="form-column">
            <span className="column-title">Send a direct message</span>

            <div className="form-card">
              {status === "success" ? (
                <div className="form-success-state">
                  <div className="success-icon">✓</div>
                  <h3>Message transmitted</h3>
                  <p>Thanks for reaching out. I’ll review your note and get back to you shortly.</p>
                  <button
                    type="button"
                    className="btn-reset"
                    onClick={() => {
                      setForm({ name: "", email: "", message: "", _gotcha: "" });
                      setStatus("idle");
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    name="_gotcha"
                    value={form._gotcha}
                    onChange={updateField}
                    tabIndex={-1}
                    className="honeypot"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-row">
                    <label>
                      <span>Name</span>
                      <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        required
                        placeholder="Your name"
                        disabled={status === "loading"}
                      />
                    </label>
                    <label>
                      <span>Email</span>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateField}
                        required
                        placeholder="you@domain.com"
                        disabled={status === "loading"}
                      />
                    </label>
                  </div>

                  <label className="message-label">
                    <span>What are you building?</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      required
                      rows={5}
                      placeholder="Share a brief overview of the product, challenge, or timeline..."
                      disabled={status === "loading"}
                    />
                  </label>

                  {status === "error" && (
                    <p className="form-error-msg">
                      Something went wrong. Please email directly at {CONTACT_DATA.email}
                    </p>
                  )}

                  <button type="submit" className="submit-btn" disabled={status === "loading"}>
                    {status === "loading" ? "Transmitting..." : "Send message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          position: relative;
          padding: 8rem 0 6rem;
          border-top: 1px solid var(--border-soft);
        }

        .contact-head {
          max-width: 820px;
          margin-bottom: 4.5rem;
        }

        .contact-headline {
          margin: 0;
          font-size: clamp(2.4rem, 5.2vw, 4.4rem);
          font-weight: 650;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--white);
        }

        .contact-subhead {
          margin: 1.5rem 0 0;
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          line-height: 1.65;
          color: var(--muted);
          max-width: 64ch;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(2.5rem, 6vw, 6rem);
          align-items: start;
        }

        .column-title {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--cyan);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .action-buttons-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .email-action-row {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 1.4rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          color: var(--white);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          transition: all 0.2s ease;
          flex: 1;
        }

        .action-btn:hover {
          border-color: var(--lime);
          color: var(--lime);
          transform: translateY(-2px);
          background: rgba(18, 24, 30, 0.9);
        }

        .btn-icon {
          font-size: 1rem;
          color: var(--muted);
        }

        .action-btn:hover .btn-icon {
          color: var(--lime);
        }

        .btn-detail {
          margin-left: auto;
          font-size: 0.68rem;
          color: var(--muted);
        }

        .btn-arrow {
          margin-left: auto;
          font-size: 0.85rem;
        }

        .copy-btn {
          padding: 0 1.1rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          color: var(--cyan);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .copy-btn:hover {
          border-color: var(--cyan);
          background: rgba(94, 234, 212, 0.08);
        }

        .lagos-clock-card {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-top: 2rem;
          padding: 0.6rem 1rem;
          border: 1px solid var(--border-soft);
          background: rgba(11, 14, 16, 0.5);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .clock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 6px var(--lime);
        }

        /* Form Styles */
        .form-card {
          padding: 2.2rem 2rem;
          background: rgba(14, 18, 22, 0.7);
          border: 1px solid var(--border);
          backdrop-filter: blur(12px);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        label span {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        input, textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(8, 11, 14, 0.85);
          border: 1px solid var(--border);
          color: var(--white);
          font-family: var(--font-sans);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        input:focus, textarea:focus {
          border-color: var(--lime);
          background: rgba(11, 15, 18, 0.95);
        }

        input::placeholder, textarea::placeholder {
          color: #5a6669;
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          padding: 0.95rem 1.5rem;
          background: var(--lime);
          color: #0b0e10;
          border: 1px solid var(--lime);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          background: var(--white);
          border-color: var(--white);
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .honeypot {
          display: none;
        }

        .form-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
          gap: 0.85rem;
        }

        .success-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 240, 118, 0.15);
          color: #00f076;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          font-weight: bold;
        }

        .form-success-state h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--white);
        }

        .form-success-state p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--muted);
          max-width: 36ch;
        }

        .btn-reset {
          margin-top: 1rem;
          padding: 0.65rem 1.2rem;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--white);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          cursor: pointer;
        }

        .form-error-msg {
          color: var(--orange);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          margin: 0;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 540px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .email-action-row {
            flex-direction: column;
          }
          .copy-btn {
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
