import { NativeModule, registerWebModule } from 'expo';

import { AppSelectionSummary, AuthorizationStatus } from './ExpoScreenTime.types';

// Screen Time / FamilyControls is iOS-only. On web every call is a no-op that
// reports the feature as unavailable, kept in sync with the native surface.
class ExpoScreenTimeModule extends NativeModule {
  isAvailable(): boolean {
    return false;
  }

  getAuthorizationStatus(): AuthorizationStatus {
    return 'unsupported';
  }

  async requestAuthorization(): Promise<AuthorizationStatus> {
    return 'unsupported';
  }

  async selectApps(): Promise<AppSelectionSummary | null> {
    return null;
  }

  getSelectionSummary(): AppSelectionSummary | null {
    return null;
  }

  startBlocking(): boolean {
    return false;
  }

  stopBlocking(): void {}

  isBlocking(): boolean {
    return false;
  }
}

export default registerWebModule(ExpoScreenTimeModule, 'ExpoScreenTimeModule');
