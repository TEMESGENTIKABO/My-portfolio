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
    <div
      className="flex items-end gap-[3px]"
      aria-label={`${value}% proficiency`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{ height: `${6 + i * 2.5}px` }}
          className={cn(
            "w-1 rounded-sm transition-all duration-300",
            i < filled
              ? "bg-accent shadow-[0_0_6px_rgba(224,166,63,0.25)]"
              : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(skills[0]?.title ?? "");

  const category = skills.find((c) => c.title === active) ?? skills[0];

  const activeIndex = Math.max(
    0,
    skills.findIndex((c) => c.title === active),
  );

  const totalSkills = skills.reduce(
    (total, category) => total + category.skills.length,
    0,
  );

  if (!category) return null;

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="skills-heading"
    >
      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[8%] top-[18%] h-64 w-64 rounded-full bg-accent/[0.025] blur-3xl" />
        <div className="absolute right-[5%] top-[45%] h-72 w-72 rounded-full bg-accent/[0.02] blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Main section heading */}
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="Technologies I work with"
          description="A toolkit shaped by real projects — including how I use AI to build faster without cutting corners."
        />

        {/* Category browser */}
        <Reveal delay={0.1} className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />

                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                  Explore my stack
                </p>
              </div>

              <h3 className="mt-3 text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                Browse by category
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-faint">
                Explore the technologies I use across different parts of the
                development process.
              </p>
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper-faint sm:flex">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(224,166,63,0.8)]"
              />
              {skills.length} areas
            </div>
          </div>

          {/* Category cards */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {skills.map((c, index) => {
              const CatIcon = categoryIcons[c.title] ?? Code2;
              const isActive = active === c.title;

              return (
                <motion.button
                  key={c.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`skills-panel-${index}`}
                  onClick={() => setActive(c.title)}
                  initial={false}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={cn(
                    "group relative min-h-[155px] overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                    isActive
                      ? [
                          "border-accent/60",
                          "bg-accent/[0.08]",
                          "shadow-[0_20px_50px_-25px_rgba(224,166,63,0.55)]",
                        ]
                      : [
                          "border-line",
                          "bg-white/[0.025]",
                          "hover:border-accent/30",
                          "hover:bg-white/[0.045]",
                        ],
                  )}
                >
                  {/* Background index */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-2 -top-5 font-mono text-7xl font-bold leading-none transition-all duration-500",
                      isActive
                        ? "text-accent/[0.12]"
                        : "text-white/[0.025] group-hover:text-white/[0.05]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Background glow */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="relative flex h-full flex-col justify-between">
                    {/* Card top */}
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        {/* Category icon */}
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                            isActive
                              ? "border-accent/40 bg-accent text-ink shadow-[0_8px_20px_-10px_rgba(224,166,63,0.8)]"
                              : "border-line bg-white/[0.04] text-paper-dim group-hover:border-accent/30 group-hover:text-accent",
                          )}
                        >
                          <CatIcon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        {/* Skill count */}
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-widest transition-colors",
                            isActive ? "text-accent" : "text-paper-faint",
                          )}
                        >
                          {c.skills.length}{" "}
                          {c.skills.length === 1 ? "skill" : "skills"}
                        </span>
                      </div>

                      {/* Category name */}
                      <h4
                        className={cn(
                          "mt-5 text-sm font-semibold leading-snug transition-colors",
                          isActive
                            ? "text-paper"
                            : "text-paper-dim group-hover:text-paper",
                        )}
                      >
                        {c.title}
                      </h4>
                    </div>

                    {/* Card footer */}
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.2em] transition-colors",
                          isActive
                            ? "text-accent"
                            : "text-paper-faint group-hover:text-paper-dim",
                        )}
                      >
                        {isActive ? "Currently viewing" : "Explore category"}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-all duration-300",
                          isActive
                            ? "border-accent bg-accent text-ink"
                            : "border-line text-paper-faint group-hover:translate-x-1 group-hover:border-accent/40 group-hover:text-accent",
                        )}
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* Bottom active indicator */}
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded-full bg-accent"
                  />
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        {/* Skills terminal */}
        <Reveal delay={0.15} className="mt-5">
          <div
            id={`skills-panel-${activeIndex}`}
            role="tabpanel"
            aria-label={`${active} technologies`}
            className="relative overflow-hidden rounded-2xl border border-line bg-ink-800/80 shadow-2xl"
          >
            {/* Terminal top bar */}
            <div className="flex items-center justify-between border-b border-line bg-white/[0.025] px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-red-400/60"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-yellow-400/60"
                />
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-green-400/60"
                />

                <span className="ml-3 truncate font-mono text-[10px] text-paper-faint">
                  stack.sh
                </span>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-widest text-paper-faint">
                {category.skills.length} loaded
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-5 sm:p-6">
              {/* Command */}
              <div className="flex flex-wrap items-center font-mono text-xs text-paper-faint">
                <span className="text-accent">$</span>

                <span className="ml-2">
                  ls ./{active.toLowerCase().replace(/\s+/g, "-")} --verbose
                </span>

                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-3 w-[6px] animate-pulse bg-accent/70 align-middle"
                />
              </div>

              {/* AI description */}
              {active === "AI-Augmented Development" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-5 overflow-hidden rounded-xl border border-accent/10 bg-accent/[0.035] p-4"
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[2px] bg-accent/60"
                  />

                  <div className="flex gap-3">
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />

                    <p className="max-w-2xl text-sm leading-relaxed text-paper-dim">
                      I use AI tools deliberately, not as a crutch — for faster
                      iteration, catching edge cases, and exploring approaches
                      before committing to one. The judgment on what ships is
                      still mine.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Skill list */}
              <AnimatePresence mode="wait">
                <motion.ul
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 divide-y divide-line"
                >
                  {category.skills.map((skill, index) => {
                    const LucideIcon =
                      skill.kind === "lucide" ? lucideIcons[skill.icon] : null;

                    return (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.035,
                        }}
                        className="group flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                      >
                        {/* Skill information */}
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.025] transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.05]">
                            {LucideIcon ? (
                              <LucideIcon
                                className="h-4 w-4 text-paper-dim transition-colors group-hover:text-accent"
                                aria-hidden="true"
                              />
                            ) : (
                              <i
                                className={`devicon-${skill.icon}-plain text-lg text-paper-dim transition-colors group-hover:text-accent`}
                                aria-hidden="true"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium text-paper transition-colors group-hover:text-accent">
                              {skill.name}
                            </p>

                            <p className="mt-0.5 text-xs leading-relaxed text-paper-faint sm:max-w-md">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Proficiency */}
                        <div className="flex shrink-0 items-center gap-3 pl-11 sm:pl-0">
                          <SignalMeter value={skill.proficiency} />

                          <span className="min-w-[32px] font-mono text-[10px] text-paper-faint">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>

              {/* Terminal footer */}
              <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-paper-faint">
                  {category.title}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-widest text-paper-faint">
                  {category.skills.length} technologies detected
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Small summary */}
        <Reveal delay={0.2} className="mt-5">
          <div className="flex flex-col gap-3 rounded-xl border border-line bg-white/[0.015] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Terminal
                className="h-3.5 w-3.5 text-accent"
                aria-hidden="true"
              />

              <span className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">
                Full development toolkit
              </span>
            </div>

            <span className="font-mono text-[10px] text-paper-dim">
              {totalSkills} technologies across {skills.length} categories
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
