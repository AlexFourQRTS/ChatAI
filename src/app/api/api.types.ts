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
  phone?: string;
  photoUrl?: string;
}

export interface AppSettingsPayload {
  notificationsEnabled?: boolean;
  theme?: 'system' | 'light' | 'dark';
}

/** Response shape from `POST .../auth/login` (Exsample). */
export interface AuthLoginResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: unknown;
}
