import { OptionList } from '@/components/ui/option-list';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { DAILY_SCREEN_TIME_OPTIONS } from '@/features/onboarding/data/daily-screen-time';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { Text } from 'react-native';

export default function DailyScreenTimeView() {
  const dailyScreenTime = useOnboarding((state) => state.dailyScreenTime);
  const set = useOnboarding((state) => state.set);

  return (
    <StepScreen
      title={
        <>
          How much do you <Text className="text-primary-deep font-serif-regular">scroll</Text> each
          day?
        </>
      }
      subtitle="Be honest — it's why you're here"
      ctaDisabled={!dailyScreenTime}
      onContinue={() => router.push('/(onboarding)/time-wasted')}
    >
      <OptionList
        options={DAILY_SCREEN_TIME_OPTIONS}
        value={dailyScreenTime}
        onSelect={(value) => set({ dailyScreenTime: value })}
      />
    </StepScreen>
  );
}
