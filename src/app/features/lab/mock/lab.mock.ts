/**
 * Локальные демо-данные только для лаборатории (не из `data/` приложения).
 * Скролл: https://ionicframework.com/docs/api/content
 */
export const LAB_SCROLL_DEMO_ROWS: readonly { readonly id: string; readonly title: string }[] = Array.from(
  { length: 48 },
  (_, i) => ({
    id: `lab-scroll-${i + 1}`,
    title: `Строка прокрутки ${i + 1}`,
  }),
);
