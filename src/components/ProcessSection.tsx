"use client";
import { Code2, Compass, LayoutGrid, Rocket, RefreshCw } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { process, type ProcessStep } from "@/data/process";

const icons: Record<ProcessStep["icon"], typeof Compass> = {
  compass: Compass,
  layout: LayoutGrid,
  code: Code2,
  rocket: Rocket,
  refresh: RefreshCw,
};

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Method"
          title="How I work"
          description="The same loop, whether it's a client build or a side project."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-line sm:block"
          />
          <div className="grid gap-8 sm:grid-cols-5 sm:gap-4">
            {process.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className="relative flex flex-col gap-4 sm:items-center sm:text-center">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-ink text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] text-accent">
                        {step.index}
                      </p>
                      <h3 className="mt-1 font-display text-lg tracking-tight text-paper">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
