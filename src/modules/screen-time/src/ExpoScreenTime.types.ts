export type AuthorizationStatus =
  'notDetermined' | 'denied' | 'approved' | 'unsupported' | 'unknown';

export type AppSelectionSummary = { applicationCount: number; categoryCount: number };
