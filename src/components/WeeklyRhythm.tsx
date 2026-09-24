"use client";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, Code2, GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { tracks, type Track } from "@/data/tracks";
import { weeklyRhythm } from "@/data/rhythm";

const icons: Record<Track["icon"], typeof Code2> = {
  code: Code2,
  briefcase: Briefcase,
  graduation: GraduationCap,
  globe: BookOpen,
};

// Same track, decreasing opacity — keeps the chart inside the
// existing ink/paper/accent palette instead of introducing new hues.
const opacities = [1, 0.7, 0.45, 0.25];

export default function WeeklyRhythm() {
  const totals = tracks.map((t) =>
    weeklyRhythm.reduce((sum, day) => {
      const entry = day.hours.find((h) => h.track === t.title);
      return sum + (entry?.hours ?? 0);
    }, 0),
  );
  const grandTotal = totals.reduce((a, b) => a + b, 0);

  return (
    <section className="py-20 md:py-28" aria-labelledby="rhythm-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Multitasking, made visible"
          title="A typical week"
          description="Not a time-tracking export — a rough sense of how a week splits across engineering, the studio, research, and heritage work."
        />

        <Reveal
          delay={0.1}
          className="mt-12 rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="space-y-3">
            {weeklyRhythm.map((day, di) => {
              const dayTotal = day.hours.reduce((s, h) => s + h.hours, 0);
              return (
                <div key={day.day} className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-mono text-[11px] uppercase tracking-widest text-paper-faint">
                    {day.day}
                  </span>
                  <div className="flex h-3 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                    {tracks.map((t, ti) => {
                      const entry = day.hours.find((h) => h.track === t.title);
                      const hours = entry?.hours ?? 0;
                      const width = dayTotal ? (hours / dayTotal) * 100 : 0;
                      return (
                        <motion.div
                          key={t.title}
                          title={`${t.title}: ${hours}h`}
                          className="h-full bg-accent first:rounded-l-full last:rounded-r-full"
                          style={{ opacity: opacities[ti] }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${width}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.7,
                            delay: di * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="w-10 shrink-0 text-right font-mono text-[11px] text-paper-faint">
                    {dayTotal}h
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-4">
            {tracks.map((t, i) => {
              const Icon = icons[t.icon];
              const share = grandTotal
                ? Math.round((totals[i] / grandTotal) * 100)
                : 0;
              return (
                <div key={t.title} className="flex items-start gap-2.5">
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
                    style={{ opacity: opacities[i] }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-medium text-paper">
                      <Icon
                        className="h-3.5 w-3.5 text-paper-faint"
                        aria-hidden="true"
                      />
                      {t.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-paper-faint">
                      {totals[i]}h/wk · {share}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
