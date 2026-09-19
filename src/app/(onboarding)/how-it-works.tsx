import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import { OnboardingScreen } from '@/features/onboarding/components/onboarding-screen';
import { HOW_IT_WORKS_STEPS, HowItWorksStep } from '@/features/onboarding/data/how-it-works';

export default function HowItWorksView() {
  return (
    <OnboardingScreen
      contentClassName="justify-between"
      footer={
        <Button
          title="Get Started"
          size="lg"
          className="w-full"
          onPress={() => router.push('/(onboarding)/your-name')}
        />
      }
    >
      <View className="flex gap-7 pt-20">
        <FadeUp index={0}>
          <Text className="text-foreground text-onboarding-title font-serif">
            Put <Text className="text-primary-deep font-serif-regular">God first</Text> with
            Scripture First
          </Text>
        </FadeUp>
        <FadeUp index={1}>
          <Text className="text-muted-foreground text-2xl">
            before apps, read a <Text className="text-primary-deep">verse</Text>
            ...
          </Text>
        </FadeUp>

        <View className="flex gap-7 pt-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <FadeUp key={index + step.icon} index={2 + index}>
              <Step icon={step.icon} text={step.text} />
            </FadeUp>
          ))}
        </View>
      </View>
    </OnboardingScreen>
  );
}

function Step({ icon, text }: Omit<HowItWorksStep, 'id'>) {
  return (
    <View className="flex-row items-center gap-4">
      <Text className="text-[64px] leading-17">{icon}</Text>
      <Text className="text-muted-foreground text-2xl">{text}</Text>
    </View>
  );
}
