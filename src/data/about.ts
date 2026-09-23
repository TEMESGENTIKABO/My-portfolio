export type PassionIcon = "code" | "pen";

export interface AboutData {
  intro: string;
  journey: {
    year: string;
    title: string;
    description: string;
  }[];
  passions: {
    title: string;
    description: string;
    icon: PassionIcon;
  }[];
  hobbies: {
    name: string;
    description: string;
  }[];
}

export const aboutData: AboutData = {
  intro:
    "I'm a full-stack developer with a passion for building scalable, user-friendly applications. Over the years, I've transitioned from debugging CSS to architecting complex systems, always striving to learn and grow.",
  journey: [
    {
      year: "2018",
      title: "First Steps in Web Development",
      description:
        "Started with HTML, CSS, and JavaScript, building small projects and learning the basics of web development.",
    },
    {
      year: "2020",
      title: "Diving into Full-Stack",
      description:
        "Built my first full-stack application using Node.js and React, learning about APIs, databases, and deployment.",
    },
    {
      year: "2022",
      title: "Open Source Contributions",
      description:
        "Began contributing to open-source projects, focusing on improving developer tools and libraries.",
    },
    {
      year: "2024",
      title: "Leading Projects",
      description:
        "Currently leading the development of enterprise-grade applications, focusing on scalability and performance.",
    },
  ],
  passions: [
    {
      title: "Open Source",
      description:
        "I love contributing to open-source projects and helping improve the tools developers use every day.",
      icon: "code",
    },
    {
      title: "Tech Blogging",
      description:
        "I write about my experiences, challenges, and solutions in tech to share knowledge with the community.",
      icon: "pen",
    },
  ],
  hobbies: [
    {
      name: "Photography",
      description:
        "Capturing moments and exploring the world through my camera lens.",
    },
    {
      name: "Gaming",
      description:
        "Enjoying competitive games and exploring indie game development.",
    },
    {
      name: "Coffee Brewing",
      description:
        "Experimenting with different brewing methods to make the perfect cup of coffee.",
    },
  ],
};
