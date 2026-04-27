import { Routes } from '@angular/router';
import { onboardingCompleteCanMatch } from './features/onboarding/onboarding.guard';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./features/welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./features/onboarding/onboarding.routes').then((m) => m.routes),
  },
  {
    path: '',
    canMatch: [onboardingCompleteCanMatch],
    loadChildren: () => import('./shell/shell.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
