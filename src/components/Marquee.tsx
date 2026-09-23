"use client";
import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  textClassName,
  reverse = false,
}: {
  items: string[];
  className?: string;
  textClassName?: string;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee items-center gap-10 whitespace-nowrap",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {loop.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-10">
            <span
              className={cn(
                "font-display text-3xl italic text-paper-faint/40 sm:text-4xl",
                textClassName,
              )}
            >
              {label}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent/50"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
