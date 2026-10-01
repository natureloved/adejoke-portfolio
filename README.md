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
| **Acadex** | 2026 | Academic calendar system for Lagos State University, with an append-only revision trail. |
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
npm run test        # Playwright suite, against the production build
npm run test:links  # live check of every external link, slower, opt-in
npm run verify      # typecheck + lint + build + test
```

The claims on this page are checked, not asserted. `npm run test` runs the
browser suite against a production build on port 3100:

```bash
npm run build
npm start -- -p 3100 &   # or: npx next start -p 3100
npm run test
```

It covers the responsive layout at ten widths from 360px up, the reading-mode
persistence, the case-study and contact dialogs, the lab and work filters,
keyboard access, `prefers-reduced-motion`, and two audits the copy relies on:
axe with zero WCAG 2.1 AA violations, and a contrast check that walks every
rendered text node rather than the ones listed in the design tokens.
`npm run test:links` additionally requests every external link the page
renders and fails on a dead one; it is kept out of the default run because
nineteen third-party deployments make it slow and turn a transient outage
into a red build. LinkedIn answers those probes with 999, which is its block
code rather than a missing profile, so it is reported rather than failed.

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for metadata, sitemap and JSON-LD |
| `NEXT_PUBLIC_FORMSPREE_URL` | Formspree endpoint for the contact form |

`NEXT_PUBLIC_SITE_URL` is read in one place, `SITE_URL` in `lib/site.ts`, and every consumer
imports it from there. It has to be the custom domain, not the Vercel deployment alias: the
alias is a different host, so a page served on the custom domain that points its canonical
and `og:url` at the alias reads to a crawler as a duplicate of itself. Set the same value in
the Vercel project environment, otherwise the deployed build overrides the fallback.

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
  Nav.tsx                Sticky blurred header, active section dot, mobile menu  Hero.tsx               Headline, proof stats, art board with a real screenshot
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
public/fonts/            Brand TTFs for the social card, see below
```

The social card needs the real brand faces, not system fonts, otherwise the preview a
visitor sees when they paste the link does not look like the site. Satori cannot read
woff2, which is what `next/font` serves the page, so `public/fonts/` holds TTF copies of
the same three families for `app/opengraph-image.tsx` to fetch. The page itself is still
self-hosted through `next/font`; the files in `public/fonts` are only used by the card.

## Content

All copy lives in `data/work.ts` and `lib/site.ts`. Screenshots in `public/shots/` are real
captures of the deployed sites, taken with headless Chrome and resized to 1200x750 WebP.

The tests live in `tests/e2e/` and assert the claims this README makes, so a claim that
stops being true fails the suite:

```
tests/e2e/
  responsive.spec.ts   Overflow at ten widths, stacking, type floor, section order
  mobile.spec.ts       Real phone profile: menu, tap targets, reading mode
  interactions.spec.ts Reading mode, case dialog, contact dialog, copy, filters, nav
  a11y.spec.ts         axe zero-violations, contrast, keyboard, reduced motion
  links.spec.ts        Anchors, images, metadata, security headers
  content.spec.ts      Repo links, stated counts, no lorem ipsum, no em dashes
  live-links.spec.ts   Every external link resolves (opt-in, slower)
  helpers.ts           Shared navigation and measurement helpers
```

House style: no em dashes. Use commas, colons, or a second sentence.

## Contact

- **Email:** [akinolaa769@gmail.com](mailto:akinolaa769@gmail.com)
- **GitHub:** [@natureloved](https://github.com/natureloved)
- **LinkedIn:** [Akinola Adejoke](https://www.linkedin.com/in/akinola-adejoke-0b7059324)
- **X:** [@RastaDev_](https://x.com/RastaDev_)

## License

MIT License (c) Akinola Adejoke.
