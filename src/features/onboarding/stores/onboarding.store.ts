import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ExperienceValue } from '../data/bible-experience';
import { ScheduleValue } from '../data/blocking-schedule';
import { DailyScreenTimeValue } from '../data/daily-screen-time';
import { DenominationValue } from '../data/denominations';

const storage = createMMKV();

const mmkvStorage = {
  getItem: (k: string) => storage.getString(k) ?? null,
  setItem: (k: string, v: string) => storage.set(k, v),
  removeItem: (k: string) => storage.remove(k),
};

type OnboardingData = {
  name?: string;
  age: number;
  dailyScreenTime: DailyScreenTimeValue;
  denomination?: DenominationValue;
  bibleExperience?: ExperienceValue;
  schedulePreset?: ScheduleValue;
  readingMinutes: number;
  unlockMinutes: number;
};

type OnboardingState = OnboardingData & {
  hasOnboarded: boolean;
  set: (patch: Partial<OnboardingData>) => void;
  complete: () => void;
  reset: () => void;
};

const DEFAULTS: OnboardingData = {
  age: 25,
  dailyScreenTime: DailyScreenTimeValue.BETWEEN_2_4,
  bibleExperience: ExperienceValue.INTERMEDIATE,
  schedulePreset: ScheduleValue.MORNING,
  readingMinutes: 3,
  unlockMinutes: 15,
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      hasOnboarded: false,
      set: (patch) => set(patch),
      complete: () => set({ hasOnboarded: true }),
      reset: () => set({ ...DEFAULTS, hasOnboarded: false }),
    }),
    { name: 'onboarding', storage: createJSONStorage(() => mmkvStorage) },
  ),
);
