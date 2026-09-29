"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, SITE } from "@/lib/site";
import { Section, SectionHead } from "./ui";

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "https://formspree.io/f/xojrppdv";

const CHANNELS = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, note: "Fastest reply" },
  { label: "GitHub", value: "@natureloved", href: SITE.github, note: "35 repositories" },
  {
    label: "LinkedIn",
    value: "Akinola Adejoke",
    href: SITE.linkedin,
    note: "Professional profile",
  },
  { label: "X", value: "@adejoke_btc", href: SITE.x, note: "Build notes" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <SectionHead
        id="contact"
        eyebrow="Contact"
        title={CONTACT.headline}
        lede={CONTACT.sub}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <ul className="grid gap-px border border-line-soft bg-line-soft">
            {CHANNELS.map((channel) => (
              <li key={channel.label} className="bg-bg">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex min-h-[64px] items-center justify-between gap-4 px-5 py-4 no-underline transition-colors hover:bg-bg-raise"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                      {channel.label}
                    </span>
                    <span className="text-[15px] text-ink">{channel.value}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                    <span className="text-[13px] text-muted">{channel.note}</span>
                    <span aria-hidden="true" className="text-teal">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={SITE.resume}
            download
            className="btn btn-quiet w-full sm:w-fit"
          >
            <span>Download résumé (PDF)</span>
            <span aria-hidden="true" className="opacity-60">
              ↓
            </span>
          </a>

          <p className="flex items-center gap-2.5 font-mono text-[13px] text-muted">
            <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
            Based in {SITE.location} · working with teams anywhere
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                Your name
              </span>
              <input
                required
                name="name"
                autoComplete="name"
                className="min-h-[48px] border border-line bg-bg-card px-4 text-[16px] text-ink placeholder:text-muted/60 focus:border-teal focus:outline-none"
                placeholder="Who am I talking to?"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                Your email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="min-h-[48px] border border-line bg-bg-card px-4 text-[16px] text-ink placeholder:text-muted/60 focus:border-teal focus:outline-none"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
              What are you building?
            </span>
            <textarea
              required
              name="message"
              rows={5}
              className="resize-y border border-line bg-bg-card px-4 py-3 text-[16px] leading-relaxed text-ink placeholder:text-muted/60 focus:border-teal focus:outline-none"
              placeholder="The problem, the deadline, and what you need someone to do about it."
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
              <span>{status === "sending" ? "Sending…" : "Send message"}</span>
              <span aria-hidden="true" className="opacity-70">
                →
              </span>
            </button>

            {status === "sent" ? (
              <p role="status" className="text-[15px] text-teal">
                Got it, I&apos;ll reply shortly.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="text-[15px] text-amber">
                That didn&apos;t send. Email me directly at{" "}
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                  {SITE.email}
                </a>
                .
              </p>
            ) : null}
          </div>

          <p className="text-[13px] leading-relaxed text-muted">
            Goes straight to my inbox via Formspree. Nothing stored here, no tracking.
          </p>
        </form>
      </div>
    </Section>
  );
}
