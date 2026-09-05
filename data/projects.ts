export type Project = {
  id: string;
  name: string;
  badge: string;
  badgeType: "orange" | "purple" | "cyan";
  description: string;
  tags: string[];
  href: string;
  repo?: string;
  categories: string[];
  linkColor: string;
  accentGradient: string;
  hoverBorder: string;
  /** primary chain id (see data/chains.ts) — lights its node in the field on hover */
  chain: string;
  /** the 6 we feature at hero scale; the rest sit in the archive drawer */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "voz",
    name: "Voz",
    badge: "HACKATHON · DEV3PACK",
    badgeType: "orange",
    description:
      "A voice-first cross-border remittance app. Senders speak their payment intent in natural language, which is parsed by Claude and settled instantly via LI.FI across chains directly into the recipient's Solana wallet.",
    tags: ["Voice AI", "LI.FI", "Claude", "Solana", "Next.js"],
    href: "https://voz-three.vercel.app/",
    repo: "https://github.com/natureloved/Voz",
    categories: ["AI", "Solana", "DeFi"],
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
    chain: "solana",
    featured: true,
  },
  {
    id: "hashpilot",
    name: "HashPilot",
    badge: "HACKATHON · HASHATHON",
    badgeType: "purple",
    description:
      "A production-grade, retro-futuristic 'Mining Intelligence Terminal' built exclusively for the Club HashCash ecosystem on Avalanche. It combines real-time blockchain data with advanced AI modeling to provide miners with tactical decision support.",
    tags: ["AI", "Next.js", "Anthropic", "Strategy"],
    href: "https://hashpilot-taupe.vercel.app/",
    repo: "https://github.com/natureloved/HashPilot",
    categories: ["AI"],
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
    chain: "avalanche",
  },
  {
    id: "stashflow",
    name: "StashFlow",
    badge: "HACKATHON · DEFI MULLET",
    badgeType: "cyan",
    description:
      "Goal-based DeFi savings powered by LI.FI Earn — set a savings goal, deposit into yield-generating vaults, and watch your progress compound. Portfolio monitoring and goal tracking in one clean dashboard.",
    tags: ["DeFi", "LI.FI", "Next.js", "Web3"],
    href: "https://stashflow-two.vercel.app/",
    repo: "https://github.com/natureloved/StashFlow",
    categories: ["DeFi"],
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
    chain: "evm",
  },
  {
    id: "staxiq",
    name: "Staxiq",
    badge: "FLAGSHIP PROJECT",
    badgeType: "orange",
    featured: true,
    description:
      "The Zerion of Bitcoin L2. Staxiq is a unified DeFi aggregator and AI copilot built on the Stacks blockchain — letting users discover, compare, and manage Bitcoin DeFi protocols in one place.",
    tags: ["Stacks", "Clarity", "Next.js", "React", "DefiLlama API"],
    href: "https://staxiq.vercel.app/",
    repo: "https://github.com/natureloved/Staxiq",
    categories: ["Bitcoin & Stacks", "AI", "DeFi"],
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
    chain: "stacks",
  },
  {
    id: "runes-rumble",
    name: "Runes Rumble",
    badge: "HACKATHON · MIDL",
    badgeType: "purple",
    description:
      "A prediction market for Runes — Bitcoin's newest token standard. Built for the MIDL Hackathon, Runes Rumble lets users bet on Rune price movements in a trustless environment.",
    tags: ["Bitcoin", "Runes", "Prediction Market", "On-chain"],
    href: "https://runes-rumble.vercel.app/",
    categories: ["Bitcoin & Stacks", "DeFi"],
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
    chain: "bitcoin",
  },
  {
    id: "ton-pilot",
    name: "TonPilot",
    badge: "HACKATHON · TON",
    badgeType: "cyan",
    featured: true,
    description:
      "An agentic wallet automation tool for the TON ecosystem. TonPilot streamlines on-chain interactions through an intelligent Telegram bot interface, focusing on security and ease of use.",
    tags: ["TON", "TypeScript", "Telegram API", "Automation"],
    href: "https://t.me/TonAutoPilotBot",
    repo: "https://github.com/natureloved/TonPilot",
    categories: ["TON", "AI"],
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
    chain: "ton",
  },
  {
    id: "tipwall",
    name: "TipWall",
    badge: "NEW · NIMIQ",
    badgeType: "orange",
    description:
      "A decentralized tipping wall for creators. Anyone can spin up a personal page with a unique handle, set fundraising goals, and receive NIM tips directly to their wallet — no middlemen, no platform fees, wallet-signed profile ownership.",
    tags: ["Nimiq", "WalletConnect", "Creator Economy", "Next.js"],
    href: "https://tipwall.vercel.app/",
    repo: "https://github.com/natureloved/TipWall",
    categories: ["Nimiq"],
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
    chain: "nimiq",
  },
  {
    id: "deadman-vault",
    name: "Deadman Vault",
    badge: "NEW · STACKS",
    badgeType: "purple",
    featured: true,
    description:
      "An on-chain crypto inheritance protocol. Lock USDCx in a vault, prove you're alive with periodic heartbeat check-ins — miss your window and the vault automatically splits funds to your heirs, with optional vesting cliffs. Zero lawyers required.",
    tags: ["Stacks", "FlowVault", "Clarity", "DeFi"],
    href: "https://deadman-vault-eta.vercel.app/",
    repo: "https://github.com/natureloved/DeadMan-Vault",
    categories: ["Bitcoin & Stacks", "DeFi"],
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
    chain: "stacks",
  },
  {
    id: "clarityquest",
    name: "ClarityQuest",
    badge: "NEW · STACKS",
    badgeType: "cyan",
    featured: true,
    description:
      "Learn Clarity by shipping it. 20 progressive smart contract challenges running entirely in the browser via Clarinet WASM — write real code, get instant test feedback, climb the leaderboard, and mint SIP-009 NFT badges on Stacks mainnet as proof.",
    tags: ["Stacks", "Clarity", "Clarinet WASM", "Education", "NFT"],
    href: "https://clarityquest-delta.vercel.app/",
    repo: "https://github.com/natureloved/ClarityQuest",
    categories: ["Bitcoin & Stacks"],
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
    chain: "stacks",
  },
  {
    id: "proof-of-rest",
    name: "Proof of Rest",
    badge: "HACKATHON · MONAD",
    badgeType: "orange",
    featured: true,
    description:
      "An on-chain commitment device for solo builders who overwork. Lock a MON stake to start a timed work session — finish in time and reclaim it plus a share of the reward pool, run over and forfeit a cut. Contract-enforced cooldowns, soulbound streak badges, and RestGuardian, a keyless AI agent that builds and simulates transactions without ever signing.",
    tags: ["Monad", "Solidity", "Foundry", "wagmi", "AI Agent"],
    href: "https://proof-of-rest.vercel.app/",
    repo: "https://github.com/natureloved/Proof-of-Rest",
    categories: ["Monad", "DeFi", "AI"],
    linkColor: "var(--orange)",
    accentGradient: "linear-gradient(90deg, var(--orange), var(--purple))",
    hoverBorder: "var(--orange)",
    chain: "monad",
  },
  {
    id: "expatship",
    name: "ExpatShip",
    badge: "NEW · SUPABASE",
    badgeType: "cyan",
    description:
      "Cross-border shipping and customs, simplified. Pick an origin and destination to get an instant duty-inclusive rate quote and ETA, generate a printable customs commercial invoice, and track your parcel along a live delivery timeline — all behind an authenticated client portal.",
    tags: ["React", "Vite", "Supabase", "Recharts", "Tailwind"],
    href: "https://expatship.vercel.app/",
    repo: "https://github.com/natureloved/ExpatShip",
    categories: ["Web2"],
    linkColor: "var(--cyan)",
    accentGradient: "linear-gradient(90deg, var(--cyan), var(--orange))",
    hoverBorder: "var(--cyan)",
    chain: "evm",
  },
  {
    id: "tasky",
    name: "Tasky",
    badge: "NEW · TELEGRAM",
    badgeType: "purple",
    description:
      "A Telegram bot that hunts down short-term earning opportunities so you don't have to. It monitors public feeds for crypto quests, bounties, airdrops, hackathons, and dev gigs, then pushes real-time alerts to subscribers based on the categories they pick — invite-gated, with pluggable scrapers.",
    tags: ["Python", "Telegram Bot", "SQLite", "Web Scraping", "Automation"],
    href: "https://t.me/taskynotify_bot",
    repo: "https://github.com/natureloved/Tasky",
    categories: ["Web2"],
    linkColor: "var(--purple)",
    accentGradient: "linear-gradient(90deg, var(--purple), var(--cyan))",
    hoverBorder: "var(--purple)",
    chain: "evm",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archivedProjects = projects.filter((p) => !p.featured);
