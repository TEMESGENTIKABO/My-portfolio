"use client";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const WEEKS = 52;
const DAYS = 7;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function levelFor(week: number, day: number) {
  const r = seededRandom(week * 7 + day + 1);
  if (r > 0.88) return 4;
  if (r > 0.72) return 3;
  if (r > 0.5) return 2;
  if (r > 0.3) return 1;
  return 0;
}

const levelClasses = [
  "bg-white/[0.04]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

function cellDate(week: number, day: number) {
  const today = new Date();
  const totalDays = (WEEKS - 1 - week) * 7 + (6 - day);
  const d = new Date(today);
  d.setDate(today.getDate() - totalDays);
  return d;
}

export default function ContributionHeatmap() {
  const grid = useMemo(
    () =>
      Array.from({ length: WEEKS }, (_, week) =>
        Array.from({ length: DAYS }, (_, day) => levelFor(week, day)),
      ),
    [],
  );
  const [hovered, setHovered] = useState<{ week: number; day: number } | null>(
    null,
  );

  return (
    <section className="py-20 md:py-28" aria-labelledby="activity-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Consistency"
          title="Build activity"
          description="A rolling snapshot of shipping cadence — commits, deploys, and late-night debugging sessions."
        />

        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <div className="inline-flex min-w-full flex-col gap-2 rounded-2xl border border-line bg-white/[0.02] p-6">
            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((level, di) => {
                    const date = cellDate(wi, di);
                    const isHovered =
                      hovered?.week === wi && hovered?.day === di;
                    return (
                      <button
                        key={di}
                        type="button"
                        onMouseEnter={() => setHovered({ week: wi, day: di })}
                        onFocus={() => setHovered({ week: wi, day: di })}
                        className={cn(
                          "h-[10px] w-[10px] rounded-[2px] transition-transform",
                          levelClasses[level],
                          isHovered && "scale-125 ring-1 ring-accent",
                        )}
                        aria-label={`${date.toLocaleDateString()}: activity level ${level}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p
                className="font-mono text-[11px] text-paper-faint"
                aria-live="polite"
              >
                {hovered
                  ? cellDate(hovered.week, hovered.day).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric", year: "numeric" },
                    )
                  : "Hover a cell for the date"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-paper-faint">
                  Less
                </span>
                {levelClasses.map((c, i) => (
                  <span
                    key={i}
                    className={cn("h-[10px] w-[10px] rounded-[2px]", c)}
                  />
                ))}
                <span className="font-mono text-[10px] text-paper-faint">
                  More
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
