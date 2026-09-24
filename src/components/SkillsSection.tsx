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
          style={{ height: `${5 + i * 2.2}px` }}
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
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
      aria-labelledby="skills-heading"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[5%] top-[15%] h-40 w-40 rounded-full bg-accent/[0.025] blur-3xl sm:h-64 sm:w-64" />

        <div className="absolute right-[-10%] top-[45%] h-48 w-48 rounded-full bg-accent/[0.02] blur-3xl sm:right-[5%] sm:h-72 sm:w-72" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 xs:px-5 sm:px-8">
        {/* =========================================================
            MAIN HEADING
        ========================================================== */}

        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title="Technologies I work with"
          description="A toolkit shaped by real projects — including how I use AI to build faster without cutting corners."
        />

        {/* =========================================================
            CATEGORY BROWSER
        ========================================================== */}

        <Reveal delay={0.1} className="mt-9 sm:mt-12">
          {/* Header */}
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent sm:w-8" />

              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-accent sm:text-[10px] sm:tracking-[0.25em]">
                Explore my stack
              </p>
            </div>

            <div className="mt-2.5 flex items-end justify-between gap-4 sm:mt-3">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-paper sm:text-xl md:text-2xl">
                  Browse by category
                </h3>

                <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-paper-faint sm:mt-2 sm:text-sm">
                  Explore the technologies I use across different parts of the
                  development process.
                </p>
              </div>

              {/* Desktop only */}
              <div className="hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-paper-faint sm:flex">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(224,166,63,0.8)]"
                />
                {skills.length} areas
              </div>
            </div>
          </div>

          {/* =====================================================
              CATEGORY CARDS
          ====================================================== */}

          <div
            role="tablist"
            aria-label="Skill categories"
            className={cn(
              "grid gap-2.5",
              "grid-cols-2",
              "xs:gap-3",
              "sm:grid-cols-2 sm:gap-3",
              "lg:grid-cols-4",
            )}
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
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.975 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className={cn(
                    // Base
                    "group relative min-w-0 overflow-hidden rounded-xl border p-3.5 text-left transition-all duration-300",
                    "xs:rounded-2xl xs:p-4",
                    "sm:min-h-[150px] sm:p-5",
                    // Active
                    isActive
                      ? [
                          "border-accent/60",
                          "bg-accent/[0.08]",
                          "shadow-[0_16px_35px_-22px_rgba(224,166,63,0.65)]",
                          "sm:shadow-[0_20px_50px_-25px_rgba(224,166,63,0.55)]",
                        ]
                      : [
                          "border-line",
                          "bg-white/[0.025]",
                          "hover:border-accent/30",
                          "hover:bg-white/[0.045]",
                        ],
                  )}
                >
                  {/* Background number */}

                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-1 -top-3 font-mono text-5xl font-bold leading-none transition-all duration-500",
                      "sm:-right-2 sm:-top-5 sm:text-7xl",
                      isActive
                        ? "text-accent/[0.11]"
                        : "text-white/[0.025] group-hover:text-white/[0.05]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Glow */}

                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/20 blur-2xl transition-opacity duration-500 sm:-right-10 sm:-top-10 sm:h-28 sm:w-28",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="relative flex h-full min-h-[118px] flex-col justify-between sm:min-h-[150px]">
                    {/* Card top */}

                    <div>
                      <div className="flex items-start justify-between gap-2">
                        {/* Icon */}

                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                            "xs:h-9 xs:w-9 xs:rounded-xl",
                            "sm:h-10 sm:w-10",
                            isActive
                              ? "border-accent/40 bg-accent text-ink shadow-[0_8px_20px_-10px_rgba(224,166,63,0.8)]"
                              : "border-line bg-white/[0.04] text-paper-dim group-hover:border-accent/30 group-hover:text-accent",
                          )}
                        >
                          <CatIcon
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Skill count */}

                        <span
                          className={cn(
                            "pt-1 text-right font-mono text-[8px] uppercase tracking-[0.08em] transition-colors",
                            "xs:text-[9px] xs:tracking-widest",
                            isActive ? "text-accent" : "text-paper-faint",
                          )}
                        >
                          {c.skills.length}{" "}
                          {c.skills.length === 1 ? "skill" : "skills"}
                        </span>
                      </div>

                      {/* Name */}

                      <h4
                        className={cn(
                          "mt-4 break-words text-xs font-semibold leading-snug transition-colors",
                          "xs:mt-5 xs:text-sm",
                          "sm:text-sm",
                          isActive
                            ? "text-paper"
                            : "text-paper-dim group-hover:text-paper",
                        )}
                      >
                        {c.title}
                      </h4>
                    </div>

                    {/* Footer */}

                    <div className="mt-4 flex items-center justify-between gap-2 sm:mt-5">
                      <span
                        className={cn(
                          "min-w-0 truncate font-mono text-[7px] uppercase tracking-[0.12em] transition-colors",
                          "xs:text-[8px] xs:tracking-[0.15em]",
                          "sm:text-[9px] sm:tracking-[0.2em]",
                          isActive
                            ? "text-accent"
                            : "text-paper-faint group-hover:text-paper-dim",
                        )}
                      >
                        {isActive ? "Viewing" : "Explore"}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all duration-300",
                          "xs:h-6 xs:w-6 xs:text-xs",
                          isActive
                            ? "border-accent bg-accent text-ink"
                            : "border-line text-paper-faint group-hover:translate-x-1 group-hover:border-accent/40 group-hover:text-accent",
                        )}
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* Active indicator */}

                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-3 right-3 h-[2px] origin-left rounded-full bg-accent sm:left-4 sm:right-4"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Mobile category indicator */}

          <div className="mt-3 flex items-center justify-between sm:hidden">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-paper-faint">
              {activeIndex + 1} / {skills.length}
            </span>

            <div className="flex items-center gap-1">
              {skills.map((c) => (
                <span
                  key={c.title}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    active === c.title ? "w-5 bg-accent" : "w-1.5 bg-white/10",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* =========================================================
            TERMINAL / SKILL PANEL
        ========================================================== */}

        <Reveal delay={0.15} className="mt-4 sm:mt-5">
          <div
            id={`skills-panel-${activeIndex}`}
            role="tabpanel"
            aria-label={`${active} technologies`}
            className="relative overflow-hidden rounded-xl border border-line bg-ink-800/80 shadow-2xl sm:rounded-2xl"
          >
            {/* Terminal header */}

            <div className="flex min-h-[42px] items-center justify-between border-b border-line bg-white/[0.025] px-3 sm:px-4 sm:py-3">
              <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-red-400/60 sm:h-2.5 sm:w-2.5"
                />

                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-yellow-400/60 sm:h-2.5 sm:w-2.5"
                />

                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-green-400/60 sm:h-2.5 sm:w-2.5"
                />

                <span className="ml-2.5 max-w-[130px] truncate font-mono text-[9px] text-paper-faint sm:ml-3 sm:max-w-none sm:text-[10px]">
                  stack.sh
                </span>
              </div>

              <span className="shrink-0 font-mono text-[8px] uppercase tracking-widest text-paper-faint sm:text-[9px]">
                {category.skills.length} loaded
              </span>
            </div>

            {/* Terminal content */}

            <div className="p-4 sm:p-5 md:p-6">
              {/* Command */}

              <div className="overflow-x-auto whitespace-nowrap font-mono text-[10px] text-paper-faint sm:text-xs">
                <span className="text-accent">$</span>

                <span className="ml-2">
                  ls ./{active.toLowerCase().replace(/\s+/g, "-")} --verbose
                </span>

                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-3 w-[5px] animate-pulse bg-accent/70 align-middle"
                />
              </div>

              {/* AI description */}

              {active === "AI-Augmented Development" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mt-4 overflow-hidden rounded-lg border border-accent/10 bg-accent/[0.035] p-3.5 sm:mt-5 sm:rounded-xl sm:p-4"
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[2px] bg-accent/60"
                  />

                  <div className="flex gap-2.5 sm:gap-3">
                    <Sparkles
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />

                    <p className="text-xs leading-relaxed text-paper-dim sm:text-sm">
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
                  className="mt-3 divide-y divide-line sm:mt-5"
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
                        className="group py-3.5 sm:py-4"
                      >
                        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                          {/* Icon */}

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.025] transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.05] sm:h-8 sm:w-8">
                            {LucideIcon ? (
                              <LucideIcon
                                className="h-3.5 w-3.5 text-paper-dim transition-colors group-hover:text-accent sm:h-4 sm:w-4"
                                aria-hidden="true"
                              />
                            ) : (
                              <i
                                className={`devicon-${skill.icon}-plain text-base text-paper-dim transition-colors group-hover:text-accent sm:text-lg`}
                                aria-hidden="true"
                              />
                            )}
                          </div>

                          {/* Name + description */}

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-paper transition-colors group-hover:text-accent sm:text-sm">
                              {skill.name}
                            </p>

                            <p className="mt-0.5 text-[10px] leading-relaxed text-paper-faint sm:text-xs">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                        {/* Proficiency */}

                        <div className="mt-2.5 flex items-center justify-end gap-2.5 sm:mt-0 sm:pl-11">
                          <SignalMeter value={skill.proficiency} />

                          <span className="min-w-[30px] text-right font-mono text-[9px] text-paper-faint sm:text-[10px]">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>

              {/* Terminal footer */}

              <div className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper-faint sm:text-[9px] sm:tracking-widest">
                  {category.title}
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper-faint sm:text-[9px] sm:tracking-widest">
                  {category.skills.length} technologies detected
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =========================================================
            SUMMARY
        ========================================================== */}

        <Reveal delay={0.2} className="mt-3 sm:mt-5">
          <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-white/[0.015] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex items-center gap-2">
              <Terminal
                className="h-3.5 w-3.5 shrink-0 text-accent"
                aria-hidden="true"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper-faint sm:text-[10px] sm:tracking-widest">
                Full development toolkit
              </span>
            </div>

            <span className="font-mono text-[8px] text-paper-dim sm:text-[10px]">
              {totalSkills} technologies · {skills.length} categories
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
