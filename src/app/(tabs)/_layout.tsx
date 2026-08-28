import { Icon } from 'expo-router';
import { NativeTabs } from 'expo-router/build/native-tabs';
import { Label } from 'expo-router/build/react-navigation';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf={'house.fill'} drawable="ic_home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="read">
        <Label>Read</Label>
        <Icon sf={'book.pages'} drawable="ic_home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
