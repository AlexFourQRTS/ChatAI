import type { Route } from '@angular/router';

/**
 * «Чаты»: список и диалог — соседние дочерние маршруты shell (`/chats`, `/chats/thread/:id`), один
 * `ion-router-outlet` на корневом layout (второй outlet внутрь страницы не вкладывать).
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
