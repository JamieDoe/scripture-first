import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

const mmkvStorage = {
  getItem: (k: string) => storage.getString(k) ?? null,
  setItem: (k: string, v: string) => storage.set(k, v),
  removeItem: (k: string) => storage.remove(k),
};

type OnboardingState = {
  hasOnboarded: boolean;
  complete: () => void;
  reset: () => void;
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      complete: () => set({ hasOnboarded: true }),
      reset: () => set({ hasOnboarded: false }),
    }),
    { name: 'onboarding', storage: createJSONStorage(() => mmkvStorage) },
  ),
);
