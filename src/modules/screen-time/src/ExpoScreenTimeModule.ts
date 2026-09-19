import { NativeModule, requireNativeModule } from 'expo';

import { AppSelectionSummary, AuthorizationStatus } from './ExpoScreenTime.types';

declare class ExpoScreenTimeModule extends NativeModule {
  isAvailable(): boolean;
  getAuthorizationStatus(): AuthorizationStatus;
  requestAuthorization(): Promise<AuthorizationStatus>;
  /** TEMP (dev-only): revoke the Screen Time grant to re-test the flow. */
  revokeAuthorization(): Promise<AuthorizationStatus>;
  selectApps(): Promise<AppSelectionSummary | null>;
  getSelectionSummary(): AppSelectionSummary | null;
  startBlocking(): boolean;
  stopBlocking(): void;
  isBlocking(): boolean;
}

export default requireNativeModule<ExpoScreenTimeModule>('ExpoScreenTime');
