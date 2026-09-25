"use client";
import { Compass, HelpCircle, MessageCircle, Search } from "lucide-react";
import { useOverlay } from "@/context/OverlayContext";
import { sections } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

const dockItems = [
  { kind: "sections" as const, icon: Compass, label: "Sections" },
  { kind: "palette" as const, icon: Search, label: "Search" },
  { kind: "message" as const, icon: MessageCircle, label: "Say hi" },
  { kind: "shortcuts" as const, icon: HelpCircle, label: "Help" },
];

export default function MobileDock() {
  const { open } = useOverlay();
  const active = useActiveSection(sections.map((s) => s.id));
  const activeLabel = sections.find((s) => s.id === active)?.label ?? "Home";

  return (
    <div className="fixed bottom-0 right-0 z-40 flex flex-col items-end gap-2 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] md:hidden">
      <span className="rounded-full border border-line bg-ink/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-faint backdrop-blur">
        {activeLabel}
      </span>
      <nav
        aria-label="Quick actions"
        className="flex flex-col items-center gap-1 rounded-full border border-line bg-ink/90 p-1.5 shadow-2xl backdrop-blur"
      >
        {dockItems.map((item) => (
          <button
            key={item.kind}
            type="button"
            onClick={() => open(item.kind)}
            aria-label={item.label}
            className="flex flex-col items-center gap-0.5 rounded-full px-2 py-2 text-paper-dim transition-colors active:text-accent"
          >
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </button>
        ))}
      </nav>
    </div>
  );
}
