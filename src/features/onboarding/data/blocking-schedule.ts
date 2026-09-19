export enum ScheduleValue {
  MORNING = 'morning',
  EVENING = 'evening',
  SUNDAYS = 'sundays',
  WORK_HOURS = 'work-hours',
}

export type ScheduleOption = {
  value: ScheduleValue;
  label: string;
  subLabel: string;
  icon?: string;
};

export const BLOCKING_SCHEDULE_OPTIONS: ScheduleOption[] = [
  {
    value: ScheduleValue.MORNING,
    label: 'Morning',
    subLabel: '6:00 - 11:00 · every day',
    icon: '📜',
  },
  {
    value: ScheduleValue.EVENING,
    label: 'Evening',
    subLabel: '21:00 - 23:30 · every day',
    icon: '🌖',
  },
  { value: ScheduleValue.SUNDAYS, label: 'Sundays', subLabel: 'All day Sunday', icon: '✝️' },
  {
    value: ScheduleValue.WORK_HOURS,
    label: 'Work Hours',
    subLabel: '9:00 - 17:00 · weekdays',
    icon: '👨‍💻',
  },
];
