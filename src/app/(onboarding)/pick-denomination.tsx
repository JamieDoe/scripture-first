import { OptionList } from '@/components/ui/option-list';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import { DENOMINATION_OPTIONS } from '@/features/onboarding/data/denominations';
import { useOnboarding } from '@/features/onboarding/stores/onboarding.store';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function DenominationView() {
  const { denomination, set } = useOnboarding((state) => state);

  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const viewportHeight = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    contentHeight.value = event.contentSize.height;
    viewportHeight.value = event.layoutMeasurement.height;
  });

  const topFadeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 16], [0, 1], Extrapolation.CLAMP),
  }));

  const bottomFadeStyle = useAnimatedStyle(() => {
    const maxScroll = Math.max(0, contentHeight.value - viewportHeight.value);

    return {
      opacity: interpolate(maxScroll - scrollY.value, [0, 16], [0, 1], Extrapolation.CLAMP),
    };
  });

  return (
    <StepScreen
      title={
        <>
          Which <Text className="text-primary-deep font-serif-regular">tradition</Text> do you
          follow?
        </>
      }
      subtitle="We'll tailor Scripture to your preference"
      ctaDisabled={!denomination}
      onContinue={() => router.push('/(onboarding)/bible-experience')}
    >
      <View className="relative flex-1">
        <Animated.ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onLayout={(event) => {
            viewportHeight.value = event.nativeEvent.layout.height;
          }}
          onContentSizeChange={(_width, height) => {
            contentHeight.value = height;
          }}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <OptionList
            options={DENOMINATION_OPTIONS}
            value={denomination}
            onSelect={(value) => set({ denomination: value })}
          />
        </Animated.ScrollView>

        <Animated.View pointerEvents="none" style={[styles.fadeTop, topFadeStyle]}>
          <View className="from-background h-full w-full bg-linear-to-b to-transparent" />
        </Animated.View>
        <Animated.View pointerEvents="none" style={[styles.fadeBottom, bottomFadeStyle]}>
          <View className="from-background h-full w-full bg-linear-to-t to-transparent" />
        </Animated.View>
      </View>
    </StepScreen>
  );
}

const styles = StyleSheet.create({
  fadeTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 96, zIndex: 10 },
  fadeBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 96, zIndex: 10 },
});
