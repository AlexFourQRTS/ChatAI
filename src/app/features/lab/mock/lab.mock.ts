/**
 * Local demo rows for the Lab screen (not from app `data/`).
 * Scroll: https://ionicframework.com/docs/api/content
 */
export const LAB_SCROLL_DEMO_ROWS: readonly { readonly id: string; readonly title: string }[] = Array.from(
  { length: 48 },
  (_, i) => ({
    id: `lab-scroll-${i + 1}`,
    title: `Scroll row ${i + 1}`,
  }),
);
