import { cn } from '@/utils/cn';
import { View } from 'react-native';

export function Seperator({ className }: Readonly<{ className?: string }>) {
  return <View className={cn('bg-primary/55 h-px w-11', className)} />;
}
