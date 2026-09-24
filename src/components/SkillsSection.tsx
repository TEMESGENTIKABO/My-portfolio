"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Brain,
  MessageSquare,
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
    <section className="py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="Technologies I work with"
          description="A toolkit shaped by real projects — including how I use AI to build faster without cutting corners."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-800/80 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 truncate font-mono text-[11px] text-paper-faint">
                stack.sh — {totalSkills} technologies
              </span>
            </div>

            <div className="grid md:grid-cols-[220px_1fr]">
              <div
                role="tablist"
                aria-label="Skill categories"
                className="flex gap-1 overflow-x-auto border-b border-line p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r"
              >
                {skills.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    role="tab"
                    aria-selected={active === c.title}
                    onClick={() => setActive(c.title)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-left font-mono text-xs transition-colors md:whitespace-normal",
                      active === c.title
                        ? "bg-accent/10 text-accent"
                        : "text-paper-dim hover:bg-white/[0.03] hover:text-paper",
                    )}
                  >
                    <span className="text-accent/70">
                      {active === c.title ? ">" : "·"}
                    </span>
                    {c.title}
                    {c.title === "AI-Augmented Development" && (
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                    )}
                  </button>
                ))}
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
                    before committing to one. The judgment on what ships is
                    still mine.
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
                        skill.kind === "lucide"
                          ? lucideIcons[skill.icon]
                          : null;
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
