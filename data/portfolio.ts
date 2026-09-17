export interface FeaturedProject {
  id: string;
  number: string;
  name: string;
  tagline: string;
  caseStudy: string;
  role: string;
  stack: string[];
  year: string;
  href: string;
  repo?: string;
  atmosphere: {
    accent: string;
    accentSecondary: string;
    ambientGlow: string;
    badgeBg: string;
    badgeBorder: string;
    cardBg: string;
    terminalAccent: string;
  };
}

export interface BuilderStage {
  id: string;
  step: string;
  title: string;
  tagline: string;
  description: string;
  tools: string[];
}

export interface LabProject {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  status: string;
  category: "DeFi" | "Payments" | "Developer tools" | "Experiments";
  href: string;
  repo?: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlight?: string;
  tags: string[];
}

export const HERO_KEYWORDS = [
  "Bitcoin",
  "DeFi",
  "Smart contracts",
  "Full-stack products",
  "Cross-chain systems",
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "staxiq",
    number: "01",
    name: "STAXIQ",
    tagline: "A unified DeFi interface for the Stacks ecosystem.",
    caseStudy:
      "The Zerion of Bitcoin Layer 2. Fragmented protocols make tracking yields, swaps, and liquidity pools across Stacks cumbersome. Staxiq unifies protocol telemetry, portfolio balances, and AI-driven liquidity analysis into one cohesive dashboard—giving builders and capital allocators clarity on Bitcoin L2.",
    role: "Full-Stack & Protocol Architect",
    stack: ["Stacks", "Clarity", "Next.js", "TypeScript", "DefiLlama API", "Tailwind"],
    year: "2024",
    href: "https://staxiq.vercel.app/",
    repo: "https://github.com/natureloved/Staxiq",
    atmosphere: {
      accent: "#00f076",
      accentSecondary: "#22c55e",
      ambientGlow: "rgba(0, 240, 118, 0.08)",
      badgeBg: "rgba(0, 240, 118, 0.12)",
      badgeBorder: "rgba(0, 240, 118, 0.3)",
      cardBg: "#0d1310",
      terminalAccent: "#00f076",
    },
  },
  {
    id: "voz",
    number: "02",
    name: "VOZ",
    tagline: "Voice-first cross-border remittance across chains via Solana & LI.FI.",
    caseStudy:
      "Cross-border remittance interfaces are notorious for friction, requiring manual slippage config and routing choices. Voz replaces clunky forms with natural human speech: senders speak their payment intent in plain language, Claude parses the semantic context, and LI.FI settles the bridge instantly into the recipient's Solana wallet.",
    role: "Lead Systems & AI Engineer",
    stack: ["Voice AI", "Claude 3.5", "LI.FI Protocol", "Solana", "Next.js"],
    year: "2024",
    href: "https://voz-three.vercel.app/",
    repo: "https://github.com/natureloved/Voz",
    atmosphere: {
      accent: "#60a5fa",
      accentSecondary: "#818cf8",
      ambientGlow: "rgba(96, 165, 250, 0.09)",
      badgeBg: "rgba(96, 165, 250, 0.12)",
      badgeBorder: "rgba(96, 165, 250, 0.3)",
      cardBg: "#0c101a",
      terminalAccent: "#60a5fa",
    },
  },
  {
    id: "tipwall",
    number: "03",
    name: "TIPWALL",
    tagline: "A decentralized creator tipping wall for Nimiq Pay.",
    caseStudy:
      "Web2 creator tipping platforms extract punishing platform fees and custody creator funds. TipWall is a lightweight, self-sovereign tipping wall where creators own their page with a cryptographic signature, set transparent community fundraising goals, and receive direct P2P NIM tips with zero platform cuts.",
    role: "Frontend & Protocol Lead",
    stack: ["Nimiq Pay", "WalletConnect", "Next.js", "TypeScript", "Tailwind"],
    year: "2024",
    href: "https://tipwall.vercel.app/",
    repo: "https://github.com/natureloved/TipWall",
    atmosphere: {
      accent: "#ff7a45",
      accentSecondary: "#ffa940",
      ambientGlow: "rgba(255, 122, 69, 0.08)",
      badgeBg: "rgba(255, 122, 69, 0.12)",
      badgeBorder: "rgba(255, 122, 69, 0.3)",
      cardBg: "#16110e",
      terminalAccent: "#ff7a45",
    },
  },
  {
    id: "clarityquest",
    number: "04",
    name: "CLARITYQUEST",
    tagline: "Interactive browser-based smart contract masterclass for Stacks.",
    caseStudy:
      "Clarity's decidable, non-Turing complete smart contract architecture demands hands-on execution. ClarityQuest offers 20 progressive challenges executed completely in-browser via Clarinet WebAssembly—allowing developers to compile, test, debug real code in real time, and mint verifiable SIP-009 NFT badges on Stacks.",
    role: "Creator & Educational Systems Engineer",
    stack: ["Stacks", "Clarity", "Clarinet WASM", "Next.js", "SIP-009 NFT"],
    year: "2024",
    href: "https://clarityquest-delta.vercel.app/",
    repo: "https://github.com/natureloved/ClarityQuest",
    atmosphere: {
      accent: "#38bdf8",
      accentSecondary: "#c084fc",
      ambientGlow: "rgba(56, 189, 248, 0.08)",
      badgeBg: "rgba(56, 189, 248, 0.12)",
      badgeBorder: "rgba(56, 189, 248, 0.3)",
      cardBg: "#0c1318",
      terminalAccent: "#38bdf8",
    },
  },
];

