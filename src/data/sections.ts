export interface SiteSection {
  id: string;
  label: string;
}

export const sections: SiteSection[] = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "tracks", label: "Now" },
  { id: "rhythm", label: "Rhythm" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Words" },
  { id: "contact-cta", label: "Contact" },
];
