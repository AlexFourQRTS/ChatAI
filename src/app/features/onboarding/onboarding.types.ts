export const ONBOARDING_STORAGE_KEY = 'pictalk-onboarding-v1' as const;

/** Onboarding payload (local only, no API). */
export interface OnboardingState {
  readonly phone: string;
  readonly displayName: string;
  /** Data URL or null if user skipped photo. */
  readonly photoDataUrl: string | null;
  /** ISO-8601 after all steps completed. */
  readonly completedAt: string | null;
}

export const ONBOARDING_INITIAL: OnboardingState = {
  phone: '',
  displayName: '',
  photoDataUrl: null,
  completedAt: null,
};
