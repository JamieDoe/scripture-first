import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { SCREEN_TIME_ASSURANCES } from '@/features/onboarding/data/screen-time-access';
import { useScreenTimeAuthorization } from '@/features/screen-time/hooks/useScreenTimeAuthorization';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Text, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

export default function ScreenTimeAccessView() {
  const { status, isRequesting, request } = useScreenTimeAuthorization();

  async function onAllow() {
    if (status === 'approved') return router.navigate('/(onboarding)/select-apps');

    const next = await request();

    if (next === 'approved') router.navigate('/(onboarding)/select-apps');
  }

  return (
    <OnboardingScreen
      contentClassName="items-center justify-between"
      footer={
        <Button
          title="Continue"
          size="lg"
          className="w-full"
          disabled={isRequesting}
          onPress={onAllow}
        />
      }
    >
      <View className="flex w-full gap-9 pt-5">
        <FadeUp index={0}>
          <View className="flex w-full flex-row items-center justify-center">
            <View className="left-2 aspect-square w-28 -rotate-12 rounded-4xl bg-purple-800 shadow-xl" />
            <View className="top-4 -left-2 aspect-square w-28 rotate-12 rounded-4xl bg-purple-500 shadow-xl" />
          </View>
        </FadeUp>

        <View className="flex w-full gap-3">
          <FadeUp index={1}>
            <Text className="text-foreground text-onboarding-title font-serif">
              Great! First we need
              <Text className="text-primary-deep font-serif-regular"> permission </Text>to access
              your Screen Time
            </Text>
          </FadeUp>
          <FadeUp index={2}>
            <Text className="text-muted-foreground text-2xl">
              This lets us pause the apps you choose...
            </Text>
          </FadeUp>
        </View>

        <View className="flex w-full gap-4">
          {SCREEN_TIME_ASSURANCES.map((assurance, i) => (
            <FadeUp key={assurance.id} index={3 + i}>
              <TickTile text={assurance.text} />
            </FadeUp>
          ))}
        </View>
      </View>
    </OnboardingScreen>
  );
}

function TickTile({ text }: Readonly<{ text: string }>) {
  const tint = useCSSVariable('--color-primary-deep') as string | undefined;

  return (
    <Card variant="elevated" className="w-full flex-row items-center gap-4">
      <View className="bg-card-sunk h-10 w-10 items-center justify-center rounded-full">
        <SymbolView name="checkmark" size={16} weight="semibold" tintColor={tint} />
      </View>

      <Text className="text-foreground flex-1 text-base">{text}</Text>
    </Card>
  );
}
