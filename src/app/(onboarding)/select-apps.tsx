import { FadeUp } from '@/components/ui/fade-up';
import { StepScreen } from '@/features/onboarding/components/step-screen';
import ScreenTime from '@scripture-first/screen-time';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

const AppSelectionMockImage = require('../../../assets/images/app-selection-mock.png');

async function onChooseApps() {
  const result = await ScreenTime.selectApps();

  if (result) router.navigate('/(onboarding)/blocking-schedule');
}

export default function SelectAppsView() {
  return (
    <StepScreen
      title={
        <>
          Choose which apps <Text className="text-primary-deep font-serif-regular">distract</Text>{' '}
          you the most
        </>
      }
      subtitle="Don't worry about selecting them all now, you can select more later"
      ctaLabel="Select Apps"
      onContinue={onChooseApps}
      contentClassName="gap-16"
    >
      <FadeUp index={2} className="relative w-full flex-1">
        <Image
          source={AppSelectionMockImage}
          style={{ flex: 1, width: '100%' }}
          contentFit="contain"
          contentPosition="top"
        />
        <View className="from-background via-background absolute bottom-0 left-0 h-24 w-full bg-linear-to-t to-transparent" />
      </FadeUp>
    </StepScreen>
  );
}
