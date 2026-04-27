/** Settings screen profile (view model). */
export interface SettingsProfile {
  readonly displayName: string;
  readonly phone: string;
  readonly initials: string;
  readonly avatarColor: string;
  readonly photoUrl?: string;
}

export const SETTINGS_PROFILE_MOCK: SettingsProfile = {
  displayName: '11111',
  phone: '+1 (111) 111-11-11',
  initials: '11',
  avatarColor: '#4a90e2',
};
