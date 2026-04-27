import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadComponent: () => import('../pages/chats/chats-shell.page').then((m) => m.ChatsShellPage),
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/chats/chats.page').then((m) => m.ChatsPage),
          },
          {
            path: 'thread/:id',
            loadComponent: () => import('../pages/chats/chat-detail.page').then((m) => m.ChatDetailPage),
          },
        ],
      },
      {
        path: 'contacts',
        loadComponent: () => import('../pages/contacts/contacts.page').then((m) => m.ContactsPage),
      },
      {
        path: 'settings',
        loadComponent: () => import('../pages/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/chats',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/chats',
    pathMatch: 'full',
  },
];
