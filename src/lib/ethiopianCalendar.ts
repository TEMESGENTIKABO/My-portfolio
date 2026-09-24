export interface EthiopianDate {
  year: number;
  month: number; // 1–13
  day: number;
  monthName: string;
}

const MONTH_NAMES = [
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yekatit",
  "Megabit",
  "Miyazya",
  "Ginbot",
  "Sene",
  "Hamle",
  "Nehase",
  "Pagumē",
];

function isGregorianLeap(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Approximate Gregorian → Ethiopian (Amete Mihret) calendar conversion,
 * suitable for everyday display. Not verified for liturgical or legal
 * use, where exact rule sets are more involved.
 */
export function toEthiopianDate(date: Date): EthiopianDate {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();

  const newYearDay = isGregorianLeap(gYear + 1) ? 12 : 11;
  const pastNewYear = gMonth > 9 || (gMonth === 9 && gDay >= newYearDay);

  const newYearGregorianYear = pastNewYear ? gYear : gYear - 1;
  const ethYear = pastNewYear ? gYear - 7 : gYear - 8;

  const newYearDate = new Date(newYearGregorianYear, 8, newYearDay); // month 8 = September
  const diffDays = Math.floor(
    (date.getTime() - newYearDate.getTime()) / 86_400_000,
  );

  const monthIndex = Math.min(12, Math.floor(diffDays / 30));
  const day = diffDays - monthIndex * 30 + 1;

  return {
    year: ethYear,
    month: monthIndex + 1,
    day,
    monthName: MONTH_NAMES[monthIndex],
  };
}
