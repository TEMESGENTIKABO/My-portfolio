"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "tracks", label: "Now" },
  { id: "rhythm", label: "Rhythm" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Words" },
  { id: "contact-cta", label: "Contact" },
];

export default function SectionNav() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() =>
              document
                .getElementById(s.id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Jump to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "pointer-events-none rounded-full border border-line bg-ink/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-paper-dim opacity-0 backdrop-blur transition-opacity group-hover:opacity-100",
                isActive && "text-accent opacity-100",
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "block h-2 w-2 rounded-full transition-all duration-300",
                isActive
                  ? "scale-125 bg-accent"
                  : "bg-paper/25 group-hover:bg-paper/50",
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
