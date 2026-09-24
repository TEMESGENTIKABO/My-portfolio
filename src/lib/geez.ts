const ONES = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
const TENS = ["", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];

/**
 * Converts 1–99 to Ge'ez (Ethiopic) numerals. The Ge'ez system is
 * base-100 with separate symbols for 100 and 10,000, so larger values
 * need different grouping logic — intentionally out of scope here
 * since this is only used for small stat numbers on the site.
 */
export function toGeezNumeral(n: number): string | null {
  if (!Number.isInteger(n) || n < 1 || n > 99) return null;
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${TENS[tens]}${ONES[ones]}`;
}