export const BUILDER_STAGES: BuilderStage[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover",
    tagline: "Understand the problem",
    description:
      "Before writing a line of code or deploying a contract, I dissect the system mechanics: user friction points, economic incentives, transaction flows, and state constraints.",
    tools: ["System mapping", "Protocol tokenomics", "User flows", "Specification docs", "Security threat modeling"],
  },
  {
    id: "design",
    step: "02",
    title: "Design",
    tagline: "Shape the experience",
    description:
      "Complex systems must feel intuitive. I design responsive layout hierarchies, tactile micro-animations, clear transaction states, and information architecture that inspires user trust.",
    tools: ["Information architecture", "Interactive prototypes", "Design tokens", "Figma", "Micro-interactions"],
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    tagline: "Create the interface and system",
    description:
      "Bridging the full spectrum from responsive frontends down to smart contract state. Writing clean, typed, modular code designed for maintainability and deterministic execution.",
    tools: [
      "React, Next.js, TypeScript",
      "Node.js, APIs, databases",
      "Solidity, Clarity, Cairo",
      "Stacks, Bitcoin L2s, DeFi protocols",
    ],
  },
  {
    id: "ship",
    step: "04",
    title: "Ship",
    tagline: "Test, improve, and release",
    description:
      "Robust automated tests, local testnet simulation, mainnet deployment, telemetry monitoring, and tight feedback loops to continuously refine product performance.",
    tools: ["Clarinet WASM & Vitest", "Foundry / Hardhat", "Vercel / Edge deploys", "Continuous feedback", "Mainnet verification"],
  },
];

