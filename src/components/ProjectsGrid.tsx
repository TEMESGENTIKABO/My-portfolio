"use client";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectsGrid() {
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.categories))),
    ],
    [],
  );
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === c
                ? "border-accent bg-accent font-medium text-ink"
                : "border-line text-paper-dim hover:border-paper/30 hover:text-paper",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
