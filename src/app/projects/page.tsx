import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "@/components/ProjectsGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Temesgen Gebremariam — e-commerce platforms, AI tools, inventory systems and mobile apps, with case studies covering problem, solution and impact.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
        <SectionHeading
          index="01"
          eyebrow="Portfolio"
          title="Selected work"
          description="Each project below was built to solve a concrete problem. Open a case study to see the thinking behind it — problem, solution, and measurable impact."
        />
        <p className="font-mono text-xs uppercase tracking-widest text-paper-faint">
          {String(projects.length).padStart(2, "0")} projects
        </p>
      </div>
      <div className="mt-14">
        <ProjectsGrid />
      </div>
    </div>
  );
}
