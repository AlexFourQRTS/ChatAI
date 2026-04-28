import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { chatTabRoutes } from '../features/chat/chat.routes';
import { DeveloperModeService } from '../core/developer-mode.service';
import { ShellPage } from './shell.page';

const developerModeCanAccessLab = () => inject(DeveloperModeService).enabled();

/** Root layout: bottom navbar + main screens (`/chats`, `/contacts`, …). */
export const routes: Routes = [
  {
    path: '',
    component: ShellPage,
    children: [
      ...chatTabRoutes,
      {
        path: 'contacts',
        loadComponent: () => import('../features/contacts/contacts.page').then((m) => m.ContactsPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('../features/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'lab',
        canMatch: [developerModeCanAccessLab],
        loadComponent: () => import('../features/lab/lab.page').then((m) => m.LabPage),
      },
      {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'chats',
      },
    ],
  },
];
