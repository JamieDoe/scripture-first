import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, type PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type BaseProps = PressableProps & {
  title: string;
  className?: string;
  haptic?: Haptics.ImpactFeedbackStyle | null;
  size?: VariantProps<typeof buttonVariants>['size'];
};

type Props =
  | (BaseProps & {
      variant?: 'primary' | 'secondary' | 'ghost';
      subTitle?: string;
    })
  | (BaseProps & {
      variant: 'text';
      subTitle?: never;
    });

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const buttonVariants = cva('flex flex-row gap-2 rounded-full items-center justify-center', {
  variants: {
    variant: {
      primary:
        'bg-gradient-to-b from-primary-light via-primary to-primary-deep shadow-btn-primary active:from-[#C08F32] active:via-primary-deep active:to-[#A2761F]',
      secondary: 'bg-primary/15 active:bg-primary/20 ',
      ghost: 'bg-transparent active:bg-foreground/3',
      text: 'bg-transparent',
    },
    size: { lg: 'h-14 px-6', md: 'h-12 px-4', sm: 'h-11 px-4' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

const titleVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-primary-foreground',
      secondary: 'text-primary-text-strong',
      ghost: 'text-muted-foreground',
      text: 'text-primary-text active:text-foreground',
    },
    size: { lg: 'text-lg', md: 'text-base', sm: 'text-sm' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

const subTitleVariants = cva('font-normal', {
  variants: {
    variant: {
      primary: 'text-primary-foreground/65',
      secondary: 'text-primary-text-strong/65',
      ghost: 'text-muted-foreground/65',
    },
    size: { lg: 'text-base', md: 'text-sm', sm: 'text-xs' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

export function Button({
  title,
  subTitle,
  variant,
  size,
  disabled,
  className,
  haptic = Haptics.ImpactFeedbackStyle.Light,
  onPress,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn(buttonVariants({ variant, size }), disabled && 'opacity-40', className)}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
      onPress={(evt) => {
        if (haptic) Haptics.impactAsync(haptic);
        onPress?.(evt);
      }}
      {...rest}
    >
      <Text className={titleVariants({ variant, size })}>{title}</Text>
      {subTitle && <Text className={subTitleVariants({ variant, size })}>{subTitle}</Text>}
    </AnimatedPressable>
  );
}
