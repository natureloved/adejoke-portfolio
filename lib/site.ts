export const SITE = {
  name: "Akinola Adejoke",
  alias: "RastaDev",
  email: "akinolaa769@gmail.com",
  github: "https://github.com/natureloved",
  linkedin: "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
  x: "https://x.com/RastaDev_",
  resume: "/resume.pdf",
  availability: "Open to product & engineering work",
  /**
   * The build date, stamped at build time in next.config.mjs so the colophon
   * tells a visitor when the page was actually made rather than when they
   * happened to load it. A fixed string would drift the moment it was
   * written; `new Date()` at render would claim the page changes daily.
   */
  lastUpdated: process.env.NEXT_PUBLIC_BUILD_TIME ?? "",
} as const;

/**
 * The canonical origin, defined once.
 *
 * Metadata, sitemap, robots, JSON-LD and the OG image all need this. It used
 * to be repeated as a fallback in each of those files, which meant fixing the
 * domain in one place left the rest pointing at the deployment alias. Any
 * module that needs the origin imports it from here instead of re-deriving it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adejoke.my.id"
).replace(/\/$/, "");

/**
 * One line, no jargon. This is the first thing a visitor reads.
 */
export const ONE_LINER =
  "I build full-stack products and smart contracts, the software that moves money, records ownership, and saves people from doing things by hand.";

export const POSITIONING = {
  plain:
    "Most of my work is a working product with a URL: an app people can open, a payment that actually settles, a database that remembers correctly. I care about the parts that are easy to skip, and about whether someone outside this field can use what I ship without a manual.",
  technical:
    "Full-stack and protocol engineering across Bitcoin L2s (Stacks/Clarity, SatVM), EVM (Solidity/Foundry), Starknet (Cairo), Monad, Base, Solana and Canton. TypeScript end to end; smart contracts, backends, and the interface that sits on top of them.",
} as const;

export const HERO_PROOF = [
  {
    value: "109",
    label: "automated tests",
    note: "in the flagship credit protocol",
  },
  {
    value: "12",
    label: "live demos",
    note: "each one loads, checked from this page",
  },
  {
    value: "13",
    label: "open-source projects",
    note: "every one linked to its repository",
  },
] as const;

export const WHAT_I_DO = [
  {
    title: "Web apps people actually finish using",
    body: "Interfaces, auth, roles, payments, notifications, audit trails. Shipped end to end, not a prototype that stops at the login screen.",
    examples: "Acadex / exam scheduling · DrawBound / credit",
  },
  {
    title: "Smart contracts and the rails around them",
    body: "Bitcoin L2, EVM, Starknet and Canton. The contract, the indexer, the relayer, the dashboard: the boring parts that make it real.",
    examples: "DrawBound / L2 credit · PegWatch / agent risk",
  },
  {
    title: "AI that is accountable for what it does",
    body: "Agents that act on-chain, explain themselves, and are built so a human can inspect the audit trail afterwards.",
    examples: "TonPilot / plain-language wallet · HashPilot / mining terminal",
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Find the real problem",
    body: "Most briefs describe a symptom. I go looking for the actual failure, who it hurts, how often, and what it costs them today.",
  },
  {
    step: "02",
    title: "Decide what must be true",
    body: "Before writing code I write down the rules the system cannot break, and what the user sees at each step. If I can't state it, I haven't understood it yet.",
  },
  {
    step: "03",
    title: "Build it properly",
    body: "Typed end to end, tests around the risky parts, honest about which data is real and which is illustrative.",
  },
  {
    step: "04",
    title: "Show the evidence",
    body: "A live URL, a test run, a screenshot. Anyone can claim to have built something; I'd rather you check than take my word.",
  },
] as const;

/** A short reminder under the process, because the steps sound tidy but rarely are. */
export const PROCESS_NOTE =
  "In practice steps 1 and 2 overlap, and step 3 is where the schedule slips. I would rather tell you that now than promise a date I cannot keep.";

export const ABOUT_FACTS = [
  "First-year radiography student",
  "Full-stack & blockchain developer",
  "Open to contracts and teams",
] as const;

/**
 * "The person": who is behind everything else on the page.
 *
 * The framing is deliberate - two fields, one instinct, and the through-line
 * is problem-solving rather than a list of technologies. Radiography is
 * present because it is what is happening now, not as a detour from the
 * development work: both are about reading something ambiguous carefully
 * and refusing to guess.
 *
 * The chapters are ordered from what came first to what is happening now.
 * A copy named in `examples` must exist as a flagship or a lab entry, or it
 * is a claim a reader cannot check - which is the one thing this page
 * promises not to do.
 */
