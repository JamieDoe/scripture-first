import ScreenTime, { type AppSelectionSummary } from '@scripture-first/screen-time';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useScreenTimeAuthorization } from '../features/screen-time/hooks/useScreenTimeAuthorization';

export default function Index() {
  const { status, isRequesting, request } = useScreenTimeAuthorization();
  const [summary, setSummary] = useState<AppSelectionSummary | null>(null);
  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    setSummary(ScreenTime.getSelectionSummary());
    setBlocking(ScreenTime.isBlocking());
  }, []);

  async function onChooseApps() {
    const result = await ScreenTime.selectApps();
    if (result) setSummary(result);
  }

  function onBlock() {
    const ok = ScreenTime.startBlocking();
    setBlocking(ok);
  }

  function onUnblock() {
    ScreenTime.stopBlocking();
    setBlocking(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Text>Status: {status}</Text>
      <Button
        title={isRequesting ? 'Requesting…' : 'Request authorization'}
        disabled={isRequesting}
        onPress={request}
      />
      <Button title="Choose Apps" onPress={onChooseApps} />
      <Text>Apps: {summary?.applicationCount ?? '-'}</Text>
      <Text>Categories: {summary?.categoryCount ?? '-'}</Text>
      <Button title="Block" onPress={onBlock} />
      <Button title="Unblock" onPress={onUnblock} />
      <Text>{blocking ? 'Blocking ON' : 'Blocking OFF'}</Text>
    </View>
  );
}
