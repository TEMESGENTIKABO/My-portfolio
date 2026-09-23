"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/contact", label: "Contact", index: "03" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          onClick={() => setOpen(false)}
        >
          Temesgen<span className="text-accent">.</span>tech
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className="group relative py-2 text-sm"
            >
              <span
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  pathname === l.href
                    ? "text-paper"
                    : "text-paper-dim group-hover:text-paper",
                )}
              >
                <span className="font-mono text-[10px] text-accent">
                  {l.index}
                </span>
                {l.label}
              </span>
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                  pathname === l.href ? "w-full" : "w-0 group-hover:w-full",
                )}
                aria-hidden="true"
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-accent-soft"
          >
            Let&rsquo;s talk <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-4 font-display text-2xl tracking-tight",
                      pathname === l.href ? "text-accent-soft" : "text-paper",
                    )}
                  >
                    <span className="font-mono text-xs text-accent">
                      {l.index}
                    </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-ink"
              >
                Let&rsquo;s talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
