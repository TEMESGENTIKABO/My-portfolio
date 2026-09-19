import { BarChart3, Briefcase, Code2, Rocket, Smartphone } from "lucide-react";
import { experience, type ExperienceItem } from "@/data/experience";
import Reveal from "@/components/Reveal";

const iconMap: Record<ExperienceItem["icon"], typeof Briefcase> = {
  bank: Briefcase,
  code: Code2,
  chart: BarChart3,
  phone: Smartphone,
  rocket: Rocket,
};

export default function Timeline() {
  return (
    <ol className="relative space-y-10">
      {experience.map((item, i) => {
        const Icon = iconMap[item.icon];
        return (
          <li
            key={`${item.year}-${item.title}`}
            className="relative border-l border-line pb-10 pl-8 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-accent/40 bg-ink"
            >
              <Icon className="h-3 w-3 text-accent" />
            </span>
            <Reveal delay={i * 0.04}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-sm text-accent">
                  {item.year}
                </span>
                <h3 className="font-display text-lg tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
                {item.description}
              </p>
              <ul
                className="mt-3 flex flex-wrap gap-2"
                aria-label="Related skills"
              >
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
