/**
 * Песочница: только публичные API и документация — без импортов из `data/`, `api/`, репозиториев.
 *
 * Ссылки (эталон для копирования паттернов в проект):
 * - Ionic Angular standalone + `provideIonicAngular`: https://ionicframework.com/docs/angular/build-options#usage-with-standalone-based-applications
 * - Ionic Toast (опции / контроллер): https://ionicframework.com/docs/api/toast
 * - Angular `HttpClient`, настройка: https://angular.dev/guide/http/setup
 * - Angular запросы GET / Observable: https://angular.dev/guide/http/making-requests
 * - RxJS `firstValueFrom`: https://rxjs.dev/api/index/function/firstValueFrom
 * - Fetch (браузер, без Angular Http): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 *
 * Важно: `HttpClient` в этом репозитории настраивается в `main.ts` с глобальными интерсепторами.
 * Они не импортируются отсюда, но запросы из лаборатории через `HttpClient` их проходят.
 * См. исключения по контексту: https://angular.dev/guide/http/interceptors
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { ClearStuckIonPageHostDirective } from '../../core/clear-stuck-ion-page-host.directive';
import {
  LAB_JOURNAL_MAX_ENTRIES,
  type LabJournalEntry,
  type LabJournalOutcome,
  loadLabJournal,
  newLabJournalId,
  saveLabJournal,
} from './lab-journal';
import { LAB_SCROLL_DEMO_ROWS } from './mock/lab.mock';

const LAB = '[Lab]' as const;

/** Публичный демо-эндпоинт (CORS), без привязки к бэкенду приложения. */
const JSON_PLACEHOLDER_POST_1 = 'https://jsonplaceholder.typicode.com/posts/1' as const;

