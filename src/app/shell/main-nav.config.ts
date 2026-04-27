/** Пункты нижнего navbar (корневые пути приложения). */
export interface MainNavItem {
  readonly routerLink: string;
  /** Подсветка, если URL равен или начинается с префикса (для `/chats/thread/:id`). */
  readonly activeUrlPrefix: string;
  readonly label: string;
  readonly icon: string;
}

export const MAIN_NAV: readonly MainNavItem[] = [
  {
    routerLink: '/chats',
    activeUrlPrefix: '/chats',
    label: 'Chats',
    icon: 'chatbubbles-outline',
  },
  {
    routerLink: '/contacts',
    activeUrlPrefix: '/contacts',
    label: 'Contacts',
    icon: 'people-outline',
  },
  {
    routerLink: '/settings',
    activeUrlPrefix: '/settings',
    label: 'Settings',
    icon: 'settings-outline',
  },
  {
    routerLink: '/lab',
    activeUrlPrefix: '/lab',
    label: 'Песочница',
    icon: 'flask-outline',
  },
];
