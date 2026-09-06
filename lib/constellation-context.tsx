"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

type Ctx = {
  /** chain id currently highlighted (project hover / chain chip hover) */
  active: string | null;
  setActive: (chain: string | null) => void;
  /** which region of the universe the reader is currently in */
  region: string;
  setRegion: (region: string) => void;
};

const ConstellationContext = createContext<Ctx>({
  active: null,
  setActive: () => {},
  region: "hero",
  setRegion: () => {},
});

export function ConstellationProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const [region, setRegion] = useState("hero");

  // Memoized so consumers (field, compass, cards) don't re-render on every
  // provider pass — and so setters stay referentially stable for hook deps.
  const value = useMemo<Ctx>(
    () => ({ active, setActive, region, setRegion }),
    [active, region]
  );

  return (
    <ConstellationContext.Provider value={value}>
      {children}
    </ConstellationContext.Provider>
  );
}

export const useConstellation = () => useContext(ConstellationContext);