@Component({
  selector: 'app-lab',
  standalone: true,
  hostDirectives: [ClearStuckIonPageHostDirective],
  templateUrl: './lab.page.html',
  styleUrls: ['./styles/lab.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class LabPage implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly toastCtrl = inject(ToastController);

  readonly scrollRows = LAB_SCROLL_DEMO_ROWS;

  readonly buttonTapCount = signal(0);

  readonly fetchLoading = signal(false);
  readonly fetchBody = signal('');

  readonly angularHttpLoading = signal(false);
  readonly angularHttpBody = signal('');

  /** Журнал: новые записи сверху. Хранится в `localStorage` (см. `lab-journal.ts`). */
  readonly journal = signal<readonly LabJournalEntry[]>([]);
  readonly journalTriedDraft = signal('');
  readonly journalDetailDraft = signal('');
  readonly journalOutcomeDraft = signal<LabJournalOutcome>('fail');

  ngOnInit(): void {
    this.journal.set(loadLabJournal());
    console.log(LAB, 'ngOnInit — see doc links in lab.page.ts header comment', {
      scrollRows: this.scrollRows.length,
      journalEntries: this.journal().length,
      href: typeof location !== 'undefined' ? location.href : '(no location)',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '(no navigator)',
      toastCtrl: this.toastCtrl?.constructor?.name ?? 'null',
      httpClient: this.http?.constructor?.name ?? 'null',
      note: 'App HttpClient may use global interceptors from main.ts.',
    });
  }

  ngOnDestroy(): void {
    console.log(LAB, 'ngOnDestroy', { taps: this.buttonTapCount() });
  }

  private log(...args: unknown[]): void {
    console.log(LAB, ...args);
  }

  private warn(...args: unknown[]): void {
    console.warn(LAB, ...args);
  }

  private logErr(context: string, err: unknown): void {
    console.error(LAB, context, err);
    if (err instanceof Error && err.stack) {
      console.error(LAB, context + ' stack', err.stack);
    }
  }

  private appendJournalAuto(row: { tried: string; outcome: LabJournalOutcome; detail: string }): void {
    this.appendJournal({ kind: 'auto', ...row });
  }

  private appendJournal(entry: Omit<LabJournalEntry, 'id' | 'at'>): void {
    const next: LabJournalEntry = {
      id: newLabJournalId(),
      at: new Date().toISOString(),
      ...entry,
    };
    const merged = [next, ...this.journal()].slice(0, LAB_JOURNAL_MAX_ENTRIES);
    this.journal.set(merged);
    saveLabJournal(merged);
    console.log(LAB, 'journal+', next);
  }

  onJournalTriedInput(ev: Event): void {
    this.journalTriedDraft.set((ev.target as HTMLTextAreaElement).value);
  }

  onJournalDetailInput(ev: Event): void {
    this.journalDetailDraft.set((ev.target as HTMLTextAreaElement).value);
  }

  onJournalOutcomeChange(ev: Event): void {
    const v = (ev.target as HTMLSelectElement).value as LabJournalOutcome;
    if (v === 'ok' || v === 'fail' || v === 'partial' || v === 'info') {
      this.journalOutcomeDraft.set(v);
    }
  }

  addManualJournalEntry(): void {
    const tried = this.journalTriedDraft().trim();
    const detail = this.journalDetailDraft().trim();
    if (!tried.length) {
      this.appendJournalAuto({
        tried: 'Manual journal entry',
        outcome: 'fail',
        detail: '"What you tried" is empty — not saved.',
      });
      return;
    }
    this.appendJournal({
      kind: 'manual',
      tried,
      outcome: this.journalOutcomeDraft(),
      detail: detail.length ? detail : '—',
    });
    this.journalTriedDraft.set('');
    this.journalDetailDraft.set('');
  }

  clearJournal(): void {
    this.journal.set([]);
    saveLabJournal([]);
    console.log(LAB, 'journal cleared (localStorage)');
  }

  journalOutcomeLabel(o: LabJournalOutcome): string {
    switch (o) {
      case 'ok':
        return 'OK';
      case 'fail':
        return 'Failed';
      case 'partial':
        return 'Partial';
      case 'info':
        return 'Info';
      default:
        return o;
    }
  }

  journalOutcomeClass(o: LabJournalOutcome): string {
    switch (o) {
      case 'ok':
        return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200';
      case 'fail':
        return 'bg-rose-500/15 text-rose-800 dark:text-rose-200';
      case 'partial':
        return 'bg-amber-500/15 text-amber-900 dark:text-amber-100';
      case 'info':
        return 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-200';
      default:
        return 'bg-zinc-500/15 text-zinc-700';
    }
  }

  formatJournalAt(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) {
      return iso;
    }
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  async copyJournalJson(): Promise<void> {
    const text = JSON.stringify(this.journal(), null, 2);
    try {
      await navigator.clipboard.writeText(text);
      this.appendJournalAuto({
        tried: 'Export journal',
        outcome: 'ok',
        detail: 'JSON copied to clipboard.',
      });
    } catch (e) {
      this.appendJournalAuto({
        tried: 'Export journal',
        outcome: 'fail',
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }

  async onPrimaryTap(): Promise<void> {
    const before = this.buttonTapCount();
    this.log('onPrimaryTap (Ionic ToastController + create + present)', { before });
    this.buttonTapCount.update((n) => n + 1);
    const after = this.buttonTapCount();
    this.log('count updated', { after });
    try {
      const toast = await this.toastCtrl.create({
        message: `Count: ${after}`,
        duration: 1200,
        position: 'bottom',
      });
      await toast.present();
      this.log('toast.present OK');
      this.appendJournalAuto({
        tried: 'ToastController.create + present',
        outcome: 'ok',
        detail: `Count after tap: ${after}.`,
      });
    } catch (e) {
      this.logErr('onPrimaryTap toast', e);
      this.appendJournalAuto({
        tried: 'ToastController.create + present',
        outcome: 'fail',
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }

  onSecondaryTap(): void {
    const n = this.buttonTapCount();
    this.log('onSecondaryTap (ion-button click, no toast)', { was: n });
    this.buttonTapCount.update((c) => c + 1);
    this.appendJournalAuto({
      tried: 'ion-button (click), no toast',
      outcome: 'ok',
      detail: `Count was ${n}, now ${n + 1}.`,
    });
  }

  resetButtonTaps(): void {
    const was = this.buttonTapCount();
    this.log('resetButtonTaps', { was });
    this.buttonTapCount.set(0);
    this.appendJournalAuto({
      tried: 'Reset tap counter',
      outcome: 'info',
      detail: `Was ${was}, now 0.`,
    });
  }

  onNativeProbeTap(): void {
    const n = this.buttonTapCount();
    this.log('onNativeProbeTap (native <button>, MDN UI Events)', { was: n });
    this.buttonTapCount.update((c) => c + 1000);
    this.appendJournalAuto({
      tried: 'Native <button> (+1000)',
      outcome: 'ok',
      detail: `Count was ${n}, now ${n + 1000}.`,
    });
  }

  async runFetchDemo(): Promise<void> {
    const url = JSON_PLACEHOLDER_POST_1;
    this.log('runFetchDemo start (Fetch API)', { url });
    this.fetchLoading.set(true);
    this.fetchBody.set('');
    const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
    try {
      const res = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
      const text = await res.text();
      const ms = typeof performance !== 'undefined' ? Math.round(performance.now() - t0) : -1;
      this.log('runFetchDemo response', { ok: res.ok, status: res.status, bodyLength: text.length, ms });
      if (!res.ok) {
        this.warn('non-OK', text.slice(0, 400));
        this.fetchBody.set(`HTTP ${res.status}\n${text.slice(0, 500)}`);
        this.appendJournalAuto({
          tried: 'Fetch GET jsonplaceholder /posts/1',
          outcome: 'fail',
          detail: `HTTP ${res.status}, ${ms} ms. Body (start): ${text.slice(0, 120)}`,
        });
        return;
      }
      const data = JSON.parse(text) as Record<string, unknown>;
      this.fetchBody.set(JSON.stringify(data, null, 2));
      this.log('runFetchDemo parsed', data);
      this.appendJournalAuto({
        tried: 'Fetch GET jsonplaceholder /posts/1',
        outcome: 'ok',
        detail: `HTTP ${res.status}, ${ms} ms, id=${String(data['id'] ?? '')}.`,
      });
    } catch (err: unknown) {
      this.logErr('runFetchDemo', err);
      const msg = err instanceof Error ? err.message : String(err);
      this.fetchBody.set(msg);
      this.appendJournalAuto({
        tried: 'Fetch GET jsonplaceholder /posts/1',
        outcome: 'fail',
        detail: msg,
      });
    } finally {
      this.fetchLoading.set(false);
      this.log('runFetchDemo end', { bodyLen: this.fetchBody().length });
    }
  }

  async runAngularHttpGetDemo(): Promise<void> {
    const url = JSON_PLACEHOLDER_POST_1;
    this.log('runAngularHttpGetDemo start (HttpClient.get)', { url });
    this.angularHttpLoading.set(true);
    this.angularHttpBody.set('');
    const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
    try {
      const headers = new HttpHeaders({ Accept: 'application/json' });
      const data = await firstValueFrom(
        this.http.get<Record<string, unknown>>(url, { headers }).pipe(take(1)),
      );
      const ms = typeof performance !== 'undefined' ? Math.round(performance.now() - t0) : -1;
      this.angularHttpBody.set(JSON.stringify(data, null, 2));
      this.log('runAngularHttpGetDemo success', { ms, keys: Object.keys(data) });
      this.appendJournalAuto({
        tried: 'HttpClient.get jsonplaceholder /posts/1',
        outcome: 'ok',
        detail: `${ms} ms, keys: ${Object.keys(data).join(', ')}.`,
      });
    } catch (err: unknown) {
      this.logErr('runAngularHttpGetDemo', err);
      const msg = err instanceof Error ? err.message : String(err);
      this.angularHttpBody.set(msg);
      this.appendJournalAuto({
        tried: 'HttpClient.get jsonplaceholder /posts/1',
        outcome: 'fail',
        detail: msg,
      });
    } finally {
      this.angularHttpLoading.set(false);
      this.log('runAngularHttpGetDemo end', { bodyLen: this.angularHttpBody().length });
    }
  }
}
