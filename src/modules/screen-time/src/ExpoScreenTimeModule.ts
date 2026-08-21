import { NativeModule, requireNativeModule } from 'expo';

import { AuthorizationStatus } from './ExpoScreenTime.types';

declare class ExpoScreenTimeModule extends NativeModule {
  isAvailable(): boolean;
  getAuthorizationStatus(): AuthorizationStatus;
  requestAuthorization(): Promise<AuthorizationStatus>;
}

export default requireNativeModule<ExpoScreenTimeModule>('ExpoScreenTime');
