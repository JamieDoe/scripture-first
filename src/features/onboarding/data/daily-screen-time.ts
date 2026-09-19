export enum DailyScreenTimeValue {
  UNDER_2 = 'under-2',
  BETWEEN_2_4 = 'between-2-4',
  BETWEEN_4_6 = 'between-4-6',
  BETWEEN_6_8 = 'between-6-8',
  OVER_8 = 'over-8',
}

export type DailyScreenTimeOption = {
  value: DailyScreenTimeValue;
  label: string;
  midpointHours: number;
};

export const DAILY_SCREEN_TIME_OPTIONS: DailyScreenTimeOption[] = [
  { value: DailyScreenTimeValue.UNDER_2, label: 'Under 2 hours', midpointHours: 1.5 },
  { value: DailyScreenTimeValue.BETWEEN_2_4, label: '2 - 4 hours', midpointHours: 3 },
  { value: DailyScreenTimeValue.BETWEEN_4_6, label: '4 - 6 hours', midpointHours: 5 },
  { value: DailyScreenTimeValue.BETWEEN_6_8, label: '6 - 8 hours', midpointHours: 7 },
  { value: DailyScreenTimeValue.OVER_8, label: '8+ hours', midpointHours: 9 },
];
