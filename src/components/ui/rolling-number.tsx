import { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DURATION = 380;
const DEFAULT_DIGIT_HEIGHT = 80;
const FADE_RATIO = 0.22; // share of the window that fades at each edge

type RollingNumberProps = {
  value: number;
  className?: string;
  /** Height of each digit window — should suit the font size in `className`. */
  digitHeight?: number;
};

/**
 * An odometer-style number: every digit is its own 0–9 strip that rolls to the
 * right value, so digits move independently. Each strip is masked with a fade
 * at the top and bottom so digits dissolve in and out rather than hard-clip.
 */
export function RollingNumber({
  value,
  className,
  digitHeight = DEFAULT_DIGIT_HEIGHT,
}: Readonly<RollingNumberProps>) {
  const characters = useMemo(() => String(value).split(''), [value]);

  return (
    <View className="flex-row">
      {characters.map((char, i) => {
        const digit = Number(char);

        // Separators (commas, currency symbols) don't roll.
        if (Number.isNaN(digit)) {
          return (
            <Text
              key={`${i}-${char}`}
              className={className}
              style={{ height: digitHeight, lineHeight: digitHeight }}
            >
              {char}
            </Text>
          );
        }

        return <Digit key={i} digit={digit} height={digitHeight} className={className} />;
      })}
    </View>
  );
}

type DigitProps = {
  digit: number;
  height: number;
  className?: string;
};

function Digit({ digit, height, className }: Readonly<DigitProps>) {
  const reduceMotion = useReducedMotion();
  const offset = useSharedValue(-digit * height);

  useEffect(() => {
    const target = -digit * height;

    offset.value = reduceMotion
      ? target
      : withTiming(target, { duration: DURATION, easing: Easing.out(Easing.cubic) });
  }, [digit, height, offset, reduceMotion]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));

  const fadeHeight = Math.round(height * FADE_RATIO);

  return (
    <View style={{ height, overflow: 'hidden' }}>
      <Animated.View style={style}>
        {DIGITS.map((n) => (
          <Text
            key={n}
            className={className}
            style={{
              height,
              lineHeight: height,
              textAlign: 'center',
              fontVariant: ['tabular-nums'],
            }}
          >
            {n}
          </Text>
        ))}
      </Animated.View>

      <View
        pointerEvents="none"
        style={{ height: fadeHeight }}
        className="from-background absolute top-0 right-0 left-0 bg-linear-to-b to-transparent"
      />
      <View
        pointerEvents="none"
        style={{ height: fadeHeight }}
        className="from-background absolute right-0 bottom-0 left-0 bg-linear-to-t to-transparent"
      />
    </View>
  );
}
