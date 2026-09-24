"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  const active = testimonials[index];

  return (
    <section
      className="border-y border-line bg-ink-800/40 py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Word of mouth"
          title="What people say"
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="relative mx-auto max-w-3xl rounded-3xl border border-line bg-white/[0.02] p-8 sm:p-12">
            <Quote className="h-8 w-8 text-accent/40" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mt-4 font-display text-xl leading-relaxed text-paper sm:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm text-paper-dim">
                  <span className="font-medium text-paper">{active.name}</span>{" "}
                  — {active.role}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-accent" : "w-1.5 bg-white/15",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
