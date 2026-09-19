import { cn } from '@/utils/cn';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, View } from 'react-native';

type Segment<T extends string | number> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string | number> = {
  options: readonly Segment<T>[];
  value: T;
  onSelect: (value: T) => void;
};

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onSelect,
}: Readonly<SegmentedControlProps<T>>) {
  return (
    <View className="bg-card-sunk flex-row rounded-full p-1.5" accessibilityRole="radiogroup">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={option.label}
            onPress={() => {
              Haptics.selectionAsync();
              onSelect(option.value);
            }}
            className={cn(
              'min-h-11 flex-1 items-center justify-center rounded-full py-3',
              selected && 'bg-card shadow-sm',
            )}
          >
            <Text
              className={cn(
                'text-base font-semibold',
                selected ? 'text-primary-text' : 'text-muted-foreground',
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
