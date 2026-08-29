import { Button } from '@/components/ui/button';
import Emblem from '@/components/ui/emblem.svg';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function OnboardingView() {
  console.log('Hello Onboarding 🚀');

  return (
    <View className="flex-1 items-center justify-center">
      <Emblem width={264} height={160} />
      <Button
        title="Primary"
        subTitle="3 selected"
        onPress={() => router.navigate('/(dev)/componenets')}
      />
      <Button title="Secondary" variant="secondary" subTitle="3 selected" />
      <Button title="Outline" variant="ghost" subTitle="3 selected" />
      <Button title="Text" variant="text" />
    </View>
  );
}
