import { Button, Text, View } from 'react-native';
import { useScreenTimeAuthorization } from '../features/screen-time/hooks/useScreenTimeAuthorization';

export default function Index() {
  const { status, isRequesting, request } = useScreenTimeAuthorization();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Text>Status: {status}</Text>
      <Button
        title={isRequesting ? 'Requesting…' : 'Request authorization'}
        disabled={isRequesting}
        onPress={request}
      />
    </View>
  );
}
