export enum ExperienceValue {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export type ExperienceOption = {
  value: ExperienceValue;
  label: string;
};

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { value: ExperienceValue.BEGINNER, label: 'Just starting out' },
  { value: ExperienceValue.INTERMEDIATE, label: 'Know the basics' },
  { value: ExperienceValue.ADVANCED, label: 'Fairly well read' },
  { value: ExperienceValue.EXPERT, label: 'Know it well' },
];
