import { FadeUp } from '@/components/ui/fade-up';
import { RollingNumber } from '@/components/ui/rolling-number';
import { RulerPicker } from '@/components/ui/ruler-picker';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

const MIN_AGE = 13;
const MAX_AGE = 100;

export default function YourAgeView() {
  const age = useOnboarding((state) => state.age);
  const set = useOnboarding((state) => state.set);

  return (
    <StepScreen
      title={
        <>
          How <Text className="text-primary-deep font-serif-regular">old</Text> are you?
        </>
      }
      subtitle="So we can show what your scrolling really adds up to"
      contentClassName="gap-24"
      onContinue={() => router.push('/(onboarding)/daily-screen-time')}
    >
      <View className="flex justify-center gap-8">
        <FadeUp index={2}>
          <View className="items-center">
            <View className="flex-row items-end gap-1.5">
              <RollingNumber value={age} className="text-foreground text-7xl font-bold" />
              <Text className="text-muted-foreground pb-3 text-xl font-medium">years</Text>
            </View>
          </View>
        </FadeUp>

        {/* -mx-5 cancels the screen padding so the ruler bleeds to both edges. */}
        <FadeUp index={3} className="-mx-5">
          <RulerPicker
            label="Age"
            min={MIN_AGE}
            max={MAX_AGE}
            value={age}
            onChange={(next) => set({ age: next })}
          />
        </FadeUp>
      </View>
    </StepScreen>
  );
}
