export interface Skill {
  name: string;
  icon: string;
  kind?: "devicon" | "lucide";
  proficiency: number;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "React",
        icon: "react",
        proficiency: 90,
        description:
          "Building dynamic and responsive UIs with React and Next.js.",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        proficiency: 85,
        description: "Implementing type-safe applications with TypeScript.",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss",
        proficiency: 95,
        description: "Crafting modern, utility-first designs with Tailwind.",
      },
      {
        name: "Redux",
        icon: "redux",
        proficiency: 85,
        description: "Managing application state with Redux state container.",
      },
      {
        name: "Angular",
        icon: "angular",
        proficiency: 60,
        description:
          "Developing enterprise-scale applications with Angular framework.",
      },
      {
        name: "Jest",
        icon: "jest",
        proficiency: 60,
        description: "Writing comprehensive unit tests with Jest.",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Next.js",
        icon: "nextjs",
        proficiency: 90,
        description: "API Routes – API handlers inside Next.js projects",
      },
      {
        name: "Node.js",
        icon: "nodejs",
        proficiency: 90,
        description: "Building RESTful APIs and microservices with Node.js.",
      },
      {
        name: "Express",
        icon: "express",
        proficiency: 85,
        description: "Developing server-side applications with Express.",
      },
      {
        name: "MongoDB",
        icon: "mongodb",
        proficiency: 75,
        description: "Working with NoSQL databases using MongoDB.",
      },
      {
        name: "PostgreSQL",
        icon: "postgresql",
        proficiency: 80,
        description: "Designing relational databases with PostgreSQL.",
      },
      {
        name: "JWT Auth",
        icon: "jwt",
        proficiency: 70,
        description: "Token-based authentication.",
      },
      {
        name: "Prisma",
        icon: "prisma",
        proficiency: 70,
        description: "Modern TypeScript ORM with auto-generated queries.",
      },
    ],
  },
  {
    title: "AI-Augmented Development",
    skills: [
      {
        name: "Claude",
        icon: "bot",
        kind: "lucide",
        proficiency: 90,
        description:
          "Pair-programming, architecture review, and shipping production code faster with Claude.",
      },
      {
        name: "Prompt Engineering",
        icon: "wand",
        kind: "lucide",
        proficiency: 85,
        description:
          "Structuring prompts and context for reliable, production-grade AI output.",
      },
      {
        name: "GitHub Copilot",
        icon: "sparkles",
        kind: "lucide",
        proficiency: 80,
        description: "In-editor AI pair programming for faster iteration.",
      },
      {
        name: "ChatGPT / GPT-4 API",
        icon: "message-square",
        kind: "lucide",
        proficiency: 85,
        description:
          "Building AI-powered features and using GPT-4 for research, drafting, and debugging.",
      },
      {
        name: "LangChain / RAG",
        icon: "brain",
        kind: "lucide",
        proficiency: 70,
        description:
          "Retrieval-augmented pipelines for grounding LLM output in real data.",
      },
      {
        name: "Cursor",
        icon: "terminal",
        kind: "lucide",
        proficiency: 80,
        description:
          "AI-native code editor for faster refactors and codebase navigation.",
      },
    ],
  },
  {
    title: "DevOps",
    skills: [
      {
        name: "Docker",
        icon: "docker",
        proficiency: 85,
        description: "Containerizing applications using Docker.",
      },
      {
        name: "Kubernetes",
        icon: "kubernetes",
        proficiency: 75,
        description: "Orchestrating containers with Kubernetes.",
      },
      {
        name: "AWS",
        icon: "amazonwebservices",
        proficiency: 80,
        description: "Deploying and managing cloud infrastructure on AWS.",
      },
      {
        name: "Terraform",
        icon: "terraform",
        proficiency: 70,
        description: "Implementing infrastructure as code with Terraform.",
      },
      {
        name: "GitHub Actions",
        icon: "githubactions",
        proficiency: 85,
        description: "Automating CI/CD pipelines with GitHub Actions.",
      },
      {
        name: "Prometheus",
        icon: "prometheus",
        proficiency: 65,
        description: "Monitoring systems with Prometheus and Grafana.",
      },
      {
        name: "Jenkins",
        icon: "jenkins",
        proficiency: 70,
        description: "Configuring build pipelines using Jenkins.",
      },
      {
        name: "Nginx",
        icon: "nginx",
        proficiency: 75,
        description:
          "Setting up reverse proxies and load balancers with Nginx.",
      },
    ],
  },
];
