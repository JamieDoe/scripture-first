import { Stack } from 'expo-router';
import { useCSSVariable } from 'uniwind';

export default function OnboardingLayout() {
  const headerTintColor = useCSSVariable('--color-primary-text') as string | undefined;

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor,
        contentStyle: { flex: 1, backgroundColor: 'transparent' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
