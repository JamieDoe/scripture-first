import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';

export default function WelcomeView() {
  const hasOnboarded = useOnboarding((state) => state.hasOnboarded);

  if (hasOnboarded) {
    router.replace('/(tabs)');
  }

  return (
    <OnboardingScreen
      contentClassName="items-center justify-between"
      footer={
        <View className="w-full items-center gap-4">
          <Button
            title="Get Started"
            size="lg"
            className="w-full"
            onPress={() => router.push('/(onboarding)/distraction-problem')}
          />

          <View className="flex-row items-center gap-1.5">
            <View className="bg-primary aspect-square h-1.5 rounded-full" />
            <Text className="text-muted-foreground text-sm">
              No account, no email. Setup takes a minute.
            </Text>
          </View>
        </View>
      }
    >
      <View className="flex items-center gap-9 pt-16">
        <FadeUp index={0} className="items-center">
          <View className="bg-primary/10 aspect-square h-30 w-30 items-center justify-center rounded-4xl"></View>
        </FadeUp>
        <FadeUp index={1} className="w-full items-center">
          <Text className="text-foreground text-center font-serif text-[56px] leading-16">
            Welcome to{'\n'}
            <Text className="text-primary-deep text-center font-serif text-[56px] leading-16">
              Scripture First
            </Text>
          </Text>
        </FadeUp>
        <FadeUp index={2} className="w-full items-center">
          <Text className="text-muted-foreground px-4 text-center text-2xl">
            Helping you spend less time scrolling and more time with the Lord...
          </Text>
        </FadeUp>
      </View>
    </OnboardingScreen>
  );
}
