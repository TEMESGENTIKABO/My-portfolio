"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Command,
  Download,
  Github,
  Home,
  Mail,
  User,
} from "lucide-react";
import { contactData } from "@/data/contact";
import { useOverlay } from "@/context/OverlayContext";

interface PaletteItem {
  label: string;
  hint?: string;
  icon: typeof Home;
  action: () => void;
}

export default function CommandPalette() {
  const { overlay, open, close } = useOverlay();
  const isOpen = overlay === "palette";
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open(isOpen ? null : "palette");
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) setQuery("");
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const githubUrl = contactData.socialLinks.find(
    (s) => s.icon === "github",
  )?.url;

  const items: PaletteItem[] = [
    { label: "Home", icon: Home, action: () => router.push("/") },
    { label: "About", icon: User, action: () => router.push("/about") },
    {
      label: "Projects",
      icon: Briefcase,
      action: () => router.push("/projects"),
    },
    { label: "Contact", icon: Mail, action: () => router.push("/contact") },
    {
      label: "Email me",
      hint: contactData.email,
      icon: Mail,
      action: () => window.open(`mailto:${contactData.email}`, "_self"),
    },
    ...(githubUrl
      ? [
          {
            label: "View GitHub",
            icon: Github,
            action: () => window.open(githubUrl, "_blank"),
          } as PaletteItem,
        ]
      : []),
    {
      label: "Download résumé",
      icon: Download,
      action: () => window.open("/resume.pdf", "_blank"),
    },
  ];

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase()),
  );

  function run(item: PaletteItem) {
    item.action();
    close();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => open("palette")}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-line bg-ink/80 px-4 py-2.5 font-mono text-xs text-paper-dim backdrop-blur transition-colors hover:border-accent/50 hover:text-paper md:inline-flex"
        aria-label="Open command palette"
      >
        <Command className="h-3.5 w-3.5" aria-hidden="true" />
        Quick nav
        <span className="rounded border border-line px-1.5 py-0.5 text-[10px] text-paper-faint">
          ⌘K
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/80 px-5 pt-[max(6rem,env(safe-area-inset-top))] backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-ink-700 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a page or action…"
                className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-paper placeholder:text-paper-faint outline-none"
              />
              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-paper-faint">
                    No matches
                  </li>
                )}
                {filtered.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => run(item)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm text-paper-dim transition-colors hover:bg-white/5 hover:text-paper"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon
                          className="h-4 w-4 text-accent"
                          aria-hidden="true"
                        />
                        {item.label}
                      </span>
                      {item.hint ? (
                        <span className="text-xs text-paper-faint">
                          {item.hint}
                        </span>
                      ) : (
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-paper-faint"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
