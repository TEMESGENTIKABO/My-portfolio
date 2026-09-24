"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectSpotlight from "@/components/ProjectSpotlight";
import { cn } from "@/lib/utils";

function ProjectListRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.02] px-5 py-4 transition-colors hover:border-accent/40"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="font-mono text-xs text-paper-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg tracking-tight text-paper transition-colors group-hover:text-accent-soft">
            {project.title}
          </p>
          <p className="truncate text-xs text-paper-faint">
            {project.categories.join(" · ")}
          </p>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-paper-faint">
        {project.tech[0]}
      </span>
    </Link>
  );
}

export default function ProjectsGrid() {
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.categories))),
    ],
    [],
  );
  const [active, setActive] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));
  const [spotlight, ...rest] = filtered;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
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

        <div className="flex items-center gap-1 rounded-full border border-line p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            className={cn(
              "rounded-full p-2 transition-colors",
              view === "grid"
                ? "bg-accent text-ink"
                : "text-paper-dim hover:text-paper",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            className={cn(
              "rounded-full p-2 transition-colors",
              view === "list"
                ? "bg-accent text-ink"
                : "text-paper-dim hover:text-paper",
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {spotlight && (
        <div className="mt-10">
          <ProjectSpotlight project={spotlight} />
        </div>
      )}

      {rest.length > 0 && (
        <div
          className={cn(
            "mt-6",
            view === "grid"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-4",
          )}
        >
          {rest.map((p, i) =>
            view === "grid" ? (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ) : (
              <ProjectListRow key={p.slug} project={p} index={i + 1} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
