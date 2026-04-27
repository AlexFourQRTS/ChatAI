import { Routes } from '@angular/router';
import { chatTabRoutes } from '../features/chat/chat.routes';
import { ShellPage } from './shell.page';

/**
 * Корневой layout: нижний navbar + дочерние экраны (`/chats`, `/contacts`, …).
 */
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
        loadComponent: () => import('../features/lab/lab.page').then((m) => m.LabPage),
      },
      {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full',
      },
    ],
  },
];
