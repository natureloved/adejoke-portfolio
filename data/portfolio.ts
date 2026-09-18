export interface CaseStudyDeepDive {
  title: string;
  problem: string;
  architecture: { component: string; detail: string }[];
  keyChallenges: string[];
  verifiableResults: string[];
}

export interface FeaturedProject {
  id: string;
  number: string;
  name: string;
  tagline: string;
  whatItIs: string;
  whyItMatters: string;
  whatIBuilt: string[];
  whatActuallyWorks: string[];
  proofBadge: string;
  role: string;
  stack: string[];
  year: string;
  href: string;
  repo?: string;
  deepDive?: CaseStudyDeepDive;
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
  visualIcon: string;
  tools: string[];
  deliverables: string[];
}

export interface LabProject {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  status: string;
  category: "DeFi" | "Payments" | "Developer tools" | "Automation" | "Hackathons";
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
  "Bitcoin DeFi, full-stack products, and smart contracts",
  "Cross-chain remittance & multi-protocol routing",
  "Decidable smart contract architecture on Stacks",
  "High-performance responsive Web3 frontends",
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "staxiq",
    number: "01",
    name: "STAXIQ",
    tagline: "A unified portfolio dashboard and liquidity tracker for Bitcoin Layer-2 assets on Stacks.",
    whatItIs:
      "A specialized portfolio analytics and liquidity aggregation dashboard designed specifically for Bitcoin Layer-2 protocols on Stacks.",
    whyItMatters:
      "DeFi protocols on Stacks (ALEX, Velar, Bitflow) operate on fragmented liquidity pools and disparate telemetry APIs, making position tracking and yield optimization disjointed for capital allocators.",
    whatIBuilt: [
      "Engineered an aggregation layer compiling protocol metrics, pool depth, and swap spreads from DefiLlama and Stacks node RPCs.",
      "Designed a responsive, high-density dashboard with real-time portfolio rebalance simulations and LP yield telemetry.",
      "Integrated non-custodial wallet connectivity via Hiro and Leather wallet extensions.",
    ],
    whatActuallyWorks: [
      "Live protocol TVL and 24-hour volume monitoring across ALEX and Velar.",
      "Dynamic liquidity depth analysis and swap spread calculation.",
      "Interactive portfolio rebalancing simulation with zero custody.",
    ],
    proofBadge: "Interactive Working Prototype",
    role: "Full-Stack & Protocol Architect",
    stack: ["Stacks", "Clarity", "Next.js", "TypeScript", "DefiLlama API", "Tailwind"],
    year: "2024",
    href: "https://staxiq.vercel.app/",
    repo: "https://github.com/natureloved/Staxiq",
    deepDive: {
      title: "Staxiq: Multi-Protocol DeFi Telemetry & Aggregation on Bitcoin L2",
      problem:
        "Tracking liquidity positions across disparate Stacks protocols previously required multiple tabs and manual arithmetic. With block times tied to Bitcoin settlement, builders needed a fast, client-side caching mechanism to analyze liquidity without lag.",
      architecture: [
        {
          component: "Data Aggregator",
          detail: "Polls DefiLlama yield endpoints and Stacks RPC endpoints with client-side SWR caching to prevent rate-limiting.",
        },
        {
          component: "State Engine",
          detail: "Deterministic portfolio value calculator accounting for fluctuating STX/sUSDC pair ratios and pool fee tiers.",
        },
        {
          component: "User Interface",
          detail: "Low-latency dashboard with tactile hover interactions and instant visual rebalance simulation.",
        },
      ],
      keyChallenges: [
        "Reconciling asynchronous block confirmation intervals between Stacks and Bitcoin.",
        "Normalizing disparate pool fee structures (ALEX AMM curves vs. Velar orderbook models).",
      ],
      verifiableResults: [
        "Consolidated 3 major Stacks DeFi pools into one unified view.",
        "Sub-100ms client-side filter and simulation response times.",
        "Fully open-source code repository with clear documentation.",
      ],
    },
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
    tagline: "Voice-first cross-border remittance engine executing instant multi-chain transfers into Solana.",
    whatItIs:
      "A voice-initiated remittance interface that turns natural human speech into verified cross-chain transactions settled on Solana.",
    whyItMatters:
      "Cross-border payments across different blockchains traditionally require navigating clunky bridge interfaces, manual token approvals, slippage tolerances, and network switching—creating friction for everyday remitters.",
    whatIBuilt: [
      "Integrated Claude 3.5 Sonnet to parse conversational speech transcripts into structured financial intents (amount, asset, recipient).",
      "Connected LI.FI's cross-chain routing SDK to determine optimal swap and bridge paths across source chains into Solana.",
      "Engineered an audio waveform visualizer and an unambiguous transaction confirmation state.",
    ],
    whatActuallyWorks: [
      "Semantic voice intent parsing with automatic recipient resolution.",
      "Dynamic cross-chain route estimation via LI.FI protocols.",
      "Sub-second settlement confirmation into Solana testnet wallets.",
    ],
    proofBadge: "Prototype • LI.FI & Claude AI",
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
    tagline: "A decentralized creator tipping wall and community micro-funding platform for Nimiq Pay.",
    whatItIs:
      "A self-sovereign, 0% platform fee creator tipping wall where creators own their page with cryptographic keys and receive direct peer-to-peer NIM tips.",
    whyItMatters:
      "Centralized creator platforms take up to 30% cuts, enforce restrictive payout thresholds, and custody creator funds. TipWall eliminates intermediaries entirely.",
    whatIBuilt: [
      "Engineered direct peer-to-peer tipping logic that deposits tips straight into the creator's non-custodial Nimiq address.",
      "Implemented cryptographic wallet signature verification so creators authenticate profile edits without usernames, passwords, or centralized databases.",
      "Built dynamic community fundraising goal progress tracking with instant visual receipt feedback.",
    ],
    whatActuallyWorks: [
      "100% peer-to-peer NIM transfers with zero platform extraction.",
      "Cryptographically verified profile ownership via wallet signatures.",
      "Dynamic goal tracking with live percentage progress.",
    ],
    proofBadge: "Production Prototype • 0% Fees",
    role: "Frontend & Protocol Lead",
    stack: ["Nimiq Pay", "WalletConnect", "Next.js", "TypeScript", "Tailwind"],
    year: "2024",
    href: "https://tipwall.vercel.app/",
    repo: "https://github.com/natureloved/TipWall",
    deepDive: {
      title: "TipWall: Non-Custodial Creator Micro-Funding on Nimiq Pay",
      problem:
        "Creators in developing markets struggle with traditional payment rails due to international wire fees, chargebacks, and high platform cuts. TipWall needed to provide a frictionless web tipping experience that settled immediately on-chain.",
      architecture: [
        {
          component: "Signature Auth",
          detail: "Profile edits are signed with the creator's private key via Nimiq Hub/WalletConnect, verified client-side with no server credentials.",
        },
        {
          component: "Payment Stream",
          detail: "Generates dynamic QR codes and deep links encoding transaction payloads for the Nimiq Pay mobile app.",
        },
        {
          component: "Telemetry & Goal Tracker",
          detail: "Monitors address balance changes to advance fundraising goal progress in real time.",
        },
      ],
      keyChallenges: [
        "Providing an interface simple enough for non-crypto audiences while maintaining strict non-custodial security.",
        "Ensuring instant feedback when micro-tips confirm in the browser.",
      ],
      verifiableResults: [
        "Zero custody and zero platform fees on all transactions.",
        "Under 2-second QR code generation and wallet dispatch.",
        "Live open-source deployment on Vercel.",
      ],
    },
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
    tagline: "Interactive in-browser smart contract masterclass executing Clarity code via WebAssembly.",
    whatItIs:
      "A hands-on educational platform where developers write, compile, and test Clarity smart contracts entirely in the browser using Clarinet WebAssembly.",
    whyItMatters:
      "Clarity's decidable, non-Turing-complete language has unique execution rules. Setting up local Rust toolchains and CLI environments discourages developers from experimenting.",
    whatIBuilt: [
      "Compiled the Clarinet testing suite into in-browser WebAssembly (WASM), enabling sub-second contract compilation and testing without backend servers.",
      "Authored 20 structured challenges covering Clarity fundamentals up to production SIP-009 NFT minting contracts.",
      "Connected verifiable completion logic to mint on-chain accomplishment badges on Stacks.",
    ],
    whatActuallyWorks: [
      "In-browser WASM compilation and automated test runner.",
      "Real-time syntax diagnostics and error feedback.",
      "Verifiable SIP-009 badge contract execution.",
    ],
    proofBadge: "In-Browser Clarinet WASM • 20 Challenges",
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
    tagline: "Problem & System Modeling",
    description:
      "Dissecting system constraints, state invariants, user friction, and economic incentives before writing code.",
    visualIcon: "🔍",
    tools: ["System Mapping", "Threat Modeling", "User Flow Diagrams", "State Space Specs"],
    deliverables: ["Architecture Blueprints", "Token Flow Specifications", "API Contract Definitions"],
  },
  {
    id: "design",
    step: "02",
    title: "Design",
    tagline: "Tactile UX & Information Architecture",
    description:
      "Crafting high-density, intuitive interfaces with clear transaction states and zero ambiguity for the user.",
    visualIcon: "📐",
    tools: ["Interactive Prototypes", "Design Tokens", "Figma", "Micro-Interactions"],
    deliverables: ["Component Design Systems", "State Transitions", "Mobile Tap Targets"],
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    tagline: "Full-Stack & Protocol Engineering",
    description:
      "Developing type-safe frontends, resilient backend relays, and secure smart contracts across multi-chain environments.",
    visualIcon: "⚡",
    tools: ["Next.js & TypeScript", "Solidity & Clarity", "Node.js & APIs", "EVM / Stacks"],
    deliverables: ["Tested Smart Contracts", "Edge-Optimized Frontends", "Integration Endpoints"],
  },
  {
    id: "ship",
    step: "04",
    title: "Ship",
    tagline: "Verification & Production Release",
    description:
      "Executing rigorous testnet simulation, automated unit tests, continuous deployment, and telemetry monitoring.",
    visualIcon: "🚀",
    tools: ["Foundry & Clarinet", "Vitest & Playwright", "Vercel Edge Deploy", "On-Chain RPCs"],
    deliverables: ["Mainnet Deployments", "Public Verification Proof", "Telemetry Dashboards"],
  },
];

