import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';

export default function YourNameView() {
  const name = useOnboarding((state) => state.name);
  const set = useOnboarding((state) => state.set);

  return (
    <OnboardingScreen
      contentClassName="justify-between"
      footer={
        <Button
          title="Next"
          size="lg"
          className="w-full"
          onPress={() => router.push('/(onboarding)/your-age')}
        />
      }
    >
      <View className="gap-7 pt-20">
        <FadeUp index={0}>
          <Text className="text-foreground text-onboarding-title font-serif">
            We&apos;d love to know
            <Text className="text-primary-deep font-serif-regular"> your name</Text>
          </Text>
        </FadeUp>
        <FadeUp index={1}>
          <View className="bg-card-sunk h-14 justify-center rounded-2xl px-4">
            <TextInput
              value={name ?? ''}
              onChangeText={(value) => set({ name: value })}
              placeholder="Type here"
              className="text-foreground text-xl"
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => router.push('/(onboarding)/your-age')}
            />
          </View>
        </FadeUp>
        <FadeUp index={2}>
          <Text className="text-muted-foreground text-2xl">
            We&apos;ll use it to personalise your experience
          </Text>
        </FadeUp>
      </View>
    </OnboardingScreen>
  );
}
