import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {index} — {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-paper-dim">{description}</p>
      )}
    </Reveal>
  );
}
