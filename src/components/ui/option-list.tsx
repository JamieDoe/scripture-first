import { FadeUp } from '@/components/ui/fade-up';
import { cn } from '@/utils/cn';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, View } from 'react-native';

type Option<T extends string> = {
  value: T;
  label: string;
  subLabel?: string;
  icon?: string;
};

type OptionListProps<T extends string> = {
  options: readonly Option<T>[];
  value?: T;
  onSelect: (value: T) => void;
};

export function OptionList<T extends string>({
  options,
  value,
  onSelect,
}: Readonly<OptionListProps<T>>) {
  return (
    <View className="gap-3" accessibilityRole="radiogroup">
      {options.map((option, i) => {
        const selected = value === option.value;
        return (
          <FadeUp key={option.value} index={2 + i}>
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={
                option.subLabel ? `${option.label}, ${option.subLabel}` : option.label
              }
              onPress={() => {
                Haptics.selectionAsync();
                onSelect(option.value);
              }}
              className={cn(
                'bg-card flex-row items-center rounded-2xl border p-5 shadow-sm',
                selected
                  ? 'border-primary from-primary-light/15 via-primary/15 to-primary-deep/15 bg-linear-to-b shadow-md'
                  : 'border-border',
              )}
            >
              {option.icon && <Text className="mr-3 text-xl">{option.icon}</Text>}
              <View className="flex-1 flex-col gap-1">
                <Text className="text-foreground text-base font-medium">{option.label}</Text>
                {option.subLabel ? (
                  <Text className="text-muted-foreground text-sm">{option.subLabel}</Text>
                ) : null}
              </View>

              <View
                className={cn(
                  'border-border h-6 w-6 items-center justify-center rounded-full border',
                  selected &&
                    'from-primary-light via-primary to-primary-deep border-transparent bg-linear-to-b',
                )}
              >
                {selected && <Text className="text-primary-foreground text-xs">✓</Text>}
              </View>
            </Pressable>
          </FadeUp>
        );
      })}
    </View>
  );
}
