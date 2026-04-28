/** Bottom navbar items (app root paths). */
export interface MainNavItem {
  readonly routerLink: string;
  /** Active when URL equals or starts with this prefix (e.g. `/chats/thread/:id`). */
  readonly activeUrlPrefix: string;
  readonly label: string;
  readonly icon: string;
  readonly requiresDeveloperMode?: boolean;
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
    label: 'Lab',
    icon: 'flask-outline',
    requiresDeveloperMode: true,
  },
];
