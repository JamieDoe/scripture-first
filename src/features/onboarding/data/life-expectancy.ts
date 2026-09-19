// Approximate remaining life expectancy in years, by current age.

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
  const last = ANCHORS.at(-1);

  if (age <= first.age) return first.remaining;
  if (age >= (last?.age ?? first.age)) return last?.remaining ?? first.remaining;

  const upperIndex = ANCHORS.findIndex((anchor) => age <= anchor.age);
  const lower = ANCHORS[upperIndex - 1];
  const upper = ANCHORS[upperIndex];

  const progress = (age - lower.age) / (upper.age - lower.age);

  return lower.remaining + progress * (upper.remaining - lower.remaining);
}
