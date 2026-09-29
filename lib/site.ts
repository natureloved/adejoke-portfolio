export const SITE = {
  name: "Akinola Adejoke",
  alias: "RastaDev",
  location: "Lagos, Nigeria",
  email: "akinolaa769@gmail.com",
  github: "https://github.com/natureloved",
  linkedin: "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
  x: "https://x.com/adejoke_btc",
  resume: "/resume.pdf",
  availability: "Open to product & engineering work",
} as const;

/**
 * One line, no jargon. This is the first thing a visitor reads.
 */
export const ONE_LINER =
  "I build full-stack products and smart contracts, the software that moves money, records ownership, and saves people from doing things by hand.";

export const POSITIONING = {
  plain:
    "Most of my work is a working product with a URL: an app people can open, a payment that actually settles, a database that remembers correctly. I build for Bitcoin Layer-2s, AI agents, and institutions, and I care about whether a non-technical person can use what I ship.",
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
    value: "24",
    label: "live deployments",
    note: "all reachable from this page",
  },
  {
    value: "16",
    label: "shipped projects",
    note: "2026 alone, mostly hackathon and client-grade",
  },
] as const;

export const WHAT_I_DO = [
  {
    title: "Web apps people actually finish using",
    body: "Interfaces, auth, roles, payments, notifications, audit trails. Shipped end to end, not a prototype that stops at the login screen.",
  },
  {
    title: "Smart contracts and the rails around them",
    body: "Bitcoin L2, EVM, Starknet and Canton. The contract, the indexer, the relayer, the dashboard: the boring parts that make it real.",
  },
  {
    title: "AI that is accountable for what it does",
    body: "Agents that act on-chain, explain themselves, and are built so a human can inspect the audit trail afterwards.",
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

export const STORY = {
  lead:
    "I started in nursing, where a mistake is not a UX complaint: it's a patient. Then I moved into software and the instinct carried over: understand the system properly, get the details right, and never hide the part that is uncertain.",
  chapters: [
    {
      period: "Nursing",
      title: "Precision under real consequence",
      body: "Nursing taught me protocols where being wrong has a human cost. Diagnosis is a discipline: observe, narrow, verify, act. I still think that way about code.",
    },
    {
      period: "Software",
      title: "The leverage of a system you can change",
      body: "I moved into computer science and full-stack development, going quickly from fundamentals to shipping complete applications with real users and real money involved.",
    },
    {
      period: "Web3 & AI",
      title: "Money, ownership, and agents",
      body: "A Dev3Pack fellowship, then hackathons across Stacks, TON, Monad and Base: blank canvas to deployed prototype in 48–72 hours, repeatedly. This is where the work on this page comes from.",
    },
    {
      period: "Now",
      title: "Radiography and radiation science",
      body: "Studying medical imaging: precision physics, invisible systems, and the moment someone depends on your reading of them. It sharpens the engineering rather than competing with it.",
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

