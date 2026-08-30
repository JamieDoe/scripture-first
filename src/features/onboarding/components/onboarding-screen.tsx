import { cn } from '@/utils/cn';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

const DAWN_GRADIENT = {
  colors: ['#f8d3a6', '#faead6', '#f6f2ea'] as const,
  locations: [0, 0.45, 0.8] as const,
};

type OnboardingScreenProps = {
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  gradient?: boolean;
  contentClassName?: string;
  edges?: Edge[];
};

export function OnboardingScreen({
  title,
  children,
  footer,
  gradient = false,
  contentClassName,
  edges = ['top', 'bottom'],
}: Readonly<OnboardingScreenProps>) {
  return (
    <View style={{ flex: 1 }} className={cn('px-5', !gradient && 'bg-background')}>
      {gradient && (
        <LinearGradient
          colors={DAWN_GRADIENT.colors}
          locations={DAWN_GRADIENT.locations}
          style={StyleSheet.absoluteFill}
        />
      )}

      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        <View className={cn('flex-1 gap-6 pt-6', contentClassName)}>
          {title ? <Text className="text-foreground text-4xl">{title}</Text> : null}
          {children}
        </View>

        {footer ? <View>{footer}</View> : null}
      </SafeAreaView>
    </View>
  );
}