export const LAB_PROJECTS: LabProject[] = [
  {
    id: "ton-pilot",
    name: "TonPilot",
    tagline: "Agentic wallet automation bot for the TON ecosystem.",
    stack: ["TON", "TypeScript", "Telegram API", "Automation"],
    status: "Built and live",
    category: "Automation",
    href: "https://t.me/TonAutoPilotBot",
    repo: "https://github.com/natureloved/TonPilot",
  },
  {
    id: "tasky",
    name: "Tasky",
    tagline: "Telegram automation bot tracking dev quests, bounties, and earning opportunities.",
    stack: ["Python", "Telegram Bot", "SQLite", "Scraping"],
    status: "Built and live",
    category: "Automation",
    href: "https://t.me/taskynotify_bot",
    repo: "https://github.com/natureloved/Tasky",
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
    tagline: "Goal-based DeFi savings application powered by LI.FI Earn vaults.",
    stack: ["DeFi", "LI.FI", "Next.js", "Web3"],
    status: "Built and live",
    category: "DeFi",
    href: "https://stashflow-two.vercel.app/",
    repo: "https://github.com/natureloved/StashFlow",
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
    tagline: "Cross-border shipping calculator, duty invoice generator, and live shipment tracking.",
    stack: ["React", "Vite", "Supabase", "Tailwind"],
    status: "Built and live",
    category: "Payments",
    href: "https://expatship.vercel.app/",
    repo: "https://github.com/natureloved/ExpatShip",
  },
  {
    id: "proof-of-rest",
    name: "Proof of Rest",
    tagline: "On-chain commitment device on Monad with keyless AI agent RestGuardian (Dev3Pack Hackathon Winner).",
    stack: ["Monad", "Solidity", "Foundry", "wagmi", "AI Agent"],
    status: "Hackathon winner",
    category: "Hackathons",
    href: "https://proof-of-rest.vercel.app/",
    repo: "https://github.com/natureloved/Proof-of-Rest",
  },
  {
    id: "runes-rumble",
    name: "Runes Rumble",
    tagline: "Prediction market experiment for Bitcoin Runes token price trajectories.",
    stack: ["Bitcoin", "Runes", "Prediction Market", "On-chain"],
    status: "Hackathon project",
    category: "Hackathons",
    href: "https://runes-rumble.vercel.app/",
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: "Foundations",
    title: "Nursing Studies & Clinical Rigor",
    subtitle: "Understanding human biology, systematic care, and precision under pressure.",
    description:
      "Studying Nursing instilled a deep appreciation for high-stakes protocols and precision. In healthcare, failure is not an option: clinical procedures demand diagnostic discipline, empathy, and systematic thinking.",
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
    "Available for selected product and engineering collaborations. I’m interested in thoughtful products, blockchain systems, developer tools, and unusual ideas that deserve to exist.",
  email: "akinolaa769@gmail.com",
  github: "https://github.com/natureloved",
  linkedin: "https://www.linkedin.com/in/akinola-adejoke-0b7059324",
  twitter: "https://x.com/adejoke_btc",
  resume: "/resume.pdf",
};
