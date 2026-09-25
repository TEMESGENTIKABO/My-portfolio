"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export type OverlayKind =
  | "palette"
  | "shortcuts"
  | "sections"
  | "message"
  | null;

interface OverlayContextValue {
  overlay: OverlayKind;
  open: (kind: OverlayKind) => void;
  close: () => void;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayKind>(null);
  return (
    <OverlayContext.Provider
      value={{
        overlay,
        open: (kind) => setOverlay(kind),
        close: () => setOverlay(null),
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider");
  return ctx;
}
