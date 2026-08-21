import ScreenTime, { type AuthorizationStatus } from '@scripture-first/screen-time';
import { useCallback, useEffect, useState } from 'react';

export function useScreenTimeAuthorization() {
  const [status, setStatus] = useState<AuthorizationStatus>('notDetermined');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    setStatus(ScreenTime.isAvailable() ? ScreenTime.getAuthorizationStatus() : 'unsupported');
  }, []);

  const request = useCallback(async () => {
    setIsRequesting(true);
    try {
      const next = await ScreenTime.requestAuthorization();
      setStatus(next);
      return next;
    } catch {
      const current = ScreenTime.getAuthorizationStatus();
      setStatus(current);
      return current;
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return { status, isRequesting, isAuthorized: status === 'approved', request };
}
