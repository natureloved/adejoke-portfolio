# Akinola Adejoke: Portfolio

> **I build software that moves money and saves people work.**

A dark-mode, single-page portfolio built with Next.js 14 (App Router), TypeScript and
Tailwind CSS. Its job is to explain, in the first screen, what I build, and then prove it
with links a visitor can check.

---

## Design goals

The site is written for three different readers at once, a recruiter who does not
work in software, a Web3 protocol team, and a prospective client, so it is built on
two principles:

1. **Plain first, technical on demand.** Every project states its idea in ordinary English
   before any jargon appears. A 13-term glossary decodes the vocabulary. A `Plain` /
   `Technical` toggle (persisted in `localStorage`) reveals the engineering position and
   each project's architecture layer without duplicating the page.
2. **Claims carry links.** No project is described without a live demo or a repository.
   Hard numbers come from the projects' own test suites and READMEs, not from invented
   dashboards.

Accessibility and legibility are treated as requirements, not polish: a 13px type floor
(nothing on the page renders smaller), a 17px body size, visible focus rings, 48px minimum
tap targets, `prefers-reduced-motion` support, and zero horizontal overflow at 390px.

## Featured work

| Project | Year | What it is |
| --- | --- | --- |
| **DrawBound** | 2026 | Self-custodial BTC credit where loan health is re-proven on every action. 109 tests. |
| **Acadex** | 2026 | Academic calendar system for Lagos State University, with an append-only revision trail. Final-year project. |
| **PegWatch** | 2026 | Autonomous risk agent covering the ~65-hour weekend gap in tokenised-equity price feeds. |
| **Voz** | 2026 | Voice-to-voice cross-border remittance. The recipient never reads an address. |

Plus 15 further builds with a live demo or repository each.

## Getting started

Requires Node.js `>= 18.17.0`.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint via next lint
npm run build       # production build
npm run start       # serve the production build
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_FORMSPREE_URL` | Formspree endpoint for the contact form |

## Project structure

```
app/
  globals.css            Design tokens, type scale, reading-mode rules
  layout.tsx             Fonts, metadata, Person JSON-LD, skip link
  opengraph-image.tsx    Social card, rendered at the edge
  page.tsx               Section order
components/
  Nav.tsx                Sticky nav with section highlighting
  Hero.tsx               Name, one-line positioning, proof stats, reading toggle
  Work.tsx               Four flagship case studies with screenshots
  Capabilities.tsx       What I do · glossary · how I work
  Lab.tsx                Filterable grid of 15 further builds
  Story.tsx              Four-chapter background
  Contact.tsx            Channels, résumé, Formspree form
  ReadingToggle.tsx      Plain ⇄ technical mode, persisted
  ui.tsx                 Section, SectionHead, Gloss, shared primitives
data/work.ts             All project content: the only file to edit for copy
lib/site.ts             Name, links, positioning, process, glossary
public/shots/            Real screenshots of the live demos
```

## Content

All copy lives in `data/work.ts` and `lib/site.ts`. Screenshots in `public/shots/` are real
captures of the deployed sites, taken with headless Chrome and resized to 1200×750 WebP.

## Contact

- **Email:** [akinolaa769@gmail.com](mailto:akinolaa769@gmail.com)
- **GitHub:** [@natureloved](https://github.com/natureloved)
- **LinkedIn:** [Akinola Adejoke](https://www.linkedin.com/in/akinola-adejoke-0b7059324)
- **X:** [@adejoke_btc](https://x.com/adejoke_btc)

## License

MIT License © Akinola Adejoke.
