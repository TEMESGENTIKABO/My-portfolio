export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  icon: "compass" | "layout" | "code" | "rocket" | "refresh";
}

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "Clarify the real problem, constraints, and success metrics before writing code.",
    icon: "compass",
  },
  {
    index: "02",
    title: "Architect",
    description:
      "Design the data model and system boundaries so the build scales without rewrites.",
    icon: "layout",
  },
  {
    index: "03",
    title: "Build",
    description:
      "Ship in small, reviewable increments — often pairing with AI tools to move faster without cutting corners.",
    icon: "code",
  },
  {
    index: "04",
    title: "Launch",
    description:
      "Deploy, monitor, and validate against the metrics defined at the start.",
    icon: "rocket",
  },
  {
    index: "05",
    title: "Iterate",
    description:
      "Use real usage data to refine — performance, UX, and the next feature.",
    icon: "refresh",
  },
];
