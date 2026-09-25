import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import type { Project } from "@/data/projects";
import ShareProjectButton from "@/components/ShareProjectButton";

export default function ProjectSpotlight({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line bg-white/[0.02]">
      <div className="grid lg:grid-cols-2">
        <Link
          href={`/projects/${project.slug}`}
          className="relative block aspect-[16/11] overflow-hidden lg:aspect-auto"
          aria-label={`Read the case study: ${project.title}`}
        >
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r"
            aria-hidden="true"
          />
        </Link>

        <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
          <span className="w-fit rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
            Featured project
          </span>
          <h3 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent-soft"
            >
              {project.title}
            </Link>
          </h3>
          <p className="leading-relaxed text-paper-dim">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.slice(0, 5).map((t) => (
              <li
                key={t}
                className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-5 pt-1 text-sm">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-paper transition-colors hover:text-accent"
            >
              Live demo{" "}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-paper-dim transition-colors hover:text-paper"
              >
                <FiGithub aria-hidden="true" /> Code
              </a>
            )}
            <ShareProjectButton slug={project.slug} />
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-paper-dim transition-colors hover:text-accent sm:ml-auto"
            >
              Case study{" "}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
