import { cn } from '@/utils/cn';
import { View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

type ScreenProps = ViewProps & {
  className?: string;
  edges?: Edge[];
};

export function Screen({ className, edges = ['top', 'bottom'], children, ...rest }: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={{ flex: 1 }} className="bg-background" {...rest}>
      <View className={cn('flex-1 px-5', className)}>{children}</View>
    </SafeAreaView>
  );
}
