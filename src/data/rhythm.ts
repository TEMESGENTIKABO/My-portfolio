export interface DayAllocation {
  day: string;
  hours: { track: string; hours: number }[];
}

// Approximate — not a time-tracking export. Track names must match
// the `title` field in src/data/tracks.ts.
export const weeklyRhythm: DayAllocation[] = [
  {
    day: "Mon",
    hours: [
      { track: "Engineering", hours: 6 },
      { track: "temesgen.tech", hours: 1.5 },
      { track: "MBA & Research", hours: 1 },
      { track: "Language & Heritage Tech", hours: 0.5 },
    ],
  },
  {
    day: "Tue",
    hours: [
      { track: "Engineering", hours: 5.5 },
      { track: "temesgen.tech", hours: 2 },
      { track: "MBA & Research", hours: 1 },
      { track: "Language & Heritage Tech", hours: 0.5 },
    ],
  },
  {
    day: "Wed",
    hours: [
      { track: "Engineering", hours: 5 },
      { track: "temesgen.tech", hours: 2 },
      { track: "MBA & Research", hours: 1.5 },
      { track: "Language & Heritage Tech", hours: 0.5 },
    ],
  },
  {
    day: "Thu",
    hours: [
      { track: "Engineering", hours: 5.5 },
      { track: "temesgen.tech", hours: 1.5 },
      { track: "MBA & Research", hours: 1.5 },
      { track: "Language & Heritage Tech", hours: 0.5 },
    ],
  },
  {
    day: "Fri",
    hours: [
      { track: "Engineering", hours: 4.5 },
      { track: "temesgen.tech", hours: 2.5 },
      { track: "MBA & Research", hours: 1.5 },
      { track: "Language & Heritage Tech", hours: 1 },
    ],
  },
  {
    day: "Sat",
    hours: [
      { track: "Engineering", hours: 2 },
      { track: "temesgen.tech", hours: 2 },
      { track: "MBA & Research", hours: 2 },
      { track: "Language & Heritage Tech", hours: 2 },
    ],
  },
  {
    day: "Sun",
    hours: [
      { track: "Engineering", hours: 1 },
      { track: "temesgen.tech", hours: 1 },
      { track: "MBA & Research", hours: 1.5 },
      { track: "Language & Heritage Tech", hours: 2.5 },
    ],
  },
];
