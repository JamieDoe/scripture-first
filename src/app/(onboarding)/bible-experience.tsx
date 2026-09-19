import { Text } from 'react-native';

import { OptionList } from '@/components/ui/option-list';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { EXPERIENCE_OPTIONS } from '@/features/onboarding/data/bible-experience';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';

export default function BibleExperienceView() {
  const bibleExperience = useOnboarding((state) => state.bibleExperience);
  const set = useOnboarding((state) => state.set);

  return (
    <StepScreen
      title={
        <>
          How familiar are you with the{' '}
          <Text className="text-primary-deep font-serif-regular">Bible</Text>?
        </>
      }
      subtitle="There's no wrong answer"
      ctaDisabled={!bibleExperience}
      onContinue={() => router.push('/(onboarding)/screen-time-access')}
    >
      <OptionList
        options={EXPERIENCE_OPTIONS}
        value={bibleExperience}
        onSelect={(value) => set({ bibleExperience: value })}
      />
    </StepScreen>
  );
}
