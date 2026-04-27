import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ShellPage } from './shell.page';

describe('ShellPage', () => {
  let component: ShellPage;
  let fixture: ComponentFixture<ShellPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