export const STORY = {
  lead:
    "I started as a full-stack and blockchain developer. Now I'm a first-year radiography student. The distance between those two is smaller than it looks: both are about understanding a system properly and refusing to guess.",
  middle:
    "In software, the hard part was never the code. It was knowing what the person on the other end actually needed, and building for them rather than for the stack. In radiography it means reading an image that could be anything, and being honest about what you can and cannot see.",
  /**
   * The problem-solving reframe, stated as evidence rather than sentiment.
   * Every claim points at a project the reader can open from this page.
   */
  drive: {
    title: "Every project here exists because something was harder than it needed to be.",
    body:
      "An exam calendar that took a department a week to build and could quietly go out of date. A withdrawal threshold that stranded small balances. A remittance flow that assumed the person receiving the money could read a wallet address. A support wall that took a cut of the money it was meant to pass through.",
    close:
      "That is the whole instinct: find the friction, understand it properly, remove it, and hand someone a thing that just works. If a problem needs a spreadsheet and a process change rather than an app, that is the answer too.",
  },
  chapters: [
    {
      period: "Software",
      title: "Where it started",
      body:
        "Full-stack and blockchain development, from the fundamentals through to shipping complete applications with real users and real money involved.",
    },
    {
      period: "Web3 & AI",
      title: "The pace",
      body:
        "A Dev3Pack fellowship, then hackathons across Stacks, TON, Monad and Base. Blank canvas to deployed prototype in 48–72 hours, repeatedly. This is where most of the work on this page comes from.",
    },
    {
      period: "Radiography",
      title: "Now, first year",
      body:
        "Medical imaging: precision physics, invisible systems, and the moment someone depends on your reading of them. It sharpens the engineering rather than competing with it.",
    },
  ],
  closing:
    "Different fields, same instinct: take something complicated, understand it honestly, and make it usable by someone who has never heard of it.",
} as const;

export const CONTACT = {
  headline: "Let's build something useful.",
  sub:
    "Open to product and engineering work, a contract, a protocol, a product that needs shipping, or a team that needs a technical lead. I reply to everything that looks like a real problem.",
} as const;

/**
 * Plain-English definitions, shown as a permanent glossary.
 *
 * The previous build hid these behind hover tooltips, which do not exist
 * on a touchscreen, and most visitors to a portfolio are on a phone. Every
 * term here is also a link target, so inline jargon can point at its entry.
 */
export const GLOSSARY: { term: string; short: string; def: string }[] = [
  {
    term: "Bitcoin L2",
    short: "layer 2",
    def: "A second layer built on top of Bitcoin. Faster and cheaper than Bitcoin itself, but the transactions still settle back onto Bitcoin.",
  },
  {
    term: "Smart contract",
    short: "smart contract",
    def: "A program deployed to a blockchain that holds money or rules and runs on its own. Nobody can quietly change it afterwards.",
  },
  {
    term: "DeFi",
    short: "DeFi",
    def: "Decentralised finance: lending, trading and savings apps that run without a bank or broker in the middle.",
  },
  {
    term: "Self-custodial",
    short: "self-custodial",
    def: "You hold the keys. Nobody else can move your money, including whoever built the app.",
  },
  {
    term: "Testnet",
    short: "testnet",
    def: "A practice copy of a blockchain. Real code, fake money, free to break. Where most of these projects run.",
  },
  {
    term: "Oracle",
    short: "oracle",
    def: "A service that brings outside data, a price, say, on to a blockchain, which cannot reach the internet by itself.",
  },
  {
    term: "Cross-chain",
    short: "cross-chain",
    def: "Moving value between two different blockchains.",
  },
  {
    term: "Settlement",
    short: "settlement",
    def: "The moment money actually lands and can no longer be reversed.",
  },
  {
    term: "Collateral",
    short: "collateral",
    def: "Something you lock up as a promise that you will pay it back.",
  },
  {
    term: "Agent",
    short: "agent",
    def: "A program that takes actions on someone's behalf, rather than only answering questions.",
  },
  {
    term: "MCP",
    short: "MCP",
    def: "Model Context Protocol: an open standard that lets an AI assistant connect to other tools and data sources.",
  },
  {
    term: "WASM",
    short: "WASM",
    def: "WebAssembly: running a real computer program inside a web browser, so a developer needs nothing installed.",
  },
  {
    term: "Tokenised",
    short: "tokenised",
    def: "An asset like a share, represented as a token that can be traded on a blockchain.",
  },
];

