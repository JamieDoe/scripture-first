import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';

export default function DistractionProblemView() {
  return (
    <OnboardingScreen
      contentClassName="items-center justify-between"
      footer={
        <Button
          title="Continue"
          size="lg"
          className="w-full"
          onPress={() => router.push('/(onboarding)/how-it-works')}
        />
      }
    >
      <View className="flex gap-7 pt-20">
        <FadeUp index={0}>
          <Text className="text-foreground font-serif text-[40px] leading-14">
            Feel like your phone pulls you away from time with{' '}
            <Text className="text-primary-deep font-serif-regular">God</Text>?
          </Text>
        </FadeUp>
        <FadeUp index={1}>
          <Text className="text-muted-foreground text-2xl">You&apos;re not the only one...</Text>
        </FadeUp>
        <FadeUp index={2}>
          <Text className="text-muted-foreground text-2xl">
            Social media is meant to keep you distracted
          </Text>
        </FadeUp>
      </View>
    </OnboardingScreen>
  );
}
