import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
  priority,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_-25px_rgba(224,166,63,0.25)]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
        aria-label={`Read the case study: ${project.title}`}
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
          aria-hidden="true"
        />
        {typeof index === "number" && (
          <span className="absolute left-4 top-4 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[11px] text-paper-dim backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent-soft"
            >
              {project.title}
            </Link>
          </h3>
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 text-paper-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>

        <p className="text-sm leading-relaxed text-paper-dim">
          {project.description}
        </p>

        <ul
          className="mt-auto flex flex-wrap gap-2 pt-1"
          aria-label="Technologies used"
        >
          {project.tech.slice(0, 4).map((t) => (
            <li
              key={t}
              className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 pt-2 text-sm">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-paper transition-colors hover:text-accent"
          >
            Live demo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 text-paper-dim transition-colors hover:text-paper"
            >
              <FiGithub aria-hidden="true" /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}