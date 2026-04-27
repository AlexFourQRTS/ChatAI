import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Brand mark: bubble + scene + wand, tuned for light messenger UI (#4A90E2 family).
 * Stateless: size/accent are the only inputs.
 */
@Component({
  selector: 'app-ai-messenger-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'presentation',
    'aria-hidden': 'true',
  },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="56" height="56" rx="14" [attr.fill]="plate()" />
      <path
        d="M14 22h34a5 5 0 0 1 5 5v16a5 5 0 0 1-5 5H26.5l-7.5 9v-9H14a5 5 0 0 1-5-5V27a5 5 0 0 1 5-5z"
        [attr.stroke]="accent()"
        stroke-width="2.2"
        stroke-linejoin="round"
        fill="#ffffff"
      />
      <path d="M19 38l7-10 6 10H19z" fill="#B9C8DA" />
      <path d="M25 38l5-7 11 7H25z" fill="#9DB0C8" />
      <circle cx="44" cy="26" r="3.5" [attr.fill]="sparkle()" />
      <line
        x1="40"
        y1="42"
        x2="52"
        y2="30"
        [attr.stroke]="accent()"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <circle cx="52" cy="29" r="2.2" fill="#ffffff" [attr.stroke]="accent()" stroke-width="1.2" />
      <path
        [attr.fill]="sparkle()"
        d="M55 23.5l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9z"
      />
      <path
        [attr.fill]="sparkle()"
        d="M47.5 21.2l.5 1.1 1.2.2-.9.8.2 1.2-1-.6-1 .6.2-1.2-.9-.8 1.2-.2.5-1.1z"
      />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      vertical-align: middle;
    }
  `,
})
export class AiMessengerIconComponent {
  readonly size = input(32);
  readonly accent = input('#4A90E2');
  /** Soft plate behind glyph (matches outgoing bubble tone). */
  readonly plate = input('#E1F0FF');
  readonly sparkle = input('#F5C76D');
}
