const WELCOME_ACCEPTED_KEY = 'pictalk-welcome-accepted-v1' as const;

export function hasAcceptedWelcome(): boolean {
  if (typeof localStorage === 'undefined') {
    return false;
  }
  return localStorage.getItem(WELCOME_ACCEPTED_KEY) === '1';
}

export function acceptWelcome(): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(WELCOME_ACCEPTED_KEY, '1');
}
