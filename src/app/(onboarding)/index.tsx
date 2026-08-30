import { Seperator } from '@/components/layout/seperator';
import { Button } from '@/components/ui/button';
import Emblem from '@/components/ui/emblem.svg';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function OnboardingView() {
  return (
    <OnboardingScreen
      gradient
      contentClassName="items-center justify-between"
      footer={
        <View className="w-full items-center gap-4">
          <Button
            title="Begin"
            size="lg"
            className="w-full"
            onPress={() => router.navigate('/(onboarding)/pick-apps')}
          />

          <View className="flex-row items-center gap-1.5">
            <View className="bg-primary aspect-square h-1.5 rounded-full" />
            <Text className="text-muted-foreground text-xs">
              No account, no email. Setup takes a minute.
            </Text>
          </View>
        </View>
      }
    >
      <View className="flex items-center gap-10">
        <Emblem width={270} height={164} />
        <View className="flex items-center gap-5">
          <Text className="text-foreground text-center font-serif text-[44px]">
            Be still, and know that I am God.
          </Text>
          <Text className="text-primary-text-strong text-[11px] font-semibold tracking-[0.25em] uppercase">
            Psalm 46:10
          </Text>

          <Seperator />

          <Text className="text-muted-foreground px-5 text-center text-base">
            Scripture First meets you at the apps that pull hardest, and hands you a passage
            instead.
          </Text>
        </View>
      </View>
    </OnboardingScreen>
  );
}
