export type Chain = {
  id: string;
  name: string;
  color: string;
  fx: number; // normalized anchor x (0..1) of the node in the field
  fy: number; // normalized anchor y (0..1)
};

// The 8 chains Adejoke builds on. Colors are real brand colors so the
// constellation reads as authentic, not generic neon.
export const CHAINS: Chain[] = [
  { id: "bitcoin",   name: "Bitcoin L2", color: "#f7931a", fx: 0.18, fy: 0.30 },
  { id: "stacks",    name: "Stacks",     color: "#9b59f5", fx: 0.37, fy: 0.20 },
  { id: "solana",    name: "Solana",     color: "#14f195", fx: 0.62, fy: 0.26 },
  { id: "ton",       name: "TON",        color: "#0098ea", fx: 0.82, fy: 0.36 },
  { id: "nimiq",     name: "Nimiq",      color: "#ffcf00", fx: 0.26, fy: 0.66 },
  { id: "avalanche", name: "Avalanche",  color: "#e84142", fx: 0.54, fy: 0.72 },
  { id: "evm",       name: "EVM",        color: "#627eea", fx: 0.77, fy: 0.66 },
  { id: "monad",     name: "Monad",      color: "#ff5f1f", fx: 0.46, fy: 0.46 },
];

export const chainColor = (id: string | null) =>
  CHAINS.find((c) => c.id === id)?.color ?? "#ffb020";
