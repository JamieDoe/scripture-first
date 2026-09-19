import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { DAILY_SCREEN_TIME_OPTIONS } from '@/features/onboarding/data/daily-screen-time';
import { remainingYearsFor } from '@/features/onboarding/data/life-expectancy';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

const COUNT_ANIMATION_SETTINGS = {
  count_start_delay: 450, // 0.45s
  count_duration: 2000, // 2s
};

const HOURS_PER_DAY = 24;
const MONTHS_PER_YEAR = 12;

export default function TimeWastedView() {
  const [display, setDisplay] = useState(0);
  const [countDone, setCountDone] = useState(false);

  const { dailyScreenTime, age } = useOnboarding((state) => state);
  const reduceMotion = useReducedMotion();

  const hours =
    DAILY_SCREEN_TIME_OPTIONS.find((option) => option.value === dailyScreenTime)?.midpointHours ??
    0;

  // Share of each day spent scrolling, projected across the years they can expect.
  const projectedYears = (hours / HOURS_PER_DAY) * remainingYearsFor(age ?? 0);

  // Under a year the yearly figure rounds to "0", so switch to months instead.
  const inMonths = projectedYears < 1;
  const amount = Math.round(inMonths ? projectedYears * MONTHS_PER_YEAR : projectedYears);
  const unit = inMonths ? (amount === 1 ? 'month' : 'months') : amount === 1 ? 'year' : 'years';

  // Count animation on load
  useEffect(() => {
    if (amount <= 1 || reduceMotion) {
      setDisplay(amount);
      setCountDone(true);
      return;
    }

    let frame: number;
    let startedAt: number | null = null;

    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        startedAt ??= now;

        const animationProgress = Math.min(
          (now - startedAt) / COUNT_ANIMATION_SETTINGS.count_duration,
          1,
        );

        const eased = 1 - (1 - animationProgress) * (1 - animationProgress);
        setDisplay(Math.round(eased * amount));

        if (animationProgress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(amount);
          setCountDone(true);
        }
      };
      frame = requestAnimationFrame(tick);
    }, COUNT_ANIMATION_SETTINGS.count_start_delay);

    return () => {
      clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount, reduceMotion]);

  return (
    <OnboardingScreen
      footer={
        countDone ? (
          <Button title="Continue" onPress={() => router.push('/(onboarding)/pick-denomination')} />
        ) : null
      }
    >
      <View className="flex items-center gap-9 px-4 pt-16">
        <FadeUp index={0} className="w-full items-center">
          <Text className="text-foreground text-center font-serif text-6xl leading-20">
            That's about{' '}
            <Text className="text-primary-deep font-serif-regular">
              {display} {unit}
            </Text>{' '}
            {'\n'}
            of your life
          </Text>
        </FadeUp>

        {countDone ? (
          <>
            <FadeUp index={0} className="w-full items-center">
              <Text className="text-muted-foreground px-4 text-center text-xl">
                With just 15 minutes devoted to scripture each day...
              </Text>
            </FadeUp>
            <FadeUp index={1} className="w-full items-center">
              <Text className="text-muted-foreground px-4 text-center text-2xl">
                you&apos;d read the bible at least{' '}
                <Text className="text-primary-deep font-semibold">1.3x</Text> over this year
              </Text>
            </FadeUp>
          </>
        ) : null}
      </View>
    </OnboardingScreen>
  );
}
