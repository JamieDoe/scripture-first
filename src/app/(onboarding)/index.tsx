import { Screen } from '@/components/layout/screen';
import { Button } from '@/components/ui/button';
import Emblem from '@/components/ui/emblem.svg';
import { router } from 'expo-router';

export default function OnboardingView() {
  return (
    <Screen className="items-center justify-between">
      <Emblem width={264} height={160} />

      <Button
        title="Begin"
        className="w-full"
        size="lg"
        onPress={() => router.navigate('/(dev)/componenets')}
      />
    </Screen>
  );
}
