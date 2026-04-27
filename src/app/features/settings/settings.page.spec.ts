import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { SegmentChangeEventDetail } from '@ionic/core/components';
import { of } from 'rxjs';
import { ThemeService } from '../../core/theme.service';
import { SETTINGS_PROFILE_MOCK } from './mock/settings.mock';
import { ProfileRepository } from '../../data/profile.repository';
import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  let fixture: ComponentFixture<SettingsPage>;
  let theme: ThemeService;
  let doc: Document;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SettingsPage],
      providers: [
        ThemeService,
        provideRouter([]),
        {
          provide: ProfileRepository,
          useValue: {
            getSettingsProfile: () => of(SETTINGS_PROFILE_MOCK),
          },
        },
      ],
    }).compileComponents();

    doc = TestBed.inject(DOCUMENT);
    doc.documentElement.classList.remove('ion-palette-dark');
    theme = TestBed.inject(ThemeService);
    theme.init();
    fixture = TestBed.createComponent(SettingsPage);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    doc.documentElement.classList.remove('ion-palette-dark');
  });

  function ionChange(detail: SegmentChangeEventDetail): CustomEvent<SegmentChangeEventDetail> {
    return new CustomEvent<SegmentChangeEventDetail>('ionChange', { detail });
  }

  it('onThemeSegment applies dark from ionChange detail', () => {
    fixture.componentInstance.onThemeSegment(ionChange({ value: 'dark' }));
    expect(theme.mode()).toBe('dark');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeTrue();
  });

  it('onThemeSegment applies light from ionChange detail', () => {
    theme.setMode('dark');
    fixture.componentInstance.onThemeSegment(ionChange({ value: 'light' }));
    expect(theme.mode()).toBe('light');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeFalse();
  });

  it('onThemeSegment ignores unknown values', () => {
    theme.init();
    fixture.componentInstance.onThemeSegment(ionChange({ value: undefined }));
    expect(theme.mode()).toBe('light');
    fixture.componentInstance.onThemeSegment(ionChange({ value: 'system' }));
    expect(theme.mode()).toBe('light');
  });

  /**
   * ion-segment sets `this.value = (event.target as HTMLElement).value` on click.
   * If the click target is slotted `ion-label`, `value` is wrong and theme never updates.
   */
  it('appearance segment must not use ion-label inside segment buttons', () => {
    const segment = fixture.nativeElement.querySelector('ion-segment.settings-seg');
    expect(segment).toBeTruthy();
    expect(segment.querySelectorAll('ion-label').length).toBe(0);
  });
});
