import { miuMobileRoot } from '../../miu/mobile.tokens';
import { TelegramDark } from '../../miu/telegram-palette';

/** Thread screen — MIU tokens for `chat-detail.page.scss`. */
export function chatDetailPageMiuStyle(isDark: boolean): Record<string, string> {
  if (isDark) {
    return {
      ...miuMobileRoot(),
      '--pt-accent': TelegramDark.accent,
      '--pt-muted': TelegramDark.hint,
      '--pt-surface': TelegramDark.windowBg,
      '--pt-toolbar-bg': TelegramDark.windowBg,
      '--pt-detail-bg': TelegramDark.chatBg,
      '--pt-bubble-them-bg': TelegramDark.bubbleIn,
      '--pt-bubble-them-border': '#1f3d5c',
      '--pt-bubble-me-bg': TelegramDark.bubbleOut,
      '--pt-bubble-me-border': '#2d5f8a',
      '--pt-toolbar-border': TelegramDark.dividerSoft,
      '--pt-composer-border': TelegramDark.dividerSoft,
      '--pt-icon-muted': TelegramDark.iconMuted,
      '--pt-placeholder': TelegramDark.hint,
      '--pt-composer-input-bg': TelegramDark.composerField,
      '--pt-text': TelegramDark.text,
      '--pt-bubble-text': TelegramDark.text,
    };
  }
  return {
    ...miuMobileRoot(),
    '--pt-accent': '#4a90e2',
    '--pt-muted': '#8e8e93',
    '--pt-surface': '#ffffff',
    '--pt-toolbar-bg': '#ececee',
    '--pt-detail-bg': '#f3f3f3',
    '--pt-bubble-them-bg': '#ffffff',
    '--pt-bubble-them-border': 'rgba(0, 0, 0, 0.12)',
    '--pt-bubble-me-bg': '#f7fbff',
    '--pt-bubble-me-border': '#c5dcf5',
    '--pt-toolbar-border': 'rgba(0, 0, 0, 0.08)',
    '--pt-composer-border': 'rgba(0, 0, 0, 0.06)',
    '--pt-icon-muted': '#3c3c43',
    '--pt-placeholder': '#aeaeb2',
    '--pt-composer-input-bg': '#ececee',
    '--pt-text': '#000000',
    '--pt-bubble-text': '#000000',
  };
}
