/**
 * MIU: design tokens live in `*.style.ts`; this bridges them to an inline `style`
 * string for `@HostBinding('style')` so Ionic / SCSS can read `var(--pt-*)`.
 */
export function miuHostStyle(vars: Record<string, string | number>): string {
  return Object.entries(vars)
    .map(([key, value]) => {
      const v = typeof value === 'number' ? `${value}px` : value;
      return `${key}:${v}`;
    })
    .join(';');
}
