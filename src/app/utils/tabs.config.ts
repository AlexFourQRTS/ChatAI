export interface MainTabConfig {
  tab: string;
  href: string;
  label: string;
  icon: string;
}

export const MAIN_TABS: readonly MainTabConfig[] = [
  { tab: 'chats', href: '/tabs/chats', label: 'Chats', icon: 'chatbubbles-outline' },
  { tab: 'contacts', href: '/tabs/contacts', label: 'Contacts', icon: 'people-outline' },
  { tab: 'settings', href: '/tabs/settings', label: 'Settings', icon: 'settings-outline' },
  { tab: 'profile', href: '/tabs/profile', label: 'Profile', icon: 'person-circle-outline' },
];
