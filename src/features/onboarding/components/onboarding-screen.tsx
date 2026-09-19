import { FadeUp } from '@/components/ui/fade-up';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

type OnboardingScreenProps = {
  children?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  edges?: Edge[];
};

export function OnboardingScreen({
  children,
  footer,
  contentClassName,
  edges = ['top', 'bottom'],
}: Readonly<OnboardingScreenProps>) {
  return (
    <View style={{ flex: 1 }} className={'bg-background px-5'}>
      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        <View className={cn('flex-1 gap-6 pt-6', contentClassName)}>{children}</View>
        {footer ? (
          <FadeUp index={3}>
            <View>{footer}</View>
          </FadeUp>
        ) : null}
      </SafeAreaView>
    </View>
  );
}
