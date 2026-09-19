import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';

export default function SetupCompleteView() {
  const complete = useOnboarding((state) => state.complete);

  function handlePress() {
    complete();

    return router.replace('/(tabs)');
  }

  return (
    <OnboardingScreen
      contentClassName="items-center justify-between"
      footer={
        <Button title="Enter Scripture First" size="lg" className="w-full" onPress={handlePress} />
      }
    >
      <View className="flex-1 items-center justify-between gap-9 pt-16 pb-12">
        <View className="flex items-center gap-9">
          <FadeUp index={0} className="items-center">
            <Text className="text-8xl">📜</Text>
          </FadeUp>
          <FadeUp index={1} className="w-full items-center">
            <Text className="text-foreground text-onboarding-hero text-center font-serif">
              Ready when <Text className="text-primary-deep font-serif-regular">you are</Text>
            </Text>
          </FadeUp>
        </View>
        <FadeUp index={2} className="w-full items-center">
          <Text className="text-muted-foreground text-center text-xl">
            Your apps will now be blocked until you devote some time to scripture
          </Text>
        </FadeUp>
      </View>
    </OnboardingScreen>
  );
}
