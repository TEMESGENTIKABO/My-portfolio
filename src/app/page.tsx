import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import ProjectCard from "@/components/ProjectCard";
import ResumeButton from "@/components/ResumeButton";
import { projects } from "@/data/projects";
import { aboutData } from "@/data/about";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero />

      {/* About strip */}
      <section
        className="border-y border-line bg-ink-800/40 py-20 md:py-24"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading
            index="01"
            eyebrow="About"
            title="Engineer, problem-solver, lifelong learner"
          />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-paper-dim">
              {aboutData.intro}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:text-accent-soft"
            >
              More about me <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SkillsSection />

      {/* Featured work */}
      <section className="py-20 md:py-28" aria-labelledby="work-heading">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              index="03"
              eyebrow="Portfolio"
              title="Selected work"
              description="A few projects that show how I approach real problems — performance, scale and user experience first."
            />
            <Reveal delay={0.1}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm text-paper-dim transition hover:border-paper/30 hover:text-paper"
              >
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-24" aria-labelledby="cta-heading">
        <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rounded-3xl border border-line bg-gradient-to-br from-ink-700 to-ink px-8 py-14 text-center md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              What is next
            </p>
            <h2
              id="cta-heading"
              className="mt-4 font-display text-3xl tracking-tight sm:text-4xl md:text-5xl"
            >
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper-dim">
              Whether it is a role, a product, or a collaboration — I would love
              to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft"
              >
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <ResumeButton />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
