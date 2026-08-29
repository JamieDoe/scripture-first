import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text, View } from 'react-native';

export default function ComponenetsView() {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-5">
      <Button title="Primary" />
      <Card className="w-full">
        <Text>Test</Text>
      </Card>
      <Card className="w-full" variant="elevated">
        <Text>Test</Text>
      </Card>
    </View>
  );
}
