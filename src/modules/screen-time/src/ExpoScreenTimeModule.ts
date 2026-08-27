import { NativeModule, requireNativeModule } from 'expo';

import { AppSelectionSummary, AuthorizationStatus } from './ExpoScreenTime.types';

declare class ExpoScreenTimeModule extends NativeModule {
  isAvailable(): boolean;
  getAuthorizationStatus(): AuthorizationStatus;
  requestAuthorization(): Promise<AuthorizationStatus>;
  selectApps(): Promise<AppSelectionSummary | null>;
  getSelectionSummary(): AppSelectionSummary | null;
  startBlocking(): boolean;
  stopBlocking(): void;
  isBlocking(): boolean;
}

export default requireNativeModule<ExpoScreenTimeModule>('ExpoScreenTime');
