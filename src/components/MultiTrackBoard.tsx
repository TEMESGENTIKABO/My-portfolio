"use client";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, Code2, GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { tracks, type Track } from "@/data/tracks";

const icons: Record<Track["icon"], typeof Code2> = {
  code: Code2,
  briefcase: Briefcase,
  graduation: GraduationCap,
  globe: BookOpen,
};

function Pulse({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-accent/60"
          animate={{ height: [4, 14, 4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + i * 0.07,
          }}
        />
      ))}
    </div>
  );
}

export default function MultiTrackBoard() {
  return (
    <section
      className="border-y border-line py-20 md:py-28"
      aria-labelledby="tracks-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            eyebrow="Right now"
            title="Running in parallel"
            description="I rarely work on one thing at a time. Here's what's actively moving."
          />
          <p className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper-faint sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live status
          </p>
        </div>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {tracks.map((t, i) => {
            const Icon = icons[t.icon];
            return (
              <Reveal key={t.title} delay={i * 0.05}>
                <div className="grid items-center gap-4 py-6 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white/[0.02]">
                      <Icon
                        className="h-4 w-4 text-accent"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-display text-lg tracking-tight text-paper sm:hidden">
                      {t.title}
                    </span>
                  </div>

                  <div>
                    <p className="hidden font-display text-lg tracking-tight text-paper sm:block">
                      {t.title}
                    </p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-paper-dim">
                      {t.focus}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                    {t.status}
                  </span>

                  <Pulse delay={i * 0.15} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
