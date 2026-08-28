import { useOnboarding } from '@/stores/onboarding.store';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  const hasOnboarded = useOnboarding((state) => state.hasOnboarded);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!hasOnboarded}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Protected guard={hasOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
