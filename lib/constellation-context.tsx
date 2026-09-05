"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  active: string | null;
  setActive: (chain: string | null) => void;
};

const ConstellationContext = createContext<Ctx>({
  active: null,
  setActive: () => {},
});

export function ConstellationProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <ConstellationContext.Provider value={{ active, setActive }}>
      {children}
    </ConstellationContext.Provider>
  );
}

export const useConstellation = () => useContext(ConstellationContext);
