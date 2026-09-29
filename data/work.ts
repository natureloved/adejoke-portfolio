export interface Proof {
  value: string;
  label: string;
}

export interface Flagship {
  id: string;
  number: string;
  name: string;
  year: string;
  role: string;
  context: string;
  /** One line, no jargon. The whole reason the card exists. */
  headline: string;
  /** The problem, told to someone who does not work in this field. */
  problem: string;
  /** What it actually does, in plain terms. */
  does: string[];
  proof: Proof[];
  tech: {
    stack: string[];
    how: { title: string; body: string }[];
    hard: string[];
  };
  shot: { src: string; alt: string; caption: string };
  links: { live?: string; liveLabel?: string; repo?: string };
  accent: string;
  category: "Protocol" | "Product" | "Agent";
}

export interface LabItem {
  id: string;
  name: string;
  year: string;
  tagline: string;
  stack: string[];
  note?: string;
  live?: string;
  repo?: string;
  category: "Protocol" | "Product" | "Agent" | "Tooling";
}

export const FLAGSHIPS: Flagship[] = [
  {
    id: "drawbound",
    number: "01",
    name: "DrawBound",
    year: "2026",
    role: "Protocol & full-stack engineer",
    context: "Self-initiated. The most technically demanding build in this list.",
    headline: "Borrow against your Bitcoin without ever handing it over.",
    problem:
      "Lending against crypto normally means handing your Bitcoin to a contract and trusting it. If the contract is wrong, or the price feed behind it goes stale, collateral can be taken while the loan is still healthy. DrawBound re-checks the proof of health on every action, and there is always a way out.",
    does: [
      "You lock Bitcoin into a vault that stays under your control. No company holds it.",
      "Every borrow, repay and withdrawal needs a fresh loan-health proof. Stale or unhealthy evidence means no new borrowing.",
      "Repaying and withdrawing stay open even when a draw is frozen, and the same request can never execute twice.",
    ],
    proof: [
      { value: "109", label: "unit and integration tests" },
      { value: "5", label: "verification scripts: typecheck, lint, test, build, end-to-end smoke" },
      { value: "0", label: "custodians between you and your Bitcoin" },
    ],
    tech: {
      stack: ["TypeScript", "Next.js", "SatVM", "Tachi signet", "BIP-340", "HAT/RIP"],
      how: [
        {
          title: "The session never leaves your device",
          body: "The browser generates a throwaway Schnorr keypair. The private key is never sent anywhere; the server only ever sees a public key, a session token, and a signature it can verify.",
        },
        {
          title: "A signed, canonical message per action",
          body: "Every draw, repay and unlock signs a fixed-format string: position, vault, action, amount and nonce, so the server can verify intent without ever holding a key that could move funds.",
        },
        {
          title: "The covenant is re-evaluated every time",
          body: "A HAT/RIP-shaped loan-health proof authorises each credit transition. Unhealthy or stale evidence freezes new draws while repayment and the unilateral exit path stay open.",
        },
      ],
      hard: [
        "Reconciling asynchronous block confirmation between SatVM execution and Bitcoin signet settlement.",
        "Making signed requests safely replayable: an idempotency fingerprint of position, action, amount and nonce, so old signatures are permanently stale after use.",
        "Keeping the session honest about what it proves: it authenticates the browser session, while actual vault ownership is enforced at the chain level in live mode.",
      ],
    },
    shot: {
      src: "/shots/drawbound.webp",
      alt: "DrawBound's vault terminal: a fixture rehearsal screen with connect, draw, repay and unlock controls.",
      caption: "The live vault terminal on Tachi signet, the actual self-custodial session flow.",
    },
    links: {
      live: "https://drawbound-eight.vercel.app/vault",
      liveLabel: "Open the vault terminal",
      repo: "https://github.com/natureloved/DrawBound",
    },
    accent: "#00f076",
    category: "Protocol",
  },
  {
    id: "acadex",
    number: "02",
    name: "Acadex",
    year: "2026",
    role: "Final-year project, Computer Science",
    context:
      "Lagos State University. Built around a problem I watched happen, not one I was handed.",
    headline: "A university exam calendar that can't quietly go out of date.",
    problem:
      "LASU publishes its approved calendar as one static page. When the 2025/2026 session was extended by a week, the correction went out in separate news posts, so students had to reconcile a stale page against a rumour. Acadex makes the calendar the thing that changes, and shows exactly what changed.",
    does: [
      "One searchable calendar for sessions, semesters, exams, registration and breaks, with the registry that creates them.",
      "Every date change leaves a permanent revision trail: badged as rescheduled, with a before/after diff.",
      "Separate admin, staff and student roles, re-checked against the database on every request, plus reminders a week and a day before each event.",
    ],
    proof: [
      { value: "2025/26 + 2026/27", label: "real seeded sessions, not lorem ipsum" },
      { value: "0", label: "client JavaScript needed to read the public calendar" },
      { value: "Every", label: "date change keeps a before/after diff" },
    ],
    tech: {
      stack: ["Next.js 16", "React Server Components", "TypeScript", "Prisma 7", "Tailwind 4"],
      how: [
        {
          title: "Server-rendered by default",
          body: "The public calendar is finished on the server, so it works on a slow phone or a locked-down hospital network, and is shareable as a plain URL.",
        },
        {
          title: "Auth re-verified per request",
          body: "The JWT session cookie identifies the user; the role is re-read from the database on every request, so a permission change takes effect immediately rather than at next login.",
        },
        {
          title: "Append-only revisions",
          body: "Events keep a full revision trail instead of being overwritten, which is what makes a rescheduled exam auditable rather than arguable.",
        },
      ],
      hard: [
        "Keeping provisional data honest: the 2026/2027 session dates are explicitly marked provisional in-app because public sources conflict, and the seed provenance is documented in the repo.",
        "Never exposing draft events publicly while still letting staff schedule them.",
        "Reminders that respect an event's actual audience rather than blasting everyone.",
      ],
    },
    shot: {
      src: "/shots/acadex.webp",
      alt: "Acadex landing page showing the 2026/2027 academic year calendar for Harmattan and Rain semesters.",
      caption: "The public calendar, server-rendered: upcoming sessions first, filterable and searchable.",
    },
    links: {
      live: "https://acadex-gamma.vercel.app",
      liveLabel: "Open the calendar",
      repo: "https://github.com/natureloved/Acadex",
    },
    accent: "#5eead4",
    category: "Product",
  },
  {
    id: "pegwatch",
    number: "03",
    name: "PegWatch",
    year: "2026",
    role: "Systems & agent engineering",
    context: "Built for the Runtime Hackathon, September 2026.",
    headline: "An agent that keeps watch over the hours when the price feeds fall asleep.",
    problem:
      "Tokenised stocks, NVIDIA, Tesla and Apple as tokens, trade around the clock. But the official price feeds on Base run Monday to Friday: they hold Friday's close all weekend. That is roughly 65 hours a week with no trustworthy value, and Base's own docs warn never to settle against a frozen feed. A human asleep at 3am Saturday is not a risk control. An agent with a budget is.",
    does: [
      "Reads the live market price, the official feed and the timestamp on it, every 60 seconds.",
      "Decides whether the drift from Friday's close is a normal weekend gap or something abnormal.",
      "Acts only within hard limits, a maximum amount, a cool-down, and an overall allowance, and writes two sentences of plain-English reasoning.",
    ],
    proof: [
      { value: "65.5h", label: "of unmonitored market every weekend" },
      { value: "2", label: "consecutive breaches needed before acting, to ignore single-block noise" },
      { value: "3", label: "risk tiers: weekday ±1.2%, overnight ±2.0%, weekend ±3.0%" },
    ],
    tech: {
      stack: ["TypeScript", "Base", "Aerodrome", "Chainlink", "viem"],
      how: [
        {
          title: "Two prices, one comparison",
          body: "Live DEX price from the Aerodrome pool versus the Chainlink reference and its last-updated timestamp. The gap between them is the signal.",
        },
        {
          title: "Time-aware risk thresholds",
          body: "The same deviation means something different on a Tuesday afternoon and at 4am on Sunday, so the acceptable band changes with the market regime.",
        },
        {
          title: "Delegated authority with a ceiling",
          body: "The agent holds a real wallet with a hard maximum notional, a cool-down, and an allowance, pre-approved limits rather than open-ended permission.",
        },
      ],
      hard: [
        "Distinguishing a benign weekend gap from abnormal drift, instead of firing on every price blip.",
        "Correctly detecting a stale feed rather than treating a frozen value as a real price.",
        "Making an autonomous agent that can move money legible to a human reviewing the decision afterwards.",
      ],
    },
    shot: {
      src: "/shots/pegwatch.webp",
      alt: "PegWatch landing page with the headline 'The peg breaks at 3AM. Your agent is already selling.'",
      caption: "PegWatch: the weekend gap, the risk tiers, and the agent's reasoning.",
    },
    links: {
      live: "https://pegwatch-neon.vercel.app",
      liveLabel: "Open the dashboard",
      repo: "https://github.com/natureloved/PegWatch",
    },
    accent: "#c5a7ff",
    category: "Agent",
  },
  {
    id: "voz",
    number: "04",
    name: "Voz",
    year: "2026",
    role: "Lead systems & AI engineer",
    context: "Cross-border remittance, redesigned around how people actually communicate.",
    headline: "Send money by saying it out loud. The person receiving it never has to read anything.",
    problem:
      "Cross-border remittance moves about $830 billion a year, mostly through services that charge 5–7% and need someone to physically collect the money. Senders are often more fluent speaking than reading; receivers are often handed hexadecimal addresses in a language they do not read. Money apps assume reading. The corridor that needs them most lives in voice.",
    does: [
      "You say what you want, \"send fifty dollars to my sister Ana for groceries\", in English or Spanish.",
      "It resolves the amount, recipient and route, then bridges to Solana without you choosing a chain.",
      "She opens a link, hears the message in her own language, and the money is in her wallet. No app, no wallet, no addresses.",
    ],
    proof: [
      { value: "$830B", label: "annual cross-border remittance market addressed" },
      { value: "2", label: "languages spoken end to end, not just translated" },
      { value: "0", label: "onboarding steps for the person receiving the money" },
    ],
    tech: {
      stack: ["TypeScript", "Next.js", "ElevenLabs", "Claude", "LI.FI", "Solana"],
      how: [
        {
          title: "Speech to structured intent",
          body: "Spoken English or Spanish is transcribed, then parsed into amount, asset and recipient, so the person never has to fill in a form.",
        },
        {
          title: "Routing across chains, invisibly",
          body: "LI.FI resolves the swap and bridge path from whichever EVM chain the sender is on into Solana, so chain choice is not the user's problem.",
        },
        {
          title: "Voice out, not text out",
          body: "The recipient hears the message in their language from a claim link, which is the only part of the flow they actually need to understand.",
        },
      ],
      hard: [
        "Building a claim flow that requires no wallet, no seed phrase and no English from the recipient, the traditional failure point of crypto remittance.",
        "Disambiguating a spoken instruction that may not name a real recipient, and confirming before money moves.",
        "Making the receiving side genuinely useful to someone who cannot read the interface.",
      ],
    },
    shot: {
      src: "/shots/voz.webp",
      alt: "Voz interface showing the 'Speak. Send. Heard.' headline with wallet connection and history tabs.",
      caption: "Voz: speak to send, and hear it back in the recipient's language.",
    },
    links: {
      live: "https://voz-three.vercel.app",
      liveLabel: "Try the flow",
      repo: "https://github.com/natureloved/Voz",
    },
    accent: "#ff8a65",
    category: "Product",
  },
];

