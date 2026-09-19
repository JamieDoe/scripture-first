import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const BASE_DELAY = 120; // 0.12s
const DELAY_STEP = 75; // 0.075s
const DURATION = 420; // 0.42s
const TRANSLATE_Y = 16; // 16px

type FadeUpProps = ViewProps & {
  index?: number;
  delay?: number;
  children: ReactNode;
};

export function FadeUp({ index = 0, delay, children, style, ...rest }: Readonly<FadeUpProps>) {
  const entryDelay = delay ?? BASE_DELAY + index * DELAY_STEP;
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    progress.value = withDelay(
      entryDelay,
      withTiming(1, { duration: DURATION, easing: Easing.out(Easing.cubic) }),
    );
  }, [entryDelay, progress, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * TRANSLATE_Y }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...rest}>
      {children}
    </Animated.View>
  );
}
