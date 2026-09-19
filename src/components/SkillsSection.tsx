import { skills } from "@/data/skills";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function SkillsSection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="Technologies I work with"
          description="A toolkit shaped by real projects — from responsive interfaces to containerized deployments."
        />
        <div className="mt-14 space-y-12">
          {skills.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.05}>
              <div className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10">
                <h3 className="font-mono text-sm uppercase tracking-widest text-accent">
                  {category.title}
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      title={skill.description}
                      className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-paper-dim transition-colors hover:border-accent/50 hover:text-paper"
                    >
                      <i
                        className={`devicon-${skill.icon}-plain text-lg text-paper-dim transition-colors group-hover:text-accent`}
                        aria-hidden="true"
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
