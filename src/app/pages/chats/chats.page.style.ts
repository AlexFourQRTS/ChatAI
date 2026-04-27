import { miuMobileRoot } from '../../miu/mobile.tokens';
import { TelegramDark } from '../../miu/telegram-palette';

/** PicTalk inbox — MIU tokens for `chats.page.scss` (`var(--pt-*)`). */
export function chatsPageMiuStyle(isDark: boolean): Record<string, string> {
  if (isDark) {
    return {
      ...miuMobileRoot(),
      '--pt-accent': TelegramDark.accent,
      '--pt-muted': TelegramDark.hint,
      '--pt-surface': TelegramDark.windowBg,
      '--pt-page-bg': TelegramDark.windowBg,
      '--pt-divider': TelegramDark.dividerSoft,
      '--pt-search-bg': TelegramDark.search,
      '--pt-placeholder': TelegramDark.hint,
      '--pt-text': TelegramDark.text,
    };
  }
  return {
    ...miuMobileRoot(),
    '--pt-accent': '#4a90e2',
    '--pt-muted': '#8e8e93',
    '--pt-surface': '#ffffff',
    '--pt-page-bg': '#f7f7f8',
    '--pt-divider': 'rgba(60, 60, 67, 0.12)',
    '--pt-search-bg': '#ececee',
    '--pt-placeholder': '#aeaeb2',
    '--pt-text': '#000000',
  };
}
