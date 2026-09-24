"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Briefcase, Code2, GraduationCap } from "lucide-react";
import { tracks, type Track } from "@/data/tracks";

const icons: Record<Track["icon"], typeof Code2> = {
  code: Code2,
  briefcase: Briefcase,
  graduation: GraduationCap,
  globe: BookOpen,
};

export default function NowBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % tracks.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  const active = tracks[index];
  const Icon = icons[active.icon];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="flex items-center gap-2.5 rounded-full border border-line bg-ink/80 px-4 py-2.5 backdrop-blur">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={active.title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5 font-mono text-xs text-paper-dim"
          >
            <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Now: {active.title}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
