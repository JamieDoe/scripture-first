/**
 * Approximate remaining life expectancy in years, by current age.
 *
 * Deliberately not `FIXED_LIFESPAN - age`: that hits zero at the cap, so the
 * projection collapses to "0 years" for anyone near it. Real remaining life
 * expectancy tapers instead — roughly 9 years at 80, 4 at 90 — so this stays
 * meaningful at every age the ruler allows.
 */
type Anchor = { age: number; remaining: number };

const ANCHORS: Anchor[] = [
  { age: 10, remaining: 70 },
  { age: 20, remaining: 60 },
  { age: 30, remaining: 50 },
  { age: 40, remaining: 41 },
  { age: 50, remaining: 32 },
  { age: 60, remaining: 24 },
  { age: 70, remaining: 16 },
  { age: 80, remaining: 9 },
  { age: 90, remaining: 4 },
  { age: 100, remaining: 2 },
];

export function remainingYearsFor(age: number): number {
  const first = ANCHORS[0];
  const last = ANCHORS[ANCHORS.length - 1];

  if (age <= first.age) return first.remaining;
  if (age >= last.age) return last.remaining;

  const upperIndex = ANCHORS.findIndex((anchor) => age <= anchor.age);
  const lower = ANCHORS[upperIndex - 1];
  const upper = ANCHORS[upperIndex];

  const progress = (age - lower.age) / (upper.age - lower.age);

  return lower.remaining + progress * (upper.remaining - lower.remaining);
}
