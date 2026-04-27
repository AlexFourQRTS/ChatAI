import type { Route } from '@angular/router';

/**
 * Chats: list + thread as sibling child routes (`/chats`, `/chats/thread/:id`) under the root shell
 * `ion-router-outlet` (do not nest a second outlet inside a page).
 */
export const chatTabRoutes: Route[] = [
  {
    path: 'chats/thread/:id',
    loadComponent: () => import('../dialog/chat-detail.page').then((m) => m.ChatDetailPage),
  },
  {
    path: 'chats',
    loadComponent: () => import('./chats.page').then((m) => m.ChatsPage),
  },
];
