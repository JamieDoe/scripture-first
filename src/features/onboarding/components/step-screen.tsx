import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/ui/fade-up';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { OnboardingScreen } from './onboarding-screen';

type StepScreenProps = {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  ctaLabel?: string;
  onContinue: () => void;
  ctaDisabled?: boolean;
  contentClassName?: string;
};

export function StepScreen({
  title,
  subtitle,
  children,
  ctaLabel = 'Continue',
  onContinue,
  ctaDisabled,
  contentClassName,
}: Readonly<StepScreenProps>) {
  return (
    <OnboardingScreen
      contentClassName={contentClassName}
      footer={
        <Button
          title={ctaLabel}
          size="lg"
          className="w-full"
          disabled={ctaDisabled}
          onPress={onContinue}
        />
      }
    >
      <View className="gap-2 pt-16">
        <FadeUp index={0}>
          <Text className="text-foreground text-onboarding-title font-serif">{title}</Text>
        </FadeUp>
        {subtitle ? (
          <FadeUp index={1}>
            <Text className="text-muted-foreground text-xl">{subtitle}</Text>
          </FadeUp>
        ) : null}
      </View>

      {children}
    </OnboardingScreen>
  );
}
