import type { ReactNode } from 'react';
import { Text } from 'react-native';

export type HowItWorksStep = { id: string; icon: string; text: ReactNode };

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'lock',
    icon: '🔒',
    text: (
      <>
        apps <Text className="text-primary-deep">lock</Text> first
      </>
    ),
  },
  {
    id: 'read',
    icon: '📜',
    text: (
      <>
        read a <Text className="text-primary-deep">verse</Text> first
      </>
    ),
  },
  {
    id: 'unlock',
    icon: '📱',
    text: (
      <>
        then <Text className="text-primary-deep">unlock</Text> your apps
      </>
    ),
  },
];
