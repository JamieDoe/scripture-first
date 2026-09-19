import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ExperienceValue } from '../data/bible-experience';
import { DailyScreenTimeValue } from '../data/daily-screen-time';

export const storage = createMMKV();

const mmkvStorage = {
  getItem: (k: string) => storage.getString(k) ?? null,
  setItem: (k: string, v: string) => storage.set(k, v),
  removeItem: (k: string) => storage.remove(k),
};

type OnboardingData = {
  name?: string;
  age: number;
  dailyScreenTime: DailyScreenTimeValue;
  denomination?: string;
  bibleExperience?: string;
  schedulePreset?: string;
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
  age: 20,
  dailyScreenTime: DailyScreenTimeValue.BETWEEN_2_4,
  bibleExperience: ExperienceValue.INTERMEDIATE,
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
