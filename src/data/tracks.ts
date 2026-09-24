export interface Track {
  title: string;
  icon: "code" | "briefcase" | "graduation" | "globe";
  status: "Shipping" | "Building" | "Researching" | "Maintaining";
  focus: string;
}

export const tracks: Track[] = [
  {
    title: "Engineering",
    icon: "code",
    status: "Shipping",
    focus:
      "Full-stack product work — Next.js, React, and Node.js builds for clients and personal projects.",
  },
  {
    title: "temesgen.tech",
    icon: "briefcase",
    status: "Building",
    focus: "Growing a software studio focused on web and mobile solutions.",
  },
  {
    title: "MBA & Research",
    icon: "graduation",
    status: "Researching",
    focus:
      "Data-mining research on demand forecasting, alongside MBA coursework.",
  },
  {
    title: "Language & Heritage Tech",
    icon: "globe",
    status: "Maintaining",
    focus:
      "Geez–Tigrinya dictionary app — keeping content and translations current.",
  },
];
