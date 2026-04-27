/**
 * PicTalk MIU — mobile phone shell defaults (no tablet/desktop layouts).
 * Import into each `*.style.ts` and spread into the component token map.
 */
export function miuMobileRoot(): Record<string, string> {
  return {
    '--pt-touch-min': '44px',
    '--pt-page-pad': '16px',
    '--pt-content-max': '100%',
  };
}
