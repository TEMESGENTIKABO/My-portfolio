"use client";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(236,234,228,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,234,228,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_75%)]" />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate="show"
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.p
          variants={reduce ? undefined : item}
          className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Full-Stack Developer · Nanjing, China
        </motion.p>

        <motion.h1
          variants={reduce ? undefined : item}
          className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Temesgen <span className="italic text-accent-soft">Gebremariam</span>
        </motion.h1>

        <motion.p
          variants={reduce ? undefined : item}
          className="mt-4 max-w-2xl font-display text-xl text-paper-dim sm:text-2xl"
        >
          I design and build scalable web platforms — from pixel to production.
        </motion.p>

        <motion.p
          variants={reduce ? undefined : item}
          className="mt-6 max-w-2xl leading-relaxed text-paper-dim"
        >
          Full-stack developer specializing in modern web technologies. I build
          fast, reliable web and mobile applications that solve complex problems
          and serve thousands of users. With an MBA and a background in data
          mining research, I bring both technical expertise and business insight
          to every project.
        </motion.p>

        <motion.div
          variants={reduce ? undefined : item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
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

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-6 py-3 text-sm text-paper-dim transition hover:border-paper/30 hover:text-paper"
          >
            Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
