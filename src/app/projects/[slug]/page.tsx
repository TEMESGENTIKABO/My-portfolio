import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Target,
  Wrench,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ShareProjectButton from "@/components/ShareProjectButton";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.title ?? "Project",
    description: project?.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const more = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const stages = [
    { label: "Problem", icon: Target, text: project.problem },
    { label: "Solution", icon: Wrench, text: project.solution },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-36">
      <Reveal>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All projects
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          <Reveal delay={0.05}>
            <ul
              className="flex flex-wrap gap-2"
              aria-label="Project categories"
            >
              {project.categories.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-accent"
                >
                  {c}
                </li>
              ))}
            </ul>
            <h1 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-paper-dim">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line">
              <Image
                src={project.image}
                alt={`${project.title} interface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 780px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {stages.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-7">
                  <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                    {s.label}
                  </p>
                  <p className="mt-3 leading-relaxed text-paper-dim">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-5">
            <div className="rounded-2xl border border-line bg-white/[0.02] p-7">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                <Layers className="h-4 w-4" aria-hidden="true" /> Impact
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.metrics.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 text-sm leading-relaxed text-paper-dim"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:h-fit">
          <div className="space-y-4 rounded-2xl border border-line bg-white/[0.02] p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-paper-faint">
                Stack
              </p>
              <ul
                className="mt-3 flex flex-wrap gap-2"
                aria-label="Technologies used"
              >
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-paper-dim"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 border-t border-line pt-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
              >
                View live demo{" "}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-paper-dim transition-colors hover:border-paper/30 hover:text-paper"
                >
                  <FiGithub aria-hidden="true" /> Source code
                </a>
              )}
              <div className="pt-1 text-center">
                <ShareProjectButton slug={project.slug} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <section className="mt-24" aria-labelledby="more-heading">
        <Reveal>
          <h2
            id="more-heading"
            className="font-display text-3xl tracking-tight"
          >
            More projects
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
