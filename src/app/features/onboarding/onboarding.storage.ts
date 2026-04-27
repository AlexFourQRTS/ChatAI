import type { OnboardingState } from './onboarding.types';
import { ONBOARDING_INITIAL, ONBOARDING_STORAGE_KEY } from './onboarding.types';

export function loadOnboardingState(): OnboardingState {
  if (typeof localStorage === 'undefined') {
    return ONBOARDING_INITIAL;
  }
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw?.trim()) {
      return ONBOARDING_INITIAL;
    }
    const o = JSON.parse(raw) as unknown;
    if (!o || typeof o !== 'object') {
      return ONBOARDING_INITIAL;
    }
    const r = o as Record<string, unknown>;
    return {
      phone: typeof r['phone'] === 'string' ? r['phone'] : '',
      displayName: typeof r['displayName'] === 'string' ? r['displayName'] : '',
      photoDataUrl: typeof r['photoDataUrl'] === 'string' ? r['photoDataUrl'] : null,
      completedAt: typeof r['completedAt'] === 'string' ? r['completedAt'] : null,
    };
  } catch {
    return ONBOARDING_INITIAL;
  }
}

export function saveOnboardingState(state: OnboardingState): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* квота */
  }
}
