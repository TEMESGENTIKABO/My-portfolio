export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Replace every entry with a real quote from a real client or colleague
// before this goes live — do not publish invented testimonials.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Delivered exactly what we needed, on time, and explained every trade-off along the way.",
    name: "JOHNSON SMITH",
    role: "CEO, Acme Corp",
  },
  {
    quote:
      "Rare combination of strong engineering instincts and genuine business judgment.",
    name: "NICOLAS MARTIN",
    role: "CTO, Tech Solutions Inc.",
  },
  {
    quote:
      "Turned a vague idea into a working product faster than we expected.",
    name: "ROBERT JOHNSON",
    role: "Product Manager, Innovate Corp",
  },
];
