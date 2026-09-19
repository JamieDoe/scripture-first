export enum ScheduleValue {
  MORNING = 'morning',
  EVENING = 'evening',
  SUNDAYS = 'sundays',
  WORK_HOURS = 'work-hours',
}

export enum Weekday {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export const EVERY_DAY: Weekday[] = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
  Weekday.SATURDAY,
  Weekday.SUNDAY,
];

export const WEEKDAYS: Weekday[] = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
];

export type TimeOfDay = {
  hour: number;
  minute: number;
};

export type BlockingWindow = {
  start: TimeOfDay;
  end: TimeOfDay;
  days: Weekday[];
};

export type ScheduleOption = {
  value: ScheduleValue;
  label: string;
  subLabel: string;
  icon?: string;
  windows: BlockingWindow[];
};

const ALL_DAY = { start: { hour: 0, minute: 0 }, end: { hour: 23, minute: 59 } };

export const BLOCKING_SCHEDULE_OPTIONS: ScheduleOption[] = [
  {
    value: ScheduleValue.MORNING,
    label: 'Morning',
    subLabel: '6:00 - 11:00 · every day',
    icon: '📜',
    windows: [{ start: { hour: 6, minute: 0 }, end: { hour: 11, minute: 0 }, days: EVERY_DAY }],
  },
  {
    value: ScheduleValue.EVENING,
    label: 'Evening',
    subLabel: '21:00 - 23:30 · every day',
    icon: '🌖',
    windows: [{ start: { hour: 21, minute: 0 }, end: { hour: 23, minute: 30 }, days: EVERY_DAY }],
  },
  {
    value: ScheduleValue.SUNDAYS,
    label: 'Sundays',
    subLabel: 'All day Sunday',
    icon: '✝️',
    windows: [{ ...ALL_DAY, days: [Weekday.SUNDAY] }],
  },
  {
    value: ScheduleValue.WORK_HOURS,
    label: 'Work Hours',
    subLabel: '9:00 - 17:00 · weekdays',
    icon: '👨‍💻',
    windows: [{ start: { hour: 9, minute: 0 }, end: { hour: 17, minute: 0 }, days: WEEKDAYS }],
  },
];
