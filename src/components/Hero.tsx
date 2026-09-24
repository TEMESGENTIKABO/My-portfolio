"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import AnimatedCounter from "@/components/AnimatedCounter";
import { toGeezNumeral } from "@/lib/geez";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const roles = [
  "Full-stack Developer",
  "AI-Augmented Engineer",
  "Temesgen.tech",
];

type Stat =
  | { target: number; suffix: string; label: string }
  | { value: string; label: string };

const stats: Stat[] = [
  { target: 5, suffix: "+", label: "Years shipping products" },
  { target: 10, suffix: "+", label: "Applications launched" },
  { value: "MBA", label: "Business × engineering" },
  { target: 2, suffix: "", label: "Languages I build in — English & Amharic" },
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
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  return (
    <span className={cn("relative inline-block align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Shanghai",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const mvX = useMotionValue(50);
  const mvY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mvX}% ${mvY}%, rgba(224,166,63,0.12), transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
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
      className="relative overflow-x-clip border-b border-line pt-24 sm:pt-28 md:pt-36 lg:pt-40"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(243,241,234,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(243,241,234,0.045)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:56px_56px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <motion.div
          className="absolute -top-40 left-[10%] h-[20rem] w-[20rem] rounded-full bg-accent/10 blur-[100px] sm:h-[24rem] sm:w-[24rem] md:h-[28rem] md:w-[28rem]"
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="absolute inset-0 hidden lg:block"
          />
        )}
      </div>

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate="show"
        className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8"
      >
        {/* Status bar */}
        <motion.div
          variants={reduce ? undefined : item}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line pb-4 sm:pb-5 md:pb-6"
        >
          <p className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent sm:text-[0.65rem] sm:tracking-[0.25em] md:text-xs md:tracking-[0.3em]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper-faint sm:gap-2 sm:text-[0.65rem] sm:tracking-[0.25em] md:text-xs md:tracking-[0.3em]">
            <MapPin
              className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5"
              aria-hidden="true"
            />
            <span>Nanjing, China</span>
            {time && (
              <span className="hidden text-paper-faint/70 sm:inline">
                · <span suppressHydrationWarning>{time}</span> local
              </span>
            )}
          </p>
        </motion.div>

        {/* ============ MOBILE / TABLET LAYOUT (below lg) ============ */}
        <div className="lg:hidden">
          <motion.h1
            variants={reduce ? undefined : item}
            className="mt-8 font-display leading-[0.9] tracking-tight sm:mt-10"
            style={{ fontSize: "clamp(2.5rem, 13vw, 5rem)" }}
          >
            <span className="block">Temesgen T.</span>
            <span className="block italic text-accent-soft">Gebremariam</span>
          </motion.h1>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-6 flex items-center gap-3 sm:mt-8"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent sm:text-[0.65rem]">
              01
            </span>
            <span className="h-px flex-1 bg-line" />
            <RotatingWord
              words={roles}
              reduce={reduce}
              className="text-right font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper-faint sm:text-[0.65rem] sm:tracking-[0.3em]"
            />
          </motion.div>

          <motion.div
            variants={reduce ? undefined : item}
            className="relative mt-6 border border-line bg-white/[0.02] p-4 sm:p-5"
          >
            <p className="font-display text-lg leading-snug text-paper sm:text-xl">
              Full-stack developer @
              <span className="text-accent-soft">temesgen.tech</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">
              Full-stack JavaScript developer and builder. I work across the
              modern software stack, employ AI as a working tool, and ship
              production-grade code faster without cutting corners on quality.
              MBA candidate researching data-driven forecasting — additional
              certificate, not the identity.
            </p>
            <span
              aria-hidden="true"
              className="absolute -top-px -right-px h-5 w-5 border-t border-r border-accent/60 sm:h-6 sm:w-6"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-px -left-px h-5 w-5 border-b border-l border-accent/60 sm:h-6 sm:w-6"
            />
          </motion.div>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex w-full items-center justify-between rounded-full bg-accent px-6 py-4 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft sm:flex-1 sm:py-3.5"
            >
              View my work
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-between rounded-full border border-line px-6 py-4 text-sm text-paper-dim transition hover:border-paper/30 hover:text-paper sm:flex-1 sm:py-3.5"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* ============ DESKTOP LAYOUT (lg and up) ============ */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20 xl:gap-16">
          <motion.h1
            variants={reduce ? undefined : item}
            className="min-w-0 font-display leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 6vw, 5.5rem)" }}
          >
            <span className="block whitespace-nowrap">Temesgen T. </span>
            <span className="block whitespace-nowrap italic text-accent-soft">
              Gebremariam
            </span>
          </motion.h1>

          <motion.div
            variants={reduce ? undefined : item}
            className="min-w-0 max-w-xl"
          >
            <p className="font-display text-2xl leading-snug text-paper xl:text-3xl">
              <RotatingWord words={roles} reduce={reduce} />
            </p>
            <p className="mt-4 leading-relaxed text-paper-dim">
              Full-stack JavaScript developer and builder. I work across the
              modern software stack, employ AI as a working tool, and ship
              production-grade code faster without cutting corners on quality.
              MBA candidate researching data-driven forecasting — additional
              certificate, not the identity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
                >
                  View my work
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>
              <Magnetic strength={10}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-6 py-3 text-sm text-paper-dim transition hover:border-paper/30 hover:text-paper"
                >
                  Get in touch{" "}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech stack marquee */}
      <div className="mt-10 border-y border-line bg-white/[0.02] py-3 sm:mt-12 sm:py-4 lg:mt-0">
        <Marquee
          items={stack}
          textClassName="font-mono text-[0.7rem] uppercase tracking-[0.25em] not-italic text-paper-dim sm:text-xs sm:tracking-[0.3em] md:text-sm"
        />
      </div>

      {/* Stats */}
      <dl className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-4 sm:grid-cols-2 sm:divide-y-0 sm:gap-px sm:bg-line sm:px-6 md:px-8 lg:grid-cols-4 lg:gap-0 lg:bg-transparent lg:divide-x lg:divide-y-0 lg:divide-line">
        {stats.map((s) => {
          const geez = "target" in s ? toGeezNumeral(s.target) : null;
          return (
            <div
              key={s.label}
              className="flex flex-col justify-center bg-ink px-1 py-5 sm:bg-transparent sm:px-5 sm:py-6 lg:px-5 lg:py-8 lg:first:pl-0"
            >
              <dt className="font-display text-2xl tracking-tight text-paper sm:text-3xl lg:text-4xl">
                {"target" in s ? (
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                ) : (
                  s.value
                )}
              </dt>
              {geez && (
                <p className="mt-0.5 font-mono text-[10px] text-accent/60">
                  {geez}
                </p>
              )}
              <dd className="mt-1.5 text-[0.7rem] leading-snug text-paper-faint sm:mt-2 sm:text-xs">
                {s.label}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8 pt-4 lg:pb-10 lg:pt-2">
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-paper-faint"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-6 w-px bg-gradient-to-b from-accent to-transparent sm:h-8" />
        </motion.div>
      </div>
    </section>
  );
}
