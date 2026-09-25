"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 16));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + escape to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
        scrolled || open
          ? "border-b border-line/80 bg-ink/75 shadow-[0_1px_0_0_rgba(255,255,255,0.03),0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={close}
          className="group relative flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          aria-label="Temesgen.tech — home"
        >
          <span
            aria-hidden="true"
            className="relative grid h-8 w-8 place-items-center rounded-md border border-line/80 bg-gradient-to-br from-paper/[0.06] to-transparent text-[13px] font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:border-accent/50"
          >
            <span className="font-display leading-none">T</span>
            <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px] shadow-accent/50" />
          </span>
          <span className="font-display text-[17px] leading-none tracking-tight sm:text-lg">
            <span className="text-paper">Temesgen</span>
            <span className="text-accent">.</span>
            <span className="text-paper-dim transition-colors duration-300 group-hover:text-paper">
              tech
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm outline-none transition-colors duration-300",
                  "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                  active ? "text-paper" : "text-paper-dim hover:text-paper",
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] transition-colors duration-300",
                      active
                        ? "text-accent"
                        : "text-accent/60 group-hover:text-accent",
                    )}
                  >
                    {l.index}
                  </span>
                  {l.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-0 rounded-full border border-line/70 bg-paper/[0.04]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-300",
                    active ? "w-0" : "w-0 group-hover:w-6",
                  )}
                />
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="group ml-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink outline-none transition-all duration-300 hover:bg-accent-soft hover:shadow-[0_0_24px_-6px] hover:shadow-accent/60 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Let&rsquo;s talk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-transparent text-paper outline-none transition-colors duration-300 hover:border-line/80 hover:bg-paper/[0.04] focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:hidden"
        >
          <AnimatePresence initial={false} mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={reduce ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute inset-0 grid place-items-center"
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={reduce ? false : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute inset-0 grid place-items-center"
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={close}
              className="fixed inset-0 top-16 -z-10 bg-ink/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav"
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden border-t border-line/80 bg-ink/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col px-5 pt-4 pb-8">
                <ul className="flex flex-col">
                  {links.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <motion.li
                        key={l.href}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.04 * i,
                          duration: 0.3,
                          ease: EASE,
                        }}
                      >
                        <Link
                          href={l.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group relative flex items-center justify-between gap-4 rounded-xl px-4 py-4 outline-none transition-colors duration-300",
                            "focus-visible:ring-2 focus-visible:ring-accent/60",
                            active
                              ? "bg-paper/[0.04] text-paper"
                              : "text-paper-dim hover:bg-paper/[0.03] hover:text-paper",
                          )}
                        >
                          <span className="flex items-baseline gap-3">
                            <span
                              className={cn(
                                "font-mono text-[11px]",
                                active ? "text-accent" : "text-accent/60",
                              )}
                            >
                              {l.index}
                            </span>
                            <span className="font-display text-2xl tracking-tight">
                              {l.label}
                            </span>
                          </span>
                          <ArrowUpRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-all duration-300",
                              active
                                ? "text-accent opacity-100"
                                : "text-paper-dim opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                            )}
                          />
                          {active && (
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1/2 h-6 w-px -translate-y-1/2 bg-accent"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 * links.length + 0.05,
                    duration: 0.3,
                    ease: EASE,
                  }}
                  className="mt-6"
                >
                  <Link
                    href="/contact"
                    onClick={close}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-ink outline-none transition-colors duration-300 hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    Let&rsquo;s talk
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <p className="mt-5 text-center font-mono text-[10px] tracking-widest text-paper-dim/60 uppercase">
                    Temesgen<span className="text-accent">.</span>tech
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
