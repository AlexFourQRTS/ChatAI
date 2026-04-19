export interface ChatPreview {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt?: string;
}

export interface Contact {
  id: string;
  displayName: string;
  username?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  bio?: string;
}

export interface AppSettingsPayload {
  notificationsEnabled?: boolean;
  theme?: 'system' | 'light' | 'dark';
}
