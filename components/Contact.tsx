"use client";

import { useEffect, useState } from "react";

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "https://formspree.io/f/xojrppdv";

type FormStatus = "idle" | "loading" | "success" | "error";

const socials = [
  { label: "X / Twitter", href: "https://x.com/adejoke_btc" },
  { label: "GitHub", href: "https://github.com/natureloved" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/akinola-adejoke-0b7059324" },
  { label: "Email", href: "mailto:akinolaa769@gmail.com" },
];

export default function ContactTemplate() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form._gotcha) return;
    setStatus("loading");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="site-grid">
        <p className="section-label reveal">05 / Contact</p>
        <div className="contact-heading">
          <div>
            <h2 className="section-title reveal">Let&apos;s build something people can use.</h2>
            <p className="section-intro reveal">Tell me what you&apos;re working on, where it is stuck, or what you want to make next.</p>
          </div>
          <div className="contact-clock reveal"><span /><span>Lagos {time} WAT</span></div>
        </div>

        <div className="contact-layout">
          <div className="contact-direct reveal">
            <p>Prefer a direct line?</p>
            <a href="mailto:akinolaa769@gmail.com">akinolaa769@gmail.com</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download resume</a>
            <div className="social-list">
              {socials.map((social) => <a key={social.label} href={social.href} target={social.href.startsWith("mailto:") ? undefined : "_blank"} rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{social.label}</a>)}
            </div>
          </div>

          <div className="form-frame reveal">
            {status === "success" ? (
              <div className="form-success" role="status">
                <strong>Message received.</strong>
                <p>I&apos;ll get back to you soon.</p>
                <button type="button" onClick={() => { setForm({ name: "", email: "", message: "", _gotcha: "" }); setStatus("idle"); }}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <input className="honeypot" name="_gotcha" value={form._gotcha} onChange={updateField} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="form-row">
                  <label>Name<input name="name" value={form.name} onChange={updateField} required autoComplete="name" placeholder="Your name" disabled={status === "loading"} /></label>
                  <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required autoComplete="email" placeholder="you@example.com" disabled={status === "loading"} /></label>
                </div>
                <label>Message<textarea name="message" value={form.message} onChange={updateField} required minLength={20} rows={6} placeholder="Tell me about the thing you want to build..." disabled={status === "loading"} /></label>
                {status === "error" ? <p className="form-error" role="alert">Something went wrong. Email me directly and I&apos;ll get back to you.</p> : null}
                <button className="form-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send message"}</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section { border-top: 1px solid var(--border-soft); padding-bottom: 6rem; }
        .contact-heading { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2rem; align-items: end; }
        .contact-clock { display: flex; align-items: center; gap: 0.5rem; padding-bottom: 0.35rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .contact-clock span:first-child { width: 0.45rem; height: 0.45rem; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 4px rgba(94, 234, 212, 0.1); }
        .contact-layout { display: grid; grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1fr); gap: clamp(2rem, 8vw, 8rem); margin-top: 4rem; }
        .contact-direct { display: grid; align-content: start; gap: 0.7rem; }
        .contact-direct p { margin: 0 0 0.5rem; color: var(--muted); font-size: 0.85rem; }
        .contact-direct > a { width: fit-content; color: var(--white); font-size: 1rem; text-decoration: underline; text-decoration-color: var(--cyan); text-underline-offset: 0.25rem; }
        .contact-direct > a:hover, .social-list a:hover { color: var(--lime); }
        .social-list { display: flex; flex-wrap: wrap; gap: 0.8rem 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
        .social-list a { color: var(--muted); font-family: var(--font-mono); font-size: 0.63rem; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; }
        .form-frame { padding: 1.4rem; border: 1px solid var(--border); background: rgba(18, 23, 26, 0.72); }
        form { display: grid; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        label { display: grid; gap: 0.45rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; }
        input, textarea { width: 100%; border: 1px solid var(--border); border-radius: 0; background: rgba(11, 14, 16, 0.8); color: var(--white); padding: 0.8rem 0.85rem; font-family: var(--font-sans); font-size: 0.9rem; letter-spacing: 0; text-transform: none; outline: none; transition: border-color 0.2s ease, background 0.2s ease; }
        input:focus, textarea:focus { border-color: var(--cyan); background: var(--bg); }
        input::placeholder, textarea::placeholder { color: #687477; }
        textarea { min-height: 9rem; resize: vertical; }
        input:disabled, textarea:disabled { opacity: 0.55; }
        .form-submit, .form-success button { min-height: 2.8rem; border: 1px solid var(--lime); background: var(--lime); color: #111713; cursor: pointer; font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; transition: background 0.2s ease, color 0.2s ease; }
        .form-submit:hover, .form-success button:hover { background: var(--white); border-color: var(--white); }
        .form-submit:disabled { cursor: wait; opacity: 0.65; }
        .form-error { margin: 0; color: var(--orange); font-family: var(--font-mono); font-size: 0.68rem; line-height: 1.5; }
        .honeypot { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .form-success { display: grid; gap: 0.7rem; min-height: 19rem; align-content: center; }
        .form-success strong { color: var(--lime); font-size: 1.3rem; }
        .form-success p { margin: 0; color: var(--muted); }
        .form-success button { width: fit-content; padding: 0.7rem 0.9rem; }
        @media (max-width: 820px) { .contact-heading { grid-template-columns: 1fr; } .contact-clock { padding: 0; } .contact-layout { grid-template-columns: 1fr; gap: 3rem; } }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr; } .form-frame { padding: 1rem; } }
      `}</style>
    </section>
  );
}