export const LAB: LabItem[] = [
  {
    id: "efthesis",
    name: "Efthesis",
    year: "2026",
    tagline:
      "An agent that remembers what it already paid for, and refuses to pay twice. Payment protocols have no memory, so agents keep re-buying.",
    stack: ["Sibyl Memory", "x402", "Base"],
    note: "Sibyl Labs Hackathon",
    repo: "https://github.com/natureloved/Efthesis",
    category: "Agent",
  },
  {
    id: "proof-of-rest",
    name: "Proof of Rest",
    year: "2026",
    tagline:
      "Lock a stake to start a work session. Stop on time and reclaim it; run over and lose part. The cool-down is enforced by the contract.",
    stack: ["Solidity", "Monad"],
    note: "Monad Playground",
    live: "https://proof-of-rest.vercel.app",
    repo: "https://github.com/natureloved/Proof-of-Rest",
    category: "Protocol",
  },
  {
    id: "clearcredit",
    name: "ClearCredit",
    year: "2026",
    tagline:
      "Short-term invoice finance with the compliance checks built in, so every approval is a permanent record rather than a spreadsheet.",
    stack: ["Solidity", "Monad", "Cleanverse"],
    note: "Cleanverse Build hackathon",
    repo: "https://github.com/natureloved/ClearCredit",
    category: "Protocol",
  },
  {
    id: "tipwall",
    name: "TipWall",
    year: "2026",
    tagline:
      "A support wall inside the Nimiq Pay app. Tips go straight to the person: no platform cut, no withdrawal threshold, ten languages.",
    stack: ["Nimiq Pay", "Ed25519"],
    note: "Nimiq Mini Apps Competition",
    live: "https://tipwall.vercel.app",
    repo: "https://github.com/natureloved/TipWall",
    category: "Product",
  },
  {
    id: "staxiq",
    name: "Staxiq",
    year: "2026",
    tagline:
      "Where should your Bitcoin sit? A yield view for Bitcoin DeFi on Stacks, scored by an open rubric that admits when its numbers disagree with DefiLlama.",
    stack: ["Clarity", "Stacks"],
    live: "https://staxiq.vercel.app",
    repo: "https://github.com/natureloved/Staxiq",
    category: "Product",
  },
  {
    id: "spansleuth",
    name: "SpanSleuth",
    year: "2026",
    tagline:
      "Forensic post-mortems for AI agents. When one fails at 3am it collects the trace and explains the cause in plain English.",
    stack: ["Python", "SigNoz MCP"],
    repo: "https://github.com/natureloved/SpanSleuth",
    category: "Tooling",
  },
  {
    id: "metaflux",
    name: "MetaFlux",
    year: "2026",
    tagline:
      "Ask your data catalogue a question in plain English and get lineage, quality scores and blast-radius analysis back.",
    stack: ["MCP", "OpenMetadata"],
    note: "Live demo is currently down, source only",
    repo: "https://github.com/natureloved/MetaFlux",
    category: "Tooling",
  },
  {
    id: "cantoflow",
    name: "CantoFlow",
    year: "2026",
    tagline:
      "Invoice financing where privacy is enforced by the smart contract, bids stay confidential from every other party in the deal.",
    stack: ["Daml", "Canton"],
    repo: "https://github.com/natureloved/CantoFlow",
    category: "Protocol",
  },
  {
    id: "expatship",
    name: "ExpatShip",
    year: "2026",
    tagline:
      "Cross-border shipping for people moving country: instant duty-inclusive quote, generated customs invoice, live route map. It labels what is computed and what is sample data.",
    stack: ["React", "Vite", "Supabase"],
    live: "https://expatship.vercel.app",
    repo: "https://github.com/natureloved/ExpatShip",
    category: "Product",
  },
  {
    id: "deadman-vault",
    name: "Deadman Vault",
    year: "2026",
    tagline:
      "A proof-of-life treasury. Check in on schedule and your funds stay put; stop and they move to the people you chose.",
    stack: ["Stacks", "Clarity"],
    live: "https://deadman-vault-eta.vercel.app",
    repo: "https://github.com/natureloved/DeadMan-Vault",
    category: "Protocol",
  },
  {
    id: "satsloom",
    name: "SatsLoom",
    year: "2026",
    tagline:
      "A self-hosted settlement router for merchants: takes a sat invoice, picks a liquidity route deterministically, and falls back when the best one disappears.",
    stack: ["TypeScript", "Tachi"],
    repo: "https://github.com/natureloved/SatsLoom",
    category: "Protocol",
  },
  {
    id: "hashpilot",
    name: "HashPilot",
    year: "2026",
    tagline:
      "A mining terminal that reads chain state and gives a straight answer: claim now, or wait. Plus a three-move playbook for your risk profile.",
    stack: ["Next.js", "Avalanche"],
    live: "https://hashpilot-taupe.vercel.app",
    repo: "https://github.com/natureloved/HashPilot",
    category: "Tooling",
  },
  {
    id: "tonpilot",
    name: "TonPilot",
    year: "2026",
    tagline:
      "A Telegram bot where you describe what you want done with your wallet in plain language, and it does it. No dashboard, no dApp.",
    stack: ["TypeScript", "TON"],
    live: "https://tonpilot.vercel.app",
    repo: "https://github.com/natureloved/TonPilot",
    category: "Agent",
  },
  {
    id: "stashflow",
    name: "StashFlow",
    year: "2026",
    tagline:
      "Goal-based savings where the goal is the point: name an amount, watch it fill up, earn yield the whole time.",
    stack: ["Next.js 16", "LI.FI"],
    live: "https://stashflow-two.vercel.app",
    repo: "https://github.com/natureloved/StashFlow",
    category: "Product",
  },
  {
    id: "tasky",
    name: "Tasky",
    year: "2026",
    tagline:
      "A Telegram bot that watches bounty boards, quests and hackathons and pushes them to you the moment they appear.",
    stack: ["Python", "Telegram"],
    repo: "https://github.com/natureloved/Tasky",
    category: "Tooling",
  },
];

export const LAB_CATEGORIES = ["All", "Product", "Protocol", "Agent", "Tooling"] as const;
export type LabCategory = (typeof LAB_CATEGORIES)[number];
