import { FadeUp } from '@/components/ui/fade-up';
import { RollingNumber } from '@/components/ui/rolling-number';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { READING_DURATION_OPTIONS } from '@/features/onboarding/data/reading-duration';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

const OPTIONS = READING_DURATION_OPTIONS.map((option) => ({
  value: option.minutes,
  label: String(option.minutes),
}));

export default function ReadingDurationView() {
  const readingMinutes = useOnboarding((state) => state.readingMinutes);
  const set = useOnboarding((state) => state.set);

  const description =
    READING_DURATION_OPTIONS.find((option) => option.minutes === readingMinutes)?.description ?? '';

  return (
    <StepScreen
      title={
        <>
          How long do you want to{' '}
          <Text className="text-primary-deep font-serif-regular">devote</Text> to Scripture?
        </>
      }
      subtitle="You can adjust this later..."
      ctaDisabled={!readingMinutes}
      contentClassName="gap-24"
      onContinue={() => router.push('/(onboarding)/setup-complete')}
    >
      <View className="flex justify-center gap-8">
        <FadeUp index={2}>
          <View className="items-center gap-2">
            <View className="flex-row items-end gap-1.5">
              <RollingNumber
                value={readingMinutes}
                className="text-foreground text-7xl font-bold"
              />
              <Text className="text-muted-foreground pb-3 text-xl font-medium">min</Text>
            </View>
            <FadeUp key={description} delay={0}>
              <Text className="text-muted-foreground text-base">{description}</Text>
            </FadeUp>
          </View>
        </FadeUp>

        <FadeUp index={3}>
          <SegmentedControl
            options={OPTIONS}
            value={readingMinutes}
            onSelect={(minutes) => set({ readingMinutes: minutes })}
          />
        </FadeUp>
      </View>
    </StepScreen>
  );
}
