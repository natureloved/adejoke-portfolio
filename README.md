# Akinola Adejoke: Portfolio

> **I build software that moves money and saves people work.**

A single-page portfolio built with Next.js 14 (App Router), TypeScript and Tailwind CSS,
on a light editorial design system: DM Sans for UI, DM Mono for the technical details, and
Instrument Serif for the italic accents. Its job is to explain, in the first screen, what
I build, and then prove it with links a visitor can check.

---

## Design goals

The site is written for three different readers at once: a recruiter who does not work in
software, a Web3 protocol team, and a prospective client. So it rests on two principles:

1. **Plain first, technical on demand.** Every project states its idea in ordinary English
   before any jargon appears. A 13-term glossary decodes the vocabulary. A `Plain` /
   `Technical` toggle (persisted in `localStorage`) reveals the engineering position and
   each project's architecture layer without duplicating the page.
2. **Claims carry links.** No project is described without a live demo or a repository.
   Hard numbers come from the projects' own test suites and READMEs, not from invented
   dashboards.

Accessibility and legibility are requirements, not polish: a 13px type floor for real
content, a 17px body size, visible 2px focus rings, 40px minimum tap targets,
`prefers-reduced-motion` support, WCAG AA text contrast (verified, 0 failures), and zero
horizontal overflow down to 360px.

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| Page | `#fbfcf5` | Background |
| Card | `#f7f8f3` | Project and lab cards |
| Ink | `#16210f` | Headings |
| Muted | `#6b7269` | Body copy (AA on every surface) |
| Green | `#2c4531` | Brand, links, dark panels |
| Green dark | `#243e2e` | Services panel |
| Lime | `#dff3a4` | Accent fills |
| Line | `#e6ead9` | Hairlines |

The hero art board frames a real screenshot of a live deployment rather than a mock
dashboard, so the largest image on the page is also evidence. Icons are a single inline
SVG sprite drawn with `currentColor`, so there is no second request and no icon-font
flash.

## Featured work

| Project | Year | What it is |
| --- | --- | --- |
| **DrawBound** | 2026 | Self-custodial BTC credit where loan health is re-proven on every action. 109 tests. |
| **Acadex** | 2026 | Academic calendar system for Lagos State University, with an append-only revision trail. Final-year project. |
| **PegWatch** | 2026 | Autonomous risk agent covering the ~65-hour weekend gap in tokenised-equity price feeds. |
| **Voz** | 2026 | Voice-to-voice cross-border remittance. The recipient never reads an address. |

Plus 15 further builds in the lab, each with a live demo or repository.

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

The contact form posts to Formspree. If the endpoint is missing or the request fails, the
form says so and offers a `mailto:` link rather than showing a false success message.

## Project structure

```
app/
  globals.css            Design tokens, component classes, reading-mode rules
  layout.tsx             Fonts (next/font/google), metadata, Person JSON-LD, skip link
  opengraph-image.tsx    Social card, rendered at the edge
  page.tsx               Section order
components/
  Nav.tsx                Sticky blurred header, active section dot, mobile menu
  Hero.tsx               Headline, proof stats, art board with a real screenshot
  Toolkit.tsx            The tool strip
  Work.tsx               Four flagship case studies, filters, case-study dialog
  Capabilities.tsx       Dark services panel plus the four process steps
  Lab.tsx                Filterable grid of 15 further builds
  Story.tsx              Background, workspace illustration, signature
  FAQ.tsx                Eight working-together questions plus the glossary
  Contact.tsx            Lime panel, copy-email, dialog form, toast
  Footer.tsx             Brand, socials, back to top
  ContactContext.tsx     One shared contact dialog for every trigger
  ReadingToggle.tsx      Plain ⇄ technical mode, persisted
  IconSprite.tsx         Inline SVG icon sprite
  ui.tsx                 Icon, Eyebrow, SectionTitle, Gloss
data/work.ts             All project content: the only file to edit for copy
lib/site.ts             Name, links, positioning, process, story, glossary
public/shots/            Real screenshots of the live demos
```

## Content

All copy lives in `data/work.ts` and `lib/site.ts`. Screenshots in `public/shots/` are real
captures of the deployed sites, taken with headless Chrome and resized to 1200x750 WebP.

House style: no em dashes. Use commas, colons, or a second sentence.

## Contact

- **Email:** [akinolaa769@gmail.com](mailto:akinolaa769@gmail.com)
- **GitHub:** [@natureloved](https://github.com/natureloved)
- **LinkedIn:** [Akinola Adejoke](https://www.linkedin.com/in/akinola-adejoke-0b7059324)
- **X:** [@adejoke_btc](https://x.com/adejoke_btc)

## License

MIT License (c) Akinola Adejoke.
