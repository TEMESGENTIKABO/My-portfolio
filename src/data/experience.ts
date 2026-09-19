export interface ExperienceItem {
  year: string;
  title: string;
  tags: string[];
  description: string;
  icon: "bank" | "code" | "chart" | "phone" | "rocket";
}

export const experience: ExperienceItem[] = [
  {
    year: "2017",
    title: "Commercial Bank of Ethiopia",
    tags: ["Banking Systems", "Customer Service"],
    description:
      "Gained experience in banking operations, financial services, and customer support.",
    icon: "bank",
  },
  {
    year: "2021",
    title: "Transitioned to Full-Stack Development",
    tags: ["React", "Next.js", "Node.js"],
    description:
      "Built and deployed web applications, focusing on front-end development with React and Next.js.",
    icon: "code",
  },
  {
    year: "2024",
    title: "MBA & Research in Data Mining",
    tags: ["Machine Learning", "Data Analysis"],
    description:
      "Conducting research on data mining for brewery sales prediction while studying for an MBA in China.",
    icon: "chart",
  },
  {
    year: "2025",
    title: "Geez-Tigrinya Dictionary App",
    tags: ["React Native", "TypeScript", "Firebase"],
    description:
      "Developed a mobile dictionary app to help users learn and translate Geez and Tigrinya.",
    icon: "phone",
  },
  {
    year: "2025",
    title: "Sinkata Tech",
    tags: ["Next.js", "React Native", "SaaS"],
    description:
      "Planning to launch a software development company focused on web and mobile solutions.",
    icon: "rocket",
  },
];
