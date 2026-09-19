import { cn } from '@/utils/cn';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

const TICK_SPACING = 14; // px between ticks
const MAJOR_EVERY = 5; // taller, labelled tick every N values
const LABEL_WIDTH = 40; // labels overflow their tick column so they never wrap
const FALLOFF = TICK_SPACING * 6; // distance over which the depth effect tapers off

type RulerPickerProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

/**
 * A horizontal tick ruler you drag to pick a whole number. Snaps to each tick,
 * fires a selection haptic as the value changes, and marks the current value
 * with a fixed centre line. Ticks fade out toward the edges, and the
 * edges fade into the page background.
 */
export function RulerPicker({ min, max, value, onChange }: Readonly<RulerPickerProps>) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const initial = useRef(value);
  const [width, setWidth] = useState(0);

  const scrollX = useSharedValue((value - min) * TICK_SPACING);
  const index = useSharedValue(value - min);

  const ticks = useMemo(() => Array.from({ length: max - min + 1 }, (_, i) => min + i), [min, max]);

  const commit = useCallback(
    (next: number) => {
      Haptics.selectionAsync();
      onChange(next);
    },
    [onChange],
  );

  // Scroll position drives the depth effect on the UI thread; only a changed
  // value hops back to JS for the haptic and the store write.
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;

    const next = Math.min(Math.max(Math.round(event.contentOffset.x / TICK_SPACING), 0), max - min);

    if (next !== index.value) {
      index.value = next;
      runOnJS(commit)(min + next);
    }
  });

  // Centre the starting value once we know how wide the track is.
  useEffect(() => {
    if (!width) return;
    scrollRef.current?.scrollTo({ x: (initial.current - min) * TICK_SPACING, animated: false });
  }, [width, min, scrollRef]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  return (
    <View className="w-full" onLayout={onLayout}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={TICK_SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingHorizontal: width ? width / 2 - TICK_SPACING / 2 : 0,
        }}
      >
        {ticks.map((tick, i) => (
          <Tick key={tick} offset={i * TICK_SPACING} value={tick} scrollX={scrollX} />
        ))}
      </Animated.ScrollView>

      {/* Dissolve the ticks into the page at both edges instead of clipping them. */}
      <View
        pointerEvents="none"
        className="from-background absolute top-0 bottom-0 left-0 w-20 bg-linear-to-r to-transparent"
      />
      <View
        pointerEvents="none"
        className="from-background absolute top-0 right-0 bottom-0 w-20 bg-linear-to-l to-transparent"
      />

      <View pointerEvents="none" className="absolute inset-0 items-center">
        <View className="bg-primary h-12 w-1 rounded-full" />
      </View>
    </View>
  );
}

type TickProps = {
  offset: number;
  value: number;
  scrollX: SharedValue<number>;
};

function Tick({ offset, value, scrollX }: Readonly<TickProps>) {
  const major = value % MAJOR_EVERY === 0;

  const style = useAnimatedStyle(() => {
    const distance = Math.abs(offset - scrollX.value);

    return {
      opacity: interpolate(distance, [0, FALLOFF], [1, 0.3], Extrapolation.CLAMP),
    };
  });

  return (
    <View style={{ width: TICK_SPACING }} className="items-center">
      <View className="h-12 justify-center">
        <Animated.View
          style={style}
          className={cn(
            'rounded-full',
            major ? 'bg-primary/50 h-7 w-0.5' : 'bg-border-strong h-5 w-px',
          )}
        />
      </View>
      {major ? (
        <Text
          numberOfLines={1}
          style={{ width: LABEL_WIDTH, marginHorizontal: (TICK_SPACING - LABEL_WIDTH) / 2 }}
          className="text-muted-foreground pt-1 text-center text-xs"
        >
          {value}
        </Text>
      ) : null}
    </View>
  );
}
