import { inject } from '@angular/core';
import { type CanActivateFn, type CanMatchFn, Router } from '@angular/router';
import { OnboardingService } from './onboarding.service';

/** Main app routes only after onboarding is completed. */
export const onboardingCompleteCanMatch: CanMatchFn = () => {
  return inject(OnboardingService).completed();
};

/** Completed users should not stay on `/onboarding`. */
export const onboardingIncompleteOnlyCanActivate: CanActivateFn = () => {
  const onboarding = inject(OnboardingService);
  const router = inject(Router);
  if (onboarding.completed()) {
    return router.parseUrl('/chats');
  }
  return true;
};
