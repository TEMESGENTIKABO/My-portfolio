"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Brain,
  Cloud,
  Code2,
  MessageSquare,
  Server,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";
import { skills } from "@/data/skills";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const lucideIcons: Record<string, typeof Bot> = {
  bot: Bot,
  wand: Wand2,
  sparkles: Sparkles,
  "message-square": MessageSquare,
  brain: Brain,
  terminal: Terminal,
};

const categoryIcons: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  "AI-Augmented Development": Sparkles,
  DevOps: Cloud,
};

function SignalMeter({ value }: { value: number }) {
  const filled = Math.max(1, Math.round(value / 20));
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{ height: `${6 + i * 2.5}px` }}
          className={cn(
            "w-1 rounded-sm transition-colors duration-300",
            i < filled ? "bg-accent" : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(skills[0].title);
  const category = skills.find((c) => c.title === active) ?? skills[0];
  const totalSkills = skills.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section
      id="skills"
      className="py-20 md:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="Technologies I work with"
          description="A toolkit shaped by real projects — including how I use AI to build faster without cutting corners."
        />

        <Reveal delay={0.1} className="mt-12">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-paper-faint">
            Browse by category
          </p>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex flex-wrap gap-2"
          >
            {skills.map((c) => {
              const CatIcon = categoryIcons[c.title] ?? Code2;
              const isActive = active === c.title;
              return (
                <button
                  key={c.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.title)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all",
                    isActive
                      ? "border-accent bg-accent text-ink shadow-[0_8px_20px_-8px_rgba(224,166,63,0.6)]"
                      : "border-line bg-white/[0.03] text-paper-dim hover:border-accent/50 hover:text-paper",
                  )}
                >
                  <CatIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-800/80 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 truncate font-mono text-[11px] text-paper-faint">
                stack.sh — {totalSkills} technologies
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-mono text-xs text-paper-faint">
                <span className="text-accent">$</span> ls ./
                {active.toLowerCase().replace(/\s+/g, "-")} --verbose
                <span className="ml-0.5 inline-block h-3 w-[6px] animate-pulse bg-accent/70 align-middle" />
              </p>

              {active === "AI-Augmented Development" && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim">
                  I use AI tools deliberately, not as a crutch — for faster
                  iteration, catching edge cases, and exploring approaches
                  before committing to one. The judgment on what ships is still
                  mine.
                </p>
              )}

              <AnimatePresence mode="wait">
                <motion.ul
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 divide-y divide-line"
                >
                  {category.skills.map((skill) => {
                    const LucideIcon =
                      skill.kind === "lucide" ? lucideIcons[skill.icon] : null;
                    return (
                      <li
                        key={skill.name}
                        className="group flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {LucideIcon ? (
                            <LucideIcon
                              className="h-4 w-4 shrink-0 text-paper-dim transition-colors group-hover:text-accent"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className={`devicon-${skill.icon}-plain shrink-0 text-lg text-paper-dim transition-colors group-hover:text-accent`}
                              aria-hidden="true"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-paper">
                              {skill.name}
                            </p>
                            <p className="text-xs leading-relaxed text-paper-faint sm:max-w-md">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 pl-7 sm:pl-0">
                          <SignalMeter value={skill.proficiency} />
                          <span className="font-mono text-[10px] text-paper-faint">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
