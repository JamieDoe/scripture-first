export type ReadingDurationOption = {
  minutes: number;
  description: string;
};

export const READING_DURATION_OPTIONS: ReadingDurationOption[] = [
  { minutes: 3, description: 'One psalm, unhurried.' },
  { minutes: 5, description: 'A short passage to settle in.' },
  { minutes: 10, description: 'Room to read and reflect.' },
  { minutes: 15, description: 'Enough to study, not just read.' },
];
