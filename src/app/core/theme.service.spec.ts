import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let doc: Document;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    doc = TestBed.inject(DOCUMENT);
    doc.documentElement.classList.remove('ion-palette-dark');
    doc.documentElement.style.removeProperty('color-scheme');
  });

  afterEach(() => {
    localStorage.clear();
    doc.documentElement.classList.remove('ion-palette-dark');
    doc.documentElement.style.removeProperty('color-scheme');
  });

  it('init applies light when storage is empty', () => {
    service.init();
    expect(service.mode()).toBe('light');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeFalse();
    expect(doc.documentElement.style.colorScheme).toBe('light');
  });

  it('init restores dark from localStorage', () => {
    localStorage.setItem('pictalk-theme', 'dark');
    service.init();
    expect(service.mode()).toBe('dark');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeTrue();
    expect(doc.documentElement.style.colorScheme).toBe('dark');
  });

  it('setMode toggles class, signal, and storage', () => {
    service.init();
    service.setMode('dark');
    expect(service.mode()).toBe('dark');
    expect(localStorage.getItem('pictalk-theme')).toBe('dark');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeTrue();

    service.setMode('light');
    expect(service.mode()).toBe('light');
    expect(localStorage.getItem('pictalk-theme')).toBe('light');
    expect(doc.documentElement.classList.contains('ion-palette-dark')).toBeFalse();
  });
});
