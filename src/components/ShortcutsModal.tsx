"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useOverlay } from "@/context/OverlayContext";

const keyboardShortcuts = [
  { keys: ["⌘", "K"], label: "Open quick nav" },
  { keys: ["Esc"], label: "Close any dialog" },
  { keys: ["?"], label: "Show this panel" },
];

const touchTips = [
  {
    label: "Sections",
    detail:
      "Tap the compass icon in the bottom bar to jump anywhere on the page.",
  },
  {
    label: "Search",
    detail: "Tap the magnifier for the same quick-nav list, touch-friendly.",
  },
  {
    label: "Say hi",
    detail: "Tap the message icon to send a note without leaving the page.",
  },
];

export default function ShortcutsModal() {
  const { overlay, open, close } = useOverlay();
  const isOpen = overlay === "shortcuts";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (e.key === "?" && !typing) {
        e.preventDefault();
        open(isOpen ? null : "shortcuts");
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-ink/80 px-5 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-line bg-ink-700 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Help"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Quick help
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-paper-faint hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-paper-faint">
              On touch
            </p>
            <ul className="mt-3 space-y-3">
              {touchTips.map((t) => (
                <li key={t.label} className="text-sm">
                  <p className="text-paper">{t.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-paper-faint">
                    {t.detail}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-paper-faint">
              On keyboard
            </p>
            <ul className="mt-3 space-y-3">
              {keyboardShortcuts.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-paper-dim">{s.label}</span>
                  <span className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="rounded border border-line bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-paper"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
