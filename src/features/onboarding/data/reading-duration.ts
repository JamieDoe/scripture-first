export type ReadingDurationOption = {
  minutes: number;
  description: string;
};

export const READING_DURATION_OPTIONS: ReadingDurationOption[] = [
  { minutes: 2, description: 'One psalm, unhurried.' },
  { minutes: 3, description: 'A short passage to settle in.' },
  { minutes: 5, description: 'Room to read and reflect.' },
  { minutes: 10, description: 'A deeper time in the Word.' },
];
