import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Temesgen Gebremariam — e-commerce platforms, AI tools, inventory systems and mobile apps, with case studies covering problem, solution and impact.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <SectionHeading
        index="01"
        eyebrow="Portfolio"
        title="Selected work"
        description="Each project below was built to solve a concrete problem. Open a case study to see the thinking behind it — problem, solution, and measurable impact."
      />
      <div className="mt-14">
        <ProjectsGrid />
      </div>
    </div>
  );
}
