import { miuMobileRoot } from '../../miu/mobile.tokens';
import { TelegramDark } from '../../miu/telegram-palette';

export function contactsPageMiuStyle(isDark: boolean): Record<string, string> {
  if (isDark) {
    return {
      ...miuMobileRoot(),
      '--pt-accent': TelegramDark.accent,
      '--pt-muted': TelegramDark.hint,
      '--pt-muted-strong': TelegramDark.iconMuted,
      '--pt-surface': TelegramDark.windowBg,
      '--pt-page-bg': TelegramDark.windowBg,
      '--pt-section-bg': TelegramDark.surfaceElevated,
      '--pt-section-label': TelegramDark.hint,
      '--pt-divider': TelegramDark.dividerSoft,
      '--pt-search-bg': TelegramDark.search,
      '--pt-placeholder': TelegramDark.hint,
      '--pt-text': TelegramDark.text,
      '--pt-invite-border': TelegramDark.accent,
      '--pt-avatar-placeholder': '#4a5b6f',
    };
  }
  return {
    ...miuMobileRoot(),
    '--pt-accent': '#4a90e2',
    '--pt-muted': '#6b7280',
    '--pt-muted-strong': '#8e8e93',
    '--pt-surface': '#ffffff',
    '--pt-page-bg': '#ffffff',
    '--pt-section-bg': '#f3f4f6',
    '--pt-section-label': '#6b7280',
    '--pt-divider': 'rgba(60, 60, 67, 0.12)',
    '--pt-search-bg': '#ececee',
    '--pt-placeholder': '#9ca3af',
    '--pt-text': '#000000',
    '--pt-invite-border': '#4a90e2',
    '--pt-avatar-placeholder': '#d1d5db',
  };
}
