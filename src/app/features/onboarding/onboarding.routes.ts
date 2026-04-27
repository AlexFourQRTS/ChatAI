import { Routes } from '@angular/router';
import { onboardingIncompleteOnlyCanActivate } from './onboarding.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [onboardingIncompleteOnlyCanActivate],
    loadComponent: () => import('./onboarding.page').then((m) => m.OnboardingPage),
  },
];
