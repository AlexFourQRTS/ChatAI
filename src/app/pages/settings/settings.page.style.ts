import { miuMobileRoot } from '../../miu/mobile.tokens';
import { TelegramDark } from '../../miu/telegram-palette';

export function settingsPageMiuStyle(isDark: boolean): Record<string, string> {
  if (isDark) {
    return {
      ...miuMobileRoot(),
      '--pt-accent': TelegramDark.accent,
      '--pt-muted': TelegramDark.hint,
      '--pt-muted-label': TelegramDark.hint,
      '--pt-page-bg': TelegramDark.windowBg,
      '--pt-surface': TelegramDark.windowBg,
      '--pt-text': TelegramDark.text,
      '--pt-header-border': TelegramDark.dividerSoft,
      '--pt-avatar-ring': 'rgba(0, 0, 0, 0.35)',
    };
  }
  return {
    ...miuMobileRoot(),
    '--pt-accent': 'var(--ion-color-primary, #4a90e2)',
    '--pt-muted': 'var(--ion-color-medium, #8e8e93)',
    '--pt-muted-label': 'var(--ion-color-medium, #8e8e93)',
    '--pt-page-bg': 'var(--ion-background-color, #f7f7f8)',
    '--pt-surface': 'var(--ion-background-color, #ffffff)',
    '--pt-text': 'var(--ion-text-color, #000000)',
    '--pt-header-border': 'var(--ion-border-color, rgba(60, 60, 67, 0.12))',
    '--pt-avatar-ring': 'rgba(255, 255, 255, 0.95)',
  };
}
