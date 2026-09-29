"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Icon } from "./ui";

/**
 * The contact dialog is opened from the header, the hero, and the FAQ, all of
 * which live in different parts of the tree. A context keeps a single dialog in
 * the page instead of one per trigger.
 */
const ContactContext = createContext<{ open: () => void; request: number }>({
  open: () => {},
  request: 0,
});

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState(0);
  const open = useCallback(() => setRequest((n) => n + 1), []);
  const value = useMemo(() => ({ open, request }), [open, request]);
  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

/** A button that opens the shared contact dialog, styled by the caller's class. */
export function ContactTrigger({
  className = "btn btn-outline",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useContact();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

export function ContactArrow() {
  return <Icon name="i-arrow-up-right" />;
}