export const LAB_PROJECTS: LabProject[] = [
  {
    id: "ton-pilot",
    name: "TonPilot",
    tagline: "Agentic wallet automation bot for the TON ecosystem.",
    stack: ["TON", "TypeScript", "Telegram API", "Automation"],
    status: "Built and live",
    category: "Developer tools",
    href: "https://t.me/TonAutoPilotBot",
    repo: "https://github.com/natureloved/TonPilot",
  },
  {
    id: "hashpilot",
    name: "HashPilot",
    tagline: "Mining intelligence terminal built for Club HashCash on Avalanche.",
    stack: ["AI", "Next.js", "Anthropic", "Avalanche"],
    status: "Built and live",
    category: "Developer tools",
    href: "https://hashpilot-taupe.vercel.app/",
    repo: "https://github.com/natureloved/HashPilot",
  },
  {
    id: "stashflow",
    name: "StashFlow",
    tagline: "Goal-based DeFi savings powered by LI.FI Earn vaults.",
    stack: ["DeFi", "LI.FI", "Next.js", "Web3"],
    status: "Built and live",
    category: "DeFi",
    href: "https://stashflow-two.vercel.app/",
    repo: "https://github.com/natureloved/StashFlow",
  },
  {
    id: "runes-rumble",
    name: "Runes Rumble",
    tagline: "Prediction market for Bitcoin Runes token price movements.",
    stack: ["Bitcoin", "Runes", "Prediction Market", "On-chain"],
    status: "Hackathon project",
    category: "Experiments",
    href: "https://runes-rumble.vercel.app/",
  },
  {
    id: "proof-of-rest",
    name: "Proof of Rest",
    tagline: "On-chain commitment device on Monad with keyless AI agent RestGuardian.",
    stack: ["Monad", "Solidity", "Foundry", "wagmi", "AI Agent"],
    status: "Hackathon winner",
    category: "Experiments",
    href: "https://proof-of-rest.vercel.app/",
    repo: "https://github.com/natureloved/Proof-of-Rest",
  },
  {
    id: "deadman-vault",
    name: "Deadman Vault",
    tagline: "On-chain crypto inheritance protocol with heartbeat check-ins on Stacks.",
    stack: ["Stacks", "FlowVault", "Clarity", "DeFi"],
    status: "Built and live",
    category: "DeFi",
    href: "https://deadman-vault-eta.vercel.app/",
    repo: "https://github.com/natureloved/DeadMan-Vault",
  },
  {
    id: "expatship",
    name: "ExpatShip",
    tagline: "Cross-border shipping calculator, duty invoice generator, and live tracking.",
    stack: ["React", "Vite", "Supabase", "Tailwind"],
    status: "Built and live",
    category: "Payments",
    href: "https://expatship.vercel.app/",
    repo: "https://github.com/natureloved/ExpatShip",
  },
  {
    id: "tasky",
    name: "Tasky",
    tagline: "Telegram bot hunting down bounties, quests, and dev earning opportunities.",
    stack: ["Python", "Telegram Bot", "SQLite", "Scraping"],
    status: "Built and live",
    category: "Developer tools",
    href: "https://t.me/taskynotify_bot",
    repo: "https://github.com/natureloved/Tasky",
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: "Foundations",
    title: "Nursing Studies & Clinical Rigor",
    subtitle: "Understanding human biology, systematic care, and precision under pressure.",
    description:
      "Studying Nursing instilled a deep appreciation for high-stakes protocols and precision. In healthcare, failure isn't an option: procedures require rigorous diagnostic discipline, empathy, and systematic thinking.",
    tags: ["Systems thinking", "Diagnostics", "Precision", "Human empathy"],
  },
  {
    period: "Transition",
    title: "Transition into Software & Algorithms",
    subtitle: "Discovering programmable logic and building full-stack applications.",
    description:
      "Fascinated by the leverage of software, I transitioned into computer science and software development. Moving quickly from fundamentals of JavaScript, TypeScript, and modern web frameworks to building full-stack applications that solve real-world problems.",
    tags: ["TypeScript", "Next.js", "APIs", "Data Structures"],
  },
  {
    period: "Fellowships & Acceleration",
    title: "Dev3Pack Fellowship & Global Hackathons",
    subtitle: "Shipping under tight deadlines with top Web3 developer cohorts.",
    description:
      "Selected for the Dev3Pack fellowship for engineers transitioning from Web2 to Web3. Built and competed in intense international hackathons (MIDL, Hashathon, Monad, TON, Stacks), repeatedly taking projects from blank canvas to deployed functional prototypes in 48-72 hours.",
    tags: ["Dev3Pack", "Hackathon Champion", "Rapid Prototyping", "Peer Review"],
  },
  {
    period: "Specialization",
    title: "Bitcoin L2s, Smart Contracts & DeFi",
    subtitle: "Mastering Clarity, Solidity, Cairo, and decentralized finance mechanics.",
    description:
      "Deepened technical mastery of multi-chain smart contracts. Specializing in Stacks (Clarity's decidable smart contract language), EVM (Solidity/Foundry), and Starknet (Cairo), designing financial infrastructure and protocol tooling for the next generation of money and ownership.",
    tags: ["Bitcoin L2", "Stacks / Clarity", "EVM / Solidity", "DeFi Architecture"],
  },
  {
    period: "Current Focus",
    title: "Radiography & Radiation Science Admission",
    subtitle: "Bridging invisible physics, medical imaging systems, and computational engineering.",
    description:
      "Currently pursuing studies in Radiography and Radiation Science. Exploring the intersection of precision radiation physics, medical imaging diagnostics, and computational systems—reinforcing how technology and human biology meet.",
    highlight: "Different fields, same instinct: understand complex systems and make them useful to people.",
    tags: ["Radiation Science", "Medical Imaging", "Systems Precision", "Active Pursuit"],
  },
];

export const CONTACT_DATA = {
  headline: "Let’s build something useful.",
  subhead:
    "I’m interested in thoughtful products, blockchain systems, developer tools, and unusual ideas that deserve to exist.",
  email: "akinolaa769@gmail.com",
  github: "https://github.com/natureloved",
  linkedin: "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
  twitter: "https://x.com/adejoke_btc",
  resume: "/resume.pdf",
};
