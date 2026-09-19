import { OptionList } from '@/components/ui/option-list';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { BLOCKING_SCHEDULE_OPTIONS } from '@/features/onboarding/data/blocking-schedule';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { Text } from 'react-native';

export default function BlockingScheduleView() {
  const schedulePreset = useOnboarding((state) => state.schedulePreset);
  const set = useOnboarding((state) => state.set);

  return (
    <StepScreen
      title={
        <>
          When do you want your apps to{' '}
          <Text className="text-primary-deep font-serif-regular">block</Text>?
        </>
      }
      subtitle="You can create custom periods later..."
      ctaDisabled={!schedulePreset}
      onContinue={() => router.push('/(onboarding)/reading-duration')}
    >
      <OptionList
        options={BLOCKING_SCHEDULE_OPTIONS}
        value={schedulePreset}
        onSelect={(value) => set({ schedulePreset: value })}
      />
    </StepScreen>
  );
}
