import type { Metadata } from "next";
import {
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  RefreshCw,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { aboutData } from "@/data/about";
import { contactData } from "@/data/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Temesgen T. Gebremariam — full-stack developer with a background in banking, an MBA in progress, and a passion for scalable systems.",
};

const principles = [
  {
    icon: Rocket,
    title: "Scalability First",
    description:
      "Design systems that handle 10x traffic spikes without breaking a sweat.",
  },
  {
    icon: ShieldCheck,
    title: "Resilience by Design",
    description:
      "Build fault-tolerant systems that self-heal and recover gracefully.",
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description:
      "Prioritize clean APIs and documentation to empower other developers.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    description:
      "Iterate and optimize systems based on real-world usage and feedback.",
  },
];

const facts = [
  { icon: MapPin, label: "Based in", value: "Nanjing, Jiangsu, China" },
  { icon: Code2, label: "Focus", value: "Full-stack web & mobile development" },
  {
    icon: GraduationCap,
    label: "Currently",
    value: "MBA & data-mining research",
  },
  { icon: Mail, label: "Email", value: contactData.email },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A developer shaped by real-world problems"
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-paper-dim">
            <p>{aboutData.intro}</p>
            <p>
              I am a developer who believes that technology should solve real
              problems, not just create new ones. I thrive on building systems
              that are not only scalable and efficient but also intuitive and
              user-friendly.
            </p>
            <p>
              Outside of coding, I am a lifelong learner who enjoys diving into
              new technologies, exploring open-source projects, and sharing
              knowledge through writing and mentoring. When I am not at my desk,
              you will find me brewing coffee, listening to synthwave, or
              tinkering with side projects.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="space-y-5 rounded-2xl border border-line bg-white/[0.02] p-7">
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-4">
                <f.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-paper-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm text-paper">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <section className="mt-24" aria-labelledby="journey-heading">
        <SectionHeading
          index="02"
          eyebrow="Journey"
          title="Career timeline"
          className="mb-12"
        />
        <Timeline />
      </section>

      <section className="mt-24" aria-labelledby="philosophy-heading">
        <SectionHeading
          index="03"
          eyebrow="Philosophy"
          title="How I approach engineering"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-7 transition-colors hover:border-accent/40">
                <p.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24" aria-labelledby="passions-heading">
        <SectionHeading
          index="04"
          eyebrow="Beyond code"
          title="Passions & hobbies"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {aboutData.passions.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="lg:col-span-1">
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <h3 className="font-display text-lg tracking-tight text-accent-soft">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
          {aboutData.hobbies.map((h, i) => (
            <Reveal
              key={h.name}
              delay={(aboutData.passions.length + i) * 0.05}
              className="lg:col-span-1"
            >
              <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
                <h3 className="font-display text-lg tracking-tight">
                  {h.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {h.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
