import Emblem from '@/components/ui/emblem.svg';
import { Button, View } from 'react-native';

export default function OnboardingView() {
  console.log('Hello Onboarding 🚀');
  return (
    <View className="flex-1 items-center justify-center ">
      <Emblem width={264} height={160} />

      <Button title="hello" />
    </View>
  );
}
