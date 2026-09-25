"use client";
import BottomSheet from "@/components/ui/BottomSheet";
import { sections } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useOverlay } from "@/context/OverlayContext";
import { cn } from "@/lib/utils";

export default function SectionSheet() {
  const { overlay, close } = useOverlay();
  const active = useActiveSection(sections.map((s) => s.id));

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    close();
  }

  return (
    <BottomSheet
      open={overlay === "sections"}
      onClose={close}
      title="Jump to section"
    >
      <ul className="space-y-1">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(s.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-paper-dim hover:bg-white/5 hover:text-paper",
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isActive ? "bg-accent" : "bg-white/20",
                  )}
                  aria-hidden="true"
                />
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}
