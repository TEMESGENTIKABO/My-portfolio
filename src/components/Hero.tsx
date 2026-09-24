"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles,
} from "lucide-react";

import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import AnimatedCounter from "@/components/AnimatedCounter";
import { toGeezNumeral } from "@/lib/geez";
import { cn } from "@/lib/utils";

/* =========================================================
   ANIMATION
========================================================= */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   CONTENT
========================================================= */

const roles = [
  "Full-stack Developer",
  "AI-Augmented Engineer",
  "Temesgen.tech",
];

type Stat =
  | {
      target: number;
      suffix: string;
      label: string;
    }
  | {
      value: string;
      label: string;
    };

const stats: Stat[] = [
  {
    target: 5,
    suffix: "+",
    label: "Years shipping products",
  },
  {
    target: 10,
    suffix: "+",
    label: "Applications launched",
  },
  {
    value: "MBA",
    label: "Business × engineering",
  },
  {
    target: 2,
    suffix: "",
    label: "Languages I build in — English & Amharic",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Tailwind CSS",
];

/* =========================================================
   ROTATING WORD
========================================================= */

function RotatingWord({
  words,
  reduce,
  className,
}: {
  words: string[];
  reduce: boolean | null;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || words.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2600);

    return () => clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className={cn("relative inline-block align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={
            reduce
              ? undefined
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={
            reduce
              ? undefined
              : {
                  opacity: 0,
                  y: -10,
                }
          }
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);

  const [time, setTime] = useState("");

  /* =======================================================
     LOCAL TIME
  ======================================================== */

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Shanghai",
        }).format(new Date()),
      );
    };

    update();

    const id = setInterval(update, 30_000);

    return () => clearInterval(id);
  }, []);

  /* =======================================================
     MOUSE SPOTLIGHT
  ======================================================== */

  const mvX = useMotionValue(50);
  const mvY = useMotionValue(50);

  const spotlight = useMotionTemplate`
    radial-gradient(
      600px circle at ${mvX}% ${mvY}%,
      rgba(224,166,63,0.12),
      transparent 60%
    )
  `;

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;

    const el = heroRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    mvX.set(((e.clientX - rect.left) / rect.width) * 100);
    mvY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-x-clip border-b border-line",
        "pt-20 sm:pt-24 md:pt-32 lg:pt-36 xl:pt-40",
      )}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Grid */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-[linear-gradient(to_right,rgba(243,241,234,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,241,234,0.04)_1px,transparent_1px)]",
            "bg-[size:28px_28px]",
            "xs:bg-[size:36px_36px]",
            "sm:bg-[size:48px_48px]",
            "md:bg-[size:56px_56px]",
            "lg:bg-[size:64px_64px]",
            "[mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_72%)]",
          )}
        />

        {/* Main glow */}
        <motion.div
          className={cn(
            "absolute rounded-full bg-accent/10 blur-[80px]",
            "-top-32 left-[-15%]",
            "h-[18rem] w-[18rem]",
            "sm:-top-40 sm:left-[5%] sm:h-[24rem] sm:w-[24rem]",
            "md:h-[28rem] md:w-[28rem]",
            "lg:h-[32rem] lg:w-[32rem]",
          )}
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.45, 0.9, 0.45],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glow */}
        <motion.div
          className="absolute -bottom-32 right-[-20%] h-64 w-64 rounded-full bg-accent/[0.035] blur-[90px] sm:h-80 sm:w-80 lg:h-96 lg:w-96"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.3, 0.6, 0.3],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Desktop cursor spotlight */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="absolute inset-0 hidden lg:block"
          />
        )}

        {/* Top horizontal accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate="show"
        className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8"
      >
        {/* ===================================================
            STATUS BAR
        ==================================================== */}

        <motion.div
          variants={reduce ? undefined : item}
          className={cn(
            "relative flex items-center justify-between",
            "gap-3 border-b border-line",
            "pb-4 sm:pb-5 md:pb-6",
          )}
        >
          {/* Availability */}

          <p className="flex min-w-0 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-accent sm:text-[9px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.3em]">
            <span className="relative flex h-2 w-2 shrink-0">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}

              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(224,166,63,0.6)]" />
            </span>

            <span className="truncate">Available for new projects</span>
          </p>

          {/* Location */}

          <p className="flex shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-paper-faint sm:gap-2 sm:text-[9px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.3em]">
            <MapPin
              className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5"
              aria-hidden="true"
            />

            <span>Nanjing, China</span>

            {time && (
              <span className="hidden text-paper-faint/60 md:inline">
                · <span suppressHydrationWarning>{time}</span> local
              </span>
            )}
          </p>
        </motion.div>

        {/* ===================================================
            MOBILE / TABLET
        ==================================================== */}

        <div className="lg:hidden">
          {/* Name */}

          <motion.h1
            variants={reduce ? undefined : item}
            className={cn(
              "mt-8 font-display tracking-tight",
              "leading-[0.88]",
              "sm:mt-10",
            )}
            style={{
              fontSize: "clamp(2.55rem, 14vw, 5.5rem)",
            }}
          >
            <span className="block">Temesgen T.</span>

            <span className="mt-1 block italic text-accent-soft sm:mt-2">
              Gebremariam
            </span>
          </motion.h1>

          {/* Role line */}

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3"
          >
            <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.25em] text-accent sm:text-[9px] sm:tracking-[0.3em]">
              01
            </span>

            <span className="h-px flex-1 bg-line" />

            <RotatingWord
              words={roles}
              reduce={reduce}
              className="max-w-[58%] text-right font-mono text-[8px] uppercase tracking-[0.18em] text-paper-faint sm:max-w-none sm:text-[9px] sm:tracking-[0.25em]"
            />
          </motion.div>

          {/* Intro card */}

          <motion.div
            variants={reduce ? undefined : item}
            className={cn(
              "relative mt-6 overflow-hidden",
              "border border-line",
              "bg-white/[0.025]",
              "p-4 sm:mt-8 sm:p-5",
            )}
          >
            {/* Accent corner */}

            <span
              aria-hidden="true"
              className="absolute right-0 top-0 h-8 w-8 border-r border-t border-accent/60 sm:h-10 sm:w-10"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-accent/60 sm:h-10 sm:w-10"
            />

            {/* Small label */}

            <div className="mb-3 flex items-center gap-2">
              <Sparkles
                className="h-3.5 w-3.5 text-accent"
                aria-hidden="true"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper-faint">
                Building for the web
              </span>
            </div>

            <p className="font-display text-lg leading-snug text-paper sm:text-xl">
              Full-stack developer @{" "}
              <span className="text-accent-soft">temesgen.tech</span>
            </p>

            <p className="mt-3 text-xs leading-[1.75] text-paper-dim sm:text-sm">
              Full-stack JavaScript developer and builder. I work across the
              modern software stack, employ AI as a working tool, and ship
              production-grade code faster without cutting corners on quality.
              MBA candidate researching data-driven forecasting — additional
              certificate, not the identity.
            </p>
          </motion.div>

          {/* CTAs */}

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-5 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3"
          >
            <Link
              href="/projects"
              className={cn(
                "group flex min-h-12 items-center justify-between",
                "rounded-full bg-accent",
                "px-5 py-3.5",
                "text-sm font-semibold text-ink",
                "transition-all duration-300",
                "hover:bg-accent-soft",
                "active:scale-[0.98]",
                "sm:px-6",
              )}
            >
              <span>View my work</span>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10">
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href="/contact"
              className={cn(
                "group flex min-h-12 items-center justify-between",
                "rounded-full border border-line",
                "px-5 py-3.5 sm:px-6",
                "text-sm text-paper-dim",
                "transition-all duration-300",
                "hover:border-paper/30 hover:bg-white/[0.025] hover:text-paper",
                "active:scale-[0.98]",
              )}
            >
              <span>Get in touch</span>

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Mobile mini-meta */}

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-6 flex items-center justify-between border-y border-line py-3.5 sm:mt-7"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper-faint">
              JavaScript ecosystem
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent">
              Full-stack
            </span>
          </motion.div>
        </div>

        {/* ===================================================
            DESKTOP
        ==================================================== */}

        <div className="hidden lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20 xl:grid-cols-[1fr_0.9fr] xl:gap-20">
          {/* Name */}

          <motion.div
            variants={reduce ? undefined : item}
            className="relative min-w-0"
          >
            {/* Decorative number */}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-16 font-mono text-[8rem] font-bold leading-none text-white/[0.018] xl:-left-8 xl:text-[10rem]"
            >
              01
            </span>

            <h1
              className="relative font-display leading-[0.88] tracking-tight"
              style={{
                fontSize: "clamp(4rem, 6.2vw, 6.75rem)",
              }}
            >
              <span className="block whitespace-nowrap">Temesgen T.</span>

              <span className="mt-2 block whitespace-nowrap italic text-accent-soft">
                Gebremariam
              </span>
            </h1>

            {/* Small accent line */}

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />

              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper-faint">
                Software · AI · Product
              </span>
            </div>
          </motion.div>

          {/* Content */}

          <motion.div
            variants={reduce ? undefined : item}
            className="min-w-0 max-w-xl"
          >
            {/* Rotating role */}

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                01
              </span>

              <span className="h-px w-8 bg-line" />

              <p className="font-display text-2xl leading-snug text-paper xl:text-3xl">
                <RotatingWord words={roles} reduce={reduce} />
              </p>
            </div>

            {/* Description */}

            <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-paper-dim">
              Full-stack JavaScript developer and builder. I work across the
              modern software stack, employ AI as a working tool, and ship
              production-grade code faster without cutting corners on quality.
              MBA candidate researching data-driven forecasting — additional
              certificate, not the identity.
            </p>

            {/* CTAs */}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-accent-soft"
                >
                  <span>View my work</span>

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10">
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Magnetic>

              <Magnetic strength={10}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm text-paper-dim transition-all duration-300 hover:border-paper/30 hover:bg-white/[0.025] hover:text-paper"
                >
                  Get in touch
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>
            </div>

            {/* Desktop availability note */}

            <div className="mt-8 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(224,166,63,0.7)]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper-faint">
                Currently open to selected collaborations
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          TECH STACK MARQUEE
      ====================================================== */}

      <div className="relative mt-8 border-y border-line bg-white/[0.02] py-3.5 sm:mt-10 sm:py-4 lg:mt-0">
        {/* Left fade */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-20"
        />

        {/* Right fade */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-20"
        />

        <Marquee
          items={stack}
          textClassName={cn(
            "font-mono uppercase tracking-[0.2em] not-italic",
            "text-[0.6rem] text-paper-dim",
            "sm:text-xs sm:tracking-[0.28em]",
            "md:text-sm md:tracking-[0.3em]",
          )}
        />
      </div>

      {/* =====================================================
          STATS
      ====================================================== */}

      <dl
        className={cn(
          "mx-auto max-w-6xl",
          "grid grid-cols-2",
          "divide-x divide-y divide-line",
          "border-b border-line",
          "lg:grid-cols-4 lg:divide-y-0",
        )}
      >
        {stats.map((s, index) => {
          const geez = "target" in s ? toGeezNumeral(s.target) : null;

          return (
            <div
              key={s.label}
              className={cn(
                "relative flex min-h-[112px] flex-col justify-center",
                "bg-ink px-4 py-5",
                "sm:min-h-[125px] sm:px-5 sm:py-6",
                "lg:min-h-[145px] lg:px-6 lg:py-8",
                "lg:first:pl-0",
              )}
            >
              {/* Top accent for first/active-looking blocks */}

              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 h-px w-8 bg-accent/40",
                  index > 0 && "lg:hidden",
                )}
              />

              {/* Number */}

              <dt className="font-display text-2xl tracking-tight text-paper sm:text-3xl lg:text-4xl">
                {"target" in s ? (
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                ) : (
                  s.value
                )}
              </dt>

              {/* Geez numeral */}

              {geez && (
                <p className="mt-0.5 font-mono text-[9px] text-accent/60 sm:text-[10px]">
                  {geez}
                </p>
              )}

              {/* Label */}

              <dd className="mt-1.5 max-w-[170px] text-[9px] leading-[1.45] text-paper-faint sm:mt-2 sm:text-xs">
                {s.label}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <div className="flex justify-center pb-7 pt-5 sm:pb-8 sm:pt-6 lg:pb-10 lg:pt-3">
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, 7, 0],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="group flex flex-col items-center gap-2 text-paper-faint"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] transition-colors group-hover:text-accent sm:text-[10px]">
            Scroll
          </span>

          <span className="relative flex h-7 w-px overflow-hidden bg-white/10 sm:h-8">
            <motion.span
              animate={
                reduce
                  ? undefined
                  : {
                      y: ["-100%", "100%"],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-accent to-transparent"
            />
          </span>

          <ArrowDown
            className="h-3 w-3 text-accent/60 transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
